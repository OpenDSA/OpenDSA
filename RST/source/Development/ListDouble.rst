.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists

Doubly Linked Lists [Raw]
=========================

The singly linked list
presented in Section~\ref{LinkedList} allows
for direct access from a list node only to the next node in the list.
A \defit{doubly linked list} allows convenient access from a list node
to the next node and also to the preceding node on the list.
The doubly linked list node accomplishes this in the obvious way by
storing two pointers: one to the node following it (as in the singly
linked list), and a second pointer to the node preceding it.
The most common reason to use a doubly linked list is
because it is easier to implement than a singly linked list.
While the code for the doubly linked implementation is a little longer
than for the singly linked version, it tends to be a bit more
``obvious'' in its intention, and so easier to implement and debug.
Figure~\ref{DblListFig} illustrates the doubly linked list concept.
Whether a list implementation is doubly or singly linked should
be hidden from the \Cref{List} class user.\index{list!singly linked}

Like our singly linked list implementation, the doubly linked list
implementation makes use of a header node.
We also add a tailer node to the end of the list.
The tailer is similar to the header, in that it is a node that
contains no value, and it always exists.
When the doubly linked list is initialized, the header and tailer
nodes are created.
Data member \Cref{head} points to the header node, and \Cref{tail}
points to the tailer node.
The purpose of these nodes is to simplify the \Cref{insert},
\Cref{append}, and \Cref{remove} methods by eliminating all need for
special-case code when the list is empty, or when we insert at the
head or tail of the list.

For singly linked lists we set \Cref{curr} to point to the node
preceding the node that contained the actual current element, due to
lack of access to the previous node during insertion and deletion.
Since we do have access to the previous node in a doubly linked list,
this is no longer necessary.
We could set \Cref{curr} to point directly to the node containing the
current element.
However, I have chosen to keep the same convention for the \Cref{curr}
pointer as we set up for singly linked lists, purely for the sake of
consistency.

\begin{figure}
\pdffig{DblListF}
\vspace{-\bigskipamount}\vspace{-\bigskipamount}
\vspace{-\medskipamount}

\capt{4.5in}{A doubly linked list}{A doubly linked list.}{DblListFig}
\end{figure}

\begin{figure}
\xprogfig{DLink.book}
\vspace{-\bigskipamount}

\capt{4.5in}{Doubly linked list node implementation}
{Doubly\index{list!node} linked list node implementation with
a freelist.}{DblLink}
\smallskip
\end{figure}

Figure~\ref{DblLink} shows the complete implementation for a
\Cref{Link} class to be used with doubly linked lists.\index{list!node}
This code is a little longer than that for the singly linked list node
implementation since
the doubly linked list nodes have an extra data member.

Figure~\ref{DblListImpl} shows the implementation for the
\Cref{insert}\index{list!insert}, \Cref{append},\index{list!append}
\Cref{remove},\index{list!remove} and \Cref{prev} doubly
linked list methods.
The class declaration and the remaining member functions for the
doubly linked list class are nearly identical to the singly linked
list version.

\begin{figure}
\xprogfig{Dlist.book}
\vspace{-\medskipamount}

\capt{4.5in}{Doubly linked list methods}
{Implementations for doubly linked list \Cref{insert},
\Cref{append}, \Cref{remove}, and \Cref{prev} methods.}
{DblListImpl}
\ifthenelse{\boolean{java}}{\vspace{-\medskipamount}}{}
\end{figure}

\index{list!insert|(}
The \Cref{insert} method is especially simple for our doubly linked
list implementation, because most of the work is done by the node's
constructor.
Figure~\ref{DblListInsert} shows the list before and after
insertion of a node with value 10.

\begin{figure}
\index{list!insert}
\pdffig{DblListI}
\vspace{-\medskipamount}
\capt{4.5in}{Doubly linked list insertion}
{Insertion for doubly linked lists.
The labels \fbox{1}\,, \fbox{2}\,, and \fbox{3} correspond to
assignments done by the linked list node constructor.
\fbox{4}~marks the assignment to \Cref{curr->next}.
\fbox{5}~marks the assignment to the \Cref{prev} pointer
of the node following the newly inserted node.}{DblListInsert}
\bigskip
\end{figure}

The three parameters to the \Cref{new}\index{new@\Cref{new}}
operator allow the list node
class constructor to set the \Cref{element}, \Cref{prev}, and
\Cref{next} fields, respectively, for the new link node.
The \Cref{new} operator returns a pointer to the newly created node.
The nodes to either side have their pointers updated to point to the
newly created node.
The existence of the header and tailer nodes mean that there are no
special cases to worry about when inserting into an empty list.
\index{list!insert|)}

