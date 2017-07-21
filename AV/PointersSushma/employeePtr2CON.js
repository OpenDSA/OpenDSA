/*global JSAV, document */
// Written by Sushma Mandava
//variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var gv = new JSAV("employeePtr2CON", {animationMode: "none"});
  var xPosition = 350;
  var yPositionR1 = 10;
  var yPositionR2 = 75;
  var yPositionR3 = 120;
  var length1 = 100;
  var width = 35;

  gv.g.rect(xPosition, yPositionR1, length1, width + 20);
  gv.g.rect(xPosition, yPositionR2, length1, width);

  //gv.g.line(230, 150, 100, 400, {"stroke-width": 3});
  gv.label("John", {top: yPositionR1 - 8, left: xPosition + 30});
  gv.label("1000", {top: yPositionR1 + 12, left: xPosition + 30});
  gv.label("<tt>empPtr</tt>",  {top: yPositionR2 - 5, left: xPosition - 50});

  gv.g.path(["M", xPosition + length1 - 10, yPositionR2 + (width / 2),
             "C", xPosition + length1 + 40, yPositionR2 + (width / 2) + 5,
                  xPosition + length1 + 35, yPositionR2 - 10,
                  xPosition + length1 + 5, yPositionR1 + width - 10].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});

  gv.displayInit();
  gv.recorded();
});
