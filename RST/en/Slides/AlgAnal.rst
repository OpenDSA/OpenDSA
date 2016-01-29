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

   .. rst-class:: build

   * Critical resources:

   * Factors affecting running time:

   * For most algorithms, running time depends on “size” of the input.

   * Running time is expressed as :math:`\mathbf{T}(n)` for some
     function :math:`\mathbf{T}` on input size :math:`n`.


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

   Sequential search for K in an array of :math:`n` integers:

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

.. slide:: Faster Computer or Algorithm? 2

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

   Definition: For :math:`\mathbf{T}(n)` a non-negatively valued
   function, :math:`\mathbf{T}(n)` is in the set :math:`O(f(n))` if
   there exist two positive constants :math:`c` and :math:`n_0` such
   that :math:`T(n) \leq cf(n)` for all :math:`n > n_0`.

   Use: The algorithm is in :math:`O(n^2)` in [best, average, worst]
   case.

   Meaning: For all data sets big enough (i.e., :math:`n>n_0`),
   the algorithm always executes in less than :math:`cf(n)` steps in
   the [best, average, worst] case.

.. slide:: Big-oh Notation (cont)

   Big-oh notation indicates an upper bound.

   Example: If :math:`\mathbf{T}(n) = 3n^2` then :math:`\mathbf{T}(n)`
   is in :math:`O(n^2)`.

   Look for the tightest upper bound:

   * While :math:`\mathbf{T}(n) = 3n^2` is in :math:`O(n^3)`, we
     prefer :math:`O(n^2)`.


.. slide:: Big-Oh Examples

   Example 1: Finding value X in an array (average cost).

   Then :math:`\textbf{T}(n) = c_{s}n/2`.

   For all values of :math:`n > 1, c_{s}n/2 \leq c_{s}n`.

   Therefore, the definition is satisfied for :math:`f(n)=n, n_0 = 1`,
   and :math:`c = c_s`.
   Hence, :math:`\textbf{T}(n)` is in :math:`O(n)`.


.. slide:: Big-Oh Examples (2)

   Example 2: Suppose :math:`\textbf{T}(n) = c_{1}n^2 + c_{2}n`, where
   :math:`c_1` and :math:`c_2` are positive. 

   :math:`c_{1}n^2 + c_{2}n \leq c_{1}n^2 + c_{2}n^2 \leq (c_1 + c_2)n^2`
   for all :math:`n > 1`.

   Then :math:`\textbf{T}(n) \leq cn^2` whenever :math:`n > n_0`,
   for :math:`c = c_1 + c_2` and :math:`n_0 = 1`.

   Therefore, :math:`\textbf{T}(n)` is in :math:`O(n^2)` by definition.

   Example 3: :math:`\textbf{T}(n) = c`.  Then :math:`\textbf{T}(n)`
   is in :math:`O(1)`.

.. slide:: A Common Misunderstanding

   “The best case for my algorithm is n=1 because that is the fastest.”

   WRONG!

   Big-oh refers to a growth rate as n grows to :math:`\infty`

   Best case is defined for the input of size n that is cheapest among
   all inputs of size :math:`n`.

.. slide:: Big-Omega :math:`\Omega`

   Definition: For :math:`\textbf{T}(n)` a non-negatively valued
   function, :math:`\textbf{T}(n)` is in the
   set :math:`\Omega(g(n))` if there exist two positive constants :math:`c`
   and :math:`n_0` such that :math:`\textbf{T}(n) \geq cg(n)` for all
   :math:`n > n_0`.

   Meaning: For all data sets big enough (i.e., :math:`n > n_0`),
   the algorithm always requires more than :math:`cg(n)` steps.

   Lower bound.


.. slide:: Big-Omega Example

   :math:`\textbf{T}(n) = c_1n^2 + c_2n`.

   :math:`c_1n^2 + c_2n \geq c_1n^2` for all :math:`n > 1`.

   :math:`\textbf{T}(n) \geq cn^2` for :math:`c = c_1` and :math:`n_0 = 1`.

   Therefore, :math:`\textbf{T}(n)` is in :math:`\Omega(n^2)` by the
   definition.

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

   #. If :math:`f(n)` is in :math:`O(g(n))` and :math:`g(n)` is in
      :math:`O(h(n))`, then :math:`f(n)` is in :math:`O(h(n))`.

   #. If :math:`f(n)` is in :math:`O(kg(n))` for some constant
      :math:`k > 0`, then :math:`f(n)` is in :math:`O(g(n))`.

   #. If :math:`f_1(n)` is in :math:`O(g_1(n))` and :math:`f_2(n)` is
      in :math:`O(g_2(n))`, then :math:`(f_1 + f_2)(n)` is
      in :math:`O(\max(g_1(n), g_2(n)))`.

   #. If :math:`f_1(n)` is in :math:`O(g_1(n))` and :math:`f_2(n)` is
      in :math:`O(g_2(n))`, then :math:`f_1(n)f_2(n)` is in
      :math:`O(g_1(n)g_2(n))`.

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

   1. Cost of I/O: :math:`\Omega(n)`.
   2. Bubble or insertion sort: :math:`O(n^2)`.
   3. A better sort (Quicksort, Mergesort, Heapsort, etc.): :math:`O(n \log n)`.
   4. We prove later that sorting is in :math:`\Omega(n \log n)`.

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
