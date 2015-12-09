.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: list ADT
   :satisfies: queue; array-based queue
   :topic: Lists

.. odsalink:: AV/List/aqueueCON.css

Queues
======

Queue Terminology
-----------------

Like the stack, the :term:`queue` is a list-like structure that
provides restricted access to its elements.
Queue elements may only be inserted at the back (called an
:term:`enqueue` operation) and removed from the
front (called a :term:`dequeue` operation).
Queues operate like standing in line at a movie theater ticket
counter.
If nobody cheats, then newcomers go to the back of the line.
The person at the front of the line is the next to be served.
Thus, queues release their elements in order of arrival.
In Britain, a line of people is called a "queue",
and getting into line to wait for service is called "queuing up".
Accountants have used queues since long before the
existence of computers.
They call a queue a "FIFO" list, which stands for
"First-In, First-Out".
Here is a sample queue ADT.
This section presents two implementations for queues:
the array-based queue and the linked queue.

.. codeinclude:: Lists/Queue
   :tag: Queue


Array-Based Queues
------------------

The array-based queue is somewhat tricky to implement effectively.
A simple conversion of the array-based list implementation is not
efficient.

.. inlineav:: aqueueFirstCON ss
   :output: show

|

.. inlineav:: aqueueDriftCON ss
   :output: show

|

.. inlineav:: aqueueBadCON ss
   :output: show


The Circular Queue
~~~~~~~~~~~~~~~~~~

.. inlineav:: aqueueCircularCON ss
   :output: show

|

.. inlineav:: aqueueEmptyCON ss
   :output: show

If the value of ``front`` is fixed, then :math:`n+1` different
values for ``rear`` are needed to distinguish among the :math:`n+1`
states.
However, there are only :math:`n` possible values for ``rear`` unless
we invent a special case for, say, empty queues.
This is an example of the :term:`Pigeonhole Principle`.
The Pigeonhole Principle states that, given :math:`n` pigeonholes
and :math:`n+1` pigeons, when all of the pigeons go into the holes we
can be sure that at least one hole contains more than one pigeon.
In similar manner, we can be sure that two of the :math:`n+1` states
are indistinguishable by the :math:`n` relative values of ``front``
and ``rear``.
We must seek some other way to distinguish full from empty queues.

One obvious solution is to keep an explicit count of the number of
elements in the queue, or at least a Boolean variable that indicates
whether the queue is empty or not.
Another solution is to make the array be of size :math:`n+1`,
and only allow :math:`n` elements to be stored.
Which of these solutions to adopt is purely a matter of the
implementor's taste in such affairs.
Our choice here is to use an array of size :math:`n+1`.

Here is an array-based queue implementation.

.. codeinclude:: Lists/AQueue
   :tag: AQueue1,AQueue2


Array-based Queue Implementation
--------------------------------

.. inlineav:: aqueueVarCON ss
   :output: show

In this implementation, the front of the queue is defined to be toward
the lower numbered positions in the array (in the counter-clockwise
direction in the circular array), and the rear is
defined to be toward the higher-numbered positions.
Thus, ``enqueue`` increments the rear pointer (modulus ``maxSize``),
and ``dequeue`` increments the front pointer.
Implementation of all member functions is straightforward.

.. avembed:: Exercises/List/AqueueEnqueuePRO.html ka


Array-based Dequeue Practice
----------------------------

.. avembed:: Exercises/List/AqueueDequeuePRO.html ka

.. odsascript:: DataStructures/CircularQueue.js
.. odsascript:: AV/List/aqueueFirstCON.js
.. odsascript:: AV/List/aqueueDriftCON.js
.. odsascript:: AV/List/aqueueBadCON.js
.. odsascript:: AV/List/aqueueCircularCON.js
.. odsascript:: AV/List/aqueueEmptyCON.js
.. odsascript:: AV/List/aqueueVarCON.js
