/*global JSAV, document */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("Turing3CON", {animationMode: "none"});
  var xleft = 200;
  av.label("$>L$", {top: 50, left: xleft + 100});
  av.label("$\\overline{\\#}$", {top: 0, left: xleft + 115});
  av.label("$\\#$", {top: 35, left: xleft + 160});
  av.label("$M$", {top: 50, left: xleft + 200});
  // Curvy line
  av.g.path(["M", 110 + xleft, 65,
             "C", 100 + xleft, 35,
             150 + xleft, 35,
             120 + xleft, 65].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  // Horizontal arrow
  av.g.line(140 + xleft, 75, 195 + xleft, 75,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});

  av.g.line(260 + xleft, 10, 260 + xleft, 100,
            {"stroke-width": 3});

  // Right part
  av.label("$>L_{\\#}$", {top: 50, left: xleft + 300});
  av.label("$M$", {top: 50, left: xleft + 400});
  // Horizontal arrow
  av.g.line(340 + xleft, 75, 395 + xleft, 75,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});

  av.displayInit();
  av.recorded();
});
