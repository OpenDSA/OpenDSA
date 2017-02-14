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


  gv.g.path(["M", xPosition + length1 - 10, yPositionR2 + (width / 2),
    "C", xPosition + length1 + 40, yPositionR2 + (width / 2) + 5, xPosition + length1 + 35, yPositionR2 - 10,
    xPosition + length1 + 5, yPositionR1 + width - 5].join(","), {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});

  gv.displayInit();
  gv.recorded();
});
