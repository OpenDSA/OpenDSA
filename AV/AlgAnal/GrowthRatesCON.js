/*global ODSA Plot */
// Written by Jieun Chon

$(document).ready(function() {
  "use strict";
  var i;
  var av = new JSAV("GrowthRatesCON", {animationMode: "none"});
  var width = 600, height = 300;
  var xStart = 100;
  var xEnd = xStart + width;  //end position of the x on the chart
  var yEnd = 50;
  var yStart = yEnd + height;  //end position of the y on the chart
  var xMax = 50, yMax = 1500;
  var xSteps = width / xMax;  //each pixels per 1 x-unit.
  var ySteps = height / yMax;  //each pixels per 1 y-unit.

  //x-axis 1
  av.g.line(xStart, yStart, xEnd, yStart, {"stroke-width": 2});

  //y-axis 1
  av.g.line(xStart, yStart, xStart, yEnd, {"stroke-width": 2});

  //draw x-asix lines for graph 1
  var stepx1 = width / 10;
  var x1 = xStart + stepx1;
  for (i = 0; i < 10; i++) {
    av.g.line(x1, yStart - 5, x1, yStart, {"stroke-width": 0.8});
    x1 += stepx1;
  }

  // draw y-axis lines for graph 1:
  var stepy1 = height / 15;
  var y1 = yStart - stepy1;
  for (i = 0; i < 15; i++) {
    av.g.line(xStart, y1, xStart + 5, y1, {"stroke-width": 0.8});
    y1 -= stepy1;
  }

  //plot1 x-axis labels
  var labelx1_x = xStart - 10;
  var labelx1_y = yStart;
  for (i = 0; i <= 50; i += 10) {
    av.label(i,  {left: labelx1_x, top: labelx1_y});
    labelx1_x += (xSteps * 10);
  }

  // plot1 y-axis labels
  var labely1_x = xStart - 40;
  var labely1_y = yStart - 25;
  for (i = 0; i <= 1400; i += 200) {
    av.label(i,  {left: labely1_x, top: labely1_y}).addClass("yLabel");
    labely1_y -= (ySteps * 200);
  }

  //horizontal lines
  var xBoxEnd = xStart + (xSteps * 15);
  var yBoxEnd = yStart - (ySteps * 500);
  av.g.line(xStart, yBoxEnd, xBoxEnd, yBoxEnd).addClass("dashBoxLine");
  av.g.line(xStart, yStart, xBoxEnd, yStart).addClass("dashBoxLine");
  // //vertical lines
  av.g.line(xStart,  yBoxEnd, xStart, yStart).addClass("dashBoxLine");
  av.g.line(xBoxEnd, yBoxEnd, xBoxEnd, yStart).addClass("dashBoxLine");

  // draw dashline and label for 10n
  var dash1 = Plot.drawDash(_10n, xStart, yStart, xEnd, xMax, yMax, height);
  av.g.line(dash1).addClass("dashLine");
  av.label("$10n$",  {left: dash1[2] - 30, top: dash1[3] - 35});

  // draw dashline and label for 10n
  var dash2 = Plot.drawDash(_20n, xStart, yStart, xEnd, xMax, yMax, height);
  av.g.line(dash2).addClass("dashLine");
  av.label("$20n$",  {left: dash2[2] - 30, top: dash2[3] - 35});

  function _10n(n) {
    return 10 * n;
  }

  function _20n(n) {
    return 20 * n;
  }

  var curve1 = Plot.drawCurve(_5nlog2n, xStart, yStart, yEnd, xMax, yMax, width, height, 1, true);
  av.g.polyline(curve1, {"stroke-width": 3});
  av.label("$5n\\log_2{n}$", {left: 635, top: 35});

  var curve2 = Plot.drawCurve(_2npow2, xStart, yStart, yEnd, xMax, yMax, width, height, 0.1, false);
  av.g.polyline(curve2, {"stroke-width": 3});
  av.label("$2n^2$", {left: 395, top: 35});

  var curve3 = Plot.drawCurve(_2pown, xStart, yStart, yEnd, xMax, yMax, width, height, 0.01, false);
  av.g.polyline(curve3, {"stroke-width": 3});
  av.label("$2^n$", {left: 205, top: 35});

  var curve4 = Plot.drawCurve(_factorial, xStart, yStart, yEnd, xMax, yMax, width, height, 0.25, false);
  av.g.polyline(curve4, {"stroke-width": 3});
  av.label("$n!$", {left: 155, top: 35});
  av.displayInit();
  av.recorded();


  // Below are the functions for the various curves
  function _5nlog2n(n) {
    return 5 * n * (Math.log2(n));
  } // _5nlog2n


  function _2npow2(n) {
    return 2 * Math.pow(n, 2);
  } //)2npow2


  function _2pown(n) {
    return Math.pow(2, n);
  } //_2pown


  // In order to get a smoother curve, we hard-code some intermediate
  // position values for quarter steps.
  function _factorial(n) {
    var factorialArray =
        [1,    0.906,   0.886,   0.919,
          1,   1.133,   1.329,   1.608,
          2,   2.549,   3.323,   4.423,
          6,   8.285,   11.632,  16.585,
          24,  35.212,  52.343,  78.784,
          120, 184.861, 287.885, 453.011,
          720, 1155.38, 1871.25, 3057.82];
    return factorialArray[n * 4];
  } // _factorial(n)
});
