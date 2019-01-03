$(document).ready(function() {
  "use strict";

  var av_name = "CFLprop3";
  var av = new JSAV(av_name, {animationMode: "none"});
  
  // M1
  av.g.circle(160, 100, 17);
  av.g.circle(270, 100, 17);
  av.g.circle(270, 180, 17);
  av.g.polyline([[173, 87], [190, 80], [230, 80], [250, 90]], {"arrow-end": "classic-wide-long"});
  av.g.polyline([[173, 113], [250, 170]], {"arrow-end": "classic-wide-long"});
  av.label("M1", {left: 160, top: 20});
  av.label("q", {left: 150, top: 75});
  av.label("0", {left: 158, top: 83});
  av.label("q", {left: 262, top: 75});
  av.label("i", {left: 270, top: 83});
  av.label("q", {left: 262, top: 155});
  av.label("j", {left: 270, top: 163});
  av.label("a,X;YX", {left: 190, top: 43});
  av.label("a,Y;Y", {left: 200, top: 97});
  
  // M2
  av.g.circle(430, 100, 17);
  av.g.circle(540, 100, 17);
  av.g.polyline([[443, 87], [460, 80], [500, 80], [520, 90]], {"arrow-end": "classic-wide-long"});
  av.label("M2", {left: 430, top: 20});
  av.label("q'", {left: 422, top: 75});
  av.label("0", {left: 430, top: 83});
  av.label("q'", {left: 532, top: 75});
  av.label("k", {left: 540, top: 83});
  av.label("a", {left: 475, top: 43});
  
  // M3
  av.g.circle(380, 250, 30);
  av.g.circle(580, 250, 30);
  av.g.circle(530, 350, 30);
  av.g.polyline([[403, 227], [420, 220], [530, 220], [550, 230]], {"arrow-end": "classic-wide-long"});
  av.g.polyline([[403, 273], [500, 330]], {"arrow-end": "classic-wide-long"});
  av.label("M3", {left: 390, top: 165});
  av.label("q", {left: 363, top: 220});
  av.label("0", {left: 371, top: 228});
  av.label("q'", {left: 383, top: 220});
  av.label("0", {left: 391, top: 228});
  av.label("q", {left: 563, top: 220});
  av.label("i", {left: 571, top: 228});
  av.label("q'", {left: 583, top: 220});
  av.label("k", {left: 591, top: 228});
  av.label("q", {left: 515, top: 322});
  av.label("j", {left: 523, top: 330});
  av.label("q'", {left: 535, top: 322});
  av.label("k", {left: 543, top: 330});
  av.label("a,X;YX", {left: 450, top: 179});
  av.label("a,Y;Y", {left: 456, top: 270});
  
  
  av.displayInit();
  av.recorded();
});