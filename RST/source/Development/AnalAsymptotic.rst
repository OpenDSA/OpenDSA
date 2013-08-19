.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: algorithm analysis
   :requires: growth rate; best and worst case
   :topic: Algorithm Analysis

Asymptotic Analysis
===================

Despite the larger constant for the curve labeled :math:`10 n` in
Figure :num:`Figure #RunTimeGraph`, :math:`2 n^2` crosses it at the
relatively small value of :math:`n = 5`.
What if we double the value of the constant in front of the linear
equation?
As shown in the graph, :math:`20 n` is surpassed by :math:`2 n^2`
once :math:`n = 10`.
The additional factor of two for the linear growth rate does not much
matter.
It only doubles the :math:`x`-coordinate for the intersection point.
In general, changes to a constant factor in either equation only
shift *where* the two curves cross, not *whether*
the two curves cross.

When you buy a faster computer or a faster compiler,
the new problem size that can be run in a given amount of time for a
given growth rate is
larger by the same factor, regardless of the constant on the
running-time equation.
The time curves for two algorithms with different growth rates
still cross, regardless of their running-time equation constants.
For these reasons, we usually ignore the constants when we want an
estimate of the growth rate for the running time or other resource
requirements of an algorithm.
This simplifies the analysis and keeps us thinking about the most
important aspect: the growth rate.
This is called :term:`asymptotic algorithm analysis`.
To be precise, asymptotic analysis refers to the study of an
algorithm as the input size "gets big" or reaches
a limit (in the calculus sense).
However, it has proved to be so useful to ignore all constant factors
that asymptotic analysis is used for most algorithm comparisons.

It is not always reasonable to ignore the constants.
When comparing algorithms meant to run on small values of :math:`n`,
the constant can have a large effect.
For example, if the problem is to sort a collection of exactly
five records, then an algorithm designed for sorting thousands of
records is probably not appropriate, even if its asymptotic analysis
indicates good performance.
There are rare cases where the constants for two algorithms under
comparison can differ by a factor of 1000 or more, making the one
with lower growth rate impractical for most purposes due to its large
constant.
Asymptotic analysis is a form of "back of the envelope"
estimation for algorithm resource consumption.
It provides a simplified model of the running time or
other resource needs of an algorithm.
This simplification usually helps you understand the behavior of your
algorithms.
Just be aware of the limitations to asymptotic analysis in the
rare situation where the constant is important.

Upper Bounds
------------

Several terms are used to describe the running-time equation for an
algorithm.
These terms |---| and their associated symbols |---| indicate
precisely what aspect of the algorithm's behavior is being described.
One is the :term:`upper bound` for the growth of the algorithm's
running time.
It indicates the upper or highest growth rate that
the algorithm can have.

Because the phrase
"has an upper bound to its growth rate of :math:`f(n)`"
is long and often used when discussing algorithms, we adopt a
special notation, called :term:`big-Oh notation`.
If the upper bound for an algorithm's growth rate (for, say, the
worst case) is \(f(n)\), then we would write that this algorithm is
"in the set :math:`O(f(n))` in the worst case"
(or just "in :math:`O(f(n))` in the worst case").
For example, if :math:`n^2` grows as fast as :math:`\mathbf{T}(n)`
(the running time of our algorithm) for the worst-case input,
we would say the algorithm is "in :math:`O(n^2)` in the worst case".

The following is a precise definition for an upper bound.
:math:`\mathbf{T}(n)` represents the true running time of the
algorithm.
:math:`f(n)` is some expression for the upper bound.

   For :math:`\mathbf{T}(n)` a non-negatively valued function,
   :math:`\mathbf{T}(n)` is in set :math:`O(f(n))` if there exist two
   positive constants :math:`c` and :math:`n_0` such that
   :math:`\mathbf{T}(n) \leq cf(n)` for all :math:`n > n_0`.

