.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer


Algorithm Analysis Part 3
=========================

Time Complexity Examples (1)
----------------------------

.. revealjs-slide::

* Example: a = b;

  * This assignment takes constant time, so it is :math:`\Theta(1)`.

* Example:

.. codeinclude:: Misc/Anal
   :tag: c3p3


Time Complexity Examples (2)
----------------------------

.. revealjs-slide::

* Example:

.. codeinclude:: Misc/Anal
   :tag: c3p4


Time Complexity Examples (3)
----------------------------

.. revealjs-slide::

* Example: Compare these two code fragments:

.. codeinclude:: Misc/Anal
   :tag: c3p5


Time Complexity Examples (4)
----------------------------

.. revealjs-slide::

* Not all double loops are :math:`\Theta(n^2)`.

.. codeinclude:: Misc/Anal
   :tag: c3p6


Binary Search
-------------

.. revealjs-slide::

* How many elements are examined in worst case?

.. codeinclude:: Searching/Bsearch
   :tag: BinarySearch


Other Control Statements
------------------------

.. revealjs-slide::

* while loop: Analyze like a for loop.

* if statement: Take greater complexity of then/else clauses.

* switch statement: Take complexity of most expensive case.

* Subroutine call: Complexity of the subroutine.


Analyzing Problems
------------------

.. revealjs-slide::

* Upper bound: Upper bound of best known algorithm.

* Lower bound: Lower bound for every possible algorithm.


Analyzing Problems: Example
---------------------------

.. revealjs-slide::

* May or may not be able to obtain matching upper and lower bounds.

* Example of imperfect knowledge: Sorting

  1. Cost of I/O: :math:`\Omega(n)`.
  2. Bubble or insertion sort: :math:`O(n^2)`.
  3. A better sort (Quicksort, Mergesort, Heapsort, etc.): :math:`O(n \log n)`.
  4. We prove later that sorting is in :math:`\Omega(n \log n)`.


Space/Time Tradeoff Principle
-----------------------------

.. revealjs-slide::

* One can often reduce time if one is willing to sacrifice space, or
  vice versa.

* Encoding or packing information

  * Boolean flags: Need less space, but take time to unpack

* Table lookup

  * Factorials: Store a table of values for lookup instead of computing

* Disk-based Space/Time Tradeoff Principle: The smaller you make the
  disk storage requirements, the faster your program will run.


Multiple Parameters
-------------------

.. revealjs-slide::

* Compute the rank ordering for all C pixel values in a picture of P
  pixels.

.. codeinclude:: Misc/Anal
   :tag: c3p16

* If we use P as the measure, then time is :math:`(P \log
  P)`. Unrealistically high.

* If we use C as the measure, then time is :math:`(C \log
  C)`. Unrealistically low.

* More accurate is :math:`\Theta(P + C \log C)`.


Space Complexity
----------------

.. revealjs-slide::

* Space complexity can also be analyzed with asymptotic complexity
  analysis.

* Time: Algorithm

* Space: Data Structure


