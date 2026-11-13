import {writeFileSync,readFileSync,rmSync,existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const path='src/content/posts/verification-fixture.md';
const futurePath='src/content/posts/verification-future.md';
if(existsSync(path)||existsSync(futurePath))throw new Error('Verification fixture path already exists');
function build(testComments=false){const env={...process.env,ASTRO_TELEMETRY_DISABLED:'1',...(testComments?{PUBLIC_GISCUS_REPO:'example/example',PUBLIC_GISCUS_REPO_ID:'test-repo',PUBLIC_GISCUS_CATEGORY_ID:'test-category'}:{})};for(const args of [['sync','--force'],['build']]){const r=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs',...args],{stdio:'inherit',env});if(r.status!==0)throw new Error(`Astro ${args[0]} failed`);}}
const fixture=(status)=>`---\ntitle: Verification fixture & notes\ndescription: Temporary build test\npostId: verification-fixture\ndate: 2020-01-01\nstatus: ${status}\ntags: []\n---\n\nFixture article body.\n`;
function assertExcluded(id){
 assert.ok(!existsSync(`dist/posts/${id}/index.html`),'Unpublished route exposed');
 for(const file of ['dist/index.html','dist/rss.xml','dist/sitemap.xml'])assert.ok(!readFileSync(file,'utf8').includes(id),`Unpublished article leaked into ${file}`);
 assert.ok(!existsSync(`dist/preview/${id}/index.html`),'Local preview exposed in production');
}
try{
 writeFileSync(futurePath,fixture('published').replace('verification-fixture','verification-future').replace('2020-01-01','2099-01-01'));
 writeFileSync(path,fixture('draft'));build();
 assertExcluded('verification-fixture');assertExcluded('verification-future');
 assert.ok(!readFileSync('dist/index.html','utf8').includes('Verification fixture'),'Draft listed');
 writeFileSync(path,fixture('published'));build(true);
 const article=readFileSync('dist/posts/verification-fixture/index.html','utf8');
 assert.ok(article.includes('Fixture article body.'));
 assert.ok(article.includes('data-term="post:verification-fixture"'));
 assert.ok(article.includes('data-mapping="specific"'));
 assert.ok(article.includes('작성 원칙 보기'));
 assert.ok(readFileSync('dist/rss.xml','utf8').includes('Verification fixture &amp; notes'));
 assert.ok(readFileSync('dist/sitemap.xml','utf8').includes('/posts/verification-fixture/'));
 assertExcluded('verification-future');
 assert.ok(!existsSync('dist/preview/verification-fixture/index.html'));
 console.log('Integration checks: draft/future excluded everywhere; published Markdown, feed and stable comment ID rendered.');
}finally{rmSync(path,{force:true});rmSync(futurePath,{force:true});build();}
assert.ok(!existsSync('dist/posts/verification-fixture/index.html'),'Test fixture remained in release');
assertExcluded('verification-fixture');assertExcluded('verification-future');
const home=readFileSync('dist/index.html','utf8');
assert.ok(home.includes('<title>개발의 기록</title>'),'Homepage title duplicated');
assert.ok(home.includes('AI가 초안을 정리하고'));
assert.ok(readFileSync('dist/about/index.html','utf8').includes('직접 하지 않은 일을 경험한 것처럼'));
assert.ok(readFileSync('dist/404.html','utf8').includes('noindex, nofollow'));
assert.ok(readFileSync('dist/robots.txt','utf8').includes('sitemap.xml'));
console.log('Release output contains no test article.');
