(function () {
  "use strict";
  const $=id=>document.getElementById(id);
  let rules, result=null, revealed=0, flipped=false, input="";
  function textCell(tag,text) {const cell=document.createElement(tag);cell.textContent=text;return cell;}
  function reset() {
    result=null;revealed=0;flipped=false;
    $("tableArea").replaceChildren();$("tree").replaceChildren();$("derivation").hidden=true;$("progress").textContent="";
    for(const id of ["stepbutton","completebutton","flipbutton","derivationbutton"]) $(id).disabled=true;
  }
  function render() {
    const table=document.createElement("table");
    table.append(textCell("caption","Variables deriving each substring (span length, then start position)"));
    const head=document.createElement("tr");head.append(textCell("th","Length"));
    for(let i=0;i<input.length;i++) head.append(textCell("th",(i+1)+": "+input[i]));table.append(head);
    const indices=result.table.map((_,i)=>i);if(flipped) indices.reverse();
    for(const i of indices) {
      const row=document.createElement("tr");row.append(textCell("th",String(i+1)));
      for(const cell of result.table[i]) row.append(textCell("td",i<revealed?(cell.join(", ")||"∅"):"?"));
      table.append(row);
    }
    $("tableArea").replaceChildren(table);
    $("progress").textContent=revealed+" / "+result.table.length+" rows shown";
    $("stepbutton").disabled=$("completebutton").disabled=revealed===result.table.length;
  }
  try {rules=JSON.parse(localStorage.getItem("cykGrammar"));} catch (_) {rules=null;}
  const error=CYK.validate(rules);
  if(error) {$("message").textContent=error;$("parsebutton").disabled=true;}
  else for(const [left,,right] of rules) {const row=document.createElement("tr");for(const value of [left,"→",right||"λ"]) row.append(textCell("td",value));$("grammar").tBodies[0].append(row);}
  $("inputForm").addEventListener("submit",event=>{
    event.preventDefault();reset();input=$("input").value;
    try {result=CYK.parse(rules,input);} catch(error) {$("message").textContent=error.message;return;}
    $("message").textContent=JSON.stringify(input)+ (result.accepted?" accepted":" rejected");
    $("derivationbutton").disabled=!result.accepted;
    if(result.table.length) {$("flipbutton").disabled=false;render();}
  });
  $("stepbutton").addEventListener("click",()=>{revealed++;render();});
  $("completebutton").addEventListener("click",()=>{revealed=result.table.length;render();});
  $("flipbutton").addEventListener("click",()=>{flipped=!flipped;render();});
  $("derivationbutton").addEventListener("click",()=>{
    function branch(node) {const li=textCell("li",node.symbol);if(node.children.length) {const ul=document.createElement("ul");for(const child of node.children) ul.append(branch(child));li.append(ul);}return li;}
    const ul=document.createElement("ul");ul.append(branch(result.tree));$("tree").replaceChildren(ul);$("derivation").hidden=false;
  });
  $("backbutton").addEventListener("click",()=>{
    if(!error) localStorage.setItem("transformedGrammar",JSON.stringify(rules));
    window.location.href="grammarEditor.html";
  });
}());
