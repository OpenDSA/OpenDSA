/* Real JSAV/ODSA integration; run with NODE_PATH pointing to jsdom. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {fileURLToPath, pathToFileURL} = require('node:url');
const {JSDOM, VirtualConsole} = require('jsdom');

async function loadPage(page) {
  const base = path.resolve(__dirname, '../../AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation');
  const file = path.join(base, page);
  const errors = [], warnings = [], alerts = [], events = [], reports = [];
  const console = new VirtualConsole();
  console.on('jsdomError', error => errors.push(error.message));
  console.on('error', error => errors.push(String(error)));
  console.on('warn', text => warnings.push(text));
  const dom = new JSDOM(fs.readFileSync(file, 'utf8'), {
    url: 'http://localhost/AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation/' + page,
    runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: console
  });
  try {
    const w = dom.window, doc = w.document;
    w.alert = text => alerts.push(text);
    // Capture the external reporting boundary; all JSAV/ODSA code is real.
    w.SPLICE = {
      sendEvent: () => {},
      reportScoreAndState: (name, score) => reports.push({name, score})
    };
    const resources = [...doc.querySelectorAll('script[src], link[rel="stylesheet"]')];
    for (const resource of resources) {
      const relative = resource.getAttribute('src') || resource.getAttribute('href');
      const asset = fileURLToPath(new URL(relative, pathToFileURL(file)));
      assert(fs.existsSync(asset), 'Missing dependency: ' + relative);
      if (resource.tagName !== 'SCRIPT') continue;
      // Script elements preserve top-level strict-mode globals (PARAMS, etc.).
      const script = doc.createElement('script');
      script.textContent = fs.readFileSync(asset, 'utf8');
      doc.body.append(script);
    }
    await new Promise(resolve => w.jQuery(resolve));
    return {dom, errors, warnings, alerts, events, reports};
  } catch (error) {
    dom.window.close();
    throw error;
  }
}

(async function () {
  const {dom, errors, warnings, alerts, events, reports} = await loadPage('DerivationPRO.html');
  try {
    const w = dom.window, doc = w.document;
    assert.deepEqual(errors, []);
    const $ = id => doc.getElementById(id);
    const control = name => doc.querySelector('input[name="' + name + '"]');
    const clickControl = name => { assert(!control(name).disabled, name); control(name).click(); };
    const form = () => $('current-form').textContent;
    const exercise = w.derivationPRO.exercise;
    assert(exercise instanceof w.JSAV._types.Exercise);
    w.jQuery('body').on('jsav-log-event.regression', (event, data) => {
      if (data.score) events.push({type: data.type, score: JSON.parse(JSON.stringify(data.score))});
    });
    const score = (correct, student) => {
      assert.equal(exercise.grade().correct, correct);
      assert.equal(exercise.score.total, 3);
      assert.equal(exercise.score.student, student);
      assert.equal(Number($('progress').value), correct);
      assert.equal(doc.querySelector('.jsavcurrentscore').textContent, String(correct));
      assert.equal(doc.querySelector('.jsavmaxscore').textContent, '3');
    };
    const apply = (at, rule) => {
      const button = $('current-form').children[at];
      assert(!button.disabled); button.click(); $('rule-' + rule).click();
    };
    const finish = () => { apply(0, 0); apply(1, 0); apply(2, 1); };

    assert.equal(form(), 'S'); score(0, 0);
    assert.match($('prompt').textContent, /Starting from S, derive aaabbb/);
    assert(control('undo').disabled);
    ['reset', 'undo', 'answer', 'grade'].forEach(name => assert(control(name)));

    // No selection or a selected terminal cannot create a recorded step.
    $('rule-0').click(); assert.equal(form(), 'S'); score(0, 0);
    apply(0, 0); assert.equal(form(), 'aSb'); score(1, 1);
    apply(0, 0); assert.equal(form(), 'aSb'); score(1, 1);
    assert.match($('status').textContent, /matches the left side/);
    clickControl('undo'); assert.equal(form(), 'S'); score(0, 0);
    assert(control('undo').disabled);

    // Premature base rule is legal grammar syntax, but does not earn a point.
    apply(0, 1); assert.equal(form(), 'ab'); score(0, 1);
    assert.equal($('status').className, 'error');
    clickControl('grade'); assert.match($('status').textContent, /Your score: 0 \/ 3/);
    clickControl('undo'); assert.equal(form(), 'S'); score(0, 0);

    // Correct prefix, wrong branch, native Undo, then successful correction.
    apply(0, 0); apply(1, 1); assert.equal(form(), 'aabb'); score(1, 2);
    clickControl('undo'); assert.equal(form(), 'aSb'); score(1, 1);
    apply(1, 0); assert.equal(form(), 'aaSbb'); score(2, 2);
    apply(2, 0); assert.equal(form(), 'aaaSbbb'); score(2, 3);
    apply(3, 1); assert.equal(form(), 'aaaabbbb'); score(2, 4);
    assert.notEqual(doc.querySelector('.jsavamidone').textContent, 'DONE');
    clickControl('undo'); assert.equal(form(), 'aaaSbbb'); score(2, 3);
    clickControl('undo'); assert.equal(form(), 'aaSbb'); score(2, 2);
    apply(2, 1); assert.equal(form(), 'aaabbb'); score(3, 3);
    assert.equal($('history').rows.length, 4);
    assert.equal(doc.querySelector('.jsavamidone').textContent, 'DONE');
    assert($('rule-0').disabled);
    assert.equal(reports.at(-1).score, 1);
    clickControl('grade'); assert.match($('status').textContent, /Your score: 3 \/ 3/);
    clickControl('undo'); assert.equal(form(), 'aaSbb'); score(2, 2);
    assert.equal($('rule-0').disabled, false);
    assert.equal(doc.getElementById('prof_check_mark').style.display, 'none');
    assert.equal(reports.at(-1).score, 2 / 3);
    apply(2, 1); score(3, 3);

    // Reset after completion creates a fresh trace and model; repeat works.
    clickControl('reset'); assert.equal(form(), 'S'); score(0, 0);
    assert.equal(doc.getElementById('prof_check_mark').style.display, 'none');
    assert.equal($('history').rows.length, 1);
    assert(control('undo').disabled);
    finish(); score(3, 3);
    clickControl('reset'); apply(0, 0); score(1, 1);

    // Reference playback must not create student progress or reported credit.
    const beforeReports = reports.length;
    clickControl('answer');
    assert.equal($('credit-note').hidden, false);
    assert.match($('credit-note').textContent, /will not report a score/);
    const model = exercise.modelav;
    assert.equal(exercise.modelStructures.value(), 'S');
    model.forward(); assert.equal(exercise.modelStructures.value(), 'aSb');
    model.end(); assert.equal(exercise.modelStructures.value(), 'aaabbb');
    assert.equal(form(), 'aSb'); score(1, 1);
    assert.equal(reports.length, beforeReports);
    exercise.modelDialog.hide();
    apply(1, 0); apply(2, 1); score(3, 3);
    clickControl('grade');
    assert.equal(reports.length, beforeReports, 'Model-answer practice must not report a score');
    clickControl('reset'); score(0, 0);
    finish(); score(3, 3);
    assert.equal(reports.at(-1).score, 1);
    assert(reports.length > beforeReports);
    assert.equal(doc.querySelectorAll('#credit_disabled_msg').length, 0);
    assert.equal($('credit-note').hidden, true);
    assert.deepEqual(alerts, [], 'Use inline feedback instead of blocking alerts');
    assert(events.some(event => event.type === 'jsav-exercise-grade-change' && event.score.correct === 3));
    assert.deepEqual(errors, []);
    assert.deepEqual(warnings, []);
    process.stdout.write('PASS: real JSAV grading, partial credit, wrong branches, native Undo/Reset/Grade, reference isolation and ODSA score reporting.\n');
  } finally {
    dom.window.close();
  }
  for (const page of ['DerivationPalindromePRO.html', 'DerivationLeftmostPRO.html']) {
    const harness = await loadPage(page);
    try {
      const w = harness.dom.window, doc = w.document, exercise = w.derivationPRO.exercise;
      const $ = id => doc.getElementById(id);
      const control = name => doc.querySelector('input[name="' + name + '"]');
      const clickControl = name => { assert(!control(name).disabled); control(name).click(); };
      const form = () => $('current-form').textContent;
      const palindrome = page === 'DerivationPalindromePRO.html', total = palindrome ? 3 : 5;
      const taskId = palindrome ? 'pifla-palindrome' : 'pifla-leftmost-aacbb';
      const target = palindrome ? 'ababa' : 'aacbb';
      const check = (expected, points, student) => {
        assert.equal(form(), expected);
        assert.equal(exercise.grade().correct, points);
        assert.equal(exercise.score.total, total);
        assert.equal(exercise.score.student, student);
        assert.equal($('history').rows.length, student + 1);
        assert.equal(Number($('progress').value), points);
        assert.equal(Number($('progress').max), total);
        assert.equal(doc.querySelector('.jsavmaxscore').textContent, String(total));
        assert.equal(doc.querySelector('.jsavcurrentscore').textContent, String(points));
      };
      const apply = (at, rule) => {
        assert(!$('current-form').children[at].disabled);
        $('current-form').children[at].click(); $('rule-' + rule).click();
      };
      assert.equal(w.ODSA.SETTINGS.AV_NAME, page.replace('.html', ''));
      assert.equal(w.DerivationPROConfig.exerciseId, taskId);
      assert.equal($('target').textContent, target);
      assert.match($('prompt').textContent, new RegExp(target));
      assert.equal(doc.querySelector('.scored-links [aria-current="page"]').getAttribute('href'), page);
      assert.equal(doc.querySelectorAll('.scored-links a').length, 3);
      assert.match($('examples-link').href, new RegExp('#' + taskId + '$'));
      for (const link of doc.querySelectorAll('.scored-links a')) {
        assert(fs.existsSync(path.join(path.dirname(__filename), '../../AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation', link.getAttribute('href'))));
      }
      check('S', 0, 0);
      assert(control('undo').disabled);
      if (palindrome) {
        // Empty/base productions and a wrong recursive choice must not earn credit.
        apply(0, 4); check('λ', 0, 1);
        clickControl('undo'); check('S', 0, 0);
        apply(0, 1); check('bSb', 0, 1);
        clickControl('undo'); check('S', 0, 0);
        apply(0, 0); check('aSa', 1, 1);
        apply(1, 1); check('abSba', 2, 2);
        apply(2, 3); check('abbba', 2, 3);
        clickControl('undo'); check('abSba', 2, 2);
        apply(2, 2); check('ababa', 3, 3);
      } else {
        assert.match($('prompt').textContent, /leftmost nonterminal/);
        apply(0, 0); check('AcB', 1, 1);
        // B has a valid matching rule, but A is still the leftmost nonterminal.
        apply(2, 3); check('AcB', 1, 1);
        assert.match($('status').textContent, /leftmost/);
        apply(0, 2); check('cB', 1, 2);
        clickControl('undo'); check('AcB', 1, 1);
        apply(0, 1); check('aAacB', 2, 2);
        apply(4, 4); check('aAacB', 2, 2);
        assert.match($('status').textContent, /leftmost/);
        apply(1, 2); check('aacB', 3, 3); // A → λ earns one point.
        apply(3, 4); check('aac', 3, 4);
        clickControl('undo'); check('aacB', 3, 3);
        apply(3, 3); check('aacBbb', 4, 4);
        apply(3, 4); check('aacbb', 5, 5); // B → λ earns the fifth point.
        assert.equal([...$('tree').querySelectorAll('text')].filter(text => text.textContent === 'λ').length, 2);
      }
      assert.equal(doc.querySelector('.jsavamidone').textContent, 'DONE');
      assert.equal($('tree').querySelector('svg').getAttribute('aria-label'), 'Parse tree for ' + target);
      assert.equal(harness.reports.at(-1).score, 1);
      assert.equal(harness.reports.at(-1).name, page.replace('.html', ''));
      clickControl('grade'); assert.match($('status').textContent, new RegExp('Your score: ' + total + ' / ' + total));
      clickControl('undo');
      check(palindrome ? 'abSba' : 'aacBbb', total - 1, total - 1);
      assert.equal(doc.getElementById('prof_check_mark').style.display, 'none');
      // Inspect the native model independently of student progress.
      const before = harness.reports.length;
      clickControl('answer'); exercise.modelav.end();
      assert.equal(exercise.modelStructures.value(), target);
      check(palindrome ? 'abSba' : 'aacBbb', total - 1, total - 1);
      exercise.modelDialog.hide();
      apply(palindrome ? 2 : 3, palindrome ? 2 : 4);
      check(target, total, total);
      clickControl('grade'); assert.equal(harness.reports.length, before);
      clickControl('reset'); check('S', 0, 0);
      assert.equal($('tree').querySelector('svg').getAttribute('aria-label'), 'Parse tree for S');
      assert.equal($('tree').querySelectorAll('text').length, 1);
      assert.equal($('credit-note').hidden, true);
      const reference = w.DerivationExerciseData.find(task => task.id === taskId).verified_steps[0];
      reference.forEach(step => apply(step.at, step.rule));
      check(target, total, total);
      assert.equal(harness.reports.at(-1).score, 1);
      assert(harness.reports.length > before);
      assert.deepEqual(harness.alerts, []);
      assert.deepEqual(harness.errors, []);
      assert.deepEqual(harness.warnings, []);
    } finally {
      harness.dom.window.close();
    }
  }
  process.stdout.write('PASS: two additional instances share one template; palindrome/empty rules, five-step leftmost grading, score identities, trees, Undo/Reset and model isolation.\n');
})().catch(error => { process.stderr.write(error.stack + '\n'); process.exitCode = 1; });
