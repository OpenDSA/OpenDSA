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
    av.umsg("The same graph can be turned into a dense graph by adding edges. A graph with many edges is called a dense graph");
    graphOne.addEdge(nodeThree, nodeFour);
    graphOne.addEdge(nodeFour, nodeSix);
    graphOne.addEdge(nodeSix, nodeFive);
    graphOne.addEdge(nodeThree, nodeSix);
    graphOne.addEdge(nodeOne, nodeTwo);
    graphOne.layout();
   	av.step();  

    //slide 3  
   	av.umsg("A graph containing all posible edges is a complete graph. This is a complete graph with five verticies");
    graphOne.hide();
    
    //create a complete graph 
    var graphTwo = av.ds.graph({top: gTop, left: 175, width: 500, height: 400});
    var n1 = graphTwo.addNode("", {left: 100, top: gTop + 100});
    var n2 = graphTwo.addNode("", {left: 400, top: gTop + 100});
    var n3 = graphTwo.addNode("", {left: 250, top: gTop});
    var n4 = graphTwo.addNode("", {left: 175, top: gTop + 300});
    var n5 = graphTwo.addNode("", {left: 325, top: gTop + 300});

    graphTwo.addEdge(n1, n2);
    graphTwo.addEdge(n1, n3);
    graphTwo.addEdge(n1, n4);
    graphTwo.addEdge(n1, n5);
    graphTwo.addEdge(n2, n3);
    graphTwo.addEdge(n2, n4);
    graphTwo.addEdge(n2, n5);
    graphTwo.addEdge(n3, n4);
    graphTwo.addEdge(n3, n5)
    graphTwo.addEdge(n4, n5);
    graphTwo.layout();

   	av.step();

    //slide 4 
    graphTwo.hide();
    graphOne.show();
    av.umsg("Two vertices are adjacent if there is an edge between them. These verticies are called neighbors" + 
      "The edge between neighbors is said to be incedent."); 
    nodeThree.highlight();
    nodeSix.highlight();
    graphOne.getEdge(nodeThree, nodeSix).addClass("redEdge");

    av.step();

    //slide  5
    graphOne.getEdge(nodeThree, nodeSix).removeClass("redEdge");
    av.umsg("Any subset of V where all vertices in the subset connect to all other vertices in the subset is called " +
      "a clique. These four vertices and the edges connecting them form a clique");
   	nodeOne.highlight();
   	nodeThree.highlight();
   	nodeFour.highlight();
    nodeSix.highlight();
   	graphOne.getEdge(nodeOne, nodeThree).addClass("redEdge");
   	graphOne.getEdge(nodeOne, nodeFour).addClass("redEdge");
   	graphOne.getEdge(nodeFour, nodeThree).addClass("redEdge");
    graphOne.getEdge(nodeFour, nodeSix).addClass("redEdge");
    graphOne.getEdge(nodeSix, nodeThree).addClass("redEdge");
   	av.step();

    //slide 6
   	graphOne.hide(); 
   	graphOne = av.ds.graph({top: gTop, left: 175, width: 500, height: 400});
   	nodeOne = graphOne.addNode("", {left: 175, top: gTop});
   	nodeThree = graphOne.addNode("", {left: 270, top: gTop + 110});
   	nodeFour = graphOne.addNode("", {left: 175,  top: gTop + 180});
    nodeSix = graphOne.addNode("", {left: 350, top: gTop + 250});

   	graphOne.addEdge(nodeOne, nodeFour);
    graphOne.addEdge(nodeOne, nodeThree);
    graphOne.addEdge(nodeThree, nodeFour);
    graphOne.addEdge(nodeFour, nodeSix);
    graphOne.addEdge(nodeThree, nodeSix);
    graphOne.layout();
   	av.recorded();


});