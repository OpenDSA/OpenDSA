// Title: Context-Free Language Pumping Lemma Example 2
// Author: Mostafa Mohammed; Cliff Shaffer
// Institution: Virginia Tech
// Features: Programmed Instruction
// Keyword: Context-Free Language; Pumping Lemma
// Natural Language: en
// Programming Language: N/A
/* Description: Programmed Instruction slideshow giving an example for using a pumping lemma to prove a language is not Context-Free: a^n b^n c^p. */
 
$(document).ready(function() {
    "use strict";
    var av_name = "CFLPumpingEx2FS";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
  
  // Frame 1
  av.umsg("Prove that $L = \\{a^nb^nc^p : p > n > 0\\}$ is not a CFL.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("length"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("pickw"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("conditions"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("cases"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("case1"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("asnopump"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("case2"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("absnopump"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("case3"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("bsnopump"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("case4"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("bcsnopump"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("case5"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("csnopump"));
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("done"));
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("notCFL"));
  av.step();

  // Frame 18
  av.umsg("Thus, there is no decomposition of $w$ into $uvxyz$ such that $|vy| \\ge 1$, $|vxy| \\le m$, and for all $i \\ge 0$, $uv^ixy^iz$ is in $L$. This is a contradiction, thus, L is not a CFL. Done.");
  av.step();

  // Frame 19
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
