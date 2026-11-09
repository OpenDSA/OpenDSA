/* Reconstruct and lay out an accepted derivation without changing the parser. */
(function (root) {
  'use strict';
  function build(productions, result, stepCount) {
    const nodes = [], edges = [];
    const isTree = productions.every(p => /^[A-Z]$/.test(p[0]));
    const count = Math.max(0, Math.min(result.steps.length, stepCount));
    function node(symbol, depth, kind) {
      const value = {id: nodes.length, symbol, depth, children: [],
        kind: kind || (/^[A-Z]$/.test(symbol) ? 'variable' : 'terminal')};
      nodes.push(value);
      return value;
    }
    function connect(parent, child) {
      parent.children.push(child.id);
      edges.push({from: parent.id, to: child.id});
    }
    const roots = Array.from(result.start, symbol => node(symbol, 0));
    let frontier = roots.slice(), currentParents = [], currentChildren = [];
    for (const step of result.steps.slice(0, count)) {
      const rule = productions[step.rule];
      const offset = Array.from(step.before.slice(0, step.at)).length;
      const parents = frontier.slice(offset, offset + Array.from(rule[0]).length);
      if (!parents.length || frontier.map(n => n.symbol).join('') !== step.before) {
        throw new Error('The derivation does not match the grammar.');
      }
      let anchor = parents[0];
      if (parents.length > 1) {
        anchor = node(rule[0], Math.max(...parents.map(n => n.depth)) + 1, 'group');
        parents.forEach(parent => connect(parent, anchor));
      }
      const right = rule[2] === 'λ' ? '' : rule[2];
      const children = Array.from(right || 'λ', symbol =>
        node(symbol, anchor.depth + 1, right ? undefined : 'epsilon'));
      children.forEach(child => connect(anchor, child));
      frontier.splice(offset, parents.length, ...(right ? children : []));
      if (frontier.map(n => n.symbol).join('') !== step.after) {
        throw new Error('The derivation contains an invalid replacement.');
      }
      currentParents = parents.map(n => n.id);
      currentChildren = children.map(n => n.id);
    }
    return {nodes, edges, roots: roots.map(n => n.id), isTree,
      currentParents, currentChildren, form: frontier.map(n => n.symbol).join('')};
  }
  function layout(graph) {
    const gap = 26, levelGap = 82, margin = 30;
    const nodes = graph.nodes.map(n => Object.assign({}, n, {
      width: Math.max(44, Array.from(n.symbol).length * 14 + 24)
    }));
    let width;
    if (graph.isTree) {
      // Children follow their parent in creation order. Iterative layout also
      // handles long unary derivations without overflowing the call stack.
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const childrenWidth = n.children.reduce((sum, id) => sum + nodes[id].span, 0)
          + Math.max(0, n.children.length - 1) * gap;
        n.span = Math.max(n.width, childrenWidth);
      }
      const total = graph.roots.reduce((sum, id) => sum + nodes[id].span, 0)
        + Math.max(0, graph.roots.length - 1) * gap;
      width = Math.max(320, total + margin * 2);
      let left = (width - total) / 2;
      const queue = [];
      graph.roots.forEach(id => { queue.push({id, left}); left += nodes[id].span + gap; });
      for (let i = 0; i < queue.length; i++) {
        const position = queue[i], n = nodes[position.id];
        n.x = position.left + n.span / 2;
        const childWidth = n.children.reduce((sum, id) => sum + nodes[id].span, 0)
          + Math.max(0, n.children.length - 1) * gap;
        let childLeft = position.left + (n.span - childWidth) / 2;
        n.children.forEach(id => {
          queue.push({id, left: childLeft}); childLeft += nodes[id].span + gap;
        });
      }
    } else {
      // Multi-parent unrestricted replacements require a graph, not a CFG tree.
      const layers = new Map();
      nodes.forEach(n => {
        if (!layers.has(n.depth)) layers.set(n.depth, []);
        layers.get(n.depth).push(n);
      });
      const widths = Array.from(layers.values(), layer =>
        layer.reduce((sum, n) => sum + n.width, 0) + Math.max(0, layer.length - 1) * gap);
      width = Math.max(320, ...widths.map(w => w + margin * 2));
      let index = 0;
      for (const layer of layers.values()) {
        let left = (width - widths[index++]) / 2;
        layer.forEach(n => { n.x = left + n.width / 2; left += n.width + gap; });
      }
    }
    let deepest = 0;
    nodes.forEach(n => { n.y = margin + 22 + n.depth * levelGap; deepest = Math.max(deepest, n.depth); });
    return Object.assign({}, graph, {nodes, width, height: margin * 2 + 44 + deepest * levelGap});
  }
  const api = {build, layout};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.BruteForceDerivation = api;
})(typeof window === 'undefined' ? globalThis : window);
