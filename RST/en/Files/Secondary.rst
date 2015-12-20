.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: File Processing

Primary versus Secondary Storage
================================

Computer storage devices are typically classified into
:term:`primary storage` or :term:`main memory` on the one hand, and
:term:`secondary storage` or :term:`peripheral storage` on the other.
Primary memory usually refers to :term:`Random Access Memory` (RAM),
while secondary storage refers to devices such as
hard disk drives, solid state drives, removable "USB" drives,
CDs, and DVDs.
Primary memory also includes registers, cache, and video memories,
but we will ignore them for this discussion because their existence
does not affect the principal differences between primary and
secondary memory.

Along with a faster CPU, every new model of computer seems to come
with more main memory.
As memory size continues to increase, is it possible that
relatively slow disk storage will be unnecessary?
Probably not, because the desire to store and process larger files
grows at least as fast as main memory size.
Prices for both main memory and peripheral storage devices have
dropped dramatically in recent years, as demonstrated by
Table :num:`#Price`.
However, the cost per unit of disk drive storage is about two
orders of magnitude less than RAM and has been for
many years.

.. _Price:

.. topic:: Table

   Price comparison table for some writable electronic data storage
   media in common use.
   Prices are in US Dollars/MB.

   .. math::

      \begin{array}{l|r|r|r|r|r|r|r}
      \hline
      \textbf{Medium}& 1996 & 1997 & 2000 & 2004 & 2006 & 2008 & 2011\\
      \hline
      \textbf{RAM}&    \$45.00 & 7.00 & 1.500 & 0.3500 & 0.1500 & 0.0339 & 0.0138\\
      \textbf{Disk}&      0.25 & 0.10 & 0.010 & 0.0010 & 0.0005 & 0.0001 & 0.0001\\
      \textbf{USB drive}& -- & --   & --    & 0.1000 & 0.0900 & 0.0029 & 0.0018\\
      \textbf{Floppy}&    0.50 & 0.36 & 0.250 & 0.2500 & -- & -- & --\\
      \textbf{Tape}&      0.03 & 0.01 & 0.001 & 0.0003 & -- & -- & --\\
      \textbf{Solid State}& -- & --   &  --   &  --    & -- & -- & 0.0021\\
      \hline
      \end{array}

There is now a wide range of removable media available for
transferring data or storing data offline in relative safety.
These include floppy disks (now largely obsolete), writable CDs and
DVDs, "flash" drives, and magnetic tape.
Optical storage such as CDs and DVDs costs roughly half the price of
hard disk drive space per megabyte, and have become practical for use
as backup storage within the past few years.
Tape used to be much cheaper than other media, and was the preferred
means of backup, but are not so popular now as other media have
decreased in price.
Flash drives cost the most per megabyte, but due to their storage
capacity and flexibility, quickly replaced floppy disks as the
primary storage device for transferring data between computer when
direct network transfer is not available.

Secondary storage devices have
at least two other advantages over RAM memory.
Perhaps most importantly, disk, flash, and optical media are
:term:`persistent`,
meaning that they are not erased from the media when the power is
turned off.
In contrast, RAM used for main memory is usually :term:`volatile` |---|
all information is lost with the power.
A second advantage is that CDs and USB drives
can easily be transferred between computers.
This provides a convenient way to take information from one computer
to another.

In exchange for reduced storage costs, persistence, and
portability, secondary storage devices pay a penalty in terms of
increased access time.
While not all accesses to disk take the same amount of time
(more on this later), the typical time required to access a byte of
storage from a disk drive in 2011 is around 9 ms
(i.e., 9 `thousandths` of a second).
This might not seem slow, but compared to the time required
to access a byte from main memory, this is fantastically slow.
Typical access time from standard personal computer RAM in
2011 is about 5-10 nanoseconds
(i.e., 5-10 `billionths` of a second).
Thus, the time to access a byte of data from a disk drive is about
six orders of magnitude greater than that required to
access a byte from main memory.
While disk drive and RAM access times are both decreasing, they
have done so at roughly the same rate.
The relative speeds have remained the same for over several decades,
in that the difference in access time between RAM and a
disk drive has remained in the range between a factor of 100,000 and
1,000,000.

To gain some intuition for the significance of this speed difference,
consider the time that it might take for you to look up the entry for
disk drives in the index of this book, and then turn to the
appropriate page.
Call this your "primary memory" access time.
If it takes you about 20 seconds to perform this access, then
an access taking 500,000 times longer would require
months.

It is interesting to note that while processing speeds have increased
dramatically, and hardware prices have dropped dramatically, disk
and memory access times have improved by less than an order of magnitude
over the past 15 years.
However, the situation is really much better than that modest speedup
would suggest.
During the same time period, the size of both disk and 
main memory has increased by over three orders of magnitude.
Thus, the access times have actually decreased in the face of a
massive increase in the density of these storage devices.

Due to the relatively slow access time for data on disk as compared to 
main memory, great care is required to create efficient applications
that process disk-based information.
The million-to-one ratio of disk access time versus main memory access
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
