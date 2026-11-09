/* Multiple mode only tests inputs; single mode owns derivation playback. */
(function () {
  'use strict';
  const ui = BruteForceParseUI, $ = id => document.getElementById(id);
  let rules;
  try { rules = ui.readGrammar('Multiple Brute Force Parse'); }
  catch (error) {
    $('message').textContent = error.message;
    ['addinputbutton', 'deleterowbutton', 'runinputsbutton', 'clearbutton'].forEach(id => { $(id).disabled = true; });
    $('backbutton').onclick = () => ui.back();
    return;
  }
  ui.renderGrammar(rules);
  let count = 0;
  function changed() { $('message').textContent = 'Inputs changed. Select Run Inputs to update results.'; }
  function addInput() {
    const tr = ui.row($('table').tBodies[0], ['', '']);
    const input = document.createElement('input');
    input.setAttribute('aria-label', 'Input string'); input.id = 'input' + count++;
    input.addEventListener('input', () => {
      tr.cells[1].textContent = ''; tr.cells[1].className = ''; changed();
    });
    tr.cells[0].append(input); return input;
  }
  $('addinputbutton').onclick = () => { addInput().focus(); changed(); };
  $('deleterowbutton').onclick = () => {
    const body = $('table').tBodies[0];
    if (body.rows.length > 1) { body.deleteRow(-1); changed(); }
  };
  $('clearbutton').onclick = () => {
    $('table').tBodies[0].replaceChildren();
    for (let i = 0; i < 3; i++) addInput();
    $('message').textContent = '';
  };
  $('backbutton').onclick = () => ui.back(rules);
  $('runinputsbutton').onclick = async () => {
    $('message').textContent = 'Running inputs…';
    const controls = Array.from(document.querySelectorAll('#inputCommands button, #modeCommands button, #table input'));
    controls.forEach(e => { e.disabled = true; });
    const totals = {Accept: 0, Reject: 0, Undetermined: 0};
    try {
      for (const tr of Array.from($('table').tBodies[0].rows)) {
        tr.cells[1].textContent = ''; tr.cells[1].className = '';
        const raw = tr.cells[0].querySelector('input').value;
        if (!raw) continue;
        await new Promise(resolve => setTimeout(resolve, 0));
        const result = bruteForceParseGrammar(rules, ui.inputValue(raw));
        totals[result.status]++;
        tr.cells[1].textContent = ui.statusText(result);
        tr.cells[1].className = result.status === 'Accept' ? 'accepted' : result.status === 'Reject' ? 'rejected' : 'undetermined';
      }
      $('message').textContent = 'Finished: ' + totals.Accept + ' accepted, ' + totals.Reject + ' rejected, ' + totals.Undetermined + ' undetermined.' +
        (totals.Undetermined ? ' Undetermined means the search limit was reached, not rejection.' : '');
    } catch (error) { $('message').textContent = error.message; }
    finally { controls.forEach(e => { e.disabled = false; }); }
  };
  for (let i = 0; i < 3; i++) addInput();
})();
