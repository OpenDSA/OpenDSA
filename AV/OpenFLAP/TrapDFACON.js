/*global JSAV, document */
// Written by Nabil Saad
$(document).ready(function() {
  "use strict";
  var av = new JSAV("TrapDFACON");

  // x & y control
  var left = 250;
  var top = 50;

  // graph and nodes
  var DFA = new av.ds.FA();

  //var graph = av.ds.graph({layout: "manual"});
  var q0 = DFA.addNode({left: left - 200, top: top}),
      q1 = DFA.addNode({left: left - 100, top: top}),
      q2 = DFA.addNode({left: left, top: top}),
      trap = DFA.addNode({left: left - 100, top: top + 100});
  DFA.disableDragging();

  toggleInitial(DFA, q0);
  toggleFinal(DFA, q2);

  DFA.addEdge(q0, q1, {weight: "b"});
  DFA.addEdge(q1, q1, {weight: "b"});
  DFA.addEdge(q1, q2, {weight: "a"});
  DFA.addEdge(q0, trap, {weight: "a"});
  DFA.addEdge(q0, q1, {weight: "b"});
  DFA.addEdge(trap, trap, {weight: "a,b"});
  DFA.addEdge(q2, trap, {weight: "a"});
  DFA.addEdge(q2, trap, {weight: "b"});
  DFA.layout();

  av.displayInit();
});
