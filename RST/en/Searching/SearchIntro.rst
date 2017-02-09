.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Search

Chapter Introduction: Search
============================

Organizing and retrieving information is at the heart of most computer
applications, and searching is surely the most frequently performed
of all computing tasks.
Search can be viewed abstractly as a process to determine if
an element with a particular value is a member of a particular set.
The more common view of searching is an attempt to
find the record within a collection of records that has
a particular key value, or those records in a collection whose key
values meet some criterion such as falling within a range of
values.

We can define searching formally as follows.
Suppose that we have a collection **L** of :math:`n` records of the
form

.. math::

   (k_1, I_1), (k_2, I_2), ..., (k_n, I_n)

where :math:`I_j` is information associated with key :math:`k_j`
from record :math:`j` for :math:`1 \leq j \leq n`.
Given a particular key value :math:`K`,
the :term:`search problem` is to locate a record
:math:`(k_j, I_j)` in **L** such that :math:`k_j = K`
(if one exists).
:term:`Searching` is a systematic method for
locating the record (or records) with key value :math:`k_j = K`.

A :term:`successful search` is one in which a record with key
:math:`k_j = K` is found.
An :term:`unsuccessful search` is one in which no record with
:math:`k_j = K` is found (and no such record exists).

An :term:`exact-match query` is a search for the record whose key
value matches a specified key value.
A :term:`range query` is a search for all records whose key value
falls within a specified range of key values.

We can categorize search algorithms into three general
approaches:

#. Sequential and list methods.

#. Direct access by key value (hashing).

#. Tree indexing methods.

Any of these approaches are potentially suitable for implementing the
:ref:`Dictionary <dictionary> <Dictionary>` ADT.
However, each has different performance characteristics that make it
the method of choice in particular circumstances.

The current chapter considers methods for searching data stored in
lists.
List in this context means any list implementation including a
linked list or an array.
Most of these methods are appropriate for sequences
(i.e., duplicate key values are allowed), although there are special
techniques applicable to :ref:`sets <set> <SetSearch>`.
The techniques from the first three sections of this chapter are most
appropriate for searching a collection of records stored in RAM.
Chapter :chap:`Hashing` introduces hashing, a technique for
organizing data in an array such that the location of each record
within the array is a function of its key value.
Hashing is appropriate when records are stored either in RAM or on
disk.

Chapter :chap:`Indexing` discusses tree-based methods for organizing
information on disk, including a commonly used file structure called
the B-tree.
Nearly all programs that must organize large collections of records
stored on disk use some variant of either hashing or the B-tree.
Hashing is practical for only certain access applications
(exact-match queries) and is generally appropriate only when duplicate
key values are not allowed.
B-trees are the method of choice for dynamic disk-based
applications anytime hashing is not appropriate.
