.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic:

.. odsalink:: AV/Background/SummationOneToNCON.css

Some Math Technique
===================

Some Math Technique
-------------------

In this section, we will introduce some practical examples for
analyzing summations and recurrences, and deducing growth rates.


Factorial Growth
~~~~~~~~~~~~~~~~

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


A "Simple" Summation
~~~~~~~~~~~~~~~~~~~~

Consider the following simple summation.

.. math::
   \sum_{i=1}^n i.

An easy :term:`proof by induction <proof by induction> <Proofs>`
shows that this summation has the well-known closed form
:math:`n(n+1)/2`.
But while induction is a good technique for proving that a proposed
closed-form expression is correct, 
how do we find a candidate closed-form expression to test in the first
place?
Let us try to think through this problem from first principles,
as though we had never seen it before.

A good place to begin analyzing a summation it is to give an
estimate of its value for a given :math:`n`.
Observe that the biggest term for this summation is :math:`n`,
and there are :math:`n` terms being summed up.
So the total must be less than :math:`n^2`.
Actually, most terms are much less than :math:`n`,
and the sizes of the terms grow linearly.
If we were to draw a picture with bars for the size of the terms,
their heights would form a line, and we could enclose them in a box
:math:`n` units wide and :math:`n` units high.
It is easy to see from this that a closer estimate for the summation
is about :math:`(n^2)/2`.
Having this estimate in hand helps us when trying to determine an
exact closed-form solution, because we will hopefully recognize if our
proposed solution is badly wrong.

.. inlineav:: SummationOneToNCON ss
   :output: show

Let us now consider some ways that we might hit upon an exact equation
for the closed form solution to this summation.
One particularly clever approach that we can take is to
observe that we can "pair up" the first and last terms,
the second and (:math:`n-1`)th terms, and so on.
Each pair sums to :math:`n+1`.
The number of pairs is :math:`n/2`.
Thus, the solution is :math:`n(n+1)/2`.
This is pretty, and there is no doubt about it being correct.
The problem is that it is not a useful technique for solving many
other summations.

Now let us try to come up with something a bit more general.
We already recognized that, because the largest term is :math:`n` and
there are :math:`n` terms, the summation is less than :math:`n^2`.
If we are lucky, the closed form solution is a polynomial.
Using that as a working assumption,
we can invoke a technique called :term:`guess-and-test`.
We will guess that the closed-form solution for this summation is a
polynomial.
That means that we are guessing that it is of the form
:math:`c_1 n^2 + c_2 n + c_3` for some constants
:math:`c_1`, :math:`c_2`, and :math:`c_3`.
If this is true, then we can plug in the answers to small cases of the
summation to solve for the coefficients.
For this example, substituting 0, 1, and 2 for :math:`n` leads to
three simultaneous equations.
Because the summation when :math:`n=0` is just 0, :math:`c_3` must
be 0. 
For :math:`n=1` and :math:`n=2` we get the two equations

.. math::

   \begin{eqnarray*}
   c_1 + c_2     & = & 1 \\
   4 c_1 + 2 c_2 & = & 3,
   \end{eqnarray*}

which in turn yield :math:`c_1 = 1/2` and :math:`c_2 = 1/2`.
Thus, if the closed-form solution for the summation **is** a polynomial,
then it can only be

.. math::

   1/2 n^2 + 1/2 n + 0

which is more commonly written

.. math::

   \frac{n(n+1)}{2}.

At this point, we still must do the "test" part of the
guess-and-test approach.
We can use an induction proof to verify whether our
candidate closed-form solution is correct.
In this case it is indeed correct, as shown by
Example :num:`Example #SumIEx`.
The induction proof is necessary because our initial assumption that
the solution is a simple polynomial could be wrong.
For example, it might have been that the true solution
includes a logarithmic term, such as
:math:`c_1n^2 + c_2 n \log n`.
The process shown here is essentially fitting a curve to a fixed
number of points.
Because there is always an :math:`n`-degree polynomial that fits
:math:`n+1` points, we have not done enough work to be sure that we to
know the true equation without the induction proof.

