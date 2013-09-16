"use strict";
/*global alert: true, ODSA */

(function ($) {
    var jsav;
	var tree;
    var parents;
    var labels;
    var arr;                   //Used to initialize the parents and labels arrays.
    var graph;                 //To hold the nodes and edges before running the union find
	var treeNodes              //To hold references to each array index treeNode
	var rootNumberOfChildren;    //To keep track of the number of children so far in the root

    function runit() {
      var i;
      ODSA.AV.reset(true);
      jsav = new JSAV($('.avcontainer'));
	  
      arr = new Array(10);
	  rootNumberOfChildren = arr.length;
	  //Initializing the labels
      for (i = 0; i < arr.length; i++) {
        arr[i] = String.fromCharCode(i + 65);
      }
      labels = jsav.ds.array(arr, {left: 300, top: 17});
	 //Rendering the tree on the container
      initTree();
      //Defining the graph
      initGraph();
      //Initializing the parent pointer
      for (i = 0; i < arr.length; i++) {
        arr[i] = null;
      }
	  parents = jsav.ds.array(arr, {left: 300, top: -30});
	  
	  treeNodes = new Array(arr.length);
	  for (i = 0; i < treeNodes.length; i++){
	    treeNodes[i] = tree.root().child(i);    //At first
		treeNodes[i].indexFromRoot = i;
	  }
	  
	  var aa = cloneChild(0);
	  var ii = cloneChild(8);
	  var gg = cloneChild(6);
	  
	  var a = treeNodes[0];
	  var b = treeNodes[1];
	  var j = treeNodes[9];
	  b.addChild(aa);
	  a.addChild(ii);
	  j.addChild(gg);
	  //var bb = cloneChild(1);
	  //j.addChild(bb);
	  tree.layout();
	  
	}
	function cloneChild(index){
	  var child = treeNodes[index];
	  var newNode = tree.newNode(treeNodes[index].value());
	  newNode.size = treeNodes[index].size;
	  
	  //Copy the Children of the node
	  //var k = 0;
	  //while (true){
	    //if(treeNodes[index].child(k)){
	      //var newChild = tree.newNode(treeNodes[index].child(k).value());
		  
	    //}
      //}
	  
	  //Update the index within the root for the other nodes
	  var i = index + 1;
	  for (var j = child.indexFromRoot + 1; j < rootNumberOfChildren; j++){
	    treeNodes[i].indexFromRoot--;
		i++;
	  }
	  tree.root().child(child.indexFromRoot, null);
	  rootNumberOfChildren--;
	  treeNodes[index] = newNode;
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