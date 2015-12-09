.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: comparison; insertion sort
   :satisfies: shellsort
   :topic: Sorting

.. index:: ! Shellsort
.. index:: Insertion Sort, Selection Sort

Shellsort
=========

Shellsort
---------

Shellsort was named for its inventor, D.L. Shell, who first published
it in 1959.
It is also sometimes called the :term:`diminishing increment sort`.
When properly implemented, :term:`Shellsort` will give
substantially better performance than any of the :math:`\theta(n^2)`
sorts like Insertion Sort or Selection Sort.
But it is also a bit more complicated than those simple
:math:`\theta(n^2)` sorts.
Unlike Insertion Sort and Selection Sort, there is no real-life
intuition to inspire Shellsort -- nobody will use Shellsort to
sort their Bridge hand or organize their bills.
The key idea behind Shellsort is to exploit the best-case performance
of Insertion Sort.
Recall that when a list is sorted or nearly sorted, Insertion Sort
runs in linear time.
So Shellsort's strategy is to quickly make the list "mostly sorted",
so that a final Insertion Sort can finish the job.

Shellsort does what most good sorts do:
Break the input into pieces, sort the pieces, then recombine them.
But Shellsort does this in an unusual way, breaking its input
into "virtual" sublists that are often not contiguous.
Each such sublist is sorted using an Insertion Sort.
Another group of sublists is then chosen and sorted, and so on.

Shellsort works by performing its Insertion Sorts on carefully
selected sublists, first on small sublists and then on increasingly
large sublists.
So at each stage, any Insertion Sort is either working on a small list
(and so is fast) or is working on a nearly sorted list (and again is
fast).

.. index:: ! Shellsort; increment

Shellsort breaks the list into disjoint sublists, where a sublist
is defined by an "increment", :math:`I`.
Each record in a given sublist is :math:`I` positions apart.
For example, if the increment were 4, then each record in the sublist
would be 4 positions apart.

One possible implementation for Shellsort is to use increments that
are all powers of two.
We start by picking as :math:`I` the largest power of two less than
:math:`n`.
This will generate :math:`I` sublists of 2 records each.
If there were 16 records in the array indexed from 0
to 15, there would initially be 8 sublists of 2 records each,
with each record in the sublist being 8 positions apart.
The first sublist would be the records in positions 0 and 8.
The second is in positions 1 and 9, and so on.

Actually, the increment size does not need to start at exactly
:math:`n/2`.
In the following example, we will use an array of 12 records
(since 16 records makes the example a bit long).
We will still begin with an increment size of 8.
As you click through the following slideshow, you will see each of the
sublists of length 2.
If we reach a point where the remaining sublists have only one
record (as will be the case for each of the sublists beginning with
records 4 through 7), then we can skip processing them.

.. inlineav:: shellsortCON1 ss
   :output: show

