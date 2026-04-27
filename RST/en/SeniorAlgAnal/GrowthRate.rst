.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :title: Growth Rates Review
   :institution: Virginia Tech
   :requires:
   :satisfies:
   :topic: Algorithm Analysis
   :keyword: Algorithm Analysis; Growth Rate
   :naturallanguage: en
   :programminglanguage: N/A
   :description: Presents a brief review of growth rates appropriate for a senior-level algorithms course.


Growth Rates Review
===================

Growth Rates Review
-------------------

Two functions of :math:`n` have different
:term:`growth rates <growth rate>` if, as :math:`n` goes to infinity,
their ratio either goes to infinity or goes to zero.

.. _RunTimeGraph:

.. odsafig:: Images/plot.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: The growth rates for five equations

   Two views of a graph illustrating the growth rates for
   six equations.
   The bottom view shows in detail the lower-left portion
   of the top view.
   The horizontal axis represents input size.
   The vertical axis can represent time, space, or any other measure of
   cost.

Where would the line for the equation :math:`(1.618)^n` go on this
graph?

Exact equations relating program operations to running time require
machine-dependent constants.
Sometimes, the equation for exact running time is complicated to
compute.
Usually, we are satisfied with knowing an approximate growth rate.
Specifically, we don't generally care about the contants in the
equations.
Given two algorithms with growth rate :math:`c_1n` and
:math:`c_2 2^{n!}`, do we need to know the values of :math:`c_1`
and :math:`c_2`?

.. topic:: Example
   
   As a more realistic example of a situation that we might encounter,
   consider two equations :math:`n^2` and :math:`3n`.
   PROVE that the value for :math:`n^2` must eventually become (and
   remain) bigger than that of :math:`3n` beyond some value for
   :math:`n`.

   **Proof by Contradiction:**
   Assume there are some values for constants :math:`r` and :math:`s`
   such that, for all values of :math:`n`,
   :math:`n^2 < rn + s`.
   Then, :math:`n < r + s/n`.
   But, as :math:`n` grows, what happens to :math:`s/n`?
   It goes to zero.

   Since :math:`n` grows toward infinity, the assumption must be false.
   **Conclusion:** In the limit, as :math:`n \rightarrow \infty`,
   constants don't matter.
   Limits are the typical way to prove that one function grows faster
   than another.

Here are some useful observations.

Since :math:`n^2` grows faster than :math:`n`,

* :math:`2^{n^2}` grows faster than :math:`2^n`.
  (Take antilog of both sides.)

* :math:`n^4` grows faster than :math:`n^2`.
  (Square boths sides.)

* :math:`n` grows faster than :math:`\sqrt{n}`.
  (:math:`n = (\sqrt{n})^2`.
  Replace :math:`n` with :math:`\sqrt{n}`.)

* :math:`2 \log n` grows *no slower* than :math:`\log n`.
  (Take :math:`\log` of both sides. Log "flattens" growth rates.)


Since :math:`n!` grows faster than :math:`2^n`,

* :math:`n!!` grows faster than :math:`2^n!`.
  (Apply factorial to both sides.)

* :math:`2^{n!}` grows faster than :math:`2^{2^n}`.
  (Take antilog of both sides.)

* :math:`n!^2` grows faster than :math:`2^{2n}`.
  (Square both sides.)

* :math:`\sqrt{n!}` grows faster than :math:`\sqrt{2^n}`.
  (Take square root of both sides.)

* :math:`\log n!` grows *no slower* than :math:`n`.
  (Take log of both sides.
  Actually, it grows faster since :math:`\log n! = \Theta(n \log n)`.)

If :math:`f` grows faster than :math:`g`, then
must :math:`\sqrt{f}` grow faster than :math:`\sqrt{g}`?
Yes.

Must :math:`\log f` grow faster than :math:`\log g`?
No.
:math:`\log n \approx \log n^2` within a constant factor, that is, the
growth **rate** is the same!
Again, the log operator "flattens" the relative growth rates.

