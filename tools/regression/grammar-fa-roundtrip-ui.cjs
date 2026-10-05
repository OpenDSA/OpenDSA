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

async function readDownload(download) {
 const chunks=[]; for await (const chunk of await download.createReadStream()) chunks.push(chunk);
 return Buffer.concat(chunks).toString('utf8');
}
for (const [kind,rules] of [['FA',[['S','aS'],['S','b']]]]) {
 await load(rules);
 await p.locator('.grammar-menu summary').filter({hasText:/^Convert$/}).click();
 await p.locator(kind==='FA'?'#convertRLGbutton':'#convertCFGbuttonLL').click();
 assert.deepEqual(errors,[]);
 const download=p.waitForEvent('download');
 if(kind==='FA') await p.locator('#completeallbutton').click();
 else for(let i=0;i<rules.length;i++) await p.locator('.jsavmatrix').first().locator('.jsavarray').nth(i).locator('li').first().click();
 const file=await download;
 const xml=await readDownload(file);
 const editor=await context.newPage();
 editor.on('pageerror',e=>{errors.push(e.message); console.log('EDITOR ERROR', e.message);});
 editor.on('dialog',d=>d.dismiss());
 await editor.goto(base+'/AV/OpenFLAP/'+(kind==='FA'?'FA.html':'PDAEditor.html'),{waitUntil:'domcontentloaded'});
 await editor.waitForSelector('.jsavgraph');
 await editor.locator('#loadFile').setInputFiles({name:'converted.jff',mimeType:'text/xml',buffer:Buffer.from(xml)});
 await editor.waitForFunction(count=>$('.jsavgraph:visible .jsavnode:visible').length===count,kind==='FA'?2:3).catch(async e=>{console.log(await editor.locator('.jsavgraph').evaluateAll(gs=>gs.map(g=>({text:g.textContent,html:g.outerHTML.slice(0,600)}))));throw e;});
 // Invoke the existing menu action, then operate the real filename dialog.
 await editor.locator('#saveButton').evaluate(el=>el.click());
 const name=kind==='FA'?'#saveFAName':'#savePDAName';
 await editor.locator(name).fill('roundtrip');
 const saved=editor.waitForEvent('download');
 await editor.locator(name).press('Enter');
 const second=await readDownload(await saved);
 const canonical=async text=>editor.evaluate(text=>{
  const doc=new DOMParser().parseFromString(text,'text/xml');
  if(doc.querySelector('parsererror')) throw new Error('Invalid XML');
  return {
   states:Array.from(doc.querySelectorAll('state')).map(s=>[s.id,!!s.querySelector('initial'),!!s.querySelector('final')]).sort(),
   edges:Array.from(doc.querySelectorAll('transition')).map(t=>['from','to','read','pop','push'].map(tag=>((t.querySelector(tag)||{}).textContent||'').replace(/λ|ε/g,''))).sort()
  };
 },text);
 assert.deepEqual(await canonical(second),await canonical(xml));
 const machine=await canonical(second);
 function accepts(input) {
  const queue=machine.states.filter(s=>s[1]).map(s=>[s[0],0,kind==='FA'?'':'Z']);
  const seen=new Set();
  for(let i=0;i<queue.length;i++) {
   assert.ok(i<10000,'Unexpected unbounded test simulation');
   const [state,pos,stack]=queue[i];
   const key=JSON.stringify(queue[i]); if(seen.has(key)) continue; seen.add(key);
   if(pos===input.length && machine.states.some(s=>s[0]===state && s[2])) return true;
   for(const [from,to,read,pop,push] of machine.edges) {
    if(from===state && input.startsWith(read,pos) && stack.startsWith(pop))
     queue.push([to,pos+read.length,push+stack.slice(pop.length)]);
   }
  }
  return false;
 }
 for(const input of ['', 'b','ab','aab','aa','ba'])
  assert.equal(accepts(input),rules.length===1?input==='':/^a*b$/.test(input),kind+' '+input);

 await editor.locator('#loadFile').setInputFiles({name:'roundtrip.jff',mimeType:'text/xml',buffer:Buffer.from(second)});
 await editor.waitForFunction(count=>$('.jsavgraph:visible .jsavnode:visible').length===count,kind==='FA'?2:3).catch(async e=>{console.log(await editor.locator('.jsavgraph').evaluateAll(gs=>gs.map(g=>({text:g.textContent,html:g.outerHTML.slice(0,600)}))));throw e;});
 assert.deepEqual(errors,[]);
 await editor.close();
 console.log('PASS '+kind+' '+JSON.stringify(rules)+': convert, download, editor load/save/reload; XML transitions preserved');
}
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
