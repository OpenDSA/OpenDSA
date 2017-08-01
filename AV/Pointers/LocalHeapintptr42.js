/*global JSAV, document */
// Written by Sushma Mandava
//variable xPositionLocalRectangles controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "LocalHeapintptr42";
  // Load the config object with interpreter and code created by odsaUtils.js
  var av;
  av = new JSAV(av_name);
  var xPositionLocalRectangles = 340;
  var yPositionLocal1 = 60;
  var xPositionHeapRectangles = xPositionLocalRectangles + 160;
  var length1 = 100;
  var width = 30;

  // Slide 1
  av.label("Local",  {top: 0, left: xPositionLocalRectangles + 20});
  av.label("Heap",  {top: 0, left: xPositionLocalRectangles + 200});
  av.g.rect(xPositionLocalRectangles, yPositionLocal1, length1, width, {"stroke-width": 2});
  av.label("empPtr",  {top: yPositionLocal1 - (width / 2), left: xPositionLocalRectangles - 55});
  //creating the x's
  var x1 = av.g.line(xPositionLocalRectangles + 16, yPositionLocal1 + 23, xPositionLocalRectangles + 27, yPositionLocal1 + 8, {"stroke-width": 2});
  var x2 = av.g.line(xPositionLocalRectangles + 16, yPositionLocal1 + 8, xPositionLocalRectangles + 27, yPositionLocal1 + 23, {"stroke-width": 2});

  var x3 = av.g.line(xPositionLocalRectangles + 41, yPositionLocal1 + 23, xPositionLocalRectangles + 53, yPositionLocal1 + 8, {"stroke-width": 2});
  var x4 = av.g.line(xPositionLocalRectangles + 41, yPositionLocal1 + 8, xPositionLocalRectangles + 53, yPositionLocal1 + 23, {"stroke-width": 2});

  var x5 = av.g.line(xPositionLocalRectangles + 66, yPositionLocal1 + 23, xPositionLocalRectangles + 77, yPositionLocal1 + 8, {"stroke-width": 2});
  var x6 = av.g.line(xPositionLocalRectangles + 66, yPositionLocal1 + 8, xPositionLocalRectangles + 77, yPositionLocal1 + 23, {"stroke-width": 2});

  //gray line in the middle
  av.g.line((xPositionLocalRectangles + 130), 0, (xPositionLocalRectangles + 130),
   140, {"stroke-width": 3, stroke: "gray"});
  var ptline = av.g.line(xPositionLocalRectangles + 80,  yPositionLocal1 + (width / 2), xPositionLocalRectangles + 150,
            yPositionLocal1 + (width / 2),
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  ptline.hide();
  av.displayInit();

  // Slide 2
  x1.hide();
  x2.hide();
  x3.hide();
  x4.hide();
  x5.hide();
  x6.hide();
  ptline.show();
  var heapRectangle = av.g.rect(xPositionHeapRectangles, yPositionLocal1, length1, width, {"stroke-width": 2});
  av.step();

  // Slide 3
  heapRectangle.hide();
  ptline.css({stroke: "gray"});
  av.recorded();
});