Constant :math:`n_0` is the smallest value of :math:`n` for which the
claim of an upper bound holds true.
Usually :math:`n_0` is small, such as 1, but does not need to be.
You must also be able to pick some constant :math:`c`,
but it is irrelevant what the value for :math:`c` actually is.
In other words, the definition says that for *all* inputs of the
type in question (such as the worst case for all inputs of size
:math:`n`) that are large enough (i.e., :math:`n > n_0`),
the algorithm *always* executes in less than or equal to :math:`cf(n)`
steps for some constant :math:`c`. 

.. topic:: Example

   Consider the sequential search algorithm for finding a specified
   value in an array of integers.
   If visiting and examining one value in the array requires
   :math:`c_s` steps where :math:`c_s` is a positive number,
   and if the value we search for has equal probability of appearing
   in any position in the array,
   then in the average case :math:`\mathbf{T}(n) = c_s n/2`.
   For all values of :math:`n > 1`, :math:`c_s n/2 \leq c_s n`.
   Therefore, by the definition, :math:`\mathbf{T}(n)` is in
   :math:`O(n)` for :math:`n_0 = 1` and :math:`c = c_s`.


.. topic:: Example

   For a particular algorithm, :math:`\mathbf{T}(n) = c_1 n^2 + c_2 n`
   in the average case where :math:`c_1` and :math:`c_2` are positive
   numbers. 
   Then,

   .. math::

      c_1 n^2 + c_2 n \leq c_1 n^2 + c_2 n^2 \leq (c_1 + c_2)n^2

   for all :math:`n > 1`.
   So, :math:`\mathbf{T}(n) \leq c n^2` for :math:`c = c_1 + c_2`,
   and :math:`n_0 = 1`.
   Therefore, :math:`\mathbf{T}(n)` is in :math:`O(n^2)` by the second
   definition. 

.. topic:: Example

   Assigning the value from the first position of an array to a
   variable takes constant time regardless of the size of the
   array.
   Thus, :math:`\mathbf{T}(n) = c` (for the best, worst, and average
   cases). 
   We could say in this case that :math:`\mathbf{T}(n)` is in
   :math:`O(c)`.
   However, it is traditional to say that an algorithm whose running
   time has a constant upper bound is in :math:`O(1)`.

If someone asked you out of the blue "Who is the best?" your natural
reaction should be to reply "Best at what?"
In the same way, if you are asked "What is the growth rate of this
algorithm", you would need to ask "When? Best case? Average case? Or
worst case?"
Some algorithms have the same behavior no matter which input instance
of a given size that they receive.
An example is finding the maximum in an array of integers.
But for many algorithms, it makes a big difference which particular
input of a given size is involved, such as when
searching an unsorted array for a particular value.
So any statement about the upper bound of an algorithm
must be in the context of some specific class of inputs of size
:math:`n`.
We measure this upper bound nearly always on the best-case,
average-case, or worst-case inputs.
Thus, we cannot say, "this algorithm has an upper bound to its growth
rate of :math:`n^2`" because that is an incomplete statement.
We must say something like, "this algorithm has an upper bound to its
growth rate of :math:`n^2` *in the average case*".

Knowing that something is in :math:`O(f(n))` says only how bad things
can be.
Perhaps things are not nearly so bad.
Because sequential search is in :math:`O(n)` in the worst case,
it is also true to say that sequential search is in :math:`O(n^2)`.
But sequential search is practical for large :math:`n` in a way that
is not true for some other algorithms in :math:`O(n^2)`.
We always seek to define the running time of an algorithm
with the tightest (lowest) possible upper bound.
Thus, we prefer to say that sequential search is in :math:`O(n)`.
This also explains why the phrase "is in :math:`O(f(n))` or the
notation ":math:`\in O(f(n))`" is used instead of " is :math:`O(f(n))`
or ":math:`= O(f(n))`".
There is no strict equality to the use of big-Oh notation.
:math:`O(n)` is in :math:`O(n^2)`, but :math:`O(n^2)` is not in
:math:`O(n)`.

Lower Bounds
------------

