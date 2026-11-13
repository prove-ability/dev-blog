import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
const state=JSON.parse(readFileSync('WORKFLOW.json','utf8'));
const requirements=new Map(state.requirements.map(r=>[r.id,r]));
function visit(id,stack=[]){assert.ok(requirements.has(id),`Unknown dependency ${id}`);assert.ok(!stack.includes(id),'Dependency cycle');for(const dependency of requirements.get(id).dependsOn)visit(dependency,[...stack,id]);}
for(const id of requirements.keys())visit(id);
const ids=new Set();
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);}
for(const file of walk('src/content/posts').filter(f=>f.endsWith('.md'))){const text=readFileSync(file,'utf8');const id=text.match(/^postId:\s*([a-z0-9-]+)\s*$/m)?.[1];assert.ok(id,`Missing stable postId: ${file}`);assert.ok(!ids.has(id),`Duplicate postId: ${id}`);ids.add(id);}
console.log(`Preflight: ${requirements.size} requirements; ${ids.size} unique post IDs.`);
