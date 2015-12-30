/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Data menbers of AStack
$(document).ready(function() {
  "use strict";
  var av_name = "astackVarCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  pseudo.setCurrentLine("constructor");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.setCurrentLine("top");
  av.recorded();
});
