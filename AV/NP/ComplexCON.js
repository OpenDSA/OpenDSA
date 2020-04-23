// Written by Peixuan Ge, April 2020
// The world of NP Completeness
$(document).ready(function() {
  "use strict";
  var left = 250;
  var av = new JSAV("ComplexCON", {animationMode: "none"});
  av.g.ellipse(left + 200, 130, 185, 120);
  av.g.ellipse(left + 200, 145, 155, 90);
  av.g.rect(left + 110, 85, 190, 60);
  av.g.rect(left + 110, 150, 190, 60);
  av.label("Exponential time problems", {left: left + 110, top: 13});
  av.label("TOH", {left: left + 65, top: 40});
  av.label("NP problems", {left: left + 160, top: 45});
  av.label("NP-complete problems", {left: left + 130, top: 80});
  av.label("TRAVELING SALESMAN", {left: left + 120, top: 100});
  av.label("P problems", {left: left + 165, top: 145});
  av.label("SORTING", {left: left + 170, top: 165});

  av.displayInit();
});
