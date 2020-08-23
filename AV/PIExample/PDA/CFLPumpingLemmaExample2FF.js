$(document).ready(function() {
    "use strict";
    var av_name = "CFLPumpingLemmaExample2FF";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter,
      code = config.code;
    var goNext = false;
  
    //Frame 1
    av.umsg("We need a tool that helps us to identify if a language is not CFL.");
    av.displayInit();
  
    //Frame 2
    av.umsg(Frames.addQuestion("q2"));
    av.step();
  });