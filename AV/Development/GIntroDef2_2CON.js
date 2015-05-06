"use strict";
$(document).ready(function () {
	var av = new JSAV("GIntroDef2_2CON", {"animationMode" : "none"});

	av.label("A graph G=(V,E) consists of a set of vertices V and a set of edges E, such that each edge " + 
        "in E is a connection between a pair of vertices in V. A graph with edges directed from one vertex " + 
        "to another (as in Figure (b)) is called a <i>directed graph</i> or <i>digraph</i>. A graph whose edges are not " + 
        "directed is called an <i>undirected graph</i> (as illustrated by Figure (a)). A graph with labels associated " + 
        "with its vertices (as in Figure (c)) is called a <i>labeled graph</i>.  A graph whose edges have weights" + 
        " (as in Figure (c)) is said to be a <i>weighted graph</i>.").show();

	//creating lines for visual break up 
	var line = av.g.line( 0, 120, 850, 120).addClass("borderEdge");
	line = av.g.line(285, 120, 285, 500).addClass("borderEdge");
	line = av.g.line(570, 120, 570, 500).addClass("borderEdge");


	//creating the graphs 
	
	//graph one 
    var gTop = 100;
    var gLeft = 25;
    var graphOne = av.ds.graph({top: gTop, left: gLeft, width: 250, height: 250});

    var nodeOne = graphOne.addNode("", {left: gLeft, top: gTop});
    nodeOne.addClass("node");
    var nodeTwo = graphOne.addNode("", {left: gLeft + 100, top: gTop});
    var nodeThree = graphOne.addNode("", {left: gLeft + 50, top: gTop + 50});
    var nodeFour = graphOne.addNode("", {left: gLeft,  top: gTop + 100});
    var nodeFive =graphOne.addNode("", {left: gLeft + 100, top: gTop + 100});

    //add edges to grapph 
    graphOne.addEdge(nodeOne, nodeFour);
    graphOne.addEdge(nodeOne, nodeThree);
    graphOne.addEdge(nodeTwo, nodeThree);
    graphOne.addEdge(nodeTwo, nodeFive);
    graphOne.addEdge(nodeFour, nodeFive);
    graphOne.addEdge(nodeThree, nodeFour);

    graphOne.layout();

    av.label("(a)", {top: 400, left: 125}).show();
    
    
    //set up rsecond graph 
   
    var g2Left = 350;
    var graphTwo = av.ds.graph({left: g2Left, top: gTop, directed: true, width: 250, height: 250});

    nodeOne = graphTwo.addNode(" ", {left: 0, top: gTop});
    nodeTwo = graphTwo.addNode(" ", {left: 100, top: gTop});
    nodeThree = graphTwo.addNode(" ", {left: 50, top: gTop + 50});
    nodeFour = graphTwo.addNode(" ", {left: 0,  top: gTop + 100});
    nodeFive =graphTwo.addNode(" ", {left: 100, top: gTop + 100});

    graphTwo.addEdge(nodeOne, nodeFour);
    graphTwo.addEdge(nodeOne, nodeThree);
    graphTwo.addEdge(nodeTwo, nodeThree);
    graphTwo.addEdge(nodeFive, nodeTwo);
    graphTwo.addEdge(nodeFour, nodeFive);
    graphTwo.addEdge(nodeThree, nodeFour);
    
    graphTwo.layout();
    av.label("(b)", {top: 400, left: 400}).show();

   
    //set up graph three 
        gLeft = 650;
    var graphThree = av.ds.graph({left: gLeft, top: gTop, directed: true, width: 150, height: 300});

    nodeOne = graphThree.addNode("0", {left: 0, top: gTop});
    nodeTwo = graphThree.addNode("2", {left: 100, top: gTop});
    nodeThree = graphThree.addNode("4", {left:50, top: gTop + 50});
    nodeFour = graphThree.addNode("1", {left: 0,  top: gTop + 100});
    nodeFive =graphThree.addNode("3", {left: 100, top: gTop + 100});

    graphThree.addEdge(nodeOne, nodeFour, {weight: 3});
    graphThree.addEdge(nodeOne, nodeThree, {weight: 4});
    graphThree.addEdge(nodeTwo, nodeThree, {weight: 1});
    graphThree.addEdge(nodeFive, nodeTwo, {weight: 7});
    graphThree.addEdge(nodeFour, nodeFive, {weight: 3});
    graphThree.addEdge(nodeThree, nodeFour, {weight: 1});

    graphThree.layout();

    av.label("(c)", {top: 400, left: 700}).show();
	
});