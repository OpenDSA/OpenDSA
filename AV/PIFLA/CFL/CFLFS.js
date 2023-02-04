$(document).ready(function () {
  "use strict";
  var av_name = "CFLFS";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("<b>Definition</b>: A grammar $G=(V,T,S,P)$ is context-free if all productions are of the form<br/>$A \\rightarrow x$<br/>where $A \\in V$ and $x \\in (V∪T)^∗$.<br>(T includes $\\lambda$.)");
av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("CFGDefV"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("CFGDefT"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("CFGDefS"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("CFGDefP"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("RHS"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("lambda"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("LHS"));
  av.step();

  // Frame 9
  av.umsg("The main condition for a grammar to be called Context-Free is that the left-hand side of each production rule has <b>only</b> one Variable. It might seem a bit strange to you that a production rule could be any other way. Later, we will see other types of grammars that relax this restriction. A CFG has no restriction on the Terminals and Variables on the RHS.")
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("CFL"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("linear"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("linearCFG"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("typeright"));
  av.step();

  // Frame 14
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
