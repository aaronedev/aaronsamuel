/** Spring-based point fields: the anchor glyph plus a faint ambient field that fades with distance from it. No dependencies or trails. */
export function stepParticle(point, pointer, elapsed, delta = 1, pulses = []) {
  const dt = Math.max(.25, Math.min(2, delta));
  const phase = point.phase ?? 0;
  const driftX = Math.sin(point.ay * .011 + elapsed * .00019 + phase) * 3.3;
  const driftY = Math.cos(point.ax * .013 - elapsed * .00016 + phase) * 2.3;
  let ax = (point.ax + driftX - point.x) * .036;
  let ay = (point.ay + driftY - point.y) * .036;
  // Ambient points far from the anchor respond more weakly to the cursor and shockwaves.
  const force = point.force ?? 1;
  if (pointer.active) {
    const dx = pointer.x - point.x;
    const dy = pointer.y - point.y;
    const distance = Math.hypot(dx, dy);
    const influence = Math.exp(-(distance * distance) / (145 * 145)) * force;
    // Cursor gravity with a tangential component: real displacement, not a parallax image.
    ax += (dx * .009 - dy * .021) * influence;
    ay += (dy * .009 + dx * .021) * influence;
  }
  // Click shockwaves: an expanding ring that pushes points outward as it passes.
  for (const pulse of pulses) {
    const dx = point.x - pulse.x;
    const dy = point.y - pulse.y;
    const distance = Math.hypot(dx, dy) || 1;
    const band = distance - pulse.radius;
    const push = Math.exp(-(band * band) / (26 * 26)) * pulse.strength * 2.6 * force;
    ax += dx / distance * push;
    ay += dy / distance * push;
  }
  const damping = Math.pow(.84, dt);
  point.vx = (point.vx + ax * dt) * damping;
  point.vy = (point.vy + ay * dt) * damping;
  point.x += point.vx * dt;
  point.y += point.vy * dt;
  // Heat (0..1) follows speed; the renderer turns fast points into hot sparks.
  point.heat = Math.min(1, Math.hypot(point.vx, point.vy) / 5);
  return point;
}

/** One pre-rendered glow per color: drawImage is far cheaper than arc + fill per point. */
function glowSprite(color, core) {
  const size = 32;
  // ImageBitmap sources avoid a per-drawImage canvas snapshot, which dominated frame cost.
  const offscreen = typeof OffscreenCanvas === 'function';
  const sprite = offscreen ? new OffscreenCanvas(size, size) : document.createElement('canvas');
  sprite.width = sprite.height = size;
  const s = sprite.getContext('2d');
  if (!s) return sprite;
  // The canvas normalizes any CSS color to #rrggbb, which gives a portable rgba halo.
  s.fillStyle = color;
  const hex = /^#[0-9a-f]{6}$/i.test(s.fillStyle) ? s.fillStyle : '#bb7cff';
  const [r,gr,b] = [1,3,5].map(i => parseInt(hex.slice(i,i+2),16));
  const g = s.createRadialGradient(size/2,size/2,0,size/2,size/2,size/2);
  g.addColorStop(0, core);
  g.addColorStop(.16, hex);
  g.addColorStop(.42, `rgba(${r},${gr},${b},.28)`);
  g.addColorStop(1, `rgba(${r},${gr},${b},0)`);
  s.fillStyle = g;
  s.fillRect(0,0,size,size);
  return offscreen ? sprite.transferToImageBitmap() : sprite;
}

