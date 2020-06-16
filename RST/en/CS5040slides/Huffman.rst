.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
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

   .. inlineav:: huffmanBuildCON ss
      :long_name: Huffman Coding Tree Slideshow: Build
      :links: DataStructures/huffman.css AV/Binary/huffmanCON.css
      :scripts: DataStructures/huffman.js AV/Binary/huffmanBuildCON.js
      :output: show


.. slide:: Assigning Codes

   .. inlineav:: huffmanLabelCON ss 
      :long_name: Huffman Coding Tree Slideshow: Label Edges
      :links: DataStructures/huffman.css AV/Binary/huffmanCON.css
      :scripts: DataStructures/huffman.js AV/Binary/huffmanLabelCON.js
      :output: show


.. slide:: Using Codes

   .. inlineav:: huffmanCodesCON ss 
      :long_name: Huffman Coding Tree Slideshow: Setting Codes
      :links: DataStructures/huffman.css AV/Binary/huffmanCON.css
      :scripts: DataStructures/huffman.js AV/Binary/huffmanCodesCON.js
      :output: show


.. slide:: Decoding

   .. inlineav:: huffmanDecodeCON ss
      :long_name: Huffman Coding Tree Slideshow: Decoding
      :links: DataStructures/huffman.css AV/Binary/huffmanCON.css
      :scripts: DataStructures/huffman.js AV/Binary/huffmanDecodeCON.js
      :output: show
