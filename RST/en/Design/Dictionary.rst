.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: comparison; list ADT
   :satisfies: dictionary
   :topic: Design

The Dictionary ADT
==================

The Dictionary ADT
------------------

The most common objective of computer programs is to store and
retrieve data.
Much of this book is about efficient ways to organize collections of
data records so that they can be stored and retrieved quickly.
In this section we describe a simple interface for such a collection,
called a :term:`dictionary`.
The dictionary ADT provides operations for storing records, finding
records, and removing records from the collection.
This ADT gives us a standard basis for comparing various data
structures.
Loosly speaking, we can say that any data structure that supports
insert, search, and deletion is a "dictionary".

Dictionaries depend on the concepts of a :term:`search key` and
:ref:`comparable <comparable> <Comparison>` objects. 
To implement the dictionary's search function, we will require that
keys be :term:`totally ordered <total order>`.
Ordering fields that are naturally multi-dimensional, such as a point
in two or three dimensions, present special opportunities if we wish
to take advantage of their multidimensional nature.
This problem is addressed by
:ref:`spatial data structures <spatial data structure> <Spatial>`.

Here is code to define a simple abstract dictionary class.

.. codeinclude:: Design/Dictionary
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

.. codeinclude:: Design/DictionaryTest
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

.. codeinclude:: Design/Payroll
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

.. codeinclude:: Design/DictionaryTest
   :tag: PayrollTest

One problem with the example as it is written is that the dictionary
relies on the programmer to be reasonable about being consistent with
the keys.
These dictionaries are intended to have 
:ref:`homogeneous <homogeneity> <ListElement>` elements.
But nothing stops the programmer from inserting an integer key into
the names dictionary, or searching with an integer search key.
This problem can be handled by using C++ templates or Java generics.

The fundamental operation for a dictionary is finding a record that
matches a given key.
This raises the issue of how to
:ref:`extract the key <comparable> <Comparison>` from a record.
We will usually assume that dictionary implementations store a
:term:`key-value pair` so as to be able to extract the key
associated with a record for this particular dictionary.

The ``insert`` method of the dictionary class supports the
key-value pair implementation because it takes two parameters,
a record and its associated key for that dictionary.

Now that we have defined the dictionary ADT and settled on the design
approach of storing key-value pairs for our dictionary entries, we are
ready to consider ways to implement it.
Two possibilities would be to use an array-based or linked list.
Here is an implementation for the dictionary using
an (unsorted) array-based list.

.. codeinclude:: Design/UALDictionary
   :tag: UALDictionary

Examining class ``UALdict`` (UAL stands for "unsorted array-based
list"), we can easily see that ``insert``
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

:ref:`Search trees <search tree> <BST>` are search
structures that can perform all three key operations of insert,
search, and delete in :math:`\Theta(\log n)` time.

.. avembed:: Exercises/Design/DesignDictionarySumm.html ka
