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
    markIt(graph.nodes()[0]);    // Mark the first node in the graph
    var startNode = [];  // Define an array to hold the value of the start node to be passed to prim function
    startNode[0] = graph.nodes()[0];
    var edges = prim(startNode);    // Call the function which describes Prim's algorithm and pass the first node.
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


  //This function is for searching for a node in a specific set of nodes.
  //We use this function to state whether a particular node is contained in the set of nodes added so far to the spanning tree.
  function searchNodes(S, targetNode) {
    for (var i = 0; i < S.length; i++) {
      if (S[i].value() === targetNode.value()) {
        return true;
      }
    }
    return false;
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //This function is for finding cut(S) where S is the set of nodes added so far to the spanning tree.
  //cut(S) are the set of edges that are connecting nodes in S to nodes outside S.
  function findCut(S) {
    var cutEdges = [];
    for (var i = 0; i < graph.edges().length; i++) {
      if ((searchNodes(S, graph.edges()[i].start()) && !searchNodes(S, graph.edges()[i].end()))){
        cutEdges.push(graph.edges()[i]);
      }
    }
    return cutEdges;
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //This function is for finding the minimum cost edge in cut(S).
  function findMinimumCostEdge(cut) {
    var minCost = parseInt(cut[0].weight(), 10);
    var minCostIndex = 0;
    for (var i = 1; i < cut.length; i++) {
      if (parseInt(cut[i].weight(), 10) < minCost) {
        minCost = parseInt(cut[i].weight(), 10);
        minCostIndex = i;
      }
    }
    return minCostIndex;
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //This function is used to mark a node in the graph.
  function markIt(node) {
    node.addClass("marked");
    jsav.umsg("Add node " + node.value() + " to the minimum spanning tree");
    node.highlight();
    jsav.step();
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //This function simply displays the set of nodes in S in a convenient manner to be used in messages in the slideshow.
  function displayNodes(S) {
    var str = " (";
    for (var i = 0; i < S.length - 1; i++) {
      str += S[i].value() + " , ";
    }
    str += S[i].value() + ")";
    return str;
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //This function contains the implementation of Prim's algorithm.
  function prim(S) {
    var cut = [];
    var edgeIndex;
    var edges = [];
	var reverseEdge;
	var endNode;
    while (S.length < graph.nodes().length) {
      cut = findCut(S);
      edgeIndex = findMinimumCostEdge(cut);
      jsav.umsg("Find the minimum cost edge in cut of " + displayNodes(S));
      cut[edgeIndex].css({"stroke-width":"2", "stroke":"red"});
	  reverseEdge=getReverseEdge(cut[edgeIndex]);
	  reverseEdge.css({"stroke-width":"2", "stroke":"red"});
      edges.push(cut[edgeIndex]);
	  edges.push(reverseEdge);
      jsav.step();
	  endNode=cut[edgeIndex].end();
	  if(endNode.hasClass("marked")){
		markIt(reverseEdge.end());
		S.push(reverseEdge.end());
	  }
	  else{
		markIt(cut[edgeIndex].end());
		S.push(cut[edgeIndex].end());
	  }
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
        e4 = graph.addEdge(c, d,{"weight": 6}),
        e5 = graph.addEdge(c, f,{"weight": 1}),
        e6 = graph.addEdge(f, b,{"weight": 2}),
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
	for(var k=0;k<toBeRemoved.length;k++)
	{
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