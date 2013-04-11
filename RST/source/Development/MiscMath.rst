.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Math Background

Miscellaneous Notation [RAW]
============================

This module collects together definitions for a number of mathematical
terms and concepts, as a place for reference when needed.

\paragraph{Units of measure:}
I~use the following\index{units of measure}
notation for units of measure.
``B'' will be used as an abbreviation for bytes, ``b'' for bits,
``KB'' for kilobytes\index{kilobyte} (\(2^{10} = 1024\)~bytes),
``MB'' for megabytes (\(2^{20}\)~bytes)\index{megabyte},
``GB'' for gigabytes (\(2^{30}\)~bytes)\index{gigabyte},
and ``ms'' for milliseconds\index{millisecond}
(a millisecond is \(\frac{1}{1000}\) of a second).
Spaces are not placed between the number and the unit abbreviation
when a power of two is intended.
Thus a disk drive of size 25 gigabytes (where a gigabyte is intended
as \(2^{30}\) bytes) will be written as ``25GB.''
Spaces are used when a decimal value is intended.
An amount of 2000~bits would therefore be written ``2 Kb'' while
``2Kb'' represents 2048 bits.
2000~milliseconds is written as 2000~ms.
Note that in this book large amounts of storage are nearly always
measured in powers of two and times in powers of
ten.\index{units of measure}

\paragraph{Factorial function:}
The \defit{factorial}\index{factorial function} function,
written \(n!\) for \(n\) an integer greater than 0, is the product of
the integers between 1~and~\(n\), inclusive.
Thus, \(5! = 1 \cdot 2 \cdot 3 \cdot 4 \cdot 5 = 120\).
As a special case, \(0! = 1\).
The factorial function grows quickly as \(n\) becomes larger.
Because computing the factorial function directly is a time-consuming
process, it can be useful to have an equation that provides a
good approximation.
Stirling's approximation\index{factorial function!Stirling's approximation}
states that \(n! \approx \sqrt{2\pi n}(\frac{n}{e})^n\),
where \(e \approx 2.71828\)
(\(e\) is the base for the system of natural logarithms).\footnote{
The symbol ``\(\approx\)'' means ``approximately equal.''}
Thus we see that while \(n!\) grows
slower than \(n^n\) (because \(\sqrt{2\pi n}/e^n < 1\)),
it grows faster than \(c^n\) for any positive integer constant \(c\).

\paragraph{Permutations:}
A \defit{permutation}\index{permutation} of a
sequence~\cvar{S}\index{sequence}
is simply the members of \cvar{S} arranged in some order.
For example, a permutation of the integers 1~through~\(n\) would be
those values arranged in some order.
If~the sequence\index{sequence}
contains \(n\)~distinct members, then there are
\(n!\)~different permutations for the sequence.
This is because there are \(n\)~choices for the first member in the
permutation; for each choice of first member there are \(n-1\) choices 
for the second member, and so on.
Sometimes one would like to obtain a \defit{random permutation} for a
sequence, that is, one of the \(n!\) possible permutations is selected
in such a way that each permutation has equal probability of being
selected.
A simple \Lang\ function for generating a random permutation is as
follows.
Here, the \(n\) values of the sequence are stored in
positions 0 through \(n-1\) of array \Cref{A},
function \Cref{swap(A, i, j)}\index{swap@\Cref{swap}}
exchanges elements \Cref{i} and \Cref{j} in array \Cref{A},
and \Cref{Random(n)}\index{random@\Cref{Random}}
returns an integer value in the range 0 to \(n-1\)
(see the Appendix for more information on \Cref{swap} and
\Cref{Random}).

\xproghere{permute.book}

\paragraph{Boolean variables:}
A \defit{Boolean variable}
\index{boolean variable@Boolean variable}
is a variable (of type \Bool\ in \Lang) that takes on one of the two
values \TRUE\ and \FALSE.
These two values are often associated with the values 1 and 0,
respectively, although there is no reason why this needs to be the case.
It is poor programming practice to rely on the
correspondence between 0~and \FALSE, because these are logically
distinct objects of different types.

\paragraph{Logic Notation:}
We will occasionally make use of the notation of symbolic or Boolean
logic.
\(A \Rightarrow B\) means ``A implies B'' or ``If A then B.''
\(A \Leftrightarrow B\) means ``A if and only if B'' or ``A is
equivalent to B.''
\(A \vee B\) means ``A or B'' (useful both in the context of symbolic
logic or when performing a Boolean operation).
\(A \wedge B\) means ``A and B.''
\(\sim\!A\) and \(\overline{A}\) both mean ``not A'' or the negation
of A where A is a Boolean variable.

\paragraph{Floor and ceiling:}
The \defit{floor}\index{floor function} of \(x\) (written
\(\lfloor x \rfloor\)) takes real value \(x\) and returns the greatest 
integer~\(\leq x\).
For example, \(\lfloor 3.4 \rfloor = 3\), as does \(\lfloor 3.0 \rfloor\), 
while \(\lfloor -3.4 \rfloor = -4\) and \(\lfloor -3.0 \rfloor = -3\).
The \defit{ceiling}\index{ceiling function} of \(x\) (written
\(\lceil x \rceil\)) takes real value \(x\) and returns the least
integer~\(\geq x\).
For example, \(\lceil 3.4 \rceil = 4\), as does \(\lceil 4.0 \rceil\),
while \(\lceil -3.4 \rceil = \lceil -3.0 \rceil = -3\).

\paragraph{Modulus operator:}
The \defit{modulus}\index{modulus function} (or \defit{mod})
function returns the remainder of an integer division.
Sometimes written \(n \bmod m\) in mathematical expressions,
the syntax for the \Lang\ modulus operator is \Cref{n \% m}.
From the definition of remainder, \(n \bmod m\) is the integer~\(r\)
such that \(n = qm + r\) for \(q\) an integer, and \(|r| < |m|\).
Therefore, the result of \(n \bmod m\) must be between 0 and \(m-1\)
when \(n\) and \(m\) are positive integers.
For example, \(5 \bmod 3 = 2\); \(25 \bmod 3 = 1\), \(5 \bmod 7 = 5\),
and \(5 \bmod 5 = 0\).

There is more than one way to assign values to \(q\)
and \(r\), depending on how integer division is interpreted.
The most common mathematical definition computes the mod function as
\(n \bmod m = n - m\lfloor n/m\rfloor\).
In this case, \(-3 \bmod 5 = 2\).
However, \LangJava\ and \LangCPP\ compilers typically use the underlying
processor's machine instruction for computing integer arithmetic.
On many computers this is done by truncating the resulting fraction,
meaning \(n \bmod m = n - m (\mathrm{trunc}(n/m))\).
Under this definition, \(-3 \bmod 5 = -3\).

Unfortunately, for many applications this is not what the user wants
or expects.
For example, many hash systems\index{hashing} will perform some
computation on a record's key value and then take the result modulo the
hash table size.
The expectation here would be that the result is a legal index into
the hash table, not a negative number.
Implementers of hash functions must either insure that the
result of the computation is always positive, or else add the hash
table size to the result of the modulo function when that result is
negative.
