"use strict";
/*global alert: true, ODSA */

(function ($) {
  var jsav;
  var graph;
  var nodes = [];
  var edgeStarts = [];
  var edgeEnds = [];
  var nNodes;
  var nEdges;
  var adjacencyMatrix = [,];
  var randomWeights = [];
  
  jsav = new JSAV($('.avcontainer'));
  
  function generateRandomWeights() {
    var count = 0;
    var weight;
    randomWeights = new Array(nEdges);
    while (true) {
      weight = Math.floor((Math.random() * 10));
      if (weight === 0) {
        continue;
      }
      else {
        randomWeights[count] = weight;
        count++;
      }
      if (count === nEdges){
        break;
      }
    }
  }
  function isEligibleEdge (startIndex, endIndex) {
    if ((startIndex === endIndex) || (startIndex >= nNodes) || (endIndex >= nNodes)) {
	  return false;
	}
	if ((adjacencyMatrix[startIndex][endIndex] === 1)
	|| (adjacencyMatrix[endIndex][startIndex] === 1)) {
	  return false;
	}
	else {
	  return true;
	}
  }
  function generateRandomPairs() {
    var count = 0;
    var index1;
    var index2;
	//Initialize the adjacency matrix
	for (var i = 0; i < nNodes; i++) {
	  for (var j = 0; j < nNodes; j++) {
        adjacencyMatrix[i][j] = 0;
      }	  
	}
    while(true){
      index1 = Math.floor((Math.random() * 10));
      index2 = Math.floor((Math.random() * 10));
      if(!isEligibleEdge(index1, index2)) {
        continue;
      }
      else {
	    edgeStarts[count] = index1;
        edgeEnds[count] = index2;
        count++;
        if(count === nEdges){
          break; 
        }
      }
	  adjacencyMatrix[index1][index2] = 1;
	  adjacencyMatrix[index2][index1] = 1;
    }
  }
  function generate (nodeCount, edgeCount) {
    var startNodeIndex;
	var endNodeIndex;
	nodes = new Array(nodeCount);
	edgeStarts = new Array(edgeCount);
	edgeEnds = new Array(edgeCount);
	//Generate the nodes
	for (var i = 0; i < nodeCount; i++) {
	  nodes[i] = String.fromCharCode(i + 65);
	}
	//Create the adjacencyMatrix
	adjacencyMatrix = new Array(nodeCount);
	for (var i = 0; i < nodeCount; i++) {
	  adjacencyMatrix[i] = new Array(nodeCount);
	}
	generateRandomPairs();
	generateRandomWeights();
	generateGraph();
  }
  function generateGraph () {
    if (graph) {
	  graph.clear();
	}
    graph = jsav.ds.graph({width: 600, height: 400, layout: "automatic", directed: false});
	for (var i = 0; i < nNodes; i++) {
	  graph.addNode(nodes[i]);
	}
	for (var i = 0; i < nEdges; i++) {
	  console.log(edgeStarts[i]+"  "+edgeEnds[i]);
	  graph.addEdge(graph.nodes()[edgeStarts[i]], graph.nodes()[edgeEnds[i]]
	  ,{"weight": parseInt(randomWeights[i])});
	}
  }
  function handler () {
    nNodes = parseInt($('#nodeCount').find(":selected").text());
    nEdges = parseInt($('#edgeCount').find(":selected").text());
    generate (nNodes, nEdges);
    graph.layout();
  }
  function about() {
    var mystring = "Graph Generator Tool\nWritten by Mohammed Fawzi and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during Spring, 2013\nLast update: March, 2013\nJSAV library version " + JSAV.version();
    alert(mystring);
  }
  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#generate').click(handler);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
