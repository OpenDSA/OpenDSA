.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   
.. odsalink:: AV/Development/AlgAnal/DivideAndConquerRecurrencesCON.css

Solving Recurrence Relations
============================

Solving Recurrence Relations
----------------------------

.. TODO::
   :type: Equation cross-reference

   Throughout this module, there are references to equations, both
   on this page and in the Summations module. These should be made
   into proper cross-references rather than hard-coded equation numbers.

Recurrence relations are often used to model the cost of recursive
functions.
For example, the standard :ref:`Mergesort <Mergesort> <Mergesort>`
takes a list of size :math:`n`, splits it in half, performs Mergesort
on each half, and finally merges the two sublists in :math:`n` steps.
The cost for this can be modeled as

.. math::

   {\bf T}(n) = 2{\bf T}(n/2) + n.

In other words, the cost of the algorithm on input of
size :math:`n` is two times the cost for input of size :math:`n/2`
(due to the two recursive calls to Mergesort) plus :math:`n`
(the time to merge the sublists together again).

There are many approaches to solving recurrence relations, and we
briefly consider three here.
The first is an estimation technique:
Guess the upper and lower bounds for the recurrence, use
induction to prove the bounds, and tighten as required.
The second approach is to expand the recurrence to convert it to a
summation and then use summation techniques.
The third approach is to take advantage of already proven theorems
when the recurrence is of a suitable form.
In particular, typical divide-and-conquer algorithms such as
Mergesort yield recurrences of a form that fits a pattern for which
we have a ready solution.


Estimating Upper and Lower Bounds
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The first approach to solving recurrences is to guess the
answer and then attempt to prove it correct.
If a correct upper or lower bound estimate is given, 
an easy induction proof will verify this fact.
If the proof is successful, then try to tighten the bound.
If the induction proof fails, then loosen the bound and try again.
Once the upper and lower bounds match, you are finished.
This is a useful technique when you are only looking for asymptotic
complexities.
When seeking a precise closed-form solution (i.e., you seek the
constants for the expression), this method will probably be too much
work.

.. topic:: Example

   .. Very close to Manber's example.

   Use the guessing technique to find the asymptotic bounds for
   Mergesort, whose running time is described by the equation

   .. math::

      {\bf T}(n) = 2{\bf T}(n/2) + n; \quad {\bf T}(2) = 1.

   We begin by guessing that this recurrence has an upper
   bound in :math:`O(n^2)`.
   To be more precise, assume that

   .. math::

     {\bf T}(n) \leq n^2.

   We prove this guess is correct by induction.
   In this proof, we assume that :math:`n` is a
   power of two, to make the calculations easy.
   For the base case, :math:`{\bf T}(2) = 1 \leq 2^2`.
   For the induction step, we need to show that
   :math:`{\bf T}(n) \leq n^2` implies that
   :math:`{\bf T}(2n) \leq (2n)^2` for :math:`n = 2^N, N \geq 1`.
   The induction hypothesis is

   .. math::

      {\bf T}(i) \leq i^2,\ {\rm for\ all}\ i \leq n.

   It follows that

   .. math::

      {\bf T}(2n) = 2{\bf T}(n) + 2n \leq 2n^2 + 2n \leq 4n^2 \leq (2n)^2

   which is what we wanted to prove.
   Thus, :math:`{\bf T}(n)` is in :math:`O(n^2)`.

   Is :math:`O(n^2)` a good estimate?
   In the next-to-last step we went from :math:`n^2 + 2n` to the much
   larger :math:`4n^2`.
   This suggests that  :math:`O(n^2)` is a high estimate.
   If we guess something smaller, such as :math:`{\bf T}(n) \leq cn`
   for some constant :math:`c`, it should be clear that this cannot
   work because :math:`c 2 n = 2 c n` and there is no room for the
   extra :math:`n` cost to join the two pieces together.
   Thus, the true cost must be somewhere between :math:`cn` and
   :math:`n^2`.

   Let us now try :math:`{\bf T}(n) \leq n \log n`.
   For the base case, the definition of the recurrence sets
   :math:`{\bf T}(2) = 1 \leq (2 \cdot \log 2) = 2`.
   Assume (induction hypothesis) that :math:`{\bf T}(n) \leq n \log n`.
   Then,

   .. math::

      {\bf T}(2n) = 2{\bf T}(n) + 2n \leq 2n \log n + 2n
      \leq 2n(\log n + 1) \leq 2 n \log 2n

   which is what we seek to prove.
   In similar fashion, we can prove that :math:`{\bf T}(n)` is in
   :math:`\Omega(n \log n)`. 
   Thus, :math:`{\bf T}(n)` is also :math:`\Theta(n \log n)`.


