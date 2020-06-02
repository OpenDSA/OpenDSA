// Written by Milan Bhatia, Fall 2019
$(document).ready(function() {
  "use strict";
  var av = new JSAV("OddNumbersTraceCON", {animationMode: "none"});

  var xStart = 135;
  var yStart = 5;

  av.label("1)", {left: 0 + xStart, top: 0 + yStart});
  av.ds.tape([1, 0, 0, "", "", "", ""], 30 + xStart, yStart + 20, "right");
  av.g.rect(30 + xStart, 100 + yStart, 110, 80);
  av.label("q0", {left: 50 + xStart, top: 105 + yStart});
  av.label("q1", {left: 50 + xStart, top: 135 + yStart});
  av.g.line(45 + xStart, 100 + yStart, 45 + xStart, 55 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.g.line(100 + xStart, 145 + yStart, 70 + xStart, 135 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.label("2)", {left: 320 + xStart, top: 0 + yStart});
  av.ds.tape([1, 0, 0, "", "", "", ""], 350 + xStart, yStart + 20, "right");
  av.g.rect(350 + xStart, 100 + yStart, 110, 80);
  av.label("q0", {left: 370 + xStart, top: 105 + yStart});
  av.label("q1", {left: 370 + xStart, top: 135 + yStart});
  av.g.line(395 + xStart, 100 + yStart, 395 + xStart, 55 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.g.line(420 + xStart, 145 + yStart, 390 + xStart, 135 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.label("3)", {left: 0 + xStart, top: 180 + yStart});
  av.ds.tape([1, 0, 0, "", "", "", ""], 30 + xStart, yStart + 200, "right");
  av.g.rect(30 + xStart, 270 + yStart, 110, 80);
  av.label("q0", {left: 50 + xStart, top: 275 + yStart});
  av.label("q1", {left: 50 + xStart, top: 305 + yStart});
  av.g.line(105 + xStart, 270 + yStart, 105 + xStart, 235 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.g.line(100 + xStart, 315 + yStart, 70 + xStart, 325 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.label("4)", {left: 320 + xStart, top: 180 + yStart});
  av.ds.tape([1, 0, 0, "", "", "", ""], 350 + xStart, yStart + 200, "right");
  av.g.rect(410 + xStart, 270 + yStart, 110, 80);
  av.label("q0", {left: 430 + xStart, top: 275 + yStart});
  av.label("q1", {left: 430 + xStart, top: 305 + yStart});
  av.g.line(455 + xStart, 270 + yStart, 455 + xStart, 235 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.g.line(480 + xStart, 315 + yStart, 450 + xStart, 325 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.displayInit();
  av.recorded();
});
