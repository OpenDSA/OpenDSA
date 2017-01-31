/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Two Coloring Proof
$(document).ready(function() {
  "use strict";
  var av_name = "firstSlideShow";
  // Load the config object with interpreter and code created by odsaUtils.js
  var av;
  av = new JSAV(av_name);
  // Slide 1
  var xPosition = 275;
  var xPosition2 = 475;
  var yPositionR1 = 10;
  var yPositionR2 = 60;
  var yPositionR3 = 110;
  var length1 = 100;
  var width = 30;
  av.g.rect(xPosition, yPositionR1, length1, width);
  av.g.rect(xPosition, yPositionR2, length1, width);
  av.g.rect(xPosition, yPositionR3, length1, width);
  av.g.rect(xPosition2, yPositionR1, length1, width);
  av.g.rect(xPosition2, yPositionR2, length1, width);
  //av.g.line(xPosition + 135, yPositionR1 + 10, 460, yPositionR1 - 15, {"stroke-width": 3});
  //label for rectangle 1
  av.label("a",  {top: yPositionR1, left: xPosition - 20});
  av.label("1", {top: yPositionR1 - 10, left: xPosition + 40});
  //label for rectangle 2
  av.label("b",  {top: yPositionR2, left: xPosition - 20});
  var label2 = av.label("2", {top: yPositionR2 - 10, left: xPosition + 40});
  //label for rectangle 3
  av.label("c",  {top: yPositionR3, left: xPosition - 20});
  var label3 = av.label("3", {top: yPositionR3 - 10, left: xPosition + 40});
  //label for rectangle 4 + x's
  av.label("p",  {top: yPositionR1, left: xPosition2 + length + 120});
  var x1 = av.g.line(xPosition2 + 10, yPositionR1 + 25, xPosition2 + 30, yPositionR1 + 3, {"stroke-width": 3});
  var x2 = av.g.line(xPosition2 + 10, yPositionR1 + 3, xPosition2 + 30, yPositionR1 + 25, {"stroke-width": 3});

  var x3 = av.g.line(xPosition2 + 40, yPositionR1 + 25, xPosition2 + 60, yPositionR1 + 3, {"stroke-width": 3});
  var x4 = av.g.line(xPosition2 + 40, yPositionR1 + 3, xPosition2 + 60, yPositionR1 + 25, {"stroke-width": 3});

  var x5 = av.g.line(xPosition2 + 70, yPositionR1 + 25, xPosition2 + 90, yPositionR1 + 3, {"stroke-width": 3});
  var x6 = av.g.line(xPosition2 + 70, yPositionR1 + 3, xPosition2 + 90, yPositionR1 + 25, {"stroke-width": 3});
  //av.g.line(xPosition2 + 20, yPositionR1 - 10, xPosition2 + 50, yPositionR1 - 30, {"stroke-width": 3});

  //label for rectangle 5
  av.label("q",  {top: yPositionR2, left: xPosition2 + length + 120});

  var x7 = av.g.line(xPosition2 + 10, yPositionR2 + 25, xPosition2 + 30, yPositionR2 + 3, {"stroke-width": 3});
  var x8 = av.g.line(xPosition2 + 10, yPositionR2 + 3, xPosition2 + 30, yPositionR2 + 25, {"stroke-width": 3});

  var x9 = av.g.line(xPosition2 + 40, yPositionR2 + 25, xPosition2 + 60, yPositionR2 + 3, {"stroke-width": 3});
  var x10 = av.g.line(xPosition2 + 40, yPositionR2 + 3, xPosition2 + 60, yPositionR2 + 25, {"stroke-width": 3});

  var x11 = av.g.line(xPosition2 + 70, yPositionR2 + 25, xPosition2 + 90, yPositionR2 + 3, {"stroke-width": 3});
  var x12 = av.g.line(xPosition2 + 70, yPositionR2 + 3, xPosition2 + 90, yPositionR2 + 25, {"stroke-width": 3});
  av.displayInit();
  av.step();

  // Slide 2
  x1.hide();
  x2.hide();
  x3.hide();
  x4.hide();
  x5.hide();
  x6.hide();
  x7.hide();
  x8.hide();
  x9.hide();
  x10.hide();
  x11.hide();
  x12.hide();

  //creating the arrows
  var arrowline1 = av.g.line(xPosition2 + 20, yPositionR1 + (width / 2), xPosition + length1 + 20, yPositionR1 + (width / 2), {"stroke-width": 2});
  av.g.line(xPosition2 + 20, yPositionR2 + (width / 2), xPosition + length1 + 20, yPositionR2 + (width / 2), {"stroke-width": 2});
  var arrowtriangle1 = av.g.polyline([[xPosition + length1 + 20, yPositionR1 + (width / 2) + 4], [xPosition + length1 + 10, yPositionR1 + (width / 2)],
    [xPosition + length1 + 20, yPositionR1 + (width / 2) - 4]], {fill: "black"});
  av.g.polyline([[xPosition + length1 + 20, yPositionR2 + (width / 2) + 4], [xPosition + length1 + 10, yPositionR2 + (width / 2)],
    [xPosition + length1 + 20, yPositionR2 + (width / 2) - 4]], {fill: "black"});
  av.step();

  // Slide 3
  arrowline1 = av.g.line(xPosition2 + 20, yPositionR1 + (width / 2), xPosition + length1 + 20, yPositionR1 + (width / 2), {"stroke-width": 2, stroke: "gray"})
  arrowtriangle1 = av.g.polyline([[xPosition + length1 + 20, yPositionR1 + (width / 2) + 4], [xPosition + length1 + 10, yPositionR1 + (width / 2)],
    [xPosition + length1 + 20, yPositionR1 + (width / 2) - 4]], {fill: "gray", stroke: "gray"});
  av.g.line(xPosition2 + 20, yPositionR1 + (width / 2) + 2, xPosition + length1 + 15, yPositionR2 + (width / 2) - 9, {"stroke-width": 2});
  label2.hide();
  label3.hide();
  label2 = av.label("13", {top: yPositionR2 - 10, left: xPosition + 40});
  av.label("1", {top: yPositionR3 - 10, left: xPosition + 40});
  av.g.line(xPosition + length1 + 40, yPositionR1 + width - 3, xPosition + length1 + 53, yPositionR1 + 3, {"stroke-width": 3});
  av.g.line(xPosition + length1 + 40, yPositionR1 + 3, xPosition + length1 + 53, yPositionR1 + width - 3, {"stroke-width": 3});
  av.g.polyline([[xPosition + length1 + 20, yPositionR2 + (width / 2) - 6], [xPosition + length1 + 7 + 3, yPositionR2 + (width / 2) - 5],
    [xPosition + length1 + 20 - 5 + 5 - 5, yPositionR2 + (width / 2) - 4 - 3 - 5 - 3]], {fill: "black"});
  av.recorded();
});
