/*global ODSA */
"use strict";
// Written by Jun Yang and Cliff Shaffer
// How to recognize when the queue is empty or full.
$(document).ready(function () {
  var av_name = "aqueueEmptyCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // center coordinate
  var cx = 400, cy = 120;
  // radius
  var r1 = 50, r2 = 100;
  var cir = av.circular(cx, cy, r1, r2, 12, {"stroke-width" : 2});

  // Slide 1
  av.umsg(interpret("av_c1"));
  av.displayInit();

  // Slide 2
  cir.value(10, "12");
  cir.highlight(10);
  var frontP = cir.pointer("front,rear", 10);
  av.umsg(interpret("av_c2"));
  av.step();

  // Slide 3
  cir.highlight(11);
  cir.value(10, " ");
  frontP.arrow.hide();
  frontP.label.hide();
  var frontP1 = cir.pointer("front", 11);
  var rearP1 = cir.pointer("rear", 10);
  av.umsg(interpret("av_c3"));
  av.step();

  // Slide 4
  av.umsg(interpret("av_c4"));
  frontP1.arrow.hide();
  frontP1.label.hide();
  rearP1.arrow.hide();
  rearP1.label.hide();
  cir.unhighlight(10);
  var frontP2 = cir.pointer("front", 0);
  var rearP2 = cir.pointer("rear", 11);
  cir.highlight(11);
  cir.highlight(0);
  av.step();

  // Slide 5
  av.umsg(interpret("av_c5"));
  av.step();

  // Slide 6
  av.umsg(interpret("av_c6"));
  av.step();

  // Slide 7
  av.umsg(interpret("av_c7"));
  av.step();

  // Slide 8
  av.umsg(interpret("av_c8"));
  av.recorded();
});
