const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(process.argv[2]||'.');
const source=fs.readFileSync(path.join(root,'AV/OpenFLAP/grammarEditor.js'),'utf8');
const methods=source.slice(source.indexOf('  var removeLambda = function'),source.indexOf('  // remove unit productions'));
function transform(rules){const c=vm.createContext({arr:rules.map(([l,r])=>[l,'→',r]),arrow:'→',emptystring:'λ',alert:()=>{},console});vm.runInContext(fs.readFileSync(path.join(root,'lib/underscore.js'),'utf8'),c);vm.runInContext(methods,c);return Array.from(vm.runInContext('removeLambda()',c,{timeout:2000}));}
const cases=[
 [['S','AaA'],['A','λ'],['A','b']],
 [['S','AAA'],['A','λ'],['A','b']],
 [['S','AB'],['A','λ'],['A','a'],['B','λ'],['B','b']],
 [['S','CaC'],['C','A'],['A','λ'],['A','b']],
 [['S','aS'],['S','b']]
];
const expected=[['S→AaA','S→Aa','S→aA','S→a','A→b'],['S→AAA','S→AA','S→A','A→b'],['S→AB','S→A','S→B','A→a','B→b'],['S→CaC','S→Ca','S→aC','S→a','C→A','A→b'],['S→aS','S→b']];
cases.forEach((rules,i)=>{const result=transform(rules);assert.deepEqual(result.sort(),expected[i].sort());assert.equal(new Set(result).size,result.length);});
// Independently enumerate terminal strings for the finite regression grammar.
function language(rules){const pending=['S'],seen=new Set(),out=new Set();while(pending.length){const s=pending.pop();if(seen.has(s))continue;seen.add(s);const i=s.search(/[A-Z]/);if(i<0){out.add(s);continue;}for(const [l,r]of rules)if(l===s[i])pending.push(s.slice(0,i)+(r==='λ'?'':r)+s.slice(i+1));}return [...out].sort();}
assert.deepEqual(language(cases[0]),['a','ab','ba','bab']);
assert.deepEqual(language(transform(cases[0]).map(s=>s.split('→'))),language(cases[0]));
console.log('PASS: repeated, adjacent, distinct, indirect and non-nullable cases; no duplicates; language preserved including ba.');
