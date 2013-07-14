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
   
.. TODO::
   :type: Slideshow

   Implement these paragraphs using a slideshow.

   There remains one more serious, though subtle, problem to the
   array-based queue implementation.
   How can we recognize when the queue is empty or full?
   Assume that ``front`` stores the array index for the front element
   in the queue, and ``rear`` stores the array index for the rear
   element.
   If both ``front`` and ``rear`` have the same position, then
   with this scheme there must be one element in the queue.
   Thus, an empty queue would be recognized by having ``rear`` be
   *one less* than ``front`` (taking into account the fact that
   the queue is circular, so position ``size-1`` is actually
   considered to be one less than position 0).
   But what if the queue is completely full?
   In other words, what is the situation when a queue with :math:`n`
   array positions available contains :math:`n` elements?
   In this case, if the front element is in position 0, then the rear
   element is in position ``size-1``.
   But this means that the value for ``rear`` is one less than the
   value for ``front`` when the circular nature of the queue is taken
   into account.
   In other words, the full queue is indistinguishable from the empty
   queue!

   You might think that the problem is in the assumption about
   ``front`` and ``rear`` being defined to store the array indices
   of the front and rear elements, respectively, and that some
   modification in this definition will allow a solution.
   Unfortunately, the problem cannot be remedied by a simple change to
   the definition for ``front`` and ``rear``, because of
   the number of conditions or ``states`` that the queue can be in.
   Ignoring the actual position of the first element, and ignoring the
   actual values of the elements stored in the queue, how many different
   states are there?
   There can be no elements in the queue, one element, two, and so on.
   At most there can be :math:`n` elements in the queue if there are
   :math:`n` array positions.
   This means that there are :math:`n+1` different states for the queue
   (0 through :math:`n` elements are possible).

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
direction in Figure :num:`Figure #GoodQueue`), and the rear is
defined to be toward the higher-numbered positions.
Thus, ``enqueue`` increments the rear pointer (modulus ``size``),
and ``dequeue`` increments the front pointer.
Implementation of all member functions is straightforward.

.. TODO::
   :type: Exercise

   Need exercises for pushing and popping on array-based queues.

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
