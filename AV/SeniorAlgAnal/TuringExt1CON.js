/*global JSAV, document */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("TuringExt1CON", {animationMode: "none"});
  var xleft = 255;
  var ytop = 40;
  var cellwidth = 20;
  var i;

  av.g.line(xleft, ytop, xleft + 7 *cellwidth, ytop,
            {"stroke-width": 2});

  av.g.line(xleft,                ytop + cellwidth,
            xleft + 7 *cellwidth, ytop + cellwidth,
            {"stroke-width": 2});

  for (i = 1; i < 7; i++) {
    av.g.line(xleft + i * cellwidth, ytop,
              xleft + i * cellwidth, ytop + 1 * cellwidth,
              {"stroke-width": 2});
  }

  av.label("-2", {top: ytop + 5, left: xleft + 3 + cellwidth * 1});
  av.label("-1", {top: ytop + 5, left: xleft + 3 + cellwidth * 2});
  av.label("0",  {top: ytop + 5, left: xleft + 7 + cellwidth * 3});
  av.label("1",  {top: ytop + 5, left: xleft + 7 + cellwidth * 4});
  av.label("2",  {top: ytop + 5, left: xleft + 7 + cellwidth * 5});

  av.label("$a$", {top: ytop - 15, left: xleft + 6 + cellwidth});
  av.label("$b$", {top: ytop - 15, left: xleft + 6 + cellwidth * 2});
  av.label("$c$", {top: ytop - 15, left: xleft + 6 + cellwidth * 3});
  av.label("$d$", {top: ytop - 15, left: xleft + 6 + cellwidth * 4});
  av.label("$e$", {top: ytop - 15, left: xleft + 6 + cellwidth * 5});

  av.g.polyline([[xleft + 165, ytop], [xleft + 155, ytop + 10],
                 [xleft + 165, ytop + 20]], {"stroke-width": 2});
  av.g.line(xleft + 160, ytop + 5, xleft + 180, ytop + 5,
            {"stroke-width": 2});
  av.g.line(xleft + 160, ytop + 15, xleft + 180, ytop + 15,
            {"stroke-width": 2});
  av.g.polyline([[xleft + 175, ytop], [xleft + 185, ytop + 10],
                 [xleft + 175, ytop + 20]], {"stroke-width": 2});

  av.g.line(xleft + 210, ytop - 10, xleft + 210 + 5 *cellwidth, ytop - 10,
            {"stroke-width": 2});
  av.g.line(xleft + 210 + cellwidth, ytop + 10,
            xleft + 210 + 5 *cellwidth, ytop + 10,
            {"stroke-width": 2});
  av.g.line(xleft + 210, ytop + 30, xleft + 210 + 5 *cellwidth, ytop + 30,
            {"stroke-width": 2});

  for (i = 0; i < 5; i++) {
    av.g.line(xleft + 210 + i * cellwidth, ytop - 10,
              xleft + 210 + i * cellwidth, ytop + 30,
              {"stroke-width": 2});
  }

  av.label("$\\$$", {top: ytop - 15, left: xleft + 215});
  av.label("$b$", {top: ytop - 5, left: xleft + 235});
  av.label("$a$", {top: ytop - 5, left: xleft + 255});
  av.label("$c$", {top: ytop - 25, left: xleft + 235});
  av.label("$d$", {top: ytop - 25, left: xleft + 255});
  av.label("$e$", {top: ytop - 25, left: xleft + 275});

  av.label("0", {top: ytop - 44, left: xleft + 235});
  av.label("1", {top: ytop - 44, left: xleft + 255});
  av.label("2", {top: ytop - 44, left: xleft + 275});
  av.label("-1", {top: ytop + 17, left: xleft + 232});
  av.label("-2", {top: ytop + 17, left: xleft + 252});
  av.label("-3", {top: ytop + 17, left: xleft + 272});

  av.displayInit();
  av.recorded();
});
