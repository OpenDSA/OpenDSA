.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer, Irena Shaffer
   :requires: logarithms
   :satisfies: transforms
   :topic: Algorithms: Transforms

The Transformation Concept
==========================

The Transformation Concept: Integer Multiplication
--------------------------------------------------

Multiplying two large numbers is considerably more difficult than
adding them.
Recall your grade-school algorithms for adding and multiplying big
numbers.
Adding two :math:`n` -digit numbers is done by simply moving from
right to left through both numbers, for a total of :math:`O(n)` work.
But the cost to multiply two :math:`n`-digit numbers directly is
:math:`O(n^2)` since you essentially need to multiply each digit of
the one number by each digit of the other.

Recall that one property of logarithms is that
:math:`\log nm = \log n + \log m`.
Thus, if taking logarithms and anti-logarithms were cheap, then we
could reduce multiplication to addition by taking the log of the two
operands, adding, and then taking the anti-log of the sum.

Under normal circumstances, taking logarithms and anti-logarithms is
expensive, and so this reduction would not be considered practical.
However, this reduction is precisely the basis for the slide rule.
The slide rule uses a logarithmic scale to measure the lengths of two
numbers, in effect doing the conversion to logarithms automatically.
These two lengths are then added together, and the inverse logarithm
of the sum is read off another logarithmic scale.
The part normally considered expensive (taking logarithms and
anti-logarithms) is cheap because it is a physical part of the
slide rule.
Thus, the entire multiplication process can be done cheaply via a
reduction to addition.
In the days before electronic calculators, slide rules were routinely
used by scientists and engineers to do basic calculations of this
nature.

This process for doing multiplication quickly is an example of using a
:term:`transformation` to speed up a problem.
We have transformed the input values by taking their logarithm, and
then did a cheap operation (addition) on the transformed values, and
then reversed the transformation (with an anti-log) to get the true
answer to the original problem.


Polynomial Multiplication
-------------------------

Now consider the problem of multiplying large polynomials.
A vector :math:`\mathbf a` of :math:`n` values can uniquely represent
a polynomial of degree :math:`n-1`, expressed as

.. math::

   P_{\mathbf a}(x) = \sum_{i=0}^{n-1} {\mathbf a}_i x^i.

.. inlineav:: polynomialCON ss
   :long_name: fft slideshow 1 polynomial
   :links: AV/SeniorAlgAnal/polynomialCON.css
   :scripts: DataStructures/Plot.js AV/SeniorAlgAnal/polynomialCON.js
   :output: show

|

Alternatively, an :math:`n-1` -degree polynomial can be uniquely
represented by a list of its values at :math:`n` distinct points.
Finding the value for a polynomial at a given point is called
:term:`evaluation`.
Finding the coefficients for the polynomial given the values at
:math:`n` points is called :term:`interpolation`.

|

.. inlineav:: EvalandInterpolationCON ss
   :long_name: fft slideshow 2 evaluation and interpolation
   :links: AV/SeniorAlgAnal/EvalandInterpolationCON.css
   :scripts: DataStructures/Plot.js AV/SeniorAlgAnal/EvalandInterpolationCON.js
   :output: show

There are many useful engineering problems that involve multiplying
two large-degree polynomials.
This can be done using a transformation that involves evaluation
(normally expensive), interpolation (normally expensive) and vector
multiplication (cheap), similar in concept to how the slide rule
uses a transformation to multiply large numbers efficiently.
The secret to speeding this process up is in carefully selecting the
right values to evaluate and interpolate.

.. inlineav:: ProductCON ss
   :long_name: fft slideshow 3 polynomial product
   :links: AV/SeniorAlgAnal/ProductCON.css
   :scripts: AV/SeniorAlgAnal/ProductCON.js
   :output: show

Now, let's start thinking about ways to speed this up.

.. inlineav:: EvaluationCON ss
   :long_name: fft slideshow 4 evaluation of polynomial product
   :links: AV/SeniorAlgAnal/EvaluationCON.css
   :scripts: AV/SeniorAlgAnal/EvaluationCON.js
   :output: show

|

.. avembed:: Exercises/SeniorAlgAnal/Polynomial_multiplication.html ka
