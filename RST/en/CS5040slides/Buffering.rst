.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

============
Buffer Pools
============

Buffer Pools
------------

.. slide:: Buffer Pools

   * A series of buffers used by an application to cache disk data is
     called a buffer pool.

   * Virtual memory uses a buffer pool to imitate greater RAM memory by
     actually storing information on disk and “swapping” between disk
     and RAM.


.. slide:: Buffer Pools

   .. inlineav:: buffintroCON ss
      :long_name: Buffer Pool Introduction Slideshow
      :align: center
      :links: AV/Files/buffpoolCON.css 
      :scripts: AV/Files/buffintroCON.js
      :output: show


.. slide:: Organizing Buffer Pools

   * Which buffer should be replaced when new data must be read?

   * First-in, First-out: Use the first one on the queue.

   * Least Frequently Used (LFU): Count buffer accesses, reuse the least
     used.

   * Least Recently used (LRU): Keep buffers on a linked list.  When
     buffer is accessed, bring it to front.  Reuse the one at end.


.. slide:: LRU

   .. inlineav:: LRUCON ss
      :long_name: LRU Replacement Slideshow
      :align: center
      :links: AV/Files/buffpoolCON.css 
      :scripts: AV/Files/LRUCON.js
      :output: show


.. slide:: Dirty Bit

   .. inlineav:: LRUwriteCON ss
      :long_name: LRU Replacement with write Slideshow
      :align: center
      :links: AV/Files/buffpoolCON.css 
      :scripts: AV/Files/LRUwriteCON.js
      :output: show


.. slide:: Bufferpool ADT: Message Passing

   .. codeinclude:: BufferPool/BuffMsgADT


.. slide:: Bufferpool ADT: Buffer Passing

   .. codeinclude:: BufferPool/BuffBuffADT


.. slide:: Design Issues

   * Disadvantage of message passing:
      * Messages are copied and passed back and forth.

   * Disadvantages of buffer passing:
      * The user is given access to system memory (the buffer itself)
      * The user must explicitly tell the buffer pool when buffer contents
        have been modified, so that modified data can be rewritten to disk
        when the buffer is flushed.
      * The pointer might become stale when the bufferpool replaces the
        contents of a buffer.


.. slide:: Some Goals

   * Be able to avoid reading data when the block contents will be
     replaced.
   * Be able to support multiple users accessing a buffer, and
     independantly releasing a buffer.
   * Don’t make an active buffer stale.


.. slide:: Improved Interface

   .. codeinclude:: BufferPool/BufferADT


.. slide:: Improved Interface (2)

   .. codeinclude:: BufferPool/BufferPoolADT


.. slide:: External Sorting

   * Problem: Sorting data sets too large to fit into main memory.
      * Assume data are stored on disk drive.

   * To sort, portions of the data must be brought into main memory,
     processed, and returned to disk.

   * An external sort should minimize disk accesses.


.. slide:: Model of External Computation

   * Secondary memory is divided into equal-sized blocks (512, 1024, etc…)

   * A basic I/O operation transfers the contents of one disk block to/from
     main memory.

   * Under certain circumstances, reading blocks of a file in sequential
     order is more efficient. (When?)

   * Primary goal is to minimize I/O operations.

   * Assume only one disk drive is available.


.. slide:: Key Sorting

   * Often, records are large, keys are small.
      * Ex: Payroll entries keyed on ID number

   * Approach 1: Read in entire records, sort them, then write them out
     again.

   * Approach 2: Read only the key values, store with each key the location
     on disk of its associated record.

   * After keys are sorted the records can be read and rewritten in sorted
     order.


.. slide:: Simple External Mergesort (1)

   * Quicksort requires random access to the entire set of records.

   * Better: Modified Mergesort algorithm.
      * Process :math:`n` elements in :math:`\Theta(\log n)` passes.

   * A group of sorted records is called a run.


.. slide:: Simple External Mergesort (2)

   | 1. Split the file into two files.
   | 2. Read in a block from each file.
   | 3. Take first record from each block, output them in sorted order.
   | 4. Take next record from each block, output them to a second file in
        sorted order.
   | 5. Repeat until finished, alternating between output files.  Read new
        input blocks as needed.
   | 6. Repeat steps 2-5, except this time input files have runs of two sorted
        records that are merged together.
   | 7. Each pass through the files provides larger runs.


