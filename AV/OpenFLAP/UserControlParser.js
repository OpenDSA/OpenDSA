/* Manual production application: no search, reference route, or grading. */
(function (root) {
  'use strict';
  function create(rules, target) {
    const start = rules[0][0], steps = [];
    const current = () => steps.length ? steps[steps.length - 1].after : start;
    function occurrences(rule) {
      const left = rules[rule] && rules[rule][0], form = current(), positions = [];
      if (left) for (let at = 0; at <= form.length - left.length; at++) {
        if (form.slice(at, at + left.length) === left) positions.push(at);
      }
      return positions;
    }
    function apply(rule, at) {
      if (!Number.isInteger(rule) || !Number.isInteger(at) || !occurrences(rule).includes(at)) {
        return {ok: false, message: 'Choose a production and a matching occurrence.'};
      }
      const before = current(), left = rules[rule][0], rhs = rules[rule][2];
      const after = before.slice(0, at) + (rhs === 'λ' ? '' : rhs) + before.slice(at + left.length);
      if (steps.length >= 200 || after.length > 512) return {ok: false,
        message: 'Display limit reached (200 steps or 512 symbols). Use Previous or Reset; this is not a rejection.'};
      steps.push({rule, at, before, after});
      return {ok: true};
    }
    return {start, target, current, occurrences, apply, reached: () => current() === target,
      history: () => steps.map(s => Object.assign({}, s)), previous: () => steps.pop(), reset: () => { steps.length = 0; }};
  }
  const api = {create};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.UserControlParser = api;
})(typeof window === 'undefined' ? globalThis : window);
