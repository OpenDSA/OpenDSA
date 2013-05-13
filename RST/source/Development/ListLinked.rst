.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists

Linked Lists [Raw]
==================

The second traditional approach to implementing lists makes use of
pointers and is usually called a \defit{linked list}.
The linked list uses
\defit{dynamic memory allocation},\index{dynamic memory allocation}
that is, it allocates memory for new list elements as needed.

\index{list!node|(}
\index{list!link class|(}
A linked list is made up of a series of objects, called the
\defit{nodes} of the list.
Because a list node is a distinct object (as opposed to simply a cell
in an array), it is good practice to make a separate list node class.
An additional benefit to creating a list node class is that
it can be reused by the linked implementations for the stack and
queue data structures presented later in this chapter.
Figure~\ref{LinkImpl} shows the implementation for
list nodes, called the \Cref{Link} class.
Objects in the \Cref{Link} class contain an \Cref{element} field to
store the element value, and a \Cref{next} field to store a pointer to
the next node on the list.
The list built from such nodes is called a
\defit{singly linked list},\index{list!singly linked}
or a \defit{one-way list},\index{one-way list} because each list node
has a single pointer to the next node on the list.

The \Cref{Link} class is quite simple.
There are two forms for its constructor, one with
an initial element value and one without.
\ifthenelse{\boolean{cpp}}
{Because the \Cref{Link} class is also used by the
stack\index{stack} and queue\index{queue} implementations presented
later, its data members are made public.
While technically this is breaking encapsulation, in practice the
\Cref{Link} class should be implemented as a private class of the
linked list (or stack or queue) implementation, and thus not visible
to the rest of the program.}{}
\ifthenelse{\boolean{java}}
{Member functions allow the link user to get or set the \Cref{element}
and \Cref{link} fields.}{}
\index{list!link class|)}

\begin{figure}
\xprogfig{Link.book}
\vspace{-\bigskipamount}

\capt{4.5in}{A simple singly linked list node implementation}
{A simple singly linked list node implementation.}{LinkImpl}
\end{figure}

Figure~\ref{BadList}(a) shows a graphical depiction for a linked list
storing four integers.
The value stored in a pointer variable is indicated by an arrow
``pointing'' to something.
\Lang\ uses the special symbol \NULL\ for a\index{null pointer}
pointer value that points nowhere, such as for the last list node's
\Cref{next} field.
A \NULL\ pointer is indicated graphically by a diagonal slash
through a pointer variable's box.
The vertical line between the nodes labeled 23 and 12 in
Figure~\ref{BadList}(a) indicates the current position
(immediately to the right of this line).

\begin{figure}
\pdffig{BadList}
\capt{4.5in}
{Linked list implementation: \Cref{curr} points to current node}
{Illustration of a faulty linked-list implementation where
\Cref{curr}\index{list!current position} points directly to the
current node.
(a)~Linked list prior to inserting element with value~10.
(b)~Desired effect of inserting element with
value~10.\index{list!insert}}
{BadList}
\bigskip
\end{figure}

The list's first node is accessed from a pointer named
\Cref{head}.
To speed access to the end of the list, and to allow the
\Cref{append} method to be performed in
constant time, a pointer named \Cref{tail} is also kept to the last
link of the list.
The position of the current element is indicated by another pointer,
named \Cref{curr}.
Finally, because there is no simple way to compute the length of the
list simply from these three pointers, the list length must be stored
explicitly, and updated by every operation that modifies the list size.
The value \Cref{cnt} stores the length of the list.

\ifthenelse{\boolean{cpp}}
{Class \Cref{LList} also includes private helper methods
\Cref{init} and \Cref{removeall}.
They are used by \Cref{LList}'s constructor, destructor,
and \Cref{clear} methods.}{}

Note that \Cref{LList}'s constructor maintains the optional parameter
for minimum list size introduced for Class \Cref{AList}.
This is done simply to keep the calls to the constructor
the same for both variants.
Because the linked list class does not need to declare a fixed-size
array when the list is created, this parameter is unnecessary for
linked lists.
It is ignored by the implementation.

A key design decision for the linked list implementation is how to
represent the current position.
The most reasonable choices appear to be a pointer to the current
element.
But there is a big advantage to making \Cref{curr} point to the
element preceding the current element.

\index{list!current position|(}
Figure~\ref{BadList}(a) shows the list's
\Cref{curr} pointer pointing to the current element.
The vertical line between the nodes containing 23 and 12 indicates the
logical position of the current element.
Consider what happens if we wish to insert a new node with value 10
into the list.
The result should be as shown in Figure~\ref{BadList}(b).
However, there is a problem.
To ``splice'' the list node containing the new element
into the list, the list node storing 23 must have its
\Cref{next} pointer changed to point to the new node.
Unfortunately, there is no convenient access to the node preceding
the one pointed to by \Cref{curr}.

There is an easy solution to this problem.
If we set \Cref{curr} to point directly to the preceding element,
there is no difficulty in adding a new element after \Cref{curr}.
Figure~\ref{GoodList} shows how the list looks when pointer variable
\Cref{curr} is set to point to the node preceding the physical
current node.
See Exercise~\ref{LSQ}.\ref{FenceExer} for further discussion of why
making \Cref{curr} point directly to the current element fails.
\index{list!current position|)}

\begin{figure}
\pdffig{GoodList}

\capt{4.5in}{Insertion using a header node}
{Insertion\index{list!insert}
using a header node, with \Cref{curr} pointing one node head of the
current element.
(a)~Linked list before insertion.
The current node contains~12.
(b)~Linked list after inserting the node containing~10.}
{GoodList}
\medskip
\end{figure}

We encounter a number of potential special cases when the list is
empty, or when the current position is at an end of the list.
In particular, when the list is empty we have no element for
\Cref{head}, \Cref{tail}, and \Cref{curr} to point to.
Implementing special cases for \Cref{insert} and \Cref{remove}
increases code complexity, making it harder to understand,
and thus increases the chance of introducing a programming bug.

These special cases can be eliminated by implementing
linked lists with an additional \defit{header node}\index{list!head}
as the first node of the list.
This header node is a link node like any other, but its value is
ignored and it is not considered to be an actual element of the list.
The header node saves coding effort because we no longer need to
consider special cases for empty lists or when the current position is
at one end of the list.
The cost of this simplification is the space for the header node.
However, there are space savings due to smaller code size,
because statements to handle the special cases are omitted.
In practice, this reduction in code size typically saves more space
than that required for the header node, depending on the number of
lists created.
Figure~\ref{InitList} shows the state of an initialized or empty list
when using a header node.

\begin{figure}
\pdffig{InitList}
\vspace{-\bigskipamount}\vspace{-\bigskipamount}
\vspace{-\smallskipamount}

\capt{4.5in}{Initial\index{list!initialization}
state of a linked list when using a header node}
{Initial state of a linked list when using a header node.}{InitList}
\vspace{-\smallskipamount}
\end{figure}

Figure~\ref{LinkListDef} shows the definition
for the linked list class, named \Cref{LList}.
Class \Cref{LList} inherits\index{inheritance}
from the abstract list class and
thus must implement all of Class \Cref{List}'s member functions.

\begin{figure}
\xprogfig{LList1.book}
\vspace{-\medskipamount}
\capt{4.5in}
{Linked list class declaration}
{A linked list implementation.}{LinkListDef}
\end{figure}
\index{list!node|)}

