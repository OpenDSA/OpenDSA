.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: BST
   :satisfies: Huffman coding tree
   :topic: BinTreeImp

.. odsalink:: DataStructures/huffman.css
.. odsalink:: AV/Binary/huffmanCON.css

.. index:: ! Huffman

Huffman Coding Trees
====================

Huffman Coding Trees
--------------------

One can often gain an improvement in space requirements in exchange
for a penalty in running time.
There are many situations where this is a desirable tradeoff.
A typical example is storing files on disk.
If the files are not actively used, the owner might wish to compress
them to save space. Later, they can be uncompressed for use, which
costs some time, but only once.

We often represent a set of items in a computer program by assigning a
unique code to each item.
For example, the standard :term:`ASCII coding <ASCII character coding>`
scheme assigns a unique eight-bit value to each character.
It takes a certain minimum number of bits to provide enough unique
codes so that we have a different one for each character.
For example, it takes :math:`\left\lceil log\ 128\right\rceil`
or seven bits to provide the 128 unique codes needed
to represent the 128 symbols of the ASCII character set. [#]_

The requirement for :math:`\left \lceil log\ n \right\rceil` bits to
represent :math:`n` unique code values assumes that all codes will be
the same length, as are ASCII codes.
These are called :term:`fixed-length codes <fixed-length coding>`.
If all characters were used equally often, then a fixed-length coding
scheme is the most space efficient method.
However, you are probably aware that not all characters are used
equally often in many applications.
For example, the various letters in an English language document have
greatly different frequencies of use.

Table :num:`#Freq` shows the relative frequencies of the
letters of the alphabet. From this table we can see that the letter
'E' appears about 60 times more often than the letter 'Z'. In normal
ASCII, the words "DEED" and "MUCK" require the same amount of space
(four bytes). It would seem that words such as "DEED", which are
composed of relatively common letters, should be storable in less
space than words such as "MUCK", which are composed of relatively
uncommon letters.

.. _Freq:

.. topic:: Table

   Relative frequencies for the 26 letters of the
   alphabet as they appear in a selected set of English
   documents. "Frequency" represents the expected frequency of occurrence
   per 1000 letters, ignoring case.

   .. math::

      \begin{array}{c|c|c|c}
      \textbf{Letter}&\textbf{Frequency}&\textbf{Letter}&\textbf{Frequency}\\
      \textrm A & 77 & N & 67\\
      \textrm B & 17 & O & 67\\
      \textrm C & 32 & P & 20\\
      \textrm D & 42 & Q &  5\\
      \textrm E &120 & R & 59\\
      \textrm F & 24 & S & 67\\
      \textrm G & 17 & T & 85\\
      \textrm H & 50 & U & 37\\
      \textrm I & 76 & V & 12\\
      \textrm J &  4 & W & 22\\
      \textrm K &  7 & X &  4\\
      \textrm L & 42 & Y & 22\\
      \textrm M & 24 & Z &  2\\
      \end{array}

If some characters are used more frequently than others, is it
possible to take advantage of this fact and somehow assign them
shorter codes?
The price could be that other characters require longer codes, but
this might be worthwhile if such characters appear rarely enough.
This concept is at the heart of file compression techniques in
common use today.
The next section presents one such approach to assigning
:term:`variable-length codes <variable-length coding>`,
called :term:`Huffman coding <Huffman codes>`.
While it is not commonly used in its simplest form for file
compression (there are better methods), Huffman coding gives the
flavor of such coding schemes.
One motivation for studying Huffman coding is because it provides our
first opportunity to see a type of tree structure referred to as a
:term:`search trie`.

.. [#] To keep things simple, these examples for building Huffman
       trees uses a :term:`sorted list` to keep the partial Huffman trees
       ordered by frequency.
       But a real implementation would use a :term:`heap` to implement a
       :term:`priority queue` keyed by the frequencies.


Building Huffman Coding Trees
-----------------------------

Huffman coding assigns codes to characters such that the length of the
code depends on the relative frequency or :term:`weight` of the
corresponding character.
Thus, it is a variable-length code.
If the estimated frequencies for letters match the actual frequency
found in an encoded message, then the length of that message will
typically be less than if a fixed-length code had been used.
The Huffman code for each letter is derived from a full binary tree
called the :term:`Huffman coding tree`, or simply the
:term:`Huffman tree`.
Each leaf of the Huffman tree corresponds to a letter, and we
define the weight of the leaf node to be the weight (frequency) of its
associated letter.
The goal is to build a tree with the
:term:`minimum external path weight`.
Define the :term:`weighted path length` of a leaf to be its weight
times its depth.
The binary tree with minimum external path weight is the one with the
minimum sum of weighted path lengths for the given set of leaves.
A letter with high weight should have low depth, so that it will count
the least against the total path length.
As a result, another letter might be pushed deeper in the tree if it
has less weight.

The process of building the Huffman tree for :math:`n` letters is
quite simple.
First, create a collection of :math:`n` initial Huffman trees,
each of which is a single leaf node containing one of the letters.
Put the :math:`n` partial trees onto a priority queue
organized by weight (frequency).
Next, remove the first two trees (the ones with lowest weight) from
the priority queue.
Join these two trees together to create a new tree whose root has the
two trees as children, and whose weight is the sum of the weights of
the two trees.
Put this new tree back into the priority queue.
This process is repeated until all of the partial Huffman trees have
been combined into one.

.. _FreqExamp:

.. topic:: Table

   The relative frequencies for eight selected letters.

   .. math::

      \begin{array}{|c|cccccccc|}
      \hline
      \textrm Letter & C & D & E & K & L & M & U & Z\\
      \textrm Frequency & 32 & 42 & 120 & 7 & 42 & 24 & 37 & 2\\
      \hline
      \end{array}

The following slideshow illustrates the Huffman tree
construction process for the eight letters of
Table :num:`Table #FreqExamp`. [#]_

.. inlineav:: huffmanBuildCON ss
   :output: show

Here is the implementation for Huffman tree nodes.

.. codeinclude:: Binary/Huffman
   :tag: HuffmanNode

This implementation is similar to
a typical :ref:`class hierarchy <class hierarchy> <BinaryTreeImpl>`
for implementing full binary trees.
There is an abstract :term:`base class`, named ``HuffNode``, and two
:term:`subclasses <subclass>`, named ``LeafNode`` and ``IntlNode``.
This implementation reflects the fact that leaf and
internal nodes contain distinctly different information.

Here is the implementation for the Huffman Tree class.

.. codeinclude:: Binary/Huffman
   :tag: HuffmanTree

Here is the implementation for the tree-building process.

.. codeinclude:: Binary/Huffman
   :tag: HuffmanTreeBuild

``buildHuff`` takes as input ``fl``, the min-heap of partial
Huffman trees, which initially are single leaf nodes as shown in Step
1 of the slideshow above.
The body of function ``buildTree`` consists mainly of a ``for``
loop. On each iteration of the ``for`` loop, the first two partial
trees are taken off the heap and placed in variables ``temp1`` and
``temp2``.
A tree is created (``temp3``) such that the left and right subtrees
are ``temp1`` and ``temp2``, respectively.
Finally, ``temp3`` is returned to ``fl``.

.. [#] ASCII coding actually uses 8 bits per character.
       Seven bits are used to represent the 128 codes of the ASCII
       character set.
       The eigth bit as a :term:`parity` bit, that can be used to
       check if there is a transmission error for the character.


Assigning and Using Huffman Codes (1)
-------------------------------------

Once the Huffman tree has been constructed, it is an easy matter to
assign codes to individual letters.
Beginning at the root, we assign either a '0' or a '1' to each edge in
the tree. '0' is assigned to edges connecting a node with its left
child, and '1' to edges connecting a node with its right child.
This process is illustrated by the following slideshow.

.. inlineav:: huffmanLabelCON ss 
   :output: show


Assigning and Using Huffman Codes (2)
-------------------------------------

Now that we see how the edges associate with bits in the code, it is a
simple matter to generate the codes for each letter (since each letter
corresponds to a leaf node in the tree).

.. inlineav:: huffmanCodesCON ss 
   :output: show

Now that we have a code for each letter,
encoding a text message is done by replacing each letter of the
message with its binary code.
A lookup table can be used for this purpose.


Decoding
--------

A set of codes is said to meet the :term:`prefix property` if no
code in the set is the prefix of another.
The prefix property guarantees that there will be no ambiguity in how
a bit string is decoded.
In other words, once we reach the last bit of a code during
the decoding process, we know which letter it is the code for.
Huffman codes certainly have the prefix property because any prefix
for a code would correspond to an internal node, while all codes
correspond to leaf nodes.

When we decode a character using the Huffman coding tree, we follow a
path through the tree dictated by the bits in the code string.
Each '0' bit indicates a left branch while each '1' bit indicates a
right branch.
The following slideshow shows an example for how to decode a message
by traversing the tree appropriately.

.. inlineav:: huffmanDecodeCON ss
   :output: show


Decoding Practice
-----------------

.. avembed:: Exercises/Binary/HuffmanDecodePRO.html ka


How efficient is Huffman coding?
--------------------------------

In theory, Huffman coding is an optimal coding method whenever the
true frequencies are known, and the frequency of a letter is
independent of the context of that letter in the message.
In practice, the frequencies of letters in an English text document do
change depending on context.
For example, while E is the most commonly used letter of the alphabet
in English documents, T is more common as the first letter of a
word.
This is why most commercial compression utilities do not use Huffman
coding as their primary coding method, but instead use techniques that
take advantage of the context for the letters.

Another factor that affects the compression efficiency of Huffman
coding is the relative frequencies of the letters.
Some frequency patterns will save no space as compared to fixed-length
codes; others can result in great compression.
In general, Huffman coding does better when there is large variation
in the frequencies of letters.

.. topic:: Example

   In the particular case of the frequencies shown in
   Table :num:`Table #Freq`, we can determine the expected savings from
   Huffman coding if the actual frequencies of a coded message match the
   expected frequencies.
   Because the sum of the frequencies is 306 and E has frequency 120,
   we expect it to appear 120 times in a message containing 306
   letters.
   An actual message might or might not meet this expectation.
   Letters D, L, and U have code lengths of three,
   and together are expected to appear 121 times in 306 letters.
   Letter C has a code length of four, and is expected to appear 32
   times in 306 letters.
   Letter M has a code length of five, and is expected to appear
   24 times in 306 letters.
   Finally, letters K and Z have code lengths of six,
   and together are expected to appear only 9 times in 306 letters.
   The average expected cost per character is simply the sum of
   the cost for each character (:math:`c_i`) times the probability of
   its occurring (:math:`p_i`), or
   :math:`c_1 p_1 + c_2 p_2 + \cdots + c_n p_n.`
   This can be reorganized as
   :math:`\frac{c_1 f_1 + c_2 f_2 + \cdots + c_n f_n}{f_T}`,
   where :math:`f_i` is the (relative) frequency of letter
   :math:`i` and :math:`f_T` is the total for all letter frequencies.
   For this set of frequencies, the expected cost per letter is
   :math:`[(1 \times 120) + (3 \times 121) + (4 \times 32) + (5 \times 24) + (6 \times 9)]/306 = 785/306 \approx 2.57.`

   A fixed-length code for these eight characters would require
   :math:`\log 8 = 3` bits per letter as opposed to about 2.57 bits
   per letter for Huffman coding.
   Thus, Huffman coding is expected to save about 14% for this set of
   letters.

Huffman coding for all ASCII symbols should do better than this
example.
The letters of Table :num:`Table #Freq` are atypical in that there
are too many common letters compared to the number of rare letters.
Huffman coding for all 26 letters would yield an expected
cost of 4.29 bits per letter.
The equivalent fixed-length code would require about five bits.
This is somewhat unfair to fixed-length coding because there is
actually room for 32 codes in five bits, but only 26 letters.
More generally, Huffman coding of a typical text file
will save around 40% over ASCII coding if we charge ASCII coding at
eight bits per character.
Huffman coding for a binary file (such as a compiled executable) would
have a very different set of distribution frequencies and so would
have a different space savings.
Most commercial compression programs use two or three coding schemes
to adjust to different types of files.

In decoding example, "DEED" was coded in 8 bits, a saving of 33%
over the twelve bits required from a fixed-length coding.
However, "MUCK" would require 18 bits, more space than required by the
corresponding fixed-length coding.
The problem is that "MUCK" is composed of letters that are not
expected to occur often.
If the message does not match the expected frequencies of the letters,
than the length of the encoding will not be as expected either.

.. odsascript:: DataStructures/huffman.js
.. odsascript:: AV/Binary/huffmanBuildCON.js
.. odsascript:: AV/Binary/huffmanLabelCON.js
.. odsascript:: AV/Binary/huffmanCodesCON.js
.. odsascript:: AV/Binary/huffmanDecodeCON.js
