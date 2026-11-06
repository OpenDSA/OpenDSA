/* Precompute a depth-bounded possibility tree, merging equal states per layer. */
(function (root) {
  'use strict';
  function build(task, options) {
    const limits = Object.assign({maxStates: 20000, maxEdges: 100000, maxChars: 512, maxTimeMs: 2000}, options);
    const maxDepth = 3 * task.target.length;
    const started = Date.now(), nodes = [], index = new Map();
    const cfg = task.rules.every(([left]) => /^[A-Z]$/.test(left));
    let edgeCount = 0;
    const key = (form, depth) => depth + ':' + form;
    function add(form, depth) {
      const id = nodes.length;
      const node = {id, form, depth, edges: [], cutoff: false, reason: '', status: 'dead', lengths: [], paths: 0};
      nodes.push(node); index.set(key(form, depth), node); return node;
    }
    function terminalMismatch(form) {
      if (!cfg) return false; // Contextual rules may also replace terminals.
      let at = 0;
      for (const symbol of form) {
        if (/[A-Z]/.test(symbol)) continue;
        at = task.target.indexOf(symbol, at);
        if (at === -1) return true;
        at++;
      }
      return false;
    }
    add('S', 0);
    // Breadth-first construction finishes before the first student action.
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.form === task.target) continue;
      if (terminalMismatch(node.form)) { node.reason = 'The existing terminals cannot form the target.'; continue; }
      const actions = [];
      const firstVariable = node.form.search(/[A-Z]/);
      for (let at = 0; at < node.form.length; at++) {
        if (task.leftmost && at !== firstVariable) continue;
        task.rules.forEach(([left, rhs], rule) => {
          if (node.form.slice(at, at + left.length) !== left) return;
          const right = rhs === 'λ' ? '' : rhs;
          actions.push({rule, at, form: node.form.slice(0, at) + right + node.form.slice(at + left.length)});
        });
      }
      if (!actions.length) { node.reason = 'No production can reach the target from this form.'; continue; }
      if (node.depth === maxDepth) { node.cutoff = true; node.reason = 'Maximum search depth reached.'; continue; }
      for (const action of actions) {
        let next = index.get(key(action.form, node.depth + 1));
        if (edgeCount >= limits.maxEdges || Date.now() - started > limits.maxTimeMs ||
            action.form.length > limits.maxChars || (!next && nodes.length >= limits.maxStates)) {
          node.cutoff = true; node.reason = 'Search resource limit reached.'; continue;
        }
        if (!next) next = add(action.form, node.depth + 1);
        node.edges.push({rule: action.rule, at: action.at, to: next.id}); edgeCount++;
      }
    }
    // Layers make this acyclic even when a grammar contains S -> S or cycles.
    // Unknown cutoffs propagate; they are never mislabeled as proved dead ends.
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];
      if (node.form === task.target) {
        node.status = 'reachable'; node.lengths = [0]; node.paths = 1; continue;
      }
      const lengths = new Set();
      let unknown = node.cutoff;
      for (const edge of node.edges) {
        const child = nodes[edge.to];
        if (child.status === 'unknown') unknown = true;
        child.lengths.forEach(length => lengths.add(length + 1));
        node.paths = Math.min(Number.MAX_SAFE_INTEGER, node.paths + child.paths);
      }
      node.lengths = [...lengths].sort((a, b) => a - b);
      node.status = lengths.size ? 'reachable' : unknown ? 'unknown' : 'dead';
    }
    return {nodes, maxDepth, edgeCount, successfulLengths: nodes[0].lengths,
      successfulPaths: nodes[0].paths, classify(form, depth) {
        return index.get(key(form, depth)) || {status: 'unknown', reason: 'This state was not fully searched.'};
      }};
  }
  const api = {build};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DerivationPossibility = api;
})(typeof window === 'undefined' ? globalThis : window);
