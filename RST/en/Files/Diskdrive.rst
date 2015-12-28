.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: disk drives
   :topic: File Processing

.. odsalink:: AV/Development/sectorLayoutCON.css   

Disk Drives
===========

A programmer typically views a :term:`random access` file stored on
:term:`disk <disk drive>` as a contiguous series of bytes, with those
bytes possibly combining to form data records.
This is called the :term:`logical file`.
The :term:`physical file` actually stored on disk is
usually not a contiguous series of
bytes.
It could well be in pieces spread all over the disk.
The :term:`file manager`, a part of the operating
system,
is responsible for taking requests for data from a logical
file and mapping those requests to the physical location of the data
on disk.
Likewise, when writing to a particular logical byte position
with respect to the beginning of the file, this position must be
converted by the file manager into the corresponding physical
location on the disk.
To gain some appreciation for the the approximate time costs for these
operations, you need to understand the physical structure and basic
workings of a disk drive.

Disk drives are often referred to as
:term:`direct access` storage devices.
This means that it takes roughly equal time to access any record in
the file.
This is in contrast to :term:`sequential access` storage devices
such as tape drives, which require the tape reader to
process data from the beginning of the tape until the desired position
has been reached.
As you will see, the disk drive is only approximately direct access:
At any given time, some records are more quickly accessible than
others.

Disk Drive Architecture
-----------------------

A hard disk drive is composed of one or more round
:term:`platters <platter>`,
stacked one on top of another and attached to a central
:term:`spindle`.
Platters spin continuously at a constant rate.
Each usable surface of each platter is assigned a
:term:`read/write head` or :term:`I/O head` through which data are
read or written, somewhat like the arrangement of a phonograph
player's arm "reading" sound from a phonograph record.
Unlike a phonograph needle, the disk read/write head does not actually
touch the surface of a hard disk.
Instead, it remains slightly above the surface, and any contact during
normal operation would damage the disk.
This distance is very small, much smaller than the height of a dust
particle.
It can be likened to a 5000-kilometer airplane trip across the United
States, with the plane flying at a height of one meter!

