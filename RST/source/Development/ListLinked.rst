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

A linked list is made up of a series of objects, called the
:dfn:`nodes` of the list.
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

.. TODO::
   :type: Slideshow

   The ``Link`` class is quite simple.
   There are two forms for its constructor, one with
   an initial element value and one without.
   Member functions allow the link user to get or set the ``element``
   and ``link`` fields.

.. TODO::
   :type: Slideshow

   [The image should become a JSAV slideshow.]
   Here is a graphical depiction for a
   linked list storing four integers.
   The value stored in a pointer variable is indicated by an arrow
   "pointing" to something.
   A ``NULL`` pointer is indicated graphically by a diagonal slash
   through a pointer variable's box.
   The vertical line between the nodes labeled 23 and 12 in
   Figure :num:`Figure #BadList` (a) indicates the current position
   (immediately to the right of this line).

   The list's first node is accessed from a pointer named
   ``head``.
   To speed access to the end of the list, and to allow the
   ``append`` method to be performed in
   constant time, a pointer named ``tail`` is also kept to the last
   link of the list.
   The position of the current element is indicated by another pointer,
   named ``curr``.

.. _BadList:

.. odsafig:: Images/BadList.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Linked list implementation: ``curr`` points to current node

   ``curr`` points directly to the current node.
   (a) Linked list prior to inserting element with value 10.
   (b) Desired effect of inserting element with
   value 10.

There are a number of problems with the figure above.
First, there are lots of special cases when the list is
empty, or when the current position is at an end of the list.
Special cases occur when the list is empty, since then we have no
element for ``head``, ``tail``, and ``curr`` to point to.
Implementing special cases for ``insert`` and ``remove``
increases code complexity, making it harder to understand,
and thus increases the chance of introducing bugs.

.. TODO::
   :type: Slideshow

   Another problem comes up when curr points to the last element.
   Since we have no pointer available to the node preceding the
   current node, there is no way to change that node's ``next``
   pointer value.
   Normally we can deal with this by bringing the element from the
   node following curr, and dropping that element.
   But we cannot do that if ``curr`` is already pointing to that last
   element.
   There is no way around this problem with the list as shown here.

Fortunately, there is a fairly easy way to deal with all of the
special cases, as well as the problem with deleting the last node.
These special cases can be eliminated by implementing
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
In practice, this reduction in code size typically saves more space
than that required for the header node, depending on the number of
lists created.
We get rid of the remaining special cases related to being at the end
of the list by adding a "trailer" node that also never stores a
value.
The initial condition for an empty list is shown in Figure
:num:`Figure #LinkedListInit`.

.. _LinkedListInit:

.. inlineav:: listLinkedCON3 dgm
   :align: center

   Initial conditions for the linked list, with header and trailer nodes.

Here is the implementation for the linked list class,
named ``LList``.

.. codeinclude:: Lists/LList.pde
   :tag: LList

.. TODO::
   :type: Slideshow

   [Slideshow walking through the data members.]
   Class ``LList`` inherits from the abstract list class and
   thus must implement all the member functions of Class ``List``.
   Since there is no simple way to compute the length of the
   list simply from these three pointers, the list length will be stored
   explicitly, and updated by every operation that modifies the list size.
   The value ``cnt`` stores the length of the list.

.. TODO::
   :type: Slideshow

   Note that the constructor for ``LList`` maintains the optional
   parameter for minimum list size introduced for Class ``AList``.
   This is done simply to keep the calls to the constructor
   the same for both variants.
   Because the linked list class does not need to declare a fixed-size
   array when the list is created, this parameter is unnecessary for
   linked lists.
   It is ignored by the implementation.

Implementations for most member functions of the ``list``
class are straightforward.
However, ``insert`` and ``remove`` should be studied carefully.

.. TODO::
   :type: Slideshow

   [Roll this text into the slideshow, and fix slideshow to reflect
   the new list design. Need to deal with header/trailer, or else give
   impression that we are in the middle of the list.]
   [Need to add examples showing insert at head and tail, and maybe
   into empty list. Perhaps in separate slideshows?]
   Inserting a new element is a three-step process.
   First, the new list node is created and the new element is
   stored into it.
   Second, the ``next`` field of the new list node is assigned to
   point to the current node (the one *after* the node that
   ``curr`` points to).
   Third, the ``next`` field of node pointed to by ``curr``
   is assigned to point to the newly inserted node.
   The following line in the ``insert`` method of
   does all three of these steps.

   ``curr.setNext(new Link<E>(it, curr.next()));``

   Operator ``new`` creates the new link node
   and calls the :math:`Link` class constructor,
   which takes two parameters.
   The first is the element.
   The second is the value to be placed in the list node's ``next``
   field, in this case ``\Cref{curr.next}``.
   Method ``setNext`` does the assignment to the ``next`` field of
   ``curr``.
   Figure :num:`Figure #LinkInsert` illustrates this three-step process.
   Once the new node is added, ``tail`` is pushed forward if the new
   element was added to the end of the list.
   Insertion requires :math:`\Theta(1)` time.

.. inlineav:: listLinkedCON1 ss
   :output: show

.. _LinkInsert:

.. odsafig:: Images/LinkIns.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: The linked list insertion process

   The linked list insertion process.
   (a) The linked list before insertion.
   (b) The linked list after insertion.
   :math:`\fbox{1}` marks the ``element`` field of the new link node.
   :math:`\fbox{2}` marks the ``next`` field of the new link node,
   which is set to point to what used to be the current node
   (the node with value 12).
   :math:`\fbox{3}` marks the ``next`` field of the node preceding the
   current position.
   It used to point to the node containing 12; now it points to the
   new node containing 10.

.. TODO::
   :type: Slideshow

   Removing a node from the linked list requires only that
   the appropriate pointer be redirected around the node to be deleted.
   The following lines from the ``remove`` method of
   does precisely this.::

      E it = curr.next().element();\ \ \ \ \     // Remember value\\
      curr.setNext(curr.next().next());  // Remove from list\\
   
   Memory for the link will eventually be reclaimed by the
   garbage collector.
   Figure :num:`Figure #LinkRemove` illustrates the ``remove``
   method.
   Removing an element requires :math:`\Theta(1)` time.

.. inlineav:: listLinkedCON2 ss
   :output: show
   
.. _LinkRemove:

.. odsafig:: Images/LinkRem.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: The linked list removal process

   The linked list removal process.
   (a) The linked list before removing the node with value 10.
   (b) The linked list after removal.
   :math:`\fbox{1}` marks the list node being removed.
   ``it`` is set to point to the element.
   :math:`\fbox{2}` marks the ``next`` field of the preceding list
   node, which is set to point to the node following the one being
   deleted.

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

Implementations for the remaining operations each require
:math:`\Theta(1)` time.

.. odsascript:: AV/Development/listLinkedCON.js
