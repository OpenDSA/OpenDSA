/*global ODSA */
"use strict";
// Written by Pavel Hovhannisyan and Cliff Shaffer
$(document).ready(function () {
  var av_name = "binarySearchCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadLangData({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);

  var theArray = [11, 13, 21, 26, 29, 36, 40, 41, 45, 51, 54, 56, 65, 72, 77, 83];
  var pseudo = av.code(code);
  var arr = av.ds.array(theArray, {indexed: true});

  // Slide 1
  av.umsg(interpret("av_c1"));
  arr.toggleArrow(8);
  av.displayInit();
  arr.addClass([0, 15], "yellow");

  // Slide 2
  av.umsg(interpret("av_c2"));
  pseudo.setCurrentLine("sig");
  av.step();

  // Slide 3
  av.umsg(interpret("av_c3"));
  arr.addClass(7, "blue");
  pseudo.setCurrentLine("compute");
  av.step();

  // Slide 4
  av.umsg(interpret("av_c4"));
  arr.removeClass(7, "blue").addClass(7, "yellow");
  arr.removeClass(0, "yellow");
  arr.addClass([0, 1, 2, 3, 4, 5, 6], "Light");
  pseudo.setCurrentLine("right");
  av.step();

  // Slide 5
  av.umsg(interpret("av_c5"));
  arr.addClass(11, "blue");
  pseudo.setCurrentLine("compute");
  av.step();

  // Slide 6
  av.umsg(interpret("av_c6"));
  arr.removeClass(11, "blue").addClass(11, "yellow");
  arr.removeClass(15, "yellow");
  arr.addClass([12, 13, 14, 15], "Light");
  pseudo.setCurrentLine("left");
  av.step();

  // Slide 7
  av.umsg(interpret("av_c7"));
  arr.addClass(9, "blue");
  pseudo.setCurrentLine("compute");
  av.step();

  // Slide 8
  av.umsg(interpret("av_c8"));
  arr.removeClass(9, "blue").addClass(9, "yellow");
  arr.removeClass(11, "yellow");
  arr.addClass([10, 11], "Light");
  pseudo.setCurrentLine("left");
  av.step();

  // Slide 9
  av.umsg(interpret("av_c9"));
  arr.addClass(8, "blue");
  pseudo.setCurrentLine("compute");
  av.step();

  // Slide 10
  av.umsg(interpret("av_c10"));
  arr.removeClass(8, "blue");
  arr.addClass(8, "pink");
  pseudo.setCurrentLine("found");
  av.step();

  // Slide 11
  av.umsg(interpret("av_c11"));
  pseudo.setCurrentLine(0);
  pseudo.highlight("while");
  pseudo.highlight("return");
  av.step();

  // Slide 12
  pseudo.unhighlight("while");
  pseudo.unhighlight("return");
  av.umsg(interpret("av_c12"));
  arr.removeClass(true, "Light");
  arr.removeClass([7, 9], "yellow");
  arr.addClass([7, 9, 11], "pink");
  av.recorded();
});
