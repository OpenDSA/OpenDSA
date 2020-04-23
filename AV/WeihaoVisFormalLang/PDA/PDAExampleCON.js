$(document).ready(function() {
    "use strict";
    var av_name = "PDAExampleCON";
    var av = new JSAV(av_name, {animationMode: "none"});
  
    var xStart = 260;
    var yStart = 40;
    av.label("input tape", {left: xStart + 40, top: yStart - 45});
    var strings = ["a", "a", "a", "a", "b", "b", "", "", "", "", ""];
    av.ds.tape(strings, xStart, yStart, "right");
    // av.ds.array(strings, {left: xStart, top: yStart});
  
    av.g.line(xStart + 80, yStart + 95, xStart + 80, yStart + 35,
              {"arrow-end": "classic-wide-long"});
    av.label("tape head", {left: xStart + 5, top: yStart + 25});
    var rectangleHeight = 30;
    var squareHeight = 90;
    var squareWidth = 90;
    av.label("current state", {left: xStart + 45, top: yStart + rectangleHeight + 50});
    av.g.rect(xStart + 40, yStart + 25 + rectangleHeight + 40, squareWidth, squareHeight);
    av.g.circle(xStart + 40 + (squareWidth / 2), yStart + 35 + rectangleHeight + 40 + ((squareHeight - 10) / 2), 30);
    av.g.line(xStart + 40 + (squareWidth / 2), yStart + 155, xStart + 90, yStart + 145,
              {"arrow-end": "classic-wide-long"});
    av.label("1", {left: xStart + 90, top: yStart + rectangleHeight + 85});
    av.label("0", {left: xStart + 70, top: yStart + rectangleHeight + 85});
  
    av.label("head moves", {left: xStart + 150, top: yStart + 25});
    av.g.line(xStart + 240, 50 + yStart, 275 + xStart, 50 + yStart,
              {"arrow-end": "classic-wide-long"});

    av.g.rect(xStart + 200, yStart + 50 + rectangleHeight + 40, squareWidth / 2, squareHeight / 4);
    av.g.rect(xStart + 200, yStart + 50 + rectangleHeight + 40 + squareHeight / 4, squareWidth / 2, squareHeight / 4);
    av.g.rect(xStart + 200, yStart + 50 + rectangleHeight + 40 + squareHeight / 2, squareWidth / 2, squareHeight / 4);

    av.label("a", {left: xStart + 200 + squareWidth/4, top: yStart + 50 + rectangleHeight + 25});
    av.label("a", {left: xStart + 200 + squareWidth/4, top: yStart + 50 + rectangleHeight + 25 + squareHeight / 4});
    av.label("Z", {left: xStart + 200 + squareWidth/4, top: yStart + 50 + rectangleHeight + 25 + squareHeight / 2});
    av.label("Stack", {left: xStart + 250 + squareWidth/4, top: yStart + 50 + rectangleHeight + 25});
    av.g.line(xStart + 43 + squareWidth, yStart + 45 + rectangleHeight + 40 + squareHeight / 5,
        xStart + 200 - 5, yStart + 45 + rectangleHeight + 40 + squareHeight / 5,
        {"arrow-end": "classic-wide-long"});
  
    av.displayInit();
    av.recorded();
  });
  