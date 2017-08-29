//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "T1-T5CON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var av;
  av = new JSAV(av_name);
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        code = config.code;
  var pseudo = av.code(code[0]);
  pseudo.element.css({
        position: "absolute",
        top: 10,
        left: -10
  });
  pseudo.setCurrentLine(3);
  var widthBig = 80;
  var lengthBig = 110;
  var widthSmall = 30;
  var lengthSmall = 80;
  var xPositionBigRectangles = 600;
  var yPositionRectX = 100;
  var yPositionRectY = 0;
  var xPositionSmallRectangles = xPositionBigRectangles + 25;
  var yPositionA = yPositionRectX + (widthBig / 2) + 10;
  var yPositionB = yPositionA + widthSmall;
  var yPositionP = yPositionRectY + (widthBig / 2) + 10;
  var yPositionQ = yPositionP + widthSmall;

  //creating everything in the X rectangle
  av.umsg("X()'s locals have been allocated and given values");
  var xRect = av.g.rect(xPositionBigRectangles, yPositionRectX + (widthBig / 2), lengthBig, widthBig);
  var aRect = av.g.rect(xPositionSmallRectangles, yPositionA, lengthSmall, widthSmall);
  var bRect = av.g.rect(xPositionSmallRectangles, yPositionB, lengthSmall, widthSmall);
  var xLabel = av.label("X ()",  {top: yPositionRectX + (widthBig) - 3, left: xPositionBigRectangles - 30});
  var xRectA = av.label("a",  {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  var xRectB = av.label("b",  {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  var xRectA1 = av.label("1", {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  var xRectB2 = av.label("2", {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  av.displayInit();
  av.step();

  //creating everything in the Y rectangle
 pseudo.setCurrentLine(9);

    av.umsg("Y() is called with p = 1, and its locals are allocated. X()'s locals continue to be allocated");
  var rectY = av.g.rect(xPositionBigRectangles, yPositionRectY + (widthBig / 2), lengthBig, widthBig);
  var rectP = av.g.rect(xPositionSmallRectangles, yPositionP, lengthSmall, widthSmall);
  var rectQ = av.g.rect(xPositionSmallRectangles, yPositionQ, lengthSmall, widthSmall);
  var labelY = av.label("Y ()",  {top: yPositionRectY + (widthBig) - 3, left: xPositionBigRectangles - 30});
  var labelP = av.label("p",  {top: yPositionP - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  var labelQ = av.label("q",  {top: yPositionQ - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  var label1 = av.label("1", {top: yPositionP - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  var label3 = av.label("3", {top: yPositionQ - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  av.step();
    pseudo.setCurrentLine(5);
  av.umsg("Y() is called again with p=2, and its locals are allocated a second time");
  rectY.hide();
  rectP.hide();
  rectQ.hide();
  labelY.hide();
  labelP.hide();
  labelQ.hide();
  label1.hide();
  label3.hide();
  av.step();
    pseudo.setCurrentLine(9);
  av.umsg("Y() is called again with p=2, and its locals are allocated a second time");
  rectY.show();
  rectP.show();
  rectQ.show();
  labelY.show();
  labelP.show();
  labelQ.show();
  label1.show();
  label3.show();

  av.step();
  pseudo.setCurrentLine(10);
  av.umsg("Y() exits and its locals are deallocated.");
  rectY.hide();
  rectP.hide();
  rectQ.hide();
  labelY.hide();
  labelP.hide();
  labelQ.hide();
  label1.hide();
  label3.hide();
  av.step();
  pseudo.setCurrentLine(6);
  av.umsg("X() exits and its locals are deallocated.");
  xRect.hide();
  xRectA.hide();
  xRectA1.hide();
  xRectB.hide();
  xRectB2.hide();
  aRect.hide();
  bRect.hide();
  xLabel.hide();
  av.recorded();
});
