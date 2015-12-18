.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :topic: File Processing

The Programmer's View of Files
==============================

The programmer's logical view of a random access file is a single array of bytes.
Interaction with a file can be viewed as a communications
channel for issuing one of three instructions: read bytes from the
current position in the file, write bytes to the current position in
the file, and move the current position within the file.
You do not normally see how the bytes are stored on the disk in sectors,
clusters, and so forth.
The mapping from logical to physical addresses is done by the file
system, and sector-level buffering is done automatically by the
:term:`disk controller`.

When processing records in a disk file, the order of access can have a
great effect on I/O time.
A :term:`random access` procedure processes records in an order independent
of their logical order within the file.
:term:`Sequential access` processes records in order of their logical
appearance within the file.
Sequential processing requires less seek time if the physical layout
of the disk file matches its logical layout, as would be expected if
the file were created on a disk with a high percentage of free space.

Java provides several mechanisms for manipulating disk files.
One of the most commonly used is the ``RandomAccessFile`` class.
The following methods can be used to manipulate information in the
file.

* ``RandomAccessFile(String name, String mode)``: Class constructor,
  opens a disk file for processing.

* ``read(byte[] b)``: Read some bytes from the current position in
  the file. The current position moves forward as the bytes are read.

* ``write(byte[] b)``: Write some bytes at the current position in
  the file (overwriting the bytes already at that position).
  The current position moves forward as the bytes are written.

* ``seek(long pos)``:
  Move the current position in the file to ``pos``.
  This allows bytes at arbitrary places within the file to be read or
  written.
* ``close()``: Close a file at the end of processing.

Note that the spirit if this ADT is similar to
:ref:`message passing <message passing> <BuffPool>`
version of the ADT for :term:`buffer pools <buffer pool>`.
