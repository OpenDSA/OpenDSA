const watchdog = setTimeout(() => { console.error('Browser regression exceeded 180 seconds.'); process.exit(1); }, 180000);
const fs=require('fs'), http=require('http'), path=require('path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname, '../..');
const server=http.createServer((req,res)=>{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root)){res.writeHead(403);return res.end()}fs.readFile(f,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return}const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json'};res.setHeader('Content-Type',types[path.extname(f)]||'application/octet-stream');res.end(data)})});



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
await p.goto(base+'/AV/OpenFLAP/grammarEditor.html',{waitUntil:'domcontentloaded'});
console.log('Editor document loaded');await p.waitForSelector('.jsavmatrix');console.log('Editor ready');
const menu=name=>p.locator('.grammar-menu summary').filter({hasText:new RegExp('^'+name+'$')});

await p.locator('#loadfile').setInputFiles({name:'bf.jff',mimeType:'text/xml',buffer:Buffer.from('<structure><type>grammar</type><production><left>S</left><right>aS</right></production><production><left>S</left><right>b</right></production></structure>')});
await p.waitForFunction(()=>arr[0][2]==='aS');console.log('Grammar loaded');
await menu('Input').click();const popup=p.waitForEvent('popup');await p.locator('#mbfpbutton').click();const q=await popup;console.log('Parser opened');q.on('pageerror',e=>errors.push(e.message));await q.waitForLoadState('domcontentloaded');
await q.locator('#input0').fill('b');await q.locator('#input1').fill('ab');await q.locator('#input2').fill('aab');await q.locator('#addinputbutton').click();await q.locator('#input3').fill('aa');await q.locator('#runinputsbutton').click();await q.waitForFunction(()=>document.querySelector('#message').textContent.startsWith('Finished'));
assert.deepEqual(await q.locator('#table tbody tr td:nth-child(2)').allTextContents(),['Accept','Accept','Accept','Reject']);
await q.locator('#table tbody tr').nth(2).getByRole('button',{name:'Accept',exact:true}).click();await q.locator('#lastStep').click();assert.ok((await q.locator('#derivation').innerText()).includes('aab'));assert.equal(await q.locator('#tree svg').count(),1);await q.locator('#previousStep').click();assert.equal(await q.locator('#stepStatus').innerText(),'Step 2 of 3');

await q.locator('#input2').fill('aa');await q.locator('#runinputsbutton').click();await q.waitForFunction(()=>document.querySelector('#message').textContent.startsWith('Finished'));assert.equal(await q.locator('#table tbody tr').nth(2).locator('td').last().innerText(),'Reject');assert.equal(await q.locator('#trace').isVisible(),false);
await q.locator('#clearbutton').click();assert.equal(await q.locator('#table input').count(),3);assert.equal(await q.locator('#input4').inputValue(),'');
await q.locator('#backbutton').click();await q.waitForSelector('.jsavmatrix');assert.deepEqual(await q.evaluate(()=>arr.filter(r=>r[0]).map(r=>r.join(''))),['S→aS','S→b']);assert.deepEqual(errors,[]);console.log('PASS: editor launch, multiple inputs, derivation steps/graph, stale-result reset, Clear, Back with grammar preserved; no page errors.');
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
