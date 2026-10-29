/* JSAV exercise template for a derivation with a specified reference sequence. */
(function ($) {
  'use strict';
  function GrammarDerivationExercise(container, task, solution) {
    const root = $(container), node = id => root.find('#' + id)[0];
    const reference = task.verified_steps[solution || 0];
    const engine = window.DerivationExerciseEngine;
    const substringRules = task.rules.some(([left]) => left.length > 1);
    // Validate the configured model before constructing a scored exercise.
    const modelCheck = engine.create(task);
    if (!reference || !reference.length) throw new Error('A reference derivation is required.');
    reference.forEach(step => {
      const result = modelCheck.apply(step.rule, step.at);
      if (!result.ok || modelCheck.current() !== step.after) throw new Error('Invalid reference derivation.');
    });
    if (!modelCheck.complete()) throw new Error('The reference must reach the target.');
    let formState, traceState, selected = null, exercise, creditAllowed = true;
    const av = new JSAV(root, {lang: 'en', logEvent: function (event) {
      // Keep model-answer practice out of the scoring pipeline until Reset.
      // Both the standard Grade button and live progress use this event sink.
      if (event.type === 'jsav-exercise-model-open') {
        if (exercise.score.correct !== exercise.score.total) {
          creditAllowed = false;
          node('credit-note').hidden = false;
          node('credit-note').textContent = 'Model Answer opened. You can continue practicing, but this attempt will not report a score. Select Reset to begin a new scored attempt.';
        }
        // The shared model-open handler uses a blocking window.alert. This
        // template supplies the same policy inline and logs a namespaced event.
        event.type = 'grammar-derivation-model-open';
      }
      if (event.type === 'jsav-exercise-reset') creditAllowed = true;
      if (!creditAllowed && ['jsav-exercise-grade', 'jsav-exercise-grade-change'].includes(event.type)) return;
      $('body').trigger('jsav-log-event', [event]);
    }});
    av.SPEED = 0;
    av.recorded();
    const encode = steps => encodeURIComponent(JSON.stringify(steps));
    function trace() { return JSON.parse(decodeURIComponent(traceState.value())); }
    function student() {
      const state = engine.create(task);
      trace().forEach(step => state.apply(step.rule, step.at));
      return state;
    }
    function initialize() {
      if (formState) formState.element.remove();
      if (traceState) traceState.element.remove();
      formState = av.variable('S');
      traceState = av.variable(encode([]));
      selected = null;
      return formState;
    }
    function model(modelav) {
      const value = modelav.variable('S', {visible: true, label: 'Sentential form: '});
      modelav.displayInit();
      reference.forEach(step => {
        const rule = task.rules[step.rule];
        modelav.umsg('Apply ' + rule[0] + ' → ' + rule[1] + ' at position ' + (step.at + 1) + '.');
        value.value(step.after);
        modelav.gradeableStep();
      });
      return value;
    }
    function make(tag, text) {
      const value = document.createElement(tag);
      if (text !== undefined) value.textContent = text;
      return value;
    }
    function renderTree(steps) {
      const drawing = window.BruteForceDerivation;
      const graph = drawing.layout(drawing.build(task.rules.map(([left, right]) => [left, '→', right]),
        {start: 'S', steps}, steps.length));
      function svg(tag, attributes, text) {
        const value = document.createElementNS('http://www.w3.org/2000/svg', tag);
        Object.entries(attributes).forEach(([key, entry]) => value.setAttribute(key, entry));
        if (text !== undefined) value.textContent = text;
        return value;
      }
      const image = svg('svg', {width: graph.width, height: graph.height,
        viewBox: '0 0 ' + graph.width + ' ' + graph.height, role: 'img',
        'aria-label': 'Parse tree for ' + (steps.length ? steps[steps.length - 1].after || 'λ' : 'S')});
      graph.edges.forEach(edge => {
        const from = graph.nodes[edge.from], to = graph.nodes[edge.to];
        image.append(svg('line', {x1: from.x, y1: from.y + 20, x2: to.x, y2: to.y - 20,
          stroke: '#66727d', 'stroke-width': 2}));
      });
      graph.nodes.forEach(value => {
        image.append(svg('ellipse', {cx: value.x, cy: value.y, rx: value.width / 2, ry: 20,
          fill: value.kind === 'variable' ? '#f4f8fd' : '#d8f0d8', stroke: '#42586c', 'stroke-width': 2}));
        image.append(svg('text', {x: value.x, y: value.y + 6, 'text-anchor': 'middle',
          'font-family': 'Arial, sans-serif', 'font-size': 20}, value.symbol));
      });
      node('tree').replaceChildren(image);
    }
    function select(at) {
      selected = substringRules && selected && selected[0] === selected[1] && selected[0] !== at ?
        [Math.min(selected[0], at), Math.max(selected[0], at)] : [at, at];
      render();
      node('current-form').children[at].focus({preventScroll: true});
    }
    function selectedText() {
      return selected ? formState.value().slice(selected[0], selected[1] + 1) : '';
    }
    function apply(rule) {
      if (!selected || selectedText() !== task.rules[rule][0]) {
        render('Select a substring that matches the left side of the production.', true);
        return;
      }
      const state = student(), result = state.apply(rule, selected[0]);
      if (!result.ok) { render(result.message, true); return; }
      formState.value(state.current());
      traceState.value(encode(state.history()));
      selected = null;
      // One production application is one JSAV gradeable step.
      exercise.gradeableStep();
      refresh(true);
      node('current-form').focus({preventScroll: true});
    }
    function render(message, error) {
      const state = student(), steps = state.history(), form = state.current();
      const formNode = node('current-form');
      formNode.replaceChildren();
      Array.from(form).forEach((symbol, at) => {
        const button = make('button', symbol);
        button.type = 'button'; button.className = 'symbol' + (/[A-Z]/.test(symbol) ? ' variable' : '');
        const chosen = !!selected && at >= selected[0] && at <= selected[1];
        button.classList.toggle('selected', chosen);
        button.setAttribute('aria-pressed', String(chosen));
        button.setAttribute('aria-label', symbol + ', symbol ' + (at + 1));
        button.disabled = state.complete();
        button.addEventListener('click', () => select(at));
        formNode.append(button);
      });
      if (!form) formNode.append(make('span', 'λ'));
      node('selection-label').textContent = selected ? 'Selected: ' + selectedText() + '. Choose a production.' :
        substringRules ? 'Click one symbol, or the first and last symbols of a substring.' : 'Click the nonterminal you want to replace.';
      const available = node('available-rules'); available.replaceChildren();
      task.rules.forEach(([left, right], rule) => {
        if (selectedText() !== left) return;
        const button = make('button', left + ' → ' + right);
        button.type = 'button'; button.addEventListener('click', () => apply(rule)); available.append(button);
      });
      node('step-count').textContent = 'Step ' + steps.length;
      const body = node('history'); body.replaceChildren();
      [null].concat(steps).forEach((step, i) => {
        const row = make('tr'), rule = step && task.rules[step.rule];
        [String(i), step ? rule[0] + ' → ' + rule[1] : 'Start', step ? step.after || 'λ' : 'S']
          .forEach(text => row.append(make('td', text)));
        body.append(row);
      });
      renderTree(steps);
      root.find('input[name="undo"]').prop('disabled', !steps.length);
      root.find('#rules button').prop('disabled', state.complete());
      const score = exercise.score;
      root.find('.jsavcurrentscore').text(score.correct);
      root.find('.jsavmaxscore').text(score.total);
      const done = state.complete() && score.correct === score.total;
      if (!done || !creditAllowed) $('#prof_check_mark, #check_mark').hide();
      root.find('.jsavamidone').text(done ? 'DONE' : 'In progress');
      node('progress').max = score.total;
      node('progress').value = score.correct;
      const wrong = score.correct < steps.length;
      node('status').textContent = message || (done ? 'Derivation complete. All ' + score.total + ' steps are correct.' : wrong ?
        'This production is valid, but it leaves the reference derivation for this target. Use Undo to revise it.' :
        score.correct + ' of ' + score.total + ' steps correct.');
      node('status').className = error || wrong ? 'error' : done ? 'success' : '';
      ODSA.AV.sendResizeMsg();
    }
    function refresh(report) {
      exercise.grade();
      render();
      if (report) av.logEvent({type: 'jsav-exercise-grade-change', score: $.extend({}, exercise.score)});
    }
    node('exercise-title').textContent = task.title;
    node('prompt').textContent = task.prompt || task.description;
    node('target').textContent = task.target;
    node('source').href = task.url;
    node('source').textContent = task.source;
    document.getElementById('examples-link').href = 'DerivationExercises.html#' + task.id;
    document.querySelectorAll('.scored-links a').forEach(link => {
      if (link.dataset.exercise === task.id) link.setAttribute('aria-current', 'page');
    });
    node('parse-tree-view').addEventListener('toggle', () => ODSA.AV.sendResizeMsg());
    const table = make('table'), head = make('thead'), heading = make('tr'), body = make('tbody');
    ['Left', '', 'Right'].forEach(text => heading.append(make('th', text)));
    head.append(heading); table.append(head, body); node('rules').append(table);
    task.rules.forEach(([left, right], rule) => {
      const row = make('tr'), cell = make('td'), button = make('button', left);
      button.type = 'button'; button.className = 'rule'; button.id = 'rule-' + rule;
      button.setAttribute('aria-label', left + ' → ' + right);
      cell.append(button); row.append(cell, make('td', '→'), make('td', right));
      row.className = 'rule-row interactive';
      row.addEventListener('click', () => { if (!button.disabled) apply(rule); }); body.append(row);
    });
    exercise = av.exercise(model, initialize, {
      // Grade the recorded sequence while keeping standard Undo/Reset/Model/Grade controls.
      feedback: 'atend', grader: 'default', controls: root.find('.jsavexercisecontrols'),
      modelButtonTitle: 'Model Answer', gradeButtonTitle: 'Grade',
      showGrade: function () {
        this.grade();
        render('Your score: ' + this.score.correct + ' / ' + this.score.total +
          (creditAllowed ? '.' : '. Practice only; select Reset to begin a new scored attempt.'));
      }
    });
    const reset = exercise.reset.bind(exercise), undo = exercise.undo.bind(exercise);
    exercise.reset = function () {
      creditAllowed = true;
      node('credit-note').hidden = true;
      reset();
      ODSA.AV.logExerciseInit({exercise: task.id, target: task.target});
      refresh(false);
    };
    exercise.undo = function () {
      if (!trace().length) return;
      undo(); selected = null; refresh(true);
    };
    exercise.reset();
    return {jsav: av, exercise};
  }
  window.GrammarDerivationExercise = GrammarDerivationExercise;
  $(function () {
    document.getElementById('container').innerHTML = window.DerivationPROLayout;
    // Each textbook iframe represents one exercise identity. Keep navigation
    // between tasks on the standalone page so iframe scores cannot be mixed.
    if (window.self !== window.top) document.body.classList.add('embedded');
    const config = window.DerivationPROConfig;
    const task = window.DerivationExerciseData.find(item => item.id === config.exerciseId);
    if (!task) throw new Error('Unknown derivation exercise: ' + config.exerciseId);
    window.derivationPRO = new GrammarDerivationExercise('#derivation-pro', task, config.solution);
  });
})(jQuery);
