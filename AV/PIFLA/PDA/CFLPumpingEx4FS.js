$(document).ready(function() {
  "use strict";
  var av_name = "CFLPumpingEx4FS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Prove that the following language is not a CFL:<br/>$L = \\{w{\\bar w}w : w\\in \\Sigma^*\\},\\ \\Sigma = \\{a, b\\}$, where $\\bar w$ is the string $w$ with each occurence of $a$ replaced by $b$ and each occurence of $b$ replaced by $a$.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("wbar"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("winL"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("cases"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("case1"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("asnopump"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("case2"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("absnopump"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("case2a"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("againabsnopump"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("case3"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("bsnopump"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("case4"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("bAsnopump"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("case4a"));
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("againbAsnopump"));
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("case5"));
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("Asnopump"));
  av.step();

  // Frame 19
  av.umsg("We have now considered all the variations on possible substrings with $|vxy| \\le m$, and found that there is no decomposition of $w$ into $uvxyz$ such that $|vy| \\ge 1$, $|vxy| \\le m$, and for all $i \\ge 0$, $uv^ixy^iz$ is in $L$. This is a contradiction of the Pumping Lemma. Thus, L is not a CFL. Done.");
  av.step();

  // Frame 20
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
