"use strict";
/*global alert: true, ODSA */

(function ($) {
  var jsav;
  var graph;
  var gnodes = [];
  var distances;
  var labels;
  var arr;     //Used to initialize the distance and labels arrays.

  function runit() {
    ODSA.AV.reset(true);
    jsav = new JSAV($('.avcontainer'));
    graph = jsav.ds.graph({width: 600, height: 400, layout: "manual",
                           directed: false});					   
    initGraph();
    graph.layout();
	
    arr=new Array(graph.nodeCount());
    for(var i=0;i<arr.length;i++){
      arr[i]=Infinity;
    }
    distances = jsav.ds.array(arr,{layout: "vertical"});
    distances.css({"left": "600px", "bottom": "380px", "width": "30px"}); 
	
    for(var i=0;i<arr.length;i++){
      arr[i]=gnodes[i].value();
    }
    labels = jsav.ds.array(arr,{layout: "vertical"});
    labels.css({"left": "555px", "bottom": "676px", "width": "30px"}); 
	
    jsav.displayInit();
    prim(gnodes[0]);            // Run Prim's algorithm from start node.
    //displayMST();
    jsav.recorded();
  }

  function displayMST() {
    var edges = graph.edges();
    var next;
    for (next = edges.next(); next; next = edges.next()) {
      if (next.mst !== true) {
        // We need to check if (a, b) exists because (b, a) might have been removed earlier
	if (graph.hasEdge(next.start(), next.end())) {
          graph.removeEdge(next);
	}
      }
    }
    jsav.umsg("Complete minimum spanning tree");
    jsav.step();
  }

  // Mark a node in the graph.
  function markIt(node) {
    node.addClass("visited");
    jsav.umsg("Add node " + node.value() + " to the MST");
    distances.highlight(gnodes.indexOf(node));
    labels.highlight(gnodes.indexOf(node));
    node.highlight();
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
    distances.css({"left": "600px", "bottom": "380px", "width": "30px"}); 
    distances.value(gnodes.indexOf(s),s.D);
    jsav.umsg("Update the distance value of node "+s.value());
    jsav.step();
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
        var backedge = graph.getEdge(v, v.parent);
        edge.css({"stroke-width": "4", "stroke": "red"});
        edge.mst = true;
	backedge.mst = true;
        jsav.umsg("Adding the edge (" + v.parent.value() +
                  "," + v.value() + ") to the MST");
        jsav.step();
      }
      neighbors = v.neighbors();
      var nodes="";
      for (var j = 0; j < neighbors.length; j++) {
        if (!neighbors[j].hasClass("visited")) {
          var w = neighbors[j];
          weight = v.edgeTo(w).weight();
          //Update Distances Of neighbors not in the minimum spanning tree
          if (w.D > weight) {
            w.D = weight;
            w.parent = v;
//            distances.css({"left": "600px", "bottom": "380px", "width": "30px"}); 
            distances.value(graph.nodes().indexOf(w),w.D);
            if(j<neighbors.length-1) {
               nodes+=w.value()+",";
	    }
            else{
              nodes+=w.value();
            }
          }
        }
      }
      if(nodes!="") {
        jsav.umsg("Update the distance values of nodes ("+nodes+")");
        jsav.step();
      }
    }
  }
  
  function about() {
    var mystring = "Prim's Algorithm Visualization\nWritten by Mohammed Fawzy and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during Spring, 2013\nLast update: March, 2013\nJSAV library version " + JSAV.version();
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
