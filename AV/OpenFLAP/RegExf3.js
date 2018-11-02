/*global JSAV, document */
// Written by Ziyou Shang

document.write('<script src="../../../DataStructures/FL_resources/FA.js"></script>');

$(document).ready(function() {
  "use strict";

  var av_name = "RegExf3";
  var av = new JSAV(av_name);

  // x & y control
  var left = 225;
  var top = 25;

  // graph and nodes
  var FA = new av.ds.fa();
  var q0 = FA.addNode({left: left - 250, top: top + 150}),
      q1 = FA.addNode({left: left - 150, top: top}),
      q2 = FA.addNode({left: left - 150, top: top + 150});
      
  FA.disableDragging();

  // set initial and final states
  toggleInitial(FA, q0);
  toggleFinal(FA, q2);

  // set edges and weights
  FA.addEdge(q0, q1, {weight: "a"});
  FA.addEdge(q1, q0, {weight: "b"});
  FA.addEdge(q1, q2, {weight: "b"});
  FA.addEdge(q1, q1, {weight: "a"});
  FA.addEdge(q0, q2, {weight: "a"});
  FA.addEdge(q2, q0, {weight: "b"});
  

  FA.layout();
  av.displayInit();
});
