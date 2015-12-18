.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: list ADT
   :satisfies: linked list
   :topic: Lists
   
.. odsalink:: AV/List/llistCON.css

Linked Lists
============

Linked Lists
------------

In this module we present one of the two traditional implementations
for lists, usually called a :term:`linked list`.
The linked list uses :term:`dynamic memory allocation`,
that is, it allocates memory for new list elements as needed.
The following diagram illustrates the linked list concept.
Here there are three :term:`nodes <node>` that
are "linked" together.
Each node has two boxes.
The box on the right holds a link to the next node in the list.
Notice that the rightmost node has a diagonal slash through its link
box, signifying that there is no link coming out of this box.

.. _LinkedListNodes:

.. inlineav:: llistRepCON dgm
   :align: center

Because a list node is a distinct object (as opposed to simply a cell
in an array), it is good practice to make a separate list node class.
(We can also re-use the list node class to implement linked
implementations for the :ref:`stack <stack> <Stack>` and
:ref:`queue <queue> <Queue>` data structures.
Here is an implementation for list nodes, called the ``Link`` class.
Objects in the ``Link`` class contain an ``element`` field to
store the element value, and a ``next`` field to store a pointer to
the next node on the list.
The list built from such nodes is called a :term:`singly linked list`,
or a :term:`one-way list`, because each list node
has a single pointer to the next node on the list.

.. codeinclude:: Lists/Link
   :tag: Link

The ``Link`` class is quite simple.
There are two forms for its constructor, one with
an initial element value and one without.
Member functions allow the link user to get or set the ``element``
and ``link`` fields.

.. inlineav:: llistBadCON ss
   :output: show


Why This Has Problems
~~~~~~~~~~~~~~~~~~~~~

There are a number of problems with the representation just
described.
First, there are lots of special cases to code for.
For example, when the list is empty we have
no element for ``head``, ``tail``, and ``curr`` to point to.
Implementing special cases for ``insert`` and ``remove``
increases code complexity, making it harder to understand,
and thus increases the chance of introducing bugs.

.. inlineav:: llistBadDelCON ss
   :output: show
   

A Better Solution
~~~~~~~~~~~~~~~~~

Fortunately, there is a fairly easy way to deal with all of the
special cases, as well as the problem with deleting the last node.
Many special cases can be eliminated by implementing
linked lists with an additional :term:`header node`
as the first node of the list.
This header node is a link node like any other, but its value is
ignored and it is not considered to be an actual element of the list.
The header node saves coding effort because we no longer need to
consider special cases for empty lists or when the current position is
at one end of the list.
The cost of this simplification is the space for the header node.
However, there are space savings due to smaller code size,
because statements to handle the special cases are omitted.
We get rid of the remaining special cases related to being at the end
of the list by adding a "trailer" node that also never stores a
value.

The following diagram shows initial conditions for a linked list
with header and trailer nodes.


.. _LinkedListInit:

.. inlineav:: llistInitCON dgm
   :align: center

Here is what a list with some elements looks like with the header and
trailer nodes added.
   
.. _LinkedListTailer:

.. inlineav:: llistHeaderCON dgm
   :align: center

Adding the trailer node also solves our problem with deleting the last
node on the list, as we will see when we take a closer look at the
remove method's implementation.


Linked List Implementation
--------------------------

Here is the implementation for the linked list class,
named ``LList``.

.. codeinclude:: Lists/LList
   :tag: LList

|

.. inlineav:: llistVarsCON ss
   :output: show

|

.. inlineav:: llistConsCON ss
   :output: show

|

.. inlineav:: llistInsertCON ss
   :output: show
   

Here are some special cases for linked list insertion: Inserting at
the end, and inserting to an empty list.

.. inlineav:: llistSpecialCON ss
   :output: show
   

.. avembed:: Exercises/List/LlistInsertPRO.html ka


Linked List Remove
------------------

.. inlineav:: llistRemoveCON ss
   :output: show

.. avembed:: Exercises/List/LlistRemovePRO.html ka

.. inlineav:: llistOtherCON ss
   :output: show
   
Implementations for the remaining operations each require
:math:`\Theta(1)` time.

.. odsascript:: AV/List/llist.js
.. odsascript:: AV/List/llistRepCON.js
.. odsascript:: AV/List/llistBadCON.js
.. odsascript:: AV/List/llistBadDelCON.js
.. odsascript:: AV/List/llistInitCON.js
.. odsascript:: AV/List/llistHeaderCON.js
.. odsascript:: AV/List/llistVarsCON.js
.. odsascript:: AV/List/llistConsCON.js
.. odsascript:: AV/List/llistInsertCON.js
.. odsascript:: AV/List/llistSpecialCON.js
.. odsascript:: AV/List/llistRemoveCON.js
.. odsascript:: AV/List/llistOtherCON.js
