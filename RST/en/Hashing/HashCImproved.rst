.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: collision resolution
   :topic: Hashing

.. odsalink:: AV/Hashing/collisionCON.css

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

.. inlineav:: collisionCON1 ss
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

.. inlineav:: collisionCON2 ss
   :output: show

Now you can practice linear probing by different step sizes.

.. avembed:: Exercises/Hashing/HashLinearStepPPRO.html ka


Pseudo-Random Probing
---------------------

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

The ideal probe function would select the next position on the probe
sequence at random from among the unvisited slots; that is, the probe
sequence should be a random permutation of the hash table positions.
Unfortunately, we cannot actually select the next position in the
probe sequence at random, because we would not be able to duplicate
this same probe sequence when searching for the key.
However, we can do something similar called
:term:`pseudo-random probing`.
In pseudo-random probing, the :math:`i` th slot in the probe sequence is
:math:`(\textbf{h}(K) + r_i) \mod M`
where :math:`r_i` is the :math:`i` th value in a random permutation
of the numbers from 1 to :math:`M-1`.
All inserts and searches must use the same sequence of random numbers.
The probe function would be
:math:`\textbf{p}(K, i) = \textbf{Permutation}[i]`
where **Permutation** is an array of length :math:`M` that stores a value of
0 in position **Permutation[0]**, and stores a
random permutation of the values from 1 to :math:`M - 1` in slots 1 to
:math:`M - 1`.

.. inlineav:: collisionCON3 ss
   :output: show

Here is a practice exercise for pseudo-random probing.

.. avembed:: Exercises/Hashing/HashPseudoRandomPPRO.html ka

Pseudo-random probing exhibits another desirable feature in a hash
function.

.. inlineav:: collisionCON4 ss
   :output: show


Quadratic Probing
-----------------

Another probe function that eliminates
primary clustering is called
:term:`quadratic probing`.
Here the probe function is some quadratic function
:math:`\textbf{p}(K, i) = c_1 i^2 + c_{2}i + c_3`
for some choice of constants :math:`c_1`, :math:`c_2`,
and  :math:`c_3`.

The simplest variation is :math:`\textbf{p}(K, i) = i^2`
(i.e., :math:`c_1 = 1`, :math:`c_2 = 0`, and
:math:`c_3 = 0`).
Then the :math:`i` th value in the probe sequence would be
:math:`(\textbf{h}(K) + i^2) \mod M`.

.. inlineav:: collisionCON5 ss
   :output: show

Now you can practice quadratic probing.

.. avembed:: Exercises/Hashing/HashQuadraticPPRO.html ka

There is one problem with quadratic probing: Its probe sequence
typically will not visit all slots in the hash table.

.. inlineav:: collisionCON6 ss
   :output: show


For many hash table sizes, this probe function will cycle through a
relatively small number of slots.
If all slots on that cycle happen to be full, this means that the
record cannot be inserted at all!
A more realistic example is a table with 105 slots.
The probe sequence starting from any given slot will only visit 23
other slots in the table.
If all 24 of these slots should happen to be full, even if other slots
in the table are empty, then the record cannot be inserted because the
probe sequence will continually hit only those same 24 slots.

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
This problem is called :term:`secondary clustering`.

To avoid secondary clustering, we need to have the probe sequence make
use of the original key value in its decision-making process.
A simple technique for doing this is to return to
linear probing by a constant step size
for the probe function, but to
have that constant be determined by a second hash function,
:math:`\textbf{h}_2`.
Thus, the probe sequence would be of the form
:math:`\textbf{p}(K, i) = i * \textbf{h}_2(K)`.
This method is called :term:`double hashing`.

There are important restrictions on :math:`h_2`.
Most importantly, the value returned by :math:`h_2` must never be zero
(or :math:`M`) because that will immediately lead to an infinite loop
as the probe sequence makes no progress.
However, a good implementation of double hashing should also ensure
that all of the probe sequence constants are relatively
prime to the table size :math:`M`.
For example, if the hash table size were 100 and the step size for
linear probing (as generated by function :math:`h_2`) were 50, then
there would be only one slot on the probe sequence.
If instead the hash table size is 101 (a prime number), than any step
size less than 101 will visit every slot in the table.

This can be achieved easily.
One way is to select :math:`M` to be a prime number, and have
:math:`\textbf{h}_2` return a value in the range
:math:`1 <= \textbf{h}_2(k) <= M - 1`.
We can do this by using this secondary hash function:
:math:`\textbf{h}_2(k) = 1 + (k \mod (M-1))`.
An alternative is to set :math:`M = 2^m`
for some value :math:`m` and have
:math:`\textbf{h}_2` return an odd value
between 1 and :math:`2^m`.
We can get that result with this secondary hash function:
:math:`\textbf{h}_2(k) = (((k/M) \mod (M/2)) * 2) + 1`.

.. inlineav:: collisionCON7 ss
   :output: show

|

.. inlineav:: collisionCON8 ss
   :output: show


Now you can try it.

.. avembed:: Exercises/Hashing/HashDoublePPRO.html ka

.. TODO::
   :type: AV

   Fix and return hashAV.html to here.

   The following visualization lets you test out different combinations
   of hash function and collision resolution, on your own input data.

.. odsascript:: AV/Hashing/collisionCON1.js
.. odsascript:: AV/Hashing/collisionCON2.js
.. odsascript:: AV/Hashing/collisionCON3.js
.. odsascript:: AV/Hashing/collisionCON4.js
.. odsascript:: AV/Hashing/collisionCON5.js
.. odsascript:: AV/Hashing/collisionCON6.js
.. odsascript:: AV/Hashing/collisionCON7.js
.. odsascript:: AV/Hashing/collisionCON8.js
