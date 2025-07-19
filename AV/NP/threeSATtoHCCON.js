//Written by Nabanita Maji and Cliff Shaffer, Spring 2015
/*global ODSA */

// Title: Reduction of 3-SAT to Hamiltonian Cycle Slideshow
// Author: Nabanita Maji; Cliff Shaffer
// Institution: Virginia Tech
// Features: Demonstration
// Keyword: Reduction; Satisfiability Problem; Hamiltonian Cycle Problem
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow demonstrating a reduction from an instance of the 3-Satisfiability problem to an instance of the Hamiltonian Cycle problem. */

$(document).ready(function () {
  "use strict";
  var av_name = "threeSATtoHCCON";

  function hidegraph() {
    g.hide();
    gshadow.hide();
    line0.hide();
    line1.hide();
    line2.hide();
    v1lab.hide();
    v2lab.hide();
    v3lab.hide();
  }
  
  function showgraph() {
    g.show();
    gshadow.show();
    line0.show();
    line1.show();
    line2.show();
    v1lab.show();
    v2lab.show();
    v3lab.show();
  }

  $(".avcontainer").on("jsav-message" ,  function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
  });
  $(".avcontainer").on("jsav-updatecounter" ,  function(){
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  var jsav = new JSAV(av_name);

  // Leftover from original version
  var y = 15;
  
  /* Description for some global variables used :
   * g: The graph that is constructed for the reduction. Any pair of
   * nodes in any path P_i in G has 2 edges (say forward for left-to-right
   * and reverse for right-to-left) between them. However display of such
   * pair of edges is not yet supported in jsav. So only forward edges are
   * included as a part of graph g.
   *
   * g1 : For the problem described above, as a workaround we have g1,
   * a second graph which contains a copy of all nodes in g that requires
   * both reverse and forward edges. These nodes of g1 are not visible and
   * are placed 5 units beneath the corresponding nodes in g. These nodes
   * are used to draw the reverse edges on the canvas.
   *
   * source : the source node
   * target : the target node
   *
   * P: The array in which the ith row holds the nodes in the paths P_i
   * in the graph g.
   * P1: The array in which the ith row holds all the invisible nodes
   * corresponding to path P_i in graph g1.
   *
   * PE: The array in which the [i,j,0]'th item holds the forward edge
   * for jth node of path P_i (from g) and [i,j,1]'th item holds the
   * reverse edge (from g1).
   *
   * PE1: The array holds all the edges connecting the source and target to
   * the rest of the graph.
   *
   * PE2: The array holds all the interconnecting edges that connects two
   * paths P_i and P_j.
   *
   * PE3: The array contains the edges that connect clause-nodes to the
   * nodes in a path.
   *
   * C: The array that holds the clause nodes of the graph.
   */

  // Slide 1
  jsav.umsg("This slideshow explains the reduction (in polynomial time) of an instance of 3CNF Satisfiability (3-SAT) to an instance of the Hamiltonian Cycle problem.");
  jsav.displayInit();

  // Slide 2
  jsav.umsg("<b>3-SAT and  HAMILTONIAN CYCLE:</b> To convert a problem instance of 3-SAT to a problem instance of Hamiltonian Cycle, we need some way to convert the collection of boolean clauses to a graph. The following construction will contain a collection of nodes for each variable, some nodes to represent the clauses, and a few extra nodes to tie everything together. There will be times where we might use more nodes than strictly necessary, but this is to make the construction process more clear.");
  jsav.step();

  // Slide 3
  jsav.umsg("In the eventual graph, each variable from the 3-SAT problem instance will be represented by its own row of nodes. Each node in the row will be be connected to the one to it's left and it's right. To help clarify the eventual construction, between each row we add a single node that is linked to from the first and last nodes of the row above, and links in turn to the first and last nodes of the row below.<br/><br/>For example, consider a CNF expression with three variables $x_1$, $x_2$, and $x_3$. Be begin the construction as follows.");

  var yoffset = 71;
  var ystep = 80;
  
  var labx1 = jsav.label("$$x_1$$", {left: 100, top: -30+yoffset});
  var cirx11 = jsav.g.circle(200, 10+yoffset, 5);
  var cirx12 = jsav.g.circle(230, 10+yoffset, 5);
  var cirx13 = jsav.g.circle(350, 10+yoffset, 5);
  var linex1t1 = jsav.g.line(205, 8+yoffset, 223, 8+yoffset, {"arrow-end": "classic-wide-long"});
  var linex1b1 = jsav.g.line(206, 12+yoffset, 224, 12+yoffset, {"arrow-start": "classic-wide-long"});
  var linex1t2 = jsav.g.line(325, 8+yoffset, 343, 8+yoffset, {"arrow-end": "classic-wide-long"});
  var linex1b2 = jsav.g.line(326, 12+yoffset, 344, 12+yoffset, {"arrow-start": "classic-wide-long"});
  var labelx1dots = jsav.label(". . .", {left: 260, top: -17+yoffset});

  var cirx1extra = jsav.g.circle(280, 50+yoffset, 5);
  var linex1lext = jsav.g.line(200, 14+yoffset, 274, 47+yoffset, {"arrow-end": "classic-wide-long"});
  var linex1rext = jsav.g.line(350, 14+yoffset, 286, 47+yoffset, {"arrow-end": "classic-wide-long"});
  var linex1lexb = jsav.g.line(200, 86+yoffset, 274, 53+yoffset, {"arrow-start": "classic-wide-long"});
  var linex1rexb = jsav.g.line(350, 86+yoffset, 286, 53+yoffset, {"arrow-start": "classic-wide-long"});


  yoffset = yoffset + ystep;
  var labx2 = jsav.label("$$x_2$$", {left: 100, top: -30+yoffset});
  var cirx21 = jsav.g.circle(200, 10+yoffset, 5);
  var cirx22 = jsav.g.circle(230, 10+yoffset, 5);
  var cirx23 = jsav.g.circle(350, 10+yoffset, 5);
  var linex2t1 = jsav.g.line(205, 8+yoffset, 223, 8+yoffset, {"arrow-end": "classic-wide-long"});
  var linex2b1 = jsav.g.line(206, 12+yoffset, 224, 12+yoffset, {"arrow-start": "classic-wide-long"});
  var linex2t2 = jsav.g.line(325, 8+yoffset, 343, 8+yoffset, {"arrow-end": "classic-wide-long"});
  var linex2b2 = jsav.g.line(326, 12+yoffset, 344, 12+yoffset, {"arrow-start": "classic-wide-long"});
  var labelx2dots = jsav.label(". . .", {left: 260, top: -17+yoffset});

  var cirx2extra = jsav.g.circle(280, 50+yoffset, 5);
  var linex2lext = jsav.g.line(200, 14+yoffset, 274, 47+yoffset, {"arrow-end": "classic-wide-long"});
  var linex2rext = jsav.g.line(350, 14+yoffset, 286, 47+yoffset, {"arrow-end": "classic-wide-long"});
  var linex2lexb = jsav.g.line(200, 86+yoffset, 274, 53+yoffset, {"arrow-start": "classic-wide-long"});
  var linex2rexb = jsav.g.line(350, 86+yoffset, 286, 53+yoffset, {"arrow-start": "classic-wide-long"});
  
  yoffset = yoffset + ystep;
  var labx3 = jsav.label("$$x_3$$", {left: 100, top: -30+yoffset});
  var cirx31 = jsav.g.circle(200, 10+yoffset, 5);
  var cirx32 = jsav.g.circle(230, 10+yoffset, 5);
  var cirx33 = jsav.g.circle(350, 10+yoffset, 5);
  var linex3t1 = jsav.g.line(205, 8+yoffset, 223, 8+yoffset, {"arrow-end": "classic-wide-long"});
  var linex3b1 = jsav.g.line(206, 12+yoffset, 224, 12+yoffset, {"arrow-start": "classic-wide-long"});
  var linex3t2 = jsav.g.line(325, 8+yoffset, 343, 8+yoffset, {"arrow-end": "classic-wide-long"});
  var linex3b2 = jsav.g.line(326, 12+yoffset, 344, 12+yoffset, {"arrow-start": "classic-wide-long"});
  var labelx3dots = jsav.label(". . .", {left: 260, top: -17+yoffset});
  jsav.step();

  // Slide 4
  jsav.umsg("<br/><br/>At the very top we add a node labeled $s$, and at the bottom a node labeled $t$.", {preserve: true});

  var cirs = jsav.g.circle(280, -194+yoffset, 7);
  var cirt = jsav.g.circle(280, 50+yoffset, 7);
  var labels = jsav.label("$$s$$",  {left: 277, top: -237+yoffset});
  var labelt = jsav.label("$$t$$",  {left: 278, top: 8+yoffset}); 
  var lineslexb = jsav.g.line(200, 86+yoffset-241, 274, 53+yoffset-241, {"arrow-start": "classic-wide-long"});
  var linesrexb = jsav.g.line(350, 86+yoffset-241, 286, 53+yoffset-241, {"arrow-start": "classic-wide-long"});
 var linetlext = jsav.g.line(200, 14+yoffset, 272, 47+yoffset, {"arrow-end": "classic-wide-long"});
  var linetrext = jsav.g.line(350, 14+yoffset, 288, 47+yoffset, {"arrow-end": "classic-wide-long"});
  
  jsav.step();

  // Slide 5
  jsav.umsg("For our example, let's say that there are two clauses, $C_1$ and $C_2$. Representing the clauses is simple: We merely add a node to represent each clause.");
  var cirC1 = jsav.g.circle(420, -174+yoffset, 5);
  var cirC2 = jsav.g.circle(420, -144+yoffset, 5);
  var labelC1 = jsav.label("$$C_1$$",  {left: 450, top: -215+yoffset});
  var labelC2 = jsav.label("$$C_2$$",  {left: 450, top: -185+yoffset}); 
  jsav.step();

  // Slide 6
  jsav.umsg("<br/>This begs the question: How do we connect the clause nodes to the graph? Before we can answer that, let's consider how many nodes we need in each row.", {preserve: true});
  jsav.step();

  // Slide 7
  jsav.umsg("<br/>We will be associating clauses to variables by using two nodes from the row for the given variable: One to go to the associated clause node and one to come back. So we need at least $2k$ nodes where $k$ is the number of clauses. But we will see that we want to make sure that things work appropriately with the rows (explained soon). For this reason we want an extra node to come between each pair of nodes that we are using for a given clause. So we need to add $k+1$ nodes. Plus a start and end node to make things clearer. So each variable will be represented by a row of $3k +3$ nodes.", {preserve: true});
  jsav.step();

  // Slide 8
  jsav.umsg("Now let's see the graph that would be constructed for the example expression $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.");

  // HIDE THE OLD IMAGE AND START OVER NOW
  labx1.hide();
  cirx11.hide();
  cirx12.hide();
  cirx13.hide();
  linex1t1.hide();
  linex1b1.hide();
  linex1t2.hide();
  linex1b2.hide();
  labelx1dots.hide();
  cirx1extra.hide();
  linex1lext.hide();
  linex1rext.hide();
  linex1lexb.hide();
  linex1rexb.hide();
  labx2.hide();
  cirx21.hide();
  cirx22.hide();
  cirx23.hide();
  linex2t1.hide();
  linex2b1.hide();
  linex2t2.hide();
  linex2b2.hide();
  labelx2dots.hide();
  cirx2extra.hide();
  linex2lext.hide();
  linex2rext.hide();
  linex2lexb.hide();
  linex2rexb.hide();
  labx3.hide();
  cirx31.hide();
  cirx32.hide();
  cirx33.hide();
  linex3t1.hide();
  linex3b1.hide();
  linex3t2.hide();
  linex3b2.hide();
  labelx3dots.hide();
  cirs.hide();
  cirt.hide();
  labels.hide();
  labelt.hide();
  lineslexb.hide();
  linesrexb.hide();
  linetlext.hide();
  linetrext.hide();
  cirC1.hide();
  cirC2.hide();
  labelC1.hide();
  labelC2.hide();
  jsav.step();

  // Slide 9
  jsav.umsg("<br/>First, here are the nodes for the three variables, plus the start and end nodes ($s$ and $t$) and the intermediate nodes between the variable rows. Since in our example $k = 2$ (there are two clauses), we need $3 * 2 + 3 = 9$ nodes for each variable.", {preserve: true});

  // g is the graph generated by the construction process
  // Any pair of nodes in any path P_i in G has 2 edges (say forward for
  // left-to-right and reverse for right-to-left) between them. However
  // display of such pair of edges is not yet supported in jsav. So only
  // forward edges are included as a part of graph g.

  // gshadow : For the problem described above, as a workaround we have g1,
  // a second graph which contains a copy of all nodes in g that requires
  // both reverse and forward edges. These nodes of g1 are not visible and
  // are placed 5 units beneath the corresponding nodes in g. These nodes
  // are used to draw the reverse edges on the canvas.

  // Note that the Finite Automata class supports curvey edges that would be
  // perfect for this use case. Ought to make that available to the graph
  // class at some point.
  
  // We declare gshadow first, because that way g's nodes will display and
  // hide gshadow's nodes.
  var gshadow = jsav.ds.graph({width: 800,  height: 450,  left: 10,  top: 10,
                               layout: "manual",  directed: true});
  var g = jsav.ds.graph({width: 800,  height: 450,  left: 10,  top: 10,
                     layout: "manual" ,  directed: true});
  yoffset = 0
  var xcenter = 360;
  var source  = g.addNode("<b>s</b>" , {"top":10+yoffset, "left": xcenter}).addClass("extranode");
  var target  = g.addNode("<b>t</b>" , {"top":390+yoffset, "left": xcenter}).addClass("extranode");
  var extra1 = g.addNode(" " , {"top":140+yoffset, "left": xcenter});
  var extra2  = g.addNode(" " , {"top":260+yoffset, "left": xcenter});

  // nodes holds the nodes for the clauses.
  var nodes = new Array(3);
  var nodeshadow = new Array(3);
  var edges = new Array(3);
  var edgeshadow = new Array(3);

  yoffset = 80;
  var xoffset = 120;
  var ystep = 120;
  var xstep = 60;
  var i, j;
  for (i=0; i<3; i++) {
    nodes[i] = new Array(9);
    nodeshadow[i] = new Array(9);
    edges[i] = new Array(9);
    edgeshadow[i] = new Array(9);
    for (j=0; j<9; j++) {
      nodes[i][j] = g.addNode("" + (j+1),
                              {top: yoffset + i*ystep, left: xoffset+j*xstep})
        .addClass("variablenode");      
      
      nodeshadow[i][j] = gshadow.addNode(" ",
                                   {top: yoffset+5 + i*ystep, left: xoffset+j*xstep})
        .addClass("variablenode").addClass("invisible");
    }
    for (j=0; j<8; j++) {
      edges[i][j] = g.addEdge(nodes[i][j], nodes[i][j+1]).addClass("edgetrue");
      edgeshadow[i][j] = gshadow.addEdge(nodeshadow[i][j+1], nodeshadow[i][j]).addClass("edgefalse");
    }
  }

  var sl = g.addEdge(source, nodes[0][0]).addClass("edgeconnect");
  var sr = g.addEdge(source, nodes[0][8]).addClass("edgeconnect");
  var ex1inl = g.addEdge(nodes[0][0], extra1).addClass("edgeconnect");
  var ex1inr = g.addEdge(nodes[0][8], extra1).addClass("edgeconnect");
  var ex1outl = g.addEdge(extra1, nodes[1][0]).addClass("edgeconnect");
  var ex1outr = g.addEdge(extra1, nodes[1][8]).addClass("edgeconnect");
  var ex2inl = g.addEdge(nodes[1][0], extra2).addClass("edgeconnect");
  var ex2inr = g.addEdge(nodes[1][8], extra2).addClass("edgeconnect");
  var ex2outl = g.addEdge(extra2, nodes[2][0]).addClass("edgeconnect");
  var ex2outr = g.addEdge(extra2, nodes[2][8]).addClass("edgeconnect");
  var tl = g.addEdge(nodes[2][0], target).addClass("edgeconnect");
  var tr = g.addEdge(nodes[2][8], target).addClass("edgeconnect");

  var v1lab = jsav.label("$$x_1$$", {left: 105, top: yoffset});
  var v2lab = jsav.label("$$x_2$$", {left: 105, top: yoffset + ystep});
  var v3lab = jsav.label("$$x_3$$", {left: 105, top: yoffset + 2*ystep});
  g.layout();
  gshadow.layout();
  jsav.step();

  // slide 10
  jsav.umsg("<br/>Add an edge from the target node to the source node in order to complete the cycle (if there will be one).", {preserve: true});
  var line0 = jsav.g.line(372, yoffset-25, 90, yoffset-20, {"stroke-width": 1.5, "arrow-start": "classic-wide-long"}).addClass("edgeconnect");
  var line1 = jsav.g.line(90, yoffset-20, 90, yoffset-5+3*ystep, {"stroke-width": 1.5}).addClass("edgeconnect");
  var line2 = jsav.g.line(372, yoffset-5+3*ystep, 90, yoffset-5+3*ystep, {"stroke-width": 1.5}).addClass("edgeconnect");
  jsav.step();

  // Slide 11
  jsav.umsg("<br/>Next, we add the nodes representing the two clauses.", {preserve: true});
  var clause1 = g.addNode("<b>C1</b>", {top: 0, left: 500}).addClass("clausenode").css({"background-color": "SlateBlue"});
  var clause2 = g.addNode("<b>C2</b>", {top: 270, left: 700}).addClass("clausenode").css({"background-color": "IndianRed"});
  g.layout();
  jsav.step();


  // Slide 12
  jsav.umsg("<br/>Finally, for each clause we add edges corresponding to the variables in that clause. We have an edge going from the associated variable row to the clause, and one going from the clause to the associated variable row. If the variable $i$ occurs in clause $j$, we draw an edge from node $3k + 2$ to the clause, and an edge from the clause to $3k + 3$. If the clause has instead the negation of the variable, we reverse the direction of the edges.", {preserve: true});
  jsav.step();

  // Slide 13
  jsav.umsg("Let's see what happens when we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.");
  jsav.step();

  // Slide 14
  jsav.umsg("Let's see what happens when we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.<br/><br/>Add $x_1$ from Clause 1.");
  var clauseEdges = new Array(2);
  clauseEdges[0] = new Array(6);
  clauseEdges[1] = new Array(6);
  clauseEdges[0][0] = g.addEdge(nodes[0][2], clause1).addClass("clauseedge").addClass("boldedge");
  clauseEdges[0][1] = g.addEdge(clause1, nodes[0][3]).addClass("clauseedge").addClass("boldedge");
  g.layout();
  jsav.step();

  // Slide 15
  jsav.umsg("Let's see what happens when we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.<br/><br/>Add $x_2$ from Clause 1.");
  clauseEdges[0][0].removeClass("boldedge");  
  clauseEdges[0][1].removeClass("boldedge");  
  clauseEdges[0][2] = g.addEdge(nodes[1][2], clause1).addClass("clauseedge").addClass("boldedge");
  clauseEdges[0][3] = g.addEdge(clause1, nodes[1][3]).addClass("clauseedge").addClass("boldedge");
  g.layout();
  jsav.step();

  // Slide 16
  jsav.umsg("Let's see what happens when we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.<br/><br/>Add $\\overline{x_3}$ from Clause 1. Since this is negated, we reverse the direction of the edges.");
  clauseEdges[0][2].removeClass("boldedge");  
  clauseEdges[0][3].removeClass("boldedge");  
  clauseEdges[0][4] = g.addEdge(nodes[2][3], clause1).addClass("clauseedge").addClass("boldedge");
  clauseEdges[0][5] = g.addEdge(clause1, nodes[2][2]).addClass("clauseedge").addClass("boldedge");
  g.layout();
  jsav.step();

  // Slide 17
  jsav.umsg("Let's see what happens when we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.<br/><br/>Add $\\overline{x_1}$ from Clause 2. Since this is negated, we reverse the direction of the edges.");
  clauseEdges[0][4].removeClass("boldedge");  
  clauseEdges[0][5].removeClass("boldedge");  
  clauseEdges[1][0] = g.addEdge(nodes[0][6], clause2).addClass("clauseedge").addClass("boldedge");
  clauseEdges[1][1] = g.addEdge(clause2, nodes[0][5]).addClass("clauseedge").addClass("boldedge");
  g.layout();
  jsav.step();

  // Slide 18
  jsav.umsg("Let's see what happens when we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.<br/><br/>Add $x_2$ from Clause 2.");
  clauseEdges[1][0].removeClass("boldedge");  
  clauseEdges[1][1].removeClass("boldedge");  
  clauseEdges[1][2] = g.addEdge(nodes[1][5], clause2).addClass("clauseedge").addClass("boldedge");
  clauseEdges[1][3] = g.addEdge(clause2, nodes[1][6]).addClass("clauseedge").addClass("boldedge");
  g.layout();
  jsav.step();

  // Slide 19
  jsav.umsg("Let's see what happens when we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.<br/><br/>Add $x_3$ from Clause 2.");
  clauseEdges[1][2].removeClass("boldedge");  
  clauseEdges[1][3].removeClass("boldedge");  
  clauseEdges[1][4] = g.addEdge(nodes[2][5], clause2).addClass("clauseedge").addClass("boldedge");
  clauseEdges[1][5] = g.addEdge(clause2, nodes[2][6]).addClass("clauseedge").addClass("boldedge");
  g.layout();
  jsav.step();

  // Slide 20
  jsav.umsg("That completes the construction. All that we need to do now is find the Hamiltonian Cycle and the corresponding variable assignment. Note that for each variable, all the nodes (1) need to be visited, meaning that (2) the row has to be processed either left-to-right or right-to-left. The only exception is that we can jump out to a variable and back for an associated variable assigned to be true (or its negation assigned to be false). Note that the extra nodes that we added make sure that its not possible to make a cycle by doing something like jumping from a variable row to a given clause and then back to another variable row... doing that can't possibly lead to a proper Hamiltonian Cycle that includes all nodes in the graph.");
  clauseEdges[1][4].removeClass("boldedge");  
  clauseEdges[1][5].removeClass("boldedge");  
  jsav.step();

  // Slide 21
  jsav.umsg("<br><b>Insights about the constructed graph</b><br><br><br>");
  hidegraph();
  var label1 = jsav.label("1. Any Hamiltonian Cycle in the constructed graph ($G$) traverses"
                          +" $P_i$ either from right-to-left or left-to-right.<br>"
                    +"This is because any path entering a node $v_{i,j}$ has to exit "+
                    "from $v_{i,j+1}$ either immediately or  via one <br> clause-node"+
                    " in between, in order to maintain Hamiltonian property<br>"+
                    "Similarly all paths entering at $v_{i,j-1}$ has to exit from "+
                    "$v_{i,j}$.<br><br>"+
                    "2. Since each path $P_i$ can be traversed in $2$ possible ways "+
                    "and we have $n$ paths mapping to $n$ variables, <br>there can be $2^n$"
                    +" Hamiltonian cycles in the graph $G$ - {$C_1$, $C_2$ $\\cdots$ "
                    +"$C_k$}.<br>"+
                    "Each one of this $2^n$ Hamiltonian cycles corresponds to a particular"
                    +" assignment for variables $x_1$, $x_2$ $\\cdots$  $x_n$.<br>"
                    +"<br><br>3. <b>This graph can be constructed in polynomial time.</b>"
                    ,{left:0,top:y -30} );

  jsav.step();

  // Slide 22
  label1.hide();
  jsav.umsg("<br><b>3-SAT and Hamiltonian Cycle</b>");
  label1 = jsav.label("1. <b>If there exists a Hamiltonian cycle $H$ in the graph $G$,"
                    +"</b><br>" +
                    "If $H$ traverses $P_i$ from left to right, assign $x_i = True$<br>"+
                    "If $H$ traverses $P_i$ from right to left, assign $x_i = False$"+
                    "<br><br>"+
                    "Since H visits each clause node $C_j$, at least one of $P_i$ was"
                    +" traversed in the right direction relative <br>to the node $C_j$"+
                    "<br>"+
                    "<b>The assignment obtained here satisfies the given 3 CNF.</b>"+
                    "<br><br>",{left:0,top:y-20});
  jsav.step();

  // Slide 23
  var label2 = jsav.label("2. <b>If there exists a satisfying assignment for the 3 CNF</b>,"
                    +"<br>"+
                    "Select the path that traverses $P_i$ from left-to-right if $x_i"
                    +" = True$ or right-to-left if $x_i = False$<br>"+
                    "Include the clauses in the path wherever possible.<br>"+
                    "Connect the source to $P_1$, $P_n$ to target and $P_i$ to "+
                    "$P_{i+1}$ appropriately so as to maintain the continuity <br>of "+
                    "the path <br>"+
                    "Connect the target to source to complete the cycle<br><br>"
                    +"Since the assignment is such that every clause is satisfied, all "
                    +"the clause-nodes are included in the path.<br>The $P_i$ nodes and "
                    +"source and target are all included and since the path traverses "+
                    "unidirectional, <br>no node is repeated twice <br>"+
                    "<b> The path obtained is a Hamiltonian Cycle</b><br><br>",{left:0,top:y+160});
  jsav.step();

  // Slide 24
  jsav.umsg("<b>Hamiltonian Cycle in the constructed graph.</b><br/><br/> The graph $G$ has a Hamiltonian cycle. (Actually, there is more than one, but here is one.)");
  label1.hide();
  label2.hide();
  showgraph();
  line0.addClass("highlightedge");
  line1.addClass("highlightedge");
  line2.addClass("highlightedge");
  sl.addClass("highlightedge");
  edges[0][0].addClass("highlightedge");
  edges[0][1].addClass("highlightedge");
  clauseEdges[0][0].addClass("highlightedge");
  clauseEdges[0][1].addClass("highlightedge");
  edges[0][3].addClass("highlightedge");
  edges[0][4].addClass("highlightedge");
  edges[0][5].addClass("highlightedge");
  edges[0][6].addClass("highlightedge");
  edges[0][7].addClass("highlightedge");
  ex1inr.addClass("highlightedge");
  ex1outl.addClass("highlightedge");
  edges[1][0].addClass("highlightedge");
  edges[1][1].addClass("highlightedge");
  edges[1][2].addClass("highlightedge");
  edges[1][3].addClass("highlightedge");
  edges[1][4].addClass("highlightedge");
  clauseEdges[1][2].addClass("highlightedge");
  clauseEdges[1][3].addClass("highlightedge");
  edges[1][6].addClass("highlightedge");
  edges[1][7].addClass("highlightedge");
  ex2inr.addClass("highlightedge");
  ex2outr.addClass("highlightedge");
  edgeshadow[2][7].addClass("highlightedge");
  edgeshadow[2][6].addClass("highlightedge");
  edgeshadow[2][5].addClass("highlightedge");
  edgeshadow[2][4].addClass("highlightedge");
  edgeshadow[2][3].addClass("highlightedge");
  edgeshadow[2][2].addClass("highlightedge");
  edgeshadow[2][1].addClass("highlightedge");
  edgeshadow[2][0].addClass("highlightedge");
  tl.addClass("highlightedge");
  jsav.step();

  // Slide 25
  jsav.umsg("<b>Assignment for 3-SAT.</b><br/><br/>The original expression is: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.<br/> From the Hamiltonian cycle below the assignment is:<br/>$x_1 = True$, $x_2 = True$. The value of $x_3$ is irrelevant, though it is shown to have a value of $False$ in the graph.</b>");
  jsav.recorded();
});
