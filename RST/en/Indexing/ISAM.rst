.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: Indexing

ISAM
====

How do we handle large databases that require frequent update?
The main problem with the linear index is that it is a single, large
array that does not adjust well to updates because a single update can
require changing the position of every key in the index.
Inverted lists reduce this problem, but they are only suitable for
secondary key indices with many fewer secondary key values than records.
The linear index would perform well as a primary key index if it could
somehow be broken into pieces such that individual updates affect only
a part of the index.
This concept will be pursued throughout the rest of this chapter,
eventually culminating in the
:math:`\mathrm{B}^+` Tree
the most widely used indexing method today.
But first, we begin by studying ISAM, an early attempt to solve the
problem of large databases requiring frequent update.
Its weaknesses help to illustrate why the :math:`\mathrm{B}^+` Tree
works so well.

Before the invention of effective tree indexing
schemes, a variety of disk-based indexing methods were in use.
All were rather cumbersome, largely because no adequate method for
handling updates was known.
Typically, updates would cause the index to degrade in performance.
ISAM is one example of such an index and was
widely used by IBM prior to adoption of the B-tree.

.. _ISAMfig:

.. odsafig:: Images/ISAM.png
   :width: 150
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Illustration of the ISAM indexing system

   Illustration of the ISAM indexing system.

ISAM is based on a modified form of the :term:`linear index`, as
illustrated by Figure :num:`Figure #ISAMfig`.
Records are stored in sorted order by primary key.
The disk file is divided among a number of
:term:`cylinders <cylinder>` on disk.
Each cylinder holds a section of the list in sorted order.
Initially, each cylinder is not filled to capacity, and the extra
space is set aside in the :term:`cylinder overflow`.
In memory is a table listing the lowest key value stored in each
cylinder of the file.
Each cylinder contains a table listing the lowest key value for
each block in that cylinder, called the :term:`cylinder index`.
When new records are inserted, they are placed in the correct
cylinder's overflow area (in effect, a cylinder acts as a bucket).
If a cylinder's overflow area fills completely, then a system-wide
overflow area is used.
Search proceeds by determining the proper cylinder from the
system-wide table kept in main memory.
The cylinder's block table is brought in from disk and
consulted to determine the correct block.
If the record is found in that block, then the search is complete.
Otherwise, the cylinder's overflow area is searched.
If that is full, and the record is not found, then the system-wide
overflow is searched.

After initial construction of the database,
so long as no new records are inserted or deleted, access is
efficient because it requires only two disk fetches.
The first disk fetch recovers the block table for the desired
cylinder.
The second disk fetch recovers the block that, under good conditions,
contains the record.
After many inserts, the overflow list becomes too long, resulting in
significant search time as the cylinder overflow area fills up.
Under extreme conditions, many searches might eventually lead to the
system overflow area.
The "solution" to this problem is to periodically reorganize the
entire database.
This means re-balancing the records among the cylinders, sorting
the records within each cylinder, and updating both the system
index table and the within-cylinder block table.
Such reorganization was typical of database systems during the 1960s
and would normally be done each night or weekly.
