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
await p.goto(base+'/AV/OpenFLAP/grammarEditor.html', {waitUntil:'domcontentloaded'});
await p.waitForSelector('.jsavmatrix');
await p.locator('#loadfile').setInputFiles({name:'undefined-unit.jff',mimeType:'text/xml',buffer:Buffer.from('<structure><type>grammar</type><production><left>S</left><right>A</right></production>'+(process.env.UNIT_EMPTY_LANGUAGE ? '' : '<production><left>S</left><right>b</right></production>')+'</structure>')});
await p.waitForFunction(() => arr[0][2] === 'A');
await p.locator('.grammar-menu summary').filter({hasText:/^Convert$/}).click();
await p.locator('#transformbutton').click();
assert.deepEqual(errors, []);
const nodes = p.locator('.jsavgraph .jsavnode');
await nodes.filter({hasText:/^S$/}).click();
await nodes.filter({hasText:/^A$/}).click();
await p.waitForFunction(() => document.body.innerText.includes('Modify the grammar to remove unit productions'));
const popup=p.waitForEvent('popup');
await p.locator('.jsavmatrix').last().locator('.jsavarray').first().locator('li').first().click();
const exported=await popup;
exported.on('pageerror',e=>errors.push(e.message));
await exported.waitForLoadState('domcontentloaded');
await exported.waitForSelector('.jsavmatrix');
assert.deepEqual(await exported.evaluate(() => arr.filter(r=>r[0]).map(r=>r.join(''))), process.env.UNIT_EMPTY_LANGUAGE ? [] : ['S→b']);
assert.ok(dialogs.includes('Grammar completed; export?'));
assert.deepEqual(errors, []);
console.log('PASS undefined-variable graph, unit removal and export; empty language='+Boolean(process.env.UNIT_EMPTY_LANGUAGE)+'; no page errors.');
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