Big-Oh notation describes an upper bound.
In other words, big-Oh notation states a claim about the greatest
amount of some resource (usually time) that is required by an
algorithm for some class of inputs of size :math:`n` (typically
the worst such input, the average of all possible inputs, or the best
such input).

Similar notation is used to describe the least amount of a resource
that an algorithm needs for some class of input.
Like big-Oh notation, this is a measure of the algorithm's
growth rate.
Like big-Oh notation, it works for any resource, but
we most often measure the least amount of time required.
And again, like big-Oh notation, we are measuring the resource
required for some particular class of inputs: the worst-, average-,
or best-case input of size :math:`n`.

The :term:`lower bound` for an algorithm
(or a problem, as explained later) 
is denoted by the symbol :math:`\Omega`, pronounced "big-Omega" or
just "Omega".
The following definition for :math:`\Omega` is symmetric with the
definition of big-Oh.

   For :math:`\mathbf{T}(n)` a non-negatively valued function,
   :math:`\mathbf{T}(n)` is in set :math:`\Omega(g(n))` if there exist
   two positive constants :math:`c` and :math:`n_0` such that
   :math:`\mathbf{T}(n) \geq c g(n)` for all :math:`n > n_0`. [#]_


.. _AAnalEx:

.. topic:: Example

   Assume :math:`\mathbf{T}(n) = c_1 n^2 + c_2 n` for :math:`c_1` and
   :math:`c_2 > 0`. 
   Then,

   .. math::

      c_1 n^2 + c_2 n \geq c_1 n^2

   for all :math:`n > 1`.
   So, :math:`\mathbf{T}(n) \geq c n^2` for :math:`c = c_1` and
   :math:`n_0 = 1`.
   Therefore, :math:`\mathbf{T}(n)` is in :math:`\Omega(n^2)` by the
   definition. 

It is also true that the equation of Example :num:`Example #AAnalEx`
is in :math:`\Omega(n)`.
However, as with big-Oh notation, we wish to get the "tightest"
(for :math:`\Omega` notation, the largest) bound possible.
Thus, we prefer to say that this running time is in :math:`\Omega(n^2)`.

Recall the sequential search algorithm to find a value :math:`K`
within an array of integers.
In the average and worst cases this algorithm is in :math:`\Omega(n)`,
because in both the average and worst cases we must examine
*at least* :math:`cn` values (where :math:`c` is 1/2 in the average
case and 1 in the worst case).

:math:`\Theta` Notation
-----------------------

The definitions for big-Oh and :math:`\Omega` give us ways to
describe the upper bound for an algorithm (if we can find an equation
for the maximum cost of a particular class of inputs of size
:math:`n`) and the lower bound for an algorithm
(if we can find an equation for the minimum cost for
a particular class of inputs of size :math:`n`).
When the upper and lower bounds are the same within a constant factor,
we indicate this by using :math:`\Theta` (big-Theta) notation.
An algorithm is said to be :math:`\Theta(h(n))` if it is in
:math:`O(h(n))` *and* it is in :math:`\Omega(h(n))`.
Note that we drop the word "in" for :math:`\Theta` notation,
because there is a strict equality for two equations with the
same :math:`\Theta`.
In other words, if :math:`f(n)` is :math:`\Theta(g(n))`, then
:math:`g(n)` is :math:`\Theta(f(n))`.

Because the sequential search algorithm is both in :math:`O(n)` and in
:math:`\Omega(n)` in the average case, we say it is :math:`\Theta(n)`
in the average case.

Given an algebraic equation describing the time requirement for
an algorithm, the upper and lower bounds always meet.
That is because in some sense we have a perfect analysis for the
algorithm, embodied by the running-time equation.
For many algorithms (or their instantiations as programs), it is easy
to come up with the equation that defines their runtime behavior.
The analysis for most commonly used algorithms is well understood and
we can almost always give a :math:`\Theta` analysis for them.
However, Chapter :numref:`<LimComp>` discusses a whole class of
algorithms for which we have no :math:`\Theta` analysis, just some
unsatisfying big-Oh and :math:`\Omega` analyses.
Even some "simple" programs are hard to analyze.
Nobody currently knows the true upper or lower bounds for the
following code fragment.

   .. codeinclude:: Misc/Collatz.pde 
      :tag: Collatz

While some textbooks and programmers will casually say that an
algorithm is "order of" or "big-Oh" of some cost function,
it is generally better to use :math:`\Theta` notation rather than
big-Oh notation whenever we have sufficient knowledge about an
algorithm to be sure that the upper and lower bounds indeed match.
OpenDSA modules use :math:`\Theta` notation in preference to 
big-Oh notation whenever our state of knowledge makes that possible.
Limitations on our ability to analyze certain algorithms may require
use of big-Oh or :math:`\Omega` notations.
In rare occasions when the discussion is explicitly about the upper or 
lower bound of a problem or algorithm, the corresponding notation will
be used in preference to :math:`\Theta` notation.

Simplifying Rules
-----------------

Once you determine the running-time equation for an algorithm,
it really is a simple matter to derive the big-Oh, :math:`\Omega`, and
:math:`Theta` expressions from the equation.
You do not need to resort to the formal definitions of asymptotic
analysis.
Instead, you can use the following rules to
determine the simplest form.

#. If :math:`f(n)` is in :math:`O(g(n))` and :math:`g(n)` is in
   :math:`O(h(n))`, then :math:`f(n)` is in :math:`O(h(n))`.

#. If :math:`f(n)` is in :math:`O(k g(n))` for any constant
   :math:`k > 0`, then :math:`f(n)` is in :math:`O(g(n))`.

#. If :math:`f_1(n)` is in :math:`O(g_1(n))` and :math:`f_2(n)` is in
   :math:`O(g_2(n))`, then :math:`f_1(n) + f_2(n)` is in
   :math:`O(\max(g_1(n), g_2(n)))`.

#. If :math:`f_1(n)` is in :math:`O(g_1(n))` and :math:`f_2(n)` is in
   :math:`O(g_2(n))`, then :math:`f_1(n) f_2(n)` is in
   :math:`O(g_1(n) g_2(n))`.

The first rule says that if some function :math:`g(n)` is an upper
bound for your cost function, then any upper bound for :math:`g(n)`
is also an upper bound for your cost function.
A similar property holds true for :math:`\Omega` notation:
If :math:`g(n)` is a lower bound for your cost function, then any
lower bound for :math:`g(n)` is also a lower bound for your cost
function.
Likewise for :math:`\Theta` notation.

The significance of rule (2) is that you can ignore any multiplicative
constants in your equations when using big-Oh notation.
This rule also holds true for :math:`\Omega` and :math:`\Theta`
notations.

Rule (3) says that given two parts of a program run in sequence
(whether two statements or two sections of code),
you need consider only the more expensive part.
This rule applies to :math:`\Omega` and :math:`\Theta` notations as
well:
For both, you need consider only the more expensive part.

Rule (4) is used to analyze simple loops in programs.
If some action is repeated some number of times,
and each repetition has the same cost, then the total cost
is the cost of the action multiplied by the number of times that the
action takes place.
This rule applies to :math:`\Omega` and :math:`\Theta` notations as
well.

Taking the first three rules collectively, you can ignore all
constants and all lower-order terms to determine the asymptotic growth
rate for any cost function.
The advantages and dangers of ignoring constants were discussed near
the beginning of this section.
Ignoring lower-order terms is reasonable when performing an
asymptotic analysis.
The higher-order terms soon swamp the lower-order terms in their
contribution to the total cost as \(n\) becomes larger.
Thus, if :math:`\mathbf{T}(n) = 3 n^4 + 5 n^2`, then
:math:`\mathbf{T}(n)` is in :math:`O(n^4)`. 
The :math:`n^2` term contributes relatively little to the total cost
for large :math:`n`.

From now on, we will use these simplifying
rules when discussing the cost for a program or algorithm.

Classifying Functions
---------------------

Given functions :math:`f(n)` and :math:`g(n)` whose growth rates are
expressed as algebraic equations, we might like to determine if one
grows faster than the other.
The best way to do this is to take the limit of the two
functions as :math:`n` grows towards infinity,

.. math::

   \lim_{n \rightarrow \infty} \frac{f(n)}{g(n)}.

If the limit goes to :math:`\infty`, then :math:`f(n)` is in
:math:`\Omega(g(n))` because :math:`f(n)` grows faster.
If the limit goes to zero, then :math:`f(n)` is in :math:`O(g(n))`
because :math:`g(n)` grows faster.
If the limit goes to some constant other than zero, then
:math:`f(n) = \Theta(g(n))` because both grow at the same rate.

.. topic:: Example

   If :math:`f(n) = 2n\log n` and :math:`g(n)=n^2`, is :math:`f(n)` in
   :math:`O(g(n))`, :math:`\Omega(g(n))`, or :math:`\Theta(g(n))`?
   Because

   .. math::

      \frac{n^2}{2n\log n} = \frac{n}{2\log n},

   we easily see that

   .. math::

      \lim_{n \rightarrow \infty} \frac{n^2}{2n\log n} = \infty

   because :math:`n` grows faster than :math:`2\log n`.
   Thus, :math:`n^2` is in :math:`\Omega(2n\log n)`.

.. TODO::
   :type: Exercise

   Given two functions, determine the relative growth rates (see
   Exercise 3.11 in the book).

.. TODO::
   :type: Exercise

   Write a battery of summary questions

Notes
-----

.. [#] An alternate (non-equivalent) definition for :math:`\Omega` is

          :math:`\mathbf{T}(n)` is in the set :math:`\Omega(g(n))` if
          there exists a positive constant :math:`c` such that
          :math:`\mathbf{T}(n) \geq c g(n)` for an infinite number of
          values for :math:`n`.

       This definition says that for an "interesting" number of
       cases, the algorithm takes at least :math:`c g(n)` time.
       Note that this definition is *not* symmetric with the
       definition of big-Oh.
       For :math:`g(n)` to be a lower bound,
       this definition *does not* require that
       :math:`\mathbf{T}(n) \geq c g(n)` for
       all values of :math:`n` greater than some constant.
       It only requires that this happen often enough, in particular
       that it happen for an infinite number of values for :math:`n`.
       Motivation for this alternate definition can be found in the
       following example.

       Assume a particular algorithm has the following behavior:


       .. math::

          \mathbf{T}(n) = \left\{ \begin{array}{ll}
          n  & \mbox{for all odd}\ n \geq 1\\
          n^2/100 & \mbox{for all even}\ n \geq 0
          \end{array}
          \right.

       From this definition, :math:`n^2/100 \geq \frac{1}{100} n^2`
       for all even :math:`n \geq 0`.
       So, :math:`\mathbf{T}(n) \geq c n^2` for an infinite number of
       values of :math:`n` (i.e., for all even :math:`n`)
       for :math:`c = 1/100`.
       Therefore, :math:`\mathbf{T}(n)` is in :math:`\Omega(n^2)` by
       the definition. 

       For this equation for :math:`\mathbf{T}(n)`, it is true that
       all inputs of size :math:`n` take at least :math:`cn` time.
       But an infinite number of inputs of size :math:`n` take
       :math:`cn^2` time, so we would like to say that the algorithm
       is in :math:`\Omega(n^2)`. 
       Unfortunately, using our first definition will
       yield a lower bound of :math:`\Omega(n)` because it is not
       possible to pick constants :math:`c` and :math:`n_0` such that
       :math:`\mathbf{T}(n) \geq c n^2` for all :math:`n>n_0`.
       The alternative definition does result in a lower
       bound of :math:`\Omega(n^2)` for this algorithm, which seems to
       fit common sense more closely.
       Fortunately, few real algorithms or computer programs display
       the pathological behavior of this example.
       Our first definition for :math:`\Omega` generally yields the
       expected result.

       As you can see from this discussion, asymptotic bounds notation
       is not a law of nature.
       It is merely a powerful modeling tool used to describe the
       behavior of algorithms.
