"use strict";
$(document).ready(function () {
	var av = new JSAV("GraphIntroCON");
	
    //graph one 
    var gTop = 10;
    var g1Left = 25;
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
        "in E is a connection between a pair of vertices in V.Here is a graph");
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
    av.umsg("A graph with labels associated with its vertices  is called a labeled graph. A graph whose edges" + 
        " have weights is said to be a weighted graph.Here is a  labeled directed graph with weighted edges.");
    av.step();

    //slide 4 

    //reposition graph 3 and show path
    graphThree.hide(); 
    var graph = av.ds.graph({left: 350, top: gTop, directed: true, width: 200});

    nodeOne = graph.addNode("0", {left: gLeft, top: gTop});
    nodeTwo = graph.addNode("2", {left: gLeft + 100, top: gTop});
    nodeThree = graph.addNode("4", {left: gLeft + 50, top: gTop + 50});
    nodeFour = graph.addNode("1", {left: gLeft,  top: gTop + 100});
    nodeFive =graph.addNode("3", {left: gLeft + 100, top: gTop + 100});

    graph.addEdge(nodeOne, nodeFour, {weight: 3});
    graph.addEdge(nodeOne, nodeThree, {weight: 4});
    graph.addEdge(nodeTwo, nodeThree, {weight: 1});
    graph.addEdge(nodeFive, nodeTwo, {weight: 7});
    graph.addEdge(nodeFour, nodeFive, {weight: 3});
    graph.addEdge(nodeThree, nodeFour, {weight: 1});
    
    graph.layout();

    av.umsg(" A path is a simple path if all vertices on the path are distinct. On our " +
        "directed graph we have a simple path from Vertex 0 to vertex 3");

    nodeOne.highlight();
    nodeFive.highlight(); 
    //add red edge for path    
    graph.getEdge(nodeOne, nodeFour).addClass("redEdge");
    graph.getEdge(nodeFour, nodeFive).addClass("redEdge");
    av.step();
    
    //slide 5   
    graph.hide();
    av.umsg("Vertices 0, 1, 3, 2, 4, and 1 also form a path, but not a simple path because Vertex 1 appears twice.");
    
    graphThree = av.ds.graph({left: 350, top: gTop, directed: true, width: 200, });

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
    av.step();

    //add red egdes 
    graphThree.getEdge(nodeOne, nodeFour).addClass("redEdge");
    graphThree.getEdge(nodeFour, nodeFive).addClass("redEdge");
    graphThree.getEdge(nodeFive, nodeTwo).addClass("redEdge");
    graphThree.getEdge(nodeTwo, nodeThree).addClass("redEdge");
    graphThree.getEdge(nodeThree, nodeFour).addClass("redEdge");
    av.step();
    
    //slide 6  
    av.umsg("A cycle is a path of length three or more that connects some vertex v1 to itself."
        + " A cycle is a simple cycle if the path is simple, except for the first and last " +
        "vertices being the same.Vertices 1, 3, 2, 4, and 1 also form a simple cycle.");

    //remove old red edges 
    graphThree.getEdge(nodeOne, nodeFour).removeClass("redEdge");
    graphThree.getEdge(nodeFour, nodeFive).removeClass("redEdge");
    graphThree.getEdge(nodeFive, nodeTwo).removeClass("redEdge");
    graphThree.getEdge(nodeTwo, nodeThree).removeClass("redEdge");
    graphThree.getEdge(nodeThree, nodeFour).removeClass("redEdge");
    

    //add red egdes 
    graphThree.getEdge(nodeFour, nodeFive).addClass("redEdge");
    graphThree.getEdge(nodeFive, nodeTwo).addClass("redEdge");
    graphThree.getEdge(nodeTwo, nodeThree).addClass("redEdge");
    graphThree.getEdge(nodeThree, nodeFour).addClass("redEdge");
    av.recorded();

});
