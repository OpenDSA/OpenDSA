$(document).ready(function () {
  "use strict";
  var av_name = "STAFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var goNext = false;

  //frame 1
  av.umsg("Can you draw a DFA, regular expression or regular grammar for $L = \\{a^nb^n\\mid n> 0\\}$?");
  av.displayInit();
  //frame 2
  av.umsg(Frames.addQuestion("q3"));
  av.step();
  av.umsg(Frames.addQuestion("q4"));
  av.step();
  av.umsg(Frames.addQuestion("q5"));
  av.step();
  av.umsg(Frames.addQuestion("q6"));
  av.step();
  av.umsg(Frames.addQuestion("q7"));
  av.step();
  av.umsg(Frames.addQuestion("q8"));
  av.step();
  av.umsg(Frames.addQuestion("q9"));
  av.step();
  av.umsg(Frames.addQuestion("q10"));
  av.step();
  av.umsg("Exactly, we need to have a new tool that helps us to identify non regular languages. This is the next topic in this course.");
  av.recorded();
});
