/*global PIFRAMES */
// Initial draft by John Taylor, Rewritten by Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "DFAintroFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Now we'll look into some of the details about the DFA.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("direction"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("readonly"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("whichstate"));
  av.step();

  // Frame 5
  av.umsg("Some more things that you need to know about DFAs: There is a particular state that it always starts in, designated as the :term:`start state`. And some states in the machine are labeled as :term:`final states <final state>`. If at the end of processing the string the machine is in a 'final' state, then the machine 'accepts, otherwise it 'rejects'.");
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("whatdefinition"));
  av.step();

  // Frame 7
  av.umsg("Define a DFA as $(Q, \\Sigma, \\delta, Q_0, F)$ where <br />$Q$ is a finite set of states <br />$\\Sigma$ is the input alphabet (a finite set) <br />$\\delta: Q \\times\\Sigma \\rightarrow Q$ is a set of transitions like $(q_i, a) \\rightarrow q_j$ meaning that when in state $q_i$, if you see letter $a$, consume it and go to state $q_j$ <br />$q_0$ is the intial state ($q_0 \\in Q$)  <br />$F \\subseteq Q$ is a set of final states.");
  av.step();

  //Frame 8
  av.umsg(Frames.addQuestion("determine"));
  av.step();

  //Frame 9
  av.umsg(Frames.addQuestion("startfin"));
  av.step();

  //Frame 10
  //Add new DFA from link
  var url = "../../../AV/OpenFLAP/machines/FA/EvenBinaryDFACON.jff";
  var binaryDFA = new av.ds.FA({center: true , url: url, top: 100});

  av.umsg("Below is representation for the details of a DFA, shown as a graph. The nodes are states, the edges are transitions. This particular example accepts even binary numbers, that is, any string of 0's and 1's that ends in 0. Lets match what is in the graphical view to terms in the formal defination of a DFA: $(Q, \\Sigma, \\delta, Q_0, F)$, <br />$Q$ is a finite set of states <br />$\\Sigma$ is the input alphabet (a finite set) <br />$\\delta: Q \\times\\Sigma \\rightarrow Q$ is a set of transitions like $(q_i, a) \\rightarrow q_j$ meaning that when in state $q_i$, if you see symbol $a$, consume it and go to state $q_j$ <br />$q_0$ is the intial state ($q_0 \\in Q$)  <br />$F \\subseteq Q$ is a set of final states.");
  av.step();

  //Frame 11
  av.umsg(Frames.addQuestion("states"));
  av.step();

  //Frame 12
  av.umsg(Frames.addQuestion("alphabet"));
  av.step();

  //Frame 13
  av.umsg(Frames.addQuestion("transitions"));
  av.step();

  //Frame 14
  av.umsg(Frames.addQuestion("delta"));
  av.step();

  //Frame 15
  av.umsg(Frames.addQuestion("deltatable"));
  av.step();

  //Frame 16
  av.umsg(Frames.addQuestion("start"));
  av.step();

  //Frame 17
  av.umsg(Frames.addQuestion("final"));
  av.step();

  //Frame 18
  av.umsg(Frames.addQuestion("whygraph"));
  av.step();

  //Frame 19
  av.umsg(Frames.addQuestion("semantics"));
  av.step();

  //Frame 20
  av.umsg(Frames.addQuestion("null"));
  av.step();

  // Frame 21
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
