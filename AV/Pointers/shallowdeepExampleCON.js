/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Show off the data members
$(document).ready(function() {
  "use strict";
  var av_name = "shallowdeepExampleCON";
  // Load the config object with interpreter and code created by odsaUtils.js
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
  pseudo.highlight("line1");
  pseudo.highlight("line2");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.unhighlight("line1");
  pseudo.unhighlight("line2");
  pseudo.highlight("line3");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.unhighlight("line3");
  pseudo.highlight("line4");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  pseudo.unhighlight("line4");
  pseudo.highlight("line5");
  pseudo.highlight("line6");
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  pseudo.unhighlight("line5");
  pseudo.unhighlight("line6");
  pseudo.highlight("line7");
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  pseudo.unhighlight("line7");
  pseudo.highlight("line8");
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  pseudo.unhighlight("line8");
  pseudo.highlight("line9");
  av.recorded();
});
