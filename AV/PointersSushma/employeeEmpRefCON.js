/*global JSAV, document */
// Written by Sushma Mandava
// variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var gv = new JSAV("employeeEmpRefCON", {animationMode: "none"});
  var xPosition = 250;
  var yPositionR1 = 50;
  var yPositionR2 = 100;
  var length1 = 100;
  var width = 30;

  gv.g.rect(xPosition, yPositionR1, length1, width);
  gv.g.rect(xPosition, yPositionR2, length1, width);
  //pointer lines
  gv.g.line(xPosition + 120, yPositionR1 + (width / 2) - 5, xPosition + 150,
            yPositionR1 - 15, {"stroke-width": 3, stroke: "gray"});
  gv.g.line(xPosition + 120, yPositionR2 + (width / 2) + 5, xPosition + 150,
            yPositionR2 + width + 15, {"stroke-width": 3, stroke: "gray"});

  //text
  gv.label("A simple <tt>Employee</tt> object. The current value is an employee named John. This variable also plays the role of pointee for <tt>empRef</tt>. ",
           {top: yPositionR1 - 55, left: xPosition + 155});
  gv.label("A reference variable. The current value is a reference to the pointee <tt>employee1</tt> above.",
           {top: yPositionR2 + width - 15, left: xPosition + 155});
  gv.g.path(["M", xPosition + length1 - 10, yPositionR2 + (width / 2),
             "C", xPosition + length1 + 40, yPositionR2 + (width / 2) + 5,
             xPosition + length1 + 35, yPositionR2 - 10,
             xPosition + length1 + 5, yPositionR1 + width - 5].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  gv.label("<tt>employee1</tt>",
           {top: yPositionR1 - (width / 2) + 5, left: xPosition - 75});
  gv.label("John", {top: yPositionR1 - (width / 2) + 5, left: xPosition + 25});
  gv.label("<tt>empRef</tt>",
           {top: yPositionR2 - (width / 2) + 5, left: xPosition - 56});
  gv.displayInit();
  gv.recorded();
});
