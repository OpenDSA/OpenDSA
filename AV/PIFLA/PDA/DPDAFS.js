$(document).ready(function() {
    "use strict";
    var av_name = "DPDAFS";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);

  //Frame 1
  av.umsg("We will now consider the differences between Deterministic and Non-deterministic PDAs.");
  av.displayInit();

  //Frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //Frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //Frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //Frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //Frame 7
  av.umsg("Definition: $L$ is a deterministic context-free language (DCFL) if and only if there exists a deterministic PDA $M$ such that $L=L(M)$.<br/><br/>Let us see some examples for PDAs and determine if each one is deterministic or nondeterministic based on those two conditions.")
  av.step();

  //Frame 9
  av.umsg(Frames.addQuestion("q9"));
  var url = "../../../AV/OpenFLAP/machines/PDA/PDAExample1.jff";
  var PDA = new av.ds.PDA({width: 500, height: 200, left: 5, top: 30, url: url});
  av.step();

  //Frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();

  //Frame 11
  av.umsg(Frames.addQuestion("q11"));
  PDA.hide();
  url = "../../../AV/OpenFLAP/machines/PDA/WWrPDA.jff";
  var PDA2 = new av.ds.PDA({width: 500, height: 200, left:-20, url: url});
  av.step();

  //Frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();

  //Frame 13
  av.umsg(Frames.addQuestion("q13"));
  av.step();

  //Frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();

  //Frame 16
  av.umsg(Frames.addQuestion("q16"));
  PDA2.hide();
  PDA.show();
  av.step();

  //Frame 17
  av.umsg("For $L = \\{a^nb^n | n \\ge 0\\}$ we have a DPDA, so it is clearly a deterministic CFL.<br/><br/>In the case of $L = \\{ww^R | w\\in{\\Sigma}^{+}\\}, \\Sigma = \\{a, b\\}$, we showed a non-deterministic PDA. Now, this fact that we have a non-deterministic PDA that recognizes it certainly <b>does not prove</b> that it is not a deterministic CFL.<br/><br/>But, there are CFL’s that are not deterministic. And we will see that this is one of them. This makes intuitive sense. How can we, deterministically, know when to switch from $w$ to $w^R$ when scanning from left to right through the input?");
  PDA.hide();
  av.step();

  //Frame 21
  av.umsg(Frames.addQuestion("q21"));
  av.step();

  //Frame 22
  av.umsg(Frames.addQuestion("q22"));
  av.step();

  // Frame
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();

});
