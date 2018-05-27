/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av = new JSAV("DfsCON");
  var g;
  var arr;
  var a, b, c, d, e, f;
  var size;

  g = av.ds.graph({width: 500, height: 360, layout: "manual", directed: true});
  arr = av.ds.array(["", "", "", "", "", ""],
                    {left: 700, top: 50, layout: "vertical", width: "30px"});
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
    a = g.addNode("A", {left: 25});
    b = g.addNode("B", {left: 325});
    c = g.addNode("C", {left: 145, top: 75});
    d = g.addNode("D", {left: 145, top: 200});
    e = g.addNode("E", {top:  300});
    f = g.addNode("F", {left: 325, top: 250});
    g.addEdge(a, c).css({"arrow-end": "none"});
    g.addEdge(c, a).css({"arrow-end": "none"});
    g.addEdge(a, e).css({"arrow-end": "none"});
    g.addEdge(c, b).css({"arrow-end": "none"});
    g.addEdge(b, c).css({"arrow-end": "none"});
    g.addEdge(c, e).css({"arrow-end": "none"});
    g.addEdge(c, f).css({"arrow-end": "none"});
    g.addEdge(b, f).css({"arrow-end": "none"});
    g.addEdge(f, b).css({"arrow-end": "none"});
    g.addEdge(f, c).css({"arrow-end": "none"});
    g.addEdge(f, d).css({"arrow-end": "none"});
    g.addEdge(d, c).css({"arrow-end": "none"});
    g.addEdge(d, f).css({"arrow-end": "none"});
    g.addEdge(f, e).css({"arrow-end": "none"});
    g.addEdge(e, a).css({"arrow-end": "none"});
    g.addEdge(e, f).css({"arrow-end": "none"});
    g.layout();
    av.umsg("Call depth first search on A");
  }

  function preVisit(node, prev) {
    av.umsg("Add " + node.value() + " to the stack ");
    arr.value(size, node.value());
    size--;
    if (prev) {
      node.edgeFrom(prev).addClass("markpath");
      node.edgeFrom(prev).css({"arrow-end": "classic-wide-long"});
      g.removeEdge(node, prev);
      g.layout();
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
      if (next.hasClass("marked")) {
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
