.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: Selection Sort
   :author: Cliff Shaffer
   :prerequisites: Sorting, Bubble Sort
   :topic: Sorting
   :short_name: SelectionSort

.. _SelectionSort:

.. index:: ! Selection Sort

.. include:: JSAVheader.rinc

.. odsalink:: AV/Sorting/quadraticsortCON.css

Selection Sort
==============

Consider again the problem of sorting a pile of phone bills for the
past year.
Another intuitive approach might be to look through the pile until you
find the bill for January, and pull that out.
Then look through the remaining pile until you find the bill for
February, and add that behind January.
Proceed through the ever-shrinking pile of bills to select the next
one in order until you are done.
This is the inspiration for
our last :math:`\Theta(n^2)` sort,
called :dfn:`Selection Sort`.
The :math:`i`'th pass of Selection Sort "selects" the :math:`i`'th
largest key in the array, placing that record at the end of the array.
In other words, Selection Sort first finds the largest key in an
unsorted list, then the next largest, and so on.
Its unique feature is that there are few record swaps.
To find the next largest key value requires searching through
the entire unsorted portion of the array, but only one swap is
required to put the record in place.
Thus, the total number of swaps required will be :math:`n-1`
(we get the last record in place "for free").

Here is an implementation for Selection Sort.

.. codeinclude:: Sorting/Selectionsort/Selectionsort.pde 
   :tag: Selectionsort

Consider the example of the following array.

.. raw:: html

   <div id="SelsortCON1">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
     <div class="jsavcontrols"></div>
     <p class="jsavoutput jsavline" readonly="readonly"></p>
   </div>

Now we continue with the second pass. However, since the largest
element already at the very right, we will not need to look at
it again.

.. raw:: html

   <div id="SelsortCON2">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
     <div class="jsavcontrols"></div>
     <p class="jsavoutput jsavline" readonly="readonly"></p>
   </div>

Selection Sort continues in this way until the entire array is sorted.
The following visualization puts it all together.

.. avembed:: AV/Sorting/selectionsortAV.html

Now try for yourself to see if you understand how Selection Sort works.

.. avembed:: Exercises/Development/SelectionSortElement.html
   :showbutton: hide
   :title: Question 1

Any algorithm can be written in slightly different ways.
For example, we could have written Selection Sort to find the smallest
element, the next smallest, and so on.
We wrote this version of Selection Sort to mimic the behavior of our
Bubble Sort implementation as closely as possible.
This shows that Selection Sort is essentially a Bubble Sort
except that rather than repeatedly swapping adjacent values to get
the next largest record into place, we instead remember the position
of the element to be selected and do one swap at the end.
Thus, the number of comparisons is still
:math:`\Theta(n^2)`,
but the number of swaps is much less than that required by Bubble Sort.
Selection Sort is particularly advantageous when the cost to do a swap
is high, for example, when the elements are long strings or other
large records.
Selection Sort is more efficient than Bubble Sort (by a constant
factor) in most other situations as well.

.. figure:: Images/PtrSwap.png
   :width: 400
   :alt: Swapping pointers to records

   <ODSAfig "PtrSwap" />
   An example of swapping pointers to records.
   (a) A series of four records.
   The record with key value 42 comes before the record with key value 5.
   (b) The four records after the top two pointers have been swapped.
   Now the record with key value 5 comes before the record with key
   value 42.

There is another approach to keeping the cost of swapping records low
that can be used by any sorting algorithm even when the records are
large.
This is to have each element of the array store a pointer to a record
rather than store the record itself.
In this implementation, a swap operation need only exchange the
pointer values; the records themselves do not move.
This technique is illustrated by Figure <ODSAref "PtrSwap" \>.
Additional space is needed to store the pointers, but the
return is a faster swap operation.

.. avembed:: Exercises/Development/SelectionSortSumm.html
   :showbutton: hide
   :title: Review Questions

.. odsascript:: AV/Sorting/selectionsortCON.js
