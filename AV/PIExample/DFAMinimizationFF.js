$(document).ready(function() {
  "use strict";
  var av_name = "DFAMinimizationFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter,
      code = config.code;
  var goNext = false;
  //frame 1
  av.umsg("In this chapter we will see how to minimize the DFA number of states. The new minimized DFA will be accepting the same languages accepted by the original DFA.");
  av.displayInit();
  //frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();
  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();
  //frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();
  //frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();
  //frame 6
  av.umsg("Sometimes, these huge DFA have many states that are similar.");
  av.step();
  //frame 7
  av.umsg("The word similar here means that some states do the same transitions given the same letters. Combining these states together will minimize the number of states.");
  av.step();
  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  av.step();
  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();
  //frame 10
  av.umsg("What does that mean? It means that if we have a group of FINAL states $F$, if states $p$ and $q$ are indistinquishable, similar, then both states will end in the same destination, F, while consuming any string $w$");
  av.step();
  //frame 11
  av.umsg("In other words, both states act similarly on any string. Both either lead to accept the string or reject it.");
  av.step();
  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();
  //frame 13
  av.umsg("This means that there exist a string $w$ that makes both states lead to different decisions. One of them leads to accepting the string, a final state, an the other leads to a non final state. So these states are different");
  av.step();
  //frame 14
  av.umsg("All that an acceptor (DFA) cares about is accepting or rejecting strings.")
  av.step();
//frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.step();
  //frame 16
  av.umsg("Once we knew the simialr states, we group them together into one state. The result is a minimized DFA.");
  av.step();
  //frame 17
  av.umsg("Distinguishability is an equivalence relation. We are trying to break the set of all states into subsets that are equivances.");
  av.step();
  //frame 18
  av.umsg("Let us see an example to calrify the process. Look at this DFA.");
  var url = "../../../AV/VisFormalLang/FA/Machines/stminDFA1.jff";
  var dfa = new av.ds.FA({top: 0, left: 10, width: 500, height: 150, url: url});
  av.step();
  //frame 19
  av.umsg(Frames.addQuestion("q19"));
  var A = dfa.getNodeWithValue("A");
  var F = dfa.getNodeWithValue("F");
  var D = dfa.getNodeWithValue("D");
  A.highlight();
  av.step();
  //frame 20
  av.umsg(Frames.addQuestion("q20"));
  av.step();
  //frame 21
  A.unhighlight();
  F.highlight();
  av.umsg(Frames.addQuestion("q21"));
  av.step();
  //frame 22
  av.umsg(Frames.addQuestion("q22"));
  av.step();
  //frame 23
  F.unhighlight();
  D.highlight();
  av.umsg(Frames.addQuestion("q23"));
  av.step();
  //frame 24
  av.umsg(Frames.addQuestion("q24"));
  av.step();
  //frame 25
  A.highlight();
  F.highlight();
  av.umsg(Frames.addQuestion("q25"));
  av.step();
  //frame 26
  av.umsg(Frames.addQuestion("q26"));
  av.step();
  //frame 27
  av.umsg(Frames.addQuestion("q27"));
  av.step();
  //frame 28
  av.umsg(Frames.addQuestion("q28"));
  av.step();
  //frame 29
  av.umsg("Completed");
  av.step();

  av.recorded();
});

