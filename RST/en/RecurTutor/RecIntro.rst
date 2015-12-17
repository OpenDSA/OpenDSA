.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda and Cliff Shaffer
   :satisfies: recursion intro
   :topic: Recursion

.. odsalink:: AV/RecurTutor/recurIntroCON.css

Introduction
============

Introduction
------------

An :term:`algorithm` (or a function in a computer program) is
:term:`recursive <recursion>` if it invokes itself to do part of its
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

#. The :term:`base case`, which handles a simple input that can be
   solved without resorting to a recursive call, and

#. The recursive part which contains one or more recursive calls to the
   algorithm.
   In every recursive call, the parameters must be in some sense "closer"
   to the base case than those of the original call.

Recursion has no counterpart in everyday, physical-world problem solving.
The concept can be difficult to grasp because it requires you to think
about problems in a new way.
When first learning recursion, it is common for people to think a lot
about the recursive process.
We will spend some time in these modules going over the details for
how recursion works.
But when writing recursive functions, it is best to
stop thinking about how the recursion works beyond the recursive
call.
You should adopt the attitude that the sub-problems will take care of
themselves, that when you call the function recursively it will return
the right answer.
You just worry about the base cases and how to recombine the
sub-problems.

Newcomers who are unfamiliar with recursion often find it hard to
accept that it is used primarily as a tool for simplifying the design
and description of algorithms.
A recursive algorithm does not always yield the most efficient
computer program for solving the problem because recursion
involves function calls, which are typically more expensive than other
alternatives such as a while loop.
However, the recursive approach usually provides an algorithm that is
reasonably efficient.
If necessary, the clear, recursive solution can later be modified to
yield a faster implementation.

Imagine that someone in a movie theater asks you what row you're
sitting in.
You don't want to count, so you ask the person in front of you what
row they are sitting in, knowing that they will tell you a number one
less than your row number.
The person in front could ask the person in front of them.
This will keep happening until word reaches the front row and it
is easy to respond: "I'm in row 1!"
From there, the correct message (incremented by one each row)
will eventually make it's way back to the person who asked.

Imagine that you have a big task.
You could just do a small piece of it,
and then :term:`delegate <delegation mental model for recursion>`
the rest to some helper, as in this example.

.. inlineav:: recurIntroDelegateCON ss
   :output: show  

Let's look deeper into the details of what your friend does when
you delegate the work.
(Note that we show  you this process once now,
and once again when we look at some recursive functions.
But when you are writing your own recursive functions,
you shouldn't worry about all of these details.)

.. inlineav:: recurIntroDetailsCON ss
   :output: show  

In order to understand recursion, you need to be able to do two
things.
First, you have to understand how to read a recursive function.
Second, you have to understand how to write a recursive function.
Both of these skills require a lot of practice.
So we will give you a lot of exercises to do later on.

.. odsascript:: AV/RecurTutor/recurIntroDelegateCON.js
.. odsascript:: AV/RecurTutor/recurIntroDetailsCON.js
