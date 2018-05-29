$(document).ready(function() {
  "use strict";
  var av_name = "DFTmatrixCON";

  var av = new JSAV(av_name);
  
  // Slide #1
  av.umsg("We can see the DFT matrix is a Vandermonde matrix of the Nth roots"
    + " of unity.");

  var A  = av.ds.matrix([["$A_0$"], ["$A_1$"], ["$A_2$"], ["$A_3$"], ["$A_4$"],
    ["$A_5$"], ["$A_6$"], ["$A_7$"]], {left: 140, top: 30});

  var mat = av.ds.matrix({rows: 8, columns: 8, left: 250, top: 30});
  
  var a  = av.ds.matrix([["$a_0$"], ["$a_1$"], ["$a_2$"], ["$a_3$"], ["$a_4$"],
    ["$a_5$"], ["$a_6$"], ["$a_7$"]], {left: 665, top: 30});

  av.g.line(210, 222, 225, 222, {"stroke-width": 4});
  av.g.line(210, 229, 225, 229, {"stroke-width": 4});

  av.g.line(632, 221, 642, 231, {"stroke-width": 4});
  av.g.line(632, 231, 642, 221, {"stroke-width": 4});

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

  var mat2 = av.ds.matrix({rows: 8, columns: 8, left: 250, top: 30});
  var width = 360, height = 360;

  var xStart = 250;
  var xEnd = xStart + width;  //end position of the x on the chart

  var yEnd = 30;
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

  var curve1 = Plot.drawCurve(_line, xStart, yStart - 345, yEnd, xMax, yMax, width, height,
                         1, false);

  var poly1 = av.g.polyline(curve1, {stroke: "purple", "stroke-width": 3});

  var curve3 = Plot.drawCurve(_sin2L, xStart, yStart - 300, yEnd, xMax, yMax, width, height,
                         1, false);
  var curve4 = Plot.drawCurve(_cos2L, xStart, yStart - 300, yEnd, xMax, yMax, width, height,
                         1, false);
  var poly3 = av.g.polyline(curve3, {stroke: "red", "stroke-width": 2});
  var poly4 = av.g.polyline(curve4, {stroke: "red", "stroke-width": 2});

  var curve5 = Plot.drawCurve(_sin4L, xStart, yStart - 255, yEnd, xMax, yMax, width, height,
                         1, false);
  var curve6 = Plot.drawCurve(_cos4L, xStart, yStart - 255, yEnd, xMax, yMax, width, height,
                         1, false);
  var poly5 = av.g.polyline(curve5, {stroke: "yellow", "stroke-width": 2});
  var poly6 = av.g.polyline(curve6, {stroke: "yellow", "stroke-width": 2});

  var curve7 = Plot.drawCurve(_sin6L, xStart, yStart - 210, yEnd, xMax, yMax, width, height,
                         1, false);
  var curve8 = Plot.drawCurve(_cos6L, xStart, yStart - 210, yEnd, xMax, yMax, width, height,
                         1, false);
  var poly7 = av.g.polyline(curve7, {stroke: "green", "stroke-width": 2});
  var poly8 = av.g.polyline(curve8, {stroke: "green", "stroke-width": 2});

  var curve9 = Plot.drawCurve(_sin8L, xStart, yStart - 165, yEnd, xMax, yMax, width, height,
                         1, false);
  var curve10 = Plot.drawCurve(_cos8L, xStart, yStart - 165, yEnd, xMax, yMax, width, height,
                         1, false);
  var poly9 = av.g.polyline(curve9, {stroke: "blue", "stroke-width": 2});
  var poly10 = av.g.polyline(curve10, {stroke: "blue", "stroke-width": 2});

  var curve11 = Plot.drawCurve(_negsin6L, xStart, yStart - 120, yEnd, xMax, yMax, width, height,
                         1, false);
  var curve12 = Plot.drawCurve(_cos6L, xStart, yStart - 120, yEnd, xMax, yMax, width, height,
                         1, false);
  var poly11 = av.g.polyline(curve11, {stroke: "green", "stroke-width": 2});
  var poly12 = av.g.polyline(curve12, {stroke: "green", "stroke-width": 2});

  var curve13 = Plot.drawCurve(_negsin4L, xStart, yStart - 75, yEnd, xMax, yMax, width, height,
                         1, false);
  var curve14 = Plot.drawCurve(_cos4L, xStart, yStart - 75, yEnd, xMax, yMax, width, height,
                         1, false);
  var poly13 = av.g.polyline(curve13, {stroke: "yellow", "stroke-width": 2});
  var poly14 = av.g.polyline(curve14, {stroke: "yellow", "stroke-width": 2});

  var curve15 = Plot.drawCurve(_negsin2L, xStart, yStart - 30, yEnd, xMax, yMax, width, height,
                         1, false);
  var curve16 = Plot.drawCurve(_cos2L, xStart, yStart - 30, yEnd, xMax, yMax, width, height,
                         1, false);
  var poly15 = av.g.polyline(curve15, {stroke: "red", "stroke-width": 2});
  var poly16 = av.g.polyline(curve16, {stroke: "red", "stroke-width": 2});

  av.step();

  av.umsg("This computation is a matrix-vector product.");

  mat2.hide();
  poly1.hide();
  poly3.hide();
  poly4.hide();
  poly5.hide();
  poly6.hide();
  poly7.hide();
  poly8.hide();
  poly9.hide();
  poly10.hide();
  poly11.hide();
  poly12.hide();
  poly13.hide();
  poly14.hide();
  poly15.hide();
  poly16.hide();

  av.step();

  av.umsg("Each element of the result is equal to the inner product of the"
    + " coresponding row of the matrix with the seed vector.")

  A.css(0, 0, {"background-color": "#FF5050"});//red
  for (i = 0; i < 8; i++)
  {
    mat.css(0, i, {"background-color": "#FF5050"});
    a.css(i, 0, {"background-color": "#FF5050"});
  }

  av.step();

  av.umsg("So, we are dealing with 8 terms obtained from multiplications.")
  for (i = 0; i < 8; i++)
  {
    mat.css(0, i, {"background-color": "white"});
    a.css(i, 0, {"background-color": "white"});
  }

  mat.css(0, 0, {"background-color": "#FF5050"});
  a.css(0, 0, {"background-color": "#FF5050"});

  var lab = av.label("$1*a_0$", {"left": 250});

  av.step();

  av.umsg("Adding these terms that come from multiplications");

  mat.css(0, 1, {"background-color": "#FF5050"});
  a.css(1, 0, {"background-color": "#FF5050"});

  lab.text("$1*a_0 + 1*a_1$");

  av.step();

  av.umsg("Adding these terms that come from multiplications");

  mat.css(0, 2, {"background-color": "#FF5050"});
  a.css(2, 0, {"background-color": "#FF5050"});

  lab.text("$1*a_0 + 1*a_1 + 1*a_2$");

  av.step();

  av.umsg("...for every pair of elements from the matrix and the vector.");

  mat.css(0, 3, {"background-color": "#FF5050"});
  a.css(3, 0, {"background-color": "#FF5050"});
  mat.css(0, 4, {"background-color": "#FF5050"});
  a.css(4, 0, {"background-color": "#FF5050"});
  mat.css(0, 5, {"background-color": "#FF5050"});
  a.css(5, 0, {"background-color": "#FF5050"});
  mat.css(0, 6, {"background-color": "#FF5050"});
  a.css(6, 0, {"background-color": "#FF5050"});
  mat.css(0, 7, {"background-color": "#FF5050"});
  a.css(7, 0, {"background-color": "#FF5050"});

  lab.text("$1*a_0 + 1*a_1 + 1*a_2 + 1*a_3 + 1*a_4 + 1*a_5 + 1*a_6 + 1*a_7$");

  av.step();

  av.umsg("This has to be done for each row. So the computational cost of this operation is $O(n^2)$.");

  lab.hide();
  a.css(0, 0, {"background-color": "white"});
  A.css(1, 0, {"background-color": "#33ccff"});
  A.css(2, 0, {"background-color": "#ffff4d"});
  A.css(3, 0, {"background-color": "#00ffbf"});
  A.css(4, 0, {"background-color": "##df80ff"});
  A.css(5, 0, {"background-color": "#999999"});
  A.css(6, 0, {"background-color": "#ff9966"});
  A.css(7, 0, {"background-color": "#9999ff"});
  for (var i = 0; i < 8; i++)
  {
    a.css(i, 0, {"background-color": "white"});
    mat.css(1, i, {"background-color": "#33ccff"});
    mat.css(2, i, {"background-color": "#ffff4d"});
    mat.css(3, i, {"background-color": "#00ffbf"});
    mat.css(4, i, {"background-color": "#df80ff"});
    mat.css(5, i, {"background-color": "#999999"});
    mat.css(6, i, {"background-color": "#ff9966"});
    mat.css(7, i, {"background-color": "#9999ff"});

  }

  av.recorded();


});
