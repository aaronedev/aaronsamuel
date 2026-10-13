import { PROJECTS, SNAPSHOT_DATE } from './content.mjs';

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[ch]));
}
export const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>';
export const CHEVRON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m5 3 5 5-5 5"/></svg>';
export const STAR = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="m10 2 2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8Z"/></svg>';

export function projectHtml(project, index, stats) {
  const esc = escapeHtml;
  const metric = stats.repositories[project.repo];
  const available = metric?.available !== false;
  const stars = available ? metric?.stars ?? project.stars : '—';
  const link = 'https://github.com/' + project.repo;
  const palette = ['#bb7cff', '#00fff9', '#42ff97', '#fd7cff', '#29adff', '#f0f0f5'];
  return `<article class="project" data-category="${esc(project.category)}" data-project="${esc(project.id)}">
    <span class="project-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
    <div class="project-main"><div class="project-title-row"><span class="dash" aria-hidden="true">-</span><span class="key small">name:</span>
      <h3><a href="${link}" target="_blank" rel="noopener noreferrer" class="project-link">${esc(project.name)} ${ARROW}</a></h3>
      <span class="project-stars" title="Repository stars · observed ${esc(metric?.fetchedAt ?? SNAPSHOT_DATE)}">${STAR}<span data-stars-for="${esc(project.repo)}">${stars}</span></span>
    </div><div class="project-inner"><p class="project-description"><span class="key">about:</span> <span>${esc(project.description)}</span></p>
      <div class="project-bottom"><p class="project-stack"><span class="key">stack:</span> <span class="punctuation">[</span>${project.tags.map(tag => `<span class="tag">${esc(tag)}</span>`).join('<span class="punctuation">, </span>')}<span class="punctuation">]</span></p>
      <button type="button" class="detail-toggle" aria-expanded="false" aria-controls="detail-${esc(project.id)}" aria-label="Details for ${esc(project.name)}">details ${CHEVRON}</button></div>
      <div class="project-detail" id="detail-${esc(project.id)}" hidden><p>${esc(project.detail)}</p>
      ${project.palette ? `<div class="palette" aria-label="Violet Void color palette">${palette.map(color => `<span style="--swatch: ${color}" title="${color}"><i></i><code>${color}</code></span>`).join('')}</div>` : ''}
      <p class="comment"># ${esc(project.note)}</p><a href="${link}" target="_blank" rel="noopener noreferrer" class="text-link">${esc(project.repo)} ${ARROW}</a></div>
    </div></div></article>`;
}

export function projectsHtml(stats) { return PROJECTS.map((p, i) => projectHtml(p, i, stats)).join('\n'); }

export function languagesHtml(coding) {
  const esc = escapeHtml;
  return coding.languages.map(lang => `<div class="language-row"><span class="language-label"><i style="background:${esc(lang.color)}" aria-hidden="true"></i>${esc(lang.name)}<span class="punctuation">:</span></span><span class="language-bar" aria-hidden="true"><span style="width:${lang.percent}%;background:${esc(lang.color)}"></span></span><span class="language-percent">${lang.percent.toFixed(1)}<span class="punctuation">%</span></span></div>`).join('\n');
}
