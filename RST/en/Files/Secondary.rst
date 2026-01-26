.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :title: Primary versus Secondary Storage
   :author: Cliff Shaffer
   :institution: Virginia Tech
   :topic: File Processing
   :keyword: File Processing; Disk Drive; Memory
   :naturallanguage: en
   :programminglanguage: N/A
   :description: Introduction to the concept of computer memory performance hierarchy.


Primary versus Secondary Storage
================================

Computer storage devices are typically classified into
:term:`primary storage` or :term:`main memory` on the one hand, and
:term:`secondary storage` or :term:`peripheral storage` on the other.
Primary memory usually refers to :term:`Random Access Memory` (RAM),
while secondary storage refers to devices such as
hard disk drives, solid state drives, removable "USB" drives,
and DVDs.
Primary memory also includes registers, cache, and video memories,
but we will ignore them for this discussion because their existence
does not affect the principal differences between primary and
secondary memory.

As of the 2020's, typical home computer memory sizes, speeds, and
prices have become fairly stable in comparison to prior decades.
Table :num:`#Price` shows some representative pricing for various
years from 1996 to 2025.
Early years in this range saw steady decreases in prices (and
consequently, increases in sizes that typical users would have).
But that is not so true now.

.. _Price:

.. topic:: Table

   Price comparison table for some writable electronic data storage
   media in common use.
   Prices are in US Dollars/MB.

   .. math::

      \begin{array}{l|r|r|r|r|r|r|r|r}
      \hline
      \textbf{Medium}&    1996 & 1997 &  2000 &   2004 &   2006 &   2008 &   2011 & 2025\\
      \hline
      \textbf{RAM}&    \$45.00 & 7.00 & 1.500 & 0.3500 & 0.1500 & 0.0339 & 0.0138 & 0.015\\
      \textbf{HDD}&       0.25 & 0.10 & 0.010 & 0.0010 & 0.0005 & 0.0001 & 0.0001 & 0.000025\\
      \textbf{SSD}&         -- & --   &  --   &  --    &     -- &     -- & 0.0021 & 0.000125\\
      \hline
      \end{array}

As of 2025, both hard disk drives and solid state disk drives are
widely used for secondary storage, with roughly a factor of five
(or, half an order of magnitude) difference in unit price.
In contrast, RAM is about two orders of magnitude more expensive per
unit of storage compared to SSD storage, and 2.5 orders of magnitude
more expensive compared to HDD.

HDD and SSD has another advantage over RAM memory,
in that it is :term:`persistent`,
meaning that data are not erased from the media when the power is
turned off.
In contrast, RAM used for main memory is usually :term:`volatile` |---|
all information is lost with the power.

In exchange for reduced storage costs and persistence,
secondary storage devices pay a penalty in terms of
increased access time.
While not all accesses to disk take the same amount of time
(more on this later), the typical time required to access a byte of
storage from a HDD in 2025 is around 9 ms
(i.e., 9 `thousandths` of a second).
This metric is sometimes referred to as latency.
This is roughly the same as it has been for the past 20 years.
This might not seem slow, but compared to the time required
to access a byte from main memory, this is fantastically slow.
Typical access time from standard personal computer RAM in
2025 is about 10-15 nanoseconds
(i.e., 10-15 `billionths` of a second).
(Again, this has been roughly the same for many years.)
Thus, the time to access a byte of data from a HDD is about
six orders of magnitude greater than that required to
access a byte from main memory.
While disk drive and RAM access times have decreased over the past
30-40 years, they have done so at roughly the same rate.
The relative speeds have remained the same for over several decades,
in that the difference in access time between RAM and a
disk drive has remained in the range between a factor of 100,000 and
1,000,000.

SSD latency times are considerably less than HDD latency times.
For the SSD, this is something around 100 microseconds, or 100 times
faster than for a typical HDD on average.
But that is still about four orders of magnitude slower than RAM
latency time.

To gain some intuition for the significance of this speed difference,
consider the time that it might take for you to do an internet search
for disk drives, then click on a link and load the page.
Call this your "primary memory" access time.
If it takes you about 10 seconds to perform this access, then
an access taking a million times longer would require months.
In this analogy, SSD latency time is still a matter of weeks.

It is interesting to note that while processing speeds have increased
dramatically, and hardware prices have dropped dramatically, disk
and memory access times have improved by less than an order of magnitude
over the past 30 years.
However, the situation is really much better than that modest speedup
would suggest.
During the same time period, the size of both disk and 
main memory has increased by over three orders of magnitude.
Thus, the access times have actually decreased in the face of a
massive increase in the density of these storage devices.

Due to the relatively slow access time for data on disk as compared to 
main memory, great care is required to create efficient applications
that process disk-based information.
The million-to-one ratio of HDD access time versus main memory access
time makes the following rule of paramount importance when designing
disk-based applications:

**Minimize the number of disk accesses!**

There are generally two approaches to minimizing disk accesses.
The first is to arrange information so that if you do access data from
secondary memory, you will get what you need in as few
accesses as possible, and preferably on the first access.
:term:`File structure` is the term used for a
data structure that organizes data stored in secondary memory.
File structures should be organized so as to minimize the required
number of disk accesses.
The other way to minimize disk accesses is to save information
previously retrieved (or retrieve additional data with each access at
little additional cost) that can be used to
minimize the need for future accesses.
This requires the ability to guess accurately
what information will be needed later and store it in primary memory
now.
This is referred to as :term:`caching`.

