/*global ODSA */
// Written by Jieun Chon

var C = 0,
    g = 0;


$(document).ready(function() {
  "use strict";
  var av = new JSAV("GrowthRatesZoomCON", {animationMode: "none"});

  var width = 600, height = 300;
  var xStart = 100;
  var xEnd = xStart + width;  //end position of the x on the chart
  var yEnd = 50;
  var yStart = yEnd + height;  //end position of the y on the chart
  var xyScale = height/width;
  var xMax = 15, yMax = 400;

  var xSteps = width / xMax;  //each pixels per 1 x-unit.
  var ySteps = height / yMax;  //each pixels per 1 y-unit.

  //x-axis 1
  av.g.line(xStart, yStart, xEnd, yStart, {"stroke-width": 2});

  //y-axis 1
  av.g.line(xStart, yStart, xStart, yEnd, {"stroke-width": 2});

  //draw x-asix lines for graph 1
  var stepx = width/3;
  var lines_x = xStart + stepx;
  for(i = 0; i < 3; i++){
    av.g.line(lines_x, yStart - 5, lines_x, yStart, {"stroke-width": 0.8});
    lines_x += stepx;
  }

  // draw y-asix lines for graph 1:
  var stepy = height/4;
  var lines_y = yStart - stepy;
  for(i = 0; i < 4; i++){
    av.g.line(xStart, lines_y, xStart + 5, lines_y, {"stroke-width": 0.8});
    lines_y -= stepy;
  }

  //plot1 x-asix labels
  var labelx1_x = xStart - 10;
  var labelx1_y = yStart;
  var xlabelSize = 5;
  for (i = 0; i <= xMax; i += xlabelSize){
    av.label(i,  {left: labelx1_x, top: labelx1_y});
    labelx1_x += (xSteps * xlabelSize);
  }

  // plot1 y-asix labels
  var labely1_x = xStart - 40;
  var labely1_y = yStart - 25;
  var ylabelSize = 100;
  for (var i = 0; i <= yMax; i += ylabelSize){
    av.label(i,  {left: labely1_x, top: labely1_y}).addClass("yLabel");
    labely1_y -= (ySteps * ylabelSize);
  }

  // draw dashline and label for 10n
  var p1 = Plot.drawDash(_10n, xStart, yStart, xEnd, xMax, yMax, height);
  av.g.line(p1).addClass("dashLine");
  av.label("$10n$",  {left: p1[2] - 30, top: p1[3] - 35});

  // draw dashline and label for 10n
  var p1 = Plot.drawDash(_20n, xStart, yStart, xEnd, xMax, yMax, height);
  av.g.line(p1).addClass("dashLine");
  av.label("$20n$", {left: p1[2] - 30, top: p1[3] - 35});

  function _10n(n){
    return 10 * n;
  }

  function _20n(n){
    return 20 * n;
  }

  var curve1 = Plot.drawCurve(_5nlog2n, av, xStart, yStart, yEnd, xMax, yMax, width, height,
                              "$5n\\log_2{n}$", -40, 10, 1, true);
  av.g.polyline(curve1, {"stroke-width": 3});

  var curve2 = Plot.drawCurve(_2npow2, av, xStart, yStart, yEnd, xMax, yMax, width, height,
                              "$2n^2$", -40, -30, 0.1, false);
  av.g.polyline(curve2, {"stroke-width": 3});

  var curve3 = Plot.drawCurve(_2pown, av, xStart, yStart, yEnd, xMax, yMax, width, height,
                              "$2^n$", -30, -20, 0.01, false);
  av.g.polyline(curve3, {"stroke-width": 3});

  _factorial2(av);

  function _5nlog2n(n){
    return 5 * n * Math.log2(n);
  };

  function _2npow2(n){
    return 2 * Math.pow(n, 2);
  };

  function _2pown(n){
    return Math.pow(2, n);
  };

  function _factorial(n) {
    var i;
    var temp = 1;
    for (i = 1; i <= n; i++) {
      temp = temp * i;
    }
    return temp;
  };

  function _factorial2(jsav){
    var factorialArray = [1, 0.906, 0.886, 0.919,
                          1, 1.133, 1.329, 1.608,
                          2, 2.549, 3.323, 4.423,
                          6, 8.285, 11.632, 16.585,
                          24, 35.212, 52.343, 78.784,
                          120, 184.861, 287.885, 453.011,
                          720, 1155.38, 1871.25, 3057.82];

     var points = [];
     var xStep = ((width / xMax) / 4) ;
     var x, y;
     var len = factorialArray.length;
     for (var i = 1; i < len; i++) {
       x = xStart + (i * xStep);
       y = yStart - (factorialArray[i] / yMax) * height;
       if (y < yEnd) {
         y = yEnd;
         points.push([x, y]);
         break;
       }
       points.push([x, y]);
     }
     jsav.label("$n!$", {left: x - 25, top: y - 20});
     jsav.g.polyline(points, {"stroke-width": 3});
  }

  av.label("Input size n", {left: p1[2] - 350, top: p1[3] + 250});

  av.displayInit();
  av.recorded();

});
