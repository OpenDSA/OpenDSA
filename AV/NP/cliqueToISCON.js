//Written by Nabanita Maji and Cliff Shaffer, Spring 2015
/*global ODSA */

// Title: Reduction of Clique to Independent Set Slideshow
// Author: Nabanita Maji; Cliff Shaffer
// Institution: Virginia Tech
// Features: Demonstration
// Keyword: Reduction; Clique Problem; Independent Set Problem
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow demonstrating a reduction from an instance of the Clique problem to an instance of the Independent Set problem. */

$(document).ready(function () {
  "use strict";
  var av_name = "cliqueToISCON";

  $(".avcontainer").on("jsav-message" ,  function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
  });
  $(".avcontainer").on("jsav-updatecounter" ,  function(){
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  var av = new JSAV(av_name);
  var i, j;

  // Slide 1
  av.umsg("<br><b>Reduction of an input instance to CLIQUE to an equivalent instance of INDEPENDENT SET.</b>");
  var nl1=av.label("This slideshow presents how to reduce"+
                   "an input instance to CLIQUE to an equivalent input instance to INDEPENDENT SET in polynomial time",{top:0});
  av.displayInit();
  av.step();

  // Slide 2
  av.umsg("<br><b>CLIQUE and INDEPENDENT SET problems</b>");
  nl1.hide();
  var nl1=av.label("For a given graph $G = ( V , E )$ and integer $k$, the "
                   + "CLIQUE problem is to find whether $G$ contains a clique of size "
                   + "$\\geq k$.<br><br>For a given graph $G' = (V' , E')$ and integer $k'$, the "
                   + "INDEPENDENT SET problem is to find whether $G'$ contains an Independent Set "
                   +"of size $\\geq k'$.", {top: -10});
  av.step();

  // Slide 3
  nl1.hide();
  av.umsg("<br><b>Reduction of CLIQUE to INDEPENDENT SET</b>");
  nl1=av.label("To reduce a CLIQUE input instance to an INDEPENDENT SET input instance for a given "
               +"graph $G = (V , E)$, construct a complementary graph $G' = (V' , E'"
               +")$ such that <br><br>1. $V = V'$ , that is the complement graph will have the same "
               +"vertices as the original graph.<br><br>2. $E'$ is the complement of $E$ that is"+
               " $G'$ has all the edges that is <b>not</b> present in $G$.<br><br>"
               +"Construction of the complementary graph can be done in "
               +"polynomial time.", {top:-10});
  av.step();

  // Slide 4
  nl1.hide();
  av.umsg("<br><b>Example graph</b>");
  // We need a graph G and its complement G'.
  // Construct the graph (G + G') which will be a clique.
  // Hide the edges for now and show them later selectively.

  var  g = av.ds.graph({width: 600,  height: 400, layout: "automatic",
                        directed: false});
  var nodes = new Array(10);;

  for(i=0;i<10;i++){
    nodes[i] = g.addNode(""+(i+1));
  }

  for(i=0;i<nodes.length;i++)
    for(j=i+1;j<nodes.length;j++)
      g.addEdge(nodes[i], nodes[j]).hide();

  var cliqueEdges = [];
  var isEdges = [];
  var edges = g.edges();

  //The array cliqueEdges stores the edges of the graph G.

  cliqueEdges.push(g.getEdge(nodes[2], nodes[6]));
  cliqueEdges.push(g.getEdge(nodes[3], nodes[2]));
  cliqueEdges.push(g.getEdge(nodes[6], nodes[3]));
  cliqueEdges.push(g.getEdge(nodes[8], nodes[3]));
  cliqueEdges.push(g.getEdge(nodes[8], nodes[6]));
  cliqueEdges.push(g.getEdge(nodes[9], nodes[6]));
  cliqueEdges.push(g.getEdge(nodes[8], nodes[9]));
  cliqueEdges.push(g.getEdge(nodes[0], nodes[4]));
  cliqueEdges.push(g.getEdge(nodes[0], nodes[1]));
  cliqueEdges.push(g.getEdge(nodes[1], nodes[4]));
  cliqueEdges.push(g.getEdge(nodes[2], nodes[5]));
  cliqueEdges.push(g.getEdge(nodes[2], nodes[7]));
  cliqueEdges.push(g.getEdge(nodes[5], nodes[7]));
  cliqueEdges.push(g.getEdge(nodes[4], nodes[0]));
  cliqueEdges.push(g.getEdge(nodes[2], nodes[9]));
  cliqueEdges.push(g.getEdge(nodes[2], nodes[5]));
  cliqueEdges.push(g.getEdge(nodes[4], nodes[6]));
  cliqueEdges.push(g.getEdge(nodes[3], nodes[7]));
  cliqueEdges.push(g.getEdge(nodes[3], nodes[8]));
  cliqueEdges.push(g.getEdge(nodes[3], nodes[5]));
  cliqueEdges.push(g.getEdge(nodes[6], nodes[5]));
  cliqueEdges.push(g.getEdge(nodes[6], nodes[7]));
  cliqueEdges.push(g.getEdge(nodes[0], nodes[7]));

  //display the edges of graph G.
  for(j=0;j<cliqueEdges.length;j++)
    cliqueEdges[j].show();
  //The array isEdges stores the edges of the complementary graph G'.
  for(i=0;i<edges.length;i++)
    if(cliqueEdges.indexOf(edges[i])<0)
      isEdges.push(edges[i]);
  g.layout();
  g.show();
  av.step();

  // Slide 5
  //fade away G and display G'
  av.umsg("<br><b>The Complement graph</b>");
  for(j=0;j<cliqueEdges.length;j++)
    cliqueEdges[j].addClass("bluredge");
  for(i=0;i<isEdges.length;i++)
    isEdges[i].show();
  av.step();

  // Slide 6
  //display G'
  for(j=0;j<cliqueEdges.length;j++)
    cliqueEdges[j].hide();
  av.step();

  // Slide 7
  av.umsg("<br><b>CLIQUE reduced to INDEPENDENT SET</b><br><br><br>");
  g.hide();
  nl1=av.label("1. <b>If there is an independent set of size $k$ in the complement "
               + "graph $G'$</b>, it implies no two vertices<br> share an edge in $G'$, which further "
               + "implies all of those vertices share an edge with all others in $G$ forming <br>a "
               + "clique. That is, <b>there exists a clique of size $k$ in $G$.</b><br><br>",
               {top:0});
  av.step();

  // Slide 8
  var nl2=av.label("2. <b>If there is a clique of size $k$ in the graph $G$</b>, it implies "
                   +"all vertices share an edge with all others in $G$,<br>which further implies no two of "
                   +"these vertices share an edge in $G'$ (thus forming an Independent Set. That is, <br><b>there "
                   +"exists an independent set of size $k$ in $G'$.</b>", {top:120});
  av.step();

  // Slide 9
  av.umsg("<br><b>Does $G'$ have an independent set of size 8?"
          +"</b><br><br><br>");
  nl1.hide();
  nl2.hide();
  g.show();
  av.step();

  // Slide 10
  nl1=av.label("<b>NO</b>", {top:-10});
  av.step();

  // Slide 11
  //fade away G' and display G.
  nl1.hide();
  av.umsg("<br><b>Does G have a clique of size 8?</b><br><br><br>");
  for(j=0;j<cliqueEdges.length;j++)
    cliqueEdges[j].removeClass("bluredge").show();
  for(i=0;i<isEdges.length;i++)
    isEdges[i].addClass("bluredge").show();
  av.step();

  // Slide 12
  //display G
  for(i=0;i<isEdges.length;i++)
    isEdges[i].hide();
  nl1=av.label("<b>NO</b>", {top:-10});
  av.step();

  // Slide 13
  nl1.hide();
  //display G'
  av.umsg("<br><b>Does $G'$ have an independent set of size 5?"
          +"</b><br><br><br>");
  for(j=0;j<cliqueEdges.length;j++)
    cliqueEdges[j].hide();
  for(i=0;i<isEdges.length;i++)
    isEdges[i].removeClass("bluredge").show();
  av.step();

  // Slide 14
  nl1=av.label("<b>YES</b>", {top:-10});
  //highlight the nodes of the Independent set in G'
  var sol = new Array(2, 3, 5, 6, 7);
  for(i=0;i<5;i++)
    nodes[sol[i]].addClass("highlightnode");
  av.step();
  nl1.hide();

  // Slide 15
  // superimpose the nodes of Independent Set on G.
  av.umsg("<br><b>The independent set of G' on G </b>");
  for(j=0;j<cliqueEdges.length;j++)
    cliqueEdges[j].addClass("bluredge").show();
  av.step();

  // Slide 16
  // superimpose the nodes of Independent Set on G.
  for(i=0;i<isEdges.length;i++)
    isEdges[i].addClass("bluredge");
  for(j=0;j<cliqueEdges.length;j++)
    cliqueEdges[j].removeClass("bluredge");
  av.step();

  // Slide 17
  //highlight the edges of the clique to show its pesence in G.
  for(i=0;i<edges.length;i++)
    edges[i].addClass("semibluredge");
  for(i=0;i<isEdges.length;i++)
    isEdges[i].hide();
  for(i=0;i<5;i++)
    for(j=i+1;j<5;j++)
      g.getEdge(nodes[(sol[i])], nodes[(sol[j])]).addClass("highlightedge");
  av.umsg("<br><b>It forms a clique of size 5 in $G$</b>");
  av.recorded();
});
