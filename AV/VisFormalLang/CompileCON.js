/*global ODSA */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("CompileCON", {animationMode: "none"});

  var xStart = 250;
  var yStart = 0;
  av.label("Java program", {left: 0 + xStart, top: 0 + yStart});
  av.label("executable", {left: 290 + xStart, top: 0 + yStart});
  av.label("Prog.java", {left: 10 + xStart, top: 40});
  av.label("Prog.class", {left: 290 + xStart, top: 40});
  av.g.line(80 + xStart, 65 + yStart, 130 + xStart, 65 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.g.rect(132 + xStart, 45 + yStart, 100, 40);
  av.g.line(232 + xStart, 65 + yStart, 280 + xStart, 65 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.displayInit();
  av.recorded();
});
