// Written by Peixuan Ge, April 2020
// Functions in bins: Diagonalization example
$(document).ready(function() {
  "use strict";
  var left = 90;
  var topSpace = -15;
  var av = new JSAV("FuncDiagCON", {animationMode: "none"});
  var i, j;

  //frame
  for (i = 0; i < 5; i++) {
    av.label(String(i + 1), {left: left + 50 + i * 100, top: topSpace + 5});
    av.g.line(left + 5 + i * 100, topSpace + 40, left + 5 + i * 100, topSpace + 300);
  }
  av.g.line(left + 5, topSpace + 40, left + 470, topSpace + 40);
  av.g.line(left + 5, topSpace + 300, left + 470, topSpace + 300);
  var f3nums = [7, 9, 11, 13, 15, 17];
  var f4nums = [15, 1, 7, 13, 2, 7];

  //4 columns
  for (i = 0; i < 4; i++) {
    av.g.line(left + 55 + i * 100, topSpace + 60, left + 55 + i * 100, topSpace + 280);
    av.g.line(left + 15 + i * 100, topSpace + 80, left + 95 + i * 100, topSpace + 80);
    av.label("$x$", {left: left + 30 + i * 100, top: topSpace + 40});
    av.label("$f_" + String(i + 1) + "(x)$", {left: left + 65 + i * 100, top: topSpace + 40});

    //numbers
    for (j = 0; j < 6; j++) {
      av.label(String(j + 1), {left: left + 30 + i * 100, top: topSpace + 70 + j * 27});
      if (i === 0) {
        av.label(String(1), {left: left + 70 + i * 100, top: topSpace + 70 + j * 27});
      } else if (i === 1) {
        av.label(String(j + 1), {left: left + 70 + i * 100, top: topSpace + 70 + j * 27});
      } else if (i === 2) {
        if (String(f3nums[j]).length === 2) {
          av.label(String(f3nums[j]), {left: left + 66 + i * 100, top: topSpace + 70 + j * 27});
        } else {
          av.label(String(f3nums[j]), {left: left + 70 + i * 100, top: topSpace + 70 + j * 27});
        }
      } else if (String(f4nums[j]).length === 2) {
        av.label(String(f4nums[j]), {left: left + 66 + i * 100, top: topSpace + 70 + j * 27});
      } else {
        av.label(String(f4nums[j]), {left: left + 72 + i * 100, top: topSpace + 70 + j * 27});
      }
    }

    //dots at below
    av.g.circle(left + 35 + i * 100, topSpace + 250, 2, {fill: "black"});
    av.g.circle(left + 35 + i * 100, topSpace + 260, 2, {fill: "black"});
    av.g.circle(left + 35 + i * 100, topSpace + 270, 2, {fill: "black"});
    av.g.circle(left + 75 + i * 100, topSpace + 250, 2, {fill: "black"});
    av.g.circle(left + 75 + i * 100, topSpace + 260, 2, {fill: "black"});
    av.g.circle(left + 75 + i * 100, topSpace + 270, 2, {fill: "black"});
  }

  //addtion column
  av.g.line(left + 550, topSpace + 40, left + 680, topSpace + 40);
  av.g.line(left + 550, topSpace + 300, left + 680, topSpace + 300);
  av.g.line(left + 550, topSpace + 40, left + 550, topSpace + 300);
  av.g.line(left + 680, topSpace + 40, left + 680, topSpace + 300);
  av.g.line(left + 615, topSpace + 60, left + 615, topSpace + 280);
  av.g.line(left + 570, topSpace + 80, left + 660, topSpace + 80);
  av.label("$x$", {left: left + 585, top: topSpace + 40});
  av.label("$f_{new}(x)$", {left: left + 620, top: topSpace + 40});
  for (i = 0; i < 6; i++) {
    av.label(String(i + 1), {left: left + 585, top: topSpace + 70 + i * 27});
  }
  av.label(String(2), {left: left + 635, top: topSpace + 70});
  av.label(String(3), {left: left + 635, top: topSpace + 70 + 27});
  av.label(String(12), {left: left + 630, top: topSpace + 70 + 2 * 27});
  av.label(String(14), {left: left + 630, top: topSpace + 70 + 3 * 27});
  av.g.circle(left + 589, topSpace + 250, 2, {fill: "black"});
  av.g.circle(left + 589, topSpace + 260, 2, {fill: "black"});
  av.g.circle(left + 589, topSpace + 270, 2, {fill: "black"});
  av.g.circle(left + 640, topSpace + 250, 2, {fill: "black"});
  av.g.circle(left + 640, topSpace + 260, 2, {fill: "black"});
  av.g.circle(left + 640, topSpace + 270, 2, {fill: "black"});

  //arrows
  for (i = 0; i < 5; i++) {
    av.g.polyline([[left + 610, topSpace + 87 + i * 27], [left + 610, topSpace + 97 + i * 27], [left + 625, topSpace + 92 + i * 27]], {fill: "black"});
  }
  //circles and lines that connected to the arrows
  av.g.circle(left + 75, topSpace + 93, 10);
  av.g.circle(left + 175, topSpace + 120, 10);
  av.g.circle(left + 275, topSpace + 147, 10);
  av.g.circle(left + 375, topSpace + 174, 10);
  av.g.circle(left + 475, topSpace + 201, 10);
  av.g.line(left + 85, topSpace + 93, left + 610, topSpace + 93);
  av.g.line(left + 185, topSpace + 120, left + 610, topSpace + 120);
  av.g.line(left + 285, topSpace + 147, left + 610, topSpace + 147);
  av.g.line(left + 385, topSpace + 174, left + 610, topSpace + 174);
  av.g.line(left + 485, topSpace + 201, left + 610, topSpace + 201);
  av.displayInit();
});
