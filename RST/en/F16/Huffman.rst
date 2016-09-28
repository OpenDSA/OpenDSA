.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. odsalink:: DataStructures/huffman.css

.. slideconf::
   :autoslides: False

==============
Huffman Coding
==============

Huffman Coding
--------------

.. slide:: Coding

   * ASCII codes are fixed length (7 + 1 bits)
      * In general, $n$ bits can store $2^n$ codes
   * An alternative is variable-length coding

   * The relative frequencies for eight selected letters.

      .. math::

         \begin{array}{|c|cccccccc|}
         \hline
         \textrm Letter & C & D & E & K & L & M & U & Z\\
         \textrm Frequency & 32 & 42 & 120 & 7 & 42 & 24 & 37 & 2\\
         \hline
         \end{array}

.. slide:: Huffman Coding Trees

   .. odsalink:: AV/Binary/huffmanCON.css

   .. inlineav:: huffmanBuildCON ss
      :output: show

   .. odsascript:: DataStructures/huffman.js
   .. odsascript:: AV/Binary/huffmanBuildCON.js


.. slide:: Assigning Codes


   .. inlineav:: huffmanLabelCON ss
      :output: show

   .. odsascript:: AV/Binary/huffmanLabelCON.js


.. slide:: Using Codes


   .. inlineav:: huffmanCodesCON ss
      :output: show

   .. odsascript:: AV/Binary/huffmanCodesCON.js


.. slide:: Decoding


   .. inlineav:: huffmanDecodeCON ss
      :output: show

   .. odsascript:: AV/Binary/huffmanDecodeCON.js


.. slide:: Tree vs. Trie (1)

   .. odsalink:: AV/Development/TreeTrieCON.css

   .. inlineav:: TreeTimelineCON ss
      :output: show

   .. odsascript:: AV/Development/TreeTimelineCON.js


.. slide:: Tree vs. Trie (2)

   .. inlineav:: TrieTimelineCON ss
      :output: show

   .. odsascript:: AV/Development/TrieTimelineCON.js


