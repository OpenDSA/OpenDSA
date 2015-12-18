.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: file processing; disk drives
   :topic: External Sorting

.. odsalink:: AV/Files/extsortCON.css

External Sorting
================

External Sorting
----------------

We now consider the problem of sorting collections of
records too large to fit in main memory.
Because the records must reside in peripheral or external memory,
such sorting methods are called
:term:`external sorts <external sort>`. 
This is in contrast to :ref:`internal sorts <internal sort> <InSort>`,
which assume that the records to be sorted are stored in main memory.
Sorting large collections of records is central to many applications,
such as processing payrolls and other large business databases.
As a consequence, many external sorting algorithms have been devised.
Years ago, sorting algorithm designers sought to optimize
the use of specific hardware configurations, such as multiple
tape or :term:`disk drives <disk drive>`.
Most computing today is done on personal computers and low-end
workstations with relatively powerful CPUs, but only one or at most
two disk drives.
The techniques presented here are geared toward
optimized processing on a single disk drive.
This approach allows us to cover the most important issues in
external sorting while skipping many less important machine-dependent
details.

When a collection of records is too large to fit in
:term:`main memory`, 
the only practical way to sort it is to read some records from disk,
do some rearranging, then write them back to disk.
This process is repeated until the file is sorted, with each record
read perhaps many times.
Given the high cost of :term:`disk I/O`, it should come as no surprise
that the primary goal of an external sorting algorithm is to minimize
the number of times information must be read from or written to disk.
A certain amount of additional CPU processing can profitably be traded
for reduced disk access.

Before discussing external sorting techniques, consider again the
basic model for accessing information from disk.
The file to be sorted is viewed by the programmer as a sequential
series of fixed-size :term:`blocks <block>`.
Assume (for simplicity) that each block contains the same
number of fixed-size data records.
Depending on the application, a record might be only a few bytes |---|
composed of little or nothing more than the key |---| or might be
hundreds of bytes with a relatively small key field.
Records are assumed not to cross block boundaries.
These assumptions can be relaxed for special-purpose sorting
applications, but ignoring such complications makes the principles
clearer.

Recall that a :ref:`sector <sector> <DiskDrive>` is the basic unit
of I/O.
In other words, all disk reads and writes are for one or more complete
sectors.
Sector sizes are typically a power of two, in the range 512 to 16K
bytes, depending on the operating system and the size and speed of
the disk drive.
The block size used for external sorting algorithms should be equal to
or a multiple of the sector size.

Under this model, a sorting algorithm reads a block of data into a
buffer in main memory, performs some processing on it, and at some
future time writes it back to disk.
:ref:`Recall that <Secondary>` reading or writing a block from disk
takes on the order of one million times longer than a memory access.
Based on this fact, we can reasonably expect that the records
contained in a single block can be sorted by an internal
sorting algorithm such as :ref:`Quicksort Quicksort <Quicksort>`
in less time than is required to read or write the block.

Under good conditions, reading from a file in sequential
order is more efficient than reading blocks in random order.
Given the significant impact of seek time on disk access, it
might seem obvious that sequential processing is faster.
However, it is important to understand precisely under what
circumstances sequential file processing is actually faster than
random access, because it affects our approach to designing an external
sorting algorithm.

Efficient sequential access relies on seek time being kept to a minimum.
The first requirement is that the blocks making up a file are in
fact stored on disk in sequential order and close together,
preferably filling a small number of contiguous tracks.
At the very least, the number of extents making up the file should be
small.
Users typically do not have much control over the layout of their file
on disk, but writing a file all at once in sequential order to a disk
drive with a high percentage of free space increases the likelihood of
such an arrangement.

The second requirement is that the disk drive's I/O head remain
positioned over the file throughout sequential processing.
This will not happen if there is competition of any kind for the I/O
head.
For example, on a multi-user time-shared computer the sorting process
might compete for the I/O head with the processes of other users.
Even when the sorting process has sole control of the I/O head, it is
still likely that sequential processing will not be efficient.
Imagine the situation where all processing is done on a single disk
drive, with the typical arrangement of a single bank of read/write
heads that move together over a stack of platters.
If the sorting process involves reading from an input file,
alternated with writing to an output file, then the I/O head will
continuously seek between the input file and the output file.
Similarly, if two input files are being processed simultaneously
(such as during a merge process), then the I/O head will
continuously seek between these two files.

