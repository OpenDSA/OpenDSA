.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :topic: Randomized Algorithms

Random Numbers
==============

The success of randomized algorithms depends on having access to a
good random number generator.
While modern compilers are likely to include a random number generator
that is good enough for most purposes, it is helpful to understand how
they work, and to even be able to construct your own in case you don't
trust the one provided.
This is easy to do.

First, let us consider what a random sequence.
From the following list, which appears to be a sequence of "random"
numbers?


* 1, 1, 1, 1, 1, 1, 1, 1, 1, ...
* 1, 2, 3, 4, 5, 6, 7, 8, 9, ...
* 2, 7, 1, 8, 2, 8, 1, 8, 2, ...

In fact, all three happen to be the beginning of a some sequence in
which one could continue the pattern to generate more values (in case
you do not recognize it, the third one is the initial digits of the
irrational constant :math:`e`).
Viewed as a series of digits, ideally every possible sequence has
equal probability of being generated (even the three sequences
above).
In fact, definitions of randomness generally have features such as:

* One cannot predict the next item. The series is :term:`unpredictable`.
* The series cannot be described more briefly than simply listing
  it out. This is the :term:`equidistribution` property.

There is no such thing as a random number sequence, only
"random enough" sequences.
A sequence is :term:`pseudorandom` if no future term can be predicted
in polynomial time, given all past terms.

Most computer systems use a deterministic algorithm to select
pseudorandom numbers.  [#]_
The most commonly used approach historically is known as the 
:term:`Linear Congruential Method` (LCM).
The LCM method is quite simple.
We begin by picking a :term:`seed` that we will call :math:`r(1)`.
Then, we can compute successive terms as follows.

.. math::

   r(i) = (r(i-1)\times b) \bmod t

where :math:`b` and :math:`t` are constants.

By definition of the :math:`\bmod` function, all generated numbers
must be in the range 0 to :math:`t-1`.
Now, consider what happens when :math:`r(i) = r(j)` for values
:math:`i` and :math:`j`.
Of course then :math:`r(i+1) = r(j+1)` which means that we have a
repeating cycle.

Since the values coming out of the random number generator are between
0 and :math:`t-1`, the longest cycle that we can hope for has length
:math:`t`.
In fact, since :math:`r(0) = 0`, it cannot even be quite this long.
It turns out that to get a good result, it is crucial to pick good
values for both :math:`b` and :math:`t`. 
To see why, consider the following example.

.. topic:: Example

   Given a :math:`t` value of 13, we can get very different results
   depending on the :math:`b` value that we pick, in ways that are
   hard to predict.

   .. math::

      r(i) = 6r(i-1) \bmod 13 =
      \quad ..., 1, 6, 10, 8, 9, 2, 12, 7, 3, 5, 4, 11, 1, ...\\

      r(i) = 7r(i-1) \bmod 13 =
      \quad ..., 1, 7, 10, 5, 9, 11, 12, 6, 3, 8, 4, 2, 1, ...\\

      \begin{eqnarray}
      r(i) = 5r(i-1) \bmod 13 &=& ..., 1, 5, 12, 8, 1, ...\\
      && ..., 2, 10, 11, 3, 2, ...\\
      && ..., 4, 7, 9, 6, 4, ...\\
      && ..., 0, 0, ...\\
      \end{eqnarray}

   In the case of :math:`b=5`, the generator goes through only a short
   sequence before repeating, with the series depending on the seed value
   chosen.
   Clearly, a :math:`b` value of 5 is far inferior to :math:`b` values
   of 6 or 7 in this example.

If you would like to write a simple LCM random number generator of
your own, an effective one can be made with the following formula.

.. math::

   r(i) = 16807 r(i-1) \bmod 2^{31} - 1.

.. [#] Another approach is based on
       using a computer chip that generates random numbers resulting
       from "thermal noise" in the system.
       Time will tell if this approach replaces deterministic approaches.
