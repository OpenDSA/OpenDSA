.. avmetadata:: Huffman Coding Trees Tutorial 
   :author: Cliff Shaffer
   :prerequisites: BinTreeImp, SpaceBounds
   :topic: BinTreeImp
   :short_name: Huffman
   
.. _Huffman:

.. include:: JSAVheader.rinc

.. index:: ! Huffman

Huffman Coding Trees
====================

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

Figure <ODSAref "Freq" /> shows the relative frequencies of the
letters of the alphabet.
From this table we can see that the letter 'E' appears about 60 times
more often than the letter 'Z'.
In normal ASCII, the words "DEED" and "MUCK" require the same
amount of space (four bytes).
It would seem that words such as "DEED", which are composed of
relatively common letters, should be storable in less space than words
such as "MUCK", which are composed of relatively uncommon letters.

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

<ODSAfig "Freq" />
Relative frequencies for the 26 letters of the alphabet as they
appear in a selected set of English documents.
"Frequency" represents the expected frequency of occurrence per
1000 letters, ignoring case.

If some characters are used more frequently than others, is
it possible to take advantage of this fact and somehow assign them
shorter codes?
The price could be that other characters require longer codes, but
this might be worthwhile if such characters appear rarely enough.
This concept is at the heart of file compression techniques in common
use today.
The next section presents one such approach to assigning
:strong:`variable-length` codes, called Huffman coding.
While it is not commonly used in its simplest form for file
compression (there are better methods), Huffman coding gives
the flavor of such coding schemes.
One motivation for studying Huffman coding is because it provides our
first opportunity to see a type of tree structure referred to as a
:strong:`search trie`.

Building Huffman Coding Trees
--------------------------------

Huffman coding assigns codes to characters such that the length of
the code depends on the relative frequency or <dfn>weight</dfn> of
the corresponding character.
Thus, it is a variable-length code.
If the estimated frequencies for letters match
the actual frequency found in an encoded message, then the
length of that message will typically be less than if a fixed-length
code had been used.
The Huffman code for each letter is derived from a full
binary tree called the :strong:`Huffman coding tree`,
or simply the :strong:`Huffman tree`.
Each leaf of the Huffman tree corresponds to a letter, and we define
the weight of the leaf node to be the weight (frequency) of its
associated letter.
The goal is to build a tree with the
:strong:`minimum external path weight`.
Define the :strong:`weighted path length` of a leaf to be
its weight times its depth.
The binary tree with minimum external path weight is the one with the
minimum sum of weighted path lengths for the given set of leaves.
A letter with high weight should have low depth, so that it
will count the least against the total path length.
As a result, another letter might be pushed deeper in the tree if it has
less weight.

The process of building the Huffman tree for :math:`n` letters is quite
simple.
First, create a collection of :math:`n` initial Huffman trees, each of
which is a single leaf node containing one of the letters.
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

.. math::

   \begin{array}{|c|cccccccc|}
   \hline
   \textrm Letter & C & D & E & K & L & M & U & Z\\
   \textrm Frequency & 32 & 42 & 120 & 7 & 42 & 24 & 37 & 2\\
   \hline
   \end{array}

<ODSAfig "FreqExamp" />
The relative frequencies for eight selected letters.

.. figure:: Images/HuffTree.png
   :width: 500
   :alt: Building a Huffman tree

Figure <ODSAref "HuffTree" /> illustrates part of the Huffman tree
construction process for the eight letters of
Figure <ODSEref "FreqExamp" />.
Ranking D and L arbitrarily by alphabetical order, 
the letters are ordered by frequency as

.. math::

   \begin{array}{|c|cccccccc|}
   \hline
   \textrm Letter & Z & K &  M &  C &  U &  D &  L &  E\\
   \textrm Frequency & 2 & 7 & 24 & 32 & 37 & 42 & 42 & 120\\
   \hline
   \end{array}

Because the first two letters on the list are Z and K, they are
selected to be the first trees joined together.
<sup><a href="#fn2" id="r2">[2]</a></sup>
They become the children of a root node with weight 9.
Thus, a tree whose root has weight 9 is placed back on the list, where
it takes up the first position.
The next step is to take values 9 and 24 off the list (corresponding
to the partial tree with two leaf nodes built in the last step, and
the partial tree storing the letter M, respectively) and join them
together.
The resulting root node has weight 33, and so this tree is placed
back into the list.
Its priority will be between the trees with values 32 (for letter C)
and 37 (for letter U).
This process continues until a tree whose root has weight 306 is
built.
This tree is shown in Figure <ODSAref "HuffCode" />.

Here is a visualization of building a random huffman tree.

.. avembed:: AV/HuffmanCoding.html

Here is the implementation for Huffman tree nodes.

.. codeinclude:: Graphs/Huffman/Huffman.pde
   :tag: Huffman 

<ODSAfig "HuffNode" />
Implementation for Huffman tree nodes.
Internal nodes and leaf nodes are represented by separate classes,
each derived from an abstract base class.

Figure <ODSAref "HuffNode" /> shows an implementation for Huffman tree
nodes.
This implementation is similar to the ``VarBinNode``
implementation of Figure <ODSAref "VarNodeI" />.
There is an abstract base class, named ``HuffNode``, and two
subclasses, named ``LeafNode`` and ``IntlNode``.
This implementation reflects the fact that leaf and internal nodes
contain distinctly different information.




