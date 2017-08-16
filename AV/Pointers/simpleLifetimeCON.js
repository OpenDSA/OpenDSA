//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "simpleLifetimeCON";
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
  var lengthBig = 150;
  var widthSmall = 30;
  var lengthSmall = 80;
  var xPositionBigRectangles = 450;
  var yPositionRectX = 100;
  var yPositionRectY = 0;
  var xPositionSmallRectangles = xPositionBigRectangles + 55;
  var yPositionA = yPositionRectX + (widthBig / 2) + 10;
  var yPositionB = yPositionA + widthSmall;
  var yPositionP = yPositionRectY + (widthBig / 2) + 10;
  var yPositionQ = yPositionP + widthSmall;

  //creating everything in the X rectangle
  av.umsg("Locals (a, scores) allocated when Foo runs");
    var rectY =av.g.rect(xPositionBigRectangles, yPositionRectX + (widthBig / 2), lengthBig, widthBig);
    var rectP =av.g.rect(xPositionSmallRectangles, yPositionA, lengthSmall, widthSmall);
    var rectQ =av.g.rect(xPositionSmallRectangles, yPositionB, lengthSmall, widthSmall);
    var labelY =av.label("Foo",  {top: yPositionRectX + (widthBig) - 3, left: xPositionBigRectangles - 30});
    var labelP = av.label("scores",  {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 50});
    var labelQ =av.label("a",  {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
    var label1 =av.label("0.0F", {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 3) + 14});
  var label2 = av.label("0", {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 3) + 14});
  av.displayInit();
  av.step();

  //creating everything in the Y rectangle
 pseudo.setCurrentLine(5);
    rectY.hide();
    rectP.hide();
    rectQ.hide();
    labelY.hide();
    labelP.hide();
    labelQ.hide();
    label1.hide();
    label2.hide();
    av.umsg("Local storage is used by the computation");
    var rectY =av.g.rect(xPositionBigRectangles, yPositionRectX + (widthBig / 2), lengthBig, widthBig);
    var rectP =av.g.rect(xPositionSmallRectangles, yPositionA, lengthSmall, widthSmall);
    var rectQ =av.g.rect(xPositionSmallRectangles, yPositionB, lengthSmall, widthSmall);
    var labelY =av.label("Foo",  {top: yPositionRectX + (widthBig) - 3, left: xPositionBigRectangles - 30});
    var labelP = av.label("scores",  {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 50});
    var labelQ =av.label("a",  {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
    var label1 =av.label("0.0F", {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 3) + 14});
    var label2 = av.label("1", {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 3) + 14});
  av.step();
    pseudo.setCurrentLine(7);
  av.umsg("i is added to the locals after its declaration.");
  rectY.hide();
  rectP.hide();
  rectQ.hide();
  labelY.hide();
  labelP.hide();
  labelQ.hide();
  label1.hide();
  label2.hide();

    var rectY =av.g.rect(xPositionBigRectangles, yPositionRectX + (widthBig / 2) - 40, lengthBig , widthBig + 40);
    var rectP =av.g.rect(xPositionSmallRectangles, yPositionA, lengthSmall, widthSmall);
    var rectQ =av.g.rect(xPositionSmallRectangles, yPositionB, lengthSmall, widthSmall);
    var rectM =av.g.rect(xPositionSmallRectangles, yPositionA - widthSmall, lengthSmall, widthSmall);
    var labelY =av.label("Foo",  {top: yPositionRectX + (widthBig) - 3, left: xPositionBigRectangles - 30});
    var labelP = av.label("scores",  {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 50});
    var labelI = av.label("i",  {top: yPositionA - (3* widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
    var labelQ =av.label("a",  {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
    var label1 =av.label("0.0F", {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 3) + 14});
    var label2 = av.label("1", {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 3) + 14});
    var label3 = av.label("0", {top: yPositionA - (3*widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 3) + 14});
    av.step();
    pseudo.setCurrentLine(9);
  av.umsg("Locals continue to exist undisturbed");

  av.step();
    pseudo.setCurrentLine(11);
  av.umsg("the life time of i is finished, so i is removed from locals");
  rectY.hide();
  rectP.hide();
  rectQ.hide();
  rectM.hide();
  labelY.hide();
  labelP.hide();
  labelI.hide();
  labelQ.hide();
  label1.hide();
    label2.hide();
    label3.hide();

    var rectY =av.g.rect(xPositionBigRectangles, yPositionRectX + (widthBig / 2), lengthBig, widthBig);
    var rectP =av.g.rect(xPositionSmallRectangles, yPositionA, lengthSmall, widthSmall);
    var rectQ =av.g.rect(xPositionSmallRectangles, yPositionB, lengthSmall, widthSmall);
    var labelY =av.label("Foo",  {top: yPositionRectX + (widthBig) - 3, left: xPositionBigRectangles - 30});
    var labelP = av.label("scores",  {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 50});
    var labelQ =av.label("a",  {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
    var label1 =av.label("0.0F", {top: yPositionA - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 3) + 14});
    var label2 = av.label("1", {top: yPositionB - (widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 3) + 14});

    av.step();
    pseudo.setCurrentLine(13);
    av.umsg("The locals are deallocated when the function exits");
    rectY.hide();
    rectP.hide();
    rectQ.hide();
    labelY.hide();
    labelP.hide();
    labelQ.hide();
    label1.hide();
    label2.hide();
  av.recorded();
});
