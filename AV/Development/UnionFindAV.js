"use strict";
/*global alert: true, ODSA */

(function ($) {
    var jsav;
	var tree;
    var parents;
    var labels;
    var arr;     //Used to initialize the parents and labels arrays.
    var graph;   //To hold the nodes and edges before running the union find

    function runit() {
      var i;
      ODSA.AV.reset(true);
      jsav = new JSAV($('.avcontainer'));
      arr = new Array(10);
      //Initializing the parent pointers
      for (i = 0; i < arr.length; i++) {
        arr[i] = null;
      }
      parents = jsav.ds.array(arr, {left: 300, top: -30});
      //Initializing the labels
      for (i = 0; i < arr.length; i++) {
        arr[i] = String.fromCharCode(i + 65);
      }
      labels = jsav.ds.array(arr, {left: 300, top: 17});

      //Rendering the trees on the container
      initTree();
      //Defining the graph
      initGraph();
	  
	  var a = graph.nodes()[0].treeNode;
	  var b = graph.nodes()[1].treeNode;
	  var c = graph.nodes()[2].treeNode;
	  var d = graph.nodes()[3].treeNode;
	  var e = graph.nodes()[4].treeNode;
	  var f = graph.nodes()[5].treeNode;
	  var g = graph.nodes()[6].treeNode;
	  var h = graph.nodes()[7].treeNode;
	  var i = graph.nodes()[8].treeNode;
	  var j = graph.nodes()[9].treeNode;
	  
	  var aa = cloneChild(a, 0);
	  var dd = cloneChild(d, 3);
	  var jj = cloneChild(j, 9);
	  var ii = cloneChild(i, 8);
	 
	  b.addChild(aa);
	  b.addChild(dd);
	  
	  a = graph.nodes()[0].treeNode;
	  d = graph.nodes()[3].treeNode;
	  a.addChild(jj);
	  d.addChild(ii);
	  
	  tree.layout();
	  
	}
	function cloneChild(child, graphNodeIndex){
	  //var child = tree.root().child(index);
	  var newNode = tree.newNode(child.value());
	  newNode.size = child.size;
	  newNode.graphNode = child.graphNode;
	  graph.nodes()[graphNodeIndex].treeNode = newNode;
	  //tree.root().child(index, null);
	  child.hide();
	  return newNode;	  
	}
    function find(graphNode) {
      if (graphNode.treeNode.parent() === tree.root()) {
      //In this case the node is the root of its tree and we return it as its containing tree
        return graphNode.treeNode;
      }
      else {
        var currentNode = graphNode.treeNode;
        while (currentNode.parent() != tree.root()) {
          currentNode = currentNode.parent();
        }
        return currentNode;
      }
    }
    function union(node1, node2) {
      //First we have to find which one has the least size
      if (node1.size >= node2.size) {
        node1.addChild(node2);
      }
      else {
        node2.addChild(node1);

      }
    }
    function initTree() {
	  var pixelOffset = 0;
	  var newNode;
	  tree = jsav.ds.tree({left: 20, top: 90, nodegap: 20});
	  var root = tree.newNode("X");
	  tree.root(root);
	  root.id("root");
	  for (var i = 0; i < arr.length; i++) {
	    newNode = tree.newNode(labels.value(i));
		newNode.size = 1;   //To maintain the size of each connected component
	    root.addChild(newNode);  
	  }
	  tree.layout();
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
      for (var k = 0; k < graph.nodeCount(); k++) {
        graph.nodes()[k].treeNode = tree.root().child(k);
		(tree.root().child(k)).graphNode = graph.nodes()[k];
      }
      //Make the Graph invisible
      graph.hide();
    }
	function processGraph(){
	  
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