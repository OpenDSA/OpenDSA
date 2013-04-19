"use strict";
/*global alert: true, ODSA */

(function ($) {
  var jsav;
  var graph;
  var mst;

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
    var edges = prim(0);  // Run Prim's algorithm from start node.
	displayMST(edges);
    jsav.recorded();
  }

  //Display the MST instead of the original graph
  function displayMST(edges){
	var i;
	for(i=0;i<edges.length;i++){
		mst.addEdge(mst.nodes()[graph.nodes().indexOf(edges[i].start())]
		,mst.nodes()[graph.nodes().indexOf(edges[i].end())],
		{"weight":edges[i].weight()});
	}
	graph.hide();
	jsav.umsg("Complete minimum spanning tree");
	mst.layout();
  }

  // Mark a node in the graph.
  function markIt(node) {
    node.addClass("marked");
    jsav.umsg("Add node " + node.value() + " to the MST");
    node.highlight();
    jsav.step();
  } 

  // Find the unvisited vertex with the smalled distance
  function minVertex(D) {
    var v = Infinity;
    var i;
    for(i = 0; i < graph.nodeCount(); i++) {
      if(!graph.nodes()[i].hasClass("marked")) {
	v = i;
	break;
      }
    }
    for(i = 0; i < graph.nodeCount(); i++) {
      if(!(graph.nodes()[i].hasClass("marked")) && D[i] <D [v]){
	v = i;
      }
    }
    return v;
  }  

  // Compute Prim's algorithm and return edges
  function prim(s) {
    var D = [];       // Distances to nodes
    var v;            // The current node added to the MST
    var neighbors = [];  // The neighbors of a specific node
    var weight;             // The weight of the edge by which the distance value of a node will be updated
    var edges = [];           // Edges in the MST
    var minNode = [];         // Nodes in the MST by which other nodes outside the MST got their minimum distance 
    for(var i = 0; i < graph.nodeCount(); i++) {
      D[i]=Infinity;
    }
    for(var i = 0; i < graph.nodeCount(); i++) {
      minNode[i] = Infinity;
    }
    D[s] = 0;
    minNode[s] = 0;
    for(var i = 0; i < graph.nodeCount(); i++){
      v = minVertex(D);
      markIt(graph.nodes()[v]);
      if(v!=s){
	//Add an edge to the MST
	var edge=graph.getEdge(graph.nodes()[minNode[v]],graph.nodes()[v]);
	edge.css({"stroke-width":"4", "stroke":"red"});
	jsav.umsg("Adding the edge ("+graph.nodes()[minNode[v]].value()+","+graph.nodes()[v].value()+") to the MST");
	edges.push(edge);
	jsav.step();
      }
      neighbors=graph.nodes()[v].neighbors();
      for(var j=0;j<neighbors.length;j++){
	  if(!neighbors[j].hasClass("marked")){
	weight=(graph.nodes()[v].edgeTo(neighbors[j])).weight();
	//Update Distances Of neighbors not in the minimum spanning tree
	if(weight<=D[graph.nodes().indexOf(neighbors[j])]){
	  D[graph.nodes().indexOf(neighbors[j])]=weight;
	  minNode[graph.nodes().indexOf(neighbors[j])]=v;
	}
	}
      }
      neighbors=[];
    }
    return edges;
  }
  
  function about() {
    var mystring = "Prim's Algorithm Visualization\nWritten by Mohammed Fawzy\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during Spring, 2013\nLast update: March, 2013\nJSAV library version " + JSAV.version();
    alert(mystring);
    alert("Prim's Algorithm visualization");
  }

  // Initialize the graph.
  function initGraph() {
   
    var a = graph.addNode("A", {"left": 25,"top":50}),
        b = graph.addNode("B", {"left": 325,"top":50}),
        c = graph.addNode("C", {"left": 145, "top": 75}),
        d = graph.addNode("D", {"left": 145, "top": 200}),
        e = graph.addNode("E", {"left": 0, "top": 300}),
        f = graph.addNode("F", {"left": 325, "top": 250});
		
	//Initialize the MST
	var a1 = mst.addNode("A", {"left": 25,"top":50}),
        b1 = mst.addNode("B", {"left": 325,"top":50}),
        c1 = mst.addNode("C", {"left": 145, "top": 75}),
        d1 = mst.addNode("D", {"left": 145, "top": 200}),
        e1 = mst.addNode("E", {"left": 0, "top": 300}),
        f1 = mst.addNode("F", {"left": 325, "top": 250});
		
    var e1 = graph.addEdge(a, c,{"weight": 7}),
        e2 = graph.addEdge(a, e,{"weight": 9}),
        e3 = graph.addEdge(c, b,{"weight": 5}),
        e4 = graph.addEdge(c, d,{"weight": 1}),
        e5 = graph.addEdge(c, f,{"weight": 2}),
        e6 = graph.addEdge(f, b,{"weight": 6}),
        e7 = graph.addEdge(d, f,{"weight": 2}),
        e8 = graph.addEdge(e, f,{"weight": 1});		
  }
  
  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  //$('#help').click(help);
  $('#reset').click(ODSA.AV.reset);
}(jQuery))
