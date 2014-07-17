/*global ODSA */
"use strict";
// Written by Jun Yang and Cliff Shaffer
// Show off the data members
$(document).ready(function () {
  var av_name = "llistVarsCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadLangData({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code);

  // Slide 1
  av.umsg(interpret("av_c1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("av_c2"));
  pseudo.highlight("sig");
  av.step();

  // Slide 3
  pseudo.unhighlight("sig");
  pseudo.highlight("head");
  av.umsg(interpret("av_c3"));
  av.step();

  // Slide 4
  pseudo.unhighlight("head");
  pseudo.highlight("tail");
  av.umsg(interpret("av_c4"));
  av.step();

  // Slide 5
  pseudo.unhighlight("tail");
  pseudo.highlight("curr");
  av.umsg(interpret("av_c5"));
  av.step();

  // Slide 6
  pseudo.unhighlight("curr");
  pseudo.highlight("listSize");
  av.umsg(interpret("av_c6"));
  av.step();

  // Slide 7
  pseudo.unhighlight("listSize");
  av.umsg(interpret("av_c7"));
  av.recorded();
});
