.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

================================
File Processing and Buffer Pools
================================

Programmer’s View of Files
--------------------------

.. revealjs-slide::
   
* Logical view of files:

  * An a array of bytes.
  * A file pointer marks the current position.

* Three fundamental operations:

  * Read bytes from current position (move file pointer)
  * Write bytes to current position (move file pointer)
  * Set file pointer to specified byte position.


Java File Functions
-------------------

.. revealjs-slide::
   
* ``RandomAccessFile(String name, String mode)``

* ``close()``

* ``read(byte[] b)``

* ``write(byte[] b)``

*    ``seek(long pos)``


Primary vs. Secondary Storage
-----------------------------

.. revealjs-slide::
   
* Primary storage: Main memory (RAM)

* Secondary Storage: Peripheral devices

  * Disk drives
  * Tape drives
  * Flash drives


Comparisons
-----------

.. revealjs-slide::
   
.. math::

   \begin{array}{l|r|r|r|r|r|r|r}
   \hline
   \textbf{Medium}& 1996 & 1997 & 2000 & 2004 & 2006 & 2008 & 2011\\
   \hline
   \textbf{RAM}&    \$45.00 & 7.00 & 1.500 & 0.3500 & 0.1500 & 0.0339 & 0.0138\\
   \textbf{Disk}&      0.25 & 0.10 & 0.010 & 0.0010 & 0.0005 & 0.0001 & 0.0001\\
   \textbf{USB drive}& -- & --   & --    & 0.1000 & 0.0900 & 0.0029 & 0.0018\\
   \textbf{Floppy}&    0.50 & 0.36 & 0.250 & 0.2500 & -- & -- & --\\
   \textbf{Tape}&      0.03 & 0.01 & 0.001 & 0.0003 & -- & -- & --\\
   \textbf{Solid State}& -- & --   &  --   &  --    & -- & -- & 0.0021\\
   \hline
   \end{array}

* (Costs per Megabyte)

* RAM is usually volatile.

* RAM is about 1/2 million times faster than disk.


Golden Rule of File Processing
------------------------------

.. revealjs-slide::
   
* Minimize the number of disk accesses!

  #. Arrange information so that you get what you want with few disk
     accesses.
  #. Arrange information to minimize future disk accesses.

* An organization for data on disk is often called a file structure.

* Disk-based space/time tradeoff: Compress information to save
  processing time by reducing disk accesses.


Disk Drives
-----------

.. revealjs-slide::
   
.. image:: /Images/Plat.png
   :width: 600
   :align: center
   :alt: Disk drive platters


Sectors
-------

.. revealjs-slide::
   
.. image:: /Images/Disk.png
   :width: 600
   :align: center
   :alt: The organization of a disk platter

* A sector is the basic unit of I/O.


Terms
-----

.. revealjs-slide::
   
* **Locality of Reference**: When record is read from disk, next request is
  likely to come from near the same place on the disk.

* **Cluster**: Smallest unit of file allocation,  usually several sectors.

* **Extent**: A group of physically contiguous clusters.

* **Internal fragmentation**: Wasted space within sector if record
  size does not match sector size; wasted space within cluster if
  file size is not a multiple of cluster size.


Seek Time
---------

.. revealjs-slide::
   
* **Seek time**: Time for I/O head to reach desired track.
  Largely determined by distance between I/O head and desired
  track.

* **Track-to-track time**: Minimum time to move from one track to
  an adjacent track.

* **Average Access time**: Average time to reach a track for random access.


Other Factors
-------------

.. revealjs-slide::
   
* **Rotational Delay** or **Latency**: Time for data to rotate under I/O head.

  * One half of a rotation on average.
  * At 7200 rpm, this is 8.3/2 = 4.2ms.

* **Transfer time**: Time for data to move under the I/O head.

  * At 7200 rpm: Number of sectors read/Number of sectors per track *
    8.3ms.


(Old) Disk Spec Example
-----------------------

.. revealjs-slide::
   
* 16.8 GB disk on 10 platters = 1.68GB/platter
* 13,085 tracks/platter
* 256 sectors/track
* 512 bytes/sector
* Track-to-track seek time: 2.2 ms
* Average seek time: 9.5ms
* 4KB clusters, 32 clusters/track.
* 5400RPM


Disk Access Cost Example (1)
----------------------------

.. revealjs-slide::
   
* Read a 1MB file divided into 2048 records of 512 bytes (1 sector)
  each.

