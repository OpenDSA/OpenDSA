"use strict";
$(document).ready(function () {
	var av = new JSAV("GIntroPathDefCON");
	 
    //set up graph three 
    var gTop = 10;
    var gLeft = 25;
    var gRight = 475;
    var graphThree = av.ds.graph({left: 350, top: gTop, directed: true, width: 200, visible: false });

    var nodeOne = graphThree.addNode("0", {left: gLeft, top: gTop});
    var nodeTwo = graphThree.addNode("2", {left: gLeft + 100, top: gTop});
    var nodeThree = graphThree.addNode("4", {left: gLeft + 50, top: gTop + 50});
    var nodeFour = graphThree.addNode("1", {left: gLeft,  top: gTop + 100});
    var nodeFive =graphThree.addNode("3", {left: gLeft + 100, top: gTop + 100});

    graphThree.addEdge(nodeOne, nodeFour, {weight: 3});
    graphThree.addEdge(nodeOne, nodeThree, {weight: 4});
    graphThree.addEdge(nodeTwo, nodeThree, {weight: 1});
    graphThree.addEdge(nodeFive, nodeTwo, {weight: 7});
    graphThree.addEdge(nodeFour, nodeFive, {weight: 3});
    graphThree.addEdge(nodeThree, nodeFour, {weight: 1});
    
    //set up graph    
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
    
    
    //slide 1
    av.umsg("The following slideshow contains examples for paths in a graph");
    graph.layout();
    av.displayInit();

    av.umsg("A sequence of vertices v1,v2,...,vn forms a path of length n−1 if there" + 
        " exist edges from vi to vi+1 for 1 <i>n</i> A path is a simple path if all vertices on the path are distinct. On our " +
        "directed graph we have a simple path from Vertex 0 to vertex 3");

    
    nodeOne.highlight();
    nodeFive.highlight(); 

    //add red edge for path    
    graph.getEdge(nodeOne, nodeFour).addClass("redEdge");
    graph.getEdge(nodeFour, nodeFive).addClass("redEdge");
    av.step();
    
    //slide 2   
    graph.hide();
    av.umsg("Vertices 0, 1, 3, 2, 4, and 1 also form a path, but not a simple path because Vertex 1 appears twice.");
    
    graphThree = av.ds.graph({left: 350, top: gTop, directed: true, width: 200, });

    nodeOne = graphThree.addNode("0", {left: 0, top: 0});
    nodeTwo = graphThree.addNode("2", {left: 100, top: gTop});
    nodeThree = graphThree.addNode("4", {left: 50, top: 50});
    nodeFour = graphThree.addNode("1", {left: 0,  top:  100});
    nodeFive =graphThree.addNode("3", {left: 100, top: 100});

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
    
    //slide 3
    av.umsg("A cycle is a path of length three or more that connects some vertex v1 to itself."
        + " A cycle is a <i>simple cycle</i> if the path is simple, except for the first and last " +
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
    av.step();

  

    av.recorded();

});