A hard disk drive typically has several platters and
several read/write heads, as shown in
Figure :num:`Figure #Platters` (a).
Each head is  attached to an :term:`arm`, which connects to the
:term:`boom`. [#]_
The boom moves all of the heads in or out together.
When the heads are in some position over the platters, there are data
on each platter directly accessible to each head.
The data on a single platter that are accessible to any one position
of the head for that platter are collectively called a :term:`track`,
that is, all data on a platter that are a fixed distance from the
spindle, as shown in Figure :num:`Figure #Platters` (b).
The collection of all tracks that are a fixed distance from the
spindle is called a :term:`cylinder`.
Thus, a cylinder is all of the data that can be read when the arms
are in a particular position.

.. _Platters:

.. odsafig:: Images/Plat.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Disk drive platters

   Disk drive schematic.
   (a) A typical disk drive arranged as a stack of platters.
   (b) One track on a disk drive platter.

Each track is subdivided into :term:`sectors <sector>`.
Between each sector there are
:term:`inter-sector gaps <inter-sector gap>`
in which no data are stored.
These gaps allow the read head to recognize the end of a sector.
Note that each sector contains the same amount of data.
Because the outer tracks have greater length, they contain fewer
bits per inch than do the inner tracks.
Thus, about half of the potential storage space is wasted, because
only the innermost tracks are stored at the highest possible data
density.
This arrangement is illustrated by
Figure :num:`Figure #Diskfig` (a).
Disk drives today actually group tracks into
:term:`zones <zone>` such that the tracks in the innermost zone adjust
their data density going out to maintain the same radial data density,
then the tracks of the next zone reset the data density to make better
use of their storage ability, and so on.
This arrangement is shown in Figure :num:`Figure #Diskfig` (b).

.. _Diskfig:

.. odsafig:: Images/Disk.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: The organization of a disk platter

   The organization of a disk platter.
   Dots indicate density of information.
   (a) Nominal arrangement of tracks showing decreasing data density
   when moving outward from the center of the disk.
   (b) A "zoned" arrangement with the sector size and density
   periodically reset in tracks further away from the center.

In contrast to the physical layout of a hard disk, a CD-ROM consists
of a single spiral track.
Bits of information along the track are equally spaced, so the
information density is the same at both the outer and inner portions
of the track.
To keep the information flow at a constant rate along the spiral, the
drive must speed up the rate of disk spin as the I/O head moves
toward the center of the disk.
This makes for a more complicated and slower mechanism.

Three separate steps take place when reading a particular byte or
series of bytes of data from a hard disk.
First, the I/O head moves so that it is positioned over the track
containing the data.
This movement is called a :term:`seek`.
Second, the sector containing the data rotates to come under the
head.
When in use the disk is always spinning.
At the time of this writing, typical disk spin rates are
7200 rotations per minute (rpm).
The time spent waiting for the desired sector to come under
the I/O head is called :term:`rotational delay` or
:term:`rotational latency`.
The third step is the actual transfer (i.e., reading or writing) of
data.
It takes relatively little time to read information once the first
byte is positioned under the I/O head, simply the amount of time
required for it all to move under the head.
In fact, disk drives are designed not to read one byte of data, but
rather to read an entire sector of data at each request.
Thus, a sector is the minimum amount of data that can be read or
written at one time.

In general, it is desirable to keep all sectors for a file together on 
as few tracks as possible.
This desire stems from two assumptions:

1. Seek time is slow (it is typically the most expensive part of
   an I/O operation), and

1. If one sector of the file is read, the next sector will
   probably soon be read.

Assumption (2) is called
:term:`locality of reference`,
a concept that comes up frequently in computer applications.

Contiguous sectors are often grouped to form a
:term:`cluster`.
A cluster is the smallest unit of allocation for a file,
so all files are a multiple of the cluster size.
The cluster size is determined by the operating
system.
The file manager keeps track of which clusters make up each file.

In Microsoft Windows systems, there is a
designated portion of the disk called the
:term:`File Allocation Table`,
which stores information about which sectors belong to which file.
In contrast, Unix does not use clusters.
The smallest unit of file allocation and the smallest unit that can be
read/written is a sector, which in Unix terminology is called
a :term:`block`.
Unix maintains information about file organization in certain disk
blocks called :term:`inodes <inode>`.

A group of physically contiguous clusters from the same file is called
an :term:`extent`.
Ideally, all clusters making up a file will be contiguous on the disk
(i.e., the file will consist of one extent),
so as to minimize seek time required to access different portions of
the file.
If the disk is nearly full when a file is created, there might not be
an extent available that is large enough to hold the new file.
Furthermore, if a file grows, there might not be free space physically
adjacent.
Thus, a file might consist of several extents widely spaced on the
disk.
The fuller the disk, and the more that files on the disk change, the
worse this file fragmentation (and the resulting seek time) becomes.
File fragmentation leads to a noticeable degradation in performance as
additional seeks are required to access data.

Another type of problem arises when the file's logical record size
does not match the sector size.
If the sector size is not a multiple of the record size
(or vice versa), records will not fit evenly within a sector.
For example, a sector might be 2048 bytes long, and a logical record
100 bytes.
This leaves room to store 20 records with 48 bytes left over.
Either the extra space is wasted, or else records
are allowed to cross sector boundaries.
If a record crosses a sector boundary, two disk accesses might be
required to read it.
If the space is left empty instead, such wasted space is called
:term:`internal fragmentation`.

A second example of internal fragmentation occurs at cluster
boundaries.
Files whose size is not an even multiple of the cluster size must
waste some space at the end of the last cluster.
The worst case will occur when file size modulo cluster size is one
(for example, a file of 4097 bytes and a cluster of 4096 bytes).
Thus, cluster size is a tradeoff between large files
processed sequentially (where a large cluster size is desirable to
minimize seeks) and small files (where small clusters are desirable to
minimize wasted storage).

Every disk drive organization requires that some disk space be used
to organize the sectors, clusters, and so forth.
The layout of sectors within a track is illustrated by
Figure :num:`Figure #Layout`.
Typical information that must be stored on the disk itself includes
the File Allocation Table, :term:`sector headers <sector header>`
that contain address
marks and information about the condition (whether usable or not) for
each sector, and gaps between sectors.
The sector header also contains error detection codes to help verify
that the data have not been corrupted.
This is why most disk drives have a "nominal" size that is greater
than the actual amount of user data that can be stored on the drive.
The difference is the amount of space required to organize the
information on the disk.
Even more space will be lost due to
fragmentation.

.. _Layout:

.. inlineav:: diskSector dgm
   :align: center

   An illustration of sector gaps within a track.
   Each sector begins with a sector header containing the sector address
   and an error detection code for the contents of that sector.
   The sector header is followed by a small intra-sector gap, followed in
   turn by the sector data.
   Each sector is separated from the next sector by a larger
   inter-sector gap.


Disk Access Costs
-----------------

When a seek is required, it is usually
the primary cost when accessing information on disk.
This assumes of course that a seek is necessary.
When reading a file in sequential order (if the sectors comprising the
file are contiguous on disk), little seeking is necessary.
However, when accessing a random disk sector, seek time becomes the
dominant cost for the data access.
While the actual seek time is highly variable, depending on the
distance between the track where the I/O head currently is and the
track where the head is moving to, we will consider only two numbers.
One is the track-to-track cost, or the minimum time necessary to move
from a track to an adjacent track.
This is appropriate when you want to analyze access times for files
that are well placed on the disk.
The second number is the average seek time for a random access.
These two numbers are often provided by disk manufacturers.
A typical example is the Western Digital Caviar serial ATA drive.
The manufacturer's specifications indicate that the track-to-track
time is 2.0 ms and the average seek time is 9.0 ms.
In 2008 a typical drive in this line might be 120GB in size.
In 2011, that same line of drives had sizes of up to 2 or 3TB.
In both years, the advertised track-to-track and average seek times
were identical.

For many years, typical rotation speed for disk drives was 3600 rpm,
or one rotation every 16.7 ms.
Most disk drives in 2011 had a rotation speed of 7200 rpm, or 8.3 ms
per rotation.
When reading a sector at random, you can expect that the disk will
need to rotate halfway around to bring the desired sector
under the I/O head, or 4.2 ms for a 7200-rpm disk drive. 

Once under the I/O head, a sector of data can be transferred as
fast as that sector rotates under the head.
If an entire track is to be read, then it will require one rotation
(8.3 ms at 7200 rpm) to move the full track under the head.
If only part of the track is to be read, then proportionately less
time will be required.
For example, if there are 16,000 sectors on the track and one sector
is to be read, this will require a trivial amount of time
(1/16,000 of a rotation).

.. _DiskExamp:

.. topic:: Example

   Assume that an older disk drive has a total (nominal) capacity of
   16.8GB spread among 10 platters, yielding 1.68GB/platter.
   Each platter contains 13,085 tracks and each track contains (after
   formatting) 256 sectors of 512 bytes/sector.
   Track-to-track seek time is 2.2 ms and average seek time for random
   access is 9.5 ms.
   Assume the operating system maintains a cluster size
   of 8 sectors per cluster (4KB), yielding 32 clusters per track.
   The disk rotation rate is 5400 rpm (11.1 ms per rotation).
   Based on this information we can estimate
   the cost for various file processing operations.

   How much time is required to read the track?
   On average, it will require half a rotation to bring the first sector
   of the track under the I/O head, and then one complete rotation to
   read the track.

   How long will it take to read a file of 1MB divided into
   2048 sector-sized (512 byte) records?
   This file will be stored in 256 clusters, because  each cluster holds
   8 sectors.
   The answer to the question depends largely on how the file
   is stored on the disk, that is, whether it is all together or broken
   into multiple extents.
   We will calculate both cases to see how much difference this makes.

   If the file is stored so as to fill all of the sectors of eight
   adjacent tracks, then the cost to read the first sector will be the
   time to seek to the first track (assuming this requires a random
   seek), then a wait for the initial rotational delay,
   and then the time to read (which is the same as the time to rotate the
   disk again).
   This requires

   .. math::

      9.5\mathrm{ms.} + 11.1\mathrm{ms.} \times 1.5 = 26.2 \mathrm{ms.}

   In this equation, 9.5ms. is the average seek time for a (random)
   track on the disk. 11.1ms. is the time for one rotation of a disk
   spinning at 5400RPM.
   Since we need to wait for rotational delay (one half rotation) and
   then read all of the contents of the track (one full rotation), we
   multiply 11.1ms. by 1.5.
   Thus, the total time to read a random track from the disk is 26.2ms.

   After reading the first track, we can then assume that the next
   seven tracks require only a track-to-track seek because they are
   adjacent.
   Therefore, each requires

   .. math::

      2.2\mathrm{ms.} + 11.1\mathrm{ms.} \times 1.5 = 18.9 \mathrm{ms.}

   Here, 2.2ms. is the time to seek to an adjacent track.
   Again we must wait for rotational delay (one half rotation)
   followed by a full rotation to read the track, so we multiply the
   rotation time (11.1ms.) times 1.5 for the disk rotation.
   Thus, we get a total of 18.9ms. to read the data from an adjacent
   track.

   The total time required to read all 8 adjacent tracks is therefore

   .. math::

      26.2 \mathrm{ms} + 7 \times 18.9 \mathrm{ms} = 158.5 \mathrm{ms}.

   In contrast, what would the time be if the file's clusters are
   spread randomly across the disk?
   Then we must perform a seek for each cluster, followed by the
   time for rotational delay.
   Once the first sector of the cluster comes under the I/O head, very
   little time is needed to read the cluster because only 8/256 of the
   track needs to rotate under the head, for a total time of about
   5.9 ms for latency and read time.
   Thus, the total time required is about

   .. math::

      256 (9.5\mathrm{ms.} + 5.9\mathrm{ms.}) \approx 3942 \mathrm{ms}

   or close to 4 seconds.
   This is much longer than the time required when the file is all
   together on disk!
   That is, 256 times we must perform a seek to a random track
   (9.5ms.).
   Then we wait on average one half of a disk rotation
   followed by reading the actual data which requires a further 8/256
   of a rotation, for a total of 5.9ms.

   This example illustrates why it is important to keep disk files from
   becoming fragmented,
   and why so-called "disk defragmenters" can speed up file
   processing time.
   File fragmentation happens most commonly when the disk is nearly full
   and the file manager must search for free space
   whenever a file is created or changed.

Notes
-----

.. [#] This arrangement, while typical, is not necessarily true for
       all disk drives.
       Nearly everything said here about the physical arrangement of
       disk drives represents a typical engineering compromise, not a
       fundamental design principle.
       There are many ways to design disk drives, and the engineering
       compromises change over time.
       In addition, most of the description given here for disk drives
       is a simplified version of the reality.
       But this is a useful working model to understand what is going
       on.

       To complicate matters further, Solid State Drives (SSD) work
       rather differently.

.. odsascript:: AV/Files/diskSectorCON.js

