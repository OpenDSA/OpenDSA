const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const cases = [
  [[['S','A'], ['S','b']], ['S→b']],
  [[['S','A']], []],
  [[['S','A'], ['S','b'], ['A','B']], ['S→b']],
  [[['S','A'], ['S','b'], ['A','B'], ['A','a']], ['S→b','S→a','A→a']],
  [[['S','A'], ['A','S'], ['A','b']], ['S→b','A→b']],
  [[['Q','A'], ['Q','b']], ['Q→b']],
  [[['S','aS'], ['S','b']], ['S→aS','S→b']]
];
for (const file of ['AV/OpenFLAP/grammarEditor.js', 'AV/OpenFLAP/exercises/exerController/GrammarExerciseController.js']) {
  const source = fs.readFileSync(path.join(root,file),'utf8');
  const start = source.indexOf('var removeUnit = function');
  const end = source.indexOf('// remove useless productions',start);
  for (const [rules, expected] of cases) {
    const context = vm.createContext({arr:rules.map(([l,r])=>[l,'→',r]), variables:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',arrow:'→',console});
    vm.runInContext(fs.readFileSync(path.join(root,'lib/underscore.js'),'utf8'),context);
    vm.runInContext(source.slice(start,end),context);
    const actual = Array.from(vm.runInContext('removeUnit()',context,{timeout:1000}));
    assert.deepEqual(actual.sort(),expected.slice().sort(),file+' '+JSON.stringify(rules));
  }
  console.log('PASS seven unit-removal cases: '+file);
}

for (const file of ['AV/OpenFLAP/grammarEditor.js', 'AV/OpenFLAP/exercises/exerController/GrammarExerciseController.js']) {
  const source = fs.readFileSync(path.join(root,file),'utf8');
  const start = source.indexOf('var removeUseless = function');
  const end = source.indexOf('// convert to Chomsky Normal Form',start);
  for (const [rules, expected] of [[[['S','A']], []], [[['S','b']], ['S→b']]]) {
    const context = vm.createContext({arr:rules.map(([l,r])=>[l,'→',r]),variables:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',arrow:'→',console});
    vm.runInContext(fs.readFileSync(path.join(root,'lib/underscore.js'),'utf8'),context);
    vm.runInContext(source.slice(start,end),context);
    assert.deepEqual(Array.from(vm.runInContext('removeUseless(arr)',context,{timeout:1000})), expected);
  }
  console.log('PASS empty/productive language preprocessing: '+file);
}
