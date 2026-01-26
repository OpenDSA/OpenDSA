.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

==============
Huffman Coding
==============

Coding
------

.. revealjs-slide::


* ASCII codes are fixed length (7 + 1 bits)

  * In general, $n$ bits can store $2^n$ codes

* An alternative is variable-length coding

  * The relative frequencies for eight selected letters.

.. math::

   \begin{array}{|c|cccccccc|}
   \hline
   \textrm{Letter} & C & D & E & K & L & M & U & Z\\
   \textrm{Frequency} & 32 & 42 & 120 & 7 & 42 & 24 & 37 & 2\\
   \hline
   \end{array}


Huffman Coding Trees
--------------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Binary/huffmanBuildCON.html" 
           width="960" 
           height="550" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>

Assigning Codes
---------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Binary/huffmanLabelCON.html" 
           width="960" 
           height="550" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


Using Codes
-----------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Binary/huffmanCodesCON.html" 
           width="960" 
           height="550" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


Decoding
--------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Binary/huffmanDecodeCON.html" 
           width="960" 
           height="550" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


