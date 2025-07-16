/*global ODSA */
// Written by Cliff Shaffer
// Show the costs for some simple problems, for a given n or for growing n
$(document).ready(function() {
  "use strict";
  var av_name = "SimpleCosts1CON";
  var av = new JSAV(av_name);
  var topAlign = 50;
  var left = 100;
  var yLength = 150; // Graph y axis size
  var xLength = 150; // Graph x axis size

  // First, draw the top row of graphs: for an arbitrary (but specific) value of n
  av.label("Costs for all inputs of an arbitrary (but fixed) size $n$ for three representative algorithms", {top: topAlign - 50, left: 130}).addClass("largeLabel");

  var axis = av.g.polyline([[left, topAlign], [left, topAlign + yLength],
                            [left + xLength, topAlign + yLength]]);
  var xLabel = av.label("$I_n$", {top: topAlign + yLength - 5,
                                 left: left + xLength - 75}).addClass("smallLabel");
  av.label("cheap", {top: topAlign + yLength - 5, left: left}).addClass("smallLabel");
  av.label("expensive", {top: topAlign + yLength - 5, left: left + 120}).addClass("smallLabel");
  av.label("$2^n-1$", {top: topAlign + 3, left: left - 30}).addClass("smallLabel");
  av.label("_", {top: topAlign - 20, left: left - 4}).addClass("largeLabel");
  av.label("$*$", {top: topAlign - 10, left: left + 70});
  av.label("Towers of Hanoi", {top: topAlign + 150, left: left + 20});

  left += 250;
  var axis = av.g.polyline([[left, topAlign], [left, topAlign + yLength],
                            [left + xLength, topAlign + yLength]]);
  xLabel = av.label("$I_n$", {top: topAlign + yLength - 5,
                                 left: left + xLength - 75}).addClass("smallLabel");
  av.label("cheap", {top: topAlign + yLength - 5, left: left}).addClass("smallLabel");
  av.label("expensive", {top: topAlign + yLength - 5, left: left + 120}).addClass("smallLabel");
  av.label("$n$", {top: topAlign - 10, left: left - 20});
  av.label("_", {top: topAlign - 20, left: left - 4}).addClass("largeLabel");
  av.g.line(left, topAlign + 16, left + xLength, topAlign + 16);
  av.label("FindMax", {top: topAlign + 150, left: left + 50});

  left += 250;
  var axis = av.g.polyline([[left, topAlign], [left, topAlign + yLength],
                            [left + xLength, topAlign + yLength]]);
  xLabel = av.label("$I_n$", {top: topAlign + yLength - 5,
                                 left: left + xLength - 75}).addClass("smallLabel");
  av.label("cheap", {top: topAlign + yLength - 5, left: left}).addClass("smallLabel");
  av.label("expensive", {top: topAlign + yLength - 5, left: left + 120}).addClass("smallLabel");
  av.label("$n$", {top: topAlign - 10, left: left - 20});
  av.label("_", {top: topAlign - 20, left: left - 4}).addClass("largeLabel");
  av.label("$1$", {top: topAlign + xLength - 40, left: left - 20});
  av.label("_", {top: topAlign + xLength - 50, left: left - 4}).addClass("largeLabel");
  av.g.line(left, topAlign + xLength - 14, left + xLength, topAlign + 16);
  av.label("Find", {top: topAlign + 150, left: left + 70});

  av.displayInit();
  av.recorded();
  // Invoke MathJax to get equations to display correctly
  MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
});
