/*global JSAV, document */
// Written by Liling Yuan

$(document).ready(function() {
  "use strict";
  var av = new JSAV("ptrSwapCON", {animationMode: "none"});

  // Boxes and arrows
  var top = 20;
  for (var pos = top; pos < 120; pos += 30) {
    av.g.rect(250, pos, 30, 30);
    av.g.rect(470, pos, 30, 30);
    av.g.rect(315, pos + 5, 80, 20);
    av.g.rect(535, pos + 5, 80, 20);
    av.g.line(265, pos + 15, 315, pos + 15,
              {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  }

  // Arrows on the right
  av.g.line(485, top + 15, 535, top + 45, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(485, top + 45, 535, top + 15, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(485, top + 75, 535, top + 75, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(485, top + 105, 535, top + 105, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  // Text labels
  av.label("Key = 42", {left: 325, top: top - 10});
  av.label("Key = 5", {left: 325, top: top + 20});
  av.label("Key = 23", {left: 325, top: top + 50});
  av.label("Key = 10", {left: 325, top: top + 80});

  av.label("Key = 42", {left: 545, top: top - 10});
  av.label("Key = 5", {left: 545, top: top + 20});
  av.label("Key = 23", {left: 545, top: top + 50});
  av.label("Key = 10", {left: 545, top: top + 80});

  av.label("(a)", {left: 325, top: top + 115});
  av.label("(b)", {left: 545, top: top + 115});
  av.displayInit();
  av.recorded();
});
