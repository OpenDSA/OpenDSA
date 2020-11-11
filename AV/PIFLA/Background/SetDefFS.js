/*global PIFRAMES */
/* Written by Eunoh Cho, Cliff Shaffer */
$(document).ready(function() {
  "use strict";
  var av_name = "SetDefFS";
  var av = new JSAV(av_name);

  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("A :term:`set` is a collection of distinguishable members or elements. There is no concept of duplication in a set. There is no concept of order.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("duporder"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("elements"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("members"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("bag"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("sequence"));
  av.step();

  // Frame 7
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
