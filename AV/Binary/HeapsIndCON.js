// Written by Dana Gurland, Fall 2019
$(document).ready(function() {
  "use strict";
  var av = new JSAV("HeapsIndCON", {animationMode: "none"});

  //Circle
  var circleY = 30;
  var circleX = 450;
  var lineEndY = circleY + 65;
  var leftEndX = circleX - 75;
  var rightEndX = circleX + 75;
  var radius = 20;
  av.g.circle(circleX, circleY, radius, {"stroke-width": 2});
  av.label("R", {left: circleX - 6, top: circleY - 25});

  //Connector lines
  av.g.line(circleX, circleY + radius, leftEndX, lineEndY, {"stroke-width": 1});
  av.g.line(circleX, circleY + radius, rightEndX, lineEndY, {"stroke-width": 1});

  //Triangles
  av.g.line(rightEndX, lineEndY, rightEndX - radius - 5, lineEndY + 2 * radius, {"stroke-width": 2});
  av.g.line(rightEndX, lineEndY, rightEndX + radius + 5, lineEndY + 2 * radius, {"stroke-width": 2});
  av.g.line(rightEndX - radius - 5, lineEndY + 2 * radius, rightEndX + radius + 5, lineEndY + 2 * radius, {"stroke-width": 2});
  av.g.line(leftEndX, lineEndY, leftEndX - radius - 5, lineEndY + 2 * radius, {"stroke-width": 2});
  av.g.line(leftEndX, lineEndY, leftEndX + radius + 5, lineEndY + 2 * radius, {"stroke-width": 2});
  av.g.line(leftEndX - radius - 5, lineEndY + 2 * radius, leftEndX + radius + 5, lineEndY + 2 * radius, {"stroke-width": 2});

  //Triangle labels
  av.label("H1", {left: leftEndX - 8, top: lineEndY + 4});
  av.label("H2", {left: rightEndX - 8, top: lineEndY + 4});

  av.displayInit();
  av.recorded();
});
