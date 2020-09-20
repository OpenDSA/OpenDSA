.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: 
   :requires:
   :satisfies:
   :topic: Dynamic Programming 

Dynamic Programming 
====================

Dynamic programming is an algorithm design technique for optimization problems that can improve the efficiency of any inherently recursive algorithm that repeatedly re-solves the same subproblems. Using dynamic programming requires two steps:

1.You find a recursive solution to a problem where subproblems are redundantly solved many times.

2.Optimize the recursive algorithm to eliminate re-solving subproblems. The resulting algorithm may be recursive or iterative. The iterative form is commonly referred to by the term dynamic programming.

We will see first how to remove redundancy with a simple, non-optimization problem. We then go to an optimization problem, which will be efficiently solved by dynamic programming.

Computing Fibonacci Numbers
----------------------------
Consider the recursive function for computing the :math:`n^{th}` Fibonacci number.

.. code-block:: java

    /** Recursively generate and return the n'th Fibonacci 
	    number */

	static long fibr(int n) {

	  // fibr(91) is the largest value that fits in a long

	  if ((n <= 0) || (n > 91)) return -1;

	  if ((n == 1) || (n == 2)) return 1;     // Base case

	  return fibr(n-1) + fibr(n-2);      // Recursive call

	}
	





The cost of this algorithm (in terms of function calls) is the size of the n'th Fibonacci number itself, which our analysis of Module 
.. :ref`summation <summation> <Summation>`
showed to be exponential (approximately 1.62n). 
Why is this so expensive? Primarily because two recursive calls are made by the function, and the work that they do is largely redundant. 
That is, each of the two calls is recomputing most of the series, as is each sub-call, and so on. Thus, the smaller values of the function are being recomputed a huge number of times. 
If we could eliminate this redundancy, the cost would be greatly reduced. The approach that we will use can also improve any algorithm that spends most of its time recomputing common subproblems.


The upper half of the following figure shows the recursion tree obtained for n=8, and it has 67 nodes. 
However, the lower half of the figure shows that the number of unique subproblems is only n+1=9. 
The latter graphical representation is called a dependency graph, and was obtained from the recursion tree by joining different occurrences of the same recursive call, preserving their corresponding arcs.

Note that the dependency graph was laid out on in a one dimensional table of size 9, corresponding to the unique subproblems invoked by the algorithm. 
This table can simply store the value of each subproblem. 
In this way, redundant calls can be avoided because the value of a subproblem which was previously computed can be read from its corresponding cell in the table without the need to recompute it again.

The table can be used to derive two alternative, but efficient, algorithms. 
One way to accomplish this goal is to keep a table of values, and first check the table to see if the computation can be avoided.
This technique is called memoization.
Here is a straightforward example of doing so. 
Note that it mirrors the original version of the Fibonacci recursive algorithm.

.. code-block:: java

	int fibrt(int n) {

	  // Assume Values has at least n slots, and all

	  // slots are initialized to 0

	  if ((n <= 0) || (n > 91)) return -1;

	  if (n <= 2) return 1;             // Base case

	  if (Values[n] == 0)

	    Values[n] = fibrt(n-1) + fibrt(n-2);

	  return Values[n];

	}

This version of the algorithm will not compute a value more than once, so its cost is linear.
The corresponding recursion tree is shown below.
Note that the first occurrence of each recursive call invokes two recursive calls. 
However, subsequent occurrences of such a call do not produce additional calls because they just read the contents of its corresponding cell.

.. image::  Images/FibTree.png
	:width: 1200


.. odsafig::  Images/FibGraph.png
	:width: 600
	:align: center

A second technique is called tabulation. 
The dependency graph must be analyzed to infer an alternative computation order for the subproblems. 
The only restriction is that a subproblem can only be computed when the subproblems it depends on have been computed. 
In addition, the value of each subproblem must be stored in the table.
In the case of computing a value in the Fibonacci series, we reverse the order to calculate the series from the starting point, and implement this by a simple loop. 
Unfortunately, since it does not have any similarity to the original recursive algorithm, there is no mechanical way to get from the original recursive form to the dynamic programming form.

An additional optimization can be made. 
Of course, we didn't actually need to use a table storing all of the values, since future computations do not need access to all prior subproblems. 
Instead, we could build the value by working from 0 and 1 up to n rather than backwards from n down to 0 and 1.
Going up from the bottom we only need to store the previous two values of the function, as is done by our iterative version.

