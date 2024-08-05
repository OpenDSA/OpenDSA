//Written by Nabanita Maji and Cliff Shaffer, Spring 2015
/*global ODSA */

$(document).ready(function () {
  "use strict";
  var av_name = "threeSATtoHCCON";

  $(".avcontainer").on("jsav-message" ,  function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
  });
  $(".avcontainer").on("jsav-updatecounter" ,  function(){
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  var jsav = new JSAV(av_name);

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

  var x= 200 , y1 = 10 , r = 15;

  var label1, label2, label3, label4, label5, label6,label7,label8,label9,label10,label11,
      g, g1, source,  target, line1, line2,
      varlabel, exprlabel,
      literalLabels = new Array(4),
      clauses = new Array(3),
      P = new Array(4),
      C = new Array(3),
      P1 = new Array(4),
      color = new Array(3),
      PLabel = new Array(4),
      PE = new Array(4),
      PE1 = new Array(5),
      PE2 = new Array(4),
      PE3 = new Array(3);

  var y=15;

  // Slide 1
  jsav.umsg("This slideshow explains the reduction (in polynomial time) of an instance of 3CNF Satisfiability (3-SAT) to an instance of the Hamiltonian Cycle problem.");
  jsav.displayInit();

  // Slide 2
  jsav.umsg("<b>3-SAT and  HAMILTONIAN CYCLE:</b> To convert a problem instance of 3-SAT to a problem instance of Hamiltonian Cycle, we need some way to convert the collection of boolean clauses to a graph. The following construction will contain a collection of nodes for each variable, some nodes to represent the clauses, and a few extra nodes to tie everything together. There will be times where we might use more nodes than strictly necessary, but this is to make the construction process more clear.");
  jsav.step();

  // Slide 3
  jsav.umsg("In the eventual graph, each variable will be represented by its own row of nodes. Each node in the row will be be connected to the one to it's left and it's right. To help clarify the eventual construction, between each row we add a single node, that is linked to from the first and last nodes of the row above, and links in turn to the first and last nodes of the row below.<br/><br/>For example, consider a CNF expression with three variables $x_1$, $x_2$, and $x_3$.");

  label1 = jsav.label("Put here a figure like 7.49 in Sipser.", {left: 0, top: 100});
  jsav.step();

  // Slide 4
  jsav.umsg("<br/><br/>At the very top we add a node labeled $s$, and at the bottom a node labeled $t$.", {preserve: true});

  label1.hide();
  label1 = jsav.label("Add top and bottom nodes (S and T) to the figure from the last slide.", {left: 0, top: 100});
  jsav.step();

  // Slide 5
  jsav.umsg("Representing the clauses is simple: We merely add a node to represent each clause.");
  label1.hide();
  label1 = jsav.label("Add nodes for $C_1$ and $C_2$.", {left: 0, top: 100});
  
  jsav.step();

  // Slide 6
  label1.hide();
  jsav.umsg("<br/>This begs the question: How do we connect the clause nodes to the graph? Before we can answer that, let's consider how many nodes we need in each row.", {preserve: true});
  jsav.step();

  // Slide 7
  jsav.umsg("<br/>We will be associating clauses to variables by using two nodes from the row for the given variable: One to go to the associated clause node and one to come back. So we need at least $2k$ nodes where $k$ is the number of clauses. But we will see that we want to make sure that things work appropriately with the rows (explained soon). For this reason we want an extra node to come between each pair of nodes that we are using for a given clause. So we need to add $k+1$ nodes. Plus a start and end node to make things clearer. So each variable will be represented by a row of $3k +3$ nodes.", {preserve: true});
  jsav.step();

  // Slide 8
  // HIDE THE GRAPH AND START OVER NOW
  jsav.umsg("Now let's see the graph that would be constructed for the example expression $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$");
  jsav.step();

  // Slide 9
  jsav.umsg("<br/>First, here are the nodes for the three variables. Since in our example $k = 2$ (two clauses), we need $3 * 2 + 3 = 9$ nodes for each variable.", {preserve: true});
  jsav.step();

  // Slide 9
  jsav.umsg("<br/>Next, we add the nodes representing the two clauses.", {preserve: true});
  jsav.step();


  // Slide 9
  jsav.umsg("<br/>Finally, for each clause we add edges corresponding to the variables in that clause. We have an edge going from the associated variable row to the clause, and one going from the clause to the associated variable row. If the variable $i$ occurs in clause $j$, we draw an edge from node $3k + 2$ to the clause, and an edge from the clause to $3k + 3$. If the clause has instead the negation of the variable, we reverse the direction of the edges.", {preserve: true});
  jsav.step();

  // Slide 10
  jsav.umsg("Now we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$");
  jsav.step();

  // Slide 11
  jsav.umsg("Now we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.<br/><br/>Add $x_1$ from Clause 1");
  jsav.step();

  // Slide 12
  jsav.umsg("Now we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.<br/><br/>Add $x_2$ from Clause 1");
  jsav.step();

  // Slide 13
  jsav.umsg("Now we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.<br/><br/>Add $\\overline(x_3)$ from Clause 1");
  jsav.step();

  // Slide 14
  jsav.umsg("Now we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.<br/><br/>Add $\\overline(x_1)$ from Clause 2");
  jsav.step();

  // Slide 15
  jsav.umsg("Now we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.<br/><br/>Add $x_2$ from Clause 2");
  jsav.step();

  // Slide 16
  jsav.umsg("Now we add the pairs one by one. Recall that we are constructing the graph for the expression: $(x_1 + x_2 + \\overline{x_3}).(\\overline{x_1} + x_2 + x_3)$.<br/><br/>Add $x_3$ from Clause 2");
  jsav.step();

  // Slide 17
  // HIDE THE GRAPH AT THIS POINT.
  jsav.umsg("That completes the construction. All that we need to do now is find the Hamiltonian Cycle and the corresponding variable assignment. Note that for each variable, all the nodes (1) need to be visited, meaning that (2) the row has to be processed either left-to-right or right-to-left. The only exception is that we can jump out to a variable and back for an associated variable assigned to be true (or its negation assigned to be false). Note that the extra nodes that we added make sure that its not possible to make a cycle by doing something like jumping from a variable row to a given clause and then back to another variable row... doing that can't possibly lead to a proper Hamiltonian Cycle that includes all nodes in the graph.");
  jsav.step();

  // Slide 18
  jsav.umsg("<br><b>Insights about the constructed graph</b><br><br><br>");

  label1=jsav.label("1. Any Hamiltonian Cycle in the constructed graph ($G$) traverses"
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

  // Slide 19
  label1.hide();
  jsav.umsg("<br><b>3-SAT and Hamiltonian Cycle</b>");
  label1=jsav.label("1. <b>If there exists a Hamiltonian cycle $H$ in the graph $G$,"
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

  // Slide 20
  label2=jsav.label("2. <b>If there exists a satisfying assignment for the 3 CNF</b>,"
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

  // Slide 21
  jsav.umsg("<br><b>Hamiltonian Cycle in the constructed graph</b><br><br><br>");
  label1 = jsav.label("The graph $G$ has a Hamiltonian cycle<br>" , {left:0,top:y-30});
  jsav.step();

  // Slide 22
  label1.hide();
  jsav.umsg("<br><b>Assignment for 3-SAT</b><br><br><br>");
  label1=jsav.label("From the Hamiltonian cycle below the assignment is : <br>"
                    +"<b>$x_1 = True$  ,  $x_2 = False$  ,  $x_3 = True$  ,  $x_4 = False$</b><br><br>",
                    {left:0,top:y-30});
  jsav.step();

  // Slide 23
  label1.hide();
  jsav.umsg("<br><b>Satisfiability of 3-CNF</b><br><br><br>");
  jsav.step();

  
  // Slide 24
  jsav.umsg("From the Hamiltonian cycle below the assignment is : <br><br>",
            {'preserve':true});
  label1=jsav.label("<b>$x_1 = True$, $x_2 = False$, $x_3 = True$, $x_4 = False$</b><br><br>"+
                    "The above assignment satisfies the 3CNF ($x_1$ + $x_2$ + "+
                    "$\\overline{x_3}$).($\\overline{x_2}$ + $x_3$ + $x_4$).($x_1$ + "
                    +"$\\overline{x_2}$ + $x_4$)<br>" , {left:0,top:y+0});
  jsav.recorded();
});
