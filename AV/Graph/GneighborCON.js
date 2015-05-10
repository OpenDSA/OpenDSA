/*global ODSA */
"use strict";
$(document).ready(function () {
  var av = new JSAV("GneighborCON", {"animationMode" : "none"});

  var gTop = -5;
  var gLeft = 150;
  var gWidth = 150;
  var gHeight = 140;
  var lHeight = 130; // For the graph labels

  // Lines for visual break up
  av.g.line(425, gTop, 425, gHeight).addClass("borderEdge");
	
  var graphA = av.ds.graph({left: gLeft, top: gTop, directed: true,
                            width: gWidth, height: gHeight});

  var nodea = graphA.addNode("a", {left: 0,   top: 0});
  var nodeb = graphA.addNode("c", {left: 100, top: 0});
  var nodec = graphA.addNode("e", {left: 50,  top: 50});
  var noded = graphA.addNode("b", {left: 0,   top: 100});
  var nodee = graphA.addNode("d", {left: 100, top: 100});

  graphA.addEdge(nodea, noded);
  graphA.addEdge(nodea, nodec);
  graphA.addEdge(nodeb, nodec);
  graphA.addEdge(nodee, nodeb);
  graphA.addEdge(noded, nodee);
  graphA.addEdge(nodec, noded);
  graphA.layout();

  nodea.highlight();
  noded.highlight();
  av.label("(a) Vertices $a$ and $b$ are neighbors",
           {top: lHeight, left: 100}).show();

  gLeft = 570;
  var graphB = av.ds.graph({left: gLeft, top: gTop, directed: true,
                            width: gWidth, height: gHeight});

  nodea = graphB.addNode("a", {left: 0,   top: 0});
  nodeb = graphB.addNode("c", {left: 100, top: 0});
  nodec = graphB.addNode("e", {left: 50,  top: 50});
  noded = graphB.addNode("b", {left: 0,   top: 100});
  nodee = graphB.addNode("d", {left: 100, top: 100});

  graphB.addEdge(nodea, noded).addClass("redEdge");
  graphB.addEdge(nodea, nodec);
  graphB.addEdge(nodeb, nodec);
  graphB.addEdge(nodee, nodeb);
  graphB.addEdge(noded, nodee);
  graphB.addEdge(nodec, noded);

  av.label("(b) The red edge $(a, b)$ is incident on vertices $a$ and $b$",
           {top: lHeight, left: 470}).show();
  graphB.layout();
});