The moral is that, with a single disk drive, there often is
no such thing as efficient sequential processing of a data file.
Thus, a sorting algorithm might be more efficient if it performs a
smaller number of non-sequential disk operations rather than a larger
number of logically sequential disk operations that require a large
number of seeks in practice.

As mentioned previously, the record size might be quite large compared
to the size of the key.
For example, payroll entries for a large business might each store
hundreds of bytes of information including the name, ID, address, and
job title for each employee.
The sort key might be the ID number, requiring only a few bytes.
The simplest sorting algorithm might be to process such records as a
whole, reading the entire record whenever it is processed.
However, this will greatly increase the amount of I/O required,
because only a relatively few records will fit into a single disk
block.
Another alternative is to do a :term:`key sort`.
Under this method, the keys are all read and stored together in an
:term:`index file`, where each key is stored along
with a pointer indicating the position of the corresponding record in
the original data file.
The key and pointer combination should be substantially smaller than
the size of the original record; thus, the index file will be much
smaller than the complete data file.
The index file will then be sorted, requiring much less I/O because
the index records are smaller than the complete records.

Once the index file is sorted, it is possible to reorder the records
in the original database file.
This is typically not done for two reasons.
First, reading the records in sorted order from the record file
requires a random access for each record.
This can take a substantial amount of time and is only of value if
the complete collection of records needs to be viewed or processed in
sorted order (as opposed to a search for selected records).
Second, database systems typically allow searches to be
done on multiple keys.
For example, today's processing might be done in order of ID numbers.
Tomorrow, the boss might want information sorted by salary.
Thus, there might be no single "sorted" order for the full record.
Instead, multiple index files are often maintained, one for each sort
key.
These ideas are explored further in Chapter :chap:`Indexing`.


Simple Approaches to External Sorting
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If your operating system
supports virtual memory, the simplest
"external" sort is to read the entire file into
virtual memory and run an internal sorting
method such as Quicksort.
This approach allows the virtual memory manager to use its normal
buffer pool mechanism to control disk accesses.
Unfortunately, this might not always be a viable option.
One potential drawback is that the size of virtual memory is
usually limited to something much smaller than the disk space
available.
Thus, your input file might not fit into virtual memory.
Limited virtual memory can be overcome by adapting an internal sorting
method to make use of your own buffer pool.

A more general problem with adapting an internal sorting algorithm
to external sorting is that it is not likely to be as efficient as
designing a new algorithm with the specific goal of minimizing
disk I/O.
Consider the simple adaptation of Quicksort to use a buffer pool.
Quicksort begins by processing the entire array of records, with the
first partition step moving indices inward from the two ends.
This can be implemented efficiently using a buffer pool.
However, the next step is to process each of the subarrays,
followed by processing of sub-subarrays, and so on.
As the subarrays get smaller, processing quickly approaches
random access to the disk drive.
Even with maximum use of the buffer pool, Quicksort still must read
and write each record :math:`\log n` times on average.
We can do much better.
Finally, even if the virtual memory manager can give good performance
using a standard Quicksort, this will come at the cost of using a lot
of the system's working memory, which will mean that the system cannot
use this space for other work.
Better methods can save time while also using less memory.

Our approach to external sorting is derived from the
Mergesort algorithm.
The simplest form of external Mergesort performs a series
of sequential passes over the records, merging larger and larger
sublists on each pass.
The first pass merges sublists of size 1 into sublists of
size 2; the second pass merges the sublists of size 2 into
sublists of size 4; and so on.
A sorted sublist is called a :term:`run`.
Thus, each pass is merging pairs of runs to form longer runs.
Each pass copies the contents of the file to
another file.
Here is a sketch of the algorithm.

.. _ExMerge:

.. inlineav:: extMergeSortCON ss
   :output: show

#. Split the original file into two equal-sized
   :term:`run files <run file>`.

#. Read one block from each run file into input buffers.

#. Take the first record from each input buffer, and write a run of
   length two to an output buffer in sorted order.

#. Take the next record from each input buffer, and write a run of
   length two to a second output buffer in sorted order.

