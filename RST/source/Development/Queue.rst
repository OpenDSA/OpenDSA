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

.. TODO::
   :type: Slideshow

   Implement this paragraph using a slideshow.

   Assume that there are :math:`n` elements in the queue.
   By analogy to the array-based list implementation, we could require
   that all elements of the queue be stored in the first :math:`n`
   positions of the array.
   If we choose the rear element of the queue to be in position 0,
   then ``dequeue`` operations require only :math:`\Theta(1)` time
   because the front element of the queue (the one being removed) is the
   last element in the array.
   However, ``enqueue`` operations will require :math:`\Theta(n)` time,
   because the :math:`n` elements currently in the queue must
   each be shifted one position in the array.
   If instead we chose the rear element of the queue to be in
   position :math:`n-1`, then an ``enqueue`` operation is equivalent to
   an ``append`` operation on a list.
   This requires only :math:`\Theta(1)` time.
   But now, a ``dequeue`` operation requires :math:`\Theta(n)` time,
   because all of the elements must be shifted down by one position to
   retain the property that the remaining $n-1$ queue elements reside in
   the first :math:`n-1` positions of the array.
   
.. inlineav:: AQueueFirstNposCON ss
   :output: show

.. TODO::
   :type: Slideshow

   Implement this paragraph using a slideshow. (It should only need
   few slides to get the idea across.) This will replace the following
   image.

   A far more efficient implementation can be obtained by relaxing the
   requirement that all elements of the queue must be in the first
   $n$~positions of the array.
   We will still require that the queue be stored be in contiguous array
   positions, but the contents of the queue will be permitted to drift
   within the array, as illustrated by Figure :num:`Figure #BadQueue`.
   Now, both the ``enqueue`` and the ``dequeue`` operations can be
   performed in :math:`\Theta(1)` time because no other elements in the
   queue need be moved.
   
.. inlineav:: AQueueDriftposCON ss
   :output: show
   
.. _BadQueue:

.. odsafig:: Images/BadQueue.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Queue elements will drift to the back of the array

   After repeated use, elements in the array-based queue will drift to
   the back of the array.
   (a) The queue after the initial four numbers 20, 5, 12, and 17 have
   been inserted.
   (b) The queue after elements 20 and 5 are deleted, following which
   3, 30, and 4 are inserted.

.. TODO::
   :type: Slideshow

   Implement this paragraph using a slideshow.

   This implementation raises a new problem.
   Assume that the front element of the queue is initially at
   position~0, and that elements are added to successively
   higher-numbered positions in the array.
   When elements are removed from the queue, the front index increases.
   Over time, the entire queue will drift toward the
   higher-numbered positions in the array.
   Once an element is inserted into the highest-numbered position
   in the array, the queue has run out of space.
   This happens despite the fact that there might be free positions at
   the low end of the array where elements have previously been removed
   from the queue.

.. inlineav:: AQueueBadCON ss
   :output: show 
   
.. TODO::
   :type: Slideshow

   Implement this paragraph using a slideshow. This will replace the
   figure below showing the circular queue.

   The "drifting queue" problem can be solved by pretending that the
   array is circular and so allow the queue to continue directly from
   the highest-numbered position in the array to the lowest-numbered
   position.
   This is easily implemented through use of the modulus operator
   (denoted by ``%`` in many programming languages).
   In this way, positions in the array are numbered from 0 through
   ``size``-1, and position ``size``-1 is defined to
   immediately precede position 0 (which is equivalent
   to position ``size % size``).
   Figure :num:`Figure #GoodQueue` illustrates this solution.

.. Images/GoodQ.png

.. _GoodQueue:

.. odsafig:: Images/GoodQ.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: The circular queue

   The circular queue with array positions increasing in the clockwise
   direction.
   (a) The queue after the initial four numbers 20, 5, 12, and 17 have
   been inserted.
   (b) The queue after elements 20 and 5 are deleted, following which
   3, 30, and 4 are inserted.

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

.. inlineav:: AQueueEmptyFullCON ss
   :output: show 
   
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

.. TODO::
   :type: Slideshow

   Implement this paragraph using a slideshow. Show the related code.

   Member ``listArray`` holds the queue elements, and as usual, the
   queue constructor allows an optional parameter to set the maximum size
   of the queue.
   The array as created is actually large enough to hold one element more
   than the queue will allow, so that empty queues can be distinguished
   from full queues.
   Member ``maxSize`` is used to control the circular motion of the
   queue (it is the base for the modulus operator).
   Member ``rear`` is set to the position of the current rear element,
   while ``front`` is the position of the current front element.

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

.. TODO::
   :type: Slideshow

   Implement this paragraph using a slideshow. Show the related code.

   Methods ``front`` and ``rear`` are pointers to the front and
   rear queue elements, respectively.
   We will use a header link node, which allows for a
   simpler implementation of the enqueue operation by avoiding any
   special cases when the queue is empty.
   On initialization, the ``front`` and ``rear`` pointers will
   point to the header node, and front will always point to the header
   node while rear points to the true last link node in the queue.

.. TODO::
   :type: Slideshow

   Implement slideshow showing how enqueue works. Show the related code.

   Method ``enqueue`` places the new element in a link
   node at the end of the linked list (i.e., the node that ``rear``
   points to) and then advances ``rear`` to point to the new link
   node.

.. TODO::
   :type: Slideshow

   Implement slideshow showing how dequeue works. Show the related code.

   Method ``dequeue`` removes and returns the first element of the list.

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