/*global ODSA */
"use strict";
$(document).ready(function () {
  var av = new JSAV("GIntroDefCON", {"animationMode" : "none"});

  //creating lines for visual break up 
  var line = av.g.line( 0, 200, 850, 200).addClass("borderEdge");
  line = av.g.line(425, 0, 425, 400).addClass("borderEdge");

  // Graph one 
  var graphOne = av.ds.graph({top: 10, left: 135, width: 200, height: 200});

  var nodeOne = graphOne.addNode("1", {left: 0, top: 10});
  var nodeTwo = graphOne.addNode("2", {left:  150 , top: 0});
  var nodeThree = graphOne.addNode("3", {left: 75, top: 60});
  var nodeFour = graphOne.addNode("4", {left: 0,  top: 80});
  var nodeFive =graphOne.addNode("5", {left: 125, top: 100});
  var nodeSix = graphOne.addNode("6", {left: 200, top: 110});

  // Add edges to graph 
  
  graphOne.addEdge(nodeOne, nodeFour);
  graphOne.addEdge(nodeOne, nodeThree);
  graphOne.addEdge(nodeThree, nodeTwo);
  graphOne.addEdge(nodeTwo, nodeFive);
  graphOne.addEdge(nodeFive, nodeSix);

  graphOne.layout();

  av.label("(a) A graph with relatively few edges is called a <i>sparse graph</i>.", 
    {top: 160, left: 10, width: 5}).show();


  //second graph 
  var graphTwo = av.ds.graph({top: 10, left: 560, width: 250, height: 250});

   nodeOne = graphTwo.addNode("1", {left: 0, top: 10});
   nodeTwo = graphTwo.addNode("2", {left:  150 , top: 0});
   nodeThree = graphTwo.addNode("3", {left: 75, top: 60});
   nodeFour = graphTwo.addNode("4", {left: 0,  top: 80});
   nodeFive =graphTwo.addNode("5", {left: 175, top: 65});
   nodeSix = graphTwo.addNode("6", {left: 200, top: 110});

  graphTwo.addEdge(nodeOne, nodeFour);
  graphTwo.addEdge(nodeOne, nodeThree);
  graphTwo.addEdge(nodeThree, nodeTwo);
  graphTwo.addEdge(nodeTwo, nodeFive);
  graphTwo.addEdge(nodeFive, nodeSix);
  graphTwo.addEdge(nodeThree, nodeFour);
  graphTwo.addEdge(nodeFour, nodeSix);
  graphTwo.addEdge(nodeSix, nodeFive);
  graphTwo.addEdge(nodeThree, nodeSix);
  graphTwo.addEdge(nodeOne, nodeTwo);

  graphTwo.layout();

  av.label("(b) A graph with many edges is called a <i>dense graph</i>.", 
    {top: 160, left: 450, width: 5}).show();


  //third graph
  // Create a complete graph 
  var graphThree = av.ds.graph({top: 210, left: 210, width: 250, height: 250});
  var n1 = graphThree.addNode("1", {left: -75, top: 50});
  var n2 = graphThree.addNode("2", {left: 75, top: 50});
  var n3 = graphThree.addNode("3", {left: 0, top: 0});
  var n4 = graphThree.addNode("4", {left: -50, top: 110});
  var n5 = graphThree.addNode("5", {left: 50, top: 110});

  graphThree.addEdge(n1, n2);
  graphThree.addEdge(n1, n3);
  graphThree.addEdge(n1, n4);
  graphThree.addEdge(n1, n5);
  graphThree.addEdge(n2, n3);
  graphThree.addEdge(n2, n4);
  graphThree.addEdge(n2, n5);
  graphThree.addEdge(n3, n4);
  graphThree.addEdge(n3, n5)
  graphThree.addEdge(n4, n5);
  graphThree.layout();

  av.label("(c) A graph with edges connecting every pair of nodes is called a <i>complete graph</i>.", 
    {top: 365, left: 10, width: 5}).show();

  //last graph 
  var graphTwo = av.ds.graph({top: 210, left: 560, width: 250, height: 250});

   nodeOne = graphTwo.addNode("1", {left: 0, top: 10});
   nodeTwo = graphTwo.addNode("2", {left:  150 , top: 0});
   nodeThree = graphTwo.addNode("3", {left: 75, top: 70});
   nodeFour = graphTwo.addNode("4", {left: 0,  top: 95});
   nodeFive =graphTwo.addNode("5", {left: 175, top: 65});
   nodeSix = graphTwo.addNode("6", {left: 200, top: 110});

  graphTwo.addEdge(nodeOne, nodeFour);
  graphTwo.addEdge(nodeOne, nodeThree);
  graphTwo.addEdge(nodeTwo, nodeFive);
  graphTwo.addEdge(nodeFive, nodeSix);
  graphTwo.addEdge(nodeThree, nodeFour);
  graphTwo.addEdge(nodeFour, nodeSix);
  graphTwo.addEdge(nodeSix, nodeFive);
  graphTwo.addEdge(nodeThree, nodeSix);
  graphTwo.addEdge(nodeOne, nodeTwo);

  graphTwo.addEdge(nodeOne, nodeSix).addClass("redEdge");
  graphTwo.getEdge(nodeOne, nodeThree).addClass("redEdge");
  graphTwo.getEdge(nodeOne, nodeFour).addClass("redEdge");
  graphTwo.getEdge(nodeFour, nodeThree).addClass("redEdge");
  graphTwo.getEdge(nodeThree, nodeSix).addClass("redEdge");
  graphTwo.getEdge(nodeFour, nodeSix).addClass("redEdge");

  nodeOne.highlight();
  nodeThree.highlight();
  nodeFour.highlight();
  nodeSix.highlight();

  graphTwo.layout();

  av.label("(d) Any subset of $V$ where all vertices in the subset have edges to all other vertices in the subset is called a <i>clique</i>. Here, the highlighted nodes form a clique.",
    {top: 350, left: 450, width: 5}).show();





});
