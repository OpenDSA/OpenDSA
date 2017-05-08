/*global JSAV, document */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("TuringCopyCON", {animationMode: "none"});
  var xleft = 250;
  var ytop = 25;
  av.label("$R$", {top: 10 + ytop, left: xleft + 120});
  av.label("$\\# R^{2}_{\\#} \\sigma L^{2}_{\\#} \\sigma$", {top: 10 + ytop, left: xleft + 200});
  av.label("$R_{\\#}$", {top: 90 + ytop, left: xleft + 115});
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
  av.g.polyline([[xleft + 275, 35 + ytop], [xleft + 295, 35 + ytop],
                 [xleft + 295, 0 + ytop], [xleft + 125, 0 + ytop],
                 [xleft + 125, 25 + ytop]], 
                {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  av.displayInit();
  av.recorded();
});
