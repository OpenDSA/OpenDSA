/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Array-based circular queue
$(document).ready(function() {
  "use strict";
  var av_name = "aqueueCircularCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // center coordinate
  var cx = 400, cy = 150;

  // radius
  var r1 = 50, r2 = 100;
  var fx = cx, fy = cy - r2 - 15;
  var tx = cx + r2 + 15, ty = cy;
  var fx1 = fx + 70, ty2 = ty - 70;
  var path = "M" + fx + "," + fy;
  path += " C" + fx1 + "," + fy;
  path += " " + tx + "," + ty2;
  path += " " + tx + "," + ty;
  var curve = av.g.path(path, {"stroke-width" : 2, "arrow-end" : "classic-wide-long"});
  var cir = av.circular(cx, cy, r1, r2, 12, {"stroke-width" : 2});
  curve.hide();

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  curve.show();
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  curve.hide();
  cir.value(8, "20");
  cir.value(9, "5");
  cir.value(10, "12");
  cir.value(11, "17");
  var frontP = cir.pointer("front", 8);
  var rearP = cir.pointer("rear", 11);
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  cir.value(8, " ");
  cir.value(9, " ");
  cir.value(0, "3");
  cir.value(1, "30");
  cir.value(2, "4");
  cir.value(10, "12");
  cir.value(11, "17");
  frontP.arrow.hide();
  frontP.label.hide();
  rearP.arrow.hide();
  rearP.label.hide();
  cir.pointer("front", 10);
  cir.pointer("rear", 2);
  av.recorded();
});
