$(document).ready(function() {
  "use strict";
  var av_name = "fft_s1_poly";

  var av = new JSAV(av_name);
  
  // Slide #1
  av.umsg("Consider the following polynomial: We can look at it as a sum,"
    + " whose terms are powers of x, multiplied with the coefficients a");
  var a0 = "$a_0$".fontcolor("red");
  av.label("$P(x) = a_0 + a_1x + a_2x^2 + a_3x^3$", {left: 50, top: 0});
  av.displayInit();

  // Slide #2
  av.umsg("First we have the constant component, represented by $a_0$");
  av.g.line(100, 150, 500, 150, {stroke: "red", "stroke-width": 2});
  av.step();

  // Slide #3
  av.umsg("Then, a linear component represented by a line of slope $a_1$");
  av.g.line(150, 225, 450, 75, {stroke: "purple", "stroke-width": 2});
  av.step();

  // Slide 4
  av.umsg("Next, the root of x multiplied with $a_2$");

  var width = 600, height = 150;

  var xStart = 165;
  var xEnd = xStart + width;  //end position of the x on the chart

  var yEnd = 20;
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

  var curve2 = Plot.drawCurve(_4xpow3, av, xStart + 20, yStart, yEnd, xMax, yMax, width, height,
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
  // If you add av.umsg after av.recorded, it will add new slides in
  // ways that you probably do not expect and probably cannot
  // control in the way that you want. As av.recorded() rewinds the
  // slideshow, the new slides would go to the beginning of the slideshow.
  // So, unless you are trying to add slides on-the-fly
  // interactively, you don't want to do this.
  // av.umsg("Text after av.recorded()");
});
