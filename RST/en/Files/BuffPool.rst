.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: disk drives
   :satisfies: buffer pool
   :topic: File Processing

.. odsalink:: AV/Files/buffpoolCON.css      

Buffer Pools
============

Buffer Pools
------------

Given a :ref:`disk drive <DiskExamp>`
rotating at 5400 rpm, :term:`average seek time` of 9.5ms,
and :term:`track-to-track seek time` of 2.2ms,
we can calculate that it takes about
:math:`9.5 + 11.1 \times 1.5 = 26.2` ms
to read one :term:`track` of data on average.
It takes about
:math:`9.5 + 11.1/2 + (1/256)\times11.1 = 15.1` ms on average
to read a single :term:`sector` of data.
This is a good savings (slightly over half the time), but
less than 1% of the data on the track are read.
If we want to read only a single byte, it would save us effectively no
time over that required to read an entire sector.
For this reason, nearly all disk drives automatically read or write
an entire sector's worth of information whenever the disk is
accessed, even when only one byte of information is requested.

Once a sector is read, its information is stored in main memory.
This is known as :term:`buffering` or :term:`caching` the information.
If the next disk request is to that same sector, then
it is not necessary to read from disk again because the information is
already stored in main memory.
Buffering is an example of a standard method for minimizing disk
accesses:
Bring off additional information from disk to satisfy future
requests.
If information from files were accessed at random, then the
chance that two consecutive disk requests are to the same sector
would be low.
However, in practice most disk requests are close to the location
(in the logical file at least) of the previous request,
a concept referred to as :term:`locality of reference`.
This means that the probability of the next request
"hitting the cache" is much higher than chance would indicate.

This principle explains one reason why average access times for new
:term:`disk drives <disk drive>` are lower than in the past.
Not only is the hardware faster, but information is also now stored
using better algorithms and larger caches that minimize the number
of times information needs to be fetched from disk.
This same concept is also used to store parts of programs in faster
memory within the CPU, using the CPU cache that is
prevalent in modern microprocessors.

Sector-level buffering is normally provided by the operating system
and is often built directly into the disk drive controller hardware.
Most operating systems maintain at least two buffers,
one for input and one for output.
Consider what would happen if there were only one buffer during a
byte-by-byte copy operation.
The sector containing the first byte would be read into the I/O
buffer.
The output operation would need to destroy the contents of the single
I/O buffer to write this byte.
Then the buffer would need to be filled again from disk for the
second byte, only to be destroyed during output.
The simple solution to this problem is to keep one buffer for input,
and a second for output.

Most disk drive controllers operate independently
from the CPU once an I/O request is received.
This is useful because the CPU can typically execute millions of
instructions during the time required for a single I/O operation.
A technique that takes maximum advantage of this micro-parallelism is
:term:`double buffering`.
Imagine that a file is being processed sequentially.
While the first sector is being read, the CPU cannot process that
information and so must wait or find something else to do in the
meantime.
Once the first sector is read, the CPU can start processing
while the disk drive (in parallel) begins reading
the second sector.
If the time required for the CPU to process a sector is approximately
the same as the time required by the disk controller to read a sector,
it might be possible to keep the CPU continuously fed with data from
the file.
The same concept can also be applied to output, writing one sector to
disk while the CPU is writing to a second output buffer in memory.
Thus, in an operationg system that support double buffering, it pays
to have at least two input buffers and two output buffers available.

Caching information in memory is such a good idea that
it is usually extended to multiple buffers.
The operating system
or an application program might store many buffers of information
taken from some :term:`backing storage` such as a disk file.
This process of using buffers as an intermediary between a user and a
disk file is called :term:`buffering` the file.
The information stored in a buffer is often called a :term:`page`, and
the collection of buffers is called a :term:`buffer pool`.
The goal of the buffer pool is to increase the amount of information
stored in memory in hopes of increasing the likelihood that new
information requests can be satisfied from the buffer pool rather
than requiring new information to be read from disk.

.. inlineav:: buffintroCON ss
   :align: center
   :output: show