Guess-and-test is useful whenever the solution is a polynomial
expression.
In particular, similar reasoning can be used to solve for
:math:`\sum_{i=1}^n i^2`, or more generally :math:`\sum_{i=1}^n i^c`
for :math:`c` any positive integer.
Why is this not a universal approach to solving summations?
Because many summations do not have a polynomial as their closed
form solution.

A more general approach is based on the
:term:`subtract-and-guess` or :term:`divide-and-guess` strategies.
One form of subtract-and-guess is known as the
:term:`shifting method`.
The shifting method subtracts the summation from a variation on the
summation.
The variation selected for the subtraction should be one that makes
most of the terms cancel out.
To solve sum :math:`f`, we pick a known function :math:`g` and find a
pattern in terms of :math:`f(n) - g(n)` or :math:`f(n)/g(n)`.

.. topic:: Example

   .. Rawlins example

   Find the closed form solution for :math:`\sum_{i=1}^n i` using
   the divide-and-guess approach.
   We will try two example functions to illustrate the
   divide-and-guess method: dividing by :math:`n` and dividing by
   :math:`f(n-1)`. 
   Our goal is to find patterns that we can use to guess a closed-form
   expression as our candidate for testing with an induction proof.
   To aid us in finding such patterns, we can construct a table
   showing the first few numbers of each function, and the result of
   dividing one by the other, as follows.

   .. math:: 

      \begin{array}{r|rrrrrrrrrr}
      n&1&2&3&4&5&6&7&8&9&10\\
      \hline
      f(n)&1&3&6&10&15&21&28&36&46&57\\
      n&1&2&3&4&5&6&7&8&9&10\\
      f(n)/n&2/2&3/2&4/2&5/2&6/2&7/2&8/2&9/2&10/2&11/2\\
      f(n\!-\!1)&0&1&3&6&10&15&21&28&36&46\\
      f(n)/f(n\!-\!1)&&3/1&4/2&5/3&6/4&7/5&8/6&9/7&10/8&11/9
      \end{array}

   Dividing by both :math:`n` and :math:`f(n-1)` happen to give us
   useful patterns to work with.
   :math:`\frac{f(n)}{n} = \frac{n+1}{2}`, and 
   :math:`\frac{f(n)}{f(n-1)} = \frac{n+1}{n-1}`.
   Of course, lots of other guesses for function :math:`g` do not
   work. 
   For example, :math:`f(n) - n = f(n-1)`.
   Knowing that :math:`f(n) = f(n-1) + n` is not useful for
   determining the closed form solution to this summation.
   Or consider :math:`f(n) - f(n-1) = n`.
   Again, knowing that :math:`f(n) = f(n-1) + n` is not useful.
   Finding the right combination of equations can be like finding a
   needle in a haystack.

   In our first example, we can see directly what the closed-form
   solution should be.
   Since :math:`\frac{f(n)}{n} = \frac{n+1}{2}`,
   obviously :math:`f(n) = n(n+1)/2`.

   Dividing :math:`f(n)` by :math:`f(n-1)` does not give so obvious a
   result, but it provides another useful illustration.

   .. math::

      \begin{eqnarray*}
      \frac{f(n)}{f(n-1)} &=& \frac{n+1}{n-1}\\
      f(n) (n-1) &=& (n+1) f(n-1)\\
      f(n) (n-1) &=& (n+1) (f(n) - n)\\
      n f(n) - f(n) &=& n f(n) + f(n) - n^2 - n\\
      2 f(n) &=& n^2 + n = n (n+1)\\
      f(n) &=& \frac{n (n + 1)}{2}
      \end{eqnarray*}

   Once again, we still do not have a proof that
   :math:`f(n) = n(n+1)/2`.
   Why?
   Because we did not prove that :math:`f(n)/n = (n+1)/2` nor that
   :math:`f(n)/f(n-1) = (n+1)(n-1)`.
   We merely hypothesized patterns from looking at a few terms.
   Fortunately, it is easy to check our hypothesis with
   induction.



Growth Rates
~~~~~~~~~~~~

