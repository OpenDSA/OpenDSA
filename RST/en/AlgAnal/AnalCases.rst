.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: growth rate
   :satisfies: best and worst case
   :topic: Algorithm Analysis
   
.. odsalink:: AV/AlgAnal/AnalCasesCON.css

Best, Worst, and Average Cases
==============================

Best, Worst, and Average Cases
------------------------------

.. inlineav:: AnalCasesSameCON ss
   :output: show

|

.. inlineav:: AnalCasesDiffCON ss
   :output: show

When analyzing an algorithm, should we study the best, worst, or
average case?
Normally we are not interested in the best case, because this might
happen only rarely and generally is too optimistic for a fair
characterization of the algorithm's running time.
In other words, analysis based on the best case is not likely to be
representative of the behavior of the algorithm.
However, there are rare instances where a best-case analysis is
useful |---| in particular, when the best case has high probability of
occurring.
The :ref:`Shellsort <Shellsort> <Shellsort>` and
:ref:`Quicksort <Quicksort> <Quicksort>`
algorithms both can take advantage of the best-case running time
of :ref:`Insertion Sort <Insertion Sort> <InsertionSort>`
to become more efficient.

How about the worst case?
The advantage to analyzing the worst case is that you know for
certain that the algorithm must perform at least that well.
This is especially important for real-time applications,
such as for the computers that monitor an air traffic control system.
Here, it would not be acceptable to use an algorithm that can handle
:math:`n` airplanes quickly enough *most of the time*, but which
fails to perform quickly enough when all :math:`n` airplanes are coming
from the same direction.

For other applications |---| particularly when we wish to aggregate
the cost of running the program many times on many different inputs
|---| worst-case analysis might not be a representative measure of the
algorithm's performance.
Often we prefer to know the average-case running time.
This means that we would like to know the *typical* behavior of
the algorithm on inputs of size :math:`n`.
Unfortunately, average-case analysis is not always possible.
Average-case analysis first requires that we understand how the actual
inputs to the program (and their costs) are distributed with respect
to the set of all possible inputs to the program.
For example, it was stated previously that the sequential search
algorithm on average examines half of the array values.
This is only true if the element with value :math:`K` is
equally likely to appear in any position in the array.
If this assumption is not correct, then the algorithm does *not*
necessarily examine half of the array values in the average case.

The characteristics of a data distribution have a significant effect
on many search algorithms, such as those based on
:ref:`hashing <hashing> <HashIntro>` and search trees such as the
:ref:`BST <binary search tree> <BST>`. 
Incorrect assumptions about data distribution can have disastrous
consequences on a program's space or time performance.
Unusual data distributions can also be used to advantage,
such as is done by
:ref:`self-organizing lists <self-organizing list> <SelfOrg>`.

In summary, for real-time applications
we are likely to prefer a worst-case analysis of an algorithm.
Otherwise, we often desire an average-case analysis if we know enough
about the distribution of our input to compute the average case.
If not, then we must resort to worst-case analysis.

.. odsascript:: AV/AlgAnal/AnalCasesSameCON.js	  
.. odsascript:: AV/AlgAnal/AnalCasesDiffCON.js	  
