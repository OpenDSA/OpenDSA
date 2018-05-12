"use strict";
/*global alert: true, ODSA */

(function ($) {
  var jsav;
  var g;
  var arr;
  var c0, c1, c2, c3, c4, c5, c6, c7, c8;
  var size;
  var numberofnodes;
  var markCount;

function runit() {
  ODSA.AV.reset(true);
  jsav = new JSAV($('.avcontainer'));
  numberofnodes = 0;
  markCount =0;
  arr = jsav.ds.array(["","","","",""],{left: 600, top: 100, layout: "vertical"});
  size = 4;
  initGraph();
  g.layout();
  jsav.umsg("A topological sort is performed by doing a depth first search on a " +
    "directed acyclic graph. The nodes are are then popped off the stack resulting in a topological sort ");
  jsav.displayInit();
  markIt(g.nodes()[0]);
  dfs(g.nodes()[0]);
  jsav.step();
  jsav.umsg("Possible ordering of nodes:  " + displaySort(numberofnodes));
  jsav.step();
  jsav.recorded();
}

// Mark the nodes when visited and highlight it to
// show it has been marked
function markIt(node) {
  node.addClass("marked");
  jsav.umsg("Mark node " + node.value());
  node.highlight();
  markCount++;
  jsav.step();
}


function postVisit(node) {
  jsav.umsg("Add " + node.value() + " to the stack ");
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
    jsav.umsg("Process edge between (" + start.value() + " and " + next.value() + ")");
      if(next.hasClass("marked")) {
        jsav.umsg("Node " + next.value() + " already marked");
      }

    jsav.step();
    if (!next.hasClass("marked")) {
      jsav.umsg("Call depth first search on " + next.value());
      jsav.step();
      markIt(next);
      dfs(next, start);
      jsav.step();
    }
  }
  postVisit(start);
}


function about() {
   alert("Top Sort Visualization");
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
  return g;
}

function displaySort() {
  var str = "";

  if (markCount == 0) {
    str = "There are no possible traversals on this graph."
    return str;
  }

    for (var j = 5 - markCount; j < 4; j++) {
      str += arr.value(j) + ", ";
    }
    str += arr.value(j);
  return str;
}


// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);
}(jQuery));
