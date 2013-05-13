.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists

The Array-Based List Implementation [Raw]
=========================================

There are two standard approaches to implementing lists, the
\defit{array-based} list, and the \defit{linked}
list.\index{list!linked}
This section discusses the array-based approach.
The linked list is presented in Section~\ref{LinkedList}.
Time and space efficiency comparisons for the two are discussed in
Section~\ref{CompareLists}.

Figure~\ref{ArrayListDef} shows
the array-based list implementation,
named \Cref{AList}.
\Cref{AList} inherits\index{inheritance}
from abstract class \Cref{List}
and so must implement all of the member functions of \Cref{List}.

\begin{figure}
\xprogfig{AList1.book}

\vspace{-\bigskipamount}
\capt{4.5in}{Array-based list class declaration}
{An array-based list implementation.}
{ArrayListDef}
\end{figure}

\begin{figure}
\xprogfig{AList2.book}

\vspace{-\smallskipamount}
\captcont
\vspace{-\bigskipamount}
\end{figure}

\index{list!initialization}
Class \Cref{AList}'s private portion contains the data members for
the array-based list.
These include \Cref{listArray}, the array which holds the list
elements.
Because \Cref{listArray} must be allocated at some fixed size,
the size of the array must be known when the list object is created.
Note that an optional parameter is declared for the \Cref{AList}
constructor.
With this parameter, the user can indicate the maximum
number of elements permitted in the list.
\ifthenelse{\boolean{cpp}}
{The phrase ``\Cref{=defaultSize}'' indicates that the parameter is
optional.}{}
If no parameter is given, then it takes the value
\Cref{defaultSize}, which is assumed to be a suitably defined
constant value.
\index{list!initialization}

Because each list can have a differently sized array, each list must
remember its maximum permitted size.
Data member \Cref{maxSize} serves this purpose.
At any given time the list actually holds some number
of elements that can be less than the maximum allowed by the array.
This value is stored in \Cref{listSize}.
Data member \Cref{curr} stores the current position.
Because \Cref{listArray}, \Cref{maxSize}, \Cref{listSize}, and 
\Cref{curr} are all declared to be \Cref{private}, they may only
be accessed by methods of Class \Cref{AList}.

Class \Cref{AList} stores the list elements in the first
\Cref{listSize} contiguous array positions.
Array positions correspond to list positions.
In other words, the element at position~\(i\) in the list is stored
at array cell~\(i\).
The head of the list is always at position~0.
This makes random access to any element in the list quite easy.
Given some position in the list, the value of the element
in that position can be accessed directly.
Thus, access to any element using the
\Cref{moveToPos} method followed by the \Cref{getValue} method takes
\Thetaone\ time.

Because the array-based list implementation is defined to store list
elements in contiguous cells of the array, the
\Cref{insert},\index{list!insert}
\Cref{append}\index{list!append}, and \Cref{remove}\index{list!remove}
methods must maintain this property.
Inserting or removing elements at the tail of the list
is easy, so the \Cref{append} operation takes \Thetaone\ time.
But if we wish to insert an element at the head of the list,
all elements currently in the list must shift one position toward the
tail to make room, as illustrated by Figure~\ref{ShiftList}.
This process takes \Thetan\ time if there are \(n\) elements already in
the list.
If we wish to insert at position \(i\) within a list of \(n\)
elements, then \(n - i\) elements must shift toward the tail.
Removing an element from the head\index{list!head} of the list is
similar in that all remaining elements  must shift toward
the head by one position to fill in the gap.
To remove the element at position \(i\), \(n - i - 1\) elements must
shift toward the head.
In the average case, insertion or removal requires moving half
of the elements, which is \Thetan.

\begin{figure}
\index{list!insert}
\pdffig{ShiftLis}
\smallskip

\capt{4.5in}{Inserting an element into an array-based list}
{Inserting an element at the head of an array-based list requires
shifting all existing elements in the array by one position
toward the tail.
(a)~A list containing five elements before inserting an element with
value~23.
(b)~The list after shifting all existing elements one position to the
right.
(c)~The list after 23 has been inserted in array position~0.
Shading indicates the unused part of the array.}{ShiftList}
\bigskip
\end{figure}

Most of the other member functions for Class \Cref{AList} simply
access the current list element or move the current position.
Such operations all require \Thetaone\ time.
Aside from \Cref{insert} and \Cref{remove},
the only other operations that might require more than
constant time are the constructor, the destructor, and \Cref{clear}.
These three member functions each make use of the system
free-store\ifthenelse{\boolean{cpp}}{operators \Cref{new} and \Cref{delete}.}{}
\ifthenelse{\boolean{java}}{operation \Cref{new}.}{}
As discussed further in Section~\ref{freelist}, system free-store
operations can be expensive.
\ifthenelse{\boolean{cpp}}
{In particular, the cost to delete \Cref{listArray} depends in part on
the type of elements it stores, and whether the \Cref{delete} operator
must call a destructor on each one.}{}
