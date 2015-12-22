.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Jeremy Rodencal
   :satisfies: Knapsack
   :topic: Dynamic Programming

0/1 Knapsack Problem
====================

0/1 Knapsack Problem
--------------------

The 0/1 Knapsack problem can be defined in terms of a thief who enters the
place they will rob with a single knapsack to carry away their spoils. This
knapsack has a specified limit on the weight it can support without tearing.
This weight capacity will be refered to as CAP. After cracking open a safe, the
theif finds that the safe contains N items, each with a specific weight and
value (both are integers). The thief's goal is to maximize the total value of 
set of items they take without going over the weight limit, CAP. The "0/1"
binary qualifier in the name of this problem denotes that each item must be
entirely accepted or rejected, that is, the theif can't subdivide an item.

The first step in solving this problem is to formulate a recurcive solution,
then see if the solution can be made more efficent using dynamic programming.
To provide some insight into the problem, the following notation will be used


+----------+--------------------------------------+
|  Symbol  | Definition                           |
+==========+======================================+
|N         |is the number of items in the safe    |
+----------+--------------------------------------+
|CAP       |is the weight capacity of the knapsack|
+----------+--------------------------------------+
|WT\(i\)   |is the weight of the ith item         |
+----------+--------------------------------------+
|VALUE\(i\)|is the value of the ith item          |
+----------+--------------------------------------+
|V\(i,c\)  |i<=n c<=cap denotes the total value of|
|          |the optimal solution to a version of  |
|          |the problem in which c is the capacity|
|          |of the knapsack and only items        |
|          |1, 2, 3, ... , i are considered.      |
+----------+--------------------------------------+

The key to solving this algorithm will be to define V\(*i*, *c*\) recursively for all
*i* <= *N*, *c* <= *CAP*. Note that when *i* \= *N* and *c* \=  *CAP* in V\(*i*, *c*\), the problem has been
solved.

To create a solution for this problem, it would be best to start simple.
Consider the how V\(*i*, *c*\) can be defined when *i* = 1. In this case, we are asking
for the total value of an optimal solution when only the first item is involved
and the knapsack has a capacity of *c*. A definition of V\(*i*, *c*\) is:


| V\(1, *c*\) = VALUE\(*i*\) **IF** WT\(*i*\) <= *c*
| V\(1, *c*\) = 0 otherwise since the knapsack cannot accommodate the items weight

Another simple case to consider would be if *i* = 0 or *c* = 0. If *i* = 0,
there are no items to consider so V\(0, *c*\) = 0. If *c* = 0, the knapsack
can not hold anything else, so V\(*i* ,0\) = 0.

Next consider how to define V\(*i*, *c*\) in terms of small parameter values when
*i* > 1. A good way to break this down is as follows:

1. If WT\(*i*) > c then V\(*i*, *c*\) must be the same as V\(*i*-1, *c*\) 
   since the knapsack is capacity is not large enough to contain the item *i*

2. Otherwise to determine whether of not the solution contains item *i*, we must compare:

   a) A\) The optimal solution to the capaciy *c* version when only items 1,2,3 ... *i*-1 are used, that is, V\(*i*-1, *c*\))

   b) B\) The optimal solution to V(*i*-1, *c*-WT\(*i*\)\) + VALUE\(*i*\).

      Why is this true? If an item *i* is included in the knapsack, the remaining capacity
      of the knapsack drops by WT\(*i*\). So V\(*i*-1, *c*-WT\(*i*\)\) represents
      the best vale that can be obtained from the remaining items with this new capacity.
      Since we are including item *i* in the knapsack, VALUE\(*i*\) is added.
      hence V(*i*-1, *c*-WT\(*i*\)\) + VALUE\(*i*\) represents the optimal value if
      the *ith* item is taken.

      Whichever is the larger of \(A\) and \(B\) above represents the solution
      to the capacity *c* problem for items chosen from among 1, 2, 3, ..., *i*.
      If \(A\) is larger, the item should not be included in the knapsack. If
      \(B\) is larger, the item should be included in the knapsack. If the numbers
      are equal it does not matter if the item is included or not. For the rest of the
      discusion on this page, if \(A\) and \(B\) are equal, **dont include the item in the
      knapsack**. In the equal case it does not matter if the item is taken or left, so to
      remain consistent it will always be left out of the solution set.

Using the definitions given above, An implementation of this algorithm in a java 
like language would look something like this::

    //this function behaves like the V(i,c) method defined previously
    //in this chapter
    int V(int i, int c){
        //base cases
        if(i == 0 || c == 0){
            return 0;
        }
        //item does not fit case
        if(wt(i) > c){
            return V(i-1, c);
        }
        //compare best case if item i is taken or left behind.
        //and return the larger number.
        int B = V(i-1, c-wt(i)) + value(i);
        int A = V(i-1, c);
        if(A >= B){
            return A;
        }
        else{
            return B;
        }
    }

