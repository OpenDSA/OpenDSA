$(document).ready(function(){
  "use strict";
  var av_name = "QuestionTypeTest";
  var av = new JSAV(av_name);
  var arrow = String.fromCharCode(8594);
  //var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var Frames = PIFRAMES.init(av_name);

  av.umsg(Frames.addQuestion("q0"));
  av.step();
  av.umsg(Frames.addQuestion("q1"));
  av.step();
  av.umsg(Frames.addQuestion("q2"));
  av.step();
  av.umsg(Frames.addQuestion("q3"));
  av.step();
  av.umsg(Frames.addQuestion("q4"));
  av.step();
  av.recorded();
});
