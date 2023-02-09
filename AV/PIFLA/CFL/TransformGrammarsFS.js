$(document).ready(function () {
  "use strict";
  var av_name = "TransformGrammarsFS";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Now we start our exploration of useful transformations for CFGs.");
  av.displayInit();
  
  // Frame 2
  av.umsg(Frames.addQuestion("membership"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("power"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("lambda"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("subst"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("replace"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("whatP"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("notyet"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("replaceB"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("useless"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("leftrec"));
  av.step();

  // Frame 12
  av.umsg("<b>Parsing</b> is the process of solving the membership problem for a given string. In practice, it has the effect of finding a suitable derivation tree for the string. There are many different algorithms for parsing. A top-down parser starts with the start symbol of the grammar and replaces it through a series of productions to derive the string. In general, a good strategy is to find the leftmost terminal as soon as possible. But a left-recursive grammar requires that we first derive the rest of the string.");
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("leftterm"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("second"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("problem"));
  av.step();

  // Frame 16
  av.umsg("We now show how to eliminate left recursion so that we can derive a sentential form with the leftmost terminal before deriving any other terminals.");
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("whichleft"));
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("nonleft"));
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("finish"));
  av.step();

  // Frame 20
  av.umsg(Frames.addQuestion("transform"));
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("leftT"));
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("nonleftT"));
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("endT"));
  av.step();

  // Frame 24
  av.umsg(Frames.addQuestion("newT"));
  av.step();

  // Frame 25
  av.umsg(Frames.addQuestion("lastvar"));
  av.step();

  // Frame 26
  av.umsg(Frames.addQuestion("better"));
  av.step();

  // Frame 27
  av.umsg(Frames.addQuestion("samepower"));
  av.step();

  // Frame 28
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();


});
