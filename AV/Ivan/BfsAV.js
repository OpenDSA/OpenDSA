"use strict";
/*global alert: true, ODSA */
(function($) {
  var g;
  var arr;
  var jsav;
  var firstElement;
  var lastElement;
  var markCount;
  var nodeCount;


  function undir() {
  ODSA.AV.reset(true);
  jsav = new JSAV($('.avcontainer'));
  undirGraph();
  arr = jsav.ds.array(["","","","","","",""],  {layout: "vertical", left: 570, top: 50, width: 60});
  firstElement = 0;
  lastElement = 0;
  g.layout();
  jsav.umsg("Let's look at the details of how a breadth-first seach works.");
  jsav.displayInit();
  markIt(g.nodes()[0]);
  jsav.step();
  bfs(g.nodes()[0]);
  finalGraph();
  jsav.recorded();
 }

 function dir() {
 ODSA.AV.reset(true);
 jsav = new JSAV($('.avcontainer'));
 dirGraph();
 arr = jsav.ds.array(["","","","","","",""],  {layout: "vertical", left: 570, top: 50, width: 60});
 firstElement = 0;
 lastElement = 0;
 markCount = 0;
 nodeCount = g.nodeCount();
 g.layout();
 jsav.umsg("Let's look at the details of how a breadth-first seach works.");
 jsav.displayInit();
 markIt(g.nodes()[0]);
 jsav.step();
 bfs(g.nodes()[0]);
 dirfinalGraph();
 jsav.recorded();
}


// Mark the nodes when visited and highlight it to
// show it has been marked
function markIt(node) {
  node.addClass("marked");
  jsav.umsg("Mark and enqueue " + node.value());
  arr.value(lastElement, node.value());
  lastElement++;
  markCount++;
  node.highlight();
}

function dequeueIt(node) {
  node.addClass("dequeued");
  jsav.umsg("Dequeue " + node.value());
  arr.value(firstElement, "");
  firstElement++;
}

function bfs(start) {
  console.log("start : " + start.value());
  var node;
  var adjNode = new Array();
  var q = new Array();
  q.push(start);



 while(q.length > 0) {
    node = q.shift();
    dequeueIt(node);
    console.log("node " + node.value());
    adjNode = node.neighbors();
    console.log("adjNode " + adjNode.length);
    jsav.step();
    while(adjNode.length > 0) {

      if(!adjNode[0].hasClass("marked")) {
        markIt(adjNode[0]);
        jsav.step();
        adjNode[0].edgeFrom(node).addClass("markpath");
        jsav.step();
        q.push(adjNode[0]);
        adjNode.shift();
        console.log("adjNode after pop " + adjNode[0]);
      } else {
          adjNode.shift();
        }
    }
 }

}
function about() {
  alert("Breadth first search visualization");
}


// Graph prepartion for initial stage of visualization

function dirGraph() {
  g = jsav.ds.graph({
  width: 400,
  height: 400,
  left: 0,
  top: 50,
  layout: "automatic",
  directed: true
    });
  graphUtils.generate(g); // Randomly generate the graph without weights
  jsav.umsg("Initial call to BFS on A.");
  return g;
}

function undirGraph() {
  g = jsav.ds.graph({
  width: 400,
  height: 400,
  left: 0,
  top: 50,
  layout: "automatic",
  directed: false
    });
  graphUtils.generate(g); // Randomly generate the graph without weights
  jsav.umsg("Initial call to BFS on A.");
  return g;
}

function finalGraph() {
  jsav.umsg("Completed breadth first search graph");

}

function dirfinalGraph() {

  if (markCount < nodeCount) {
    jsav.umsg("Completed breadth first search graph");
    jsav.step();
  jsav.umsg("Note that this traversal did not reach all of the nodes, due to the directions on the edges making some nodes unreachable from A."
   + "This is why BFS is typically done in the context of starting the traversal from every node.");
  }

  else {
    jsav.umsg("Completed breadth first search graph");
  }

}


// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#help').click(help);
$('#undir').click(undir);
$('#dir').click(dir);

}(jQuery));
