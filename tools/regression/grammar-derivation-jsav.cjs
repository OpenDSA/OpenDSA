/* Real JSAV/ODSA integration; run with NODE_PATH pointing to jsdom. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {fileURLToPath, pathToFileURL} = require('node:url');
const {JSDOM, VirtualConsole} = require('jsdom');
let d3Source;
async function loadD3() {
  if (d3Source === undefined) {
    if (process.env.D3_JS) d3Source = fs.readFileSync(process.env.D3_JS, 'utf8');
    else {
      const response = await fetch('https://d3js.org/d3.v7.min.js');
      assert(response.ok, 'Unable to load the D3 dependency; set D3_JS for offline checks.');
      d3Source = await response.text();
    }
  }
  return d3Source;
}

async function loadPage(page, query = '', configure = () => {}) {
  const base = path.resolve(__dirname, '../../AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation');
  const file = path.join(base, page);
  const errors = [], warnings = [], alerts = [], events = [], reports = [], requests = [];
  const fixtures = {};
  const console = new VirtualConsole();
  console.on('jsdomError', error => errors.push(error.message));
  console.on('error', error => errors.push(String(error)));
  console.on('warn', text => warnings.push(text));
  const dom = new JSDOM(fs.readFileSync(file, 'utf8'), {
    url: 'http://localhost/AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation/' + page + query,
    runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: console
  });
  try {
    const w = dom.window, doc = w.document;
    w.alert = text => alerts.push(text);
    w.scrollTo = () => {}; // jsdom has no layout/scroll implementation.
    // Exercise the iframe reporting branch used by textbook embeds. Browser
    // checks below the unit harness cover real iframes and standalone pages.
    if (page !== 'DerivationPreview.html') Object.defineProperty(w, 'self', {value: {}});
    // Stub only JSON transport. The real loader, validator, engine and JSAV run.
    w.fetch = async (url, options) => {
      requests.push({url, options});
      const filename = path.basename(new URL(url).pathname);
      const fixture = fixtures[filename];
      if (fixture && fixture.error) throw new Error(fixture.error);
      const local = path.join(base, filename);
      const status = fixture ? fixture.status || 200 : fs.existsSync(local) ? 200 : 404;
      const text = fixture ? fixture.body : status === 200 ? fs.readFileSync(local, 'utf8') : '';
      return {ok: status >= 200 && status < 300, status, json: async () => JSON.parse(text)};
    };
    // Capture the external reporting boundary; all JSAV/ODSA code is real.
    w.SPLICE = {
      sendEvent: () => {},
      reportScoreAndState: (name, score, state) => reports.push({name, score, state})
    };
    const resources = [...doc.querySelectorAll('script[src], link[rel="stylesheet"]')];
    for (const resource of resources) {
      const relative = resource.getAttribute('src') || resource.getAttribute('href');
      const url = new URL(relative, pathToFileURL(file));
      let source;
      if (url.protocol === 'https:') {
        assert.equal(url.href, 'https://d3js.org/d3.v7.min.js');
        assert.equal(resource.tagName, 'SCRIPT');
        source = await loadD3();
      } else {
        const asset = fileURLToPath(url);
        assert(fs.existsSync(asset), 'Missing dependency: ' + relative);
        if (resource.tagName !== 'SCRIPT') continue;
        if (path.basename(asset) === 'DerivationPRO.js') configure(w, fixtures);
        source = fs.readFileSync(asset, 'utf8');
      }
      // Script elements preserve top-level strict-mode globals (PARAMS, etc.).
      const script = doc.createElement('script');
      script.textContent = source;
      doc.body.append(script);
    }
    await new Promise(resolve => w.jQuery(resolve));
    await w.derivationPROReady;
    return {dom, errors, warnings, alerts, events, reports, requests};
  } catch (error) {
    dom.window.close();
    throw error;
  }
}

function withPassRates(passRates) {
  return (w, fixtures) => {
    const base = path.resolve(__dirname, '../../AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation');
    for (const name of ['DerivationPRO.json', 'DerivationPalindromePRO.json', 'DerivationLeftmostPRO.json']) {
      const data = JSON.parse(fs.readFileSync(path.join(base, name), 'utf8'));
      data.passRate = passRates[data.id];
      fixtures[name] = {body: JSON.stringify(data)};
    }
  };
}

function controls(harness) {
  const w = harness.dom.window, doc = w.document;
  const $ = id => doc.getElementById(id);
  const control = name => doc.querySelector('input[name="' + name + '"]');
  const click = name => { assert(!control(name).disabled, name); control(name).click(); };
  const exercise = w.derivationPRO.exercise;
  const task = w.derivationPRO.task;
  const reference = task.verified_steps[0], total = reference.length;
  const form = () => $('current-form').textContent;
  const apply = (at, rule) => {
    const button = $('current-form').children[at];
    assert(button && !button.disabled, 'Selectable symbol at ' + at);
    button.click(); $('rule-' + rule).click();
  };
  const finish = (from = 0) => reference.slice(from).forEach(step => apply(step.at, step.rule));
  const check = (expected, correct, completed, lost = 0) => {
    assert.equal(form(), expected);
    // Grade is idempotent and must not restore lost credit.
    for (let n = 0; n < 2; n++) {
      const score = exercise.grade();
      assert.equal(score.correct, correct, 'Earned points for ' + expected);
      assert.equal(score.student, completed, 'Recorded steps for ' + expected);
      assert.equal(score.total, total);
      assert.equal(score.correct + score.undo + score.fix, completed, 'ODSA completion numerator');
    }
    assert.equal(Number($('progress').value), completed, 'Progress tracks completed steps, not credit');
    assert.equal(Number($('progress').max), total);
    assert.equal($('history').rows.length, completed + 1);
    assert.equal(doc.querySelector('.jsavcurrentscore').textContent, String(correct));
    assert.equal(doc.querySelector('.jsavmaxscore').textContent, String(total));
    assert.match($('attempt-summary').textContent, new RegExp('Points lost this attempt: ' + lost + '\\.'));
    assert.equal($('tree').querySelector('svg').getAttribute('aria-label'), 'Parse tree for ' + expected);
    assert.equal(control('undo').disabled, completed === 0);
  };
  const clean = () => {
    assert.deepEqual(harness.errors, []);
    assert.deepEqual(harness.warnings, []);
    assert.deepEqual(harness.alerts, [], 'Feedback must not use blocking alerts');
  };
  w.jQuery('body').on('jsav-log-event.regression', (event, data) => {
    if (data.score) harness.events.push({type: data.type, score: JSON.parse(JSON.stringify(data.score))});
  });
  return {w, doc, $, control, click, exercise, task, reference, total, form, apply, finish, check, clean};
}

(async function () {
  const harness = await loadPage('DerivationPRO.html');
  try {
    const {w, doc, $, control, click, exercise, apply, finish, check, clean} = controls(harness);
    assert(exercise instanceof w.JSAV._types.Exercise);
    assert.equal(w.d3.version.split('.')[0], '7');
    assert.equal(w.Raphael, undefined, "Scored exercises must run on staging's D3 JSAV");
    ['reset', 'undo', 'answer', 'grade'].forEach(name => assert(control(name)));
    assert.equal(harness.requests.length, 1);
    assert.match(harness.requests[0].url, /DerivationPRO\.json$/);
    assert.equal(harness.requests[0].options.cache, 'no-store');
    assert.equal(w.DerivationExerciseData, undefined, 'Scored exercises must load their JSON, not prototype data');
    check('S', 0, 0);
    assert.match($('attempt-summary').textContent, /Required to pass: 100%/);

    // Missing/mismatched selection is an interface prompt, not a submitted step.
    $('rule-0').click(); check('S', 0, 0);
    apply(0, 0); check('aSb', 1, 1);
    apply(0, 0); check('aSb', 1, 1);
    assert.match($('status').textContent, /matches the left side/);
    click('undo'); check('S', 0, 0);
    finish(); check('aaabbb', 3, 3);
    assert.match($('result').textContent, /Passed/);
    click('reset'); check('S', 0, 0);

    // A wrong first step is discarded automatically, including history/tree.
    apply(0, 1); check('S', 0, 0, 1);
    assert.match($('status').textContent, /automatically undone/);
    assert.equal(harness.events.at(-1).score.correct + harness.events.at(-1).score.undo, 0);
    apply(0, 1); check('S', 0, 0, 1);
    assert.match($('status').textContent, /no additional point/);
    finish(); check('aaabbb', 2, 3, 1);
    assert.equal(exercise.score.undo, 1);
    assert.equal(harness.reports.at(-1).state.complete, 1);
    assert.equal(harness.reports.at(-1).state.score.correct, 2);
    assert.match($('result').textContent, /66.7%.*Not passed/);
    assert.equal(doc.querySelector('.jsavamidone').textContent, 'DONE');
    assert.equal(doc.getElementById('prof_check_mark').style.display, 'none');
    assert($('rule-0').disabled, 'A completed low-score attempt is still complete');
    click('grade'); check('aaabbb', 2, 3, 1);
    assert.match($('status').textContent, /Your score: 2 \/ 3/);
    assert.equal(harness.reports.at(-1).score, 0.67);
    assert.equal(doc.getElementById('prof_check_mark').style.display, 'none');

    // User Undo changes progress but cannot erase a lost point at an earlier step.
    click('undo'); check('aaSbb', 1, 2, 1);
    click('undo'); check('aSb', 0, 1, 1);
    click('undo'); check('S', 0, 0, 1);
    finish(); check('aaabbb', 2, 3, 1);

    // Professor's example: first right, second wrong (twice), third right => 2/3.
    click('reset'); check('S', 0, 0);
    apply(0, 0); check('aSb', 1, 1);
    apply(1, 1); check('aSb', 1, 1, 1);
    assert.equal(exercise.score.undo, 0, 'Lost but unfinished step must not imply completion');
    apply(1, 1); check('aSb', 1, 1, 1);
    finish(1); check('aaabbb', 2, 3, 1);
    const finalEvent = harness.events.at(-1).score;
    assert.deepEqual(finalEvent, {total: 3, correct: 2, undo: 1, fix: 0, student: 3});
    assert.equal(harness.reports.at(-1).score, 0.67);

    // Undo to before the penalized step and replay it: eligibility is still lost.
    click('undo'); click('undo'); click('undo'); check('S', 0, 0, 1);
    finish(); check('aaabbb', 2, 3, 1);

    // Separate errors at all three positions cap the final score at zero.
    click('reset'); apply(0, 1); apply(0, 0);
    apply(1, 1); apply(1, 0);
    apply(2, 0); check('aaSbb', 0, 2, 3);
    apply(2, 0); check('aaSbb', 0, 2, 3);
    apply(2, 1); check('aaabbb', 0, 3, 3);
    assert.match($('result').textContent, /Not passed/);
    assert.equal(harness.reports.at(-1).score, 0);

    // Reset is the only operation that clears penalties; repeated clean runs work.
    click('reset'); check('S', 0, 0);
    finish(); check('aaabbb', 3, 3);
    click('undo'); check('aaSbb', 2, 2);
    apply(2, 1); check('aaabbb', 3, 3);
    assert.equal(harness.reports.at(-1).score, 1);

    // Native model playback has no effect on the student's points or penalties.
    click('reset'); apply(0, 0); apply(1, 1); check('aSb', 1, 1, 1);
    const before = harness.reports.length;
    click('answer');
    assert.equal($('credit-note').hidden, false);
    exercise.modelav.end();
    assert.equal(exercise.modelStructures.value(), 'aaabbb');
    check('aSb', 1, 1, 1);
    exercise.modelDialog.hide();
    finish(1); check('aaabbb', 2, 3, 1);
    assert.match($('result').textContent, /Practice only/);
    click('grade'); assert.equal(harness.reports.length, before);
    click('reset'); finish(); check('aaabbb', 3, 3);
    assert.equal($('credit-note').hidden, true);
    assert.equal(harness.reports.at(-1).score, 1);
    clean();
    process.stdout.write('PASS: automatic undo, one permanent loss per step, retries, native Undo/Reset/Grade, zero/full scores, model isolation and ODSA completion reporting.\n');
  } finally { harness.dom.window.close(); }

  for (const threshold of [0.6, 0.8, 2 / 3]) {
    const harness = await loadPage('DerivationPRO.html', '?threshold=' + threshold);
    try {
      const {doc, $, click, apply, finish, check, clean} = controls(harness);
      apply(0, 0); apply(1, 1); finish(1); check('aaabbb', 2, 3, 1);
      const passes = threshold <= 2 / 3;
      assert.match($('result').textContent, passes ? /Passed/ : /Not passed/);
      assert.equal(doc.getElementById('prof_check_mark').style.display === 'none', !passes);
      click('grade');
      assert.equal(doc.getElementById('prof_check_mark').style.display === 'none', !passes);
      assert.equal(harness.reports.at(-1).score, 0.67, "Course transport uses OpenDSA's rounded score without changing earned points");
      click('reset'); check('S', 0, 0);
      assert.equal($('result').textContent, '');
      clean();
    } finally { harness.dom.window.close(); }
  }
  process.stdout.write('PASS: configurable passing thresholds, exact boundary, completed-but-failed state and consistent local proficiency indicator.\n');

  // Each page can set a different passing rate without modifying the grader.
  const passRates = {'pifla-anbn': 0.6, 'pifla-palindrome': 0.8, 'pifla-leftmost-aacbb': 0.8};
  for (const [page, required, passes] of [
    ['DerivationPRO.html', 2, true],
    ['DerivationPalindromePRO.html', 3, false],
    ['DerivationLeftmostPRO.html', 4, true]
  ]) {
    const harness = await loadPage(page, '', withPassRates(passRates));
    try {
      const {doc, $, apply, finish, check, task, total, clean} = controls(harness);
      assert.match($('attempt-summary').textContent, new RegExp('at least ' + required + ' / ' + total + ' points'));
      assert.equal($('result').textContent, '', 'No pass before the derivation is complete');
      if (task.id === 'pifla-leftmost-aacbb') {
        apply(0, 0); apply(2, 3); finish(1);
      } else {
        apply(0, task.id === 'pifla-anbn' ? 1 : 4);
        finish();
      }
      check(task.target, total - 1, total, 1);
      assert.match($('result').textContent, passes ? /Passed/ : /Not passed/);
      assert.equal(doc.getElementById('prof_check_mark').style.display === 'none', !passes);
      clean();
    } finally { harness.dom.window.close(); }
  }
  // A course's threshold must override the exercise's standalone default.
  const course = await loadPage('DerivationPRO.html', '?threshold=0.8',
    withPassRates(passRates));
  try {
    const { $, apply, finish, clean } = controls(course);
    assert.match($('attempt-summary').textContent, /80% \(at least 3 \/ 3 points/);
    apply(0, 1); finish();
    assert.match($('result').textContent, /Not passed/);
    clean();
  } finally { course.dom.window.close(); }

  // Even a zero threshold requires reaching the target; passing is not early exit.
  const zero = await loadPage('DerivationPRO.html', '?threshold=0');
  try {
    const { $, apply, check, clean } = controls(zero);
    assert.match($('attempt-summary').textContent, /at least 0 \/ 3 points/);
    assert.equal($('result').textContent, '');
    apply(0, 1); apply(0, 0); apply(1, 1); apply(1, 0);
    assert.equal($('result').textContent, '');
    apply(2, 0); apply(2, 1); check('aaabbb', 0, 3, 3);
    assert.match($('result').textContent, /Passed/);
    clean();
  } finally { zero.dom.window.close(); }
  for (const threshold of ['', '%20%20', '-0.1', '1.1', 'wrong', 'Infinity']) {
    const invalid = await loadPage('DerivationPRO.html', '?threshold=' + threshold);
    try {
      assert.equal(invalid.dom.window.derivationPRO, undefined);
      assert(invalid.errors.some(text => text.includes('The passing threshold must be a number between 0 and 1.')));
      assert.match(invalid.dom.window.document.getElementById('derivation-pro').textContent, /Unable to start this exercise.*passing threshold/);
      assert.equal(invalid.reports.length, 0);
    } finally { invalid.dom.window.close(); }
  }
  process.stdout.write('PASS: per-exercise passing rates, required whole-point display, course override, zero threshold completion and invalid configuration checks.\n');


  for (const page of ['DerivationPalindromePRO.html', 'DerivationLeftmostPRO.html']) {
    const harness = await loadPage(page);
    try {
      const {w, doc, $, click, exercise, task, total, apply, finish, check, clean} = controls(harness);
      const palindrome = page === 'DerivationPalindromePRO.html';
      assert.equal(w.ODSA.SETTINGS.AV_NAME, page.replace('.html', ''));
      assert.equal($('target').textContent, task.target);
      assert.equal(doc.querySelector('.scored-links [aria-current="page"]').getAttribute('href'), page);
      assert.match($('examples-link').href, new RegExp('#' + task.id + '$'));
      for (const link of doc.querySelectorAll('.scored-links a')) {
        assert(fs.existsSync(path.join(path.dirname(__filename), '../../AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation', link.getAttribute('href'))));
      }
      check('S', 0, 0);
      if (palindrome) {
        apply(0, 4); check('S', 0, 0, 1); // Premature lambda is undone.
        apply(0, 1); check('S', 0, 0, 1); // Same step loses no extra point.
        apply(0, 0); apply(1, 1); check('abSba', 1, 2, 1);
        apply(2, 3); check('abSba', 1, 2, 2);
        apply(2, 2); check('ababa', 1, 3, 2);
      } else {
        apply(0, 0); check('AcB', 1, 1);
        apply(2, 3); check('AcB', 1, 1, 1); // Matching B in the wrong order loses step 2.
        assert.match($('status').textContent, /leftmost/);
        apply(0, 2); check('AcB', 1, 1, 1); // Wrong nullable choice at same position.
        apply(0, 1); check('aAacB', 1, 2, 1);
        apply(1, 2); check('aacB', 2, 3, 1); // Correct lambda earns credit.
        apply(3, 4); check('aacB', 2, 3, 2); // Premature B lambda loses step 4.
        apply(3, 3); check('aacBbb', 2, 4, 2);
        apply(3, 4); check('aacbb', 3, 5, 2);
        assert.equal([...$('tree').querySelectorAll('text')].filter(text => text.textContent === 'λ').length, 2);
      }
      assert.equal(doc.querySelector('.jsavamidone').textContent, 'DONE');
      assert.match($('result').textContent, /Not passed/);
      assert.equal(harness.reports.at(-1).name, page.replace('.html', ''));
      click('grade'); assert.match($('status').textContent, /Your score/);
      click('reset'); check('S', 0, 0);
      assert.equal($('tree').querySelectorAll('text').length, 1);
      finish(); check(task.target, total, total);
      assert.match($('result').textContent, /Passed/);
      assert.equal(harness.reports.at(-1).score, 1);
      click('undo'); check(palindrome ? 'abSba' : 'aacBbb', total - 1, total - 1);
      const before = harness.reports.length;
      click('answer'); exercise.modelav.end();
      assert.equal(exercise.modelStructures.value(), task.target);
      exercise.modelDialog.hide();
      finish(total - 1); check(task.target, total, total);
      click('grade'); assert.equal(harness.reports.length, before);
      assert.match($('result').textContent, /Practice only/);
      click('reset'); finish(); check(task.target, total, total);
      clean();
    } finally { harness.dom.window.close(); }
  }
  process.stdout.write('PASS: shared-template palindrome/nullable rules, leftmost mistakes, five-step scoring, independent exercise identities and tree/history synchronization.\n');

  // A new exercise needs only a JSON definition, not a new script or page.
  const authored = {
    schemaVersion: 1, id: 'author-empty-rule', title: 'Author fixture: aa',
    prompt: 'Derive aa and remove the final S.', source: 'Instructor-authored test fixture',
    url: 'DerivationPreview.html', startSymbol: 'S', target: 'aa', leftmost: true, passRate: 0.6,
    rules: [['S', 'aS'], ['S', 'λ']],
    reference: [{production: 1, position: 1}, {production: 1, position: 2}, {production: 2, position: 3}]
  };
  const preview = await loadPage('DerivationPreview.html', '?config=author-example.json', (w, fixtures) => {
    fixtures['author-example.json'] = {body: JSON.stringify(authored)};
  });
  try {
    const {w, doc, $, click, exercise, task, apply, finish, check, clean} = controls(preview);
    assert.equal(task.id, authored.id);
    assert.equal(task.passRate, 0.6);
    assert.equal(w.DerivationExerciseData, undefined);
    assert.equal(doc.title, 'Author preview: Author fixture: aa — Grammar Derivation Exercise');
    assert.equal($('preview-note').hidden, false);
    assert.match($('preview-note').textContent, /not submitted/);
    assert.equal(task.verified_steps[0][2].after, 'aa', 'Reference forms are calculated from the JSON');
    assert.equal(preview.requests.length, 1);
    check('S', 0, 0);
    apply(0, 0); apply(1, 1); check('aS', 1, 1, 1);
    click('answer'); exercise.modelav.end();
    assert.equal(exercise.modelStructures.value(), 'aa');
    exercise.modelDialog.hide();
    finish(1); check('aa', 2, 3, 1);
    assert.match($('result').textContent, /Passed/);
    click('grade'); click('undo'); finish(2); click('grade');
    click('reset'); finish(); check('aa', 3, 3);
    assert.deepEqual(preview.reports, [], 'Generic preview must never report a score under its shared identity');
    assert.deepEqual(preview.events, []);
    const validate = w.DerivationPROConfig.validate;
    assert.equal(validate({...authored, rules: [['S', 'aS'], ['S', '']]}).rules[1][1], 'λ');
    for (const [field, value] of [['schemaVersion', 2], ['startSymbol', 'A'], ['passRate', '0.6'],
      ['leftmost', 'yes'], ['rules', [['S']]], ['url', 'javascript:alert(1)']]) {
      assert.throws(() => validate({...authored, [field]: value}), /Invalid exercise definition/);
    }
    assert.throws(() => validate({...authored, reference: [{production: 0, position: 1}]}), /starting at 1/);
    assert.throws(() => validate({...authored, reference: [{production: 1, position: 2}]}), /reference step 1/);
    assert.throws(() => validate({...authored, target: 'aaa'}), /reference must finish/);
    clean();
  } finally { preview.dom.window.close(); }

  for (const test of [
    {page: 'DerivationPRO.html', query: '', fixture: {name: 'DerivationPRO.json', body: '', status: 404}, message: /HTTP 404/},
    {page: 'DerivationPreview.html', query: '?config=missing.json', message: /HTTP 404/},
    {page: 'DerivationPreview.html', query: '?config=broken.json', fixture: {name: 'broken.json', body: '{'}, message: /Invalid JSON/},
    {page: 'DerivationPreview.html', query: '?config=bad-reference.json', fixture: {name: 'bad-reference.json', body:
      JSON.stringify({...authored, reference: [{production: 2, position: 1}]})}, message: /reference must finish/},
    {page: 'DerivationPreview.html', query: '?config=https://example.com/exercise.json', message: /on this website/, requests: 0},
    {page: 'DerivationPRO.html', query: '?config=DerivationPalindromePRO.json', message: /Scored pages have a fixed definition/, requests: 0}
  ]) {
    const harness = await loadPage(test.page, test.query, (w, fixtures) => {
      if (test.fixture) fixtures[test.fixture.name] = {body: test.fixture.body, status: test.fixture.status};
    });
    try {
      assert.equal(harness.dom.window.derivationPRO, undefined);
      const panel = harness.dom.window.document.getElementById('derivation-pro');
      assert.equal(panel.getAttribute('role'), 'alert');
      assert.match(panel.textContent, test.message);
      assert.equal(harness.requests.length, test.requests ?? 1);
      assert.deepEqual(harness.reports, []);
    } finally { harness.dom.window.close(); }
  }
  process.stdout.write('PASS: JSON-only authored exercise, calculated reference, preview reporting isolation, authoring validation, load/parse failures and fixed scored identities.\n');

  // Local FileReader import works without putting a file in the project/server.
  const picker = await loadPage('DerivationPreview.html');
  let savedItems;
  try {
    const w = picker.dom.window, doc = w.document;
    assert.equal(w.derivationPRO, undefined);
    assert.equal(doc.getElementById('json-import').hidden, false);
    assert.equal(doc.getElementById('derivation-pro').hidden, true);
    assert.match(doc.getElementById('import-status').textContent, /Choose a JSON file/);
    assert.equal(doc.getElementById('json-file').getAttribute('accept'), '.json,application/json');
    const file = new w.File([JSON.stringify(authored)], 'My local exercise.json', {type: 'application/json'});
    await w.DerivationPROConfig.importFile(file);
    savedItems = {};
    for (let i = 0; i < w.sessionStorage.length; i++) {
      const key = w.sessionStorage.key(i);
      savedItems[key] = w.sessionStorage.getItem(key);
    }
    assert.equal(Object.keys(savedItems).length, 1);
    assert.deepEqual(picker.requests, [], 'Local import must not fetch or upload JSON');
    assert.deepEqual(picker.reports, []);
    assert.deepEqual(picker.errors, []);
  } finally { picker.dom.window.close(); }
  const local = await loadPage('DerivationPreview.html', '?local=1', w => {
    Object.entries(savedItems).forEach(([key, value]) => w.sessionStorage.setItem(key, value));
  });
  try {
    const {w, doc, $, apply, finish, check, clean} = controls(local);
    assert.equal($('clear-json').hidden, false);
    assert.equal($('import-status').textContent, 'Loaded: My local exercise.json');
    assert.equal(w.derivationPRO.task.id, authored.id);
    check('S', 0, 0);
    apply(0, 0); check('aS', 1, 1);
    const input = $('json-file'), saved = JSON.stringify(savedItems);
    async function choose(file) {
      Object.defineProperty(input, 'files', {configurable: true, value: file ? [file] : []});
      input.dispatchEvent(new w.Event('change'));
      await w.derivationImportReady;
    }
    // Cancel, malformed JSON and invalid references preserve current work/storage.
    await choose(null); check('aS', 1, 1);
    await choose(new w.File(['{'], 'broken.json'));
    assert.match($('import-status').textContent, /Invalid JSON in broken.json/);
    assert.equal(input.disabled, false);
    assert.equal(input.value, '');
    check('aS', 1, 1);
    await choose(new w.File([JSON.stringify({...authored, target: 'aaa'})], 'bad-reference.json'));
    assert.match($('import-status').textContent, /reference must finish/);
    check('aS', 1, 1);
    const currentItems = {};
    for (let i = 0; i < w.sessionStorage.length; i++) {
      const key = w.sessionStorage.key(i); currentItems[key] = w.sessionStorage.getItem(key);
    }
    assert.equal(JSON.stringify(currentItems), saved);
    finish(1); check('aa', 3, 3);
    assert.deepEqual(local.requests, []);
    assert.deepEqual(local.reports, []);
    w.DerivationPROConfig.clearLocal();
    assert.equal(w.sessionStorage.length, 0);
    clean();
  } finally { local.dom.window.close(); }

  const missingLocal = await loadPage('DerivationPreview.html', '?local=1');
  try {
    assert.match(missingLocal.dom.window.document.getElementById('derivation-pro').textContent, /No local preview is saved/);
    assert.equal(missingLocal.dom.window.document.getElementById('json-import').hidden, false);
    assert.deepEqual(missingLocal.requests, []);
    assert.deepEqual(missingLocal.reports, []);
  } finally { missingLocal.dom.window.close(); }
  const scored = await loadPage('DerivationPRO.html');
  try {
    const w = scored.dom.window;
    assert.equal(w.document.getElementById('json-import').hidden, true);
    await assert.rejects(w.DerivationPROConfig.importFile(new w.File([JSON.stringify(authored)], 'exercise.json')),
      /standalone author preview/);
    assert.equal(w.sessionStorage.length, 0);
  } finally { scored.dom.window.close(); }
  process.stdout.write('PASS: local JSON FileReader import, session-only reload, cancellation/error preservation, no network/grades, clear preview and scored-page isolation.\n');

  // Run the real module-side SPLICE handler too: completion must not grant
  // proficiency when the earned step score is below the book's threshold.
  const moduleErrors = [];
  const moduleConsole = new VirtualConsole();
  moduleConsole.on('jsdomError', error => moduleErrors.push(error.message));
  moduleConsole.on('error', error => moduleErrors.push(String(error)));
  const moduleDOM = new JSDOM(`<div id="ThresholdPRO" class="embedContainer"
    data-long-name="Threshold test" data-type="pe" data-threshold="1" data-required="True"
    data-points="3"><iframe id="ThresholdPRO_iframe"></iframe>
    <span id="ThresholdPRO_check_mark" style="display:none">Passed</span></div>`,
    {url: 'http://localhost/Books/PIFLA/html/CFG1.html', runScripts: 'dangerously',
      pretendToBeVisual: true, virtualConsole: moduleConsole});
  try {
    const w = moduleDOM.window, doc = w.document;
    w.scrollTo = () => {};
    w.MathJax = {Hub: {Queue: () => {}}};
    function script(source) {
      const element = doc.createElement('script'); element.textContent = source; doc.body.append(element);
    }
    const library = name => fs.readFileSync(path.resolve(__dirname, '../../lib', name), 'utf8');
    for (const name of ['jquery.min.js', 'jquery.ui.min.js', 'timeme.js']) script(library(name));
    script(await loadD3()); script(library('JSAVD3.js')); script(library('odsaUtils.js'));
    w.ODSA.SETTINGS.MODULE_NAME = 'CFG1';
    script(library('odsaMOD.js'));
    await new Promise(resolve => w.jQuery(resolve));
    const child = doc.getElementById('ThresholdPRO_iframe').contentWindow;
    const feedback = [];
    child.postMessage = data => feedback.push(JSON.parse(data));
    function report(correct, undo, total = 3) {
      w.dispatchEvent(new w.MessageEvent('message', {origin: 'http://localhost', source: child,
        data: {subject: 'SPLICE.reportScoreAndState', score: correct / total,
          state: {ThresholdPRO: {av: 'ThresholdPRO', type: 'jsav-exercise-grade-change',
            score: {correct, undo, fix: 0, total}, uiid: 1, totalTime: 1}}}}));
    }
    report(2, 1);
    assert.equal(feedback.at(-1).proficient, false, 'A completed 2/3 attempt must not pass a 100% threshold');
    assert.equal(doc.getElementById('ThresholdPRO_check_mark').style.display, 'none');
    report(3, 0);
    assert.equal(feedback.at(-1).proficient, true);
    assert.notEqual(doc.getElementById('ThresholdPRO_check_mark').style.display, 'none');
    report(2, 1);
    assert.equal(feedback.at(-1).proficient, false);
    assert.equal(doc.getElementById('ThresholdPRO_check_mark').style.display, 'none');
    assert.deepEqual(moduleErrors, []);
  } finally { moduleDOM.window.close(); }
  process.stdout.write('PASS: real odsaMOD SPLICE completion handling respects the PE passing threshold and clears a stale proficiency mark.\n');

  for (const [page, routeCount, expectedTrees] of [['DerivationAmbiguousPRO.html', 2, 2], ['DerivationMultiplePRO.html', 6, 1]]) {
    const harness = await loadPage(page);
    try {
      const {w, $, click, exercise, task, total, apply, finish, check, clean} = controls(harness);
      const graph = w.derivationPRO.possibility;
      assert.equal(graph.maxDepth, 18);
      assert.equal(graph.successfulPaths, routeCount);
      for (const id of ['possibility-view', 'possibility-tree', 'search-summary', 'search-preview-link']) {
        assert.equal($(id), null, 'Internal search must not appear in scored pages');
      }
      const routes = [];
      function visit(node, steps) {
        if (node.form === task.target) { routes.push(steps); return; }
        for (const edge of node.edges) {
          const child = graph.nodes[edge.to];
          if (child.status === 'reachable') visit(child, steps.concat({rule:edge.rule, at:edge.at, after:child.form}));
        }
      }
      visit(graph.nodes[0], []);
      assert.equal(routes.length, routeCount);
      const treeSignatures = new Set();
      for (const route of routes) {
        click('reset'); check('S', 0, 0);
        assert.equal(w.derivationPRO.possibility, graph, 'Reuse the tree built before the attempt');
        route.forEach((step, i) => { apply(step.at, step.rule); check(step.after, i + 1, i + 1); });
        assert.match($('result').textContent, /Passed/);
        assert.equal(harness.reports.at(-1).score, 1);
        // Recover the applied rules from the chosen route, independently of DOM IDs.
        let before = 'S';
        const steps = route.map(step => { const result = {...step, before}; before = step.after; return result; });
        const tree = w.BruteForceDerivation.build(task.rules.map(([a,b]) => [a,'→',b]), {start:'S',steps}, steps.length);
        function signature(id) { const n = tree.nodes[id]; return [n.symbol, n.children.map(signature)]; }
        treeSignatures.add(JSON.stringify(tree.roots.map(signature)));
      }
      assert.equal(treeSignatures.size, expectedTrees);
      click('reset');
      if (routeCount === 2) {
        apply(0, 0); check('aA', 1, 1);
        apply(1, 4); check('aA', 1, 1, 1);
        assert.match($('status').textContent, /Dead end/);
        apply(1, 4); check('aA', 1, 1, 1);
        apply(1, 3); check('aaA', 1, 2, 1);
        finish(2); check(task.target, total - 1, total, 1);
      } else {
        apply(0, 1); check('S', 0, 0, 1);
        const bFirst = routes.find(route => route[1].after === 'aABbb');
        bFirst.forEach((step, i) => { apply(step.at, step.rule); check(step.after, i, i + 1, 1); });
      }
      click('undo');
      assert.equal(exercise.score.correct, total - 2);
      assert.equal(exercise.score.student, total - 1);
      click('reset'); check('S', 0, 0);
      const nonreference = routes.at(-1);
      apply(nonreference[0].at, nonreference[0].rule);
      const beforeReports = harness.reports.length;
      click('answer'); exercise.modelav.end();
      assert.equal(exercise.modelStructures.value(), task.target);
      exercise.modelDialog.hide();
      nonreference.slice(1).forEach(step => apply(step.at, step.rule));
      check(task.target, total, total);
      click('grade'); assert.equal(harness.reports.length, beforeReports);
      click('reset'); finish(); check(task.target, total, total);
      assert.equal(harness.reports.at(-1).score, 1);
      clean();
    } finally { harness.dom.window.close(); }
  }
  const graphPreview = await loadPage('DerivationPreview.html', '?config=DerivationAmbiguousPRO.json');
  try {
    const {w, $, apply, check, clean} = controls(graphPreview);
    for (const id of ['possibility-view', 'possibility-tree', 'search-summary', 'search-preview-link']) {
      assert.equal($(id), null, 'Internal search must not appear in author preview');
    }
    assert.throws(() => w.DerivationPROConfig.validate({...authored, grading:'possibility', target:'a', rules:[['S','a'],['S','S']], reference:[{production:1,position:1}]}), /different step counts/);
    assert.equal(w.derivationPRO.possibility.maxDepth, 18);
    assert.ok(w.derivationPRO.possibility.nodes.length > 0, 'Search is still precomputed internally');
    apply(0, 0); apply(1, 4); check('aA', 1, 1, 1);
    assert.deepEqual(graphPreview.reports, []);
    clean();
  } finally { graphPreview.dom.window.close(); }
  const uncertainTask = {...authored, id:'depth-cutoff', target:'a', grading:'possibility', passRate:1,
    rules:[['S','a'],['S','A'],['A','B'],['B','C'],['C','a']], reference:[{production:1,position:1}]};
  const unknown = await loadPage('DerivationPreview.html', '?config=unknown.json', (w, fixtures) => {
    fixtures['unknown.json'] = {body: JSON.stringify(uncertainTask)};
  });
  try {
    const {$, apply, check, clean} = controls(unknown);
    apply(0, 1); check('S', 0, 0);
    assert.match($('status').textContent, /Search limit reached/);
    assert.match($('status').textContent, /no point was lost/);
    apply(0, 0); check('a', 1, 1);
    clean();
  } finally { unknown.dom.window.close(); }
  process.stdout.write('PASS: G1 two routes/two trees, G2 six routes/one tree, early dead-end grading, native controls/model isolation, hidden internal search in scored/preview pages and ungraded depth cutoffs.\n');




})().catch(error => { process.stderr.write(error.stack + '\n'); process.exitCode = 1; });
