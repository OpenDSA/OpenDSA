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
  var size;
  var av;
  var markCount;
  var nodeCount;


  function dir() {
    doIt(true);
  }


  function undir() {
    doIt(false);
  }


  function doIt(isDirected) {
    ODSA.AV.reset(true);
    av = new JSAV($(".avcontainer"), {settings: settings});
    makeGraph(isDirected);
    arr = av.ds.array(["", "", "", "", "", "", "", ""],
                      {layout: "vertical", left: 640, top: 0, width: 60});
    size = 6;
    markCount = 0;
    nodeCount = g.nodeCount();
    av.umsg("Let's look at the details of how a depth-first seach works.");
    g.layout();
    av.displayInit();
    dfs(g.nodes()[0]);
    av.umsg("Completed depth first search graph");
    if (markCount < nodeCount) {
      av.step();
      av.umsg("Note that this traversal did not reach all of the nodes, " +
              "due to the directions on the edges making some nodes unreachable from A. " +
              "This is why DFS is typically done in the context of starting the " +
              "traversal from every node.");
    }
    av.recorded();
  }


  function makeGraph(isDirected) {
    g = av.ds.graph({
      width: 500,
      height: 360,
      left: 0,
      top: 50,
      layout: "automatic",
      directed: isDirected
    });
    graphUtils.generate(g); // Randomly generate the graph without weight
    return g;
  }


  function preVisit(node, prev) {
    if (prev) {
      arr.value(size, prev.value());
      size--;
      node.edgeFrom(prev).addClass("markpath");
      av.umsg("Add " + prev.value() + " to the recursion stack and add the new edge to the DFS tree");
      av.step();
    }
  }


  // Mark the nodes when visited and highlight it to
  // show it has been marked
  function markIt(node) {
    node.addClass("marked");
    markCount++;
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
      } else {
        av.umsg("Call depth first search on " + next.value());
        av.step();
        dfs(next, start);
      }
    }
    postVisit(start, prev);
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
