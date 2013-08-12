.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists

.. odsalink:: AV/Development/listQueueCON.css   
   
Queues [Storyboard]
===================

Queue Terminology
-----------------

Like the stack, the :dfn:`queue` is a list-like structure that
provides restricted access to its elements.
Queue elements may only be inserted at the back (called an
:dfn:`enqueue` operation) and removed from the
front (called a :dfn:`dequeue` operation).
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

.. codeinclude:: Lists/Queue.pde
   :tag: Queue

Array-Based Queues
------------------

The array-based queue is somewhat tricky to implement effectively.
A simple conversion of the array-based list implementation is not
efficient.

.. inlineav:: AQueueFirstNposCON ss
   :output: show

.. inlineav:: AQueueDriftposCON ss
   :output: show
   
.. inlineav:: AQueueBadCON ss
   :output: show 
   
.. inlineav:: AQueueCircularCON ss
   :output: show 
   
.. inlineav:: AQueueEmptyFullCON ss
   :output: show 
   
If the value of ``front`` is fixed, then :math:`n+1` different
values for ``rear`` are needed to distinguish among the :math:`n+1`
states.
However, there are only :math:`n` possible values for ``rear`` unless
we invent a special case for, say, empty queues.
This is an example of the :dfn:`Pigeonhole Principle`
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

.. codeinclude:: Lists/AQueue.pde
   :tag: AQueue1,AQueue2

.. inlineav:: AQueueVarCON ss
   :output: show 
   
In this implementation, the front of the queue is defined to be toward
the lower numbered positions in the array (in the counter-clockwise
direction in the circular array), and the rear is
defined to be toward the higher-numbered positions.
Thus, ``enqueue`` increments the rear pointer (modulus ``size``),
and ``dequeue`` increments the front pointer.
Implementation of all member functions is straightforward.

.. avembed:: Exercises/Development/listAQueueEnqueue.html ka

.. avembed:: Exercises/Development/listAQueueDequeue.html ka

Linked Queues
-------------

The linked queue implementation is a straightforward adaptation
of the linked list.
Here is the linked queue class declaration.

.. codeinclude:: Lists/LQueue.pde
   :tag: LQueue1,LQueue2

.. inlineav:: LQueueIntroCON ss
   :output: show    
   
.. inlineav:: LQueueEnqueueCON ss
   :output: show   
   
.. inlineav:: LQueueDequeueCON ss
   :output: show 
   
.. avembed:: Exercises/Development/listLQueueEnqueue.html ka

.. avembed:: Exercises/Development/listLQueueDequeue.html ka

.. TODO::
   :type: Exercise

   Need exercises for pushing and popping on linked queues.

Comparison of Array-Based and Linked Queues
-------------------------------------------

All member functions for both the array-based and linked queue
implementations require constant time.
The space comparison issues are the same as for the equivalent stack
implementations.
Unlike the array-based stack implementation, there is no convenient
way to store two queues in the same array,
unless items are always transferred directly from one queue to the other.

.. TODO::
   :type: Exercise

   Add a battery of summary questions.

.. odsascript:: AV/Development/listQueueCON.js