:math:`\log n` is related to :math:`n` in exactly the same way that
:math:`n` is related to :math:`2^n`.

:math:`2^{\log n} = n`.


Asymptotic Notation
~~~~~~~~~~~~~~~~~~~

.. math::

   \begin{array}{llcl}
   \mathrm{little\ oh}&f(n) \in o(g(n))&<&\lim f(n)/g(n) = 0\\
   \mathrm{big\ oh}&f(n) \in O(g(n))&\leq\\
   \mathrm{Theta}&f(n) = \Theta(g(n))&=&f=O(g) and\\
   &&& g=O(f)\\
   \mathrm{Big\ Omega}&f(n) \in \Omega(g(n))&\geq\\
   \mathrm{Little Omega}&f(n) \in \omega(g(n))&>&\lim g(n)/f(n) = 0
   \end{array}

The notation ":math:`f \in O(n^2)`" is preferred to ":math:`f = O(n^2)`".
While :math:`n \in O(n^2)` and :math:`n^2 \in O(n^2)`,
:math:`O(n) \neq O(n^2)`.

Note that Big oh does not say how good an algorithm is |---|
only how bad it **can** be.

If algorithm :math:`\mathcal{A}\in O(n)` and algorithm
:math:`\mathcal{B} \in O(n^2)`,
is :math:`\mathcal{A}` better than :math:`\mathcal{B}`?
Perhaps... but perhaps the problem is that we don't know much about
the analysis of these algorithms.
Perhaps better analysis will show that
:math:`\mathcal{A} = \Theta(n)` while
:math:`\mathcal{B} = \Theta(\log n)`.

Some log notation: :math:`\log n^2 (= 2 \log n)` vs.
:math:`\log^2 n (= (\log n)^2)` 
vs. :math:`\log \log n`.

:math:`\log 16^2 = 2 \log 16 = 8`.

:math:`\log^2 16 = 4^2 = 16`.

:math:`\log \log 16 = \log 4 = 2`.

Order Notation has practical limits.
Consider this statement:
Resource requirements for Algorithm :math:`\mathcal{A}`
grow slower than resource requirements for Algorithm :math:`\mathcal{B}`.
Is :math:`\mathcal{A}` **better** than :math:`\mathcal{B}`?
There are some potential problems with claiming so.

* How big must the input be before it becomes true?
* Some growth rate differences are trivial.
  For example: :math:`\Theta(\log^2 n)` vs. :math:`\Theta(n^{1/10})`.
  If :math:`n` is :math:`10^{12} (\approx 2^{40})` then
  :math:`\log^2 n \approx 1600`, :math:`n^{1/10} = 16` even though
  :math:`n^{1/10}` grows faster than :math:`\log^2 n`.
  :math:`n` must be enormous (like :math:`2^{150}`) for
  :math:`n^{1/10}` to be bigger than :math:`\log^2 n`.

It is not always practical to reduce an algorithm's growth rate.
"Practical" here means that the constants might become too
much higher when we shave off the minor asymptotic growth.
Shaving a factor of :math:`n` reduces cost by a factor of a million
for input size of a million.
Shaving a factor of :math:`\log \log n` saves only a factor of 4-5.
So if changing the algorithm to remove a factor of :math:`\log \log n`
at the expense of a constant factor of 10, then the new algorithm
(while asymptotically better) won't realize its advantages until
:math:`n` is so big as to never be used in any real situation.

This leads to the concept of the
:term:`practicality window`.
In general, (1) we have limited time to solve a problem,
and (2) input can only get so big before the computer chokes
(or at least, users are only interested in running problems of a
certain size).
So while one algorithm might be asymptotically better than another,
perhaps this is not true within the range of practical inputs that the
user actually would require.

Fortunately, algorithm growth rates are USUALLY well behaved, so that
Order Notation gives practical indications.
"Practical" is the keyword.
We use asymptotics because they provide a simple **model** that
**usually** mirrors reality.
This is **useful** to simplify our thinking.


