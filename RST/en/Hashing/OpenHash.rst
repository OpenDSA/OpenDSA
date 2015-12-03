.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: hash function
   :satisfies: open hashing
   :topic: Hashing

.. odsalink:: AV/Hashing/openhashCON.css

Open Hashing
============

Open Hashing
------------

While the goal of a hash function is to minimize collisions,
some collisions are unavoidable in practice.
Thus, hashing implementations must include some form of collision
resolution policy.
Collision resolution techniques can be broken into two classes:
:term:`open hashing <open hash system>`
(also called :term:`separate chaining`) and
:ref:`closed hashing <closed hash system> <HashCSimple>`
(also called :term:`open addressing`).
(Yes, it is confusing when "open hashing" means the opposite of
"open addressing", but unfortunately, that is the way it is.)
The difference between the two has to do with whether
collisions are stored outside the table (open hashing), or
whether collisions result in storing one of the records at another
slot in the table (closed hashing).

The simplest form of open hashing defines each slot in the
hash table to be the head of a linked list.
All records that hash to a particular slot are placed on that slot's
linked list.
The following figure illustrates a hash table where each
slot points to a linked list to hold the records associated with that slot.
The hash function used is the simple mod function.

.. inlineav:: openhashCON dgm

Records within a slot's list can be ordered in several ways:
by insertion order, by key value order, or by frequency-of-access
order.
Ordering the list by key value provides an advantage in the case of an 
unsuccessful search, because we know to stop searching the list once we
encounter a key that is greater than the one being searched for.
If records on the list are unordered or ordered by frequency, then an
unsuccessful search will need to visit every record on the list.

Given a table of size :math:`M` storing :math:`N` records,
the hash function will (ideally) spread the records evenly among the
:math:`M` positions in
the table, yielding on average :math:`N/M` records for each list.
Assuming that the table has more slots than there are records to be
stored, we can hope that few slots will contain more than one record.
In the case where a list is empty or has only one record,
a search requires only one access to the list.
Thus, the average cost for hashing should be :math:`\Theta(1`).
However, if clustering causes many records to hash to only a few of
the slots, then the cost to access a record will be much higher
because many elements on the linked list must be searched.

Open hashing is most appropriate when the hash table is kept in main
memory, with the lists implemented by a standard in-memory linked list.
Storing an open hash table on disk in an efficient way is
difficult, because members of a given linked list might be stored on
different disk blocks.
This would result in multiple disk accesses when searching for a
particular key value, which defeats the purpose of using hashing.

There are similarities between open hashing and Binsort.
One way to view open hashing is that each record is simply placed in a
bin.
While multiple records may hash to the same bin, this initial binning
should still greatly reduce the number of records accessed by
a search operation.
In a similar fashion, a simple Binsort reduces the number of
records in each bin to a small number that can be sorted in some
other way.

.. avembed:: Exercises/Hashing/OpenHashPRO.html ka

.. odsascript:: AV/Hashing/openhashCON.js
