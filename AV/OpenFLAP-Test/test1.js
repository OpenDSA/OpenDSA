/*global JSAV */
// Written by Ziyou Shang and Cliff Shaffer
// Most FLA AVs now read the automata from a .jff file.
// But here is a demonstration for how to make a machine "by hand".

$(document).ready(function() {
  "use strict";

  var av_name = "test1";
  var av = new JSAV(av_name);

  // x & y control
  var left = 225;
  var top = 25;

  // graph and nodes
  var FA = new av.ds.FA();
  var q0 = FA.addNode({left: left - 150, top: top + 50}),
      q1 = FA.addNode({left: left - 50, top: top}),
      q2 = FA.addNode({left: left - 50, top: top + 100}),
      q3 = FA.addNode({left: left + 100, top: top + 50});
      
//  FA.disableDragging(); // I don't understand when this has to be turned off,
                        // and when it defaults to being off.
                        // Maybe it defaults off only when reading file?

  // set initial and final states
  FA.makeInitial(q0);
  FA.makeFinal(q3);

  // set edges and weights
  FA.addEdge(q0, q1, {weight: "a"});
  FA.addEdge(q0, q1, {weight: "b"});
  FA.addEdge(q0, q2, {weight: "a, b"});
  FA.addEdge(q1, q1, {weight: "b"});
  FA.addEdge(q1, q3, {weight: "b"});
  FA.addEdge(q2, q3, {weight: "a"});

  FA.layout();
  av.displayInit();
});
