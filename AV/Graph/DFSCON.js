/*global ODSA */
// Written by Thomas Walton, Ivan Wong and Cliff Shaffer
// Hard-coded example version of DFS demo
$(document).ready(function() {
  "use strict";
  var av_name = "DFSCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({
    av_name: av_name, json_path: "../../../AV/Graph/DFSAV.json"});
  var interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);
  var g;        // The graph
  var a, b, c, d, e, f; // Access variables for the graph nodes
  var arr;      // Storage for the recursion stack
  var size = 4; // Start position in the stack

  g = av.ds.graph({width: 500, height: 360, layout: "manual", directed: true});
  arr = av.ds.array(["", "", "", "", "", ""],
                    {left: 700, top: 20, layout: "vertical"});
  initGraph();

  // Slide 1
  av.umsg("Let's look at the details of how a depth-first seach works.");
  av.displayInit();
  av.step();

  // Slide 2
  av.umsg("Call depth-first search on A");
  av.step();

  // Slides 3-54
  dfs(g.nodes()[0]);

  // Slide 55
  finalGraph();
  av.recorded();


  // Create the graph (and display it)
  function initGraph() {
    a = g.addNode("A", {left: 25});
    b = g.addNode("B", {left: 325});
    c = g.addNode("C", {left: 145, top: 75});
    d = g.addNode("D", {left: 145, top: 200});
    e = g.addNode("E", {top:  300});
    f = g.addNode("F", {left: 325, top: 250});
    g.addEdge(a, c).css({"arrow-end": "none"});
    g.addEdge(a, e).css({"arrow-end": "none"});
    g.addEdge(b, c).css({"arrow-end": "none"});
    g.addEdge(b, f).css({"arrow-end": "none"});
    g.addEdge(c, a).css({"arrow-end": "none"});
    g.addEdge(c, b).css({"arrow-end": "none"});
    g.addEdge(c, d).css({"arrow-end": "none"});
    g.addEdge(c, e).css({"arrow-end": "none"});
    g.addEdge(c, f).css({"arrow-end": "none"});
    g.addEdge(d, c).css({"arrow-end": "none"});
    g.addEdge(d, f).css({"arrow-end": "none"});
    g.addEdge(e, a).css({"arrow-end": "none"});
    g.addEdge(e, c).css({"arrow-end": "none"});
    g.addEdge(e, f).css({"arrow-end": "none"});
    g.addEdge(f, b).css({"arrow-end": "none"});
    g.addEdge(f, c).css({"arrow-end": "none"});
    g.addEdge(f, d).css({"arrow-end": "none"});
    g.addEdge(f, e).css({"arrow-end": "none"});
    g.layout();
  }


  // What to do when we first visit the node
  function preVisit(node, prev) {
    if (prev) {
      arr.value(size, prev.value());
      size--;
      g.removeEdge(prev,node);
      g.addEdge(prev,node).css({"arrow-end": "classic-wide-long"}).addClass("markpath");
      g.layout();
      av.umsg("Add " + prev.value() + " to the recursion stack and add the new edge to the DFS tree");
      av.step();
    }
  }


  // Mark the nodes when visited and highlight it to
  // show it has been marked
  function markIt(node) {
    node.addClass("marked");
    av.umsg("Mark node " + node.value());
    node.highlight();
    av.step();
  }

  function postVisit(node, prev) {
    if (prev) {
      av.umsg("Return to Node " + prev.value() + ", pop it off the recursion stack");
      size++;
      arr.value(size, " ");
      av.step();
    }
  }

  // Recursive depth first search algorithmn for searching
  // the graph
  function dfs(start, prev) {
    var adjacent;
    var next;
    preVisit(start, prev);
    markIt(start);
    adjacent = start.neighbors();
    for (next = adjacent.next(); next; next = adjacent.next()) {
      av.umsg("Process (" + start.value() + "," + next.value() + ")");
      av.step();
      if (next.hasClass("marked")) {
        av.umsg("Node " + next.value() + " already marked");
        av.step();
      }
      if (!next.hasClass("marked")) {
        av.umsg("Call depth first search on " + next.value());
        av.step();
        dfs(next, start);
      }
    }
    postVisit(start, prev);
  }

  // Resulting graph from completed depth-first search
  function finalGraph() {
    av.umsg("Here is the completed DFS tree");
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
