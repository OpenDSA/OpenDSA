.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists
   
.. odsalink:: AV/Development/listArrayCON.css
.. odsalink:: AV/Development/listArrayVizCON.css

Array-Based List Implementation
===============================

Here is an implementation for the array-based list, named ``AList``.
``AList`` inherits from interface ``List``
(see Module :numref:`<ListADT>`)
and so must implement all of the member functions of ``List``.

.. codeinclude:: Lists/AList.pde
   :tag: AList

.. inlineav:: AlistVarsCON ss
   :output: show

.. inlineav:: AlistIntroCON ss
   :output: show

Because the array-based list implementation is defined to store list
elements in contiguous cells of the array, the ``insert``, ``append``,
and ``remove`` methods must maintain this property.

.. inlineav:: AlistInsertCON ss
   :output: show

.. inlineav:: AlistAppendCON ss
   :output: show

Removing an element from the head of the list is
similar to insert in that all remaining elements  must shift toward
the head by one position to fill in the gap.
If we want to remove the element at position :math:`i`, then
:math:`n - i - 1` elements must shift toward the head, as shown in the
following slideshow. 

.. inlineav:: AlistRemoveCON ss
   :output: show

In the average case, insertion or removal each requires moving half
of the elements, which is :math:`\Theta(n)`.

Aside from ``insert`` and ``remove``, the only other operations that
might require more than constant time are the constructor and
``clear``.
The other methods for Class ``AList`` simply
access the current list element or move the current position.
They all require :math:`\Theta(1)` time.

Now try for yourself to see if you understand how Array-Based
Insertion and Deletion work.
 
.. avembed:: Exercises/Development/LinkedListKAEx.html ka
  
.. avembed:: Exercises/Development/listArrayInsertion.html ka
  
.. avembed:: Exercises/Development/listArrayDeletion.html ka

   Add a battery of summary questions.

.. odsascript:: AV/Development/listArrayCON.js
.. odsascript:: AV/Development/listArrayVizCON.js

.. TODO::
   :type: Exercise

   Need a battery of summary questions.
