"use strict";
$(document).ready(function () {
	var av = new JSAV("connectedGraphCON", {"animationMode" : "none"});

	var gTop = 10; 
	var gLeft = 150;

	var graph = av.ds.graph({top: gTop, left: gLeft});

	var nodeOne = graph.addNode("0", {left: gLeft, top: gTop});
    var nodeTwo = graph.addNode("2", {left: gLeft + 100, top: gTop});
    var nodeThree = graph.addNode("4", {left: gLeft + 50, top: gTop + 50});
    var nodeFour = graph.addNode("1", {left: gLeft,  top: gTop + 100});
    var nodeFive =graph.addNode("3", {left: gLeft + 100, top: gTop + 100});
    var nodeSix = graph.addNode("6" , {left: gLeft + 175, top: gTop});
    var nodeSeven = graph.addNode("5", {left: gLeft + 175, top: gTop + 100});
    var nodeEight = graph.addNode("7", {left: gLeft + 250, top: gTop});

    //add edges to grapph 
    graph.addEdge(nodeOne, nodeFour);
    graph.addEdge(nodeOne, nodeThree);
    graph.addEdge(nodeTwo, nodeThree);
    graph.addEdge(nodeTwo, nodeFive);
    graph.addEdge(nodeFour, nodeFive);
    graph.addEdge(nodeThree, nodeFour);
    graph.addEdge(nodeSix, nodeSeven);

    graph.layout();

});