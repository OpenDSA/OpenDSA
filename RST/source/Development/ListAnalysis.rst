.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists

Comparison of List Implementations [Raw]
========================================

Now that you have seen two substantially different implementations for
lists, it is natural to ask which is better.
In particular, if you must implement a list for some task,
which implementation should you choose?

Array-based lists have the disadvantage that their size must be
predetermined before the array can be allocated.
Array-based lists cannot grow beyond their predetermined size.
Whenever the list contains only a few elements, a
substantial amount of space might be tied up in a largely empty array.
Linked lists have the advantage that they only need space for the
objects actually on the list.
There is no limit to the number of elements on a linked list,
as long as there is free-store memory available.
The amount of space required by a linked list is \Thetan, while the
space required by the array-based list implementation is \Omegan, but
can be greater.

\index{overhead|(}
Array-based lists have the advantage that there is no wasted
space for an individual element.
Linked lists require that an extra pointer be added to every list
node.
If the element size is small, then the overhead for
links can be a significant fraction of the total storage.
When the array for the array-based list is completely filled, there
is no storage overhead.
The array-based list will then be more space efficient, by a
constant factor, than the linked implementation.

A simple formula can be used to determine whether the array-based list
or linked list implementation will be more space efficient in a
particular situation.
Call~\(n\) the number of elements currently in the list,
\svar{P}~the size of a pointer in storage units
(typically four bytes), \svar{E}~the size of a data element in storage
units (this could be anything, from one bit for a Boolean variable on
up to thousands of bytes or more for complex records), and \svar{D} the 
maximum number of list elements that can be stored in the array.
The amount of space required for the array-based list is \(DE\),
regardless of the number of elements actually stored in the list at
any given time.
The amount of space required for the linked list is \(n(P + E)\).
The smaller of these expressions for a given value \(n\) determines the
more space-efficient implementation for \(n\) elements.
In general, the linked implementation requires less space than the
array-based implementation when relatively few elements are in the
list.
Conversely, the array-based implementation becomes more space
efficient when the array is close to full.
Using the equation, we can solve for \(n\) to determine the
break-even point beyond which the array-based implementation is more
space efficient in any particular situation.
This occurs when
\[n > DE/(P + E).\]
\noindent If \(P = E\), then the break-even point is at \(D/2\).
This would happen if the element field is either a four-byte
\Cref{int} value or a pointer, and the next field is a typical
four-byte pointer.
That is, the array-based implementation would be more efficient (if
the link field and the element field are the same size) whenever the
array is more than half full.
\index{overhead|)}

As a rule of thumb, linked lists are more space efficient when
implementing lists whose number of elements varies widely or is
unknown.
Array-based lists are generally more space efficient when
the user knows in advance approximately how large the list will
become.
\index{list!space requirements|)}

Array-based lists are faster for random access by position.
Positions can easily be adjusted forwards or backwards by
the \Cref{next}\index{list!current position} and \Cref{prev} methods.
These operations always take \Thetaone\ time.
In contrast, singly linked lists have no explicit access to the
previous element, and access by position requires that we march
down the list from the front (or the current position) to the
specified position.
Both of these operations require \Thetan\ time in the average and
worst cases, if we assume that each position on the list is equally
likely to be accessed on any call to \Cref{prev} or \Cref{moveToPos}.

Given a pointer to a suitable location in the list,
the \Cref{insert}\index{list!insert} and
\Cref{remove}\index{list!remove} methods for linked lists
require only \Thetaone\ time.
Array-based lists must shift the remainder of the list up or down
within the array.
This requires \Thetan\ time in the average and worst cases.
For many applications, the time to insert and delete elements
dominates all other operations.
For this reason, linked lists are often preferred to array-based
lists.

When implementing the array-based list, an implementor could
allow the size of the array to grow and shrink depending on the number 
of elements that are actually stored.
This data structure is known as a
\defit{dynamic array}.\index{array!dynamic}\index{vector}
Both the \LangJava\ and \LangCPP/STL \Cref{Vector} classes implement a
dynamic array.
Dynamic arrays allow the programmer to get around the limitation on
the standard array that its size cannot be changed once the array has
been created.
This also means that space need not be allocated to the dynamic array
until it is to be used.
The disadvantage of this approach is that it takes time to deal
with space adjustments on the array.
Each time the array grows in size, its contents must be copied.
A good implementation of the dynamic array will grow and shrink
the array in such a way as to keep the overall cost for a series of
insert/delete operations relatively inexpensive, even though an
occasional insert/delete operation might be expensive.
A simple rule of thumb is to double the size of the array when it
becomes full, and to cut the array size in half when it becomes one
quarter full.
To analyze the overall cost of dynamic array operations over time,
we need to use a technique known as
\defit{amortized analysis}\index{amortized analysis},
which is discussed in Section~\ref{AmortAnal}.
