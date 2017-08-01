/*global JSAV, document */
// Written by Sushma Mandava
//variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av = new JSAV("empRefsecondCON", {animationMode: "none"});
  var xPosition = 200;
  var yPositionR1 = 5;
  var yPositionR2 = 75;
  var yPositionR3 = 125;
  var length1 = 100;
  var width = 35;

  av.g.rect(xPosition, yPositionR1, length1, width + 20);
  av.g.rect(xPosition, yPositionR2, length1, width);
  av.g.rect(xPosition, yPositionR3, length1, width);

  //pointer lines
  av.g.line(xPosition + 130, yPositionR3 + 10, xPosition + 185, yPositionR2 + 40,
            {"stroke-width": 3, stroke: "gray"});

  //text
  av.label("A second pointer is initialized with the assignment <tt>second = empRef</tt>. This causes <tt>second</tt> to refer to the same pointee as <tt>empRef</tt>.",
           {top: yPositionR3 - 60, left: xPosition + 195});
  av.label("John", {top: yPositionR1 - (width / 2) + 8, left: xPosition + 25});
  av.label("1000", {top: yPositionR1 - (width / 2) + 25, left: xPosition + 25});
  av.label("<tt>empRef</tt>",
           {top: yPositionR2 - (width / 2) + 10, left: xPosition - 48});
  av.label("<tt>second</tt>",
           {top: yPositionR3 - (width / 2) + 10, left: xPosition - 48});


  //first arrow
  av.g.path(["M", xPosition + length1 - 10, yPositionR2 + (width / 2),
             "C", xPosition + length1 + 40, yPositionR2 + (width / 2) + 5,
             xPosition + length1 + 35, yPositionR2 - 10,
             xPosition + length1 + 2, yPositionR1 + width - 15].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});

  //second arrow
  av.g.path(["M", xPosition + length1 - 10, yPositionR3 + (width / 2),
             "C", xPosition + length1 + 40, yPositionR3 + (width / 2) + 5,
             xPosition + length1 + 35, yPositionR3 - 10,
             xPosition + length1 + 2, yPositionR1 + width].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});

  av.displayInit();
  av.recorded();
});
