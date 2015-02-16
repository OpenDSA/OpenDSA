"use strict";
$(document).ready(function () {
	var av = new JSAV("GraphIntroCON", {"animationMode" : "none"});
	//set up first graph points 
    var gTop = 20;
    var g1Left = 75;
    var g1Right = 175;

    var graphOne = av.ds.graph({top: gTop, left: g1Left});

    //add nodes to graph 1 
    var nodeOne = graphOne.addNode("", {left: g1Left, top: gTop});
    var nodeTwo = graphOne.addNode("", {left: g1Left + 100, top: gTop});
    var nodeThree = graphOne.addNode("", {left: g1Left + 50, top: gTop + 50});
    var nodeFour = graphOne.addNode("", {left: g1Left,  top: gTop + 100});
    var nodeFive =graphOne.addNode("", {left: g1Left + 100, top: gTop + 100});

    //add edges to grapph 
    graphOne.addEdge(nodeOne, nodeFour);
    graphOne.addEdge(nodeOne, nodeThree);
    graphOne.addEdge(nodeTwo, nodeThree);
    graphOne.addEdge(nodeTwo, nodeFive);
    graphOne.addEdge(nodeFour, nodeFive);
    graphOne.addEdge(nodeThree, nodeFour);

    var alabel = av.label("(a)", {left: 155, top: 200}).show;
    graphOne.layout();


    //set up recond graph 
    var gLeft = 175;
    var gRight = 300;
    var graphTwo = av.ds.graph({left: gLeft, top: gTop, directed: true});

    nodeOne = graphTwo.addNode(" ", {left: gLeft, top: gTop});
    nodeTwo = graphTwo.addNode(" ", {left: gLeft + 100, top: gTop});
    nodeThree = graphTwo.addNode(" ", {left: gLeft + 50, top: gTop + 50});
    nodeFour = graphTwo.addNode(" ", {left: gLeft,  top: gTop + 100});
    nodeFive =graphTwo.addNode(" ", {left: gLeft + 100, top: gTop + 100});

    graphTwo.addEdge(nodeOne, nodeFour);
    graphTwo.addEdge(nodeOne, nodeThree);
    graphTwo.addEdge(nodeTwo, nodeThree);
    graphTwo.addEdge(nodeFive, nodeTwo);
    graphTwo.addEdge(nodeFour, nodeFive);
    graphTwo.addEdge(nodeThree, nodeFour);

    //var blabel = av.label("(b)", {left: 350, top: 200}).show;
    graphTwo.layout();


    gLeft = 275;
    gRight = 475;
    var graphThree = av.ds.graph({left: gLeft, top: gTop, directed: true});

    nodeOne = graphThree.addNode("0", {left: gLeft, top: gTop});
    nodeTwo = graphThree.addNode("2", {left: gLeft + 100, top: gTop});
    nodeThree = graphThree.addNode("4", {left: gLeft + 50, top: gTop + 50});
    nodeFour = graphThree.addNode("1", {left: gLeft,  top: gTop + 100});
    nodeFive =graphThree.addNode("3", {left: gLeft + 100, top: gTop + 100});

    graphThree.addEdge(nodeOne, nodeFour, {weight: 3});
    graphThree.addEdge(nodeOne, nodeThree, {weight: 4});
    graphThree.addEdge(nodeTwo, nodeThree, {weight: 1});
    graphThree.addEdge(nodeFive, nodeTwo, {weight: 7});
    graphThree.addEdge(nodeFour, nodeFive, {weight: 3});
    graphThree.addEdge(nodeThree, nodeFour, {weight: 1});

    
    graphThree.layout();
    var clabel = av.label("(c)", {left: gLeft + 330, top: 200}).show;


});