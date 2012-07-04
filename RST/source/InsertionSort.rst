.. _InsertionSort:

.. index:: ! Insertion Sort

Insertion Sort
==============

What if you have a stack of phone bills from the past two years
and that you need to organize them by date?
A fairly natural way to do this might be to look at the first two
bills and put them in order.
Then take the third bill and put it into the right order with respect
to the first two, and so on.
As you take each bill, you would add it to the sorted pile that you
have already made.
This naturally intuitive process is the inspiration for
our first sorting algorithm, called ..dfn:`Insertion Sort`.

Insertion Sort iterates through a list of records.
For each iteration, the current record is inserted in turn at the
correct position within a sorted list composed of those records
already processed.
Here is an implementation.
The input is an array of :math:`n` records stored in array ``A``.

.. codeinclude:: Sorting/Insertionsort/Insertionsort.pde 
   :tag: Insertionsort        

Consider the case where ``inssort`` is processing the
:math:`i`'th
record, which has key value :math:`X`.
The record is moved upward in the array as long as
:math:`X` is less than the key value immediately above it.
As soon as a key value less than or equal to :math:`X` is
encountered, ``inssort`` is done with that record because all
records above it in the array must have smaller keys.
Figure <ODSAref "Insertion" \> illustrates how Insertion Sort
works.

.. figure:: Images/InsSort.png
   :width: 400
   :alt: Illustration of Insertion Sort

   <ODSAfig "Insertion" \>
   An illustration of Insertion Sort.
   Each column shows the array after the iteration with the indicated
   value of ``i`` in the outer ``for`` loop.
   Values above the line in each column have been sorted.
   Arrows indicate the upward motions of records through the array.

.. avembed:: AV/insertionsort-av.html

The body of ``inssort`` is made up of two nested
``for`` loops.
The outer ``for`` loop is executed :math:`n-1` times.
The inner ``for`` loop is harder to analyze because the
number of times it executes depends on how many keys in positions 1 to
:math:`i-1` have a value less than that of the key in position :math:`i`.
In the worst case, each record must make its way to the top of the
array.
This would occur if the keys are initially arranged from highest to
lowest, in the reverse of sorted order.
In this case, the number of comparisons will be one the first time
through the ``for`` loop, two the second time, and so on.
Thus, the total number of comparisons will be

.. math::
   \sum_{i=2}^n i \approx n^2/2 = \Theta(n^2)

In contrast, consider the best-case cost.
This occurs when the keys begin in sorted order from lowest to
highest.
In this case, every pass through the inner ``for`` loop will
fail immediately, and no values will be moved.
The total number of comparisons will be :math:`n-1`, which is the
number of times the outer <code>for</code> loop executes.
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
(Module <ODSAref "ShellSort" \>)
and Quicksort (Module <ODSAref "QuickSort" \>).

What is the average-case cost of Insertion Sort?
When record :math:`i` is processed, the number
of times through the inner ``for`` loop depends on how far
"out of order" the record is.
In particular, the inner ``for`` loop is executed once for
each key greater than the key of record :math:`i` that appears in
array positions 0 through :math`i-1`.
For example, in the leftmost column of Figure <ODSAref "Insertion" \>
the value 15 is preceded by five values greater than 15.
Each such occurrence is called an :dfn:`inversion`.
The number of inversions (i.e., the number of values greater than a
given value that occur prior to it in the array) will determine the
number of comparisons and swaps that must take place.
We need to determine what the average number of inversions will
be for the record in position :math:`i`.
We expect on average that half of the keys in the first
:math:`i-1` array positions will have a value greater than that of
the key at position :math:`i`.
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