The efficency of this recusive approach would not be very good. Most call to this
algorithm would result in 2 additional recursive calls until a base case is
encountered. To demonstrate this, click the show button below to view a
visualization of the call tree this algorithm would produce working on a set of 
three items. Every node in the tree represents a call to V\(*i*, *c*\).It should
be very apparent from the tree that the algorithm is of exponential efficency,
O\(2 ^ *N*\), where *N* is the number of items.


.. avembed:: AV/Development/sackCallTree.html ss

Now, consider what makes a problem suited to dynamic programing.

- The problems solution is initially formulated in a recursive fashion.

- The recursion involved in the solution typically results in making multiple
  recursive calls using the same values for parameters to the function. That is,
  to solve the original problem, it is necessary to have the solution to particular
  smaller versions of the problem computed many times. This is the key of nearly
  all problems to which dynamic programming can be applied.

- the value returned by the recursive function is of a type that can be stored
  in a data structure capable of being indexed by critical parameters of the
  function. This data structure can be used to stor previously computed 
  instances of the solution to the problem, thereby replacing recursive 
  recomputation with fast O\(1\) recall of previously computed values.

The recursive solution to the 0/1 Knapsack problem definatly meets all three
of the criterion above. The call tree visualization above clearly shows that
large amounts of work is being repeated. The value returned by our V\(*i*, *c*\)
are simple integers,that could easily be stored in a two dimensional array.
The following visualization shows how dynamic programming could be used to
greatly increase the efficency of the original recursive algorithm.

.. avembed:: AV/Development/sackTreePluck.html ss

One important thing to notice is, although this algorithm finds the optimal value,
it does not find the item set that produced the value. To answer the 0/1
Knapsack problem, some additional work is required. Recall that the larger
of the two values, A or B, shows what action is taken on a particular item.
If A was larger or equal, the item *is not* in the solution set. If B was larger
the item *is* part of the solution. In the visualization below, the optimal 
solution set is recovered from a complete table of optimal values for the
set of items.

.. avembed:: AV/Development/sackTraceBack.html ss

But how would a complete table of values be easily obtained? Recall that the two
function calls are V\(*i*-1, *c*\) and V(*i*-1, *c*-WT\(*i*\)\). As it turns out,
each row in the table only depends on the row above it. With this fact known,
it is simple to see that the table can be filled in with an iterative approach.
The code below shows how the table could be generated in a java like language. ::

    int v(int n, int cap)
    {
        int table[][] = new int[n+1][cap+1];
        for(int i = 0; i <= n; i++){
            for(int j = 0; j <= cap; j++){
                //base case
                if(i == 0 || j == 0)
                    table[i][j] = 0;
                else{
                    //item wont fit case
                    if(wt(i) > j)
                        table[i][j] = table[i-1][j];
                    else{
                        int A,B;
                        B = table[i-1][j-wt(i)] + value(i);
                        A = table[i-1][j];
                        if(A >= B)
                            table[i][j] = A;
                        else
                            table[i][j] = B;
                    }
                }
            }
        }
        //some code could go here to recover the solution set.

        //return the optimal value
        return table[i][j];
    }

The algorithm above creates the full table and returns the value of a particular 
optimal solution. A small bit of code could be added to the end of the algorithm
to obtain the item set of the solution with little trouble. As an exercise,
try modifing the function above to obtain and return the optimal solution set,
and implement it in you language of choice. The efficency of the algorithm
above is O\(*N* \* *CAP*\), because each cell in the table requires constant
work to fill. This is a huge improvement over the orignal efficency of 
O\(2 ^ *N*\).


A series of exercises are provided to help you test your knowlege of the
0/1 Knapsack algorithm. Some of the exercises are easier if you have some
scratch paper to work on.

Exercise 1
----------

In the exercise below, you are provided a row of the table from the previous
algorithm. Determine if the item with weigh and value given on the left should
be taken as part of the optimal solution.

.. avembed:: Exercises/Development/knapsackSelect.html ka


Exercise 2
----------

This next exercise has you fill in an entire row of the table. Enter the answer
as a list of integers sparated by spaces or commas. Clicking a cell in the table
will hilight the cell, alowing you to keep your place as you progress

.. avembed:: Exercises/Development/knapsackFillRow.html ka


Exercise 3
----------

In this exercise you must determine the correct set of items to produce the
optimal solution. To select an item, click on the item's column in the item table
on the left. You can also select cells in the main table like you could in the
previous exercise.

.. avembed:: Exercises/Development/knapsackSolution.html ka


Exercise 4
----------

For a final proficency exercise, you will be required to select values from the
\"choices\" list and put them into the correct location in the table. You must
follow the order that the recursive algorithm would use to enter fill in cells,
or your grade will not increase. You can check your grade at any time by clicking
on the grade button. If you make a mistake, the undo button can be used as much
as you like. A new set of data can be generated by clicking the reset button.


.. avembed:: AV/Development/sackProficiency.html pe
