.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Design

The Dictionary ADT [Text]
=========================

The most common objective of computer programs is to store and
retrieve data.
Much of this book is about efficient ways to organize collections of
data records so that they can be stored and retrieved quickly.
In this section we describe a simple interface for such a collection,
called a :dfn:`dictionary`.
The dictionary ADT provides operations for storing records, finding
records, and removing records from the collection.
This ADT gives us a standard basis for comparing various data
structures.

Before we can discuss the interface for a dictionary, we must
first define the concepts of a :dfn:`key` and :dfn:`comparable`
objects.
If we want to search for a given record in a database, how should we
describe what we are looking for?
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
In this example the ID number is the \defit{search key}.

To implement the search function, we require that keys be comparable.
At a minimum, we must be able to take two keys and reliably determine
whether they are equal or not.
That is enough to enable a sequential search through a database of
records and find one that matches a given key.
However, we typically would like for the keys to define a
total order (see Module :numref:`<SetDef>`), which means that we can
tell which of two keys is greater than the other.
Using key types with total orderings gives the database
implementor the opportunity to organize a collection of records in
a way that makes searching more efficient.
An example is storing the records in sorted order in an array, which
permits a binary search.
Fortunately, in practice most fields of most records consist of
simple data types with natural total orders.
For example, integers, floats, doubles, and character strings all are
totally ordered.
Ordering fields that are naturally multi-dimensional, such as a point
in two or three dimensions, present special opportunities if we wish
to take advantage of their multidimensional nature.
This problem is addressed in Module :numref:`<Spatial>`.

Here is code to define a simple abstract dictionary class.

.. codeinclude:: Lists/Dictionary.pde
   :tag: DictionaryADT

The methods ``insert`` and ``find`` are the heart of the class.
Method ``insert`` takes a record and inserts it into the dictionary.
Method ``find`` takes a key value and returns some record from
the dictionary whose key matches the one provided.
If there are multiple records in the dictionary with that key value,
there is no requirement as to which one is returned.

Method ``clear`` simply re-initializes the dictionary.
The ``remove`` method is similar to ``find``, except that it
also deletes the record returned from the dictionary.
Once again, if there are multiple records in the dictionary that match
the desired key, there is no requirement as to which one actually is
removed and returned.
Method ``size`` returns the number of elements in the
dictionary.

The remaining Method is ``removeAny``.
This is similar to ``remove``, except that it does not take a key
value.
Instead, it removes an arbitrary record from the dictionary, if one
exists.
The purpose of this method is to allow a user the ability to iterate 
over all elements in the dictionary (of course, the dictionary will
become empty in the process).
Without the ``removeAny`` method, a dictionary user could not get
at a record of the dictionary that he didn't already know the key
value for.
With the ``removeAny`` method, the user can process all records
in the dictionary as shown in the following code fragment.

.. codeinclude:: Lists/DictionaryTest.pde
   :tag: Dictp4

There are other approaches that might seem more natural for iterating
though a dictionary, such as using a "first" and a "next" function.
But not all data structures that we want to use to implement a
dictionary are able to do "first" efficiently.
For example, a hash table implementation cannot efficiently locate the
record in the table with the smallest key value.
By using ``RemoveAny``, we have a mechanism that provides generic
access.

Given a database storing records of a particular type,
we might want to search for records in multiple ways.
For example, we might want to store payroll records in one dictionary
that allows us to search by ID,
and also store those same records in a second dictionary that
allows us to search by name.

Here is an implementation for a payroll record.

.. codeinclude:: Lists/Payroll.pde
   :tag: Payroll

Class ``Payroll`` has multiple fields, each of which might be
used as a search key.
Simply by varying the type for the key, and using the appropriate
field in each record as the key value,
we can define a dictionary whose search key is the ID field,
another whose search key is the name field, and a third whose search
key is the address field.
Here is an example where ``Payroll``
objects are stored in two separate dictionaries, one using the
ID field as the key and the other using the name field as the key.

.. codeinclude:: Lists/DictionaryTest.pde
   :tag: PayrollTest

