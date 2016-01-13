/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Quick Sort Partition Analysis
$(document).ready(function() {
  "use strict";
  var av_name = "QuickSortPartitionAnalysisCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code).hide();
  var arr;
  var arr_values = [];
  var left = [], pivot = [], right = [];
  var pivotLabel;

  // Slide 1
  av.umsg(interpret("Slide 1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("Slide 2"));
  for (var i = 0; i < 9; i++) {
    arr_values[i] = " ";
  }
  arr = av.ds.array(arr_values, {left: 150, top: 20, indexed: true});
  pivot = av.ds.array([4], {left: 550, top: 30, indexed: false});
  pivotLabel = av.label(interpret("lab1"), {left: 590, top: 32, indexed: false});
  arr.highlight(4);
  pivot.highlight();
  av.step();

  // Slide 3
  pseudo.show();
  av.umsg("Function partition contains an outer while loop with two nested while loops");
  pseudo.highlight("loops");
  pivot.hide();
  pivotLabel.hide();
  arr.unhighlight(4);
  av.step();

  // Slide 4
  av.umsg(interpret("Slide 4"));
  left = av.ds.array([0], {left: 550, top: -10, indexed: false});
  av.label(interpret("lab2"), {left: 590, top: -8, indexed: false});
  arr.addClass(0, "greenbg");
  left.addClass(0, "greenbg");
  right = av.ds.array([7], {left: 550, top: 70, indexed: false});
  av.label(interpret("lab3"), {left: 590, top: 72, indexed: false});
  arr.addClass(7, "redbg");
  right.addClass(0, "redbg");
  arr.highlight(8);
  pivot.value(0, 8);
  pivot.show();
  pivotLabel.show();
  av.step();

  // Slide 5
  av.umsg(interpret("Slide 5"));
  pseudo.unhighlight("loop2");
  pseudo.unhighlight("loop3");
  pseudo.highlight("if");
  av.step();

  // Slide 6
  av.umsg(interpret("Slide 6"));
  av.step();

  // Slide 7
  av.umsg(interpret("Slide 7"));
  arr.removeClass(0, "greenbg");
  left.value(0, 8);
  arr.addClass(8, "greenbg");
  arr.unhighlight(8);
  pseudo.unhighlight("if");
  pseudo.highlight("loop2");
  av.step();

  // Slide 8
  av.umsg(interpret("Slide 8"));
  arr.removeClass(8, "greenbg");
  left.value(0, 0);
  arr.addClass(0, "greenbg");
  right.value(0, -1);
  arr.removeClass(7, "redbg");
  arr.highlight(8);
  pseudo.unhighlight("loop2");
  pseudo.highlight("loop3");
  av.step();

  // Slide 9
  av.umsg(interpret("Slide 9"));
  right.value(0, 7);
  arr.addClass(7, "redbg");
  pseudo.highlight("loop2");
  av.step();

  // Slide 10
  av.umsg(interpret("Slide 10"));
  av.recorded();
});
