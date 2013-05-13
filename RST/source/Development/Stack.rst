.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists

Stacks [Raw]
============

The \defit{stack} is a list-like structure\index{list}
in which elements may be inserted or removed from only one end.
While this restriction makes stacks less flexible than lists,
it also makes stacks both efficient (for those operations they can do)
and easy to implement.
Many applications require only the limited form of
insert\index{stack!insert} and remove\index{stack!remove} operations
that stacks provide.
In such cases, it is more efficient to use the simpler stack data
structure rather than the generic list.
For example, the freelist of Section~\ref{freelist} is really a
stack.\index{freelist}

Despite their restrictions, stacks have many uses.
Thus, a special vocabulary for stacks has developed.
Accountants used stacks long before the invention
of the computer.\index{accounting}
They called the stack a ``LIFO'' list\index{lifo list@LIFO list},
which stands for ``Last-In, First-Out.'' 
Note that one implication of the LIFO policy is that stacks
remove elements in reverse order of their arrival.

The accessible element of the stack is called
the \defit{top} element.\index{stack!top}\index{stack!terminology}
Elements are not said to be inserted, they are
\defit{pushed}\index{stack!insert}\index{stack!push} onto the stack.
When removed, an element is said to be
\defit{popped}\index{stack!remove}\index{stack!pop} from the stack.
Figure~\ref{StackADT} shows a sample stack ADT.

\begin{figure}
\xprogfig{Stack.book}
\vspace{-\bigskipamount}
\capt{4.5in}{The stack ADT}
{The stack ADT.}{StackADT}
\vspace{-\smallskipamount}
\end{figure}

As with lists, there are many variations on stack implementation.
The two approaches presented here are \defit{array-based} and
\defit{linked stacks}, 
which are analogous to array-based and linked lists, respectively.

\subsection{Array-Based Stacks}

\index{stack!array-based|(}
Figure~\ref{AStackDef} shows a complete implementation for
the array-based stack class.
As with the array-based list\index{list!array-based} implementation,
\Cref{listArray} must be declared of fixed size when the stack is
created.
In the stack constructor\index{stack!constructor}, \Cref{size} serves
to indicate this size.
Method \Cref{top}\index{stack!top} acts somewhat like a current
position value (because the ``current'' position is always at the top
of the stack), as well as indicating the number of elements
currently in the stack.


\begin{figure}
\xprogfig{AStack.book}
\vspace{-\bigskipamount}\vspace{-\smallskipamount}
\capt{4.5in}{Array-based stack class implementation}
{Array-based stack class implementation.}{AStackDef}
\vspace{-\smallskipamount}
\end{figure}

The\index{stack!top|(} array-based stack implementation is essentially
a simplified version of the array-based list.
The only important design decision to be made is which end of the
array should represent the top of the stack.
One choice is to make the top be at position~0 in the array.
In terms of list functions, all \Cref{insert} and \Cref{remove}
operations would then be on the element in position~0.
This implementation is inefficient, because now every
\Cref{push}\index{stack!push} or \Cref{pop}\index{stack!pop}
operation will require that all elements currently in the stack be
shifted one position in the array, for a cost of \Thetan\ if there
are $n$~elements.
The other choice is have the top element be at position~$n-1$ when
there are $n$~elements in the stack.
In other words, as elements are pushed onto the stack, they are
appended to the tail of the list.
Method \Cref{pop} removes the tail element.
In this case, the cost for each \Cref{push} or \Cref{pop} operation
is only \Thetaone.

For the implementation of Figure~\ref{AStackDef},
\Cref{top} is defined to be the array index of the
first free position in the stack.
Thus, an empty stack has \Cref{top} set to~0, the first available
free position in the array.
(Alternatively, \Cref{top} could have been defined to be
the index for the top element in the stack, rather than the
first free position.
If this had been done, the empty list would initialize \Cref{top}
as~$-1$.)
Methods \Cref{push}\index{stack!push} and \Cref{pop}\index{stack!pop}
simply place an element into, or remove an element from, the array
position indicated by \Cref{top}.
Because \Cref{top} is assumed to be at the first free position,
\Cref{push} first inserts its value into the top position and then
increments \Cref{top}, while \Cref{pop} first decrements \Cref{top}
and then removes the top element.
\index{stack!top|)}
\index{stack!array-based|)}

\ifthenelse{\boolean{java}}{\newpage}{}

\subsection{Linked Stacks}

\begin{figure}
\xprogfig{LStack.book}
\vspace{-\bigskipamount}

\capt{4.5in}{Linked stack class implementation}
{Linked stack class implementation.}{LStackDef}
\ifthenelse{\boolean{java}}{\vspace{-\medskipamount}}{}
\end{figure}

The\index{stack!linked} linked stack implementation is quite simple.
The freelist\index{freelist} of Section~\ref{freelist} is an example
of a linked stack.
Elements are inserted and removed only from the head of the list.
A header node is not used because no special-case code is required
for lists of zero or one elements.\index{header node}
Figure~\ref{LStackDef} shows the complete linked stack
implementation.
The only data member is \Cref{top}\index{stack!top}, a pointer to the
first (top) link node of the stack.
Method \Cref{push}\index{stack!push} first modifies the \Cref{next}
field of the newly created link node to point to the top of the
stack and then sets \Cref{top}\index{stack!top} to point to the new
link node.
Method \Cref{pop}\index{stack!pop} is also quite simple.
Variable \Cref{temp} stores the top nodes' value,
while \Cref{ltemp} links to the top node as it is removed from
the stack.
The stack is updated by setting \Cref{top} to point to the
next link in the stack.
The old top node is then returned to free store (or the freelist), and
the element value is returned.\index{stack!linked}

\subsection{Comparison of Array-Based and Linked Stacks}

\index{stack!implementations compared}
All operations for the array-based and linked stack implementations
take constant time, so from a time efficiency perspective, neither has
a significant advantage.
Another basis for comparison is the total space
required.\index{overhead!stack}
The analysis is similar to that done for list implementations.
The array-based stack must declare a fixed-size array initially, and
some of that space is wasted whenever the stack is not full.
The linked stack can shrink and grow but requires the overhead of a
link field for every element.

When multiple stacks\index{stack!two in one array} are to be
implemented, it is possible to take advantage of the one-way growth of
the array-based stack.
This can be done by using a single array to store two stacks.
One stack grows inward from each end as illustrated by
Figure~\ref{TwoArrayStacks}, hopefully leading to less wasted space.
However, this only works well when the space requirements of the two
stacks are inversely correlated.
In other words, ideally when one stack grows, the other will shrink.
This is particularly effective when elements are taken from
one stack and given to the other.
If~instead both stacks grow at the same time, then the free space
in the middle of the array will be exhausted
quickly.\index{stack!implementations compared}

\begin{figure}
\pdffig{TwoArray}
\vspace{-\bigskipamount}\vspace{-\medskipamount}

\capt{4.5in}{Two stacks implemented within a single array}
{Two stacks implemented within in a single array, both growing toward
the middle.}
{TwoArrayStacks}
\smallskip
\end{figure}
