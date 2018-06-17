/*global ODSA graphUtils */
// Written by Thomas Walton, Ivan Wong and Cliff Shaffer
$(document).ready(function() {
  "use strict";

  // Load the config object with interpreter
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,       // get the interpreter
      settings = config.getSettings();      // Settings for the AV

  var g;
  var arr;
  var av;
  var firstElement;
  var lastElement;
  var markCount;
  var nodeCount;


  function dir() {
    doIt(true);
  }


  function undir() {
    doIt(false);
  }


  function doIt(idDirected) {
    ODSA.AV.reset(true);
    av = new JSAV($(".avcontainer"));
    makeGraph(idDirected);
    arr = av.ds.array(["", "", "", "", "", "", ""],
                      {layout: "vertical", left: 570, top: 0, width: 60});
    firstElement = 0;
    lastElement = 0;
    markCount = 0;
    nodeCount = g.nodeCount();
    g.layout();
    av.umsg("Let's look at the details of how a breadth-first seach works.");
    av.displayInit();
    av.step();
    var start = g.nodes()[0];
    av.umsg("Call breadth-first search on " + start.value());
    av.step();
    bfs(start);
    finalGraph();
    av.recorded();
  }


  // Mark the nodes when visited and highlight it to
  // show it has been marked
  function markIt(node) {
    node.addClass("marked");
    node.highlight();
    arr.value(lastElement, node.value());
    lastElement++;
    markCount++;
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


  function bfs(start) {
    markIt(g.nodes()[0]);
    var node;
    var adjNode = [];
    var q = [];
    q.push(start);

    while (q.length > 0) {
      node = q.shift();
      dequeueIt(node);
      adjNode = node.neighbors();
      while (adjNode.length > 0) {
        var neighbor = adjNode[0];
        if (!neighbor.hasClass("marked")) {
          markIt(neighbor);
          neighbor.edgeFrom(node).addClass("markpath");
          q.push(neighbor);
          av.umsg("Add the edge from " + node.value() + " to " + neighbor.value() + " to the BFS tree");
          av.step();
        } else {
          av.umsg("Follow edge to node " + neighbor.value() + ", but it is already marked so we skip it.");
          av.step();
        }
        adjNode.shift();
      }
    }
  }


  // Graph prepartion for initial stage of visualization
  function makeGraph(isDirected) {
    g = av.ds.graph({
      width: 400,
      height: 360,
      left: 0,
      top: 0,
      layout: "automatic",
      directed: isDirected
    });
    graphUtils.generate(g); // Randomly generate the graph without weights
    av.umsg("Initial call to BFS on A.");
    return g;
  }


  // Resulting graph from completed breadth-first search
  function finalGraph() {
    av.umsg("Completed breadth first search graph");
    av.step();
    if (markCount < nodeCount) {
      av.umsg("Note that this traversal did not reach all of the nodes, " +
              "due to the directions on the edges making some nodes " +
              "unreachable from A. This is why BFS is typically done in the " +
              "context of starting the traversal from every node.");
    }
  }


  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }


  // Connect action callbacks to the HTML entities
  $("#about").click(about);
  $("#dir").click(dir);
  $("#undir").click(undir);
});
