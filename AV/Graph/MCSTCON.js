$(document).ready(function () {
  "use strict";
  var av = new JSAV("MCSTCON", {"animationMode": "none"});
  var g = av.ds.graph({width: 500, height: 250,
                         layout: "manual", directed: false});
  var vA = g.addNode("A", {"left":  20, "top":   0});
  var vB = g.addNode("B", {"left": 250, "top":   0});
  var vC = g.addNode("C", {"left": 100, "top":  50});
  var vD = g.addNode("D", {"left": 100, "top": 150});
  var vE = g.addNode("E", {"left":   0, "top": 200});
  var vF = g.addNode("F", {"left": 250, "top": 175});
  g.addEdge(vA, vC, {"weight": 7, "stroke-width": 6, "stroke": "red"});
  g.addEdge(vA, vE, {"weight": 9});
  g.addEdge(vB, vC, {"weight": 5, "stroke-width": 6, "stroke": "red"});
  g.addEdge(vB, vF, {"weight": 6});
  g.addEdge(vC, vD, {"weight": 1, "stroke-width": 6, "stroke": "red"});
  g.addEdge(vC, vF, {"weight": 2, "stroke-width": 6, "stroke": "red"});
  g.addEdge(vD, vF, {"weight": 2});
  g.addEdge(vE, vF, {"weight": 1, "stroke-width": 6, "stroke": "red"});
  g.layout();
  av.displayInit();
  av.recorded();
});
