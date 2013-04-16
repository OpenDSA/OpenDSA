.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Algorithm Analysis

Space Bounds [Raw]
==================

Besides time, space is the other computing resource that is commonly
of concern to programmers.
Just as computers have become much faster over the years, they have
also received greater allotments of memory.
Even so, the amount of available disk space or main memory can
be significant constraints for algorithm designers.

The analysis techniques used to measure space requirements are
similar to those used to measure time requirements.
However, while time requirements are normally measured for an
algorithm that manipulates a particular data structure,
space requirements are normally determined for the data structure
itself.
The concepts of asymptotic analysis for growth rates
on input size apply completely to measuring space requirements.

\begin{example}
What are the space requirements for an array of \(n\)~integers?
If each integer requires \(c\)~bytes, then the array requires
\(cn\)~bytes, which is~\Thetan.
\end{example}

\begin{example}
Imagine that we want to keep track of friendships between \(n\) people.
We can do this with an array of size \(n \times n\).
Each row of the array represents the friends of an individual, with
the columns indicating who has that individual as a friend.
For example, if person \(j\) is a friend of person \(i\), then we
place a mark in column \(j\) of row \(i\) in the array.
Likewise, we should also place a mark in column \(i\) of row \(j\)
if we assume that friendship works both ways.
For \(n\) people, the total size of the array is \Thetantwo.
\end{example}

A data structure's primary purpose is to store data in a way that
allows efficient access to those data.
To provide efficient access, it may be necessary to store
additional information about where the data are within the data
structure.
For example, each node of a linked list must store a pointer to the
next value on the list.
All such information stored in addition to the actual data values is
referred to as \defit{overhead}.\index{overhead}
Ideally, overhead should be kept to a minimum while allowing maximum
access.
The need to maintain a balance between these opposing goals is what
makes the study of data structures so interesting.

\index{tradeoff!space/time principle|(}
One important aspect of algorithm design is referred to as
the \defit{space/time tradeoff} principle.
The space/time tradeoff principle says that one can often achieve a
reduction in time if one is willing to sacrifice space or
vice versa.
Many programs can be modified to reduce storage requirements by
``packing'' or encoding information.
``Unpacking'' or decoding the information requires additional
time.
Thus, the resulting program uses less space but runs slower.
Conversely, many programs can be modified to pre-store results or
reorganize information to allow faster running time at the expense of
greater storage requirements.
Typically, such changes in time and space are both by a constant
factor.

\index{lookup table}
A classic example of a space/time tradeoff is the
\defit{lookup table}.
A~lookup table pre-stores the value of a function that would
otherwise be computed each time it is needed.
For example, 12!~is the greatest value for the
factorial\index{factorial function} function that
can be stored in a 32-bit \Cref{int} variable.
If you are writing a program that often computes
factorials\index{factorial function},
it is likely to be much more time efficient to simply pre-compute
and store the 12 values in a table.
Whenever the program needs the value of \(n!\) it can
simply check the lookup table.
(If \(n > 12\), the value is too large
to store as an \Cref{int} variable anyway.)
Compared to the time required to compute factorials, it may be well
worth the small amount of additional space needed to store the
lookup table.

Lookup tables can also store approximations
for an expensive function such as sine or cosine.
If you compute this function only for exact degrees or are
willing to approximate the answer with the value for the nearest
degree, then a lookup table storing the computation for exact degrees
can be used instead of repeatedly computing the sine function.
Note that initially building the lookup table requires a certain
amount of time.
Your application must use the lookup table often
enough to make this initialization worthwhile.
\index{lookup table}

Another example of the space/time tradeoff is typical of what a
programmer might encounter when trying to optimize space.
Here is a simple code fragment for sorting an array of integers.
We assume that this is a special case where there are \(n\) integers
whose values are a permutation\index{permutation}
of the integers from 0~to~\(n-1\).
This is an example of a Binsort,\index{binsort@Binsort}
which is discussed in Section~\ref{BinRadix}.
Binsort assigns each value to an array position corresponding to its
value.

\xproghere{binsimp1.book}

This is efficient and requires \Thetan\ time.
However, it also requires two arrays of size~\(n\).
Next is a code fragment that places the permutation in order but does
so within the same array (thus it is an example of an ``in place''
sort).

\xproghere{binsimp2.book}

Function \noindent \Cref{swap(A, i, j)} exchanges elements \Cref{i}
and \Cref{j} in array \Cref{A}.
It may not be obvious that the second code fragment
actually sorts the array.
To see that this does work, notice that each pass through the
\Cref{for} loop will at least move the integer with value~\(i\)
to its correct position in the array, and that during this iteration, 
the value of \Cref{A[i]} must be greater than or equal to~\(i\).
A total of at most \(n\)~\Cref{swap} operations take place, because an
integer cannot be moved out of its correct position once it has been
placed there, and each swap operation places at least one integer in
its correct position.
Thus, this code fragment has cost \Thetan.
However, it requires more time to run than the first code fragment.
On my computer the second version takes nearly twice as long to run
as the first, but it only requires half the space.
\index{binsort@Binsort}
\index{permutation}

\index{tradeoff!disk-based space/time principle|(}
A second principle for the relationship between a program's space and
time requirements applies to programs that process
information stored on disk, as discussed in Chapter~\ref{FileProc}
and thereafter.
Strangely enough, the disk-based space/time tradeoff principle is
almost the reverse of the space/time tradeoff principle for programs
using main memory.

The \defit{disk-based space/time tradeoff} principle states that the
smaller you can make your disk storage requirements, the faster your
program will run.
This is because the time to read information from disk is enormous
compared to computation time, so almost any amount of additional
computation needed to unpack the data is going to be less than the
disk-reading time saved by reducing the storage requirements.
\index{file processing}
Naturally this principle does not hold true in all cases,
but it is good to keep in mind when designing programs that process
information stored on disk.
