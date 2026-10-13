import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { freshStats, asYaml } from '../src/content.mjs';
import { projectsHtml, languagesHtml, escapeHtml } from '../src/render.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const stats=freshStats();
const files=['content.mjs','render.mjs','github.mjs','particles.mjs','gravity.mjs','app.mjs'];
const code=(await Promise.all(files.map(file=>readFile(resolve(root,'src',file),'utf8'))))
  .map(text=>text.replace(/^import .*?;\s*$/gm,'').replace(/^export /gm,''))
  .join('\n\n');
const css=await readFile(resolve(root,'src/styles.css'),'utf8');
const template=await readFile(resolve(root,'src/layout.html'),'utf8');
// <meta theme-color> and the favicon can't use CSS vars; mirror the theme tokens.
const token=name=>{
  const hex=css.match(new RegExp(`--${name}:\\s*#([0-9a-fA-F]{3,8})\\s*;`))?.[1];
  if(!hex)throw new Error(`styles.css :root must define --${name} as a hex color.`);
  return hex;
};
const html=template
  .replaceAll('__BG__',token('bg'))
  .replaceAll('__ACCENT__',token('violet'))
  .replace('/*__STYLES__*/',()=>css)
  .replace('<!--__PROJECTS__-->',()=>projectsHtml(stats))
  .replace('<!--__LANGUAGES__-->',()=>languagesHtml(stats.coding))
  .replace('<!--__YAML__-->',()=>escapeHtml(asYaml(stats)))
  .replace('/*__SCRIPT__*/',()=>`(()=>{\n'use strict';\n${code.replace(/<\/script/gi,'<\\/script')}\n})();`);
if(/<!--__(?:PROJECTS|LANGUAGES|YAML)__-->|\/\*__(?:STYLES|SCRIPT)__\*\/|__(?:BG|ACCENT)__/.test(html))throw new Error('Unresolved build template.');
await mkdir(resolve(root,'dist'),{recursive:true});
await writeFile(resolve(root,'dist/index.html'),html);
await writeFile(resolve(root,'dist/aaron.yml'),asYaml(stats));
console.log(`Built dist/index.html (${(Buffer.byteLength(html)/1024).toFixed(1)} KiB) and dist/aaron.yml. No external assets or runtime dependencies.`);
