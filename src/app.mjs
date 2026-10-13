import { PROJECTS, PROFILE, SNAPSHOT_DATE, freshStats, asYaml } from './content.mjs';
import { languagesHtml } from './render.mjs';
import { readCachedStats, refreshStats, cacheStats } from './github.mjs';
import { AnchorParticles, AmbientField } from './particles.mjs';

function initializePortfolio() {
  const get = id => document.getElementById(id);
  const storage = (()=>{try{return window.localStorage;}catch{return null;}})();
  const cached = readCachedStats(storage);
  let stats = cached ?? freshStats();
  let refreshing = false;
  let toastTimer;
  const motionPreference = matchMedia('(prefers-reduced-motion:reduce)');
  let motionRequested = true;
  try { motionRequested = storage?.getItem('aaron.yml:motion') !== 'off'; } catch { /* optional */ }
  const anchor = new AnchorParticles(get('anchor-canvas'),motionRequested&&!motionPreference.matches);
  const ambient = new AmbientField(get('ambient-canvas'),document.querySelector('.anchor-art'),motionRequested&&!motionPreference.matches);
  anchor.drawRing = false;
  const motionButton = get('motion-toggle');

  const dateText = date => {
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? 'date unavailable' : new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'Europe/Berlin'}).format(parsed);
  };
  const notice = text => {
    const toast = get('toast');
    clearTimeout(toastTimer);
    toast.textContent=text;toast.hidden=false;
    toastTimer=setTimeout(()=>{toast.hidden=true;},3600);
  };
  function setMotion() {
    const enabled=motionRequested&&!motionPreference.matches;
    anchor.setEnabled(enabled);
    ambient.setEnabled(enabled);
    motionButton.setAttribute('aria-pressed',String(enabled));
    get('motion-value').textContent=enabled?'true':'false';
    document.documentElement.dataset.motion=enabled?'on':'off';
    motionButton.title=motionPreference.matches?'Reduced motion is enabled in your system settings.':'Toggle the cursor-reactive particle field.';
  }
  setMotion();
  motionButton.addEventListener('click',()=>{
    if(motionPreference.matches){notice('Motion is off to respect your system preference.');return;}
    motionRequested=!motionRequested;
    try{storage?.setItem('aaron.yml:motion',motionRequested?'on':'off');}catch{/* optional */}
    setMotion();
  });
  motionPreference.addEventListener('change',setMotion);

  document.querySelectorAll('.section-fold').forEach(button=>{
    button.addEventListener('click',()=>{
      const expanded=button.getAttribute('aria-expanded')==='true';
      const panel=get(button.getAttribute('aria-controls'));
      panel.hidden=expanded;
      button.setAttribute('aria-expanded',String(!expanded));
      button.setAttribute('aria-label',`${expanded?'Expand':'Collapse'} ${panel.id.startsWith('projects')?'projects':'activity'}`);
    });
  });
  // Anchored navigation opens a folded section before scrolling.
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click',()=>{
      const target=get(link.hash.slice(1));
      const fold=target?.querySelector('.section-fold');
      if(fold?.getAttribute('aria-expanded')==='false')fold.click();
    });
  });
  document.querySelectorAll('.detail-toggle').forEach(button=>{
    button.addEventListener('click',()=>{
      const expanded=button.getAttribute('aria-expanded')==='true';
      get(button.getAttribute('aria-controls')).hidden=expanded;
      button.setAttribute('aria-expanded',String(!expanded));
    });
  });
  document.querySelectorAll('.filter').forEach(button=>{
    button.addEventListener('click',()=>{
      const category=button.dataset.filter;
      document.querySelectorAll('.filter').forEach(filter=>{
        const active=filter===button;
        filter.classList.toggle('active',active);
        filter.setAttribute('aria-pressed',String(active));
      });
      let count=0;
      document.querySelectorAll('.project').forEach(project=>{
        project.hidden=category!=='all'&&project.dataset.category!==category;
        if(!project.hidden)count++;
      });
      get('project-count').textContent=`${count} ${count===1?'entry':'entries'}`;
    });
  });
  // Scroll position, rather than click state, drives the document navigation.
  const sections=[...document.querySelectorAll('main section[id]')];
  let scrollPending=false;
  function updateNav(){
    scrollPending=false;
    let active=sections[0].id;
    for(const section of sections)if(section.getBoundingClientRect().top<innerHeight*.4)active=section.id;
    if(innerHeight+scrollY>=document.documentElement.scrollHeight-5)active='contact';
    document.querySelectorAll('[data-nav]').forEach(link=>{
      const selected=link.dataset.nav===active;
      link.classList.toggle('active',selected);
      if(selected)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    });
  }
  addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateNav);}},{passive:true});
  updateNav();

  function renderStats(status='snapshot') {
    get('stat-repos').textContent=String(stats.profile.publicRepos);
    get('stat-followers').textContent=String(stats.profile.followers);
    const hours=get('stat-hours');
    hours.replaceChildren();
    const timeParts=stats.coding.displayTime.match(/^(\d+)h(?: (\d+)m)?$/);
    hours.dataset.unavailable=String(!timeParts);
    if(timeParts){
      hours.append(document.createTextNode(timeParts[1]));
      const h=document.createElement('span');h.textContent='h';hours.append(h);
      if(timeParts[2]){hours.append(document.createTextNode(' '+timeParts[2]));const m=document.createElement('span');m.textContent='m';hours.append(m);}
    }else hours.textContent=stats.coding.displayTime;
    const source=get('github-status');
    source.dataset.status=status;
    const stamp=dateText(stats.profile.fetchedAt);
    let label=stats.profile.source==='live'?`GitHub profile refreshed · ${stamp}`:stats.profile.source==='cached'?`Cached GitHub profile · ${stamp}`:`GitHub snapshot · ${stamp}`;
    if(status==='offline')label+= ' · live refresh unavailable';
    if(status==='partial')label+= ' · some sources unavailable';
    if(status==='loading')label+=' · checking public sources';
    if(status==='live')label=`GitHub refreshed · ${stamp}`;
    source.querySelector('span').textContent=label;
    for(const project of PROJECTS){
      const entry=stats.repositories[project.repo];
      const metric=document.querySelector(`[data-stars-for="${project.repo}"]`);
      metric.textContent=entry.available?String(entry.stars):'—';
      metric.parentElement.title=entry.available?`Repository stars · ${entry.source} · observed ${dateText(entry.fetchedAt)}`:'This repository is no longer publicly available.';
      const article=document.querySelector(`[data-project="${project.id}"]`);
      article.dataset.available=String(entry.available);
      if(!entry.available){
        article.querySelector('.project-link').title='Previously public; currently unavailable.';
        metric.setAttribute('aria-label','Repository no longer publicly available');
      }else metric.removeAttribute('aria-label');
    }
    get('language-list').innerHTML=languagesHtml(stats.coding);
    get('coding-date').textContent=`WakaTime · published profile snapshot observed ${dateText(stats.coding.fetchedAt)}.`;
    get('yaml-source').textContent=asYaml(stats);
  }
  async function refresh() {
    if(refreshing)return;
    refreshing=true;
    const button=get('refresh-stats');button.disabled=true;button.setAttribute('aria-busy','true');
    renderStats('loading');
    try{
      const result=await refreshStats(stats);
      stats=result.stats;
      cacheStats(storage,stats);
      renderStats(result.status);
    }catch{renderStats('offline');}
    finally{button.disabled=false;button.removeAttribute('aria-busy');refreshing=false;}
  }
  get('refresh-stats').addEventListener('click',refresh);
  renderStats(cached?'cached':'snapshot');
  // One initial public refresh, then on demand. No polling; cached profile data lasts 15 minutes.
  if(!cached)void refresh();

  const dialog=get('source-dialog');
  get('open-source').addEventListener('click',()=>{
    get('yaml-source').textContent=asYaml(stats);
    dialog.showModal();document.body.classList.add('dialog-open');
  });
  get('close-source').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
  });
  get('copy-yaml').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(asYaml(stats));notice('YAML copied. Indentation included.');}
    catch{notice('Clipboard unavailable here. Use download .yml instead.');}
  });
  get('download-yaml').addEventListener('click',()=>{
    const url=URL.createObjectURL(new Blob([asYaml(stats)],{type:'application/yaml;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='aaron.yml';
    document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  addEventListener('pagehide',event=>{if(!event.persisted)anchor.destroy();});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initializePortfolio,{once:true});
else initializePortfolio();
