/*global JSAV, document */
// Written by Ziyou Shang

document.write('<script src="../../../DataStructures/FL_resources/FA.js"></script>');

$(document).ready(function() {
  "use strict";

  var av_name = "RegExf1";
  var av = new JSAV(av_name);

  // x & y control
  var left = 225;
  var top = 25;

  // graph and nodes
  var FA = new av.ds.fa();
  var q0 = FA.addNode({left: left - 150, top: top + 50}),
      q1 = FA.addNode({left: left + 50, top: top + 50});
      
      
  FA.disableDragging();

  // set initial and final states
  toggleInitial(FA, q0);
  toggleFinal(FA, q1);

  // set edges and weights
  FA.addEdge(q0, q0, {weight: "rii"});
  FA.addEdge(q1, q0, {weight: "rji"});
  FA.addEdge(q0, q1, {weight: "rij"});
  FA.addEdge(q1, q1, {weight: "rjj"});


  FA.layout();
  av.displayInit();
});
