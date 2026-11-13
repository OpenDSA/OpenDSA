'use strict';
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const {JSDOM} = require('jsdom');
const folder = path.resolve(__dirname, '../../AV/OpenFLAP');
const {create} = require(path.join(folder, 'UserControlParser'));
const rules = [['S','→','AB'],['A','→','a'],['B','→','b']];
function load(grammar) {
  const dom = new JSDOM(fs.readFileSync(path.join(folder,'UserControlParse.html'),'utf8'), {url:'http://localhost/AV/OpenFLAP/UserControlParse.html',runScripts:'outside-only'});
  if (grammar !== undefined) dom.window.localStorage.setItem('grammars', JSON.stringify(grammar));
  for (const name of ['BruteForceDerivation.js','BruteForceParseUI.js','UserControlParser.js','UserControlParse.js']) dom.window.eval(fs.readFileSync(path.join(folder,name),'utf8'));
  const w=dom.window, d=w.document, $=id=>d.getElementById(id), click=id=>$(id).click();
  function start(target){$('input').value=target;$('inputForm').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));}
  function apply(rule,at){click('manual-rule-'+rule);if(at!==undefined){$('occurrence').value=String(at);$('occurrence').dispatchEvent(new w.Event('change'));}click('step');}
  return {dom,w,d,$,click,start,apply};
}
for (const route of [[0,1,2],[0,2,1]]) {
  const h=load(rules);try {
    h.start('ab'); h.apply(route[0]); h.apply(route[1]); h.apply(route[2]);
    assert.equal(h.$('currentForm').textContent,'ab');assert.match(h.$('message').textContent,/Target reached/);
    assert.equal(h.$('history').rows.length,4);assert(h.$('tree').querySelector('svg'));
    h.click('previous');assert.notEqual(h.$('currentForm').textContent,'ab');
    h.click('reset');assert.equal(h.$('currentForm').textContent,'S');assert(h.$('previous').disabled);
    h.$('view').value='table';h.$('view').dispatchEvent(new h.w.Event('change'));assert(h.$('tree').hidden);assert(!h.$('tableView').hidden);
    h.$('input').dispatchEvent(new h.w.Event('input'));assert(h.$('manual').hidden);
  }finally{h.dom.window.close();}
}
const repeated=load([['S','→','AA'],['A','→','a'],['A','→','b']]);try{
 repeated.start('aa');repeated.apply(0);repeated.click('manual-rule-1');assert(repeated.$('step').disabled);
 repeated.apply(1,1);assert.equal(repeated.$('currentForm').textContent,'Aa');
 repeated.apply(2);assert.equal(repeated.$('currentForm').textContent,'ba','Legal wrong route is retained, without auto rollback');
 repeated.click('previous');repeated.apply(1);assert.match(repeated.$('message').textContent,/Target reached/);
}finally{repeated.dom.window.close();}
const contextual=load([['Q','→','AB'],['AB','→','a']]);try{
 contextual.start('a');contextual.apply(0);contextual.apply(1);
 assert.equal(contextual.$('currentForm').textContent,'a');assert.match(contextual.$('viewNote').textContent,/graph/);
 assert.equal(contextual.$('view').options[0].textContent,'Derivation Graph');
}finally{contextual.dom.window.close();}
const empty=load([['S','→','λ']]);try{empty.start('!');empty.apply(0);assert.equal(empty.$('currentForm').textContent,'λ');assert.match(empty.$('message').textContent,/Target reached/);}finally{empty.dom.window.close();}
for(const invalid of [undefined,[],[['S','→',null]]]){const h=load(invalid);try{assert(h.$('startbutton').disabled);assert.match(h.$('message').textContent,/No valid grammar/);}finally{h.dom.window.close();}}
const cycle=create([['S','→','S']], 'a');assert(cycle.apply(0,0).ok);assert(cycle.apply(0,0).ok);assert.equal(cycle.history().length,2);
assert(!cycle.apply(0,1).ok);for(let i=2;i<200;i++)assert(cycle.apply(0,0).ok);assert(!cycle.apply(0,0).ok);assert.equal(cycle.history().length,200);
assert.match(fs.readFileSync(path.join(folder,'grammarEditor.html'),'utf8'),/id="ucpbutton">User Control Parse/);
assert.match(fs.readFileSync(path.join(folder,'grammarEditor.js'),'utf8'),/openBruteForceParser\('UserControlParse.html'\)/);
console.log('PASS: manual alternate routes, occurrence disambiguation, wrong-route exploration, Previous/Reset, tree/table, contextual graphs, non-S start, lambda, invalid transfer and bounded cycles.');
