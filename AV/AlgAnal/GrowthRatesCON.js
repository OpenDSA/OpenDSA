/*global ODSA */
// Written by Jieun Chon

$(document).ready(function() {
  "use strict";
  var av = new JSAV("GrowthRatesCON", {animationMode: "none"});

  var xStart = 100, yStart = 50;
  var width = 600, height = 300;
  var xyScale = height/width;
  var xMax = 50, yMax = 1500;

  var xSteps = width / xMax;  //each pixels per 1 x-unit.
  var ySteps = height / yMax;  //each pixels per 1 y-unit.

  var xEnd = xStart + width;  //end position of the x on the chart
  var yEnd = yStart + height;  //end position of the y on the chart

  //x-axis 1
  av.g.line(xStart, yEnd, xEnd, yEnd, {"stroke-width": 2});

  //y-axis 1
  av.g.line(xStart, yStart, xStart, yEnd, {"stroke-width": 2});

  //draw x-asix lines for graph 1
  var stepx1 = width/10;
  var x1 = xStart + stepx1;
  for(i = 0; i < 10; i++){
    av.g.line(x1, yEnd - 5, x1, yEnd, {"stroke-width": 0.8});
    x1 += stepx1;
  }

  // draw y-asix lines for graph 1:
  var stepy1 = height/15;
  var y1 = yEnd - stepy1;
  for(i = 0; i < 15; i++){
    av.g.line(xStart, y1, xStart + 5, y1, {"stroke-width": 0.8});
    y1 -= stepy1;
  }

  //plot1 x-asix labels
  var labelx1_x = xStart - 10;
  var labelx1_y = yEnd;
  for (i = 0; i <= 50; i += 10){
    av.label(i,  {left: labelx1_x, top: labelx1_y});
    labelx1_x += (xSteps * 10);
  }

  // plot1 y-asix labels
  var labely1_x = xStart - 40;
  var labely1_y = yEnd - 25;
  for (var i = 0; i <= 1400; i += 200){
      av.label(i,  {left: labely1_x, top: labely1_y}).addClass("yLabel");
      labely1_y -= (ySteps * 200);
  }

  //horizontal lines
  var xBoxEnd = xStart + (xSteps * 15);
  var yBoxEnd = yEnd - (ySteps * 500);
  var dashBoxLine1 = av.g.line(xStart, yBoxEnd, xBoxEnd, yBoxEnd);
  var dashBoxLine2 = av.g.line(xStart, yEnd, xBoxEnd, yEnd);
  // //vertical lines
  var dashBoxLine3 = av.g.line(xStart,  yBoxEnd, xStart, yEnd);
  var dashBoxLine4 = av.g.line(xBoxEnd, yBoxEnd, xBoxEnd, yEnd);
  dashBoxLine1.addClass("dashBoxLine");
  dashBoxLine2.addClass("dashBoxLine");
  dashBoxLine3.addClass("dashBoxLine");
  dashBoxLine4.addClass("dashBoxLine");

//--------------------------------------------------------------------
  /**
    Drawing Dash Line Function:
    drawingDashLine(func(xMax), xFrom, xTo, yFrom, xMax, yMax, height)
  */
  //1. inputs
  var DL_func = cal_10n(xMax);
  var DL_xFrom = xStart;
  var DL_xTo = xEnd;
  var DL_yFrom = yEnd;
  var DL_yMax = yMax;
  var DL_xMax = xMax
  var DL_height = height;

  //2. calculate and make a line
  var DL_result = -1;
  //10n
  DL_result = DL_yFrom - ((DL_func/DL_yMax) * DL_height);
  av.g.line(DL_xFrom, DL_yFrom, DL_xTo, DL_result).addClass("dashLine");
  av.label("10n",  {left: DL_xTo - 30, top: DL_result - 35});

  // //20n
  DL_func = cal_20n(xMax);
  DL_result = DL_yFrom - ((DL_func/DL_yMax) * DL_height);
  av.g.line(DL_xFrom, DL_yFrom, DL_xTo, DL_result).addClass("dashLine");
  av.label("20n",  {left: DL_xTo - 30, top: DL_result - 35});

  function cal_10n(n){
    return 10 * n;
  }

  function cal_20n(n){
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
    return 15 * n * (Math.log(n) / Math.LN10);
  };
  var DC_xFrom = xStart;
  var DC_xTo = xEnd;
  var DC_yFrom = yEnd;
  var DC_yTO = yStart;
  var DC_xMax = xMax;
  var DC_yMax = yMax;
  var DC_width = width;
  var DC_height = height;

  //2. calculate and make a line
  var DC_xStep = DC_width / DC_xMax;
  var DC_x;
  var DC_y;

//20nlogn-----------------------------------------------------
  for(i = 0; i < DC_xMax; i += 0.1){
    DC_x = DC_xFrom + (i * DC_xStep);
    DC_y = DC_yFrom - ((DC_func(i)/DC_yMax) * DC_height);
    av.g.circle(DC_x, DC_y, 0.7, {fill: 'black'});
    if(DC_y < DC_yTO){
      break;
    }
  }
  av.label("15nlogn",  {left: DC_x - 30, top: DC_y - 35});
//-------------------------------------------------------------

//2 * pow(n, 2)-----------------------------------------------------
  DC_func = function(n){
   return 2 * Math.pow(n, 2);
  };
  for(i = 0; i < DC_xMax; i += 0.05){
    DC_x = DC_xFrom + (i * DC_xStep);
    DC_y = DC_yFrom - (DC_func(i)/DC_yMax * DC_height);
    av.g.circle(DC_x, DC_y, 0.7, {fill: 'black'});
    if(DC_y < DC_yTO){
      break;
    }
  }
  av.label("2pow(n,2)",  {left: DC_x - 30, top: DC_y - 35});
//-------------------------------------------------------------


// pow(2, n)-----------------------------------------------------
  DC_func = function(n){
   return Math.pow(2, n);
  };
  for(i = 0; i < DC_xMax; i += 0.005){
    DC_x = DC_xFrom + (i * DC_xStep);
    DC_y = DC_yFrom - (DC_func(i)/DC_yMax * DC_height);
    av.g.circle(DC_x, DC_y, 0.7, {fill: 'black'});
    if(DC_y < DC_yTO){
      break;
    }
  }
  av.label("2pow(n,2)",  {left: DC_x - 30, top: DC_y - 35});
//-------------------------------------------------------------


// n! using polyline---------------------------------------------

  var g = 7;
  var C = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

  function gamma(z) {
      if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
      else {
          z -= 1;

          var x = C[0];
          for (var i = 1; i < g + 2; i++)
          x += C[i] / (z + i);

          var t = z + g + 0.5;
          return Math.sqrt(2 * Math.PI) * Math.pow(t, (z + 0.5)) * Math.exp(-t) * x;
      }
  };

  DC_func = function(n){
    return (gamma(n+1));
  };

  var points = [];
  for(i = 0; i < DC_xMax; i += 0.01){
    DC_x = DC_xFrom + (i * DC_xStep);
    DC_y = DC_yFrom - (DC_func(i)/DC_yMax * DC_height);
    points.push([DC_x, DC_y]);
    if(DC_y < DC_yTO){
      break;
    }
  }
  av.g.polyline(points, {"stroke-width": 3});
  av.label("n!",  {left: DC_x - 30, top: DC_y - 35});
//-------------------------------------------------------------

  av.displayInit();
	av.recorded();

});
