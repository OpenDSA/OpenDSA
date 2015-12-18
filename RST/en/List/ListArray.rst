.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: list ADT
   :satisfies: array-based list
   :topic: Lists
   
.. odsalink:: AV/List/alistCON.css

Array-Based List Implementation
===============================

Array-Based List Implementation
-------------------------------

Here is an implementation for the array-based list, named ``AList``.
``AList`` inherits from the :ref:`List ADT <ListADT>`,
and so must implement all of the member functions of ``List``.

.. codeinclude:: Lists/AList
   :tag: AList

|

.. inlineav:: alistVarsCON ss
   :output: show

.. inlineav:: alistIntroCON ss
   :output: show


Insert
~~~~~~

Because the array-based list implementation is defined to store list
elements in contiguous cells of the array, the ``insert``, ``append``,
and ``remove`` methods must maintain this property.

.. inlineav:: alistInsertCON ss
   :output: show


Insert Practice Exericse
------------------------

.. avembed:: Exercises/List/AlistInsertPRO.html ka


Append and Remove
-----------------

.. inlineav:: alistAppendCON ss
   :output: show

Removing an element from the head of the list is
similar to insert in that all remaining elements  must shift toward
the head by one position to fill in the gap.
If we want to remove the element at position :math:`i`, then
:math:`n - i - 1` elements must shift toward the head, as shown in the
following slideshow. 

.. inlineav:: alistRemoveCON ss
   :output: show

In the average case, insertion or removal each requires moving half
of the elements, which is :math:`\Theta(n)`.


Remove Practice Exericise
~~~~~~~~~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/List/AlistRemovePRO.html ka

Aside from ``insert`` and ``remove``, the only other operations that
might require more than constant time are the constructor and
``clear``.
The other methods for Class ``AList`` simply
access the current list element or move the current position.
They all require :math:`\Theta(1)` time.


Array-based List Practice Questions
-----------------------------------

.. avembed:: Exercises/List/ALSumm.html ka

.. odsascript:: AV/List/alistVarsCON.js
.. odsascript:: AV/List/alistIntroCON.js
.. odsascript:: AV/List/alistInsertCON.js
.. odsascript:: AV/List/alistAppendCON.js
.. odsascript:: AV/List/alistRemoveCON.js
