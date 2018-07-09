/*global JSAV, document */
// Written by Irena Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("fftCON", {animationMode: "none"});

  //4th root
  av.g.circle(155, 140, 75, {"stroke-width": 1.25});
  
  av.g.line(60, 140, 250, 140);
  av.g.line(155, 45, 155, 235);

  av.label("$i$", {left: 153, top: 5});
  av.label("$-1$", {left: 30, top: 114});
  av.label("$1$", {left: 260, top: 114});
  av.label("$-i$", {left: 145, top: 225});

  //5th root
  av.g.circle(425, 140, 75, {"stroke-width": 1.25});
  

  av.g.line(425, 140, 520, 140);
  av.g.line(425, 140, 454, 50);
  av.g.line(425, 140, 348, 84);
  av.g.line(425, 140, 348, 196);
  av.g.line(425, 140, 454, 230);

  av.label("$1$", {left: 527, top: 114});
  av.label("$-1^{2/5}$", {left: 440, top: 10});
  av.label("$-1^{4/5}$", {left: 312, top: 49});
  av.label("$-1^{6/5}$", {left: 310, top: 180});
  av.label("$-1^{8/5}$", {left: 443, top: 218});



  //8th root
  av.g.circle(695, 140, 75, {"stroke-width": 1.25});

  av.g.line(600, 140, 790, 140);
  av.g.line(695, 45, 695, 235);
  av.g.line(627, 72, 762, 207);
  av.g.line(762, 74, 627, 207);


  av.label("$i$", {left: 693, top: 5});
  av.label("$-1$", {left: 575, top: 114});
  av.label("$1$", {left: 795, top: 114});
  av.label("$-i$", {left: 688, top: 225});

  av.label("$\\sqrt i$", {left: 770, top: 38});
  av.label("$i\\sqrt i$", {left: 595, top: 38});
  av.label("$-\\sqrt i$", {left: 590, top: 195});
  av.label("$-i\\sqrt i$", {left: 765, top: 195});

  av.displayInit();
  av.recorded();
});
