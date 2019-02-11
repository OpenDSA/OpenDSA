$(document).ready(function() {
  "use strict";

  var av_name = "CFLprop2";
  var av = new JSAV(av_name, {animationMode: "none"});
  
  var left = 280;
  var top = 180;
  var left2 = 448;
  var top2 = 40;
  
  // polygons
  av.g.polyline([[200, 180], [255, 180], [350, 90], [420, 70], [415, 60], [320, 90], [200,180]]);
  av.g.polyline([[left, top], [left + 40, top], [left + 100, top - 50], [left + 150, top - 80], [left + 145, top - 90], [left + 80, top - 60], [left,top]], {"fill": "gray"});
  av.g.polyline([[left + 300, top], [left + 340, top], [left + 260, top - 65], [left + 200, top - 90], [left + 195, top - 80], [left + 225, top - 60], [left + 300,top]], {"fill": "gray"});
  av.g.polyline([[660, 180], [715, 180], [600, 90], [480, 60], [475, 70], [570, 90], [660,180]]);
  left += 4;
  top += 60;
  av.g.polyline([[left, top], [left + 40, top], [left + 100, top - 50], [left + 150, top - 80], [left + 145, top - 90], [left + 80, top - 60], [left,top]], {"fill": "gray"});
  av.g.polyline([[left + 300, top], [left + 340, top], [left + 260, top - 65], [left + 200, top - 90], [left + 195, top - 80], [left + 225, top - 60], [left + 300,top]], {"fill": "gray"});
  left += 4;
  top += 60;
  av.g.polyline([[left, top], [left + 40, top], [left + 100, top - 50], [left + 150, top - 80], [left + 145, top - 90], [left + 80, top - 60], [left,top]], {"fill": "gray"});
  av.g.polyline([[left + 300, top], [left + 340, top], [left + 260, top - 65], [left + 200, top - 90], [left + 195, top - 80], [left + 225, top - 60], [left + 300,top]], {"fill": "gray"});
  av.g.polyline([[430, 310], [470, 310], [454, 260], [430, 310]]);
  
  // labels
  av.label("u", {left: 220, top: 170});
  av.label("v", {left: 295, top: 170});
  av.label("y", {left: 600, top: 170});
  av.label("z", {left: 680, top: 170});
  av.label("v", {left: 295 + 4, top: 170 + 60});
  av.label("y", {left: 600 + 4, top: 170 + 60});
  av.label("v", {left: 295 + 8, top: 170 + 120});
  av.label("y", {left: 600 + 8, top: 170 + 120});
  av.label("N", {left: 455, top: 190});
  av.label("N", {left: 452, top: 130});
  av.label("N", {left: 448, top: 85});
  av.label("N", {left: 445, top: 48});
  av.label("S", {left: 440, top: 8});
  av.label("x", {left: 446, top: 300});
  
  // polylines
  av.g.polyline([[left2, top2], [left2 + 5, top2 + 5], [left2 - 6, top2 + 10], [left2 + 5, top2 + 15], [left2 - 3, top2 + 23]]);
  left2 += 3;
  top2 += 40;
  av.g.polyline([[left2, top2], [left2 + 5, top2 + 5], [left2 - 6, top2 + 10], [left2 + 5, top2 + 15], [left2 - 3, top2 + 23]]);
  left2 += 3;
  top2 += 38;
  av.g.polyline([[left2, top2], [left2 + 5, top2 + 5], [left2 - 6, top2 + 10], [left2 + 5, top2 + 15], [left2 - 3, top2 + 23]]);
  left2 += 3;
  top2 += 50;
  av.g.polyline([[left2, top2], [left2 + 5, top2 + 5], [left2 - 6, top2 + 10], [left2 + 5, top2 + 15], [left2 - 3, top2 + 23]]);
  left2 += 3;
  top2 += 59;
  av.g.polyline([[left2, top2], [left2 + 5, top2 + 5], [left2 - 6, top2 + 10], [left2 + 5, top2 + 15], [left2 - 3, top2 + 23]]);
  
  av.displayInit();
  av.recorded();
});