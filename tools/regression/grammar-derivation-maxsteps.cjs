'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const {loadPage, controls} = require('./grammar-derivation-jsav.cjs');
(async function () {
  for (const [file, max] of [['DerivationTextbook11PRO.json', undefined], ['DerivationTextbook11TwoStepsPRO.json', 2], ['DerivationTextbook11FourStepsPRO.json', 4]]) {
    const h = await loadPage('DerivationPreview.html', '?config=' + file);
    try {
      const {w, $, click, apply, task} = controls(h);
      const ex = w.derivationPRO.exercise;
      assert.equal(task.maxSteps, max);
      assert.equal(w.derivationPRO.possibility, null);
      assert.equal($('progress').hidden, true);
      apply(0, 0); assert.equal(ex.score.correct, 0);
      apply(2, 2); assert.equal(ex.score.correct, 1);
      assert.match($('result').textContent, /Exercise completed/);
      click('reset');
      apply(0, 1); apply(0, 0);
      if (max === 2) {
        assert.match($('result').textContent, /step limit reached/);
        assert.equal(ex.score.correct, 0);
        assert(h.dom.window.document.querySelector('input[name="undo"]').disabled);
        assert([...$('rules').querySelectorAll('button')].every(b => b.disabled));
        ex.undo(); assert.equal($('current-form').textContent, 'aaSbbS');
        click('reset'); apply(0, 0); apply(2, 2); assert.equal(ex.score.correct, 1);
      } else {
        apply(2, 2); apply(4, 2); assert.equal(ex.score.correct, 1);
        assert.match($('result').textContent, /Exercise completed/);
        click('undo'); assert.equal(ex.score.correct, 0);
        click('reset'); assert.equal($('current-form').textContent, 'S');
      }
      const definition = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation/' + file)));
      for (const invalid of [0, -1, 2.5, '4', null, 201]) assert.throws(() => w.DerivationPROConfig.validate({...definition, maxSteps: invalid}), /maxSteps/);
      assert.deepEqual(h.reports, []); assert.deepEqual(h.errors, []);
    } finally { h.dom.window.close(); }
  }
  const finalScored = await loadPage('DerivationTextbook11PRO.html');
  try {
    const {w, click, apply} = controls(finalScored);
    apply(0, 1); apply(0, 0); apply(2, 2); apply(4, 2);
    assert.equal(finalScored.reports.at(-1).score, 1);
    click('reset');apply(0, 0);click('answer');w.derivationPRO.exercise.modelDialog.hide();apply(2, 2);
    const reportsBefore = finalScored.reports.length;click('grade');assert.equal(finalScored.reports.length,reportsBefore);
    click('reset');apply(0, 0);apply(2, 2);assert.equal(finalScored.reports.at(-1).score,1);
  } finally { finalScored.dom.window.close(); }
  process.stdout.write('PASS: completion grading, optional maxSteps, 2/4-step routes, exact boundary, terminal failure until Reset, Undo, config validation, preview isolation and scored reporting.\n');
})().catch(error => { process.stderr.write(error.stack + '\n'); process.exitCode = 1; });
