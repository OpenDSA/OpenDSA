.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: collision resolution
   :satisfies: hash deletion
   :topic: Hashing

Deletion
========

Deletion
--------

When deleting records from a hash table, there are two important
considerations.

1. Deleting a record must not hinder later searches.
   In other words, the search process must still pass through
   the newly emptied slot to reach records whose probe sequence
   passed through this slot.
   Thus, the delete process cannot simply mark the slot as empty, because
   this will isolate records further down the probe sequence.

2. We do not want to make positions in the hash table unusable because
   of deletion.
   The freed slot should be available to a future insertion.

Both of these problems can be resolved by placing a special mark in
place of the deleted record, called a
:term:`tombstone`.
The tombstone indicates that a record once occupied the slot but
does so no longer.
If a tombstone is encountered when searching along a
probe sequence, the search procedure continues with the search.
When a tombstone is encountered during insertion, that slot
can be used to store the new record.
However, to avoid inserting duplicate keys, it will still be necessary
for the search procedure to follow the probe sequence until a truly
empty position has been found, simply to verify that a duplicate is
not in the table.
However, the new record would actually be inserted into the slot of
the first tombstone encountered.

.. inlineav:: hashdelCON ss
   :output: show

Here is a practice exercise.

.. avembed:: AV/Hashing/HashingDelPRO.html pe

The use of tombstones allows searches to work correctly and allows
reuse of deleted slots.
However, after a series of intermixed insertion and deletion
operations, some slots will contain tombstones.
This will tend to lengthen the average distance from a record's
home position to the record itself, beyond where it could be if the
tombstones did not exist.
A typical database application will first load a collection of records
into the hash table and then progress to a phase of intermixed
insertions and deletions.
After the table is loaded with the initial collection of
records, the first few deletions will lengthen the average
probe sequence distance for records (it
will add tombstones).
Over time, the average distance will reach an equilibrium point because
insertions will tend to decrease the average distance by filling in
tombstone slots.
For example, after initially loading records into the database, the
average path distance might be 1.2 (i.e., an average of 0.2 accesses
per search beyond the home position will be required).
After a series of insertions and deletions, this average distance
might increase to 1.6 due to tombstones.
This seems like a small increase, but it is three times longer on
average beyond the home position than before deletions.

Two possible solutions to this problem are

1. Do a local reorganization upon deletion to try to shorten the average
   path length.
   For example, after deleting a key, continue to follow the
   probe sequence of that key and swap
   records further down the probe sequence
   into the slot of the recently deleted record (being careful not to
   remove any key from its probe sequence).
   This will not work for all collision resolution policies.

2. Periodically rehash the table by
   reinserting all records into a new hash table.
   Not only will this remove the tombstones, but it also provides an
   opportunity to place the most frequently accessed records into their
   home positions.


Hashing Deletion Summary Questions
----------------------------------

Now here are some practice questions.

.. avembed:: Exercises/Hashing/HashDelSumm.html ka

Congratulations! You have reached the end of the hashing tutorial.
In summary, a properly tuned hashing system will return records with
an average cost of less than two record accesses.
This makes it the most effective way known to store a database of records
to support exact-match queries.
Unfortunately, hashing is not effective when implementing range queries,
or answering questions like
"Which record in the collection has the smallest key value?"

.. odsascript:: AV/Hashing/hashdelCON.js
