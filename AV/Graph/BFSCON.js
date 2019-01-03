/*global ODSA */
// Written by Thomas Walton and Cliff Shaffer
// Hard-coded example version of BFS demo
$(document).ready(function() {
  "use strict";
  var av_name = "BFSCON";
  var av = new JSAV(av_name);
  var g;
  var arr;
  var a, b, c, d, e, f;
  var firstElement;
  var lastElement;

  g = av.ds.graph({width: 500, height: 360, layout: "manual", directed: true});
  arr = av.ds.array(["", "", "", "", "", ""],
                    {left: 700, top: 20, layout: "vertical"});
  firstElement = 0;
  lastElement = 0;
  initGraph();

  // Slide 1
  av.umsg("Let's look at the details of how a breadth-first seach works.");
  av.displayInit();
  av.step();

  // Slide 2
  av.umsg("Call breadth-first search on A");
  av.step();

  // Slides 3-??
  bfs(g.nodes()[0]);

  // Slide ??+1
  finalGraph();
  av.recorded();


  // Graph prepartion for initial stage of visualization
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


  // Mark a node when it is visited, and highlight it to
  // show that it has been marked
  function markIt(node) {
    node.addClass("marked");
    arr.value(lastElement, node.value());
    lastElement++;
    node.highlight();
    av.umsg("Mark and enqueue " + node.value());
    av.step();
  }


  function dequeueIt(node) {
    node.addClass("dequeued");
    arr.value(firstElement, "");
    firstElement++;
    av.umsg("Dequeue " + node.value());
    av.step();
  }


  // Run a BFS, beginning at node "start"
  function bfs(start) {
    var node;
    var adjNode = [];
    var q = [];
    q.push(start);
    markIt(start);
    var weig = 0;
    while (q.length > 0) {
      node = q.shift();
      dequeueIt(node);
      adjNode = node.neighbors();
      weig++;
      while (adjNode.length > 0) {
        var neighbor = adjNode[0];
        if (!neighbor.hasClass("marked")) {
          markIt(neighbor);
      g.removeEdge(node,neighbor);
      g.addEdge(node,neighbor, {weight: weig}).css({"arrow-end": "classic-wide-long"}).addClass("markpath");
          g.layout();
          av.umsg("Add the edge from " + node.value() + " to " + neighbor.value() + " to the BFS tree");
          av.step();
          q.push(neighbor);
        } else {
          av.umsg("Follow edge to node " + neighbor.value() + ", but it is already marked so we skip it.");
          av.step();
        }
        adjNode.shift();
      }
      
      av.umsg("Now we are all done processing node " + node.value());
      av.step();
    }
  }


  // Resulting graph from completed breadth-first search
  function finalGraph() {
    av.umsg("Here is the completed BFS tree");
    g.removeEdge(e, f);
    g.removeEdge(d, f);
    g.removeEdge(b, f);
    g.removeEdge(f, e);
    g.removeEdge(f, d);
    g.removeEdge(f, b);
    g.removeEdge(c, e);
    g.removeEdge(e, c);
  }
});
