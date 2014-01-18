.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: sorting terminology; comparison
   :satisfies: insertion sort
   :topic: Sorting

.. index:: ! Insertion Sort

Insertion Sort
==============

What would you do if you have a stack of phone bills from the past
two years and you want to order by date?
A fairly natural way to handle this is to look at the first two
bills and put them in order.
Then take the third bill and put it into the right position with
respect to the first two, and so on.
As you take each bill, you would add it to the sorted pile that you
have already made.
This simple approach is the inspiration for
our first sorting algorithm, called :term:`Insertion Sort`.

Insertion Sort iterates through a list of records.
For each iteration, the current record is inserted in turn at the
correct position within a sorted list composed of those records
already processed.
Here is an implementation.
The input is an array named ``A`` that stores :math:`n` records.

.. codeinclude:: Sorting/Insertionsort.pde
   :tag: Insertionsort

(Note that to make the explanation for these sorting algorithms as
simple as possible, we will usually assume that our input is an
integer array rather than an array of more complex records.
But you should realize that in practice, there is not usually much
use to sorting an array of simple integers.
Nearly always we want to sort more complex records that each have an
integer :term:`key` value.
Module :numref:`<Comparison>` discusses ways to associate a key value
with a record.)

Here is the start to the Insertion Sort process.

.. inlineav:: InssortCON1 ss
   :output: show

Next, process the record in position 2.
Swap it to the left until it reaches a value smaller than it is.

.. inlineav:: InssortCON2 ss
   :output: show

And now the record in position 3.

.. inlineav:: InssortCON3 ss
   :output: show

This continues on with each record in turn.
Call the current record :math:`x`.
Insertion Sort will move it to the left so
long as its value is less than that of the record immediately
preceding it.
As soon as a key value less than or equal to :math:`x` is
encountered, ``inssort`` is done with that record because all
records to its left in the array must have smaller keys.
The following visualization puts it all together.

.. avembed:: AV/Sorting/insertionsortAV.html ss

Now try for yourself to see if you understand how Insertion Sort works.

.. avembed:: Exercises/Sorting/InssortPRO.html ka

Insertion Sort Analysis
-----------------------

The body of ``inssort`` consists of two nested
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
   \sum_{i=1}^{n-1} i = \frac{n(n-1)}{2} \approx n^2/2 = \Theta(n^2).

In contrast, consider the best-case cost.
This occurs when the values occur in sorted order from lowest to
highest.
In this case, every test on the inner ``for`` loop will
fail immediately, and no records will be moved.
The total number of comparisons will be :math:`n-1`, which is the
number of times the outer ``for`` loop executes.
Thus, the cost for Insertion Sort in the best case is
:math:`\Theta(n)`.

.. index:: ! inversion

What is the average-case cost of Insertion Sort?
When record :math:`i` is processed, the number
of times through the inner ``for`` loop depends on how far
"out of order" the record is.
In particular, the inner ``for`` loop is executed once for
each value greater than the value of record :math:`i` that appears in
array positions 0 through :math:`i-1`.
For example, in the slideshows above the value 14 is initially
preceded by five values greater than it.
Each such occurrence is called an :term:`inversion`.
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
its growth rate.

While the best case is significantly faster than the average and worst
cases, the average and worst cases are usually more reliable
indicators of the "typical" running time.
However, there are situations where we can expect the input to be in
sorted or nearly sorted order.
One example is when an already sorted list is slightly disordered by a
small number of additions to the list;
restoring sorted order using Insertion Sort might be a good idea if we
know that the disordering is slight.
And even when the input is not perfectly sorted, Insertion Sort's cost
goes up in proportion to the number of inversions.
So a "nearly sorted" list will always be cheap to sort with Insertion
Sort.
Examples of algorithms that take advantage of Insertion Sort's
near-best-case running time are Shellsort
(Module :numref:`<Shellsort>`)
and Quicksort (Module :numref:`<Quicksort>`).

Counting comparisons or swaps yields similar results.
Each time through the inner ``for`` loop yields both a
comparison and a swap, except the last (i.e., the comparison that
fails the inner ``for`` loop's test), which has no swap.
Thus, the number of swaps for the entire sort operation is
:math:`n-1` less than the number of comparisons.
This is 0 in the best case, and :math:`\Theta(n^2)` in the
average and worst cases.

Later we will see algorithms whose growth rate is much
better than :math:`\Theta(n^2)`.
Thus for larger arrays, Insertion Sort will not be so good a
performer as other algorithms.
So Insertion Sort is not the best sorting algorithm to use in most
situations.
But there are special situations where it is ideal.
We already know that Insertion Sort works great when the input is
sorted or nearly so.
Another good time to use Insertion Sort is when the array is very
small, since Insertion Sort is so simple.
The algorithms that have better asymptotic growth rates tend to be
more complicated, which leads to larger constant factors in their
running time.
That means they typically need fewer comparisons for larger arrays,
but they cost more per comparison.
This observation might not seem that helpful, since even an algorithm
with high cost per comparison will be fast on small input sizes.
But there are times when we might need to do many, many sorts on very
small arrays.
You should spend some time right now trying to think of a situation
where you will need to sort many small arrays.
Actually, it happens a lot.

Here are some review questions to check your understanding of
Insertion Sort.

.. avembed:: Exercises/Sorting/InssortSumm.html ka

Notes
-----

See
`Computational Fairy Tales: Why Tailors Use Insertion Sort
<http://computationaltales.blogspot.com/2011/04/why-tailors-use-insertion-sort.html>`_
for a discussion on how the relative costs of search and insert can
affect what is the best sort algorithm to use.

.. odsascript:: AV/Sorting/insertionsortCON.js
