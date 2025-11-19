.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer


Algorithm Analysis Part 1
=========================

Algorithm Efficiency
--------------------

.. revealjs-slide::

* There are often many approaches (algorithms) to solve a problem.
  How do we choose between them?

* At the heart of computer program design are two (sometimes
  conflicting) goals.

  1. To design an algorithm that is easy to understand, code, debug.
  2. To design an algorithm that makes efficient use of the
     computer’s resources.

* Goal (1) is the concern of Software Engineering

* Goal (2) is the concern of data structures and algorithm analysis


How to Measure Efficiency?
--------------------------

.. revealjs-slide::

* Two approaches:

  1. Empirical comparison (run programs)
  2. Asymptotic Algorithm Analysis

* What are the Critical resources?

* What are the factors affecting running time?

  * For most algorithms, running time depends on “size” of the input.

  * Running time is expressed as :math:`\mathbf{T}(n)` for some
    function :math:`\mathbf{T}` on input size :math:`n`.


Problems, Algorithms, Programs
------------------------------

.. revealjs-slide::

.. inlineav:: ProblemAlgorithmCON ss
   :links: AV/AlgAnal/ProblemAlgorithmCON.css
   :scripts: AV/AlgAnal/ProblemAlgorithmCON.js
   :output: show

