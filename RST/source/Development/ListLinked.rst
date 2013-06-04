.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists
   
.. odsalink:: AV/Development/listLinkedCON.css

Linked Lists [Storyboard]
=========================

Besides the array-based list presented in
Module :numref:`<ListArray>`,
the other traditional approach to implementing lists makes use of
pointers and is usually called a :dfn:`linked list`.
The linked list uses :dfn:`dynamic memory allocation`,
that is, it allocates memory for new list elements as needed.

.. _LinkedListNodes:

.. inlineav:: listLinkedNodeCON dgm
   :align: center

   A linked list is made up of a series of objects, called the
   :dfn:`nodes` of the list. You can see that the nodes are "linked"
   together.

Because a list node is a distinct object (as opposed to simply a cell
in an array), it is good practice to make a separate list node class.
(We can also use the list node class for the linked implementations
for the stack and queue data structures presented later in this
chapter.)
Here is an implementation for list nodes, called the ``Link`` class.
Objects in the ``Link`` class contain an ``element`` field to
store the element value, and a ``next`` field to store a pointer to
the next node on the list.
The list built from such nodes is called a :dfn:`singly linked list`,
or a :dfn:`one-way list`, because each list node
has a single pointer to the next node on the list.

.. codeinclude:: Lists/Link.pde
   :tag: Link

The ``Link`` class is quite simple.
There are two forms for its constructor, one with
an initial element value and one without.
Member functions allow the link user to get or set the ``element``
and ``link`` fields.

.. inlineav:: LlistBadCON ss
   :output: show

There are a number of problems with the representation just
described.
First, there are lots of special cases to code up when the list is
empty, or when the current position is at an end of the list.
Special cases will occur when the list is empty because then we have
no element for ``head``, ``tail``, and ``curr`` to point to.
Implementing these special cases for ``insert`` and ``remove``
increases code complexity, making it harder to understand,
and thus increases the chance of introducing bugs.

.. TODO::
   :type: Slideshow

   The following slideshow needs a bit of polishing.
   
.. inlineav:: LlistBadReasonCON ss
   :output: show
   
Fortunately, there is a fairly easy way to deal with all of the
special cases, as well as the problem with deleting the last node.
Many special cases can be eliminated by implementing
linked lists with an additional :dfn:`header node`
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

.. _LinkedListInit:

.. inlineav:: listLinkedInitCON dgm
   :align: center

   Initial conditions for the linked list, with header and trailer
   nodes.

Adding the trailer node also solves our problem with deleting the last
node on the list, as we will see when we take a closer look at the
remove method's implementation.

Here is what the list looks like with the header and trailer nodes
added.
   
.. inlineav:: listLinkedHeaderTailerCON dgm
   :align: center

Here is the implementation for the linked list class,
named ``LList``.

.. codeinclude:: Lists/LList.pde
   :tag: LList

.. inlineav:: LlistVarsCON ss
   :output: show

.. inlineav:: LListCons ss
   :output: show

Implementations for most member functions of the ``list``
class are straightforward.
However, ``insert`` and ``remove`` should be studied carefully.

.. inlineav:: LlistInsertCON ss
   :output: show
   
Special case for Linked list insertion 

.. inlineav:: LlistSpecInsertCON ss
   :output: show
   
.. inlineav:: LlistRemoveCON ss
   :output: show
   
.. TODO::
   :type: Slideshow

   Method ``next`` simply moves ``curr`` one position toward the tail of
   the list, which takes :math:`\Theta(1)` time.
   Method ``prev`` moves ``curr`` one position toward the head of the
   list, but its implementation is more difficult.
   In a singly linked list, there is no pointer to the previous node.
   Thus, the only alternative is to march down the list from the
   beginning until we reach the current node (being sure always to
   remember the node before it, because that is what we really want).
   This takes :math:`\Theta(n)` time in the average and worst cases.
   Implementation of method ``moveToPos`` is
   similar in that finding the :math:`i` th position requires marching
   down :math:`i` positions from the head of the list, taking
   :math:`\Theta(i)` time.
   
.. inlineav:: LlistPosCON ss
   :output: show
   
Implementations for the remaining operations each require
:math:`\Theta(1)` time.

.. TODO::
   :type: Exercise

   Proficiency exercise (probably using KA, but possibly not) for
   linked list insertion. Show a linked list, and below it a node
   holding the new value. User will do a series of drags for values
   and links to get the new node into place.

.. TODO::
   :type: Exercise

   Proficiency exercise (probably using KA, but possibly not) for
   linked list deletion. Show a linked list. User will do a series of
   drags for values and links to get the list updated properly.

.. TODO::
   :type: Exercise

   Add a battery of summary questions.

.. odsascript:: AV/Development/listLinkedCON.js
