/* Grammar helpers for both modes; derivation playback for single-input mode. */
(function (root) {
  'use strict';
  const $ = id => document.getElementById(id);
  function row(body, values) {
    const tr = body.insertRow();
    values.forEach(value => { tr.insertCell().textContent = value; });
    return tr;
  }
  function readGrammar(mode) {
    let rules;
    try { rules = JSON.parse(localStorage.getItem('grammars')); } catch (_) { /* Report below. */ }
    if (!Array.isArray(rules) || !rules.length || rules.some(p =>
      !Array.isArray(p) || typeof p[0] !== 'string' || !p[0] || typeof p[2] !== 'string')) {
      throw new Error('No valid grammar was supplied. Open ' + mode + ' from the Grammar Editor.');
    }
    return rules.map(p => [p[0], '→', p[2]]);
  }
  function renderGrammar(rules) {
    $('grammar').tBodies[0].replaceChildren();
    rules.forEach(p => row($('grammar').tBodies[0], [p[0], '→', p[2] || 'λ']));
  }
  function inputValue(raw) { return raw === '!' || raw === 'λ' ? '' : raw; }
  function statusText(result) {
    return result.status === 'Undetermined' ? 'Undetermined (search limit reached)' : result.status;
  }
  function back(rules) {
    if (rules) localStorage.setItem('transformedGrammar', JSON.stringify(rules));
    location.href = 'grammarEditor.html';
  }
  class DerivationView {
    constructor(rules) {
      this.rules = rules; this.result = null; this.step = 0;
      ['firstStep', 'previousStep', 'nextStep', 'lastStep'].forEach(id => {
        $(id).onclick = () => {
          if (!this.result) return;
          this.step = id === 'firstStep' ? 0 : id === 'lastStep' ? this.result.steps.length :
            Math.max(0, Math.min(this.result.steps.length, this.step + (id === 'nextStep' ? 1 : -1)));
          this.render();
        };
      });
      $('viewmode').onchange = () => { if (this.result) this.render(); };
      this.clear();
    }
    clear() {
      this.result = null; this.step = 0; $('trace').hidden = true;
      $('tree').replaceChildren(); $('derivation').tBodies[0].replaceChildren();
      $('stepStatus').textContent = $('stepDescription').textContent = '';
      ['firstStep', 'previousStep', 'nextStep', 'lastStep'].forEach(id => { $(id).disabled = true; });
      Array.from($('grammar').tBodies[0].rows).forEach(tr => tr.classList.remove('applied-rule'));
    }
    show(result, input) {
      this.result = result; this.input = input; this.step = 0;
      $('traceInput').textContent = 'Input: ' + (input || 'λ');
      $('trace').hidden = false; this.render();
    }
    render() {
      const graph = BruteForceDerivation.layout(BruteForceDerivation.build(this.rules, this.result, this.step));
      const tableMode = $('viewmode').value === 'table';
      $('treeOption').textContent = graph.isTree ? 'Noninverted Tree' : 'Derivation Graph';
      $('derivationTitle').textContent = tableMode ? 'Derivation Table' : graph.isTree ? 'Parse Tree' : 'Derivation Graph';
      $('viewNote').textContent = tableMode ?
        'Each row shows an applied production and the resulting sentential form.' : graph.isTree ?
        'Leaves read left to right give the current form; λ denotes the empty string.' :
        'Multi-symbol left sides are grouped in a blue node. This derivation is shown as a graph.';
      $('tree').hidden = tableMode; $('derivationTable').hidden = !tableMode;
      $('stepStatus').textContent = 'Step ' + this.step + ' of ' + this.result.steps.length;
      $('firstStep').disabled = $('previousStep').disabled = this.step === 0;
      $('nextStep').disabled = $('lastStep').disabled = this.step === this.result.steps.length;
      const applied = this.step ? this.result.steps[this.step - 1].rule : -1;
      Array.from($('grammar').tBodies[0].rows).forEach((tr, i) => tr.classList.toggle('applied-rule', i === applied));
      const rule = this.rules[applied];
      $('stepDescription').textContent = (rule ? 'Applied ' + rule[0] + ' → ' + (rule[2] || 'λ') + '. ' : '') +
        'Current form: ' + (graph.form || 'λ');
      const body = $('derivation').tBodies[0]; body.replaceChildren();
      row(body, ['Start', this.result.start]);
      this.result.steps.slice(0, this.step).forEach(step => {
        const p = this.rules[step.rule]; row(body, [p[0] + ' → ' + (p[2] || 'λ'), step.after || 'λ']);
      });
      body.lastElementChild.classList.add('current-step');
      this.renderSVG(graph);
    }
    renderSVG(graph) {
      const ns = 'http://www.w3.org/2000/svg';
      function element(tag, attrs) {
        const e = document.createElementNS(ns, tag);
        Object.entries(attrs || {}).forEach(([name, value]) => e.setAttribute(name, value));
        return e;
      }
      const svg = element('svg', {width: graph.width, height: graph.height,
        viewBox: '0 0 ' + graph.width + ' ' + graph.height, role: 'img',
        'aria-label': (graph.isTree ? 'Parse tree' : 'Derivation graph') + ' at step ' + this.step});
      const title = element('title');
      title.textContent = 'Input ' + (this.input || 'λ') + '; current form ' + (graph.form || 'λ'); svg.append(title);
      graph.edges.forEach(edge => {
        const from = graph.nodes[edge.from], to = graph.nodes[edge.to];
        svg.append(element('line', {x1: from.x, y1: from.y + 22, x2: to.x, y2: to.y - 22,
          class: 'derivation-edge', 'data-from': edge.from, 'data-to': edge.to}));
      });
      graph.nodes.forEach(n => {
        const classes = ['derivation-node', n.kind];
        if (graph.currentParents.includes(n.id)) classes.push('applied');
        if (graph.currentChildren.includes(n.id)) classes.push('created');
        const group = element('g', {class: classes.join(' '), 'data-node-id': n.id,
          'data-symbol': n.symbol, 'data-depth': n.depth});
        group.append(n.kind === 'group' ? element('rect', {x: n.x - n.width / 2, y: n.y - 22,
          width: n.width, height: 44, rx: 12, class: 'node-shape'}) :
          element('ellipse', {cx: n.x, cy: n.y, rx: n.width / 2, ry: 22, class: 'node-shape'}));
        const text = element('text', {x: n.x, y: n.y}); text.textContent = n.symbol;
        group.append(text); svg.append(group);
      });
      $('tree').replaceChildren(svg);
    }
  }
  root.BruteForceParseUI = {row, readGrammar, renderGrammar, inputValue, statusText, back, DerivationView};
})(window);
