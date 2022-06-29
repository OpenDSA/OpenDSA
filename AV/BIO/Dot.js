"use strict";

$(document).ready(function () {
	var av_name = "Dot";
	var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object

  var jsav = new JSAV("Dot");
  var pseudo =jsav.code(code[0]);

// Hack until we get multi-line method
// Hack until we get multi-line method
  pseudo.setCurrentLine("sig");
  pseudo.highlight("forbody");
  jsav.displayInit();
  pseudo.hide();
  var pseudo = jsav.code(code[1]);
  // Slide 4
  jsav.umsg(interpret("sc4"));
  pseudo.setCurrentLine(0);      // Hack until we get multi-line method
  pseudo.unhighlight("forbody");
  pseudo.setCurrentLine("insert");
  jsav.step();
  pseudo = jsav.code(code[1]);
  // Slide 5
  jsav.umsg(interpret("sc5"));
  pseudo.setCurrentLine("incr");
  jsav.step();

  // Slide 6
  jsav.umsg(interpret("sc6"));
  pseudo.setCurrentLine(0);
  jsav.recorded();

});