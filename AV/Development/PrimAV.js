"use strict";
/*global alert: true, ODSA */

(function ($) {
  var jsav;
  var graph;
  var gnodes = [];

  function runit() {
    ODSA.AV.reset(true);
    jsav = new JSAV($('.avcontainer'));
    graph = jsav.ds.graph({width: 600, height: 400, layout: "manual",
                           directed: false});
    initGraph();
    graph.layout();
    jsav.displayInit();
    prim(graph.nodes()[0]);            // Run Prim's algorithm from start node.
    displayMST();
    jsav.recorded();
  }

  function displayMST() {
    var edges = graph.edges();
    var next;
    console.log("Display the MST");
    for (next = edges.next(); next; next = edges.next()) {
      console.log("Got edge from " + next.start().value() + " to " + next.end().value());
      if (next.mst !== true) {
        console.log("Remove an edge from " + next.start().value() + " to " + next.end().value());
        graph.removeEdge(next);
      }
      else {
        console.log("KEEP EDGE");
      }
      console.log("Done the edge");
    }
    jsav.umsg("Complete minimum spanning tree");
  }

  // Mark a node in the graph.
  function markIt(node) {
    node.addClass("visited");
    jsav.umsg("Add node " + node.value() + " to the MST");
    node.highlight();
    jsav.step();
  }

  // Find the unvisited vertex with the smalled distance
  function minVertex() {
    var v;    // The closest node seen so far
    var next; // Current node being looked at
    var gnodes = graph.nodes();

    for (next = gnodes.next(); next; next = gnodes.next()) {
      if (!next.hasClass("visited")) {
        v = next;
        break;
      }
    }
    for (next = gnodes.next(); next; next = gnodes.next()) {
      if (!(next.hasClass("visited")) && next.D < v.D) {
        v = next;
      }
    }
    console.log("v is " + v.value() + ", Distance for v is " + v.D);
    return v;
  }

  // Compute Prim's algorithm and return edges
  function prim(s) {
    var v;         // The current node added to the MST
    var neighbors = []; // The neighbors of a specific node
    var weight;         // Weight of current edge
    var next, i;

    for (next = gnodes.next(); next; next = gnodes.next()) {
      next.D = Infinity;
      next.parent = next;
    }
    s.D = 0;
    for (i = 0; i < graph.nodeCount(); i++) {
      v = minVertex();
      markIt(v);
      if (v.D === Infinity) {
        jsav.umsg("No other nodes are reachable, so quit.");
        jsav.step();
        return;
      }
      if (v !== s) {
        //Add an edge to the MST
        var edge = graph.getEdge(v.parent, v);
        edge.css({"stroke-width": "4", "stroke": "red"});
	edge.mst = true;
        jsav.umsg("Adding the edge (" + v.parent.value() +
                  "," + v.value() + ") to the MST");
        jsav.step();
      }
      neighbors = v.neighbors();
      for (var j = 0; j < neighbors.length; j++) {
        if (!neighbors[j].hasClass("visited")) {
          var w = neighbors[j];
          weight = v.edgeTo(w).weight();
          //Update Distances Of neighbors not in the minimum spanning tree
          if (w.D > weight) {
            w.D = weight;
            w.parent = v;
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
		
    graph.addEdge(a, c, {"weight": 7});
    graph.addEdge(a, e, {"weight": 9});
    graph.addEdge(c, b, {"weight": 5});
    graph.addEdge(c, d, {"weight": 1});
    graph.addEdge(c, f, {"weight": 2});
    graph.addEdge(f, b, {"weight": 6});
    graph.addEdge(d, f, {"weight": 2});
    graph.addEdge(e, f, {"weight": 1});

    gnodes = graph.nodes();
  }
  
  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  //$('#help').click(help);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
