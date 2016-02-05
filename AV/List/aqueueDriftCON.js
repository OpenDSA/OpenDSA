/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// The contents of the queue will be permitted to drift within the array.
$(document).ready(function() {
  "use strict";
  var av_name = "aqueueDriftCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // Relative offsets
  var leftMargin = 280;
  var topMargin = 0;

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  var arr = av.ds.array([20, 5, 12, 17, "", "", "", "", "", ""],
                        {indexed: true, left: leftMargin, top: topMargin});
  arr.addClass([4, 5, 6, 7, 8, 9], "unused");
  // Create the graphics for front and rear boxes
  var arrFront = av.ds.array([0], {indexed: false, left: 200, top: topMargin});
  av.label("front", {left: 161, top: topMargin + 4});
  arrFront.addClass([0], "special");
  arr.addClass([0], "special");
  var arrRear = av.ds.array([3], {indexed: false, left: 200, top: topMargin + 35});
  av.label("rear", {left: 166, top: topMargin + 39});
  arrRear.addClass([0], "processing");
  arr.addClass([3], "processing");
  var arrSize = av.ds.array([4], {indexed: false, left: 200, top: topMargin + 70});
  av.label("listSize", {left: 145, top: topMargin + 74});
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  arr.value(0, "");
  arr.removeClass(0, "special");
  arr.addClass(0, "unused");
  arr.addClass(1, "special");
  arrSize.value(0, 3);
  arrFront.value(0, 1);
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  arr.value(1, "");
  arr.removeClass(1, "special");
  arr.addClass(1, "unused");
  arr.addClass(2, "special");
  arrSize.value(0, 2);
  arrFront.value(0, 2);
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  arr.value(2, "");
  arr.removeClass(2, "special");
  arr.addClass(2, "unused");
  arr.addClass(3, "special");
  arrSize.value(0, 1);
  arrFront.value(0, 3);
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  arr.removeClass(4, "unused");
  arr.addClass(4, "processing");
  arr.value(4, "3");
  arrSize.value(0, 2);
  arrRear.value(0, 4);
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  arr.removeClass(5, "unused");
  arr.value(5, "30");
  arr.addClass(5, "processing");
  arr.removeClass(4, "processing");
  arrSize.value(0, 3);
  arrRear.value(0, 5);
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  arr.removeClass(6, "unused");
  arr.value(6, "4");
  arr.addClass(6, "processing");
  arr.removeClass(5, "processing");
  arrSize.value(0, 4);
  arrRear.value(0, 6);
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  arr.unhighlight(6);
  arrRear.unhighlight(0);
  av.recorded();
});
