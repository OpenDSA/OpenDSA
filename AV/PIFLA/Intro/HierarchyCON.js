/*global ODSA */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("HierarchyCON", {animationMode: "none"});

  var xStart = 200;
  var yStart = 0;
  av.label("Grammars, etc.", {left: 0 + xStart, top: 0 + yStart});
  av.label("Machines", {left: 395 + xStart, top: 0 + yStart});

  av.label("Unrestricted", {left: 0 + xStart, top: 40 + yStart});
  av.label("grammar", {left: 5 + xStart, top: 55 + yStart});
  av.g.line(70 + xStart, 78 + yStart, 120 + xStart, 95 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.label("All Languages", {left: 195 + xStart, top: 37 + yStart});

  av.label("Turing", {left: 395 + xStart, top: 40 + yStart});
  av.label("machine", {left: 400 + xStart, top: 55 + yStart});
  av.g.line(395 + xStart, 78 + yStart, 355 + xStart, 95 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.label("Recursively Enumerable Language", {left: 125 + xStart, top: 70 + yStart});

  av.label("Context", {left: 0 + xStart, top: 90 + yStart});
  av.label("free", {left: 5 + xStart, top: 105 + yStart});
  av.label("grammar", {left: 5 + xStart, top: 120 + yStart});
  av.g.line(55 + xStart, 120 + yStart, 160 + xStart, 130 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.label("Pushdown", {left: 395 + xStart, top: 90 + yStart});
  av.label("automata", {left: 400 + xStart, top: 105 + yStart});
  av.g.line(390 + xStart, 120 + yStart, 320 + xStart, 130 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.label("Context-free Language", {left: 165 + xStart, top: 105 + yStart});

  av.label("Regular", {left: 210 + xStart, top: 140 + yStart});
  av.label("Language", {left: 205 + xStart, top: 155 + yStart});

  av.label("Regular", {left: 0 + xStart, top: 180 + yStart});
  av.label("grammar", {left: 5 + xStart, top: 195 + yStart});
  av.label("(RegEx)", {left: 5 + xStart, top: 212 + yStart});
  av.g.line(65 + xStart, 220 + yStart, 170 + xStart, 175 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.label("Finite", {left: 395 + xStart, top: 180 + yStart});
  av.label("automata", {left: 400 + xStart, top: 195 + yStart});
  av.g.line(390 + xStart, 205 + yStart, 305 + xStart, 175 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.g.rect(100 + xStart,  45 + yStart, 275, 200);
  av.g.rect(115 + xStart,  80 + yStart, 245, 150);
  av.g.rect(130 + xStart, 115 + yStart, 215, 100);
  av.g.rect(145 + xStart, 150 + yStart, 185, 50);

  av.displayInit();
  av.recorded();
});
