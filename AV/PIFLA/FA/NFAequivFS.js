/*global PIFRAMES */
// Written by Cliff Shaffer (using existing diagrams), November 2020
$(document).ready(function() {
  "use strict";
  var av_name = "NFAequivFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Let's start to figure out how to convert a NFA to a DFA.");
  av.displayInit();

  // Frame 2
  var urlnfa = "../../../AV/OpenFLAP/machines/FA/NFA2DFAexample1.jff";
  var nfa = new av.ds.FA({center: true, url: urlnfa, left: 0});
  av.umsg(Frames.addQuestion("nfaex"));
  av.step();

  // Frame 3
  var urldfa = "../../../AV/OpenFLAP/machines/FA/NFA2DFAexample2.jff";
  var dfa = new av.ds.FA({center: true, url: urldfa, left: 250});
  av.umsg("Hopefully it is not too hard to convince yourself that the DFA at the bottom accepts the same language as the NFA. Note that the names of the states are chosen to help you to see their relationships to the original NFA. In fact, there was a procedure followed to generate this DFA, which also produced these node labels.");
  av.step();

  // Frame 21
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
