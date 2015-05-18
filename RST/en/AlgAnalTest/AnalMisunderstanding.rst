.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: algorithm analysis
   :satisfies: analysis misunderstandings
   :topic: Algorithm Analysis

Common Misunderstandings
========================

:term:`Asymptotic analysis <asymptotic analysis>` is one of the most
intellectually difficult topics that undergraduate computer science
majors are confronted with.
Most people find :term:`growth rates <growth rate>` and asymptotic
analysis confusing and so develop misconceptions about either the
concepts or the terminology.
It helps to know what the standard points of confusion are,
in hopes of avoiding them.

One problem with differentiating the concepts of
:term:`upper <upper bound>` and :term:`lower bounds <lower bound>` is
that, for most algorithms that you will encounter, it is
easy to recognize the true growth rate for that algorithm.
Given complete knowledge about a cost function, the upper and lower
bound for that cost function are always the same.
Thus, the distinction between an upper and a lower bound is only
worthwhile when you have incomplete knowledge about the thing being
measured.
If this distinction is still not clear,
then you should :ref:`read about analyzing problems <AnalProblem>`.
We use :math:`\Theta`-notation to indicate that there is no meaningful
difference between what we know about the growth rates of the upper
and lower bound (which is usually the case for simple algorithms).

It is a common mistake to confuse the concepts of upper bound or
lower bound on the one hand, and :term:`worst case` or
:term:`best case` on the other.
The best, worst, or :term:`average cases <average case>` each
**define a cost** for a specific input instance
(or specific set of instances for the average case).
In contrast, upper and lower bounds describe our understanding of the
**growth rate** for that cost measure.
So to define the growth rate for an algorithm or problem, we need to
determine what we are measuring (the best, worst, or average case) and
also our description for what we know about the growth rate of that
cost measure (big-Oh, :math:`\Omega`, or :math:`\Theta`).

The upper bound for an algorithm is not the same as the worst case for 
that algorithm for a given input of size :math:`n`.
What is being bounded is not the actual cost (which you can
determine for a given value of :math:`n`), but rather the 
**growth rate** for the cost.
There cannot be a growth rate for a single point, such as a particular 
value of :math:`n`.
The growth **rate** applies to the **change** in cost as a
**change** in input size occurs.
Likewise, the lower bound is not the same as the best case for a given 
size :math:`n`.

Another common misconception is thinking that the best case for an
algorithm occurs when the input size is as small as possible, or that
the worst case occurs when the input size is as large as possible.
What is correct is that best- and worse-case instances exist for
each possible size of input.
That is, for all inputs of a given size, say :math:`i`,
one (or more) of the inputs of size :math:`i` is the best and one
(or more) of the inputs of size :math:`i` is the worst.
Often (but not always!), we can characterize the best input case for
an arbitrary size, and we can characterize the worst input case for an
arbitrary size.
Ideally, we can determine the growth rate for the characterized best,
worst, and average cases as the input size grows.

.. topic:: Example

   What is the growth rate of the best case for sequential search?
   For any array of size :math:`n`, the best case occurs when the
   value we are looking for appears in the first position of the
   array.
   This is true regardless of the size of the array.
   Thus, the best case (for arbitrary size :math:`n`) occurs when the
   desired value is in the first of :math:`n` positions, and its cost
   is 1.
   It is *not* correct to say that the best case occurs when
   :math:`n=1`.

.. topic:: Example

   Imagine drawing a graph to show the cost of finding the maximum
   value among :math:`n` values, as :math:`n` grows.
   That is, the :math:`x` axis would be :math:`n`, and the :math:`y`
   value would be the cost.
   Of course, this is a diagonal line going up to the right, as
   :math:`n` increases (you might want to sketch this graph for
   yourself before reading further).

   Now, imagine the graph showing the cost for *each* instance of
   the problem of finding the maximum value among (say) 20 elements in
   an array.
   The first position along the :math:`x` axis of the graph might
   correspond to having the maximum element in the first position of
   the array.
   The second position along the :math:`x` axis of the graph might
   correspond to having the maximum element in the second position of
   the array, and so on.
   Of course, the cost is always 20.
   Therefore, the graph would be a horizontal line with value 20.
   You should sketch this graph for yourself.

   Now, let us switch to the problem of doing a sequential search for
   a given value in an array.
   Think about the graph showing all the problem instances of size 20.
   The first problem instance might be when the value we search for is
   in the first position of the array.
   This has cost 1.
   The second problem instance might be when the value we search for
   is in the second position of the array.
   This has cost 2.
   And so on.
   If we arrange the problem instances of size 20 from least expensive
   on the left to most expensive on the right, we see that the graph
   forms a diagonal line from lower left (with value 0) to upper right
   (with value 20).
   Sketch this graph for yourself.

   Finally, let us consider the cost for performing sequential search
   as the size of the array :math:`n` gets bigger.
   What will this graph look like?
   Unfortunately, there's not one simple answer, as there was for
   finding the maximum value.
   The shape of this graph depends on whether we are considering the
   best case cost (that would be a horizontal line with value 1),
   the worst case cost (that would be a diagonal line with value
   :math:`i` at position :math:`i` along the :math:`x` axis), or the
   average cost (that would be a a diagonal line with value
   :math:`i/2` at position :math:`i` along the :math:`x` axis).
   This is why we must always say that function :math:`f(n)` is in
   :math:`O(g(n))` in the best, average, or worst case!
   If we leave off which class of inputs we are discussing, we cannot
   know which cost measure we are referring to for most algorithms.

.. todo::
   :type: Slideshow

   We need to draw the graphs for the previous example and make the discussion as a series of slides.