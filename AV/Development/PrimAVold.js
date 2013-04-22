"use strict";
/*global alert: true, ODSA */

(function ($) {
  var jsav;
  var graph;
  var mst;
  var gnodes = [];   // The nodes for graph
  var mstnodes = []; // The nodes for mst

  function runit() {
    ODSA.AV.reset(true);
    jsav = new JSAV($('.avcontainer'));
    graph = jsav.ds.graph({width: 600, height: 400, layout: "manual",
                           directed: false});
    mst = jsav.ds.graph({width: 600, height: 400, layout: "manual",
                         directed: false});
    initGraph();
    graph.layout();
    jsav.displayInit();
    prim(0);            // Run Prim's algorithm from start node.
    graph.hide();
    jsav.umsg("Complete minimum spanning tree");
    mst.layout();
    jsav.recorded();
  }

  // Mark a node in the graph.
  function markIt(node) {
    node.addClass("visited");
    jsav.umsg("Add node " + node.value() + " to the MST");
    node.highlight();
    jsav.step();
  }

  // Find the unvisited vertex with the smalled distance
  function minVertex(D) {
    var v = Infinity;
    var i;
    for (i = 0; i < graph.nodeCount(); i++) {
      if (!graph.nodes()[i].hasClass("visited")) {
        v = i;
        break;
      }
    }
    for (i = 0; i < graph.nodeCount(); i++) {
      if (!(graph.nodes()[i].hasClass("visited")) && D[i] < D[v]) {
        v = i;
      }
    }
    return v;
  }

  // Compute Prim's algorithm and return edges
  function prim(s) {
    var D = [];         // Distances to nodes
    var v;              // The current node added to the MST
    var neighbors = []; // The neighbors of a specific node
    var parents = [];   // Node parents in the MST
    var weight;         // Weight of current edge
    var i;
    for (i = 0; i < graph.nodeCount(); i++) {
      D[i] = Infinity;
      parents[i] = Infinity;
    }
    D[s] = 0;
    parents[s] = 0;
    for (i = 0; i < graph.nodeCount(); i++) {
      v = minVertex(D);
      markIt(graph.nodes()[v]);
      if (D[v] === Infinity) {
        jsav.umsg("No other nodes are reachable, so quit.");
        jsav.step();
        return;
      }
      if (v !== s) {
        //Add an edge to the MST
        var edge = graph.getEdge(graph.nodes()[parents[v]], graph.nodes()[v]);
        mst.addEdge(mst.nodes()[parents[v]], mst.nodes()[v],
                    {"weight": edge.weight()});
        edge.css({"stroke-width": "4", "stroke": "red"});
        jsav.umsg("Adding the edge (" + graph.nodes()[parents[v]].value() +
                  "," + graph.nodes()[v].value() + ") to the MST");
        jsav.step();
      }
      neighbors = graph.nodes()[v].neighbors();
      for (var j = 0; j < neighbors.length; j++) {
        if (!neighbors[j].hasClass("visited")) {
          var w = graph.nodes().indexOf(neighbors[j]);
          weight = (graph.nodes()[v].edgeTo(neighbors[j])).weight();
          //Update Distances Of neighbors not in the minimum spanning tree
          if (D[w] > weight) {
            D[w] = weight;
            parents[w] = v;
          }
        }
      }
    }
  }
  
  function about() {
    var mystring = "Prim's Algorithm Visualization\nWritten by Mohammed Fawzy\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during Spring, 2013\nLast update: March, 2013\nJSAV library version " + JSAV.version();
    alert(mystring);
    alert("Prim's Algorithm visualization");
  }

  // Initialize the graph.
  function initGraph() {
   
    var a = graph.addNode("A", {"left": 25, "top": 50});
    var b = graph.addNode("B", {"left": 325, "top": 50});
    var c = graph.addNode("C", {"left": 145, "top": 75});
    var d = graph.addNode("D", {"left": 145, "top": 200});
    var e = graph.addNode("E", {"left": 0, "top": 300});
    var f = graph.addNode("F", {"left": 325, "top": 250});
		
    //Initialize the MST
    mst.addNode("A", {"left": 25, "top": 50});
    mst.addNode("B", {"left": 325, "top": 50});
    mst.addNode("C", {"left": 145, "top": 75});
    mst.addNode("D", {"left": 145, "top": 200});
    mst.addNode("E", {"left": 0, "top": 300});
    mst.addNode("F", {"left": 325, "top": 250});

    graph.addEdge(a, c, {"weight": 7});
    graph.addEdge(a, e, {"weight": 9});
    graph.addEdge(c, b, {"weight": 5});
    graph.addEdge(c, d, {"weight": 1});
    graph.addEdge(c, f, {"weight": 2});
    graph.addEdge(f, b, {"weight": 6});
    graph.addEdge(d, f, {"weight": 2});
    graph.addEdge(e, f, {"weight": 1});

    gnodes = graph.nodes();
    mstnodes = mst.nodes();
  }
  
  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  //$('#help').click(help);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
