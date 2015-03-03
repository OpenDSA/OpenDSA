"use strict";
$(document).ready(function () {
	var av = new JSAV("GraphIntro4CON");


	//graph one 
    var gTop = 10;
    var g1Left = 25;
    var graphOne = av.ds.graph({top: gTop, left: 200, width: 200});

    var nodeOne = graphOne.addNode("", {left: 10, top: gTop});
    var nodeTwo = graphOne.addNode("", {left:  200 , top: gTop + 50});
    var nodeThree = graphOne.addNode("", {left: g1Left + 50, top: gTop + 200});
    var nodeFour = graphOne.addNode("", {left: 50,  top: gTop + 350});
    var nodeFive =graphOne.addNode("", {left: 450, top: gTop + 100});

    //add edges to grapph 
    graphOne.addEdge(nodeOne, nodeFour);
    graphOne.addEdge(nodeOne, nodeThree);
    graphOne.addEdge(nodeTwo, nodeFive);
    graphOne.addEdge(nodeFour, nodeFive);


     //slide 1 
    av.umsg("A sparse graph is a graph with relatively few edges. ");
    graphOne.layout();
    av.displayInit();

});