/*global JSAV, document */
// Written by Sushma Mandava and Aditya Tikhe
$(document).ready(function() {
  "use strict";
  var av = new JSAV("badPointerPowCON", {animationMode: "none"});
  var xPosition = 570;
  var yPositionR1 = 55;
  var length1 = 100;
  var width = 30;

  //right hand side
  av.label("badPointer",  {top: yPositionR1 - 10, left: xPosition - 80});
  av.g.rect(xPosition, yPositionR1, length1, width);

  //left hand side 
  av.label("badPointer",  {top: yPositionR1 - 10, left: xPosition - 530});
  av.g.rect(xPosition - 450, yPositionR1, length1, width);

  //code
  av.label("System.out.println(badPointer.getName());",  {top: yPositionR1 - 62, left: xPosition - 70});
  av.label("Employee badPointer;",  {top: yPositionR1 - 62, left: xPosition - 460});

  //null pointer exception
  av.label("NullPointerException!",  {top: yPositionR1, left: xPosition + 141});
  av.g.line(xPosition + 140, yPositionR1 + 33, xPosition + 275, yPositionR1 + 33, {"stroke-width": 2, stroke: "red"});

  //create the x's right hand side
  av.g.line(xPosition + 10, yPositionR1 + 25, xPosition + 30, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 10, yPositionR1 + 3, xPosition + 30, yPositionR1 + 25, {"stroke-width": 2});
  av.g.line(xPosition + 40, yPositionR1 + 25, xPosition + 60, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 40, yPositionR1 + 3, xPosition + 60, yPositionR1 + 25, {"stroke-width": 2});
  av.g.line(xPosition + 70, yPositionR1 + 25, xPosition + 90, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 70, yPositionR1 + 3, xPosition + 90, yPositionR1 + 25, {"stroke-width": 2});

  //create x's on left hand side
  av.g.line(xPosition + 10 - 450, yPositionR1 + 25, xPosition + 30 - 450, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 10 - 450, yPositionR1 + 3, xPosition + 30 - 450, yPositionR1 + 25, {"stroke-width": 2});
  av.g.line(xPosition + 40 - 450, yPositionR1 + 25, xPosition + 60 - 450, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 40 - 450, yPositionR1 + 3, xPosition + 60 - 450, yPositionR1 + 25, {"stroke-width": 2});
  av.g.line(xPosition + 70 - 450, yPositionR1 + 25, xPosition + 90 - 450, yPositionR1 + 3, {"stroke-width": 2});
  av.g.line(xPosition + 70 - 450, yPositionR1 + 3, xPosition + 90 - 450, yPositionR1 + 25, {"stroke-width": 2});


  //divider down the middle
  av.g.line(425, 5, 425, 140, {"stroke-width": 3});

  //note
  av.label("** no pointee **",  {top: yPositionR1 + 20, left: xPosition + 90 - 410});
  av.label("// badPointer = new Employee(\"Sam\", 1000);",  {top: yPositionR1 + 35, left: xPosition - 470}); 
  av.g.line(xPosition - 470, yPositionR1 + 68, xPosition - 470 + 280, yPositionR1 + 68, {"stroke-width": 2, stroke: "green"});

  av.displayInit();
  av.recorded();
});
