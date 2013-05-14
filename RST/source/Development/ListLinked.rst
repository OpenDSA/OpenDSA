.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists

Linked Lists [Text]
===================

The second traditional approach to implementing lists makes use of
pointers and is usually called a :dfn:`linked list`.
The linked list uses
:dfn:`dynamic memory allocation`,
that is, it allocates memory for new list elements as needed.

A linked list is made up of a series of objects, called the
:dfn:`nodes` of the list.
Because a list node is a distinct object (as opposed to simply a cell
in an array), it is good practice to make a separate list node class.
An additional benefit to creating a list node class is that
it can be reused by the linked implementations for the stack and
queue data structures presented later in this chapter.
Here is the code for the implementation for
list nodes, called the ``Link`` class.
Objects in the ``Link`` class contain an ``element`` field to
store the element value, and a ``next`` field to store a pointer to
the next node on the list.
The list built from such nodes is called a
:dfn:`singly linked list`,
or a :dfn:`one-way list`, because each list node
has a single pointer to the next node on the list.

.. codeinclude:: Lists/Link.pde
   :tag: Link

The ``Link`` class is quite simple.
There are two forms for its constructor, one with
an initial element value and one without.
Member functions allow the link user to get or set the ``element``
and ``link`` fields.

Figure :num:`Figure #BadList` (a) shows a graphical depiction for a
linked list storing four integers.
The value stored in a pointer variable is indicated by an arrow
"pointing" to something.
A ``NULL`` pointer is indicated graphically by a diagonal slash
through a pointer variable's box.
The vertical line between the nodes labeled 23 and 12 in
Figure :num:`Figure #BadList` (a) indicates the current position
(immediately to the right of this line).

.. _BadList:

.. odsafig:: Images/BadList.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Linked list implementation: ``curr`` points to current node

   Illustration of a faulty linked-list implementation where
   ``curr`` points directly to the current node.
   (a) Linked list prior to inserting element with value 10.
   (b) Desired effect of inserting element with
   value 10.

The list's first node is accessed from a pointer named
``head``.
To speed access to the end of the list, and to allow the
``append`` method to be performed in
constant time, a pointer named ``tail`` is also kept to the last
link of the list.
The position of the current element is indicated by another pointer,
named ``curr``.
Finally, because there is no simple way to compute the length of the
list simply from these three pointers, the list length must be stored
explicitly, and updated by every operation that modifies the list size.
The value ``cnt`` stores the length of the list.

Note that the constructor for ``LList`` maintains the optional
parameter for minimum list size introduced for Class ``AList``.
This is done simply to keep the calls to the constructor
the same for both variants.
Because the linked list class does not need to declare a fixed-size
array when the list is created, this parameter is unnecessary for
linked lists.
It is ignored by the implementation.

A key design decision for the linked list implementation is how to
represent the current position.
The most reasonable choices appear to be a pointer to the current
element.
But there is a big advantage to making ``curr`` point to the
element preceding the current element.

Figure :num:`Figure #BadList` (a) shows the list's
``curr`` pointer pointing to the current element.
The vertical line between the nodes containing 23 and 12 indicates the
logical position of the current element.
Consider what happens if we wish to insert a new node with value 10
into the list.
The result should be as shown in Figure :num:`Figure #BadList` (b).
However, there is a problem.
To "splice" the list node containing the new element
into the list, the list node storing 23 must have its
``next`` pointer changed to point to the new node.
Unfortunately, there is no convenient access to the node preceding
the one pointed to by ``curr``.

There is an easy solution to this problem.
If we set ``curr`` to point directly to the preceding element,
there is no difficulty in adding a new element after ``curr``.
Figure :num:`Figure #GoodList` shows how the list looks when pointer
variable ``curr`` is set to point to the node preceding the physical
current node.

.. TODO::
   :type: Text

   Deal with this: See Exercise "FenceExer" for further discussion of
   why making ``curr`` point directly to the current element fails.

.. _GoodList:

.. odsafig:: Images/GoodList.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Insertion using a header node

   Insertion using a header node, with ``curr`` pointing one node ahead
   of the current element.
   (a) Linked list before insertion.
   The current node contains 12.
   (b) Linked list after inserting the node containing 10.

We encounter a number of potential special cases when the list is
empty, or when the current position is at an end of the list.
In particular, when the list is empty we have no element for
``head``, ``tail``, and ``curr`` to point to.
Implementing special cases for ``insert`` and ``remove``
increases code complexity, making it harder to understand,
and thus increases the chance of introducing a programming bug.

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
Figure :num:`Figure #InitList` shows the state of an initialized or
empty list when using a header node.

.. _InitList:

.. odsafig:: Images/InitList.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Initial state of a linked list when using a header node

   Initial state of a linked list when using a header node.

Here is the implementation for the linked list class,
named ``LList``.
Class ``LList`` inherits from the abstract list class and
thus must implement all the member functions of Class ``List``.

.. codeinclude:: Lists/LList.pde
   :tag: LList

Implementations for most member functions of the ``list``
class are straightforward.
However, ``insert`` and ``remove`` should be studied carefully.

Inserting a new element is a
three-step process.
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

.. TODO::
   :type: Slideshow

   This code above needs to be put in a slideshow.

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
similar in that finding the :math:`i`th position requires marching
down :math:`i` positions from the head of the list, taking
:math:`\Theta(i)` time.

Implementations for the remaining operations each require
:math:`\Theta(1)` time.
