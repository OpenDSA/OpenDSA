$(document).ready(function() {
  "use strict";
  var av_name = "NCFLversusDCFLFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
    interpret = config.interpreter,
    code = config.code;
  var goNext = false;

  //Frame 1
  av.umsg("We found that a language like $L = \\{a^nb^n: n \\ge 1\\} \\cup \\{a^nb^{2n}: n \\ge 1\\}$ is CFL and not DCFL");
  av.displayInit();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //Frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //Frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //Frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //Frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //Frame 8
  av.umsg("Based on this information, we now can update our model of the Formal Languages Universe. We now have Regular Languages which is part of Deterministic CFL and it is part of CFL");
  //TODO add the figure
  av.step();

  //Frame 9
  av.umsg("Complete.");
  av.recorded();
});