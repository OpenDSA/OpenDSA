/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// A problem that queue runs out of space..

// Title: Array-Based Queue Design Problem Slideshow
// Author: Jun Yang; Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Array-Based Queue
// Natural Language: en
// Programming Language: N/A

/* Description: Slideshow presenting the problem that elements in an array-based queue will eventually run out of space. */

$(document).ready(function() {
  "use strict";
  var av_name = "aqueueBadCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // Relative offsets
  var leftMargin = 280;
  var topMargin = 0;

  var arr = av.ds.array(["", "", "", 17, 3, 30, 4, "", "", ""],
                        {indexed: true, left: leftMargin, top: topMargin});
  arr.addClass([0, 1, 2, 7, 8, 9], "unused");
  // Create the graphics for front and rear boxes
  var arrFront = av.ds.array([3], {indexed: false, left: 200, top: topMargin});
  av.label("front", {left: 163, top: topMargin + 4});
  arrFront.addClass([0], "special");
  arr.addClass([3], "special");
  var arrRear = av.ds.array([6], {indexed: false, left: 200, top: topMargin + 35});
  av.label("rear", {left: 168, top: topMargin + 39});
  arrRear.addClass([0], "processing");
  arr.addClass([6], "processing");
  var arrSize = av.ds.array([4], {indexed: false, left: 200, top: topMargin + 70});
  av.label("listSize", {left: 147, top: topMargin + 74});

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  arr.value(3, "");
  arr.removeClass(3, "special");
  arr.addClass(3, "unused");
  arr.addClass(4, "special");
  arrSize.value(0, 3);
  arrFront.value(0, 4);
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  arr.removeClass(7, "unused");
  arr.removeClass(6, "processing");
  arr.addClass(7, "processing");
  arr.value(7, "3");
  arrSize.value(0, 4);
  arrRear.value(0, 7);
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  arr.removeClass(8, "unused");
  arr.removeClass(7, "processing");
  arr.addClass(8, "processing");
  arr.value(8, "40");
  arrSize.value(0, 5);
  arrRear.value(0, 8);
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  arr.removeClass(9, "unused");
  arr.removeClass(8, "processing");
  arr.addClass(9, "processing");
  arr.value(9, "42");
  arrSize.value(0, 6);
  arrRear.value(0, 9);
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  av.recorded();
});
