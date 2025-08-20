.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

=====================
Over-Constrained Code
=====================

Over-constrained Code (1)
-------------------------

.. revealjs-slide::

* Consider the situation where we have two points. We want to know which
  quadrant the second point (b) is in w.r.t. the first point (a):

 ::

    if ((b.x < a.x) && (b.y < a.y))
      doNW();
    else if ((b.x < a.x) && (b.y >= a.y))
      doSW();
    else if ((b.x >= a.x) && (b.y < a.y))
      doNE();
    else if ((b.x >= a.x) && (b.y >= a.y))
      doSE();

* This has the virtue of being quite logical and clear. However, it has
  some problems.


Over-constrained Code (2)
-------------------------

.. revealjs-slide::

* It is horribly inefficient, compared to alternatives.
* But our real concern has to do with testing and code coverage.
* Fact: No series of tests will cover all branches in this code.
* Q: Why?
* A: Consider every possible branch and see what can get
  triggered. Consider that there have to be at least 8+ branches, and
  only 4 possible inputs!!
* Try to hit every branch by brute force, one at a time...


Over-constrained Code (3)
-------------------------

.. revealjs-slide::

* Q: If we want complete code coverage when there are only four
  logically distinct inputs, then we had better do what?
* A: Come up with code that has only four branches!


Over-constrained Code (4)
-------------------------

.. revealjs-slide::

* Refactored code:

  ::

     if (b.x < a.x)
       if (b.y < a.y)
         doNW();
       else
         doSW();
     else
       if (b.y < a.y)
         doNE();
       else
         doSE();

* Not only can you test every branch, but this is a lot more efficient!
  Every branch requires 2 tests.
