$(document).ready(function () {
  "use strict";
  var av_name = "PLExampa3bncn3FS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("This time we will try a harder example:<br/><br/>Prove that $L = \\{a^3b^nc^{n-3} | n > 3 \\}$ is not regular, using the Pumping Lemma.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("wchoices"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("xychoices"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("ychoices"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("as"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("abs"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("bs"));
  av.step();

  // Frame 8
  av.umsg("Proof: Choose $w = a^3b^mc^{m-3}$.<br/>Now we need to partition $w$ into $xyz$ such that $|xy| \\leq m$, $|y| \\geq 1$, and $xy^iz \\in L$ for all $i \\ge 0$. Our three possible choices are variations on $a^3$, $a^3b^{m-3}$, and $a^3b^{m-3-l}$. These in turn lead to three possible choices for the $y$ part.<br/><b>Case 1:</b>$y$ contains one or more a's.<br/><b>Case 2:</b>$y$ contains one or more a's and one or more b's.<br/><b>Case 3:</b>$y$ contains one or more b's.<br/><br/>We proved that for each of these cases, the $y$ part cannot be pumped. Therefore, we have proved that there is no way to decompose $w$ into $xyz$ that meets the requirements. Therefore, we have proved the language to be non-regular by the Pumping Lemma.");
  av.step();

  // Frame 9
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
