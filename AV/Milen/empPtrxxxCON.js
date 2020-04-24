/*global JSAV, document */
// Written by Sushma Mandava and Milen John
//variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "empPtrxxxCON";
  var av = new JSAV(av_name);
  var label1 = av.label('<tt>Employee ref;</tt>', {top: 0, left: 200}).hide(); 
  var label2 = av.label('<tt>Employee ref = new Employee("Sam, 1000);</tt>', {top: 0, left: 125}).hide(); 
  var label3 = av.label('<tt>Sam</tt>', {top: -10, left: 600}).hide(); 
  var label4 = av.label('<tt>1000</tt>', {top: 10, left: 600}).hide(); 
  var label5 = av.label('<tt>ref</tt>', {top: 0, left: 450}).hide();
  var xPosition = 400;
  var yPositionR1 = 10;
  var length1 = 100;
  var width = 30;
  var badArrow = av.g.line(xPosition -75, yPositionR1 + 17, xPosition -15, yPositionR1 + 17, 
    {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  var newArrow = av.g.line(xPosition +90, yPositionR1 + 17, xPosition +165, yPositionR1 + 17, 
      {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Slide 1 
  
  av.umsg("At first, the references are uninitialized or null which can cause serious errors.");
  badArrow.hide();
  newArrow.hide();
  var rect = av.g.rect(xPosition, yPositionR1, length1, width);
  //creating the x's
  var line1 = av.g.line(xPosition + 10, yPositionR1 + 25, xPosition + 30, yPositionR1 + 3, {"stroke-width": 2});
  var line2 = av.g.line(xPosition + 10, yPositionR1 + 3, xPosition + 30, yPositionR1 + 25, {"stroke-width": 2});

  var line3 = av.g.line(xPosition + 40, yPositionR1 + 25, xPosition + 60, yPositionR1 + 3, {"stroke-width": 2});
  var line4 = av.g.line(xPosition + 40, yPositionR1 + 3, xPosition + 60, yPositionR1 + 25, {"stroke-width": 2});

  var line5 = av.g.line(xPosition + 70, yPositionR1 + 25, xPosition + 90, yPositionR1 + 3, {"stroke-width": 2});
  var line6 = av.g.line(xPosition + 70, yPositionR1 + 3, xPosition + 90, yPositionR1 + 25, {"stroke-width": 2});
 
  
  av.step();
  av.displayInit();
  

  //Slide 2
  av.umsg("The unreferenced object is known as the bad reference.");
  label1.show();
  badArrow.show();
  av.step()

  //Slide 3
  av.umsg("We don't want bad references so assigning it a pointee is the key")
  line1.hide();
  line2.hide();
  line3.hide();
  line4.hide();
  line5.hide();
  line6.hide();
  rect.hide();
  badArrow.hide();
  newArrow.show();
  var rect2 = av.g.rect(xPosition+175, yPositionR1 -10 , length1, width+20);
  rect2.show();
  label2.show();
  label3.show();
  label4.show();
  av.step()
  
  //Slide 4
  av.umsg("So in the end the reference is pointing to the object.");
  label2.hide();
  label1.hide()
  label5.show();
  av.recorded();
});
