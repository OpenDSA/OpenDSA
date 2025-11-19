.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

================
External Sorting
================

External Sorting
----------------

.. revealjs-slide::
   
* Problem: Sorting data sets too large to fit into main memory.

  * Assume data are stored on disk drive.

* To sort, portions of the data must be brought into main memory,
  processed, and returned to disk.

* An external sort should minimize disk accesses.


Model of External Computation
-----------------------------

.. revealjs-slide::
   
* Secondary memory is divided into equal-sized blocks (512, 1024, etc…)

* A basic I/O operation transfers the contents of one disk block to/from
  main memory.

* Under certain circumstances, reading blocks of a file in sequential
  order is more efficient. (When?)

* Primary goal is to minimize I/O operations.

* Assume only one disk drive is available.


Key Sorting
-----------

.. revealjs-slide::
   
* Often, records are large, keys are small.

  * Ex: Payroll entries keyed on ID number

* Approach 1: Read in entire records, sort them, then write them out
  again.

* Approach 2: Read only the key values, store with each key the location
  on disk of its associated record.

* After keys are sorted the records can be read and rewritten in sorted
  order.


Simple External Mergesort (1)
-----------------------------

.. revealjs-slide::
   
* Quicksort requires random access to the entire set of records.

* Better: Modified Mergesort algorithm.

  * Process :math:`n` elements in :math:`\Theta(\log n)` passes.

* A group of sorted records is called a run.


Simple External Mergesort (2)
-----------------------------

.. revealjs-slide::
   
1. Split the file into two files.
2. Read in a block from each file.
3. Take first record from each block, output them in sorted order.
4. Take next record from each block, output them to a second file in
   sorted order.
5. Repeat until finished, alternating between output files.  Read new
   input blocks as needed.
6. Repeat steps 2-5, except this time input files have runs of two sorted
   records that are merged together.
7. Each pass through the files provides larger runs.


Simple External Mergesort (3)
-----------------------------

.. revealjs-slide::
   
.. raw:: html

   <iframe src="../../../Metadata/inlineav/Files/extMergeSortCON.html" 
           width="960" 
           height="700" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


Problems with Simple Mergesort
------------------------------

.. revealjs-slide::

* Is each pass through input and output files sequential?

* What happens if all work is done on a single disk drive?

* How can we reduce the number of Mergesort passes?

* In general, external sorting consists of two phases:

  * Break the files into initial runs
  * Merge the runs together into a single run.


A Better Process
----------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Files/extMergeSortExampCON.html" 
           width="960" 
           height="700" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


Breaking a File into Runs
-------------------------

.. revealjs-slide::

* General approach:

  * Read as much of the file into memory as possible.
  * Perform an in-memory sort.
  * Output this group of records as a single run.


Replacement Selection (1)
-------------------------

.. revealjs-slide::

* Break available memory into an array for the heap, an input buffer,
  and an output buffer.
* Fill the array from disk.
* Make a min-heap.
* Send the smallest value (root) to the output buffer.


Replacement Selection (2)
-------------------------

.. revealjs-slide::

* If the next key in the file is greater than the last value output,
  then

  * Replace the root with this key

* else

  * Replace the root with the last key in the array

* Add the next record in the file to a new heap (actually, stick it at
  the end of the array).

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Files/extSortOverCON.html" 
           width="960" 
           height="700" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


RS Example
----------

.. revealjs-slide::

.. inlineav:: extRSCON ss
   :long_name: External Replacement Selection Slideshow
   :links: AV/Files/extsortCON.css
   :scripts: DataStructures/binaryheap.js AV/Files/extRSCON.js
   :output: show


Snowplow Analogy (1)
--------------------

.. revealjs-slide::

* Imagine a snowplow moving around a circular track on which snow falls
  at a steady rate.

* At any instant, there is a certain amount of snow S on the track.
  Some falling snow comes in front of the plow, some behind.

* During the next revolution of the plow, all of this is removed, plus
  1/2 of what falls during that revolution.

