.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: binary search
   :topic: Searching

.. odsalink:: AV/Searching/binarySearchCON.css

Searching in an Array
=====================

Sequential Search
-----------------

If you want to find the position in an unsorted array of :math:`n`
integers that stores a particular value, you cannot really do better
than simply looking through the array from the beginning and move
toward the end until you find what you are looking for.
This algorithm is called :term:`sequential search`.
If you do find it, we call this a :term:`successful search`.
If the value is not in the array, eventually you will reach the end.
We will call this an :term:`unsuccessful search`.
Here is a simple implementation for sequential search.

.. codeinclude:: Searching/Sequential
      :tag: Sequential

It is natural to ask how long a program or algorithm will take to
run.
But we do not really care exactly how long a particular program will
run on a particular computer.
We just want some sort of estimate that will let us compare one
approach to solving a problem with another.
This is the basic idea of :term:`algorithm analysis`.
In the case of sequential search, it is easy to see that if the value
is in position :math:`i` of the array, then sequential search will
look at :math:`i` values to find it.
If the value is not in the array at all, then we must look at
:math:`n` values if the array holds :math:`n` values.
This would be called the :term:`worst case` for sequential search.
Since the amount of work is proportional to :math:`n`,
we say that the worst case for sequential search has
:term:`linear cost <linear growth rate>`.
For this reason, the sequential search algorithm is sometimes
called :term:`linear search`.

Binary Search
-------------

Sequential search is the best that we can do when trying to find a
value in an unsorted array. [#]_
But if the array is sorted in increasing order by value, then we can
do much better.
We use a process called :term:`binary search`.

Binary search begins by examining the value in the middle
position of the array; call this position :math:`mid` and the
corresponding value :math:`k_{mid}`.
If :math:`k_{mid} = K`, then processing can stop immediately.
This is unlikely to be the case, however.
Fortunately, knowing the middle value provides useful information
that can help guide the search process.
In particular, if :math:`k_{mid} > K`, then you know that the value
:math:`K` cannot appear in the array at any position greater
than :math:`mid`. 
Thus, you can eliminate future search in the upper half of the array.
Conversely, if :math:`k_{mid} < K`, then you know that you can
ignore all positions in the array less than :math:`mid`.
Either way, half of the positions are eliminated from further
consideration.
Binary search next looks at the middle position in that part of the
array where value :math:`K` may exist.
The value at this position again allows us to eliminate half
of the remaining positions from consideration.
This process repeats until either the desired value is found, or
there are no positions remaining in the array that might contain the
value :math:`K`.
Here is an illustration of the binary search method.

.. inlineav:: binarySearchCON ss
   :output: show

With the right math techniques, it is not too hard to show that the
cost of binary search on an array of :math:`n` values is at most
:math:`\log n`.
This is because we are repeatedly splitting the size of the subarray
that we must look at in half.
We stop (in the worst case) when we reach a subarray of size 1.
And we can only cut the value of :math:`n` in half :math:`\log n`
times before we reach 1. [#]_

.. avembed:: AV/Searching/binarySearchPRO.html ss

.. [#] It seems to be really "obvious" that sequential search is the
       best that you can do on an unsorted array. 
       But writing a convincing proof that no algorithm could ever be
       discovered that is better is surprisingly difficult.
       This is an example of a
       :ref:`lower bounds proof <lower bounds proof> <BoundLower>` to
       find the cost for the beest possible :term:`algorithm` to solve
       the :term:`problem` of search in an unsorted array.

.. [#] It is possible to
       :ref:`prove <Search Lower Bound> <BoundSearch>`
       that binary search is the most efficient algorithm possible in
       the worst case when searching in a sorted array.
       This is even more difficult than proving the sequential search
       is the most efficient algorithm possible on an unsorted array.

.. odsascript:: AV/Searching/binarySearchCON.js
