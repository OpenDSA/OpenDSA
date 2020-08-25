$(document).ready(function() {
  "use strict";
  var av_name = "CFLPumpingLemmaExample1FF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
    interpret = config.interpreter,
    code = config.code;
  var goNext = false;

  //Frame 1
  av.umsg("Prove that $L = \\{a^nb^nc^n: n\\ge 1\\}$ is not a CFL");
  av.displayInit();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

});