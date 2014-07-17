/*global ODSA */
"use strict";
// Written by Jun Yang and Cliff Shaffer
// Data menbers of AStack
$(document).ready(function () {
  var av_name = "astackVarCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadLangData({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code);

  // Slide 1
  pseudo.highlight("sig");
  av.umsg(interpret("av_c1"));
  av.displayInit();

  // Slide 2
  pseudo.unhighlight("sig");
  pseudo.highlight("constructor");
  av.umsg(interpret("av_c2"));
  av.step();
  
  // Slide 2
  pseudo.unhighlight("constructor");
  pseudo.highlight("top");
  av.umsg(interpret("av_c3"));
  av.recorded();
});
