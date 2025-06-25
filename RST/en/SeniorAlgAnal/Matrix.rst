.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :title: Matrix Multiplication
   :author: Cliff Shaffer
   :institution: Virginia Tech
   :topic: Matrix Multiplication
   :keyword: Number Problems; Matrix Multiplication; Strassen's Algorithm
   :naturallanguage: en
   :programminglanguage: N/A
   :description: Introduces the basic concepts behind Strassen's Matrix Multiplcation algorithm.

Matrix Multiplication
=====================

The Standard Approach
---------------------

How do we normally do matrix multiplication?
Given :math:`n \times n` matrices :math:`A` and :math:`B`,
the standard approach is to compute element :math:`c_{ij}` in
:math:`C = A \times B` as follows:

.. math::
   
   c_{ij} = \sum_{k=1}^n a_{ik}b_{kj}.

This requires :math:`\Theta(n^3)` multiplications and
:math:`\Theta(n^3)` additions.
Though, this is not quite as bad as it first looks, since input size
is not :math:`n`, but instead it is :math:`n^2`.

But is this really the best that we can do?
Consider that the naive lower bound for any matrix multiplication
algorithm is :math:`\Omega(n^2)`, because we create
:math:`n^2` outputs.

For the moement, let's consider multiplying two
:math:`2 \times 2` matrices.
The basic algorithm requires exactly 8 multiplications and 4
additions.
But consider this alternative.
Compute:

.. math::
   
   \begin{eqnarray*}
   m_1 &=& (a_{12} - a_{22})(b_{21} + b_{22})\\
   m_2 &=& (a_{11} + a_{22})(b_{11} + b_{22})\\
   m_3 &=& (a_{11} - a_{21})(b_{11} + b_{12})\\
   m_4 &=& (a_{11} + a_{12})b_{22}\\
   m_5 &=& a_{11}(b_{12} - b_{22})\\
   m_6 &=& a_{22}(b_{21} - b_{11})\\
   m_7 &=& (a_{21} + a_{22})b_{11}
   \end{eqnarray*}

Then:

.. math::

   \begin{eqnarray*}
   c_{11} &=& m_1 + m_2 - m_4 + m_6\\
   c_{12} &=& m_4 + m_5\\
   c_{21} &=& m_6 + m_7\\
   c_{22} &=& m_2 - m_3 + m_5 - m_7
   \end{eqnarray*}

To verify that this seems to be correct, let's check one of these:

.. math::
   
   \begin{eqnarray*}
   c_{11} &=& m_1 + m_2 - m_4 + m_6\\
   &=& (a_{12} - a_{22})(b_{21} + b_{22}) + (a_{11} + a_{22})(b_{11} + b_{22})\\
   &&\qquad- (a_{11} + a_{12})b_{22} + a_{22}(b_{21} - b_{11})\\
   &=& a_{12}b_{21} + a_{12}b_{22} - a_{22}b_{21} - a_{22}b_{22} +
   a_{11}b_{22} + a_{22}b_{11}\\
   &&\qquad + a_{22}b_{22} - a_{11}b_{22} -
   a_{12}b_{22} + a_{22}b_{21} - a_{22}b_{11}\\
   &=& a_{11}b_{11} + a_{12}b_{21}
   \end{eqnarray*}

This requires 7 multiplications and 18 additions/subtractions.
Now, if we are actually multiplying :math:`2 \times 2` arrays, that
does not seem like any sort of a win, because when multiplying
integers (or even floating point numbers), there is not much
difference in the cost of a multiplication and an addition.
But consider that this works just as well when multiplying two
matrices of size :math:`2n \times 2n`.
In that case, the multiplications are of half-size (:math:`n \times
n`) matrices.
And in this situation, a matrix multiplication is far more expensive
(:math:`\Theta(n^3)`) than a matrix addition (:math:`\Theta(n^2)`).

Strassen's Algorithm
--------------------

The arrangement shown above with the reduced number of multiplications
is know as Strassen's algorithm.
Strassen's algorithm trades more additions/subtractions for
fewer multiplications in the :math:`2n \times 2n` case.
It uses divide an conquer in an attempt to reduce the total work for
multiplying large matrices.

As we have already seen, in the straightforward implementation, the $2
\times 2$ case will do this work:

.. math::

   \begin{eqnarray*}
   c_{11} = a_{11}b_{11} + a_{12}b_{21}\\
   c_{12} = a_{11}b_{12} + a_{12}b_{22}\\
   c_{21} = a_{21}b_{11} + a_{22}b_{21}\\
   c_{22} = a_{21}b_{12} + a_{22}b_{22}
   \end{eqnarray*}

This requires 8 (matix) multiplications and 4 (matrix) additions to
multiply two :math:`2n \times 2n` matrix.

Consider this divide and conquer step:
Assume :math:`n` is a power of 2.
Express :math:`C = A \times B` in terms of
:math:`\frac{n}{2} \times \frac{n}{2}` matrices.

.. math::
   
   \left[
   \begin{array}{ll}
   C_{11} & C_{12}\\
   C_{21} & C_{22}
   \end{array}
   \right]
   =
   \left[
   \begin{array}{ll}
   A_{11} & A_{12}\\
   A_{21} & A_{22}
   \end{array}
   \right]
   \left[
   \begin{array}{ll}
   B_{11} & B_{12}\\
   B_{21} & B_{22}
   \end{array}
   \right]

By Strassen's algorithm, this can be computed with 7 multiplications
and 18 additions/subtractions of :math:`n/2 \times n/2` matrices.

This gives us the following recurrence relation, along with this
solution from applying the Master Theorem:

.. math::
   
   \begin{eqnarray*}
   T(n) &=& 7T(n/2) + 18(n/2)^2\\
   T(n) &=& \Theta(n^{\log_2 7}) = \Theta(n^{2.81}).
   \end{eqnarray*}

This is clearly grows slower than :math:`\Theta(n^3)`.
However, there is a much larger constant due to the increased number
of additions.
Strassen's algorithm would only be practical to use if the matrices
where extremely large.

There are other arrangements that can further reduce the exponent.
The current "fastest" algorithm (in an asymptotic sense) is
:math:`\Theta(n^{2.376})`.
But it is even more impractical than Strassen's algorithm due to the
overhead of a large number of additions.

It is a theoretical open question as to whether it is possible to do
matrix multiplication be done in :math:`O(n^2)` time.
