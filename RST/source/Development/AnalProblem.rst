.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Algorithm Analysis

Analyzing Problems [Raw]
========================

You most often use the techniques of ``algorithm'' analysis to analyze
an algorithm, or the instantiation of an algorithm as a program.
You can also use these same techniques to analyze the cost of a
problem.
It should make sense to you to say that the upper bound for a problem
cannot be worse than the upper bound for the best algorithm that we
know for that problem.
But what does it mean to give a lower bound for a problem?

Consider a graph of cost over all inputs of a given size \(n\) for
some algorithm for a given problem.
Define \(\mathcal{A}\) to be the collection of all algorithms that
solve the problem (theoretically, there are an infinite number of such
algorithms).
Now, consider the collection of all the graphs for all of the
(infinitely many) algorithms in \(\mathcal{A}\).
The worst case lower bound is the \emph{least} of all the
\emph{highest} points on all the graphs.

It is much easier to show that an algorithm (or program) is in
\Omegafn\ than it is to show that a problem is in \Omegafn.
For a problem to be in \Omegafn\ means that \emph{every} algorithm
that solves the problem is in \Omegafn, even algorithms that we
have not thought of!

So far all of our examples of algorithm analysis
give ``obvious'' results, with big-Oh always matching~\(\Omega\).
To understand how big-Oh, \(\Omega\), and \(\Theta\)~notations
are properly used to describe our understanding of a problem or an
algorithm, it is best to consider an example where you do not already
know a lot about the problem.

\index{sorting|(}
Let us look ahead to analyzing the problem of sorting to see
how this process works.
What is the least possible cost for any sorting algorithm
in the worst case?
The algorithm must at least look at every element in the input, just
to determine that the input is truly sorted.
Thus, any sorting algorithm must take at least~\cn\ time.
For many problems, this observation that each of the \(n\)~inputs must
be looked at leads to an easy \Omegan\ lower bound.

In your previous study of computer science, you have probably
seen an example of a sorting algorithm whose running time is in
\Ontwo\ in the worst case.
The simple Bubble Sort\index{bubble sort@Bubble Sort} and
Insertion Sort\index{insertion sort@Insertion Sort} algorithms
typically given as examples in a first year programming course have
worst case running times in~\Ontwo.
Thus, the problem of sorting can be said to have an upper bound
in~\Ontwo.
How do we close the gap between \Omegan\ and~\Ontwo?
Can there be a better sorting algorithm?
If you can think of no algorithm whose worst-case growth rate is
better than \Ontwo, and if you have discovered no
analysis technique to show that the least cost for the problem of
sorting in the worst case is greater than \Omegan, then you cannot
know for sure whether or not there is a better algorithm.

Chapter~\ref{InSort} presents sorting algorithms whose
running time is in \Onlogn\ for the worst case.
This greatly narrows the gap.
With this new knowledge, we now have a lower bound in \Omegan\ and an
upper bound in \Onlogn.
Should we search for a faster algorithm?
Many have tried, without success.
Fortunately (or perhaps unfortunately?), Chapter~\ref{InSort} also
includes a proof that any sorting algorithm must have running time in
\Omeganlogn\ in the worst case.\footnote{While it is fortunate to know
the truth, it is unfortunate that sorting is \Thetanlogn\ rather than
\Thetan!}
This proof is one of the most important results in
the field of algorithm analysis, and it means that no sorting
algorithm can possibly run faster than \(c n \log n\) for the
worst-case input of size~\(n\).
Thus, we can conclude that the problem of sorting is
\Thetanlogn\ in the worst case, because the upper and lower bounds
have met.
\index{sorting|)}

Knowing the lower bound for a problem does not give you a good
algorithm.
But it does help you to know when to stop looking.
If the lower bound for the problem matches the upper bound for the
algorithm (within a constant factor), then we know that we can find an
algorithm that is better only by a constant factor.
\index{problem!analysis of|)}

\section{Common Misunderstandings}

Asymptotic analysis is one of the most intellectually difficult topics
that undergraduate computer science majors are confronted with.
Most people find growth rates and asymptotic analysis
confusing and so develop misconceptions about either the concepts or
the terminology.
It helps to know what the standard points of confusion are, in hopes
of avoiding them.

