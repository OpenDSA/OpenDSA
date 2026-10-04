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

async function load(rules) {
 await p.goto(base+'/AV/OpenFLAP/grammarEditor.html', {waitUntil:'domcontentloaded'});
 await p.waitForSelector('.jsavmatrix');
 const xml='<structure><type>grammar</type>'+rules.map(([l,r])=>'<production><left>'+l+'</left><right>'+r+'</right></production>').join('')+'</structure>';
 await p.locator('#loadfile').setInputFiles({name:'test.jff',mimeType:'text/xml',buffer:Buffer.from(xml)});
 await p.waitForFunction(expected => arr[0][0] === expected[0] && arr[0][2] === expected[1], rules[0]);
}
async function transform() {
 await p.locator('.grammar-menu summary').filter({hasText:/^Convert$/}).click();
 await p.locator('#transformbutton').click();
}
await load([['A','a'],['B','b']]);
await transform();
await p.locator('.jsavmatrix').first().locator('.jsavarray').nth(0).locator('li').first().click();
await p.locator('.jsavmatrix').first().locator('.jsavarray').nth(1).locator('li').first().click();
const nonSPopup=p.waitForEvent('popup');
await p.locator('.jsavmatrix').last().locator('.jsavarray').nth(1).locator('li').first().click();
const nonS=await nonSPopup;
await nonS.waitForSelector('.jsavmatrix');
assert.deepEqual(await nonS.evaluate(()=>arr.filter(r=>r[0]).map(r=>r.join(''))), ['A鈫抋']);
await nonS.close();
console.log('PASS non-S useless removal through GUI and export');
assert.deepEqual(errors,[]);
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
