$(document).ready(function() {
  "use strict";
  var av_name = "polynomialCON";

  var av = new JSAV(av_name);
  
  // Slide #1
  av.umsg("Consider the following polynomial: We can look at it as a sum,"
    + " whose terms are powers of x, multiplied with the coefficients a");
  var a0 = "$a_0$".fontcolor("red");
  av.label("$P(x) = a_0 + a_1x + a_2x^2 + a_3x^3$", {left: 50, top: 0});
  av.displayInit();

  // Slide #2
  av.umsg("First we have the constant component, represented by $a_0$");
  av.g.line(100, 170, 500, 170, {stroke: "red", "stroke-width": 2});
  av.step();

  // Slide #3
  av.umsg("Then, a linear component represented by a line of slope $a_1$");
  av.g.line(150, 235, 450, 85, {stroke: "purple", "stroke-width": 2});
  av.step();

  // Slide 4
  av.umsg("Next, the root of x multiplied with $a_2$");

  var width = 600, height = 140;

  var xStart = 132;
  var xEnd = xStart + width;  //end position of the x on the chart

  var yEnd = 60;
  var yStart = yEnd + height;  //end position of the y on the chart
  var xyScale = height/width;
  var xMax = 60, yMax = 1500;

  var xSteps = width / xMax;  //each pixels per 1 x-unit.
  var ySteps = height / yMax;  //each pixels per 1 y-unit.


  var curve1 = Plot.drawCurve(_4xpow2, av, xStart, yStart, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  av.g.polyline(curve1, {stroke: "blue", "stroke-width": 2});

  function _4xpow2(n) {
    return Math.pow(4 * (n-10), 2);
  }; // _4xpow2(n)

  av.step();

  // Slide 5
  av.umsg("Last, we have a third-order component, with the coefficient $a_3$");

  var curve2 = Plot.drawCurve(_4xpow3, av, xStart + 30, yStart - 10, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  av.g.polyline(curve2, {stroke: "green", "stroke-width": 2});

  function _4xpow3(n) {
    return Math.pow(4 * (n-10), 3);
  }; // _4xpow2(n)

  av.step();

  var curve3 = Plot.drawCurve(_4xpow3, av, xStart, yStart-10, yEnd, xMax, yMax, width, height,
                         "", -40, -40, 1, true);
  av.g.polyline(curve3, {"stroke-width": 2});

  av.umsg("Adding these 4 componets gives us our polynomial (in black)");
  av.recorded();
});
