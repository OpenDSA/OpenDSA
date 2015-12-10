.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: BST; Huffman coding tree
   :satisfies: 
   :topic: Trie

.. odsalink:: AV/Development/TreeTrieCON.css

Trees versus Tries
==================

Trees versus Tries
------------------

We see that all letters with codes beginning with
'0' are stored in the left branch, while all letters with codes
beginning with '1' are stored in the right branch.
Contrast this with storing records in a BST.
There, all records with key value less than the root value are stored
in the left branch, while all records with key values greater than the
root are stored in the right branch.

Recall that the Huffman coding tree stored in the left branch all
letters whose codes start with 0, and in the right branch all letters
whose codes start with 1.
We can use this same concept to store records in a search tree that is
slightly different from the behavior of a BST.
We can view all keys stored as appearing on a numberline.
The BST splits the numberline based on the positions of key values as
it receives them.
In contrast, we could split key values based on their binary
reprsentation similar to what the Huffman coding tree does.
The following slideshows present this in more detail.

.. inlineav:: TreeTimelineCON ss
   :output: show

|

.. inlineav:: TrieTimelineCON ss
   :output: show

.. odsascript:: AV/Development/TreeTimelineCON.js
.. odsascript:: AV/Development/TrieTimelineCON.js
