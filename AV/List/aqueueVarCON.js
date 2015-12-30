/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
$(document).ready(function() {
  "use strict";
  // Show the AQueue code.
  var av_name = "aqueueVarCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.setCurrentLine("array");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  pseudo.setCurrentLine("constructor");
  av.step();

  // Slide 3
  pseudo.setCurrentLine("setmaxsize");
  av.umsg(interpret("sc3"));
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  pseudo.setCurrentLine("varrear");
  av.recorded();
});
