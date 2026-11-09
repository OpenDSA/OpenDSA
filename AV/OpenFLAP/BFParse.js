/* JFLAP-style single-input brute-force parsing and derivation playback. */
(function () {
  'use strict';
  const ui = BruteForceParseUI, $ = id => document.getElementById(id);
  let rules;
  try { rules = ui.readGrammar('Brute Force Parse'); }
  catch (error) {
    $('message').textContent = error.message;
    $('startbutton').disabled = $('input').disabled = true;
    $('backbutton').onclick = () => ui.back();
    return;
  }
  ui.renderGrammar(rules);
  const viewer = new ui.DerivationView(rules);
  $('backbutton').onclick = () => ui.back(rules);
  $('input').oninput = () => {
    viewer.clear(); $('message').textContent = ''; $('message').className = '';
  };
  $('inputForm').onsubmit = event => {
    event.preventDefault(); viewer.clear();
    const input = ui.inputValue($('input').value);
    try {
      const result = bruteForceParseGrammar(rules, input);
      $('message').className = result.status === 'Accept' ? 'accepted' :
        result.status === 'Reject' ? 'rejected' : 'undetermined';
      $('message').textContent = ui.statusText(result) + ': ' + (input ? JSON.stringify(input) : 'λ') +
        (result.status === 'Undetermined' ? '. The search did not finish; this is not a rejection.' : '');
      if (result.status === 'Accept') viewer.show(result, input);
    } catch (error) {
      $('message').className = ''; $('message').textContent = error.message;
    }
  };
})();
