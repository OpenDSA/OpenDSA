.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: sorting terminology; sort code tuning; insertion sort
   :satisfies: quicksort
   :topic: Sorting

.. odsalink:: AV/Sorting/quicksortCON.css

.. index:: ! Quicksort

Quicksort-02
============

We now turn to function ``partition``.
If we knew in advance how many keys are less than the pivot,
``partition`` could simply copy records with key values less
than the pivot to the low end of the array, and records with larger
keys to the high end.
Because we do not know in advance how many keys are less than
the pivot,
we use a clever algorithm that moves indices inwards from the
ends of the subarray, swapping values as necessary until the two
indices meet.
Here is an implementation for the partition step.

.. codeinclude:: Sorting/Quicksort
   :tag: partition

Note the check that ``right >= left`` in the second inner
``while`` loop.
This ensures that ``right`` does not run off the low end of the
partition in the case where the pivot is the least value in that
partition.
Function ``partition`` returns the first index of the right
partition (the place where ``left`` ends at) so that the subarray
bound for the recursive calls to ``qsort`` can be determined.

.. inlineav:: quicksortCON ss
   :output: show

.. odsascript:: AV/Sorting/quicksortCODE.js
.. odsascript:: AV/Sorting/quicksortCON.js
   