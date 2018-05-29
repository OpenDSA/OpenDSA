// Support for plotting non-standard functions
// Written by Jieun Chon, Cliff Shaffer, and Ville Karavirta
(function() {
  "use strict";

  var Plot = {

    // Create and return a set of points used to draw a dashed line.
    // func: The function for the line being drawn
    drawDash: function(func, xStart, yStart, xEnd, xMax, yMax, height) {
      var points = [xStart, yStart, xEnd];
      var y = yStart - func(xMax) * height / yMax;
      points.push(y);
      return points;
    },


    // Create and return a set of points used to draw an arbitary function
    // func: The function being drawn, it is used to generate the y values
    // xStart: The x coordinate of the starting point of the function
    // yStart: The y coordinate of the starting point of the function
    // yEnd: The y coordinate of the ending point of the function
    // xMax: maximum number of steps in the x direction
    // yMax: maximum number of steps in the y direction
    // width: number of pixels in the width of the function
    // height: number of pixels in the height of the function
    // increment: Something to do with how big a step to take, to avoid jaggies
    // isLog: if true start at 1, if false start at 0
    // TODO: We should automate the incrementing process!
    drawCurve: function(func, xStart, yStart, yEnd, xMax, yMax, width, height, increment, isLog) {
      var points = [];
      var xStep = width / xMax;
      var start = isLog ? 1 : 0;
      var x, y;
      for (var i = start; i <= xMax; i += increment) {
        x = xStart + (i * xStep);
        y = yStart - ((func(i) / yMax) * height);
        if (y < yEnd) {
          y = yEnd;
          points.push([x, y]);
          break;
        }
        points.push([x, y]);
      }
      return points;
    }
  }; // Plot

  window.Plot = window.Plot || Plot;
}());
