/*global JSAV, document */
// Written by Sushma Mandava
//variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av = new JSAV("empRefnullCON", {animationMode: "none"});
  var xPosition = 375;
  var yPosition = 5;
  var length1 = 100;
  var width = 35;
  av.g.rect(xPosition, yPosition, length1, width);
  av.g.line(xPosition, yPosition, xPosition + length1, yPosition + width,
            {"stroke-width": 2});
  av.label("<tt>emptyRef</tt>",  {top: yPosition, left: xPosition - 65});
  av.displayInit();
  av.recorded();
});
