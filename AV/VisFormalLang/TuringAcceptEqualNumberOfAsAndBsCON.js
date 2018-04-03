/*global JSAV, document */
// Written by Cliff Shaffer
function drawLoop(x1, y1, x2, y2, av){
  av.g.polyline([ [x1+20, y1],
                 [x1 + 20, y1 - 30], [x2, y1-30],
                 [x2, y2]],
                {"stroke-width": 2, "arrow-end":"classic-wide-long"});
}
$(document).ready(function() {
  "use strict";
  var av = new JSAV("TuringAcceptEqualNumberOfAsAndBsCON", {animationMode: "none"});
  var xleft = 250;
  var ytop = 25;
  var space = 25;
  av.label("$L$", {top: 10 + ytop, left: xleft - space});
  av.label("$\\#$", {top: 10 + ytop, left: xleft});
  av.label("$R_{\\#}$", {top: 10 + ytop, left: xleft + space});
  av.label("$\\sigma$", {top: 10 + ytop, left: xleft + 3 * space});
  av.label("$L_{\\#}$", {top: 10 + ytop, left: xleft + 4 * space});
  av.label("$\\sigma$", {top: 10 + ytop, left: xleft + 6 * space});
  var x1 = xleft + 6 * space - 5;
  var y1 = 50 + ytop ;
  var x2 = xleft - space+5;
  var y2 = 50 + ytop;
  drawLoop(x1,y1,x2,y2, av);
  av.label("$\\overline{\\#}$", {top: -50 + ytop, left: xleft + 3*space});
  av.g.line(xleft + 7 * space, 60 + ytop, xleft + 9 * space, 60 + ytop,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  av.label("$R_{\\#}$", {top: 10 + ytop, left: xleft + 9 *space});
  av.displayInit();
  av.recorded();
});