\index{list!append}
The \Cref{append} method is also simple.
Again, the \Cref{Link} class constructor sets the \Cref{element},
\Cref{prev}, and \Cref{next} fields of the node when the \Cref{new}
operator is executed.\index{new@\Cref{new}}\index{list!append}

\begin{figure}
\index{list!remove}
\pdffig{DblListD}
\vspace{-\bigskipamount}

\capt{4.5in}{Doubly linked list removal}
{Doubly linked list removal.
Element \Cref{it} stores the element of the node being removed.
Then the nodes to either side have their pointers adjusted.}
{DblListRemove}
\bigskip
\end{figure}

Method \Cref{remove}\index{list!remove} (illustrated by
Figure~\ref{DblListRemove})
is straightforward, though the code is somewhat longer.
First, the variable \Cref{it} is assigned the value being removed.
Note that we must separate the element, which is returned to the
caller, from the link object.
The following lines then adjust the list.
\medskip

\ifthenelse{\boolean{cpp}}
{\medskip

\begin{progenv}
Link<E>* ltemp = curr->next; \ \    // Remember link node\\
curr->next->next->prev = curr;\\
curr->next = curr->next->next;      // Remove from list\\
delete ltemp; \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ // Reclaim space\\
\end{progenv}}{}
\ifthenelse{\boolean{java}}
{\begin{progenv}
E it = curr.next().element(); \ \ \ \  // Remember value\\
curr.next().next().setPrev(curr);\\
curr.setNext(curr.next().next());  // Remove from list\\
\end{progenv}}{}

\ifthenelse{\boolean{cpp}}
{The first line sets a temporary pointer to the node being removed.}{}
\ifthenelse{\boolean{java}}
{The first line stores the value of the node being removed.}{}
The second line makes the next node's \Cref{prev} pointer point to the
left of the node being removed.
Finally, the \Cref{next} field of the node preceding the one being
deleted is adjusted.
The final steps of method \Cref{remove} are to update the
list\ifthenelse{\boolean{cpp}}{length, return the deleted node to free store,}{}
\ifthenelse{\boolean{java}}{length}{}
and return the value of the deleted element.\index{list!remove}

\index{list!doubly linked!space|(}
The only disadvantage of the doubly linked list as compared to the
singly linked list is the additional space used.
The doubly linked list requires two pointers per node, and so in the
implementation presented it requires twice as much overhead as
the singly linked list.

\ifthenelse{\boolean{java}}{\newpage}{}

\begin{example}
\label{DblSUM}

There is a space-saving technique that can be employed to eliminate
the additional space requirement, though it will complicate the
implementation and be somewhat slower.
Thus, this is an example of a
space/time tradeoff.\index{tradeoff!space/time principle}
It is based on observing that, if we store the sum of two values, then
we can get either value back by subtracting the other.
That is, if we store \(a + b\) in variable \(c\), then
\(b = c - a\) and \(a = c - b\).
Of course, to recover one of the values out of the stored summation,
the other value must be supplied.
A pointer to the first node in the list, along with the value of one
of its two link fields, will allow access to all of the remaining
nodes of the list in order.
This is because the pointer to the node must be the same as the value
of the following node's \Cref{prev} pointer, as well as the previous
node's \Cref{next} pointer.
It is possible to move down the list breaking apart the
summed link fields as though you were opening a zipper.
Details for implementing this variation are left as an exercise.

\ifthenelse{\boolean{java}}{\newpage}{}

The principle behind this technique is worth remembering, as it
has many applications.
The following code fragment will
swap the contents of two variables without using a temporary variable
(at the cost of three arithmetic operations).
\vspace{-\smallskipamount}

\xprogexamp{ch4p1.book}

A similar effect can be had by using the exclusive-or operator.
This fact is widely used in computer graphics.
A region of the computer screen can be highlighted by
XORing the outline of a box around it.
XORing the box outline a second time restores the original
contents of the screen.
\end{example}
