/*global JSAV, document */
// Written by Sushma Mandava
//variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av = new JSAV("empPtrnull", {animationMode: "none"});
  var xPosition = 375;
  var yPosition = 2;
  var length1 = 125;
  var width = 30;
  av.g.rect(xPosition, yPosition, length1, width);
  av.label("empPtr",  {top: yPosition - (width / 2) + 3, left: xPosition - 53});
  av.g.line(xPosition, yPosition + width, xPosition + length1, yPosition, {"stroke-width": 2});
  av.displayInit();
  av.recorded();
});
