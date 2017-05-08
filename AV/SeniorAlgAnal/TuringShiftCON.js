/*global JSAV, document */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("TuringShiftCON", {animationMode: "none"});
  var xleft = 250;
  var ytop = 20;
  av.label("$R$", {top: 10 + ytop, left: xleft + 120});
  av.label("$L \\sigma R$", {top: 10 + ytop, left: xleft + 200});
  av.label("$L\\#$", {top: 90 + ytop, left: xleft + 115});
  av.label("$\\overline{\\#}$", {top: -5 + ytop, left: xleft + 160});
  av.label("$\\#$", {top: 45 + ytop, left: xleft + 105});
  av.label("$>L_{\\#}$", {top: 10 + ytop, left: xleft + 20});
  // Vertical arrow
  av.g.line(125 + xleft, 50 + ytop, 125 + xleft, 100 + ytop,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  // Horizontal arrow
  av.g.line(140 + xleft, 35 + ytop, 195 + xleft, 35 + ytop,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  // Horizontal arrow
  av.g.line(60 + xleft, 35 + ytop, 115 + xleft, 35 + ytop,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  av.g.polyline([[xleft + 235, 35 + ytop], [xleft + 255, 35 + ytop],
                 [xleft + 255, 0 + ytop], [xleft + 125, 0 + ytop],
                 [xleft + 125, 25 + ytop]], 
                {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  av.displayInit();
  av.recorded();
});
