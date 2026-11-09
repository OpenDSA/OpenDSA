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
let context;
const browserServer=await chromium.launchServer({channel:process.env.BROWSER_CHANNEL || 'msedge',headless:true,timeout:60000});
const browser=await chromium.connect(browserServer.wsEndpoint());
console.log('Browser launched');
try{
context=await browser.newContext({viewport:{width:1200,height:850},acceptDownloads:true});
await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
console.log('Context ready');
const p=await context.newPage();console.log('Page ready');p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(60000);
const errors=[],dialogs=[];p.on('pageerror',e=>{errors.push(e.message);console.error('Page error:',e.message)});p.on('dialog',async d=>{dialogs.push(d.message());await d.dismiss()});
await p.goto(base+'/AV/OpenFLAP/exercises/FLAssignments/Grammar/GramIntro3str.html', {waitUntil:'domcontentloaded'});
await p.locator('input[name=grade]').waitFor({state:'visible'});
for (const [rules, expected] of [
  [[['S','S'], ['S','aSb'], ['S','ab']], '5 / 7'],
  [[['S','S'], ['S','aA'], ['S','b'], ['S','bB'], ['A','b'], ['B','ab']], '7 / 7'],
  [[['S','aA'], ['S','b'], ['A','b']], '6 / 7']
]) {
  await p.evaluate(rules => { window.arr = rules.map(([l,r]) => [l,'→',r]); }, rules);
  await p.locator('input[name=grade]').click();
  const feedback = await p.locator('#percentage').innerText();
  assert.ok(feedback.includes(expected), feedback);
  console.log('PASS real grading button: '+feedback);
}

await p.evaluate(() => {
  window.savedSearchLimits = {...ParseTreeController.searchLimits};
  window.scoreSubmissions = 0;
  Object.defineProperty(window, 'frameElement', {configurable: true, value: {src: '?ExerciseId=123'}});
  const ajax = $.ajax;
  $.ajax = function (options) {
    if (options.url === '/student_exercise_progress/new_progress') {
      window.scoreSubmissions++;
      return;
    }
    return ajax.apply(this, arguments);
  };
  window.arr = [['S','→','SS'], ['S','→','λ']];
});
await p.locator('input[name=grade]').click();
assert.match(await p.locator('#percentage').innerText(), /Search limit reached/);
assert.match(dialogs[dialogs.length - 1], /no score was submitted/);
assert.equal(await p.evaluate(() => window.scoreSubmissions), 0);
assert.equal(await p.locator('#testResults').isVisible(), false);
console.log('PASS real growing grammar stops without submitting a score');
await p.evaluate(() => {window.arr = [['S','→','b'], ['S','→','ab'], ['S','→','bab']];});
await p.locator('input[name=grade]').click();
assert.match(await p.locator('#percentage').innerText(), /7 \/ 7/);
assert.equal(await p.evaluate(() => window.scoreSubmissions), 1);
assert.match(dialogs[dialogs.length - 1], /100/);
console.log('PASS normal grading recovers after search limit');
await p.locator('input[name=reset]').click();
assert.equal(await p.evaluate(() => arr.filter(row => row[0]).length), 0);
assert.deepEqual(errors, []);
console.log('PASS exercise reset and no page errors');
} finally {
  try {
    if (context) await context.close();
    await browser.close();
    await browserServer.close();
    assert.notEqual(browserServer.process().exitCode, null);
    console.log('PASS browser closed');
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    clearTimeout(watchdog);
  }
}
})().catch(e=>{console.error(e);process.exitCode=1});
