.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: indexing
   :topic: Indexing

Indexing Chapter Introduction
=============================

Many large-scale computing applications are centered around data sets
that are too large to fit into main memory.
The classic example is a large database of records with multiple
search keys, requiring the ability to insert, delete, and search for
records.
Hashing provides outstanding performance for such
situations, but only in the limited case in which all searches are of
the form "find the record with key value :math:`K`".
Many applications require more general search capabilities.
One example is a range query
search for all records whose key lies within some range.
Other queries might involve visiting all records in order of their key
value, or finding the record with the greatest key value.
Hash tables are not organized to support any of these queries
efficiently.

This chapter introduces file structures used to organize a large
collection of records stored on disk.
Such file structures support efficient insertion,
deletion, and search operations, for exact-match queries, range
queries, and largest/smallest key value searches.

Before discussing such file structures, we must become familiar
with some basic file-processing terminology.
An :term:`entry-sequenced file`
stores records in the order that they were added to the file.
Entry-sequenced files are the disk-based equivalent to an unsorted
list and so do not support efficient search.
The natural solution is to sort the records by order of the search key.
However, a typical database, such as a collection of employee or
customer records maintained by a business, might contain multiple
search keys.
To answer a question about a particular customer might require a
search on the name of the customer.
Businesses often wish to sort and output the records by
zip code order for a bulk mailing.
Government paperwork might require the ability to search by
Social Security number.
Thus, there might not be a single "correct" order in which to store
the records.

:term:`Indexing` is the process of associating a key with the location
of a corresponding data record.
An :ref:`external sort <external sort> <ExternalSort>` typically uses
the concept of a key sort, in which an :term:`index file` is created whose
records consist of key/pointer pairs.
Here, each key is associated with a pointer to a complete record in
the main database file.
The index file could be sorted or organized using a tree structure,
thereby imposing a logical order on the records without
physically rearranging them.
One database might have several associated index files,
each supporting efficient access through a different key field.

Each record of a database normally has a unique identifier,
called the :term:`primary key`.
For example, the primary key for a set of personnel records might be
the Social Security number or ID number for the individual.
Unfortunately, the ID number is generally an inconvenient value on
which to perform a search because the searcher is unlikely to know it.
Instead, the searcher might know the desired employee's name.
Alternatively, the searcher might be interested in finding all
employees whose salary is in a certain range.
If these are typical search requests to the database, then the name
and salary fields deserve separate indices.
However, key values in the name and salary indices are not likely to
be unique.

A key field such as salary, where a particular key value might be
duplicated in multiple records, is called a
:term:`secondary key`.
Most searches are performed using a secondary key.
The :term:`secondary key index` (or more simply, :term:`secondary index`)
will associate a secondary key value with the primary key of each
record having that secondary key value.
At this point, the full database might be searched directly for the
record with that primary key, or there might be a :term:`primary key index`
(or :term:`primary index`)
that relates each primary key value with a pointer to the
actual record on disk.
In the latter case, only the primary index provides the
location of the actual record on disk, while the secondary indices 
refer to the primary index.

Indexing is an important technique for organizing large databases,
and many indexing methods have been developed.
Direct access through hashing is discussed in
Chapter :chap:`Hashing`.
A simple list sorted by key
value can also serve as an index to the record file.
Indexing disk files by sorted lists are discussed in the following
section.
Unfortunately, a sorted list does not perform well for insert
and delete operations.

A third approach to indexing is the tree index.
Trees are typically used to organize large databases that must support
record insertion, deletion, and
key range searches.
:ref:`ISAM <ISAM> <ISAM>` was a
a tentative step toward solving the problem of storing a large
database that must support insertion and deletion of records.
Its shortcomings help to illustrate the value of tree indexing
techniques.
Module :ref:`TreeIndexing <TreeIndexing> <TreeIndexing>`
introduces the basic issues related to tree indexing.
Module :ref:`2-3 tree <2-3 tree> <TwoThreeTree>` introduces the 2-3
tree, a balanced tree structure that is a simple form of the
:ref:`B-tree <B-tree> <BTree>`.
B-trees are the most widely used indexing method for large disk-based
databases, and for implementing file systems.
