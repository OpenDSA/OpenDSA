// Usage: NODE_PATH=<directory containing playwright> node grammar-initialization.cjs <repo> [--baseline]
// Uses a private loopback server and a headless browser; never contacts a grading backend.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const root = path.resolve(process.argv[2]);
const baseline = process.argv.includes('--baseline');
const originals = new Map();
if (baseline) {
  const {execFileSync} = require('node:child_process');
  for (const file of ['DataStructures/FLA/Grading.js','AV/OpenFLAP/grammarEditor.js'])
    originals.set(path.join(root, file), execFileSync('git',['-c','safe.directory='+root,'-C',root,'show',(process.env.BASELINE_REF || 'origin/master')+':'+file]));
}
const exercisePath = '/AV/OpenFLAP/exercises/FLAssignments/Grammar/GramIntro3str.html';
const server = http.createServer((req, res) => {
  if (req.url === '/test-frame.html') {
    res.setHeader('Content-Type', 'text/html');
    return res.end(`<iframe src="${exercisePath}"></iframe>`);
  }
  const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  const read = originals.has(file) ? (_, cb) => cb(null, originals.get(file)) : fs.readFile;
  read(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.setHeader('Content-Type', ({'.js':'application/javascript','.html':'text/html','.json':'application/json','.css':'text/css'})[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({channel: process.env.BROWSER_CHANNEL || 'msedge', headless:true});
  const results = [];
  try {
    const context = await browser.newContext();
    context.setDefaultTimeout(15000);
    context.setDefaultNavigationTimeout(30000);
    // Keep all requests on the private fixture server.
    await context.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort());
    for (const mode of ['absent', 'outsideCanvas', 'insideCanvas']) {
      const page = await context.newPage();
      const errors=[];
      page.on('pageerror', e => errors.push(e.message));
      if (mode !== 'absent') await page.addInitScript(inside => {
        window.progressFetchCount=0;
        window.inCanvas=() => inside;
        window.FetchStoredProgress=() => {window.progressFetchCount++; return Promise.resolve(null);};
      }, mode === 'insideCanvas');
      console.error('Checking editor: '+mode);
      await page.goto(base+'/AV/OpenFLAP/grammarEditor.html', {waitUntil:'domcontentloaded'});
      await page.waitForSelector('.jsavmatrix');
      await page.evaluate(() => new Promise(resolve => jQuery(() => setTimeout(resolve, 0))));
      const fetches=await page.evaluate(() => window.progressFetchCount || 0);
      results.push({test:'editor '+mode,errors,fetches});
      if (!baseline) {assert.deepEqual(errors, []);assert.equal(fetches, mode === 'insideCanvas' ? 1 : 0);}
      await page.close();
    }
    const page=await context.newPage();
    const errors=[], dialogs=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('dialog',async d=>{dialogs.push(d.message());await d.accept();});
    console.error('Checking embedded exercise');
    const frameReady=page.waitForEvent('framenavigated', {predicate:f=>f.url().endsWith('GramIntro3str.html')});
    await page.goto(base+'/test-frame.html', {waitUntil:'domcontentloaded'});
    const frame=await frameReady;
    await frame.waitForSelector('#description');
    if (!baseline) await frame.locator('input[name=grade]').waitFor({state:'visible'});
    else await frame.waitForFunction(() => typeof arr !== 'undefined');
    const gradeCount=await frame.locator('input[name=grade]').count();
    results.push({test:'embedded exercise initialization',errors,gradeCount});
    if (!baseline) {
      assert.deepEqual(errors,[]);assert.equal(gradeCount,1);
      for (const [label,rules,expected] of [
        ['correct',[['S','aA'],['S','b'],['S','bB'],['A','b'],['B','ab']],'7 / 7'],
        ['missing bab',[['S','aA'],['S','b'],['A','b']],'6 / 7']
      ]) {
        // Supply grammar state directly; this tests real button -> grader -> parser -> feedback,
        // not manual table-cell editing. No parser/controller methods are stubbed.
        await frame.evaluate(rules=>{window.arr=rules.map(([lhs,rhs])=>[lhs,'→',rhs]);},rules);
        await frame.locator('input[name=grade]').click();
        const feedback=await frame.locator('#percentage').innerText();
        assert.ok(feedback.includes(expected),feedback);
        assert.deepEqual(errors,[]);
        results.push({test:label,feedback,dialog:dialogs.at(-1)});
      }
      await frame.locator('input[name=reset]').click();
      assert.equal(await frame.evaluate(()=>arr.filter(row=>row[0]).length),0);
      assert.equal(await frame.locator('input[name=grade]').count(),1);
      assert.deepEqual(errors,[]);
      results.push({test:'reset',passed:true});
    }
    console.log(JSON.stringify(results,null,2));
  } finally {await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
