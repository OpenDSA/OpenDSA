/*global ODSA */
"use strict";

(function($) {
  var g;
  var arr;
  var size;
  var jsav;
  var markcount = 0;

  function dir() {
    ODSA.AV.reset(true);
    jsav = new JSAV($('.avcontainer'));
    dirGraph();
    //arr = jsav.ds.array([g.nodeCount()],  {left: 700, top: 50, layout: "vertical", width: "30px"});
    arr = jsav.ds.array(["","","","","","","",""],  {layout: "vertical", left: 640, top: 0, width: 60});

    size = g.nodeCount();

    g.layout();
    jsav.displayInit();
    jsav.umsg("Let's look at the details of how a depth-first seach works.");
    markIt(g.nodes()[0]);
    dfs(g.nodes()[0]);
    jsav.step();
    dirfinalGraph();
    jsav.recorded();
  }

  function undir() {
    ODSA.AV.reset(true);
    jsav = new JSAV($('.avcontainer'));
    undirGraph();
    //arr = jsav.ds.array([g.nodeCount()],  {left: 700, top: 50, layout: "vertical", width: "30px"});
    arr = jsav.ds.array(["","","","","","","",""],  {layout: "vertical", left: 640, top: 0, width: 60});

    size = g.nodeCount();

    g.layout();
    jsav.displayInit();
    jsav.umsg("Let's look at the details of how a depth-first seach works.");
    markIt(g.nodes()[0]);
    dfs(g.nodes()[0]);
    jsav.step();
    finalGraph();
    jsav.recorded();
  }

function dirGraph() {
  g = jsav.ds.graph({
  width: 500,
  height: 360,
  left: 0,
  top: 50,
  layout: "automatic",
  directed: true
  });
  graphUtils.generate(g); // Randomly generate the graph without weight
  jsav.umsg("Call depth first search on A");
  return g;
}

function undirGraph() {
  g = jsav.ds.graph({
  width: 500,
  height: 360,
  left: 0,
  top: 50,
  layout: "automatic",
  directed: false
  });
  graphUtils.generate(g); // Randomly generate the graph without weight
  jsav.umsg("Call depth first search on A");
  return g;
}

function preVisit(node, prev) {
  jsav.umsg("Add " + node.value() + " to the stack ");
  arr.value(size, node.value());
  size--;
  if (prev) {
    node.edgeFrom(prev).addClass("markpath");
    //g.removeEdge(node, prev);
    //node.edgeFrom(prev).css({"stroke": "red", "stroke-width": "3", "stroke-height": "1"});
    //g.addEdge(prev, node, {weight: 10});
    //node.edgeFrom(prev).css({"stroke-width": "3", "stroke": "red"});
    }
  jsav.step();
}

// Mark the nodes when visited and highlight it to
// show it has been marked
function markIt(node) {
  node.addClass("marked");
  jsav.umsg("Mark node " + node.value());
  node.highlight();
  markcount++;
  jsav.step();
}

function postVisit(node) {
  jsav.umsg("Pop " + node.value() + " off of stack");
  size++;
  arr.value(size, " ");
}

// Recursive depth first search algorithmn for searching
// the graph
function dfs(start, prev) {
  var adjacent;
  var next;
  preVisit(start, prev);
  adjacent = start.neighbors();


  for (next = adjacent.next(); next; next = adjacent.next()) {
    jsav.umsg("Process (" + start.value() + "," + next.value() + ")");
      if(next.hasClass("marked")) {
        jsav.umsg("Node " + next.value() + " already marked");
      }

    jsav.step();
    if (!next.hasClass("marked")) {
      jsav.umsg("Print (" + start.value() + "," + next.value() + ") and call depth first search on " + next.value());
      jsav.step();
      markIt(next);
      dfs(next, start);
      jsav.step();
    }
  }
  postVisit(start);
}

// Resulting graph of completed depth first search
function dirfinalGraph() {
  jsav.umsg("Completed depth first search graph");

  if (markcount != g.nodeCount()) {
  jsav.step();
  jsav.umsg("Note that this traversal did not reach all of the nodes, due to the directions on the edges making some nodes unreachable from A."
   + "This is why DFS is typically done in the context of starting the traversal from every node.");
  }
}

function finalGraph() {
  jsav.umsg("Completed depth first search graph");
}

function about() {
  alert("Depth first search visualization");
}
// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#help').click(help);
$('#dir').click(dir);
$('#undir').click(undir);

}(jQuery));