The fundamental operation for a dictionary is finding a record that
matches a given key.
This raises the issue of how to extract the key from a record.
We would like any given dictionary implementation to support arbitrary
record types, so we need some mechanism for extracting keys that is
sufficiently general.
One approach is to require all record types to support some particular
method that returns the key value.
For example, in Java the ``Comparable`` interface can be used to
provide this effect.
Unfortunately, this approach does not work when the same record type
is meant to be stored in multiple dictionaries, each keyed by a
different field of the record.
This is typical in database applications.
Another, more general approach is to supply a class whose job is to
extract the key from the record.
Unfortunately, this solution also does not work in all situations,
because there are record types for which it is not possible to write
a key extraction method. [#]_

The fundamental issue is that the key value for a record is not an
intrinsic property of the record's class, or of any field within the
class.
The key for a record is actually a property of the context in which
the record is used.

A truly general alternative is to explicitly store the key associated
with a given record, as a separate field in the dictionary.
That is, each entry in the dictionary will contain both a record and
its associated key.
Such entries are known as key-value pairs.
It is typical that storing the key explicitly duplicates some field in
the record.
However, keys tend to be much smaller than records, so this additional
space overhead will not be great.
A simple class for representing key-value pairs is shown here.

.. codeinclude:: Utils/KVPair.pde
   :tag: KVpair

The ``insert`` method of the dictionary class supports the
key-value pair implementation because it takes two parameters,
a record and its associated key for that dictionary.

Now that we have defined the dictionary ADT and settled on the design
approach of storing key-value pairs for our dictionary entries, we are
ready to consider ways to implement it.
Two possibilities would be to use an array-based or linked list.
Here is an implementation for the dictionary using
an (unsorted) array-based list.

.. codeinclude:: Lists/UALDictionary.pde
   :tag: UALDictionary

Examining class ``UALdict`` (UAL stands for ``unsorted array-based
list), we can easily see that ``insert``
is a constant-time operation, because it simply inserts the new record
at the end of the list.
However, ``find``, and ``remove`` both require :math:`\Theta(n)` time
in the average and worst cases, because we need to do a sequential
search.
Method ``remove`` in particular must touch every record in the
list, because once the desired record is found, the remaining records
must be shifted down in the list to fill the gap.
Method ``removeAny`` removes the last record from the list, so
this is a constant-time operation.

As an alternative, we could implement the dictionary using a linked
list.
The implementation would be quite similar to that for
``UALDictionary``, and the cost of the functions should be the same
asymptotically.

Another alternative would be to implement the dictionary with a sorted 
list.
The advantage of this approach would be that we might be able to speed 
up the ``find`` operation by using a binary search.
To do so, first we must define a variation on the ``List`` ADT to
support sorted lists.
A sorted list is somewhat different from an unsorted list in that it
cannot permit the user to control where elements get inserted.
Thus, the ``insert`` method must be quite different in a sorted
list than in an unsorted list.
Likewise, the user cannot be permitted to append elements onto the
list.
For these reasons, a sorted list cannot be implemented with
straightforward inheritance from the ``List`` ADT.

The cost for ``find`` in a sorted list is :math:`\Theta(\log n)` for a
list of length :math:`n`.
This is a great improvement over the cost of ``find`` in an
unsorted list.
Unfortunately, the cost of ``insert`` changes from constant time in 
the unsorted list to :math:`\Theta(n)` time in the sorted list.
Whether the sorted list implementation for the dictionary ADT is more
or less efficient than the unsorted list implementation depends on the
relative number of
``insert`` and ``find`` operations to be performed.
If many more ``find`` operations than ``insert`` operations are
used, then it might be worth using a sorted list to implement the
dictionary.
In both cases, ``remove`` requires :math:`\Theta(n)` time in the worst
and average cases.
Even if we used binary search to cut down on the time to find the
record prior to removal, we would still need to shift down the
remaining records in the list to fill the gap left by the
``remove`` operation.

.. TODO::
   :type: Text

   The following is probably redundant with module SortCompare. Need
   to get this worked out. Probably this should be in the Design
   chapter, and not the Sorting chapter.

Given two keys, we have not properly addressed the issue of
how to compare them.
One possibility would be to simply use the basic
``==``, ``<=``, and ``>=`` operators built into most programming
languages.
This is the approach taken by our implementations for ``UALDictionary``.
If the key type is a simple integer, for example, this will work fine.
However, if the key is a pointer to a string or any other type of
object, then this will not give the desired result.
When we compare two strings we probably want to know which comes first
in alphabetical order, but what we will get from the standard
comparison operators is simply which object appears first in memory.
Unfortunately, the code will compile fine, but the answers probably
will not be fine.

In a language like C++ that supports operator overloading,
we could require that the user of the dictionary overload the
``==``, ``<=``, and ``>=`` operators for the given key type.
This requirement then becomes an obligation on the user of the
dictionary class.
Unfortunately, this obligation is hidden within the code of the
dictionary (and possibly in the user's manual) rather than exposed in
the dictionary's interface.
As a result, some users of the dictionary might neglect to implement
the overloading, with unexpected results.
Again, the compiler will not catch this problem.

The Java ``Comparable`` interface provides an approach to solving
this problem.
In a key-value pair implementation, the keys can be required to
implement the ``Comparable`` interface.
In other applications, the records might be required to implement
``Comparable``.

The most general solution is to have users supply their own
definition for comparing keys.
The concept of a class that does comparison (called a
:dfn:`comparator`) is quite important.
By making these operations be template parameters (in C++) or generic
parameters (in Java), the requirement to
supply the comparator class becomes part of the
interface.
In languages without such constructs, the comparator function can be a
parameter to the various methods.
This design is an example of the Strategy design pattern, because the 
"strategies" for comparing and getting keys from records
are provided by the client.
Alternatively, the Java ``Comparable`` interface allows the user to
define the comparator by implementing the ``compareTo`` method.
In some cases, it makes sense for the comparator class to
extract the key from the record type, as an alternative to storing
key-value pairs.

Notes
-----

.. [#] One example of such a situation occurs when we have a
       collection of records that describe books in a library. 
       One of the fields for such a record might be a list of subject
       keywords, where the typical record stores a few keywords.
       Our dictionary might be implemented as a list of records sorted
       by keyword.
       If a book contains three keywords, it would appear three times
       on the list, once for each associated keyword.
       However, given the record, there is no simple way to determine
       which keyword on the keyword list triggered this appearance of
       the record.
       Thus, we cannot write a function that extracts the key from
       such a record.
