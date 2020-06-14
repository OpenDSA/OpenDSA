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

  //variables for making rectangles
  var width = 40;
  var length = 80;
  var xPosRect = 30;
  var yPosRect = 30;

  //arrow variables
  var shallowCopyEmployeeArrow = av.g.line(125, 175, xPosRect + 60, yPosRect + 48,
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  var secondEmployeeArrow = av.g.line(xPosRect + 670, yPosRect + 45, xPosRect + 692, yPosRect,
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  var deepCopyEmployee = av.g.line(xPosRect + 670, yPosRect + 45 + 107, xPosRect + 692, yPosRect + 107,
           {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  var line = av.g.line(50, 110, xPosRect + 25, yPosRect + 48,
           {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  line.hide();

  //Slide 1
  av.umsg(interpret("sc1"));
  shallowCopyEmployeeArrow.hide();
  secondEmployeeArrow.hide();
  deepCopyEmployee.hide();
  av.step();
  
  // Slide 2
  av.displayInit();
  av.umsg(interpret("sc2"));
  pseudo.highlight("line1");
  var sam = av.label("Sam", {top: 25, left: 50});
  sam.show();
  av.g.rect(xPosRect, yPosRect, length, width);
  av.label("firstEmployee", {top: 100, left: 10});
  line.show();
  
  
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.unhighlight("line1");
  pseudo.highlight("line2");
  av.label("shallowCopyEmployee", {top: 165, left: 21});
  shallowCopyEmployeeArrow.show();
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  
  pseudo.unhighlight("line2");
  pseudo.highlight("line3");
  sam.hide();
  var john = av.label("John", {top: 25, left: 50});
  john.show();
  av.step();

  // Slide 4
  av.umsg(interpret("sc5"));
  pseudo.unhighlight("line3");
  pseudo.highlight("line4");
  av.step();

  // Slide 5
  av.umsg(interpret("sc6"));
  pseudo.unhighlight("line4");
  pseudo.highlight("line5");
  av.g.rect(xPosRect + 700, yPosRect - 27, length, width);
  secondEmployeeArrow.show();
  av.label("Patrice", {top: 0, left: 746});
  av.label("secondEmployee", {top: 57, left: 700});
  av.step();
  
  //Slide 6
  pseudo.unhighlight("line5");
  av.umsg(interpret("sc7"));
  pseudo.highlight("line6");
  av.g.rect(xPosRect + 700, yPosRect + 80, length, width);
  deepCopyEmployee.show();
  av.label("deepCopyEmployee", {top: 58 + 107, left: 695});
  av.step();

  // Slide 7
  av.umsg(interpret("sc8"));
  
  pseudo.unhighlight("line6");
  pseudo.highlight("line7");
  var pat = av.label("Patrice", {top: 107, left: 746});
  pat.show();
  av.step();

  // Slide 8
  av.umsg(interpret("sc9"));
  pseudo.unhighlight("line7");
  pseudo.highlight("line8");
  pat.hide();
  av.label("John", {top: 107, left: 746});
  av.step();

  // Slide 9
  av.umsg(interpret("sc10"));
  pseudo.unhighlight("line8");
  pseudo.highlight("line9");
  av.recorded();
  //av.label("Prints: \"Patrice\"", {top: 185, left: 700});
});

