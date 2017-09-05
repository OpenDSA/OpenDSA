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

  pseudo.setCurrentLine(3);
  var widthBig = 80;
  var lengthBig = 110;
  var widthSmall = 30;
  var lengthSmall = 80;
  var xPositionBigRectangles = 500;
  var yPositionRectX = 100;
  var yPositionRectY = 0;
  var xPositionSmallRectangles = xPositionBigRectangles + 25;
  var yPositionA = yPositionRectX + (widthBig / 2) + 10;
  var yPositionB = yPositionA + widthSmall;
  var yPositionP = yPositionRectY + (widthBig / 2) + 10;
  var yPositionQ = yPositionP + widthSmall;
  //Slide 1
  //creating everything in the X rectangle
  av.umsg("Consider we have the following cod. At this line of code, X()'s locals have been allocated and given values");
  var x_FunctionRect = av.g.rect(xPositionBigRectangles, yPositionRectX + (widthBig / 2), lengthBig, widthBig);
  var a_FieldRect = av.g.rect(xPositionSmallRectangles, yPositionA, lengthSmall, widthSmall);
  var b_FieldRect = av.g.rect(xPositionSmallRectangles, yPositionB, lengthSmall, widthSmall);
  var x_FunctionLabel = av.label("X ()",  {top: yPositionRectX + (widthBig) - 3, left: xPositionBigRectangles - 30});
  var a_FieldLabel = av.label("a",  {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  var b_FieldLabel = av.label("b",  {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  var a_FieldValue = av.label("1", {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  var b_FieldValue = av.label("2", {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  av.displayInit();
  av.step();
  //Slide 2
  //creating everything in the Y rectangle
  pseudo.setCurrentLine(9);

  av.umsg("Y() is called with p = 1, and its locals are allocated. X()'s locals continue to be allocated");
  var y_FunctionRect = av.g.rect(xPositionBigRectangles, yPositionRectY + (widthBig / 2), lengthBig, widthBig);
  var p_FieldRect = av.g.rect(xPositionSmallRectangles, yPositionP, lengthSmall, widthSmall);
  var q_FiledRect = av.g.rect(xPositionSmallRectangles, yPositionQ, lengthSmall, widthSmall);
  var y_FunctionLabel = av.label("Y ()",  {top: yPositionRectY + (widthBig) - 3, left: xPositionBigRectangles - 30});
  var p_FieldLabel = av.label("p",  {top: yPositionP - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  var q_FiledLabel = av.label("q",  {top: yPositionQ - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  var p_FieldValueFirstAppearance = av.label("1", {top: yPositionP - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  var q_FieldValueFirstAppearance = av.label("3", {top: yPositionQ - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  av.step();
  //Slide 3
  pseudo.setCurrentLine(5);
  av.umsg("Y() will be called again with p=2");
  y_FunctionRect.hide();
  p_FieldRect.hide();
  q_FiledRect.hide();
  y_FunctionLabel.hide();
  p_FieldLabel.hide();
  q_FiledLabel.hide();
  p_FieldValueFirstAppearance.hide();
  q_FieldValueFirstAppearance.hide();
  av.step();
  //Slide 4
  pseudo.setCurrentLine(9);
  av.umsg("When Y() is called with p=2, its locals are allocated for the second time");
  y_FunctionRect.show();
  p_FieldRect.show();
  q_FiledRect.show();
  y_FunctionLabel.show();
  p_FieldLabel.show();
  q_FiledLabel.show();
  var p_FieldValueSecondAppearance = av.label("2", {top: yPositionP - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  var q_FieldValueSecondAppearance = av.label("4", {top: yPositionQ - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});

  av.step();
  //Slide 5
  pseudo.setCurrentLine(10);
  av.umsg("Y() exits and its locals are deallocated.");
  y_FunctionRect.hide();
  p_FieldRect.hide();
  q_FiledRect.hide();
  y_FunctionLabel.hide();
  p_FieldLabel.hide();
  q_FiledLabel.hide();
  p_FieldValueSecondAppearance.hide();
  q_FieldValueSecondAppearance.hide();

  av.step();
  //Slide 6
  pseudo.setCurrentLine(6);
  av.umsg("X() exits and its locals are deallocated.");
  x_FunctionRect.hide();
  a_FieldRect.hide();
  b_FieldRect.hide();
  x_FunctionLabel.hide();
  a_FieldLabel.hide();
  b_FieldLabel.hide();
  a_FieldValue.hide();
  b_FieldValue.hide();
  av.recorded();
});
