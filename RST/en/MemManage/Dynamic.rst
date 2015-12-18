.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: Memory Management
   
.. odsalink:: AV/MemManage/dynamicCON.css

Dynamic Storage Allocation
==========================

Dynamic Storage Allocation
--------------------------

For the purpose of dynamic storage allocation, we view memory as a
single array broken into a series of variable-size blocks, where
some of the blocks are :term:`free blocks <free block>` and some are
:term:`reserved blocks <reserved block>` or already allocated.
The free blocks are linked together to form a :term:`freelist` used
for servicing future :term:`memory requests <memory request>`.
This figure illustrates the situation that can arise after
a series of memory allocations and deallocations.

.. _MemMode:

.. inlineav:: freeblocklistCON dgm
   :align: justify
   
   The results from a series of memory allocations and
   deallocations.
   Memory is made up of a series of variable-size blocks, some allocated
   and some free.
   In this example, shaded areas represent memory currently allocated
   and unshaded areas represent unused memory available for future
   allocation.

When a memory request is received by the memory manager, some block
on the freelist must be found that is large enough to service the
request.
If no such block is found, then the memory manager must resort to a
:ref:`failure policy <failure policy> <Garbage>` such as
:term:`garbage collection`.

If there is a request for :math:`m` words, and no block exists of
exactly size :math:`m`, then a larger block must be used instead.
One possibility in this case is that the entire block is given away
to the memory allocation request.
This might be desirable when the size of the block is only slightly
larger than the request.
This is because saving a tiny block that is too small to be useful for
a future memory request might not be worthwhile.
Alternatively, for a free block of size :math:`k`,
with :math:`k > m`, up to :math:`k - m` space may be
retained by the memory manager to form a new free 
block, while the rest is used to service the request.

Memory managers can suffer from two types of fragmentation.
:term:`External fragmentation`
occurs when a series of memory requests result in lots of small free
blocks, no one of which is useful for servicing typical requests.
:term:`Internal fragmentation` occurs when more than :math:`m` words
are allocated to a request for :math:`m` words, wasting free storage.
The difference between internal and external fragmentation is
illustrated by this figure.
The small white block labeled "External fragmentation" is too small
to satisfy typical memory requests.
The small grey block labeled "Internal fragmentation" was allocated as
part of the grey block to its left, but it does not actually store
information.

.. _CompFrag:

.. inlineav:: fragCON dgm
   :align: center

   An illustration of internal and external fragmentation.

Some memory management schemes sacrifice space to internal
fragmentation to make memory management easier (and perhaps reduce
external fragmentation).
For example, external fragmentation does not happen in file management
systems that allocate file space in clusters.
Another example of sacrificing space to internal fragmentation so as
to simplify memory management is the :term:`buddy method`
described later in this chapter.

The process of searching the :term:`memory pool` for a block large
enough to service the request, possibly reserving the remaining space
as a free block, is referred to as a :term:`sequential fit` method.

.. odsascript:: AV/MemManage/freeblocklistCON.js
.. odsascript:: AV/MemManage/fragCON.js
