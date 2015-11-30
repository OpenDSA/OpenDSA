.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: Memory Management

Sequential Fit Peformance
=========================

Sequential Fit Peformance
-------------------------

Which sequential fit strategy is best depends on the expected types of
memory requests.
If the requests are of widely ranging size, best fit might work well.
If the requests tend to be of similar size, with rare large and small
requests, first or worst fit might work well.
Unfortunately, there are always request patterns that one of the
three sequential fit methods will service, but which the other two
will not be able to service.
For example, if the series of requests 600, 650, 900, 500, 100 is
made to a freelist containing blocks 500, 700, 650, 900
(in that order), 
the requests can all be serviced by first fit, but not by best fit.
Alternatively, the series of requests 600, 500, 700, 900 can be
serviced by best fit but not by first fit on this same freelist.

.. avembed:: AV/MemManage/firstFitAV.html ss
