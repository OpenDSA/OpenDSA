"use strict";
/*global alert: true, ODSA */
(function($) {

  var g;
  var graph;
  var arr;
  var jsav;
  //var a, b, c, d, e, f;
  var firstElement;
  var lastElement;


  function runit() {
  ODSA.AV.reset(true);
  jsav = new JSAV($('.avcontainer'));
  //g = jsav.ds.graph({width: 500, height: 500, left: 0, top: 50, layout: "manual", directed: true});
  initGraph();
 /*  arr = new Array(g.nodeCount(),
  for (var i =0; i < arr.length; i++) {
    arr[i] = " "
  }
  */
  //arr = jsav.ds.array(Array[g.nodeCount()]); array.fill(" ");
  //num = g.nodeCount(); arr = jsav.ds.array(num);
  //arr = jsav.ds.array(g.nodeCount()).fill(" ");console.log(arr.length);

  //arr = jsav.ds.array([""],  {layout: "vertical", left: 525, top: 105, width: 60});
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


// Mark the nodes when visited and highlight it to
// show it has been marked
function markIt(node) {
  node.addClass("marked");
  jsav.umsg("Mark and enqueue " + node.value());
  arr.value(lastElement, node.value());
  lastElement++;
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

function initGraph() {
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

function finalGraph() {
  jsav.umsg("Completed breadth first search graph");

}

// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);

}(jQuery));
