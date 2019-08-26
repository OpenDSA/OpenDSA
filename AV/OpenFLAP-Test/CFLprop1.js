$(document).ready(function() {
  "use strict";

  var av_name = "CFLprop1";
  var av = new JSAV(av_name, {animationMode: "none"});
  
  // polygons
  av.g.polyline([[180, 200], [250, 200], [280, 80], [390, 50], [380, 30], [240, 80], [180,200]]);
  av.g.polyline([[280, 200], [330, 200], [330, 140], [400, 100], [390, 80], [310, 120], [280,200]], {"fill": "gray"});
  av.g.polyline([[400, 200], [440, 200], [415, 140], [400,200]]);
  av.g.polyline([[480, 200], [530, 200], [510, 120], [440, 80], [430, 100], [480, 140],[480, 200]], {"fill": "gray"});
  av.g.polyline([[550, 200], [630, 200], [570, 80], [440, 30], [430, 50], [530, 80], [550,200]]);
  
  // labels at the bottom
  av.label("u", {left: 210, top: 200});
  av.label("v", {left: 300, top: 200});
  av.label("x", {left: 415, top: 200});
  av.label("y", {left: 500, top: 200});
  av.label("z", {left: 585, top: 200});
  
  // other lines and labels in the middle
  av.g.polyline([[410, 33], [420, 40], [405, 45], [420, 50], [410, 55]]);
  av.g.polyline([[413, 80], [423, 90], [408, 95], [423, 100], [413, 110]]);
  av.label("S", {left: 404, top: 0});
  av.label("N", {left: 405, top: 45});
  av.label("N", {left: 410, top: 100});
  
  
  av.displayInit();
  av.recorded();
});