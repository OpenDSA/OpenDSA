/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
// Visualization of factorial with copies model
$(document).ready(function() {
  "use strict";
  var av_name = "recurTraceFactCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code($.extend({lineNumbers: false}, code[0]));
  pseudo.show();

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  var pseudo2 = av.code($.extend({lineNumbers: false, top: 150, left: 250}, code[1]));
  pseudo2.css([0, 1, 2, 3, 4, 5], {"border-width": "1px", "border-color": "black"});
  var pseudo3 = av.code($.extend({lineNumbers: false, top: 170, left: 290}, code[2]));
  var pseudo4 = av.code($.extend({lineNumbers: false, top: 190, left: 320}, code[3]));
  var pseudo5 = av.code($.extend({lineNumbers: false, top: 210, left: 350}, code[4]));
  var pseudo6 = av.code($.extend({lineNumbers: false, top: 230, left: 390}, code[5]));
 // After the return:
  var pseudo7 = av.code($.extend({lineNumbers: false, top: 150, left: 290}, code[6]));
  var pseudo8 = av.code($.extend({lineNumbers: false, top: 170, left: 320}, code[7]));
  var pseudo9 = av.code($.extend({lineNumbers: false, top: 190, left: 350}, code[8]));
  var pseudo10 = av.code($.extend({lineNumbers: false, top: 230, left: 380}, code[9]));
  pseudo2.hide();
  pseudo3.hide();
  pseudo4.hide();
  pseudo5.hide();
  pseudo6.hide();
  pseudo7.hide();
  pseudo8.hide();
  pseudo9.hide();
  pseudo10.hide();
  pseudo2.show();
  pseudo2.highlight("sig");
  pseudo2.highlight("rc");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo2.css([0, 1, 2, 3, 4, 5], {"border-width": "0px"});
  pseudo3.show();
  pseudo3.css([0, 1, 2, 3, 4, 5], {"border-width": "1px", "border-color": "black"});
  pseudo3.highlight("sig");
  pseudo3.highlight("rc");
  pseudo2.unhighlight("sig");
  pseudo2.unhighlight("rc");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo3.css([0, 1, 2, 3, 4, 5], {"border-width": "0px"});
  pseudo4.show();
  pseudo4.css([0, 1, 2, 3, 4, 5], {"border-width": "1px", "border-color": "black"});
  pseudo4.highlight("sig");
  pseudo4.highlight("rc");
  pseudo3.unhighlight("sig");
  pseudo3.unhighlight("rc");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  pseudo4.css([0, 1, 2, 3, 4, 5], {"border-width": "0px"});
  pseudo5.show();
  pseudo5.css([0, 1, 2, 3, 4, 5], {"border-width": "1px", "border-color": "black"});
  pseudo5.highlight("sig");
  pseudo5.highlight("rc");
  pseudo4.unhighlight("sig");
  pseudo4.unhighlight("rc");
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  pseudo5.css([0, 1, 2, 3, 4, 5], {"border-width": "0px"});
  pseudo6.show();
  pseudo6.css([0, 1, 2, 3, 4, 5], {"border-width": "1px", "border-color": "black"});
  pseudo6.highlight("bc");
  pseudo5.unhighlight("sig");
  pseudo5.unhighlight("rc");
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  pseudo6.unhighlight("bc");
  pseudo6.highlight("bcac");
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  pseudo2.hide();
  pseudo3.hide();
  pseudo4.hide();
  pseudo5.hide();
  pseudo6.hide();
  pseudo7.show();
  pseudo7.css([0, 1, 2, 3, 4, 5], {"border-width": "1px", "border-color": "black"});
  pseudo7.highlight("rc");
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  pseudo7.css([0, 1, 2, 3, 4, 5], {"border-width": "0px"});
  pseudo8.show();
  pseudo8.css([0, 1, 2, 3, 4, 5], {"border-width": "1px", "border-color": "black"});
  pseudo8.highlight("rc");
  pseudo7.unhighlight("rc");
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  pseudo8.css([0, 1, 2, 3, 4, 5], {"border-width": "0px"});
  pseudo9.show();
  pseudo9.css([0, 1, 2, 3, 4, 5], {"border-width": "1px", "border-color": "black"});
  pseudo9.highlight("rc");
  pseudo8.unhighlight("rc");
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  pseudo9.css([0, 1, 2, 3, 4, 5], {"border-width": "0px"});
  pseudo10.show();
  pseudo10.css([0, 1, 2, 3, 4, 5], {"border-width": "1px", "border-color": "black"});
  pseudo9.unhighlight("rc");
  pseudo10.highlight("rc");
  av.recorded();
});
