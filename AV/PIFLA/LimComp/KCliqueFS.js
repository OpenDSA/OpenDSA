$(document).ready(function(){
  "use strict";

  var av_name = "KCliqueFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Recall that a problem is said to be NP-hard if any problem in NP can be reduced to it in polyonomial time.<br/><br/>It might seem impossible that any problem could actually be NP-hard, let alone provably so. But in fact there are hundreds of such problems, including TRAVELING SALESMAN. Another such problem is called K-CLIQUE.");
  av.displayInit();

  // Frame 2
  av.umsg("<b>Problem</b> <br><br>K-CLIQUE <br><br><b>Input: </b>: An arbitrary undirected graph $G$ and an integer $k$.<br/><br/><b>Output: </b> YES if there is a complete subgraph of at least $k$ vertices, and NO otherwise.");
  av.step();

  // Frame 3
  av.umsg("A Clique is a complete graph, that is, a graph where each node is connected to every other node by at least one edge.<br/><br/>Here is an example of a clique:");
  var  g = av.ds.graph({width: 400, height: 450,
                        layout: "manual", directed: false,top:60,left:50});
  var x=20;
  var y=0;
  g.addNode("A", {"left": x+150, "top": y+50});
  g.addNode("B", {"left": x+50, "top": y+100});
  g.addNode("C", {"left": x+250,"top": y+100});
  g.addNode("D", {"left": x+25, "top": y+200});
  g.addNode("E", {"left": x+275, "top": y+200});
  g.addNode("F", {"left": x+150, "top": y+250});

  var gnodes = g.nodes();
  for(var i=0;i<6;i++)
    for(var j=i+1;j<6;j++)
      g.addEdge(gnodes[i],gnodes[j]);
  g.layout();
  av.step();
  g.hide();

  // Frame 4
  av.umsg("<b>Clique in a graph</b><br/><br/>If a graph $G$ contains a complete subgraph of $k$ nodes, $G$ is said to contain a k-Clique.<br/><br/>For example: The following graph contains a 3-clique.");
  var  g3 = av.ds.graph({width: 400, height: 450,layout: "manual", directed: false,left:70,top:70});
  x=0;
  y=0;
  var n1 = g3.addNode("1", {"left": x+50, "top": y+100});
  var n2 = g3.addNode("2", {"left": x+250,"top": y+100});
  var n3 = g3.addNode("3", {"left": x+50, "top": y+200});
  var n4 = g3.addNode("4", {"left": x+250, "top": y+200});
  var n5 = g3.addNode("5", {"left": x+175, "top": y+50});
  var n6 = g3.addNode("6", {"left": x+175, "top": y+250});
  
  var ne1 = g3.addEdge(n3, n2);
  var ne2 = g3.addEdge(n3, n4);
  var ne4 = g3.addEdge(n5, n2);
  var ne5 = g3.addEdge(n4, n2);
  var ne6 = g3.addEdge(n5, n4);
  var ne7 = g3.addEdge(n5, n3);
  var ne8 = g3.addEdge(n1, n3);
  var ne8 = g3.addEdge(n6, n3);

  ne7.addClass("edgehighlight");
  ne6.addClass("edgehighlight");
  ne2.addClass("edgehighlight");
  g3.layout();
  g3.show();
  av.step();
  g3.hide();

  // Frame 5 
  av.umsg(Frames.addQuestion("kclique"));
  g.show();
  av.step();

  // Frame 6
  av.umsg("<b>Clique in a graph</b><br/><br/>The clique with largest number of vertices in a graph G is called the <b>Maximum Clique</b> in G.<br/><br/>For example: The Maximum Clique in this graph is a 4-Clique.");
  g.hide();
  g3.show();
  ne1.addClass("edgehighlight");
  ne4.addClass("edgehighlight");
  ne5.addClass("edgehighlight");
  g3.layout();
  av.step();
  g3.hide();

  // Frame 7
  av.umsg(Frames.addQuestion("max"));
  g.show();
  av.step();
  g.hide();

  // Frame 8
  av.umsg("<b>Clique in a graph</b><br><br>The CLIQUE Problem can be defined as follows:<br/>Given a graph $G = (V, E)$, find the Maximum Clique in $G$.<br/><br/>Decision form of the CLIQUE problem:<br/>Given a graph $G = (V, E)$, and an number $k$, does $G$ contain a Clique of size $\\geq k$?");
  av.step();

  // Frame 9
  av.umsg("<b>Example of Clique Problem:</b> <br><br>In the graph below, does there exist a clique of size $\\geq 5$?");
  var  g1 = av.ds.graph({width: 400, height: 450,
                         layout: "manual", directed: false});
  x=20;
  y = 320;
  var c7 = g1.addNode("a", {"left":x , "top":y });
  var c4 = g1.addNode("b", {"left":x+150 , "top":y+20 });
  var c5 = g1.addNode("c", {"left":x+300, "top":y });
  var c10 = g1.addNode("d", {"left":x-20, "top":y-120 });
  var c9 = g1.addNode("e", {"left":x+200, "top":y-80 });
  var c3 = g1.addNode("f", {"left":x+320, "top":y-140 });
  var c2 = g1.addNode("g", {"left":x+120, "top":y-190 });
  var c6 = g1.addNode("h", {"left":x+215, "top":y-190 });
  var c1 = g1.addNode("i", {"left":x+100, "top":y-260 });
  var c8 = g1.addNode("j", {"left":x+195, "top":y-260 });

  var e1 = g1.addEdge(c1, c2);
  var e2 = g1.addEdge(c1, c6);
  var e3 = g1.addEdge(c1, c8);
  g1.addEdge(c1, c10);
  var e4 = g1.addEdge(c2, c8);
  var e5 = g1.addEdge(c2, c6);
  g1.addEdge(c2, c4);
  g1.addEdge(c2, c7);
  g1.addEdge(c2, c9);
  g1.addEdge(c2, c10);
  g1.addEdge(c3, c5);
  g1.addEdge(c3, c6);
  g1.addEdge(c3, c8);
  g1.addEdge(c3, c9);
  g1.addEdge(c4, c9);
  g1.addEdge(c4, c10);
  g1.addEdge(c5, c9);
  g1.addEdge(c5, c6);
  g1.addEdge(c5, c10);
  var e6 = g1.addEdge(c6, c8);
  g1.addEdge(c6, c9);
  g1.addEdge(c6, c10);
  g1.addEdge(c7, c9);
  g1.addEdge(c7, c10);
  g1.addEdge(c9, c10);
  g1.layout();
  av.step();

  // Frame 10
  av.umsg("<b>Example of Clique Problem:</b> <br><br>In the graph below, does there exist a clique of size $\\geq 5$?<br/><br/><b>No</b>");
  av.step();

  // Frame 11
  av.umsg("<b>Example of Clique Problem:</b> <br><br>In the graph below, does there exist a clique of size $\\geq 4$?");
  av.step();

  // Frame 12
  av.umsg("<b>Example of Clique Problem:</b> <br><br>In the graph below, does there exist a clique of size $\\geq 4$?<br/><br/><b>Yes</b>");
  e1.addClass("edgehighlight");
  e2.addClass("edgehighlight");
  e3.addClass("edgehighlight");
  e4.addClass("edgehighlight");
  e5.addClass("edgehighlight");
  e6.addClass("edgehighlight");
  av.step();
  g1.hide();

  // Frame 13
  av.umsg(Frames.addQuestion("convert"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("theory"));
  av.step();

  // Frame 15
  av.umsg("Because we already know that all problems in NP can be reduced to P1 in polynomial time (by the definition of NP-complete), we now know that all problems can be reduced to P2 as well by the simple algorithm of reducing to P1 and then from there reducing to P2.");
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("practical"));
  av.step();

  // Frame 17
  av.umsg("How is NP-completeness of practical significance for typical programmers? Well, if your boss demands that you provide a fast algorithm to solve a problem, they will not be happy if you come back saying that the best you could do was an exponential time algorithm. ");
  av.step();

  // Frame 18
  av.umsg("But, if you can prove that the problem is NP-complete, while they still won't be happy, at least they should not be mad at you! By showing that their problem is NP-complete, you are in effect saying that the most brilliant computer scientists for the last 50 years have been trying and failing to find a polynomial time algorithm for their problem.");
  av.step();

  // Frame 19
  av.umsg("Problems that are solvable in polynomial time on a regular computer are said to be in class P. Clearly, all problems in P are solvable in polynomial time on a non-deterministic computer simply by neglecting to use the non-deterministic capability. In contrast, some problems in NP are NP-complete.");
  av.step();

  // Frame 20
  av.umsg(Frames.addQuestion("ptime"));
  var left = 50;
  var a = av.g.ellipse(left + 200, 130+50, 185, 120);
  var b = av.g.ellipse(left + 200, 145+50, 155, 90);
  var c =av.g.rect(left + 110, 85+50, 190, 60);
  var d =av.g.rect(left + 110, 150+50, 190, 60);
  var e =av.label("Exponential time problems", {left: left + 110, top: 13+50});
  var f =av.label("TOH", {left: left + 65, top: 40+50});
  var m =av.label("NP problems", {left: left + 160, top: 45+50});
  var h =av.label("NP-complete problems", {left: left + 130, top: 80+50});
  var n =av.label("TRAVELING SALESMAN", {left: left + 120, top: 100+50});
  var o =av.label("P problems", {left: left + 165, top: 145+50});
  var k =av.label("SORTING", {left: left + 170, top: 165+50});
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("peqnp"));
  a.hide();
  b.hide();
  c.hide();
  d.hide();
  e.hide();
  f.hide();
  m.hide();
  h.hide();
  o.hide();
  n.hide();
  k.hide();
  av.step();

  // Frame 22
  av.umsg("Because TRAVELING SALESMAN is known to be NP-complete, if a polynomial time algorithm were to be found for this problem, then all problems in NP would also be solvable in polynomial time. <br><br>Conversely, if we were able to prove that TRAVELING SALESMAN has an exponential time lower bound, then we would know that <b>P ≠ NP</b>.");
  av.step();

  // Frame 23
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
