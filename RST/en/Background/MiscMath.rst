.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :satisfies: factorial; permuation; modulus
   :topic: Math Background

Miscellaneous Notation
======================

This module collects together definitions for a number of mathematical
terms and concepts, as a place for reference when needed.

**Units of measure:**
OpenDSA modules use the following notation for units of measure.
"B" will be used as an abbreviation for bytes, "b" for bits,
"KB" for kilobytes :math:`(2^{10} = 1024` bytes),
"MB" for megabytes :math:`(2^{20}` bytes)
"GB" for gigabytes :math:`(2^{30}` bytes)
and "ms" for milliseconds
(a millisecond is 1/1000 of a second).
Spaces are not placed between the number and the unit abbreviation
when a power of two is intended.
Thus a disk drive of size 25 gigabytes (where a gigabyte is intended
as :math:`2^{30}` bytes) will be written as "25GB".
Spaces are used when a decimal value is intended.
An amount of 2000 bits would therefore be written "2 Kb" while
"2Kb" represents 2048 bits.
2000 milliseconds is written as 2000 ms.
Note that in this book large amounts of storage are nearly always
measured in powers of two and times in powers of
ten.

**Factorial function:**
The :term:`factorial` function, written :math:`n!` for :math:`n` an
integer greater than 0, is the product of
the integers between 1 and :math:`n`, inclusive.
Thus, :math:`5! = 1 \cdot 2 \cdot 3 \cdot 4 \cdot 5 = 120`.
As a special case, :math:`0! = 1`.
The factorial function grows quickly as :math:`n` becomes larger.
Because computing the factorial function directly is a time-consuming
process, it can be useful to have an equation that provides a
good approximation.
Stirling's approximation states that
:math:`n! \approx \sqrt{2\pi n}(\frac{n}{e})^n`,
where :math:`e \approx 2.71828`
(:math:`e` is the base for the system of natural logarithms) [#]_.
Thus we see that while :math:`n!` grows
slower than :math:`n^n` (because :math:`\sqrt{2\pi n}/e^n < 1`),
it grows faster than :math:`c^n` for any positive integer constant
:math:`c`.

**Permutations:**
A :term:`permutation` of a sequence :math:`\mathbf{S}`
is simply the members of :math:`\mathbf{S}` arranged in some order.
For example, a permutation of the integers 1 through :math:`n` would
be those values arranged in some order.
If the sequence contains :math:`n` distinct members, then there are
:math:`n!` different permutations for the sequence.
This is because there are :math:`n` choices for the first member in
the permutation; for each choice of first member there are :math:`n-1`
choices for the second member, and so on.
Sometimes one would like to obtain a :term:`random permutation` for a
sequence, that is, one of the :math:`n!` possible permutations is
selected in such a way that each permutation has equal probability of
being selected.
A simple function for generating a random permutation is as
follows.
Here, the :math:`n` values of the sequence are stored in
positions 0 through :math:`n-1` of array ``A``,
function ``swap(A, i, j)``
exchanges elements ``i`` and ``j`` in array ``A``,
and ``Random(n)`` returns an integer value in the range 0 to
:math:`n-1`.

.. codeinclude:: Utils/Permute 
   :tag: Permute

**Boolean variables:**
A :term:`Boolean variable`
is a variable that takes on one of the two values ``True`` and
``False``.
These two values are often associated with the values 1 and 0,
respectively, although there is no reason why this needs to be the
case.
It is poor programming practice to rely on the
correspondence between 0 and False, because these are logically
distinct objects of different types.

**Logic Notation:**
We will occasionally make use of the notation of symbolic or Boolean
logic.
:math:`A \Rightarrow B` means ":math:`A` implies :math:`B`" or
"If :math:`A` then :math:`B`".
:math:`A \Leftrightarrow B` means ":math:`A` if and only if :math:`B`"
or ":math:`A` is equivalent to :math:`B`".
:math:`A \vee B` means ":math:`A` or :math:`B`"
(useful both in the context of symbolic
logic or when performing a Boolean operation).
:math:`A \wedge B` means ":math:`A` and :math:`B`".
:math:`\sim\!A` and :math:`\overline{A}` both mean "not :math:`A`" or
the negation of :math:`A` where :math:`A` is a Boolean variable.

**Floor and ceiling:**
The :term:`floor` of :math:`x` (written :math:`\lfloor x \rfloor`)
takes real value :math:`x` and returns the greatest 
integer :math:`\leq x`.
For example, :math:`\lfloor 3.4 \rfloor = 3`,
as does :math:`\lfloor 3.0 \rfloor`, 
while :math:`\lfloor -3.4 \rfloor = -4` and
:math:`\lfloor -3.0 \rfloor = -3`.
The :term:`ceiling` of :math:`x` (written
:math:`\lceil x \rceil`) takes real value :math:`x` and returns the
least integer :math:`\geq x`.
For example, :math:`\lceil 3.4 \rceil = 4`, as does
:math:`\lceil 4.0 \rceil`,
while :math:`\lceil -3.4 \rceil = \lceil -3.0 \rceil = -3`.

**Modulus function:**
The :term:`modulus` (or :term:`mod`) function returns the remainder of
an integer division.
Sometimes written :math:`n \bmod m` in mathematical expressions,
the syntax in many programming languages is ``n % m``.
From the definition of remainder, :math:`n \bmod m` is the integer
:math:`r` such that :math:`n = qm + r` for :math:`q` an integer,
and :math:`|r| < |m|`.
Therefore, the result of :math:`n \bmod m` must be between 0 and
:math:`m-1` when :math:`n` and :math:`m` are positive integers.
For example, :math:`5 \bmod 3 = 2`; :math:`25 \bmod 3 = 1`,
:math:`5 \bmod 7 = 5`, and :math:`5 \bmod 5 = 0`.

There is more than one way to assign values to :math:`q`
and :math:`r`, depending on how integer division is interpreted.
The most common mathematical definition computes the mod function as
:math:`n \bmod m = n - m\lfloor n/m\rfloor`.
In this case, :math:`-3 \bmod 5 = 2`.
However, Java and C++ compilers typically use the underlying
processor's machine instruction for computing integer arithmetic.
On many computers this is done by truncating the resulting fraction,
meaning :math:`n \bmod m = n - m (\mathrm{trunc}(n/m))`.
Under this definition, :math:`-3 \bmod 5 = -3`.
Another language might do something different.

Unfortunately, for many applications this is not what the user wants
or expects.
For example, many :ref:`hash systems <hash system> <HashFunc>`
will perform some computation on a record's :term:`key` value and then
take the result modulo the hash table size.
The expectation here would be that the result is a legal index into
the hash table, not a negative number.
Implementers of hash functions must either insure that the
result of the computation is always positive, or else add the hash
table size to the result of the modulo function when that result is
negative.

.. [#] The symbol ":math:`\approx`" means "approximately equal."
