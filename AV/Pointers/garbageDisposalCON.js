/*global ODSA */
// Written by Sushma Mandava and Cliff Shaffer
// garbage collector
//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "garbageDisposalCON";
  var av = new JSAV(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object

  var xPosition = 50;
  var yPosition = -25;
  var widthBig = 300;
  var lengthBig = 290;
  var widthSmall = 120;
  var lengthSmall = 55;

  //creating the arrows
  var e1Arrow = av.g.line(xPosition + 490, yPosition + (lengthSmall / 2) + 60,
                          xPosition + 540, yPosition + (lengthSmall / 2) + 60,
                          {"arrow-end": "classic-wide-long", "stroke-width": 2});
  var firstArrow = av.g.line(xPosition + 490, yPosition + (lengthSmall / 2) + 130,
                             xPosition + 540, yPosition + (lengthSmall / 2) + 130,
                             {"arrow-end": "classic-wide-long", "stroke-width": 2});
  var secondArrow = av.g.line(xPosition + 490, yPosition + (lengthSmall / 2) + 200,
                              xPosition + 540, yPosition + (lengthSmall / 2) + 200,
                              {"arrow-end": "classic-wide-long", "stroke-width": 2});
  var thirdArrow = av.g.line(xPosition + 490, yPosition + (lengthSmall / 2) + 270,
                             xPosition + 540, yPosition + (lengthSmall / 2) + 270,
                             {"arrow-end": "classic-wide-long", "stroke-width": 2});
  e1Arrow.hide();
  firstArrow.hide();
  secondArrow.hide();
  thirdArrow.hide();

  var pseudo = av.code(code[0]);

  // Slide 1
  av.umsg("Let's look at a small demonstration of how garbage collection works.");
  av.label("heap", {top: yPosition + 10, left: xPosition + 570});
  av.label("Locals", {top: yPosition + 10, left: xPosition + 430});
  av.g.rect(xPosition + 430 + 70, yPosition + 50, widthBig - 70, lengthBig);
  av.displayInit();
  av.step();

  // Slide 2
  pseudo.setCurrentLine("methodCall");
  av.umsg("The method is called with the parameter <tt>e1</tt>. <tt>e1</tt> is a local variable, but the object that it references is in heap memory.");
  e1Arrow.show();
  av.label("<tt>e1</tt>", {top: yPosition + 60 + (lengthSmall / 2) - 30, left: xPosition + 450});
  av.g.rect(xPosition + 550, yPosition + 60, widthSmall, lengthSmall);
  av.label("Ali", {top: yPosition + 50, left: xPosition + 550 + (widthSmall / 2) - 10});
  av.label("5000", {top: yPosition + 70, left: xPosition + 540 + (widthSmall / 2) - 10});
  av.step();

  // Slide 3
  av.umsg("Reference variable <tt>first</tt> is a local variable, but the object that it points to is dynamically allocated from heap memory.");
  pseudo.setCurrentLine("first");
  var rect1 = av.g.rect(xPosition + 550, yPosition + 130, widthSmall, lengthSmall);
  var labelAlex = av.label("Alex", {top: yPosition + 120,
                                    left: xPosition + 550 + (widthSmall / 2) - 15});
  var labelAlexPay = av.label("1500", {top: yPosition + 140,
                                       left: xPosition + 530 + (widthSmall / 2)});
  firstArrow.show();
  var labelFirst = av.label("<tt>first</tt>", {top: yPosition + 100 + (lengthSmall / 2),
                                               left: xPosition + 435});
  av.step();

  // Slide 4
  av.umsg("Reference variable <tt>second</tt> is a local variable, but the object that it points to is dynamically allocated from heap memory.");
  pseudo.setCurrentLine("second");
  var rect2 = av.g.rect(xPosition + 550, yPosition + 200, widthSmall, lengthSmall);
  var labelJohn = av.label("John", {top: yPosition + 190, left: xPosition + 531 + (widthSmall / 2)});
  var labelJohnPay = av.label("2000", {top: yPosition + 210,
                                       left: xPosition + 530 + (widthSmall / 2)});
  secondArrow.show();
  var labelSecond = av.label("<tt>second</tt>", {top: yPosition + 170 + (lengthSmall / 2),
                                                 left: xPosition + 430});
  av.step();

  // Slide 5
  av.umsg("When we set <tt>first</tt> to be null, this leaves the object <tt>(Alex, 1500)</tt> unreferenced. The garbage collector may remove it anytime it feels that it has to empty space in heap memory"); 
  pseudo.setCurrentLine("null");
  firstArrow.hide();
  rect1.addClass("silver");
  labelAlex.addClass("silver");
  labelAlexPay.addClass("silver");
  av.step();

  // Slide 6
  av.umsg("Now we'll add another new object.");
  pseudo.setCurrentLine("third");
  thirdArrow.show();
  var rect3 = av.g.rect(xPosition + 550, yPosition + 270, widthSmall, lengthSmall);
  var labelThird = av.label("<tt>third</tt>", {top: yPosition + 240 + (lengthSmall / 2),
                                                 left: xPosition + 430});
  var labelSam = av.label("Sam", {top: yPosition + 260, left: xPosition + 535 + (widthSmall / 2)});
  var labelSamPay = av.label("3000", {top: yPosition + 280, left: xPosition + 530 + (widthSmall / 2)});
  av.step();

  //Slide 7
  av.umsg("Now we set reference <tt>second</tt> to point to reference <tt>third</tt>'s object. That leaves the object (John, 2000) unreferenced. Now we have two objects that are subject to Garbage Collection removal.");
  pseudo.setCurrentLine("secondToFirst");
  secondArrow.hide();
  var secondArrowNew = av.g.line(xPosition + 490, yPosition + (lengthSmall / 2) + 200,
                                 xPosition + 540, yPosition + (lengthSmall / 2) + 270,
                                 {"arrow-end": "classic-wide-long", "stroke-width": 2});
  rect2.addClass("silver");
  labelJohn.addClass("silver");
  labelJohnPay.addClass("silver");
  av.step();

  // Slide 8
  av.umsg("Now we are ready to create another new object...");
  pseudo.setCurrentLine("last");
  av.step();

  // Slide 9
  av.umsg("But let's imagine that there is insufficient room in the heap to create it. Now is the time for the garbage collector to act. It will find the two objects that are no longer referenced.");
  var xline1 = av.g.line(xPosition + 540, yPosition + 120, xPosition + 560 + widthSmall, yPosition + 140 + lengthSmall, {"stroke-width": 3});
  var xline2 = av.g.line(xPosition + 540, yPosition + 140 + lengthSmall, xPosition + 560 + widthSmall, yPosition + 120, {"stroke-width": 3});
  var xline3 = av.g.line(xPosition + 540, yPosition + 190, xPosition + 560 + widthSmall, yPosition + 210 + lengthSmall, {"stroke-width": 3});
  var xline4 = av.g.line(xPosition + 540, yPosition + 210 + lengthSmall, xPosition + 560 + widthSmall, yPosition + 190, {"stroke-width": 3});
  av.step();

  //Slide 10
  av.umsg("Once found, this space can be freed up.");
  xline1.hide();
  xline2.hide();
  xline3.hide();
  xline4.hide();
  rect1.hide();
  rect2.hide();
  labelJohn.hide();
  labelJohnPay.hide();
  labelAlex.hide();
  labelAlexPay.hide();
  av.step();

  // Slide 11
  av.umsg("And now space is available for a new object");
  rect1.removeClass("silver");
  rect1.show();
  var labelLast = av.label("<tt>last</tt>", {top: yPosition + 140 + (lengthSmall / 2),
                                               left: xPosition + 435});
  var labelFox = av.label("Fox", {top: yPosition + 120,
                                    left: xPosition + 550 + (widthSmall / 2) - 15});
  var labelFoxPay = av.label("1000", {top: yPosition + 140,
                                       left: xPosition + 530 + (widthSmall / 2)});
  var lastArrow = av.g.line(xPosition + 490, yPosition + (lengthSmall / 2) + 170,
                             xPosition + 540, yPosition + (lengthSmall / 2) + 130,
                             {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.recorded();
});
