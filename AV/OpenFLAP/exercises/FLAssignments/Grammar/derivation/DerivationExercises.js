/* Local manual derivation exercises and separate reference-step playback. */
(function () {
  'use strict';
  const exercises = window.DerivationExerciseData;
  const engine = window.DerivationExerciseEngine;
  const drawing = window.BruteForceDerivation;
  const $ = id => document.getElementById(id);
  const sessions = new Map();
  const bookmarked = exercises.findIndex(ex => ex.id === location.hash.slice(1));
  let index = bookmarked >= 0 ? bookmarked : Math.max(0, exercises.findIndex(ex => ex.id === 'pifla-anbn'));
  let mode = 'practice', selected = null, message = '', messageKind = '';
  function exercise() { return exercises[index]; }
  function session() {
    if (!sessions.has(index)) sessions.set(index, {
      practice: engine.create(exercise()), reference: engine.create(exercise()), solution: 0, saved: []
    });
    return sessions.get(index);
  }
  function active() { return session()[mode]; }
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function announce(text, kind) { message = text; messageKind = kind || ''; }
  function graph(steps) {
    return drawing.build(exercise().rules.map(([l, r]) => [l, '→', r]), {start: 'S', steps}, steps.length);
  }
  function signature(g) {
    const node = id => [g.nodes[id].symbol, g.nodes[id].children.map(node)];
    return JSON.stringify(g.roots.map(node));
  }
  function saveCompletedTree() {
    if (!exercise().requiredTrees || mode !== 'practice' || !active().complete()) return;
    const steps = active().history(), key = signature(graph(steps));
    if (!session().saved.some(tree => tree.key === key)) session().saved.push({key, steps});
  }
  function selectedText() {
    return selected ? active().current().slice(selected[0], selected[1] + 1) : '';
  }
  function applyRule(ruleIndex) {
    const [left] = exercise().rules[ruleIndex];
    if (!selected || selectedText() !== left) {
      announce('Select a substring that exactly matches the left side of the production. The derivation has not changed.', 'error');
    } else {
      const result = active().apply(ruleIndex, selected[0]);
      if (result.ok) {
        selected = null;
        announce('', '');
        saveCompletedTree();
      } else announce(result.message, 'error');
    }
    render();
    $('current-form').focus({preventScroll: true});
  }
  function renderForm() {
    const form = active().current(), node = $('current-form');
    node.replaceChildren();
    if (!form) node.append(element('span', 'λ', 'symbol'));
    Array.from(form).forEach((symbol, i) => {
      const button = element('button', symbol, 'symbol' + (/[A-Z]/.test(symbol) ? ' variable' : ''));
      button.type = 'button'; button.id = 'symbol-' + i;
      button.disabled = mode !== 'practice';
      const chosen = !!selected && i >= selected[0] && i <= selected[1];
      button.classList.toggle('selected', chosen);
      button.setAttribute('aria-pressed', String(chosen));
      button.setAttribute('aria-label', symbol + ', symbol ' + (i + 1));
      button.addEventListener('click', () => {
        if (selected && selected[0] === selected[1] && selected[0] !== i) {
          selected = [Math.min(i, selected[0]), Math.max(i, selected[0])];
        } else selected = [i, i];
        announce(''); render(); $('symbol-' + i).focus({preventScroll: true});
      });
      node.append(button);
    });
    $('selection-label').textContent = mode === 'reference' ? 'Select Step to apply the next production.' :
      selected ? 'Selected: ' + selectedText() + ' (positions ' + (selected[0] + 1) + '–' + (selected[1] + 1) + '). Select a matching production.' :
        'Click one symbol, or click the first and last symbols of a substring.';
    const available = $('available-rules'); available.replaceChildren();
    available.hidden = mode !== 'practice' || !selected;
    if (!available.hidden) {
      exercise().rules.forEach(([left, right], i) => {
        if (left !== selectedText()) return;
        const button = element('button', left + ' → ' + right);
        button.type = 'button'; button.addEventListener('click', () => applyRule(i)); available.append(button);
      });
      if (!available.children.length) available.append(element('span', 'No production matches the selected substring.'));
    }
  }
  function renderRules() {
    const rules = $('rules'), history = active().history(), last = history[history.length - 1];
    const table = element('table'), columns = element('colgroup'), head = element('thead'), headings = element('tr'), body = element('tbody');
    ['left-column', 'arrow-column', 'right-column'].forEach(name => columns.append(element('col', undefined, name)));
    ['Left', '', 'Right'].forEach(text => headings.append(element('th', text)));
    head.append(headings); table.append(columns, head, body); rules.replaceChildren(table);
    exercise().rules.forEach(([left, right], i) => {
      const row = element('tr', undefined, 'rule-row'), button = element('button', left, 'rule');
      button.setAttribute('aria-label', left + ' → ' + right);
      button.id = 'rule-' + i; button.type = 'button';
      button.disabled = mode === 'reference';
      row.classList.toggle('matching', mode === 'practice' && selectedText() === left);
      row.classList.toggle('last-rule', mode === 'reference' && !!last && last.rule === i);
      row.classList.toggle('interactive', mode === 'practice');
      row.addEventListener('click', () => { if (!button.disabled) applyRule(i); });
      const leftCell = element('td'), arrowCell = element('td', undefined, 'production-arrow');
      const rightCell = element('td', right, 'production-right');
      arrowCell.append(element('span', '→')); leftCell.append(button);
      row.append(leftCell, arrowCell, rightCell); body.append(row);
    });
  }
  function renderHistory() {
    const body = $('history'); body.replaceChildren();
    const initial = element('tr');
    ['0', 'Start', 'S'].forEach(text => initial.append(element('td', text)));
    body.append(initial);
    active().history().forEach((step, i) => {
      const [left, right] = exercise().rules[step.rule], row = element('tr');
      row.append(element('td', String(i + 1)), element('td', left + ' → ' + right));
      const value = element('td'); value.append(element('code', step.after || 'λ')); row.append(value);
      row.title = 'Apply ' + left + ' → ' + right + ' at position ' + (step.at + 1) + ' in ' + step.before;
      body.append(row);
    });
  }
  function svgNode(tag, attributes, text) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function drawTree(container, steps) {
    const g = drawing.layout(graph(steps));
    const svg = svgNode('svg', {width: g.width, height: g.height, viewBox: '0 0 ' + g.width + ' ' + g.height,
      role: 'img', 'aria-label': 'Parse tree for ' + (steps.length ? steps[steps.length - 1].after : 'S')});
    g.edges.forEach(edge => {
      const a = g.nodes[edge.from], b = g.nodes[edge.to];
      svg.append(svgNode('line', {x1: a.x, y1: a.y + 20, x2: b.x, y2: b.y - 20,
        stroke: '#66727d', 'stroke-width': 2}));
    });
    g.nodes.forEach(node => {
      const recent = g.currentChildren.includes(node.id);
      svg.append(svgNode('ellipse', {cx: node.x, cy: node.y, rx: node.width / 2, ry: 20,
        fill: node.kind === 'variable' ? '#f4f8fd' : '#d8f0d8',
        stroke: recent ? '#2868a0' : '#42586c', 'stroke-width': recent ? 3 : 2}));
      svg.append(svgNode('text', {x: node.x, y: node.y + 6, 'text-anchor': 'middle',
        'font-family': 'Arial, sans-serif', 'font-size': 20, fill: '#161616'}, node.symbol));
    });
    container.replaceChildren(svg);
  }
  function renderComparison() {
    $('comparison').hidden = !exercise().requiredTrees || mode !== 'practice';
    if ($('comparison').hidden) return;
    const saved = session().saved;
    $('comparison-status').textContent = saved.length >= 2 ?
      'Two different parse trees have been constructed. This grammar is ambiguous.' :
      saved.length + '/2 distinct trees saved. Complete a derivation, select Reset, then construct a different leftmost derivation.';
    $('saved-trees').replaceChildren();
    saved.slice(0, 2).forEach((tree, i) => {
      const section = element('section'), view = element('div', undefined, 'tree-scroll');
      section.append(element('h3', 'Tree ' + (i + 1)), view);
      drawTree(view, tree.steps); $('saved-trees').append(section);
    });
  }
  function render() {
    const ex = exercise(), history = active().history(), reference = mode === 'reference';
    $('exercise-select').value = String(index);
    $('exercise-kind').textContent = ex.collection + ' — ' + ex.kind;
    $('exercise-title').textContent = ex.label;
    $('prompt').textContent = ex.description;
    $('target').textContent = ex.target;
    $('source-description').textContent = ex.source;
    $('adaptation').textContent = ex.notes;
    $('source').hidden = !ex.url;
    if (ex.url) $('source').href = ex.url;
    $('reference-mode').setAttribute('aria-pressed', String(reference));
    $('practice-mode').setAttribute('aria-pressed', String(!reference));
    $('solution-label').hidden = !reference || ex.solutions.length < 2;
    $('solution').value = String(session().solution);
    $('instructions').textContent = reference ?
      'Select Step to apply the next production, Previous to go back, or Reset to start again.' :
      'Select a symbol or substring, then click a production in the grammar. Use Undo to take back a step.' + (ex.leftmost ? ' Always replace the leftmost nonterminal in this exercise.' : '');
    $('step-count').textContent = 'Step ' + history.length;
    $('previous').hidden = !reference; $('next').hidden = !reference; $('undo').hidden = reference;
    $('previous').disabled = history.length === 0; $('undo').disabled = history.length === 0;
    $('next').disabled = history.length === ex.verified_steps[session().solution].length;
    const success = active().complete();
    let status = reference ? 'Start symbol: S.' : 'Select a substring, then apply a production.';
    if (history.length) {
      const step = history[history.length - 1], [l, r] = ex.rules[step.rule];
      status = step.before + ' ⇒ ' + (step.after || 'λ') + ' using ' + l + ' → ' + r + ' at position ' + (step.at + 1) + '.';
    }
    if (success) status = 'Derivation complete: ' + ex.target + '.' + (ex.requiredTrees ? ' Compare with another derivation to find a different parse tree.' : '');
    else if (!/[A-Z]/.test(active().current())) status = 'No nonterminals remain, but the target has not been reached. Select Undo or Reset.';
    $('status').textContent = message || status;
    $('status').className = message ? messageKind : success ? 'success' : '';
    renderForm(); renderRules(); renderHistory();
    $('hint-list').replaceChildren(...ex.hints.map(hint => element('li', hint)));
    const context = ex.rules.some(([l]) => !/^[A-Z]$/.test(l));
    if (context) {
      const [left, right] = ex.rules.find(([l]) => !/^[A-Z]$/.test(l));
      $('context-note').textContent = 'This grammar includes multi-symbol left sides, such as ' + left + ' → ' + right + '. Select the entire left side and follow the replacement in the derivation table.';
    }
    $('tree-option').disabled = context;
    if (context) $('viewmode').value = 'table';
    const treeView = !context && $('viewmode').value === 'tree';
    $('tree-section').hidden = !treeView; $('history-section').hidden = treeView;
    $('context-note').hidden = !context;
    if (treeView) drawTree($('tree'), history);
    renderComparison();
  }
  ['PIFLA examples', 'Earlier prototypes'].forEach(collection => {
    const group = element('optgroup'); group.label = collection;
    exercises.forEach((ex, i) => {
      if (ex.collection !== collection) return;
      const option = element('option', ex.label.includes(ex.target) ? ex.label : ex.label + ' (' + ex.target + ')');
      option.value = String(i); group.append(option);
    });
    $('exercise-select').append(group);
  });
  function selectExercise(nextIndex, updateHash) {
    index = nextIndex; selected = null; announce(''); $('hints').open = false;
    $('viewmode').value = 'tree';
    if (updateHash && location.protocol !== 'file:') window.history.replaceState(null, '', '#' + exercise().id);
    render();
  }
  $('exercise-select').addEventListener('change', () => selectExercise(Number($('exercise-select').value), true));
  window.addEventListener('hashchange', () => {
    const nextIndex = exercises.findIndex(ex => ex.id === location.hash.slice(1));
    if (nextIndex >= 0 && nextIndex !== index) selectExercise(nextIndex, false);
  });
  $('viewmode').addEventListener('change', render);
  ['reference', 'practice'].forEach(value => $(value + '-mode').addEventListener('click', () => {
    mode = value; selected = null; announce(''); render();
  }));
  $('next').addEventListener('click', () => {
    const next = exercise().verified_steps[session().solution][active().history().length];
    if (!next) return;
    const result = active().apply(next.rule, next.at);
    announce(result.ok ? '' : result.message, result.ok ? '' : 'error'); render();
  });
  $('previous').addEventListener('click', () => { active().undo(); announce(''); render(); });
  $('undo').addEventListener('click', () => { active().undo(); selected = null; announce(''); render(); });
  $('restart').addEventListener('click', () => { active().reset(); selected = null; announce(''); render(); });
  $('solution').addEventListener('change', () => {
    session().solution = Number($('solution').value); session().reference.reset(); announce(''); render();
  });
  render();
})();