#. Repeat until finished, alternating output between the two output
   run buffers.
   Whenever the end of an input block is reached, read the next block
   from the appropriate input file.
   When an output buffer is full, write it to the appropriate output
   file.

#. Repeat steps 2 through 5, using the original output files as
   input files.
   On the second pass, the first two records of each input run file
   are already in sorted order.
   Thus, these two runs may be merged and output as a single run of
   four elements.

#. Each pass through the run files provides larger and larger runs
   until only one run remains.

This algorithm can easily take advantage of
:ref:`double buffering <double buffering> BuffPool`.
Note that the various passes read the input run files
sequentially and write the output run files sequentially.
For sequential processing and double buffering to be effective,
however, it is necessary that there be a separate I/O head available
for each file.
This typically means that each of the input and output files must be
on separate disk drives, requiring a total of four disk drives for
maximum efficiency.


Improving Performance
~~~~~~~~~~~~~~~~~~~~~

The external Mergesort algorithm just described requires that
:math:`\log n` passes be made to sort a file of :math:`n` records.
Thus, each record must be read from disk and written to disk
:math:`\log n` times.
The number of passes can be significantly reduced by observing that
it is not necessary to use Mergesort on small runs.
A simple modification is to read in a block of data, sort it in
memory (perhaps using Quicksort), and then output it as a single
sorted run.

.. inlineav:: extMergeSortExampCON ss
   :output: show

We can extend this concept to improve performance even
further.
Available main memory is usually much more than one block in size.
If we process larger initial runs, then the number of passes
required by Mergesort is further reduced.
For example, most modern computers can provide tens or even hundreds
of megabytes of RAM to the sorting program.
If all of this memory (excepting a small amount for buffers
and local variables) is devoted to building initial runs as large as
possible, then quite large files can be processed in few passes.
The next section presents a technique for producing large runs,
typically twice as large as could fit directly into main memory.

Another way to reduce the number of passes required is to increase
the number of runs that are merged together during each pass.
While the standard Mergesort algorithm merges two runs at a time,
there is no reason why merging needs to be limited in this way.
Below we will discuss the technique of multiway merging.

Over the years, many variants on external sorting have been
presented, but all are based on the following two steps:

#. Break the file into large initial runs.

#. Merge the runs together to form a single sorted file.


Replacement Selection
~~~~~~~~~~~~~~~~~~~~~

This section treats the problem of creating initial runs as large as
possible from a disk file, assuming a fixed amount of RAM is available
for processing.
As mentioned previously, a simple approach is to
allocate as much RAM as possible to a large array, fill this array
from disk, and sort the array using
Quicksort.
Thus, if the size of memory available for the array is :math:`M`
records,
then the input file can be broken into initial runs of length `M`.
A better approach is to use an algorithm called
:term:`replacement selection` that, on average, creates runs of
:math:`2M` records in length. 
Replacement selection is actually a slight variation on the Heapsort
algorithm.
The fact that Heapsort is slower than Quicksort is
irrelevant in this context because I/O time will dominate the total
running time of any reasonable external sorting algorithm.
Building longer initial runs will reduce the total I/O time required.

Replacement selection views RAM as consisting of an array of
size :math:`M` in addition to an input buffer and an output buffer.
(Additional I/O buffers might be desirable if the
operating system supports double buffering,
because replacement selection does sequential
processing on both its input and its output.)
Imagine that the input and output files are streams of records.
Replacement selection takes the next record in sequential order from
the input stream when needed, and outputs runs one record at a
time to the output stream.
Buffering is used so that disk I/O is performed one block at a time.
A block of records is initially read and held in the input buffer.
Replacement selection removes records from the input buffer one at a 
time until the buffer is empty.
At this point the next block of records is read in.
Output to a buffer is similar:
Once the buffer fills up it is written to disk as a unit.
This process is illustrated by Figure :num:`Figure #RSOver`.

.. _RSOver:

.. inlineav:: extSortOverCON dgm
   :align: justify

   Overview of replacement selection.
   Input records are processed sequentially.
   Initially RAM is filled with :math:`M` records.
   As records are processed, they are written to an output buffer.
   When this buffer becomes full, it is written to disk.
   Meanwhile, as replacement selection needs records, it reads them
   from the input buffer.
   Whenever this buffer becomes empty, the next block of records is
   read from disk.

