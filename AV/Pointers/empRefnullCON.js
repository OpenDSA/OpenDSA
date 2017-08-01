/*global JSAV, document */
// Written by Sushma Mandava
//variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av = new JSAV("empRefnullCON", {animationMode: "none"});
  var xPosition = 375;
  var yPosition = 5;
  var yPositionR2 = 70;
  var length1 = 100;
  var width = 55;
  av.g.rect(xPosition, yPosition, length1, width);
  av.g.line(xPosition, yPosition + width, xPosition + length1, yPosition,
            {"stroke-width": 2});
  av.g.rect(xPosition, yPositionR2, length1, width - 20);
  av.label("<tt>empRef</tt>",  {top: yPositionR2 - 11, left: xPosition - 45});
  av.g.path(["M", xPosition + length1 - 10, yPositionR2 + (width / 2),
             "C", xPosition + length1 + 40, yPositionR2 + (width / 2) + 5,
                  xPosition + length1 + 35, yPositionR2 - 10,
                  xPosition + length1 + 5, yPosition + width - 10].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  av.displayInit();
  av.recorded();
});
