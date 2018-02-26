/*global ODSA */
"use strict";
$(document).ready(function () {
  var av_name = "GacyclicDefCON";
  var av = new JSAV(av_name, {"animationMode" : "none"});

  var gTop = -5;
  var gLeft = 50;
  var gWidth = 220;
  var gHeight = 220;
  var lHeight = 195; // For the graph labels

  // Lines for visual break up
  av.g.line(425, gTop, 425, gHeight).addClass("borderEdge");

  // Create DAG Graph
  var graphA = av.ds.graph({top: gTop, left: gLeft, directed: true,
                            width: gWidth, height: gHeight});

  var node0 = graphA.addNode("0", {left:  0, top: 10});
  var node1 = graphA.addNode("1", {left:  90, top: 10});
  var node2 = graphA.addNode("2", {left:  45, top: 90});
  var node3 = graphA.addNode("3", {left:  125, top: 60});
  var node4 = graphA.addNode("4", {left:  125, top: 120});
  var node5 = graphA.addNode("5", {left:  195, top: 90});
  var node6 = graphA.addNode("6", {left:  40, top: 160});

  graphA.addEdge(node0, node1);
  graphA.addEdge(node0, node2);
  graphA.addEdge(node2, node3);
  graphA.addEdge(node2, node4);
  graphA.addEdge(node3, node5);
  graphA.addEdge(node4, node5);
  graphA.addEdge(node6, node4);
  graphA.layout();

  av.label("(a) Directed Acyclic Graph", {top: lHeight, left: 100}).show();

  // Create Acyclic graph
  gLeft = 500;
  var graphB = av.ds.graph({left: gLeft, top: gTop, directed: false,
                            width: gWidth, height: gHeight});
  node0 = graphB.addNode("0", {left: 0, top: 70});
  node1 = graphB.addNode("1", {left: 30, top: 10});
  node2 = graphB.addNode("2", {left: 75, top: 70});
  node3 = graphB.addNode("3", {left: 100, top: 130});
  node4 = graphB.addNode("4", {left: 90, top: 10});
  node5 = graphB.addNode("5", {left: 170, top: 130});

  graphB.addEdge(node0, node1);
  graphB.addEdge(node1, node2);
  graphB.addEdge(node2, node3);
  graphB.addEdge(node2, node4);
  graphB.addEdge(node3, node5);
  graphB.layout();

  av.label("(b) Acyclic Graph", {top: lHeight, left: 570}).show();
});
