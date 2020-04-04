/*global JSAV, document */
// Written by Sushma Mandava and Aditya Tikhe
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
  var label1 = av.label('<tt>Employee badPointer;</tt>', 
                        {top: 0, left: 20}).hide();
  var label2 = av.label('<tt>System.out.println(badPointer.getName());</tt>', 
                        {top: 20, left: 20}).hide();

  var pointerArrow = av.g.line(xPosition + 110, yPositionR1 + 17, xPosition + 150, yPositionR1 + 17, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  pointerArrow.hide();

  // Slide 1
  av.umsg("We can allocate the reference to a variable.");
  label1.show();

  //badPointer + rectangle
  av.label("badPointer",  {top: yPositionR1 - 10, left: xPosition - 80});
  av.g.rect(xPosition, yPositionR1, length1, width);

  //xs 
  av.g.line(xPosition + 10, yPositionR1 + 25, xPosition + 30, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 10, yPositionR1 + 3, xPosition + 30, yPositionR1 + 25, {"stroke-width": 2});
  av.g.line(xPosition + 40, yPositionR1 + 25, xPosition + 60, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 40, yPositionR1 + 3, xPosition + 60, yPositionR1 + 25, {"stroke-width": 2});
  av.g.line(xPosition + 70, yPositionR1 + 25, xPosition + 90, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 70, yPositionR1 + 3, xPosition + 90, yPositionR1 + 25, {"stroke-width": 2});

  av.displayInit();
  av.step();

  // Slide 2
  av.umsg("We ignore the pointee, thus badPointer doesn't point to anything!");
  pointerArrow.show();
  av.step();


  // Slide 3
  av.umsg(" If we try to run this piece of code:");
  pointerArrow.hide();
  av.label("NullPointerException!",  {top: yPositionR1, left: xPosition + 141});
  av.g.line(xPosition + 145, yPositionR1 + 33, xPosition + 275, yPositionR1 + 33, {"stroke-width": 2, stroke: "red"});
  label2.show();
  av.recorded();
});
