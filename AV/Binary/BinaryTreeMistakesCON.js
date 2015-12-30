/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "BinaryTreeMistakesCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();
    
  // Slide 2
  av.umsg(interpret("sc2"));
  pseudo.setCurrentLine("treenull");
  av.step();
  
  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.setCurrentLine("reccall");
  av.step();
  
  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.setCurrentLine("compute");
  av.recorded();
});
