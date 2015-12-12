.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Tom Naps and Sam Micka

KMP String Search Algorithm
===========================

This apparently more efficient string search algorithm was discovered
in the 1970s by D. E. Knuth, J. H. Morris, and V. R. Pratt.
Consequently, it is known as the Knuth‑Morris‑Pratt (or KMP)
algorithm.  The key to its search efficiency is the following.  When a
mismatch occurs in a particular alignment at index :math:`p` of
:math:`sub`, then we must look to the character matches that occurred
in the portion of :math:`sub` preceding index :math:`p`.  We are
seeking a substring of sub in the portion of :math:`sub` immediately
prior to index :math:`p` that matches a leading substring of
:math:`sub`.  Once found, :math:`sub` may be realigned so that this
leading substring overlays what had been the matching substring
immediately prior to index :math:`p`. The character‑by‑character
comparison can then proceed from the position of the prior mismatch.



Its use requires an initial pass through the string sub to determine
the appropriate amount of realignment when a mismatch occurs at
position :math:`p` in :math:`sub`. Note that this determination is
dependent only on :math:`sub`, not at all on :math:`master`. In
effect, for each index :math:`p`, we seek the longest sequence of
characters immediately preceding position :math:`p` that matches a
sequence at the beginning of :math:`sub`. We must qualify this
slightly to avoid problems in the degenerate case, in which all
characters preceding position :math:`p` are the same.  When this
occurs, we restart the matching pass through sub at position :math:`p
‑ 1`.  In other words, we specifically seek the maximum sequence of
characters immediately preceding index :math:`p` with length less than
:math:`p` such that this sequence matches a sequence at the beginning
of :math:`sub`.  We will store, for each index :math:`p`, the length
of such a sequence in an array called :math:`align`.  Given this
definition of the :math:`align` array, the following slideshow
indicates how the KMP algorithm would work with a particular
:math:`master` and :math:`sub` string. 

.. Slideshow for KMP search algorithm

.. avembed:: AV/Development/KMP_Slideshow.html ss


The preceding slideshow has unveiled the following pseudocode
for the KMP algorithm:::

  input: master string, sub string, align array
  m = 0
  s = 0
  while((s < sub.length) and (sub.length - s <= master.length - m)):
    if(master[m] == sub[s]): m++, s++
    else if(s == 0): m++
    else: s = align[s]
  if(s == sub.length): return m - sub.length
  else: return -1

See if you can predict how one step in this KMP algorithm would
progress by trying the following exercise.

.. Exercise in tracing one step of the KMP algorithm

.. avembed:: Exercises/Development/KMP_Exercise.html ka



The creation of the :math:`align` is itself an interesting algorithm
and requires some explanation.  Since :math:`align[p]` must be less
than :math:`p`, we start by initializing :math:`align[0]` to ‑1 and
:math:`align[1]` to 0.  Since the align array is computed for
successive values of :math:`p`, :math:`align[p ‑ 1]` will have been
computed by the time we attempt to compute :math:`align[p]`, allowing
us to iterate through the computation of the :math:`align` array as
indicated in the following slideshow.

.. If the test indicated in Figure 2.17 fails, we will then seek a
.. leading substring of the shaded portion on the left of Figure 2.17
.. that matches a substring ending at position p ‑ 1.  Working within the
.. shaded portion on the left of Figure 2.17 (that is, with the
.. characters at the beginning of sub) we know that the leading align[q]
.. characters on the left of this shaded portion exactly match the
.. characters in the align[q] positions preceding q.  This follows from
.. the definition of the values already stored in the align array.  We
.. also know that the two shaded substrings in Figure 2.17 must
.. match. Combining these facts, we conclude that the first align[q]
.. characters in sub exactly match the sequence of align[q] characters
.. preceding position p ‑ 1 in Figure 2.17.  Consequently, if we reset q
.. to align[q], then align[p] will equal q + 1 provided sub.charAt(q)
.. equals sub.charAt(p – 1).  This logic is iterated until sub.charAt(q)
.. equals sub.charAt(p – 1) or until q becomes negative, as indicated in
.. Figure 2.18.
.. 
.. 
.. 
.. Slideshow for creation of alignment array

.. avembed:: AV/Development/KMP_align_array_slideshow.html ss

The preceding slideshow has illustrated the following pseudocode
for the computation of the :math:`align` array in the KMP algorithm:::

  align[0] = -1 
  align[1] = 0 
  L = string.length 
  for(p = 2; p < L; p++): 
    q = align[p-1] 
    while((q>= 0) and (string[q] != string[p-1])): 
      q = align[q] 
    align[p] = q+1

See if you can predict how one step in this :math:`align` algorithm would
progress by trying the following exercise.



.. avembed:: Exercises/Development/KMP_Alignment_Array_Exercise.html ka

To indicate that you have fully mastered the intricacies of the KMP
algorithm, you must now succeed in working your way through the
following three exercises:

1. Proficiency Exercise in tracing entire KMP algorithm

.. avembed:: Exercises/Development/KMP_EX_PRO.html pe

2. Exercise in counting shifts and compares needed by KMP algorithm

.. avembed:: Exercises/Development/KMP_Compares_Shifts_Exercise.html ka

3. Exercise in determining strings with specified number of shifts and compares

.. avembed:: Exercises/Development/KMP_Users_Choice.html ka

