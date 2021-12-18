.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer and Mostafa Mohammed
   :topic: Reductions

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


Reduction and Finding a Lower Bound
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. inlineav:: LowerBoundFS ff
   :links: AV/PIFLA/LimComp/LowerBoundFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/LimComp/LowerBoundFS.js
   :output: show


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
