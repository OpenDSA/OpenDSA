$(document).ready(function() {
  "use strict";
  var av = new JSAV("DFAExample", {animationMode: "none"});

  var xStart = 0;
  var yStart = 0;
  av.label("input tape", {left: 0 + xStart, top: 0 + yStart});
  var rectangleHeight = 30;
  var rectangleWidth = 150;
  av.g.rect(xStart, yStart + 20, rectangleWidth, rectangleHeight);
  /*
  var x = 15;
  var strings = ["a", "a", "b", "b", "a", "b"];
  while (x !== 150){
    av.g.line(xStart + x, yStart + 20, xStart + x, yStart + 20 + rectangleHeight);
    if (x % 15 < 6){
      av.label(strings[(x%15) - 1], {left: xStart + x, top: yStart + 20 + (rectangleHeight/2)});
    }
    if (x % 15 == 7){
      av.label("head moves", {left: xStart + x, top: yStart + 20 + (rectangleHeight/2)} + 20);
    }
    x = x + 15;
  }
  var squareHeight = 60;
  var squareWidth = 50;
  av.label("current state", {left: xStart + 40 + 5, top: yStart + + 20 + rectangleHeight + 40 + 5});
  av.g.rect(xStart + 40, yStart + 20 + rectangleHeight + 40, squareWidth, squareHeight);
  avg.g.circle(xStart + 40 + squareWidth/2, yStart + 20 + rectangleHeight + 40 + ((squareHeight-10)/2));
  av.g.line()*/
  av.displayInit();
  av.recorded();

}
