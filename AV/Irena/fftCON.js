/*global JSAV, document */
// Written by Irena Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("fftCON", {animationMode: "none"});

  av.g.circle(275, 140, 75, {"stroke-width": 1.25});
  av.g.circle(575, 140, 75, {"stroke-width": 1.25});

  av.g.line(180, 140, 370, 140);
  av.g.line(275, 45, 275, 235);

  av.g.line(480, 140, 670, 140);
  av.g.line(575, 45, 575, 235);
  av.g.line(507, 72, 642, 207, {"stroke-width": 1});
  av.g.line(642, 74, 507, 207, {"stroke-width": 1});

  av.label("$i$", {left: 273, top: 5});
  av.label("$-1$", {left: 150, top: 114});
  av.label("$1$", {left: 380, top: 114});
  av.label("$-i$", {left: 265, top: 225});

  av.label("$i$", {left: 573, top: 5});
  av.label("$-1$", {left: 455, top: 114});
  av.label("$1$", {left: 675, top: 114});
  av.label("$-i$", {left: 568, top: 225});

  av.label("$\\sqrt i$", {left: 650, top: 38});
  av.label("$i\\sqrt i$", {left: 475, top: 38});
  av.label("$-\\sqrt i$", {left: 470, top: 195});
  av.label("$-1\\sqrt i$", {left: 645, top: 195});

  av.displayInit();
  av.recorded();
});