Replacement selection works as follows.
Assume that the main processing is done in an array of size :math:`M`
records.

#. Fill the array from disk.  Set ``LAST = M-1``.

#. Build a min-heap.
   (Recall that a min-heap is defined such that the
   record at each node has a key value *less* than the key values of
   its children.)

#. Repeat until the array is empty:

   (a) Send the record with the minimum key value (the root) to the
       output buffer.

   (b) Let :math:`R` be the next record in the input buffer.
       If :math:`R` 's key value is greater than the key value just output ...

       i. Then place :math:`R` at the root.

       ii. Else replace the root with the record in array position
           ``LAST``, and place :math:`R` at position ``LAST``.
           Set ``LAST = LAST - 1``.

   (c) Sift down the root to reorder the heap.

When the test at step 3(b) is successful, a new record is added
to the heap, eventually to be output as part of the run.
As long as records coming from the input file have key values
greater than the last key value output to the run, they can be safely
added to the heap.
Records with smaller key values cannot be output as
part of the current run because they would not be in sorted order.
Such values must be stored somewhere for future processing as part of
another run.
However, because the heap will shrink by one element in this case,
there is now a free space where the last element of the heap used to
be!
Thus, replacement selection will slowly shrink the heap and at the
same time use the discarded heap space to store records for the next
run.
Once the first run is complete (i.e., the heap becomes empty), the
array will be filled with records ready to be processed for the second
run.
Here is a visualization to show a run being created
by replacement selection.

.. inlineav:: extRSCON ss
   :output: show

It should be clear that the minimum length of a run will be :math:`M`
records if the size of the heap is :math:`M`, because at least those
records originally in the heap will be part of the run.
Under good conditions (e.g., if the input is sorted), then an
arbitrarily long run is possible.
In fact, the entire file could be processed as one run.
If conditions are bad (e.g., if the input is reverse sorted),
then runs of only size :math:`M` result.


What is the expected length of a run generated by replacement
selection?
It can be deduced from an analogy called the
:term:`snowplow argument`.
Imagine that a snowplow is going around a circular track during a
heavy, but steady, snowstorm.
After the plow has been around at least once, snow on 
the track must be as follows.
Immediately behind the plow, the track is empty because it was just
plowed.
The greatest level of snow on the track is immediately in front of the
plow, because this is the place least recently plowed.
At any instant, there is a certain amount of snow :math:`S` on the
track.
Snow is constantly falling throughout the track at a steady rate,
with some snow falling "in front" of the plow and some "behind"
the plow.
(On a circular track, everything is actually "in front" of
the plow, but Figure~\ref{SnowPlow} illustrates the idea.)
During the next revolution of the plow, all snow :math:`S` on the
track is removed, plus half of what falls.
Because everything is assumed to be in steady state, after one
revolution :math:`S` snow is still on the track, so :math:`2S` snow
must fall during a revolution, and :math:`2S` snow is removed during a
revolution (leaving :math:`S` snow behind).

.. _SnowPlow:

.. inlineav:: extSortSnowCON dgm
   :align: justify

   The snowplow analogy showing the action during one
   revolution of the snowplow.
   A circular track is laid out straight for purposes of illustration,
   and is shown in cross section.
   At any time :math:`T`, the most snow is directly in front of the
   snowplow.
   As the plow moves around the track, the same amount of snow is
   always in front of the plow.
   As the plow moves forward, less of this is snow that was in
   the track at time :math:`T`; more is snow that has fallen since.

At the beginning of replacement selection, nearly all values coming
from the input file are greater (i.e., "in front of the plow")
than the latest key value output for
this run, because the run's initial key values should be small.
As the run progresses, the latest key value output becomes greater and
so new key values coming from the input file are more likely to be too
small (i.e., "after the plow"); such records go to the bottom of
the array.
The total length of the run is expected to be twice the size of the
array.
Of course, this assumes that incoming key values are evenly distributed
within the key range (in terms of the snowplow analogy, we assume that
snow falls evenly throughout the track).
Sorted and reverse sorted inputs do not meet this expectation and so
change the length of the run.

