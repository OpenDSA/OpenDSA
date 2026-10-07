/* CYK membership and a witness tree for Chomsky-normal-form grammars. */
(function (root) {
  "use strict";
  function validate(rules) {
    if (!Array.isArray(rules) || !rules.length) return "No grammar. Open a grammar in the editor first.";
    if (rules.length > 256) return "This parser supports at most 256 productions.";
    if (rules.some(r => !Array.isArray(r) || r.length !== 3 || typeof r[0] !== "string" || typeof r[2] !== "string")) return "Invalid grammar data.";
    const start = rules[0][0];
    const nullable = rules.some(r => r[2] === "λ" || r[2] === "");
    for (const [left, , right] of rules) {
      if (!/^[A-Z]$/.test(left)) return "CYK requires a single uppercase variable on each left side.";
      if (right === "λ" || right === "") {
        if (left !== start) return "CYK requires CNF: only the start variable may produce the empty string.";
      } else if (!/^[A-Z]{2}$/.test(right) && !(right.length === 1 && !/^[A-Z]$/.test(right))) {
        return "CYK requires CNF rules A → BC or A → a. Use Convert → Transform Grammar first.";
      }
    }
    if (nullable && rules.some(r => /^[A-Z]{2}$/.test(r[2]) && r[2].includes(start))) return "For a nullable CNF start variable, the start variable must not appear on a right side.";
    return null;
  }
  function parse(rules, input) {
    const error = validate(rules);
    if (error) throw new Error(error);
    if (typeof input !== "string" || input.length > 64) throw new Error("Use an input of at most 64 characters.");
    const start = rules[0][0], n = input.length;
    if (!n) {
      const accepted = rules.some(r => r[0] === start && (r[2] === "λ" || r[2] === ""));
      return {accepted, table: [], tree: accepted ? {symbol:start,children:[{symbol:"λ",children:[]}]} : null};
    }
    const table = Array.from({length:n}, (_, span) => Array.from({length:n-span}, () => new Map()));
    for (let i=0;i<n;i++) for (const [left,,right] of rules) {
      if (right === input[i] && right !== "λ") table[0][i].set(left,{symbol:left,children:[{symbol:right,children:[]}]});
    }
    const binary=rules.filter(r => /^[A-Z]{2}$/.test(r[2]));
    for (let length=2;length<=n;length++) for (let begin=0;begin<=n-length;begin++) {
      const cell=table[length-1][begin];
      for (let split=1;split<length;split++) for (const [left,,right] of binary) {
        const a=table[split-1][begin].get(right[0]), b=table[length-split-1][begin+split].get(right[1]);
        if (a && b && !cell.has(left)) cell.set(left,{symbol:left,children:[a,b]});
      }
    }
    return {accepted:table[n-1][0].has(start), tree:table[n-1][0].get(start)||null,
      table:table.map(row=>row.map(cell=>Array.from(cell.keys()).sort()))};
  }
  const api={validate,parse};
  if (typeof module !== "undefined" && module.exports) module.exports=api;
  else root.CYK=api;
}(typeof window !== "undefined" ? window : globalThis));
