.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Algorithm Analysis

Best, Worst, and Average Cases [Text]
=====================================

Consider the problem of finding the factorial of :math:`n`.
For this problem, there is only one input of a given "size" (that
is, there is only a single instance for each size of :math:`n`).
Now consider our largest-value sequential search
algorithm of Example :num:`Example #SeqMax`, which always examines
every array value.
This algorithm works on many inputs of a given size :math:`n`.
That is, there are many possible arrays of any given size.
However, no matter what array of size :math:`n` that the algorithm
looks at, its cost will always be the same in that it always looks at
every element in the array one time.

For some algorithms, different inputs of a given size require
different amounts of time.
For example, consider the problem of searching an array containing
:math:`n` integers to find the one with a particular value :math:`K`
(assume that :math:`K` appears exactly once in the array).
The :dfn:`sequential search` algorithm begins
at the first position in the array and looks at each value in turn
until :math:`K` is found.
Once :math:`K` is found, the algorithm stops.
This is different from the largest-value sequential search
algorithm of Example :num:`Example #SeqMax`, which always examines
every array value.

There is a wide range of possible running
times for the sequential search algorithm.
The first integer in the array could have value :math:`K`,
and so only one integer is examined.
In this case the running time is short.
This is the :dfn:`best case` for this algorithm, because it is not
possible for sequential search to look at less than one value.
Alternatively, if the last position in the array contains :math:`K`,
then the running time is relatively long, because the algorithm
must examine :math:`n` values.
This is the :dfn:`worst case` for this algorithm, because sequential
search never looks at more than each of the :math:`n` values in the
array.
If we implement sequential search as a program and run it many times
on many different arrays of size :math:`n`,
or search for many different values of :math:`K` within the same
array, we expect the algorithm on average to go halfway through the
array before finding the value we seek.
On average, the algorithm examines about :math:`n/2` values.
We call this the :math:`average case` for this algorithm.

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
In Modules :numref:`<Shellsort>` and :numref:`<Quicksort>` you will
see some examples where taking advantage of the best-case running time
for one sorting algorithm makes a second more efficient.

How about the worst case?
The advantage to analyzing the worst case is that you know for
certain that the algorithm must perform at least that well.
This is especially important for real-time applications,
such as for the computers that monitor an air traffic control system.
Here, it would not be acceptable to use an algorithm that can handle
:math:`n` airplanes quickly enough *most of the time*, but which
fails to perform quickly enough when all :math:`n` airplanes are coming
from the same direction.

.. TODO::
   :type: Text

   Find a more realistic real-time example than this one with the
   airplanes.

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
See Module :numref:`<SelfOrg>` for further discussion regarding the
effects of data distribution on the sequential search algorithm.

The characteristics of a data distribution have a significant effect
on many search algorithms, such as those based on
hashing (Module :numref:`<HashIntro>`) and search
trees (e.g., see Module :numref:`<BST>`).
Incorrect assumptions about data distribution can have disastrous
consequences on a program's space or time performance.
Unusual data distributions can also be used to advantage, as shown in
Module :numref:`<SelfOrg>`.

In summary, for real-time applications
we are likely to prefer a worst-case analysis of an algorithm.
Otherwise, we often desire an average-case analysis if we know enough
about the distribution of our input to compute the average case.
If not, then we must resort to worst-case analysis.

.. TODO::
   :type: Exercise

   Write a battery of summary questions
