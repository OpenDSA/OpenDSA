//variable xPositionBigRectangles controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "T1-T3CON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var av;
  av = new JSAV(av_name);
  var widthBig = 40;
  var lengthBig = 140;
  var widthSmall = 27;
  var lengthSmall = 55;
  var xPositionBigRectangles = 350;
  var yPositionRectA = 50;
  var yPositionRectB = 0;
  var xPositionSmallRectangles = xPositionBigRectangles + lengthBig - 60;
  var yPosition55Top = yPositionRectA + (widthBig / 2) + 6;
  var yPosition55Bottom = yPositionRectB + (widthBig / 2) + 6;
  //var yPositionP = yPositionRectY + (widthBig / 2) + 10;
  //var yPositionQ = yPositionP + widthSmall

  //creating everything in the X rectangle
  //av.umsg(interpret("My message here"));
  av.umsg("The value of interest netWorth is local to A()");
  av.g.rect(xPositionBigRectangles, yPositionRectA + (widthBig / 2), lengthBig, widthBig);
  av.g.rect(xPositionSmallRectangles, yPosition55Top, lengthSmall, widthSmall);
  av.label("A ()",  {top: yPosition55Top - (widthBig / 2) + 3, left: xPositionBigRectangles - 30});
  av.label("networth",  {top: yPosition55Top - (widthSmall / 2) - 1, left: xPositionBigRectangles + 14});
  av.label("55", {top: yPosition55Top - (widthSmall / 2), left: xPositionSmallRectangles + 5});
  av.displayInit();
  av.step();
  //creating the second slide
  av.umsg("netWorth is copied to B()'s local worth. B() changes its local worth from 55 to 56");
  var bigB = av.g.rect(xPositionBigRectangles, yPositionRectB + (widthBig / 2), lengthBig, widthBig);
  var smallB = av.g.rect(xPositionSmallRectangles, yPosition55Bottom, lengthSmall, widthSmall);
  var labelB = av.label("B ()",  {top: yPosition55Bottom - (widthBig / 2) + 3, left: xPositionBigRectangles - 30});
  var labelWorth = av.label("worth",  {top: yPosition55Bottom - (widthSmall / 2), left: xPositionBigRectangles + 30});
  var label55 = av.label("55", {top: yPosition55Bottom - (widthSmall / 2), left: xPositionSmallRectangles + 5});
  var x1 = av.g.line(xPositionSmallRectangles + 6, yPosition55Bottom - (widthSmall / 2) + 30, xPositionSmallRectangles + 23, yPosition55Bottom - (widthSmall / 2) + 20, {"stroke-width": 2});
  var x2 = av.g.line(xPositionSmallRectangles + 6, yPosition55Bottom - (widthSmall / 2) + 20, xPositionSmallRectangles + 23, yPosition55Bottom - (widthSmall / 2) + 30, {"stroke-width": 2});
  var label56 = av.label("56", {top: yPosition55Bottom - (widthSmall / 2), left: xPositionSmallRectangles + 30});

  av.step();
  av.umsg("B() exits and its local worth is deallocated. The value of interest has not been changed");
  bigB.hide();
  smallB.hide();
  labelB.hide();
  labelWorth.hide();
  label55.hide();
  x1.hide();
  x2.hide();
  label56.hide();
  av.recorded();
});
