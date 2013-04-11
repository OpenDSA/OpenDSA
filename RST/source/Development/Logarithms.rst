.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Math Background

Logarithms [RAW]
================

A \defit{logarithm} of base \(b\) for value \(y\) is the power to which
\(b\) is raised to get \(y\).
Normally, this is written as \(\log_b y = x\).
Thus, if \(\log_b y = x\) then \(b^x = y\),
and \(b^{log_b y} = y\).

Logarithms are used frequently by programmers.
Here are two typical uses.

\begin{example}
Many programs require an encoding for a collection of objects.
What is the minimum number of bits needed to represent \(n\)~distinct
code values?
The answer is \(\lceil \log_2 n \rceil\) bits.
For example, if you have 1000 codes to store, you will require at
least \(\lceil \log_2 1000 \rceil = 10\) bits to have 1000
different codes (10 bits provide 1024 distinct code values).
\end{example}

\begin{example}
Consider the binary search algorithm for finding a given value within
an array sorted by value from lowest to highest.
Binary search\index{search!binary} first looks at the middle element
and determines if the value being searched for is in the upper half or
the lower half of the array.
The algorithm then continues splitting the appropriate
subarray in half until the desired value is found.
(Binary search is described in more detail in
Section~\ref{ProgTimeSec}.)
How many times can an array of size \(n\) be split in half until only
one element remains in the final subarray?
The answer is \(\lceil \log_2 n \rceil\) times.
\end{example}

In this book, nearly all logarithms used have a base of two.
This is because data structures and algorithms most often divide
things in half, or store codes with binary bits.
Whenever you see the notation \(\log n\) in this book,
either \(\log_2 n\) is meant or else the term is being used
asymptotically and so the actual base does not matter.
Logarithms using any base other than two will show the base
explicitly.

Logarithms have the following properties, for any positive values of
\(m\), \(n\), and \(r\), and any positive integers \(a\) and \(b\).
\begin{enumerate}
\item
\(\log (nm) = \log n + \log m\).
\item
\(\log (n/m) = \log n - \log m\).
\item
\(\log (n^r) = r \log n\).
\item
\(\log_a n = \log_b n / \log_b a\).
\end{enumerate}

The first two properties state that the logarithm
of two numbers multiplied (or divided) can be found by adding
(or subtracting) the logarithms of the two numbers.\footnote{
These properties are the idea behind the slide rule\index{slide rule}.
Adding two numbers can be viewed as joining two lengths
together and measuring their combined length.
Multiplication is not so easily done.
However, if the numbers are first converted to the lengths of their
logarithms, then those lengths can be added and the inverse logarithm
of the resulting length gives the answer for the multiplication
(this is simply logarithm property~(1)).
A slide rule measures the length of the logarithm for the numbers,
lets you slide bars representing these lengths to add up the total
length, and finally converts this total length to the correct numeric
answer by taking the inverse of the logarithm for the result.
}
Property~(3) is simply an extension of property~(1).
Property~(4) tells us that, for variable~\(n\) and any two integer
constants~\(a\) and \(b\), \(\log_a n\) and \(\log_b n\) differ by the
constant factor \(\log_b a\), regardless of the value of~\(n\).
Most runtime analyses in this book are of a type that ignores
constant factors in costs.
Property~(4) says that such analyses need not be concerned with the
base of the logarithm, because this can change the total cost only by a
constant factor.
Note that \(2^{\log n} = n\).

When discussing logarithms, exponents often lead to confusion.
Property~(3) tells us that \(\log n^2 = 2 \log n\).
How do we indicate the square of the logarithm (as opposed to the
logarithm of~\(n^2\))?
This could be written as \((\log n)^2\), but it is traditional to use
\(\log^2 n\).
On the other hand, we might want to take the logarithm of the
logarithm of~\(n\).
This is written \(\log \log n\).

A special notation is used in the rare case when we need to know how
many times we must take the log of a number before we reach a
value \(\leq 1\).
This quantity is written \(\log^* n\).
For example, \(\log^* 1024 = 4\) because
\(\log 1024 = 10\), \(\log 10 \approx 3.33\), \(\log 3.33 \approx 1.74\),
and \(\log 1.74 < 1\), which is a total of 4 log operations.
