// Title: Context-Free Language Pumping Lemma Example 3
// Author: Mostafa Mohammed; Cliff Shaffer
// Institution: Virginia Tech
// Features: Programmed Instruction
// Keyword: Context-Free Language; Pumping Lemma
// Natural Language: en
// Programming Language: N/A
/* Description: Programmed Instruction slideshow giving an example for using a pumping lemma to prove a language is not Context-Free: a^j b^k with k = j^2. */
 
$(document).ready(function() {
  "use strict";
  var av_name = "CFLPumpingEx3FS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Prove that $L = \\{a^jb^k: k = j^2\\}$ is not a CFL.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("winL"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("cases"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("case1"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("asnopump"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("case2"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("absnopump"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("case3"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("csnopump"));
  av.step();

  // Frame 10
  av.umsg("We have now considered all the variations on possible substrings with $|vxy| \\le m$, and found that there is no decomposition of $w$ into $uvxyz$ such that $|vy| \\ge 1$, $|vxy| \\le m$, and for all $i \\ge 0$, $uv^ixy^iz$ is in $L$. This is a contradiction of the Pumping Lemma. Thus, L is not a CFL. Done.");
  av.step();

  // Frame 11
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
