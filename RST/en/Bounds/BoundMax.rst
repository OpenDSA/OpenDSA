.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Lower Bounds

Finding the Maximum Value
=========================

How can we find the :math:`i` th largest value in a sorted list?
Obviously we just go to the :math:`i` th position.
But what if we have an unsorted list?
Can we do better than to sort it?
If we are looking for the minimum or maximum value, certainly we can
do better than sorting the list.
Is this true for the second biggest value?
For the median value?
In later sections we will examine those questions.
For this section, we will continue our examination of lower bounds
proofs by reconsidering the simple problem of finding the maximum
value in an unsorted list.

Here is a simple algorithm for finding the largest value.

   .. codeinclude:: Misc/LargestTest
      :tag: Largest

Obviously this algorithm requires :math:`n` comparisons.
Is this optimal?
It should be intuitively obvious that it is, but let us try to prove
it.
(Before reading further you might try writing down your own proof.)

.. topic:: Proof 1

   The winner must compare against all other elements, so there must be
   :math:`n-1` comparisons.

This proof is clearly wrong, because the winner does not need to
explicitly compare against all other elements to be recognized.
For example, a standard single-elimination playoff sports tournament
requires only :math:`n-1` comparisons, and the winner does not play
every opponent.
So let's try again.

.. topic:: Proof 2

   Only the winner does not lose.
   There are :math:`n-1` losers.
   A single comparison generates (at most) one (new) loser.
   Therefore, there must be :math:`n-1` comparisons.

This proof is sound.
However, it will be useful later to abstract this by introducing the
concept of :ref:`posets <poset> <BoundSearch>`.
We can view the maximum-finding problem as starting with a poset where
there are no known relationships, so every member of the collection is
in its own separate DAG of one element.

.. topic:: Proof 2a

   To find the largest value, we start with a poset of :math:`n` DAGs
   each with a single element, and we must build a poset having all
   elements in one DAG such that there is one maximum value
   (and by implication, :math:`n-1` losers).
   We wish to connect the elements of the poset into a single DAG with
   the minimum number of links.
   This requires at least :math:`n-1` links.
   A comparison provides at most one new link.
   Thus, a minimum of :math:`n-1` comparisons must be made.

What is the average cost of ``largest``?
Because it always does the same number of comparisons,
clearly it must cost :math:`n-1` comparisons.
We can also consider the number of assignments that ``largest``
must do.
Function ``largest`` might do an assignment on any iteration of the
``for`` loop.

Because this event does happen, or does not happen,
if we are given no information about distribution we could guess that
an assignment is made after each comparison with a probability of one
half.
But this is clearly wrong.
In fact, ``largest`` does an assignment on the :math:`i` th iteration
if and only if ``A`` [:math:`i`] is the biggest of the the first
:math:`i` elements.
Assuming all permutations are equally likely, the probability of this
being true is :math:`1/i`.
Thus, the average number of assignments done is

.. math::

   1 + \sum_{i=2}^n \frac{1}{i} = \sum_{i=1}^n \frac{1}{i}

which is the Harmonic Series :math:`{\cal H}_n`.

.. math::

   {\cal H}_n = \Theta(\log n).

More exactly, :math:`{\cal H}_n` is close to :math:`\log_e n`.

How "reliable" is this average?
That is, how much will a given run of the program deviate from the
mean cost?
According to Cebysev's Inequality, an observation will fall
within two standard deviations of the mean at least 75% of the time.
For ``Largest``, the variance is

.. math::

   {\cal H}_n - \frac{\pi^2}{6} = \log_e n - \frac{\pi^2}{6}.

The standard deviation is thus about :math:`\sqrt{\log_e n}`.
So, 75% of the observations are between
:math:`\log_e n - 2\sqrt{\log_e n}` 
and :math:`\log_e n + 2\sqrt{\log_e n}`.
Is this a narrow spread or a wide spread?
Compared to the mean value, this spread is pretty wide, meaning
that the number of assignments varies widely from run to run of the
program.
