.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: file processing
   :topic: File Processing

Chapter Introduction: File Processing
=====================================

Earlier chapters presented basic data structures and algorithms
that operate on data stored in main memory.
Some applications require that large amounts of information be stored
and processed |---| so much information that it cannot all fit into main
memory.
In that case, the information must reside on disk and be brought into
main memory selectively for processing.

You probably already realize that main memory access is much faster
than access to data stored on disk or other storage devices.
The relative difference in access times is so great that
efficient disk-based programs require a different approach to
algorithm design than most programmers are used to.
As a result, many programmers do a poor job when it comes to file
processing applications.

This chapter presents the fundamental issues relating to the design of 
algorithms and data structures for disk-based
applications.
We begin with a description of the significant differences
between primary memory and secondary storage,
and then discuss the different types of  memory in
a computer and how they compare for price and performance.
Computer technology changes rapidly.
This chapter provides examples of disk drive specifications and
other hardware performance numbers that are reasonably up to
date as of the time when it was written.
When you read it, the numbers might seem out of date.
However, the basic principles do not change.
The approximate ratios for time, space, and cost between memory and
disk have remained surprisingly steady for over 30 years.
The most important concept in the chapter is the
:ref:`buffer pool <buffer pool> <BuffPool>`, which is the fundamental
mechanism for implementing many :term:`caching` systems.
