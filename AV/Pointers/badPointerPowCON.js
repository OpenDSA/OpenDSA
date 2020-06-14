/*global JSAV, document */
// Written by Cliff Shaffer
// Based on earlier versions by Sushma Mandava and Aditya Tikhe and Milen John
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
  var ptrline = av.g.line(xPosition - 130, yPositionR1 + 50 + width/2,
            xPosition - 30, yPositionR1 + 50 + width/2,
            {"arrow-end": "classic-wide-long",
             opacity: 100, "stroke-width": 2});
  ptrline.hide();

  var xPositionBAD = 540;
  var yPositionBAD = 55;
  var polygon = av.g.polyline([[xPositionBAD, yPositionBAD],
    [xPositionBAD + 5, yPositionBAD - 10],
    [xPositionBAD + 10, yPositionBAD + 10],
    [xPositionBAD + 15, yPositionBAD - 20],
    [xPositionBAD + 30, yPositionBAD + 10],
    [xPositionBAD + 50, yPositionBAD + 0],
    [xPositionBAD + 75, yPositionBAD + 5],
    [xPositionBAD + 200, yPositionBAD + 15],
    [xPositionBAD + 160, yPositionBAD + 25],
    [xPositionBAD + 180, yPositionBAD + 30],
    [xPositionBAD + 50, yPositionBAD + 40],
    [xPositionBAD + 40, yPositionBAD + 70],
    [xPositionBAD + 35, yPositionBAD + 40],
    [xPositionBAD + 15, yPositionBAD + 50],
    [xPositionBAD + 10, yPositionBAD + 35],
    [xPositionBAD - 20, yPositionBAD + 25],
    [xPositionBAD, yPositionBAD]],
   {"stroke-width": 3, stroke: "red"});
  polygon.hide();
  
  // Slide 1
  av.umsg("At first, <tt>badPointer</tt> points to nothing because it is uninitialized.");
  var code1 = av.label('<tt>Employee badPointer;</tt>', 
                       {top: -10, left: 145});
  av.label("badPointer", {top: yPositionR1 + 40,
                          left: xPosition - 280});
  var rect1 = av.g.rect(xPosition - 180, yPositionR1 + 50, length1, width);
  var nullslash = av.g.line(xPosition - 180, yPositionR1 + 50,
                            xPosition - 80, yPositionR1 + width + 50);
  av.displayInit();

  // Slide 2
  // Explosion
  av.umsg("Because the reference doesn't point to anything, trying to follow it gives us a null pointer exception");
  nullslash.hide();
  code1.hide
  av.label('<tt>System.out.println(badPointer.getName());</tt>', 
           {top: 10, left: 145});
  ptrline.show();
  av.label("NullPointerException",  {top: 50, left: 550});
//  av.g.ellipse(680, 27, 78, 25, {stroke: "red", "stroke-width": 3}); 
  polygon.show();
  av.recorded();
});
