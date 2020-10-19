/*global PIFRAMES */
/* Written by Eunoh Cho, Cliff Shaffer */
$(document).ready(function() {
  "use strict";
  var av_name = "SetNotationFS";
  var av = new JSAV(av_name);

  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Let's review some of this notation.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("braces"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("former"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("members"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("null"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("size"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("size2"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("subset"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("union"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("emptyunion"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("commute"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("intersect"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("emptyintersect"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("commuteI"));
  av.step();

  //frame 13
  av.umsg(Frames.addQuestion("q17"));
  av.step();

  //frame 14
  av.umsg(Frames.addQuestion("q18"));
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q19"));
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q20"));
  av.step();

  //frame 17
  av.umsg(Frames.addQuestion("q21"));
  av.step();

  //frame 18
  av.umsg(Frames.addQuestion("q22"));
  av.step();

  //frame 19
  av.umsg(Frames.addQuestion("q23"));
  av.step();

  //frame 20
  av.umsg("Completed.");
  av.step();
  av.recorded();
});
