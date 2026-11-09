const assert = require('node:assert/strict');
const parse = require('../../AV/OpenFLAP/BruteForceParser.js');
const {build, layout} = require('../../AV/OpenFLAP/BruteForceDerivation.js');
const grammar = pairs => pairs.map(([left, right]) => [left, '→', right]);
let checks = 0;
function check(name, action) { action(); checks++; console.log('PASS', name); }
function tree(rules, input, step) {
  const result = parse(rules, input);
  assert.equal(result.status, 'Accept');
  return layout(build(rules, result, step === undefined ? result.steps.length : step));
}
const g = grammar([['S', 'AB'], ['A', 'a'], ['B', 'b']]);
check('CFG children have structural depth, independent of expansion order', () => {
  const t = tree(g, 'ab');
  assert.equal(t.isTree, true);
  const bySymbol = Object.fromEntries(t.nodes.map(n => [n.symbol, n]));
  assert.equal(bySymbol.A.depth, 1); assert.equal(bySymbol.B.depth, 1);
  assert.equal(bySymbol.a.depth, 2); assert.equal(bySymbol.b.depth, 2);
  assert.equal(bySymbol.a.y, bySymbol.b.y);
  assert.equal(bySymbol.S.x, (bySymbol.A.x + bySymbol.B.x) / 2);
  assert.equal(bySymbol.A.x, bySymbol.a.x); assert.equal(bySymbol.B.x, bySymbol.b.x);
  assert.ok(bySymbol.a.x < bySymbol.b.x);
  assert.deepEqual(t.edges, [{from: 0, to: 1}, {from: 0, to: 2}, {from: 1, to: 3}, {from: 2, to: 4}]);
});
check('Step prefixes reconstruct the current sentential form', () => {
  ['S', 'AB', 'aB', 'ab'].forEach((form, step) => assert.equal(tree(g, 'ab', step).form, form));
  assert.equal(tree(g, 'ab', 0).nodes.length, 1);
});
check('Repeated variables and nullable replacements keep distinct parents', () => {
  const t = tree(grammar([['S', 'AaA'], ['A', 'λ'], ['A', 'b']]), 'ba');
  assert.equal(t.form, 'ba');
  const variables = t.nodes.filter(n => n.symbol === 'A');
  assert.equal(variables.length, 2);
  const childSymbols = variables.map(n => t.nodes[n.children[0]].symbol);
  assert.deepEqual(childSymbols, ['b', 'λ']);
});
check('Recursive trees preserve terminal order and non-S roots', () => {
  const t = tree(grammar([['Q', 'aQ'], ['Q', 'λ']]), 'aa');
  assert.equal(t.nodes[t.roots[0]].symbol, 'Q');
  const leaves = [], visit = id => {
    const n = t.nodes[id]; if (!n.children.length) leaves.push(n.symbol);
    else n.children.forEach(visit);
  };
  t.roots.forEach(visit);
  assert.equal(leaves.filter(x => x !== 'λ').join(''), 'aa');
});
check('UTF-16 parser offsets map to Unicode visualization nodes', () => {
  const t = tree(grammar([['S', '😀A'], ['A', 'a']]), '😀a');
  assert.equal(t.form, '😀a');
  const a = t.nodes.find(n => n.symbol === 'A');
  assert.equal(t.nodes[a.children[0]].symbol, 'a');
  assert.equal(t.nodes.filter(n => n.symbol === '😀').length, 1);
});
check('Unrestricted replacements group all participating parents', () => {
  const t = tree(grammar([['S', 'AB'], ['AB', 'c']]), 'c');
  assert.equal(t.isTree, false); assert.equal(t.form, 'c');
  const group = t.nodes.find(n => n.kind === 'group');
  assert.equal(group.symbol, 'AB');
  assert.equal(t.edges.filter(e => e.to === group.id).length, 2);
  assert.equal(t.nodes[group.children[0]].symbol, 'c');
  assert.ok(t.nodes.every(n => Number.isFinite(n.x) && Number.isFinite(n.y)));
});
check('Overlapping unrestricted matches reconstruct each selected step', () => {
  const rules = grammar([['S', 'AAA'], ['AA', 'b'], ['Ab', 'c']]);
  const result = parse(rules, 'c');
  result.steps.forEach((step, i) => assert.equal(build(rules, result, i + 1).form, step.after));
});
check('Empty-string derivation retains its lambda leaf', () => {
  const t = tree(grammar([['S', 'λ']]), '');
  assert.equal(t.form, '');
  assert.equal(t.nodes[1].symbol, 'λ'); assert.equal(t.nodes[1].kind, 'epsilon');
});
check('Deep tree layout uses no recursive call stack', () => {
  const nodes = Array.from({length: 15000}, (_, id) => ({id, symbol: 'S', depth: id,
    kind: 'variable', children: id === 14999 ? [] : [id + 1]}));
  const t = layout({isTree: true, roots: [0], nodes, edges: []});
  assert.ok(t.nodes.every(n => Number.isFinite(n.x) && Number.isFinite(n.y)));
  assert.ok(t.height > 100000);
});
console.log('ALL', checks, 'DERIVATION CHECKS PASSED');
