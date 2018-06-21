/*global JSAV, document */
// Written by Yuhui Lyu and Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "BinomialTreeCON";
  var av = new JSAV(av_name);
  var xoffset = 300;
  var yoffset = 15;
  var circRadius = 10;
  var c1 = av.g.circle(xoffset + 50, yoffset, circRadius, {"stroke-width": "2"});
  var c2 = av.g.circle(xoffset + 50, yoffset + 40, circRadius, {"stroke-width": "2"});
  var c3 = av.g.circle(xoffset + 100, yoffset, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 100, yoffset + 40, circRadius, {"stroke-width": "2"});
  var c5 = av.g.circle(xoffset + 150, yoffset, circRadius, {"stroke-width": "2"});
  var c6 = av.g.circle(xoffset + 150, yoffset + 40, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 200, yoffset, circRadius, {"stroke-width": "2"});
  av.g.circle(xoffset + 200, yoffset + 40, circRadius, {"stroke-width": "2"});
  var l1 = av.g.line(xoffset + 50, yoffset + 10, xoffset + 50, yoffset + 30, {"stroke-width": "2"});
  var l2 = av.g.line(xoffset + 100, yoffset + 10, xoffset + 100, yoffset + 30, {"stroke-width": "2"});
  var l3 = av.g.line(xoffset + 150, yoffset + 10, xoffset + 150, yoffset + 30, {"stroke-width": "2"});
  av.g.line(xoffset + 200, yoffset + 10, xoffset + 200, yoffset + 30, {"stroke-width": "2"});

  // Slide 1
  av.umsg("Example of building a binomial tree. We start with 8 values, and they are paired up with the greater value for each pair on top.");
  av.displayInit();
  av.step();

  // Slide 2
  c1.hide();
  c2.hide();
  c5.hide();
  c6.hide();
  l1.hide();
  l3.hide();
  c1 = av.g.circle(xoffset + 50, yoffset + 40, circRadius, {"stroke-width": "2"});
  c2 = av.g.circle(xoffset + 50, yoffset + 80, circRadius, {"stroke-width": "2"});
  l1 = av.g.line(xoffset + 50, yoffset + 50, xoffset + 50, yoffset + 70, {"stroke-width": "2"});
  var l5 = av.g.line(xoffset + 50, yoffset + 30, xoffset + 100, yoffset + 10, {"stroke-width": "2"});
  c5 = av.g.circle(xoffset + 150, yoffset + 40, circRadius, {"stroke-width": "2"});
  c6 = av.g.circle(xoffset + 150, yoffset + 80, circRadius, {"stroke-width": "2"});
  l3 = av.g.line(xoffset + 150, yoffset + 50, xoffset + 150, yoffset + 70, {"stroke-width": "2"});
  av.g.line(xoffset + 150, yoffset + 30, xoffset + 200, yoffset + 10, {"stroke-width": "2"});
  av.umsg("Now we take each pair of pairs, and pick the larger of the roots to be the root of the binomial tree for those four nodes. Do this for each set of four nodes.");
  av.step();

  // Slide 3
  c1.hide();
  c2.hide();
  c3.hide();
  l1.hide();
  l2.hide();
  l5.hide();
  c1 = av.g.circle(xoffset + 50, yoffset + 80, circRadius, {"stroke-width": "2"});
  c2 = av.g.circle(xoffset + 50, yoffset + 120, circRadius, {"stroke-width": "2"});
  c3 = av.g.circle(xoffset + 100, yoffset + 80, circRadius, {"stroke-width": "2"});
  l1 = av.g.line(xoffset + 50, yoffset + 90, xoffset + 50, yoffset + 110, {"stroke-width": "2"});
  l2 = av.g.line(xoffset + 100, yoffset + 50, xoffset + 100, yoffset + 70, {"stroke-width": "2"});
  l5 = av.g.line(xoffset + 50, yoffset + 70, xoffset + 100, yoffset + 50, {"stroke-width": "2"});
  av.g.line(xoffset + 100, yoffset + 30, xoffset + 200, yoffset + 10, {"stroke-width": "2"});
  av.umsg("Now we take the pair of trees, and make the root with smaller value be the child of the root with larger value.");
  av.recorded();
});
