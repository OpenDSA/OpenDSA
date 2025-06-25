$(document).ready(function() {
    "use strict";
  
var av_name = "schematicRepCON";
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg("Suppose that we have a regular expression $r$. We want to find a simple representation for the NFA that accepts $r$.");
  av.displayInit();

  // Slide 2
  av.umsg("The NFA should have a start state and a final state. (We can easily add a state to the NFA that all final states reach via a $\\lambda$ transition.)");
  var leftMargin = 200;
  var topMargin = 0;
  var fa = new av.ds.FA({left: leftMargin, top: topMargin, width: 300, height: 200});
  var startX = 50;
  var lambda = String.fromCharCode(955);
  var s = fa.addNode({value:"s", left: startX, top: 50});
  var n1 = fa.addNode({value:" ",left: 100 + startX, top: 0});
  var n2 = fa.addNode({value:" ",left: 100 + startX, top: 50});
  var n3 = fa.addNode({value:" ",left: 100 + startX, top: 100});
  var f = fa.addNode({value:"f", left: 200 + startX, top: 50});
  fa.addEdge(n1, f,{weight: lambda});
  fa.addEdge(n2, f,{weight: lambda});
  fa.addEdge(n3, f,{weight: lambda});
  toggleInitial(fa, s);
  toggleFinal(fa, f);
  av.step();

  // Slide 3
  av.umsg("To accept any regular exepression $r$, the NFA should start from $s$ and go through some inermediate states until it reaches the final state $f$.");
  var e1 = fa.addEdge(s, n1, {weight:" "});
  e1.css({"stroke-dasharray": "."});
  var e2 = fa.addEdge(s, n2, {weight:" "});
  e2.css({"stroke-dasharray": "."});
  var e3 = fa.addEdge(s, n3, {weight:" "});
  e3.css({"stroke-dasharray": "."});
  av.step();

  // Slide 4
  av.umsg("We can use this figure to represent the NFA that accepts the regular expression $r$.");
  fa.css({outline: "1px black solid", border: "10px transparent solid;"});
  av.label("NFA that accepts $r$", {left: leftMargin + 80, top: 210});
  av.recorded();
});
