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
Of course all quadratics sorts (Insertion Sort, Bubble Sort and
Selection Sort) are relatively slow each (as the name "quadratic
suggests) has :math:`\Theta(n^2)` worst case running time.
The best way to speed them up is to find a better sorting algorithm.
Nonetheless, there have been many suggestions given over the years
about how to speed up one or another of them.
There are useful lessons to be learned about code tuning by
seeing which of these actually turn out to give better performance.

We start with an optimization that really does give good results.
Recall that Insertion Sort repeatedly moves an element toward the
beginning of the sorted part of the list until it encounters a key
with lesser value.
In the original code, this is done with a series of swap operations.
In some languages, simple way to speed things up is to replace a
function call with the code that the function would perform.
Table :num:`#OptimizeTable` shows the relative costs for
this and other optimizations in four programming languages: Java,
JavaScipt, Processing, and Python.
Only Python had a noticeable effect from replacing the swap function
call with inline code.

.. _OptimizeTable:

.. odsafig:: Images/PtrSwap.png
   :width: 1
   :align: center
   :capalign: center
   :figwidth: 90%

   Empirical comparison of proposed optimizations to quadratic sort
   implementations.

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

.. TODO::
   :type: Update

   Rerun timings as a summation of 10 runs, to get averages. Also, run
   Python on 10,000 records to get comparable figures.

There is a better alternative than continuously swapping the
record to the left until a smaller value is found.
This is to move the current record to a temporary
variable, and then shift all of the records with greater value one
step to the right.
Since swap requires three assignments per element and shifting
requires only one assignment per element, 
we can hope that this will yield a big improvement.
Of course, the amount of improvement that we actually get will depend
on how much movement there is among the records.
If the list is already nearly sorted, then there will be few swaps
anyway.

A key thing to consider when tuning code is that the
programming language you use can have a big influence on the
results.
Perhaps the greatest distinction is whether your language is compiled
or not.
Java, C++, and Processing are normally compiled, while JavaScript and
Python are normally interpreted.
This can make a huge difference in whether a given code change will
actually speed the program up or not.
In the case of the "shift" vs "swap" choice, shifting always turns out
to be a big improvement (more so in the interpreted JavaScript and
Python than in compiled Java and Processing, but still an improvement
even there).

Lines 3 and 4 of the table illustrate how some languages have
peculiarities that it pays to be aware of.
It turns out that there is a big difference in JavaScript between
using ``i < n`` or ``i != n`` to test termination of a loop.

Next, we will look at a possible improvement that is often suggested
for Bubble Sort.
That is to check during each iteration of the outer loop to see if any
swaps took place, and quit if we ever have an iteration that does not
swap (since we know the list is ordered at this point).
We can improve on this idea even more by recognizing that if the last
swap done affects the values at positions :math:`i` and :math:`i+1`,
no swaps could happen to values a positions greater than :math:`i`.
Thus, we never need to check higher-positioned values again, which
could save many iterations. Here is code to implement this approach.

.. codeinclude:: Sorting/Bubblesort.pde 
   :tag: BubblesortCheck        

The problem with this idea is that a considerable amount of effort
(relatively speaking) is required to track the position for the last
swap within the inner loop.
This tracking process has a cost, and that cost is worthwhile only if
the amount of work it saves is greater than the amout of work that it
causes.
Unfortunately, as the table shows, in the average case it just is not
worth the time. Modifying the code simply by removing the tracking
steps (and so not getting the benefit of avoiding some of the key
comparisons) is faster in the average case.
Of course, whether this is always true will depend on how much it
costs to extract the record keys and compare them, which depends on
the details of the record type and the sort implementation.
It is also true that tracking the last swap position can substantially
improve the best case cost.
But that substantial improvement happens so rarely that it is not
generally not worth it in the long run, in any of the four programming
languages, as indicated by the empirical results shown in the table.
A list needs to be very close to sorted for this "optimization" to
actually pay off.
In fact, if we took a sorted list and put the smallest value at the
end, then there would be no benefit from this "optimization"
whatsoever.
Perhaps the more important thing to see from this table is that no
amount of optimization can make Bubble Sort competative with Insertion
Sort, or even with Selection Sort.

Another point to consider is that tracking the last swap position
technically makes the best case cost of Bubble Sort to be only
:math:`\Theta(n)`.
Going out of one's way to artificially improve the best case has
dubious value if it is overshadowed by the additional cost imposed on
nearly all other inputs.
Note that we could nominally convert *any* sorting algorithm to
have a best-case cost of :math:`\Theta(n)` by simply adding code at
the beginning that checks if the list is already sorted!
It should be obvious that this is a waste of time, even though it has
the (small) possibility of winning big.

Finally, let's consider Selection Sort.
The table shows foremost that Selection Sort can be viewed as a far
better optimization to Bubble Sort than tracking the last swap
position.
That is, tracking the position of the largest element and performing
one swap to put it into place is a far better optimization to Bubble
Sort than tracking the position of the last swap seen.

The other thing to note is that the way our original Selection Sort
code is written, a call to ``swap`` will be made even if the current
record is already in its correct location.
For example, if the record with the largest value is already in the
rightmost array position, ``selsort`` will still call ``swap`` with
both position parameters being the same.
The net effect is that the work done by ``swap`` will not change
anything in the array, and this is a waste of time.
Thus, the total number of swaps done by Selection Sort is always
:math:`n-1` in the best, average and worst cases.
It might seem like a good idea to test if the positions are the same
before calling ``swap``, especially since Selection Sort's claim to
fame is its low number of swaps.
Actually, we can't expect this to ever make much difference since we
are talking about :math:`\Theta(n)` actions within :math:`\Theta(n^2)`
total steps, an inconsequential fraction.
The other consideration is whether this is could typically be expected
to save time at all.
Doing the check to see if a swap is necessary takes some time.
It is only worthwhile if the time required by the test is more than
made up for by the work saved when the unnecessary swap was avoided.
For randomly ordered input, it is probably  more expensive to test
this condition before every swap than to just do the swap.
If the input records are already sorted, then all of the swaps are
unnecessary and it would be (trivially) faster to test.
But in the average case, few swaps will be saved this way and the
"optimization" might actually slow down the program (but only
slightly).
