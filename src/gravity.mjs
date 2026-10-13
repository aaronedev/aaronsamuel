/**
 * The cursor as a slowly forming gravity well.
 *
 * Mass builds while the pointer lingers and drains while it moves fast or leaves. Particles feel
 * the well first; small page elements ("satellites") only respond once enough mass has gathered,
 * lighter ones sooner than heavier ones: first a tremble, then a lean toward the well.
 */
export const WELL = {
  stillSpeed: .35,     // px/ms below which the pointer counts as lingering
  formMs: 2200,        // lingering time from empty to full mass
  leaveMs: 650,        // time to fully drain after the pointer leaves
  drain: .0016,        // mass lost per ms for each px/ms above stillSpeed
  reach: 190,          // px; satellites beyond ~2x this feel nothing
  trembleAt: .12,      // tension where trembling starts
  leanAt: .45,         // tension where leaning starts
  maxLean: 8,          // px a weight-1 satellite can lean
  maxTremble: 1.6,     // px of tremble at full tension
};

/** Advance the well's mass (0..1) by dt ms given the pointer speed in px/ms. */
export function updateWellMass(mass, {active, speed}, dt) {
  const step = Math.max(0, Math.min(64, dt));
  if (!active) return Math.max(0, mass - step / WELL.leaveMs);
  if (speed <= WELL.stillSpeed) return Math.min(1, mass + step / WELL.formMs);
  return Math.max(0, mass - step * (speed - WELL.stillSpeed) * WELL.drain);
}

/** Weight from rendered size: small tokens are light (1), bigger labels heavier (up to 4). */
export function satelliteWeight(width, height) {
  return Math.max(1, Math.min(4, Math.sqrt(Math.max(0, width) * Math.max(0, height)) / 14));
}

/**
 * How strongly one satellite is pulled. Tension rises with mass squared (the well has to form
 * first), falls off with distance, and is divided by weight. Lean only appears past leanAt.
 */
export function satelliteResponse(distance, weight, mass) {
  const falloff = Math.exp(-((distance / WELL.reach) ** 2));
  const tension = Math.max(0, Math.min(1, mass * mass * falloff * 1.8 / weight));
  const lean = tension > WELL.leanAt ? (tension - WELL.leanAt) / (1 - WELL.leanAt) * WELL.maxLean / Math.sqrt(weight) : 0;
  const tremble = tension > WELL.trembleAt ? (tension - WELL.trembleAt) / (1 - WELL.trembleAt) * WELL.maxTremble : 0;
  return {tension, lean, tremble};
}

/** Tracks the pointer and the well's mass; particle fields read `mass` from it. */
export class GravityWell {
  constructor() {
    this.x = 0; this.y = 0; this.active = false; this.mass = 0; this.speed = 0;
    this.last = null;
    this.fine = matchMedia('(pointer:fine)');
    const options = {passive:true};
    window.addEventListener('pointermove', event => {
      if (!this.fine.matches || event.pointerType === 'touch') return;
      const now = event.timeStamp || performance.now();
      if (this.last) {
        const dt = Math.max(1, now - this.last.t);
        const instant = Math.hypot(event.clientX - this.last.x, event.clientY - this.last.y) / dt;
        this.speed = this.speed * .7 + instant * .3;
      }
      this.last = {x:event.clientX, y:event.clientY, t:now};
      this.x = event.clientX; this.y = event.clientY; this.active = true;
    }, options);
    document.documentElement.addEventListener('pointerleave', () => {this.active = false;}, options);
    window.addEventListener('blur', () => {this.active = false;}, options);
  }
  tick(dt) {
    // Speed decays between events, so a resting pointer counts as lingering.
    this.speed *= Math.pow(.9, dt / 16.667);
    this.mass = updateWellMass(this.mass, this, dt);
  }
}

/** Small page elements that tremble and lean toward the well. Transforms only; layout never moves. */
export class Satellites {
  constructor(well, selector, enabled = true) {
    this.well = well;
    this.enabled = enabled;
    this.reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
    this.items = [...document.querySelectorAll(selector)].map((el, i) => {
      el.classList.add('satellite');
      return {el, seed: i * 1.731 + 0.37, x: 0, y: 0, vx: 0, vy: 0, cx: 0, cy: 0, weight: 1, shown: false};
    });
    this.frame = 0; this.last = 0; this.time = 0;
    this.measure = () => {
      for (const item of this.items) {
        const prev = item.el.style.transform;
        item.el.style.transform = '';
        const r = item.el.getBoundingClientRect();
        item.el.style.transform = prev;
        item.cx = r.left + r.width / 2 + window.scrollX;
        item.cy = r.top + r.height / 2 + window.scrollY;
        item.visible = r.width > 0 && r.height > 0;
        item.weight = satelliteWeight(r.width, r.height);
      }
    };
    let timer = 0;
    const later = () => {clearTimeout(timer); timer = setTimeout(this.measure, 120);};
    window.addEventListener('resize', later, {passive:true});
    if (typeof ResizeObserver === 'function') new ResizeObserver(later).observe(document.body);
    document.addEventListener('visibilitychange', () => this.sync());
    this.measure();
    this.sync();
  }
  running() {return this.enabled && !document.hidden && !this.reducedMotion.matches;}
  sync() {
    cancelAnimationFrame(this.frame); this.frame = 0; this.last = 0;
    if (this.running()) this.frame = requestAnimationFrame(this.tick);
    else this.reset();
  }
  reset() {
    this.well.mass = 0;
    for (const item of this.items) {item.x = item.y = item.vx = item.vy = 0; item.el.style.transform = ''; item.shown = false;}
  }
  setEnabled(value) {this.enabled = Boolean(value); this.sync();}
  tick = timestamp => {
    if (!this.running()) {this.frame = 0; return;}
    const dt = this.last ? Math.min(64, timestamp - this.last) : 16.667;
    this.last = timestamp; this.time += dt;
    this.well.tick(dt);
    const px = this.well.x + window.scrollX, py = this.well.y + window.scrollY;
    const k = Math.min(2, dt / 16.667);
    for (const item of this.items) {
      if (!item.visible) continue;
      const dx = px - item.cx, dy = py - item.cy;
      const distance = Math.hypot(dx, dy) || 1;
      const {lean, tremble} = this.well.active && distance < WELL.reach * 2.2
        ? satelliteResponse(distance, item.weight, this.well.mass) : {lean: 0, tremble: 0};
      // Target: lean along the pull, plus a tremble that grows with tension.
      const t = this.time * .045 + item.seed;
      const tx = dx / distance * lean + Math.sin(t * 1.7) * tremble;
      const ty = dy / distance * lean + Math.cos(t * 2.3) * tremble;
      // Spring toward the target: released satellites overshoot slightly on the way back.
      item.vx = (item.vx + (tx - item.x) * .16 * k) * Math.pow(.78, k);
      item.vy = (item.vy + (ty - item.y) * .16 * k) * Math.pow(.78, k);
      item.x += item.vx * k; item.y += item.vy * k;
      const moving = Math.abs(item.x) > .05 || Math.abs(item.y) > .05 || Math.abs(item.vx) > .02 || Math.abs(item.vy) > .02;
      if (moving) {
        item.el.style.transform = `translate(${item.x.toFixed(2)}px,${item.y.toFixed(2)}px) rotate(${(item.x * .35).toFixed(2)}deg)`;
        item.shown = true;
      } else if (item.shown) {
        item.el.style.transform = ''; item.shown = false; item.x = item.y = item.vx = item.vy = 0;
      }
    }
    this.frame = requestAnimationFrame(this.tick);
  };
}
