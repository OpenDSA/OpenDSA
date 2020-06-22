"use strict";
/*global alert: true, ODSA */

$(document).ready(function() {
  var jsav = new JSAV("dijkstraCON");
  var graph;
  var mst;   //A graph representing the resulted path
  var gnodes = [];
  var mstnodes = [];
  var distances;
  var labels;
  var arr;     //Used to initialize the distance and labels arrays.
  var userCreated;
  var gg;      //Serialized graph
  var nodesOrdered = [];  //Holding the ordered nodes added to the path
  var step;               //A counter of the nodes added so far
  var q;                  //Question


  //graph = jsav.ds.graph({width: 600, height: 400, layout: "manual", directed: true});
	mst = jsav.ds.graph({width: 600, height: 400, layout: "manual", directed: true});
	initGraph();
	graph.layout();
  //mst.hide();
	arr = new Array(graph.nodeCount());
    for (i = 0; i < arr.length; i++) {
      arr[i] = Infinity;
    }
    distances = jsav.ds.array(arr, {layout: "vertical", left: 650, top: 0});
    distances.css({width: 40});
    for (i = 0; i < arr.length; i++) {
      arr[i] = gnodes[i].value();
    }
    labels = jsav.ds.array(arr, {layout: "vertical", left: 603, top: 0});
    jsav.umsg("We will call Dijkstra's algorithm with a start vertex of " +
              gnodes[0].value());
    jsav.displayInit();
    dijkstra(gnodes[0]);            // Run Dijkstra's algorithm from start node.
    displayMST();
    jsav.recorded();


  function displayMST() {
    var next;
    var edges = mst.edges();
    //graph.hide();
    mst.layout();
    jsav.umsg("Complete Shortest Paths");
  }

  // Mark a node in the graph.
  function markIt(node) {
    node.addClass("visited");
    jsav.umsg("The unmarked vertex with the smallest value is now " + node.value() + ". Mark it.");
    distances.highlight(gnodes.indexOf(node));
    labels.highlight(gnodes.indexOf(node));
    node.highlight();
	nodesOrdered[step] = node;
	step++;
	//console.log("Nodes added so far: "+step);
    jsav.step();
  }

  // Find the unvisited vertex with the smalled distance
  function minVertex() {
    var v;    // The closest node seen so far
    var next; // Current node being looked at
    gnodes.reset();
    for (next = gnodes.next(); next; next = gnodes.next()) {
      if (!next.hasClass("visited")) {
        v = next;
        break;
      }
    }
    for (next = gnodes.next(); next; next = gnodes.next()) {
      if (!(next.hasClass("visited")) && distances.value(next.index) < distances.value(v.index)) {
        v = next;
      }
    }
    console.log("v is " + v.value() + ", Distance for v is " + distances.value(v.index));
    return v;
  }

  // Compute Prim's algorithm and return edges
  function dijkstra(s) {
    var v;         // The current node added to the MST
    var neighbors = []; // The neighbors of a specific node
    var cost;         // Cost of adding a node to the path
    var next, i;

  // Initialize the MST "parents" to dummy values
    for (next = gnodes.next(); next; next = gnodes.next()) {
      next.parent = next;
    }
    distances.value(s.index, 0);
    jsav.umsg("Since " + s.value() +
              " is the start node, its distance is initially 0");
    jsav.step();
    for (i = 0; i < graph.nodeCount(); i++) {
      v = minVertex();
      if (distances.value(v.index) === Infinity) {
        jsav.umsg("No other nodes are reachable, so quit.");
        jsav.step();
        return;
      }
      markIt(v);
      if (v !== s) {
        //Add an edge
        var edge = graph.getEdge(v.parent, v);
	console.log(v.parent.value() + '    ' + v.value());
        edge.css({"stroke-width": "4", "stroke": "red"});
        var mstedge = mst.addEdge(mstnodes[v.parent.index], mstnodes[v.index], {"weight": edge.weight()});
        mstedge.css({"stroke-width": "4", "stroke": "red"});
        jsav.umsg("Add edge (" + v.parent.value() + "," + v.value() + ")");
        jsav.step();
      }
      neighbors = v.neighbors();
      for (var j = 0; j < neighbors.length; j++) {
        if (!neighbors[j].hasClass("visited")) {
          var w = neighbors[j];
          cost = v.edgeTo(w).weight() + distances.value(v.index);
          //Update Distances Of neighbors
          var msg = "<u>Processing edge (" + v.value() + "," + w.value() + "): </u>";
          if (distances.value(w.index) > cost) {
            w.parent = v;
            distances.value(w.index, cost);
            msg += "Update the distance value of node (" + w.value() + ")";
          }
          else {
            msg += "Leave the distance value of node (" + w.value() + ") unchanged";
          }
          jsav.umsg(msg);
          jsav.step();
        }
      }
    }
  }

  function about() {
    var mystring = "Dijkstra's Algorithm Visualization\nWritten by Mohammed Fawzy and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://opendsa.org.\nWritten during Spring, 2013\nLast update: March, 2013\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Initialize the graph.
  function initGraph() {
      //Nodes of the original graph
      //Nodes of the MST
      mst.addNode("A", {"left": 25, "top": 50});
      mst.addNode("B", {"left": 325, "top": 50});
      mst.addNode("C", {"left": 145, "top": 75});
      mst.addNode("D", {"left": 145, "top": 200});
      mst.addNode("E", {"left": 0, "top": 300});
      mst.addNode("F", {"left": 325, "top": 250});
      //Original graph edges
      mst.addEdge(a, c, {"weight": 7});
      mst.addEdge(a, e, {"weight": 9});
      mst.addEdge(c, b, {"weight": 5});
      mst.addEdge(c, d, {"weight": 1});
      mst.addEdge(c, f, {"weight": 2});
      mst.addEdge(f, b, {"weight": 6});
      mst.addEdge(d, f, {"weight": 2});
      mst.addEdge(e, f, {"weight": 1});


    gnodes = mst.nodes();
    mstnodes = mst.nodes();
    for (var i = 0; i < mstnodes.length; i++) {
      gnodes[i].index = i;
    }
  }

});
