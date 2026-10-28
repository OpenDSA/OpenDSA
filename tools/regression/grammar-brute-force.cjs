const assert=require('node:assert/strict');const parse=require('../../AV/OpenFLAP/BruteForceParser.js');
const grammar=(...rules)=>rules.map(([l,r])=>[l,'→',r]);
const regular=grammar(['S','aS'],['S','b']);
for(const s of ['b','ab','aab'])assert.equal(parse(regular,s).status,'Accept');
for(const s of ['aa','','ba'])assert.equal(parse(regular,s).status,'Reject');
assert.equal(parse(grammar(['S','S'],['S','aSb'],['S','ab']),'aa').status,'Reject');
assert.equal(parse(grammar(['S','AaA'],['A','λ'],['A','b']),'ba').status,'Accept');
assert.equal(parse(grammar(['S','λ']),'').status,'Accept');
assert.equal(parse(grammar(['Q','b']),'b').status,'Accept');
assert.equal(parse(grammar(['S','AB'],['AB','c']),'c').status,'Accept');
assert.equal(parse(grammar(['S','SS'],['S','λ']),'b',{maxStates:20}).status,'Undetermined');
const result=parse(regular,'aab');assert.deepEqual(result.steps.map(s=>s.after),['aS','aaS','aab']);
console.log('PASS: acceptance, rejection, cycles, lambda, non-S start, multi-symbol LHS, limits and derivation trace.');

// A length cutoff must not report rejection; increasing the bound finds the derivation.
const growing = grammar(['S', 'AA'], ['AA', 'b']);
assert.equal(parse(growing, 'b', {maxLength: 1}).status, 'Undetermined');
assert.equal(parse(growing, 'b', {maxLength: 2}).status, 'Accept');
// Try each occurrence, including overlapping matches.
assert.equal(parse(grammar(['S', 'AAA'], ['AA', 'b'], ['Ab', 'c']), 'c').status, 'Accept');
assert.equal(parse(grammar(['S', 'A'], ['A', 'S']), 'a').status, 'Reject');
console.log('PASS: length cutoff, overlapping occurrences and mutual cycles.');
