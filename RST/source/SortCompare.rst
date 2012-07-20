.. avmetadata:: Comparisons
   :author: Cliff Shaffer
   :prerequisites: Sorting
   :topic: Sorting
   :short_name: RecCompare

.. _SortCompare:

.. index::
   pair: sorting; record comparison
   pair: searching; record comparison

Comparing Records
==================

If we want to sort some things, we have to be able to compare them, to
decide which one is bigger.
How do we compare two things?
If all that we wanted to sort was simple integer values, this would
not be an interesting question.
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
the records based on the values of one particular field,
which itself is something simple like an integer.
This field is referred to as the :dfn:`key` for the record.

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

To implement sorting or searching, we require that keys be comparable.
At a minimum, we must be able to take two keys and reliably determine
whether they are equal or not.
That is enough to enable a sequential search through a database of
records and find one that matches a given key.
However, we typically would like for the keys to define a
total order (see Module :ref:`Set Definitions <SetDef>`, which means
that we can tell which of two keys is greater than the other.
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
record now using field as the key, and later using another field?
Or search sometimes on one key, and at other times on another?
The problem is that the "keyness" of a given field is not an inherent
property within the record, but rather depends on the context.

Some languages like Java and C++ have special infrastructure for
supporting this (such as the ``Comparable`` interface and the
``.compareTo()`` method in Java).
But many language like Processing and JavaScript do not.
One good general-purpose solution is to explicitly store "key-record"
pairs in the data structure.
For example, if we want to sort a bunch of records, we can store them
in an array where every array entry contains both a key value for the
record and a pointer to the record itself.
This might seem like a lot of extra space required, but remember that
we can then store pointers to the records in another array with
another field as the key for another purpose.
The records themselves do not need to be duplicated.

To keep them clear and simple, we present the sorting algorithms
as operating on integer values stored in an array.
But a real sorting algorithm would have to deal with the fact that it
is sorting a collection of records.
A general-purpose sorting routine meant to operate on multiple record
types would have to be written in a way to deal with the comparison
problem.
To illustrate, here is an example of Insertion Sort implemented to
work on an array that stores key-record pairs.

.. TODO::
   :type: Pseudocode

   Show an implementation of Insertion Sort using key-record pairs.
