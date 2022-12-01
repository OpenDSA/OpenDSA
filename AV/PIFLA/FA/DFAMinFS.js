/*global PIFRAMES */
// Written by Mostafa Mohammed and Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "DFAMinFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("In this module we will develop an algorithm to minimize the number of states in a DFA. The minimized DFA will accept the same language as the original DFA.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("why"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("manystates"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("power"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("similar"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("indistinguishable"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("distinguishable"));
  av.step();

  // Frame 8
  av.umsg("So the basic idea is that when we find instances of indistinguishable states, we should group them together. Taken to completion, the result would be a minimized DFA. Distinguishability is an equivalence relation. We are trying to break the set of all states into disjoint subsets that are equivances. Let us see an example to clarify the process. Look at this DFA.");
  var url = "../../../AV/OpenFLAP/machines/FA/stminDFA1.jff";
  var dfa = new av.ds.FA({top: 0, left: 10, width: 500, height: 150, url: url});
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("Aa"));
  var A = dfa.getNodeWithValue("A");
  var F = dfa.getNodeWithValue("F");
  var D = dfa.getNodeWithValue("D");
  A.highlight();
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("Aab"));
  av.step();

  // Frame 11
  A.unhighlight();
  F.highlight();
  av.umsg(Frames.addQuestion("Fa"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("Fab"));
  av.step();

  // Frame 13
  F.unhighlight();
  D.highlight();
  av.umsg(Frames.addQuestion("conclusion"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("unknown"));
  av.step();

  // Frame 15
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
