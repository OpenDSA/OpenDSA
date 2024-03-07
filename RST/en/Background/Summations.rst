.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies: summation
   :topic: Math Background
   :keyword: Summations


Summations
==========

Summations
----------

Most programs contain loop constructs.
When analyzing running time costs for programs with loops, we
need to add up the costs for each time the loop is executed.
This is an example of a :term:`summation`.
Summations are simply the sum of costs for some function applied to a
range of parameter values.
Summations are typically written with the following "Sigma"
notation:

.. math::

   \sum_{i=1}^{n} f(i).

This notation indicates that we are summing the value of
:math:`f(i)` over some range of (integer) values.
The parameter to the expression and its initial value are indicated
below the :math:`\sum` symbol.
Here, the notation :math:`i=1` indicates that the parameter is
:math:`i` and that it begins with the value 1.
At the top of the :math:`\sum` symbol is the expression :math:`n`.
This indicates the maximum value for the parameter :math:`i`.
Thus, this notation means to sum the values of :math:`f(i)` as
:math:`i` ranges across the integers from 1 through :math:`n`.
This can also be written
:math:`f(1) + f(2) + \cdots + f(n-1) + f(n)`.
Within a sentence, Sigma notation is typeset as
:math:`\sum_{i=1}^{n} f(i)`.

Given a summation, you often wish to replace it with an algebraic
equation with the same value as the summation.
This is known as a :term:`closed-form solution`,
and the process of replacing the summation with its closed-form
solution is known as solving the summation.
For example, the summation
:math:`\sum_{i=1}^{n} 1`
is simply the expression "1" summed :math:`n` times
(remember that :math:`i` ranges from 1 to :math:`n`).
Because the sum of :math:`n` 1s is :math:`n`,
the closed-form solution is :math:`n`.

Here is an explanation about the closed form solution of one summation
that you will see many times in this book.
Since this appears so often, it will help you later if you can get
comfortable with it.

.. inlineav:: SummationOneToNCON ss
   :long_name: Summation of the first N Integers visualization
   :links: AV/Background/SummationOneToNCON.css
   :scripts: AV/Background/SummationOneToNCON.js
   :output: show
   :keyword: Summations


.. inlineav:: SummationTwoPowerICON ss
   :long_name: Summation Two Power I visualization
   :links: AV/Background/SummationTwoPowerICON.css
   :scripts: AV/Background/SummationTwoPowerICON.js
   :output: show
   :keyword: Summations

Here is a list of useful summations, along with their closed-form solutions.

.. math::
   \sum_{i = 1}^{n} i &= \frac{n (n+1)}{2} \\
   \sum_{i = 1}^{n} i^2 &= \frac{2 n^3 + 3 n^2 + n}{6} = \frac{n(2n + 1)(n + 1)}{6} \\
   \sum_{i = 1}^{\log n} n &= n \log n \\
   \sum_{i = 0}^\infty a^i &= \frac{1}{1-a}\ \text{for} \ 0 < a < 1 \\
   \sum_{i = 0}^{n} a^i &= \frac{a^{n+1} - 1}{a - 1}\ \text{for} \ a \neq 1 \\
   \text{As special cases to the last summation, we have the following two:} \ 
   \sum_{i = 1}^{n} \frac{1}{2^i} &= 1 - \frac{1}{2^n} \\
   \sum_{i = 0}^{n} 2^i &= 2^{n+1} - 1 \\
   \text{As a corollary to the previous summation: } \ 
   \sum_{i = 0}^{\log n} 2^i &= 2^{\log n + 1} - 1 = 2n - 1 \\
   \text{Finally: } \ 
   \sum_{i = 1}^{n} \frac{i}{2^i} &= 2 - \frac{n+2}{2^n} 

The sum of reciprocals from 1 to :math:`n`, called the
:term:`Harmonic Series` and written :math:`{\cal H}_n`, has a value
between :math:`\log_e n` and :math:`\log_e n + 1`.
To be more precise, as :math:`n` grows,
the summation grows closer to

.. math::
   {\cal H}_n \approx \log_e n + \gamma + \frac{1}{2n},

where :math:`\gamma` is Euler's constant and has the value 0.5772...

Most of these equalities can be proved easily by a
:ref:`proof by induction <Proofs>`.
Unfortunately, induction does not help us derive a closed-form
solution.
Induction only confirms when a proposed closed-form solution is
correct.
