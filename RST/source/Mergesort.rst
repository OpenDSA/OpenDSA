.. _Mergesort:

.. raw:: html

   <link href="_static/opendsaMOD.css" rel="stylesheet" type="text/css" />
   <link href="http://algoviz.org/OpenDSA/JSAV/css/JSAV.css" rel="stylesheet" type="text/css" />
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
   <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
   <script src="http://algoviz.org/OpenDSA/JSAV/lib/jquery.transform.light.js"></script>
   <script src="http://algoviz.org/OpenDSA/JSAV/lib/raphael.js"></script>
   <script src="http://algoviz.org/OpenDSA/JSAV/build/JSAV-min.js"></script>
   <script type="text/javascript" src="_static/ODSA.js"></script>

.. index:: ! Mergesort

Mergesort Concepts
==================

A natural approach to problem solving is divide and conquer.
In terms of sorting, we might consider breaking the list to be sorted
into pieces, process the pieces, and then put them back together
somehow.
A simple way to do this would be to split the list in half, sort
the halves, and then merge the sorted halves together.
This is the idea behind Mergesort.

Mergesort is one of the simplest sorting algorithms conceptually,
and has good performance both in the asymptotic 
sense and in empirical running time.
Surprisingly, even though it is based on a simple concept,
it is relatively difficult to implement in practice.
Here is a pseudocode sketch of Mergesort::

    List mergesort(List inlist) {
      if (inlist.length() <= 1) return inlist;;
      List L1 = half of the items from inlist;
      List L2 = other half of the items from inlist;
      return merge(mergesort(L1), mergesort(L2));
    }

The following figure illustrates Mergesort.
The first row shows eight numbers that are to be sorted.
Mergesort will recursively subdivide the list into
sublists of one element each, then recombine the sublists.
The second row shows the four sublists of size 2 created by the
first merging pass.
The third row shows the two sublists of size 4 created by the next
merging pass on the sublists of row 2.
The last row shows the final sorted list created by merging the two
sublists of row 3.

.. image:: Images/MrgSort.png
   :width: 400
   :alt: Mergesort

The hardest step to understand about Mergesort is the merge function.
The merge function starts by examining the first element of each
sublist and picks the smaller value as the smallest element overall.
This smaller value is removed from its sublist and placed into the
output list.
Merging continues in this way, comparing the front
elements of the sublists and continually appending the smaller to the
output list until no more input elements remain.

Here is a visualization that illustrates how Mergesort works.

.. raw:: html

   <center>
     <iframe src="http://algoviz.org/OpenDSA/dev/OpenDSA/AV/mergesort-av.html"
       type="text/javascript" width="823" height="587"
       frameborder="0" marginwidth="0" marginheight="0"
        scrolling="no">
     </iframe>
   </center>

Proficiency Exercise:

.. raw:: html

   <center>
     <iframe src="http://algoviz.org/OpenDSA/dev/OpenDSA/AV/mergesort-proficiency.html"
       type="text/javascript" width="806" height="680"
       frameborder="0" marginwidth="0" marginheight="0"
        scrolling="no">
     </iframe>
   </center>

Analysis of Mergesort is straightforward, despite the fact that it is
a recursive
The merging part takes time :math:`\Theta(i)` where :math:`i`
is the total length of the two subarrays being merged.
The array to be sorted is repeatedly split in half until subarrays of
size 1 are reached, at which time they are merged to be of size 2,
these merged to subarrays of size 4, and so on as shown in
Figure <ODSAref "MergeFig" />.
Thus, the depth of the recursion is :math:`\log n` for :math:`n`
elements (assume for simplicity that :math:`n` is a power of two).
The first level of recursion can be thought of as working on one array
of size :math:`n`, the next level working on two arrays of size
:math:`n/2`, the next on four arrays of size :math:`n/4`, and so on.
The bottom of the recursion has <i>n</i> arrays of size 1.
Thus, :math:`n` arrays of size 1 are merged (requiring
:math:`\Theta(n)` total steps), :math:`n/2` arrays of size 2
(again requiring :math:`\Theta(n)` total steps), :math:`n/4` arrays of
size 4, and so on.
At each of the :math:`\log n` levels of recursion, :math:`\Theta(n)`
work is done, for a total cost of :math:\Theta(n \log n)`.
This cost is unaffected by the relative order of the
values being sorted, thus this analysis holds for the best, average,
and worst cases.
