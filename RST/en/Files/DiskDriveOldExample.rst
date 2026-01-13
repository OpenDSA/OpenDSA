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


