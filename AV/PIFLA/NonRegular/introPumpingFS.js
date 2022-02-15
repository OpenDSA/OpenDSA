$(document).ready(function () {
  "use strict";
  var av_name = "introPumpingFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("We have seen that a DFA with a cycle has to accept strings that skip the cycle, strings that go through the cycle once, and strings that go through the cycle more times. We call this concept <b>pumping</b> the string as we go around the loop. Loops are how we get infinite languages. They are also how we lose count or otherwise lose the ability to distinguish various properties of the string being processed.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("finite"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("infinite"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("cycle"));
  av.step();

  // Frame 5
  av.umsg("Let us call the part captured by the DFA before the loop $w_1$, the part captured by loop $v$, and the part captured after the cycle $w_2$.");
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("once"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("none"));
  av.step();
  

  // Frame 8
  av.umsg(Frames.addQuestion("twice"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("many"));
  av.step();

  // Frame 10
  av.umsg("Next we will formalize this concept into a useful tool called the Pumping Lemma.");
  av.step();

  // Frame 11
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
