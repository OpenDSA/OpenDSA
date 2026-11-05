/* JSAV exercise template for a derivation with a specified reference sequence. */
(function ($) {
  'use strict';
  function GrammarDerivationExercise(container, task, solution, options) {
    const root = $(container), node = id => root.find('#' + id)[0];
    const reference = task.verified_steps[solution || 0];
    const preview = !!(options && options.preview);
    // Textbook embeds supply threshold through the standard OpenDSA parameter.
    const configuredRate = ODSA.UTILS.params.threshold ?? task.passRate;
    const passRate = Number(configuredRate);
    if (!['number', 'string'].includes(typeof configuredRate) || String(configuredRate).trim() === '' ||
        !Number.isFinite(passRate) || passRate < 0 || passRate > 1) {
      throw new Error('The passing threshold must be a number between 0 and 1.');
    }
    // Deliberately outside JSAV's recorded state: Undo cannot restore lost credit.
    const lostSteps = new Set();
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
    // Determine the minimum whole points using the same comparison as grading,
    // including thresholds that fall exactly on a fraction such as 2/3.
    let requiredPoints = 0;
    while (requiredPoints / reference.length < passRate) requiredPoints++;
    let formState, traceState, selected = null, exercise, creditAllowed = true;
    const av = new JSAV(root, {lang: 'en', logEvent: function (event) {
      // A generic author preview may load any JSON file. It must never report
      // those different tasks under one OpenDSA score identity.
      if (preview) return;
      // Keep model-answer practice out of the scoring pipeline until Reset.
      // Both the standard Grade button and live progress use this event sink.
      if (event.type === 'jsav-exercise-model-open') {
        if (!student().complete()) {
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
      // odsaAV shows its local check mark for completion, including a failed
      // attempt. Keep the mark consistent with this exercise's passing rate.
      if (exercise && (!passed() || !creditAllowed)) $('#prof_check_mark, #check_mark').hide();
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
    function passed() {
      return student().complete() && exercise.score.correct >= requiredPoints;
    }
    function percent(value) { return Number((value * 100).toFixed(1)) + '%'; }
    function penalize(step, message) {
      const alreadyLost = lostSteps.has(step);
      lostSteps.add(step);
      selected = null;
      refresh(true, message + ' The derivation has not changed. ' + (alreadyLost ?
        'This step has already lost its point; no additional point was lost.' :
        'The point for step ' + (step + 1) + ' is lost for this attempt.') +
        ' Try again. Only Reset restores eligibility for lost points.', true);
      node('current-form').focus({preventScroll: true});
    }
    function apply(rule) {
      if (!selected || selectedText() !== task.rules[rule][0]) {
        render('Select a substring that matches the left side of the production.', true);
        return;
      }
      const state = student(), step = state.history().length;
      const result = state.apply(rule, selected[0]);
      // A matching production submitted in the wrong derivation order is a
      // mistake too; merely clicking a symbol or an unmatched rule is not.
      if (!result.ok) { penalize(step, result.message); return; }
      formState.value(state.current());
      traceState.value(encode(state.history()));
      selected = null;
      // One production application is one JSAV gradeable step.
      exercise.gradeableStep();
      const score = exercise.grade();
      if (score.correct + score.undo < score.student) {
        // Check the recorded state with JSAV, then discard the wrong step
        // without sending an intermediate score or leaving a wrong tree.
        undo();
        penalize(step, 'Incorrect step for this target. The step was automatically undone.');
        return;
      }
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
      const done = state.complete();
      if (!passed() || !creditAllowed) $('#prof_check_mark, #check_mark').hide();
      root.find('.jsavamidone').text(done ? 'DONE' : 'In progress');
      node('progress').max = score.total;
      node('progress').value = steps.length;
      node('attempt-summary').textContent = 'Steps completed: ' + steps.length + ' / ' + score.total +
        '. Points lost this attempt: ' + lostSteps.size + '. Required to pass: ' + percent(passRate) +
        ' (at least ' + requiredPoints + ' / ' + score.total + ' points, with the derivation completed).';
      const outcome = !creditAllowed ? 'Practice only; select Reset to begin a new scored attempt.' :
        passed() ? 'Passed.' : 'Not passed. Select Reset to try again.';
      node('result').textContent = done ? 'Derivation complete. Score: ' + score.correct + ' / ' + score.total +
        ' (' + percent(score.correct / score.total) + '). ' + outcome : '';
      node('result').className = done ? (passed() && creditAllowed ? 'success' : 'error') : '';
      node('status').textContent = message || (done ? '' :
        'Complete the next derivation step. An incorrect step is automatically undone and loses that step\'s point.');
      node('status').className = error ? 'error' : '';
      ODSA.AV.sendResizeMsg();
    }
    function refresh(report, message, error) {
      exercise.grade();
      render(message, error);
      if (report) av.logEvent({type: 'jsav-exercise-grade-change', score: $.extend({}, exercise.score)});
    }
    node('exercise-title').textContent = task.title;
    node('prompt').textContent = task.prompt || task.description;
    node('target').textContent = task.target;
    node('source').href = task.url;
    node('source').textContent = task.source;
    document.getElementById('examples-link').href = 'DerivationExercises.html' + (preview ? '' : '#' + task.id);
    node('preview-note').hidden = !preview;
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
      // Retain native controls and sequence grading. The template adds inline
      // automatic undo and a persistent per-step credit ledger below.
      feedback: 'atend', grader: 'default', controls: root.find('.jsavexercisecontrols'),
      modelButtonTitle: 'Model Answer', gradeButtonTitle: 'Grade',
      showGrade: function () {
        this.grade();
        render('Your score: ' + this.score.correct + ' / ' + this.score.total +
          (creditAllowed ? '.' : '. Practice only; select Reset to begin a new scored attempt.'));
      }
    });
    const reset = exercise.reset.bind(exercise), undo = exercise.undo.bind(exercise);
    const grade = exercise.grade.bind(exercise);
    exercise.grade = function () {
      const score = grade();
      const completed = score.correct;
      score.undo = [...lostSteps].filter(step => step < completed).length;
      score.fix = 0;
      score.correct = completed - score.undo;
      // OpenDSA computes completion from (correct + undo + fix) / total.
      // Count lost steps only after they are successfully completed, so a
      // failed attempt cannot report completion before reaching the target.
      return score;
    };
    exercise.reset = function () {
      creditAllowed = true;
      lostSteps.clear();
      node('credit-note').hidden = true;
      reset();
      if (!preview) ODSA.AV.logExerciseInit({exercise: task.id, target: task.target});
      refresh(false);
    };
    exercise.undo = function () {
      if (!trace().length) return;
      undo(); selected = null; refresh(true);
    };
    exercise.reset();
    return {jsav: av, exercise, task};
  }
  window.GrammarDerivationExercise = GrammarDerivationExercise;
  $(function () {
    document.getElementById('container').innerHTML = window.DerivationPROLayout;
    const preview = document.body.dataset.preview === 'true';
    const importer = document.getElementById('json-import');
    const importStatus = document.getElementById('import-status');
    if (preview) {
      importer.hidden = false;
      const input = document.getElementById('json-file');
      const choose = document.getElementById('choose-json');
      const filenameLabel = document.getElementById('json-filename');
      choose.addEventListener('click', () => input.click());
      const clear = document.getElementById('clear-json');
      clear.hidden = new URLSearchParams(window.location.search).get('local') !== '1';
      input.addEventListener('change', function () {
        const file = input.files[0];
        if (!file) return;
        input.disabled = true;
        choose.disabled = true;
        filenameLabel.textContent = file.name;
        importStatus.className = '';
        importStatus.textContent = 'Reading ' + file.name + '…';
        window.derivationImportReady = (async function () {
          try {
            await window.DerivationPROConfig.importFile(file);
            window.location.replace('DerivationPreview.html?local=1');
          } catch (error) {
            importStatus.textContent = error.message;
            importStatus.className = 'error';
          } finally {
            input.disabled = false;
            choose.disabled = false;
            input.value = '';
          }
        })();
      });
      clear.addEventListener('click', function () {
        try {
          window.DerivationPROConfig.clearLocal();
          window.location.replace('DerivationPreview.html');
        } catch (error) {
          importStatus.textContent = error.message;
          importStatus.className = 'error';
        }
      });
    }
    // Each textbook iframe represents one exercise identity. Keep navigation
    // between tasks on the standalone page so iframe scores cannot be mixed.
    if (window.self !== window.top) document.body.classList.add('embedded');
    document.getElementById('status').textContent = 'Loading exercise…';
    window.derivationPROReady = (async function () {
      try {
        const {task, preview, filename} = await window.DerivationPROConfig.load();
        if (!task) {
          document.getElementById('derivation-pro').hidden = true;
          importStatus.textContent = 'Choose a JSON file to begin.';
          return null;
        }
        if (preview) {
          importStatus.textContent = 'Loaded: ' + filename;
          document.getElementById('json-filename').textContent = filename;
        }
        document.title = (preview ? 'Author preview: ' : '') + task.title + ' — Grammar Derivation Exercise';
        window.derivationPRO = new GrammarDerivationExercise('#derivation-pro', task, 0, {preview});
        return window.derivationPRO;
      } catch (error) {
        const panel = document.getElementById('derivation-pro');
        panel.textContent = 'Unable to start this exercise. ' + error.message;
        panel.setAttribute('role', 'alert');
        console.error(error);
        ODSA.AV.sendResizeMsg();
        return null;
      }
    })();
  });
})(jQuery);
