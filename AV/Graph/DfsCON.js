/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "DfsCON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);
  var g;
  var arr;
  var a, b, c, d, e, f;
  var size;

  g = av.ds.graph({width: 500, height: 500, layout: "manual", directed: true});
  arr = av.ds.array([" "," "," ", " ", " "],{layout: "vertical"});
  arr.css({"left": "300px", "bottom": "500px", "width": "30px"});
  size = 4;
  initGraph();
  av.displayInit();
  av.umsg("Let's look at the details of how a depth-first seach works.");
  markIt(g.nodes()[0]);
  dfs(g.nodes()[0]);
  av.step();
  finalGraph();
  av.recorded();


function initGraph() {
  a = g.addNode("A", {"left": 25});
  b = g.addNode("B", {"left": 325});
  c = g.addNode("C", {"left": 145, "top": 75});
  d = g.addNode("D", {"left":145, "top": 200});
  e = g.addNode("E", {"top": 300});
  f = g.addNode("F", {"left":325, "top":250});
  g.addEdge(a, c);
  g.addEdge(c, a);
  g.addEdge(a, e);
  g.addEdge(c, b);
  g.addEdge(b, c);
  g.addEdge(c, e);
  g.addEdge(c, f);
  g.addEdge(b, f);
  g.addEdge(f, b);
  g.addEdge(f, c);
  g.addEdge(f, d);
  g.addEdge(d, c);
  g.addEdge(d, f);
  g.addEdge(f, e);
  g.addEdge(e, a);
  g.addEdge(e, f);
  g.layout();
  av.umsg("Call depth first search on A");

}

function preVisit(node, prev) {
  av.umsg("Add " + node.value() + " to the stack ");
  arr.value(size, node.value());
  size--;
  if (prev) {
    node.edgeFrom(prev).addClass("markpath");
    //node.edgeFrom(prev).css({"stroke": "red", "stroke-width": "3", "stroke-height": "1"});
    //g.addEdge(prev, node, {weight: 10});
    //node.edgeFrom(prev).css({"stroke-width": "3", "stroke": "red"});
    }
  av.step();
}

// Mark the nodes when visited and highlight it to
// show it has been marked
function markIt(node) {
  node.addClass("marked");
  av.umsg("Mark node " + node.value());
  node.highlight();
  av.step();
}

function postVisit(node) {
  av.umsg("Pop " + node.value() + " off of stack");
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
    av.umsg("Process (" + start.value() + "," + next.value() + ")");
      if(next.hasClass("marked")) {
        av.umsg("Node " + next.value() + " already marked");
      }

    av.step();
    if (!next.hasClass("marked")) {
      av.umsg("Print (" + start.value() + "," + next.value() + ") and call depth first search on " + next.value());
      av.step();
      markIt(next);
      dfs(next, start);
      av.step();
    }
  }
  postVisit(start);
}

// Resulting graph of completed depth first search
function finalGraph() {
  av.umsg("Completed depth first search graph");
  g.removeEdge(a, e);
  g.removeEdge(e, a);
  g.removeEdge(c, d);
  g.removeEdge(d, c);
  g.removeEdge(c, f);
  g.removeEdge(f, c);
  g.removeEdge(c, e);
  g.removeEdge(e, c);
}

});
