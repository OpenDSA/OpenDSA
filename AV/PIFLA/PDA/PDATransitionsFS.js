// Title: Pushdown Automata Transitions Frameset
// Author: Mostafa Mohammed; Cliff Shaffer
// Institution: Virginia Tech
// Features: Demonstration
// Keyword: Pushdown Automata
// Natural Language: en
// Programming Language: N/A
/* Description: Programmed Instruction Frameset discussing Pushdown Automata transition types. */

$(document).ready(function() {
  "use strict";
  var av_name = "PDATransitionsFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Next we will look more closely at PDA transitions.<br/><br/>Similar to a NFA, PDAs can have different behaviors on the same input. That is, an NFA can have multiple choices about what to do on the input symbol 'a'. This is the fundamental concept of non-determinism. In a similar way, a PDA can choose between multiple behaviors on a given input condition (current state, current input, and current top of the stack). A PDA that has multiple behaviors on a given input is called a Non-deterministic PDA (NPDA).");
  av.displayInit();
  
  // Frame 2
  av.umsg(Frames.addQuestion("pop"));
  var url = "../../../AV/OpenFLAP/machines/PDA/transitions.jff";
  var PDA = new av.ds.PDA({width: 250, top: 100, url: url});
  var q0 = PDA.getNodeWithValue("q0");
  var q1 = PDA.getNodeWithValue("q1");
  var q2 = PDA.getNodeWithValue("q2");
  var q3 = PDA.getNodeWithValue("q3");
  var edge1 = PDA.getEdge(q0,q1);
  var edge2 = PDA.getEdge(q0,q2);
  var edge3 = PDA.getEdge(q0,q3);
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("always"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("change"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("order"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("nopush"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("x"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("y"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("z"));
  av.step();

  // Frame 10
  av.umsg("<b>Instantaneous Description:</b> To describe the status of a PDA, we use $(q, u, z)$ where $q$ is the current state, $u$ is the remaining portion of the input string, and $z$ is the current contents of the stack.");
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("move"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("input"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("stack"));
  av.step();

  // Frame 14
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();

});
