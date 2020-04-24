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

//
av.umsg("What do you do when faced with an NP-complete problem that you must solve? <br><br>There are several techniques to try. One approach is to run only small instances of the problem. For some problems, this is not acceptable. ");
av.step();

//
av.umsg("For example, TRAVELING SALESMAN grows so quickly that it cannot be run on modern computers for problem sizes much over 30 cities, which is not an unreasonable problem size for real-life situations. <br><br>However, some other problems in NP, while requiring exponential time, still grow slowly enough that they allow solutions for problems of a useful size.");
av.step();

//
av.umsg("Consider the <i>Knapsack problem</i>. We have a <i>dynamic programming</i> algorithm whose cost is <b>Θ(nK)</b> for <b>n</b> objects being fit into a knapsack of size <b>K</b>. But it turns out that Knapsack is NP-complete.<br><br>Isn't this a contradiction? Not when we consider the relationship between <b>n</b> and <b>K</b>. <br><br>How big is <b>K</b>? Input size is typically <b>O(nlgK)</b> because the item sizes are smaller than <b>K</b>. Thus, <b>Θ(nK)</b> is exponential on input size.");
av.step();

//
av.umsg("This dynamic programming algorithm is tractable if the numbers are <q>reasonable</q>. That is, we can successfully find solutions to the problem when <b>nK</b> is in the thousands.<br><br>Such an algorithm is called a pseudo-polynomial time algorithm. This is different from TRAVELING SALESMAN which cannot possibly be solved when <b>n=100</b> given current algorithms.");
av.step();

//
av.umsg("A second approach to handling NP-complete problems is to solve a special instance of the problem that is not so hard. For example, many problems on graphs are NP-complete, but the same problem on certain restricted types of graphs is not as difficult.");
av.step();

//
av.umsg("For example, while the VERTEX COVER and K-CLIQUE problems are NP-complete in general, there are polynomial time solutions for bipartite graphs (i.e., graphs whose vertices can be separated into two subsets such that no pair of vertices within one of the subsets has an edge between them). ");
av.step();

//
av.umsg(" 2-SATISFIABILITY (where every clause in a Boolean expression has at most two literals) has a polynomial time solution. Several geometric problems require only polynomial time in two dimensions, but are NP-complete in three dimensions or more. <br><br>KNAPSACK is considered to run in polynomial time if the numbers (and K) are <q>small</q>. Small here means that they are polynomial on n, the number of items.");
av.step();


//
av.umsg("In general, if we want to guarantee that we get the correct answer for an NP-complete problem, we potentially need to examine all of the (exponential number of) possible solutions. <br><br>However, with some organization, we might be able to either examine them quickly, or avoid examining a great many of the possible answers in some cases. <br><br>For example, dynamic programming attempts to organize the processing of all the subproblems to a problem so that the work is done efficiently.");
av.step();

//
av.umsg("If we need to do a brute-force search of the entire solution space, we can use backtracking to visit all of the possible solutions organized in a solution tree.");
av.step();

//
av.umsg("For example, SATISFIABILITY has 2<sup>n</sup> possible ways to assign truth values to the n variables contained in the Boolean expression being satisfied.");
av.step();

//
av.umsg("");
av.step();

//
av.umsg("");
av.step();

//
av.umsg("");
av.step();


//
av.umsg("");
av.step();

//
av.umsg("");
av.step();

//
av.umsg("");
av.step();

//
av.umsg("");
av.step();

//
av.umsg("");
av.step();

//
av.umsg("");
av.step();

//
av.umsg("");
av.step();

//
av.umsg("");
av.step();

//
av.umsg("");
av.step();

//
av.umsg("");
av.step();

//
av.umsg("");
av.step();




av.recorded();
});
