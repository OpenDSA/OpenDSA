/*global JSAV, document */
// Written by Sushma Mandava and Cliff Shaffer
//variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "employeePtr2CON";
  var av = new JSAV(av_name);

  var xPosition = 550;
  var yPositionR1 = 10;
  var yPositionR2 = 75;
  var yPositionR3 = 120;
  var length1 = 100;
  var width = 35;
  var label1 = av.label('<tt>Employee empPtr = johnRef;</tt>', 
                        {top: 20, left: 20}).hide();
  var label2 = av.label('<tt>Employee johnRef = new Employee("John", 1000);</tt>', 
                        {top: 0, left: 20}).hide();
  var thePath = av.g.path(["M", xPosition + length1 - 10, yPositionR2 + (width / 2),
                           "C", xPosition + length1 + 40, yPositionR2 + (width / 2) + 5,
                           xPosition + length1 + 35, yPositionR2 - 10,
                           xPosition + length1 + 5, yPositionR1 + width - 10].join(","),
                          {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  thePath.hide();

  // Slide 1
  av.umsg("We could assign our reference variable to the same value as another reference variable, as in this picture.");

  av.g.rect(xPosition, yPositionR1, length1, width + 20);
  av.g.rect(xPosition, yPositionR2, length1, width);

  //gv.g.line(230, 150, 100, 400, {"stroke-width": 3});
  av.label("John", {top: yPositionR1 - 8, left: xPosition + 30});
  av.label("1000", {top: yPositionR1 + 12, left: xPosition + 30});
  av.label("<tt>empPtr</tt>",  {top: yPositionR2 - 5, left: xPosition - 55});
  thePath.show();
  av.step();
  av.displayInit();

  // Slide 2
  av.umsg("We can do this with the following code:");
  label1.show();
  av.step();

  // Slide 3
  av.umsg("Of course, this begs the question of how the reference <tt>johnRef</tt> got its value (its pointee) in the first place.");
  av.step();

  // Slide 4
  av.umsg("We could, for example, create an Employee object with the <tt>new</tt> operator, as follows:");
  label2.show();
  av.recorded();
});
