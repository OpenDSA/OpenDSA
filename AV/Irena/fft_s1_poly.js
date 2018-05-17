$(document).ready(function() {
  "use strict";
  var av_name = "fft_s1_poly";

  var av = new JSAV(av_name);
  
  // Slide #1
  av.umsg("Consider the following polynomial: We can look at it as a sum,"
    + " whose terms are powers of x, multiplied with the coefficients a");
  av.label("$P(x) = a_0 + a_1x + a_2x^2 + a_3x^3$", {left: 50, top: 0});
  av.label("", {left: 0, top: 200});
  av.displayInit();

  // Slide #2
  av.umsg("First we have the constant component, represented by a0");
  av.g.line(100, 150, 500, 150, {stroke: "red", "stroke-width": 2});
  av.step();

  // Slide #3
  av.umsg("Then, a linear component represented by a line of slope a1");
  av.g.line(150, 225, 450, 75, {stroke: "blue", "stroke-width": 2});
  av.step();

  // Slide 4
  av.umsg("Next, the root of x multiplied with a1");

  //var curve = Plot.drawCurve(_xpow2, av, xStart, yStart, yEnd, xMax, yMax, width, height,
  //                       "$5n\\log_2{n}$", -40, -40, 1, true);
  //av.g.polyline(curve1, {"stroke-width": 2});

  function _xpow2(n) {
    return Math.pow(n, 2);
  }; // _5nlog2n

  av.step();

  // Slide 5
  av.umsg("Last, we have a third-order component, with the coefficient a3");
  av.step();

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
