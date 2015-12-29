/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Problem, Algorithm, and program definitions
$(document).ready(function() {
  "use strict";
  var av_name = "ProblemAlgorithmCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var javaCode = av.code(code[0]).hide();
  var pseudo = av.code(code[1]).hide();
  var arr;
  var arr_values = [];
  var topAlign = 60;
  var leftAlign = 10;
  var rectWidth = 170;
  var rectHeight = 225;

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  var rect = av.g.rect(leftAlign + 380, topAlign - 25, rectWidth, rectHeight);
  var labelProblem = av.label(interpret("lab1"),
                              {top: topAlign - 20, left: leftAlign + 385}).addClass("codeLabel");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  for (var i = 0; i < 6; i++) {
    arr_values.push("Key " + (i + 1));
  }
  arr = av.ds.array(arr_values, {left: leftAlign, top: topAlign, indexed: true});
  var labelInput = av.label(interpret("lab4"), {top: topAlign + 92, left: leftAlign + 215}).addClass("largeLabel");
  var line1 = av.g.line(leftAlign + 320, topAlign + 30, leftAlign + 380, topAlign + 30);
  var line2 = av.g.line(leftAlign + 320, topAlign + 125, leftAlign + 380, topAlign + 125);
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"), {preserve: true});
  var lineOutput1 = av.g.line(leftAlign + 380 + rectWidth, topAlign + 50, leftAlign + 475 + rectWidth, topAlign + 50);
  var lineOutput2 = av.g.line(leftAlign + 380 + rectWidth, topAlign + 115, leftAlign + 475 + rectWidth, topAlign + 115);
  var labelOutput1 = av.label(interpret("lab5"), {top: topAlign + 12, left: leftAlign + 385 + rectWidth});
  var labelOutput2 = av.label(interpret("lab6"), {top: topAlign + 105,
                                            left: leftAlign + 385 + rectWidth});
  var labelOutput3 = av.label(interpret("lab7"),
                              {top: topAlign + 22, left: leftAlign + 490 + rectWidth});
  var labelOutput4 = av.label("$n$", {top: topAlign + 95, left: leftAlign + 490 + rectWidth});
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"), {preserve: true});
  rect.css({opacity: 0.2, fill: "green"});
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  rect.hide();
  rect = av.g.rect(leftAlign + 380, topAlign - 25, rectWidth, rectHeight);
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"), {preserve: true});
  var count = 0;
  while (count < 6) {
    var value = Math.round(Math.random() * 10 + 1);
    if (arr_values.indexOf(value) === -1) {
      arr_values[count] = value;
      count++;
    }
  }
  arr.hide();
  arr = av.ds.array(arr_values, {left: leftAlign, top: topAlign, indexed: true});
  labelInput.text("");
  labelInput = av.label(interpret("lab4") + " = " + arr_values[3],
                        {top: topAlign + 92, left: leftAlign + 180}).addClass("largeLabel");
  labelOutput2.hide();
  labelOutput4.hide();
  lineOutput2.hide();
  labelOutput3.text(interpret("lab8"));
  arr.highlight(3);
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  labelProblem.text(interpret("lab2"));
  labelProblem.css({top: "-=0", left: "+=30"});
  labelOutput1.hide();
  labelOutput3.hide();
  lineOutput1.hide();
  arr.unhighlight(3);
  arr.hide();
  line1.hide();
  line2.hide();
  labelInput.hide();
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"), {preserve: true});
  arr.show();
  line1.show();
  line2.show();
  labelInput.show();
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"), {preserve: true});
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"), {preserve: true});
  pseudo.show();
  rect.css({width: rectWidth + 65});
  labelProblem.css({left: "+=35"});
  labelOutput1.css({left: "+=65"});
  labelOutput3.css({left: "+=65"});
  lineOutput1 = av.g.line(leftAlign + 445 + rectWidth, topAlign + 50, leftAlign + 545 + rectWidth, topAlign + 50);
  labelOutput1.show();
  labelOutput3.show();
  lineOutput1.show();
  arr.highlight(3);
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  labelProblem.text(interpret("lab3"));
  labelProblem.css({top: "-=0", left: "+=5"});
  labelOutput1.hide();
  labelOutput3.hide();
  lineOutput1.hide();
  arr.unhighlight(3);
  arr.hide();
  line1.hide();
  line2.hide();
  labelInput.hide();
  pseudo.hide();
  av.step();

  // Slide 14
  av.umsg(interpret("sc14"), {preserve: true});
  labelInput.show();
  line1.show();
  line2.show();
  arr.show();
  av.step();

  // Slide 15
  av.umsg(interpret("sc15"), {preserve: true});
  av.step();

  // Slide 16
  av.umsg(interpret("sc16"));
  javaCode.show();
  rect.css({width: rectWidth + 98});
  labelProblem.css({left: "+=15"});
  lineOutput1.hide();
  lineOutput1 = av.g.line(leftAlign + 477 + rectWidth, topAlign + 50, leftAlign + 545 + rectWidth, topAlign + 50);
  labelOutput1.css({left: "+=35"});
  lineOutput1.show();
  labelOutput1.show();
  labelOutput3.show();
  arr.highlight(3);
  av.recorded();
});
