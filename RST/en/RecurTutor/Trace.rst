.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda and Cliff Shaffer
   :satisfies: recursion tracing
   :requires: recursion writing
   :topic: Recursion

.. odsalink:: AV/RecurTutor/recurTraceCON.css
.. odsalink:: AV/RecurTutor/TOHfigCON.css

Tracing Recursive Code
======================

Tracing Recursive Code
----------------------

When writing a recursive function, you should think in a top-down
manner.
Do not worry about how the recursive call solves the sub-problem.
Simply accept that it will solve it correctly.
Use this result as though you had called some library function,
to correctly solve the original problem.

When you have to read or trace a recursive function, then you do need
to consider how the function is doing its work.
Tracing a few recursive functions is a great way to learn how
recursion behaves.
But after you become comfortable with tracing, you will rarely need to
work through so many details again.
You will begin to develop confidence about how recursion works.

You know that information can be passed in (using a function
parameter) from one recursive call to another, on ever smaller
problems, until a base case is reached in the winding phase.
Then, a return value is passed back as the series of recursive calls
unwinds.
Sometimes people forget about the "unwinding" phase.

.. inlineav:: recurTraceWindCON ss
   :output: show 


During the winding phase, any parameter passed through the recursive
call flows forward until the base case is reached.
During the unwinding phase, the return value of the function (if there
is one) flows backwards to the calling copy of the function.
In the following example, a recursive function to compute factorial
has information flowing forward during the winding phase, and backward
during the unwinding phase.

.. inlineav:: recurTraceFactCON ss
   :output: show 

The recursive function may have information flow for more than one parameter. For example, a recursive
function that sums the values in an array recursively may pass the array itself 
and the index through the recursive call in the winding phase and returns back the summed value so far
in the unwinding phase.

.. inlineav:: recurTraceSumCON ss
   :output: show


A Domino Analogy
~~~~~~~~~~~~~~~~

.. inlineav:: recurTraceDmnCON ss
   :output: show 

This recursive model for the domino effect can be used as a template
for the solution to all linear recursive functions.
Think of tipping over each domino as performing a further step
of computation toward the final solution.
Remember these rules:

1. Since the first domino has to be tipped over manually,
the solution for the base case is computed non-recursively.

2. Before any given domino can be tipped over,
all preceding dominos have to be tipped over.
   

Towers of Hanoi
~~~~~~~~~~~~~~~

Here is another example of recursion, based on a famous puzzle called
"Towers of Hanoi".
The natural algorithm to solve this problem has multiple recursive calls.
It cannot be rewritten easily using loops.
"Towers of Hanoi" comes from an ancient Vietnamese legend.
A group of monks is tasked with moving a tower of 64 disks of
different sizes according to certain rules.
The legend says that, when the monks will have finished moving all of
the disks, the world will end.

.. inlineav:: TOHfigCON dgm
   :output: show 

The Towers of Hanoi puzzle begins with three poles and :math:`n`
rings, where all rings start on the leftmost pole (labeled Pole 1).
The rings each have a different size, and are stacked in order of
decreasing size with the largest ring at the bottom, as shown in
part (a) of the figure.
The problem is to move the rings from the leftmost pole to the
middle pole (labeled Pole B) in a series of steps.
At each step the top ring on some pole is moved to another pole.
What makes this puzzle interesting is the limitation on where rings
may be moved:
A ring may never be moved on top of a smaller ring.

How can you solve this problem?
It is easy if you don't think too hard about the details.
Instead, consider that all rings are to be moved from Pole A to Pole B.
It is not possible to do this without first moving the bottom
(largest) ring to Pole B.
To do that, Pole B must be empty, and only the bottom ring can be on
Pole A.
The remaining :math:`n-1` rings must be stacked up in order
on Pole C, as shown in part (b) of the figure.
How can you do this?
Assume that a function :math:`X` is available to solve the
problem of moving the top :math:`n-1` rings from Pole A to Pole C.
Then move the bottom ring from Pole A to Pole B.
Finally, again use function :math:`X` to move the
remaining :math:`n-1` rings from Pole C to Pole B.
In both cases, "function :math:`X`" is simply the Towers of Hanoi
function called on a smaller version of the problem.

The secret to success is relying on the Towers of Hanoi
algorithm to do the work for you.
You need not be concerned about the gory details of *how* the
Towers of Hanoi subproblem will be solved.
That will take care of itself provided that two things are done.
First, there must be a base case (what to do if there is only one
ring) so that the recursive process will not go on forever.
Second, the recursive call to Towers of Hanoi can only be used to
solve a smaller problem, and then only one of the proper form (one
that meets the original definition for the Towers of Hanoi problem,
assuming appropriate renaming of the poles).

Here is an implementation for the recursive Towers of Hanoi
algorithm.
Function ``move(start, goal)`` takes the top ring from Pole
``start`` and moves it to Pole ``goal``.
If ``move`` were to print the values of its parameters,
then the result of calling ``TOH`` would be a list of
ring-moving instructions that solves the problem.

.. codeinclude:: Misc/TOH 
   :tag: TOH

This next slideshow explains the solution to the Towers of Hanoi problem.

.. inlineav:: recurTraceTOHCON ss
   :output: show 

.. odsascript:: AV/RecurTutor/recurTraceWindCON.js
.. odsascript:: AV/RecurTutor/recurTraceSumCON.js
.. odsascript:: AV/RecurTutor/recurTraceFactCON.js
.. odsascript:: AV/RecurTutor/recurTraceDmnCON.js
.. odsascript:: AV/RecurTutor/recurTraceTOHCON.js
.. odsascript:: AV/RecurTutor/TOHfigCON.js