Two functions of :math:`n` have different :term:`growth rates` if as
:math:`n` goes to infinity their ratio either goes to infinity or goes
to zero.

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

Where does :math:`(1.618)^n` go on here?

Exact equations relating program operations to running time require
machine-dependent constants.
Sometimes, the equation for exact running time is complicated to
compute.
Usually, we are satisfied with knowing an approximate growth rate.

Example: Given two algorithms with growth rate :math:`c_1n` and
:math:`c_2 2^{n!}`, do we need to know the values of :math:`c_1`
and :math:`c_2`?

Consider :math:`n^2` and :math:`3n`.
PROVE that :math:`n^2` must eventually become (and remain) bigger.

Proof by Contradiction:
Assume there are some values for constants :math:`r` and :math:`s`
such that, for all values of :math:`n`,
:math:`n^2 < rn + s`.
Then, :math:`n < r + s/n`.
But, as :math:`n` grows, what happens to :math:`s/n`?
It goes to zero.

Since :math:`n` grows toward infinity, the assumption must be false.
Conclusion: In the limit, as :math:`n \rightarrow \infty`, constants
don't matter.
Limits are the typical way to prove that one function grows faster
than another.

Here are some useful observatios.

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

:math:`\log n` is related to :math:`n` in exactly the same way that
:math:`n` is related to :math:`2^n`.

:math:`2^{\log n} = n`.


Fibonacci Numbers
~~~~~~~~~~~~~~~~~

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

I prefer ":math:`f \in O(n^2)`" to ":math:`f = O(n^2)`"
While :math:`n \in O(n^2)` and :math:`n^2 \in O(n^2)`,
:math:`O(n) \neq O(n^2)`.

Note: Big oh does not say how good an algorithm is |---|
only how bad it **can** be.

If :math:`\mathcal{A}\in O(n)` and :math:`\mathcal{B} \in O(n^2)`,
is :math:`\mathcal{A}` better than :math:`\mathcal{B}`?
Perhaps... but perhaps better analysis will show that
:math:`\mathcal{A} = \Theta(n)` while
:math:`\mathcal{B} = \Theta(\log n)`.

Order Notation has practical limits.
Notation: :math:`\log n^2 (= 2 \log n)` vs.
:math:`\log^2 n (= (\log n)^2)` 
vs. :math:`\log \log n`.

:math:`\log 16^2 = 2 \log 16 = 8`.

:math:`\log^2 16 = 4^2 = 16`.

:math:`\log \log 16 = \log 4 = 2`.

Statement: Resource requirements for Algorithm :math:`\mathcal{A}`
grow slower than resource requirements for Algorithm :math:`\mathcal{B}`.

Is :math:`\mathcal{A}` better than :math:`\mathcal{B}`?

Potential problems:

* How big must the input be?
* Some growth rate differences are trivial
  Example: :math:`\Theta(\log^2 n)` vs. :math:`\Theta(n^{1/10})`.
  If :math:`n` is :math:`10^{12} (\approx 2^{40})` then
  :math:`\log^2 n \approx 1600`, :math:`n^{1/10} = 16` even though
  :math:`n^{1/10}` grows faster than :math:`\log^2 n`.
  :math:`n` must be enormous (like :math:`2^{150}`) for
  :math:`n^{1/10}` to be bigger than :math:`\log^2 n`.

It is not always practical to reduce an algorithm's growth rate
"Practical" here means that the constants might become too
much higher when we shave off the minor asymptotic growth.

Shaving a factor of :math:`n` reduces cost by a factor of a million
for input size of a million.
Shaving a factor of :math:`\log \log n` saves only a factor of 4-5.

There is the concept of a "Practicality Window".
In general, (1) we have limited time to solve a problem,
and (2) input can only get so big before the computer chokes.
Fortunately, algorithm growth rates are USUALLY well behaved, so that
Order Notation gives practical indications.
"Practical" is the keyword.
We use asymptotics because they provide a simple **model** that
**usually** mirrors reality.
This is **useful** to simplify our thinking.

.. odsascript:: AV/Background/SummationOneToNCON.js
