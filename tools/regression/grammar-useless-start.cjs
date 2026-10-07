const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
for (const file of ['AV/OpenFLAP/grammarEditor.js', 'AV/OpenFLAP/exercises/exerController/GrammarExerciseController.js']) {
  const source = fs.readFileSync(path.join(root,file),'utf8');
  const start = source.indexOf('var removeUseless = function');
  const end = source.indexOf('// convert to Chomsky Normal Form',start);
  for (const [rules, expected] of [[[['A','a']], ['A→a']], [[['A','aB'], ['B','b'], ['S','s']], ['A→aB','B→b']], [[['A','A'], ['B','b']], []], [[['S','b']], ['S→b']], [[['Q','R'], ['R','Q'], ['R','r']], ['Q→R','R→Q','R→r']], [[], []]]) {
    const context = vm.createContext({arr:rules.map(([l,r])=>[l,'→',r]),variables:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',arrow:'→',console});
    vm.runInContext(fs.readFileSync(path.join(root,'lib/underscore.js'),'utf8'),context);
    vm.runInContext(source.slice(start,end),context);
    assert.deepEqual(Array.from(vm.runInContext('removeUseless(arr)',context,{timeout:1000})), expected);
  }
  console.log('PASS start-symbol reachability: '+file);
}
