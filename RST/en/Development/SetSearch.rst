.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Search

.. odsalink:: AV/Development/BitArrayCON.css   


Bit Vectors for Representing Sets
==================================

Determining whether a value is a member of a particular set is a
special case of searching for keys in a sequence of records.
Thus, any of the search methods discussed in this book can be
used to check for set membership.
However, we can also take advantage of the restricted circumstances
imposed by this problem to develop another representation.

In the case where the set values fall within a limited range, we
can represent the set using a bit array with a bit position allocated
for each potential member.
Those members actually in the set store a value of 1 in their
corresponding bit;
those members not in the set store a value of 0 in their corresponding
bit.
For example, consider the set of primes between 0 and 15.
Figure :num:`Figure #Primes` shows the corresponding bit array.
To determine if a particular value is prime, we simply check
the corresponding bit.
This representation scheme is called a :term:`bit vector` or a
:term:`bitmap`.
The mark array used in several of the graph algorithms of
Chapter :chap:`Graphs` is an example of such a set representation.

.. _Primes:

.. inlineav:: bitArray dgm
   :align: center

   The bit array for the set of primes in the range 0 to 15.
   The bit at position :math:`i` is set to 1 if and only if :math:`i`
   is prime.

If the set fits within a single computer word, then
set union, intersection,
and difference can be performed by logical bit-wise operations.
The union of sets :math:`A` and :math:`B` is the bit-wise OR function
(whose symbol is ``|`` in Java).
The intersection of sets :math:`A` and :math:`B` is the bit-wise AND
function (whose symbol is ``&`` in Java).
For example, if we would like to compute the set of numbers between
0 and 15 that are both prime and odd numbers, we need only compute the
expression

.. math::

   0011010100010100\ \&\ 0101010101010101.

The set difference :math:`A - B` can be implemented in Java using
the expression ``A&~B`` (``~`` is the symbol for bit-wise negation).
For larger sets that do not fit into a single computer word, the
equivalent operations can be performed in turn on the series of words
making up the entire bit vector.

This method of computing sets from bit vectors is sometimes applied to
document retrieval.
Consider the problem of picking from a collection of documents those
few which contain selected keywords.
For each keyword, the document retrieval system stores a bit vector
with one bit for each document.
If the user wants to know which documents contain a certain three
keywords, the corresponding three bit vectors are AND'ed together.
Those bit positions resulting in a value of 1 correspond to the
desired documents.
Alternatively, a bit vector can be stored for each document to
indicate those keywords appearing in the document.
Such an organization is called a :term:`signature file`.
The signatures can be manipulated to find documents with desired
combinations of keywords.

.. odsascript:: AV/Development/BitArrayCON.js
