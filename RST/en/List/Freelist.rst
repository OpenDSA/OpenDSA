.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: linked list
   :satisfies: freelist
   :topic: Lists
   
.. odsalink:: AV/List/listFreeCON.css

Freelists
=========

Freelists
---------

The ``new`` operator is relatively expensive to use.
Garbage collection is also expensive.
A :chap:`memory manager <memory manager> <Memory Management>`
handles general-purpose memory requests.
The expense comes from the fact that :term:`free store` routines must
be capable of handling requests to and from free store with no
particular pattern, as well as memory requests of vastly different
sizes.
This, combined with unpredictable freeing of space by the garbage
collector, makes them inefficient compared to what might be
implemented for more controlled patterns of memory access.

List nodes are created and deleted in a :term:`linked list`
implementation in a way that allows the ``Link`` class programmer
to provide simple but efficient memory management routines.
Instead of making repeated calls to ``new``, 
the ``Link`` class can handle its own :term:`freelist`.
A freelist holds those list nodes that are not currently being used.
When a node is deleted from a linked list, it is placed at the
head of the freelist.
When a new element is to be added to a linked list, the freelist
is checked to see if a list node is available.
If so, the node is taken from the freelist.
If the freelist is empty, the standard ``new`` operator must then
be called.
So we see that the freelist is simply
an application of a :ref:`linked stack <linked stack> <StackLinked>`.

.. inlineav:: listFreeCON ss
   :output: show

Freelists are particularly useful for linked lists that periodically
grow and then shrink.
The freelist will never grow larger than the largest size yet reached
by the linked list.
Requests for new nodes (after the list has shrunk) can be handled by
the freelist.
Another good opportunity to use a freelist occurs when a program uses
multiple lists.
So long as they do not all grow and shrink together, the free list can
let link nodes move between the lists.

In the implementation shown here, the ``Link`` class is augmented with
methods ``get`` and ``release``. [#]_

.. codeinclude:: Lists/Freelink
   :tag: Freelink

The ``freelist`` variable declaration uses the keyword ``static``.
This creates a single variable shared among all instances of the
``Link`` nodes.
In this way, a single freelist is shared by all ``Link`` nodes.

Note how simple they are, because they need only remove and add an
element to the front of the freelist, respectively.
The freelist methods ``get`` and ``release`` both run in
:math:`\Theta(1)` time, except in the case where the freelist is
exhausted and the ``new`` operation must be called.
Here are the necessary modifications to members of the linked list
class to make use of the freelist version of the link class.

.. codeinclude:: Lists/Freelist
   :tag: Freelist

How much time is saved by using freelists depends on the language that
you are programming in.
In a language like C++ where the programmer must call ``new`` and
``delete`` to manage memory, getting a node from your own freelist
requires less than one tenth of the time required by the ``new``
operator.
In a language like Java that uses garbage collection, it might at
first appear that using your own freelist saves no time, because
Java's ``new`` operator can quickly return space from the current
start of its memory pool.
However, when you do not use a freelist, dropping access to nodes
creates garbage which leads to expensive processing at garbage
collection time.

.. [#] A language like C++ could use operator overloading to redefine
   the ``new`` and ``delete`` operators.

.. odsascript:: AV/List/llist.js
.. odsascript:: AV/List/listFreeCON.js
