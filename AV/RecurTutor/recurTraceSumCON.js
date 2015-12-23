/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var theArray = [2, 4, 6];
  var av_name = "recurTraceSumCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter, // get the interpreter
      code = config.code;
  var av = new JSAV(av_name);

  var ptop = 230;

  // Slide 1
  av.umsg(interpret("sc1"));
  var pseudo = av.code(code[0]);
  var arr = av.ds.array(theArray, {indexed: true});
  var label = av.label("arr", {before: arr, left: 350, top: 145});
  label.show();
  av.displayInit();

  av.umsg(interpret("sc1_1"));
  av.step();
  // Slide 2
  av.umsg(interpret("sc2"));
  var pseudo2 = av.code($.extend({lineNumbers: false, top: ptop, left: 260}, code[4]));
  pseudo2.css([0, 1, 2, 3, 4, 5, 6], {"border-width": "1px", "border-color": "black"});
  pseudo.highlight("sig");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.unhighlight("sig");
  pseudo.highlight("bc");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.unhighlight("bc");
  pseudo.highlight("rc");
  pseudo2.highlight("rc");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  pseudo2.css([0, 1, 2, 3, 4, 5, 6], {"border-width": "0px"});
  var pseudo3 = av.code($.extend({lineNumbers: false, top: ptop + 20, left: 290}, code[3]));
  pseudo3.css([0, 1, 2, 3, 4, 5, 6], {"border-width": "1px", "border-color": "black"});
  pseudo.unhighlight("rc");
  pseudo2.unhighlight("rc");
  pseudo.highlight("sig");
  pseudo3.highlight("rc");
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  pseudo3.css([0, 1, 2, 3, 4, 5, 6], {"border-width": "0px"});
  var pseudo4 = av.code($.extend({lineNumbers: false, top: ptop + 40, left: 320}, code[2]));
  pseudo4.css([0, 1, 2, 3, 4, 5, 6], {"border-width": "1px", "border-color": "black"});
  pseudo.unhighlight("sig");
  pseudo3.unhighlight("rc");
  pseudo.highlight("rc");
  pseudo4.highlight("rc");
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  pseudo.unhighlight("rc");
  pseudo.highlight("sig");
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  pseudo.unhighlight("sig");
  pseudo.highlight("rc");
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  pseudo.unhighlight("rc");
  pseudo4.unhighlight("rc");
  pseudo.highlight("bcac");
  pseudo4.css([0, 1, 2, 3, 4, 5, 6], {"border-width": "0px"});
  var pseudo5 = av.code($.extend({lineNumbers: false, top: ptop + 60, left: 430}, code[1]));
  pseudo5.css([0, 1, 2, 3, 4, 5, 6], {"border-width": "1px", "border-color": "black"});
  pseudo5.highlight("bcac");
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  pseudo.unhighlight("bcac");
  pseudo.highlight("rc");
  pseudo5.hide();
  pseudo4.css([0, 1, 2, 3, 4, 5, 6], {"border-width": "1px", "border-color": "black"});
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  arr.unhighlight([0]);
  arr.addClass([0], "unused");
  pseudo4.hide();
  pseudo3.css([0, 1, 2, 3, 4, 5, 6], {"border-width": "1px", "border-color": "black"});
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  arr.unhighlight([1]);
  arr.addClass([1], "unused");
  pseudo3.hide();
  pseudo2.css([0, 1, 2, 3, 4, 5, 6], {"border-width": "1px", "border-color": "black"});
  av.step();

  // Slide 14
  av.umsg(interpret("sc14"));
  arr.addClass([2], "unused");
  pseudo2.hide();
  av.recorded();
});
