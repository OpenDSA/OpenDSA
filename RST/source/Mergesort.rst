.. raw:: html

   <link href="_static/opendsaMOD.css" rel="stylesheet" type="text/css" />
   <link href="http://algoviz.org/OpenDSA/JSAV/css/JSAV.css" rel="stylesheet" type="text/css" />
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
   <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
   <script src="http://algoviz.org/OpenDSA/JSAV/lib/jquery.transform.light.js"></script>
   <script src="http://algoviz.org/OpenDSA/JSAV/lib/raphael.js"></script>
   <script src="http://algoviz.org/OpenDSA/JSAV/build/JSAV-min.js"></script>
   <script type="text/javascript" src="_static/ODSA.js"></script>

Mergesort
=========

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

.. image:: http://algoviz.org/OpenDSA/build/Images/MrgSort.png
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
       type="text/javascript" width="823" height="672"
       frameborder="0" marginwidth="0" marginheight="0"
        scrolling="no">
     </iframe>
   </center>

Proficiency Exercise:

.. raw:: html

   <center>
     <iframe src="http://algoviz.org/OpenDSA/dev/OpenDSA/AV/mergesort-proficiency.html"
       type="text/javascript" width="823" height="802"
       frameborder="0" marginwidth="0" marginheight="0"
        scrolling="no">
     </iframe>
   </center>
