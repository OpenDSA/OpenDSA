/*global ODSA */
// Written by Sushma Mandava
//variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "examplePointerCodeCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var av;
  av = new JSAV(av_name);

  // Slide 1
  var xPosition = 275;
  var xPosition2 = xPosition + 200;
  var yPositionR1 = 10;
  var yPositionR2 = yPositionR1 + 50;
  var yPositionR3 = yPositionR1 + 100;
  var length1 = 100;
  var width = 30;
  av.g.rect(xPosition, yPositionR1, length1, width);
  av.g.rect(xPosition, yPositionR2, length1, width);
  av.g.rect(xPosition, yPositionR3, length1, width);
  av.g.rect(xPosition2, yPositionR1, length1, width);
  av.g.rect(xPosition2, yPositionR2, length1, width);
  //av.g.line(xPosition + 135, yPositionR1 + 10, 460, yPositionR1 - 15, {"stroke-width": 3});
  //label for rectangle 1
  av.label("employee1",  {top: yPositionR1 - (width / 2) + 3, left: xPosition - 80});
  av.label("John", {top: yPositionR1 - (width / 2) + 3, left: xPosition + 28});
  //label for rectangle 2
  av.label("employee2",  {top: yPositionR2 - (width / 2) + 3, left: xPosition - 80});
  var label2 = av.label("Alex", {top: yPositionR2 - (width / 2) + 3, left: xPosition + 28});
  //label for rectangle 3
  av.label("employee3",  {top: yPositionR3 - (width / 2) + 3, left: xPosition - 80});
  av.label("Nick", {top: yPositionR3 - (width / 2) + 3, left: xPosition + 28});
  //label for rectangle 4 + x's
  av.label("empPtr1",  {top: yPositionR1 - (width / 2) + 3, left: xPosition2 + length + 110});
  var x1 = av.g.line(xPosition2 + 10, yPositionR1 + 25, xPosition2 + 30, yPositionR1 + 3, {"stroke-width": 3});
  var x2 = av.g.line(xPosition2 + 10, yPositionR1 + 3, xPosition2 + 30, yPositionR1 + 25, {"stroke-width": 3});

  var x3 = av.g.line(xPosition2 + 40, yPositionR1 + 25, xPosition2 + 60, yPositionR1 + 3, {"stroke-width": 3});
  var x4 = av.g.line(xPosition2 + 40, yPositionR1 + 3, xPosition2 + 60, yPositionR1 + 25, {"stroke-width": 3});

  var x5 = av.g.line(xPosition2 + 70, yPositionR1 + 25, xPosition2 + 90, yPositionR1 + 3, {"stroke-width": 3});
  var x6 = av.g.line(xPosition2 + 70, yPositionR1 + 3, xPosition2 + 90, yPositionR1 + 25, {"stroke-width": 3});
  //av.g.line(xPosition2 + 20, yPositionR1 - 10, xPosition2 + 50, yPositionR1 - 30, {"stroke-width": 3});

  //label for rectangle 5
  av.label("empPtr2",  {top: yPositionR2 - (width / 2) + 3, left: xPosition2 + length + 110});

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
  av.g.line(xPosition2 + 20, yPositionR1 + (width / 2), xPosition + length1 + 20, yPositionR1 + (width / 2), {"stroke-width": 2});
  av.g.line(xPosition2 + 20, yPositionR2 + (width / 2), xPosition + length1 + 20, yPositionR2 + (width / 2), {"stroke-width": 2});
  av.g.polyline([[xPosition + length1 + 20, yPositionR1 + (width / 2) + 4], [xPosition + length1 + 10, yPositionR1 + (width / 2)],
                 [xPosition + length1 + 20, yPositionR1 + (width / 2) - 4]], {fill: "black"});
  av.g.polyline([[xPosition + length1 + 20, yPositionR2 + (width / 2) + 4], [xPosition + length1 + 10, yPositionR2 + (width / 2)],
                 [xPosition + length1 + 20, yPositionR2 + (width / 2) - 4]], {fill: "black"});
  av.step();

  // Slide 3
  av.g.line(xPosition2 + 20, yPositionR1 + (width / 2), xPosition + length1 + 20, yPositionR1 + (width / 2), {"stroke-width": 2, stroke: "gray"});
  av.g.polyline([[xPosition + length1 + 20, yPositionR1 + (width / 2) + 4], [xPosition + length1 + 10, yPositionR1 + (width / 2)],
                 [xPosition + length1 + 20, yPositionR1 + (width / 2) - 4]], {fill: "gray", stroke: "gray"});
  av.g.line(xPosition2 + 20, yPositionR1 + (width / 2) + 2, xPosition + length1 + 15, yPositionR2 + (width / 2) - 9, {"stroke-width": 2});
  label2.hide();
  label2 = av.label("Sam", {top: yPositionR2 - (width / 2) + 3, left: xPosition + 28});
  av.g.line(xPosition + length1 + 40, yPositionR1 + width - 3, xPosition + length1 + 53, yPositionR1 + 3, {"stroke-width": 3});
  av.g.line(xPosition + length1 + 40, yPositionR1 + 3, xPosition + length1 + 53, yPositionR1 + width - 3, {"stroke-width": 3});
  av.g.polyline([[xPosition + length1 + 20, yPositionR2 + (width / 2) - 6], [xPosition + length1 + 7 + 3, yPositionR2 + (width / 2) - 5],
                 [xPosition + length1 + 20 - 5 + 5 - 5, yPositionR2 + (width / 2) - 4 - 3 - 5 - 3]], {fill: "black"});
  av.recorded();
});
