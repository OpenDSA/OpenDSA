.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: ADT; array-based list
   :topic: Search

Alternative List ADT Designs
============================

The :ref:`list ADT <list> <ListADT>` specifies that a List
comprises not only a collection of objects in linear order,
but also "the current position".
While this is a simple way to present the main concepts embodied by a
list, it complicates any algorithm that relies on having two or more
distinct "current positions" in the same list, such as any algorithm
that steps from both ends towards the middle.

An alternative design is to separate the "current position" as a
separate object.
In the following ADT, we will call this a ``ListIndex``.
This is a simple form of a concept that is sometimes called an
:term:`iterator`.
The ``ListIndex`` interface abstracts the notion of a position in a
list.

.. codeinclude:: ListAlt/ListIndex

.. codeinclude:: ListAlt/List

There is the issue in an implementation of how the two classes will
communicate.
For the array-based list, the ``ListIndex`` merely needs to store an
integer for the position.
For the linked list class, the ``ListIndex`` would store a pointer to
a linked list node.
This means that the ``List`` class needs to be able to set and get
this pointer, but nobody outside should need to know about it.
Some languages like Java and C++ have mechanisms that allow a specific
class to have access to non-public members of another class.
Oher languages like Processing have no such concept.

One general solution is to make the interface for ``ListIndex``
public, but make the implementation a private inner class of the List
implementation.
This approach is used in the following implmentation for the
Array-based list.

.. codeinclude:: ListAlt/AList
