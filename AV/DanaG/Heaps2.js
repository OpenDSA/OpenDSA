$(document).ready(function() {
  "use strict";
  var av = new JSAV("heapsAgain", animationMode: "none"});

  //Circle
  var circleY = 30;
  var circleX = 200;
  var lineEndY = circleY + 45;
  var leftEndX = circleX - 30;
  var rightEndX = circleX + 45;
  av.g.circle(circleX, circleY, 15);
  av.label("R", {left:circleX - 10, top: circleY - 10});

  //Connector lines
  av.g.line(circleX, circleY + 15, leftEndX, lineEndY, {"stroke-width": 2});
  av.g.line(circleX, circleY + 15, rightEndX, lineEndY, {"stroke-width": 2});

  //Triangles
  av.g.line(rightEndX, lineEndY, rightEndX - 8, lineEndY + 15, {"stroke-width": 3});
  av.g.line(rightEndX, lineEndY, rightEndX + 8, lineEndY + 15, {"stroke-width": 3});  
  av.g.line(rightEndX - 8, lineEndY + 15, rightEndX + 8, lineEndY + 15, {"stroke-width": 3});
  av.g.line(leftEndX, lineEndY, rightEndX - 8, lineEndY + 15, {"stroke-width": 3});
  av.g.line(leftEndX, lineEndY, rightEndX + 8, lineEndY + 15, {"stroke-width": 3});  
  av.g.line(leftEndX - 8, lineEndY + 15, rightEndX + 8, lineEndY + 15, {"stroke-width": 3});

  //Triangle labels
  av.label("H1", {left: leftEndX - 4, top: lineEndY + 4});
  av.label("H2", {left: rightEndX - 4, top: lineEndY + 4});


  av.displayInit();
  av.recorded();
});