/*global JSAV, document */
// Written by Irena Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("fftCON", {animationMode: "none"});

  
  av.g.circle(275, 120, 75, {"stroke-width": 1.25});
  av.g.circle(575, 120, 75, {"stroke-width": 1.25});

  av.g.line(180, 120, 370, 120);
  av.g.line(275, 25, 275, 215);

  av.g.line(480, 120, 670, 120);
  av.g.line(575, 25, 575, 215);
  av.g.line(507, 52, 642, 187, {"stroke-width": 1.6});
  av.g.line(642, 52, 507, 187, {"stroke-width": 1.6});

  av.label("i", {left: 285, top: 8});
  av.label("-1", {left: 180, top: 80});
  av.label("1", {left: 360, top: 80});
  av.label("-i", {left: 285, top: 185});

  av.label("i", {left: 585, top: 8});
  av.label("-1", {left: 480, top: 80});
  av.label("1", {left: 660, top: 80});
  av.label("-i", {left: 585, top: 185});

  av.displayInit();
  av.recorded();
});
