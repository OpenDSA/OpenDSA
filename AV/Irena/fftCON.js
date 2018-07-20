/*global JSAV, document */
// Written by Irena Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("fftCON", {animationMode: "none"});

  var y = 135;
  var x1 = 155;
  var x2 = 425;
  var x3 = 695;
  var radius = 75;
  //4th root
  av.g.circle(x1, y, radius, {"stroke-width": 1.25});

  av.g.line(x1 - radius - 20, y, x1 + radius + 20, y);
  av.g.line(x1, y - radius - 20, x1, y + radius + 20);

  av.label("$i$", {left: 153, top: 0});
  av.label("$-1$", {left: 30, top: 109});
  av.label("$1$", {left: 260, top: 109});
  av.label("$-i$", {left: 145, top: 220});

  //5th root
  av.g.circle(x2, y, radius, {"stroke-width": 1.25});


  av.g.line(x2, y, 520, y);
  av.g.line(x2, y, 454, 45);
  av.g.line(x2, y, 348, 79);
  av.g.line(x2, y, 348, 191);
  av.g.line(x2, y, 454, 225);

  av.label("$1$", {left: 527, top: 109});
  av.label("$-1^{2/5}$", {left: 440, top: 5});
  av.label("$-1^{4/5}$", {left: 312, top: 44});
  av.label("$-1^{6/5}$", {left: 310, top: 175});
  av.label("$-1^{8/5}$", {left: 443, top: 213});


  //8th root
  av.g.circle(x3, y, radius, {"stroke-width": 1.25});

  av.g.line(x3 - radius - 20, y, x3 + radius + 20, y);
  av.g.line(x3, y - radius - 20, x3, y + radius + 20);
  av.g.line(627, 67, 762, 202);
  av.g.line(762, 69, 627, 202);


  av.label("$i$", {left: 693, top: 0});
  av.label("$-1$", {left: 575, top: 109});
  av.label("$1$", {left: 795, top: 109});
  av.label("$-i$", {left: 688, top: 220});

  av.label("$\\sqrt i$", {left: 770, top: 33});
  av.label("$i\\sqrt i$", {left: 595, top: 33});
  av.label("$-\\sqrt i$", {left: 590, top: 190});
  av.label("$-i\\sqrt i$", {left: 765, top: 190});

  av.displayInit();
  av.recorded();
});
