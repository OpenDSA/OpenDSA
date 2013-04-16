"use strict";
/*global alert: true, ODSA */

(function ($) {
  var jsav;
  var graph;

  function runit() {
    ODSA.AV.reset(true);
    jsav = new JSAV($('.avcontainer'));

    //-------------------ADD NEW GRAPH STUFF HERE----------------------------------------
    graph = jsav.ds.graph({width: 600, height: 400, layout: "manual", directed: false});
    initGraph();
    graph.layout();
    jsav.displayInit();
    var edges = prim(0);    // Call the function which describes Prim's algorithm and pass the first node.
    removeEdges(edges);      // Remove extra edges that are not in the spanning tree.
    jsav.recorded();
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//This function is applied to get the edge in the opposite direction of the given edge
	function getReverseEdge(edge){
		for(var i=0;i<graph.edges().length;i++){
			if(graph.edges()[i].start()==edge.end() && graph.edges()[i].end()==edge.start()){
				return graph.edges()[i];
			}
		}
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //This function is used to mark a node in the graph.
  function markIt(node) {
    node.addClass("marked");
    jsav.umsg("Add node " + node.value() + " to the MST");
    node.highlight();
    jsav.step();
  } 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//This function finds the minimum cost node to be added to the MST
	function minVertex(D){
		var min=Infinity;
		for(var i=0;i<graph.nodes().length;i++){
			if(!graph.nodes()[i].hasClass("marked")){
				min=i;
				break;
			}
		}
		for(var i=0;i<graph.nodes().length;i++){
			if(!(graph.nodes()[i].hasClass("marked"))&& D[i]<D[min]){
				min=i;
			}
		}
		return min;
	}  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //This function contains the implementation of Prim's algorithm.
  function prim(s) {
	var D=[];         //Array of nodes distances
    var v;            //The current node added to the MST
	var neighbors=[];  //Array of neighbors of a specific node
	var validNeighbors=[];  //Array of neighbors of a specific node not in the MST
	var weight;             //A variable to hold the weight of the edge by which the distance value of a node will be updated
	var edges=[];           //Array of edges in the MST
	var minNode=[];         //Array holding the nodes in the MST by which other nodes outside the MST got their minimum distance 
	for(var i=0;i<graph.nodes().length;i++){
		D[i]=Infinity;
	}
	for(var i=0;i<graph.nodes().length;i++){
		minNode[i]=Infinity;
	}
	D[s]=0;
	minNode[s]=0;
	for(var i=0;i<graph.nodes().length;i++){
		v=minVertex(D);
		markIt(graph.nodes()[v]);
		if(v!=s){
			//Add an edge to the MST
			var edge=graph.getEdge(graph.nodes()[minNode[v]],graph.nodes()[v]);
			var reverseEdge=getReverseEdge(edge);
			edge.css({"stroke-width":"2", "stroke":"red"});
		    reverseEdge.css({"stroke-width":"2", "stroke":"red"});
			jsav.umsg("Adding the edge ("+graph.nodes()[minNode[v]].value()+","+graph.nodes()[v].value()+") to the MST");
			edges.push(edge);
			edges.push(reverseEdge);
			jsav.step();
		}
		neighbors=graph.nodes()[v].neighbors();
		//Remove the neighbors already in the spanning tree
		for(var j=0;j<neighbors.length;j++){
			if(!neighbors[j].hasClass("marked")){
				validNeighbors.push(neighbors[j]);
			}
		}
		for(var j=0;j<validNeighbors.length;j++){
			weight=(graph.nodes()[v].edgeTo(validNeighbors[j])).weight();
			//Update Distances Of neighbors not in the minimum spanning tree
			if(weight<=D[graph.nodes().indexOf(validNeighbors[j])]){
				D[graph.nodes().indexOf(validNeighbors[j])]=weight;
				minNode[graph.nodes().indexOf(validNeighbors[j])]=v;
			}
		}
		validNeighbors=[];
	}
    return edges;
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  function about() {
    var mystring = "Prim's Algorithm Visualization\nWritten by Mohammed Fawzy\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during Spring, 2013\nLast update: March, 2013\nJSAV library version " + JSAV.version();
    alert(mystring);
    alert("Prim's Algorithm visualization");
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //This function is used to initialize the graph.
  function initGraph() {
   
    var a = graph.addNode("A", {"left": 25,"top":50}),
        b = graph.addNode("B", {"left": 325,"top":50}),
        c = graph.addNode("C", {"left": 145, "top": 75}),
        d = graph.addNode("D", {"left": 145, "top": 200}),
        e = graph.addNode("E", {"left": 0, "top": 300}),
        f = graph.addNode("F", {"left": 325, "top": 250});

    var e1 = graph.addEdge(a, c,{"weight": 7}),
        e2 = graph.addEdge(a, e,{"weight": 9}),
        e3 = graph.addEdge(c, b,{"weight": 5}),
        e4 = graph.addEdge(c, d,{"weight": 1}),
        e5 = graph.addEdge(c, f,{"weight": 2}),
        e6 = graph.addEdge(f, b,{"weight": 6}),
        e7 = graph.addEdge(d, f,{"weight": 2}),
        e8 = graph.addEdge(e, f,{"weight": 1});		
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 //This function is used to remove edges that are not in the minimum spanning tree
  function removeEdges(edges) {
	var toBeRemoved=[];
    for (var i = 0; i < graph.edges().length; i++) {
      for (var j = 0; j < edges.length; j++) {
        if (graph.edges()[i] === edges[j]) {
          break;
        }
      }
      if (j === edges.length) {
		toBeRemoved.push(graph.edges()[i]);
      }
    }
	for(var k=0;k<toBeRemoved.length;k++){
		graph.removeEdge(toBeRemoved[k].start(),toBeRemoved[k].end());
	}
    jsav.umsg("Complete minimum spanning tree");
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  //$('#help').click(help);
  $('#reset').click(ODSA.AV.reset);
}(jQuery))