export class AnchorParticles {
  constructor(canvas, enabled = true) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', {alpha:true});
    this.enabled = enabled;
    this.visible = true;
    this.pageVisible = !document.hidden;
    this.frame = 0;
    this.lastTime = 0;
    this.elapsed = 0;
    this.points = [];
    this.pulses = [];
    this.sprites = {};
    this.introduced = false;
    /** False when a page-wide field draws the shockwave ring instead. */
    this.drawRing = true;
    this.pointer = {x:0,y:0,active:false};
    this.finePointer = matchMedia('(pointer:fine)');
    this.reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
    this.width = 0;
    this.height = 0;
    this.resizeTimer = 0;
    this.abort = new AbortController();
    if (!this.ctx) return;
    const options = {passive:true, signal:this.abort.signal};
    this.onPointer = event => {
      if (!this.finePointer.matches || event.pointerType === 'touch') return;
      const rect = this.canvas.getBoundingClientRect();
      this.pointer.x = event.clientX-rect.left;
      this.pointer.y = event.clientY-rect.top;
      this.pointer.active = this.pointer.x > -110 && this.pointer.x < rect.width+110 && this.pointer.y > -100 && this.pointer.y < rect.height+100;
    };
    this.onPress = event => {
      // Touch pointerdown also starts scrolls over the hero copy, so only mouse and pen pulse.
      if (!this.frame || event.pointerType === 'touch') return;
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX-rect.left, y = event.clientY-rect.top;
      if (x < -40 || x > rect.width+40 || y < -40 || y > rect.height+40) return;
      this.pulses.push({x,y,radius:0,strength:1});
      if (this.pulses.length > 4) this.pulses.shift();
    };
    window.addEventListener('pointermove', this.onPointer, options);
    window.addEventListener('pointerdown', this.onPress, options);
    document.documentElement.addEventListener('pointerleave', () => {this.pointer.active=false;}, options);
    window.addEventListener('blur', () => {this.pointer.active=false;}, options);
    document.addEventListener('visibilitychange', () => {this.pageVisible=!document.hidden; this.sync();}, options);
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer=setTimeout(() => {this.resize();this.sync();}, 100);
    }, options);
    this.observer = new IntersectionObserver(entries => {this.visible=entries[0].isIntersecting;this.sync();},{rootMargin:'80px'});
    this.observer.observe(canvas);
    this.resize();
    canvas.parentElement.classList.add('ready');
    this.sync();
  }
  sprite(color, core) {return glowSprite(color, core);}

  resize() {
    if (!this.ctx) return;
    // Particle colors follow the CSS theme tokens (plain palette colors only).
    const css=getComputedStyle(document.documentElement);
    const pick=(name,fallback)=>css.getPropertyValue(name).trim()||fallback;
    this.colors={violet:pick('--violet','#bb7cff'),cyan:pick('--cyan','#9ee9e5'),pink:pick('--orchid','#d39ce9')};
    this.sprites={
      violet:this.sprite(this.colors.violet,this.colors.violet),
      cyan:this.sprite(this.colors.cyan,'#fff'),
      pink:this.sprite(this.colors.pink,this.colors.pink),
      hot:this.sprite(this.colors.pink,'#fff')
    };
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    if (!this.width || !this.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.canvas.width = Math.round(this.width*dpr);
    this.canvas.height = Math.round(this.height*dpr);
    this.ctx.setTransform(dpr,0,0,dpr,0,0);
    const shape = document.createElement('canvas');
    shape.width = Math.ceil(this.width);
    shape.height = Math.ceil(this.height);
    const s = shape.getContext('2d', {willReadFrequently:true});
    if (!s) return;
    const size = Math.min(this.width * .95, this.height * .97);
    s.font = `italic ${size}px Georgia, serif`;
    s.textAlign = 'center';
    s.textBaseline = 'middle';
    s.fillStyle = '#fff';
    s.fillText('&', this.width*.48, this.height*.48);
    const pixels = s.getImageData(0,0,shape.width,shape.height).data;
    const candidates = [];
    let seed = 42;
    const random = () => {seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
    const stride = this.width < 300 ? 3 : 3.3;
    for (let y=9;y<shape.height-9;y+=stride) for (let x=9;x<shape.width-9;x+=stride) {
      const ix=Math.floor(x),iy=Math.floor(y);
      if (pixels[(iy*shape.width+ix)*4+3] < 120 || random()>.91) continue;
      const ax=x+(random()-.5)*2.4,ay=y+(random()-.5)*2.4;
      const brightness=random();
      const spark=random()<.04;
      // Only a deterministic subset carries a glow sprite; the rest draw a cheap square core.
      candidates.push({ax,ay,x:ax,y:ay,vx:0,vy:0,heat:0,glow:spark||random()<.2,phase:random()*6.28,twinkle:spark?2.6:.6+random()*.8,
        size:spark?1.5:.55+brightness*.6,alpha:spark?.95:.26+brightness*.5,color:random()<.075?'cyan':random()<.18?'pink':'violet'});
    }
    // Deterministic downsampling puts a hard ceiling on work per frame.
    const cap=this.finePointer.matches?2100:750;
    const step=Math.max(1,candidates.length/cap);
    this.points=[];
    for(let i=0;i<Math.min(cap,candidates.length);i++)this.points.push(candidates[Math.floor(i*step)]);
    this.canvas.dataset.particles=String(this.points.length);
    // First appearance: points swirl in from a loose ring and settle into the glyph.
    if(!this.introduced&&this.enabled&&!this.reducedMotion.matches){
      const cx=this.width*.48,cy=this.height*.48,reach=Math.max(this.width,this.height)*.55;
      for(const p of this.points){
        const angle=Math.atan2(p.ay-cy,p.ax-cx)+1.4+random()*.6;
        const radius=reach*(.7+random()*.6);
        p.x=cx+Math.cos(angle)*radius;p.y=cy+Math.sin(angle)*radius;
        p.vx=-Math.sin(angle)*3;p.vy=Math.cos(angle)*3;
      }
    }
    this.introduced=true;
    this.draw(0,false);
  }
  draw(delta=1, animate=true) {
    const ctx=this.ctx;
    if(!ctx)return;
    ctx.clearRect(0,0,this.width,this.height);
    if(animate){
      for(const pulse of this.pulses){pulse.radius+=7*delta;pulse.strength*=Math.pow(.93,delta);}
      this.pulses=this.pulses.filter(pulse=>pulse.strength>.04);
    }
    ctx.globalCompositeOperation='lighter';
    const t=this.elapsed*.002;
    for(const point of this.points){
      if(animate)stepParticle(point,this.pointer,this.elapsed,delta,this.pulses);
      const heat=animate?point.heat:0;
      const shimmer=.72+.28*Math.sin(t*point.twinkle+point.phase);
      ctx.globalAlpha=Math.min(1,point.alpha*shimmer+heat*.45);
      // drawImage is the per-point cost; bound it to the glow subset and points heated by motion.
      if(point.glow||heat>.25){
        const radius=point.size*(3.4+heat*2.2);
        ctx.drawImage(heat>.4?this.sprites.hot:this.sprites[point.color],point.x-radius,point.y-radius,radius*2,radius*2);
      }else{
        const side=point.size*2.2;
        ctx.fillStyle=this.colors[point.color];
        ctx.fillRect(point.x-side/2,point.y-side/2,side,side);
      }
    }
    // A faint ring makes the shockwave legible; the ambient field draws it when present.
    if(this.drawRing)for(const pulse of this.pulses){
      ctx.globalAlpha=pulse.strength*.22;
      ctx.strokeStyle=this.colors.violet;
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.arc(pulse.x,pulse.y,pulse.radius,0,Math.PI*2);
      ctx.stroke();
    }
    ctx.globalCompositeOperation='source-over';
    ctx.globalAlpha=1;
  }
  tick = timestamp => {
    if(!this.enabled||!this.visible||!this.pageVisible||this.reducedMotion.matches){this.frame=0;this.lastTime=0;return;}
    const delta=this.lastTime?Math.min((timestamp-this.lastTime)/16.667,2):1;
    this.elapsed+=this.lastTime?Math.min(timestamp-this.lastTime,33.334):16.667;
    this.lastTime=timestamp;
    this.draw(delta,true);
    this.frame=requestAnimationFrame(this.tick);
  };
  sync() {
    if(!this.ctx)return;
    if(this.frame)cancelAnimationFrame(this.frame);
    this.frame=0;this.lastTime=0;
    const running=this.enabled&&this.visible&&this.pageVisible&&!this.reducedMotion.matches;
    this.canvas.dataset.running=String(running);
    if(running)this.frame=requestAnimationFrame(this.tick);
    else if(!this.enabled||this.reducedMotion.matches){
      this.pulses=[];
      for(const p of this.points){p.x=p.ax;p.y=p.ay;p.vx=p.vy=0;p.heat=0;}
      this.draw(0,false);
    }
  }
  setEnabled(value) {this.enabled=Boolean(value);this.sync();}
  destroy(){this.abort.abort();this.observer?.disconnect();cancelAnimationFrame(this.frame);clearTimeout(this.resizeTimer);}
}

/** Weight in [floor, 1] that decays with distance from the anchor: everywhere, but subtler further away. */
export function ambientWeight(distance, falloff, floor = .07) {
  return floor + (1 - floor) * Math.exp(-Math.max(0, distance) / Math.max(1, falloff));
}

/**
 * A faint page-wide dust field on one fixed viewport canvas. Points live in document coordinates;
 * density, brightness and cursor response all fall off with distance from the anchor glyph.
 */
export class AmbientField {
  constructor(canvas, anchorElement, enabled = true) {
    this.canvas = canvas;
    this.anchorElement = anchorElement;
    this.ctx = canvas.getContext('2d', {alpha:true});
    this.enabled = enabled;
    this.pageVisible = !document.hidden;
    this.frame = 0;
    this.staticFrame = 0;
    this.lastTime = 0;
    this.elapsed = 0;
    this.points = [];
    this.pulses = [];
    this.fieldHeight = 0;
    this.pointer = {x:0,y:0,active:false};
    this.finePointer = matchMedia('(pointer:fine)');
    this.reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
    this.abort = new AbortController();
    this.resizeTimer = 0;
    if (!this.ctx) return;
    const options = {passive:true, signal:this.abort.signal};
    window.addEventListener('pointermove', event => {
      if (!this.finePointer.matches || event.pointerType === 'touch') return;
      this.pointer.x = event.clientX + window.scrollX;
      this.pointer.y = event.clientY + window.scrollY;
      this.pointer.active = true;
    }, options);
    document.documentElement.addEventListener('pointerleave', () => {this.pointer.active=false;}, options);
    window.addEventListener('blur', () => {this.pointer.active=false;}, options);
    // Any mouse or pen click sends a shockwave; touch pointerdown also starts scrolls, so it does not.
    window.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') this.pulse(event.clientX, event.clientY);
    }, options);
    // A static field still has to follow the page while scrolling.
    window.addEventListener('scroll', () => {
      if (this.frame || this.staticFrame) return;
      this.staticFrame = requestAnimationFrame(() => {this.staticFrame=0;this.draw(0,false);});
    }, options);
    document.addEventListener('visibilitychange', () => {this.pageVisible=!document.hidden;this.sync();}, options);
    const relayout = () => {clearTimeout(this.resizeTimer);this.resizeTimer=setTimeout(() => {this.resize();this.sync();}, 120);};
    window.addEventListener('resize', relayout, options);
    // Unfolding sections can grow the page past the generated field.
    this.observer = typeof ResizeObserver === 'function' ? new ResizeObserver(() => {
      if (document.documentElement.scrollHeight > this.fieldHeight) relayout();
    }) : null;
    this.observer?.observe(document.body);
    this.resize();
    this.sync();
  }
  center() {
    const rect = this.anchorElement.getBoundingClientRect();
    return {x:rect.left + rect.width*.48 + window.scrollX, y:rect.top + rect.height*.48 + window.scrollY};
  }
  resize() {
    if (!this.ctx) return;
    const css=getComputedStyle(document.documentElement);
    const pick=(name,fallback)=>css.getPropertyValue(name).trim()||fallback;
    this.colors={violet:pick('--violet','#bb7cff'),cyan:pick('--cyan','#9ee9e5'),pink:pick('--orchid','#d39ce9')};
    this.sprites={violet:glowSprite(this.colors.violet,this.colors.violet),cyan:glowSprite(this.colors.cyan,'#fff'),pink:glowSprite(this.colors.pink,this.colors.pink),hot:glowSprite(this.colors.pink,'#fff')};
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.canvas.width = Math.round(this.width*dpr);
    this.canvas.height = Math.round(this.height*dpr);
    this.ctx.setTransform(dpr,0,0,dpr,0,0);
    const docWidth = document.documentElement.clientWidth || this.width;
    this.fieldHeight = Math.max(document.documentElement.scrollHeight, this.height);
    const origin = this.center();
    const falloff = Math.max(this.width, this.height) * .42;
    const cap = this.finePointer.matches ? 520 : 220;
    let seed = 7;
    const random = () => {seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
    this.points = [];
    // Rejection sampling: acceptance follows the same falloff as brightness, so density thins out too.
    for (let attempt = 0; attempt < cap*40 && this.points.length < cap; attempt++) {
      const ax = random()*docWidth, ay = random()*this.fieldHeight;
      const weight = ambientWeight(Math.hypot(ax-origin.x, ay-origin.y), falloff);
      if (random() > weight) continue;
      const spark = random() < .03;
      this.points.push({ax,ay,x:ax,y:ay,vx:0,vy:0,heat:0,weight,force:.3+weight*.7,glow:spark||random()<.18*weight,
        phase:random()*6.28,twinkle:spark?2.4:.5+random()*.9,size:spark?1.3:.45+random()*.6,alpha:spark?.9:.3+random()*.45,
        color:random()<.1?'cyan':random()<.2?'pink':'violet'});
    }
    this.canvas.dataset.particles = String(this.points.length);
    this.draw(0,false);
  }
  pulse(clientX, clientY) {
    if (!this.frame) return;
    const x = clientX + window.scrollX, y = clientY + window.scrollY;
    const origin = this.center();
    // Clicks far from the anchor still ripple, just more quietly.
    const weight = ambientWeight(Math.hypot(x-origin.x, y-origin.y), Math.max(this.width, this.height) * .42);
    this.pulses.push({x,y,radius:0,strength:.4+weight*.6});
    if (this.pulses.length > 4) this.pulses.shift();
  }
  draw(delta=1, animate=true) {
    const ctx=this.ctx;
    if(!ctx)return;
    ctx.clearRect(0,0,this.width,this.height);
    if(animate){
      // Slower decay than the glyph's pulse, so the wave carries out across the page.
      for(const pulse of this.pulses){pulse.radius+=7*delta;pulse.strength*=Math.pow(.965,delta);}
      this.pulses=this.pulses.filter(pulse=>pulse.strength>.04);
    }
    const left=window.scrollX, top=window.scrollY, margin=24;
    const t=this.elapsed*.002;
    const coarse=!this.finePointer.matches;
    ctx.globalCompositeOperation='lighter';
    for(const point of this.points){
      // Off-screen points keep their spring state; only the visible band is simulated and drawn.
      if(point.ay<top-80||point.ay>top+this.height+80)continue;
      if(animate)stepParticle(point,this.pointer,this.elapsed,delta,this.pulses);
      const x=point.x-left, y=point.y-top;
      if(x<-margin||x>this.width+margin||y<-margin||y>this.height+margin)continue;
      const heat=animate?point.heat:0;
      const shimmer=.65+.35*Math.sin(t*point.twinkle+point.phase);
      // Brightness keeps a visible floor so distant dust stays faintly present.
      ctx.globalAlpha=Math.min(1,(point.alpha*shimmer*(.22+point.weight*.78)+heat*.4)*(coarse?.6:1));
      if(point.glow||heat>.25){
        const radius=point.size*(3.2+heat*2);
        ctx.drawImage(heat>.4?this.sprites.hot:this.sprites[point.color],x-radius,y-radius,radius*2,radius*2);
      }else{
        const side=point.size*2;
        ctx.fillStyle=this.colors[point.color];
        ctx.fillRect(x-side/2,y-side/2,side,side);
      }
    }
    for(const pulse of this.pulses){
      ctx.globalAlpha=pulse.strength*.2;
      ctx.strokeStyle=this.colors.violet;
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.arc(pulse.x-left,pulse.y-top,pulse.radius,0,Math.PI*2);
      ctx.stroke();
    }
    ctx.globalCompositeOperation='source-over';
    ctx.globalAlpha=1;
  }
  tick = timestamp => {
    if(!this.enabled||!this.pageVisible||this.reducedMotion.matches){this.frame=0;this.lastTime=0;return;}
    const delta=this.lastTime?Math.min((timestamp-this.lastTime)/16.667,2):1;
    this.elapsed+=this.lastTime?Math.min(timestamp-this.lastTime,33.334):16.667;
    this.lastTime=timestamp;
    this.draw(delta,true);
    this.frame=requestAnimationFrame(this.tick);
  };
  sync() {
    if(!this.ctx)return;
    if(this.frame)cancelAnimationFrame(this.frame);
    this.frame=0;this.lastTime=0;
    const running=this.enabled&&this.pageVisible&&!this.reducedMotion.matches;
    this.canvas.dataset.running=String(running);
    if(running)this.frame=requestAnimationFrame(this.tick);
    else if(!this.enabled||this.reducedMotion.matches){
      this.pulses=[];
      for(const p of this.points){p.x=p.ax;p.y=p.ay;p.vx=p.vy=0;p.heat=0;}
      this.draw(0,false);
    }
  }
  setEnabled(value) {this.enabled=Boolean(value);this.sync();}
  destroy(){this.abort.abort();this.observer?.disconnect();cancelAnimationFrame(this.frame);cancelAnimationFrame(this.staticFrame);clearTimeout(this.resizeTimer);}
}