.. code-block:: java

	/** Iteratively generate and return the n'th Fibonacci
	    number **/

	static long fibi(int n) {

	  // fibr(91) is the largest value that fits in a long

	  if ((n <= 0) || (n > 91)) return -1;

	  long curr, prev, past;

	  if ((n == 1) || (n == 2)) return 1;

	  curr = prev = 1;     // curr holds current Fib value

	  for (int i=3; i<=n; i++) { // Compute next value

	    past = prev;             // past holds fibi(i-2)

	    prev = curr;             // prev holds fibi(i-1)

	    curr = past + prev;      // curr now holds fibi(i)

	  }

	  return curr;

	}

Recomputing of subproblems comes up in many algorithms. 
It is not so common that we can store only a few prior results as we did for ``fibi``. Thus, there are many times where storing a complete table of subresults will be useful.
The approach shown above to designing an algorithm that works by storing a table of results for subproblems is called (LINK)dynamic programming when it is applied to optimization algorithms. 
The name is somewhat arcane, because it doesn't bear much obvious similarity to the process that is taking place when storing subproblems in a table.
However, it comes originally from the field of dynamic control systems, which got its start before what we think of as computer programming. 
The act of storing precomputed values in a table for later reuse is referred to as "programming" in that field. 
Dynamic programming algorithms are usually implemented with the tabulation technique described above. 
Thus, ``fibi`` better represents the most common form of dynamic programming than does ``fibrt``, even though it doesn't use the complete table.

The Knapsack Problem
---------------------
We will next consider a problem that appears with many variations in a variety of commercial settings. Many businesses need to package items with the greatest efficiency. One way to describe this basic idea is in terms of packing items into a knapsack, and so we will refer to this as the Knapsack Problem. We will first define a particular formulation of the knapsack problem, and then we will discuss an algorithm to solve it based on dynamic programming. There are many other versions for the problem.

Assume that we have a knapsack with a certain amount of space that we will define using integer value K. We also have n items each with a certain size such that item i has integer size :math:`k_{i}`. The problem is to find a subset of the n items whose sizes sum as closest as possible to K. For example, if our knapsack has capacity K=5 and the two items are of size :math:`k_{1}=2` and :math:`k_{2}=4`, then the second object can be selected, occupying 4 units of the knapsack. But if we add a third item of size :math:`k_{3}=1`, then we can also select the third item, filling the knapsack exactly. 

We can define the problem more formally as: Find S ⊂ {1,2,...,n} such that 

∑   ∈ S :math:`k_{i}` < K is maximized

and

∑ i ∈ S :math:`k_{i}` < K

.. '∑i∈Ski' 
.. and
.. ∑i∈Ski ≤ K

.. topic:: Example

	Assume that we are given a knapsack of size K=163 and 10 items of sizes 4, 9, 15, 19, 27, 44, 54, 68, 73, 101. What subset of the items fills the knapsack the most? You should take a few minutes and try to do this before reading on and looking at the answer.

.. topic:: Example

	Having solved the previous example for knapsack of size 163, how hard is it now to solve for a knapsack of size 164? Try it.

Unfortunately, knowing the answer for 163 is of almost no use at all when solving for 164. One solution that also fills the knapsack is: 9, 54, 101.

If you tried solving these examples, you probably found yourself doing a lot of trial-and-error and a lot of backtracking. To come up with an algorithm, we want an organized way to go through the possible subsets. Is there a way to make the problem smaller, so that we can apply recursion?

We essentially have two parts to the input: 

The knapsack size K and the n items. It probably will not do us much good to try and break the knapsack into pieces and solve the sub-pieces (since we already saw that knowing the answer for a knapsack of size 163 did nothing to help us solve the problem for a knapsack of size 164).

So, what can we say about solving the problem with or without the n'th item? This seems to lead to a way to break down the problem. If the n'th item is not needed for a solution (that is, if we can solve the problem with the first n−1 items) then we can also solve the problem when the n'th item is available (we just ignore it). 

On the other hand, if we do include the n'th item as a member of the solution subset, then we now would need to solve the problem with the first n−1 items and a knapsack of size K−kn (since the n'th item is taking up kn space in the knapsack).

To organize this process, we can define the problem in terms of two parameters: the knapsack size K and the number of items n. Denote a given instance of the problem as P(n,K). Now we can say that P(n,K) computes an optimal solution by choosing the best solution from either P(n−1,K) or P(n−1,K−kn)+ kn. 

