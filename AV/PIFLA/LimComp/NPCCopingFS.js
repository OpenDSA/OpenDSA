// Written by Yijing Wu and Cliff Shaffer
$(document).ready(function(){
  "use strict";

  var av_name = "NPCCopingFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Finding that your problem is NP-complete might not mean that you can just forget about it. Traveling salesmen need to find reasonable sales routes regardless of the complexity of the problem.<br/><br/>What do you do when faced with an NP-complete problem that you must solve?");
  av.displayInit();

  // Frame 2
  av.umsg("There are several coping techniques to try. One approach is to run only small instances of the problem.<br/><br/>For some problems, this is not acceptable. For example, TRAVELING SALESMAN grows so quickly that it cannot be run on modern computers for problem sizes much over 30 cities, which is not an unreasonable problem size for real-life situations.<br/><br/>However, some other problems in NP, while requiring exponential time, still grow slowly enough that they allow solutions for problems of a useful size.");
  av.step();

  // Frame 3
  av.umsg("Consider the <i>Knapsack problem</i>. There is a <b>dynamic programming</b> algorithm whose cost is $\\Theta(nK)$ for $n$ objects being fit into a knapsack of size $K$. But it turns out that Knapsack is NP-complete.<br/><br/>Isn't this a contradiction? Not when we consider the relationship between $n$ and $K$.<br/><br/>How big is $K$? Input size is typically $O(n \\log K)$ because the item sizes are smaller than $K$. Thus, $\\Theta(nK)$ is exponential on input size.");
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("pseudo"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("cope"));
  av.step();

  // Frame 6
  av.umsg("For example, while the VERTEX COVER and K-CLIQUE problems are NP-complete in general, there are polynomial time solutions for bipartite graphs (i.e., graphs whose vertices can be separated into two subsets such that no pair of vertices within one of the subsets has an edge between them).");
  av.step();

  // Frame 7
  av.umsg(" 2-SATISFIABILITY (where every clause in a Boolean expression has at most two literals) has a polynomial time solution. Several geometric problems require only polynomial time in two dimensions, but are NP-complete in three dimensions or more.");
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("guarantee"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("backtrack"));
  av.step();


  // Frame 10
  av.umsg("We can view this as a tree of solutions by considering that we have a choice of making the first variable TRUE or FALSE. <br><br>Thus, we can put all solutions where the first variable is TRUE on one side of the tree, and the remaining solutions on the other.<br><br> We then examine the solutions by moving down one branch of the tree, until we reach a point where we know the solution cannot be correct (such as if the current partial collection of assignments yields an unsatisfiable expression). ");
  av.step();

  // Frame 11
  av.umsg("At this point we backtrack and move back up a node in the tree, and then follow down the alternate branch. <br><br>If this fails, we know to back up further in the tree as necessary and follow alternate branches, until finally we either find a solution that satisfies the expression or exhaust the tree. <br><br>In some cases we avoid processing many potential solutions, or find a solution quickly. In others, we end up visiting a large portion of the 2<sup>n</sup> possible solutions.");
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("branch"));
  av.step();

  // Frame 13
  av.umsg("However, we remember the best value found so far. Proceeding down a given branch is equivalent to deciding which order to visit cities. So any node in the solution tree represents some collection of cities visited so far. <br><br>If the sum of these distances exceeds the best tour found so far, then we know to stop pursuing this branch of the tree. At this point we can immediately back up and take another branch. If we have a quick method for finding a good (but not necessarily best) solution, we can use this as an initial bound value to effectively prune portions of the tree.");
  av.step();


  // Frame 14
  av.umsg("Another coping strategy is to find an approximate solution to the problem, called an <b>approximation algorithm</b>. There are many approaches to finding approximate solutions. One way is to use a <b>heuristic</b> to solve the problem, that is, an algorithm based on a <q>rule of thumb</q> that does not always give the best answer.");
  av.step();

  // Frame 15
  av.umsg("For example, the TRAVELING SALESMAN problem can be solved approximately by using the heuristic that we start at an arbitrary city and then always proceed to the next unvisited city that is closest. This rarely gives the shortest path, but the solution might be good enough. There are many other heuristics for TRAVELING SALESMAN that do a better job.");
  av.step();


  // Frame 16
  av.umsg(Frames.addQuestion("approx"));
  av.step();

  // Frame 17
  av.umsg("For example, consider this simple heuristic for the VERTEX COVER problem: Let <b>M</b> be a maximal (not necessarily maximum) matching in <b>G</b>. A matching pairs vertices (with connecting edges) so that no vertex is paired with more than one partner.<br><br> Maximal means to pick as many pairs as possible, selecting them in some order until there are no more available pairs to select. Maximum means the matching that gives the most pairs possible for a given graph. If OPT is the size of a minimum vertex cover, then <b>|M|≤2⋅OPT</b> because at least one endpoint of every matched edge must be in any vertex cover.");
  av.step();

  // Frame 18
  av.umsg("A better example of a guaranteed bound on a solution comes from simple heuristics to solve the BIN PACKING problem.");
  av.step();

  // Frame 19
  av.umsg("BIN PACKING in its decision form (i.e., asking if the items can be packed in less than k bins) is known to be NP-complete. One simple heuristic for solving this problem is to use a <q>first fit</q> approach. <br><br>We put the first number in the first bin. We then put the second number in the first bin if it fits, otherwise we put it in the second bin. For each subsequent number, we simply go through the bins in the order we generated them and place the number in the first bin that fits. <br><br>The number of bins used is no more than twice the sum of the numbers, because every bin (except perhaps one) must be at least half full. ");
  av.step();

  // Frame 20
  av.umsg("However, this <q>first fit</q> heuristic can give us a result that is much worse than optimal. Consider the following collection of numbers: 6 of 1/7+ϵ, 6 of 1/3+ϵ, and 6 of 1/2+ϵ, where ϵ is a small, positive number. Properly organized, this requires 6 bins. But if done wrongly, we might end up putting the numbers into 10 bins.");
  av.step();

  // Frame 21
  av.umsg("A better heuristic is to use decreasing first fit. This is the same as first fit, except that we keep the bins sorted from most full to least full. Then when deciding where to put the next item, we place it in the fullest bin that can hold it. ");
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("heuristic"));
  av.step();

  // Frame 23
  av.umsg("The theory of NP-completeness gives a technique for separating tractable from (probably) intractable problems. When faced with a new problem, we might alternate between checking if it is tractable (that is, we try to find a polynomial-time solution) and checking if it is intractable (we try to prove the problem is NP-complete). ");
  av.step();

  // Frame 24
  av.umsg("While proving that some problem is NP-complete does not actually make our upper bound for our algorithm match the lower bound for the problem with certainty, it is nearly as good. ");
  av.step();

  // Frame 25
  av.umsg("Once we realize that a problem is NP-complete, then we know that our next step must either be to redefine the problem to make it easier, or else use one of the <q>coping</q> strategies discussed in this section.");
  av.step();

  // Frame 26
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
