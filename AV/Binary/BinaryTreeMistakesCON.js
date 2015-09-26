/*global ODSA */
"use strict";
$(document).ready(function () {
  var av_name = "BinaryTreeMistakesCON";
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code);

  // Slide 1
  av.umsg(interpret("av_c1"));
  av.displayInit();
    
  // Slide 2
  av.umsg(interpret("av_c2"));
  pseudo.setCurrentLine("treenull");
  av.step();
  
  // Slide 3
  av.umsg(interpret("av_c3"));
  pseudo.setCurrentLine("reccall");
  av.step();
  
  // Slide 4
  av.umsg(interpret("av_c4"));
  pseudo.setCurrentLine("compute");
  av.recorded();
});
