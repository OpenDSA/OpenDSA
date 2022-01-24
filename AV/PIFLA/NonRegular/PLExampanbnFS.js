$(document).ready(function () {
  "use strict";
  var av_name = "PLExampanbnFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Prove that $L = \\{a^nb^n\\ |\\ n \\geq 0\\}$ is not regular, using the Pumping Lemma.");
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
  av.umsg(Frames.addQuestion("inL"));
  av.step();

  // Frame 6
  av.umsg("The next step is often the hardest. We have to show that there is no way that we can decompose $|w|$ into $xyz$ such that $|xy| \\le m$, $|y| \\ge 1$, and $xy^iz$ is in the string for all values of $i$.");
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("x"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("y"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("z"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("conditions"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("xy"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("zpart"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("i0"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("i0conclude"));
  av.step();

  // Frame 15
  av.umsg("So, if we pick $w = a^mb^m$ and $xy = a^m$, then it is not true that $xy^iz \\in L = \\{a^nb^n\\}$ for all $i \\ge 0$. This is true no matter how we divide $xy = a^m$ between $x$ and $y$, since it is all a bunch of a's. So, can we conclude then that $L$ is non-regular? Not just yet. So far we have only shown that for $w = a^mb^m$, setting $xy = a^m$ leads to a contradiction. But we have to prove this is true for all possible partitions of $a^mb^m$, and we know that there are other possible ways to set $xy$. We could also set $xy$ to some number of a's less than $a^m$. But in all such cases, we still end up pumping a's. Which means that in any of these cases, $xy^iz$ is not always in the language. This is an inevitable consequence of selecting $w = a^mb^m$. Therefore, we have proved that the language is non-regular.");
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("halfam"));
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("choices"));
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("doall"));
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("validy"));
  av.step();

  // Frame 20
  av.umsg(Frames.addQuestion("as"));
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("pumpas"));
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("pumpbs"));
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("pumpab0"));
  av.step();

  // Frame 24
  av.umsg(Frames.addQuestion("pumpab1"));
  av.step();

  // Frame 25
  av.umsg(Frames.addQuestion("pumpabmore"));
  av.step();

  // Frame 26
  av.umsg(Frames.addQuestion("pumpabfinal"));
  av.step();

  // Frame 27
  av.umsg("We have finally covered all of the cases! We have shown that when $w = a^{m/2}b^{m/2}$ that no partition into $xyz$ yields something that is pumpable. Therefore, we can finally conclude (again!) that $a^nb^n$ is not regular. But it was a lot more complicated to do the proof than when we selected $w = a^mb^m$, because of the number of subcases that we had to consider. So, it does matter what string we chose for $w$.");
  av.step();

  // Frame 28
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
