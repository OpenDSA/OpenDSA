/*global Plot */
// Written by Irena Shaffer and Alexandru Cioaca
$(document).ready(function() {
  "use strict";
  var av_name = "EvalandInterpolationCON";

  var av = new JSAV(av_name);

  // Slide 1
  av.umsg("We start by drawing the curve for a polynomial, and we put it on a grid to help us see what is happening.");
  var width = 800, height = 150;
  var xStart = 220;
  var yEnd = 0;
  var yStart = yEnd + height;  //end position of the y on the chart
  var xMax = 60, yMax = 1500;

  function _xpow3(n) {
    return Math.pow(n - 12, 3);
  } // _xpow2(n)

  var curve = Plot.drawCurve(_xpow3, xStart, yStart, yEnd, xMax, yMax, width, height,
                             1, false);
  var poly = av.g.polyline(curve, {"stroke-width": 2});
  var x = 250;
  var y = 10;
  var len = 250;
  var step = len / 8;
  av.g.rect(x, y, len, len, {stroke: "blue", "stroke-width": 0.7});

  av.g.line(x + 4 * step, y, x + 4 * step, y + len,
            {stroke: "blue", "stroke-width": 0.7});
  av.g.line(x, y + 4 * step, x + len, y + 4 * step,
            {stroke: "blue", "stroke-width": 0.7});

  av.g.line(x + step, y, x + step, y + len,
            {stroke: "blue", "stroke-width": 0.3});
  av.g.line(x + 2 * step, y, x + 2 * step, y + len,
            {stroke: "blue", "stroke-width": 0.3});
  av.g.line(x + 3 * step, y, x + 3 * step, y + len,
            {stroke: "blue", "stroke-width": 0.3});
  av.g.line(x + 5 * step, y, x + 5 * step, y + len,
            {stroke: "blue", "stroke-width": 0.3});
  av.g.line(x + 6 * step, y, x + 6 * step, y + len,
            {stroke: "blue", "stroke-width": 0.3});
  av.g.line(x + 7 * step, y, x + 7 * step, y + len,
            {stroke: "blue", "stroke-width": 0.3});

  av.g.line(x, y + step, x + len, y + step,
            {stroke: "blue", "stroke-width": 0.3});
  av.g.line(x, y + 2 * step, x + len, y + 2 * step,
            {stroke: "blue", "stroke-width": 0.3});
  av.g.line(x, y + 3 * step, x + len, y + 3 * step,
            {stroke: "blue", "stroke-width": 0.3});
  av.g.line(x, y + 5 * step, x + len, y + 5 * step,
            {stroke: "blue", "stroke-width": 0.3});
  av.g.line(x, y + 6 * step, x + len, y + 6 * step,
            {stroke: "blue", "stroke-width": 0.3});
  av.g.line(x, y + 7 * step, x + len, y + 7 * step,
            {stroke: "blue", "stroke-width": 0.3});

  av.displayInit();

  // Slide 2
  av.umsg("We choose some points on the x axis. For each one, we want to know the " +
    "value of the polynomial.");
  av.g.circle(x + 12, y + 4 * step, 4, {fill: "black"});
  av.g.circle(x + 52, y + 4 * step, 4, {fill: "black"});
  av.g.circle(x + 87, y + 4 * step, 4, {fill: "black"});
  av.g.circle(x + 120, y + 4 * step, 4, {fill: "black"});
  av.g.circle(x + 165, y + 4 * step, 4, {fill: "black"});
  av.g.circle(x + 230, y + 4 * step, 4, {fill: "black"});
  av.step();

  // Slide 3
  var line1 = av.g.line(x + 12, y + 4 * step, x + 12, y + 210, {"stroke-width": 1});
  av.g.circle(x + 12, y + 210, 4, {stroke: "green", fill: "green"});
  var line2 = av.g.line(x + 52, y + 4 * step, x + 52, y + 160, {"stroke-width": 1});
  av.g.circle(x + 52, y + 160, 4, {stroke: "green", fill: "green"});
  var line3 = av.g.line(x + 87, y + 4 * step, x + 87, y + 143, {"stroke-width": 1});
  av.g.circle(x + 87, y + 143, 4, {stroke: "green", fill: "green"});
  var line4 = av.g.line(x + 120, y + 4 * step, x + 120, y + 140, {"stroke-width": 1});
  av.g.circle(x + 120, y + 140, 4, {stroke: "green", fill: "green"});
  var line5 = av.g.line(x + 165, y + 4 * step, x + 165, y + 138, {"stroke-width": 1});
  av.g.circle(x + 165, y + 138, 4, {stroke: "green", fill: "green"});
  var line6 = av.g.line(x + 230, y + 4 * step, x + 230, y + 97, {"stroke-width": 1});
  av.g.circle(x + 230, y + 97, 4, {stroke: "green", fill: "green"});
  av.umsg("Finding the value of the polynomial at these values for $x$ is called <b>Evaluation</b>.");
  av.step();

  // Slide 4
  poly.hide();
  av.umsg("Now imagine we don't know an equation for the polynomial. Instead, " +
    "we only have its value at certain points.");
  av.step();

  // Slide 5
  av.umsg("From the values at the points, the polynomial can be re-constructed. " +
    "To get an exact equation for the polynomial, the number of points that we know " +
    "the value for must be at least one more than the degree of the polynomial.");
  av.step();

  // Slide 6
  av.umsg("For example, $a_0 + a_1x + a_2x^2 + a_3x^3$ is a 3rd degree polynomial. " +
    "So, the values at four or more points must be known to re-construct this cubic polynomial.");
  var poly2 = av.g.polyline(curve, {stroke: "grey", "stroke-width": 2});
  av.step();

  // Slide 7
  av.umsg("This process of constructing a polynomial from a set of points is called <b>Interpolation</b>.");
  line1.hide();
  line2.hide();
  line3.hide();
  line4.hide();
  line5.hide();
  line6.hide();
  poly2.hide();
  poly.show();
  av.recorded();
});
