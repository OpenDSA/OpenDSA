/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Elements of the queue are stored in the first n positions of the array

// Title: Array-Based Queue Positions Slideshow
// Author: Jun Yang; Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Array-based Queue
// Natural Language: en
// Programming Language: N/A

/* Description: Slideshow presenting an initial design for storing a queue in an array. */

$(document).ready(function() {
  "use strict";
  var av_name = "aqueueFirstCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // Relative offsets
  var leftMargin = 300;
  var topMargin = 0;

  // Create the graphics for front and rear boxes
  var arrFront = av.ds.array([""], {indexed: false, left: 200, top: topMargin});
  av.label("front", {left: 163, top: topMargin + 4});
  var arrRear = av.ds.array([""], {indexed: false, left: 200, top: topMargin + 35});
  av.label("rear", {left: 168, top: topMargin + 39});
  av.ds.array([4], {indexed: false, left: 200, top: topMargin + 70});
  av.label("listSize", {left: 147, top: topMargin + 74});

  var arr = av.ds.array([12, 45, 5, 81, "", "", "", ""],
                          {indexed: true, top: topMargin, left: leftMargin});
  arr.addClass([4, 5, 6, 7], "unused");

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  arrFront.value(0, 3);
  arrFront.addClass([0], "special");
  arr.addClass([3], "special");
  arrRear.value(0, 0);
  arrRear.addClass([0], "processing");
  arr.addClass([0], "processing");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  arrFront.value(0, 0);
  arr.removeClass([3], "special");
  arr.addClass([3], "processing");
  arrRear.value(0, 3);
  arr.removeClass([0], "processing");
  arr.addClass([0], "special");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  av.recorded();
});
