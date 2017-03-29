/*global JSAV, document */
// Written by Sushma Mandava
//variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
var gv = new JSAV("empRefsecond", {animationMode: "none"});
var xPosition = 275;
var yPositionR1 = 5;
var yPositionR2 = 55;
var yPositionR3 = 105;
var length1 = 100;
var width = 30;

gv.g.rect(xPosition, yPositionR1, length1, width);
  gv.g.rect(xPosition, yPositionR2, length1, width);
  gv.g.rect(xPosition, yPositionR3, length1, width);
  //pointer lines
  //gv.g.line(xPosition + 110, yPositionR1 + 10, 430, yPositionR1 - 15, {"stroke-width": 3, stroke: "gray"});
  gv.g.line(xPosition + 130, yPositionR3 + 10, xPosition + 185, yPositionR2 + 40, {"stroke-width": 3, stroke: "gray"});

  //text
  gv.label("A second pointer is initialized with the assignment second = empRef. This causes second to refer to the same pointee as empRef",
  {top: yPositionR3 - 60, left: xPosition + 195});
  //gv.label("A pointer variable. The current value is a reference to the pointee num above.", {top: yPositionR2 + 10, left: 430 + 5})
  //gv.g.line(230, 150, 100, 400, {"stroke-width": 3});
  gv.label("employee1",  {top: yPositionR1 - (width / 2) + 3, left: xPosition - 75});
  gv.label("John", {top: yPositionR1 - (width / 2) + 3, left: xPosition + 25});
  gv.label("empRef",  {top: yPositionR2 - (width / 2) + 3, left: xPosition - 55});
  gv.label("second",  {top: yPositionR3 - (width / 2) + 3, left: xPosition - 55});

  //first arrow
  gv.g.path(["M", xPosition + length1 - 10, yPositionR2 + (width / 2),
    "C", xPosition + length1 + 40, yPositionR2 + (width / 2) + 5, xPosition + length1 + 35, yPositionR2 - 10,
    xPosition + length1 + 5, yPositionR1 + width - 5].join(","), {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});

  //second arrow
  gv.g.path(["M", xPosition + length1 - 10, yPositionR3 + (width / 2),
    "C", xPosition + length1 + 40, yPositionR3 + (width / 2) + 5, xPosition + length1 + 35, yPositionR3 - 10,
    xPosition + length1 + 5, yPositionR1 + width + 5].join(","), {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});


  gv.displayInit();
  gv.recorded();
});
