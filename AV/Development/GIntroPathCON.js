"use strict";
$(document).ready(function () {
	var av = new JSAV("GIntroPathCON", {"animationMode" : "none"});

	av.label("A sequence of vertices v1,v2,...,vn forms a path of length n−1 if there" + 
        " exist edges from vi to vi+1 for 1 <i>n</i>").show();

	//creating lines for visual break up 
	var line = av.g.line( 0, 50, 850, 50).addClass("borderEdge");
	line = av.g.line(320, 60, 320, 250).addClass("borderEdge");
	line = av.g.line(510, 60, 510, 250).addClass("borderEdge");


	//set up graph    
    var graph = av.ds.graph({left: 150, top: 100, directed: true, width: 200});

    var nodeOne = graph.addNode("0", {left: 0, top: 0});
    var nodeTwo = graph.addNode("2", {left: 100, top: 0});
    var nodeThree = graph.addNode("4", {left: 50, top: 50});
    var nodeFour = graph.addNode("1", {left: 0,  top: 100});
    var nodeFive =graph.addNode("3", {left: 100, top: 100});

    graph.addEdge(nodeOne, nodeFour, {weight: 3});
    graph.addEdge(nodeOne, nodeThree, {weight: 4});
    graph.addEdge(nodeTwo, nodeThree, {weight: 1});
    graph.addEdge(nodeFive, nodeTwo, {weight: 7});
    graph.addEdge(nodeFour, nodeFive, {weight: 3});
    graph.addEdge(nodeThree, nodeFour, {weight: 1});

     graph.layout();
     nodeOne.highlight();
     nodeFive.highlight();
     graph.getEdge(nodeOne, nodeFour).addClass("redEdge");
    graph.getEdge(nodeFour, nodeFive).addClass("redEdge"); 

     //av.label("We have a simple path from Vertex 0 to vertex 3", {top: 250, left: 40, width: 5}).show();
     av.label("(a)", {top: 250, left: 200, width: 5}).show();

     //set up rsecond graph 

    var graphTwo = av.ds.graph({left: 340, top: 100, directed: true, width: 200, height: 250});

    nodeOne = graphTwo.addNode("0", {left: 0, top: 0});
    nodeTwo = graphTwo.addNode("2", {left: 100, top: 0});
    nodeThree = graphTwo.addNode("4", {left: 50, top: 50});
    nodeFour = graphTwo.addNode("1", {left: 0,  top: 100});
    nodeFive =graphTwo.addNode("3", {left: 100, top: 100});

    graphTwo.addEdge(nodeOne, nodeFour, {weight: 3});
    graphTwo.addEdge(nodeOne, nodeThree, {weight: 4});
    graphTwo.addEdge(nodeTwo, nodeThree, {weight: 1});
    graphTwo.addEdge(nodeFive, nodeTwo, {weight: 7});
    graphTwo.addEdge(nodeFour, nodeFive, {weight: 3});
    graphTwo.addEdge(nodeThree, nodeFour, {weight: 1});
    
    graphTwo.layout();

    //add red egdes 
    graphTwo.getEdge(nodeOne, nodeFour).addClass("redEdge");
    graphTwo.getEdge(nodeFour, nodeFive).addClass("redEdge");
    graphTwo.getEdge(nodeFive, nodeTwo).addClass("redEdge");
    graphTwo.getEdge(nodeTwo, nodeThree).addClass("redEdge");
    graphTwo.getEdge(nodeThree, nodeFour).addClass("redEdge");

		//av.label("(b) Vertices 0, 1, 3, 2, 4, and 1 also form a path," +
		//" but not a simple path because Vertex 1 appears twice", {top: 250, left: 300, width: 5}).show();
		av.label("(b)", {top: 250, left: 400, width: 5}).show();


		//set up graph three 
    var graphThree = av.ds.graph({left: 530, top: 100, directed: true, width: 150, height: 300});

    nodeOne = graphThree.addNode("0", {left: 0, top: 0});
    nodeTwo = graphThree.addNode("2", {left: 100, top: 0});
    nodeThree = graphThree.addNode("4", {left:50, top: 50});
    nodeFour = graphThree.addNode("1", {left: 0,  top: 100});
    nodeFive =graphThree.addNode("3", {left: 100, top: 100});

    graphThree.addEdge(nodeOne, nodeFour, {weight: 3});
    graphThree.addEdge(nodeOne, nodeThree, {weight: 4});
    graphThree.addEdge(nodeTwo, nodeThree, {weight: 1});
    graphThree.addEdge(nodeFive, nodeTwo, {weight: 7});
    graphThree.addEdge(nodeFour, nodeFive, {weight: 3});
    graphThree.addEdge(nodeThree, nodeFour, {weight: 1});

    graphThree.layout();


    //add red egdes 
    graphThree.getEdge(nodeFour, nodeFive).addClass("redEdge");
    graphThree.getEdge(nodeFive, nodeTwo).addClass("redEdge");
    graphThree.getEdge(nodeTwo, nodeThree).addClass("redEdge");
    graphThree.getEdge(nodeThree, nodeFour).addClass("redEdge");

    /*av.label("(c) A cycle is a path of length three or more that connects some vertex v1 to itself." + 
    	" A cycle is a <i>simple cycle</i> if the path is simple, " + 
    	"except for the first and last  vertices being the same.Vertices " + 
        "1, 3, 2, 4, and 1 also form a simple cycle.", {top: 250, left: 450, width: 5}).show();
*/
		av.label("(c)", {top: 250, left: 585, width: 5}).show();


	});