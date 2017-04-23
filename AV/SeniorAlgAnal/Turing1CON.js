/*global JSAV, document */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("Turing1CON", {animationMode: "none"});
  var xleft = 250;
  av.label("$>M_1$", {top: 10, left: xleft + 100});
  av.label("$M_2$", {top: 10, left: xleft + 200});
  av.label("$M_3$", {top: 90, left: xleft + 115});
  av.label("$a$", {top: -5, left: xleft + 160});
  av.label("$b$", {top: 50, left: xleft + 110});
  // Vertical arrow
  av.g.line(125 + xleft, 50, 125 + xleft, 100,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  // Horizontal arrow
  av.g.line(140 + xleft, 35, 195 + xleft, 35,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  av.displayInit();
  av.recorded();
});
