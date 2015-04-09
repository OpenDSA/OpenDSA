"use strict";
$(document).ready(function () {
	var av = new JSAV("GIntroDef2CON");
	
    //graph one 
    var gTop = 10;
    var graphOne = av.ds.graph({top: gTop, left: 350, width: 200});

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
    
    
    //set up rsecond graph 
    var gLeft = 25;
    var gRight = 300;
    var graphTwo = av.ds.graph({left: 350, top: gTop, directed: true, width: 200, visible: false});

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
    //graphTwo.layout();
    

   
    //set up graph three 
    gLeft = 25;
    gRight = 475;
    var graphThree = av.ds.graph({left: 350, top: gTop, directed: true, width: 200, visible: false});

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
    //graphThree.layout();

    

    //slide 1 
    av.umsg("A graph G=(V,E) consists of a set of vertices V and a set of edges E, such that each edge " + 
        "in E is a connection between a pair of vertices in V. Here is an undirected graph. A graph whose edges are not " +
        "directed is called an <i>undirected graph<i/>");
    graphOne.layout();
    av.displayInit();
       

    //slide 2 
    graphOne.hide();
    graphTwo.show();
    av.umsg("Here is a directed graph. A directed graph or dirgraph is a graph with directed edges from one another. ");
    graphTwo.layout();
    av.step();

    //slide three 
    graphTwo.hide();
    graphThree.show();
    graphThree.layout();
    av.umsg("A graph with labels associated with its vertices is called a <i>labeled graph<i>. A graph whose edges" + 
        " have weights is said to be a <i> weighted graph<i/>. Here is a labeled directed graph with weighted edges.");
    av.step();

    //new slide 
    av.umsg("ADD SLIDE ABOUT ADJACENT + NEIGHBORS + INCIDENTZ");
    


   
    av.recorded();

});