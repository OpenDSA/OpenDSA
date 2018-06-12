/*global JSAV, document */

$(document).ready(function() {
  "use strict";
  var av = new JSAV("PosetCON", {animationMode: "none"});
  av.g.circle(330, 30, 14);
  av.g.circle(390, 30, 14);
  av.g.circle(480, 30, 14);
  av.g.circle(540, 30, 14);
  av.g.circle(450, 88, 14);
  av.g.circle(510, 88, 14);
  av.g.circle(510, 146, 14);

  av.g.line(480, 44, 450, 74);
  av.g.line(480, 44, 510, 74);
  av.g.line(540, 44, 510, 74);
  av.g.line(510, 102, 510, 132);
  av.label("A", {left: 325, top: 5});
  av.label("B", {left: 385, top: 5});
  av.label("C", {left: 475, top: 5});
  av.label("G", {left: 535, top: 5});
  av.label("D", {left: 445, top: 63});
  av.label("E", {left: 505, top: 63});
  av.label("F", {left: 505, top: 121});
  
  av.displayInit();
  av.recorded();
});
