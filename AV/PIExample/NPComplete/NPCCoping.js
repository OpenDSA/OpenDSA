$(document).ready(function(){
    "use strict";

    var av_name = "NPCCoping";
    var av = new JSAV(av_name);


var Frames = PIFRAMES.init(av_name);
// Load the config object with interpreter and code created by odsaUtils.js
var config = ODSA.UTILS.loadConfig({av_name: av_name}),
interpret = config.interpreter, // get the interpreter
code = config.code;             // get the code object
var goNext = false;





//frame 1
av.umsg("Finding that your problem is NP-complete might not mean that you can just forget about it. Traveling salesmen need to find reasonable sales routes regardless of the complexity of the problem.");
av.displayInit();



//2
av.umsg("What do you do when faced with an NP-complete problem that you must solve? <br><br>There are several techniques to try. One approach is to run only small instances of the problem. For some problems, this is not acceptable. ");
av.step();

//3
av.umsg("For example, TRAVELING SALESMAN grows so quickly that it cannot be run on modern computers for problem sizes much over 30 cities, which is not an unreasonable problem size for real-life situations. <br><br>However, some other problems in NP, while requiring exponential time, still grow slowly enough that they allow solutions for problems of a useful size.");
av.step();

//4
av.umsg(Frames.addQuestion("q1"));
av.step();

//5
av.umsg("Consider the <i>Knapsack problem</i>. We have a <i>dynamic programming</i> algorithm whose cost is <b>Θ(nK)</b> for <b>n</b> objects being fit into a knapsack of size <b>K</b>. But it turns out that Knapsack is NP-complete.<br><br>Isn't this a contradiction? Not when we consider the relationship between <b>n</b> and <b>K</b>. <br><br>How big is <b>K</b>? Input size is typically <b>O(nlgK)</b> because the item sizes are smaller than <b>K</b>. Thus, <b>Θ(nK)</b> is exponential on input size.");
av.step();

//6
av.umsg("This dynamic programming algorithm is tractable if the numbers are <q>reasonable</q>. That is, we can successfully find solutions to the problem when <b>nK</b> is in the thousands.<br><br>Such an algorithm is called a pseudo-polynomial time algorithm. This is different from TRAVELING SALESMAN which cannot possibly be solved when <b>n=100</b> given current algorithms.");
av.step();

//7
av.umsg(Frames.addQuestion("q2"));
av.step();

//8
av.umsg("A second approach to handling NP-complete problems is to solve a special instance of the problem that is not so hard. For example, many problems on graphs are NP-complete, but the same problem on certain restricted types of graphs is not as difficult.");
av.step();

//9
av.umsg(Frames.addQuestion("q3"));
av.step();

//10
av.umsg("For example, while the VERTEX COVER and K-CLIQUE problems are NP-complete in general, there are polynomial time solutions for bipartite graphs (i.e., graphs whose vertices can be separated into two subsets such that no pair of vertices within one of the subsets has an edge between them). ");
av.step();

//11
av.umsg(" 2-SATISFIABILITY (where every clause in a Boolean expression has at most two literals) has a polynomial time solution. Several geometric problems require only polynomial time in two dimensions, but are NP-complete in three dimensions or more. <br><br>KNAPSACK is considered to run in polynomial time if the numbers (and K) are <q>small</q>. Small here means that they are polynomial on n, the number of items.");
av.step();


//12
av.umsg("In general, if we want to guarantee that we get the correct answer for an NP-complete problem, we potentially need to examine all of the (exponential number of) possible solutions. <br><br>However, with some organization, we might be able to either examine them quickly, or avoid examining a great many of the possible answers in some cases. <br><br>For example, <i>dynamic programming</i> attempts to organize the processing of all the subproblems to a problem so that the work is done efficiently.");
av.step();

//13
av.umsg(Frames.addQuestion("q4"));
av.step();

//14
av.umsg("If we need to do a brute-force search of the entire <i>solution space</i>, we can use <i>backtracking</i> to visit all of the possible solutions organized in a <i>solution tree</i>. <br><br>For example, SATISFIABILITY has 2<sup>n</sup> possible ways to assign truth values to the n variables contained in the Boolean expression being satisfied.");
av.step();

//15
av.umsg(Frames.addQuestion("q5"));
av.step();


//16
av.umsg("We can view this as a tree of solutions by considering that we have a choice of making the first variable TRUE or FALSE. <br><br>Thus, we can put all solutions where the first variable is TRUE on one side of the tree, and the remaining solutions on the other.<br><br> We then examine the solutions by moving down one branch of the tree, until we reach a point where we know the solution cannot be correct (such as if the current partial collection of assignments yields an unsatisfiable expression). ");
av.step();

//17
av.umsg("At this point we backtrack and move back up a node in the tree, and then follow down the alternate branch. <br><br>If this fails, we know to back up further in the tree as necessary and follow alternate branches, until finally we either find a solution that satisfies the expression or exhaust the tree. <br><br>In some cases we avoid processing many potential solutions, or find a solution quickly. In others, we end up visiting a large portion of the 2<sup>n</sup> possible solutions.");
av.step();

//18
av.umsg("<i>Banch-and-Bounds</i> is an extension of backtracking that applies to <i>optimization problems</i> such as TRAVELING SALESMAN where we are trying to find the shortest tour through the cities. We traverse the solution tree as with backtracking. ");
av.step();

//19
av.umsg(Frames.addQuestion("q6"));
av.step();

//20
av.umsg("However, we remember the best value found so far. Proceeding down a given branch is equivalent to deciding which order to visit cities. So any node in the solution tree represents some collection of cities visited so far. <br><br>If the sum of these distances exceeds the best tour found so far, then we know to stop pursuing this branch of the tree. At this point we can immediately back up and take another branch. If we have a quick method for finding a good (but not necessarily best) solution, we can use this as an initial bound value to effectively prune portions of the tree.");
av.step();


//21
av.umsg("Another coping strategy is to find an approximate solution to the problem, called an <i>approximation algorithm</i>. There are many approaches to finding approximate solutions. One way is to use a <i>heuristic</i> to solve the problem, that is, an algorithm based on a <q>rule of thumb</q> that does not always give the best answer. ");
av.step();

//22
av.umsg("For example, the TRAVELING SALESMAN problem can be solved approximately by using the heuristic that we start at an arbitrary city and then always proceed to the next unvisited city that is closest. This rarely gives the shortest path, but the solution might be good enough. There are many other heuristics for TRAVELING SALESMAN that do a better job.");
av.step();


//23
av.umsg("Some approximation algorithms have guaranteed performance, such that the answer will be within a certain percentage of the best possible answer. ");
av.step();

//24
av.umsg(Frames.addQuestion("q7"));
av.step();

//25
av.umsg("For example, consider this simple heuristic for the VERTEX COVER problem: Let <b>M</b> be a maximal (not necessarily maximum) matching in <b>G</b>. A matching pairs vertices (with connecting edges) so that no vertex is paired with more than one partner.<br><br> Maximal means to pick as many pairs as possible, selecting them in some order until there are no more available pairs to select. Maximum means the matching that gives the most pairs possible for a given graph. If OPT is the size of a minimum vertex cover, then <b>|M|≤2⋅OPT</b> because at least one endpoint of every matched edge must be in any vertex cover.");
av.step();

//26
av.umsg("A better example of a guaranteed bound on a solution comes from simple heuristics to solve the BIN PACKING problem.");
av.step();

//27
av.umsg("BIN PACKING in its decision form (i.e., asking if the items can be packed in less than k bins) is known to be NP-complete. One simple heuristic for solving this problem is to use a <q>first fit</q> approach. <br><br>We put the first number in the first bin. We then put the second number in the first bin if it fits, otherwise we put it in the second bin. For each subsequent number, we simply go through the bins in the order we generated them and place the number in the first bin that fits. <br><br>The number of bins used is no more than twice the sum of the numbers, because every bin (except perhaps one) must be at least half full. ");
av.step();

//28
av.umsg("However, this <q>first fit</q> heuristic can give us a result that is much worse than optimal. Consider the following collection of numbers: 6 of 1/7+ϵ, 6 of 1/3+ϵ, and 6 of 1/2+ϵ, where ϵ is a small, positive number. Properly organized, this requires 6 bins. But if done wrongly, we might end up putting the numbers into 10 bins.");
av.step();

//29
av.umsg("A better heuristic is to use decreasing first fit. This is the same as first fit, except that we keep the bins sorted from most full to least full. Then when deciding where to put the next item, we place it in the fullest bin that can hold it. ");
av.step();

//30
av.umsg("This is similar to the <i>best fit</i> heuristic for <i>memory management</i>. The significant thing about this heuristic is not just that it tends to give better performance than simple first fit. <br><br>This decreasing first fit heuristic can be proven to require no more than 11/9 the optimal number of bins. Thus, we have a guarantee on how much inefficiency can result when using the heuristic.");
av.step();

//31
av.umsg(Frames.addQuestion("q8"));
av.step();

//32
av.umsg("The theory of NP-completeness gives a technique for separating tractable from (probably) intractable problems. When faced with a new problem, we might alternate between checking if it is tractable (that is, we try to find a polynomial-time solution) and checking if it is intractable (we try to prove the problem is NP-complete). ");
av.step();

//33
av.umsg("While proving that some problem is NP-complete does not actually make our upper bound for our algorithm match the lower bound for the problem with certainty, it is nearly as good. ");
av.step();

//34
av.umsg("Once we realize that a problem is NP-complete, then we know that our next step must either be to redefine the problem to make it easier, or else use one of the <q>coping</q> strategies discussed in this section.");
av.step();

av.recorded();
});
