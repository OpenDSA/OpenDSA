.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer


Algorithm Analysis: Part 1
==========================

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

Growth Rate Example (1)
-----------------------

.. revealjs-slide::

Example 1: Find largest value

.. codeinclude:: Misc/LargestTest
   :tag: Largest


Growth Rate Example (2)
-----------------------

.. revealjs-slide::

Example 2: Assignment statement

Example 3: Double loop

.. codeinclude:: Misc/Anal
   :tag: c3p4

         
Growth Rate Graph (1)
---------------------

.. revealjs-slide::

.. inlineav:: GrowthRatesCON dgm
    :links: AV/AlgAnal/GrowthRatesCON.css
    :scripts: DataStructures/Plot.js AV/AlgAnal/GrowthRatesCON.js
    :align: center

            
Growth Rate Graph (2)
---------------------

.. revealjs-slide::

.. inlineav:: GrowthRatesZoomCON dgm
   :links: AV/AlgAnal/GrowthRatesZoomCON.css
   :scripts: DataStructures/Plot.js AV/AlgAnal/GrowthRatesZoomCON.js
   :align: center


Best, Worst, Average Cases
--------------------------

.. revealjs-slide::

* Not all inputs of a given size take the same time to run.

  * Sequential search for K in an array of :math:`n` integers:

  * Begin at first element in array and look at each element in turn
    until K is found

    * Best case:
    * Worst case:
    * Average case:


Which Analysis to Use?
----------------------

.. revealjs-slide::

* While average time appears to be the fairest measure, it may be
  difficult to determine.
  
* When is the worst case time important?


Faster Computer or Algorithm?
-----------------------------

.. revealjs-slide::

Suppose we buy a computer 10 times faster.

.. math::

   \begin{array} {l|r|r|l|r}
   \mathbf{f(n)} &
   \mathbf{n} &
   \mathbf{n'} &
   \mathbf{Change} &
   \mathbf{n'/n}\\
   \hline
   10n         & 1000 & 10,000 & n' = 10n               & 10\\
   20n         & 500  & 5000   & n' = 10n               & 10\\
   5 n \log n  & 250  & 1842   & \sqrt{10} n < n' < 10n & 7.37\\
   2 n^2       & 70   & 223    & n' = \sqrt{10} n       & 3.16\\
   2^n         & 13   & 16     & n' = n + 3             & --\\
   \end{array}

* :math:`n`: size of input that can be processed in one second on old
  computer (in 1000 computational units)

* :math:`n'`: size of input that can be processed in one second on new
  computer (in 10,000 computational units)
