$(document).ready(function () {
  "use strict";
  var av_name = "PLExampwwRFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Prove that $L = \\{ww^R : w \\in \\Sigma^*\\}$ is not regular, using the Pumping Lemma.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("assume"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("pumplemma"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("long"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("as"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("aswrong"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("notdone"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("newchoice"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("decompose"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("fail"));
  av.step();

  // Frame 11
  av.umsg("Summary of our proof:<br/>Prove that $L = \\{ww^R : w \\in \\Sigma^*\\}$ is not regular, using the Pumping Lemma.<br/>Assume $L$ is regular, therefore the pumping lemma holds.<br/>Choose a long string $w \\in L$. Use $w = a^mb^mb^ma^m$.<br/>Show that there is no decomposition of $w$ into $xyz$ such that $|xy| \\le m$, $|y| \\ge 1$, and $xy^iz$ is in the language for all values of $i \\ge 0$.<br/>Since the first $m$ symbols are a's, any choice for the decomposition leads to $y$ being some number of a's near the front of the string. And removing $y$ or adding copies of $y$ will lead to a string not in the language. Therefore, there is no possible decomposition of $w$ into $xyz$ that meets the conditions. Therefore, by the pumping lemma, the language is non-regular.");
  av.step();

  // Frame 12
  av.umsg("An important lesson that we learned from this example is that certain choices for $w$ cannot lead to a successful proof that the language is non-regular. But that failure does not tell us whether the language is regular or non-regular.");
  av.step();

  // Frame 13
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
