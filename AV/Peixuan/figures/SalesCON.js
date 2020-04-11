// Written by Peixuan Ge, April 2020
// Graph for Traveling Salesman example
$(document).ready(function() {
  "use strict";
  var av = new JSAV("SalesCON", {animationMode: "none"});
  var graph = av.ds.graph({width: 300, height: 300, layout: "manual", directed: false});
  var a = graph.addNode("A", {left: 80, top: 0});
  var b = graph.addNode("B", {left: 220, top: 0});
  var c = graph.addNode("C", {left: 280, top: 130});
  var d = graph.addNode("D", {left: 150, top: 210});
  var e = graph.addNode("E", {left: 20, top: 130});
  graph.addEdge(a, b, {weight: "2"});
  graph.addEdge(a, c, {weight: "3"});
  graph.addEdge(a, d, {weight: "8"});
  graph.addEdge(a, e, {weight: "3"});
  graph.addEdge(b, c, {weight: "6"});
  graph.addEdge(b, d, {weight: "1"});
  graph.addEdge(b, e, {weight: "2"});
  graph.addEdge(c, e, {weight: "4"});
  graph.addEdge(d, e, {weight: "1"});
  graph.addEdge(c, d, {weight: "1"});
  graph.layout();
});
