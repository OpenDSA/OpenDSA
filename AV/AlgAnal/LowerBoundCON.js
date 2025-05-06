/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer

// Title: Lower Bounds Misconceptions
// Author: Mohammed Farghally; Cliff Shaffer
// Institution: Virginia Tech
// Features: Demonstration
// Keyword: Problem; Algorithm; Program
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow illustrating lower bounds analysis and discussing various associated misconceptions. */

// Lower Bounds definition
$(document).ready(function() {
  "use strict";
  var av_name = "LowerBoundCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);
  var arr;
  var arr_values = [];
  var topAlign = 40;
  var leftAlign = 10;
  var arraySize = 7;
  var i;

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  var nLine1 = av.g.line(leftAlign + 10, topAlign, leftAlign + 155, topAlign,
                         {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  var nLabel = av.label("$n$", {top: topAlign - 30, left: leftAlign + 165});
  var nLine2 = av.g.line(leftAlign + 195, topAlign, leftAlign + 340, topAlign,
                         {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var count = 0;
  while (count < arraySize) {
    var value = Math.round(Math.random() * 10) + 1;
    if (arr_values.indexOf(value) === -1) {
      arr_values[count] = value;
      count++;
    }
  }
  arr = av.ds.array(arr_values, {left: leftAlign, top: topAlign, indexed: true});
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"), {preserve: true, color: "red"});
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  var pointer = av.pointer("$K$", arr.index(0));
  arr.addClass(0, "greenbg");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  var indices = [];
  pointer.target(arr.index(parseInt(arraySize - 1, 10)));
  for (i = 0; i < parseInt(arraySize, 10); i++) {
    indices[i] = i;
  }
  arr.addClass(indices, "redbg");
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  arr.removeClass(indices, "redbg");
  pointer.hide();
  arr.unhighlight();
  for (i = 0; i <= parseInt(arraySize / 2, 10); i++) {
    arr.highlight(i);
  }
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  arr.hide();
  nLabel.hide();
  nLine1.hide();
  nLine2.hide();

  pointer.hide();
  topAlign = 15;
  var arr1 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 25, indexed: true});
  var p1 = av.pointer("$K$", arr1.index(0));
  arr1.addClass([0], "greenbg");
  var l1 = av.label(interpret("lab1"), {left: leftAlign + 395, top: topAlign + 30});
  var arr2 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 135, indexed: true});
  var p2 = av.pointer("$K$", arr2.index(arraySize - 1));
  arr2.addClass(indices, "redbg");
  var l2 = av.label(interpret("lab2"), {left: leftAlign + 395, top: topAlign + 140});
  var arr3 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 245, indexed: true});
  for (i = 0; i <= parseInt(arraySize / 2, 10); i++) {
    arr3.highlight(i);
  }
  var l3 = av.label(interpret("lab3"), {left: leftAlign + 395, top: topAlign + 250});
  av.step();

  av.umsg(interpret("sc8"));
  arr1.hide();
  arr2.hide();
  arr3.hide();
  p1.hide();
  p2.hide();
  l1.hide();
  l2.hide();
  l3.hide();
  av.step();

  av.umsg(interpret("sc9"), {preserve: true});
  av.step();

  av.umsg(interpret("sc10"));
  av.recorded();
});
