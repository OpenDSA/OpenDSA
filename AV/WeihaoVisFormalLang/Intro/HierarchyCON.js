/*global ODSA */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("HierarchyCON", {animationMode: "none"});

  var xStart = 250;
  var yStart = 0;
  av.label("Grammars, etc.", {left: 0 + xStart, top: 0 + yStart});
  av.label("Machines", {left: 320 + xStart, top: 0 + yStart});

  av.label("Unrestricted", {left: 0 + xStart, top: 40 + yStart});
  av.label("grammar", {left: 5 + xStart, top: 55 + yStart});
  av.g.line(65 + xStart, 78 + yStart, 130 + xStart, 95 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.label("All Languages", {left: 155 + xStart, top: 37 + yStart});

  av.label("Turing", {left: 320 + xStart, top: 40 + yStart});
  av.label("machine", {left: 325 + xStart, top: 55 + yStart});
  av.g.line(320 + xStart, 78 + yStart, 270 + xStart, 95 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.label("Rec. Enum. Lang.", {left: 145 + xStart, top: 70 + yStart});

  av.label("CFG", {left: 10 + xStart, top: 90 + yStart});
  av.g.line(45 + xStart, 115 + yStart, 140 + xStart, 145 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.label("Pushdown", {left: 320 + xStart, top: 90 + yStart});
  av.label("automata", {left: 325 + xStart, top: 105 + yStart});
  av.g.line(323 + xStart, 127 + yStart, 260 + xStart, 145 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.label("Context-free Lang.", {left: 145 + xStart, top: 105 + yStart});

  av.label("Regular", {left: 170 + xStart, top: 140 + yStart});
  av.label("Language", {left: 165 + xStart, top: 155 + yStart});

  av.label("Regular", {left: 0 + xStart, top: 180 + yStart});
  av.label("grammar", {left: 5 + xStart, top: 195 + yStart});
  av.label("(RegEx)", {left: 5 + xStart, top: 212 + yStart});

  av.g.line(65 + xStart, 220 + yStart, 155 + xStart, 175 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.label("Finite", {left: 320 + xStart, top: 180 + yStart});
  av.label("automata", {left: 325 + xStart, top: 195 + yStart});
  av.g.line(340 + xStart, 197 + yStart, 240 + xStart, 175 + yStart,
            {"arrow-end": "classic-wide-long"});

  av.g.rect(100 + xStart,  45 + yStart, 200, 200);
  av.g.rect(115 + xStart,  80 + yStart, 170, 150);
  av.g.rect(130 + xStart, 115 + yStart, 140, 100);
  av.g.rect(145 + xStart, 150 + yStart, 110, 50);

  av.displayInit();
  av.recorded();
});
