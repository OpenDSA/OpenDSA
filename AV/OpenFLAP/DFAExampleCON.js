$(document).ready(function() {
  "use strict";
  var av = new JSAV("DFAExampleCON", {animationMode: "none"});

  var xStart = 0;
  var yStart = 0;
  av.label("input tape", {left: 0 + xStart, top: 0 + yStart});
  var rectangleHeight = 30;
  var rectangleWidth = 300;
  av.g.rect(xStart, yStart + 50, rectangleWidth, rectangleHeight);

  var difference = 30;
  var x = 30;
  var strings = ["a", "a", "b", "b", "a", "b"];
  while (x !== 300){
    av.g.line(xStart + x, yStart + 50, xStart + x, yStart + 50 + rectangleHeight);
    if (x / difference < 6){
      av.label(strings[(x/difference) - 1], {left: xStart + x - (difference/2), top: yStart + 50});
    }
    if (x / difference == 7){
      av.label("head moves", {left: xStart + x, top: yStart + 50 + (rectangleHeight/2)+20});
    }
    x = x + difference;
  }

  var squareHeight = 90;
  var squareWidth = 90;
  av.label("current state", {left: xStart + 40 + 5, top: yStart + + 20 + rectangleHeight + 40 + 5});
  av.g.rect(xStart + 40, yStart + 40 + rectangleHeight + 40, squareWidth, squareHeight);
  av.g.circle(xStart + 40 + (squareWidth/2), yStart + 50 + rectangleHeight + 40 + ((squareHeight-10)/2), 30);

  av.displayInit();
  av.recorded();
});
