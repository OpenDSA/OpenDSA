/*global JSAV, document */
// Written by Sushma Mandava
$(document).ready(function() {
  "use strict";
  var av = new JSAV("badPointerPowCON", {animationMode: "none"});
  var xPosition = 275;
  var yPositionR1 = 10;
  var length1 = 100;
  var width = 30;

  av.g.rect(xPosition, yPositionR1, length1, width);

  av.g.rect(xPosition, yPositionR1, length1, width);
  av.label("<tt>badPointer</tt>",  {top: yPositionR1 - 10, left: xPosition - 83});
  av.label("POW!!!",  {top: yPositionR1 + 60, left: xPosition + 170});
  //creating the x's
  av.g.line(xPosition + 10, yPositionR1 + 25, xPosition + 30, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 10, yPositionR1 + 3, xPosition + 30, yPositionR1 + 25, {"stroke-width": 2});

  av.g.line(xPosition + 40, yPositionR1 + 25, xPosition + 60, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 40, yPositionR1 + 3, xPosition + 60, yPositionR1 + 25, {"stroke-width": 2});

  av.g.line(xPosition + 70, yPositionR1 + 25, xPosition + 90, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 70, yPositionR1 + 3, xPosition + 90, yPositionR1 + 25, {"stroke-width": 2});

  av.g.line(xPosition + length1 - 5, yPositionR1 + width - 3, xPosition + length1 + 60, yPositionR1 + width + 40, {"stroke-width": 3});
  av.g.polyline([[xPosition + length1 + 50, yPositionR1 + width + 43], [xPosition + length1 + 65, yPositionR1 + width + 45],
    [xPosition + length1 + 69, yPositionR1 + width + 35]], {fill: "black"});
  //pointer lines

  av.displayInit();
  av.recorded();
});
