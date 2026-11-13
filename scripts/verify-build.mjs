import {writeFileSync,readFileSync,rmSync,existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const path='src/content/posts/verification-fixture.md';
if(existsSync(path))throw new Error('Verification fixture path already exists');
function build(testComments=false){const env={...process.env,ASTRO_TELEMETRY_DISABLED:'1',...(testComments?{PUBLIC_GISCUS_REPO:'example/example',PUBLIC_GISCUS_REPO_ID:'test-repo',PUBLIC_GISCUS_CATEGORY_ID:'test-category'}:{})};for(const args of [['sync','--force'],['build']]){const r=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs',...args],{stdio:'inherit',env});if(r.status!==0)throw new Error(`Astro ${args[0]} failed`);}}
const fixture=(status)=>`---\ntitle: Verification fixture\ndescription: Temporary build test\npostId: verification-fixture\ndate: 2020-01-01\nstatus: ${status}\ntags: []\n---\n\nFixture article body.\n`;
try{
 writeFileSync(path,fixture('draft'));build();
 assert.ok(!existsSync('dist/posts/verification-fixture/index.html'),'Draft route exposed');
 assert.ok(!readFileSync('dist/index.html','utf8').includes('Verification fixture'),'Draft listed');
 writeFileSync(path,fixture('published'));build(true);
 const article=readFileSync('dist/posts/verification-fixture/index.html','utf8');
 assert.ok(article.includes('Fixture article body.'));
 assert.ok(article.includes('data-term="post:verification-fixture"'));
 assert.ok(article.includes('data-mapping="specific"'));
 console.log('Integration checks: draft excluded; published Markdown and stable comment ID rendered.');
}finally{rmSync(path,{force:true});build();}
assert.ok(!existsSync('dist/posts/verification-fixture/index.html'),'Test fixture remained in release');
console.log('Release output contains no test article.');
