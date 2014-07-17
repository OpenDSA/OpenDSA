/*global ODSA */
"use strict";
// Written by Jun Yang and Cliff Shaffer
// Work through the constructors
$(document).ready(function () {
  var av_name = "llistConsCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadLangData({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code);

  // Slide 1
  av.umsg(interpret("av_c1"));
  pseudo.highlight("comment");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("av_c2"));
  pseudo.unhighlight("comment");
  pseudo.highlight("optsize");
  av.step();

  // Slide 3
  av.umsg(interpret("av_c3"));
  pseudo.highlight("default");
  av.step();

  // Slide 4
  pseudo.unhighlight("optsize");
  pseudo.unhighlight("default");

  pseudo.highlight([1, 2, 3, 4, 5]);
  //  pseudo.highlight("c1");
  //  pseudo.highlight("c2");
  //  pseudo.highlight("c3");
  //  pseudo.highlight("c4");
  //  pseudo.highlight("c5");
  av.umsg(interpret("av_c4"));
  av.step();

  // Slide 5
  av.umsg(interpret("av_c5"));
  av.recorded();
});
