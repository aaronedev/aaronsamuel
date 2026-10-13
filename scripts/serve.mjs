import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { watch } from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import './build.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../dist');
const port=Number(process.argv[2]??process.env.PORT??4173);
if(!Number.isInteger(port)||port<1024||port>65535)throw new Error('Provide a valid local port between 1024 and 65535.');
const server=createServer(async(req,res)=>{
  try{
    if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
    const path=new URL(req.url,'http://localhost').pathname;
    const file=path==='/'||path==='/index.html'?'index.html':path==='/aaron.yml'?'aaron.yml':null;
    if(!file){res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');return;}
    const content=await readFile(resolve(root,file));
    res.writeHead(200,{'Content-Type':file.endsWith('.html')?'text/html; charset=utf-8':'application/yaml; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD'?undefined:content);
  }catch{res.writeHead(500);res.end('Unable to read built site.');}
});
server.on('error',error=>{console.error(error.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`Portfolio: http://127.0.0.1:${port} (rebuilds on src/ changes; reload the page)`));
// Rebuild dist/ when anything in src/ changes, so theme tweaks show on reload.
const src=resolve(dirname(fileURLToPath(import.meta.url)),'../src');
let timer=0,building=false,again=false;
function rebuild(){
  if(building){again=true;return;}
  building=true;
  spawn(process.execPath,[resolve(src,'../scripts/build.mjs')],{stdio:'inherit'}).on('exit',()=>{building=false;if(again){again=false;rebuild();}});
}
watch(src,{recursive:true},()=>{clearTimeout(timer);timer=setTimeout(rebuild,120);});
