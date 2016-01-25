.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. odsalink:: AV/AlgAnal/ProblemAlgorithmCON.css

.. slideconf::
   :autoslides: False

==================
Algorithm Analysis
==================

.. slide:: Algorithm Efficiency

   There are often many approaches (algorithms) to solve a problem.
   How do we choose between them?

   At the heart of computer program design are two (sometimes
   conflicting) goals.

    #. To design an algorithm that is easy to understand, code, debug.
    #. To design an algorithm that makes efficient use of the
       computer’s resources.

    Goal (1) is the concern of Software Engineering

    Goal (2) is the concern of data structures and algorithm analysis


.. slide:: How to Measure Efficiency?

   #. Empirical comparison (run programs)
   #. Asymptotic Algorithm Analysis

   Critical resources:

   Factors affecting running time:

   For most algorithms, running time depends on “size” of the input.

   Running time is expressed as T(n) for some function T on input size n.


.. slide:: Problems, Algorithms, Programs

   .. inlineav:: ProblemAlgorithmCON ss
      :output: show

   .. odsascript:: AV/AlgAnal/ProblemAlgorithmCON.js

.. slide:: Examples of Growth Rate (1)

   .. codeinclude:: Misc/LargestTest
      :tag: Largest
