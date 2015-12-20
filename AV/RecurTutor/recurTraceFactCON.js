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
  av.umsg(interpret("av_c1"));
  av.displayInit();
  // Slide 2
  av.umsg(interpret("av_c2"));
  var pseudo2 = av.code($.extend({lineNumbers: false, top: 150, left: 0}, code[1]));
  var pseudo3 = av.code($.extend({lineNumbers: false, top: 150, left: 260}, code[2]));
  var pseudo4 = av.code($.extend({lineNumbers: false, top: 150, left: 520}, code[3]));
  var pseudo5 = av.code($.extend({lineNumbers: false, top: 300, left: 125}, code[4]));
  var pseudo6 = av.code($.extend({lineNumbers: false, top: 300, left: 393}, code[5]));
 // After the return:
  var pseudo7 = av.code($.extend({lineNumbers: false, top: 150, left: 125}, code[6]));
  var pseudo8 = av.code($.extend({lineNumbers: false, top: 150, left: 385}, code[7]));
  var pseudo9 = av.code($.extend({lineNumbers: false, top: 300, left: 125}, code[8]));
  var pseudo10 = av.code($.extend({lineNumbers: false, top: 300, left: 385}, code[9]));
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
  av.umsg(interpret("av_c3"));
  pseudo3.show();
  pseudo3.highlight("sig");
  pseudo3.highlight("rc");
  av.step();
  // Slide 4
  av.umsg(interpret("av_c4"));
  pseudo4.show();
  pseudo4.highlight("sig");
  pseudo4.highlight("rc");
  av.step();
  // Slide 5
  av.umsg(interpret("av_c5"));
  pseudo5.show();
  pseudo5.highlight("sig");
  pseudo5.highlight("rc");
  av.step();
  // Slide 6
  av.umsg(interpret("av_c6"));
  pseudo6.show();
  pseudo6.highlight("bc");
  av.step();
  // Slide 7
  av.umsg(interpret("av_c7"));
  pseudo6.unhighlight("bc");
  pseudo6.highlight("bcac");
  av.step();
  // Slide 8
  av.umsg(interpret("av_c8"));
  pseudo2.hide();
  pseudo3.hide();
  pseudo4.hide();
  pseudo5.hide();
  pseudo6.hide();
  pseudo7.show();
  pseudo7.highlight("rc");
  av.step();
  // Slide 9
  av.umsg(interpret("av_c9"));
  pseudo8.show();
  pseudo8.highlight("rc");
  av.step();
  // Slide 10
  av.umsg(interpret("av_c10"));
  pseudo9.show();
  pseudo9.highlight("rc");
  av.step();
  // Slide 11
  av.umsg(interpret("av_c11"));
  pseudo10.show();
  pseudo10.highlight("bcac");
  av.recorded();
});
