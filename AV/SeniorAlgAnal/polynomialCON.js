/*global Plot */
// Written by Irena Shaffer and Alexandru Cioaca
$(document).ready(function() {
  "use strict";
  var av_name = "polynomialCON";
  var av = new JSAV(av_name);
  var width = 350, height = 140;
  var xStart = 250;
  var yEnd = 20;
  var yStart = yEnd + height;  //end position of the y on the chart
  var xMax = 300, yMax = 1500;

  function _0(n) {
    return 0 * n;
  }

  // Slide 1
  av.umsg("Consider the following polynomial. We can look at it as a sum," +
    " whose terms are powers of x, multiplied with the coefficients $a_i$.");
  var polyLab = av.label("$P(x) = a_0 + a_1x + a_2x^2 + a_3x^3$", {left: 50, top: 0});
  av.displayInit();

  // Slide 2
  av.umsg("But we can also look at it geometrically, and recognize that each term in the polynomial is adding something to the final curve.");
  av.step();

  // Slide 3
  av.umsg("First we have the constant component $a_0$, which is a horizontal line.");

  polyLab.hide();
  polyLab = av.label("$P(x) =$ <font color = red> $a_0$ </font> $+ a_1x + a_2x^2 + a_3x^3$",
                     {left: 50, top: 0});

  var xAxis = Plot.drawCurve(_0, xStart, yStart, yEnd, xMax, yMax, width, height,
                             0.5, false);
  av.g.polyline(xAxis, {stroke: "grey", "stroke-width": 2});
  av.g.line(xStart + width / 2, yEnd, xStart + width / 2, yStart + height,
            {stroke: "grey", "stroke-width": 2});
  av.g.line(xStart + width, yEnd + height, xStart + width - 10, yEnd + height - 5, {stroke: "grey", "stroke-width": 2});
  av.g.line(xStart + width, yEnd + height, xStart + width - 10, yEnd + height + 5, {stroke: "grey", "stroke-width": 2});
  av.g.line(xStart + width / 2, yEnd, xStart + width / 2 - 5, yEnd + 10, {stroke: "grey", "stroke-width": 2});
  av.g.line(xStart + width / 2, yEnd, xStart + width / 2 + 5, yEnd + 10, {stroke: "grey", "stroke-width": 2});
  av.label("x", {left: xStart + width, top: yEnd + height - 10});
  av.label("y", {left: xStart + width / 2 + 10, top: yEnd - 10});

  function _200(n) {
    return 200 + n * 0;
  }

  var curve1 = Plot.drawCurve(_200, xStart, yStart, yEnd, xMax, yMax, width, height,
                              0.5, false);
  av.g.polyline(curve1, {stroke: "red", "stroke-width": 2});
  av.step();

  // Slide 4
  av.umsg("Then, the linear component $a_1x$, is a line with slope $a_1$.");
  polyLab.hide();
  polyLab = av.label("$P(x) = $ <font color = red> $a_0$ </font> $ + $ <font color = purple> $a_1x$ </font> $ + a_2x^2 + a_3x^3$", {left: 50, top: 0});


  function _4x(n) {
    return 4 * (n - 150);
  }

  var curve2 = Plot.drawCurve(_4x, xStart, yStart, yEnd, xMax, yMax, width, height,
                              0.5, false);
  av.g.polyline(curve2, {stroke: "purple", "stroke-width": 2});
  av.step();

  // Slide 5
  av.umsg("Adding these two terms would have the effect of shifting the purple line upwards by the height of the red line.");
  av.step();

  // Slide 6
  av.umsg("Next, the quadratic term $a_2x^2$ is a parabola.");
  polyLab.hide();
  polyLab = av.label("$P(x) = $<font color = red>$a_0$</font>$ + $<font color = purple>$a_1x$</font>" +
    "$ + $<font color = blue>$a_2x^2$</font>$ + a_3x^3$", {left: 50, top: 0});
  var curve3 = Plot.drawCurve(_xpow2, xStart + 85, yStart, yEnd, xMax, yMax, width, height,
                              0.5, false);
  av.g.polyline(curve3, {stroke: "blue", "stroke-width": 2});
  function _xpow2(n) {
    return Math.pow(0.5 * (n - 77), 2);
  }
  av.step();

  // Slide 7
  av.umsg("Last, we have the 3rd degree term $a_3x^3$, which is a cubic polynomial.");
  polyLab.hide();
  polyLab = av.label("$P(x) = $ <font color = red> $a_0$ </font> $ + $ <font color = purple> $a_1x$ </font>" +
    "$+$ <font color = blue> $a_2x^2$ </font> $+$ <font color = green> $a_3x^3$ </font>",
                     {left: 50, top: 0});
  var curve4 = Plot.drawCurve(_xpow3, xStart + 105, yStart, yEnd, xMax, yMax, width, height,
                              0.5, false);
  av.g.polyline(curve4, {stroke: "green", "stroke-width": 2});

  function _xpow3(n) {
    return Math.pow(0.2 * (n - 57), 3);
  }
  av.step();

  // Slide 8
  function _cubic(n) {
    return 200 + 4 * (n - 68) + Math.pow(0.5 * (n - 74), 2) + Math.pow(0.2 * (n - 71), 3);
  }

  var curve5 = Plot.drawCurve(_cubic, xStart + 105, yStart, yEnd, xMax, yMax, width, height,
                              0.1, false);
  av.g.polyline(curve5, {"stroke-width": 3.5});
  av.umsg("Adding these 4 componets gives us our polynomial (in black).");
  av.recorded();
});
