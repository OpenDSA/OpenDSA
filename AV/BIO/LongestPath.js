"use strict";

$(document).ready(function () {
  var jsav = new JSAV("LongestPath");
  var graph=new jsav.ds.graph({width: 500, height: 500});
  var right;
  var down;
  var index=[];
  var node1=graph.addNode(0,{left:0, top:0});
  var node2=graph.addNode(" ",{left:100, top: 0});
  var node3=graph.addNode(" ",{left:200, top: 0});
  var node4=graph.addNode(" ",{left:300, top: 0});
  var node5=graph.addNode(" ",{left:400, top: 0});
  var node6=graph.addNode(" ", {left:0, top: 100});
  var node7=graph.addNode(" ",{left:100, top: 100});
  var node8=graph.addNode(" ",{left:200, top: 100});
  var node9=graph.addNode(" ",{left:300, top: 100});
  var node10=graph.addNode(" ",{left:400, top:100});
  var node11=graph.addNode(" ",{left:0, top: 200});
  var node12=graph.addNode(" ",{left:100, top:200});
  var node13=graph.addNode(" ",{left:200, top:200});
  var node14=graph.addNode(" ",{left:300, top:200});
  var node15=graph.addNode(" ",{left:400, top:200});
  var node16=graph.addNode(" ",{left:0, top:300});
  var node17=graph.addNode(" ",{left:100, top:300});
  var node18=graph.addNode(" ",{left:200, top:300});
  var node19=graph.addNode(" ",{left:300, top:300});
  var node20=graph.addNode(" ",{left:400, top:300});
  var node21=graph.addNode(" ",{left: 0, top:400});
  var node22=graph.addNode(" ",{left:100, top:400});
  var node23=graph.addNode(" ",{left:200, top:400});
  var node24=graph.addNode(" ",{left:300, top:400});
  var node25=graph.addNode(" ",{left:400, top:400});

  graph.addEdge(node1, node2,{weight:4});
  graph.addEdge(node2, node3,{weight:5});
  graph.addEdge(node3, node4,{weight:8});
  graph.addEdge(node4, node5,{weight:7});
  graph.addEdge(node6, node7,{weight:4});
  graph.addEdge(node7, node8,{weight:2});
  graph.addEdge(node8, node9,{weight:5});
  graph.addEdge(node9, node10,{weight:4});
  graph.addEdge(node11, node12,{weight:4});
  graph.addEdge(node12, node13,{weight:5});
  graph.addEdge(node13, node14,{weight:8});
  graph.addEdge(node14, node15,{weight:7});
  graph.addEdge(node16, node17,{weight:3});
  graph.addEdge(node17, node18,{weight:5});
  graph.addEdge(node18, node19,{weight:7});
  graph.addEdge(node19, node20,{weight:6});
  graph.addEdge(node21, node22,{weight:4});
  graph.addEdge(node22, node23,{weight:5});
  graph.addEdge(node23, node24,{weight:8});
  graph.addEdge(node24, node25,{weight:7});
  graph.addEdge(node1, node6,{weight:3});
  graph.addEdge(node2, node7,{weight:1});
  graph.addEdge(node3, node8,{weight:9});
  graph.addEdge(node4, node9,{weight:3});
  graph.addEdge(node5, node10,{weight:3});
  graph.addEdge(node6, node11,{weight:9});
  graph.addEdge(node7, node12,{weight:9});
  graph.addEdge(node8, node13,{weight:6});
  graph.addEdge(node9, node14,{weight:9});
  graph.addEdge(node10, node15,{weight:9});
  graph.addEdge(node11, node16,{weight:2});
  graph.addEdge(node12, node17,{weight:2});
  graph.addEdge(node13, node18,{weight:2});
  graph.addEdge(node14, node19,{weight:5});
  graph.addEdge(node15, node20,{weight:2});
  graph.addEdge(node16, node21,{weight:1});
  graph.addEdge(node17, node22,{weight:1});
  graph.addEdge(node18, node23,{weight:1});
  graph.addEdge(node19, node24,{weight:4});
  graph.addEdge(node20, node25,{weight:1});
  graph.layout();
  jsav.displayInit();

for (var i=1;i<graph.nodes().length/5;i++)
{
  graph.nodes()[i].value(graph.getEdge(graph.nodes()[i-1], graph.nodes()[i]).weight()+graph.nodes()[i-1].value());
  jsav.step();

}   
for (var i=5;i<=graph.nodes().length-5;i+=5)
{
  graph.nodes()[i].value(graph.getEdge(graph.nodes()[i-5], graph.nodes()[i]).weight()+graph.nodes()[i-5].value());
  jsav.step();

}
graph.nodes()[0].highlight();

for (var i=6;i<graph.nodes().length;i++)
{
	if(i%5!=0)
	{
		down=graph.getEdge(graph.nodes()[i-5], graph.nodes()[i]).weight()+graph.nodes()[i-5].value();
		right=graph.getEdge(graph.nodes()[i-1], graph.nodes()[i]).weight()+graph.nodes()[i-1].value()
		if(down>right){
			graph.nodes()[i].value(down);
			graph.nodes()[i-5].highlight();
			index.push(i-5);
		}
		else{
			graph.nodes()[i].value(right);
			graph.nodes()[i-1].highlight();
			index.push(i-1);
		}
		
		jsav.step();
	}
}  
graph.nodes()[graph.nodes().length-1].highlight();
index.push(graph.nodes().length-1);
/*for(i=0;i<graph.nodes().length;i++)
{
	graph.nodes()[i].hide();
}
for(i of index)
{
   graph.nodes()[i].show();
}*/
   jsav.recorded();
});
