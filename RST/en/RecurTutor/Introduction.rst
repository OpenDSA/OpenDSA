.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :prerequisites:
   :topic: Recursion

.. odsalink:: AV/RecurTutor/recursionintrocon1.css
.. odsalink:: AV/RecurTutor/recursionintrocon2.css

Introduction
==========================

An algorithm is recursive if it calls itself to do part of its
work.
Recursion makes it possible to solve complex problems using programs
that are concise, easily understood, and algorithmically efficient.
Recursion is the process of solving a large problem by reducing it to
one or more sub-problems which are identical in structure to the
original problem and somewhat simpler to solve.
Once the original subdivision has been made, the sub-problems
divided into new ones which are even less complex.
Eventually, the sub-problems become so simple that they can be then
solved without further subdivision.
Ultimately, the complete solution is obtained by reassembling the
solved components.

For a recursive approach to be successful, the recursive
"call to itself" must be on a smaller problem than the one originally
attempted.
In general, a recursive algorithm must have two parts:

#. the base case, which handles a simple input that can be solved without
   resorting to a recursive call, and

#. the recursive part which contains one or more recursive calls to the
   algorithm.
   In every recursive call, the parameters must be in some sense "closer"
   to the base case than those of the original call.

Imagine that someone in a movie theater asks you what row you're
sitting in.
You don't want to count, so you ask the person in front of you what
row they are sitting in, knowing that you will respond one greater
than their answer.
The person in front will ask the person in front of them.
This will keep happening until word reaches the front row and it
is easy to respond: "I'm in row 1!"
From there, the correct message (incremented by one each row)
will eventually make it's way back to the person who asked.

When first learning recursion, it is common for people to think a lot
about the recursive process.
We will spend some time in these modules going over the details for
how recursion works.
But when writing recursive functions, it is best to
stop thinking about how the recursion works beyond the recursive
call.
You should adopt the attitude that the sub-problems will take care of
themselves.
You just worry about the base cases and how to recombine the
sub-problems.

Newcomers who are unfamiliar with recursion often find it hard to
accept that it is used primarily as a tool for simplifying the design
and description of algorithms.
A recursive algorithm might not yield the most efficient
computer program for solving the problem because recursion
involves function calls, which are typically more expensive than other
alternatives such as a while loop.
However, the recursive approach usually provides an algorithm that is
reasonably efficient.
If necessary, the clear, recursive solution can later be modified to
yield a faster implementation.

Here is a good way to start thinking about recursion.
Imagine that you have a big task.
What you could do is just a small piece of it,
and then delegate the rest to some helper.
An example similar to the movie theater example  mentioned
earlier is, suppose that you have the task of multiplying two numbers
x and y. You would like to delegate this task to some friend. You will
ask the friend to multiply x-1 and y. You will simply add y to the
result and you will be done with your task. You will not think about
how your friend is going to do the task as you simply know how to do
your own part.  When your friend send you back the result, you will
only add y to that result. Next visualization shows that delegation
process.

.. inlineav:: RecursionIntroCON2 ss
   :output: show  


If you are going to think how your friend is going to do the task then you will think that your friend will do exactly the same with another friend who will do exactly the same with a third one and so on. x will be decremented till eventually it will reach to one at the last friend. The last friend will send back the result of multiplying a one and y. The last friend will be returning back the result to the previous friend. This friend will add x to the result. This process will continue all the way back till the result of x-1 multiplied by y is back to you. 


.. inlineav:: RecursionIntroCON1 ss
   :output: show  

In order to understand recursion, you need to understand and practice how to write and read a recursive function.



.. odsascript:: AV/RecurTutor/recursionintrocon2.js
.. odsascript:: AV/RecurTutor/recursionintrocon1.js
