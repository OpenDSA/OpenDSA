// Written by Yijing Wu and Cliff Shaffer
$(document).ready(function(){
  "use strict";

  var av_name = "TravelSalesmanFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("There are several ways that a problem could be considered hard. For example, we might have trouble understanding the definition of the problem itself. At the beginning of a large data collection and analysis project, developers and their clients might have only a hazy notion of what their goals actually are, and need to work that out over time.");
  av.displayInit();

  // Frame 2
  av.umsg("For other types of problems, we might have trouble finding or understanding an algorithm to solve the problem. Understanding spoken English and translating it to written text is an example of a problem whose goals are easy to define, but whose solution is not easy to discover.<br/><br/>But even though a natural language processing algorithm might be difficult to write, the program's running time might be fairly fast. There are many practical systems today that solve aspects of this problem in reasonable time.");
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("expensive"));
  av.step();

  // Frame 4
  av.umsg("One example of a hard problem is Towers of Hanoi. It is easy to understand this problem and its solution. It is also easy to write a program to solve this problem. But, it takes an extremely long time to run for any reasonably large value of $n$. Try running a program to solve Towers of Hanoi for only 30 disks! It would take a long time.");
  av.step();

  // Frame 5
  av.umsg("The Towers of Hanoi problem takes exponential time, that is, its running time is $\\Theta(2^n)$ on an input of $n$ disks. This is radically different from an algorithm that takes $\\Theta(n \\log n)$ time or $\\Theta(n^2)$ time. It is even radically different from a problem that takes $\\Theta(n^4)$ time. These are all examples of <b>polynomial</b> running time, because the exponents for all terms of these equations are constants.");
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("TOH"));
  av.step();

  // Frame 7
  av.umsg("If we buy a new computer that runs twice as fast, the size of problem with complexity $\\Theta(n)$ that we can solve in a certain amount of time is increased by a factor of 2. For a problem with complexity of $\\Theta(n^2)$, a computer twice as fast can solve a problem that is bigger by a factor of $\\sqrt{2}$ in the same amount of time. In other words, there is a multiplicative factor increase, even if it is a rather small one. This is true for any algorithm whose running time can be represented by a polynomial.");
  av.step();

  // Frame 8
  av.umsg("Consider what happens if you buy a computer that is twice as fast and try to solve a bigger Towers of Hanoi problem in a given amount of time. <br><br>Because its complexity is Θ(2<sup>n</sup>), we can solve a problem only one disk bigger! There is no multiplicative factor, and this is true for any exponential algorithm: A constant factor increase in processing power results in only a fixed addition in problem-solving power.");
  av.step();

  // Frame 9
  av.umsg("There are other fundamental differences between polynomial running times and exponential running times that argues for treating them as qualitatively different. <br><br>Polynomials are closed under composition and addition. Thus, running polynomial-time programs in sequence, or having one program with polynomial running time call another a polynomial number of times yields polynomial time.<br/><br/>Also, all computers known are polynomially related. That is, any program that runs in polynomial time on any computer today, when transferred to any other computer, will still run in polynomial time.");
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("practical"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("exponential"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("notgray"));
  av.step();

  // Frame 13
  av.umsg("We will consider an algorithm to be expensive if it runs in exponential time, that is, in $\\Theta(c^n)$ for some constant $c > 1$. A definition for a hard problem will be presented next.");
  av.step();

  // Frame 14
  av.umsg("<b>The Theory of NP-Completeness</b><br/><br/>Imagine a nondeterministic computer that works by guessing the correct solution from among a finite set of the possible solutions to a problem.<br/><br/>Another way to look at this is to imagine a super-parallel computer that could test all possible solutions simultaneously. Certainly this nondeterministic (or highly parallel) computer can do anything a normal computer can do. It might also solve some problems more quickly than a normal computer can.");
  av.step();

  // Frame 15
  av.umsg("Consider some problem where, given a guess for a solution, checking the solution to see if it is correct can be done in polynomial time. Even if the number of possible solutions is exponential, any given guess can be checked in polynomial time nondeterministically (equivalently, all possible solutions are checked simultaneously in polynomial time by a super-parallel computer), and thus the problem can be solved in polynomial time by our hypothetical computer.<br/><br/>Another view of this concept is this: If you cannot get the answer to a problem in polynomial time by guessing the right answer and then checking it, then you cannot do it in polynomial time in any other way.");
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("NP"));
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("nonNP"));
  av.step();

  // Frame 18
  av.umsg("On the other hand, consider the TRAVELING SALESMAN problem.<br><br> <b><u>Problem</u></b> <br> TRAVELING SALESMAN (1) <br><b>Input:</b> A complete, directed graph G with positive distances assigned to each edge in the graph. <br><b>Output:</b> The shortest simple cycle that includes every vertex.");
  av.step();

  // Frame 19
  av.umsg("This figure illustrates the problem. Five vertices are shown, with edges and associated costs between each pair of edges. (For simplicity we show an undirected graph, assuming that the cost is the same in both directions, though this need not be the case.)");
  var graph = av.ds.graph({width: 300, height: 300, layout: "manual", directed: false});
  var a = graph.addNode("A", {left: 80, top: 80});
  var b = graph.addNode("B", {left: 220, top: 80});
  var c = graph.addNode("C", {left: 280, top: 210});
  var d = graph.addNode("D", {left: 150, top: 290});
  var e = graph.addNode("E", {left: 20, top: 210});
  graph.addEdge(a, b, {weight: "2"});
  graph.addEdge(a, c, {weight: "3"});
  graph.addEdge(a, d, {weight: "8"});
  graph.addEdge(a, e, {weight: "3"});
  graph.addEdge(b, c, {weight: "6"});
  graph.addEdge(b, d, {weight: "1"});
  graph.addEdge(b, e, {weight: "2"});
  graph.addEdge(c, e, {weight: "4"});
  graph.addEdge(d, e, {weight: "1"});
  graph.addEdge(c, d, {weight: "1"});
  graph.layout();
  av.step();

  // Frame 20
  av.umsg("If the salesman visits the cities in the order ABCDEA, they will travel a total distance of 13. A better route would be ABDCEA, with cost 11. The best route for this particular graph would be ABEDCA, with cost 9.");
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("TS"));
  av.step();

  // Frame 22
  av.umsg("However, we can solve a variant of this problem cast in the form of a <b>decision problem</b>. A decision problem is simply one whose answer is either YES or NO. The decision problem form of TRAVELING SALESMAN is as follows.");
  av.step();

  // Frame 23
  av.umsg("<b><u>Problem</u></b> <br> TRAVELING SALESMAN (2) <br><b>Input:</b> A complete, directed graph $G$ with positive distances assigned to each edge in the graph, and an integer $k$.<br/><b>Output:</b> YES if there is a simple cycle with total distance $\\leq k$ containing every vertex in $G$, and NO otherwise.");
  av.step();

  // Frame 24
  av.umsg("We can solve this version of the problem in polynomial time with a non-deterministic computer. The non-deterministic algorithm simply guesses the right answer (if there is one) and confirms it in polynomial time. Viewed another way, it checks all of the possible solutions in parallel. If any solution is an appropriate cycle of total length $\\leq k$, the answer is YES; otherwise the answer is NO.");
  av.step();

  // Frame 25
  av.umsg("Note that it is only necessary that some subset meet the requirement; it does not matter how many subsets fail. Checking a particular subset is done in polynomial time by adding the distances of the edges and verifying that the edges form a cycle that visits each vertex exactly once. Thus, the checking algorithm runs in polynomial time.");
  av.step();

  // Frame 26
  av.umsg(Frames.addQuestion("TSexpensive"));
  av.step();

  // Frame 27
  av.umsg(Frames.addQuestion("NPcomplete"));
  av.step();

  // Frame 28
  av.umsg("What is truly strange and fascinating about NP-complete problems is that if anybody ever finds the solution to any one of them that runs in polynomial time on a regular computer, then by a series of reductions, every other problem that is in NP can also be solved in polynomial time on a regular computer!");
  av.step();

  // Frame 29
  av.umsg(Frames.addQuestion("NPhard"));
  av.step();


  // Frame 30
  av.umsg("The requirement that a problem be NP-hard might seem to be impossible, but in fact there are hundreds of such problems, including TRAVELING SALESMAN.");
  av.step();

  // Frame 31
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
