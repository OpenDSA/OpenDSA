/*global ODSA */
// Written by Jieun Chon

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


//--------------------------------------------------------------------
  /**
    Drawing Dash Line Function:
    drawingDashLine(func(xMax), xFrom, xTo, yFrom, xMax, yMax, height)
  */

  function drawDash(func, xStart, yStart, xEnd, xMax, yMax, height){
    var points = [xStart, yStart, xEnd];
    var y = yStart - func(xMax) * height / yMax;
    points.push(y);
    return points;
  }

    // draw dashline and label for 10n
    var p1 = drawDash(_10n, xStart, yStart, xEnd, xMax, yMax, height);
    av.g.line(p1).addClass("dashLine");
    av.label("$10n$",  {left: p1[2] - 30, top: p1[3] - 35});

    // draw dashline and label for 10n
    var p1 = drawDash(_20n, xStart, yStart, xEnd, xMax, yMax, height);
    av.g.line(p1).addClass("dashLine");
    av.label("$20n$",  {left: p1[2] - 30, top: p1[3] - 35});


  function _10n(n){
    return 10 * n;
  }

  function _20n(n){
    return 20 * n;
  }

//--------------------------------------------------------------------
//   /**
//     Drawing Curve:
//     drawingCurve(func(), xFrom, xTo, yFrom, xMax, yMax, width, height)
//   */

function drawCurve(func, xStart, yStart, yEnd, xMax, width, label, labelx, labely, increment, isLog){
  var points = [];
  var xStep = width / xMax;
  var start = isLog ? 1 : 0;
  var x, y;
  for (var i = start ; i <= xMax; i += increment){
    x = xStart + (i * xStep);
    y = yStart - ((func(i)/yMax) * height);
    if(y < yEnd){
      break;
    }
    points.push([x, y]);
  }
  av.label(label,  {left: x + labelx, top: y + labely});
  return points;
};

var c1 = drawCurve(_5nlog2n, xStart, yStart, yEnd, xMax, width,
  "$5n\\log_2{n}$", -40, -40, 1, true);
av.g.polyline(c1, {"stroke-width": 3});

var c2 = drawCurve(_2npow2, xStart, yStart, yEnd, xMax, width,
  "$2n^2$", -40, -30, 0.1, false);
av.g.polyline(c2, {"stroke-width": 3});

var c3 = drawCurve(_2pown, xStart, yStart, yEnd, xMax, width,
  "$2^n$", -30, -20, 0.01, false);
av.g.polyline(c3, {"stroke-width": 3});

// var c4 = drawCurve(factorial, xStart, yStart, yEnd, xMax, width,
//   "$n!$", -30, -20, 1, false);
// av.g.polyline(c3, {"stroke-width": 3});


function _5nlog2n(n){
  return 5 * n * Math.log(n);
};

function _2npow2(n){
 return 2 * Math.pow(n, 2);
};

function _2pown(n){
 return Math.pow(2, n);
};

  av.displayInit();
	av.recorded();

});
