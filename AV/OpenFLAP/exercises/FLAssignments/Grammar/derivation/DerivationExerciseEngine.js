/* Manual substring replacement; no parser search or grading side effects. */
(function (root) {
  'use strict';
  function create(exercise) {
    const steps = [];
    function current() { return steps.length ? steps[steps.length - 1].after : 'S'; }
    function complete() { return current() === exercise.target && !/[A-Z]/.test(current()); }
    function apply(ruleIndex, at) {
      const rule = exercise.rules[ruleIndex], before = current();
      if (!Number.isInteger(ruleIndex) || !rule || !Number.isInteger(at) || at < 0) {
        return {ok: false, message: 'Select a symbol or substring to replace.'};
      }
      if (complete()) return {ok: false, message: 'The target has been reached. Select Undo or Reset to continue.'};
      const [left, rhs] = rule, right = rhs === 'λ' ? '' : rhs;
      if (before.slice(at, at + left.length) !== left) {
        return {ok: false, message: 'The selected occurrence does not match the production. The derivation has not changed.'};
      }
      if (exercise.leftmost && at !== before.search(/[A-Z]/)) {
        return {ok: false, message: 'This exercise requires a leftmost derivation. Replace the leftmost nonterminal first.'};
      }
      const after = before.slice(0, at) + right + before.slice(at + left.length);
      if (steps.length >= 200 || after.length > 512) {
        return {ok: false, message: 'This derivation is too long. Select Undo or Reset.'};
      }
      steps.push({rule: ruleIndex, at, before, after});
      return {ok: true, complete: complete()};
    }
    return {current, complete, apply, history: () => steps.map(step => Object.assign({}, step)),
      undo: () => steps.pop(), reset: () => { steps.length = 0; }};
  }
  const api = {create};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DerivationExerciseEngine = api;
})(typeof window === 'undefined' ? globalThis : window);