.. slide:: Simple External Mergesort (3)

   .. inlineav:: extMergeSortCON ss
      :long_name: External Merge Sort Slideshow
      :links: AV/Files/extsortCON.css
      :scripts: DataStructures/binaryheap.js AV/Files/extMergeSortCON.js
      :output: show


.. slide:: Problems with Simple Mergesort

   * Is each pass through input and output files sequential?

   * What happens if all work is done on a single disk drive?

   * How can we reduce the number of Mergesort passes?

   * In general, external sorting consists of two phases:
      * Break the files into initial runs
      * Merge the runs together into a single run.


.. slide:: A Better Process

   .. inlineav:: extMergeSortExampCON ss
      :long_name: External Merge Sort Example Slideshow
      :links: AV/Files/extsortCON.css
      :scripts: DataStructures/binaryheap.js AV/Files/extMergeSortExampCON.js
      :output: show


.. slide:: Breaking a File into Runs

   * General approach:
      * Read as much of the file into memory as possible.
      * Perform an in-memory sort.
      * Output this group of records as a single run.


.. slide:: Replacement Selection (1)

   * Break available memory into an array for the heap, an input buffer,
     and an output buffer.
   * Fill the array from disk.
   * Make a min-heap.
   * Send the smallest value (root) to the output buffer.


.. slide:: Replacement Selection (2)

   * If the next key in the file is greater than the last value output,
     then

      * Replace the root with this key

     else

      * Replace the root with the last key in the array

     Add the next record in the file to a new heap (actually, stick it at
     the end of the array).


     .. inlineav:: extSortOverCON dgm
        :links: AV/Files/extsortCON.css
        :scripts: AV/Files/extSortOverCON.js
        :output: show


.. slide:: RS Example

   .. inlineav:: extRSCON ss
      :long_name: External Replacement Selection Slideshow
      :links: AV/Files/extsortCON.css
      :scripts: DataStructures/binaryheap.js AV/Files/extRSCON.js
      :output: show


.. slide:: Snowplow Analogy (1)

   * Imagine a snowplow moving around a circular track on which snow falls
     at a steady rate.

   * At any instant, there is a certain amount of snow S on the track.
     Some falling snow comes in front of the plow, some behind.

   * During the next revolution of the plow, all of this is removed, plus
     1/2 of what falls during that revolution.

   * Thus, the plow removes 2S amount of snow.


.. slide:: Snowplow Analogy (2)

   .. inlineav:: extSortSnowCON dgm
      :links: AV/Files/extsortCON.css
      :scripts: DataStructures/binaryheap.js AV/Files/extSortSnowCON.js
      :align: justify

.. slide:: Problems with Simple Merge

   * Simple mergesort: Place runs into two files.
      * Merge the first two runs to output file, then next two runs, etc.

   * Repeat process until only one run remains.
      * How many passes for r initial runs?

   * Is there benefit from sequential reading?
   * Is working memory well used?
   * Need a way to reduce the number of passes.


.. slide:: Multiway Merge (1)

   * With replacement selection, each initial run is several blocks long.

   * Assume each run is placed in separate file.

   * Read the first block from each file into memory and perform an r-way
     merge.

   * When a buffer becomes empty, read a block from the appropriate run
     file.

   * Each record is read only once from disk during the merge process.


.. slide:: Multiway Merge (2)

   * In practice, use only one file and seek to appropriate block.

   .. inlineav:: extMultiMergeCON ss
      :long_name: Multiway Merge Example Slideshow
      :links: AV/Files/extsortCON.css
      :scripts: DataStructures/binaryheap.js AV/Files/extMultiMergeCON.js
      :output: show


.. slide:: Limits to Multiway Merge (1)

   * Assume working memory is :math:`b` blocks in size.

   * How many runs can be processed at one time?

   * The runs are :math:`2b` blocks long (on average).

   * How big a file can be merged in one pass?


.. slide:: Limits to Multiway Merge (2)

   * Larger files will need more passes -- but the run size grows quickly!

   * This approach trades (:math:`\log b`) (possibly) sequential
     passes for a single or very few random (block) access passes.


.. slide:: General Principles

   * A good external sorting algorithm will seek to do the following:
      * Make the initial runs as long as possible.
      * At all stages, overlap input, processing and output as much as
        possible.
      * Use as much working memory as possible.  Applying more memory usually
        speeds processing.
      * If possible, use additional disk drives for more overlapping of
        processing with I/O, and allow for more sequential file processing.
