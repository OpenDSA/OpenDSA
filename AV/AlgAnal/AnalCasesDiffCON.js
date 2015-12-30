/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Best, Worst, Average Cases definitions
$(document).ready(function() {
  "use strict";
  var av_name = "AnalCasesDiffCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]).hide();
  var arr;
  var arr_values = [];
  var topAlign = 60;
  var leftAlign = 10;
  var rectWidth = 230;
  var rectHeight = 200;
  var arraySize = 7;
  var i;

  // Slide 1
  av.umsg(interpret("sc1"));
  var rect = av.g.rect(leftAlign + 380, topAlign - 25, rectWidth, rectHeight);
  var label = av.label(interpret("lab1"),  {top: topAlign - 25, left: leftAlign + 420}).addClass("codelabel");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  var nlabel = av.label("|---------------------------- $n$ ----------------------------|", {left: leftAlign + 25, top: topAlign + 60});
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
  av.umsg(interpret("sc3"));
  pseudo.show();
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  var pointer = av.pointer("$k$", arr.index(0));
  pseudo.highlight("comparison");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  pseudo.unhighlight("comparison");
  pseudo.highlight("return");
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"), {preserve: true});
  var labelOutput = av.label("index = $0$",
                             {top: topAlign + 15, left: leftAlign + 395 + rectWidth});
  arr.addClass([0], "greenbg");
  pseudo.unhighlight("return");
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  arr.removeClass([0], "greenbg");
  pointer.target(arr.index(arraySize - 1));
  arr.unhighlight(0);
  labelOutput.hide();
  pseudo.highlight("comparison");
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"), {preserve: true});
  pseudo.unhighlight("comparison");
  pseudo.highlight("return");
  var indices = [];
  for (i = 0; i < arr_values.length; i++) {
    indices[i] = i;
  }
  arr.addClass(indices, "redbg");
  labelOutput = av.label("index  = " + (arraySize - 1),
                         {top: topAlign + 15, left: leftAlign + 395 + rectWidth});
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  pseudo.unhighlight("return");
  arr.removeClass(indices, "redbg");
  pointer.target(arr.index(parseInt(arraySize / 2, 10)));
  arr.unhighlight();
  labelOutput.hide();
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"), {preserve: true});
  pseudo.highlight("comparison");
  for (i = 0; i <= parseInt(arraySize / 2, 10); i++) {
    arr.highlight(i);
  }
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  rect.hide();
  arr.hide();
  nlabel.hide();
  pointer.hide();
  label.hide();
  pseudo.hide();
  labelOutput.hide();
  topAlign = 15;
  var arr1 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 20, indexed: true});
  av.pointer("$k$", arr1.index(0));
  arr1.addClass([0], "greenbg");
  av.label(interpret("lab2"),  {top: topAlign + 25, left: leftAlign + 395});
  var arr2 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 120, indexed: true});
  av.pointer("$k$", arr2.index(arraySize - 1));
  arr2.addClass(indices, "redbg");
  av.label(interpret("lab3"),  {top: topAlign + 125, left: leftAlign + 395});

  var arr3 = av.ds.array(arr_values, {left: leftAlign, top: topAlign + 220, indexed: true});
  for (i = 0; i <= parseInt(arraySize / 2, 10); i++) {
    arr3.highlight(i);
  }
  av.label(interpret("lab4"),  {top: topAlign + 225, left: leftAlign + 395});

  av.recorded();
});
