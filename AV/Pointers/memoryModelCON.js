/*global JSAV, document */
// Written by Cliff Shaffer
$(document).ready(function() {
  "use strict";

  var av_name = "memoryModelCON";
  var av = new JSAV(av_name, {animationMode: "none"});

  // Control the position of the visualization
  var xPosition = 500;
  var yPosition = 80;

  av.label("The code that we write:", {top: 0, left: 80});
  av.label('<tt>Employee myRef = new Employee("Sam", 1000);</tt>',
           {top: 0, left: 250});
  av.g.line(xPosition - 100, yPosition - 20, xPosition - 100, yPosition + 100,
            {"stroke-width": 3});

  // Left panel
  av.label("What we typically draw:", {top: 30, left: 20});
  av.g.rect(75, yPosition, 90, 30);
  av.label("Sam", {top: yPosition + 20, left: 230});
  av.label("1000", {top: yPosition + 40, left: 230});
  av.label("<tt>myRef</tt>",  {top: yPosition - 10, left: 35});
  av.g.line(125, yPosition + 15, 200, yPosition + 50,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.rect(200, yPosition + 30, 100, 55);


  // Right panel
  av.label("Something closer to the truth:", {top: 30, left: xPosition - 20});
  av.g.rect(xPosition + 75, yPosition, 90, 30);
  av.label("<tt>myRef</tt>",  {top: yPosition - 10, left: xPosition + 35});
  av.label("2000", {top: yPosition - 10, left: xPosition + 100});

  av.g.line(xPosition, yPosition + 70, xPosition + 300, yPosition + 70);
  av.g.line(xPosition, yPosition + 100, xPosition + 300, yPosition + 100);
  av.g.line(xPosition + 50, yPosition + 70, xPosition + 50, yPosition + 100);
  av.g.line(xPosition + 150, yPosition + 70, xPosition + 150, yPosition + 100);
  av.label("Memory", {top: yPosition + 60, left: xPosition - 70});
  av.label("2000", {top: yPosition + 35, left: xPosition + 50});
  av.label('"Sam", 1000', {top: yPosition + 60, left: xPosition + 60});

  av.displayInit();
  av.recorded();
});
