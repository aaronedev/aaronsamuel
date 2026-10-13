/**
 * Idle singularity: leave the mouse still and it slowly becomes a black hole. Dust gathers into an
 * accretion ring, then the page content spirals in, nearest first, until everything is gone at
 * five minutes. Any input spits the content back out. Visual only: transforms and opacity, no DOM
 * removal, no aria changes, so the page stays readable to assistive technology throughout.
 */
export const SINGULARITY_TIMING = Object.freeze({charge: 10_000, consumeStart: 30_000, consumeEnd: 300_000});

const clamp01 = value => Math.max(0, Math.min(1, value));

/** Charge (dust gathering, hole growing) and consumption (content swallowed) progress for an idle time. */
export function singularityPhase(idleMs, timing = SINGULARITY_TIMING) {
  const charge = clamp01((idleMs - timing.charge) / (timing.consumeStart - timing.charge));
  const consume = clamp01((idleMs - timing.consumeStart) / (timing.consumeEnd - timing.consumeStart));
  return {charge: charge * charge * (3 - 2 * charge), consume, power: Math.min(1, charge * .35 + consume * .65)};
}

/** Per-element swallow progress: nearest elements (rank 0) go first; each takes a quarter of the window. */
export function swallowProgress(consume, rank) {
  const k = clamp01((consume - Math.max(0, Math.min(1, rank)) * .75) / .25);
  return Math.pow(k, 2.2);
}

/** Spiral path into the hole for an element whose centre sits (dx, dy) away from it. */
export function spiralTransform(dx, dy, k) {
  const theta = Math.pow(k, 1.5) * Math.PI * 1.6;
  const shrink = 1 - k;
  const cos = Math.cos(theta), sin = Math.sin(theta);
  const x = (dx * cos - dy * sin) * shrink;
  const y = (dx * sin + dy * cos) * shrink;
  return {x: x - dx, y: y - dy, rotate: theta * 57.2958 * .6, scale: Math.max(.02, 1 - .98 * k), opacity: 1 - Math.pow(k, 3)};
}

