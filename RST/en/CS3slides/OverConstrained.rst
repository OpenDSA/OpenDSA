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
  quadrant the second point (2) is in w.r.t. the first point (1):

 ::
    public static String getQuadrant(int x1, int y1, int x2, int y2) {
        if ((x2 < x1) && (y2 < y1))
            return "North-West";
        else if ((x2 < x1) && (y2 >= y1))
            return "South-West";
        else if ((x2 >= x1) && (y2 < y1))
            return "North-East";
        else if ((x2 >= x1) && (y2 >= y1))
            return "South-East";
        return null; // This should never happen
    }

* This has the virtue of being quite thorough and clear.
  However, it has some problems.


Over-constrained Code (2)
-------------------------

.. revealjs-slide::

* It is inefficient, compared to alternatives.
* But our real concern has to do with testing and code coverage.
* Fact: No series of tests will cover all branches in this code.
  
  * Q: Why?
  * A: Consider every possible branch and see what can get triggered.
    There are at least 8 branches, and only 4 possible outcomes!!

* Consider what happens when the y comparison in the second ``if``
  statement is mutated to "true".

  * This effectively becomes the same as the first ``if`` statement.
    A point to the North-West SHOULD fail here, but it would already
    have been caught by the first ``if`` statement.


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
    public static String getQuadrant2(int x1, int y1, int x2, int y2) {
        if (x2 < x1) {
            if (y2 < y1)
                return "North-West";
            return "South-West";
        }
        if (y2 < y1)
            return "North-East";
        return "South-East";
    }

* Not only can you test every branch, but this is more efficient!
  Every branch requires 2 tests.


