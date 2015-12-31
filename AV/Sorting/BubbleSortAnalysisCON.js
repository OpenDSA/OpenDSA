/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Bubble Sort Analysis
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
  arr = av.ds.array(arr_values, {left: 10, top: 120, indexed: true});
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  arr.addClass([0, 1], "greenbg");
  if (arr.value(0) > arr.value(1)) {
    arr.swap(0, 1);
  }
  av.g.rect(400, 150, 50, 20);
  av.label("i=0",  {top: "172px", left: "410px"});
  av.step();

  // Slide 5
  arr.addClass([1, 2], "greenbg");
  arr.removeClass(0, "greenbg");
  if (arr.value(1) > arr.value(2)) {
    arr.swap(1, 2);
  }
  av.g.rect(400, 130, 50, 20);
  av.step();

  // Slide 6
  arr.addClass([2, 3], "greenbg");
  arr.removeClass(1, "greenbg");
  if (arr.value(2) > arr.value(3)) {
    arr.swap(2, 3);
  }
  av.g.rect(400, 110, 50, 20);
  av.step();

  // Slide 7
  arr.addClass([3, 4], "greenbg");
  arr.removeClass(2, "greenbg");
  if (arr.value(3) > arr.value(4)) {
    arr.swap(3, 4);
  }
  av.g.rect(400, 90, 50, 20);
  av.step();

  // Slide 8
  arr.addClass([4, 5], "greenbg");
  arr.removeClass(3, "greenbg");
  if (arr.value(4) > arr.value(5)) {
    arr.swap(4, 5);
  }
  av.g.rect(400, 70, 50, 20);
  arr.addClass(5, "greybg");
  arr.removeClass(4, "greenbg");
  arr.removeClass(5, "greenbg");
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  arr.addClass([0, 1], "greenbg");
  if (arr.value(0) > arr.value(1)) {
    arr.swap(0, 1);
  }
  av.g.rect(450, 150, 50, 20);
  av.label("i=1",  {top: "172px", left: "460px"});
  av.step();

  // Slide 10
  arr.addClass([1, 2], "greenbg");
  arr.removeClass(0, "greenbg");
  if (arr.value(1) > arr.value(2)) {
    arr.swap(1, 2);
  }
  av.g.rect(450, 130, 50, 20);
  av.step();

  // Slide 11
  arr.addClass([2, 3], "greenbg");
  arr.removeClass(1, "greenbg");
  if (arr.value(2) > arr.value(3)) {
    arr.swap(2, 3);
  }
  av.g.rect(450, 110, 50, 20);
  av.step();

  // Slide 12
  arr.addClass([3, 4], "greenbg");
  arr.removeClass(2, "greenbg");
  if (arr.value(3) > arr.value(4)) {
    arr.swap(3, 4);
  }
  av.g.rect(450, 90, 50, 20);
  arr.addClass(4, "greybg");
  arr.removeClass(3, "greenbg");
  arr.removeClass(4, "greenbg");
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  arr.addClass([0, 1], "greenbg");
  if (arr.value(0) > arr.value(1)) {
    arr.swap(0, 1);
  }
  av.g.rect(500, 150, 50, 20);
  av.label("i=2",  {top: "172px", left: "510px"});
  av.step();

  // Slide 14
  arr.addClass([1, 2], "greenbg");
  arr.removeClass(0, "greenbg");
  if (arr.value(1) > arr.value(2)) {
    arr.swap(1, 2);
  }
  av.g.rect(500, 130, 50, 20);
  av.step();

  // Slide 15
  arr.addClass([2, 3], "greenbg");
  arr.removeClass(1, "greenbg");
  if (arr.value(2) > arr.value(3)) {
    arr.swap(2, 3);
  }
  av.g.rect(500, 110, 50, 20);
  av.step();

  // Slide 16
  arr.addClass(3, "greybg");
  arr.removeClass(2, "greenbg");
  arr.removeClass(3, "greenbg");
  av.step();

  // Slide 17
  av.umsg(interpret("sc17"));
  arr.addClass([0, 1], "greenbg");
  if (arr.value(0) > arr.value(1)) {
    arr.swap(0, 1);
  }
  av.g.rect(550, 150, 50, 20);
  av.label("i=3",  {top: "172px", left: "560px"});
  av.step();

  // Slide 18
  arr.addClass([1, 2], "greenbg");
  arr.removeClass(0, "greenbg");
  if (arr.value(1) > arr.value(2)) {
    arr.swap(1, 2);
  }
  av.g.rect(550, 130, 50, 20);
  av.step();

  // Slide 19
  arr.addClass(2, "greybg");
  arr.removeClass(1, "greenbg");
  arr.removeClass(2, "greenbg");
  av.step();

  // Slide 20
  av.umsg(interpret("sc20"));
  arr.addClass([0, 1], "greenbg");
  if (arr.value(0) > arr.value(1)) {
    arr.swap(0, 1);
  }
  av.g.rect(600, 150, 50, 20);
  av.label("i=4", {top: "172px", left: "610px"});
  arr.addClass(1, "greybg");
  arr.addClass(0, "greybg");
  arr.removeClass(0, "greenbg");
  arr.removeClass(1, "greenbg");
  av.step();

  // Slide 21
  av.umsg(interpret("sc21"));
  av.label("|------------ $n-1$ --------------|",  {top: "190px", left: "420px"}).addClass("largeLabel");
  av.label("|--- $n-1$ ---|",  {top: "90px", left: "330px"}).addClass("largeLabel rotated");
  av.g.line(400, 70, 650, 170);
  av.step();

  // Slide 22
  av.umsg(interpret("sc22"));
  av.g.polyline([[650, 170], [400, 170], [400, 70]]).addClass("bigTriangle");
  av.g.polyline([[650, 170], [650, 150], [600, 150]]).addClass("smallTriangle");
  av.g.polyline([[600, 150], [600, 130], [550, 130]]).addClass("smallTriangle");
  av.g.polyline([[550, 130], [550, 110], [500, 110]]).addClass("smallTriangle");
  av.g.polyline([[500, 110], [500, 90], [450, 90]]).addClass("smallTriangle");
  av.g.polyline([[450, 90], [450, 70], [400, 70]]).addClass("smallTriangle");
  av.step();

  // Slide 23
  av.umsg(interpret("sc23"));
  av.step();

  // Slide 24
  av.umsg(interpret("sc24"));
  av.recorded();
});
