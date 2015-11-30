.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: Memory Management

Best Fit
========

Best Fit
--------

There is a potential disadvantage to first fit:
It might "waste" larger blocks by breaking them up, and so they will
not be available for large requests later.
A strategy that avoids using large blocks unnecessarily is called
:term:`best fit`.
Best fit looks at the entire list and picks the smallest block that
is at least as large as the request 
(i.e., the "best" or closest fit to the request).
Continuing with the preceding example, the best fit for a request of
30 units is the block of size 32, leaving a remainder of size 2.
Best fit has the disadvantage that it requires that the entire list be
searched.
Another problem is that the remaining portion of the best-fit block
is likely to be small, and thus useless for future requests.
In other words, best fit tends to maximize problems of external
fragmentation while it minimizes the chance of not being able to
service an occasional large request.

.. avembed:: AV/MemManage/firstFitAV.html ss
