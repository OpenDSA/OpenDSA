.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Algorithm Analysis

Code Tuning and Empirical Analysis [Raw]
========================================

In practice, there is not such a big difference in running time
between an algorithm with growth rate
\Thetan\ \index{growth rate!linear} and another with
growth rate \Thetanlogn.
There is, however, an enormous difference in running time between
algorithms with growth rates of \Thetanlogn\ and \Thetantwo.
\index{growth rate!quadratic}
As you shall see during the course of your study of common data
structures and algorithms, it is not unusual that a problem
whose obvious solution requires \Thetantwo\ time also has a solution
requiring \Thetanlogn\ time.
Examples include sorting\index{sorting} and
searching\index{search}, two of the most important computer problems.

While not nearly so important as changing an algorithm to reduce
its growth rate, ``code tuning'' can also lead to dramatic
improvements in running time.
Code tuning is the art of hand-optimizing a program to run faster
or require less storage.
For many programs, code tuning can reduce running time by a factor of
ten, or cut the storage requirements by a factor of two or more.
I once tuned a critical function in a program --- without changing its
basic algorithm --- to achieve a factor of 200 speedup.
To get this speedup, however, I did make major changes in the
representation of the information, converting from a symbolic coding
scheme to a numeric coding scheme on which I was able to do direct
computation.

Here are some suggestions for ways to speed up your
programs by code tuning.
The most important thing to realize is that most statements in a
program do not have much effect on the running time of that program.
There are normally just a few key subroutines, possibly even key
lines of code within the key subroutines, that account for most of
the running time.
There is little point to cutting in half the running time of a
subroutine that accounts for only 1\% of the total running time.
Focus your attention on those parts of the program that have the most
impact.

When tuning code, it is important to gather good timing statistics.
Many compilers and
operating systems
include profilers and other special tools to help gather information
on both time and space use.
These are invaluable when trying to make a program more efficient,
because they can tell you where to invest your effort.

A lot of code tuning is based on the principle of avoiding work rather
than speeding up work.
A common situation occurs when we can test for a condition that lets
us skip some work.
However, such a test is never completely free.
Care must be taken that the cost of the test does not exceed the
amount of work saved.
While one test might be cheaper than the work potentially saved, the
test must always be made and the work can be avoided only some
fraction of the time.

\begin{example}
A common operation in computer graphics applications is to find which
among a set of complex objects contains a given point in space.
Many useful data structures and algorithms have been developed to deal
with variations of this problem.
Most such implementations involve the following tuning step.
Directly testing whether a given complex object contains the point in
question is relatively expensive.
Instead, we can screen for whether the point is contained within a
\defit{bounding box} for the object.
The bounding box is simply the smallest rectangle (usually defined to
have sides perpendicular to the \(x\) and \(y\) axes) that contains
the object.
If the point is not in the bounding box, then it cannot be in the
object.
If the point is in the bounding box, only then would we conduct the
full comparison of the object versus the point.
Note that if the point is outside the bounding box, we saved time
because the bounding box test is cheaper than the comparison of the
full object versus the point.
But if the point is inside the bounding box, then that test is
redundant because we still have to compare the point against the
object.
Typically the amount of work avoided by making this test is greater
than the cost of making the test on every object.
\end{example}

Module :numref:`<SortingEmpirical>` discusses code tuning for some
sorting algorithms.

Be careful not to use tricks that make the program unreadable.
Most code tuning is simply cleaning up a carelessly written program,
not taking a clear program and adding tricks.
In particular, you should develop an appreciation for the
capabilities of modern compilers\index{compiler!optimization} to make
extremely good optimizations of expressions.
``Optimization of expressions'' here means a rearrangement of
arithmetic or logical expressions to run more efficiently.
Be careful not to damage the compiler's ability to do such
optimizations for you in an effort to optimize the expression
yourself.
Always check that your ``optimizations'' really do improve the
program by running the program before and after the change on a
suitable benchmark set of input.
Many times I have been wrong about the positive effects of code
tuning in my own programs.
Most often I am wrong when I try to optimize an expression.
It~is hard to do better than the compiler.

The greatest time and space improvements come from a better
data structure or algorithm.
The final thought for this section is

\vspace{-\medskipamount}
\begin{center}
{\bf First tune the algorithm, then tune the code.}
\end{center}

Empirical Analysis
------------------

This chapter has focused on asymptotic analysis.
This is an analytic tool, whereby we model the key aspects of an
algorithm to determine the growth rate of the algorithm as the input
size grows.
As pointed out previously, there are many limitations to this
approach.
These include the effects at small problem size, determining the finer
distinctions between algorithms with the same growth rate, and
the inherent difficulty of doing mathematical modeling for more
complex problems.

\index{algorithm analysis!empirical comparison}
An alternative to analytical approaches are empirical ones.
The most obvious empirical approach is simply to run two competitors
and see which performs better.
In this way we might overcome the deficiencies of analytical approaches.

Be warned that comparative timing of programs is a difficult
business, often subject to experimental errors arising from
uncontrolled factors (system load, the language or
compiler\index{compiler} used, etc.).
The most important point is not to be biased
in favor of one of the programs.
If you are biased, this is certain to be reflected in the timings.
One look at competing software or hardware vendors' advertisements
should convince you of this.
The most common pitfall when writing two programs to compare
their performance is that one receives more code-tuning effort than
the other.
As mentioned in Section~\ref{CodeTune}, code tuning can often reduce
running time by a factor of ten.
If the running times for two programs differ by a constant factor
regardless of input size (i.e., their growth rates are
the same), then differences in code tuning might account for any
difference in running time.
Be suspicious of empirical comparisons in this situation.
\index{algorithm analysis!empirical comparison}

\index{simulation|(}
Another approach to analysis is simulation.
The idea of simulation is to model the problem with a computer program
and then run it to get a result.
In the context of algorithm analysis, simulation
is distinct from empirical comparison of two competitors because the
purpose of the simulation is to perform analysis that
might otherwise be too difficult.
A good example of this appears in Figure~\ref{HashLoad}.
This figure shows the cost for inserting or deleting a record from a
hash table under two different assumptions for the policy used to find
a free slot in the table.
The \(y\) axes is the cost in number of hash table slots evaluated,
and the \(x\) axes is the percentage of slots in the table that are
full.
The mathematical equations for these curves can be determined,
but this is not so easy.
A reasonable alternative is to write simple variations on hashing.
By timing the cost of the program for various loading conditions, it
is not difficult to construct a plot similar to Figure~\ref{HashLoad}.
The purpose of this analysis is not to determine which approach to
hashing is most efficient, so we are not doing empirical comparison of
hashing alternatives.
Instead, the purpose is to analyze the proper loading factor that
would be used in an efficient hashing system to balance time cost
versus hash table size (space cost).
