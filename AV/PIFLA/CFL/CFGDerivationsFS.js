$(document).ready(function () {
  "use strict";
  var av_name = "CFGDerivationsFS";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);
  
  // Frame 1
  av.umsg("Given a grammar $G$, the most important question to ask is whether a given string $w$ can be derived from $G$. This process is called <b>string derivation</b>.<br/><br/>String derivation begins with the start variable for the grammar (we often use $S$ as the start variable). A series of replacements on variables is performed until there are no more variables to replace. At each step, a variable is replaced by the right hand side of some production rule that has that variable as its left hand side. The goal is to select the proper replacement steps that will lead to $w$.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("anbn"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("anbnreg"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("grammartype"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("derivation"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("sentential"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("palen"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("palenreg"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("palentype"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("palenex"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("palender1"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("palensent1"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("palender2"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("palensent2"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("palender3"));
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("palensent3"));
  av.step();

  // Frame 17
  av.umsg("We have now reached a Sentential form for a string (there are no remaining variables). So, the derivation is done. This is how the derivation process goes.<br/><br/>So far in our examples, the sentential forms have only a single variable on the RHS at each step. So, the only choice was to directly substitute that existing variable.<br/><br/>(By the way, so far we have ignored the issue of how we decide which production rule to use in our derivation to get the string that we want. That is an issue to address later.)")
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("multiex"));
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("whatlang"));
  av.step();

  // Frame 20
  av.umsg(Frames.addQuestion("aacbb"));
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("aacbbder1"));
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("aacbbsent1"));
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("aacbborder"));
  av.step();

  // Frame 24
  av.umsg(Frames.addQuestion("aacbbleft"));
  av.step();

  // Frame 25
  av.umsg(Frames.addQuestion("aacbbder2"));
  av.step();

  // Frame 26
  av.umsg(Frames.addQuestion("aacbbsent2"));
  av.step();

  // Frame 27
  av.umsg(Frames.addQuestion("aacbbvar3"));
  av.step();

  // Frame 28
  av.umsg(Frames.addQuestion("aacbbder3"));
  av.step();

  // Frame 29
  av.umsg(Frames.addQuestion("aacbbsent3"));
  av.step();

  // Frame 30
  av.umsg(Frames.addQuestion("aacbbvar4"));
  av.step();

  // Frame 31
  av.umsg(Frames.addQuestion("aacbbder4"));
  av.step();

  // Frame 32
  av.umsg(Frames.addQuestion("aacbbsent4"));
  av.step();

  // Frame 33
  av.umsg(Frames.addQuestion("aacbbvar5"));
  av.step();

  // Frame 34
  av.umsg(Frames.addQuestion("aacbbder5"));
  av.step();

  // Frame 35
  av.umsg(Frames.addQuestion("aacbbsent5"));
  av.step();

  // Frame 36
  av.umsg("We were successfuly able to derive the string $aacbb$ by following the Leftmost derivation. There is another replacement order: the Rightmost derivation. Just as you would expect, this always replaces the rightmost variable in the current Sentential form.");
  av.step();

  // Frame 37
  av.umsg("Now we learned about how to derive a string from a grammar by using sentential forms. Next we will see a different method to derive strings.")
  av.step();

  // Frame 38
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
