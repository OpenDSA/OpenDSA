/*global ODSA */
// Written by Sushma Mandava and Cliff SHaffer
//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "examplePointerCodeCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;            // get the code object
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg("Now that we have the syntax (such as it is defined), let's take a look at some code that demonstrates all of the reference rules.")
  var pseudo = av.code(code[0]);
  pseudo.element.css({
    position: "absolute",
    top: -10,
    left: -10
  });
  av.displayInit();
  av.step();

  // Slide 2
  av.umsg("First, let's create two references to Employee objects. Both reference objects start out as <tt>null</tt>, whether we say so explicitly or not.")
  pseudo.highlight("empPtr1");
  pseudo.highlight("empPtr2");
  var xPosition = 450;
  var xPosition2 = xPosition + 200;
  var yPositionR1 = 10;
  var yPositionR2 = yPositionR1 + 70;
  var yPositionR3 = yPositionR1 + 140;
  var length1 = 100;
  var width = 30;
  var empptr1 = av.g.rect(xPosition2, yPositionR1, length1, width);
  var empptr1label = av.label("<tt>empPtr1</tt>", {top: yPositionR1 - (width / 2) + 5, left: xPosition2 + length1 + 15});
  var empptr2 = av.g.rect(xPosition2, yPositionR2, length1, width);
  var empptr2label = av.label("<tt>empPtr2</tt>", {top: yPositionR2 - (width / 2) + 5, left: xPosition2 + length1 + 15});

  var slashptr1 = av.g.line(xPosition2, yPositionR2,
                            xPosition2 + 100, yPositionR2 + 30,
                            {"stroke-width": 2});
  var qmark = av.label("?", {top: yPositionR1 - 28, left: xPosition2 + 45}).css({"font-size": "24px"});

  av.step();

  // Slide 3
  av.umsg("Now we give pointees to each of our references. We do this by creating new <tt>Employee</tt> objects.");
  pseudo.unhighlight("empPtr1");
  pseudo.unhighlight("empPtr2");
  pseudo.highlight("newEmployee1");
  pseudo.highlight("newEmployee2");
  slashptr1.hide();
  qmark.hide();
  var emp1 = av.g.rect(xPosition, yPositionR1, length1, width + 20);
  var emp2 = av.g.rect(xPosition, yPositionR2, length1, width + 20);
  var labelJohn = av.label("John", {top: yPositionR1 - (width / 2) + 3, left: xPosition + 28});
  var labelJohnSalary = av.label("1000", {top: yPositionR1 - (width / 2) + 23, left: xPosition + 28});
  var labelAlex = av.label("Alex", {top: yPositionR2 - (width / 2) + 3, left: xPosition + 28});
  var labelAlexSalary = av.label("1000", {top: yPositionR2 - (width / 2) + 23, left: xPosition + 28});
  var arrow1 = av.g.line(xPosition2 + 20, yPositionR1 + (width / 2),
                         xPosition + length1, yPositionR1 + (width / 2),
                         {"arrow-end": "classic-wide-long", "stroke-width": 2});
  var arrow2 = av.g.line(xPosition2 + 20, yPositionR2 + (width / 2),
                         xPosition + length1, yPositionR2 + (width / 2),
                         {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.step();

  // Slide 4
  av.umsg("Now we'll mix things up. First, let's make another reference variable, and set it to reference the same object that <tt>empPtr2</tt> references.");
  pseudo.unhighlight("newEmployee1");
  pseudo.unhighlight("newEmployee2");
  pseudo.highlight("employee1");
  var employee1 = av.g.rect(xPosition2, yPositionR3, length1, width);
  var employee1label = av.label("<tt>employee1</tt>", {top: yPositionR2 - (width / 2) + 75, left: xPosition2 + length1 + 15});
  var arrow3 = av.g.line(xPosition2 + 20, yPositionR3 + (width / 2),
                         xPosition + length1, yPositionR2 + (width / 2) + 10,
                         {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.step();

  // Slide 5
  av.umsg("We just retrieved <tt>empPtr2's</tt> reference value and put it in <tt>employee1</tt>.");
  av.step();

  // Slide 6
  av.umsg("Now, change <tt>empPtr2</tt> to share with <tt>empPtr1</tt>.");
  pseudo.unhighlight("employee1");
  pseudo.highlight("equal");
  arrow2.hide();
  var arrow4 = av.g.line(xPosition2 + 20, yPositionR2 + (width / 2),
                         xPosition + length1, yPositionR1 + (width / 2) + 10,
                         {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.step();

  // Slide 7
  av.umsg("Finally, we are going to change the value for the name of the <tt>Employee</tt> that <tt>empPtr2</tt> now points at.");
  pseudo.unhighlight("equal");
  pseudo.highlight("sam");
  labelJohn.hide();
  var labelSam = av.label("Sam", {top: yPositionR1 - (width / 2) + 3, left: xPosition + 28});
  av.recorded();
});
