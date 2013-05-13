.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists

Freelists [Raw]
===============

The\index{list!freelist|(}\ifthenelse{\boolean{cpp}}
{\Lang\ free-store management operators
\Cref{new} and \Cref{delete}\index{delete@\Cref{delete}} are}{}
\ifthenelse{\boolean{java}}{\Cref{new} operator is}{}
relatively expensive to use.\index{new@\Cref{new}|(} 
\ifthenelse{\boolean{java}}{Garbage collection is also expensive.}{}
Section~\ref{MemMan} discusses how general-purpose memory managers
are implemented.
The expense comes from the fact that free-store routines must be
capable of handling requests to and from free store with no particular
pattern, as well as memory requests of vastly different sizes.
\ifthenelse{\boolean{java}}{This, combined with
unpredictable freeing of space by the garbage collector,}{}
\ifthenelse{\boolean{cpp}}{This}{}makes
them inefficient compared to what might be implemented for more
controlled patterns of memory access.

List nodes are created and deleted in a linked list implementation in
a way that allows the \Cref{Link} class programmer
to provide simple but efficient memory management routines.
Instead of making repeated calls to
\Cref{new}\ifthenelse{\boolean{cpp}}{ and \Cref{delete}}{},
the \Cref{Link} class can handle its own \defit{freelist}.
A freelist holds those list nodes that are not currently being used.
When a node is deleted from a linked list, it is placed at the
head of the free\-list.
When a new element is to be added to a linked list, the freelist
is checked to see if a list node is available.
If so, the node is taken from the freelist.
If the freelist is empty, the standard \Cref{new} operator must then
be called.

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

\ifthenelse{\boolean{cpp}}
{One approach to implementing freelists would be to create two new
operators to use instead of the standard free-store routines
\Cref{new} and \Cref{delete}.
This requires that the user's code, such as the linked list class
implementation of Figure~\ref{LinkListDef}, be modified to call
these freelist operators.
A second approach is to use
\Lang\ \defit{operator overloading}\index{operator overloading}
to replace the meaning of
\Cref{new} and \Cref{delete} when operating on \Cref{Link} class
objects.
In this way, programs that use the \Cref{LList} class need not be
modified at all to take advantage of a freelist.
Whether the \Cref{Link} class is implemented with free\-lists, or
relies on the regular free-store mechanism, is entirely hidden from
the list class user.}{}
\ifthenelse{\boolean{java}}
{In the implementation shown here, the link class is augmented with
methods \Cref{get} and \Cref{release}.}{}
Figure~\ref{Freelist} shows the reimplementation for the \Cref{Link}
class\ifthenelse{\boolean{cpp}}
{with freelist methods overloading the standard free-store operators.}{}
\ifthenelse{\boolean{java}}{to support these methods.}{}
Note how simple they are, because they need only remove and add an
element to the front of the freelist, respectively.
\ifthenelse{\boolean{cpp}}
{The freelist versions of \Cref{new} and \Cref{delete}}{}
\ifthenelse{\boolean{java}}
{The freelist methods \Cref{get} and \Cref{release}}{}
both run in
\Thetaone\ time, except in the case where the freelist is exhausted
and the \Cref{new} operation must be called.
\ifthenelse{\boolean{java}}{Figure~\ref{FreeMembers} shows the
necessary modifications to members of the linked list class to make
use of the freelist version of the link class.}{}
\ifthenelse{\boolean{cpp}}
{On my computer, a call to the overloaded \Cref{new} and \Cref{delete}
operators requires about one tenth of the time required by the system
free-store operators.}{}

\begin{figure}
\xprogfig{Flink.book}

\ifthenelse{\boolean{cpp}}{\bigskip}{}

\capt{4.5in}{Implementation for the \Cref{Link} class with a freelist}
{Implementation for the \Cref{Link} class with a freelist.
\ifthenelse{\boolean{cpp}}
{Note that the redefinition for \Cref{new} refers to \Cref{::new} on
the third line.
This indicates that the standard \Lang\ \Cref{new} operator is used,
rather than the redefined \Cref{new} operator.
If the colons had not been used, then the \Cref{Link} class \Cref{new}
operator would be called, setting up an infinite
recursion.\index{recursion}}{}
The \Cref{static} declaration for member \Cref{freelist} means that
all \Cref{Link} class objects share the same freelist pointer variable
instead of each object storing its own copy.}{Freelist}
\vspace{\bigskipamount}
\end{figure}

\ifthenelse{\boolean{java}}
{\begin{figure}
\xprogfig{Flist.book}
\vspace{-\medskipamount}
\capt{4.5in}{Linked-list class members using freelist}
{Linked-list class members that are modified to use the freelist
version of the link class in Figure~\ref{Freelist}.}{FreeMembers}
\vspace{1pt}
\end{figure}}{}

\ifthenelse{\boolean{cpp}}
{There is an additional efficiency gain to be had from a freelist
implementation.
The implementation of Figure~\ref{Freelist} makes a separate call to
the system \Cref{new} operator for each link node requested whenever
the freelist is empty.
These link nodes tend to be small --- only a few bytes more than the
size of the \Cref{element} field.
If at some point in time the program requires thousands of active
link nodes, these will have been created by many calls to the system
version of \Cref{new}.
An alternative is to allocate many link nodes in a single call to
the system version of \Cref{new}, anticipating that if the freelist is
exhausted now, more nodes will be needed soon.
It is faster to make one call to \Cref{new} to get space for 100
\Cref{link} nodes, and then load all 100 onto the freelist at once,
rather than to make 100 separate calls to \Cref{new}.
The following statement will assign \Cref{ptr} to point to an array
of 100 link nodes.

\begin{progenv}
ptr = ::new Link[100];
\end{progenv}

\noindent The implementation for the \Cref{new} operator in the
\Cref{link} class could then place each of these 100 nodes onto the
freelist.
\index{delete@\Cref{delete}}}{}

\index{new@\Cref{new}|)}
\index{free store|)}

The \Cref{freelist} variable declaration uses the keyword
\Cref{static}.
This creates a single variable shared among all instances of the
\Cref{Link} nodes.
\ifthenelse{\boolean{java}}
{In this way, a single freelist shared by all \Cref{Link} nodes.}{}
\ifthenelse{\boolean{cpp}}
{We want only a single freelist for all \Cref{Link} nodes of a given
type.
A program might create multiple lists.
If they are all of the same type (that is, their element types are the
same), then they can and should share the same freelist.
This will happen with the implementation of Figure~\ref{Freelist}.
If lists are created that have different element types, because this
code is implemented with a \Gen, the need for different list
implementations will be discovered by
the compiler at compile time.
Separate versions of the list class will be generated for each
element type.
Thus, each element type will also get its own separate copy of the
\Cref{Link} class.
And each distinct \Cref{Link} class implementation will get a separate
freelist.}{}

