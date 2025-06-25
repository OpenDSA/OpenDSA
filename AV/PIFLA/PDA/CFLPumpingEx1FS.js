// Title: Context-Free Language Pumping Lemma Example 1
// Author: Mostafa Mohammed; Cliff Shaffer
// Institution: Virginia Tech
// Features: Programmed Instruction
// Keyword: Context-Free Language; Pumping Lemma
// Natural Language: en
// Programming Language: N/A
/* Description: Programmed Instruction slideshow giving an example for using a pumping lemma to prove a language is not Context-Free: a^n b^n c^n. */
 
$(document).ready(function() {
  "use strict";
  var av_name = "CFLPumpingEx1FS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Prove that $L = \\{a^nb^nc^n: n\\ge 1\\}$ is not a CFL.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("assume"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("PLholds"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("m"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("PLm"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("winL"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("decompose"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("u"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("v"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("x"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("y"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("z"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("conditions"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("middle"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("impossible"));
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("alla"));
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("anopump"));
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("mixab"));
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("abnopump"));
  av.step();

  // Frame 20
  av.umsg(Frames.addQuestion("case2a"));
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("bs"));
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("bnopump"));
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("bc"));
  av.step();

  // Frame 24
  av.umsg(Frames.addQuestion("bcnopump"));
  av.step();

  // Frame 25
  av.umsg(Frames.addQuestion("cs"));
  av.step();

  // Frame 26
  av.umsg(Frames.addQuestion("csnopump"));
  av.step();

  // Frame 27
  av.umsg(Frames.addQuestion("done"));
  av.step();

  // Frame 28
  av.umsg(Frames.addQuestion("notCFL"));
  av.step();

  // Frame 29
  av.umsg("Thus, there is no decomposition of $w$ into $uvxyz$ such that $|vy| \\ge 1$, $|vxy| \\le m$ and for all $i \\ge 0$, $uv^ixy^iz$ is in $L$. This is a contradiction, thus, L is not a CFL. Done.");
  av.step();

  // Frame 30
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
