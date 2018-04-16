"use strict";
/*global alert: true, ODSA */

$(document).ready(function() {
  var av = new JSAV("topSort");
  var g;
  var arr;
  var c0, c1, c2, c3, c4, c5, c6, c7, c8;
  var size;
  var numberofnodes;

  numberofnodes = 0;
  g = av.ds.graph({width: 300, height: 300, layout: "manual", directed: true});
  arr = av.ds.array(["","","","","","","",""],{left: 670, bottom: 150, layout: "vertical", width: 100});
  size = 7;
  initGraph();
  g.layout();
  av.umsg("A topological sort is performed by doing a depth first search on a " +
    "directed acyclic graph. The nodes are are then popped off the stack resulting in a topological sort ");
  av.displayInit();
  markIt(g.nodes()[0]);
  dfs(g.nodes()[0]);
  av.step();
  av.umsg("Possible ordering of CS coures:  " + displaySort(numberofnodes));
  av.step();
  av.recorded();

// Mark the nodes when visited and highlight it to
// show it has been marked
function markIt(node) {
  node.addClass("marked");
  av.umsg("Mark node " + node.value());
  node.highlight();
  av.step();
}


function postVisit(node) {
  av.umsg("Add " + node.value() + " to the stack ");
  arr.value(size, node.value());
  numberofnodes++;
  size--;
}

// Recursive depth first search algorithmn for searching
// the graph
function dfs(start, prev) {
  var adjacent;
  var next;
  adjacent = start.neighbors();

  for (next = adjacent.next(); next; next = adjacent.next()) {
    av.umsg("Process edge between (" + start.value() + " and " + next.value() + ")");
      if(next.hasClass("marked")) {
        av.umsg("Node " + next.value() + " already marked");
      }

    av.step();
    if (!next.hasClass("marked")) {
      av.umsg("Call depth first search on " + next.value());
      av.step();
      markIt(next);
      dfs(next, start);
      av.step();
    }
  }
  postVisit(start);
}

// Graph prepartion for initial stage of visualization

function initGraph() {
  c1 = g.addNode("1114", {"left": 230, "top": 50});
  c2 = g.addNode("2114", {"left": 100, "top": 125});
  c5 = g.addNode("2505", {"left": 0, "top": 200});
  c7 = g.addNode("3114", {"left": 200, "top": 200});
  c3 = g.addNode("3604", {"left": 160, "top": 270});
  c6 = g.addNode("2506", {"left": 100, "top": 320});
  c4 = g.addNode("3304", {"left": 225, "top": 270});
  c8 = g.addNode("3214", {"left": -30, "top": 400});

  g.addEdge(c1, c2);
  g.addEdge(c2, c5);
  g.addEdge(c5, c7);
  g.addEdge(c5, c6);
  g.addEdge(c7, c3);
  g.addEdge(c7, c4);
  g.addEdge(c6, c8);
}

function displaySort(numberofnodes) {

  var str = "";

  for (var i = 0; i < numberofnodes - 1; i++) {
    str += "CS " + arr.value(i) + " , ";
  }
  str += "CS" + arr.value(numberofnodes - 1);

  return str;
}

});
