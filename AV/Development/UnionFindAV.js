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
	for(i = 0; i < 10; i++){
	  arr[i] = String.fromCharCode(i + 65);
	}
	labels = jsav.ds.array(arr, {left: 300, top: 47});
	
	//Rendering the trees on the container
	initTrees();
	//Defining the graph
	initGraph();
  }
  function initTrees(){
	var pixelOffset = 0;
    for(var i = 0; i < 10; i++){
	  if(i < 5){
	    trees[i] = jsav.ds.tree({left:50 + pixelOffset,top:150});
	    trees[i].newNode(labels.value(i));
	    trees[i].show();
		pixelOffset += 100;
	  }
	  else if(i === 5){
	    pixelOffset = 0;
	  }
	  if (i >= 5){
	    trees[i] = jsav.ds.tree({left:50 + pixelOffset,top:220});
	    trees[i].newNode(labels.value(i));
	    trees[i].show();
		pixelOffset+= 100;
	  }	  
	}
  }
  function initGraph(){
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
