.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :satisfies: recursion tracing
   :requires: recursion writing
   :topic: Recursion


.. odsalink:: AV/RecurTutor/recursionTrcCON.css

Tracing a recursive code
========================
As we have seen in the previous section that to write a recursive code you should think in a top-down manner. The successful way is not to worry about how the recursive call solves the sub-problem. Simply accept that it will solve it correctly, and use this result to in turn correctly solve the original problem. On the other hand, if it is required to read or trace a recursive function you need to think in a bottom-up manner. That means you will need first to evaluate the base case and work backward until reaching the required function call. In this section we will illustarte how can you trace a recursive call.

Tracing recursive functions is a great way to learn how it behaves. After you
become comfortable with tracing, you rarely need to trace again. You begin to
trust that recursion will work.
When tracing most recursive functions, there is winding and unwinding part.
The "winding" part occurs as the recursion heads to the base case. The "un-
winding" part occurs when the recursion returns back to the original call. Most
people forget there is the "unwinding" phase. The winding and unwinding is
not really special to recursion. It occurs with any function.

.. inlineav:: recursionTrcWindCON ss
   :output: show 

Next we will show a tracing example for a simple sum function:

.. inlineav:: recursionTrcSumCON ss
   :output: show

Next we will show a tracing example of a factorial function:

.. inlineav:: recursionTrcFctCON ss
   :output: show 

As you trace the code, you should observe several things:

.. inlineav:: recursionTrcSum2CON ss
   :output: show 

Starting at the base case, you have a value that is then used to solve the call
from the function that called the base case, which is used to solve the call that
called the call that called the base case, and so forth. Basically, the solution is
being built up, until finally, you reach the original call, and the final solution is
arrived at, having been built up from the base case.

Whenever the return statement of the recursive call has no more work to do
AFTER the recursive call, the function is said to be tail-recursive.


Next Example will model the domino effect recursively:

.. inlineav:: recursionTrcDmnCON ss
   :output: show 

After modeling the domino effect recursively, the two steps
in the previous visualization becomes a template solution for general linear
recursive questions. If we think of tipping over each
domino as performing a further step of computation toward
the final solution, then this template is capable of solving
all linear recursive problems. The rules of thumb toward a
linear recursive solution can now be summarized as follows:

1. Since the first domino has to be tipped over manually,
the solution for base case is computed non-recursively.

2. For any other domino, before a domino is tipped over
all of its preceded dominos have to be tipped over and
then the current domino will be tipped over
subsequently. So the solution for a recursive case is
computed recursively by solving its next smaller case
first followed by some subsequent computation.


Next visualization will show how we can use the previously illustrated Domino effect solving technique to print positive integers from 1 to N recursively. 

.. inlineav:: recursionTrcDmnPrntCON ss
   :output: show 


Next visualization will show how we can use the previously illustrated Domino effect solving technique to Count the number of digits within an integer n recursively. 

.. inlineav:: recursionTrcDmnCntCON ss
   :output: show 

Towers of Hanoi is an example of a problem which requires multiple recursive calls. 
The problem of the Towers of Hanoi originates from an ancient legend from Vietnam, according to which a group of monks is moving around a tower of 64 disks of different sizes according to certain rules. The legend says that, when the monks will have finished moving around the disks, the end of the world will come. 

The rules according to which the disks have to be moved are the following:

1. Initially, the disks are placed in decreasing size on support 1.
2. The objective is to move them to support 2, making also use of an auxiliary support 3.

The conditions for moving the disks are:

1. All disks (except the one to be moved) have to be on one of the three supports;
2. It is possible to move only one disk at a time, taking it from the top of the tower on one of the supports and placing it on the top of the tower on another support;
3. A disk can never be placed on a smaller disk.

Next visualization will show a tracing for the Towers of Hanoi problem.

.. inlineav:: recursionTrcTOHCON ss
   :output: show 
	   


.. odsascript:: AV/RecurTutor/recursionTrcWindCON.js
.. odsascript:: AV/RecurTutor/recursionTrcSumCON.js
.. odsascript:: AV/RecurTutor/recursionTrcFctCON.js
.. odsascript:: AV/RecurTutor/recursionTrcSum2CON.js
.. odsascript:: AV/RecurTutor/recursionTrcDmnCON.js
.. odsascript:: AV/RecurTutor/recursionTrcDmnPrntCON.js
.. odsascript:: AV/RecurTutor/recursionTrcDmnCntCON.js
.. odsascript:: AV/RecurTutor/recursionTrcTOHCON.js
