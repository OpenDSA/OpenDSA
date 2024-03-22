.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: Memory Management
   :keyword: Memory Management; Buddy Method Memory Allocation


Other Memory Allocation Methods
===============================

Other Memory Allocation Methods
-------------------------------

Buddy Methods
~~~~~~~~~~~~~

Sequential-fit methods rely on a linked list of free blocks, which
must be searched for a suitable block at each memory request.
Thus, the time to find a suitable free block would be
:math:`\Theta(n)` in the worst case for a freelist containing
:math:`n` blocks. 
Merging adjacent free blocks is somewhat complicated.
Finally, we must either use additional space for the linked list, or
use space within the memory pool to support the memory manager
operations.
In the second option,
both free and reserved blocks require tag and size fields.
Fields in free blocks do not cost any space (because they are stored
in memory that is not otherwise being used), but fields in reserved
blocks create additional overhead.

The buddy system solves most of these problems.
Searching for a block of the proper size is efficient,
merging adjacent free blocks is simple,
and no tag or other information fields need be stored within reserved
blocks.
The buddy system assumes that memory is of size :math:`2^N` for some
integer :math:`N`.
Both free and reserved blocks will always be of size :math:`2^k` for
:math:`k < N`.
At any given time, there might be both free and reserved blocks of
various sizes.
The buddy system keeps a separate list for free blocks of each size.
There can be at most :math:`N` such lists, because there can only be
:math:`N` distinct block sizes.

When a request comes in for :math:`m` words, we first determine the
smallest value of :math:`k` such that :math:`2^k \geq m`.
A block of size :math:`2^k` is selected from the free list for
that block size if one exists.
The buddy system does not worry about internal fragmentation:
The entire block of size :math:`2^k` is allocated.

If no block of size :math:`2^k` exists,
the next larger block is located.
This block is split in half (repeatedly if necessary) until the
desired block of size :math:`2^k` is created.
Any other blocks generated as a by-product of this splitting process
are placed on the appropriate freelists.

.. inlineav:: buddyCON dgm
   :links: AV/MemManage/buddyCON.css
   :scripts: AV/MemManage/buddyCON.js
   :align: center
   :keyword: Memory Management; Buddy Method Memory Allocation

In the example above, we see the result of a series of insert and free
operations on a memory pool of 256 units.
Imagine that we have a series of requests of size 5, 20, 30, and 50.
These are satisfied by blocks of size 8, 32, 32, and 64, respectively.
If we then release the third requested record (the one of size 30),
the result is as we see in this figure.
There is still a record (of size 5) in the first 8 units, a record (of size
20) in the second used block which is 32 units, and record
(of size 50) in the last used block which is 64 units.
We have a free block of size :math:`2^3 = 8`, one of size :math:`2^4 = 16`, 
and two of size :math:`2^6 = 64`.

The disadvantage of the buddy system is that it allows internal
fragmentation.
For example, a request for 257 words will require a block of size 512.
The primary advantages of the buddy system are:

#. There is less external fragmentation.

#. Search for a block of the right size is
   cheaper than, say, best fit because we need only find the first
   available block on the block list for blocks of size :math:`2^k`.

#. Merging adjacent free blocks is easy.

The reason why this method is called the buddy system is because
of the way that merging takes place.
The :math:`buddy` for any block of size :math:`2^k` is another
block of the same size, and with the same address
(i.e., the byte position in memory, read as a binary value)
except that the :math:`k` th bit is reversed.
For example, the block of size 16 with beginning address 00000
in the figure below, has buddy with address 10000.
Likewise the block of size 32 with
address 100000 has buddy 000000.
If free blocks are sorted by address value, the buddy can be found by
searching the correct block size list.
Merging simply requires that the address for the combined buddies be
moved to the freelist for the next larger
block size (which might in turn require that two adjacent free blocks
of the larger size be merged).

.. avembed:: AV/MemManage/BuddyAV.html ss
   :long_name: Buddy Method Visualization
   :keyword: Memory Management; Buddy Method Memory Allocation

Other Methods
~~~~~~~~~~~~~

In addition to sequential-fit and buddy methods, there are many
ad hoc approaches to memory management.
If the application is sufficiently complex, it might be
desirable to break available memory into several memory
:term:`zones <zone>`, each with a different memory management scheme.
For example, some zones might have a simple memory access pattern of
first-in, first-out.
This zone can therefore be managed efficiently by using a simple
stack.
Another zone might allocate only records of fixed size, and so can be
managed with a simple freelist.
Other zones might need one of the general-purpose memory allocation
methods discussed in this section.
The advantage of zones is that some portions of memory can be managed
more efficiently.
The disadvantage is that one zone might fill up while other zones have
excess memory if the zone sizes are chosen poorly.

Another approach to memory management is to impose a standard size on
all memory requests.
We have seen an example of this concept already in disk file
management, where all files are allocated in multiples of the
cluster size.
This approach leads to internal fragmentation,
but managing files composed of clusters is easier than managing
arbitrarily sized files.
The cluster scheme also allows us to relax the restriction that the
memory request be serviced by a contiguous block of memory.
Most disk file managers and
operating system main memory managers
work on a cluster or page system.
Block management is usually done with a buffer pool
to allocate available blocks in main memory efficiently.


