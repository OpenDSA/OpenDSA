.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites: 
   :topic: Memory Management

First Fit
=========

The simplest method for selecting a block would be to move down the
free block list until a block of size at least 30 is found.
Any remaining space in this block is left on the freelist.
If we begin at the beginning of the list and work down to the first
free block at least as large as 30, we select the block of size 35.
30 units of storage will be allocated, leaving a free block with 5
units of space. 
Because this approach selects the first block with enough space, it is
called :term:`first fit`.

.. raw:: html

   <center> 
   <iframe id="FirstFit_iframe" 
        src="http://research.cs.vt.edu/AVresearch/MMtutorial/FirstFit.html"
        width="1000" height="600"
        frameborder="1" marginwidth="0" marginheight="0"
	scrolling="no">
   </iframe>
   </center>
