/** A small spring-based point field. No dependencies, trails, or full-page particle overlay. */
export function stepParticle(point, pointer, elapsed, delta = 1) {
  const dt = Math.max(.25, Math.min(2, delta));
  const driftX = Math.sin(point.ay * .011 + elapsed * .00019 + point.phase) * 3.3;
  const driftY = Math.cos(point.ax * .013 - elapsed * .00016 + point.phase) * 2.3;
  let ax = (point.ax + driftX - point.x) * .036;
  let ay = (point.ay + driftY - point.y) * .036;
  if (pointer.active) {
    const dx = pointer.x - point.x;
    const dy = pointer.y - point.y;
    const distance = Math.hypot(dx, dy);
    const influence = Math.exp(-(distance * distance) / (145 * 145));
    // Cursor gravity with a tangential component: real displacement, not a parallax image.
    ax += (dx * .009 - dy * .021) * influence;
    ay += (dy * .009 + dx * .021) * influence;
  }
  const damping = Math.pow(.84, dt);
  point.vx = (point.vx + ax * dt) * damping;
  point.vy = (point.vy + ay * dt) * damping;
  point.x += point.vx * dt;
  point.y += point.vy * dt;
  return point;
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
    window.addEventListener('pointermove', this.onPointer, options);
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
  resize() {
    if (!this.ctx) return;
    // Particle colors follow the CSS theme tokens (plain palette colors only).
    const css=getComputedStyle(document.documentElement);
    const pick=(name,fallback)=>css.getPropertyValue(name).trim()||fallback;
    this.colors={violet:pick('--violet','#bb7cff'),cyan:pick('--cyan','#9ee9e5'),pink:pick('--orchid','#d39ce9')};
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
      candidates.push({ax,ay,x:ax,y:ay,vx:0,vy:0,phase:random()*6.28,size:.45+brightness*.65,alpha:.17+brightness*.53,color:random()<.075?'cyan':random()<.18?'pink':'violet'});
    }
    // Deterministic downsampling puts a hard ceiling on work per frame.
    const cap=this.finePointer.matches?2100:750;
    const step=Math.max(1,candidates.length/cap);
    this.points=[];
    for(let i=0;i<Math.min(cap,candidates.length);i++)this.points.push(candidates[Math.floor(i*step)]);
    this.canvas.dataset.particles=String(this.points.length);
    this.draw(0,false);
  }
  draw(delta=1, animate=true) {
    const ctx=this.ctx;
    if(!ctx)return;
    ctx.clearRect(0,0,this.width,this.height);
    for(const point of this.points){
      if(animate)stepParticle(point,this.pointer,this.elapsed,delta);
      ctx.globalAlpha=point.alpha;
      ctx.fillStyle=this.colors[point.color];
      ctx.beginPath();
      ctx.arc(point.x,point.y,point.size,0,Math.PI*2);
      ctx.fill();
    }
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
      for(const p of this.points){p.x=p.ax;p.y=p.ay;p.vx=p.vy=0;}
      this.draw(0,false);
    }
  }
  setEnabled(value) {this.enabled=Boolean(value);this.sync();}
  destroy(){this.abort.abort();this.observer?.disconnect();cancelAnimationFrame(this.frame);clearTimeout(this.resizeTimer);}
}
