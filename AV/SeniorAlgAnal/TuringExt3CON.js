/*global JSAV, document */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("TuringExt3CON", {animationMode: "none"});
  var xleft = 375;
  var ytop = 10;
  var cellwidth = 20;
  var i;

  for (i = 0; i < 5; i++) {
    av.g.line(xleft,                 ytop + i * cellwidth,
              xleft + 5 * cellwidth, ytop + i * cellwidth,
              {"stroke-width": 2});
    av.g.line(xleft + i * cellwidth, ytop,
              xleft + i * cellwidth, ytop + 5 * cellwidth,
              {"stroke-width": 2});
    av.g.line(xleft + (i + 1) * cellwidth, ytop,
              xleft                      , ytop + (i + 1) * cellwidth,
              {"stroke-width": 1, "arrow-end":"classic-wide-long"});
  }

  av.displayInit();
  av.recorded();
});
