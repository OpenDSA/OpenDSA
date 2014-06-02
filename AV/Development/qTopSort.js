"use strict";
/*global alert: true, ODSA */

(function ($) {
  var jsav;
  var g;
  var arr;
  var arr2;
  var arr3;
  var oparr;
  
  var oparrcnt ;
  var output = new Array();
  var c1, c2, c3, c4, c5, c6, c7, c8;
  var Count=new Array();

function runit() {
  ODSA.AV.reset(true);
  jsav = new JSAV($('.avcontainer'));
  g = jsav.ds.graph({width: 500, height: 500, left: 0, top: 50, layout: "manual", directed: true});
  arr = jsav.ds.array(["","","","","","","",""],  {left: 400, top: 200});
  jsav.label("Queue",{left:340,top:230}); 
  arr3 = jsav.ds.array(["2505","2114","3604","3304","1114","2506","3114","3214"],{left:400,top:50});
  jsav.label("Nodes",{left:340,top:80}); 
  arr2 = jsav.ds.array(["","","","","","","",""],  {left: 400, top: 90});
  jsav.label("Number of",{left:300,top:110}); 
  jsav.label("Incoming edges",{left:275,top:130}); 
  oparr = jsav.ds.array(["","","","","","","",""],  {left: 400, top: 280});
  jsav.label("Output",{left:340,top:320}); 
  oparrcnt=0;
  initGraph();
  var v;
  var node;
  var adjNode = new Array();
  for (v=0;v<g.nodeCount();v++)
        Count[v]=0;
  for (v=0;v<g.nodeCount();v++){
        node=g.nodes()[v];
        adjNode=node.neighbors();
        for(var i=0;i<adjNode.length;i++){
		var j=(g.nodes()).indexOf(adjNode[i]);
		if(j>=0)
                	(Count[j])++;
	}
  }
  for(var i=0;i<g.nodeCount();i++){
        arr2.value(i,Count[i]);
  }
  g.layout();
  jsav.umsg("A queue based topological sort is performed on a " +
    "directed acyclic graph.");
  jsav.displayInit();  
  topSortBFS(g.nodes()[0]);
  jsav.umsg("Possible ordering of CS coures:  " + displaySort());
  jsav.step();
  jsav.recorded();
}

function displaySort() {
  var str = "";
  var opnode;
  while(output.length > 0) {
    opnode=output.shift();
    str += "CS-" + opnode+ "   ";
  }
  return str;
}

function markIt(node,q) {
  node.addClass("marked");
  jsav.umsg("Enqueue "+ node.value() +" since it has no incoming edges.");
  for(var i=0;i<q.length;i++)
  	arr.value(i,q[i].value());
  node.highlight();
  jsav.step();
}

function dequeueIt(node,q) {
  node.addClass("dequeued");
  jsav.umsg("Dequeue " + node.value()+" delete its outgoing edges and put it to output array.");
  for(var i=0;i<q.length;i++)
  	arr.value(i,q[i].value());
  arr.value(i,"");
  var i=g.nodes().indexOf(node);
  oparr.value(oparrcnt,node.value());
  oparrcnt++;
  arr2.addClass(i,"marked");
  arr2.unhighlight(i);
  arr3.unhighlight(i);
  jsav.step();
}

function updateCount(adjnodes){
        var str="";
	var node;
	while(adjnodes.length > 0){
		node=adjnodes.shift();
		str+=" "+node.value()+" ";
	}
	jsav.umsg("Mark and update the number of incoming edges for "+str);	
	for(var i=0;i<g.nodeCount();i++){
		var temp=arr2[i];
		//arr2.addLabel(i,g.nodes().value);
        	arr2.value(i,Count[i]);
		if(Count[i]==0 && temp!=0)
		    if(!arr2.hasClass(i,"marked")){
			arr3.highlight(i);
			arr2.highlight(i);
		    }	
	}
	jsav.step();
}

function topSortBFS(start) {
  console.log("start : " + start.value());
  var node;
  var adjNode = new Array();
  var q = new Array();
  var v=0;
  var ctr=0;
  var cntZero = new Array();
  for(v=0;v<g.nodeCount();v++)
	if(Count[v]==0){
		node=g.nodes()[v];
		if(!node.hasClass("marked")){
			q.push(node);
			arr3.highlight(v);
			arr2.highlight(v);
			markIt(node,q);
		}	
	}	
  while(q.length > 0) {
    node = q.shift();
    dequeueIt(node,q);
    console.log("node " + node.value());
    output.push(node.value());
    adjNode = node.neighbors();
    console.log("adjNode " + adjNode.length);
    ctr=0;
    for(var i=0;i<adjNode.length;i++) {
	var j=(g.nodes()).indexOf(adjNode[i]);
        if(j>=0){
	        (Count[j])--;
		ctr++;
        	if(Count[j]==0) {
                	node=g.nodes()[j];
			cntZero.push(node);
		}
        }
    }
    if(ctr>0)
    	updateCount(adjNode);
    while(cntZero.length > 0){
	node=cntZero.shift();
	q.push(node);
	markIt(node,q);
    }
 }

}
function about() {
  alert("Queue based topological sort visualization");
}
  

// Graph prepartion for initial stage of visualization

function initGraph() {

  c1 = g.addNode("2505", {"left": 60, "top": 150});
  c2 = g.addNode("2114", {"left": 100, "top": 75});
  c3 = g.addNode("3604", {"left": 160, "top": 220});
  c4 = g.addNode("3304", {"left": 225, "top": 220});
  c5 = g.addNode("1114", {"left": 230});
  c6 = g.addNode("2506", {"left": 100, "top": 270});
  c7 = g.addNode("3114", {"left": 200, "top": 150});
  c8 = g.addNode("3214", {"left": 30, "top": 300});

  g.addEdge(c5, c2);
  g.addEdge(c2, c1);
  g.addEdge(c2, c7);
  g.addEdge(c1, c7);
  g.addEdge(c1, c3);
  g.addEdge(c1, c6);
  g.addEdge(c7, c3);
  g.addEdge(c7, c4);
  g.addEdge(c6, c8);

}


// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);
}(jQuery));
