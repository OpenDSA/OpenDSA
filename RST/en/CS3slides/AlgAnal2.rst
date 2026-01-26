.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer


Algorithm Analysis Part 2
=========================

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


Asymptotic Analysis: Big-oh
---------------------------

.. revealjs-slide::

* Definition: For :math:`\mathbf{T}(n)` a non-negatively valued
  function, :math:`\mathbf{T}(n)` is in the set :math:`O(f(n))` if
  there exist two positive constants :math:`c` and :math:`n_0` such
  that :math:`T(n) \leq cf(n)` for all :math:`n > n_0`.

* Use: The algorithm is in :math:`O(n^2)` in [best, average, worst]
  case.

* Meaning: For all data sets big enough (i.e., :math:`n>n_0`),
  the algorithm always executes in less than :math:`cf(n)` steps in
  the [best, average, worst] case.


Big-oh Notation (cont)
----------------------

.. revealjs-slide::

* Big-oh notation indicates an upper bound.

* Example: If :math:`\mathbf{T}(n) = 3n^2` then :math:`\mathbf{T}(n)`
  is in :math:`O(n^2)`.

* Look for the tightest upper bound:

  * While :math:`\mathbf{T}(n) = 3n^2` is in :math:`O(n^3)`, we
    prefer :math:`O(n^2)`.


Big-Oh Examples
---------------

.. revealjs-slide::

* Example 1: Finding value X in an array (average cost).

  * Then :math:`\textbf{T}(n) = c_{s}n/2`.

  * For all values of :math:`n > 1, c_{s}n/2 \leq c_{s}n`.

  * Therefore, the definition is satisfied for :math:`f(n)=n, n_0 = 1`,
    and :math:`c = c_s`.
    Hence, :math:`\textbf{T}(n)` is in :math:`O(n)`.


Big-Oh Examples (2)
-------------------

.. revealjs-slide::

* Example 2: Suppose :math:`\textbf{T}(n) = c_{1}n^2 + c_{2}n`, where
  :math:`c_1` and :math:`c_2` are positive.

  * :math:`c_{1}n^2 + c_{2}n \leq c_{1}n^2 + c_{2}n^2 \leq (c_1 + c_2)n^2`
    for all :math:`n > 1`.

  * Then :math:`\textbf{T}(n) \leq cn^2` whenever :math:`n > n_0`,
    for :math:`c = c_1 + c_2` and :math:`n_0 = 1`.

  * Therefore, :math:`\textbf{T}(n)` is in :math:`O(n^2)` by definition.

* Example 3: :math:`\textbf{T}(n) = c`.  Then :math:`\textbf{T}(n)`
  is in :math:`O(1)`.


A Common Misunderstanding
-------------------------

.. revealjs-slide::

* “The best case for my algorithm is n=1 because that is the fastest.”

* WRONG!

* Big-oh refers to a growth rate as n grows to :math:`\infty`

* Best case is defined for the input of size n that is cheapest among
  all inputs of the same size :math:`n`.


Big :math:`\Omega`
------------------

.. revealjs-slide::
       
* Definition: For :math:`\textbf{T}(n)` a non-negatively valued
  function, :math:`\textbf{T}(n)` is in the
  set :math:`\Omega(g(n))` if there exist two positive constants :math:`c`
  and :math:`n_0` such that :math:`\textbf{T}(n) \geq cg(n)` for all
  :math:`n > n_0`.

* Meaning: For all data sets big enough (i.e., :math:`n > n_0`),
  the algorithm always requires more than :math:`cg(n)` steps.

* Lower bound.


Big-Omega Example
-----------------

.. revealjs-slide::

* :math:`\textbf{T}(n) = c_1n^2 + c_2n`.

  * :math:`c_1n^2 + c_2n \geq c_1n^2` for all :math:`n > 1`.

  * :math:`\textbf{T}(n) \geq cn^2` for :math:`c = c_1` and :math:`n_0 = 1`.

  * Therefore, :math:`\textbf{T}(n)` is in :math:`\Omega(n^2)` by the
    definition.

* We want the greatest lower bound.


:math:`\Theta` Notation
-----------------------

.. revealjs-slide::
       
* When big-Oh and :math:`\Omega` coincide, we indicate this by using
  :math:`\Theta` (big-Theta) notation.

* Definition: An algorithm is said to be in :math:`\Theta(h(n))` if
  it is in :math:`O(h(n))` and it is in :math:`\Omega(h(n))`.


A Common Misunderstanding
-------------------------

.. revealjs-slide::

* Confusing worst case with upper bound.

* Upper bound refers to a growth rate.

* Worst case refers to the worst input from among the choices for
  possible inputs of a given size.


Simplifying Rules
-----------------

.. revealjs-slide::

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


Summary (1)
-----------

.. revealjs-slide::

.. inlineav:: SimpleCosts1CON dgm
   :links: AV/SeniorAlgAnal/SimpleCostsCON.css
   :scripts: AV/SeniorAlgAnal/SimpleCosts1CON.js
   :output: show

* If we fix the size of :math:`n`

  * TOH only has one input of any given size :math:`n`.
  * Findmax has the same cost (in terms of number of records viewed) for
    all inputs of size :math:`n`.
  * Find a value has different costs for different arrangements of the
    values in the array (ranging from 1 to n).


Summary (2)
-----------

.. revealjs-slide::

.. inlineav:: SimpleCosts2CON dgm
   :links: AV/SeniorAlgAnal/SimpleCostsCON.css
   :scripts: AV/SeniorAlgAnal/SimpleCosts2CON.js
   :output: show
