.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer and Mostafa Mohammed
   :topic: Reductions
   :keyword: Reductions


Reductions
==========

Reductions
----------

This module introduces an important concept for
understanding the relationships between problems, called
:term:`reduction`.
Reduction allows us to solve one problem in terms of another.
Equally importantly, when we wish to understand the difficulty of a
problem, reduction allows us to make relative statements about
upper and lower bounds on the cost of a problem (as opposed to an
algorithm or program).

Because the concept of a problem is discussed extensively in this
chapter, we want notation to simplify problem descriptions.
Throughout this chapter, a problem will be defined in terms of a
mapping between inputs and outputs, and the name of the problem will
be given in all capital letters.
Thus, a complete definition of the sorting problem could appear as
follows:

.. topic:: SORTING

   **Input:** A sequence of integers
   :math:`x_0, x_1, x_2, \ldots, x_{n-1}`.

   **Output:**
   A permutation :math:`y_0, y_1, y_2, \ldots, y_{n-1}` of the
   sequence such that :math:`y_i \leq y_j` whenever :math:`i < j`.

.. inlineav:: Pair2SortFS ff
   :links: AV/PIFLA/LimComp/Pair2SortFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/LimComp/Pair2SortFS.js
   :output: show
   :keyword: Reductions


Reduction and Finding a Lower Bound
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. inlineav:: LowerBoundFS ff
   :links: AV/PIFLA/LimComp/LowerBoundFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/LimComp/LowerBoundFS.js
   :output: show
   :keyword: Reductions


.. _BlackBox:

.. odsafig:: Images/BlackBox.png
   :width: 200
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: General blackbox reduction

   The general process for reduction shown as a "blackbox" diagram.


Reduction Examples
------------------

.. inlineav:: TwoMulExampleFS ff
   :links: AV/PIFLA/LimComp/TwoMulExampleFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/LimComp/TwoMulExampleFS.js
   :output: show
   :keyword: Reductions


Bounds Theorems
---------------

We will use the following notation:
:math:`\leq_{O(g(n))}` means that a reduction can be done
with transformations that cost :math:`O(g(n))`.

**Lower Bound Theorem**: If :math:`P_1 \leq_{O(g(n))} P_2`,
then there is a lower bound of :math:`\Omega(h(n))` on the time
complexity of :math:`P_1`, and :math:`g(n) = o(h(n))`,
then there is a lower bound of :math:`\Omega(h(n))` on
:math:`P_2`.
(Notice little-oh, not big-Oh.)

Example:
SORTING :math:`\leq_{O(n)}` PAIRING, because
:math:`g(n) = n`, :math:`h(n) = n \log n`, and
:math:`g(n) = o(h(n))`.
The Lower Bound Theorem gives us an :math:`\Omega(n \log n)`
lower bound on PAIRING.

This also goes the other way.

**Upper Bound Theorem**: If :math:`P_2` has time complexity
:math:`O(h(n))` and :math:`P_1 \leq_{O(g(n))} P_2`, then
:math:`P_1` has time complexity :math:`O(g(n) + h(n))`.

So, given good transformations, both problems take at least
:math:`\Omega(P_1)` and at most :math:`O(P_2)`.