.. topic:: Example

   We know that the factorial function grows exponentially.
   How does it compare to :math:`2^n`? To :math:`n^n`?
   Do they all grow "equally fast" (in an asymptotic sense)?
   We can begin by looking at a few initial terms.

   .. math::

      \begin{array}{r|rrrrrrrrr}
      n&1&2&3&4&5&6&7&8&9\\
      \hline
      n! &1&2&6&24&120&720&5040&40320&362880\\
      2^n&2&4&8&16&32&64&128&256&512\\
      n^n&1&4&9&256&3125&46656&823543&16777216&387420489
      \end{array}

   We can also look at these functions in terms of their recurrences.

   .. math::

      n! = \left\{
      \begin{array}{ll}
      1&n=1\\
      n(n-1)!&n>1\\
      \end{array}
      \right.

   .. math::

      2^n = \left\{
      \begin{array}{ll}
      2&n=1\\
      2(2^{n-1})&n>1\\
      \end{array}
      \right.

   .. math::

      n^n = \left\{
      \begin{array}{ll}
      n&n=1\\
      n(n^{n-1})&n>1\\
      \end{array}
      \right.

   At this point, our intuition should be telling us pretty clearly
   the relative growth rates of these three functions.
   But how do we prove formally which grows the fastest?
   And how do we decide if the differences are significant in an
   asymptotic sense, or just constant factor differences?

   We can use logarithms to help us get an idea about the relative
   growth rates of these functions.
   Clearly, :math:`\log 2^n = n`.
   Equally clearly, :math:`\log n^n = n \log n`.
   We can easily see from this that :math:`2^n` is :math:`o(n^n)`,
   that is, :math:`n^n` grows asymptotically faster than :math:`2^n`.

   How does :math:`n!` fit into this?
   We can again take advantage of logarithms.
   Obviously :math:`n! \leq n^n`, so we know that :math:`\log n!` is
   :math:`O(n \log n)`. 
   But what about a lower bound for the factorial function?
   Consider the following.

   .. math::

      \begin{eqnarray*}
      n! &=& n \times (n - 1) \times \cdots \times \frac{n}{2} \times
      (\frac{n}{2} - 1) \times \cdots \times 2 \times 1\\
      &\geq& \frac{n}{2} \times \frac{n}{2} \times \cdots \times \frac{n}{2}
      \times 1 \times \cdots \times 1 \times 1\\
      &=& (\frac{n}{2})^{n/2}
      \end{eqnarray*}

   Therefore

   .. math::

      \log n! \geq \log(\frac{n}{2})^{n/2} =
      (\frac{n}{2})\log(\frac{n}{2}).

   In other words, :math:`\log n!` is in :math:`\Omega(n \log n)`.
   Thus, :math:`\log n! = \Theta(n \log n)`.

   Note that this does **not** mean that :math:`n! = \Theta(n^n)`.
   Because :math:`\log n^2 = 2 \log n`, it follows that
   :math:`\log n = \Theta(\log n^2)` but :math:`n \neq \Theta(n^2)`.
   The log function often works as a "flattener" when dealing with
   asymptotics.
   That is, whenever :math:`\log f(n)` is in :math:`O(\log g(n))` we
   know that :math:`f(n)` is in :math:`O(g(n))`.
   But knowing that :math:`\log f(n) = \Theta(\log g(n))` does not
   necessarily mean that :math:`f(n) = \Theta(g(n))`.


.. topic:: Example

   What is the growth rate of the Fibonacci sequence?
   We define the Fibonacci sequence as
   :math:`f(n) = f(n-1) + f(n-2)` for :math:`n \geq 2`;
   :math:`f(0) = f(1) = 1`.

   In this case it is useful to compare the ratio of :math:`f(n)` to
   :math:`f(n-1)`.
   The following table shows the first few values.

   .. math::

      \begin{array}{c|lllllll}
      n&1&2&3&4&5&6&7\\
      \hline
      f(n)&1&2&3&5&8&13&21\\
      f(n)/f(n-1)&1&2&1.5&1.666&1.625&1.615&1.619
      \end{array}

   If we continue for more terms, the ratio appears to converge on a
   value slightly greater then 1.618.
   Assuming :math:`f(n)/f(n-1)` really does converge to a fixed value
   as :math:`n` grows, we can determine what that value must be.

   .. math::

      \frac{f(n)}{f(n-2)} = \frac{f(n-1)}{f(n-2)} + \frac{f(n-2)}{f(n-2)}
      \rightarrow x+1

   for some value :math:`x`.
   This follows from the fact that :math:`f(n) = f(n-1) + f(n-2)`.
   We divide by :math:`f(n-2)` to make the second term go away, and we
   also get something useful in the first term.
   Remember that the goal of such manipulations is to give us an
   equation that relates :math:`f(n)` to something without recursive
   calls.

   For large :math:`n`, we also observe that:

   .. math::

      \frac{f(n)}{f(n-2)} = \frac{f(n)}{f(n-1)}\frac{f(n-1)}{f(n-2)}
      \rightarrow x^2

   as :math:`n` gets big.
   This comes from multiplying :math:`f(n)/f(n-2)` by
   :math:`f(n-1)/f(n-1)` and rearranging.

   If :math:`x` exists, then :math:`x^2 - x - 1 \rightarrow 0`.
   Using the quadratic equation, the only solution greater than one is

   .. math::

      x = \frac{1 + \sqrt{5}}{2} \approx 1.618.

   This expression also has the name :math:`\phi`.
   What does this say about the growth rate of the Fibonacci sequence?
   It is exponential, with :math:`f(n) = \Theta(\phi^n)`.
   More precisely, :math:`f(n)` converges to

   .. math::

      \frac{\phi^n - (1 - \phi)^n}{\sqrt{5}}.


Expanding Recurrences
~~~~~~~~~~~~~~~~~~~~~

Estimating bounds is effective if you only need an approximation to
the answer.
More precise techniques are required to find an exact solution.
One approach is called :term:`expanding the recurrence`.
In this method, the smaller terms on the right side of the equation
are in turn replaced by their definition.
This is the expanding step.
These terms are again expanded, and so on, until a full series
with no recurrence results.
This yields a :ref`summation <summation> <Summation>`,
and techniques for solving summations can then be used.
A more complex example is given next.

.. topic:: Example

   Find the solution for

   .. math::

      {\bf T}(n) = 2{\bf T}(n/2) + 5 n^2; \quad {\bf T}(1) = 7.

   For simplicity we assume that :math:`n` is a power of two,
   so we will rewrite it as :math:`n = 2^k`.
   This recurrence can be expanded as follows:

   .. math::

      \begin{eqnarray*}
      {\bf T}(n) & = & 2{\bf T}(n/2) + 5n^2\\
                 & = & 2(2{\bf T}(n/4) + 5(n/2)^2) + 5n^2\\
                 & = & 2(2(2{\bf T}(n/8) + 5(n/4)^2) + 5(n/2)^2) + 5n^2\\
                 & = & 2^k{\bf T}(1) + 2^{k-1}\cdot5\left (\frac{n}{2^{k-1}}\right )^2
                         + \cdots + 2\cdot5\left (\frac{n}{2}\right )^2
                         + 5n^2.
      \end{eqnarray*}

   This last expression can best be represented by a summation
   as follows:

   .. math::

      \begin{eqnarray*}
      &   & 7n + 5\sum_{i=0}^{k-1} n^2/2^i\\
      & = & 7n + 5n^2\sum_{i=0}^{k-1} 1/2^i.\\
      \end{eqnarray*}

   From Equation (6) of Module :ref:`Summation <Summation> <Summation>`,
   we have:

   .. math::

      \begin{eqnarray*}
      & = & 7n + 5n^2\left (2 - 1/2^{k-1}\right )\\
      & = & 7n + 5n^2(2 - 2/n)\\
      & = & 7n + 10 n^2 - 10n\\
      & = & 10n^2 - 3n.
      \end{eqnarray*}

   This is the *exact* solution to the recurrence for :math:`n`
   a power of two.
   At this point, we should use a simple induction proof to verify
   that our solution is indeed correct.
   
.. inlineav:: DivideAndConquerRecurrencesCON ss
   :output: show

.. topic:: Example

   Our next example models the cost of the algorithm to build a heap.
   You should recall that to build a :ref:`heap <heap> <Heaps>`,
   we first heapify the two subheaps, then push down the root to its
   proper position.
   The cost is:

   .. math::

      f(n) \leq 2f(n/2) + 2 \log n.

   Let us find a closed form solution for this recurrence.
   We can expand the recurrence a few times to see that

   .. math::

      \begin{eqnarray*}
      f(n) &\leq& 2f(n/2) + 2 \log n\\
      &\leq& 2[2f(n/4) + 2 \log n/2] + 2 \log n\\
      &\leq& 2[2(2f(n/8) + 2 \log n/4) + 2 \log n/2] + 2 \log n
      \end{eqnarray*}

   We can deduce from this expansion that this recurrence is
   equivalent to following summation and its derivation:

   .. math::

      \begin{eqnarray*}
      f(n) &\leq& \sum_{i=0}^{\log n -1} 2^{i+1} \log(n/2^i)\\
      &=& 2 \sum_{i=0}^{\log n -1} 2^i (\log n - i)\\
      &=& 2 \log n \sum_{i=0}^{\log n -1} 2^i - 4 \sum_{i=0}^{\log n -1} i 2^{i-1}\\
      &=& 2 n \log n - 2 \log n - 2 n \log n + 4n -4\\
      &=& 4n - 2 \log n - 4.
      \end{eqnarray*}


Divide-and-Conquer Recurrences
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The third approach to solving recurrences is to take advantage of
known theorems that provide the solution for classes of recurrences.
Of particular practical use is a theorem that gives the
answer for a class known as :term:`divide-and-conquer recurrences`.
These have the form

.. math::

   {\bf T}(n) = a{\bf T}(n/b) + cn^k; \quad {\bf T}(1) = c

where :math:`a`, :math:`b`, :math:`c`, and :math:`k` are constants.
In general, this recurrence describes a problem of size :math:`n`
divided into :math:`a` subproblems of size :math:`n/b`,
while :math:`cn^k` is the amount of work necessary to combine the
partial solutions.
Mergesort is an example of a divide and conquer algorithm, and its
recurrence fits this form.
So does binary search.
We use the method of expanding recurrences to derive the general
solution for any divide and conquer recurrence, assuming that
:math:`n = b^m`.

.. math::

   \begin{eqnarray*}
   {\bf T}(n) & = & a{\bf T}(n/b) + cn^k\\
     & = & a(a{\bf T}(n/b^2) + c(n/b)^k) + cn^k\\
     & = & a(a[a{\bf T}(n/b^3) + c(n/b^2)^k] + c(n/b)^k) + cn^k\\
     & = & a^m{\bf T}(1) + a^{m-1}c(n/b^{m-1})^k + \cdots + ac(n/b)^k + cn^k\\
     & = & a^mc + a^{m-1}c(n/b^{m-1})^k + \cdots + ac(n/b)^k + cn^k\\
     & = & c\sum_{i=0}^{m} a^{m-i} b^{ik}\\
     & = &ca^m\sum_{i=0}^{m} (b^k/a)^i.
   \end{eqnarray*}

Note that

.. math::

   \begin{eqnarray}
   \label{ThmEquiv}
   a^m = a^{\log_bn} = n^{\log_ba}.
   \end{eqnarray}

The summation is a geometric series whose sum depends on the ratio
:math:`r = b^k/a`.
There are three cases.

(#) :math:`r<1`.
    From Equation (4) of Module :ref`summation <summation> <Summation>`,

    .. math::

       \sum_{i=0}^{m}r^i < 1/(1-r),\ {\rm a~constant.}

    Thus,

    .. math::

       {\bf T}(n) = \Theta(a^m) = \Theta(n^{log_ba}).

(#) :math:r=1`.
    Because :math:`r = b^k/a`, we know that :math:`a = b^k`.
    From the definition of logarithms it follows immediately that
    :math:`k = \log_b a`.
    We also note from Equation (1) above that :math:`m = \log_b n`.
    Thus,

    .. math::

       \sum_{i=0}^{m} r = m + 1 = \log_bn + 1.

    Because :math:`a^m = n \log_b a = n^k`, we have

    .. math::

       {\bf T}(n) = \Theta(n^{\log_ba}\log n) = \Theta(n^k\log n).

(#) :math:`r>1`.
    From Equation (5) of Module :ref`summation <summation> <Summation>`,

    .. math::

       \sum_{i=0}^{m} r = \frac{r^{m+1} - 1}{r - 1} = \Theta(r^m).

    Thus,

    .. math::

       {\bf T}(n) = \Theta(a^mr^m)
                  = \Theta(a^m(b^k/a)^m)
                  = \Theta(b^{km})
                  = \Theta(n^k).

We can summarize the above derivation as the following theorem,
sometimes referred to as the :term:`Master Theorem`.

.. _RecurThm:

.. topic:: Theorem

   **The Master Theorem:** For any recurrence relation of the form
   :math:`{\bf T}(n) = a{\bf T}(n/b) + cn^k, {\bf T}(1) = c`,
   the following relationships hold.

   .. math::

      {\bf T}(n) = \left\{ \begin{array}{ll}
                   \Theta(n^{\log_ba}) & \mbox{if \(a > b^k\)} \\
                   \Theta(n^k\log n)   & \mbox{if \(a = b^k\)} \\
                   \Theta(n^k)         & \mbox{if \(a < b^k\).}
                  \end{array}
         \right.

This theorem may be applied whenever appropriate, rather than
re-deriving the solution for the recurrence.

.. topic:: Example

   Apply the Master Theorem to solve

   .. math::

      {\bf T}(n) = 3{\bf T}(n/5) + 8n^2.

   Because :math:`a=3`, :math:`b=5`, :math:`c=8`, and :math:`k=2`, we
   find that :math:`3<5^2`.
   Applying case (3) of the theorem, :math:`{\bf T}(n) = \Theta(n^2)`.

.. topic:: Example

   Use the Master Theorem to solve the recurrence relation
   for Mergesort:

   .. math::

      {\bf T}(n) = 2{\bf T}(n/2) + n; \quad {\bf T}(1) = 1.

   Because :math:`a=2`, :math:`b=2`, :math:`c=1`, and :math:`k=1`,
   we find that :math:`2 = 2^1`.
   Applying case (2) of the theorem,
   :math:`{\bf T}(n) = \Theta(n \log n)`.


Average-Case Analysis of Quicksort
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Module :ref:`Quicksort <Quicksort> <Quicksort>`, we determined that
the average-case analysis of Quicksort had the following recurrence:

.. math::

   {\bf T}(n) = cn + \frac{1}{n}\sum_{k=0}^{n-1} [{\bf T}(k) +
    {\bf T}(n -1 - k)], \qquad {\bf T}(0) = {\bf T}(1) = c.

The :math:`cn` term is an upper bound on the `findpivot` and
`partition` steps.
This equation comes from assuming that the partitioning element is
equally likely to occur in any position :math:`k`.
It can be simplified by observing that the two
recurrence terms :math:`{\bf T}(k)` and :math:`{\bf T}(n - 1 - k)` are
equivalent, because one simply counts up from :math:`T(0)` to
:math:`T(n-1)` while the other counts down from :math:`T(n-1)` to
:math:`T(0)`.
This yields

.. math::

   {\bf T}(n) = cn + \frac{2}{n}\sum_{k=0}^{n-1} {\bf T}(k).

This form is known as a :term:`recurrence with full history`.
The key to solving such a recurrence is to cancel out the summation
terms.
The shifting method for summations provides a way to do
this.
Multiply both sides by :math:`n` and subtract the result from the
formula for :math:`n{\bf T}(n+1)`:

.. math::

   \begin{eqnarray*}
   n{\bf T}(n) & = & cn^2 + 2 \sum_{k=1}^{n-1} {\bf T}(k)\\
   (n+1){\bf T}(n+1) & = & c(n+1)^2 + 2 \sum_{k=1}^{n} {\bf T}(k).
   \end{eqnarray*}

Subtracting :math:`n{\bf T}(n)` from both sides yields:

.. math::

   \begin{eqnarray*}
   (n+1){\bf T}(n+1) - n{\bf T}(n) & = & c(n+1)^2 - cn^2 + 2{\bf T}(n)\\
   (n+1){\bf T}(n+1) - n{\bf T}(n) & = & c(2n+1) + 2{\bf T}(n)\\
   (n+1){\bf T}(n+1) & = & c(2n+1) + (n+2){\bf T}(n)\\
   {\bf T}(n+1) & = & \frac{c(2n+1)}{n+1} + \frac{n+2}{n+1}{\bf T}(n).
   \end{eqnarray*}

At this point, we have eliminated the summation and can now
use our normal methods for solving recurrences to get a closed-form
solution.
Note that :math:`\frac{c(2n+1)}{n+1} < 2c`, so we can simplify the
result.
Expanding the recurrence, we get

.. math::

   \begin{eqnarray*}
   {\bf T}(n+1) & \leq & 2c + \frac{n+2}{n+1} {\bf T}(n)\\
             & = & 2c + \frac{n+2}{n+1}\left (2c +
                        \frac{n+1}{n}{\bf T}(n-1)\right )\\
             & = & 2c + \frac{n+2}{n+1}\left (2c + \frac{n+1}{n}\left
                       (2c + \frac{n}{n-1}{\bf T}(n-2)\right )\right )\\
             & = & 2c + \frac{n+2}{n+1}\left (2c + \cdots +
                            \frac{4}{3}(2c + \frac{3}{2}{\bf T}(1))\right )\\
             & = & 2c\left (1 + \frac{n+2}{n+1}
                     + \frac{n+2}{n+1}\frac{n+1}{n} + \cdots
                     + \frac{n+2}{n+1}\frac{n+1}{n}\cdots\frac{3}{2}\right )\\
             & = & 2c\left (1 + (n+2)\left (\frac{1}{n+1}
                     + \frac{1}{n} + \cdots + \frac{1}{2}\right )\right )\\
             & = & 2c + 2c(n+2)\left ({\cal H}_{n+1} - 1\right )\\
   \end{eqnarray*}

for :math:`{\cal H}_{n+1}`, the Harmonic Series.
From Equation (10) of Module :ref`summation <summation> <Summation>`,
:math:`{\cal H}_{n+1} = \Theta(\log n)`,
so the final solution is :math:`\Theta(n \log n)`.

.. odsascript:: AV/Development/AlgAnal/DivideAndConquerRecurrencesCON.js
