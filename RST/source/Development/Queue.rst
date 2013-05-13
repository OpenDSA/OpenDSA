.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists

Queues [Raw]
============

Like the stack, the \defit{queue} is a list-like structure that
provides restricted access to its elements.\index{queue!terminology}
Queue elements may only be inserted at the back (called an
\defit{enqueue}\index{queue!enqueue} operation) and removed from the
front (called a \defit{dequeue}\index{queue!dequeue} operation).
Queues operate like standing in line at a movie theater ticket
counter.\footnote{In Britain, a line of people is called a
``queue,'' and getting into
line to wait for service is called ``queuing up.''}
If nobody cheats, then newcomers go to the back of the line.
The person at the front of the line is the next to be served.
Thus, queues release their elements in order of arrival.
Accountants have used queues since long before the
existence of computers.\index{accounting}
They call a queue a ``FIFO'' list, which stands for ``First-In,
First-Out.''\index{fifo list@FIFO list}
Figure~\ref{QueueADT} shows a sample queue ADT.
This section presents two implementations for queues:
the array-based queue and the linked queue.

\begin{figure}
\xprogfig{Queue.book}
\vspace{-\bigskipamount}
\capt{4.5in}{\Lang\ ADT for a queue}
{The \Lang\ ADT for a queue.}{QueueADT}
\end{figure}


\subsection{Array-Based Queues}
\label{AQueue}

\index{queue!array-based|(}
The array-based queue is somewhat tricky to implement effectively.
A simple conversion of the array-based list implementation is not
efficient.

Assume that there are $n$ elements in the queue.
By analogy to the array-based list implementation, we could require
that all elements of the queue be stored in the first $n$ positions of
the array.
If we choose the rear element of the queue to be in position 0,
then \Cref{dequeue}\index{queue!dequeue} operations require only
\Thetaone\ time because the front element of the queue (the one being
removed) is the last element in the array.
However, \Cref{enqueue}\index{queue!enqueue} operations will require
\Thetan\ time, because the $n$ elements currently in the queue must
each be shifted one position in the array.
If~instead we chose the rear element of the queue to be in
position~$n-1$, then an \Cref{enqueue} operation is equivalent to an
\Cref{append} operation on a list.
This requires only \Thetaone\ time.
But now, a \Cref{dequeue} operation requires \Thetan\ time, because
all of the elements must be shifted down by one position to retain
the property that the remaining $n-1$ queue elements reside in the
first $n-1$ positions of the array.

\index{queue!circular|(}
A far more efficient implementation can be obtained by relaxing the
requirement that all elements of the queue must be in the first
$n$~positions of the array.
We will still require that the queue be stored be in contiguous array
positions, but the contents of the queue will be permitted to drift
within the array, as illustrated by Figure~\ref{BadQueue}.
Now, both the \Cref{enqueue} and the \Cref{dequeue} operations can be
performed in \Thetaone\ time because no other elements in the queue
need be moved.

\begin{figure}
\pdffig{BadQueue}
\vspace{-\bigskipamount}

\capt{4.5in}{Queue elements will drift to the back of the array}
{After repeated use, elements in the array-based queue will drift to
the back of the array.
(a)~The queue after the initial four numbers 20, 5, 12, and 17 have been
inserted.
(b)~The queue after elements~20 and 5 are deleted, following which 3,
30, and 4 are inserted.}
{BadQueue}
\medskip
\end{figure}

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

The ``drifting queue'' problem can be solved by pretending that the
array is circular and so allow the queue to continue directly from
the highest-numbered position in the array to the lowest-numbered
position.
This is easily implemented through use of the modulus operator
(denoted by \Cref{\%} in \Lang).
In this way, positions in the array are numbered from 0 through
\Cref{size}$-1$, and position \Cref{size}$-1$ is defined to
immediately precede position 0 (which is equivalent
to position \Cref{size \% size}).
Figure~\ref{GoodQueue} illustrates this solution.

\begin{figure}
\pdffig{GoodQ}
\vspace{-\medskipamount}

\capt{4.5in}{The circular queue}
{The circular queue with array positions increasing in the clockwise
direction.
(a)~The queue after the initial four numbers 20, 5, 12, and 17 have been
inserted.
(b)~The queue after elements~20 and 5 are deleted, following which 3,
30, and 4 are inserted.}{GoodQueue}
\bigskip
\end{figure}

\index{queue!empty vs. full|(}
There remains one more serious, though subtle, problem to the
array-based queue implementation.
How can we recognize when the queue is empty or full?
Assume that \Cref{front} stores the array index for the front element
in the queue, and \Cref{rear} stores the array index for the rear
element.
If both \Cref{front} and \Cref{rear} have the same position, then
with this scheme there must be one element in the queue.
Thus, an empty queue would be recognized by having \Cref{rear} be
\emph{one less} than \Cref{front} (taking into account the fact that
the queue is circular, so position \Cref{size}$-1$ is actually
considered to be one less than position 0).
But what if the queue is completely full?
In other words, what is the situation when a queue with $n$~array
positions available contains $n$~elements?
In this case, if the front element is in position~0, then the rear
element is in position \Cref{size}$-1$.
But this means that the value for \Cref{rear} is one less than the
value for \Cref{front} when the circular nature of the queue is taken
into account.
In other words, the full queue is indistinguishable from the empty
queue!

You might think that the problem is in the assumption about
\Cref{front} and \Cref{rear} being defined to store the array indices
of the front and rear elements, respectively, and that some
modification in this definition will allow a solution.
Unfortunately, the problem cannot be remedied by a simple change to
the definition for \Cref{front} and \Cref{rear}, because of
the number of conditions or \defit{states} that the queue can be in.
Ignoring the actual position of the first element, and ignoring the
actual values of the elements stored in the queue, how many different
states are there?
There can be no elements in the queue, one element, two, and so on.
At most there can be $n$~elements in the queue if there are $n$~array
positions.
This means that there are $n+1$~different states for the queue
(0~through $n$~elements are possible).

If the value of \Cref{front} is fixed, then $n+1$~different
values for \Cref{rear} are needed to distinguish among the $n+1$~states.
However, there are only $n$~possible values for \Cref{rear} unless we
invent a special case for, say, empty queues.
This is an example of the
Pigeonhole Principle\index{pigeonhole principle@Pigeonhole Principle}
defined in Exercise~\ref{MathPre}.\ref{pigeon}.
The Pigeonhole Principle states that, given \(n\) pigeonholes
and \(n+1\) pigeons, when all of the pigeons go into the holes we
can be sure that at least one hole contains more than one pigeon.
In similar manner, we can be sure that two of the $n+1$ states are
indistinguishable by the \(n\) relative values of \Cref{front} and
\Cref{rear}.
We must seek some other way to distinguish full from empty queues.

One obvious solution is to keep an explicit count of the number of
elements in the queue, or at least a Boolean variable that indicates
whether the queue is empty or not.
Another solution is to make the array be of size~$n+1$, and only allow
$n$~elements to be stored.
Which of these solutions to adopt is purely a matter of the
implementor's taste in such affairs.
My choice is to use an array of size~$n+1$.
\index{queue!empty vs. full|)}
\index{queue!circular|)}

\begin{figure}
\xprogfig{AQueue.book}
\vspace{-\bigskipamount}

\capt{4.5in}{Array-based queue implementation}
{An array-based queue implementation.}{AQueueDef}
\end{figure}

Figure~\ref{AQueueDef} shows an array-based queue implementation.
\Cref{listArray} holds the queue elements, and as usual, the
queue constructor allows an optional parameter to set the maximum size
of the queue.
The array as created is actually large enough to hold one element more
than the queue will allow, so that empty queues can be distinguished
from full queues.
Member \Cref{maxSize} is used to control the circular motion of the
queue (it is the base for the modulus operator).
Member \Cref{rear} is set to the position of the current rear element,
while \Cref{front} is the position of the current front element.

In this implementation, the front of the queue is defined to be toward
the lower numbered positions in the array (in the counter-clockwise
direction in Figure~\ref{GoodQueue}), and the rear is
defined to be toward the higher-numbered positions.
Thus, \Cref{enqueue} increments the rear pointer (modulus \Cref{size}),
and \Cref{dequeue} increments the front pointer.
Implementation of all member functions is straightforward.
\index{queue!array-based|)}

