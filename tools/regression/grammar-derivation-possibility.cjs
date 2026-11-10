'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const folder = path.resolve(__dirname, '../../AV/OpenFLAP/exercises/FLAssignments/Grammar/derivation');
const {build} = require(path.join(folder, 'DerivationPossibility.js'));
for (const [file, paths, steps] of [['DerivationAmbiguousPRO', 2, 7], ['DerivationMultiplePRO', 6, 5]]) {
  const task = JSON.parse(fs.readFileSync(path.join(folder, file + '.json'), 'utf8'));
  const graph = build(task);
  assert.equal(graph.maxDepth, 18);
  assert.equal(graph.successfulPaths, paths);
  assert.deepEqual(graph.successfulLengths, [steps]);
  assert(graph.nodes.every(node => node.status !== 'unknown'));
  assert.equal(graph.classify('', 1).status, 'dead');
  if (paths === 2) {
    assert.equal(graph.classify('aA', 1).status, 'reachable');
    assert.equal(graph.classify('Bb', 1).status, 'reachable');
    assert.equal(graph.classify('aaS', 2).status, 'dead');
    assert.equal(graph.classify('aaA', 2).status, 'reachable');
  } else {
    assert.equal(graph.classify('aaABb', 2).status, 'reachable');
    assert.equal(graph.classify('aABbb', 2).status, 'reachable');
  }
}
// A sentential form may be longer than 3*n. Only rewrite depth is bounded.
const long = build({target: 'a', rules: [['S', 'ABCDEF'], ['ABCDEF', 'a']], leftmost: false});
assert.equal(long.maxDepth, 3);
assert.equal(long.classify('ABCDEF', 1).status, 'reachable');
assert.deepEqual(long.successfulLengths, [2]);
// Same form at different depths has different remaining search budgets.
const cycle = build({target: 'a', rules: [['S', 'A'], ['A', 'S'], ['A', 'a']], leftmost: false});
assert.equal(cycle.classify('S', 0).status, 'reachable');
assert.equal(cycle.classify('S', 2).status, 'unknown');
assert.equal(cycle.classify('A', 3).status, 'unknown');
assert(cycle.nodes.every(node => node.depth <= 3));
const budget = build({target: 'a', rules: [['S', 'a']]}, {maxStates: 1});
assert.equal(budget.classify('S', 0).status, 'unknown');
const epsilon = build({target: 'a', rules: [['S', 'AB'], ['A', 'λ'], ['B', 'a']], leftmost: false});
assert.equal(epsilon.classify('AB', 1).status, 'reachable');
assert.deepEqual(epsilon.successfulLengths, [3]);
console.log('PASS: both supplied grammars, all successful routes, early dead ends, depth-only bound, layer-aware cycles, nullable rules and conservative resource cutoffs.');

for (const [number, count, length] of [[22, 450, 11], [10, 8, 5]]) {
  const task = JSON.parse(fs.readFileSync(path.join(folder, 'DerivationTextbook' + number + 'PRO.json')));
  const g = build(task);
  assert.equal(g.successfulPaths, count);
  assert.deepEqual(g.successfulLengths, [length]);
  assert(g.nodes.every(n => n.status !== 'unknown'));
  let routes = 0;
  function walk(n, depth) {
    if (n.form === task.target) { assert.equal(depth, length); routes++; return; }
    for (const e of n.edges) if (g.nodes[e.to].status === 'reachable') walk(g.nodes[e.to], depth + 1);
  }
  walk(g.nodes[0], 0); assert.equal(routes, count);
}
console.log('PASS: all 458 successful textbook routes.');
