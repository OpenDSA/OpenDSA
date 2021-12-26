/*global JSAV, document */
// Written by Sushma Mandava
//variable xPositionSmallRectangles controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av = new JSAV("LocalHeapaloc", {animationMode: "none"});
  var xPositionSmallRectangles = 230;
  var xPositionBigRectangles = xPositionSmallRectangles + 170;
  var yPositionSmall1 = 95;
  var yPositionSmall2 = yPositionSmall1 + 40;
  var yPositionSmall3 = yPositionSmall2 + 40;
  var widthSmall = 30;
  var lengthSmall = 55;
  var widthBig = 50;
  var lengthBig = 100;
  var yPositionBig1 =  50;
  var yPositionBig2 = yPositionBig1 + widthBig;
  var yPositionBig3 = yPositionBig2 + widthBig;
  var yPositionBig4 = yPositionBig3 + widthBig;

  //small rectanges
  av.g.rect(xPositionSmallRectangles, yPositionSmall1, lengthSmall, widthSmall);
  av.g.rect(xPositionSmallRectangles, yPositionSmall2, lengthSmall, widthSmall);
  av.g.rect(xPositionSmallRectangles, yPositionSmall3, lengthSmall, widthSmall);

  //big rectangles
  av.g.rect(xPositionBigRectangles, yPositionBig1, lengthBig, widthBig);
  av.g.rect(xPositionBigRectangles, yPositionBig2, lengthBig, widthBig, {"stroke-width": 3, fill: "#7c7c7c", opacity: 0.4});
  av.g.rect(xPositionBigRectangles, yPositionBig3, lengthBig, widthBig, {"stroke-width": 3, fill: "#7c7c7c", opacity: 0.4});
  av.g.rect(xPositionBigRectangles, yPositionBig4, lengthBig, widthBig, {"stroke-width": 3, fill: "#7c7c7c", opacity: 0.4});
  av.g.rect(xPositionBigRectangles, yPositionBig2, lengthBig, widthBig, {"stroke-width": 3});
  av.g.rect(xPositionBigRectangles, yPositionBig3, lengthBig, widthBig, {"stroke-width": 3});
  av.g.rect(xPositionBigRectangles, yPositionBig4, lengthBig, widthBig, {"stroke-width": 3});

  //gray line in the middle
  av.g.line((xPositionSmallRectangles + 100), 0, (xPositionSmallRectangles + 100),
   250, {"stroke-width": 3, stroke: "gray"});
  //labels
  av.label("Local", {top: 0, left: xPositionSmallRectangles});
  av.label("Heap", {top: 0, left: xPositionBigRectangles});
  av.label("(Free)", {top: yPositionBig1, left: xPositionBigRectangles + 28});
  av.label("(Gif3)", {top: yPositionBig2, left: xPositionBigRectangles + 28});
  av.label("(Gif2)", {top: yPositionBig3, left: xPositionBigRectangles + 28});
  av.label("(Gif1)", {top: yPositionBig4, left: xPositionBigRectangles + 28});

  //arrows
  av.g.path(["M", xPositionSmallRectangles + lengthSmall / 2,  yPositionSmall1 + (widthSmall / 2),
    xPositionBigRectangles - 5, yPositionBig2 + widthBig - 7].join(","), {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  av.g.path(["M", xPositionSmallRectangles + lengthSmall / 2,  yPositionSmall2 + (widthSmall / 2),
    xPositionBigRectangles - 5, yPositionBig3 + widthBig - 7].join(","), {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  av.g.path(["M", xPositionSmallRectangles + lengthSmall / 2,  yPositionSmall3 + (widthSmall / 2),
    xPositionBigRectangles - 5, yPositionBig4 + widthBig - 7].join(","), {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});

  //caption
  av.g.line((xPositionBigRectangles + lengthBig + 15), yPositionBig3 + (widthBig / 2), (xPositionBigRectangles + lengthBig + 70),
   yPositionBig3 + (widthBig / 2), {"stroke-width": 3, stroke: "gray"});
  av.g.line((xPositionBigRectangles + lengthBig + 15), yPositionBig2 + (widthBig / 2), (xPositionBigRectangles + lengthBig + 70),
   yPositionBig3 + (widthBig / 2), {"stroke-width": 3, stroke: "gray"});
  av.g.line((xPositionBigRectangles + lengthBig + 15), yPositionBig4 + (widthBig / 2), (xPositionBigRectangles + lengthBig + 70),
   yPositionBig3 + (widthBig / 2), {"stroke-width": 3, stroke: "gray"});
  av.label("3 separate heap blocks --- each 1024 bytes in size.", {top: yPositionBig3 - 5, left: xPositionBigRectangles + lengthBig + 80});


  av.displayInit();
  av.recorded();
});
