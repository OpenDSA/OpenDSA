//variable xPositionBigRectangles controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "shallowdeep";
  // Load the config object with interpreter and code created by odsaUtils.js
  var av;
  av = new JSAV(av_name);
  var widthBig = 80;
  var lengthBig = 110;
  var widthSmall = 40;
  var lengthSmall = 70;
  var xPositionBigRectangles = 30;
  var xPositionSmallRectangles = xPositionBigRectangles + 20;
  var yPositionABig = 60;
  var yPositionASmall = yPositionABig + 20;
  var yPositionBBig = 200;
  var yPositionBSmall = yPositionBBig + 20;

  var xPositionBigRectangles2 = 500;
  var xPositionSmallRectangles2 = xPositionBigRectangles2 + 20;
  //labels
  av.label("Shallow / Sharing ", {top: yPositionABig - 70, left: xPositionBigRectangles + 50});
  av.label("Deep / Copying ", {top: yPositionABig - 70, left: xPositionBigRectangles + 450});
  av.label("A()", {top: yPositionABig + 10, left: xPositionBigRectangles - 25});
  av.label("B()",  {top: yPositionBBig + 10, left: xPositionBigRectangles - 25});
  av.label("A()", {top: yPositionABig + 10, left: xPositionBigRectangles2 - 25});
  av.label("B()",  {top: yPositionBBig + 10, left: xPositionBigRectangles2 - 25});
  av.g.line((xPositionBigRectangles + 350), 0, (xPositionBigRectangles + 350), 300, {"stroke-width": 3, stroke: "gray"});



  //rectangle A
  av.g.rect(xPositionBigRectangles, yPositionABig, lengthBig, widthBig, {stroke: "gray"});
  av.g.rect(xPositionSmallRectangles, yPositionASmall, lengthSmall, widthSmall);
  av.g.path(["M", xPositionSmallRectangles + lengthSmall - 10,  yPositionASmall + (widthSmall / 2),
    xPositionSmallRectangles + lengthSmall + 55, yPositionASmall + (widthBig / 2) + 35].join(","), {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});

  //rectangle B
  av.g.rect(xPositionBigRectangles, yPositionBBig, lengthBig, widthBig, {stroke: "gray"});
  av.g.rect(xPositionSmallRectangles, yPositionBSmall, lengthSmall, widthSmall);
  av.g.path(["M", xPositionSmallRectangles + lengthSmall - 10,  yPositionBSmall + (widthSmall / 2),
    xPositionSmallRectangles + lengthSmall + 55, yPositionBSmall - (widthBig / 2) - 10].join(","), {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});

  //smiley face rectangle
  av.g.rect(xPositionBigRectangles + 150, (yPositionABig + yPositionBBig) / 2, lengthBig, widthBig);
  av.g.ellipse(xPositionBigRectangles + 150 + lengthBig / 2, ((yPositionABig + yPositionBBig) / 2) + (widthBig / 2), lengthBig - 70, widthBig - 50);
  av.g.circle(xPositionBigRectangles + 190, (yPositionABig + yPositionBBig) / 2 + 30, 4);
  av.g.circle(xPositionBigRectangles + 215, (yPositionABig + yPositionBBig) / 2 + 30, 4);

  //separator line

  //second drawing

  //rectangle A
  av.g.rect(xPositionBigRectangles2, yPositionABig, lengthBig, widthBig, {stroke: "gray"});
  av.g.rect(xPositionSmallRectangles2, yPositionASmall, lengthSmall, widthSmall);

  //av.g.path(["M", xPositionSmallRectangles + lengthSmall - 10,  yPositionASmall + (widthSmall / 2),
    //xPositionSmallRectangles + lengthSmall - 10, yPositionASmall + widthSmall + 15].join(","), {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2})

  //rectangle B
  av.g.rect(xPositionBigRectangles2, yPositionBBig, lengthBig, widthBig, {stroke: "gray"});
  av.g.rect(xPositionSmallRectangles2, yPositionBSmall, lengthSmall, widthSmall);

  //av.g.path(["M", xPositionSmallRectangles2 + lengthSmall - 10,  yPositionBSmall + (widthSmall / 2),
    //xPositionSmallRectangles2 + lengthSmall - 10, yPositionBSmall - widthSmall - 15].join(","), {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2})
  //
  //smiley face rectangles
  av.g.path(["M", xPositionSmallRectangles2 + lengthSmall - 10,  yPositionASmall + (widthSmall / 2),
    xPositionBigRectangles2 + 170, yPositionASmall + (widthSmall / 2)].join(","), {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  av.g.rect(xPositionBigRectangles2 + 180, yPositionBBig, lengthBig, widthBig);
  av.g.ellipse(xPositionBigRectangles2 + 180 + lengthBig / 2, yPositionBBig + widthBig / 2, lengthBig - 70, widthBig - 50);
  av.g.circle(xPositionBigRectangles2 + 220, yPositionBBig + 30, 4);
  av.g.circle(xPositionBigRectangles2 + 245, yPositionBBig + 30, 4);

  av.g.path(["M", xPositionSmallRectangles2 + lengthSmall - 10,  yPositionBSmall + (widthSmall / 2),
    xPositionBigRectangles2 + 170, yPositionBSmall + (widthSmall / 2)].join(","), {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  av.g.rect(xPositionBigRectangles2 + 180, yPositionABig, lengthBig, widthBig);
  av.g.ellipse(xPositionBigRectangles2 + 180 + lengthBig / 2, yPositionABig + widthBig / 2, lengthBig - 70, widthBig - 50);
  av.g.circle(xPositionBigRectangles2 + 220, yPositionABig + 30, 4);
  av.g.circle(xPositionBigRectangles2 + 245, yPositionABig + 30, 4);


  var path = "M 212,180 C 225,188 236,191 258,180";
  var smiley1 = "M 713,110 C 726,118 737,121 759,110";
  var smiley2 = "M 713,250 C 726,258 737,261 759,250";
  av.g.path(path);
  av.g.path(smiley1);
  av.g.path(smiley2);
  av.displayInit();
  av.recorded();
});