* Assume all records are on 8 contiguous tracks.

* First track: 9.5 + (11.1)(1.5) = 26.2 ms

* Remaining 7 tracks: 2.2 + (11.1)(1.5) = 18.9ms.

* Total: 26.2 + 7 * 18.9 = 158.5ms


Disk Access Cost Example (2)
----------------------------

.. revealjs-slide::
   

* Read a 1MB file divided into 2048 records of 512 bytes (1 sector)
  each.

* Assume all file clusters are randomly spread across the disk.

* 256 clusters.  Cluster read time is 8/256 of a rotation for about
  5.9ms for both latency and read time.

* 256(9.5 + 5.9) is about 3942ms or nearly 4 sec.


How Much to Read?
-----------------

.. revealjs-slide::
   
* Read time for one track:
  :math:`9.5 + (11.1)(1.5) = 26.2` ms

* Read time for one sector:
  :math:`9.5 + 11.1/2 + (1/256)11.1 = 15.1` ms

* Read time for one byte:
  :math:`9.5 + 11.1/2 = 15.05` ms

* Nearly all disk drives read/write one sector (or more) at every I/O
  access

* Also referred to as a page or block


Newer Disk Spec Example
-----------------------

.. revealjs-slide::
   
* Samsung Spinpoint T166
* 500GB (nominal)
* 7200 RPM
* Track to track: 0.8 ms
* Average track access: 8.9 ms
* Bytes/sector: 512
* 6 surfaces/heads


Buffers
-------

.. revealjs-slide::
   
* The information in a sector is stored in a buffer or cache.

* If the next I/O access is to the same buffer, then no need to go to
  disk.

* Disk drives usually have one or more input buffers and one or more
  output buffers.


Buffer Pools
------------

.. revealjs-slide::
   
* A series of buffers used by an application to cache disk data is
  called a buffer pool.

* Virtual memory uses a buffer pool to imitate greater RAM memory by
  actually storing information on disk and “swapping” between disk
  and RAM.


Buffer Pools
------------

.. revealjs-slide::
   
.. inlineav:: buffintroCON ss
   :long_name: Buffer Pool Introduction Slideshow
   :align: center
   :links: AV/Files/buffpoolCON.css 
   :scripts: AV/Files/buffintroCON.js
   :output: show


Organizing Buffer Pools
-----------------------

.. revealjs-slide::
   
* Which buffer should be replaced when new data must be read?

* First-in, First-out: Use the first one on the queue.

* Least Frequently Used (LFU): Count buffer accesses, reuse the least
  used.

* Least Recently used (LRU): Keep buffers on a linked list.  When
  buffer is accessed, bring it to front.  Reuse the one at end.


LRU
---

.. revealjs-slide::
   
.. inlineav:: LRUCON ss
   :long_name: LRU Replacement Slideshow
   :align: center
   :links: AV/Files/buffpoolCON.css 
   :scripts: AV/Files/LRUCON.js
   :output: show


Dirty Bit
---------

.. revealjs-slide::
   
.. inlineav:: LRUwriteCON ss
   :long_name: LRU Replacement with write Slideshow
   :align: center
   :links: AV/Files/buffpoolCON.css 
   :scripts: AV/Files/LRUwriteCON.js
   :output: show


Bufferpool ADT: Message Passing
-------------------------------

.. revealjs-slide::
   
.. codeinclude:: BufferPool/BuffMsgADT


Bufferpool ADT: Buffer Passing
------------------------------

.. revealjs-slide::
   
.. codeinclude:: BufferPool/BuffBuffADT


Design Issues
-------------

.. revealjs-slide::
   
* Disadvantage of message passing:

  * Messages are copied and passed back and forth.

* Disadvantages of buffer passing:

  * The user is given access to system memory (the buffer itself)
  * The user must explicitly tell the buffer pool when buffer contents
    have been modified, so that modified data can be rewritten to disk
    when the buffer is flushed.
  * The pointer might become stale when the bufferpool replaces the
    contents of a buffer.


Some Goals
----------

.. revealjs-slide::
   
* Be able to avoid reading data when the block contents will be
  replaced.
* Be able to support multiple users accessing a buffer, and
  independently releasing a buffer.
* Don’t make an active buffer stale.


Improved Interface
------------------

.. revealjs-slide::
   
.. codeinclude:: BufferPool/BufferADT


Improved Interface (2)
----------------------

.. revealjs-slide::

.. codeinclude:: BufferPool/BufferPoolADT


