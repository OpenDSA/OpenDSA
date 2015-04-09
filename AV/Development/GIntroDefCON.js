/*global ODSA */
"use strict";
$(document).ready(function () {
  var av_name = "GIntroDefCON";
  var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;
  var av = new JSAV(av_name);

  // Graph one 
  var gTop = 0;
  var g1Left = 25;
  var graphOne = av.ds.graph({top: gTop, left: 125, width: 500, height: 400});

  var nodeOne = graphOne.addNode("", {left: 175, top: gTop});
  var nodeTwo = graphOne.addNode("", {left:  400 , top: gTop + 30});
  var nodeThree = graphOne.addNode("", {left: 300, top: gTop + 110});
  var nodeFour = graphOne.addNode("", {left: 175,  top: gTop + 180});
  var nodeFive =graphOne.addNode("", {left: 425, top: gTop + 150});
  var nodeSix = graphOne.addNode("", {left: 350, top: gTop + 250});

  // Add edges to graph 
  graphOne.addEdge(nodeOne, nodeFour);
  graphOne.addEdge(nodeOne, nodeThree);
  graphOne.addEdge(nodeThree, nodeTwo);
  graphOne.addEdge(nodeTwo, nodeFive);

  // Slide 1 
  av.umsg("A graph with relatively few edges is called a <i>sparse graph</i>.");
  graphOne.layout();
  av.displayInit();

  // Slide 2 
  av.umsg("A graph with many edges is called a <i>dense graph</i>.");
  graphOne.addEdge(nodeThree, nodeFour);
  graphOne.addEdge(nodeFour, nodeSix);
  graphOne.addEdge(nodeSix, nodeFive);
  graphOne.addEdge(nodeThree, nodeSix);
  graphOne.addEdge(nodeOne, nodeTwo);
  graphOne.layout();
  av.step();  

  // Slide 3 
  av.umsg("A graph with edges connecting every pair of nodes is called a <i>complete graph</i>");
  graphOne.hide();
    
  // Create a complete graph 
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

  //
  graphTwo.hide();
  av.umsg("Add Sub graph then transiditon to clique which is type of subgraph");
  av.step();

  // Slide 5 
  graphOne.show();
  av.umsg("Any subset of $V$ where all vertices in the subset have edges to all other vertices in the subset is called a <i>clique</i>. Here, the highlighted nodes form a clique.");
  nodeOne.highlight();
  nodeThree.highlight();
  nodeFour.highlight();
  nodeSix.highlight();
  graphOne.addEdge(nodeOne, nodeSix).addClass("redEdge");
  graphOne.getEdge(nodeOne, nodeThree).addClass("redEdge");
  graphOne.getEdge(nodeOne, nodeFour).addClass("redEdge");
  graphOne.getEdge(nodeFour, nodeThree).addClass("redEdge");
  graphOne.getEdge(nodeThree, nodeSix).addClass("redEdge");
  graphOne.getEdge(nodeFour, nodeSix).addClass("redEdge");
  graphOne.layout();
  av.step();

  av.recorded();
});
