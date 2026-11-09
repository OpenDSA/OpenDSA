/* Load and validate JSON exercise definitions; no task data lives in this file. */
(function () {
  'use strict';
  const localKey = 'OpenFLAP.grammarDerivationPreview';
  function isPreview() { return document.body.dataset.preview === 'true' && window.self === window.top; }
  function validate(data) {
    function requireValue(condition, message) {
      if (!condition) throw new Error('Invalid exercise definition: ' + message);
    }
    requireValue(data && typeof data === 'object' && !Array.isArray(data), 'expected a JSON object.');
    requireValue(data.schemaVersion === 1, 'schemaVersion must be 1.');
    requireValue(typeof data.id === 'string' && /^[a-z0-9][a-z0-9_-]*$/i.test(data.id), 'id must be a stable exercise identifier.');
    for (const key of ['title', 'prompt', 'source', 'url']) {
      requireValue(typeof data[key] === 'string' && data[key].trim().length > 0, key + ' must be a nonempty string.');
    }
    const sourceURL = new URL(data.url, window.location.href);
    requireValue(['http:', 'https:'].includes(sourceURL.protocol), 'url must be an HTTP or HTTPS source link.');
    requireValue(data.startSymbol === 'S', 'this template currently requires startSymbol S.');
    requireValue(typeof data.target === 'string' && !/[A-Zλ]/.test(data.target), 'target must contain only terminals; use "" for the empty string.');
    requireValue(typeof data.leftmost === 'boolean', 'leftmost must be true or false.');
    requireValue(typeof data.passRate === 'number' && Number.isFinite(data.passRate) && data.passRate >= 0 && data.passRate <= 1,
      'passRate must be a number between 0 and 1.');
    const grading = data.grading ?? 'reference';
    requireValue(['reference', 'possibility'].includes(grading), 'grading must be reference or possibility.');
    requireValue(grading !== 'possibility' || data.target.length > 0,
      'possibility grading needs a nonempty target for the 3 × target length depth bound.');
    requireValue(Array.isArray(data.rules) && data.rules.length > 0, 'rules must be a nonempty array.');
    const rules = data.rules.map((rule, i) => {
      requireValue(Array.isArray(rule) && rule.length === 2 && rule.every(symbols => typeof symbols === 'string'),
        'production ' + (i + 1) + ' must contain a left and right string.');
      requireValue(/[A-Z]/.test(rule[0]) && !rule[0].includes('λ'), 'production ' + (i + 1) + ' must replace a nonterminal or a substring containing one.');
      requireValue(!rule[1].includes('λ') || rule[1] === 'λ', 'use λ only as an entire empty right side.');
      // Selection positions and the shared engine use single UTF-16 symbols.
      requireValue(rule.every(symbols => Array.from(symbols).length === symbols.length), 'productions must use single-character symbols.');
      return [rule[0], rule[1] || 'λ'];
    });
    requireValue(Array.isArray(data.reference) && data.reference.length > 0 && data.reference.length <= 200,
      'reference must list between 1 and 200 production applications.');
    const task = {id: data.id, title: data.title, prompt: data.prompt, source: data.source, url: sourceURL.href,
      rules, target: data.target, leftmost: data.leftmost, passRate: data.passRate, grading};
    const state = window.DerivationExerciseEngine.create(task);
    const steps = data.reference.map((step, i) => {
      requireValue(step && Number.isInteger(step.production) && step.production >= 1 && step.production <= rules.length &&
        Number.isInteger(step.position) && step.position >= 1, 'reference step ' + (i + 1) + ' needs valid production and position numbers (starting at 1).');
      const before = state.current(), rule = step.production - 1, at = step.position - 1;
      const result = state.apply(rule, at);
      requireValue(result.ok, 'reference step ' + (i + 1) + ': ' + result.message);
      return {rule, at, before, after: state.current()};
    });
    requireValue(state.complete(), 'the reference must finish with exactly the target and no nonterminals.');
    task.verified_steps = [steps];
    if (grading === 'possibility') {
      task.possibility = window.DerivationPossibility.build(task);
      requireValue(task.possibility.classify('S', 0).status === 'reachable',
        'no successful route was found within the search limits; this is not proof of a dead end.');
      requireValue(task.possibility.successfulLengths.length === 1 && task.possibility.successfulLengths[0] === steps.length,
        'successful routes have different step counts; a scoring policy is needed before grading this exercise.');
    }
    return task;
  }
  async function importFile(file) {
    if (!isPreview()) throw new Error('Local files can only be imported in the standalone author preview.');
    const text = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Unable to read ' + file.name + '. Please select the file again.'));
      reader.readAsText(file);
    });
    let definition;
    try { definition = JSON.parse(text); }
    catch (error) { throw new Error('Invalid JSON in ' + file.name + '. Check commas, quotes and brackets.'); }
    validate(definition);
    // Reloading creates fresh JSAV controls, model dialogs and event handlers.
    // sessionStorage keeps the validated definition in this tab, off the server.
    try { window.sessionStorage.setItem(localKey, JSON.stringify({name: file.name, definition})); }
    catch (error) { throw new Error('This browser cannot save a temporary preview. Allow session storage and try again.'); }
  }
  function clearLocal() {
    if (!isPreview()) throw new Error('Local previews can only be cleared in the standalone author preview.');
    window.sessionStorage.removeItem(localKey);
  }
  async function load() {
    const preview = document.body.dataset.preview === 'true';
    const params = new URLSearchParams(window.location.search);
    if (!preview && (params.has('config') || params.has('local'))) {
      throw new Error('Use DerivationPreview.html?config=your-file.json to preview a different exercise. Scored pages have a fixed definition.');
    }
    if (preview && window.self !== window.top) throw new Error('Author previews cannot be embedded as scored textbook exercises.');
    if (preview && params.get('local') === '1') {
      const saved = JSON.parse(window.sessionStorage.getItem(localKey) || 'null');
      if (!saved || !saved.definition) throw new Error('No local preview is saved in this tab. Choose a JSON file to begin.');
      return {task: validate(saved.definition), preview: true, filename: saved.name};
    }
    const filename = preview ? params.get('config') : document.body.dataset.config;
    if (preview && !filename) return {task: null, preview: true};
    if (!filename) throw new Error('Choose an exercise JSON file, for example DerivationPreview.html?config=DerivationPRO.json.');
    const url = new URL(filename, window.location.href);
    if (url.origin !== window.location.origin || !url.pathname.endsWith('.json') || url.search || url.hash) {
      throw new Error('The exercise definition must be a JSON file on this website.');
    }
    const response = await window.fetch(url.href, {cache: 'no-store'});
    if (!response.ok) throw new Error('Unable to load ' + filename + ' (HTTP ' + response.status + ').');
    let data;
    try { data = await response.json(); }
    catch (error) { throw new Error('Invalid JSON in ' + filename + '. Check commas, quotes and brackets.'); }
    return {task: validate(data), preview, filename};
  }
  window.DerivationPROConfig = {load, validate, importFile, clearLocal};
})();
