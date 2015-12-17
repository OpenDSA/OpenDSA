/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
// Visualizing the four steps to write a recursive function
$(document).ready(function() {
  "use strict";
  var av_name = "recurWriteStepsCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  var pseudo = av.code($.extend({lineNumbers: false}, code[0]));
  pseudo.highlight("sig");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.hide();
  var pseudo2 = av.code($.extend({lineNumbers: false}, code[1]));
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo2.hide();
  var pseudo3 = av.code($.extend({lineNumbers: false}, code[2]));
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  pseudo3.hide();
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  var pseudo4 = av.code($.extend({lineNumbers: false}, code[3]));
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  pseudo4.highlight("rc1");
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  pseudo4.unhighlight("rc1");
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  pseudo4.highlight("rc2");
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  pseudo4.unhighlight("rc2");
  pseudo4.highlight("rc3");
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  pseudo4.hide();
  var pseudo5 = av.code($.extend({lineNumbers: false}, code[4]));
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  pseudo5.hide();
  var pseudo6 = av.code($.extend({lineNumbers: false}, code[5]));
  av.step();

  // Slide 14
  av.umsg(interpret("sc14"));
  av.step();

  // Slide 15
  av.umsg(interpret("sc15"));
  pseudo6.hide();
  var pseudo7 = av.code($.extend({lineNumbers: false}, code[6]));
  av.step();

  // Slide 16
  av.umsg(interpret("sc16"));
  pseudo7.hide();
  var peseudo8 = av.code($.extend({lineNumbers: false, top: 10, left: 70}, code[7]));
  peseudo8.highlight("bc");
  peseudo8.highlight("rc");
  av.step();

  // Slide 17
  av.umsg(interpret("sc17"));
  av.label("Usual Format:", {left: 70, top: -20});
  av.label("Alternative Format:", {left: 430, top: -20});
  var peseudo9 = av.code($.extend({lineNumbers: false, top: 10, left: 430}, code[8]));
  peseudo9.highlight("rc");
  peseudo9.highlight("bc");
  av.recorded();
});
