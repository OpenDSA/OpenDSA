//Written by Nabanita Maji and Cliff Shaffer, Spring 2015
/*global ODSA */
$(document).ready(function () {
  "use strict";
  var av_name = "HCtoTSPCON";

  $(".avcontainer").on("jsav-message" ,  function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
  });
  $(".avcontainer").on("jsav-updatecounter" ,  function(){
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  var av = new JSAV(av_name);
  var i, j,label1,label2,y=5;

  // Slide 1
  av.umsg("<br><b>Reduction of HAMILTONIAN CYCLE to TSP.</b>");
  var nl1=av.label("This slideshow shows how to reduce"+
                   " an input instance to HAMILTONIAN CYCLE to an equivalent instance of TSP in polynomial time", {top: y + 0});
  av.displayInit();
  av.step();

  // Slide 2
  av.umsg("<br><b>The Hamiltonian Cycle and Traveling Salesman problems</b>");
  nl1.hide();
  nl1=av.label("For a given graph $G = ( V , E )$ , the "
               +"HAMILTONIAN CYCLE  problem is to find whether $G$ contains a Hamiltonian Cycle "
               +"that is, a cycle that passes through all the vertices of the graph exactly once.<br><br>"
               +"For a given weighted graph $G' = ( V' , E' )$, with non-negative weights, and integer $k'$, the "
               +"TRAVELING SALESMAN problem is to find whether $G'$ contains a simple cycle "
               +"of length $\\leq k$ that passes through all the vertices. [The length of a cycle is "
               +"the sum of weights of all the edges in the cycle.]", {top:y-10});
  av.step();

  // Slide 3
  nl1.hide();
  av.umsg("<br><b>Reduction of HAMILTONIAN CYCLE to TSP</b><br><br><br>");
  label1=av.label("To reduce HAMILTONIAN CYCLE to TSP for a given "
                  +"graph $G = (V , E)$, <br>first <b>complete</b> $G$ by adding edges between all pairs of vertices that were not connected in $G$."
                  +"<br><br>Let the new graph be $G'=(V',E')$ where $V' = V$ and $E' = \\{(u,v)\\}$ for any $u, v \\in V'$."
                  +"<br><br>For edges in $G'$ that were also present in $G$ , we assign a weight of $0$.<br>For the new edges we assign weight $1$"
                  +"<br><br>That is , $\\forall e=(u,v) \\in E'$, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ W(e) = 0$, if $(u,v) "
                  +"\\in E$.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$W(e) = 1$, if $(u,v) \\not\\in E$."
                  ,{left:0,top:y+0});
  av.step();

  // Slide 4
  label2=av.label("<br><br>Construction of the complimentary graph can be done in "
                  +"polynomial time.",{left:0,top:y+240});
  av.step();

  // Slide 5
  av.umsg("<br><b>Example graph</b>");
  // We need a graph G and its complement G'.

  label1.hide(); label2.hide();
  var  g = av.ds.graph({width: 500,  height: 400, layout: "manual",
                        directed: false});
  var nodes = new Array(6);;

  nodes[0] = g.addNode("A",{left:100,top:50});
  nodes[1] = g.addNode("B",{left:320,top:20});
  nodes[2] = g.addNode("C",{left:20,top:170});
  nodes[3] = g.addNode("D",{left:420,top:230});
  nodes[4] = g.addNode("E",{left:80,top:350});
  nodes[5] = g.addNode("F",{left:290,top:370});

  var HCedges=[];
  var TSPedges=[];
  HCedges.push(g.addEdge(nodes[0],nodes[4]));
  HCedges.push(g.addEdge(nodes[1],nodes[4]));
  HCedges.push(g.addEdge(nodes[1],nodes[2]));
  HCedges.push(g.addEdge(nodes[2],nodes[5]));
  HCedges.push(g.addEdge(nodes[3],nodes[5]));
  HCedges.push(g.addEdge(nodes[3],nodes[0]));

  HCedges.push(g.addEdge(nodes[1],nodes[3]));
  HCedges.push(g.addEdge(nodes[4],nodes[5]));
  HCedges.push(g.addEdge(nodes[4],nodes[3]));

  for(i=0;i<nodes.length;i++)
    for(j=i+1;j<nodes.length;j++)
      if(!g.hasEdge(nodes[i],nodes[j])){
        var e= g.addEdge(nodes[i], nodes[j],{weight:1}).addClass("extraedge");
        TSPedges.push(e);
        e.hide();
      }

  g.layout();
  nl1=av.label("Let graph $G$ be an input to HAMILTONIAN CYCLE.",
               {top:y-20});

  av.step();

  // Slide 6
  nl1.hide();
  av.umsg("<br><b>Example graph</b>");
  var nl2=av.label("The constructed graph $G'$ is as below."+
                   "<br> The blue edges were not present in $G$ and so have weight of 1."
                   ,{top:y-20});
  for(var i in TSPedges){
    TSPedges[i].show();
  }
  for(var i in HCedges){
    HCedges[i].weight(0);
  }
  g.layout();
  av.step();

  // Slide 7
  nl1.hide();
  nl2.hide();
  av.umsg("<br><b>Reduction of HAMILTONIAN CYCLE to TSP.</b>");
  g.hide();
  nl1=av.label(" The graph $G$ has a Hamiltonian Cycle if and only if there exists a cycle in $G'$ passing through "+
               "all vertices exactly once, and that has a length $= 0$ (i.e., has a solution for the instance of TRAVELING SALESMAN"
               +" where $k = 0$.", {top: y-10});
  av.step();

  // Slide 8
  nl2=av.label("1. <b>If there is a cycle that passes through all vertice exactly once, and has length $= 0$ in"
               +" $G'$</b>, the cycle contains only edges that were originally present in graph $G$. (The new edges "
               +"in $G'$ have weight $1$ and hence cannot be part of a cycle of length $= 0$.)"
               +"<br>Hence <b>there exists a Hamiltonian cycle in $G$.</b><br><br>",
               {top:y+80});
  av.step();

  // Slide 9
  var nl3 = av.label("2. <b>If there exists a Hamiltonian Cycle in $G$</b>, it forms a cycle "
                     + "in $G'$ with length $= 0$, since the weights of all the edges is $0$. <br>Hence <b>"
                     + "there exists a solution for TRAVELING SALESMAN in $G'$ with length $= 0$.</b>",
                     {top: y + 180});
  av.step();

  // Slide 10
  av.umsg("<br><b>Example:</b>");
  nl1.hide();
  nl2.hide();
  nl3.hide();
  nl1=av.label("$G'$ has a cycle passing through all vertices exactly once with length $= 0$."
               ,{top:y-20});
  for(i=0;i<6;i++)
    HCedges[i].addClass("hcedge");
  g.show();
  av.step();

  // Slide 11
  av.umsg("<br><b>Example:</b>");
  nl2=av.label("This is a <b>Hamiltonian cycle</b> in G. ",{top:y+0});

  for(var i in TSPedges){
    TSPedges[i].hide();
  }
  for(var i in HCedges){
    HCedges[i].label("");
  }
  g.layout();
  av.recorded();
});