Replacement Strategies
~~~~~~~~~~~~~~~~~~~~~~

As long as there is an unused buffer available in the buffer pool,
new information can be read in from disk on demand.
When an application continues to read new information from
disk, eventually all of the buffers in the buffer pool will become
full.
Once this happens, some decision must be made about what information
in the buffer pool will be sacrificed to make room for newly
requested information.

When replacing information contained in the buffer pool,
the goal is to select a buffer that has "unnecessary"
information, that is, the information least likely to be requested
again.
Because the buffer pool cannot know for certain what the pattern of
future requests will look like, a decision based on some
:term:`heuristic`, or best guess, must be used.
There are several approaches to making this decision.

One heuristic is :term:`first-in, first-out <FIFO>`.
This scheme simply orders the buffers in a queue.
The buffer at the front of the queue is used next to store new
information and then placed at the end of the queue.
In this way, the buffer to be replaced is the one that has held its
information the longest, in hopes that this information is no longer
needed.
This is a reasonable assumption when processing moves along the file
at some steady pace in roughly sequential order.
However, many programs work with certain key pieces of
information over and over again, and the importance of information has
little to do with how long ago the information was first accessed.
Typically it is more important to know how many times the information
has been accessed, or how recently the information was last accessed.

Another approach is called :term:`least frequently used` (:term:`LFU`).
LFU tracks the number of accesses to each buffer in the
buffer pool.
When a buffer must be reused, the buffer that
has been accessed the fewest number of times is considered to contain
the "least important" information, and so it is used next.
LFU, while it seems intuitively reasonable, has many drawbacks.
First, it is necessary to store and update access counts for each buffer.
Second, what was referenced many times in the past might now be
irrelevant.
Thus, some time mechanism where counts "expire" is often desirable.
This also avoids the problem of buffers that slowly build up big
counts because they get used just often enough to avoid being
replaced.
An alternative is to maintain counts for all sectors ever read, not
just the sectors currently in the buffer pool.
This avoids immediately replacing the buffer just read, which has not
yet had time to build a high access count.

The third approach is called :term:`least recently used`
(:term:`LRU`).
LRU simply keeps the buffers in a list.
Whenever information in a buffer is accessed, this buffer is brought
to the front of the list.
When new information must be read, the buffer at the back of the
list (the one least recently used) is taken and its "old"
information is either discarded or written to disk, as appropriate.
This is an easily implemented approximation to LFU and is often the
method of choice for managing buffer pools unless
special knowledge about information access patterns for an application
suggests a special-purpose buffer management scheme.

.. inlineav:: LRUCON ss
   :align: center
   :output: show


The Dirty Bit
~~~~~~~~~~~~~

The main purpose of a buffer pool is to minimize disk I/O.
When the contents of a block are modified, we could write the updated
information to disk immediately.
But what if the block is changed again?
If we write the block's contents after every change, that might be a
lot of disk write operations that can be avoided.
It is more efficient to wait until either the file is to be closed,
or the contents of the buffer containing that block is to be flushed
from the buffer pool.

When a buffer's contents are to be replaced in the buffer pool,
we only want to write the contents to disk if it is necessary.
That would be necessary only if the contents have changed since the
block was read in originally from the file.
The way to insure that the block is written when necessary, but only
when necessary, is to maintain a Boolean variable with the buffer
(often referred to as the :term:`dirty bit`) that is turned on when
the buffer's contents are modified by the client.
At the time when the block is flushed from the buffer pool, it is
written to disk if and only if the dirty bit has been turned on.

.. inlineav:: LRUwriteCON ss
   :align: center
   :output: show

Modern operating systems support :term:`virtual memory`.
Virtual memory is a technique that allows the programmer to write
programs as though there is more of the faster main memory (such as
RAM) than actually exists.
Virtual memory makes use of a buffer pool to store data read from
blocks on slower, secondary memory (such as on the disk drive).
The disk stores the complete contents of the virtual memory.
Blocks are read into main memory as demanded by memory accesses.
Naturally, programs using virtual memory techniques are slower than
programs whose data are stored completely in main memory.
The advantage is reduced programmer effort because a good virtual memory
system provides the appearance of larger main memory without
modifying the program.