Shellsort will sort each of these sublists of length 2 using Insertion
Sort.
As you click through the next slideshow, you will first see the current
sublist highlighted in yellow.
Then a pair of records to be compared will be shown in blue.
They are swapped if necessary to put them in sort order.
(Of course, since these first sublists are each of length 2 when
the two items are being compared you won't see anything yellow anymore!)

.. inlineav:: shellsortCON2 ss
   :output: show

At the end of the first pass, the resulting array is "a little better
sorted".

.. inlineav:: shellsortCON3 dgm

The second pass of Shellsort looks at fewer, bigger sublists.
In our example, the second pass will have an increment of size 4,
resulting in :math:`n/4` sublists.
Since the array in our example has :math:`n=12` records, we have
4 sublists that each have :math:`12/4 = 3` records.
Thus, the second pass would have as its first
sublist the 3 records in positions 0, 4, and 8.
The second sublist would have records in positions 1, 5, and 9,
and so on.

As you click through the slides, you will see the sublists for
increment size 4.

.. inlineav:: shellsortCON4 ss
   :output: show

Each sublist of 3 records would also be sorted using an Insertion
Sort, as shown next.

.. inlineav:: shellsortCON5 ss
   :output: show

At the end of processing sublists with increment 4, the array is
"even more sorted".

.. inlineav:: shellsortCON6 dgm

The third pass will be made on sublists with increment 2.
The effect is that we process 2 lists, one consisting of the odd
positions and the other consisting of the even positions.
As usual, we sort the sublists using Insertion Sort.

.. inlineav:: shellsortCON7 ss
   :output: show

At this point, we are getting close to sorted.

.. inlineav:: shellsortCON8 dgm

Shellsort's final pass will always use an increment of 1,
which means a "regular" Insertion Sort of all records.
But the list is far closer to sorted than it was at the start,
so this final call to Insertion Sort runs far faster than if we had
run Insertion Sort on the original array.

.. inlineav:: shellsortCON9 ss
   :output: show

Finally, the array is sorted.

Here is a code implementation for Shellsort.

.. codeinclude:: Sorting/Shellsort
   :tag: Shellsort

Now, test your understanding of the sublist concept.

.. avembed:: Exercises/Sorting/ShellsortSublistSumm.html ka


Putting It Together
-------------------

There is a lot of flexibility to picking the increment series.
It does not need to start with the greatest power of less than
:math:`n` and cut in half each time.
In fact that is not even a good choice for the increment series.
We will come back to this later.
For now, just realize that so long as each increment is smaller than the
last, and the last increment is 1, Shellsort will work.

At this point try running Shellsort on an array of your chosen size,
with either random values or values that you select.
You can also set the increment series.
Use this visualization to make sure that you understand how Shellsort
works.

.. avembed:: AV/Sorting/shellsortAV.html ss

Next, let's review what makes for a legal increment series.

.. avembed:: Exercises/Sorting/ShellsortSeries.html ka


Shellsort Practice Exercise
---------------------------

Now test yourself to see how well you understand Shellsort.
Can you reproduce its behavior?

.. avembed:: AV/Sorting/shellsortPRO.html pe


Optimizing Shellsort
--------------------

Some choices for the series of increments will make Shellsort
run more efficiently than others.
In particular, the choice of increments described above
:math:`(2^k, 2^{k-1}, \ldots, 4, 2, 1)` turns out to be relatively inefficient.
You should notice for example that all records in a given 8 increment
sublist are also part of some 4 increment sublist, which are all in turn
records of the same 2 increment sublist.
So there is no "crossover" between sublists as the increments
reduce.
A better choice is the following series based on ":math:`3n+1`":
(..., 121, 40, 13, 4, 1).
Another approach is to make sure that the various increments are
relatively prime.
The series (..., 11, 7, 3, 1) would be an example.
In this case, there is a lot of "crossover" between the lists at the
various increment sizes.

Now you are ready to try out some different increment series to see
how they affect the cost of Shellsort.

.. avembed:: AV/Sorting/shellsortPerf.html pe

A theoretical analysis of Shellsort is difficult, so we must accept
without proof that the average-case performance of Shellsort
(for a reasonable increment series)
is :math:`\Theta(n\sqrt{n}) = \Theta(n^{1.5})`.
Thus, Shellsort is substantially better than Insertion Sort,
or any of the other :math:`\theta(n^2)` sorts presented earlier.
In fact, Shellsort is not so much worse than the
asymptotically better sorts to be presented later,
whenever :math:`n` is of medium size (though it tends to be a little
slower than these other algorithms if they are well implemented).
Shellsort illustrates how we can sometimes exploit the special properties
of an algorithm (in this case Insertion Sort) even if in general that
algorithm is unacceptably slow.


Shellsort Summary Questions
---------------------------

Here are some review questions to check that you understand Shellsort.

.. avembed:: Exercises/Sorting/ShellsortSumm.html ka

If you want to know more about Shellsort, you can find a lot of
details about its analysis along with ideas on how to pick a good
increment series in [KnuthV3]_.

.. odsascript:: AV/Sorting/shellsortCODE.js
.. odsascript:: AV/Sorting/shellsortCON1.js
.. odsascript:: AV/Sorting/shellsortCON2.js
.. odsascript:: AV/Sorting/shellsortCON3.js
.. odsascript:: AV/Sorting/shellsortCON4.js
.. odsascript:: AV/Sorting/shellsortCON5.js
.. odsascript:: AV/Sorting/shellsortCON6.js
.. odsascript:: AV/Sorting/shellsortCON7.js
.. odsascript:: AV/Sorting/shellsortCON8.js
.. odsascript:: AV/Sorting/shellsortCON9.js
