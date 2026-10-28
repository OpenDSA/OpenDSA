/* Bounded breadth-first derivation search. A cutoff is not a rejection. */
(function (root) {
  'use strict';
  function parse(productions, input, options) {
    options = options || {};
    const maxStates = options.maxStates || 10000;
    const maxLength = options.maxLength || Math.max(64, input.length + 32);
    const deadline = Date.now() + (options.maxMillis || 250);
    const rules = productions.map(p => ({left: p[0], right: p[2] === 'λ' ? '' : p[2]}));
    if (!rules.length || rules.some(p => !p.left)) throw new Error('A grammar with nonempty left sides is required.');
    const start = rules[0].left;
    const queue = [start], seen = new Map([[start, null]]);
    const noncontracting = rules.every(p => p.right.length >= p.left.length);
    let cutoff = false;
    function accepted(form) {
      const steps = [];
      while (seen.get(form)) { const step = seen.get(form); steps.push(step); form = step.before; }
      return {status: 'Accept', steps: steps.reverse(), start: start};
    }
    // Uppercase letters are variables in the editor, not input terminals.
    const target = form => form === input && !/[A-Z]/.test(form);
    for (let head = 0; head < queue.length; head++) {
      const form = queue[head];
      if (target(form)) return accepted(form);
      for (let rule = 0; rule < rules.length; rule++) {
        const p = rules[rule];
        for (let at = form.indexOf(p.left); at !== -1; at = form.indexOf(p.left, at + 1)) {
          if (Date.now() > deadline) return {status: 'Undetermined', steps: []};
          const next = form.slice(0, at) + p.right + form.slice(at + p.left.length);
          if (seen.has(next)) continue;
          if (noncontracting && next.length > input.length) continue;
          if (next.length > maxLength) { cutoff = true; continue; }
          seen.set(next, {before: form, after: next, rule: rule, at: at});
          if (target(next)) return accepted(next);
          if (seen.size >= maxStates) return {status: 'Undetermined', steps: []};
          queue.push(next);
        }
      }
    }
    return {status: cutoff ? 'Undetermined' : 'Reject', steps: []};
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = parse;
  else root.bruteForceParseGrammar = parse;
})(typeof window === 'undefined' ? globalThis : window);
