/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Array-based list append
$(document).ready(function() {
  "use strict";
  var arrValues = [13, 12, 20, 8, 3, "", "", ""];
  var av_name = "alistAppendCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);
  var arr = av.ds.array(arrValues, {indexed: true, top: 27, left: 10});

  var arrow1 = av.g.line(176, 18, 176, 43,
                         {"arrow-end": "classic-wide-long",
                          opacity: 100, "stroke-width": 2});
  arrow1.hide();
  var label = av.label("Append 23", {before: arr,
                                     left: 140, top: -20}).hide();

  var arrMS = av.ds.array([8], {indexed: false, left: 100, top: 85});
  var labelMaxSize = av.label("maxSize", {before: arrMS, left: 33, top: 89});

  var arrLS = av.ds.array([5], {indexed: false, left: 100, top: 120});
  var labelListSize = av.label("listSize", {before: arrLS, left: 42, top: 124});

  // Slide 1
  av.umsg(interpret("sc1"));
  arr.addClass([5, 6, 7], "unused");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  label.show();
  pseudo.setCurrentLine("sig");
  labelMaxSize.show();
  arrMS.show();
  arrLS.show();
  labelListSize.show();
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.setCurrentLine("check");
  arrow1.show();
  arr.highlight(5);
  arrMS.highlight(0);
  arrLS.highlight(0);
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.setCurrentLine("assign");
  arrLS.value(0, 6);
  arrMS.unhighlight(0);
  arr.value(5, "23");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  arr.unhighlight(5);
  arr.removeClass([5], "unused");
  arrLS.unhighlight(0);
  pseudo.setCurrentLine(0);
  av.recorded();
});
