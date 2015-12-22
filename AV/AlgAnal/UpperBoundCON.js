/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Upper Bounds definition
$(document).ready(function() {
  "use strict";
  var av_name = "UpperBoundCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);
  var arr;
  var arr_values = [];
  var topAlign = 80;
  var leftAlign = 10;
  var arraySize = 7;
  var i;

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"), {preserve: true});
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  var nLabel = av.label("|---------------------------- $n$ ----------------------------|", {left: leftAlign + 25, top: topAlign + 60});
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

  // Slide 4
  av.umsg(interpret("sc4"), {preserve: true});
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"), {preserve: true, color: "#f00"});
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"), {preserve: true});
  var pointer = av.pointer("$K$", arr.index(0));
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"), {preserve: true});
  pointer.target(arr.index(arraySize - 1, 10));
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"), {preserve: true});
  pointer.hide();
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  pointer.show();
  pointer.target(arr.index(0));
  arr.addClass(0, "greenbg");
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"), {preserve: true});
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  var indices = [];
  pointer.target(arr.index(parseInt(arraySize - 1, 10)));
  for (i = 0; i < parseInt(arraySize, 10); i++) {
    indices[i] = i;
  }
  arr.addClass(indices, "redbg");
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"), {preserve: true});
  av.step();

  // Slide 14
  av.umsg(interpret("sc14"));
  for (i = 0; i < parseInt(arraySize, 10); i++) {
    arr.removeClass(i, "redbg");
  }
  pointer.target(arr.index(parseInt(arraySize / 2, 10)));
  arr.unhighlight();
  for (i = 0; i <= parseInt(arraySize / 2, 10); i++) {
    arr.highlight(i);
  }
  av.step();

  // Slide 15
  av.umsg(interpret("sc15"), {preserve: true});
  av.step();

  // Slide 16
  av.umsg(interpret("sc16"));
  arr.hide();
  nLabel.hide();
  pointer.hide();
  av.step();

  // Slide 17
  av.umsg(interpret("sc17"), {preserve: true});
  topAlign = 15;
  var arr1 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 30, indexed: true});
  av.pointer("$K$", arr1.index(0));
  arr1.addClass([0], "greenbg");
  av.label(interpret("lab1"), {left: leftAlign + 395, top: topAlign + 35});
  var arr2 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 140, indexed: true});
  av.pointer("$K$", arr2.index(arraySize - 1));
  arr2.addClass(indices, "redbg");
  av.label(interpret("lab2"), {left: leftAlign + 395, top: topAlign + 145});
  var arr3 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 250, indexed: true});
  for (i = 0; i <= parseInt(arraySize / 2, 10); i++) {
    arr3.highlight(i);
  }
  av.label(interpret("lab3"), {left: leftAlign + 395, top: topAlign + 255});
  av.recorded();
});
