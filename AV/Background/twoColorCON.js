/*global JSAV, document */
// Written by Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var av = new JSAV("twoColorCON", {animationMode: "none"});

  var left = 250;
  av.g.polyline([[left +  60,  20], [left + 110,  70], [left +  30,  70]], {fill: "gray"});
  av.g.polyline([[left + 110,  70], [left + 240,  70], [left + 175, 135]], {fill: "gray"});
  av.g.polyline([[left + 240,  70], [left + 330,  70], [left + 290,  20]], {fill: "gray"})
  av.g.polyline([[left + 175, 135], [left + 230, 190], [left + 120, 190]], {fill: "gray"});

  av.g.line(left +  50, 10, left + 250, 210, {"stroke-width": 2});
  av.g.line(left +   0, 70, left + 350,  70, {"stroke-width": 2});
  av.g.line(left + 300, 10, left + 100, 210, {"stroke-width": 2});
  av.displayInit();
  av.recorded();
});
