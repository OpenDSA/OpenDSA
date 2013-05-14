.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists

The Array-Based List Implementation [Text]
==========================================

There are two standard approaches to implementing lists, the
:dfn:`array-based` list, and the :dfn:`linked` list.
This section discusses the array-based approach.
The linked list is presented in Module :numref:`<ListLinked>`.
Time and space efficiency comparisons for the two are discussed in
Module :numref:`<ListAnalysis>`.

Here is an implementation for the array-based list, named ``AList``.
``AList`` inherits from interface ``List``
and so must implement all of the member functions of ``List``.

.. codeinclude:: Lists/AList.pde
   :tag: AList

The private portion of class ``AList``contains the data members for
the array-based list.
These include ``listArray``, the array which holds the list
elements.
Because ``listArray`` must be allocated at some fixed size,
the size of the array must be known when the list object is created.
Note that an optional parameter is declared for the ``AList``
constructor.
With this parameter, the user can indicate the maximum
number of elements permitted in the list.
If no parameter is given, then it takes the value
``defaultSize``, which is assumed to be a suitably defined
constant value.

Because each list can have a differently sized array, each list must
remember its maximum permitted size.
Data member ``maxSize`` serves this purpose.
At any given time the list actually holds some number
of elements that can be less than the maximum allowed by the array.
This value is stored in ``listSize``.
Data member ``curr`` stores the current position.
Because ``listArray``, ``maxSize``, ``listSize``, and 
``curr`` are all declared to be ``private``, they may only
be accessed by methods of Class ``AList``.

Class ``AList`` stores the list elements in the first
``listSize`` contiguous array positions.
Array positions correspond to list positions.
In other words, the element at position :math:`i` in the list is
stored at array cell :math:`i`.
The head of the list is always at position 0.
This makes random access to any element in the list quite easy.
Given some position in the list, the value of the element
in that position can be accessed directly.
Thus, access to any element using the
``moveToPos`` method followed by the ``getValue`` method takes
:math:`\Theta(1)` time.

Because the array-based list implementation is defined to store list
elements in contiguous cells of the array, the
``insert``, ``append``, and ``remove``
methods must maintain this property.
Inserting or removing elements at the tail of the list
is easy, so the ``append`` operation takes :math:`\Theta(1)` time.
But if we wish to insert an element at the head of the list,
all elements currently in the list must shift one position toward the
tail to make room, as illustrated by Figure :num:`Figure #ShiftList`.
This process takes :math:`\Theta(n)` time if there are :math:`n`
elements already in the list.
If we wish to insert at position :math:`i` within a list of :math:`n`
elements, then :math:`n - i` elements must shift toward the tail.
Removing an element from the head of the list is
similar in that all remaining elements  must shift toward
the head by one position to fill in the gap.
To remove the element at position :math:`i`, :math:`n - i - 1`
elements must shift toward the head.
In the average case, insertion or removal requires moving half
of the elements, which is :math:`\Theta(n)`.

.. Images/ShiftLis.png

.. _ShiftList:

.. odsafig:: Images/GraphDef.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Inserting an element into an array-based list

   Inserting an element at the head of an array-based list requires
   shifting all existing elements in the array by one position
   toward the tail.
   (a) A list containing five elements before inserting an element with
   value 23.
   (b) The list after shifting all existing elements one position to the
   right.
   (c) The list after 23 has been inserted in array position 0.
   Shading indicates the unused part of the array.

Most of the other member functions for Class ``AList`` simply
access the current list element or move the current position.
Such operations all require :math:`\Theta(1)` time.
Aside from ``insert`` and ``remove``,
the only other operations that might require more than
constant time are the constructor, the destructor, and ``clear``.
These three member functions each make use of the system
free-store operation ``new``.
As discussed further in Module :numref:`<Freelist>`, system free-store
operations can be expensive.
