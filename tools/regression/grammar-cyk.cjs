const assert=require('node:assert/strict');
const {parse,validate}=require('../../AV/OpenFLAP/CYK.js');
const rules=pairs=>pairs.map(([l,r])=>[l,'→',r]);
const g=rules([['Q','AB'],['A','a'],['B','b']]);
for(const s of ['', 'a','b','ab','ba','aab']) assert.equal(parse(g,s).accepted,s==='ab');
const ambiguous=rules([['S','SS'],['S','a']]);
for(let n=1;n<=12;n++) {
 const result=parse(ambiguous,'a'.repeat(n)); assert.equal(result.accepted,true);
 const leaves=node=>node.children.length?node.children.map(leaves).join(''):node.symbol;
 assert.equal(leaves(result.tree),'a'.repeat(n));
}
assert.equal(parse(ambiguous,'ab').accepted,false);
assert.equal(parse(rules([['Q','λ']]),'').accepted,true);
assert.equal(parse(rules([['Q','λ']]),'a').accepted,false);
assert.equal(parse(rules([['Q','AB'],['Q','λ'],['A','a'],['B','b']]),'').accepted,true);
for(const bad of [null,[],[['S']],rules([['S','aS']]),rules([['S','A']]),rules([['S','AB'],['A','λ']]),rules([['S','SS'],['S','λ']])]) assert.ok(validate(bad));
assert.throws(()=>parse(g,'a'.repeat(65)),/64/);
assert.equal(parse(rules([['S','<']]),'<').accepted,true);
console.log('PASS CYK acceptance/rejection, non-S start, ambiguous witness, empty string, CNF validation and bounds');
