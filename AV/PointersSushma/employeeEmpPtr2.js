/*global JSAV, document */
// Written by Sushma Mandava
$(document).ready(function() {
  "use strict";
  var gv = new JSAV("employeeEmpPtr2", {animationMode: "none"});
  var xPosition = 400;
  var yPositionR1 = 50;
  var yPositionR2 = 100;
  var length1 = 100;
  var width = 30;

  gv.g.rect(xPosition, yPositionR1, length1, width);
  gv.g.rect(xPosition, yPositionR2, length1, width);

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
