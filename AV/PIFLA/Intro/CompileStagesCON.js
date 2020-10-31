/*global ODSA */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("CompileStagesCON", {animationMode: "none"});

  var xStart = 370;
  var yStart = 0;
  av.label("Program", {left: 35 + xStart, top: 0 + yStart});
  av.g.line(60 + xStart, 40 + yStart, 60 + xStart, 68 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.g.rect(0 + xStart, 70 + yStart, 125, 40);
  av.label("lexical analysis", {left: 15 + xStart, top: 65 + yStart});

  av.label("tokens", {left: 70 + xStart, top: 100 + yStart});

  av.g.line(60 + xStart, 110 + yStart, 60 + xStart, 138 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.g.rect(0 + xStart, 140 + yStart, 125, 40);
  av.label("syntactic analysis", {left: 8 + xStart, top: 135 + yStart});

  av.label("parse tree", {left: 70 + xStart, top: 170 + yStart});

  av.g.line(60 + xStart, 180 + yStart, 60 + xStart, 208 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.g.rect(0 + xStart, 210 + yStart, 125, 40);
  av.label("code generation", {left: 10 + xStart, top: 205 + yStart});

  av.g.line(60 + xStart, 250 + yStart, 60 + xStart, 278 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.label("Assembly Language (C++)", {left: -20 + xStart, top: 270 + yStart});
  av.label("Byte Code (Java)", {left: 10 + xStart, top: 290 + yStart});

  av.displayInit();
  av.recorded();
});