\begin{figure}
\xprogfig{LList2.book}
\vspace{-\smallskipamount}
\captcont
\end{figure}

\ifthenelse{\boolean{cpp}}{\newpage}{}

\index{list!insert|(}
Implementations for most member functions of the \Cref{list}
class are straightforward.
However, \Cref{insert} and \Cref{remove}\index{list!remove}
should be studied carefully.

Inserting a new element is a
three-step process.\index{list!current position}
First, the new list node is created and the new element is
stored into it.
Second, the \Cref{next} field of the new list node is assigned to
point to the current node (the one \emph{after} the node that
\Cref{curr} points to).
Third, the \Cref{next} field of node pointed to by \Cref{curr}
is assigned to point to the newly inserted node.
The following line in the \Cref{insert} method of
Figure~\ref{LinkListDef} does all three of these steps.

\begin{progenv}
\ifthenelse{\boolean{cpp}}
{curr->next = new Link<E>(it, curr->next);}{}
\ifthenelse{\boolean{java}}
{curr.setNext(new Link<E>(it, curr.next()));}{}
\end{progenv}

\begin{figure}
\index{list!insert}
\pdffig{LinkIns}
\vspace{-\medskipamount}

\capt{4.5in}{The linked list insertion process}
{The linked list insertion process.
(a)~The linked list before insertion.
(b)~The linked list after insertion.
\fbox{1}~marks the \Cref{element} field of the new link node.
\fbox{2}~marks the \Cref{next} field of the new link node, which
is set to point to what used to be the current node
(the node with value~12).
\fbox{3}~marks the \Cref{next} field of the node preceding the current
position.
It used to point to the node containing~12; now it points to the new
node containing~10.}{LinkInsert}
\bigskip
\end{figure}

\noindent Operator \Cref{new} creates the new link node
and calls the \Cref{Link} class constructor,
which takes two parameters.
The first is the element.
The second is the value to be placed in the list node's \Cref{next} field,
in this
case\ifthenelse{\boolean{cpp}}{``\Cref{curr->next}.''}{}
\ifthenelse{\boolean{java}}{``\Cref{curr.next}.''}{}
\ifthenelse{\boolean{java}}
{Method \Cref{setNext} does the assignment to \Cref{curr}'s
\Cref{next} field.}{}
Figure~\ref{LinkInsert} illustrates this three-step process.
Once the new node is added, \Cref{tail} is pushed forward if the new
element was added to the end of the list.
Insertion requires \Thetaone\ time.
\index{list!insert|)}

