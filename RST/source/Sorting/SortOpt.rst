.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites: ExchangeSort
   :topic: Sorting, Code Tuning

Optimizing Sort Algorithms with Code Tuning
===========================================

Since sorting is used so much, it is natural for programmers to want
to optimize their sorting code to run faster.
Of course Insertion Sort, Bubble Sort and Selection Sort are all
relatively slow (each has :math:`\Theta(n^2)` worst case running
time).
The best way to speed them up is to find a better sorting algorithm.
Nonetheless, there have been many suggestions given over the years
about how to speed up one or another of them.
There are useful lessons to be learned about code tuning in general by
seeing which of these actually turn out to give better performance.


We'll start with the best one, which improves 
the Insertion Sort code shown in Module
:ref:`Insertion Sort <InsertionSort>`.
Recall that Insertion Sort repeatedly moves an element upwards in the
list until it encounters a key with lesser value.
In the original code, this is done with a series of swap operations.
In some languages, a simple way to speed things up is to replace a
function call with the code that the function would perform.
Table :numref:`Figure #costTable` shows the relative costs for several
languages.
Only Python had a noticeable effect from replacing the swap function
call with inline code.

But there is another alternative to continuously swapping the record
to the left until a smaller value is found.
This is to move the current record to a temporary
variable, and then shift all of the records with greater value one
step to the right.
Since swap requires three assignments and shifting requires only one,
we can hope that this will be a big improvement.

One of the key things to understand about optimizing code is that the
programming language you use can have a big influence on the
results.
Perhaps the greatest distinction is whether your language is compiled
or not.
Java and C++ are normally compiled, while JavaScript, Processing, and
Python are normally interpreted.
This can make a huge difference in whether a given code change will
actually speed the program up or not.

In the case of the "shift" vs "swap" choice, shifting always turns out
to be a big improvement (more so in the interpreted JavaScript and
Python than in compiled Java and Processing, but still an improvement
even there).

Line 4 of the table shows how some languages have peculiarities that
it pays to be aware of.
It turns out that there is a big difference in JavaScript between
using ``i < n`` or ``i <= n`` to test termination for a loop.

Next, let us consider a possible improvement that is often suggested
for Bubble Sort.
That is to check in a given pass to see if any swaps took place, and
quit if we ever have an iteration that does not swap (since we know
the list is ordered at this point).
We can improve it even more so by recognizing that if the last swap
done affects the values at positions :math:`i` and :math:`i+1`, no
swaps could happen to values a positions greater than :math:`i`.
Thus, we never need to check higher-positioned values again, which
could save many iterations. Here is code to implement this approach.

.. codeinclude:: Sorting/Bubblesort.pde 
   :tag: BubblesortCheck        

The problem with this idea is that, in order to cut down on the number
of comparisons, it is necessary to track the position of the last swap.
This tracking has a cost, and it is worthwhile only if the amount of
work it saves is greater than the amout of work that it causes.

Unfortunately, as the table shows, in the average case it just is not
worth the time. Modifying the code simply to remove this swap tracking
is faster in the average case.
It is true that this modification can substantially improve the best
case cost. But that happens so rarely that it is not worth it in the
long run, in any of the programming languages shown in the table.
The list needs to be very close to sorted for this testing to pay off.
In fact, if we took a sorted list and put the smallest value at the
end, then there would be no benefit from this "optimization"
whatsoever.
Perhaps the more important thing to see from this table is that no
amount of optimization can make Bubble Sort competative with Insertion
Sort.

There is the point to consider that this modification technically
makes the best case cost of Bubble Sort to be only :math:`\Theta(n)`.
That dubious value is overshadowed by the additional cost to nearly
all other inputs.
Note that in fact we can nominally convert *any* sorting algorithm to
have a best-case cost of :math:`\Theta(n)` by simply adding code at
the beginning that checks if the list is already sorted!
It should be obvious that this is a waste of time, even though it has
the possibility of winning big.

Finally, let's consider Selection Sort.
The table shows foremost that Selection Sort can be viewed as a far
better optimization to Bubble Sort than tracking swaps.
The other thing to note is that the way our Selection Sort code is
written, a call to ``swap`` will be made even if the current
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
Actually, we can't expect this to ever make much difference since we
are talking about :math:`\Theta(n)` actions within :math:`\Theta(n^2)`
total steps, an inconsequential fraction.
Even so, whether this is really a good idea depends on how often the
unnecessary swap takes place.
For randomly ordered input, it is probably  more expensive to test
this condition before every swap than to just do the swap.
So this would be an example of an "optimization" that does not improve
performance.
But if the input records are already sorted, then all of the swaps are
unnecessary and it would have been (trivially) faster to test.

.. math::

   \begin{array}{l|rrrr}
   \hline
   \textbf{Sort} & \textbf{Java}& \textbf{JavaScript} & \textbf{Processing}&
   \textbf{Python}\\
   \hline
   \textbf{Insertion Sort}\\
   \textbf{Basic}       &  28 & 109 &  32 &  96\\
   \textbf{No swap}     &  24 & 107 &  27 &  77\\
   \textbf{Shift <}   &  17 &  78 &  19 &  46\\
   \textbf{Shift !=}  &  17 &  92 &  19 &  47\\
   \hline
   \textbf{Bubble Sort}\\
   \textbf{Check Swaps} & 181 & 283 & 154 & 103\\
   \textbf{No Checks}   & 180 & 262 & 146 & 101\\
   \hline
   \textbf{Selection Sort}\\
   \textbf{Basic}       & 106 & 117 &  53 &  37\\
   \textbf{Check Swaps} &  91 & 115 &  52 &  37\\
   \hline
   \end{array}
