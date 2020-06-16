.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

===========
Disk Drives
===========

Disk Drives
-----------

.. slide:: Programmer’s View of Files

   * Logical view of files:
      * An a array of bytes.
      * A file pointer marks the current position.

   * Three fundamental operations:
      * Read bytes from current position (move file pointer)
      * Write bytes to current position (move file pointer)
      * Set file pointer to specified byte position.


.. slide:: Java File Functions

   ``RandomAccessFile(String name, String mode)``

   ``close()``

   ``read(byte[] b)``

   ``write(byte[] b)``

   ``seek(long pos)``


.. slide:: Primary vs. Secondary Storage

   * Primary storage: Main memory (RAM)

   * Secondary Storage: Peripheral devices
      * Disk drives
      * Tape drives
      * Flash drives


.. slide:: Comparisons


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


.. slide:: Golden Rule of File Processing

   * Minimize the number of disk accesses!
      #. Arrange information so that you get what you want with few disk
         accesses.
      #. Arrange information to minimize future disk accesses.

   * An organization for data on disk is often called a file structure.

   * Disk-based space/time tradeoff: Compress information to save
     processing time by reducing disk accesses.


.. slide:: Disk Drives


   .. odsafig:: Images/Plat.png
      :width: 600
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Disk drive platters



.. slide:: Sectors

   .. odsafig:: Images/Disk.png
      :width: 600
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: The organization of a disk platter

   * A sector is the basic unit of I/O.


.. slide:: Terms

   * **Locality of Reference**: When record is read from disk, next request is
     likely to come from near the same place on the disk.

   * **Cluster**: Smallest unit of file allocation,  usually several sectors.

   * **Extent**: A group of physically contiguous clusters.

   * **Internal fragmentation**: Wasted space within sector if record
     size does not match sector size; wasted space within cluster if
     file size is not a multiple of cluster size.


.. slide:: Seek Time

   * **Seek time**: Time for I/O head to reach desired track.
     Largely determined by distance between I/O head and desired
     track.

   * **Track-to-track time**: Minimum time to move from one track to
     an adjacent track.

   * **Average Access time**: Average time to reach a track for random access.


.. slide:: Other Factors

   * **Rotational Delay** or **Latency**: Time for data to rotate under I/O head.
      * One half of a rotation on average.
      * At 7200 rpm, this is 8.3/2 = 4.2ms.

   * **Transfer time**: Time for data to move under the I/O head.
      * At 7200 rpm: Number of sectors read/Number of sectors per track *
        8.3ms.


.. slide:: (Old) Disk Spec Example

   * 16.8 GB disk on 10 platters = 1.68GB/platter
   * 13,085 tracks/platter
   * 256 sectors/track
   * 512 bytes/sector
   * Track-to-track seek time: 2.2 ms
   * Average seek time: 9.5ms
   * 4KB clusters, 32 clusters/track.
   * 5400RPM


.. slide:: Disk Access Cost Example (1)

   * Read a 1MB file divided into 2048 records of 512 bytes (1 sector)
     each.

   * Assume all records are on 8 contiguous tracks.

   * First track: 9.5 + (11.1)(1.5) = 26.2 ms

   * Remaining 7 tracks: 2.2 + (11.1)(1.5) = 18.9ms.

   * Total: 26.2 + 7 * 18.9 = 158.5ms


.. slide:: Disk Access Cost Example (2)

   * Read a 1MB file divided into 2048 records of 512 bytes (1 sector)
     each.

   * Assume all file clusters are randomly spread across the disk.

   * 256 clusters.  Cluster read time is 8/256 of a rotation for about
     5.9ms for both latency and read time.

   * 256(9.5 + 5.9) is about 3942ms or nearly 4 sec.


.. slide:: How Much to Read?

   * Read time for one track:
     :math:`9.5 + (11.1)(1.5) = 26.2` ms

   * Read time for one sector:
     :math:`9.5 + 11.1/2 + (1/256)11.1 = 15.1` ms

   * Read time for one byte:
     :math:`9.5 + 11.1/2 = 15.05` ms

   * Nearly all disk drives read/write one sector (or more) at every I/O
     access

   * Also referred to as a page or block


.. slide:: Newer Disk Spec Example

   * Samsung Spinpoint T166
   * 500GB (nominal)
   * 7200 RPM
   * Track to track: 0.8 ms
   * Average track access: 8.9 ms
   * Bytes/sector: 512
   * 6 surfaces/heads


.. slide:: Buffers

   * The information in a sector is stored in a buffer or cache.

   * If the next I/O access is to the same buffer, then no need to go to
     disk.

   * Disk drives usually have one or more input buffers and one or more
     output buffers.
