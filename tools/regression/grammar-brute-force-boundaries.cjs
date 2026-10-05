const watchdog = setTimeout(() => { console.error('Browser regression exceeded 180 seconds.'); process.exit(1); }, 180000);
const fs=require('fs'), http=require('http'), path=require('path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname, '../..');
const server=http.createServer((req,res)=>{if(req.url==='/fixture.html'){res.setHeader('Content-Type','text/html');res.end('<!doctype html><title>Test fixture</title>');return;}const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root)){res.writeHead(403);return res.end()}fs.readFile(f,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return}const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json'};res.setHeader('Content-Type',types[path.extname(f)]||'application/octet-stream');res.end(data)})});



const assert=require('node:assert/strict');
(async()=>{
console.log('Starting browser regression');
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base='http://127.0.0.1:'+server.address().port;
const browserServer=await chromium.launchServer({channel:process.env.BROWSER_CHANNEL || 'msedge',headless:true,timeout:60000});
const browser=await chromium.connect(browserServer.wsEndpoint());
console.log('Browser launched');
try{
const context=await browser.newContext({viewport:{width:1200,height:850},acceptDownloads:true});
await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
console.log('Context ready');
const p=await context.newPage();console.log('Page ready');p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(60000);
const errors=[],dialogs=[];p.on('pageerror',e=>{errors.push(e.message);console.error('Page error:',e.message)});p.on('dialog',async d=>{dialogs.push(d.message());await d.dismiss()});

async function load(rules){await p.goto(base+'/fixture.html',{waitUntil:'domcontentloaded'});await p.evaluate(r=>{localStorage.clear();if(r)localStorage.setItem('grammars',JSON.stringify(r.map(([l,v])=>[l,'→',v])));},rules);await p.goto(base+'/AV/OpenFLAP/MBFParse.html',{waitUntil:'domcontentloaded'});}
async function run(){await p.locator('#runinputsbutton').click();await p.waitForFunction(()=>document.querySelector('#message').textContent.startsWith('Finished'));}
async function trace(i,expected){await p.locator('#table tbody tr').nth(i).getByRole('button',{name:'Accept',exact:true}).click();await p.locator('#lastStep').click();assert.equal(await p.locator('#derivation tbody tr').last().locator('td').last().innerText(),expected);assert.equal(await p.locator('#tree svg').count(),1);}
await load([['S','λ']]);await p.locator('#input0').fill('!');await p.locator('#input1').fill('λ');await run();await trace(0,'λ');await trace(1,'λ');console.log('PASS empty input spellings and trace');
await load([['S','aS'],['S','b']]);for(let i=3;i<12;i++)await p.locator('#addinputbutton').click();for(let i=0;i<12;i++)await p.locator('#input'+i).fill('a'.repeat(i)+'b');await run();await trace(10,'a'.repeat(10)+'b');await trace(11,'a'.repeat(11)+'b');await p.locator('#deleterowbutton').click();assert.equal(await p.locator('#table input').count(),11);assert.equal(await p.locator('#trace').isVisible(),false);console.log('PASS 12 rows and correct trace selection');
for(const [rules,input] of [[ [['S','AaA'],['A','λ'],['A','b']], 'ba'],[ [['S','AB'],['AB','c']], 'c']]){await load(rules);await p.locator('#input0').fill(input);await run();await trace(0,input);assert.equal(await p.locator('#tree line').count()>0,true);}console.log('PASS repeated nullable and multi-symbol LHS trace');
await load([['S','SS'],['S','λ']]);await p.locator('#input0').fill('b');await run();assert.ok((await p.locator('#table tbody tr').first().innerText()).includes('Undetermined'));await p.locator('#clearbutton').click();await p.locator('#table input').first().fill('!');await run();await trace(0,'λ');console.log('PASS search cutoff and recovery');
await load(null);assert.ok((await p.locator('#message').innerText()).includes('No valid grammar'));assert.equal(await p.locator('#runinputsbutton').isDisabled(),true);assert.deepEqual(errors,[]);console.log('PASS missing grammar; no page errors');
}catch(error){console.error(error);throw error;}finally{console.log('Closing browser');await browser.close();
let cleanupTimer;
try { await Promise.race([browserServer.close(), new Promise(resolve => { cleanupTimer = setTimeout(() => { console.log('Forcing test browser cleanup'); const child = browserServer.process();
if (child.exitCode === null) {
  if (process.platform === 'win32') {
    try { require('node:child_process').execFileSync('taskkill', ['/pid', String(child.pid), '/t', '/f'], {timeout: 5000, stdio: 'ignore'}); } catch (error) { console.warn('Test browser cleanup did not complete:', error.message); }
  } else { child.kill('SIGKILL'); }
}
resolve(); }, 10000); })]); } finally { clearTimeout(cleanupTimer); server.closeAllConnections();server.close();clearTimeout(watchdog); }}
})().then(() => process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
