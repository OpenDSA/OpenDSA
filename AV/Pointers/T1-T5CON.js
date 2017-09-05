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

  // Slide 1
  av.umsg("Consider the following code. The two highlighted lines allocate local variables for <tt>X()</tt>.");
  pseudo.highlight(2);
  pseudo.setCurrentLine(3);
  //creating everything in the X rectangle
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

  // Slide 2
  av.umsg("Next, <tt>Y()</tt> is called with <tt>a = 1</tt>...");
  pseudo.unhighlight(2);
  pseudo.setCurrentLine(4);
  av.step();

  // Slide 3
  av.umsg("... and its locals are allocated. This includes both parameter <tt>p</tt> (which starts as 1) and variable <tt>q</tt> (initially uninitialized). <tt>X()</tt>'s locals continue to be allocated.");
  pseudo.setCurrentLine(8);
  pseudo.highlight(7);
  //creating everything in the Y rectangle
  var y_FunctionRect = av.g.rect(xPositionBigRectangles, yPositionRectY + (widthBig / 2), lengthBig, widthBig);
  var p_FieldRect = av.g.rect(xPositionSmallRectangles, yPositionP, lengthSmall, widthSmall);
  var q_FiledRect = av.g.rect(xPositionSmallRectangles, yPositionQ, lengthSmall, widthSmall);
  var y_FunctionLabel = av.label("Y ()",  {top: yPositionRectY + (widthBig) - 3, left: xPositionBigRectangles - 30});
  var p_FieldLabel = av.label("p",  {top: yPositionP - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  var q_FiledLabel = av.label("q",  {top: yPositionQ - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  var p_FieldValueFirstAppearance = av.label("1", {top: yPositionP - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  av.step();

  // Slide 4
  av.umsg("Now, set <tt>q</tt> to be 3.");
  var q_FieldValueFirstAppearance = av.label("3", {top: yPositionQ - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  pseudo.unhighlight(7);
  pseudo.setCurrentLine(9);
  av.step();

  // Slide 5
  av.umsg("The next step is to return from <tt>Y()</tt>...");
  pseudo.setCurrentLine(10);
  av.step();

  // Slide 6
  av.umsg("... which leads to the removal of the space for <tt>Y</tt>'s local variables.");
  pseudo.setCurrentLine(4);
  y_FunctionRect.hide();
  p_FieldRect.hide();
  q_FiledRect.hide();
  y_FunctionLabel.hide();
  p_FieldLabel.hide();
  q_FiledLabel.hide();
  p_FieldValueFirstAppearance.hide();
  q_FieldValueFirstAppearance.hide();
  av.step();

  // Slide 7
  av.umsg("<tt>Y()</tt> will be called again with <tt>p=2</tt>...");
  pseudo.setCurrentLine(5);
  av.step();

  // Slide 8
  av.umsg("...and its locals are allocated for the second time.");
  pseudo.setCurrentLine(8);
  pseudo.highlight(7);
  y_FunctionRect.show();
  p_FieldRect.show();
  q_FiledRect.show();
  y_FunctionLabel.show();
  p_FieldLabel.show();
  q_FiledLabel.show();
  var p_FieldValueSecondAppearance = av.label("2", {top: yPositionP - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  av.step();

  // Slide 9
  av.umsg("Set <tt>q</tt> to be 4.");
  pseudo.unhighlight(7);
  pseudo.setCurrentLine(9);
  var q_FieldValueSecondAppearance = av.label("4", {top: yPositionQ - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 2) + 14});
  av.step();

  // Slide 10
  av.umsg("When <tt>Y()</tt> exits...");
  pseudo.setCurrentLine(10);
  av.step();

  // Slide 11
  av.umsg("... its locals are deallocated.");
  pseudo.setCurrentLine(5);
  y_FunctionRect.hide();
  p_FieldRect.hide();
  q_FiledRect.hide();
  y_FunctionLabel.hide();
  p_FieldLabel.hide();
  q_FiledLabel.hide();
  p_FieldValueSecondAppearance.hide();
  q_FieldValueSecondAppearance.hide();
  av.step();

  // Slide 12
  av.umsg("When X() exits, its locals are also deallocated.");
  pseudo.setCurrentLine(6);
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
