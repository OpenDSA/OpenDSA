.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Tom Naps and Sam Micka

Rabin-Karp String Search Algorithm [Draft]
===========================================

..
..

The Rabin-Karp algorithm is based on what could be imagined as a
"perfect hash function for strings".  We will assume that our
strings are drawn from an alphabet with :math:`C` possible
characters. Denote the characters in string :math:`S` by :math:`s_0,
s_1, \ldots s_{n-1}`.  Suppose that we have a mapping :math:`c
\rightarrow \hat{c}` that associates with each character :math:`c` an
integer :math:`\hat{c}` in the range :math:`0 \ldots c - 1`.  Then a
"perfect hash function for strings" is:

.. math::

 \widehat{s_0} \times C^{n-1} + \widehat{s_1} \times C^{n-2} + \ldots + \widehat{s_{n-2}} \times C + \widehat{s_{n-1}} \times C^0 

Suppose that we call this a string's "magic number".  In effect it
associates each string with a unique number in the base :math:`C`
number system.  However, nothing is perfect -- these magic numbers for
strings get very big very quickly.  Hence the following sub-algorithm
of Rabin-Karp to compute a string's magic number (which is itself
known as Horner's polynomial evaluation algorithm) takes this into
account by using the :math:`mod` operator to avoid an overflow
condition.

Slideshow for Horner's Method algorithm for computing Rabin-Karp "magic number" for a string

.. avembed:: AV/Development/Rabin_Karp_Horner_Slideshow.html ss 

To check your understanding of this "magic number" computation try the
following exercise in using Horner's Method to compute a string's
"magic number" in a simple case

.. avembed:: Exercises/Development/Rabin_Karp_Horners_Exercise.html ka

Because Horner's Method cannot truly compute a magic number that is
unique for every string, the Rabin-Karp algorithm must allow for two
different strings having the same magic number.  In effect, such a
situation represents a "false positive" in which Rabin-Karp thinks it
has found a match only to be disappointed.  Watch Rabin-Karp in action
in the following slideshow.

.. avembed:: AV/Development/Rabin_Karp_Algorithm_Slideshow.html ss

Finally try this exercise in tracing one step of the Rabin-Karp
algorithm using the modified Horner's algorithm to compute the "magic
number" of a string.

.. avembed:: Exercises/Development/Rabin_Karp_Next_Step.html ka





