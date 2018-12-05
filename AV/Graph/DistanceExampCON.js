$(document).ready(function () {
  "use strict";
  var av = new JSAV("DistanceExampCON", {"animationMode": "none"});
  var g = av.ds.graph({width: 300, height: 200,
                         layout: "manual", directed: true});
  var a = g.addNode("A", {"left": 0, "top":  75});
  var b = g.addNode("B", {"left": 100, "top":  0});
  var c = g.addNode("C", {"left": 100, "top": 150});
  var d = g.addNode("D", {"left": 250, "top":  25});
  var e = g.addNode("E", {"left": 250, "top": 150});

  g.addEdge(a, b, {"weight": 10});
  g.addEdge(a, c, {"weight":  3});
  g.addEdge(a, d, {"weight": 20});
  g.addEdge(b, d, {"weight":  5});
  g.addEdge(c, b, {"weight":  2});
  g.addEdge(c, e, {"weight": 15});
  g.addEdge(d, e, {"weight": 11});
  g.layout();
  av.displayInit();
  av.recorded();
});
