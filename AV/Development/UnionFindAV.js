"use strict";
/*global alert: true, ODSA */

(function ($) {
  var jsav;
  var tree;
  var distances;
  var labels;
  var arr;     //Used to initialize the distance and labels arrays.

  function runit() {
    var i;
    ODSA.AV.reset(true);
    jsav = new JSAV($('.avcontainer'));
    tree = jsav.ds.tree({width: 600, height: 400, layout: "manual", directed: true});
    //initGraph();
    //graph.layout();
    arr = new Array(5);
    for (i = 0; i < arr.length; i++) {
      arr[i] = Infinity;
    }
    parents = jsav.ds.array(arr, {layout: "vertical", left: 200, top: 20});
  }
  // Mark a node in the graph.
  function markIt(node) {
    node.addClass("visited");
    jsav.umsg("Add node " + node.value() + " to the MST");
    distances.highlight(gnodes.indexOf(node));
    labels.highlight(gnodes.indexOf(node));
    node.highlight();
    jsav.step();
  }

  function about() {
    var mystring = "Union Find Data Structure Visualization\nWritten by Mohammed Fawzy and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during Spring, 2013\nLast update: March, 2013\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Initialize the graph.
  function initGraph() {

    //Nodes of the original graph
    var a = graph.addNode("A", {"left": 10, "top": 25});
    var b = graph.addNode("B", {"left": 100, "top": 25});
    var c = graph.addNode("C", {"left": 50, "top": 50});
    var d = graph.addNode("D", {"left": 50, "top": 70});
    var e = graph.addNode("E", {"left": 0, "top": 300});
    var f = graph.addNode("F", {"left": 325, "top": 250});
	var g = graph.addNode("G", {"left": 325, "top": 250});
	var h = graph.addNode("H", {"left": 325, "top": 250});
	var i = graph.addNode("I", {"left": 325, "top": 250});
	var j = graph.addNode("J", {"left": 325, "top": 250});
	
    //Original graph edges
    graph.addEdge(a, c);
    graph.addEdge(a, e);
    graph.addEdge(c, b);
    graph.addEdge(c, d);
    graph.addEdge(c, f);
    graph.addEdge(f, b);
    graph.addEdge(d, f);
    graph.addEdge(e, f);

    gnodes = graph.nodes();
  }
  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  //$('#help').click(help);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