* Thus, the plow removes 2S amount of snow.


Snowplow Analogy (2)
--------------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Files/extSortSnowCON.html" 
           width="960" 
           height="700" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


Problems with Simple Merge
--------------------------

.. revealjs-slide::

* Simple Mergesort: Place runs into two files.

  * Merge the first two runs to output file, then next two runs, etc.

* Repeat process until only one run remains.

  * How many passes for r initial runs?

* Is there benefit from sequential reading?
* Is working memory well used?
* Need a way to reduce the number of passes.


Multiway Merge (1)
------------------

.. revealjs-slide::

* With replacement selection, each initial run is several blocks long.

* Assume each run is placed in separate file.

* Read the first block from each file into memory and perform an r-way
  merge.

* When a buffer becomes empty, read a block from the appropriate run
  file.

* Each record is read only once from disk during the merge process.


Multiway Merge (2)
------------------

.. revealjs-slide::

* In practice, use only one file and seek to appropriate block.

.. inlineav:: extMultiMergeCON ss
   :long_name: Multiway Merge Example Slideshow
   :links: AV/Files/extsortCON.css
   :scripts: DataStructures/binaryheap.js AV/Files/extMultiMergeCON.js
   :output: show


Limits to Multiway Merge (1)
----------------------------

.. revealjs-slide::

* Assume working memory is :math:`b` blocks in size.

* How many runs can be processed at one time?

* The runs are :math:`2b` blocks long (on average).

* How big a file can be merged in one pass?


Limits to Multiway Merge (2)
----------------------------

.. revealjs-slide::

* Larger files will need more passes -- but the run size grows quickly!

* This approach trades (:math:`\log b`) (possibly) sequential
  passes for a single or very few random (block) access passes.

* Example: use 1/2 MB of working memory

  * Average run size from Replacement Selection is 1MB
  * Merge 128 runs in one multi-way merge pass (blocks are 4096 bytes
    each)
  * This would be 128MB in 2 passes (if records have a 4-byte key and
    4-byte data field, that would be 16 Million records).
  * 3 passes would be enough for any conceiveable practical
    application.
  * Or, use some more memory: 1MB of memory would allow for for a 1/2
    GB file to be processed in 2 passes. 2MB of memory would be 2GB.


General Principles
------------------

.. revealjs-slide::

* A good external sorting algorithm will seek to do the following:

  * Make the initial runs as long as possible.
  * At all stages, overlap input, processing and output as much as
    possible.
  * Use as much working memory as possible.  Applying more memory usually
    speeds processing.
  * If possible, use additional disk drives for more overlapping of
    processing with I/O, and allow for more sequential file processing.


A Broader Principle: Algorithms, Code Tuning, and Power Consumption
-------------------------------------------------------------------

.. revealjs-slide::

* Regardless of your views on the politics of energy use and the
  effect of climate change, some things are not debatable:

  * Computers, collectively, use a LOT of power.

  * Data Centers are controversial because they compete with people's
    access to resources.

    * Electricity, water
  
  * Electricity costs money. Companies would prefer not to waste their
    money.


Compute Cycles == Electricity == Money
--------------------------------------

.. revealjs-slide::

* Lots of computer programs are not as efficient as they can be.

  * Applications with file processing or network traffic provide
    stunning opportunities for inefficiency.

  * Stuart Clark: Multiple examples of 1-2 orders of magnitude
    improvements in network traffic. Two examples:

    * https://blogs.cisco.com/learning/when-speed-matters-in-api-interactions
    * https://podcasts.apple.com/us/podcast/can-ai-fix-its-own-energy-problem/id1225077306?i=1000723998464
    
  * I have already seen multiple examples of students in this class
    P3 implementations that take over 100X time compared to my
    implementation.

  * Recognizing such issues is not too hard... if you think about it
    (determine what is an appropriate, expected cost) and if you care
    (so that you check and fix the problems). Some code tuning is
    subtle in its improvements... but sometimes there are massive
    improvements with simple changes.

  * Can LLMs give us improved code easily?

