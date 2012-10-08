.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: Insertion Sort
   :author: Cliff Shaffer
   :prerequisites: Sorting
   :topic: Sorting
   :short_name: InsertionSort
   :exercises: InssortCON1, InssortCON2, InssortCON3, InssortPRO, InssortSumm

.. _InsertionSort:

.. index:: ! Insertion Sort

.. include:: JSAVheader.rinc

.. odsalink:: AV/Sorting/quadraticsortCON.css

Insertion Sort
==============

What if you have a stack of phone bills from the past two years
and you want to organize them by date?
A fairly natural way to do this might be to look at the first two
bills and put them in order.
Then take the third bill and put it into the right order with respect
to the first two, and so on.
As you take each bill, you would add it to the sorted pile that you
have already made.
This natural approach to sorting is the inspiration for
our first sorting algorithm, called :dfn:`Insertion Sort`.

Insertion Sort iterates through a list of records.
For each iteration, the current record is inserted in turn at the
correct position within a sorted list composed of those records
already processed.
Here is an implementation.
The input is an array of :math:`n` records stored in array ``A``.

.. codeinclude:: Sorting/Insertionsort/Insertionsort.pde 
   :tag: Insertionsort        

Consider the example of the following array.

.. inlineav:: InssortCON1 slideshow
   :output: show

Next, process the record in position 2.
Swap it to the left until it reaches a value smaller than it is.

.. inlineav:: InssortCON2 slideshow
   :output: show

And now the record in position 3.

.. inlineav:: InssortCON3 slideshow
   :output: show

This continues on with each record in turn.
Call the current record :math:`X`.
Insertion Sort will move it to the left so
long as its value is less than that of the record immediately
preceding it.
As soon as a key value less than or equal to :math:`X` is
encountered, ``inssort`` is done with that record because all
records to its left in the array must have smaller keys.
The following visualization puts it all together.

.. avembed:: AV/Sorting/insertionsortAV.html

Now try for yourself to see if you understand how Insertion Sort works.

.. avembed:: Exercises/Sorting/InssortPRO.html
   :showbutton: hide
   :title: Proficency Exercise

Insertion Sort Analysis
-----------------------

The body of ``inssort`` is made up of two nested
``for`` loops.
The outer ``for`` loop is executed :math:`n-1` times.
The inner ``for`` loop is harder to analyze because the
number of times it executes depends on how many records in positions
0 to :math:`i-1` have a value less than that of the record in
position :math:`i`.
In the worst case, each record must make its way to the start of the
array.
This would occur if the records are initially arranged from highest to
lowest, in the reverse of sorted order.
In this case, the number of comparisons will be one the first time
through the ``for`` loop, two the second time, and so on.
Thus, the total number of comparisons will be

.. math::
   \sum_{i=2}^n i \approx n^2/2 = \Theta(n^2)

In contrast, consider the best-case cost.
This occurs when the values occur in sorted order from lowest to
highest.
In this case, every test on the inner ``for`` loop will
fail immediately, and no records will be moved.
The total number of comparisons will be :math:`n-1`, which is the
number of times the outer ``for`` loop executes.
Thus, the cost for Insertion Sort in the best case is
:math:`\Theta(n)`.

While the best case is significantly faster than the worst case,
the worst case is usually a more reliable indication of the "typical"
running time.
However, there are situations where we can expect the input to be in
sorted or nearly sorted order.
One example is when an already sorted list is slightly disordered by a
small number of additions to the list;
restoring sorted order using Insertion Sort might be a good idea if we
know that the disordering is slight.
Examples of algorithms that take advantage of Insertion Sort's
near-best-case running time are Shellsort
(Module :ref:`ShellSort <Shellsort>`)
and Quicksort (Module :ref:`Quicksort <Quicksort>`).

.. index:: ! inversion

What is the average-case cost of Insertion Sort?
When record :math:`i` is processed, the number
of times through the inner ``for`` loop depends on how far
"out of order" the record is.
In particular, the inner ``for`` loop is executed once for
each value greater than the value of record :math:`i` that appears in
array positions 0 through :math:`i-1`.
For example, in the slideshows above the value 14 is initially
preceded by six values greater than it.
Each such occurrence is called an :dfn:`inversion`.
The number of inversions (i.e., the number of values greater than a
given value that occur prior to it in the array) will determine the
number of comparisons and swaps that must take place.
So long as all swaps are to adjacent records, 14 will have to swap at
least six times to get to the right position.

To calculate the average cost, we want to determine what the average
number of inversions will be for the record in position :math:`i`.
We expect on average that half of the records in the first
:math:`i-1` array positions will have a value greater than that of
the record at position :math:`i`.
Thus, the average case should be about half the cost of the worst
case, or around :math:`n^2/4`, which is still
:math:`\Theta(n^2)`.
So, the average case is no better than the worst case in
asymptotic complexity.

Counting comparisons or swaps yields similar results.
Each time through the inner ``for`` loop yields both a
comparison and a swap, except the last (i.e., the comparison that
fails the inner ``for`` loop's test), which has no swap.
Thus, the number of swaps for the entire sort operation is
:math:`n-1` less than the number of comparisons.
This is 0 in the best case, and :math:`\Theta(n^2)` in the
average and worst cases.

We will study algorithms whose asympotitic growth rate is much better
than :math:`\Theta(n^2)`.
This means for larger arrays, Insertion Sort will not be a good
performer.
However, it does have two situations in which it works well.
The first is when the array is already sorted (or nearly so) as we
have seen its best case cost is only :math:`\Theta(n)`.
The other comes when the array is very small, since Insertion Sort is
so simple.
The other algorithms that have better asympotic growth rates are a bit
more complicated, which leads to larger constant factors in their
running time (so typically fewer comparisons for larger arrays, but
more cost per comparison).
It might seem that neither of these special situations are all that
helpful.
But we will see later that there are times when we can count on an
array to be nearly sorted.
And we will see later that there are times when we might need to do
many, many sorts on very small arrays.
You should spend some time right now trying to think of a situation
where you will need to sort many small arrays.
Actually, it happens a lot.

Here are some review questions to check that you understand
Insertion Sort.

.. avembed:: Exercises/Sorting/InssortSumm.html
   :showbutton: hide
   :title: Review Questions

.. odsascript:: AV/Sorting/insertionsortCON.js
