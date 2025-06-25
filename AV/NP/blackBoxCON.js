/*global ODSA */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("blackBoxCON", {animationMode: "none"});

  var leftx = 300;
  var topy = 5;
  av.g.rect(leftx + 0, topy + 25, 250, 265);

  av.label("Problem A", {left: leftx + 0, top: topy - 10});
  av.label("I",  {left: leftx + 145, top: topy - 10});
  av.g.line(leftx + 115, topy + 10, leftx + 115, topy + 50);
  av.g.line(leftx + 135, topy + 10, leftx + 135, topy + 50);
  av.g.line(leftx + 105, topy + 42, leftx + 125, topy + 59);
  av.g.line(leftx + 125, topy + 59, leftx + 145, topy + 42);

  av.g.rect(leftx + 50, topy + 60, 150, 30);
  av.label("Transform 1", {left: leftx + 85, top: topy + 51});
  av.g.line(leftx + 115, topy + 90, leftx + 115, topy + 130);
  av.g.line(leftx + 135, topy + 90, leftx + 135, topy + 130);
  av.g.line(leftx + 105, topy + 122, leftx + 125, topy + 139);
  av.g.line(leftx + 125, topy + 139, leftx + 145, topy + 122);
  av.label("I'", {left: leftx + 145, top: topy + 85});
  
  av.g.rect(leftx + 50, topy + 140, 150, 50);
  av.label("Problem B",  {left: leftx + 90, top: topy + 140});
  av.g.line(leftx + 115, topy + 270, leftx + 115, topy + 310);
  av.g.line(leftx + 135, topy + 270, leftx + 135, topy + 310);
  av.g.line(leftx + 105, topy + 302, leftx + 125, topy + 319);
  av.g.line(leftx + 125, topy + 319, leftx + 145, topy + 302);
  av.label("SLN'", {left: leftx + 145, top: topy + 185});

  av.g.rect(leftx + 50, topy + 240, 150, 30);
  av.label("Transform 2",  {left: leftx + 85, top: topy + 230});
  av.g.line(leftx + 115, topy + 190, leftx + 115, topy + 230);
  av.g.line(leftx + 135, topy + 190, leftx + 135, topy + 230);
  av.g.line(leftx + 105, topy + 222, leftx + 125, topy + 239);
  av.g.line(leftx + 125, topy + 239, leftx + 145, topy + 222);
  av.label("SLN", {left: leftx + 145, top: topy + 285});
  
  av.displayInit();
  av.recorded();
});
