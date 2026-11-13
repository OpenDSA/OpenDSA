/* JFLAP-style manual parsing, using shared grammar transfer and tree rendering. */
(function () {
  'use strict';
  const ui = BruteForceParseUI, $ = id => document.getElementById(id);
  let rules, state, selectedRule = null;
  $('backbutton').onclick = () => ui.back(rules);
  try { rules = ui.readGrammar('User Control Parse'); }
  catch (error) {
    $('message').textContent = error.message; $('input').disabled = $('startbutton').disabled = true; return;
  }
  function message(text, success) {
    $('message').textContent = text; $('message').className = success ? 'accepted' : '';
  }
  ui.renderGrammar(rules);
  Array.from($('grammar').tBodies[0].rows).forEach((row, rule) => {
    const button = document.createElement('button'); button.type = 'button';
    button.textContent = rules[rule][0]; button.setAttribute('aria-label', rules[rule][0] + ' → ' + (rules[rule][2] || 'λ'));
    button.id = 'manual-rule-' + rule; button.disabled = true;
    row.cells[0].replaceChildren(button);
    button.onclick = () => { selectedRule = rule; render(); };
  });
  function render(at) {
    const steps = state.history(), form = state.current();
    $('target').textContent = state.target || 'λ'; $('stepCount').textContent = 'Step ' + steps.length;
    $('chosenRule').textContent = selectedRule === null ? 'Choose a production from the grammar.' :
      'Production: ' + rules[selectedRule][0] + ' → ' + (rules[selectedRule][2] || 'λ');
    const select = $('occurrence'); select.replaceChildren();
    const positions = selectedRule === null ? [] : state.occurrences(selectedRule);
    const placeholder = document.createElement('option'); placeholder.value = '';
    placeholder.textContent = !positions.length ? 'No matching occurrence' : positions.length === 1 ? 'Choose occurrence' : 'Choose which occurrence';
    select.append(placeholder);
    positions.forEach(position => {
      const option = document.createElement('option'); option.value = String(position);
      option.textContent = 'Position ' + (position + 1) + ': ' + rules[selectedRule][0]; select.append(option);
    });
    select.value = positions.includes(at) ? String(at) : positions.length === 1 ? String(positions[0]) : '';
    select.disabled = !positions.length;
    $('currentForm').replaceChildren();
    Array.from(form).forEach((symbol, index, symbols) => {
      const position = symbols.slice(0, index).join('').length;
      const button = document.createElement('button'); button.type = 'button'; button.textContent = symbol; button.className = 'symbol';
      button.setAttribute('aria-label', symbol + ', position ' + (position + 1));
      button.dataset.position = position;
      button.onclick = () => {
        if (selectedRule === null) { message('Select a production first.'); return; }
        if (!positions.includes(position)) { message('The selected position does not match this production.'); return; }
        render(position);
      };
      $('currentForm').append(button);
    });
    if (!form) $('currentForm').textContent = 'λ';
    highlight();
    $('previous').disabled = !steps.length;
    Array.from($('grammar').tBodies[0].rows).forEach((row, i) => row.classList.toggle('selected', i === selectedRule));
    const graph = BruteForceDerivation.layout(BruteForceDerivation.build(rules, {start: state.start, steps}, steps.length));
    $('view').options[0].textContent = graph.isTree ? 'Noninverted Tree' : 'Derivation Graph';
    $('viewNote').textContent = graph.isTree ? 'Leaves show the current form; λ denotes the empty string.' :
      'Multi-symbol replacements are shown as a derivation graph, grouping the replaced substring.';
    ui.DerivationView.prototype.renderSVG.call({step: steps.length, input: state.target}, graph);
    const body = $('history'); body.replaceChildren(); ui.row(body, ['0', 'Start', state.start]);
    steps.forEach((s, i) => ui.row(body, [String(i + 1), rules[s.rule][0] + ' → ' + (rules[s.rule][2] || 'λ'), s.after || 'λ']));
    updateView();
  }
  function highlight() {
    const raw = $('occurrence').value, at = Number(raw);
    Array.from($('currentForm').children).forEach(button => {
      const i = Number(button.dataset.position);
      button.classList.toggle('selected', raw !== '' && selectedRule !== null && i >= at && i < at + rules[selectedRule][0].length);
    });
    $('step').disabled = raw === '';
  }
  function updateView() { const table = $('view').value === 'table'; $('tree').hidden = table; $('tableView').hidden = !table; }
  $('view').onchange = updateView; $('occurrence').onchange = highlight;
  $('inputForm').onsubmit = event => {
    event.preventDefault(); state = UserControlParser.create(rules, ui.inputValue($('input').value)); selectedRule = null;
    $('manual').hidden = false;
    Array.from($('grammar').querySelectorAll('button')).forEach(b => { b.disabled = false; });
    render(); message(state.reached() ? 'Target reached.' : 'Choose a production and an occurrence, then select Step.', state.reached());
  };
  $('step').onclick = () => {
    const result = state.apply(selectedRule, Number($('occurrence').value));
    if (!result.ok) { message(result.message); return; }
    render(); message(state.reached() ? 'Target reached. Use Previous to explore another route, or Reset to start again.' :
      'Production applied. Continue exploring, or use Previous to try a different route.', state.reached());
  };
  $('previous').onclick = () => { state.previous(); render(); message('Returned to the previous step.'); };
  $('reset').onclick = () => { state.reset(); selectedRule = null; render(); message('Derivation reset.'); };
  $('input').oninput = () => {
    state = null; selectedRule = null; $('manual').hidden = true;
    Array.from($('grammar').querySelectorAll('button')).forEach(b => { b.disabled = true; });
    message('Select Start to begin with the new target.');
  };
})();
