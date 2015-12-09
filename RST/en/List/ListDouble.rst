.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: linked list
   :satisfies: doubly linked list
   :topic: Lists

.. odsalink:: DataStructures/DoubleLinkList.css
.. odsalink:: AV/List/dlistCON.css


Doubly Linked Lists
===================

Doubly Linked Lists
-------------------

The :ref:`singly linked list <linked list> <ListLinked>` allows
for direct access from a list node only to the next node in the list.
A :term:`doubly linked list` allows convenient access from a list node
to the next node and also to the preceding node on the list.
The doubly linked list node accomplishes this in the obvious way by
storing two pointers: one to the node following it (as in the singly
linked list), and a second pointer to the node preceding it.

.. _DblListFig:

.. inlineav:: dlistDiagramCON dgm
   :align: center
   
   A doubly linked list.

The most common reason to use a doubly linked list is
because it is easier to implement than a singly linked list.
While the code for the doubly linked implementation is a little longer
than for the singly linked version, it tends to be a bit more
"obvious" in its intention, and so easier to implement and debug.
Whether a list implementation is doubly or singly linked should
be hidden from the ``List`` class user.

Like our singly linked list implementation, the doubly linked list
implementation makes use of a :term:`header node`.
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

In our implementation, ``curr`` will point to the
:term:`current position` (or to the :term:`trailer node` if the
current position is at the end of the list).
 
Here is the complete implementation for a
``Link`` class to be used with doubly linked lists.
This code is a little longer than that for the singly linked list node
implementation since
the doubly linked list nodes have an extra data member.

.. codeinclude:: Lists/DLink
   :tag: DLink


Insert
~~~~~~

The following slideshows illustrate the ``insert`` and ``append``
doubly linked list methods.
The class declaration and the remaining member functions for the
doubly linked list class are nearly identical to the singly linked
list version.
While the code for these methods might be a little longer than their
singly linked list counterparts (since there is an extra pointer in
each node to deal with), they tend to be easier to understand.

.. inlineav:: dlistInsertCON ss
   :output: show   
   

Append
~~~~~~

.. inlineav:: dlistAppendCON ss
   :output: show  
   

Remove
~~~~~~

.. inlineav:: dlistRemoveCON ss
   :output: show
   

Prev
~~~~

.. inlineav:: dlistPrevCON ss
   :output: show
   
The only disadvantage of the doubly linked list as compared to the
singly linked list is the additional space used.
The doubly linked list requires two pointers per node, and so in the
implementation presented it requires twice as much overhead as
the singly linked list.

.. TODO::
   :type: Exercise

   Need exercises for inserting to and deleting from doubly linked lists.


Mangling Pointers
~~~~~~~~~~~~~~~~~

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

The principle behind this technique is worth remembering, as it
has many applications.
The following code fragment will
swap the contents of two variables without using a temporary variable
(at the cost of three arithmetic operations).

.. codeinclude:: Lists/DList
   :tag: XOR

A similar effect can be had by using the exclusive-or operator.
This fact is widely used in computer graphics.
A region of the computer screen can be highlighted by
XORing the outline of a box around it.
XORing the box outline a second time restores the original
contents of the screen.

.. odsascript:: DataStructures/DoubleLinkList.js
.. odsascript:: AV/List/dlist.js
.. odsascript:: AV/List/dlistDiagramCON.js
.. odsascript:: AV/List/dlistInsertCON.js
.. odsascript:: AV/List/dlistAppendCON.js
.. odsascript:: AV/List/dlistRemoveCON.js
.. odsascript:: AV/List/dlistPrevCON.js
