const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'DataStructures/FLA/PDA.js'), 'utf8');
const position = source.indexOf('var ParseTreeController =');
const start = source.lastIndexOf('(function($)', position);
const end = source.indexOf('}(jQuery));', position) + '}(jQuery));'.length;
const context = vm.createContext({window: {}, jQuery: {}, console, confirm: () => {throw new Error('Unexpected confirmation');}});
vm.runInContext(fs.readFileSync(path.join(root, 'lib/underscore.js'), 'utf8'), context);
vm.runInContext(source.slice(start, end), context);
function run(rules, input, expected) {
  context.rules = rules.map(([left, right]) => [left, '→', right]);
  context.input = input;
  const result = vm.runInContext(`
    var parser = new window.ParseTreeController({ds: {tree: function () {return {};}}}, JSON.stringify(rules), input);
    parser.stringAccepted()[0];
  `, context, {timeout: 1000});
  assert.equal(result, expected, JSON.stringify({rules, input}));
}
run([['S', 'S'], ['S', 'aSb'], ['S', 'ab']], 'aa', false);
console.log('PASS cyclic rejection terminates');

for (const input of ['ab', 'aabb', 'aaabbb']) run([['S', 'S'], ['S', 'aSb'], ['S', 'ab']], input, true);
for (const input of ['a', 'aa', 'b']) run([['S', 'A'], ['A', 'S'], ['A', 'ab']], input, false);
run([['S', 'A'], ['A', 'S'], ['A', 'ab']], 'ab', true);
run([['S', 'S']], 'a', false);
run([['S', 'A'], ['A', 'S'], ['A', 'λ']], 'a', false);
run([['S', 'A'], ['A', 'S'], ['A', 'λ']], '', true);
run([['S', 'A'], ['A', 'S'], ['A', 'λ']], '!', true);
run([['Q', 'Q'], ['Q', 'aQ'], ['Q', 'b']], 'aab', true);
run([['S', 'Sa'], ['S', 'a']], 'aaa', true);
run([['S', 'AaA'], ['A', 'λ'], ['A', 'b']], 'ba', true);
// Reuse the same parser as the grader does, and verify predecessor paths stay acyclic.
context.inputs = ['aabb', 'aa', 'ab'];
vm.runInContext(`
  var p = new window.ParseTreeController({ds: {tree: function () {return {};}}},
    JSON.stringify([['S','→','S'], ['S','→','aSb'], ['S','→','ab']]), '');
  for (var input of inputs) {
    p.inputString = input;
    var accepted = p.stringAccepted();
    if (accepted[0]) {
      var form = accepted[1], traceSeen = new Set();
      while (p.derivationTree[form]) {
        if (traceSeen.has(form)) throw new Error('Cyclic derivation trace');
        traceSeen.add(form);
        form = p.derivationTree[form][1];
      }
      if (form !== 'S') throw new Error('Trace did not reach start symbol');
    }
  }
`, context, {timeout: 1000});
console.log('PASS: self/mutual cycles, acceptance, rejection, lambda, non-S start, left recursion and reused trace state.');
