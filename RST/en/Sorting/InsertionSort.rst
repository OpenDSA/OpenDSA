.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: sorting terminology; comparison
   :satisfies: insertion sort
   :topic: Sorting

.. index:: ! Insertion Sort

.. odsalink:: AV/Sorting/InsertionSortWorstCaseCON.css
.. odsalink:: AV/Sorting/InsertionSortBestCaseCON.css
.. odsalink:: AV/Sorting/InsertionSortAverageCaseCON.css

Insertion Sort
==============

Insertion Sort
--------------

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

.. _introduction:

.. codeinclude:: Sorting/Insertionsort
   :tag: Insertionsort

.. _practice:

(Note that to make the explanation for these sorting algorithms as
simple as possible, our visualizations will show the array as though
it stored simple integers rather than more complex records.
But you should realize that in practice, there is rarely any point
to sorting an array of simple integers.
Nearly always we want to sort more complex records that each have a
:term:`key` value.
In such cases we must :ref:`have a way <comparable> <Comparison>` to
associate a key value with a record.
The sorting algorithms will simply assume that the records are
:term:`comparable`.)

Here we see the first few iterations of Insertion Sort.

.. inlineav:: insertionsortCON ss
   :output: show

This continues on with each record in turn.
Call the current record :math:`x`.
Insertion Sort will move it to the left so
long as its value is less than that of the record immediately
preceding it.
As soon as a key value less than or equal to :math:`x` is
encountered, ``inssort`` is done with that record because all
records to its left in the array must have smaller keys.

.. avembed:: AV/Sorting/insertionsortAV.html ss


.. avembed:: Exercises/Sorting/InssortPRO.html ka


Insertion Sort Analysis
-----------------------

.. inlineav:: InsertionSortWorstCaseCON ss
   :output: show

|

.. inlineav:: InsertionSortBestCaseCON ss
   :output: show

|

.. inlineav:: InsertionSortAverageCaseCON ss
   :output: show

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
near-best-case running time are
:ref:`Shellsort <Shellsort> <Shellsort>`
and :ref:`Quicksort <Quicksort> <Quicksort>`.

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

.. avembed:: Exercises/Sorting/InssortSumm.html ka

See |external_link| for a discussion on how the relative costs of search and insert can
affect what is the best sort algorithm to use.

.. |external_link| raw:: html

   <a href="http://computationaltales.blogspot.com/2011/04/why-tailors-use-insertion-sort.html" target="_blank">Computational Fairy Tales: Why Tailors Use Insertion Sort</a>

.. `Computational Fairy Tales: Why Tailors Use Insertion Sort
.. <http://computationaltales.blogspot.com/2011/04/why-tailors-use-insertion-sort.html target = "_blank">`_

.. odsascript:: AV/Sorting/insertionsortCON.js
.. odsascript:: AV/Sorting/InsertionSortWorstCaseCON.js
.. odsascript:: AV/Sorting/InsertionSortBestCaseCON.js
.. odsascript:: AV/Sorting/InsertionSortAverageCaseCON.js