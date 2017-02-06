/*global JSAV, document */
// Written by Sushma Mandava
$(document).ready(function() {
  "use strict";
  var gv = new JSAV("employeeEmpPtr", {animationMode: "none"});
  var xPosition = 275;
  var yPositionR1 = 50;
  var yPositionR2 = 100;
  var length1 = 100;
  var width = 30;

  gv.g.rect(xPosition, yPositionR1, length1, width);
  gv.g.rect(xPosition, yPositionR2, length1, width);
  //pointer lines
  gv.g.line(xPosition + 110, yPositionR1 + 10, 430, yPositionR1 - 15, {"stroke-width": 3, stroke: "gray"});
  gv.g.line(xPosition + 110, yPositionR2 + 10, 430, yPositionR2 + 40, {"stroke-width": 3, stroke: "gray"});

  //text
  gv.label("A simple ``employee`` object. The current value is an employee named John. This variable also plays the role of pointee for the pointer below. ", {top: yPositionR1 - 60, left: 430 + 5})
  gv.label("A pointer variable. The current value is a reference to the pointee ``employee`` above.", {top: yPositionR2 + 10, left: 430 + 5})
  //gv.g.line(230, 150, 100, 400, {"stroke-width": 3});
  gv.label("employee",  {top: yPositionR1 - (width / 2) + 3, left: xPosition - 70});
  gv.label("John", {top: yPositionR1 - (width / 2) + 3, left: xPosition + 25});
  gv.label("empPtr",  {top: yPositionR2 - (width / 2) + 3, left: xPosition - 55});

  gv.g.polyline([[xPosition + 60, yPositionR1 + 25], [xPosition + 70, yPositionR1 + 18],
    [xPosition + 80, yPositionR1 + 25]], {fill: "black"});
  gv.g.line(xPosition + 70, yPositionR1 + 65, xPosition + 70, yPositionR1 + 18);

  gv.displayInit();
  gv.recorded();
});
