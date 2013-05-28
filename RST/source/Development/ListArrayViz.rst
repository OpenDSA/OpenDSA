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

.. TODO::
   :type: Slideshow

   S1 Class ``AList`` stores the list elements in the first
   ``listSize`` contiguous array positions. (Highlight the elements
   and show the value for listsize.)

   S2 Array positions correspond to list positions.
   In other words, the element at position :math:`i` in the list is
   stored at array cell :math:`i`. (Highlight an element and its array
   index.)

   S3 The head of the list is always at position 0. (Highlight)

   S4+ This makes random access to any element in the list quite easy.
   Given some position in the list, the value of the element
   in that position can be accessed directly. (Illustrate)

   S5 Thus, access to any element using the
   ``moveToPos`` method followed by the ``getValue`` method takes
   :math:`\Theta(1)` time. (Text for last slide)

.. TODO::
   :type: Slideshow

   Inserting or removing elements at the tail of the list
   is easy, so the ``append`` operation takes :math:`\Theta(1)` time.
   (Add a couple of slides to show append, with pseudocode.)


Here a visualization for how the ``insert`` method works.

.. inlineav:: AlistCON1 ss
   :output: show

Here a visualization for how the ``remove`` method works.

.. inlineav:: AlistCON2 ss
   :output: show

In the average case, insertion or removal each requires moving half
of the elements, which is :math:`\Theta(n)`.

.. TODO::
   :type: Slideshow

   S1 Most of the other member functions for Class ``AList`` simply
   access the current list element or move the current position.

   S2 The following operations all require :math:`\Theta(1)` time.

   S3+ (Show each one of these in turn, with a slide to illustrate.)

Because the array-based list implementation is defined to store list
elements in contiguous cells of the array, the ``insert``, ``append``,
and ``remove`` methods must maintain this property.

Aside from ``insert`` and ``remove``, the only other operations that
might require more than constant time are the constructor and
``clear``.

Now try for yourself to see if you understand how Array-Based
Insertion and Deletion work.
   
.. avembed:: Exercises/Development/listArrayInsertion.html ka
  
.. avembed:: Exercises/Development/listArrayDeletion.html ka

   Add a battery of summary questions.

.. odsascript:: AV/Development/listArrayTestCON.js

.. TODO::
   :type: Exercise

   Need a battery of summary questions.
