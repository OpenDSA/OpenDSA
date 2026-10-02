const watchdog = setTimeout(() => { console.error('Browser regression exceeded 180 seconds.'); process.exit(1); }, 180000);
const fs=require('fs'), http=require('http'), path=require('path');
const {chromium}=require('playwright');
const root=path.resolve(process.env.GRAMMAR_TEST_ROOT || path.resolve(__dirname, '../..'));
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
const cases = [
  ['RegGramNFA1', [['S','b']], true],
  ['RegGramNFA2', [['S','b']], true],
  ['RegGramNFA1', [['S','ab']], true],
  ['RegGramNFA2', [['S','ab']], true],
  ['RegGramNFA1', [['S','λ'], ['S','b']], true],
  ['RegGramNFA2', [['S','λ'], ['S','b']], true],
  ['RegGramNFA1', [['S','A'], ['A','b']], true],
  ['RegGramNFA2', [['S','A'], ['A','b']], true],
  ['RegGramNFA1', [['S','bS'], ['S','a']], true],
  ['RegGramNFA2', [['S','Sb'], ['S','a']], true],
  ['RegGramNFA1', [['S','Sb'], ['S','a']], false],
  ['RegGramNFA2', [['S','bS'], ['S','a']], false]
];
for (const [exercise, rules, expected] of cases) {
  await p.goto(base+'/AV/OpenFLAP/exercises/FLAssignments/Regular/'+exercise+'.html', {waitUntil:'domcontentloaded'});
  await p.locator('input[name=grade]').waitFor({state:'visible'});
  await p.evaluate(rules => { window.arr = rules.map(([l,r]) => [l,'→',r]); }, rules);
  await p.locator('input[name=grade]').click();
  const typeRow = p.locator('#testResults tr').nth(1);
  const text = await typeRow.innerText();
  console.log(exercise+' '+JSON.stringify(rules)+': '+text);
  assert.equal(await typeRow.locator(expected ? '.correct' : '.wrong').count(), 1, text);
  assert.equal((await typeRow.locator('td').last().innerText()).trim(), expected ? 'Yes' : 'No');
  if (expected) {
    const feedback = await p.locator('#percentage').innerText();
    assert.ok(feedback.includes('Correct cases:'), feedback);
    if (rules.length === 1 && rules[0][1] === 'b') {
      const score = feedback.match(/(\d+)\s*\/\s*(\d+)/);
      assert.ok(score, feedback);
      assert.ok(Number(score[1]) < Number(score[2]), 'Passing linearity must not grant full language credit');
      console.log('PASS type acceptance still runs language tests: '+feedback);
    }
  }
}
await p.locator('input[name=reset]').click();
assert.equal(await p.evaluate(() => arr.filter(row => row[0]).length), 0);
assert.equal(await p.locator('input[name=grade]').count(), 1);
console.log('PASS exercise reset');
assert.deepEqual(errors, []);
console.log('PASS overlapping and directional grammar type checks on actual exercises; no page errors.');
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
