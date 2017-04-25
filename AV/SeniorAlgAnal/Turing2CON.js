/*global JSAV, document */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("Turing2CON", {animationMode: "none"});
  var xleft = 300;
  av.label("$>R$", {top: 50, left: xleft + 100});
  av.label("$\\overline{\\#}$", {top: 0, left: xleft + 115});
  // Curvy line
  av.g.path(["M", 110 + xleft, 65,
             "C", 100 + xleft, 35,
             150 + xleft, 35,
             120 + xleft, 65].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});

  av.displayInit();
  av.recorded();
});
