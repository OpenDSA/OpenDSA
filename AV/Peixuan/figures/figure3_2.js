$(document).ready(function() {
  var left = 250;
  var av = new JSAV("figure3_2", {animationMode: "none"});
  av.g.ellipse(left + 200, 150, 180, 120);
  av.g.ellipse(left + 200, 165, 150, 90);
  av.g.rect(left + 110, 105, 190, 60);
  av.g.rect(left + 110, 170, 190, 60);
  av.label("Exponential time problems", {left: left + 110, top: 33});
  av.label("TOH", {left: left + 65, top: 60});
  av.label("NP problems", {left: left + 160, top: 65});
  av.label("NP-complete problems", {left: left + 130, top: 100});
  av.label("TRAVELING SALESMAN", {left: left + 120, top: 120});
  av.label("P problems", {left: left + 165, top: 165});
  av.label("SORTING", {left: left + 170, top: 185});

  av.displayInit();
});