\index{list!remove}
Removing a node from the linked list requires only that
the appropriate pointer be redirected around the node to be deleted.
The following lines from the \Cref{remove} method of
Figure~\ref{LinkListDef} do precisely this.
\medskip

\begin{progenv}
\ifthenelse{\boolean{cpp}}{
Link<E>* ltemp = curr->next;\ \ \     // Remember link node\\
curr->next = curr->next->next;     // Remove from list\\
}{}
\ifthenelse{\boolean{java}}{
E it = curr.next().element();\ \ \ \ \     // Remember value\\
curr.setNext(curr.next().next());  // Remove from list\\
}{}
\end{progenv}
\ifthenelse{\boolean{cpp}}
{We must be careful not to ``lose'' the memory for the
deleted link node.
So, temporary pointer \Cref{ltemp} is first assigned to point to the
node being removed.
A call to \Cref{delete} is later used to return the old node to free
storage.}{}
\ifthenelse{\boolean{java}}
{Memory for the link will eventually be reclaimed by the
garbage collector.\index{garbage collection}}{}
Figure~\ref{LinkRemove} illustrates the \Cref{remove}
method.\ifthenelse{\boolean{cpp}}
{Assuming that the free-store \Cref{delete} operator requires constant
time, removing}{}
\ifthenelse{\boolean{java}}{Removing}{}
an element requires \Thetaone\ time.\index{list!remove}

\begin{figure}
\index{list!remove}
\pdffig{LinkRem}
\vspace{-\smallskipamount}

\capt{4.5in}{The linked list removal process}
{The linked list removal process.
(a)~The linked list before removing the node with value~10.
(b)~The linked list after removal.
\fbox{1}~marks the list node being removed.
\Cref{it} is set to point to the element.
\fbox{2}~marks the \Cref{next} field of the preceding list node,
which is set to point to the node following the one being deleted.}
{LinkRemove}
\bigskip
\end{figure}

Method \Cref{next} simply moves
\Cref{curr}\index{list!current position} 
one position toward the tail of the list, which takes \Thetaone\ time.
Method \Cref{prev} moves \Cref{curr}
one position toward the head of the list, but its implementation is
more difficult.
In a singly linked list, there is no pointer to the previous node.
Thus, the only alternative is to march down the list from the
beginning until we reach the current node (being sure always to
remember the node before it, because that is what we really want).
This takes \Thetan\ time in the average and worst cases.
Implementation of method \Cref{moveToPos} is
similar in that finding the \(i\)th~position requires marching down
\(i\)~positions from the head of the list, taking \Thetai\ time.

Implementations for the remaining operations each require
\Thetaone\ time.