.. inlineav:: buffpoolCON ss
   :output: show

|

.. inlineav:: buffpooldgmCON dgm
   :output: show

Here is a visualization to let you experiment with the various buffer
pool replacement strategies.

.. avembed:: AV/Files/BufferPoolAV.html ss

Here is an exercise to help you practice.

.. avembed:: AV/Files/bufferpoolPRO.html pe


Implementing Buffer Pools
~~~~~~~~~~~~~~~~~~~~~~~~~

When implementing buffer pools, there are two basic approaches that can 
be taken regarding the transfer of information between the user of the 
buffer pool and the buffer pool class itself.
The first approach is to pass "messages" between the two.
This approach is illustrated by the following abstract class:

.. codeinclude:: BufferPool/BuffMsgADT

This simple class provides an interface with two member functions,
``insert`` and ``getbytes``.
The information is passed between the buffer pool user and the
buffer pool through the ``space`` parameter.
This is storage space, provided by the bufferpool client and at least
``sz`` bytes long, which the 
buffer pool can take information from (the ``insert`` function) or
put information into (the ``getbytes`` function).
Parameter ``pos`` indicates where the information will be placed
in the buffer pool's logical storage space.
Physically, it will actually be copied to the appropriate byte
position in some buffer in the buffer pool.
This ADT is similar to the ``read`` and ``write`` methods of the
:ref:`RandomAccessFile <FileProg>` class of Java.

.. _ExampleBuffer:

.. topic:: Example

   Assume each sector of the disk file (and thus each block in the
   buffer pool) stores 1024 bytes.
   If the next request is to copy 40 bytes beginning at position 6000 of
   the file, these bytes should be placed into Sector 5 (whose bytes go
   from position 5120 to position 6143).

An alternative interface is to have the buffer pool provide to the
user a direct pointer to a buffer that contains the requested
information.
Such an interface might look as follows:

.. codeinclude:: BufferPool/BuffBuffADT

In this approach, the buffer pool user is made aware that the
storage space is divided into blocks of a given size, where each block
is the size of a buffer.
The user requests specific blocks from the buffer pool, with a pointer
to the buffer holding the requested block being returned to the user.
The user might then read from or write to this space.
If the user writes to the space, the buffer pool must be informed of
this fact.
The reason is that, when a given block is to be removed from the
buffer pool, the contents of that block must be written to the backing
storage if it has been modified.
If the block has not been modified, then it is unnecessary to write it 
out.

.. topic:: Example

   We wish to write 40 bytes beginning at logical position 6000 in
   the file.
   Using the second ADT, the client would need to know that blocks
   (buffers) are of size 1024, and therefore would request access to
   Sector 5.
   A pointer to the buffer containing Sector 5 would be returned by
   the call to ``getblock``.
   The client would then copy 40 bytes to positions 880-919 of the
   buffer, and call ``dirtyblock`` to warn the buffer pool that the
   contents of this block have been modified.

A variation on this approach is to have the ``getblock`` function
take another parameter to indicate the "mode" of use for the
information.
If the mode is READ then the buffer pool assumes that no changes will
be made to the buffer's contents (and so no write operation need be
done when the buffer is reused to store another block).
If the mode is WRITE then the buffer pool assumes that the client will
not look at the contents of the buffer and so no read from the file is
necessary.
If the mode is READ AND WRITE then the buffer pool would read the
existing contents of the block in from disk, and write the contents of
the buffer to disk when the buffer is to be reused.
Using the "mode" approach, the ``dirtyblock`` method is avoided.

One problem with the buffer-passing ADT is the risk of
:term:`stale pointers <stale pointer>`.
When the buffer pool user is given a pointer to some buffer
space at time **T1**, that pointer does indeed refer to the desired
data at that time.
As further requests are made to the buffer pool, it is possible that
the data in any given buffer will be removed and replaced with new
data.
If the buffer pool user at a later time **T2** then refers to the
data referred to by the pointer given at time **T1**, it is possible 
that the data are no longer valid because the buffer contents have
been replaced in the meantime.
Thus the pointer into the buffer pool's memory has become "stale".
To guarantee that a pointer is not stale, it should not be used if
intervening requests to the buffer pool have taken place.

