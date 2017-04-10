/*global JSAV, document */
// Written by Sushma Mandava
//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av = new JSAV("num42CON", {animationMode: "none"});
  var xPosition = 375;
  var yPosition = 5;
  var length1 = 125;
  var width = 30;
  av.g.rect(xPosition, yPosition, length1, width);
  av.label("<tt>num</tt>",  {top: yPosition - (width / 2) + 5, left: xPosition - 35});
  av.label("42", {top: yPosition - (width / 2) + 5, left: xPosition + 50});
  av.displayInit();
  av.recorded();
});
