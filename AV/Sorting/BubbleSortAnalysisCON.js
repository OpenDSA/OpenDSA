/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Bubble Sort Analysis

// Title: Bubble Sort Analysis Slideshow
// Author: Mohammed Farghally; Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Analysis Demonstration
// Keyword: Bubble Sort; Worst Case; Average Case; Best Case
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow showing an analysis of Bubble Sort's cost analysis. */
 
$(document).ready(function() {
  "use strict";
  var av_name = "BubbleSortAnalysisCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]).hide();
  var arr;
  var arr_values = [];
  var leftAlign = 400;
  var topAlign = 80;
  var rectHeight = 20;
  var rectWidth = 50;
  var labelGap = 5;


  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  pseudo.show();
  av.umsg(interpret("sc2"));
  pseudo.highlight("loop");
  av.step();

  // Slide 3
  pseudo.unhighlight("loop");
  av.umsg(interpret("sc3"));
  for (var i = 0; i < 6; i++) {
    arr_values[i] = parseInt(Math.random() * 20, 10);
  }
  arr = av.ds.array(arr_values, {left: 50, top: 0, indexed: true});
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  arr.addClass([0, 1], "greenbg");
  if (arr.value(0) > arr.value(1)) {
    arr.swap(0, 1);
  }
  av.g.rect(leftAlign, topAlign, rectWidth, rectHeight);
  av.label("$i = 0$",  {top: topAlign + 12, left: leftAlign + 10});
  av.step();

  // Slide 5
  arr.addClass([1, 2], "greenbg");
  arr.removeClass(0, "greenbg");
  if (arr.value(1) > arr.value(2)) {
    arr.swap(1, 2);
  }
  av.g.rect(leftAlign, topAlign - rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 6
  arr.addClass([2, 3], "greenbg");
  arr.removeClass(1, "greenbg");
  if (arr.value(2) > arr.value(3)) {
    arr.swap(2, 3);
  }
  av.g.rect(leftAlign, topAlign - 2 * rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 7
  arr.addClass([3, 4], "greenbg");
  arr.removeClass(2, "greenbg");
  if (arr.value(3) > arr.value(4)) {
    arr.swap(3, 4);
  }
  av.g.rect(leftAlign, topAlign - 3 * rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 8
  arr.addClass([4, 5], "greenbg");
  arr.removeClass(3, "greenbg");
  if (arr.value(4) > arr.value(5)) {
    arr.swap(4, 5);
  }
  av.g.rect(leftAlign, topAlign - 4 * rectHeight, rectWidth, rectHeight);
  arr.addClass(5, "deemph");
  arr.removeClass(4, "greenbg");
  arr.removeClass(5, "greenbg");
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  arr.addClass([0, 1], "greenbg");
  if (arr.value(0) > arr.value(1)) {
    arr.swap(0, 1);
  }
  av.g.rect(leftAlign + rectWidth, topAlign, rectWidth, rectHeight);
  av.label("$i = 1$",  {top: topAlign + 12, left: leftAlign + rectWidth + 10});
  av.step();

  // Slide 10
  arr.addClass([1, 2], "greenbg");
  arr.removeClass(0, "greenbg");
  if (arr.value(1) > arr.value(2)) {
    arr.swap(1, 2);
  }
  av.g.rect(leftAlign + rectWidth, topAlign - rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 11
  arr.addClass([2, 3], "greenbg");
  arr.removeClass(1, "greenbg");
  if (arr.value(2) > arr.value(3)) {
    arr.swap(2, 3);
  }
  av.g.rect(leftAlign + rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 12
  arr.addClass([3, 4], "greenbg");
  arr.removeClass(2, "greenbg");
  if (arr.value(3) > arr.value(4)) {
    arr.swap(3, 4);
  }
  av.g.rect(leftAlign + rectWidth, topAlign - 3 * rectHeight, rectWidth, rectHeight);
  arr.addClass(4, "deemph");
  arr.removeClass(3, "greenbg");
  arr.removeClass(4, "greenbg");
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  arr.addClass([0, 1], "greenbg");
  if (arr.value(0) > arr.value(1)) {
    arr.swap(0, 1);
  }
  av.g.rect(leftAlign + 2 * rectWidth, topAlign, rectWidth, rectHeight);
  av.label("$i = 2$",  {top: topAlign + 12, left: leftAlign + 2 * rectWidth + 10});
  av.step();

  // Slide 14
  arr.addClass([1, 2], "greenbg");
  arr.removeClass(0, "greenbg");
  if (arr.value(1) > arr.value(2)) {
    arr.swap(1, 2);
  }
  av.g.rect(leftAlign + 2 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 15
  arr.addClass([2, 3], "greenbg");
  arr.removeClass(1, "greenbg");
  if (arr.value(2) > arr.value(3)) {
    arr.swap(2, 3);
  }
  av.g.rect(leftAlign + 2 * rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 16
  arr.addClass(3, "deemph");
  arr.removeClass(2, "greenbg");
  arr.removeClass(3, "greenbg");
  av.step();

  // Slide 17
  av.umsg(interpret("sc17"));
  arr.addClass([0, 1], "greenbg");
  if (arr.value(0) > arr.value(1)) {
    arr.swap(0, 1);
  }
  av.g.rect(leftAlign + 3 * rectWidth, topAlign, rectWidth, rectHeight);
  av.label("$i = 3$",  {top: topAlign + 12, left: leftAlign + 3 * rectWidth + 10});
  av.step();

  // Slide 18
  arr.addClass([1, 2], "greenbg");
  arr.removeClass(0, "greenbg");
  if (arr.value(1) > arr.value(2)) {
    arr.swap(1, 2);
  }
  av.g.rect(leftAlign + 3 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 19
  arr.addClass(2, "deemph");
  arr.removeClass(1, "greenbg");
  arr.removeClass(2, "greenbg");
  av.step();

  // Slide 20
  av.umsg(interpret("sc20"));
  arr.addClass([0, 1], "greenbg");
  if (arr.value(0) > arr.value(1)) {
    arr.swap(0, 1);
  }
  av.g.rect(leftAlign + 4 * rectWidth, topAlign, rectWidth, rectHeight);
  av.label("$i = 4$", {top: topAlign + 12, left: leftAlign + 4 * rectWidth + 10});
  arr.addClass(1, "deemph");
  arr.addClass(0, "deemph");
  arr.removeClass(0, "greenbg");
  arr.removeClass(1, "greenbg");
  av.step();

  // Slide 21
  av.umsg(interpret("sc21"));
  //Horizontal Line
  av.g.line(leftAlign, 3 * rectHeight + topAlign,
            leftAlign + 2 * rectWidth,
            3 * rectHeight + topAlign,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.g.line(leftAlign + 3 * rectWidth, 3 * rectHeight + topAlign,
            leftAlign + 5 * rectWidth, 3 * rectHeight + topAlign,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign, 2.5 * rectHeight + topAlign,
            leftAlign, 3.5 * rectHeight + topAlign);
  av.g.line(leftAlign + 5 * rectWidth, 2.5 * rectHeight + topAlign,
            leftAlign + 5 * rectWidth, 3.5 * rectHeight + topAlign);
  av.label("$n - 1$",
           {top: topAlign + 1.5 * rectHeight,
             left: leftAlign + 2 * rectWidth + labelGap});
  //Vertical Line
  av.g.line(leftAlign - 0.5 * rectWidth, topAlign - rectHeight,
            leftAlign - 0.5 * rectWidth, topAlign +  rectHeight,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign - 0.5 * rectWidth, topAlign - 2 * rectHeight,
            leftAlign - 0.5 * rectWidth, topAlign -  4 * rectHeight,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign - 0.75 * rectWidth, topAlign + rectHeight,
            leftAlign - 0.25 * rectWidth, topAlign + rectHeight);
  av.g.line(leftAlign - 0.75 * rectWidth, topAlign - 4 * rectHeight,
            leftAlign - 0.25 * rectWidth, topAlign - 4 * rectHeight);
  av.label("$n - 1$",
           {top: topAlign - 3 * rectHeight,
             left: leftAlign - rectWidth + labelGap});
  av.step();

  // Slide 22
  av.umsg(interpret("sc22"));
  av.g.polyline([[leftAlign + 5 * rectWidth, topAlign + rectHeight], [leftAlign, topAlign + rectHeight], [leftAlign, topAlign - 4 * rectHeight]]).addClass("bigTriangle");
  av.g.polyline([[leftAlign + 5 * rectWidth, topAlign + rectHeight], [leftAlign + 5 * rectWidth, topAlign], [leftAlign + 4 * rectWidth, topAlign]]).addClass("smallTriangle");
  av.g.polyline([[leftAlign + 4 * rectWidth, topAlign], [leftAlign + 4 * rectWidth, topAlign - rectHeight], [leftAlign + 3 * rectWidth, topAlign - rectHeight]]).addClass("smallTriangle");
  av.g.polyline([[leftAlign + 3 * rectWidth, topAlign - rectHeight], [leftAlign + 3 * rectWidth, topAlign - 2 * rectHeight], [leftAlign + 2 * rectWidth, topAlign - 2 * rectHeight]]).addClass("smallTriangle");
  av.g.polyline([[leftAlign + 2 * rectWidth, topAlign - 2 * rectHeight], [leftAlign + 2 * rectWidth, topAlign - 3 * rectHeight], [leftAlign + rectWidth, topAlign - 3 * rectHeight]]).addClass("smallTriangle");
  av.g.polyline([[leftAlign + rectWidth, topAlign - 3 * rectHeight], [leftAlign + rectWidth, topAlign - 4 * rectHeight], [leftAlign, topAlign - 4 * rectHeight]]).addClass("smallTriangle");
  av.step();

  // Slide 23
  av.umsg(interpret("sc23"));
  av.step();

  // Slide 24
  av.umsg(interpret("sc24"));
  av.recorded();
});