.. avembed:: AV/Files/extRSPRO.html pe


Multiway Merging
----------------

The second stage of a typical external sorting algorithm merges the
runs created by the first stage.
Assume that we have :math:`R` runs to merge.
If a simple two-way merge is used, then :math:`R` runs
(regardless of their sizes) will require :math:`\log R` passes through
the file.
While :math:`R` should be much less than the total number of records
(because the initial runs should each contain many records),
we would like to reduce still further the number of passes required
to merge the runs together.
Note that two-way merging does not make good use of available memory.
Because merging is a sequential process on the two runs, only one block
of records per run need be in memory at a time.
Keeping more than one block of a run in memory at any time will
not reduce the disk I/O required by the merge process
(though if several blocks are read from a file at once time,
at least they take advantage of sequential access).
Thus, most of the space just used by the heap for replacement
selection (typically many blocks in length) is not being used by the
merge process.

We can make better use of this space and at the same time greatly
reduce the number of passes needed to merge the runs if we merge
several runs at a time.
Multiway merging is similar to two-way merging.
If we have :math:`B` runs to merge, with a block from each run
available in memory, then the :math:`B`-way merge algorithm simply
looks at :math:`B` values (the front-most value for each input run)
and selects the smallest one to output.
This value is removed from its run, and the process is repeated.
When the current block for any run is exhausted, the next block from
that run is read from disk.
The following slideshow illustrates a multiway merge.

.. inlineav:: extMultiMergeCON ss
   :output: show

Conceptually, multiway merge assumes that each run is stored in a
separate file.
However, this is not necessary in practice.
We only need to know the position of each run within a single file,
and use ``seek`` to move to the appropriate
block whenever we need new data from a particular run.
Naturally, this approach destroys the ability to do sequential
processing on the input file.
However, if all runs were stored on a single disk drive,
then processing would not be truly sequential anyway because the
I/O head would be alternating between the runs.
Thus, multiway merging replaces several (potentially) sequential
passes with a single random access pass.
If the processing would not be sequential anyway (such as when all
processing is on a single disk drive), no time is lost by doing so.

.. avembed:: AV/Files/extMultiMergePRO.html pe

Multiway merging can greatly reduce the number of passes required.
If there is room in memory to store one block for each run, then all
runs can be merged in a single pass.
Thus, replacement selection can build
initial runs in one pass, and multiway merging can merge all runs in
one pass, yielding a total cost of two passes.
However, for truly large files, there might be too many runs for each
to get a block in memory.
If there is room to allocate :math:`B` blocks for a :math:`B`-way
merge, and the number of runs :math:`R` is greater than :math:`B`,
then it will be necessary to do multiple merge passes.
In other words, the first :math:`B` runs are merged, then the next
:math:`B`, and so on.
These super-runs are then merged by subsequent passes,
:math:`B` super-runs at a time.

How big a file can be merged in one pass?
Assuming :math:`B` blocks were allocated to the heap for
replacement selection (resulting in runs of average length :math:`2B`
blocks), followed by a :math:`B`-way merge, we can process
on average a file of size \(2B^2\) blocks in a single multiway merge.
:math:`2B^{k+1}` blocks on average can be processed in :math:`k`
:math:`B`-way merges.
To gain some appreciation for how quickly this grows, assume that we
have available 0.5MB of working memory, and that a block is
4KB, yielding 128 blocks in working memory.
The average run size is 1MB (twice the working memory size).
In one pass, 128 runs can be merged.
Thus, a file of size 128MB can, on average, be processed in two
passes (one to build the runs, one to do the merge) with only
0.5MB of working memory.
As another example, assume blocks are 1KB long and working memory
is 1MB :math:`=` 1024 blocks.
Then 1024 runs of average length 2MB (which is about 2GB) can be
combined in a single merge pass.
A larger block size would reduce the size of the file that can be
processed in one merge pass for a fixed-size working memory; a smaller
block size or larger working memory would increase the file size that
can be processed in one merge pass.
Two merge passes allow much bigger files to be processed.
With 0.5MB of working memory and 4KB blocks,
a file of size 16~gigabytes could be processed in two merge passes,
which is big enough for most applications.
Thus, this is a very effective algorithm for single disk drive
external sorting.


