/*global ODSA */
// Written by Sushma Mandava
//variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "examplePointerCodeCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;            // get the code object
  var av = new JSAV(av_name);

  // Slide 1
  var pseudo = av.code(code[0]);
  pseudo.element.css({
    position: "absolute",
    top: -10,
    left: -10
  });
  av.umsg("Allocates three Employee objects and two reference objects. Both reference objects start out as null.")
  pseudo.highlight("empPtr1");
  pseudo.highlight("employee1");
  pseudo.highlight("employee2");
  pseudo.highlight("empPtr2");
  var xPosition = 450;
  var xPosition2 = xPosition + 200;
  var yPositionR1 = 10;
  var yPositionR2 = yPositionR1 + 70;
  var yPositionR3 = yPositionR1 + 140;
  var length1 = 100;
  var width = 30;
  var emp1 = av.g.rect(xPosition, yPositionR1, length1, width + 20);
  var emp2 = av.g.rect(xPosition, yPositionR2, length1, width + 20);
  var emp3 = av.g.rect(xPosition, yPositionR3, length1, width + 20);
  var empptr1 = av.g.rect(xPosition2, yPositionR1, length1, width);
  var empptr1label = av.label("<tt>empPtr1</tt>", {top: yPositionR1 - (width / 2) + 5, left: xPosition2 + length1 + 15});
  var empptr2 = av.g.rect(xPosition2, yPositionR2, length1, width);
  var empptr2label = av.label("<tt>empPtr2</tt>", {top: yPositionR2 - (width / 2) + 5, left: xPosition2 + length1 + 15});
  //av.g.line(xPosition + 135, yPositionR1 + 10, 460, yPositionR1 - 15, {"stroke-width": 3});
  //label for rectangle 1
  var labelJohn = av.label("John", {top: yPositionR1 - (width / 2) + 3, left: xPosition + 28});
  var labelJohnSalary = av.label("1000", {top: yPositionR1 - (width / 2) + 23, left: xPosition + 28});
  //label for rectangle 2
  var labelAlex = av.label("Alex", {top: yPositionR2 - (width / 2) + 3, left: xPosition + 28});
  var labelAlexSalary = av.label("1000", {top: yPositionR2 - (width / 2) + 23, left: xPosition + 28});
  //label for rectangle 3
  var labelNick = av.label("Nick", {top: yPositionR3 - (width / 2) + 3, left: xPosition + 28});
  var labelNickSalary = av.label("5000", {top: yPositionR3 - (width / 2) + 23, left: xPosition + 28});
  //label for rectangle 4 + x's
  var x1 = av.g.line(xPosition2 + 10, yPositionR1 + 25, xPosition2 + 30, yPositionR1 + 3, {"stroke-width": 3});
  var x2 = av.g.line(xPosition2 + 10, yPositionR1 + 3, xPosition2 + 30, yPositionR1 + 25, {"stroke-width": 3});

  var x3 = av.g.line(xPosition2 + 40, yPositionR1 + 25, xPosition2 + 60, yPositionR1 + 3, {"stroke-width": 3});
  var x4 = av.g.line(xPosition2 + 40, yPositionR1 + 3, xPosition2 + 60, yPositionR1 + 25, {"stroke-width": 3});

  var x5 = av.g.line(xPosition2 + 70, yPositionR1 + 25, xPosition2 + 90, yPositionR1 + 3, {"stroke-width": 3});
  var x6 = av.g.line(xPosition2 + 70, yPositionR1 + 3, xPosition2 + 90, yPositionR1 + 25, {"stroke-width": 3});
  //av.g.line(xPosition2 + 20, yPositionR1 - 10, xPosition2 + 50, yPositionR1 - 30, {"stroke-width": 3});

  //label for rectangle 5

  var x7 = av.g.line(xPosition2 + 10, yPositionR2 + 25, xPosition2 + 30, yPositionR2 + 3, {"stroke-width": 3});
  var x8 = av.g.line(xPosition2 + 10, yPositionR2 + 3, xPosition2 + 30, yPositionR2 + 25, {"stroke-width": 3});

  var x9 = av.g.line(xPosition2 + 40, yPositionR2 + 25, xPosition2 + 60, yPositionR2 + 3, {"stroke-width": 3});
  var x10 = av.g.line(xPosition2 + 40, yPositionR2 + 3, xPosition2 + 60, yPositionR2 + 25, {"stroke-width": 3});

  var x11 = av.g.line(xPosition2 + 70, yPositionR2 + 25, xPosition2 + 90, yPositionR2 + 3, {"stroke-width": 3});
  var x12 = av.g.line(xPosition2 + 70, yPositionR2 + 3, xPosition2 + 90, yPositionR2 + 25, {"stroke-width": 3});
  av.displayInit();
  av.step();

  // Slide 2
  av.umsg("The reference objects now have references. Both reference objects now point to Employee objects.")
  pseudo.unhighlight("empPtr1");
  pseudo.unhighlight("employee1");
  pseudo.unhighlight("employee2");
  pseudo.unhighlight("empPtr2");
  pseudo.highlight("emp1");
  pseudo.highlight("emp2");
  x1.hide();
  x2.hide();
  x3.hide();
  x4.hide();
  x5.hide();
  x6.hide();
  x7.hide();
  x8.hide();
  x9.hide();
  x10.hide();
  x11.hide();
  x12.hide();

  //creating the arrows
  var arrow1 = av.g.line(xPosition2 + 20, yPositionR1 + (width / 2), xPosition + length1 + 20, yPositionR1 + (width / 2), {"stroke-width": 2});
  var arrow2 = av.g.line(xPosition2 + 20, yPositionR2 + (width / 2), xPosition + length1 + 20, yPositionR2 + (width / 2), {"stroke-width": 2});
  var arrow1triangle = av.g.polyline([[xPosition + length1 + 20, yPositionR1 + (width / 2) + 4], [xPosition + length1 + 10, yPositionR1 + (width / 2)],
                 [xPosition + length1 + 20, yPositionR1 + (width / 2) - 4]], {fill: "black"});
  var arrow2triangle = av.g.polyline([[xPosition + length1 + 20, yPositionR2 + (width / 2) + 4], [xPosition + length1 + 10, yPositionR2 + (width / 2)],
                 [xPosition + length1 + 20, yPositionR2 + (width / 2) - 4]], {fill: "black"});
  av.step();

  // Slide 3
  av.umsg("Now we mix things up. We retrieve <tt>empPtr2's</tt> reference value and put it in employee2. Then, change <tt>empPtr2</tt> to share with <tt>empPtr1</tt>. Then dereference <tt>empPtr2</tt> to set its reference to Sam")
  pseudo.unhighlight("emp1");
  pseudo.unhighlight("emp2");
  pseudo.highlight("equal");
  pseudo.highlight("equal2");
  pseudo.highlight("sam");

  arrow1.hide();
  arrow1triangle.hide();
  arrow1 = av.g.line(xPosition2 + 20, yPositionR1 + (width / 2), xPosition + length1 + 20, yPositionR1 + (width / 2), {"stroke-width": 2, stroke: "gray"});
  arrow1triangle = av.g.polyline([[xPosition + length1 + 20, yPositionR1 + (width / 2) + 4], [xPosition + length1 + 10, yPositionR1 + (width / 2)],
                 [xPosition + length1 + 20, yPositionR1 + (width / 2) - 4]], {fill: "gray", stroke: "gray"});
  var arrow3 = av.g.line(xPosition2 + 20, yPositionR1 + (width / 2) + 2, xPosition + length1 + 15, yPositionR2 + (width / 2) - 9, {"stroke-width": 2});
  labelAlex.hide();
  labelAlexSalary.hide();
  labelAlex = av.label("Sam", {top: yPositionR2 - (width / 2) + 3, left: xPosition + 28});
  labelAlexSalary = av.label("3000", {top: yPositionR2 - (width / 2) + 23, left: xPosition + 28});
  var x = av.g.line(xPosition + length1 + 40, yPositionR1 + width - 3, xPosition + length1 + 53, yPositionR1 + 3, {"stroke-width": 3});
  var xTwo = av.g.line(xPosition + length1 + 40, yPositionR1 + 3, xPosition + length1 + 53, yPositionR1 + width - 3, {"stroke-width": 3});
  var arrow3triangle = av.g.polyline([[xPosition + length1 + 20, yPositionR2 + (width / 2) - 6], [xPosition + length1 + 7 + 3, yPositionR2 + (width / 2) - 5],
                 [xPosition + length1 + 20 - 5 + 5 - 5, yPositionR2 + (width / 2) - 4 - 3 - 5 - 3]], {fill: "black"});
  av.step();
  //bad PointerSlide
  av.umsg("The dereference is a serious runtime error of type NullPointException");
  pseudo.hide();
  var pseudo1 = av.code(code[1]);
  pseudo1.element.css({
    position: "absolute",
    top: -10,
    left: -10
  });
  pseudo.hide();
  emp1.hide();
  emp2.hide();
  emp3.hide();
  empptr1.hide();
  empptr1label.hide();
  empptr2.hide();
  empptr2label.hide();
  labelJohn.hide();
  labelJohnSalary.hide();
  labelAlex.hide();
  labelAlexSalary.hide();
  labelNick.hide();
  labelNickSalary.hide();
  arrow1.hide();
  arrow2.hide();
  arrow1triangle.hide();
  arrow2triangle.hide();
  x.hide();
  xTwo.hide();
  arrow3.hide();
  arrow3triangle.hide();
  //bad pointer visualization
  var xPositionBAD = 475;
  var xPositionBAD1 = 370;
  var yPositionR1BAD = 10;
  var yPositionR2BAD = 20;
  var length1BAD = 100;
  var widthBAD = 30;

  av.g.rect(xPositionBAD1, yPositionR2BAD, length1BAD, widthBAD);

  //av.g.rect(xPositionBAD, yPositionR1BAD, length1BAD, widthBAD);
  av.label("POW!!!",  {top: yPositionR2BAD + 120, left: xPositionBAD + 190});
  //creating the x's
  av.g.line(xPositionBAD1 + 10, yPositionR2BAD + 25, xPositionBAD1 + 30, yPositionR2BAD + 3, {"stroke-width": 2});
  av.g.line(xPositionBAD1 + 10, yPositionR2BAD + 3, xPositionBAD1 + 30, yPositionR2BAD + 25, {"stroke-width": 2});

  av.g.line(xPositionBAD1 + 40, yPositionR2BAD + 25, xPositionBAD1 + 60, yPositionR2BAD + 3, {"stroke-width": 2});
  av.g.line(xPositionBAD1 + 40, yPositionR2BAD + 3, xPositionBAD1 + 60, yPositionR2BAD + 25, {"stroke-width": 2});

  av.g.line(xPositionBAD1 + 70, yPositionR2BAD + 25, xPositionBAD1 + 90, yPositionR2BAD + 3, {"stroke-width": 2});
  av.g.line(xPositionBAD1 + 70, yPositionR2BAD + 3, xPositionBAD1 + 90, yPositionR2BAD + 25, {"stroke-width": 2});

  av.g.line(xPositionBAD1 + length1BAD - 5, yPositionR2BAD + widthBAD - 3, xPositionBAD1 + length1BAD + 60, yPositionR2BAD + widthBAD + 40, {"stroke-width": 3});
  av.g.polyline([[xPositionBAD1 + length1BAD + 50, yPositionR2BAD + widthBAD + 43], [xPositionBAD1 + length1BAD + 65, yPositionR2BAD + widthBAD + 45],
    [xPositionBAD1 + length1BAD + 69, yPositionR2BAD + widthBAD + 35]], {fill: "black"});
  av.g.polyline([[xPositionBAD + length1BAD + 30, yPositionR1BAD + widthBAD + 55],
    [xPositionBAD + length1BAD - 10, yPositionR1BAD + widthBAD + 95],
    [xPositionBAD + length1BAD + 30, yPositionR1BAD + widthBAD + 125],
    [xPositionBAD + length1BAD - 10, yPositionR1BAD + widthBAD + 155],
    [xPositionBAD + length1BAD + 30, yPositionR1BAD + widthBAD + 185],
    [xPositionBAD + length1BAD + 100, yPositionR1BAD + widthBAD + 210],
    [xPositionBAD + length1BAD + 130, yPositionR1BAD + widthBAD + 170],
    [xPositionBAD + length1BAD + 160, yPositionR1BAD + widthBAD + 210],
    [xPositionBAD + length1BAD + 200, yPositionR1BAD + widthBAD + 150],
    [xPositionBAD + length1BAD + 250, yPositionR1BAD + widthBAD + 120],
    [xPositionBAD + length1BAD + 210, yPositionR1BAD + widthBAD + 110],
    [xPositionBAD + length1BAD + 250, yPositionR1BAD + widthBAD + 50],
    [xPositionBAD + length1BAD + 210, yPositionR1BAD + widthBAD + 35],
    [xPositionBAD + length1BAD + 170, yPositionR1BAD + widthBAD + 15],
    [xPositionBAD + length1BAD + 70, yPositionR1BAD + widthBAD + 12],
    [xPositionBAD + length1BAD + 30, yPositionR1BAD + widthBAD + 55]], {"stroke-width": 3, stroke: "red"});
  av.recorded();
});
