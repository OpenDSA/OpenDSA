$(document).ready(function(){
    "use strict";

    var av_name = "KClique";
    var av = new JSAV(av_name);


var Frames = PIFRAMES.init(av_name);
// Load the config object with interpreter and code created by odsaUtils.js
var config = ODSA.UTILS.loadConfig({av_name: av_name}),
interpret = config.interpreter, // get the interpreter
code = config.code;             // get the code object
var goNext = false;





//frame 1
av.umsg("The requirement that a problem be NP-hard might seem to be impossible, but in fact there are hundreds of such problems, including TRAVELING SALESMAN. Another such problem is called K-CLIQUE.");
av.displayInit();

//2
av.umsg("<b>Problem</b> <br><br>K-CLIQUE <br><br><b>Input: </b>: An arbitrary undirected graph G and an integer k. <br><br><b>Output: </b> YES if there is a complete subgraph of at least k vertices, and NO otherwise.");
av.step();

//3
av.umsg("<b>Introduction to the Clique problem</b><br><br>This slideshow introduces and explains the <q>Clique</q> Problem. <br><br>We start with some definitions and background.");
av.step();

//4
av.umsg("<b>Clique</b><br><br> A Clique is complete graph i.e. a graph where each node is connected to every other nodes by at least one edge.");
av.step();

//5
av.umsg("<b>Clique</b><br><br> A Clique is complete graph i.e. a graph where each node is connected to every other nodes by at least one edge. <br><br> Example of a clique:");
var  g = av.ds.graph({width: 400, height: 450,
    layout: "manual", directed: false,top:60,left:200});
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

//6
av.umsg("<b>Clique in a graph</b><br><br>If in a graph G, there exists a complete subgraph of K nodes, G is said to contain a K-Clique.");
av.step();

//7
av.umsg("<b>Clique in a graph</b><br><br>If in a graph G, there exists a complete subgraph of K nodes, G is said to contain a K-Clique. <br><br><br>For example: The following graph contains a 3-clique.");
var  g3 = av.ds.graph({width: 400, height: 450,layout: "manual", directed: false,left:220,top:70});
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

//8 
av.umsg(Frames.addQuestion("q1"));
g.show();
av.step();
g.hide();

//9
av.umsg("<b>Clique in a graph</b><br><br> The clique with largest number of vertices in a graph G is called Maximum Clique in G.");
av.step();

//10
av.umsg("<b>Clique in a graph</b><br><br> The clique with largest number of vertices in a graph G is called Maximum Clique in G. <br><br><br> For Example: Maximum Clique in the graph is a 4-Clique.");
g3.show();
ne1.addClass("edgehighlight");
ne4.addClass("edgehighlight");
ne5.addClass("edgehighlight");
g3.layout();
av.step();
g3.hide();

//11
av.umsg(Frames.addQuestion("q2"));
g.show();
av.step();
g.hide();

//12
av.umsg("<b>Clique in a graph</b><br><br>The Clique Problem can be defined as either of the following:<br><br> <b>Given a graph</b> G = (V, E)<b>, find the Maximum Clique in </b>G. <br><br> or <br><br><b>Given a graph</b> G = (V, E), and an number</b> k <b>, does </b>G <b>contain a Clique of size</b> >=k?");
av.step();

//13
av.umsg("<b>Example of Clique Problem:</b> <br><br>In the graph below does there exitst a clique of size >= 5 ?");
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

//14
av.umsg("<b>Example of Clique Problem:</b> <br><br>In the graph below does there exitst a clique of size >= 5 ? <br><br><b>No</b>");
av.step();

//15
av.umsg("<b>Example of Clique Problem:</b> <br><br>In the graph below does there exitst a clique of size >= 4 ?");
av.step();

//16
av.umsg("<b>Example of Clique Problem:</b> <br><br>In the graph below does there exitst a clique of size >= 4 ?<br><br><b>Yes</b>");
e1.addClass("edgehighlight");
e2.addClass("edgehighlight");
e3.addClass("edgehighlight");
e4.addClass("edgehighlight");
e5.addClass("edgehighlight");
e6.addClass("edgehighlight");
av.step();
g1.hide();

//17
av.umsg("Nobody knows whether there is a polynomial time solution for K-CLIQUE, but if such an algorithm is found for K-CLIQUE or for TRAVELING SALESMAN, then that solution can be modified to solve the other, or any other problem in NP, in polynomial time.");
av.step();

//18
av.umsg(Frames.addQuestion("q3"));
av.step();

//19
av.umsg("The primary theoretical advantage of knowing that a problem P1 is NP-complete is that it can be used to show that another problem P2 is NP-complete. This is done by finding a polynomial time reduction of P1 to P2. ");
av.step();

//20
av.umsg(Frames.addQuestion("q4"));
av.step();

//21
av.umsg("Because we already know that all problems in NP can be reduced to P1 in polynomial time (by the definition of NP-complete), we now know that all problems can be reduced to P2 as well by the simple algorithm of reducing to P1 and then from there reducing to P2.");
av.step();

//22
av.umsg("There is a practical advantage to knowing that a problem is NP-complete. It relates to knowing that if a polynomial time solution can be found for any problem that is NP-complete, then a polynomial solution can be found for all such problems. The implication is that, <br><br>1.Because no one has yet found such a solution, it must be difficult or impossible to do; and<br>2.Effort to find a polynomial time solution for one NP-complete problem can be considered to have been expended for all NP-complete problems.");
av.step();

//23
av.umsg(Frames.addQuestion("q5"));
av.step();

//24
av.umsg("How is NP-completeness of practical significance for typical programmers? Well, if your boss demands that you provide a fast algorithm to solve a problem, they will not be happy if you come back saying that the best you could do was an exponential time algorithm. ");
av.step();

//25
av.umsg("But, if you can prove that the problem is NP-complete, while they still won't be happy, at least they should not be mad at you! By showing that their problem is NP-complete, you are in effect saying that the most brilliant computer scientists for the last 50 years have been trying and failing to find a polynomial time algorithm for their problem.");
av.step();

//26
av.umsg("Problems that are solvable in polynomial time on a regular computer are said to be in class P. Clearly, all problems in P are solvable in polynomial time on a non-deterministic computer simply by neglecting to use the non-deterministic capability. Some problems in NP are NP-complete.");
av.step();

//27
av.umsg(Frames.addQuestion("q6"));
av.step();

//28
av.umsg("We can consider all problems solvable in exponential time or better as an even bigger class of problems because all problems solvable in polynomial time are solvable in exponential time. Thus, we can view the world of exponential-time-or-better problems in terms of Figure 0.3.2.");
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
var l =av.label("Figure 0.3.2: Our knowledge regarding the world of problems requiring exponential time or less. Some of these problems are solvable in polynomial time by a non-deterministic computer. Of these, some are known to be NP-complete, and some are known to be solvable in polynomial time on a regular computer.", {left: 0, top: 165+150});
av.step();


//29
av.umsg(Frames.addQuestion("q7"));
av.step();
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
l.hide();


//30
av.umsg("The most important unanswered question in theoretical computer science is whether <b>P = NP</b>. If they are equal, then there is a polynomial time algorithm for TRAVELING SALESMAN and all related problems.");
av.step();

//31
av.umsg(Frames.addQuestion("q8"));
av.step();

//
av.umsg("Because TRAVELING SALESMAN is known to be NP-complete, if a polynomial time algorithm were to be found for this problem, then all problems in NP would also be solvable in polynomial time. <br><br>Conversely, if we were able to prove that TRAVELING SALESMAN has an exponential time lower bound, then we would know that <b>P ≠ NP</b>.");
av.step();

av.recorded();
});
