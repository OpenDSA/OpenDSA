.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: Memory Management

Circular First Fit
==================

Circular First Fit
------------------
A simple variation that will improve performance is, instead of
always beginning at the head of the freelist, remember the last
position reached in the previous search and start from there.
When the end of the freelist is reached, search begins again at the
head of the freelist.
This modification reduces the number of unnecessary searches through
small blocks that were passed over by previous requests.

.. avembed:: AV/MemManage/firstFitAV.html ss