Empirical Results
~~~~~~~~~~~~~~~~~

Table :num:`#ExSortTimes` shows a comparison of the running time to
sort various-sized files for the following implementations:
(1) standard Mergesort with two input runs and two output runs,
(2) two-way Mergesort with large initial runs (limited by the size of
available memory),
and (3) :math:`R`-way Mergesort performed after generating large
initial runs.
In each case, the file was composed of a series of four-byte records
(a two-byte key and a two-byte data value),
or 256K records per megabyte of file size.
We can see from this table that using even a modest memory size (two
blocks) to create initial runs results in a tremendous savings in
time.
Doing 4-way merges of the runs provides another considerable speedup,
however large-scale multi-way merges for :math:`R` beyond about 4 or 8
runs does not help much because a lot of time is spent determining
which is the next smallest element among the :math:`R` runs.

.. _ExSortTimes:

.. topic:: Table

   A comparison of three external sorts on a collection of small
   records for files of various sizes.
   Each entry in the table shows time in seconds and total number of
   blocks read and written by the program.
   File sizes are in Megabytes.
   For the third sorting algorithm, on a file size of 4MB, the time
   and blocks shown in the last column are for a 32-way merge
   (marked with an asterisk).
   32 is used instead of 16 because 32 is a root of the number of
   blocks in the file (while 16 is not), thus allowing the same number
   of runs to be merged at every pass.

   .. math::

      \begin{array}{|r|c|cccc|ccc|}
      \hline
      \textbf{File}&
      \textbf{Sort 1}&
      \textbf{Sort 2}&&&&
      \textbf{Sort 3}\\
      \textbf{Size}&&
      \textbf{Memory size (in blocks)}&&&&
      \textbf{Memory size (in blocks)}\\
      (Mb)&&\textbf{2} &
      \textbf{4} &
      \textbf{16} &
      \textbf{256} &
      \textbf{2} &
      \textbf{4} &
      \textbf{16}\\
      \hline
        1&   0.61 &   0.27 &   0.24 &   0.19 &   0.10 &   0.21 &   0.15 &   0.13\\
         &  4,864 &  2,048 &  1,792 &  1,280 &    256 &  2,048 &  1,024 &    512\\
      \hline
        4&   2.56 &   1.30 &   1.19 &   0.96 &   0.61 &   1.15 &   0.68 &   0.66*\\
         & 21,504 & 10,240 &  9,216 &  7,168 &  3,072 & 10,240 &  5,120 &  2,048\\
      \hline
       16&  11.28 &   6.12 &   5.63 &   4.78 &   3.36 &   5.42 &   3.19 &   3.10\\
         & 94,208 & 49,152 & 45,056 & 36,864 & 20,480 & 49,152 & 24,516 & 12,288\\
      \hline
      256& 220.39 & 132.47 & 123.68 & 110.01 &  86.66 & 115.73 &  69.31 &  68.71\\
         &  1,769K&  1,048K&    983K&    852K&    589K&  1,049K&    524K&   262K\\
      \hline
      \end{array}

We see from this experiment that building large initial runs reduces
the running time to slightly more than one third that of standard
Mergesort, depending on file and memory sizes.
Using a multi-way merge further cuts the time nearly in half.


Summary
~~~~~~~

In summary, a good external sorting algorithm will seek to do the
following:

* Make the initial runs as long as possible.

* At all stages, overlap input, processing, and output as much as
  possible.

* Use as much working memory as possible.
  Applying more memory usually speeds processing.
  In fact, more memory will have a greater effect than a faster disk.
  A faster CPU is unlikely to yield much improvement in running time
  for external sorting, because disk I/O speed is the limiting factor.

* If possible, use additional disk drives for more overlapping of
  processing with I/O, and to allow for sequential file
  processing.

.. odsascript:: DataStructures/binaryheap.js
.. odsascript:: AV/Files/extMergeSortCON.js
.. odsascript:: AV/Files/extMergeSortExampCON.js
.. odsascript:: AV/Files/extSortOverCON.js
.. odsascript:: AV/Files/extRSCON.js
.. odsascript:: AV/Files/extSortSnowCON.js
.. odsascript:: AV/Files/extMultiMergeCON.js
