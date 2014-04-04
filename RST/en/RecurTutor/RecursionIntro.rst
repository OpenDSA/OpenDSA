.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer and Sally Hamouda
   :prerequisites:
   :topic: Recursion Chapter

.. odsalink:: AV/RecurTutor/recursionIntroCON.css


Recursion Chapter
=========

An algorithm is :term:`recursive` if it calls itself to do part of
its work.
For this approach to be successful, the "call to itself" must be on
a smaller problem then the one originally attempted.
In general, a recursive algorithm must have two parts:
the :term:`base case`, which handles
a simple input that can be solved without resorting to a recursive
call, and the recursive part which contains one or more recursive
calls to the algorithm where the parameters are in some sense
"closer" to the base case than those of the original call.

Let's think about recursion in a different way. Think about recursion as if you have a big task and you will delegate it to another one to help you on doing this task. Suppose that you have the task of multiplying two numbers x and y. You would like to delegate this task to some friend. You will ask the friend to multiply x-1 and y. When your friend send you back the result, you will only add y to that result. Your friend will do exactly the same with another friend who will do exactly the same with a third one and so on. x will be decremented till eventually it will reach to one at the last friend. The last friend will send back the result of multiplying a one and y. The last friend willl be returning back the result to the previous friend. This friend will add x to the result. This process will continue all the way back till the result of x-1 multiplied by y is back to you. You will simply add y to the result and you will be done with your task. Next visualization shows this delegation process:


.. inlineav:: RecursionIntroCON1 ss
   :long_name: Recursion Introduction Slideshow 1
   :points: 0.1
   :required: True
   :threshold: 1.0
   :output: show  

.. raw:: html

   <p></p>

.. inlineav:: RecursionIntroCON2 ss
   :long_name: Recursion Introduction Slideshow 2
   :points: 0.1
   :required: True
   :threshold: 1.0
   :output: show  

.. raw:: html

   <p></p>

 A well known simple recursive example is to compute the factorial of a number :math:`n`. Next visualization will show you how factorial is implemented by tracing the way factorial of 5 is computed. In this example we will think about recursion as if the code has a new instance/copy for each recursive code.

.. inlineav:: RecursionIntroCON3 ss
   :long_name: Recursion Introduction Slideshow 3
   :points: 0.1
   :required: True
   :threshold: 1.0
   :output: show  

.. raw:: html

The first two lines of the function constitute the base cases.
If :math:`n \leq 1`, then one of the base cases computes a solution
for the problem.
If :math:`n > 1`, then ``fact`` calls a function that knows
how to find the factorial of :math:`n-1`.
Of course, the function that knows how to compute the factorial of
:math:`n-1` happens to be ``fact`` itself.
But we should not think too hard about this while writing the
algorithm.
The design for recursive algorithms can always be approached
in this way.
First write the base cases.
Then think about solving the problem by combining the results of one
or more smaller |---| but similar |---| subproblems.
If the algorithm you write is correct, then certainly you can rely on
it (recursively) to solve the smaller subproblems.
It is no different from calling any other function.
When you call a function in a program, you just expect it to give the
appropriate answer.
You don't worry about how it works inside.
But for some reason, many students worry about "how the recursion
works".
This just gets in the way.
The secret to success is:
Do not worry about *how* the recursive call solves the subproblem.
Simply accept that it *will* solve it correctly, and use this
result to in turn correctly solve the original problem.
What could be simpler?

To use recursion effectively, it is necessary to train yourself to
stop analyzing the recursive process beyond the recursive call.
The subproblems will take care of themselves.
You just worry about the base cases and how to recombine the
subproblems.

Those who are unfamiliar with recursion might find it hard to
accept that it is used primarily as a tool for simplifying the design
and description of algorithms.
A recursive algorithm usually does not yield the most efficient
computer program for solving the problem because recursion involves
function calls, which are typically more expensive than other
alternatives such as a ``while`` loop.
However, the recursive approach usually provides an algorithm that is
reasonably efficient.
If necessary, the clear, recursive solution can later be modified to
yield a faster implementation.

Many data structures are naturally recursive, in that they can be
defined as being made up of self-similar parts.
Tree structures are an example of this.
Thus, the algorithms to manipulate such data structures are often
presented recursively.
Many searching and sorting algorithms are based on a strategy of
:term:`divide and conquer`.
That is, a solution is found by breaking the problem into smaller
(similar) subproblems, solving the subproblems, then combining the
subproblem solutions to form the solution to the original problem.
This process is often implemented using recursion.
Thus, recursion plays an important role throughout this book,
and many more examples of recursive functions will be given.

.. odsascript:: AV/RecurTutor/RecursionIntroCON.js
