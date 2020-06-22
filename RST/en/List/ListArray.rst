.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: list ADT
   :satisfies: array-based list
   :topic: Lists

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
   :long_name: Array-based List Variables Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistVarsCON.js
   :output: show

.. inlineav:: alistIntroCON ss
   :long_name: Array-based List Intro Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistIntroCON.js
   :output: show


Insert
~~~~~~

Because the array-based list implementation is defined to store list
elements in contiguous cells of the array, the ``insert``, ``append``,
and ``remove`` methods must maintain this property.

.. inlineav:: alistInsertCON ss
   :long_name: Array-based List Insertion Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistInsertCON.js
   :output: show


Insert Practice Exericse
~~~~~~~~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/List/AlistInsertPRO.html ka
   :long_name: Array-based List Insert Exercise


Append and Remove
-----------------

.. inlineav:: alistAppendCON ss
   :long_name: Array-based List Append Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistAppendCON.js
   :output: show

Removing an element from the head of the list is
similar to insert in that all remaining elements  must shift toward
the head by one position to fill in the gap.
If we want to remove the element at position :math:`i`, then
:math:`n - i - 1` elements must shift toward the head, as shown in the
following slideshow. 

.. inlineav:: alistRemoveCON ss
   :long_name: Array-based List Remove
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistRemoveCON.js
   :output: show

In the average case, insertion or removal each requires moving half
of the elements, which is :math:`\Theta(n)`.


Remove Practice Exericise
~~~~~~~~~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/List/AlistRemovePRO.html ka
   :long_name: Array-based List Remove Exercise

Aside from ``insert`` and ``remove``, the only other operations that
might require more than constant time are the constructor and
``clear``.
The other methods for Class ``AList`` simply
access the current list element or move the current position.
They all require :math:`\Theta(1)` time.


Array-based List Practice Questions
-----------------------------------

.. avembed:: Exercises/List/ALSumm.html ka
   :long_name: Array-based List Summary
