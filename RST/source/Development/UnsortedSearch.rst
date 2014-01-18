.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Search

Analyzing Search in Unsorted Arrays
===================================

You already know the simplest form of search:
the sequential search algorithm.
Sequential search on an unsorted list requires :math:`\Theta(n)` time
in the worst case.

How many comparisons does linear search do on average?
A major consideration is whether :math:`K` is in list **L** at
all.
We can simplify our analysis by ignoring everything about the input
except the position of :math:`K` if it is found in **L**.
Thus, we have :math:`n+1` distinct possible events:
That :math:`K` is in one of positions 0 to :math:`n-1` in **L**
(each position having its own probability), or that it is not in
:math:`L` at all.
We can express the probability that :math:`K` is not in **L** as

.. math::

  \mathbf{P}(K \notin \mathbf{L}) =
  1 - \sum_{i=1}^n \mathbf{P}(K = \mathbf{L}[i])

where :math:`\mathbf{P}(x)` is the probability of event
:math:`x`.

Let :math:`p_i` be the probability that :math:`K` is in position
:math:`i` of **L** (indexed from 0 to :math:`n-1`.
For any position :math:`i` in the list, we must look at :math:`i+1`
records to reach it.
So we say that the cost when :math:`K` is in position :math:`i` is
:math:`i+1`.
When :math:`K` is not in **L**, sequential search will require
:math:`n` comparisons.
Let :math:`p_n` be the probability that :math:`K` is not in **L**.
Then the average cost :math:`\mathbf{T}(n)` will be

.. math::

   \mathbf{T}(n) = n p_n + \sum_{i=0}^{n-1} (i+1) p_i.

What happens to the equation if we assume all the :math:`p_i` 's
are equal (except :math:`p_n`)?

.. math::

   \mathbf{T}(n) &=& p_n n + \sum_{i=0}^{n-1} (i+1) p\\
   &=& p_n n + p\sum_{i=1}^n i\\
   &=& p_n n + p\frac{n(n+1)}{2}\\
   &=& p_n n + \frac{1 - p_n}{n}\frac{n(n+1)}{2}\\
   &=& \frac{n + 1 + p_n(n-1)}{2}

Depending on the value of :math:`p_n`,
:math:`\frac{n+1}{2} \leq \mathbf{T}(n) \leq n`.

