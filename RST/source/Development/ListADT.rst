.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists

The List ADT [Raw]
==================

We all have an intuitive understanding of what we mean by a ``list.''
Our first step is to define precisely what is meant so that
this intuitive understanding can eventually be converted into a
concrete data structure and its operations.
The most important concept related to lists is that of
:dfn:`position`.
In other words, we perceive that there is a first element in the list,
a second element, and so on.
We should view a list as embodying the mathematical concepts of
a sequence, as defined in Section~\ref{SetDef}.

We define a \defit{list} to be a finite, ordered
sequence\index{sequence} of data items known as
\defit{elements}.\index{list!element}
``Ordered'' in this definition means that each element has a
position in the list.
(We will not use ``ordered'' in this context to mean that the list
elements are sorted by value.)
Each list element has a data type.
In the simple list implementations discussed in this chapter, all
elements of the list have the same data type, although there is
no conceptual objection to lists whose elements have differing
data types if the application requires it (see
Section~\ref{Multilists}).\index{list!element}\index{element!homogeneity}
The operations defined as part of the list ADT do not
depend on the elemental data type.\index{abstract data type (ADT)}
For example, the list ADT can be used for lists of integers, lists of
characters, lists of payroll records, even lists of lists.

A list is said to be \defit{empty} when it
contains no elements.
The number of elements currently stored is called the
\defit{length} of the list.
The beginning of the list is called the
\defit{head}\index{list!head}, the end of the
list is called the \defit{tail}.\index{list!tail}\index{list!terminology}
There might or might not be some relationship between the value of an
element and its position in the list.
For example, \defit{sorted lists}\index{list!sorted} have
their elements positioned in ascending order of value, while
\defit{unsorted lists}\index{list!unsorted} have no
particular relationship between element values and positions.
This section will consider only unsorted lists.
Chapters~\ref{InSort} and~\ref{Search} treat the problems of how
to create and search sorted lists efficiently.

When presenting the contents of a list, we use the same notation
as was introduced for sequences in Section~\ref{SetDef}.
To be consistent with \Lang\ array indexing, the first position
on the list is denoted as 0.
Thus, if there are \(n\) elements in the list, they are given
positions 0 through \(n-1\) as\index{list!notation}
\(\langle a_0,\ a_1,\ ...,\ a_{n-1}\rangle \).
The subscript indicates an element's
position\index{list!current position} within the list.
Using this notation, the empty list would appear as
\(\langle \rangle\). 

