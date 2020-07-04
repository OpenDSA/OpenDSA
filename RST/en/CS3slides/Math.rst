.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

===============
Math Background
===============

Math Background
---------------

.. slide:: Topics

   | Set concepts and notation
   | Logarithms
   |    To store codes for :math:`n` objects required :math:`\log n`
        bits. :math:`n` bits can represent :math:`2^n` objects
   |    You can cut :math:`n` objects in half :math:`\log n` times
   |    :math:`n = 2^{\log_2 n}`
   | Recursion
   | Induction Proofs
   | Summations
   | Recurrence Relations
   | Estimation


.. slide:: Estimation Techniques

   | Known as "back of the envelope" or "back of the napkin"
     calculation
   |   1. Determine the major parameters that affect the problem.
   |   2. Define an equation that relates the parameters to the
          problem.
   |   3. Select values for the parameters, and apply the equation to
          yield an estimated solution.


.. slide:: Estimation Example

   | How many library bookcasese does it take to store books totalling
     one million pages?

   | Estimate
   |   - Pages/inch
   |   - Feet/shelf
   |   - Shelves/bookcase