We can solve this problem by introducing the concept of a user (or
possibly multiple users) gaining access to a buffer, and then
releasing the buffer when done.
We will add method ``acquireBuffer`` and ``releaseBuffer`` for
this purpose.
Method ``acquireBuffer`` takes a block ID as input and returns a
pointer to the buffer that will be used to store this block.
The buffer pool will keep a count of the number of requests currently
active for this block.
Method ``releaseBuffer`` will reduce the count of active users for
the associated block.
Buffers associated with active blocks will not be eligible for
flushing from the buffer pool.
This will lead to a problem if the client neglects to release active
blocks when they are no longer needed.
There would also be a problem if there were more total active blocks
than buffers in the buffer pool.
So, the buffer pool should be initialized to include more
buffers than will ever need to be active at one time.

An additional problem with both ADTs presented so far comes when the
user intends to completely overwrite the contents of a block, and does
not need to read in the old contents already on disk.
However, the buffer pool cannot in general know whether the user
wishes to use the old contents or not.
This is especially true with the message-passing approach where a
given message might overwrite only part of the block.
In this case, the block will be read into memory even when not needed,
and then its contents will be overwritten.

This inefficiency can be avoided (at least in the buffer-passing
version) by separating the assignment of
blocks to buffers from actually reading in data for the block.
In particular, the following revised buffer-passing ADT does not
actually read data in the ``acquireBuffer`` method.
Users who wish to see the old contents must then issue a
``readBlock`` request to read the data from disk into the buffer.

.. codeinclude:: BufferPool/BufferADT

.. codeinclude:: BufferPool/BufferPoolADT

Again, a mode parameter could be added to the ``acquireBuffer``
method, eliminating the need for the ``readBlock`` and
``markDirty`` methods.

Clearly, the buffer-passing approach places more obligations on the
user of the buffer pool.
These obligations include knowing the size of a block, not corrupting
the buffer pool's storage space, and informing the buffer pool both
when a block has been modified and when it is no longer needed.
So many obligations make this approach prone to error.
An advantage is that there is no need to do an extra copy step when
getting information from the user to the buffer.
If the size of the records stored is small, this is not an important
consideration.
If the size of the records is large (especially if the record size and 
the buffer size are the same, as typically is the case when
implementing :ref:`B-trees <B-tree> <BTree>`, then this efficiency
issue might become important.
Note however that the in-memory copy time will always be far less than
the time required to write the contents of a buffer to disk.
For applications where disk I/O is the bottleneck for the program,
even the time to copy lots of information between the buffer pool user
and the buffer might be inconsequential.
Another advantage to buffer passing is the reduction in unnecessary
read operations for data that will be overwritten anyway.

Note that using Java generics would not be appropriate for use in the
buffer pool implementation.
In our ADTs, the ``space`` parameter and the buffer pointer are declared
to be ``byte[]``
When a class uses a Java generic, that means that the record type is
arbitrary, but that the class knows what the record type is.
In contrast, using ``byte[]`` for the space means that not 
only is the record type arbitrary, but also the buffer pool does not
even know what the user's record type is.
In fact, a given buffer pool might have many users who store many types 
of records.

In a buffer pool, the user decides where a given record will be stored
but has no control over the precise mechanism by which data are
transferred to the backing storage.
This is in contrast to the :ref:`memory manager <MemmanIntro>`, in
which the user passes a record to the manager and has no control at
all over where the record is stored.

.. odsascript:: AV/Files/buffintroCON.js
.. odsascript:: AV/Files/LRUCON.js
.. odsascript:: AV/Files/LRUwriteCON.js
.. odsascript:: AV/Files/buffpoolCON.js
.. odsascript:: AV/Files/buffpooldgmCON.js
