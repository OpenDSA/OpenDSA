.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites: Sorting, InsertionSort
   :topic: Sorting

.. _SortCompare:

.. include:: JSAVheader.rinc

.. index::
   pair: sorting; record comparison
   pair: searching; record comparison

Comparing Records
==================

If we want to sort some things, we have to be able to compare them, to
decide which one is bigger.
How do we compare two things?
If all that we wanted to sort or search for was simple integer values,
this would not be an interesting question.
We can just use standard comparison operators like "<" or ">".
Even if we wanted to store strings, most programming languages give us
built-in functions for comparing strings alphabetically.
But we do not usually want to store integers or strings in a data
structure.
Usually we want to store records, where a record is made up of
multiple values, such as a name, an address, and a phone number.
In that case, how can we "compare" records to decide which one is
"smaller"?
We cannot just use "<" to compare the records!
Nearly always in this situation, we actually are interested in sorting
the records based on the values of one particular field used to
represent the record,
which itself is something simple like an integer.
This field is referred to as the :dfn:`key` for the record.

.. index:: ! key

Likewise, if we want to search for a given record in a database, how
should we describe what we are looking for?
A database record could simply be a number, or it could be quite
complicated, such as a payroll record with many fields of varying
types.
We do not want to describe what we are looking for by detailing and
matching the entire contents of the record.
If we knew everything about the record already, we probably would not
need to look for it.
Instead, we typically define what record we want in terms of a
key value.
For example, if searching for payroll records, we might wish to
search for the record that matches a particular ID number.
In this example the ID number is the :dfn:`search key`.

.. index:: ! search key

.. index:: ! comparable

To implement sorting or searching, we require that keys be :dfn:`comparable`.
At a minimum, we must be able to take two keys and reliably determine
whether they are equal or not.
That is enough to enable a sequential search through a database of
records and find one that matches a given key.
However, we typically would like for the keys to define a
:dfn:`total order` (see Module :ref:`Set Definitions <SetDef>`), which means
that we can always tell which of two keys is greater than the other.
Using key types with total orderings gives the database
implementor the opportunity to organize a collection of records in
a way that makes searching more efficient.
An example is storing the records in sorted order in an array, which
permits a binary search.
Fortunately, in practice most fields of most records consist of
simple data types with natural total orders.
For example, integers, floats, doubles, and character strings all are
totally ordered.

But if we want to write a general purpose sorting or searching
function, we need a general way to get the key for the record.
We could insist that every record have a particular method called
``.key()``.
That seems like a good name for it!
But what if the programmer had already used that method name for
another purpose?
An even bigger problem is, what if the programmer wants to sort the
record now using one field as the key, and later using another field?
Or search sometimes on one key, and at other times on another?
The problem is that the "keyness" of a given field is not an inherent
property within the record, but rather depends on the context.

Some languages like Java and C++ have special infrastructure for
supporting this (such as the ``Comparable`` interface in Java,
which has the ``.compareTo()`` method for defining the exact process
by which two objects are compared).
But many languages like Processing and JavaScript do not.
One good general-purpose solution is to explicitly store
:index:`key-record pairs` in the data structure.
For example, if we want to sort a bunch of records, we can store them
in an array where every array entry contains both a key value for the
record and a pointer to the record itself.
This might seem like a lot of extra space required, but remember that
we can then store pointers to the records in another array with
another field as the key for another purpose.
The records themselves do not need to be duplicated.

To keep them clear and simple, this tutorial presents sorting algorithms
as operating on integer values stored in an array.
But to be generally useful, a real sorting algorithm typically has to
deal with the fact that it is sorting a collection of records.
A general-purpose sorting routine meant to operate on multiple record
types would have to be written in a way to deal with the generic
comparison problem.
To illustrate, here is an example of Insertion Sort implemented to
work on an array that stores key-record pairs.

.. codeinclude:: Sorting/InssortKV/InssortKV.pde 
   :tag: InssortKV

You can see a complete implementation supporting this version of
Insertion Sort here_.

.. _here: ../../../SourceCode/Processing/Sorting/InssortKV/InssortKV.pde

Here are some review questions to test your knowledge from this module.

.. avembed:: Exercises/Sorting/SortCompareSumm.html ka
   :showbutton: hide
