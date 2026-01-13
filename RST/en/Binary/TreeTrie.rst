.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :title: Trees versus Tries
   :author: Cliff Shaffer
   :institution: Virginia Tech
   :requires: BST; Huffman coding tree
   :satisfies: 
   :topic: Trie
   :keyword: Trie
   :naturallanguage: en
   :programminglanguage: Java
   :description: Introduces the Trie concept, and uses the example of a Trie version of a BST to show the diffence from a normal BST.

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
   :long_name: Tree timeline Slideshow
   :links: AV/Binary/TreeTrieCON.css
   :scripts: AV/Binary/TreeTimelineCON.js
   :output: show
   :keyword: Trie

|

.. inlineav:: TrieTimelineCON ss
   :long_name: Trie timeline Slideshow
   :links: AV/Binary/TreeTrieCON.css
   :scripts: AV/Binary/TrieTimelineCON.js
   :output: show
   :keyword: Trie


