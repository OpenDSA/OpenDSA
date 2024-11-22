// Written by Cliff Shaffer, November 2024
$(document).ready(function() {
  "use strict";
  var av = new JSAV("MatMulDependCON");
  
  var numRows = 4;
  var numCols = 4;
  var xoffset = 200;
  var yoffset = 0;
  var bx = 70;
  var by = 60;

  av.label("$A$", {left: 0 + xoffset, top: 40 + yoffset});
  av.label("$B$", {left: 0 + xoffset, top: 100 + yoffset});
  av.label("$C$", {left: 0 + xoffset, top: 160 + yoffset});
  av.label("$D$", {left: 0 + xoffset, top: 220 + yoffset});

  av.label("$A$", {left: 50 + xoffset, top: 2 + yoffset});
  av.label("$B$", {left: 50 + bx + xoffset, top: 2 + yoffset});
  av.label("$C$", {left: 50 + 2* bx + xoffset, top: 2 + yoffset});
  av.label("$D$", {left: 50 + 3 * bx + xoffset, top: 2 + yoffset});

  for (var i = 0; i < numCols; i++) {
    // Boxes for the top row with the array letters
    av.g.rect((xoffset + 20) + (i * bx), yoffset + 20, bx, 15);
    // Boxes for the computation nodes
    for (var j = 0; j < numRows; j++) {
      av.g.rect((xoffset + 20) + (i * bx), (yoffset + 35) + (j * by), bx, by);
    }
  }

  av.g.rect(xoffset + 30, yoffset + 45, 52, 20,{"fill": "blue"});
  av.g.rect(xoffset + 30, yoffset + 65, 52, 20, {"fill": "red"});
  av.label("m: A, A", {left: xoffset + 32, top: yoffset + 28})
    .css({"color": "white", "z-index": 1000});
  av.label("m: 0", {left: xoffset + 32, top: yoffset + 48})
    .css({"color": "white", "z-index": 1000});

  av.g.rect(xoffset + 30 + bx, yoffset + 45, 52, 20,{"fill": "blue"});
  av.g.rect(xoffset + 30 + bx, yoffset + 65, 52, 20, {"fill": "red"});
  av.label("m: A, B", {left: xoffset + 32 + bx, top: yoffset + 28})
    .css({"color": "white", "z-index": 1000});
  av.label("m: 24", {left: xoffset + 32 + bx, top: yoffset + 48})
    .css({"color": "white", "z-index": 1000});

  av.g.rect(xoffset + 30 + 2 * bx, yoffset + 45, 52, 20,{"fill": "blue"});
  av.g.rect(xoffset + 30 + 2 * bx, yoffset + 65, 52, 20, {"fill": "red"});
  av.label("m: A, C", {left: xoffset + 32 + 2 *bx, top: yoffset + 28})
    .css({"color": "white", "z-index": 1000});
  av.label("m: 28", {left: xoffset + 32 + 2 * bx, top: yoffset + 48})
    .css({"color": "white", "z-index": 1000});

  av.g.rect(xoffset + 30 + 3 * bx, yoffset + 45, 52, 20,{"fill": "blue"});
  av.g.rect(xoffset + 30 + 3 * bx, yoffset + 65, 52, 20, {"fill": "red"});
  av.label("m: A, D", {left: xoffset + 32 + 3 * bx, top: yoffset + 28})
    .css({"color": "white", "z-index": 1000});
  av.label("m: 58", {left: xoffset + 32 + 3 * bx, top: yoffset + 48})
    .css({"color": "white", "z-index": 1000});

  av.g.rect(xoffset + 30 + bx, yoffset + 45 + by, 52, 20,{"fill": "blue"});
  av.g.rect(xoffset + 30 + bx, yoffset + 65 + by, 52, 20, {"fill": "red"});
  av.label("m: B, B", {left: xoffset + 32 + bx, top: yoffset + 28 + by})
    .css({"color": "white", "z-index": 1000});
  av.label("m: 0", {left: xoffset + 32 + bx, top: yoffset + 48 + by})
    .css({"color": "white", "z-index": 1000});

  av.g.rect(xoffset + 30 + 2 * bx, yoffset + 45 + by, 52, 20,{"fill": "blue"});
  av.g.rect(xoffset + 30 + 2 * bx, yoffset + 65 + by, 52, 20, {"fill": "red"});
  av.label("m: B, C", {left: xoffset + 32 + 2 * bx, top: yoffset + 28 + by})
    .css({"color": "white", "z-index": 1000});
  av.label("m: 16", {left: xoffset + 32 + 2 * bx, top: yoffset + 48 + by})
    .css({"color": "white", "z-index": 1000});

  av.g.rect(xoffset + 30 + 3 * bx, yoffset + 45 + by, 52, 20,{"fill": "blue"});
  av.g.rect(xoffset + 30 + 3 * bx, yoffset + 65 + by, 52, 20, {"fill": "red"});
  av.label("m: B, D", {left: xoffset + 32 + 3 * bx, top: yoffset + 28 + by})
    .css({"color": "white", "z-index": 1000});
  av.label("m: 36", {left: xoffset + 32 + 3 * bx, top: yoffset + 48 + by})
    .css({"color": "white", "z-index": 1000});

  av.g.rect(xoffset + 30 + 2 * bx, yoffset + 45 + 2 * by, 52, 20,{"fill": "blue"});
  av.g.rect(xoffset + 30 + 2 * bx, yoffset + 65 + 2 * by, 52, 20, {"fill": "red"});
  av.label("m: C, C", {left: xoffset + 32 + 2 * bx, top: yoffset + 28 + 2 * by})
    .css({"color": "white", "z-index": 1000});
  av.label("m: 0", {left: xoffset + 32 + 2 * bx, top: yoffset + 48 + 2 * by})
    .css({"color": "white", "z-index": 1000});

  av.g.rect(xoffset + 30 + 3 * bx, yoffset + 45 + 2 * by, 52, 20,{"fill": "blue"});
  av.g.rect(xoffset + 30 + 3 * bx, yoffset + 65 + 2 * by, 52, 20, {"fill": "red"});
  av.label("m: C, D", {left: xoffset + 32 + 3 * bx, top: yoffset + 28 + 2 * by})
    .css({"color": "white", "z-index": 1000});
  av.label("m: 40", {left: xoffset + 32 + 3 * bx, top: yoffset + 48 + 2 * by})
    .css({"color": "white", "z-index": 1000});

  av.g.rect(xoffset + 30 + 3 * bx, yoffset + 45 + 3 * by, 52, 20,{"fill": "blue"});
  av.g.rect(xoffset + 30 + 3 * bx, yoffset + 65 + 3 * by, 52, 20, {"fill": "red"});
  av.label("m: D, D", {left: xoffset + 32 + 3 * bx, top: yoffset + 28 + 3 * by})
    .css({"color": "white", "z-index": 1000});
  av.label("m: 0", {left: xoffset + 32 + 3 * bx, top: yoffset + 48 + 3 * by})
    .css({"color": "white", "z-index": 1000});

  av.g.line(xoffset + 100, yoffset + 65, xoffset + 83, yoffset + 65, {"arrow-end": "classic-wide-long"});
  av.g.line(xoffset + 100 + bx, yoffset + 65, xoffset + 83 + bx, yoffset + 65, {"arrow-end": "classic-wide-long"});
  av.g.line(xoffset + 100 + 2 * bx, yoffset + 65, xoffset + 83 + 2 * bx, yoffset + 65, {"arrow-end": "classic-wide-long"});
  av.g.line(xoffset + 100 + bx, yoffset + 65 + by, xoffset + 83 + bx, yoffset + 65 + by, {"arrow-end": "classic-wide-long"});
  av.g.line(xoffset + 100 + 2 * bx, yoffset + 65 + by, xoffset + 83 + 2 * bx, yoffset + 65 + by, {"arrow-end": "classic-wide-long"});
  av.g.line(xoffset + 100 + 2 * bx, yoffset + 65 + 2 * by, xoffset + 83 + 2 * bx, yoffset + 65 + 2 * by, {"arrow-end": "classic-wide-long"});

  av.g.line(xoffset + 127, yoffset + 85, xoffset + 127, yoffset + 103, {"arrow-end": "classic-wide-long"});
  av.g.line(xoffset + 127 + bx, yoffset + 85, xoffset + 127 + bx, yoffset + 103, {"arrow-end": "classic-wide-long"});
  av.g.line(xoffset + 127 + 2 * bx, yoffset + 85, xoffset + 127 + 2 * bx, yoffset + 103, {"arrow-end": "classic-wide-long"});
  av.g.line(xoffset + 127 + bx, yoffset + 85 + by, xoffset + 127 + bx, yoffset + 103 + by, {"arrow-end": "classic-wide-long"});
  av.g.line(xoffset + 127 + 2 * bx, yoffset + 85 + by, xoffset + 127 + 2 * bx, yoffset + 103 + by, {"arrow-end": "classic-wide-long"});
  av.g.line(xoffset + 127 + 2 * bx, yoffset + 85 + 2 * by, xoffset + 127 + 2 * bx, yoffset + 103 + 2 * by, {"arrow-end": "classic-wide-long"});

  av.g.path("M 450 50 A 100 25 0 0 0 285 45",{"arrow-end": "classic-wide-long"});
  av.g.path("M 450 50 A 100 50 0 0 0 335 44",{"arrow-end": "classic-wide-long"});
  av.g.path("M 380 50 A 100 50 0 0 0 265 44",{"arrow-end": "classic-wide-long"});
  av.g.path("M 450 110 A 100 50 0 0 0 335 104",{"arrow-end": "classic-wide-long"});
  
  av.g.path("M 450 85 A 100 75 90 0 0 450 222",{"arrow-end": "classic-wide-long"});
  av.g.path("M 450 85 A 100 250 90 0 0 450 162",{"arrow-end": "classic-wide-long"});
  av.g.path("M 450 145 A 100 250 90 0 0 450 222",{"arrow-end": "classic-wide-long"});
  av.g.path("M 380 85 A 100 250 90 0 0 380 162",{"arrow-end": "classic-wide-long"});

  av.displayInit();
  av.recorded();
});
