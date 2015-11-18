/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
// Showing how sum returns to the base case and then unwind
$(document).ready(function () {
  "use strict";
  var av_name = "recurTraceSum2CON";
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;           
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg(interpret("av_c1"));
  var pseudo = av.code(code);
  
  pseudo.highlight(2);
  av.displayInit();
  av.step();

  // Slide 2
  av.umsg(interpret("av_c2"));
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  av.step();

  // Slide 3
  av.umsg(interpret("av_c3"));
  pseudo.unhighlight(3);
  pseudo.highlight(5);
  av.step();
  
  // Slide 4
  av.umsg(interpret("av_c4"));
  av.recorded();
});
