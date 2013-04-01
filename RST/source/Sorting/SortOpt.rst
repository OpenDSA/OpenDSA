.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Sorting

Since sorting is used so much, it is natural for programmers to want
to optimize their sorting code to run faster.
Let's consider a potential optimization
for the Insertion Sort code shown in Module
:ref:`Insertion Sort <InsertionSort>`.
This relates to use of the ``swap`` function call.
An alternative to continuously swapping the record to the left until a
smaller value is found is to move the current record to a temporary
variable, and then shift all of the records with greater value one
step to the right.
Since swap requires three assignments and shifting requires only one,
it appears that this will be a big improvement.

One of the key things to understand about optimizing code is that the
programming language you use can have a big influence on the
results.
Perhaps the greatest distinction is whether your language is compiled
or not.
Java and C++ are normally compiled, while JavaScript, Processing, and
Python are normally interpreted.
This can make a huge difference in whether a given code change will
actually speed the program up or not.

In the case of the "shift" vs "swap" choice, for a compiled language
like Java the compiler will probably do the optimization for you.
Typically the swap operation as we wrote the Insertion Sort code is
clearer than the shift version, so on a compiled language that is
probably a better idea.

However, in an interpreted language like JavaScript, the shift version
will be faster, for two reasons.
The first reason why it is faster is incidental to the intended
"optimization".
That is, a programmer is likely to write the swap operation using a
function call, while doing the shift inline.
And making the function call to the swap function takes a lot of time.
So if one wrote the Insertion Sort with a swap, but replaced the
function call with inline code to do swap, a big speed improvement will
occur.
Changing from the swap to the shift will make a further improvmement,
but not nearly as much.

You should note that the way our Selection Sort code is written,
a call to ``swap`` will be made even if the current
record is already in its correct location.
For example, if the record with the largest value is already in the
rightmost array position, ``selsort`` will still call ``swap`` with
both position parameters being the same.
The net effect is that the work done by ``swap`` will not change
anything in the array, and this is a waste of time.
Thus, the total number of swaps done by Selection sort is always
:math:`n-1` in the best, average and worst cases.
It might seem like a good idea to test if the positions are the same
before calling ``swap``, especially since Selection Sort's claim to
fame is its low number of swaps.
Whether this is really a good idea depends on how often the
unnecessary swap takes place.
For randomly ordered input, it is more expensive to test this
condition before every swap than to just do the swap.
So this would be an example of an "optimization" that does not improve
performance.
But if the input records are already sorted, then all of the swaps are
unnecessary and it would have been faster to test.

