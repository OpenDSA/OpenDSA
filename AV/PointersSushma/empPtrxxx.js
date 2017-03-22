/*global JSAV, document */
// Written by Sushma Mandava
//variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av = new JSAV("empPtrxxx", {animationMode: "none"});
  var xPosition = 400;
  var yPositionR1 = 50;
  var length1 = 100;
  var width = 30;

  av.g.rect(xPosition, yPositionR1, length1, width);
  av.label("empPtr",  {top: yPositionR1 - (width / 2) + 3, left: xPosition - 55});
//creating the x's
  av.g.line(xPosition + 10, yPositionR1 + 25, xPosition + 30, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 10, yPositionR1 + 3, xPosition + 30, yPositionR1 + 25, {"stroke-width": 2});

  av.g.line(xPosition + 40, yPositionR1 + 25, xPosition + 60, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 40, yPositionR1 + 3, xPosition + 60, yPositionR1 + 25, {"stroke-width": 2});

  av.g.line(xPosition + 70, yPositionR1 + 25, xPosition + 90, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 70, yPositionR1 + 3, xPosition + 90, yPositionR1 + 25, {"stroke-width": 2});

  av.displayInit();
  av.recorded();
});