That is, we can solve P(n,K) only if we can solve one of the sub problems where we use or do not use the n th item. Of course, the ordering of the items is arbitrary. We just need to give them some order to keep things straight.

Continuing this idea, to solve any subproblem of size n−1, we need only to solve two subproblems of size n−2. And so on, until we are down to only one item that either fits the knapsack or not. Assuming that P(i,s) represents the problem for object i and after, and with size s still free in the knapsack, the following algorithm expresses the ideas ideas:

.. code-block:: java

	if (i==0)

	   if (s>=k0)

	      return k0;

	   else

	      return 0;

	else

	    if (s<ki)

	      return P(i-1,s);

	   else

	 return max (P(i-1,s), P(i-1,s-ki)+ki);


Although this algorithm is correct, it naturally leads to a cost expressed by the recurrence relation T(n)=2T(n−1)+c=Θ(2n). That can be pretty expensive!

But... we should quickly realize that there are only n(K+1) subproblems to solve! Clearly, there is the possibility that many subproblems are being solved repeatedly. This is a natural opportunity to apply dynamic programming. If we draw the recursion tree of this naive recursive algorithm and derive its corresponding dependency graph, we notice that all the recursive calls can be laid out on an array of size n×K+1 to contain the solutions for all subproblems P(i,k),0≤i≤n-1,0≤k≤K.

.. topic:: Example

	Although this algorithm is correct, it naturally leads to a cost expressed by the recurrence relation T(n)=2T(n−1)+c=Θ(2n). That can be pretty expensive!

	But... we should quickly realize that there are only n(K+1) subproblems to solve!

	Clearly, there is the possibility that many subproblems are being solved repeatedly.

	This is a natural opportunity to apply dynamic programming. If we draw the recursion tree of this naive recursive algorithm and derive its corresponding dependency graph, we notice that all the recursive calls can be laid out on an array of size n×K+1 to contain the solutions for all subproblems 

	P(i,k),0 ≤ i ≤ n-1, 0≤k≤K.

.. topic:: Example

	Consider the instance of the Knapsack Problem for K=10 and five items with sizes 9, 2, 7, 4, 1. The recursion tree generated by 	the recursive algorithm follows, where each node contains the index of the object under consideration (from 0 to 4) and the size 	available of the knapsack.


.. odsafig:: Images/knapsack4_10.png
	:width: 600
	:align: center

The dependency graph for this problem instance, laid out in a table of size n×K+1 follows:

.. odsafig::  Images/knapsack_depgraph.png
	:width: 600
	:height: 250px
	:align: center

As mentioned above, there are two approaches to actually solving the problem. One is memoization, that is, to start with our problem of size P(n,K) and make recursive calls to solve the subproblems, each time checking the array to see if a subproblem has been solved, and filling in the corresponding cell in the array whenever we get a new subproblem solution. 

The other is tabulation. Conceivably we could adopt one of several computation orders, although the most "natural" is to start filling the array for row 0 (which indicates a successful solution only for a knapsack of size k0). We then fill in the succeeding rows from i=1 to n, left to right, as follows.

In other words, a new slot in the array gets its solution by looking at most at two slots in the preceding row. Since filling each slot in the array takes constant time, the total cost of the algorithm is Θ(nK).

.. topic:: Example

	Consider again the instance of the Knapsack Problem for K=10 and five items with sizes 9, 2, 7, 4, 1. 

	A tabulation algorithm will fill a table of size n×K+1 starting from object i=0 up to object i=4, filling all the cells in the table in a top-down fashion.

	In the table shown above, P(4,10) stores value 10, thus the five objects allow filling the knapsack completely. P(4,10) is computed from two other cells, P(3,9) and P(3,10). The former contains the value 9, which added to k4=1 is equal to 10; the latter equals 9.The maximum of both values is 10. Thus, object 4 must be inserted into the knapsack. 

	By tracing back P(3,9), we may determine the sequence of decisions that lead to this optimal solution. We will find out that an optimal solution to this subproblem comes from taking any of two equally-valued solutions: including k0=9, or including k1 and k2, of sizes 2 and 7, respectively.

	Note that the table is first filled top-down (in the figure) with the values of the different subproblems, and we later infer bottom-up (in the figure) the sequence of decisions that produced the optimal solution contained in the table cell that represents the complete problem. This last phase of the algorithm precludes the possibility of actually reducing the size of the table. Otherwise, the table for the knapsack problem could have been reduced to a one dimensional array.
