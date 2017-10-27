// Plotting functions
// Written by Jieun Chon, Cliff Shaffer, and Ville Karavirta
(function() {
  "use strict";

  var Plot = {

    // Draw a dashed line
    drawDash : function(func, xStart, yStart, xEnd, xMax, yMax, height) {
      var points = [xStart, yStart, xEnd];
      var y = yStart - func(xMax) * height / yMax;
      points.push(y);
      return points;
    },


    // Draw an arbitrary curve from a function passed in
    drawCurve: function(func, jsav, xStart, yStart, yEnd, xMax, yMax, width, height, label, labelx, labely, increment, isLog, gap) {
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
      jsav.label(label, {left: x + labelx, top: y + labely});
      return points;
    }
  }; // Plot

  window.Plot = window.Plot || Plot;
}());
