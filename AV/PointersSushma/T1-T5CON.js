$(document).ready(function() {
  "use strict";
  var av_name = "T1-T5CON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var av;
  av = new JSAV(av_name);
  var widthBig = 80;
  var lengthBig = 110;
  var widthSmall = 30;
  var lengthSmall = 80;
  var xPositionBigRectangles = 380;
  var yPositionRectX = 100;
  var yPositionRectY = 0;
  var xPositionSmallRectangles = 405;
  var yPositionA = yPositionRectX + (widthBig / 2) + 10;
  var yPositionB = yPositionA + widthSmall;
  var yPositionP = yPositionRectY + (widthBig / 2) + 10;
  var yPositionQ = yPositionP + widthSmall

  //creating everything in the X rectangle
  //av.umsg(interpret("My message here"));
  av.g.rect(xPositionBigRectangles, yPositionRectX + (widthBig / 2), lengthBig, widthBig);
  av.g.rect(xPositionSmallRectangles, yPositionA, lengthSmall, widthSmall);
  av.g.rect(xPositionSmallRectangles, yPositionB, lengthSmall, widthSmall);
  av.label("X ()",  {top: yPositionRectX + (widthBig) - 3, left: xPositionBigRectangles - 30});
  av.label("a",  {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  av.label("b",  {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  av.label("1", {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  av.label("2", {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  av.displayInit();
  av.step();

  //creating everything in the Y rectangle
  var rectY = av.g.rect(xPositionBigRectangles, yPositionRectY + (widthBig / 2), lengthBig, widthBig);
  var rectP = av.g.rect(xPositionSmallRectangles, yPositionP, lengthSmall, widthSmall);
  var rectQ = av.g.rect(xPositionSmallRectangles, yPositionQ, lengthSmall, widthSmall);
  var labelY = av.label("Y ()",  {top: yPositionRectY + (widthBig) - 3, left: xPositionBigRectangles - 30});
  var labelP = av.label("p",  {top: yPositionP - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  var labelQ = av.label("q",  {top: yPositionQ - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  var label1 = av.label("1", {top: yPositionP - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  var label3 = av.label("3", {top: yPositionQ - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});


  av.step();

  rectY.hide();
  rectP.hide();
  rectQ.hide();
  labelY.hide();
  labelP.hide();
  labelQ.hide();
  label1.hide();
  label3.hide();

  av.step();

  rectY.show();
  rectP.show();
  rectQ.show();
  labelY.show();
  labelP.show();
  labelQ.show();
  label1.show();
  label3.show();

  av.step();

  rectY.hide();
  rectP.hide();
  rectQ.hide();
  labelY.hide();
  labelP.hide();
  labelQ.hide();
  label1.hide();
  label3.hide();









  av.recorded();
});
