/*global JSAV, document */
// Written by Sushma Mandava
$(document).ready(function() {
  "use strict";
var gv = new JSAV("empPtrsecond", {animationMode: "none"});
var xPosition = 275;
var yPositionR1 = 50;
var yPositionR2 = 100;
var yPositionR3 = 150;
var length1 = 100;
var width = 30;

  gv.g.rect(xPosition, yPositionR1, length1, width);
  gv.g.rect(xPosition, yPositionR2, length1, width);
  gv.g.rect(xPosition, yPositionR3, length1, width);
  //pointer lines
  //gv.g.line(xPosition + 110, yPositionR1 + 10, 430, yPositionR1 - 15, {"stroke-width": 3, stroke: "gray"});
  gv.g.line(xPosition + 110, yPositionR3 + 10, 430, yPositionR2 + 40, {"stroke-width": 3, stroke: "gray"});

  //text
  gv.label("A second pointer is initialized with the assignment second = empPtr. This causes second to refer to the same pointee as empPtr", {top: yPositionR3 - 60, left: 430 + 5})
  //gv.label("A pointer variable. The current value is a reference to the pointee num above.", {top: yPositionR2 + 10, left: 430 + 5})
  //gv.g.line(230, 150, 100, 400, {"stroke-width": 3});
  gv.label("employee",  {top: yPositionR1 - (width / 2) + 3, left: xPosition - 70});
  gv.label("John", {top: yPositionR1 - (width / 2) + 3, left: xPosition + 25});
  gv.label("empPtr",  {top: yPositionR2 - (width / 2) + 3, left: xPosition - 55});
  gv.label("second",  {top: yPositionR3 - (width / 2) + 3, left: xPosition - 55});


  gv.g.polyline([[xPosition + 60, yPositionR1 + 25], [xPosition + 70, yPositionR1 + 18],
    [xPosition + 80, yPositionR1 + 25]], {fill: "black"});
  gv.g.line(xPosition + 70, yPositionR1 + 65, xPosition + 70, yPositionR1 + 18);

  gv.g.polyline([[xPosition + 83, yPositionR1 + 45], [xPosition + 93, yPositionR1 + 38],
    [xPosition + 103, yPositionR1 + 45]], {fill: "black"});
  gv.g.line(xPosition + 93, yPositionR1 + 95, xPosition + 93, yPositionR1 + 38);


  gv.displayInit();
  gv.recorded();
});
