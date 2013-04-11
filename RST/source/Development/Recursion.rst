.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Math Background

Recursion [RAW]
===============

An algorithm is \defit{recursive} if it calls itself to do part of
its work.
For this approach to be successful, the ``call to itself'' must be on
a smaller problem then the one originally attempted.
In general, a recursive algorithm must have two parts:
the \defit{base case}, which handles
a simple input that can be solved without resorting to a recursive
call, and the recursive part which contains one or more recursive
calls to the algorithm where the parameters are in some sense
``closer'' to the base case than those of the original call.
Here is a recursive \Lang\ function to compute the factorial
of~\(n\).\index{factorial function}
A trace of \Cref{fact}'s execution for a small value
of \(n\) is presented in Section~\ref{ImpRecur}.

\xproghere{rfact.book}

The first two lines of the function constitute the base cases.
If \(n \leq 1\), then one of the base cases computes a solution for
the problem.
If \(n > 1\), then \Cref{fact} calls a function that knows
how to find the factorial of \(n-1\).\index{factorial function}
Of course, the function that knows how to compute the factorial of
\(n-1\) happens to be \Cref{fact} itself.
But we should not think too hard about this while writing the
algorithm.
The design for recursive algorithms can always be approached
in this way.
First write the base cases.
Then think about solving the problem by combining the results of one
or more smaller --- but similar --- subproblems.
If the algorithm you write is correct, then certainly you can rely on
it (recursively) to solve the smaller subproblems.
The secret to success is:
Do not worry about \emph{how} the recursive call solves the subproblem.
Simply accept that it \emph{will} solve it correctly, and use this
result to in turn correctly solve the original problem.
What could be simpler?

Recursion has no counterpart in everyday, physical-world problem solving.
The concept can be difficult to grasp because it requires you to think
about problems in a new way.
To use recursion effectively, it is necessary to train yourself to
stop analyzing the recursive process beyond the recursive call.
The subproblems will take care of themselves.
You just worry about the base cases and how to recombine the
subproblems.

The recursive version of the factorial function might seem
unnecessarily complicated to you because the same effect can be
achieved by using a \Cwhile\ loop.
Here is another example of recursion, based on a famous puzzle called
``Towers of Hanoi.''\index{towers of hanoi@Towers of Hanoi|(}
The natural algorithm to solve this problem has multiple recursive calls.
It cannot be rewritten easily using \Cwhile\ loops.

\begin{figure}
\pdffig{TOH}

\capt{4.5in}{Towers of Hanoi Example}
{Towers of Hanoi example.
(a)~The initial conditions for a problem with six rings.
(b)~A necessary intermediate step on the road to a solution.}
{TOH}
\medskip
\end{figure}

The Towers of Hanoi puzzle begins with three poles and \(n\) rings,
where all rings start on the leftmost pole (labeled Pole~1).
The rings each have a different size, and are stacked in order of
decreasing size with the largest ring at the bottom, as shown in
Figure~\ref{TOH}(a).
The problem is to move the rings from the leftmost pole to the
rightmost pole (labeled Pole~3) in a series of steps.
At each step the top ring on some pole is moved to another pole.
There is one limitation on where rings may be moved:
A ring can never be moved on top of a smaller ring.

How can you solve this problem?
It is easy if you don't think too hard about the details.
Instead, consider that all rings are to be moved from Pole~1 to Pole~3.
It is not possible to do this without first moving the bottom
(largest) ring to Pole~3.
To do that, Pole~3 must be empty, and only the bottom ring can be on
Pole~1.
The remaining \(n-1\) rings must be stacked up in order
on Pole~2, as shown in Figure~\ref{TOH}(b).
How can you do this?
Assume that a function \(X\) is available to solve the
problem of moving the top \(n-1\) rings from Pole~1 to Pole~2.
Then move the bottom ring from Pole~1 to Pole~3.
Finally, again use function \(X\) to move the
remaining \(n-1\) rings from Pole~2 to Pole~3.
In both cases, ``function \(X\)'' is simply the Towers of Hanoi
function called on a smaller version of the problem.

The secret to success is relying on the Towers of Hanoi
algorithm to do the work for you.
You need not be concerned about the gory details of \emph{how} the
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
Function \Cref{move(start, goal)} takes the top ring from Pole
\Cref{start} and moves it to Pole \Cref{goal}.
If \Cref{move} were to print the values of its parameters,
then the result of calling \Cref{TOH} would be a list of
ring-moving instructions that solves the problem.

\ifthenelse{\boolean{cpp}}{\newpage}{}

\xproghere{TOH.book}

\index{towers of hanoi@Towers of Hanoi|)}

Those who are unfamiliar with recursion might find it hard to
accept that it is used primarily as a tool for simplifying the design
and description of algorithms.
A recursive algorithm usually does not yield the most efficient
computer program for solving the problem because recursion involves
function calls, which are typically more expensive than other
alternatives such as a \Cwhile\ loop.
However, the recursive approach usually provides an algorithm that is
reasonably efficient in the sense discussed in Chapter~\ref{AlgAnal}.
(But not always!  See Exercise~\ref{MathPre}.\ref{FiboEx}.)
If necessary, the clear, recursive solution can later be modified to
yield a faster implementation, as described in Section~\ref{ImpRecur}.

Many data structures are naturally recursive, in that they can be
defined as being made up of self-similar parts.
Tree structures are an example of this.
Thus, the algorithms to manipulate such data structures are often
presented recursively.
Many searching and sorting algorithms are based on a strategy of
\defit{divide and conquer}.
That is, a solution is found by breaking the problem into smaller
(similar) subproblems, solving the subproblems, then combining the
subproblem solutions to form the solution to the original problem.
This process is often implemented using recursion.
Thus, recursion plays an important role throughout this book, and many 
more examples of recursive functions will be given.
