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
    av.umsg("Here is a graph");
    graphOne.layout();
    av.displayInit();
       

    //slide 2 
    graphOne.hide();
    graphTwo.show();
    av.umsg("Here is a directed graph");
    graphTwo.layout();
    av.step();

    //slide three 
    graphTwo.hide();
    graphThree.show();
    graphThree.layout();
    av.umsg("Here is a  labeled directed graph with weighted edges");
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

    av.umsg("On our directed graph we have a simple path from Vertex 0 to vertex 3");
    av.step();


    nodeOne.highlight();
    nodeFive.highlight();
    av.step();

    //add red edge for path   
    //slide 5  
    graph.getEdge(nodeOne, nodeFour).addClass("redEdge");
    av.step();

    //slide 6
    graph.getEdge(nodeFour, nodeFive).addClass("redEdge");
    av.step();
    
    //slide 7 
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
    av.step();

    graphThree.getEdge(nodeFour, nodeFive).addClass("redEdge");
    av.step();

    graphThree.getEdge(nodeFive, nodeTwo).addClass("redEdge");
    av.step();

    graphThree.getEdge(nodeTwo, nodeThree).addClass("redEdge");
    av.step();

    graphThree.getEdge(nodeThree, nodeFour).addClass("redEdge");
    av.step();
    
    //last slides 
    av.umsg("Vertices 1, 3, 2, 4, and 1 also form a simple cycle.");
    
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

    graphThree.getEdge(nodeFour, nodeFive).addClass("redEdge");
    av.step();

    graphThree.getEdge(nodeFive, nodeTwo).addClass("redEdge");
    av.step();

    graphThree.getEdge(nodeTwo, nodeThree).addClass("redEdge");
    av.step();
    
    graphThree.getEdge(nodeThree, nodeFour).addClass("redEdge");
    av.recorded();

});