export class Singularity {
  constructor({targets, overlay, ambient, enabled = true, speed = 1}) {
    this.selector = targets;
    this.overlay = overlay;
    this.ambient = ambient;
    this.enabled = enabled;
    this.speed = speed;
    this.timing = {charge: SINGULARITY_TIMING.charge / speed, consumeStart: SINGULARITY_TIMING.consumeStart / speed, consumeEnd: SINGULARITY_TIMING.consumeEnd / speed};
    this.finePointer = matchMedia('(pointer:fine)');
    this.reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
    this.position = null;
    this.idleSince = 0;
    this.armTimer = 0;
    this.frame = 0;
    this.items = null;
    this.power = 0;
    // Where the idle clock was last reset; small moves accumulate against it, so slow drift counts.
    this.anchor = null;
    // Which capture currently owns an element, so a late cleanup never touches a newer swallow.
    this.owner = new WeakMap();
    this.captures = 0;
    const options = {passive: true};
    window.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const next = {x: event.clientX, y: event.clientY};
      const moved = !this.anchor || Math.hypot(next.x - this.anchor.x, next.y - this.anchor.y) > 2;
      if (moved) this.wake(next); else this.position = next;
    }, options);
    // Touch has no resting cursor: forget the mouse position so the hole cannot form at a stale spot.
    window.addEventListener('pointerdown', event => this.wake(event.pointerType === 'touch' ? null : undefined), options);
    window.addEventListener('touchstart', () => this.wake(null), options);
    for (const type of ['keydown', 'wheel', 'focusin']) window.addEventListener(type, () => this.wake(), options);
    document.documentElement.addEventListener('pointerleave', () => this.wake(null), options);
    window.addEventListener('blur', () => this.wake(null), options);
    // Switching to touch (or to reduced motion) must restore the page at once, even when fully consumed.
    const preference = () => {if (!this.allowed) {clearTimeout(this.armTimer); this.release(false);} else this.wake();};
    this.finePointer.addEventListener('change', preference);
    this.reducedMotion.addEventListener('change', preference);
  }
  get allowed() {
    return this.enabled && this.finePointer.matches && !this.reducedMotion.matches && !document.body.classList.contains('dialog-open');
  }
  /** Restart the idle clock; if the hole was holding anything, spit it back out where it sat. */
  wake(next) {
    // Cheap on ordinary mouse moves: only touch the DOM when the hole is actually present.
    if (this.frame || this.items || this.power > 0) this.release(this.power > .01 || Boolean(this.items));
    if (next !== undefined) {this.position = next; this.anchor = next;}
    clearTimeout(this.armTimer);
    this.idleSince = performance.now();
    if (this.allowed && this.position) this.armTimer = setTimeout(() => this.start(), this.timing.charge);
  }
  start() {
    if (!this.allowed || !this.position || this.frame) return;
    document.documentElement.classList.add('singularity-active');
    this.frame = requestAnimationFrame(this.tick);
  }
  /** Measure targets once, when swallowing begins; nothing scrolls while the mouse is idle. */
  capture() {
    const {x, y} = this.position;
    // Snap any still-springing release back to rest first: bounds include transforms, so measuring
    // mid-transition would aim the new spiral from a stale centre.
    const all = [...document.querySelectorAll(this.selector)];
    for (const el of all) {el.style.transition = ''; el.style.transform = ''; el.style.opacity = '';}
    const found = all.filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
    const items = found.map(el => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
      return {el, dx: cx - x, dy: cy - y, distance: Math.hypot(cx - x, cy - y)};
    }).sort((a, b) => a.distance - b.distance);
    const capture = ++this.captures;
    items.forEach((item, index) => {
      this.owner.set(item.el, capture);
      item.rank = items.length > 1 ? index / (items.length - 1) : 0;
      item.k = -1; // forces the first write after (re)capture
      item.capture = capture;
      item.el.style.willChange = 'transform, opacity';
    });
    this.items = items;
  }
  tick = now => {
    this.frame = 0;
    if (!this.allowed || !this.position) {this.release(false); return;}
    const phase = singularityPhase(now - this.idleSince, this.timing);
    this.power = phase.power;
    const {x, y} = this.position;
    if (this.ambient) {
      // The dust field works in page coordinates; derive them from the hole so a scroll cannot split them.
      this.ambient.pointer.x = x + window.scrollX;
      this.ambient.pointer.y = y + window.scrollY;
      this.ambient.pointer.pull = phase.power;
      this.ambient.pointer.active = true;
    }
    this.overlay.hidden = false;
    this.overlay.classList.remove('collapsing');
    this.overlay.style.setProperty('--power', phase.power.toFixed(4));
    this.overlay.style.transform = `translate(${x}px, ${y}px)`;
    document.documentElement.classList.toggle('singularity-cursor', phase.power > .55);
    if (phase.consume > 0) {
      // Re-measure when a target was replaced (for example refreshed stats rows), so new nodes are swallowed too.
      if (!this.items || this.items.some(item => !item.el.isConnected)) this.capture();
      for (const item of this.items) {
        const k = swallowProgress(phase.consume, item.rank);
        if (Math.abs(k - item.k) < .0005) continue;
        item.k = k;
        const t = spiralTransform(item.dx, item.dy, k);
        item.el.style.transform = k > 0 ? `translate(${t.x.toFixed(1)}px, ${t.y.toFixed(1)}px) rotate(${t.rotate.toFixed(1)}deg) scale(${t.scale.toFixed(3)})` : '';
        item.el.style.opacity = k > 0 ? t.opacity.toFixed(3) : '';
      }
    }
    // Keep running after full consumption: unchanged blocks are skipped, and replaced ones get caught.
    this.frame = requestAnimationFrame(this.tick);
  };
  /** Spit everything back out with a springy stagger and a dust shockwave, or snap back instantly. */
  release(animate) {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
    const power = this.power;
    this.power = 0;
    if (this.ambient) this.ambient.pointer.pull = 0;
    document.documentElement.classList.remove('singularity-cursor');
    if (animate && power > .05 && this.position && this.ambient) this.ambient.burst(this.position.x, this.position.y, .6 + power * 1.8);
    const collapsing = Boolean(animate && power > .05);
    this.overlay.classList.toggle('collapsing', collapsing);
    if (!collapsing) {this.overlay.hidden = true; this.overlay.style.setProperty('--power', '0');}
    const items = this.items;
    this.items = null;
    if (items) {
      for (const item of items) {
        if (item.k <= 0) {item.el.style.willChange = ''; continue;}
        item.el.style.transition = animate ? `transform 1s cubic-bezier(.2,1.45,.38,1) ${Math.round(item.rank * 380)}ms, opacity .45s ease-out ${Math.round(item.rank * 380)}ms` : '';
        item.el.style.transform = '';
        item.el.style.opacity = '';
      }
    }
    const finish = () => {
      for (const item of items ?? []) {
        if (this.owner.get(item.el) !== item.capture) continue;
        item.el.style.transition = '';
        item.el.style.willChange = '';
      }
      if (!this.frame) {
        this.overlay.classList.remove('collapsing');
        this.overlay.hidden = true;
        this.overlay.style.setProperty('--power', '0');
        document.documentElement.classList.remove('singularity-active');
      }
    };
    // Each release owns its cleanup timer, so a quick re-charge never strands earlier items.
    if (animate) setTimeout(finish, 1500); else finish();
  }
  setEnabled(value) {
    this.enabled = Boolean(value);
    if (!this.enabled) {clearTimeout(this.armTimer); this.release(false);} else this.wake();
  }
}
