/*global ODSA */
// Written by Cliff Shaffer
// Show the costs for some simple problems, for a given n or for growing n
$(document).ready(function() {
  "use strict";
  var av_name = "SimpleCosts2CON";
  var av = new JSAV(av_name);
  var topAlign = 40;
  var left = 100;
  var yLength = 150; // Graph y axis size
  var xLength = 150; // Graph x axis size

  // Now, draw the second row of graphs: Behavior as n grows toward infinity
  left = 100;
  av.label("Costs, as $n$ grows, for some representative algorithms", {top: topAlign - 50, left: 200}).addClass("largeLabel");
  av.g.polyline([[left, topAlign], [left, topAlign + yLength],
                 [left + xLength, topAlign + yLength]]);
  av.label("$n$", {top: topAlign + yLength - 5,
                   left: left + xLength - 75}).addClass("smallLabel");
  av.label("cheap", {top: topAlign + yLength - 5, left: left}).addClass("smallLabel");
  av.label("expensive", {top: topAlign + yLength - 5, left: left + 120}).addClass("smallLabel");
  av.label("$2^n-1$", {top: topAlign + 3, left: left - 30}).addClass("smallLabel");
  av.label("_", {top: topAlign - 20, left: left - 4}).addClass("largeLabel");
  av.label("$T(n) = 2^n-1$", {top: topAlign + 50, left: left + 30});
  av.label("Towers of Hanoi", {top: topAlign + 150, left: left + 20});

  var xGraph = left;
  var yGraph = topAlign + yLength;

  // It appears that path can only handle 6 points, so the last one is
  // made a bit high 
  av.g.path(["M", xGraph + 1, yGraph - 1, "C",
             xGraph + 2, yGraph - 3, xGraph + 3, yGraph - 7,
             xGraph + 4, yGraph - 15, xGraph + 5, yGraph - 31,
             xGraph + 6, yGraph - 63, xGraph + 7, yGraph - 150,
            ].join(","));

  left += 250;
  av.g.polyline([[left, topAlign], [left, topAlign + yLength],
                 [left + xLength, topAlign + yLength]]);
  av.label("$n$", {top: topAlign + yLength - 5,
                   left: left + xLength - 75}).addClass("smallLabel");
  av.label("cheap", {top: topAlign + yLength - 5, left: left}).addClass("smallLabel");
  av.label("expensive", {top: topAlign + yLength - 5, left: left + 120}).addClass("smallLabel");
  av.label("$n$", {top: topAlign - 10, left: left - 20});
  av.label("_", {top: topAlign - 20, left: left - 4}).addClass("largeLabel");
  av.label("$1$", {top: topAlign + xLength - 40, left: left - 20});
  av.label("_", {top: topAlign + xLength - 50, left: left - 4}).addClass("largeLabel");
  av.g.line(left, topAlign + xLength - 14, left + xLength, topAlign + 16);
  av.label("FindMax", {top: topAlign + 150, left: left + 50});

  left += 250;
  av.g.polyline([[left, topAlign], [left, topAlign + yLength],
                 [left + xLength, topAlign + yLength]]);
  av.label("$n$", {top: topAlign + yLength - 5,
                   left: left + xLength - 75}).addClass("smallLabel");
  av.label("cheap", {top: topAlign + yLength - 5, left: left}).addClass("smallLabel");
  av.label("expensive", {top: topAlign + yLength - 5, left: left + 120}).addClass("smallLabel");
  av.label("$1$", {top: topAlign + xLength - 40, left: left - 20});
  av.label("_", {top: topAlign + xLength - 50, left: left - 4}).addClass("largeLabel");
  av.g.line(left, topAlign + xLength - 14, left + xLength, topAlign + xLength - 14);
  av.label("Find (Best)", {top: topAlign + 150, left: left + 40});

  topAlign += 190;
  av.g.polyline([[left, topAlign], [left, topAlign + yLength],
                 [left + xLength, topAlign + yLength]]);
  av.label("$n$", {top: topAlign + yLength - 5,
                   left: left + xLength - 75}).addClass("smallLabel");
  av.label("cheap", {top: topAlign + yLength - 5, left: left}).addClass("smallLabel");
  av.label("expensive", {top: topAlign + yLength - 5, left: left + 120}).addClass("smallLabel");
  av.label("$n$", {top: topAlign - 10, left: left - 20});
  av.label("_", {top: topAlign - 20, left: left - 4}).addClass("largeLabel");
  av.label("$1$", {top: topAlign + xLength - 40, left: left - 20});
  av.label("_", {top: topAlign + xLength - 50, left: left - 4}).addClass("largeLabel");
  av.g.line(left, topAlign + xLength - 14, left + xLength, topAlign + xLength/2);
  av.label("Find (Average)", {top: topAlign + 150, left: left + 40});

  topAlign += 190;
  av.g.polyline([[left, topAlign], [left, topAlign + yLength],
                 [left + xLength, topAlign + yLength]]);
  av.label("$n$", {top: topAlign + yLength - 5,
                   left: left + xLength - 75}).addClass("smallLabel");
  av.label("cheap", {top: topAlign + yLength - 5, left: left}).addClass("smallLabel");
  av.label("expensive", {top: topAlign + yLength - 5, left: left + 120}).addClass("smallLabel");
  av.label("$n$", {top: topAlign - 10, left: left - 20});
  av.label("_", {top: topAlign - 20, left: left - 4}).addClass("largeLabel");
  av.label("$1$", {top: topAlign + xLength - 40, left: left - 20});
  av.label("_", {top: topAlign + xLength - 50, left: left - 4}).addClass("largeLabel");
  av.g.line(left, topAlign + xLength - 14, left + xLength, topAlign + 16);
  av.label("Find (Worst)", {top: topAlign + 150, left: left + 40});

  av.displayInit();
  av.recorded();
  // Invoke MathJax to get equations to display correctly
  MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
});
