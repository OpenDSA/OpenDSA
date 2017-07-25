/*global JSAV, document */
// Written by Cliff Shaffer
$(document).ready(function() {
  "use strict";

  var av_name = "memoryModelCON";
  var av = new JSAV(av_name, {animationMode: "none"});

  // Control the position of the visualization
  var xPosition = 200;
  var yPosition = 50;

  av.label('<tt>Employee myRef = new Employee("Sam", 1000);</tt>',
           {top: 0, left: 20});

  av.g.rect(xPosition + 75, yPosition, 90, 30);
  av.label("<tt>myRef</tt>",  {top: yPosition - 10, left: xPosition + 35});
  av.label("2000", {top: yPosition - 10, left: xPosition + 100});

  av.g.line(xPosition, yPosition + 70, xPosition + 500, yPosition + 70);
  av.g.line(xPosition, yPosition + 100, xPosition + 500, yPosition + 100);
  av.g.line(xPosition + 50, yPosition + 70, xPosition + 50, yPosition + 100);
  av.g.line(xPosition + 150, yPosition + 70, xPosition + 150, yPosition + 100);
  av.label("Memory", {top: yPosition + 60, left: xPosition - 70});
  av.label("2000", {top: yPosition + 35, left: xPosition + 50});
  av.label('"Sam", 1000', {top: yPosition + 60, left: xPosition + 60});

  av.displayInit();
  av.recorded();
});