One problem with differentiating the concepts of upper and lower
bounds is that, for most algorithms that you will encounter, it is
easy to recognize the true growth rate for that algorithm.
Given complete knowledge about a cost function, the upper and lower
bound for that cost function are always the same.
Thus, the distinction between an upper and a lower bound is only
worthwhile when you have incomplete knowledge about the thing being
measured.
If this distinction is still not clear, reread Section~\ref{ProbAnal}.
We use \(\Theta\)-notation to indicate that there is no meaningful
difference between what we know about the growth rates of the upper
and lower bound (which is usually the case for simple algorithms).

It is a common mistake to confuse the concepts of upper bound or lower
bound on the one hand, and worst case or best case on the other.
The best, worst, or average cases each give us a concrete input
instance (or concrete set of instances)
that we can apply to an algorithm description to get a cost measure.
The upper and lower bounds describe our understanding of the
\emph{growth rate} for that cost measure.
So to define the growth rate for an algorithm or problem, we need to
determine what we are measuring (the best, worst, or average case) and
also our description for what we know about the growth rate of that
cost measure (big-Oh, \(\Omega\), or \(\Theta\)).

The upper bound for an algorithm is not the same as the worst case for 
that algorithm for a given input of size \(n\).
What is being bounded is not the actual cost (which you can
determine for a given value of \(n\)), but rather the 
\emph{growth rate} for the cost.
There cannot be a growth rate for a single point, such as a particular 
value of~\(n\).
The growth \emph{rate} applies to the \emph{change} in cost as a
\emph{change} in input size occurs.
Likewise, the lower bound is not the same as the best case for a given 
size \(n\).

Another common misconception is thinking that the best case for an
algorithm occurs when the input size is as small as possible, or that
the worst case occurs when the input size is as large as possible.
What is correct is that best- and worse-case instances exist for
each possible size of input.
That is, for all inputs of a given size, say \(i\), one (or more) of
the inputs of size \(i\) is the best and one (or more) of the
inputs of size \(i\) is the worst.
Often (but not always!), we can characterize the best input case for
an arbitrary size, and we can characterize the worst input case for an
arbitrary size.
Ideally, we can determine the growth rate for the characterized best,
worst, and average cases as the input size grows.

\begin{example}
What is the growth rate of the best case for sequential search?
For any array of size \(n\), the best case occurs when the value we
are looking for appears in the first position of the array.
This is true regardless of the size of the array.
Thus, the best case (for arbitrary size \(n\)) occurs when the desired
value is in the first of \(n\) positions, and its cost is 1.
It is \emph{not} correct to say that the best case occurs
when \(n=1\).
\end{example}

\begin{example}
Imagine drawing a graph to show the cost of finding the maximum value
among \(n\) values, as \(n\) grows.
That is, the \(x\) axis would be \(n\), and the \(y\) value would be
the cost.
Of course, this is a diagonal line going up to the right, as \(n\)
increases (you might want to sketch this graph for yourself before
reading further).

Now, imagine the graph showing the cost for \emph{each} instance of
the problem of finding the maximum value among (say) 20 elements in an
array.
The first position along the \(x\) axis of the graph might correspond
to having the maximum element in the first position of the array.
The second position along the \(x\) axis of the graph might correspond
to having the maximum element in the second position of the array, and
so on.
Of course, the cost is always 20.
Therefore, the graph would be a horizontal line with value 20.
You should sketch this graph for yourself.

Now, let us switch to the problem of doing a sequential search for a
given value in an array.
Think about the graph showing all the problem instances of size~20.
The first problem instance might be when the value we search for is in
the first position of the array.
This has cost~1.
The second problem instance might be when the value we search for is in
the second position of the array.
This has cost~2.
And so on.
If we arrange the problem instances of size~20 from least expensive on
the left to most expensive on the right, we see that the graph forms a
diagonal line from lower left (with value~0) to upper right (with
value~20).
Sketch this graph for yourself.

Finally, let us consider the cost for performing sequential search as
the size of the array \(n\) gets bigger.
What will this graph look like?
Unfortunately, there's not one simple answer, as there was for finding
the maximum value.
The shape of this graph depends on whether we are considering the best
case cost (that would be a horizontal line with value 1), the worst
case cost (that would be a diagonal line with value \(i\) at position
\(i\) along the \(x\) axis), or the average cost (that would be a a
diagonal line with value \(i/2\) at position \(i\) along the \(x\)
axis).
This is why we must always say that function \fn\ is in \Ogn\ in the
best, average, or worst case!
If we leave off which class of inputs we are discussing, we cannot
know which cost measure we are referring to for most algorithms.
\end{example}
