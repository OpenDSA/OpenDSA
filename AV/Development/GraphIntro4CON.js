"use strict";
$(document).ready(function () {
	var av = new JSAV("GraphIntro4CON");


	//graph one 
    var gTop = 10;
    var g1Left = 25;
    var graphOne = av.ds.graph({top: gTop, left: 125, width: 500, height: 400});

    var nodeOne = graphOne.addNode("", {left: 175, top: gTop});
    var nodeTwo = graphOne.addNode("", {left:  400 , top: gTop + 30});
    var nodeThree = graphOne.addNode("", {left: 270, top: gTop + 110});
    var nodeFour = graphOne.addNode("", {left: 175,  top: gTop + 180});
    var nodeFive =graphOne.addNode("", {left: 425, top: gTop + 150});
    var nodeSix = graphOne.addNode("", {left: 350, top: gTop + 250});

    //add edges to grapph 
    graphOne.addEdge(nodeOne, nodeFour);
    graphOne.addEdge(nodeOne, nodeThree);
    graphOne.addEdge(nodeThree, nodeTwo);
    graphOne.addEdge(nodeTwo, nodeFive);


     //slide 1 
    av.umsg("A sparse graph is a graph with relatively few edges. ");
    graphOne.layout();
    av.displayInit();

    //slide 2 
    av.umsg("The same graph can be turned into a dense graph by adding edges");
    graphOne.addEdge(nodeThree, nodeFour);
    graphOne.addEdge(nodeFour, nodeSix);
    graphOne.addEdge(nodeSix, nodeFive);
    graphOne.addEdge(nodeThree, nodeSix);
    graphOne.addEdge(nodeOne, nodeTwo);
    graphOne.layout();
   	av.step();  

    //slide 3 
   	av.umsg("This graph becomes a complete graph when we add one more edge. A graph containing all posible edges" +  
   		" is a complete graph");
   	graphOne.addEdge(nodeThree, nodeFive);
   	graphOne.layout();
    graphOne.getEdge(nodeThree, nodeFive).addClass("redEdge");
   	av.step();

    //slide 4 
   	graphOne.getEdge(nodeThree, nodeFive).removeClass("redEdge");
    av.umsg("Two vertices are adjacent if there is an edge between them. These verticies are called neighbors"); 
    nodeThree.highlight();
    nodeSix.highlight();
    av.step();

    //slide 5 
    av.umsg("The edge between neighbors is said to be incedent.");
    graphOne.getEdge(nodeThree, nodeSix).addClass("redEdge");
    av.step();

    //slide  6
    graphOne.getEdge(nodeThree, nodeSix).removeClass("redEdge");
    av.umsg("These three vertices and the edges connecting them form a clique");
   	nodeOne.highlight();
   	nodeThree.highlight();
   	nodeFour.highlight();
   	graphOne.getEdge(nodeOne, nodeThree).addClass("redEdge");
   	graphOne.getEdge(nodeOne, nodeFour).addClass("redEdge");
   	graphOne.getEdge(nodeFour, nodeThree).addClass("redEdge");
   	av.step();

    //slide 7 
   	graphOne.hide(); 
   	graphOne = av.ds.graph({top: gTop, left: 250, width: 500, height: 400});
   	nodeOne = graphOne.addNode("", {left: 175, top: gTop});
   	nodeThree = graphOne.addNode("", {left: 270, top: gTop + 110});
   	nodeFour = graphOne.addNode("", {left: 175,  top: gTop + 180});

   	graphOne.addEdge(nodeOne, nodeFour);
    graphOne.addEdge(nodeOne, nodeThree);
    graphOne.addEdge(nodeThree, nodeFour);
    graphOne.layout();
   	av.recorded();


});