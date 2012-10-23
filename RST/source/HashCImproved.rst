.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: Improved Collision Resolution
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Hashing
   :short_name: HashCImproved
   :exercises: 

.. _HashFunc:

.. include:: JSAVheader.rinc

.. odsalink:: AV/Sorting/hashCON.css

Improved Collision Resolution
=============================

Linear Probing by Steps
-----------------------

How can we avoid primary clustering?
One possible improvement might be to use linear probing,
but to skip slots by some constant :math:`c` other than 1.
This would make the probe function
:math:`\textbf{p}(K, i) = ci`,
and so the :math:`i` th slot in the probe sequence will be
:math:`(\textbf{h}(K) + ic) \mod M`.
In this way, records with adjacent home positions will not follow the
same probe sequence.

.. inlineav:: collisionCON1 slideshow
   :output: show

One quality of a good probe sequence is that it will cycle through
all slots in the hash table before returning to the home position.
Clearly linear probing (which "skips" slots by one each time) does this.
Unfortunately, not all values for :math:`c` will make this happen.
For example, if :math:`c = 2` and the table contains an even number of
slots, then any key whose home position is in an even slot will have
a probe sequence that cycles through only the even slots.
Likewise, the probe sequence for a key whose home position is in an
odd slot will cycle through the odd slots.
Thus, this combination of table size and linear probing constant
effectively divides the records into two sets stored in two
disjoint sections of the hash table.
So long as both sections of the table contain the same number of records,
this is not really important.
However, just from chance it is likely that one section will become
fuller than the other, leading to more collisions and poorer
performance for those records.
The other section would have fewer records, and thus better
performance.
But the overall system performance will be degraded,
as the additional cost to the side that is more full outweighs the
improved performance of the less-full side.

Constant :math:`c` must be relatively prime to :math:`M` to generate a
linear probing sequence that visits all slots in the table
(that is, :math:`c` and :math:`M` must share no factors).
For a hash table of size :math:`M = 10`, if :math:`c`
is any one of 1, 3, 7, or 9,
then the probe sequence will visit all slots for any key.
When :math:`M = 11`, any value for :math:`c` between 1 and 10 generates a
probe sequence that visits all slots for every key.

.. inlineav:: collisionCON2 slideshow
   :output: show

Now you can practice linear probing by different step sizes.

.. avembed:: Exercises/Sorting/HashingLinearStepProbePRO.html
   :showbutton: hide
   :title: Linear Probing by Steps Exercise

Consider the situation where :math:`c = 2` and we wish to insert a record
with key :math:`k_1` such that
:math:`\textbf{h}(k_1) = 3`.
The probe sequence for  :math:`k_1` is 3, 5, 7, 9, and so on.
If another key :math:`k_2` has home position at slot 5,
then its probe sequence will be 5, 7, 9, and so on.
The probe sequences of :math:`k_1` and :math:`k_2`
are linked together in a manner that contributes to clustering.
In other words, linear probing with a value of :math:`c > 1` does not
solve the problem of primary clustering.
We would like to find a probe function that does not link
keys together in this way.
We would prefer that the probe sequence for :math:`k_1`
after the first step on the sequence should not be identical to the
probe sequence of :math:`k_2`.
Instead, their probe sequences should diverge.

Pseudo-Random Probing
---------------------

The ideal probe function would select the next position on the probe
sequence at random from among the unvisited slots; that is, the probe
sequence should be a random permutation of the hash table positions.
Unfortunately, we cannot actually select the next position in the
probe sequence at random, because we would not be able to duplicate
this same probe sequence when searching for the key.
However, we can do something similar called
:dfn:`pseudo-random probing`.
In pseudo-random probing, the :math:`i` th slot in the probe sequence is
:math:`(\textbf{h}(K) + r_i) \mod M`
where :math:`r_i` is the :math:`i` th value in a random permutation
of the numbers from 1 to :math:`M-1`.
All inserts and searches must use the same sequence of random numbers.
The probe function would be
:math:`\textbf{p}(K, i) = \textbf{Perm}[i]`
where **Perm** is an array of length :math:`M` that stores a value of
0 in position **Perm[0]**, and stores a
random permutation of the values from 1 to :math:`M - 1` in slots 1 to
:math:`M - 1`.

.. inlineav:: collisionCON3 slideshow
   :output: show

Here is a practice exercise for pseudo-random probing.

.. avembed:: Exercises/Sorting/HashingPseudoRandomProbePRO.html
   :showbutton: hide
   :title: Pseudo-Random Probing Exercise

.. TODO::
   :type: Slideshow

   Slideshow showing how probe sequences diverge.


Quadratic Probing
-----------------

Another probe function that eliminates
primary clustering is called
:dfn:`quadratic probing`.
Here the probe function is some quadratic function
:math:`\textbf{p}(K, i) = c_1 i^2 + c_{2}i + c_3`
for some choice of constants :math:`c_1`, :math:`c_2`,
and  :math:`c_3`.

