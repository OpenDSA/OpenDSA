document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');

$(document).ready(function() {
  "use strict";

  var av_name = "DFAcomplicatedCON";
  var av = new JSAV(av_name);

  // x & y control
  var left = 150;
  var top = 50;

  // graph and nodes
  var FA = new av.ds.FA();
  var q0 = FA.addNode({left: left - 150, top: top}),
      q1 = FA.addNode({left: left + 50, top: top}),
      q2 = FA.addNode({left: left - 50, top: top + 100}),
      q3 = FA.addNode({left: left + 150, top: top});
  FA.disableDragging();

  // set initial and final states
  toggleInitial(FA, q0);
  toggleFinal(FA, q1);

  // set edges and weights
  FA.addEdge(q0, q1, {weight: "0"});
  FA.addEdge(q0, q2, {weight: "1"});
  FA.addEdge(q1, q1, {weight: "0"});
  FA.addEdge(q1, q2, {weight: "1"});
  FA.addEdge(q2, q2, {weight: "0"});
  FA.addEdge(q2, q3, {weight: "1"});
  FA.addEdge(q3, q1, {weight: "0"});
  FA.addEdge(q3, q2, {weight: "1"});

  FA.layout();
  av.displayInit();
});
