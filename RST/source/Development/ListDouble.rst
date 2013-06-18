.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists
.. odsalink:: AV/Development/dlist.css
.. odsalink:: AV/Development/listDLinkedCON.css


Doubly Linked Lists [Storyboard]
================================

The singly linked list
presented in Module :numref:`<ListLinked>` allows
for direct access from a list node only to the next node in the list.
A :dfn:`doubly linked list` allows convenient access from a list node
to the next node and also to the preceding node on the list.
The doubly linked list node accomplishes this in the obvious way by
storing two pointers: one to the node following it (as in the singly
linked list), and a second pointer to the node preceding it.

.. TODO::
   :type: Diagram

   Show the doubly linked list, replacing the following image:

.. _DblListFig:

.. odsafig:: Images/DblListF.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: A doubly linked list

   A doubly linked list.

The most common reason to use a doubly linked list is
because it is easier to implement than a singly linked list.
While the code for the doubly linked implementation is a little longer
than for the singly linked version, it tends to be a bit more
"obvious" in its intention, and so easier to implement and debug.
Whether a list implementation is doubly or singly linked should
be hidden from the ``List`` class user.

Like our singly linked list implementation, the doubly linked list
implementation makes use of a header node.
We also add a tailer node to the end of the list.
The tailer is similar to the header, in that it is a node that
contains no value, and it always exists.
When the doubly linked list is initialized, the header and tailer
nodes are created.
Data member ``head`` points to the header node, and ``tail``
points to the tailer node.
The purpose of these nodes is to simplify the ``insert``,
``append``, and ``remove`` methods by eliminating all need for
special-case code when the list is empty, or when we insert at the
head or tail of the list.

In our implementation, ``curr`` will point to the current node (or to
the tail if the current position is at the end of the list).

.. TODO::
   :type: Slideshow

   This following slideshow is a technology demonstration only, it
   will go away.

.. inlineav:: DLlistInsertCON ss
   :output: show
   
Here is the complete implementation for a
``Link`` class to be used with doubly linked lists.
This code is a little longer than that for the singly linked list node
implementation since
the doubly linked list nodes have an extra data member.

.. codeinclude:: Lists/DLink.pde
   :tag: DLink

The following slideshows illustrate the ``insert``, ``append``,
``remove``, and ``prev`` doubly linked list methods.
The class declaration and the remaining member functions for the
doubly linked list class are nearly identical to the singly linked
list version.
While the code for these methods might be a little longer than their
singly linked list counterparts (since there is an exra pointer in
each node to deal with), they tend to be simpler.

.. TODO::
   :type: Code

   This following code display will be removed, replaced by the four
   slideshows for these methods.

.. codeinclude:: Lists/Dlist.pde
   :tag: Dlist

.. TODO::
   :type: Slideshow

   Slideshow to display the ``insert`` method and do a walkthrough of
   inserting a node into the doubly linked list. This will replace the
   following text and the image.

The ``insert`` method is especially simple for our doubly linked
list implementation, because most of the work is done by the node's
constructor.
Figure :num:`Figure #DblListInsert` shows the list before and after
insertion of a node with value 10.

.. _DblListInsert:

.. odsafig:: Images/DblListI.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Doubly linked list insertion

   Insertion for doubly linked lists.
   The labels :math:`\fbox{1}`, :math:`\fbox{2}`, and :math:`\fbox{3}`
   correspond to assignments done by the linked list node constructor.
   :math:`\fbox{4}` marks the assignment to ``curr->next``.
   :math:`\fbox{5}` marks the assignment to the ``prev`` pointer
   of the node following the newly inserted node.

The three parameters to the ``new`` operator allow the list node
class constructor to set the :math:`element`, :math:`prev`, and
:math:`next` fields, respectively, for the new link node.
The :math:`new` operator returns a pointer to the newly created node.
The nodes to either side have their pointers updated to point to the
newly created node.
The existence of the header and tailer nodes mean that there are no
special cases to worry about when inserting into an empty list.

.. TODO::
   :type: Slideshow

   Slideshow to display the ``append`` method and do a walkthrough of
   appending a node at the end of a doubly linked list. This will
   replace the following text.

The :math:`append` method is also simple.
Again, the ``Link`` class constructor sets the ``element``,
``prev``, and ``next`` fields of the node when the ``new``
operator is executed.

.. TODO::
   :type: Slideshow

   Slideshow to display the ``remove`` method and do a walkthrough of
   removing a node from a doubly linked list. This will
   replace the following text and image.

.. _DblListRemove:

.. odsafig:: Images/DblListD.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Doubly linked list removal

   Doubly linked list removal.
   Element ``it`` stores the element of the node being removed.
   Then the nodes to either side have their pointers adjusted.

Method ``remove`` (illustrated by Figure :num:`Figure #DblListRemove`)
is straightforward, though the code is somewhat longer.
First, the variable ``it`` is assigned the value being removed.
Note that we must separate the element, which is returned to the
caller, from the link object.
The following lines then adjust the list.

.. codeinclude:: Lists/DoubleTest.pde
   :tag: Adjust

The first line stores the value of the node being removed.
The second line makes the next node's ``prev`` pointer point to the
left of the node being removed.
Finally, the ``next`` field of the node preceding the one being
deleted is adjusted.
The final steps of method ``remove`` are to update the
list length and return the value of the deleted element.

.. TODO::
   :type: Slideshow

   Slideshow to display the ``prev`` method and do a walkthrough of
   calling ``prev`` on doubly linked list.

The only disadvantage of the doubly linked list as compared to the
singly linked list is the additional space used.
The doubly linked list requires two pointers per node, and so in the
implementation presented it requires twice as much overhead as
the singly linked list.

Notes
-----

There is a space-saving technique that can be employed to eliminate
the additional space requirement, though it will complicate the
implementation and be somewhat slower.
Thus, this is an example of a
space/time tradeoff.
It is based on observing that, if we store the sum of two values,
then we can get either value back by subtracting the other.
That is, if we store :math:`a + b` in variable :math:`c`, then
:math:`b = c - a` and :math:`a = c - b`.
Of course, to recover one of the values out of the stored summation,
the other value must be supplied.
A pointer to the first node in the list, along with the value of one
of its two link fields, will allow access to all of the remaining
nodes of the list in order.
This is because the pointer to the node must be the same as the value
of the following node's ``prev`` pointer, as well as the previous
node's ``next`` pointer.
It is possible to move down the list breaking apart the
summed link fields as though you were opening a zipper.
Details for implementing this variation are left as an exercise.

The principle behind this technique is worth remembering, as it
has many applications.
The following code fragment will
swap the contents of two variables without using a temporary variable
(at the cost of three arithmetic operations).

.. codeinclude:: Lists/DoubleTest.pde
   :tag: ch4p1

A similar effect can be had by using the exclusive-or operator.
This fact is widely used in computer graphics.
A region of the computer screen can be highlighted by
XORing the outline of a box around it.
XORing the box outline a second time restores the original
contents of the screen.

.. odsascript:: AV/Development/dlist.js
.. odsascript:: AV/Development/listDLinkedCON.js
