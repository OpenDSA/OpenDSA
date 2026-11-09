/* Run with jsdom available through NODE_PATH; no real browser is controlled. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {JSDOM} = require('jsdom');
const directory = path.resolve(__dirname, '../../AV/OpenFLAP');
const rows = pairs => pairs.map(([left, right]) => [left, '→', right]);
const fixture = rows([['S', 'AB'], ['A', 'a'], ['B', 'b']]);
let checks = 0;
async function check(name, action) { await action(); checks++; console.log('PASS', name); }
function load(page, rules = fixture, query = '') {
  const dom = new JSDOM(fs.readFileSync(path.join(directory, page + '.html'), 'utf8'), {
    url: 'http://example.test/AV/OpenFLAP/' + page + '.html' + query,
    runScripts: 'outside-only'
  });
  const w = dom.window, errors = [], opened = [];
  w.addEventListener('error', event => errors.push(event.error || event.message));
  w.open = url => { opened.push(url); };
  if (rules !== null) w.localStorage.setItem('grammars', typeof rules === 'string' ? rules : JSON.stringify(rules));
  for (const script of w.document.querySelectorAll('script[src]')) {
    w.eval(fs.readFileSync(path.join(directory, script.getAttribute('src')), 'utf8'));
  }
  return {dom, w, errors, opened, $: id => w.document.getElementById(id)};
}
function change(f, id, value) { f.$(id).value = value; f.$(id).dispatchEvent(new f.w.Event('input', {bubbles: true})); }
function start(f, value) {
  change(f, 'input', value);
  f.$('inputForm').dispatchEvent(new f.w.Event('submit', {cancelable: true, bubbles: true}));
}
const text = f => f.$('message').textContent;
(async () => {
  await check('Single input starts at root, steps forward/back and resets', () => {
    const f = load('BFParse');
    try {
      start(f, 'ab'); assert.match(text(f), /^Accept/);
      assert.equal(f.$('stepStatus').textContent, 'Step 0 of 3');
      assert.equal(f.$('tree').querySelectorAll('g').length, 1);
      f.$('nextStep').click(); assert.equal(f.$('stepStatus').textContent, 'Step 1 of 3');
      f.$('lastStep').click(); assert.equal(f.$('tree').querySelectorAll('line').length, 4);
      const labels = Array.from(f.$('tree').querySelectorAll('g'), n => n.getAttribute('data-symbol'));
      assert.deepEqual(labels, ['S', 'A', 'B', 'a', 'b']);
      f.$('previousStep').click(); assert.equal(f.$('stepStatus').textContent, 'Step 2 of 3');
      f.$('firstStep').click(); assert.equal(f.$('tree').querySelectorAll('g').length, 1);
      assert.equal(f.$('previousStep').disabled, true);
      assert.deepEqual(f.errors, []);
    } finally { f.dom.window.close(); }
  });
  await check('Tree/table switch preserves the selected step and highlights the production', () => {
    const f = load('BFParse');
    try {
      start(f, 'ab'); f.$('nextStep').click(); f.$('nextStep').click();
      f.$('viewmode').value = 'table'; f.$('viewmode').dispatchEvent(new f.w.Event('change'));
      assert.equal(f.$('tree').hidden, true); assert.equal(f.$('derivationTable').hidden, false);
      assert.equal(f.$('derivation').tBodies[0].lastElementChild.cells[1].textContent, 'aB');
      assert.equal(f.$('grammar').querySelector('.applied-rule').cells[0].textContent, 'A');
      f.$('viewmode').value = 'tree'; f.$('viewmode').dispatchEvent(new f.w.Event('change'));
      assert.equal(f.$('tree').hidden, false); assert.equal(f.$('stepStatus').textContent, 'Step 2 of 3');
    } finally { f.dom.window.close(); }
  });
  await check('Edited or rejected single inputs clear the previous visualization', () => {
    const f = load('BFParse');
    try {
      start(f, 'ab'); f.$('lastStep').click(); change(f, 'input', 'aa');
      assert.equal(f.$('trace').hidden, true); assert.equal(f.$('tree').childElementCount, 0);
      start(f, 'aa'); assert.match(text(f), /^Reject/); assert.equal(f.$('trace').hidden, true);
      start(f, 'ab'); assert.match(text(f), /^Accept/); assert.equal(f.$('stepStatus').textContent, 'Step 0 of 3');
    } finally { f.dom.window.close(); }
  });
  await check('Single empty input accepts blank, ! and lambda', () => {
    const f = load('BFParse', rows([['Q', 'λ']]));
    try {
      for (const value of ['', '!', 'λ']) {
        start(f, value); assert.match(text(f), /^Accept/); f.$('lastStep').click();
        assert.equal(f.$('tree').querySelector('[data-symbol="λ"]').getAttribute('data-depth'), '1');
      }
    } finally { f.dom.window.close(); }
  });
  await check('An unfinished single search says Undetermined and displays no partial tree', () => {
    const f = load('BFParse', rows([['S', 'SS'], ['S', 'λ']]));
    try {
      start(f, 'b'); assert.match(text(f), /^Undetermined/); assert.equal(f.$('trace').hidden, true);
      start(f, ''); assert.match(text(f), /^Accept/);
    } finally { f.dom.window.close(); }
  });
  await check('Unrestricted single derivation is accurately labeled as a graph', () => {
    const f = load('BFParse', rows([['S', 'AB'], ['AB', 'c']]));
    try {
      start(f, 'c'); f.$('lastStep').click(); assert.equal(f.$('derivationTitle').textContent, 'Derivation Graph');
      assert.equal(f.$('tree').querySelectorAll('.group').length, 1);
      assert.equal(f.$('treeOption').textContent, 'Derivation Graph');
    } finally { f.dom.window.close(); }
  });
  await check('Terminal markup is text in grammar, table and SVG', () => {
    const literal = '<img src=x onerror=alert(1)>';
    const f = load('BFParse', rows([['S', literal]]));
    try {
      start(f, literal); assert.match(text(f), /^Accept/); f.$('lastStep').click();
      assert.equal(f.w.document.querySelectorAll('img').length, 0);
      assert.equal(f.$('grammar').tBodies[0].rows[0].cells[2].textContent, literal);
      assert.equal(f.$('derivation').tBodies[0].lastElementChild.cells[1].textContent, literal);
      assert.deepEqual(f.errors, []);
    } finally { f.dom.window.close(); }
  });
  await check('Single mode has its own input and no batch table', () => {
    const f = load('BFParse', fixture, '?input=ab');
    try {
      assert.equal(f.$('input').value, ''); assert.equal(f.$('table'), null);
      assert.equal(f.$('trace').hidden, true); assert.ok(f.$('viewmode'));
      start(f, 'ab'); assert.match(text(f), /^Accept/);
    } finally { f.dom.window.close(); }
  });
  await check('Multiple mode only displays batch results, without tree or step controls', async () => {
    const f = load('MBFParse');
    try {
      assert.equal(f.w.document.title, 'Multiple Brute Force Parse');
      change(f, 'input0', 'ab'); change(f, 'input1', 'aa'); change(f, 'input2', 'b');
      await f.$('runinputsbutton').onclick();
      assert.deepEqual(Array.from(f.$('table').tBodies[0].rows, tr => tr.cells[1].textContent), ['Accept', 'Reject', 'Reject']);
      assert.equal(f.$('table').querySelectorAll('button').length, 0);
      for (const id of ['trace', 'tree', 'derivation', 'nextStep', 'viewmode', 'openSingle']) assert.equal(f.$(id), null);
      assert.equal(f.w.BruteForceDerivation, undefined);
      f.$('table').tBodies[0].rows[0].cells[1].click(); assert.equal(f.opened.length, 0);
      change(f, 'input0', 'aa'); assert.equal(f.$('table').tBodies[0].rows[0].cells[1].textContent, '');
      await f.$('runinputsbutton').onclick();
      assert.equal(f.$('table').tBodies[0].rows[0].cells[1].textContent, 'Reject');
      assert.deepEqual(f.errors, []);
    } finally { f.dom.window.close(); }
  });
  await check('Multiple mode handles two-digit row indices, clears and deletes rows', async () => {
    const f = load('MBFParse', rows([['S', 'aS'], ['S', 'b']]));
    try {
      for (let i = 3; i < 12; i++) f.$('addinputbutton').click();
      for (let i = 0; i < 12; i++) change(f, 'input' + i, 'a'.repeat(i) + 'b');
      await f.$('runinputsbutton').onclick();
      assert.equal(f.$('table').tBodies[0].rows[11].cells[1].textContent, 'Accept');
      f.$('deleterowbutton').click(); assert.equal(f.$('table').tBodies[0].rows.length, 11);
      assert.match(f.$('message').textContent, /Inputs changed/); f.$('clearbutton').click();
      assert.equal(f.$('table').tBodies[0].rows.length, 3);
      assert.equal(f.$('message').textContent, '');
    } finally { f.dom.window.close(); }
  });
  await check('Multiple empty spellings and resource cutoff recover independently of playback', async () => {
    const f = load('MBFParse', rows([['S', 'SS'], ['S', 'λ']]));
    try {
      change(f, 'input0', '!'); change(f, 'input1', 'λ'); change(f, 'input2', 'b');
      await f.$('runinputsbutton').onclick();
      const results = Array.from(f.$('table').tBodies[0].rows, tr => tr.cells[1].textContent);
      assert.equal(results[0], 'Accept'); assert.equal(results[1], 'Accept'); assert.match(results[2], /^Undetermined/);
      change(f, 'input2', '!'); await f.$('runinputsbutton').onclick();
      assert.equal(f.$('table').tBodies[0].rows[2].cells[1].textContent, 'Accept');
      assert.equal(f.$('table').tBodies[0].rows[2].cells[1].className, 'accepted');
      assert.equal(f.$('trace'), null);
    } finally { f.dom.window.close(); }
  });
  await check('Missing and malformed stored grammars disable both parsing modes gracefully', () => {
    for (const page of ['BFParse', 'MBFParse']) for (const bad of [null, '{', [], [['S']], [['S', '→', 3]]]) {
      const f = load(page, bad);
      try {
        assert.match(text(f), /No valid grammar/);
        assert.equal(f.$(page === 'BFParse' ? 'startbutton' : 'runinputsbutton').disabled, true);
        if (page === 'BFParse') assert.equal(f.$('input').disabled, true);
        assert.equal(f.$('backbutton').disabled, false); assert.deepEqual(f.errors, []);
      } finally { f.dom.window.close(); }
    }
  });
  await check('Both editor routes resolve correctly from standalone and nested authoring pages', () => {
    const source = fs.readFileSync(path.join(directory, 'grammarEditor.js'), 'utf8');
    const handler = source.slice(source.indexOf('function openBruteForceParser('), source.indexOf('function mbfParse()'));
    for (const [url, script] of [
      ['http://example.test/AV/OpenFLAP/grammarEditor.html', './grammarEditor.js'],
      ['http://example.test/AV/OpenFLAP/exercises/editors/grammarExercisesEditor.html', '../../grammarEditor.js']
    ]) {
      const dom = new JSDOM('<script src="' + script + '"></script>', {url, runScripts: 'outside-only'});
      try {
        const w = dom.window, opened = [], alerts = [];
        w.eval(fs.readFileSync(path.join(directory, '../../lib/underscore.js'), 'utf8'));
        w.open = dest => opened.push(dest); w.alert = message => alerts.push(message);
        w.arr = fixture.concat([['', '→', '']]); w.eval(handler);
        for (const page of ['BFParse.html', 'MBFParse.html']) {
          w.openBruteForceParser(page);
          assert.equal(opened.at(-1), 'http://example.test/AV/OpenFLAP/' + page);
          assert.deepEqual(JSON.parse(w.localStorage.getItem('grammars')), fixture);
        }
        w.arr = [['', '→', '']]; w.openBruteForceParser('BFParse.html');
        assert.equal(alerts.at(-1), 'No grammar.'); assert.equal(opened.length, 2);
      } finally { dom.window.close(); }
    }
  });
  await check('Single and Multiple are sibling editor commands with no cross-page shortcuts', () => {
    const editor = new JSDOM(fs.readFileSync(path.join(directory, 'grammarEditor.html'), 'utf8'));
    try {
      const single = editor.window.document.getElementById('bfpbutton');
      const multiple = editor.window.document.getElementById('mbfpbutton');
      assert.equal(single.parentElement, multiple.parentElement);
      assert.equal(single.closest('details').querySelector('summary').textContent.trim(), 'Input');
      assert.equal(single.textContent, 'Brute Force Parse');
      assert.equal(multiple.textContent, 'Multiple Brute Force Parse');
    } finally { editor.window.close(); }
    for (const page of ['BFParse', 'MBFParse']) {
      const f = load(page);
      try {
        assert.equal(f.$('singleMode'), null); assert.equal(f.$('multipleMode'), null);
        assert.equal(f.$('openSingle'), null);
        const navigation = f.w.document.querySelector('nav[aria-label="Editor navigation"]');
        assert.equal(navigation.querySelectorAll('button').length, 1);
        assert.equal(navigation.querySelector('button').id, 'backbutton');
        assert.deepEqual(f.errors, []);
      } finally { f.dom.window.close(); }
    }
  });
  console.log('ALL', checks, 'MODE DOM CHECKS PASSED');
})().catch(error => { console.error(error); process.exitCode = 1; });
