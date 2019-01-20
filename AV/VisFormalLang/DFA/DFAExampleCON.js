//Galina Belolipetski
$(document).ready(function() {
  "use strict";
  var av = new JSAV("DFAExampleCON", {animationMode: "none"});

  var xStart = 260;
  var yStart = 70;
  av.label("input tape", {left: xStart + 60, top: yStart - 20});
  var strings = ["a", "a", "b", "b", "a", "b", "", "", "", "", ""];
  av.ds.array(strings, {left: xStart, top: yStart});

  av.g.line(xStart + 80, yStart + 110, xStart + 80, 50 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.label("tape head", {left: xStart + 10, top: yStart + 50});
  var rectangleHeight = 30;
  var squareHeight = 90;
  var squareWidth = 90;
  av.label("current state", {left: xStart + 45, top: yStart + rectangleHeight + 65});
  av.g.rect(xStart + 40, yStart + 40 + rectangleHeight + 40, squareWidth, squareHeight);
  av.g.circle(xStart + 40 + (squareWidth / 2), yStart + 50 + rectangleHeight + 40 + ((squareHeight - 10) / 2), 30);
  av.g.line(xStart + 40 + (squareWidth / 2), yStart + 160, xStart + 90, yStart + 150,
            {"arrow-end": "classic-wide-long"});
  av.label("1", {left: xStart + 90, top: yStart + rectangleHeight + 85});
  av.label("0", {left: xStart + 70, top: yStart + rectangleHeight + 85});

  av.label("head moves", {left: xStart + 150, top: yStart + 50});
  av.g.line(xStart + 240, 75 + yStart, 275 + xStart, 75 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.displayInit();
  av.recorded();
});
