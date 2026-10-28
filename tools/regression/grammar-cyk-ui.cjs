const watchdog = setTimeout(() => { console.error('Browser regression exceeded 180 seconds.'); process.exit(1); }, 180000);
const fs=require('fs'), http=require('http'), path=require('path');
const {chromium}=require('playwright');
const root=path.resolve(process.env.GRAMMAR_TEST_ROOT || path.resolve(__dirname, '../..'));
const server=http.createServer((req,res)=>{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root)){res.writeHead(403);return res.end()}fs.readFile(f,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return}const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json'};res.setHeader('Content-Type',types[path.extname(f)]||'application/octet-stream');res.end(data)})});



const assert=require('node:assert/strict');
const {closeTestBrowser}=require('./grammar-unit-browser-cleanup.cjs');
(async()=>{
console.log('Starting browser regression');
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base='http://127.0.0.1:'+server.address().port;
let browserServer, browser, context;
try {
browserServer=await chromium.launchServer({channel:process.env.BROWSER_CHANNEL || 'msedge',headless:true,timeout:60000});
browser=await chromium.connect(browserServer.wsEndpoint());
console.log('Browser launched');
context=await browser.newContext({viewport:{width:1200,height:850},acceptDownloads:true});
await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
console.log('Context ready');
const p=await context.newPage();console.log('Page ready');p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(60000);
const errors=[],dialogs=[];p.on('pageerror',e=>{errors.push(e.message);console.error('Page error:',e.message)});p.on('dialog',async d=>{dialogs.push(d.message());await d.dismiss()});
p.removeAllListeners('dialog');
p.on('dialog', async d => { dialogs.push(d.message()); if(d.type()==='confirm') await d.accept(); else await d.dismiss(); });

const badRequests=[];context.on('response',response=>{if(response.status()===404 && !response.url().endsWith('favicon.ico')) badRequests.push(response.url());});
await p.goto(base+'/AV/OpenFLAP/grammarEditor.html',{waitUntil:'domcontentloaded'});
await p.waitForSelector('.jsavmatrix');
await p.locator('#loadfile').setInputFiles({name:'cnf.jff',mimeType:'text/xml',buffer:Buffer.from('<structure><type>grammar</type><production><left>Q</left><right>AB</right></production><production><left>A</left><right>a</right></production><production><left>B</left><right>b</right></production></structure>')});
await p.waitForFunction(()=>arr[0][0]==='Q');
await p.locator('.grammar-menu summary').filter({hasText:/^Input$/}).click();
const opened=p.waitForEvent('popup');
await p.locator('#cykbutton').click();
const cyk=await opened;cyk.on('pageerror',e=>errors.push(e.message));
await cyk.waitForSelector('#parsebutton');
assert.ok(cyk.url().endsWith('/AV/OpenFLAP/CYKParser.html'));
await cyk.locator('#input').fill('ab');await cyk.locator('#parsebutton').click();
assert.match(await cyk.locator('#message').innerText(),/"ab" accepted/);
await cyk.locator('#stepbutton').click();assert.match(await cyk.locator('#progress').innerText(),/1 \/ 2/);
await cyk.locator('#completebutton').click();
assert.match(await cyk.locator('#tableArea').innerText(),/Q/);
await cyk.locator('#flipbutton').click();await cyk.locator('#derivationbutton').click();
assert.equal(await cyk.locator('#tree li').count(),5);
for(const input of ['ba','']) {
 await cyk.locator('#input').fill(input);await cyk.locator('#parsebutton').click();
 assert.match(await cyk.locator('#message').innerText(),/rejected/);
 assert.equal(await cyk.locator('#derivationbutton').isDisabled(),true);
 assert.equal(await cyk.locator('#derivation').isVisible(),false);
}
await cyk.locator('#backbutton').click();await cyk.waitForSelector('.jsavmatrix');
assert.equal(await cyk.evaluate(()=>arr[0][0]),'Q');
await cyk.evaluate(()=>localStorage.setItem('cykGrammar','not json'));
await cyk.goto(base+'/AV/OpenFLAP/CYKParser.html');assert.equal(await cyk.locator('#parsebutton').isDisabled(),true);
await cyk.evaluate(()=>localStorage.setItem('cykGrammar',JSON.stringify([['S','→','λ']])));
await cyk.reload();await cyk.locator('#parsebutton').click();assert.match(await cyk.locator('#message').innerText(),/accepted/);
await cyk.locator('#derivationbutton').click();assert.match(await cyk.locator('#tree').innerText(),/λ/);
await p.evaluate(()=>{arr=[['S','→','aS'],['S','→','b'],['','→','']];});
await p.locator('.grammar-menu summary').filter({hasText:/^Input$/}).click();
await p.locator('#cykbutton').click();
assert.ok(dialogs.some(message=>message.includes('requires CNF')));
assert.equal(await p.evaluate(()=>arr[0][2]),'aS');
assert.deepEqual(errors,[]);assert.deepEqual(badRequests,[]);
console.log('PASS actual CYK menu/popup, table steps/flip/tree, repeated input, empty input, invalid storage, return to editor, non-CNF refusal; no 404/page errors');
} finally {
  console.log('Closing test browser');
  try {
    const mode = await closeTestBrowser(context, browserServer, {client: browser});
    console.log('PASS browser cleanup: ' + mode + '; process exited');
  } finally {
    server.closeAllConnections();
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    clearTimeout(watchdog);
  }
}
})().catch(error => {console.error(error); process.exit(1);});
