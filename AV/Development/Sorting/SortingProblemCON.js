/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Problem, Algorithm, and program definitions
$(document).ready(function () {
  "use strict";
  var av_name = "SortingProblemCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,
      code = config.code; 
      
  var av = new JSAV(av_name);
  var arr;
  var arr_values = [];
  var topAlign = 60;
  var leftAlign = 0;
  var rectWidth = 135;
  var rectHeight = 100;

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  var rect = av.g.rect(leftAlign + 380, topAlign - 25, rectWidth, rectHeight);
  var labelProblem = av.label(interpret("lab1"),
                              {top: topAlign - 20, left: leftAlign + 385}).addClass("codeLabel");
 for (var i = 0; i < 6; i++) {
    arr_values.push("K" + (i + 1));
  }
  arr = av.ds.array(arr_values, {left: leftAlign, top: topAlign, indexed: true});
  var line1 = av.g.line(leftAlign + 320, topAlign + 30, leftAlign + 380, topAlign + 30);
  var inputLabel = av.label(interpret("lab2"),
                              {top: topAlign -20, left: leftAlign + 330});
  av.step();

  // Slide 3
    
  av.umsg(interpret("sc3"), {preserve: true});
  var arr_values_out = [];
  for (var i = 0; i < 6; i++) {
    arr_values_out.push("Ks" + (i + 1));
  }  
    var arr2 = av.ds.array(arr_values_out, {left: leftAlign + 450 + rectWidth, top: topAlign, indexed: true});
  var lineOutput1 = av.g.line(leftAlign + 380 + rectWidth, topAlign+30, leftAlign + 440 + rectWidth, topAlign + 30);
    var outputLabel = av.label(interpret("lab3"),
                              {top: topAlign -20, left: leftAlign + rectWidth+ 390});
    
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  var count = 0;
  while (count < 6) {
    var value = Math.round(Math.random() * 5);
    if (arr_values.indexOf(value) === -1) {
      arr_values[count] = value;
      count++;
    }
  }
  arr.hide();
  arr = av.ds.array(arr_values, {left: leftAlign, top: topAlign, indexed: false});
    arr2.hide();
    arr2 = av.ds.array([0,1,2,3,4,5], {left: leftAlign + 450 + rectWidth, top: topAlign, indexed: false});

  av.recorded();
});
