$(document).ready(function () {
  "use strict";
  var av_name = "STAFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var goNext = false;

  // Frame 1
  av.umsg("Can you draw a DFA or NFA, or write a regular expression or regular grammar for $L = \\{a^nb^n\\mid n> 0\\}$?");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("memory"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("memoryneed"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("whatmemory"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("accept"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("regexrg"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("noregex"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("regular"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("proof"));
  av.step();

  // Frame 10
  av.umsg("Exactly. We need to have a new tool that helps us to identify non-regular languages. This is our next topic.");
  av.step();

  // Frame 11
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
