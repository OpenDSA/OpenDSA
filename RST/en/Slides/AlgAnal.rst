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

.. slide:: Growth Rate Example (1)

   Example 1: Find largest value

   .. codeinclude:: Misc/LargestTest
      :tag: Largest

.. slide:: Growth Rate Example (2)

   Example 2: Assignment statement

   Example 3: Double loop

   .. codeinclude:: Misc/Anal 
      :tag: c3p4

.. slide:: Growth Rate Graph

   .. odsafig:: Images/plot.png
      :height: 500
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: The growth rates for five equations

.. slide:: Best, Worst, Average Cases

   Not all inputs of a given size take the same time to run.

   Sequential search for K in an array of n integers:

   * Begin at first element in array and look at each element in turn
     until K is found

   Best case:

   Worst case:

   Average case:


.. slide:: Which Analysis to Use?

   * While average time appears to be the fairest measure, it may be
     difficult to determine.

   * When is the worst case time important?

.. slide:: Faster Computer or Algorithm?

   Suppose we buy a computer 10 times faster.

   * n: size of input that can be processed in one second on old computer
     (in 1000 computational units)

   * n’: size of input that can be processed in one second on new computer
     (in 10,000 computational units)

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

.. slide:: Asymptotic Analysis: Big-oh

   Definition: For T(n) a non-negatively valued function, T(n) is in the
   set O(f(n)) if there exist two positive constants c and n0 such that
   T(n) <= cf(n) for all n > n0.

   Use: The algorithm is in O(n2) in [best, average, worst] case.

   Meaning: For all data sets big enough (i.e., n>n0), the algorithm
   always executes in less than cf(n) steps in [best, average, worst]
   case.

.. slide:: Big-oh Notation (cont)

   Big-oh notation indicates an upper bound.

   Example: If T(n) = 3n2 then T(n) is in O(n2).

   Look for the tightest upper bound:

   * While T(n) = 3n2 is in O(n3), we prefer O(n2).


.. slide:: Big-Oh Examples

   Example 1: Finding value X in an array (average cost).

   Then T(n) = csn/2.

   For all values of n > 1, csn/2 <= csn.

   Therefore, the definition is satisfied for f(n)=n, n0 = 1, and c = cs.
   Hence, T(n) is in O(n).


.. slide:: Big-Oh Examples (2)

   Example 2: Suppose T(n) = c1n2 + c2n, where c1 and c2 are positive.

   c1n2 + c2n <= c1n2 + c2n2 <= (c1 + c2)n2 for all n > 1.

   Then T(n) <= cn2 whenever n > n0, for c = c1 + c2 and n0 = 1.

   Therefore, T(n) is in O(n2) by definition.

   Example 3: T(n) = c.  Then T(n) is in O(1).

.. slide:: A Common Misunderstanding

   “The best case for my algorithm is n=1 because that is the fastest.”

   WRONG!

   Big-oh refers to a growth rate as n grows to :math:`\infty`

   Best case is defined for the input of size n that is cheapest among
   all inputs of size n.

.. slide:: Big-Omega :math:`\Omega`

   Definition: For T(n) a non-negatively valued function, T(n) is in the
   set :math:`\Omega(g(n))` if there exist two positive constants c
   and n0 such that T(n) >= cg(n) for all n > n0.

   Meaning: For all data sets big enough (i.e.,  n > n0), the algorithm
   always requires more than cg(n) steps.

   Lower bound.


.. slide:: Big-Omega Example

   T(n) = c1n2 + c2n.

   c1n2 + c2n >= c1n2 for all n > 1.

   T(n) >= cn2 for c = c1 and n0 = 1.

   Therefore, T(n) is in (n2) by the definition.

   We want the greatest lower bound.

.. slide:: Theta Notation :math:`\Theta`

   When big-Oh and :math:`\Omega` coincide, we indicate this by using 
   :math:`\Theta` (big-Theta) notation.

   Definition: An algorithm is said to be in :math:`\Theta(h(n))` if
   it is in :math:`O(h(n))` and it is in :math:`\Omega(h(n))`.


.. slide:: A Common Misunderstanding

   Confusing worst case with upper bound.

   Upper bound refers to a growth rate.

   Worst case refers to the worst input from among the choices for
   possible inputs of a given size.

.. slide:: Simplifying Rules

   #. If f(n) is in O(g(n)) and g(n) is in O(h(n)), then f(n) is in O(h(n)).

   #. If f(n) is in O(kg(n)) for some constant k > 0, then f(n) is in
      O(g(n)).

   #. If f1(n) is in O(g1(n)) and f2(n) is in O(g2(n)), then (f1 + f2)(n) is
      in O(max(g1(n), g2(n))).

   #. If f1(n) is in O(g1(n)) and f2(n) is in O(g2(n)) then f1(n)f2(n) is in
      O(g1(n)g2(n)).

.. slide:: Time Complexity Examples (1)

   Example: a = b;

   This assignment takes constant time, so it is :math:`\Theta(1)`.

   Example:

   .. codeinclude:: Misc/Anal 
      :tag: c3p3

.. slide:: Time Complexity Examples (2)

   Example:

   .. codeinclude:: Misc/Anal 
      :tag: c3p4

.. slide:: Time Complexity Examples (3)

   Example: Compare these two code fragments:

   .. codeinclude:: Misc/Anal 
      :tag: c3p5

.. slide:: Time Complexity Examples (4)

   Not all double loops are :math:`\Theta(n^2)`.

   .. codeinclude:: Misc/Anal
      :tag: c3p6

.. slide:: Binary Search

   How many elements are examined in worst case?

   .. codeinclude:: Searching/Bsearch
      :tag: BinarySearch


.. slide:: Other Control Statements

   while loop: Analyze like a for loop.

   if statement: Take greater complexity of then/else clauses.

   switch statement: Take complexity of most expensive case.

   Subroutine call: Complexity of the subroutine.

.. slide:: Analyzing Problems

   Upper bound: Upper bound of best known algorithm.

   Lower bound: Lower bound for every possible algorithm.

.. slide:: Analyzing Problems: Example

   May or may not be able to obtain matching upper and lower bounds.

   Example of imperfect knowledge: Sorting

   1. Cost of I/O: (n).
   2. Bubble or insertion sort: O(n2).
   3. A better sort (Quicksort, Mergesort, Heapsort, etc.): O(n log n).
   4. We prove later that sorting is in (n log n).

.. slide:: Space/Time Tradeoff Principle

   One can often reduce time if one is willing to sacrifice space, or
   vice versa.

   * Encoding or packing information
      * Boolean flags

   * Table lookup
      * Factorials

   Disk-based Space/Time Tradeoff Principle: The smaller you make the
   disk storage requirements, the faster your program will run.

.. slide:: Multiple Parameters

   Compute the rank ordering for all C pixel values in a picture of P
   pixels.

   .. codeinclude:: Misc/Anal 
      :tag: c3p16

   If we use P as the measure, then time is :math:`(P \log P)`.

   More accurate is :math:`\Theta(P + C log C)`.

.. slide:: Space Complexity

   Space complexity can also be analyzed with asymptotic complexity
   analysis.

   Time: Algorithm

   Space: Data Structure
