"use strict";
$(document).ready(function () {
	var av = new JSAV("GraphIntroTermsCON", {"animationMode" : "none"});

	av.label("Two vertices are adjacent if they are joined by an edge "+ 
		"(shown in figure (a)). Such vertices are also called neighbors. " +
  "An edge connecting Vertices u and v is written (u,v)." +
  "Such an edge is said to be incident on Vertices u and v (shown in figure (b).").show();

  //creating lines for visual break up 
	var line = av.g.line( 0, 70, 850, 70).addClass("borderEdge");
	line = av.g.line(425, 70, 425, 450).addClass("borderEdge");
	
	var gTop = 100;
	var g2Left = 150;
  var graphTwo = av.ds.graph({left: g2Left, top: gTop, directed: true, width: 250, height: 250});

  var nodeOne = graphTwo.addNode("a ", {left: 0, top: 0});
  var nodeTwo = graphTwo.addNode("c", {left: 100, top: 0});
  var nodeThree = graphTwo.addNode("e", {left: 50, top: 50});
  var nodeFour = graphTwo.addNode("b", {left: 0,  top: 100});
  var nodeFive =graphTwo.addNode("d ", {left: 100, top: 100});

  graphTwo.addEdge(nodeOne, nodeFour);
  graphTwo.addEdge(nodeOne, nodeThree);
  graphTwo.addEdge(nodeTwo, nodeThree);
  graphTwo.addEdge(nodeFive, nodeTwo);
  graphTwo.addEdge(nodeFour, nodeFive);
  graphTwo.addEdge(nodeThree, nodeFour);
    
  graphTwo.layout();

  nodeOne.highlight();
  nodeFour.highlight();
  av.label("(a) verticies a and b are neighbors", {top: 300, left: 100}).show();


  var gLeft = 550;
  var graph = av.ds.graph({left: gLeft, top: gTop, directed: true, width: 250, height: 250});

  var nodeOne = graph.addNode("a ", {left: 0, top: 0});
  var nodeTwo = graph.addNode("c", {left: 100, top: 0});
  var nodeThree = graph.addNode("e", {left: 50, top: 50});
  var nodeFour = graph.addNode("b", {left: 0,  top: 100});
  var nodeFive =graph.addNode("d ", {left: 100, top: 100});

  graph.addEdge(nodeOne, nodeFour).addClass("redEdge");
  graph.addEdge(nodeOne, nodeThree);
  graph.addEdge(nodeTwo, nodeThree);
  graph.addEdge(nodeFive, nodeTwo);
  graph.addEdge(nodeFour, nodeFive);
  graph.addEdge(nodeThree, nodeFour);

  av.label("b", {top: 500, left: 450}).show();

    
  graph.layout();

  av.label("(b) Edge b is incdient on verticies a and b", {top: 300, left: 500}).show();
	
});