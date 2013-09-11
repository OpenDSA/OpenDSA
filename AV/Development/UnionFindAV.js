"use strict";
/*global alert: true, ODSA */

(function ($) {
    var jsav;
    var trees;
    var parents;
    var labels;
    var arr;     //Used to initialize the parents and labels arrays.
    var graph;   //To hold the nodes and edges before running the union find

    function runit() {
      var i;
      ODSA.AV.reset(true);
      jsav = new JSAV($('.avcontainer'));
      trees = new Array(10);
      arr = new Array(10);
      //Initializing the parent pointers
      for (i = 0; i < arr.length; i++) {
        arr[i] = null;
      }
      parents = jsav.ds.array(arr, {left: 300, top: 0});
      //Initializing the labels
      for (i = 0; i < 10; i++) {
        arr[i] = String.fromCharCode(i + 65);
      }
      labels = jsav.ds.array(arr, {left: 300, top: 47});

      //Rendering the trees on the container
      initTrees();
      //Defining the graph
      initGraph();

      var b = trees[1].root();
      var a = trees[0].root();
      a.addChild(b);
      console.log(b.parent().value());
      trees[0].layout();
	}
    function find(graphNode) {
      if (!graphNode.treeNode.parent()) {
      //In this case the node is the root of its tree and we return it as its containing tree
        return graphNode.treeNode;
      }
      else {
        var currentNode = graphNode.treeNode;
        while (currentNode.parent()) {
          currentNode = currentNode.parent();
        }
        return currentNode;
      }
    }
    function union(node1, node2) {
      //First we have to find which one has the least size
      if (node1.size >= node2.size) {

      }
      else {


      }
    }
    function initTrees() {
      var pixelOffset = 0;
      var root;
      for (var i = 0; i < 10; i++) {
        if (i < 5) {
          trees[i] = jsav.ds.tree({left: 50 + pixelOffset, top: 150});
          root = trees[i].newNode(labels.value(i));
          trees[i].root(root);
          root.parent(null);
          root.size = 1; //Maintaining the size of the root's tree
          trees[i].show();
          pixelOffset += 100;   //To layout nodes properly
        }
        else if (i === 5) {
          pixelOffset = 0;
        }
        if (i >= 5) {
          trees[i] = jsav.ds.tree({left: 50 + pixelOffset, top: 220});
          trees[i].newNode(labels.value(i));
          root = trees[i].newNode(labels.value(i));
          trees[i].root(root);
          root.parent(null);
          root.size = 1;
          trees[i].show();
          pixelOffset += 100;
        }
      }
    }
    function initGraph() {
      graph = jsav.ds.graph();
      var a = graph.addNode("A");
      var b = graph.addNode("B");
      var c = graph.addNode("C");
      var d = graph.addNode("D");
      var e = graph.addNode("E");
      var f = graph.addNode("F");
      var g = graph.addNode("G");
      var h = graph.addNode("H");
      var i = graph.addNode("I");
      var j = graph.addNode("J");

      graph.addEdge(a, b);
      graph.addEdge(a, h);
      graph.addEdge(a, c);
      graph.addEdge(b, h);
      graph.addEdge(c, h);
      graph.addEdge(d, f);
      graph.addEdge(d, e);
      graph.addEdge(e, f);
      graph.addEdge(e, g);
      graph.addEdge(f, g);
      graph.addEdge(f, i);
      graph.addEdge(h, e);

      //Matching the graphNode to a treeNode to be used in the Find and Union Operations
      //Note: At first each graph node will be matched to the root of its tree
      for (var k = 0; k < graph.nodeCount(); k++) {
        graph.nodes()[k].treeNode = trees[k].root();
      }
      //Make the Graph invisible
      graph.hide();
    }

    function about() {
      var mystring = "Union Find Data Structure Visualization\nWritten by Mohammed Fawzi and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during Spring, 2013\nLast update: March, 2013\nJSAV library version " + JSAV.version();
      alert(mystring);
    }
    // Connect action callbacks to the HTML entities
    $('#about').click(about);
    $('#runit').click(runit);
    //$('#help').click(help);
    $('#reset').click(ODSA.AV.reset);
  }(jQuery));
