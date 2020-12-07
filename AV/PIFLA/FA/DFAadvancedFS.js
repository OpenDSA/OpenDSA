/*global PIFRAMES */
// Initial draft by ??, Rewritten by Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "DFAadvancedFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  
  // Frame 1
  av.umsg("As you were building your first DFA, perhaps this question occurred to you: What happens if I leave out one of the transitions? What happens if the DFA is in a state and sees a letter that has no transition?");
  av.displayInit();
          
  // Show a DFA with no Trap State
  var urlnoTrapDFA = "../../../AV/OpenFLAP/machines/FA/DFA_noTrapState.jff";
  var noTrapDFA= new av.ds.FA({center: true , url: urlnoTrapDFA});

  // Frame2
  av.umsg(Frames.addQuestion("noedge"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("whichstrings"));
  av.step();

  // Frame 4
  noTrapDFA.hide();
  // Show a DFA with a trap state
  var urlTrapDFA="../../../AV/OpenFLAP/machines/FA/DFA_withTrapState.jff";
  var trapDFA= new av.ds.FA({center: true , url: urlTrapDFA});
  av.umsg("For any DFA that is missing transitions, we can easily create an equivalent DFA that shows all transitions. A new state called the trap state is added. Any transition not defined in the orignal DFA goes to the trap state. Once in the trap state, all symbols in the alphabet transition back to the trap state. That is, once the trap state is entered, the DFA will never trasition out. Here is the equivalent DFA made complete by adding the trap state and the missing transitions.");
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("complete"));
  av.step();

  // Frame 6
  trapDFA.hide();
  av.umsg("Now let's think about a more complicated example. The following DFA accepts even binary numbers that have an even number of 1's.");
  var urlevenBin = "../../../AV/OpenFLAP/machines/FA/EvenBinaryEvenOnesDFA.jff";
  var evenBin = new av.ds.FA({top: 60, url: urlevenBin});
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("delta"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("string"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("deltastar"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("deltapractice"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("dpractice2"));
  av.step();
  
  // Frame 12
  av.umsg(Frames.addQuestion("lambda"));
  av.step();

  // Frame 13
  av.umsg("The formal definition is: $\\delta^*(q,wa)=\\delta(\\delta^*(q,w),a)$. This means that the machine tansitions from a state to another by consuming the letters of string $w$, and at the end it made the last transition by processing the symbol $a$. (Don't forget that we typically use early letters of the alphabet like 'a' to mean a single symbol, and we use later letters of the alphabet like 'w' to mean a string.)");
  av.step();

  // Frame 14
  evenBin.hide();
  av.umsg(Frames.addQuestion("empty"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("negate"));
  av.step();

  // Frame 16
  av.umsg("The formal definition is: $\\overline{L(M)} = \\{w\\in{\\Sigma}^{*}\\mid {\\delta}^{*}(q_0,w)\\not\\in F\\}$. Which makes it easy to see how to build $M'$ from $M$: Just change all final states in $M$ to not be final, and all non-final states in $M$ to be final.");
  av.step();
  
  // Frame 17
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
