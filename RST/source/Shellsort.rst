.. avmetadata:: Shellsort
   :author: Cliff Shaffer
   :prerequisites: Sorting, InsertionSort
   :topic: Sorting
   :short_name: Shellsort

.. _Shellsort:

.. include:: JSAVheader.rinc

.. odsalink:: AV/shellsortCON.css

.. index:: ! Shellsort
.. index:: Insertion Sort, Selection Sort
                                          
Shellsort
=========

When properly implemented, Shellsort will give
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
Break the list into sublists, sort the sublists, then recombine them.
But Shellsort does this in an unusual way, breaking its input
into "virtual" sublists of elements that are often not contiguous.
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
Each element in a given sublist is :math:`I` positions apart.
For example, if the increment were 4, then each element in the sublist
would be 4 positions apart.

One possible implementation of Shellsort is to use increments that are
all powers of two.
We start by picking the largest power of two that will break the
list into :math:`n/2` sublists of 2 elements each.
If there were 16 elements in the array indexed from 0
to 15, there would initially be 8 sublists of 2 elements each, with
each element in the sublist being 8 positions apart.
The first sublist would be the elements in positions 0 and 8.
The second is in positions 1 and 9, and so on.

Actually, the increment size does not need to start at exactly
:math`n/2`.
In the following example, we will use an array of 12 elements (since
16 elements makes the example a bit long).
We will still begin with an increment size of 8.
As you click through the following slideshow, you will see each of the
sublists of length 2.
If we reach a point where the remaining sublists have only one
element (as will be the case for each of the sublists beginning with
elements 4 through 7), then we can skip processing them.

.. raw:: html

   <div id="container1">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
     <div class="jsavcontrols"></div>
   </div>

In the actual Shellsort, each of these sublists of length 2 gets
sorted using Insertion Sort.
As you click through the next slideshow, you will first see the current
sublist highlighted in yellow.
Then a pair of elements to be compared will be shown in blue.
They are swapped if necessary to put them in sort order.
(Of course, since these first sublists are each of length 2 when
the two items are being compared you won't see anything yellow anymore!)

.. raw:: html

   <div id="container2">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
     <div class="jsavcontrols"></div>
   </div>

At the end of the first pass, the resulting array is "a little better
sorted".

.. raw:: html

   <div id="container3">
   </div>

The second pass of Shellsort looks at fewer, bigger sublists.
In our example, the second pass will have an increment of size 4,
resulting in :math:`n/4` sublists 
Since the array in our example has :math:`n=12` elements, we have 
4 sublists that each have :math:`12/4 = 3` elements.
Thus, the second pass would have as its first
sublist the 3 elements in positions 0, 4, and 8.
The second sublist would have elements in positions 1, 5, and 9,
and so on.

As you click through the slides, you will see the sublists for
increment size 4.

.. raw:: html

   <div id="container4">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
   	<div class="jsavcontrols"></div>
   </div>

Each sublist of 3 elements would also be sorted using an Insertion
Sort, as shown next.

.. raw:: html

   <div id="container5">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
  	<div class="jsavcontrols"></div>
   </div>

At the end of processing sublists with increment 4, the array is
"even more sorted".

.. raw:: html

   <div id="container6">
   </div>

The third pass will be made on sublists with increment 2.
The effect is that we process 2 lists, one consisting of the odd
positions and the other consisting of the even positions.
As usual, we sort the sublists using Insertion Sort.

.. raw:: html

   <div id="container7">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
	<div class="jsavcontrols"></div>
   </div>

At this point, we are getting close to sorted.

.. raw:: html

   <div id="container8">
   </div>

Shellsort's final pass will always use an increment of 1,
which means a "regular" Insertion Sort of all elements.

.. raw:: html

   <div id="container9">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
	<div class="jsavcontrols"></div>
   </div>

Finally, the array is sorted.

Here is a code implementation for Shellsort.

.. literalinclude:: ../../SourceCode/Processing/Sorting/Shellsort/Shellsort.pde
   :start-after: /* *** ODSATag: Shellsort *** */
   :end-before: /* *** ODSAendTag: Shellsort *** */

.. avembed:: Exercises/ShellSortSublist.html
   :showbutton: hide
   :title: Question 1

There is a lot of flexibility to picking the increment series.
It does not need to start with :math:`n/2` and cut in half each time.
In fact that is not even a good choice for the increment series.
We will come back to this later.
For now, just realize that so long as each increment is smaller than the
last, and the last increment is 1, Shellsort will work.

At this point try running Shellsort on an array of your chosen size,
with either random values or values that you select.
You can also set the increment series.
Use this visualization to make sure that you understand how Shellsort
works.

.. avembed:: AV/shellsort-av.html

Next, let's review what makes for a legal increment series.

.. avembed:: Exercises/ShellsortSeries.html
   :showbutton: hide
   :title: Question 2

Now test yourself to see how well you understand Shellsort.
Can you reproduce its behavior?

.. avembed:: AV/ShellsortProficiency.html
   :showbutton: show
   :title: Proficiency Exercise

Some choices for the series of increments will make Shellsort
run more efficiently than others.
In particular, the choice of increments described above
:math:`(2^k, 2^{k-1}, \ldots, 4, 2, 1)` turns out to be relatively inefficient.
You should notice for example that all elements in a given 8 increment
sublist are also part of some 4 increment sublist, which are all in turn
elements of the same 2 increment sublist.
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

.. avembed:: AV/ShellsortPerformance.html
   :showbutton: hide
   :title: Performance Simulator

A theoretical analysis of Shellsort is difficult, so we must accept
without proof that the average-case performance of Shellsort
(for a reasonable increment series)
is :math:`\Theta(n\sqrt{n}) = \Theta(n^{1.5})`.
Thus, Shellsort is substantially better than Insertion Sort,
or any of the other :math:`\theta(n^2)` sorts presented earlier.
In fact, Shellsort is not so much worse than the
asymptotically better sorts to be presented later,
whenever :math:`n` is of medium size (thought is tends to be a little
slower than these other algorithms if they are well implemented).
Shellsort illustrates how we can sometimes exploit the special properties
of an algorithm (in this case Insertion Sort) even if in general that
algorithm is unacceptably slow.

Here are some questions review questions to check that you understand
Shellsort.

.. avembed:: Exercises/ShellsortMC.html
   :showbutton: hide
   :title: Question 3

Notes
-----

Shellsort was named for its inventor, D.L. Shell, who first published
it in 1959.

It is also sometimes called the :dfn:`diminishing increment sort`.

If you want to know more about Shellsort, you can find a lot of
details about its analysis along with ideas on how to pick a good
increment series in [KnuthV3]_.

.. odsascript:: AV/shellsortCON.js
