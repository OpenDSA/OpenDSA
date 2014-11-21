/*global ODSA, setPointerL */
//"use strict";
(function ($) {
 
var av;
Array.prototype.contains = function(k) {
  for(var i=0; i < this.length; i++){
    if(this[i] === k){
      return true;
    }
  }
  return false;
}
function runit(){
 av = new JSAV($('.avcontainer'));

  var i,j,label1,label2,label3;

  av.umsg("<b>Clique  and Independent Set problems</b>");


  label1 = av.label("For a given graph <b>G = ( V , E )</b> and integer <b>k</b>, the Clique problem is to find whether <b>G</b> contains a clique of size <b>k</b>.",{"left":10,"top":0});
  label2 = av.label("For a given graph <b>G' = ( V' , E' )</b> and integer <b>k'</b>, the Independent Set problem is to find whether <b>G'</b> contains an Independent Set of size <b>k'</b>.",{"left":10,"top":35});
 

 av.displayInit();
 av.step();

 label1.hide();
 label2.hide();

 av.umsg("<b>Reduction of Clique to Independent Set</b>");
 label1 = av.label("To reduce a Clique Problem to an Independet Set problem for a given graph <b>G = ( V , E )</b>, construct a complimentary graph <b>G' = ( V' , E' )</b> such that ",{"left":10,"top":0});
  label2 = av.label("1.  <b>V = V' </b> , i.e. the compliment graph will have the same vertices as the original graph",{"left":30,"top":55});
  label3 = av.label("2.  <b>E'</b> is the compliment of <b>E</b> i.e. <b>G'</b> has all the edges that is <b>not</b> present in <b>G</b>",{"left":30,"top":90});

 av.step();


 label1.hide();
 label2.hide();
 label3.hide();

av.umsg("<b>Example graph</b>");
  var  g = av.ds.graph({width: 600, height: 400,layout: "automatic", directed: false});
  var nodes = new Array(10);;
  for(i=0;i<10;i++){
	nodes[i] = g.addNode(""+(i+1)).css({"width":"35px","height":"35px","min-width":"35px","min-height":"35px","background-color":"AntiqueWhite"});
  }
  for(i=0;i<nodes.length;i++)
  	for(j=i+1;j<nodes.length;j++)
		g.addEdge(nodes[i],nodes[j]).css({"stroke-width":"1.5px"}).hide();
  var cliqueEdges = [];
  var isEdges = [];
  var edges = g.edges();

  cliqueEdges.push(g.getEdge(nodes[2],nodes[6]));
  cliqueEdges.push(g.getEdge(nodes[3],nodes[2]));
  cliqueEdges.push(g.getEdge(nodes[6],nodes[3]));
  cliqueEdges.push(g.getEdge(nodes[8],nodes[3]));
  cliqueEdges.push(g.getEdge(nodes[8],nodes[6]));
  cliqueEdges.push(g.getEdge(nodes[9],nodes[6]));
  cliqueEdges.push(g.getEdge(nodes[8],nodes[9]));
  cliqueEdges.push(g.getEdge(nodes[0],nodes[4]));
  cliqueEdges.push(g.getEdge(nodes[0],nodes[1]));
  cliqueEdges.push(g.getEdge(nodes[1],nodes[4]));
  cliqueEdges.push(g.getEdge(nodes[2],nodes[5]));
  cliqueEdges.push(g.getEdge(nodes[2],nodes[7]));
  cliqueEdges.push(g.getEdge(nodes[5],nodes[7]));
  cliqueEdges.push(g.getEdge(nodes[4],nodes[0]));
  cliqueEdges.push(g.getEdge(nodes[2],nodes[9]));
  cliqueEdges.push(g.getEdge(nodes[2],nodes[5]));
  cliqueEdges.push(g.getEdge(nodes[4],nodes[6]));
  cliqueEdges.push(g.getEdge(nodes[3],nodes[7]));
  cliqueEdges.push(g.getEdge(nodes[3],nodes[8]));
  cliqueEdges.push(g.getEdge(nodes[3],nodes[5]));
  cliqueEdges.push(g.getEdge(nodes[6],nodes[5]));
  cliqueEdges.push(g.getEdge(nodes[6],nodes[7]));
  cliqueEdges.push(g.getEdge(nodes[0],nodes[7]));

  
  for(j=0;j<cliqueEdges.length;j++)
	cliqueEdges[j].show();
  for(i=0;i<edges.length;i++)
		if(cliqueEdges.indexOf(edges[i])<0)
			isEdges.push(edges[i]);
  g.layout();


  av.step();
av.umsg("<b>The Complement graph</b>");
  for(j=0;j<cliqueEdges.length;j++)
	cliqueEdges[j].css({"opacity":0.1});
  for(i=0;i<isEdges.length;i++)
	isEdges[i].show();

av.step();
  for(j=0;j<cliqueEdges.length;j++)
	cliqueEdges[j].hide();

av.step();
av.umsg("<b>Clique problem reduced to Independent Set</b>");
g.hide();
label1 = av.label("1. <b>If there is an independent set of size k in the complement graph G'</b>, it implies no two vertices share an edge in G' which further implies all of those vertices share an edge with all others in G forming a clique. <br> i.e. <b>there exists a clique of size k in G</b>",{"left": 10,"top":0});  

av.step();

label2 = av.label("2. <b>If there is a clique of size k in the graph G</b>, it implies all vertices share an edge with all others in G which further implies no two of these vertices share an edge in G' forming an Independent Set. <br> i.e. <b>there exists an independent set of size k in G'</b>",{"left": 10,"top":80});  

av.step();
label1.hide();
label2.hide();

av.umsg("<b>Does G' below have an independent set of size 8? </b>");

g.show();

av.step();

label1=av.label("<b>NO</b>",{"left":50,"top":-15});
av.step();

label1.hide();
av.umsg("<b>Does G below have a clique of size 8? </b>");
  for(j=0;j<cliqueEdges.length;j++)
	cliqueEdges[j].css({"opacity":1}).show();
  for(i=0;i<isEdges.length;i++)
	isEdges[i].css({"opacity":0.1}).show();

av.step();

for(i=0;i<isEdges.length;i++)
      isEdges[i].hide();
label1=av.label("<b>NO</b>",{"left":50,"top":-15});
av.step();

av.umsg("<b>Does G' below have an independent set of size 5? </b>");
label1.hide();
  for(j=0;j<cliqueEdges.length;j++)
	cliqueEdges[j].hide();
  for(i=0;i<isEdges.length;i++)
	isEdges[i].css({"opacity":1}).show();
av.step();

label1=av.label("<b>YES</b>",{"left":50,"top":-15});
var sol = new Array(2,3,5,6,7);
for(i=0;i<5;i++)
	nodes[sol[i]].css({"background-color":"Teal"});
av.step();

label1.hide();
av.umsg("<b>The independent set of G' on G </b>");
for(j=0;j<cliqueEdges.length;j++)
	cliqueEdges[j].css({"opacity":0.1}).show();
av.step();

for(i=0;i<isEdges.length;i++)
	isEdges[i].css({"opacity":0.1});
for(j=0;j<cliqueEdges.length;j++)
	cliqueEdges[j].css({"opacity":1});

av.step();
for(i=0;i<edges.length;i++)
	edges[i].css({"opacity":0.5});
for(i=0;i<isEdges.length;i++)
	isEdges[i].hide();
for(i=0;i<5;i++)
    for(j=i+1;j<5;j++)
	g.getEdge(nodes[(sol[i])],nodes[(sol[j])]).css({"stroke":"SlateBlue","stroke-width":"3.5px","opacity":1});
av.umsg("<b>It forms a clique of size 5 in G</b>");



  av.recorded();
}


$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);
}(jQuery));

