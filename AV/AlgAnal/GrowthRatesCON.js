/*global ODSA */
// Written by Jieun Chon

$(document).ready(function() {
  "use strict";
  var av = new JSAV("GrowthRatesCON", {animationMode: "none"});

  var width = 600, height = 300;

  var xStart = 100;
  var xEnd = xStart + width;  //end position of the x on the chart

  var yEnd = 50;
  var yStart = yEnd + height;  //end position of the y on the chart
  var xyScale = height/width;
  var xMax = 50, yMax = 1500;

  var xSteps = width / xMax;  //each pixels per 1 x-unit.
  var ySteps = height / yMax;  //each pixels per 1 y-unit.




  //x-axis 1
  av.g.line(xStart, yStart, xEnd, yStart, {"stroke-width": 2});

  //y-axis 1
  av.g.line(xStart, yStart, xStart, yEnd, {"stroke-width": 2});

  //draw x-asix lines for graph 1
  var stepx1 = width/10;
  var x1 = xStart + stepx1;
  for(i = 0; i < 10; i++){
    av.g.line(x1, yStart - 5, x1, yStart, {"stroke-width": 0.8});
    x1 += stepx1;
  }

  // draw y-asix lines for graph 1:
  var stepy1 = height/15;
  var y1 = yStart - stepy1;
  for(i = 0; i < 15; i++){
    av.g.line(xStart, y1, xStart + 5, y1, {"stroke-width": 0.8});
    y1 -= stepy1;
  }

  //plot1 x-asix labels
  var labelx1_x = xStart - 10;
  var labelx1_y = yStart;
  for (i = 0; i <= 50; i += 10){
    av.label(i,  {left: labelx1_x, top: labelx1_y});
    labelx1_x += (xSteps * 10);
  }

  // plot1 y-asix labels
  var labely1_x = xStart - 40;
  var labely1_y = yStart - 25;
  for (var i = 0; i <= 1400; i += 200){
      av.label(i,  {left: labely1_x, top: labely1_y}).addClass("yLabel");
      labely1_y -= (ySteps * 200);
  }

  //horizontal lines
  var xBoxEnd = xStart + (xSteps * 15);
  var yBoxEnd = yStart - (ySteps * 500);
  av.g.line(xStart, yBoxEnd, xBoxEnd, yBoxEnd).addClass("dashBoxLine");;
  av.g.line(xStart, yStart, xBoxEnd, yStart).addClass("dashBoxLine");;
  // //vertical lines
  av.g.line(xStart,  yBoxEnd, xStart, yStart).addClass("dashBoxLine");;
  av.g.line(xBoxEnd, yBoxEnd, xBoxEnd, yStart).addClass("dashBoxLine");;


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
    var dash1 = drawDash(_10n, xStart, yStart, xEnd, xMax, yMax, height);
    av.g.line(dash1).addClass("dashLine");
    av.label("$10n$",  {left: dash1[2] - 30, top: dash1[3] - 35});

    // draw dashline and label for 10n
    var dash2 = drawDash(_20n, xStart, yStart, xEnd, xMax, yMax, height);
    av.g.line(dash2).addClass("dashLine");
    av.label("$20n$",  {left: dash2[2] - 30, top: dash2[3] - 35});

  function _10n(n){
    return 10 * n;
  }

  function _20n(n){
    return 20 * n;
  }

//----------------------------------------------------------------------
//--------------------------------------------------------------------
  /**
    Drawing Curve:
    drawingCurve(func(), xFrom, xTo, yFrom, xMax, yMax, width, height)
  */
  //1. inputs
  var DC_func = function(n){
    return 5 * n * (Math.log2(n));
  };
  var DC_xFrom = xStart;
  var DC_xTo = xEnd;
  var DC_yFrom = yStart;
  var DC_yTO = yEnd;
  var DC_xMax = xMax;
  var DC_yMax = yMax;
  var DC_width = width;
  var DC_height = height;

  //2. calculate and make a line
  var DC_xStep = DC_width / DC_xMax;
  var DC_x;
  var DC_y;



function drawCurve(func, xStart, yStart, yEnd, xMax, width, label, labelx, labely, increment, isLog){
  var points = [];
  var xStep = width / xMax;
  var start = isLog ? 1 : 0;
  var x, y;
  for (var i = start ; i <= xMax; i += increment){
    x = xStart + (i * xStep);
    y = yStart - ((func(i)/yMax) * height);
    points.push([x, y]);
    if(y < yEnd){
      break;
    }
  }
  av.label(label,  {left: x + labelx, top: y + labely});
  return points;
};

var curve1 = drawCurve(_5nlog2n, xStart, yStart, yEnd, xMax, width,
  "$5n\\log_2{n}$", -40, -40, 1, true);
av.g.polyline(curve1, {"stroke-width": 3});

var curve2 = drawCurve(_2npow2, xStart, yStart, yEnd, xMax, width,
  "$2n^2$", -40, -30, 0.1, false);
av.g.polyline(curve2, {"stroke-width": 3});

var curve3 = drawCurve(_2pown, xStart, yStart, yEnd, xMax, width,
  "$2^n$", -30, -20, 0.01, false);
av.g.polyline(curve3, {"stroke-width": 3});

var curve4 = drawCurve(_factorial, xStart, yStart, yEnd, xMax, width,
  "$n!$", -25, 0, 0.1, false);
av.g.polyline(curve4, {"stroke-width": 3});


function _5nlog2n(n){
  return 5 * n * (Math.log(n) / Math.log(2));
};

function _2npow2(n){
 return 2 * Math.pow(n, 2);
};

function _2pown(n){
 return Math.pow(2, n);
};

// n! using polyline---------------------------------------------
var f = [1, 1];
function _factorial(n){
  if (n==0 || n==1){
    return 1;
  } else if (n > 1){
    return f[n] = f[n - 1] * n;
  }
};

  av.displayInit();
	av.recorded();

});
