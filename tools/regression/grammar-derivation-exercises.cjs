/* Run with NODE_PATH pointing to an installed jsdom dependency. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {fileURLToPath, pathToFileURL} = require('node:url');
const {JSDOM} = require('jsdom');
const base = path.resolve(__dirname, '../../AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation');
const html = fs.readFileSync(path.join(base, 'DerivationExercises.html'), 'utf8');
const assetPath = relative => fileURLToPath(new URL(relative, pathToFileURL(path.join(base, 'DerivationExercises.html'))));
const dom = new JSDOM(html, {runScripts: 'outside-only', url: 'http://localhost/AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation/DerivationExercises.html'});
// Follow the page's real relative references, including shared OpenFLAP assets.
for (const resource of dom.window.document.querySelectorAll('script[src], link[rel="stylesheet"], a.back-link')) {
  const relative = resource.getAttribute('src') || resource.getAttribute('href');
  assert(fs.existsSync(assetPath(relative)), 'Missing page dependency: ' + relative);
}
for (const script of dom.window.document.querySelectorAll('script[src]')) {
  dom.window.eval(fs.readFileSync(assetPath(script.getAttribute('src')), 'utf8'));
}
const w = dom.window, doc = w.document, data = w.DerivationExerciseData;
const $ = id => doc.getElementById(id);
const click = id => { assert(!$(id).disabled, id + ' is disabled'); $(id).click(); };
const form = () => $('current-form').textContent;
const choose = i => { $('exercise-select').value = String(i); $('exercise-select').dispatchEvent(new w.Event('change')); };
const selectSolution = i => { $('solution').value = String(i); $('solution').dispatchEvent(new w.Event('change')); };
let checked = 0;

// PIFLA examples come first in the menu and open as student tasks.
assert.equal(form(), 'S');
assert.equal($('target').textContent, 'aaabbb');
assert.equal($('practice-mode').getAttribute('aria-pressed'), 'true');
assert.equal(doc.querySelector('optgroup').label, 'PIFLA examples');
assert.equal(doc.querySelector('optgroup').children.length, 4);
assert.match($('source-description').textContent, /PIFLA/);
click('symbol-0');
const inline = $('available-rules').querySelectorAll('button');
assert.equal(inline.length, 2);
assert.equal(inline[0].textContent, 'S → aSb');
inline[0].click(); assert.equal(form(), 'aSb');
click('undo'); assert.equal(form(), 'S');
click('reference-mode');

// All reference transitions, including both structurally different ambiguity traces.
data.forEach((ex, i) => {
  choose(i);
  ex.verified_steps.forEach((steps, solution) => {
    if (ex.solutions.length > 1) selectSolution(solution);
    assert.equal(form(), 'S'); assert($('previous').disabled);
    for (const step of steps) {
      click('next'); assert.equal(form(), step.after); checked++;
    }
    assert.equal(form(), ex.target); assert($('next').disabled);
    assert.match($('status').textContent, /Derivation complete/);
    assert.equal($('tree-section').hidden, ex.rules.some(([l]) => !/^[A-Z]$/.test(l)));
    click('previous'); assert.equal(form(), steps.at(-1).before);
    click('next'); click('restart'); assert.equal(form(), 'S');
  });
});

// Each manual solution through the same selection/rule buttons used by the student.
click('practice-mode');
data.forEach((ex, i) => {
  choose(i);
  for (const steps of ex.verified_steps) {
    click('restart');
    for (const step of steps) {
      const left = ex.rules[step.rule][0];
      click('symbol-' + step.at);
      if (left.length > 1) click('symbol-' + (step.at + left.length - 1));
      click('rule-' + step.rule);
      assert.equal(form(), step.after); assert.equal($('status').className, step.after === ex.target ? 'success' : '');
    }
    click('undo'); assert.equal(form(), steps.at(-1).before);
  }
});
choose(3);
assert.match($('comparison-status').textContent, /Two different parse trees/);
assert.equal($('saved-trees').querySelectorAll('svg').length, 2);

// Mismatched replacements do not alter the form or history.
choose(1); click('restart'); click('symbol-0'); click('rule-1');
assert.equal(form(), 'S'); assert.equal($('history').children.length, 1);
assert.equal($('status').className, 'error');
click('rule-0'); assert.equal(form(), 'NC');
click('undo'); assert.equal(form(), 'S'); assert($('undo').disabled);

// Reference and student progress remain independent when switching views.
click('symbol-0'); click('rule-0');
click('reference-mode'); assert.equal(form(), 'S'); click('next'); click('next');
assert.equal(form(), 'aNbC'); click('practice-mode'); assert.equal(form(), 'NC');

// A valid alternate branch order is allowed unless explicitly leftmost.
const alternate = w.DerivationExerciseEngine.create(data[1]);
for (const [rule, at] of [[0,0],[3,1],[4,2],[1,0],[1,1],[2,2]]) assert(alternate.apply(rule, at).ok);
assert.equal(alternate.current(), 'aabbc'); assert(alternate.complete());
const leftmost = w.DerivationExerciseEngine.create(data[3]);
assert(leftmost.apply(0,0).ok); assert(leftmost.apply(1,0).ok);
assert.equal(leftmost.apply(5,2).ok, false); assert.equal(leftmost.current(), 'E+E');

// Reaching a different terminal string is not success; empty rules delete symbols.
const wrong = w.DerivationExerciseEngine.create(data[0]);
assert(wrong.apply(2,0).ok); assert.equal(wrong.current(), ''); assert.equal(wrong.complete(), false);
wrong.undo(); assert.equal(wrong.current(), 'S');

// View choices follow the parser pages; context-sensitive steps use a table.
choose(1);
$('viewmode').value = 'table'; $('viewmode').dispatchEvent(new w.Event('change'));
assert($('tree-section').hidden); assert.equal($('history-section').hidden, false);
$('viewmode').value = 'tree'; $('viewmode').dispatchEvent(new w.Event('change'));
assert.equal($('tree-section').hidden, false); assert($('history-section').hidden);
choose(4);
assert.equal($('viewmode').value, 'table'); assert($('tree-option').disabled);
assert.equal($('history-section').hidden, false);
choose(1); assert.equal($('viewmode').value, 'tree'); assert.equal($('tree-option').disabled, false);

// The PIFLA worked example enforces leftmost order, including when B also matches.
const piflaLeftmostIndex = data.findIndex(ex => ex.id === 'pifla-leftmost-aacbb');
choose(piflaLeftmostIndex); click('restart'); click('symbol-0'); click('rule-0');
assert.equal(form(), 'AcB');
click('symbol-2'); click('rule-3');
assert.equal(form(), 'AcB'); assert.match($('status').textContent, /leftmost/);
click('restart');

// New source links and contextual-rule explanations follow the selected PIFLA task.
choose(data.findIndex(ex => ex.id === 'pifla-context-sensitive'));
assert.match($('source').href, /PIFLA\/html\/TuringMachinesAdv\.html/);
assert.match($('context-note').textContent, /Ab → bA/);
assert.equal($('viewmode').value, 'table');
for (const ex of data.filter(ex => ex.collection === 'PIFLA examples')) {
  assert(ex.url.includes('/Books/PIFLA/'));
  for (const source of ex.sourceFile.split('; ')) {
    assert(fs.existsSync(path.resolve(__dirname, '../..', source)), 'Missing textbook source: ' + source);
  }
}

// Direct per-question links also work when following a hash within an open page.
w.history.replaceState(null, '', '#pifla-anbn');
w.dispatchEvent(new w.HashChangeEvent('hashchange'));
assert.equal($('target').textContent, 'aaabbb');
w.history.replaceState(null, '', '#04-two-parse-trees');
w.dispatchEvent(new w.HashChangeEvent('hashchange'));
assert.equal($('exercise-title').textContent, 'Ambiguous Grammar');

// Labels, status text, tooltips, SVG descriptions and error messages are English.
const hasCJK = /[\u3400-\u9fff]/;
assert.equal(doc.documentElement.lang, 'en');
for (const name of ['DerivationExercises.html','DerivationExercises.js','DerivationExerciseData.js','DerivationExerciseEngine.js']) {
  assert.equal(hasCJK.test(fs.readFileSync(path.join(base, name), 'utf8')), false, name + ' contains Chinese text');
}
dom.window.close();
console.log('PASS: ' + checked + ' reference steps, all ' + data.reduce((n, ex) => n + ex.solutions.length, 0) + ' manual traces, PIFLA default and sources, inline productions, contextual substring selection, two different trees, Undo/Restart, invalid-step rollback, leftmost order, alternate valid derivation, and independent modes.');