\subsection{Linked Queues}

\begin{figure}
\xprogfig{LQueue.book}

\vspace{-\medskipamount}
\capt{4.5in}{Linked queue class implementation}
{Linked queue class implementation.\index{queue!linked}}{LQueueDef}
\end{figure}

\index{queue!linked}
The linked queue implementation is a straightforward adaptation
of the linked list.
Figure~\ref{LQueueDef} shows the linked queue class declaration.
Methods \Cref{front} and \Cref{rear} are pointers to the front and
rear queue elements, respectively.
We will use a header link node,\index{header node} which allows for a
simpler implementation of the enqueue operation by avoiding any
special cases when the queue is empty.
On initialization, the \Cref{front} and \Cref{rear} pointers will
point to the header node, and front will always point to the header
node while rear points to the true last link node in the queue.
Method \Cref{enqueue} places the new element in a link
node at the end of the linked list (i.e., the node that \Cref{rear}
points to) and then advances \Cref{rear} to point to the new link node.
Method \Cref{dequeue}\index{queue!dequeue} removes and returns the
first element of the list.
\index{queue!linked}

\subsection{Comparison of Array-Based and Linked Queues}

\index{queue!implementations compared}
All member functions for both the array-based and linked queue
implementations require constant time.
The space comparison issues are the same as for the equivalent stack
implementations.
Unlike the array-based stack implementation, there is no convenient
way to store two queues in the same array,
unless items are always transferred directly from one queue to the other.
