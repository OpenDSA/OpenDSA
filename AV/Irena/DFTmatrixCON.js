$(document).ready(function() {
  "use strict";
  var av_name = "DFTmatrixCON";

  var av = new JSAV(av_name);
  
  // Slide #1
  av.umsg("We can see the DFT matrix is a Vandermonde matrix of the Nth roots"
    + " of unity.");

  var A  = av.ds.matrix([["$A_0$"], ["$A_1$"], ["$A_2$"], ["$A_3$"], ["$A_4$"],
    ["$A_5$"], ["$A_6$"], ["$A_7$"]], {left: 180, top: 0});

  var mat = av.ds.matrix({rows: 8, columns: 8, left: 270, top: 0});
  
  var a  = av.ds.matrix([["$a_0$"], ["$a_1$"], ["$a_2$"], ["$a_3$"], ["$a_4$"],
    ["$a_5$"], ["$a_6$"], ["$a_7$"]], {left: 640, top: 0});

  av.g.line(238, 172, 253, 172, {"stroke-width": 4});
  av.g.line(238, 179, 253, 179, {"stroke-width": 4});

  av.g.line(610, 170, 620, 180, {"stroke-width": 4});
  av.g.line(610, 180, 620, 170, {"stroke-width": 4});

  for (var i = 0; i < 8; i++)
  {
    for (var j = 0; j < 8; j++)
    {
      var power = i * j;
      mat.value(i, j, "$\\omega$" + "^" + power);
    }
  }

  av.displayInit();

  // Slide #2
  av.umsg("For an 8 degree polynomial, its size is 8x8 and contains powers of $\\sqrt(i)$.");
  for (var i = 0; i < 8; i++)
  {
    for (var j = 0; j < 8; j++)
    {
      var power = i * j;
      var val = 0;
      if ((power % 8) == 0)
      {
        val = "$1$";
      }
      else if ((power % 8) == 1)
      {
        val = "$\\sqrt i$";
      }
      else if ((power % 8) == 2)
      {
        val = "$i$";
      }
      else if ((power % 8) == 3)
      {
        val = "$i\\sqrt i$";
      }
      else if ((power % 8) == 4)
      {
        val = "$-1$";
      }
      else if ((power % 8) == 5)
      {
        val = "$-\\sqrt i$";
      }else if ((power % 8) == 6)
      {
        val = "$-i$";
      }else if ((power % 8) == 7)
      {
        val = "$-i\\sqrt i$";
      }
      mat.value(i, j, val);
    }
  }

  av.step();

  // Slide #3
  av.umsg("The rows of the DFT matrix correspond to basic harmonic waveforms."
    + "They transform the seed vector in the spectral plane.");

  mat = av.ds.matrix({rows: 8, columns: 8, left: 270, top: 0});
  var width = 320, height = 320;

  var xStart = 270;
  var xEnd = xStart + width;  //end position of the x on the chart

  var yEnd = 0;
  var yStart = yEnd + height;  //end position of the y on the chart
  var xyScale = height/width;
  var xMax = 1000, yMax = 1000;

  var xSteps = width / xMax;  //each pixels per 1 x-unit.
  var ySteps = height / yMax;  //each pixels per 1 y-unit.

  function _line(n){
    return 1;
  }

  function _sin2L(n){
    return 30 * Math.sin(n * 2 / width);
  }
  function _negsin2L(n){
    return -30 * Math.sin(n * 2 / width);
  }
  function _cos2L(n){
    return 30 * Math.cos(n * 2 / width);
  }

  function _sin4L(n){
    return 30 * Math.sin(n * 4 / width);
  }
  function _negsin4L(n){
    return -30 * Math.sin(n * 4 / width);
  }
  function _cos4L(n){
    return 30 * Math.cos(n *4 / width);
  }

  function _sin6L(n){
    return 30 * Math.sin(n * 6 / width);
  }
  function _negsin6L(n){
    return -30 * Math.sin(n * 6 / width);
  }
  function _cos6L(n){
    return 30 * Math.cos(n * 6 / width);
  }

  function _sin8L(n){
    return 30 * Math.sin(n * 8 / width);
  }
  function _cos8L(n){
    return 30 * Math.cos(n * 8 / width);
  }

  var curve1 = Plot.drawCurve(_line, av, xStart, yStart - 305, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  var curve2 = Plot.drawCurve(_line, av, xStart, yStart - 310, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  av.g.polyline(curve1, {stroke: "purple", "stroke-width": 2});
  av.g.polyline(curve2, {stroke: "purple", "stroke-width": 2});

  var curve3 = Plot.drawCurve(_sin2L, av, xStart, yStart - 265, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  var curve4 = Plot.drawCurve(_cos2L, av, xStart, yStart - 265, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  av.g.polyline(curve3, {stroke: "red", "stroke-width": 2});
  av.g.polyline(curve4, {stroke: "red", "stroke-width": 2});

  var curve5 = Plot.drawCurve(_sin4L, av, xStart, yStart - 225, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  var curve6 = Plot.drawCurve(_cos4L, av, xStart, yStart - 225, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  av.g.polyline(curve5, {stroke: "yellow", "stroke-width": 2});
  av.g.polyline(curve6, {stroke: "yellow", "stroke-width": 2});

  var curve7 = Plot.drawCurve(_sin6L, av, xStart, yStart - 185, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  var curve8 = Plot.drawCurve(_cos6L, av, xStart, yStart - 185, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  av.g.polyline(curve7, {stroke: "green", "stroke-width": 2});
  av.g.polyline(curve8, {stroke: "green", "stroke-width": 2});

  var curve9 = Plot.drawCurve(_sin8L, av, xStart, yStart - 145, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  var curve10 = Plot.drawCurve(_cos8L, av, xStart, yStart - 145, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  av.g.polyline(curve9, {stroke: "blue", "stroke-width": 2});
  av.g.polyline(curve10, {stroke: "blue", "stroke-width": 2});

  var curve11 = Plot.drawCurve(_negsin6L, av, xStart, yStart - 105, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  var curve12 = Plot.drawCurve(_cos6L, av, xStart, yStart - 105, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  av.g.polyline(curve11, {stroke: "green", "stroke-width": 2});
  av.g.polyline(curve12, {stroke: "green", "stroke-width": 2});

  var curve13 = Plot.drawCurve(_negsin4L, av, xStart, yStart - 65, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  var curve14 = Plot.drawCurve(_cos4L, av, xStart, yStart - 65, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  av.g.polyline(curve13, {stroke: "yellow", "stroke-width": 2});
  av.g.polyline(curve14, {stroke: "yellow", "stroke-width": 2});

  var curve15 = Plot.drawCurve(_negsin2L, av, xStart, yStart - 25, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  var curve16 = Plot.drawCurve(_cos2L, av, xStart, yStart - 25, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  av.g.polyline(curve15, {stroke: "red", "stroke-width": 2});
  av.g.polyline(curve16, {stroke: "red", "stroke-width": 2});

  av.recorded();
});
