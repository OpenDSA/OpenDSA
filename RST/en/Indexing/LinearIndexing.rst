.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: indexing
   :satisfies: linear indexing
   :topic: Indexing
   
.. odsalink:: AV/Indexing/linearIndexingCON.css

Linear Indexing
===============

Linear Indexing
---------------

A :term:`linear index` is an :term:`index file` organized as a
sequence of :term:`key-value pairs <key-value pair>` where the
:term:`keys <key>` are in sorted order and the pointers either
(1) point to the position of the complete record on disk,
(2) point to the position of the :term:`primary key` in the primary
index, or
(3) are actually the value of the primary key.
Depending on its size, a linear index might be stored in main
memory or on disk.
A linear index provides a number of advantages.
It provides convenient access to variable-length database records,
because each entry in the index file contains a fixed-length key field
and a fixed-length pointer to the beginning of a (variable-length)
record as shown in the following slideshow
A linear index also allows for efficient search and random access to
database records, because it is amenable to
:ref:`binary search <binary search> <ProgAnal>`.

.. inlineav:: varindexCON ss
   :output: show

If the database contains enough records, the linear index might
be too large to store in :term:`main memory`.
This makes binary search of the index more expensive because many
:term:`disk accesses <disk access>` would typically be required by the
search process.
One solution to this problem is to store a second-level linear index
in main memory that indicates which disk block in the index file
stores a desired key.
For example, the linear index on disk might reside in a series of
1024-byte blocks.
If each key/pointer pair in the linear index requires 8~bytes
(a 4-byte key and a 4-byte pointer), then
128 key/pointer pairs are stored per block.
The second-level index, stored in main memory, consists of a simple
table storing the value of the key in the first position of each block
in the linear index file.
This arrangement is shown in the next slideshow.
If the linear index requires 1024 disk blocks (1MB), the second-level
index contains only 1024 entries, one per disk block.

.. TODO::
   :type: Explanation

   The slideshow should subsume the next paragraph and the caption.

To find which disk block contains a desired search key value,
first search through the 1024-entry table to
find the greatest value less than or equal to the search key.
This directs the search to the proper block in the index file, which
is then read into memory.
At this point, a binary search within this block
will produce a pointer to the actual record in the database.
Because the second-level index is stored in main memory,
accessing a record by this method requires two disk reads:
one from the index file and one from the database file for the actual
record.

.. inlineav:: linindexCON ss
   :output: show
   :align: justify

   A simple two-level linear index.
   The linear index is stored on disk.
   The smaller, second-level index is stored in main memory.
   Each element in the second-level index stores the first key value in
   the corresponding disk block of the index file.
   In this example, the first disk block of the linear index stores keys
   in the range 1 to 2001, and the second disk block stores keys in the
   range 2003 to 5688.
   Thus, the first entry of the second-level index is key value 1
   (the first key in the first block of the linear index), while the
   second entry of the second-level index is key value 2003.

.. avembed:: AV/Indexing/linearIndexingPRO.html pe

Every time a record is inserted to or deleted from the database,
all associated secondary indices must be updated.
Updates to a linear index are expensive, because the
entire contents of the array might be shifted.
Another problem is that multiple records with
the same secondary key each duplicate that key value within the
index.
When the secondary key field has many duplicates, such as when it has
a limited range (e.g., a field to indicate job category from among a
small number of possible job categories),
this duplication might waste considerable space.


One improvement on the simple sorted array is a two-dimensional
array where each row corresponds to a secondary key value.
A row contains the primary keys whose records have the indicated
secondary key value.
Figure :num:`Figure #TwoDArray` illustrates this approach.
Now there is no duplication of secondary key values,
possibly yielding a considerable space savings.
The cost of insertion and deletion is reduced, because only one row
of the table need be adjusted.
Note that a new row is added to the array when a new secondary key
value is added.
This might lead to moving many records, but this will happen
infrequently in applications suited to using this arrangement.

.. _TwoDArray:

.. odsafig:: Images/TwoDArr.png
   :width: 250
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Two-dimensional linear index

   A two-dimensional linear index.
   Each row lists the primary keys associated with a particular
   secondary key value.
   In this example, the secondary key is a name.
   The primary key is a unique four-character code.

A drawback to this approach is that the array must be of fixed
size, which imposes an upper limit on the number of primary keys
that might be associated with a particular secondary key.
Furthermore, those secondary keys with fewer records than the width
of the array will waste the remainder of their row.
A better approach is to have a one-dimensional array of secondary key
values, where each secondary key is associated with a linked
list.
This works well if the index is stored in main memory, but not so
well when it is stored on disk because the linked list for a given key
might be scattered across several disk blocks.

Consider a large database of employee records.
If the primary key is the employee's ID number and the secondary key
is the employee's name, then each record in the name index associates a
name with one or more ID numbers.
The ID number index in turn associates an ID number with a unique
pointer to the full record on disk.
The secondary key index in such an organization is also known as an
:term:`inverted list` or :term:`inverted file`.
It is inverted in that searches work backwards from the
secondary key to the primary key to the actual data record.
It is called a list because each secondary key value
has (conceptually) a list of primary keys associated with it.
Figure :num:`Figure #Inverted` illustrates this arrangement.
Here, we have last names as the secondary key.
The primary key is a four-character unique identifier.

.. _Inverted:

.. odsafig:: Images/Inverted.png
   :width: 200
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Illustration of an inverted list

   Illustration of an inverted list.
   Each secondary key value is stored in the secondary key list.
   Each secondary key value on the list has a pointer to a list of the
   primary keys whose associated records have that secondary key
   value.

Figure :num:`Figure #InvList` shows a better approach to storing inverted
lists.
An array of secondary key values is shown as before.
Associated with each secondary key is a pointer to an array of primary
keys.
The primary key array uses a linked-list implementation.
This approach combines the storage for all of the secondary key lists
into a single array, probably saving space.
Each record in this array consists of a primary key value and a
pointer to the next element on the list.
It is easy to insert and delete secondary keys from this array, making
this a good implementation for disk-based inverted files.

.. _InvList:

.. odsafig:: Images/InvList.png
   :width: 250
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Inverted list: sorted array of secondary keys and combined lists of primary keys

   An inverted list implemented as an array of secondary keys and
   combined lists of primary keys.
   Each record in the secondary key array contains a pointer to a record
   in the primary key array.
   The ``next`` field of the primary key array indicates the next
   record with that secondary key value.
   
.. odsascript:: AV/Indexing/varindexCON.js
.. odsascript:: AV/Indexing/linindexCON.js
