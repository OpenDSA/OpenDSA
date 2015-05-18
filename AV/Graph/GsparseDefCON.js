/*global ODSA */
"use strict";
$(document).ready(function () {
  var av_name = "GsparseDefCON";
  var interpret = ODSA.UTILS.loadConfig({"av_name": av_name,
                         "json_path": "AV/Graph/GraphDefCON.json"}).interpreter;
  var av = new JSAV(av_name, {"animationMode" : "none"});

  var gTop = -5;
  var gToffset = 210;
  var gLeft = 90;
  var gLoffset = 430;
  var gWidth = 250;
  var gHeight = 140;
  var lTop = 145; // For the graph labels
  var lToffset = 205; // For the graph labels

  // Lines for visual break up 
  av.g.line( 0, 190, 850, 190).addClass("borderEdge");
  av.g.line(425, 0, 425, 400).addClass("borderEdge");

  // Graph one 
  var graphOne = av.ds.graph({top: gTop, left: gLeft,
                              width: gWidth, height: gHeight});

  var nodeOne = graphOne.addNode("1", {left: 0, top: 10});
  var nodeTwo = graphOne.addNode("2", {left:  150 , top: 0});
  var nodeThree = graphOne.addNode("3", {left: 75, top: 60});
  var nodeFour = graphOne.addNode("4", {left: 0,  top: 80});
  var nodeFive =graphOne.addNode("5", {left: 175, top: 65});
  var nodeSix = graphOne.addNode("6", {left: 200, top: 110});

  graphOne.addEdge(nodeOne, nodeFour);
  graphOne.addEdge(nodeOne, nodeThree);
  graphOne.addEdge(nodeThree, nodeTwo);
  graphOne.addEdge(nodeTwo, nodeFive);
  graphOne.addEdge(nodeFive, nodeSix);

  graphOne.layout();

  av.label("(a) A graph with relatively few edges is called a <i>sparse graph</i>.", 
    {top: lTop, left: 10, width: 5}).show();


  //second graph 
  var graphTwo = av.ds.graph({top: gTop, left: gLeft + gLoffset,
                              width: gWidth, height: gHeight});

   nodeOne = graphTwo.addNode("1", {left: 0, top: 10});
   nodeTwo = graphTwo.addNode("2", {left:  150 , top: 0});
   nodeThree = graphTwo.addNode("3", {left: 80, top: 70});
   nodeFour = graphTwo.addNode("4", {left: 0,  top: 80});
   nodeFive =graphTwo.addNode("5", {left: 175, top: 65});
   nodeSix = graphTwo.addNode("6", {left: 200, top: 110});

  graphTwo.addEdge(nodeOne, nodeFour);
  graphTwo.addEdge(nodeOne, nodeThree);
  graphTwo.addEdge(nodeOne, nodeFive);
  graphTwo.addEdge(nodeOne, nodeSix);
  graphTwo.addEdge(nodeTwo, nodeFour);
  graphTwo.addEdge(nodeTwo, nodeFive);
  graphTwo.addEdge(nodeThree, nodeTwo);
  graphTwo.addEdge(nodeFive, nodeSix);
  graphTwo.addEdge(nodeThree, nodeFour);
  graphTwo.addEdge(nodeFour, nodeSix);
  graphTwo.addEdge(nodeSix, nodeFive);
  graphTwo.addEdge(nodeThree, nodeSix);
  graphTwo.addEdge(nodeOne, nodeTwo);

  graphTwo.layout();

  av.label("(b) A graph with many edges is called a <i>dense graph</i>.", 
    {top: lTop, left: 450, width: 5}).show();


  //third graph
  // Create a complete graph 
  var graphThree = av.ds.graph({top: gTop + gToffset, left: gLeft,
                              width: gWidth, height: gHeight});

  var n1 = graphThree.addNode("1", {left: 0, top: 50});
  var n2 = graphThree.addNode("2", {left: 150, top: 50});
  var n3 = graphThree.addNode("3", {left: 75, top: 0});
  var n4 = graphThree.addNode("4", {left: 25, top: 110});
  var n5 = graphThree.addNode("5", {left: 125, top: 110});

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

  av.label("(c) A <i>complete graph</i> has edges connecting every pair of nodes.",
           {top: lTop + lToffset, left: 0}).show();

  //last graph 
  var graphFour = av.ds.graph({top: gTop + gToffset, left: gLeft + gLoffset,
                               width: gWidth, height: gHeight});

   nodeOne = graphFour.addNode("1", {left: 0, top: 10}).highlight();
   nodeTwo = graphFour.addNode("2", {left:  150 , top: 0});
   nodeThree = graphFour.addNode("3", {left: 80, top: 70}).highlight();
   nodeFour = graphFour.addNode("4", {left: 0,  top: 80}).highlight();
   nodeFive =graphFour.addNode("5", {left: 175, top: 65});
   nodeSix = graphFour.addNode("6", {left: 200, top: 110}).highlight();

  graphFour.addEdge(nodeOne, nodeFour);
  graphFour.addEdge(nodeOne, nodeThree).addClass("redEdge");
  graphFour.addEdge(nodeOne, nodeFive);
  graphFour.addEdge(nodeOne, nodeSix).addClass("redEdge");
  graphFour.addEdge(nodeTwo, nodeFour);
  graphFour.addEdge(nodeTwo, nodeFive);
  graphFour.addEdge(nodeThree, nodeTwo);
  graphFour.addEdge(nodeFive, nodeSix);
  graphFour.addEdge(nodeThree, nodeFour).addClass("redEdge");
  graphFour.addEdge(nodeFour, nodeSix).addClass("redEdge");
  graphFour.addEdge(nodeSix, nodeFive);
  graphFour.addEdge(nodeThree, nodeSix).addClass("redEdge");
  graphFour.addEdge(nodeOne, nodeTwo);
  graphFour.layout();

  av.label("(d) A <i>clique</i> is a subset of $V$ where all vertices in the subset have edges to all other vertices in the subset.",
           {top: lTop + lToffset, left: 445}).show();

});