The simplest variation is :math:`\textbf{p}(K, i) = i^2`
(i.e., :math:`c_1 = 1`, :math:`c_2 = 0`, and
:math:`c_3 = 0`).
Then the :math:`i` th value in the probe sequence would be
:math:`(\textbf{h}(K) + i^2) \mod M`.
Under quadratic probing, two keys with different home
positions will have diverging probe sequences.
For example, given a hash table of size :math:`M = 101`, assume
for keys :math:`k_1` and :math:`k_2` that
and :math:`\textbf{h}(k_1) = 30` and 
:math:`\textbf{h}(k_2) = 29`.
The probe sequence for :math:`k_1` is 30,
then 31, then 34, then 39.
The probe sequence for :math:`k_2` is 29,
then 30, then 33, then 38.
Thus, while :math:`k_2` will probe to :math:`k_1`'s
home position as its second choice, the two keys' probe sequences
diverge immediately thereafter.

.. avembed:: Exercises/Sorting/HashingQuadraticProbePRO.html
   :showbutton: hide
   :title: Quadratic Probing Exercise

Unfortunately, quadratic probing has the disadvantage that typically
not all hash table slots will be on the probe sequence.
Using :math:`\textbf{p}(K, i) = i^2`
gives particularly inconsistent results.
For many hash table sizes, this probe function will cycle through a
relatively small number of slots.
If all slots on that cycle happen to be full, this means that the
record cannot be inserted at all!
For example, if our hash table has three slots, then records that hash
to slot 0 can probe only to slots 0 and 1 (that is, the probe sequence
will never visit slot 2 in the table).
Thus, if slots 0 and 1 are full, then the record cannot be inserted
even though the table is not full!
A more realistic example is a table with 105 slots.
The probe sequence starting from any given slot will only visit 23
other slots in the table.
If all 24 of these slots should happen to be full, even if other slots
in the table are empty, then the record cannot be inserted because the
probe sequence will continually hit only those same 24 slots.

.. TODO::
   :type: KA or slideshow

   Now go back up to the applet above. Pick some hash table size, and try
   to insert values that all hash to the same slot. See how they follow a
   probe sequence that will not fill the table.
   Try to 'fill the probe sequence' such that a record cannot be
   inserted into the table, even though the table is not full.

Fortunately, it is possible to get good results from quadratic probing
at low cost.
The right combination of probe function and table size will visit many
slots in the table.
In particular, if the hash table size is a prime number and the probe
function is :math:`\textbf{p}(K, i) = i^2`,
then at least half the slots in the table will be visited.
Thus, if the table is less than half full, we can be certain that a
free slot will be found.
Alternatively, if the hash table size is a power of two and the probe
function is :math:`\textbf{p}(K, i) = (i^2 + i)/2`,
then every slot in the table will be visited by the probe function.

.. TODO::
   :type: AV

   This applet will show you how well quadratic probing does (and
   doesn't) reach all the slots of a hash table.
   Try some different table sizes, and see how well each works.
   Try to find some hash table size that visits most of
   the slots.

Double Hashing
--------------

Both pseudo-random probing and quadratic probing eliminate
primary clustering, which is the name given to the the situation when
keys share substantial segments of a probe sequence.
If two keys hash to the same home position, however, then they will always
follow the same probe sequence for every collision resolution method that
we have seen so far.
The probe sequences generated by pseudo-random and
quadratic probing (for example) are entirely a function of the home
position, not the original key value.
This is because function **p** ignores its input parameter
:math:`K` for these collision resolution methods.
If the hash function generates a cluster at a particular home
position, then the cluster remains under pseudo-random and quadratic
probing.
This problem is called :dfn:`secondary clustering`.

To avoid secondary clustering, we need to have the probe sequence make
use of the original key value in its decision-making process.
A simple technique for doing this is to return to
linear probing by a constant step size
for the probe function, but to
have that constant be determined by a second hash function,
:math:`\textbf{h}_2`.
Thus, the probe sequence would be of the form
:math:`\textbf{p}(K, i) = i * \textbf{h}_2(K)`.
This method is called :dfn:`double hashing`.

.. TODO::
   :type: slideshow

   Use this applet to try out double hashing for yourself.
   Insert several values that all hash to the same slot.
   You should see that they follow different probe sequences.

A good implementation of double hashing
should ensure that all of the probe sequence constants are relatively
prime to the table size :math:`M`.
This can be achieved easily.
One way is to select :math:M` to be a prime number, and have
:math:`\textbf{h}_2` return a value in the range
:math:`1 <= \textbf{h}_2(K) <= M - 1`.
Another way is to set :math:`M = 2^m`
for some value :math:`m` and have
:math:`\textbf{h}_2` return an odd value
between 1 and :math:`2^m`.

.. TODO::
   :type: KA

   Exercises for double hashing

.. avembed:: Exercises/Sorting/HashCollisionSumm.html
   :showbutton: hide
   :title: Collision Resolution Review

.. odsascript:: AV/Sorting/collisionCON.js
