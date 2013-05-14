.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists

List Element Implementations [Text]
===================================

List users must decide whether they wish to store a copy of any given
element on each list that contains it.
For small elements such as an integer, this makes sense.
If the elements are payroll records, it might be desirable for
the list node to store a pointer to the record rather than store a
copy of the record itself.
This change would allow multiple list nodes (or other data structures) 
to point to the same record, rather than make repeated copies of the
record.
Not only might this save space, but it also means that a modification
to an element's value is automatically reflected at all locations
where it is referenced.
The disadvantage of storing a pointer to each element is that the
pointer requires space of its own.
If elements are never duplicated, then this additional space
adds unnecessary overhead.
Java most naturally stores references to objects, meaning that only
a single copy of an object such as a payroll record will be
maintained, even if it is on multiple lists.

Whether it is more advantageous to use pointers to shared elements
or separate copies depends on the intended application.
In general, the larger the elements and the more they are duplicated,
the more likely that pointers to shared elements is the
better approach.

A second issue faced by implementors of a list class (or any other
data structure that stores a collection of user-defined data elements)
is whether the elements stored are all required to be of the same type.
This is known as :dfn:`homogeneity` in a data
structure.
In some applications, the user would like to define the class of the
data element that is stored on a given list, and then never permit
objects of a different class to be stored on that same list.
In other applications, the user would like to permit the objects
stored on a single list to be of differing types.

For the list implementations presented in this section,
the compiler requires that all objects stored on the list be of the
same type.
Besides C++ templates and Java generics,
there are other techniques that implementors of a
list class can use to ensure that the element type for a given list
remains fixed,
while still permitting different lists to store different element
types.
One approach is to store an object of the appropriate type in the
header node of the list (perhaps an object of the appropriate type is
supplied as a parameter to the list constructor), and then check that
all insert operations on that list use the same element type.

The third issue that users of the list implementations must face is
primarily of concern when programming in languages that do not support
automatic garbage collection.
That is
how to deal with the memory of the objects stored on the list
when the list is deleted or the ``clear`` method is called.
The list destructor and the ``clear`` method are
problematic in that there is a potential that they will
be misused.
Deleting ``listArray`` in the array-based implementation,
or deleting a link node in the linked list implementation,
might remove the only reference to an object, leaving its memory space
inaccessible.
Unfortunately, there is no way for the list implementation to know
whether a given object is pointed to in another part of the program or
not.
Thus, the user of the list must be responsible for
deleting these objects when that is appropriate.
