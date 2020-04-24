/*global JSAV, document */
// Written by Sushma Mandava and Aditya Tikhe and Milen John
$(document).ready(function() {
  "use strict";
  var av_name = "badPointerPowCON";
  var av = new JSAV(av_name);
  var xPosition = 550;
  var yPositionR1 = 10;
  var yPositionR2 = 75;
  var yPositionR3 = 120;
  var length1 = 100;
  var width = 35;
  /* var xPositionBAD = 650;
  var yPositionBAD = 15;
  var polygon = av.g.polyline([[xPositionBAD, yPositionBAD],
    [xPositionBAD + 5, yPositionBAD - 10],
    [xPositionBAD + 10, yPositionBAD + 10],
    [xPositionBAD + 15, yPositionBAD - 20],
    [xPositionBAD + 30, yPositionBAD + 10],
    [xPositionBAD + 50, yPositionBAD + 0],
    [xPositionBAD + 75, yPositionBAD + 5],
    [xPositionBAD + 100, yPositionBAD + 15],
    [xPositionBAD + 60, yPositionBAD + 25],
    [xPositionBAD + 80, yPositionBAD + 30],
    [xPositionBAD + 50, yPositionBAD + 40],
    [xPositionBAD + 40, yPositionBAD + 70],
    [xPositionBAD + 35, yPositionBAD + 40],
    [xPositionBAD + 15, yPositionBAD + 50],
    [xPositionBAD + 0, yPositionBAD + 30],
    [xPositionBAD - 20, yPositionBAD + 25],
    [xPositionBAD, yPositionBAD]],
   {"stroke-width": 3, stroke: "red"}); */
  var label1 = av.label('<tt>Employee badPointer;</tt>', 
                        {top: 0, left: 225}).hide();
  var label2 = av.label('<tt>System.out.println(badPointer.getName());</tt>', 
                        {top: 0, left: 50}).hide();
  var label3 = av.label("NullPointerException",  {top: 0, left: 620}).hide();
  var pointerArrow = av.g.line(xPosition + 10, yPositionR1 + 17, xPosition + 60, yPositionR1 + 17, 
    {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  pointerArrow.hide();

  // Slide 1
  av.umsg("We first allocate the reference to a variable.");
  label1.show();
  //polygon.hide();
  //badPointer + rectangle
  var pointerLabel = av.label("badPointer",  {top: yPositionR1 - 10, left: xPosition - 80}).hide();
  av.g.rect(xPosition -100, yPositionR1, length1, width);

  //xs 
  av.g.line(xPosition + -90, yPositionR1 + 25, xPosition + -70, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + -90, yPositionR1 + 3, xPosition + -70, yPositionR1 + 25, {"stroke-width": 2});
  av.g.line(xPosition + -60, yPositionR1 + 25, xPosition + -40, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + -60, yPositionR1 + 3, xPosition + -40, yPositionR1 + 25, {"stroke-width": 2});
  av.g.line(xPosition + -30, yPositionR1 + 25, xPosition + -10, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + -30, yPositionR1 + 3, xPosition + -10, yPositionR1 + 25, {"stroke-width": 2});
  av.step();
  av.displayInit();
  

  // Slide 2
  av.umsg("The badPointer doesn't point to anything!");
  pointerArrow.show();
  av.step();

  // Slide 3
  // Explosion
  av.umsg("In the end, if we run this code we end up with a NullPointerException.");
  label1.hide();
  label2.show();
  label3.show();
  av.g.ellipse(690, 25, 78, 23, {stroke: "red", "stroke-width": 3}); 
  //av.displayInit();
  av.recorded();
});

