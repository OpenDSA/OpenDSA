/*global JSAV, document */
// Written by Sushma Mandava and Milen John
// variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "employeeEmpRefCON";
  var av = new JSAV(av_name);
  var xPosition = 150;
  var yPositionR1 = 15;
  var yPositionR2 = 115;
  var length1 = 100;
  var width = 30;
  var pointerArrow = av.g.line(xPosition + 280, yPositionR1 +6.5, xPosition + 320, yPositionR1 +6.5, 
    {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    pointerArrow.hide();
  //Slide 1
  av.umsg("Based on the data types variables are stored differently. Basic data types like floats and ints are stored very simply.");
  av.step();
  av.displayInit();

  //Slide 2
  av.umsg("These data types are called primitive data types because they don't need a reference.");
  var int = av.label('<tt>num</tt>', {top: -10, left: 185}).hide(); 
  var num = av.label('<tt>50</tt>', {top: -10, left: 255}).hide(); 
  var double = av.label('<tt>float</tt>', {top: -10, left: 430}).hide(); 
  var doubleNum = av.label('<tt>50.0</tt>', {top: -10, left: 510}).hide(); 
  var rect = av.g.rect(xPosition + 70, yPositionR1 - 14, length1, width);
  var rect1 = av.g.rect(xPosition + 330, yPositionR1 - 14, length1, width);
  int.show();
  num.show();
  double.show();
  doubleNum.show();
  av.step()
  
  //Slide 3
  av.umsg("Non primitive types like arrays and objects, need a reference variable to point to the object.");
  int.hide();
  num.hide();
  double.hide();
  doubleNum.hide();
  rect.hide();
  rect1.hide();
  var rect = av.g.rect(xPosition + 170, yPositionR1 - 10, length1, width);
  var num = av.label('<tt>ref</tt>', {top: -5, left: 280}); 
  av.step();

  //Slide 4
  av.umsg("Reference variables work very differently, it has a pointer that references to the object.");
  int.hide();
  double.hide();
  doubleNum.hide();
  rect1.hide();
  var rect1 = av.g.rect(xPosition + 330, yPositionR1 - 14.7, length1+40, width+12);
  var num = av.label('<tt>John</tt>', {top: -13, left: 520}); 
  var num1 = av.label('<tt>1000</tt>', {top: 4, left: 520}); 
  
  
  pointerArrow.show();
  av.recorded();
  /* av.g.rect(xPosition, yPositionR1, length1, width + 20);
  av.g.rect(xPosition, yPositionR2, length1, width);
  //pointer lines
  av.g.line(xPosition + 120, yPositionR1 + (width / 2) - 5, xPosition + 150,
            yPositionR1 - 15, {"stroke-width": 3, stroke: "gray"});
  av.g.line(xPosition + 120, yPositionR2 + (width / 2) + 5, xPosition + 150,
            yPositionR2 + width + 15, {"stroke-width": 3, stroke: "gray"});

  //text
  av.label("<tt>empRef</tt>", {top: yPositionR2 - (width / 2) + 5, left: xPosition - 46});
  av.label("A simple <tt>Employee</tt> object. The current value is the string `John` for the name and 1000 for the salary. This object also plays the role of pointee for <tt>empRef</tt>. ",
           {top: yPositionR1 - 55, left: xPosition + 155});
  av.label("A reference variable. The current value is a reference to the <tt>Employee</tt> object in the box above.",
           {top: yPositionR2 + width - 15, left: xPosition + 155});
  av.g.path(["M", xPosition + length1 - 10, yPositionR2 + (width / 2),
             "C", xPosition + length1 + 40, yPositionR2 + (width / 2) + 5,
             xPosition + length1 + 35, yPositionR2 - 10,
             xPosition + length1 + 2, yPositionR1 + width - 5].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  av.label("John", {top: yPositionR1 - (width / 2) + 5, left: xPosition + 30});
  av.label("1000", {top: yPositionR1 - (width / 2) + 25, left: xPosition + 30});
  av.displayInit();
  av.recorded(); */
});
