.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists
   
.. odsalink:: AV/Development/listArrayTestCON.css

Array-Based List Implementation (Visual)
========================================

Here is an implementation for the array-based list, named ``AList``.
``AList`` inherits from interface ``List``
(see Module :numref:`<ListADT>`)
and so must implement all of the member functions of ``List``.

.. codeinclude:: Lists/AList.pde
   :tag: AList

.. inlineav:: AlistTestCON1 ss
   :output: show

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
tail to make room, as illustrated by the following slideshow.

.. inlineav:: AlistCON1 ss
   :output: show

Removing an element from the head of the list is
similar in that all remaining elements  must shift toward
the head by one position to fill in the gap.
To remove the element at position :math:`i`, :math:`n - i - 1`
elements must shift toward the head.
In the average case, insertion or removal requires moving half
of the elements, which is :math:`\Theta(n)`.

.. inlineav:: AlistCON2 ss
   :output: show

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

Now try for yourself to see if you understand how Array-Based Insertion and Deletion work.
   
.. avembed:: Exercises/Development/listArrayInsertion.html ka
  
.. avembed:: Exercises/Development/listArrayDeletion.html ka

   Add a battery of summary questions.

.. odsascript:: AV/Development/listArrayTestCON.js

.. TODO::
   :type: Exercise

   Need a battery of summary questions.
