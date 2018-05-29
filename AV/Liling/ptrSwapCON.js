/*global JSAV, document */
// Written by Liling Yuan

$(document).ready(function() {
  "use strict";
  var av = new JSAV("ptrSwapCON", {animationMode: "none"});

  // Boxes and arrows
  var left = 50;
  for (left; left < 150; left += 30) {
    av.g.rect(250, left, 30, 30);
    av.g.rect(470, left, 30, 30);
    av.g.rect(315, left + 5, 80, 20);
    av.g.rect(535, left + 5, 80, 20);
    av.g.line(265, left + 15, 315, left + 15,
              {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  }

  // Arrows on the right
  av.g.line(485, 65, 535, 95, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(485, 95, 535, 65, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(485, 125, 535, 125, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(485, 155, 535, 155, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  // Text labels
  av.label("Key = 42", {left: 325, top: 40});
  av.label("Key = 5", {left: 325, top: 70});
  av.label("Key = 23", {left: 325, top: 100});
  av.label("Key = 10", {left: 325, top: 130});

  av.label("Key = 42", {left: 545, top: 40});
  av.label("Key = 5", {left: 545, top: 70});
  av.label("Key = 23", {left: 545, top: 100});
  av.label("Key = 10", {left: 545, top: 130});

  av.label("(a)", {left: 325, top: 160});
  av.label("(b)", {left: 545, top: 160});
  av.displayInit();
  av.recorded();
});
