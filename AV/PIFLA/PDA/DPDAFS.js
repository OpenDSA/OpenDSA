$(document).ready(function() {
  "use strict";
    var av_name = "DPDAFS";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Let's try to determine if there is a difference between Deterministic and Non-deterministic PDAs in terms of what languages they can recognize.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("differences"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("tuples"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("onlyone"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("lambda"));
  av.step();
  
  // Frame 6
  av.umsg("<b>Definition:</b> $L$ is a deterministic context-free language (DCFL) if and only if there exists a deterministic PDA $M$ such that $L=L(M)$.<br/><br/>Let us see some examples for PDAs and determine if each one is deterministic or nondeterministic based on these two conditions:<br/>1. $\\delta(q, a, b)$ contains at most one element.<br/>2. if $\\delta(q, \\lambda, b)$ is not empty, then $\\delta(q, c, b)$ must be empty for every $c \\in \\Sigma$<br/>Emaple, Consider the PDA for $L = \\{a^nb^n | n \\ge 0\\}$.");
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("firstcond"));
  var url = "../../../AV/OpenFLAP/machines/PDA/PDAExample1.jff";
  var PDA = new av.ds.PDA({width: 500, height: 200, left: 5, top: 50, url: url});
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("secondcond"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("count"));
  PDA.hide();
  url = "../../../AV/OpenFLAP/machines/PDA/WwrPDA.jff";
  var PDA2 = new av.ds.PDA({width: 500, height: 200, left:-20, url: url});
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("bb"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("firstcond2"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("non"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("DCFL"));
  PDA2.hide();
  PDA.show();
  av.step();

  // Frame 14
  av.umsg("For $L = \\{a^nb^n | n \\ge 0\\}$ we have a DPDA, so it is clearly a deterministic CFL.<br/><br/>In the case of $L = \\{ww^R | w\\in{\\Sigma}^{+}\\}, \\Sigma = \\{a, b\\}$, we showed a non-deterministic PDA. Now, the fact that we have a non-deterministic PDA that recognizes it certainly <b>does not prove</b> that it is not a deterministic CFL.<br/><br/>But, there are CFL’s that are not deterministic. And we will see that this is one of them. This makes intuitive sense. How can we, deterministically, know when to switch from $w$ to $w^R$ when scanning from left to right through the input?");
  PDA.hide();
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("union"));
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("notboth"));
  av.step();

  // Frame 17
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();

});
