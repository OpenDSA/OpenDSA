/*global ODSA */
"use strict";
// Written by Mohammed Farghally and Cliff Shaffer
// Problem, Algorithm, and program definitions
$(document).ready(function () {
  var av_name = "ProblemAlgorithmCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code).hide();
  var arr;
  var arr_values = [];
  var topAlign = 120;
  var leftAlign = 10;
  var rectWidth = 150;
  var rectHeight = 225;
  
  // Slide 1
  av.umsg("Let's see how we can differentiate between a problem, problem instance, algorithm, and a program.");
  av.displayInit();
  
  //Slide 2
  av.umsg("A problem is a task that matches input to output. <br> Consider the problem of searching for an element in an array.");
  av.step();

  //Slide 3
  av.umsg
  ("Here, we have: <br><b><u> Input: </u></b> An array, and the target key.");
  for(var i = 0; i < 6; i++){
  	arr_values.push("Key " + (i+1));
  }
  arr = av.ds.array(arr_values, {"left": leftAlign, "top": topAlign, "indexed": true});  
  var rect = av.g.rect(leftAlign + 380, topAlign - 25, rectWidth, rectHeight);
  var labelProblem = av.label("Searching Problem",  {"top": topAlign + 25, "left": leftAlign + 385});
  var labelInput = 
  av.label("Target key",  {"top": topAlign + 85, "left": leftAlign + 215}).css({'font-size': '18px', "text-align": "center", 'font-style':"bold"});
  var line1 = av.g.line(leftAlign + 320, topAlign + 30, leftAlign + 380, topAlign + 30);
  var line2 = av.g.line(leftAlign + 320, topAlign + 125, leftAlign + 380, topAlign + 125);
  av.step();

  //Slide 4
  av.umsg("<br><b><u> Output: </u></b> The index of the target element if it is found or -1 if not found.", {preserve:true});
  var lineOutput1 = av.g.line(leftAlign + 380 + rectWidth, topAlign + 50, leftAlign + 475 + rectWidth, topAlign + 50);
  var lineOutput2 = av.g.line(leftAlign + 380 + rectWidth, topAlign + 115, leftAlign + 475 + rectWidth, topAlign + 115);
  var labelOutput1 = 
  av.label("found",  {"top": topAlign + 15, "left": leftAlign + 385 + rectWidth});
  var labelOutput2 = 
  av.label("Not found",  {"top": topAlign + 105, "left": leftAlign + 385 + rectWidth});
  var labelOutput3 = 
  av.label("Index of the target key",  {"top": topAlign + 15, "left": leftAlign + 490 + rectWidth});
  var labelOutput4 = 
  av.label("-1",  {"top": topAlign + 105, "left": leftAlign + 490 + rectWidth});
  av.step();

  //Slide 5
  av.umsg("<br>Note here that we have the searching problem as a black box. We don't know how the searching is performed.", {"preserve":true});
  rect.css({"opacity":0.2, "fill":"blue"});
  av.step();

  //Slide 6
  av.umsg("A problem instance");
  av.step();


  // // Slide 2
  // av.umsg(interpret("Slide 2"));
  // pseudo.highlight("loop");
  // av.step();
  
  // // Slide 3
  // pseudo.unhighlight("loop");
  // av.umsg(interpret("Slide 3"));
  // for (var i = 0; i < 6; i++) {
  //   arr_values[i] = parseInt(Math.random() * 20, 10);
  // }
  // arr = av.ds.array(arr_values, {"left": 10, "top": 120, "indexed": true});
  // av.step();
  
  // // Slide 4
  // av.umsg(interpret("Slide 4"));
  // arr.css([0, 1], {"background-color": "#00FA9A"});
  // if (arr.value(0) > arr.value(1)) {
  //   arr.swap(0, 1);
  // }
  // av.g.rect(400, 150, 50, 20);
  // av.label("i=0",  {"top": "172px", "left": "410px"});
  // av.step();
  
  // // Slide 5
  // av.clearumsg();
  // arr.css([1, 2], {"background-color": "#00FA9A"});
  // arr.css(0, {"background-color": "white"});
  // if (arr.value(1) > arr.value(2)) {
  //   arr.swap(1, 2);
  // }
  // av.g.rect(400, 130, 50, 20);
  // av.step();
  
  // // Slide 6
  // arr.css([2, 3], {"background-color": "#00FA9A"});
  // arr.css(1, {"background-color": "white"});
  // if (arr.value(2) > arr.value(3)) {
  //   arr.swap(2, 3);
  // }
  // av.g.rect(400, 110, 50, 20);
  // av.step();
  
  // // Slide 7
  // arr.css([3, 4], {"background-color": "#00FA9A"});
  // arr.css(2, {"background-color": "white"});
  // if (arr.value(3) > arr.value(4)) {
  //   arr.swap(3, 4);
  // }
  // av.g.rect(400, 90, 50, 20);
  // av.step();
  
  // // Slide 8
  // arr.css([4, 5], {"background-color": "#00FA9A"});
  // arr.css(3, {"background-color": "white"});
  // if (arr.value(4) > arr.value(5)) {
  //   arr.swap(4, 5);
  // }
  // av.g.rect(400, 70, 50, 20);
  // arr.css(5, {"background-color": "grey"});
  // arr.css(4, {"background-color": "white"});
  // av.step();

  // // Slide 9  
  // av.umsg(interpret("Slide 9"));
  // arr.css([0, 1], {"background-color": "#00FA9A"});
  // if (arr.value(0) > arr.value(1)) {
  //   arr.swap(0, 1);
  // }
  // av.g.rect(450, 150, 50, 20);
  // av.label("i=1",  {"top": "172px", "left": "460px"});
  // av.step();
  
  // // Slide 10
  // av.clearumsg();
  // arr.css([1, 2], {"background-color": "#00FA9A"});
  // arr.css(0, {"background-color": "white"});
  // if (arr.value(1) > arr.value(2)) {
  //   arr.swap(1, 2);
  // }
  // av.g.rect(450, 130, 50, 20);
  // av.step();
  
  // // Slide 11
  // arr.css([2, 3], {"background-color": "#00FA9A"});
  // arr.css(1, {"background-color": "white"});
  // if (arr.value(2) > arr.value(3)) {
  //   arr.swap(2, 3);
  // }
  // av.g.rect(450, 110, 50, 20);
  // av.step();
  
  // // Slide 12
  // arr.css([3, 4], {"background-color": "#00FA9A"});
  // arr.css(2, {"background-color": "white"});
  // if (arr.value(3) > arr.value(4)) {
  //   arr.swap(3, 4);
  // }
  // av.g.rect(450, 90, 50, 20);
  // arr.css(4, {"background-color": "grey"});
  // arr.css(3, {"background-color": "white"});
  // av.step();

  // // Slide 13  
  // av.umsg(interpret("Slide 13"));
  // arr.css([0, 1], {"background-color": "#00FA9A"});
  // if (arr.value(0) > arr.value(1)) {
  //   arr.swap(0, 1);
  // }
  // av.g.rect(500, 150, 50, 20);
  // av.label("i=2",  {"top": "172px", "left": "510px"});
  // av.step();
  
  // // Slide 14
  // av.clearumsg();
  // arr.css([1, 2], {"background-color": "#00FA9A"});
  // arr.css(0, {"background-color": "white"});
  // if (arr.value(1) > arr.value(2)) {
  //   arr.swap(1, 2);
  // }
  // av.g.rect(500, 130, 50, 20);
  // av.step();
  
  // // Slide 15
  // arr.css([2, 3], {"background-color": "#00FA9A"});
  // arr.css(1, {"background-color": "white"});
  // if (arr.value(2) > arr.value(3)) {
  //   arr.swap(2, 3);
  // }
  // av.g.rect(500, 110, 50, 20);
  // av.step();
  
  // // Slide 16
  // arr.css(3, {"background-color": "grey"});
  // arr.css(2, {"background-color": "white"});
  // av.step();

  // // Slide 17  
  // av.umsg(interpret("Slide 17"));
  // arr.css([0, 1], {"background-color": "#00FA9A"});
  // if (arr.value(0) > arr.value(1)) {
  //   arr.swap(0, 1);
  // }
  // av.g.rect(550, 150, 50, 20);
  // av.label("i=3",  {"top": "172px", "left": "560px"});
  // av.step();
  
  // // Slide 18
  // av.clearumsg();
  // arr.css([1, 2], {"background-color": "#00FA9A"});
  // arr.css(0, {"background-color": "white"});
  // if (arr.value(1) > arr.value(2)) {
  //   arr.swap(1, 2);
  // }
  // av.g.rect(550, 130, 50, 20);
  // av.step();
  
  // // Slide 19
  // arr.css(2, {"background-color": "grey"});
  // arr.css(1, {"background-color": "white"});
  // av.step();

  // // Slide 20  
  // av.umsg(interpret("Slide 20"));
  // arr.css([0, 1], {"background-color": "#00FA9A"});
  // if (arr.value(0) > arr.value(1)) {
  //   arr.swap(0, 1);
  // }
  // av.g.rect(600, 150, 50, 20);
  // av.label("i=4", {"top": "172px", "left": "610px"});
  // arr.css(1, {"background-color": "grey"});
  // arr.css(0, {"background-color": "grey"});
  // av.step();
  
  // // Slide 21
  // av.clearumsg();
  // av.umsg(interpret("Slide 21"));
  // av.label("|------------ $n-1$ --------------|",  {"top": "190px", "left": "420px"}).css({'font-size': '16px', "text-align": "center"});
  // av.label("|--- $n-1$ ---|",  {"top": "90px", "left": "330px"}).css({'font-size': '16px', "text-align": "center"}).addClass("rotated");
  // av.g.line(400, 70, 650, 170);
  // av.step();
  
  // // Slide 22
  // av.umsg(interpret("Slide 22"));
  // av.step();
  
  // // Slide 23
  // av.umsg(interpret("Slide 23"));
  // av.step();
  
  // // Slide 24
  // av.umsg(interpret("Slide 24"));
  av.recorded();
});
