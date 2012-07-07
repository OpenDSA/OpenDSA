.. avmetadata:: Huffman Coding Trees Tutorial 
   :author: Cliff Shaffer
   :prerequisites: BinTreeImp, SpaceBounds
   :topic: BinTreeImp
   :short_name: Huffman
   
.. _Huffman:

.. include:: JSAVheader.rinc

.. index:: ! Huffman

Huffman
=========

The space/time tradeoff principle presented in
Module <OpenDSA "SpaceBounds" /> states that one can often gain an
improvement in space requirements in exchange for a penalty in running
time.
There are many situations where this is a desirable tradeoff.
A typical example is storing files on disk.
If the files are not actively used, the owner might wish to
compress them to save space.
Later, they can be uncompressed for use, which costs some time,
but only once.

We often represent a set of items in a computer program
by assigning a unique code to each item.
For example, the standard ASCII coding scheme assigns a unique
eight-bit value to each character.
It takes a certain minimum number of bits to provide unique codes for
each character.
For example, it takes :math:`\left\lceil log\ 128\right\rceil`
or seven bits to provide the 128~unique codes needed to represent the
128~symbols of the ASCII character set.

The requirement for :math:`\left \lceil log\ n \right\rceil` bits to represent
:math:`n` unique code values assumes that all codes will be the same
length, as are ASCII codes.
This is called a :strong:`fixed-length` coding scheme.
If all characters were used equally often, then a fixed-length coding
scheme is the most space efficient method.
However, you are probably aware that not all characters are used
equally often in many applications.
For example, the various letters in an English language document have
greatly different frequencies of use.
