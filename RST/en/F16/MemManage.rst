.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=================
Memory Management
=================

Memory Management
-----------------

.. slide:: Memory Management

   * Problem: Records (of various lengths) need to be stored.

   * Model: A big array of space to store them, managed by a memory
     manager.

      * Like a coat-check stand, give them your coat, get back a ticket.
        Later, return the ticket for your coat.
      * We call the ticket a **handle**.


.. slide:: Memory Manager ADT

   ::

      // Memory Manager abstract class
      interface MemManager {
        // Store a record and return a handle to it
        public MemHandle insert(byte[] info);

        // Release the space associated with a record
        public void release(MemHandle h);

        // Get back a copy of a stored record
        public byte[] getRecord(MemHandle h);
      }


.. slide:: Implementation Issues

   * The client doesn’t know what is in the handle.

   * The memory manager doesn’t know what is in the message.

   * Multiple clients can share a memory manager.

   * The memory manager might interact with a buffer pool:
      * The client decides what gets stored
      * The memory manager decides where things get stored
      * The buffer pool decides when blocks are in main memory


.. slide:: Dynamic Storage Allocation

   * Use a memory manager when:
      * Access patterns are uncertain
      * Messages are of varying length

   * Over time, memory contains interspersed free blocks and reserved
     blocks.

      * When adding a new message, find a free block large enough
      * When deleting, merge free blocks

   .. odsalink:: AV/MemManage/dynamicCON.css

   .. inlineav:: freeblocklistCON dgm
      :align: justify

   .. odsascript:: AV/MemManage/freeblocklistCON.js


.. slide:: Fragmentation

   * **Internal fragmentation:** when more space is allocated than the message
     size.

      * Might be done to make memory management easier
      * Example: Sectors and clusters on disk

   * **External fragmentation:** Free blocks too small to be useful.

   .. inlineav:: fragCON dgm
      :align: center

   .. odsascript:: AV/MemManage/fragCON.js

.. slide:: Managing the Free Blocks

   * A key issue is how to merge free blocks
      #. Use a linked list of free blocks (external to the memory pool)

   .. odsalink:: AV/MemManage/seqFitCON.css

   .. inlineav:: seqFitCON dgm
      :align: justify

   .. odsascript:: AV/MemManage/seqFitCON.js


.. slide:: Selecting a Free Block

   * Somehow, need to pick one of the free blocks in which to store the
     message

      * It must be at least as large as the message (plus whatever
        info the memory manager needs, such as size and tags)
      * Extra space can be returned as a free block
      * Want to minimize fragmentation, and avoid failing to service
        requests


.. slide:: Sequential Fit Methods

   * First Fit: Start from beginning, pick first free block that is
     big enough

      * Store list in memory-pool order
      * Circular first fit: Move forward from current position

   * Best Fit: Pick the smallest block big enough

      * Store by block size, or search list
      * Protect large blocks for big requests

   * Worst Fit: Pick the biggest block

      * Store by block size, or search list
      * Avoid external fragmentation


.. slide:: Example

   .. avembed:: AV/MemManage/firstFitAV.html ss

.. slide:: .

   .

.. slide:: Failure Policies

   * What do we do if there is no free block that can hold the message?
   * Must resort to a **failure policy**.
      * Reject the request
      * Grow the memory
      * Compact the memory
      * Garbage collection