\index{list!adt@ADT|(}
\index{abstract data type (ADT)|(}
Before selecting a list implementation, a program designer should
first consider what basic operations the implementation must support.
Our common intuition about lists tells us that a list should be able
to grow and shrink in size as we insert and remove
elements.\index{list!basic operations}
We should be able to insert and remove elements from anywhere in
the list.\index{list!insert}\index{list!remove}
We should be able to gain access to any element's value,
either to read it or to change it.
We must be able to create and clear (or reinitialize)
lists.\index{list!initialization}
It is also convenient to access the next or previous
element from the ``current'' one.

\index{object-oriented programming!class}
The next step is to define the ADT for a list object in terms of a set
of operations on that object.
We will use the \Lang\ notation of 
an\ifthenelse{\boolean{cpp}}{abstract class}{}
\ifthenelse{\boolean{java}}{interface}{}
to formally define the list ADT.
\ifthenelse{\boolean{cpp}}
{An abstract class is one whose member functions are all declared to be
``pure virtual'' as indicated by the ``\Cref{=0}'' notation at the
end of the member function declarations.
Class}{}
\ifthenelse{\boolean{java}}{Interface}{}
\Cref{List} defines the member functions that any list
implementation inheriting from it must support, along with their
parameters and return types.\index{inheritance}
We increase the flexibility of the list ADT by writing it as a
\Lang\ \Gen.

True to the notion of an ADT, 
an\ifthenelse{\boolean{cpp}}{abstract class}{}
\ifthenelse{\boolean{java}}{interface}{}
does not specify how operations are implemented.
Two complete implementations are presented later in this section,
both of which use the same list ADT to define their operations,
but they are  considerably different in approaches and in their
space/time tradeoffs.\index{tradeoff!space/time principle}

Figure~\ref{ListDef} presents our list ADT.
Class \Cref{List} is
a \ifthenelse{\boolean{cpp}}{template\index{templates}}{}
\ifthenelse{\boolean{java}}{generic\index{generics}}{}
of one parameter, named \Cref{E} for ``element''.
\Cref{E} serves as a placeholder for
whatever element type the user would like to store in a list.
The comments given in Figure~\ref{ListDef} describe precisely what
each member function is intended to do.
However, some explanation of the basic design is in order.
Given that we wish to support the concept of a sequence, with access
to any position in the list, the need for many of the member
functions such as \Cref{insert} and \Cref{moveToPos} is clear.
The key design decision embodied in this ADT is support for the
concept of a \defit{current position}.\index{list!current position}
For example, member \Cref{moveToStart} sets
the current position to be the first element on the list, while
methods \Cref{next} and \Cref{prev} move the current position
to the next and previous elements, respectively.
The intention is that any implementation for this ADT support the
concept of a current position.
The current position is where any action such as insertion or deletion
will take place.

\begin{figure}
\xprogfig{List.book}
\vspace{-\bigskipamount}
\capt{4.5in}{ADT for a list}
{The ADT for a list.}{ListDef}
\end{figure}

Since insertions take place at the current position, and since we want
to be able to insert to the front or the back of the list as well as
anywhere in between, there are actually \(n+1\) possible ``current
positions'' when there are \(n\) elements in the list.

It is helpful to modify our list display notation to show the position
of the current element.
I will use a vertical bar, such as
\(\langle 20,\ 23\ |\ 12,\ 15\rangle\)
to indicate the list of four elements,
with the current position being to the right of the bar at element~12.
Given this configuration, calling \Cref{insert} with value 10
will change the list to be \(\langle 20,\ 23\ |\ 10,\ 12,\ 15\rangle\).

If you examine Figure~\ref{ListDef}, you should find that the list
member functions provided allow you to build a list with elements in
any desired order, and to access any desired position in the list.
You might notice that the \Cref{clear} method is not
necessary, in that it could be implemented by means of the other
member functions in the same asymptotic time.
It is included merely for convenience.

Method \Cref{getValue} returns a \pointref\ to the current element.
It is considered a violation of \Cref{getValue}'s preconditions to ask
for the value of a non-existent element
(i.e., there must be something to the right of the vertical bar).
In our concrete list implementations, assertions are
used to enforce such preconditions.
In a commercial implementation, such violations would be best
implemented by the \Lang\ exception mechanism.

A list can be iterated through as shown
in the following code fragment.

\xproghere{listiter.book}

\noindent In this example, each element of the list in turn is stored
in \Cref{it}, and passed to the \Cref{doSomething} function.
The loop terminates when the current position reaches the end of the
list.

\ifthenelse{\boolean{cpp}}
{The declaration for abstract class \Cref{List} also makes private the
class copy constructor and an overloading for the assignment operator.
This protects the class from accidentally being copied.
This is done in part to simplify the example code used in this book.
A full-featured list implementation would likely support copying and
assigning list objects.}{}

The list class declaration presented here is just one of
many possible interpretations for lists.
Figure~\ref{ListDef} provides most of the operations that one
naturally expects to perform on lists and serves to illustrate the
issues relevant to implementing the list data structure.
As an example of using the list ADT, we can create a function to
return \TRUE\ if there is an occurrence of a given integer in the
list, and \FALSE\ otherwise.
The \Cref{find} method needs no knowledge about the specific list
implementation, just the list ADT.

\xproghere{listfind.book}

While this implementation for \Cref{find} could be written as a
\Gen\ with respect to the element type, it would still be
limited in its ability to handle different data types stored on the
list.
In particular, it only works when the description for the object being
searched for (\Cref{k} in the function) is of the same type as the
objects themselves,
and that can meaningfully be compared when using the \Cref{==}
comparison operator.
A more typical situation is that we are searching for a record that
contains a key field who's value matches \Cref{k}.
Similar functions to find and return a composite element based on a
key value can be created using the list implementation, but to do so
requires some agreement between the list ADT and the \Cref{find}
function on the concept of a key, and on how keys may be compared.
This topic is discussed in Section~\ref{Dictionary}.
