"use strict";
/*global alert: true, ODSA */

(function ($) {
  var jsav;
  var graph;
  var heap=[];

  function runit() {
    ODSA.AV.reset(true);
    jsav = new JSAV($('.avcontainer'));

    //-------------------ADD NEW GRAPH STUFF HERE----------------------------------------
    graph = jsav.ds.graph({width: 600, height: 600, layout: "manual", directed: true});
    initGraph();
    graph.layout();
    jsav.displayInit();
	generateHeap();	
	kruskal();
    jsav.recorded();
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function generateHeap()
{
	for(var i=0;i<graph.edges().length;i++)
	{
		heap.push(graph.edges()[i]);
		heapifyUp(heap.length-1);
	}
}

function key(j)
{
	var value=parseInt(heap[j].label());
	return value;
}

function swap(i,j)
{
	var temp=heap[i];
	heap[i]=heap[j];
	heap[j]=temp;
}

function heapifyUp(index)
{
	var parent;
	if(index>0)
	{
		parent =parseInt(index/2);
		if(key(index)<key(parent))
		{
			swap(parent,index);
			heapifyUp(parent);
		}
	}	
}

function heapifyDown(index)
{
	var n=heap.length;
	var left=2*index+1;
	var right=2*index+2;
	var j;
	if(left>(n-1))
	{
		return;
	}
	else if(left<(n-1))
	{	
		if(key(left)>key(right))
		{
			j=right;
		}
		else
		{
			j=left;
		}
	}
	else if(left==(n-1))
	{
		j=left;
	}
	if(key(j)<key(index))
	{
		swap(j,index);
		heapifyDown(j);
	}
}

function extractMin()
{
	var min=heap[0];
	heap[0]=heap[heap.length-1];
	heap.splice(heap.length-1,1);
	heapifyDown(0);
	return min;
}

function kruskal()
{
	var n=heap.length;
	var currentEdge;
	for(var i=0;i<n;i++)
	{
		currentEdge=extractMin();
		markIt(currentEdge.start());
		markIt(currentEdge.end());
		currentEdge.css({"stroke-width":"2", "stroke":"red"});
		jsav.step();
		
	}
	
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  //This function is used to mark a node in the graph.
  function markIt(node) {
    node.addClass("marked");
    //jsav.umsg("Add node " + node.value() + " to the minimum spanning tree");
    node.highlight();
    //jsav.step();
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  function about() {
    var mystring = "Prim's Algorithm Visualization\nWritten by Mohammed Fawzy\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during Spring, 2013\nLast update: March, 2013\nJSAV library version " + JSAV.version();
    alert(mystring);
    alert("Prim's Algorithm visualization");
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //This function is used to initialize the graph.
  function initGraph() {
    var a = graph.addNode("A", {"left": 25}),
        b = graph.addNode("B", {"left": 325}),
        c = graph.addNode("C", {"left": 145, "top": 75}),
        d = graph.addNode("D", {"left": 145, "top": 200}),
        e = graph.addNode("E", {"left": 0, "top": 300}),
        f = graph.addNode("F", {"left": 325, "top": 250}),
        g = graph.addNode("G", {"left": 500, "top": 150});

    var e1 = graph.addEdge(a, c).label("30"),
        e2 = graph.addEdge(a, e).label("10"),
        e3 = graph.addEdge(c, b).label("20"),
        e4 = graph.addEdge(c, d).label("15"),
        e5 = graph.addEdge(c, f).label("25"),
        e6 = graph.addEdge(f, b).label("2"),
        e7 = graph.addEdge(d, f).label("5"),
        e8 = graph.addEdge(e, f).label("40"),
        e9 = graph.addEdge(f, g).label("50"),
        e10 = graph.addEdge(b, g).label("22");
	/*	
	var e11 = graph.addEdge(c, a).label("30"),
		e22 = graph.addEdge(e, a).label("10"),
        e33 = graph.addEdge(b, c).label("20"),
        e44 = graph.addEdge(d, c).label("15"),
        e55 = graph.addEdge(f, c).label("25"),
        e66 = graph.addEdge(b, f).label("2"),
        e77 = graph.addEdge(f, d).label("5"),
        e88 = graph.addEdge(f, e).label("40"),
        e99 = graph.addEdge(g, f).label("50"),
        e100 = graph.addEdge(g, b).label("22");
	*/
  }


  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  //$('#help').click(help);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));