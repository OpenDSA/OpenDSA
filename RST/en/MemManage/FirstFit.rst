.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: Memory Management
   :keyword: Memory Management; Sequential Fit Memory Allocation


First Fit
=========

First Fit
---------

The simplest method for selecting a block would be to move down the
free block list until a block of size at least 30 is found.
Any remaining space in this block is left on the freelist.
If we begin at the beginning of the list and work down to the first
free block at least as large as 30, we select the block of size 35.
30 units of storage will be allocated, leaving a free block with 5
units of space. 
Because this approach selects the first block with enough space, it is
called :term:`first fit`.

.. avembed:: AV/MemManage/firstFitAV.html ss
   :long_name: First Fit Visualization
   :url_params: fitAlgorithm=1
   :keyword: Memory Management; Sequential Fit Memory Allocation

Now try it for yourself with the following exercise.

.. avembed:: AV/MemManage/firstFitPRO.html pe
   :long_name: First Fit Proficiency Exercise
   :keyword: Memory Management; Sequential Fit Memory Allocation
