/*global JSAV, document */

$(document).ready(function() {
  "use strict";
  var av = new JSAV("BinomialTreeCON", {animationMode: "none"});
  av.g.circle(50, 30, 10);
  av.g.circle(50, 70, 10);
  av.g.circle(100, 30, 10);
  av.g.circle(100, 70, 10);
  av.g.circle(150, 30, 10);
  av.g.circle(150, 70, 10);
  av.g.circle(200, 30, 10);
  av.g.circle(200, 70, 10);

  av.g.circle(280, 70, 10);
  av.g.circle(280, 110, 10);
  av.g.circle(320, 30, 10);
  av.g.circle(320, 70, 10);

  av.g.circle(370, 70, 10);
  av.g.circle(370, 110, 10);
  av.g.circle(410, 30, 10);
  av.g.circle(410, 70, 10);

  av.g.circle(500, 110, 10);
  av.g.circle(500, 150, 10);
  av.g.circle(540, 70, 10);
  av.g.circle(540, 110, 10);
  av.g.circle(580, 70, 10);
  av.g.circle(580, 110, 10);
  av.g.circle(620, 30, 10);
  av.g.circle(620, 70, 10);

  av.g.line(50, 40, 50, 60);
  av.g.line(100, 40, 100, 60);
  av.g.line(150, 40, 150, 60);
  av.g.line(200, 40, 200, 60);

  av.g.line(280, 80, 280, 100);
  av.g.line(280, 60, 320, 40);
  av.g.line(320, 60, 320, 40);

  av.g.line(370, 80, 370, 100);
  av.g.line(370, 60, 410, 40);
  av.g.line(410, 60, 410, 40);

  av.g.line(500, 120, 500, 140);
  av.g.line(540, 80, 500, 100);
  av.g.line(540, 80, 540, 100);

  av.g.line(580, 80, 580, 100);
  av.g.line(620, 40, 620, 60);
  av.g.line(620, 40, 540, 60);
  av.g.line(620, 40, 580, 60);

  av.displayInit();
  av.recorded();
});
