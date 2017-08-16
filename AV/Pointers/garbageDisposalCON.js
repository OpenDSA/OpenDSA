/*global ODSA */
// Written by Sushma Mandava
// garbage collector
//variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var avSlideNumber = 1;
  var av_name = "garbageDisposalCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;            // get the code object
  var av = new JSAV(av_name);
  //var pseudo = av.code1(code1[0]);
  // Load the config object with interpreter and code created by odsaUtils.js
  var xPosition = 50;
  var yPosition = 0;
  var widthBig = 300;
  var lengthBig = 430;
  var widthSmall = 120;
  var lengthSmall = 65;
  // Load the config object with interpreter and code created by odsaUtils.js
  // Slide 1
  //pseudo.hide();
  av.umsg("This slide show will explain Java Garbage Collection");
  //creating the arrows
  var e1Arrow = av.g.line(xPosition + 490,  yPosition + (lengthSmall / 2) + 70, xPosition + 540,
            yPosition + (lengthSmall / 2) + 70,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  var firstArrow = av.g.line(xPosition + 490,  yPosition + (lengthSmall / 2) + 175, xPosition + 540,
            yPosition + (lengthSmall / 2) + 175,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  var secondArrow = av.g.line(xPosition + 490,  yPosition + (lengthSmall / 2) + 280, xPosition + 540,
            yPosition + (lengthSmall / 2) + 280,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  var thirdArrow = av.g.line(xPosition + 490,  yPosition + (lengthSmall / 2) + 390, xPosition + 540,
            yPosition + (lengthSmall / 2) + 390,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  e1Arrow.hide();
  firstArrow.hide();
  secondArrow.hide();
  thirdArrow.hide();
  av.displayInit();
  av.step();
  //Slide 7
  var pseudo = av.code(code[0]);
  pseudo.element.css({
    position: "absolute",
    top: 10,
    left: -10
  });
  av.umsg("Now we will consider a small program to demonstrate garbage collection. Consider the following code");
  av.step();
  //Slide 8
  pseudo.setCurrentLine("methodCall");
  av.umsg("The method is called with the parameter e1. Object el will be in heap memory");
  e1Arrow.show();
  av.label("<tt>e1</tt>", {top: yPosition + 70 + (lengthSmall / 2) - 30, left: xPosition + 450});
  av.label("heap", {top: yPosition + 10, left: xPosition + 570});
  av.g.rect(xPosition + 430, yPosition + 50, widthBig, lengthBig);
  av.g.rect(xPosition + 550, yPosition + 70, widthSmall, lengthSmall);
  av.label("Ali", {top: yPosition + 70, left: xPosition + 550 + (widthSmall / 2) - 10});
  av.label("5000", {top: yPosition + 90, left: xPosition + 540 + (widthSmall / 2) - 10});
  av.step();
  //Slide 9
  pseudo.setCurrentLine("first");
  av.umsg("Object first will dynamically allocated memory from heap memory");
  var rect1 = av.g.rect(xPosition + 550, yPosition + 175, widthSmall, lengthSmall);
  var labelAlex = av.label("Alex", {top: yPosition + 175, left: xPosition + 550 + (widthSmall / 2) - 15, color: "green"});
  var labelAlexPay = av.label("1500", {top: yPosition + 195, left: xPosition + 540 + (widthSmall / 2) - 10});
  firstArrow.show();
  var labelFirst = av.label("<tt>first</tt>", {top: yPosition + 175 + (lengthSmall / 2) - 30, left: xPosition + 435});
  av.step();
  //Slide 10
  pseudo.setCurrentLine("second");
  av.umsg("The same will happen for second");
  var rect2 = av.g.rect(xPosition + 550, yPosition + 280, widthSmall, lengthSmall);
  var labelJohn = av.label("John", {top: yPosition + 280, left: xPosition + 550 + (widthSmall / 2) - 19});
  var labelJohnPay = av.label("2000", {top: yPosition + 300, left: xPosition + 540 + (widthSmall / 2) - 10});
  secondArrow.show();
  var labelSecond = av.label("<tt>second</tt>", {top: yPosition + 280 + (lengthSmall / 2) - 30, left: xPosition + 430});
  av.step();
  //Slide 11
  pseudo.setCurrentLine("null");
  av.umsg("Now first reference becomes null. This leaves the object (Alex, 1500) unreferenced and garbage collector may remove it anytime it feels that it has to empty space in heap memory");
  rect1.hide();
  firstArrow.hide();
  labelFirst.hide();
  rect1 = av.g.rect(xPosition + 550, yPosition + 175, widthSmall, lengthSmall, {stroke: "silver"});
  labelAlex.element.css({
    color: "silver"
  });
  labelAlexPay.element.css({
    color: "silver"
  });
  av.step();
  //Slide 12
  pseudo.setCurrentLine("third");
  av.umsg("Now new objects will be added to heap memory");
  labelJohn.hide();
  labelJohnPay.hide();
  labelFirst.hide();
  firstArrow.hide();
  thirdArrow.show();
  var labelThird = av.label("<tt>third</tt>", {top: yPosition + 385 + (lengthSmall / 2) - 20, left: xPosition + 435, stroke: "silver"});
  labelJohn = av.label("John", {top: yPosition + 280, left: xPosition + 545 + (widthSmall / 2) - 10});
  labelJohnPay = av.label("2000", {top: yPosition + 300, left: xPosition + 540 + (widthSmall / 2) - 10});
  var rect3 = av.g.rect(xPosition + 550, yPosition + 385, widthSmall, lengthSmall);
  var labelSam4 = av.label("Sam", {top: yPosition + 385, left: xPosition + 545 + (widthSmall / 2) - 10});
  var labelSamPay4 = av.label("3000", {top: yPosition + 405, left: xPosition + 540 + (widthSmall / 2) - 10});
  av.step();
  //Slide 13
  pseudo.setCurrentLine("secondToFirst");
  av.umsg("Now reference second points to third object. Thus the object (John, 2000) is unreferenced. Now we have 2 objects that are subject to Garbage Collection removal");
  rect2.hide();
  labelThird.hide();
  labelSecond.hide();
  secondArrow.hide();
  thirdArrow.hide();
  rect2 = av.g.rect(xPosition + 550, yPosition + 280, widthSmall, lengthSmall, {stroke: "silver"});
  labelSecond = av.label("<tt>second</tt>", {top: yPosition + 300 + (lengthSmall / 2) + 30, left: xPosition + 430});
  secondArrow = av.g.line(xPosition + 490,  yPosition + (lengthSmall / 2) + 360, xPosition + 540,
            yPosition + (lengthSmall / 2) + 385,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  thirdArrow = av.g.line(xPosition + 490,  yPosition + (lengthSmall / 2) + 410, xPosition + 540,
            yPosition + (lengthSmall / 2) + 390,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  labelThird = av.label("<tt>third</tt>", {top: yPosition + 365 + (lengthSmall / 2) + 20, left: xPosition + 435});
  av.step();
  //Slide 14
  av.umsg();
  var xline1 = av.g.line(xPosition + 530, yPosition + 160, xPosition + 550 + widthSmall + 20, yPosition + 175 + lengthSmall + 10, {"stroke-width": 3});
  var xline2 = av.g.line(xPosition + 550 + widthSmall + 20, yPosition + 160, xPosition + 530, yPosition + 175 + lengthSmall + 10, {"stroke-width": 3});
  var yline1 = av.g.line(xPosition + 530, yPosition + 265, xPosition + 550 + widthSmall + 20, yPosition + 280 + lengthSmall + 10, {"stroke-width": 3});
  var yline2 = av.g.line(xPosition + 550 + widthSmall + 20, yPosition + 265, xPosition + 530, yPosition + 280 + lengthSmall + 10, {"stroke-width": 3});
  av.step();
  //Slide 15
  rect1.hide();
  rect2.hide();
  labelJohn.hide();
  labelJohnPay.hide();
  labelAlex.hide();
  labelAlexPay.hide();
  xline1.hide();
  xline2.hide();
  yline1.hide();
  yline2.hide();
  av.step();
  //Slide 16
  av.umsg();
  pseudo.setCurrentLine("last");
  xline1.hide();
  xline2.hide();
  yline1.hide();
  yline2.hide();
  rect1.hide();
  rect1 = av.g.rect(xPosition + 550, yPosition + 175, widthSmall, lengthSmall);
  rect2.hide();
  firstArrow.show();
  labelFirst = av.label("<tt>last</tt>", {top: yPosition + 175 + (lengthSmall / 2) - 30, left: xPosition + 435});
  labelAlex = av.label("Fox", {top: yPosition + 175, left: xPosition + 550 + (widthSmall / 2) - 15});
  labelAlexPay = av.label("1000", {top: yPosition + 195, left: xPosition + 540 + (widthSmall / 2) - 10});
  av.umsg("Now we need to define a new object but there is not enough space for it. This will trigger Garbage Collector to start looking for objects that are unreferenced. This will lead to removing 3 objects from heap memory. After that the last object will be created in the available space in heap memory");
  av.step();
  //Slide 17
  av.umsg("At the end of this method, there is only one object remaining, which is el. This object will not be selected by Garbage Collector because it is passed to the method and has another reference in another place. The last object will be unreferenced and will be removed by Garbage Collector at any time");
  rect1.hide();
  labelFirst.hide();
  firstArrow.hide();
  rect1 = av.g.rect(xPosition + 550, yPosition + 175, widthSmall, lengthSmall, {stroke: "silver"});
  av.recorded();
});
