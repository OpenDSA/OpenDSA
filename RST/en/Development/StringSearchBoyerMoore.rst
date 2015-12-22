.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Tom Naps and Sam Micka

Boyer-Moore String Search Algorithm
===================================

Like the KMP algorithm, a string search algorithm developed by Boyer
and Moore in 1977 initially examines the structure of the string :math:`sub`
to see if it can be realigned a considerable distance to the right,
when a mismatch occurs.  Unlike the KMP algorithm, the Boyer‑Moore
algorithm compares the characters of the string :math:`sub` to that of the
:math:`master` string in a right‑to‑left fashion.  The hope is that
this will allow realignments of considerable magnitude when a mismatch
occurs early in the comparison of :math:`sub` against a portion of
:math:`master`.  For instance, suppose that, at the beginning of a
right‑to‑left scan of :math:`sub` aligned against a portion of
:math:`master`, we find the character "L" in :math:`master` and some
other non-matching character in the rightmost index of
:math:`sub`. Then, if "L" does not occur anywhere else in :math:`sub`,
:math:`sub` may be realigned so that the character in index 0 of
:math:`sub` aligns with the character immediately to the right of “L”
in :math:`master`. (Why?)  Analogously, if the first "L" to the left
of the final position in :math:`sub` occurs at index :math:`i` of
:math:`sub`, then :math:`sub` may be realigned so that index :math:`i`
in :math:`sub` is aligned with the “L” in :math:`master`. (Why?) Thus,
when a mismatch occurs at the rightmost (that is, the first examined)
position of :math:`sub`, the character in :math:`master` that caused
the mismatch can be used to tell us how much :math:`sub` can be
realigned to the right. A pre-processing pass through :math:`sub` could
be used to determine the amount of realignment for any possible
character that could occur in :math:`master`. This information is
called the "mismatched character heuristic" and is stored in an array
that we will identify by the name :math:`MMC`.  

To supplement this mismatched character heuristic, the Boyer-Moore
algorithm uses another :math:`align` array that contains re-alignment
information defined as follows.


.. math::

   align[p] = \left\{ \begin{array}{ll} 1 \; \mbox{if} \; p = length(sub) - 1 \mbox{ ,that is, if the last character} \\ suffix\_length + offset \mbox{  otherwise} \end{array} \right. 

where :math:`suffix\_length` is the length of the suffix of the string
beginning at position :math:`p + 1` and :math:`offset` is the least
amount this suffix must be moved to the left to match another
occurrence of itself in :math:`sub` without matching the character in
position in :math:`p`.  This motion to the left may involve the
leftmost characters "sliding off the end of the master string".  When
this occurs, those characters that have slid off the end of the master
string are viewed as matching the non-existent characters to which
they would be compared.  The computation of the :math:`align` array
can be tricky.  It somewhat resembles the computation of the KMP
:math:`align` array but is done "in reverse" because of the
right-to-left scan done by Boyer-Moore.  We will further study the
computation of the :math:`align` array later in this module.  However,
let us first watch a slideshow of the entire Boyer-Moore algorithm,
under the assumption that both the mismatched character heuristic and
this "reverse KMP" :math:`align` array have been computed.

.. could then be used in a
.. fashion similar to the :math:`align` array in the KMP algorithm. (The
.. full‑blown version of the Boyer‑Moore algorithm actually takes into
.. account possible realignments when the mismatched character does not
.. occur at the rightmost position of :math:`sub`. We omit the details of such a
.. refinement here.  The interested reader should consult “A fast
.. string-searching algorithm” by Robert S. Boyer and J. Strother Moore
.. in Communications of the ACM, 20(10):762-772, 1977.)


.. Slideshow for Boyer-Moore search algorithm

.. avembed:: AV/Development/Boyer_Moore_Algorithm_Slideshow.html ss

Now that you've seen how the Boyer-Moore algorithm works once the
mismatched character and reverse KMP alignments have been
pre-computed, use the next two slideshows to study in more detail how
the pre-computation of these two alignment tables would be done.

Slideshow for Boyer-Moore Mismatched Character Table Construction

.. avembed:: AV/Development/Boyer_Moore_MMC_Slideshow.html ss

Slideshow for Boyer-Moore "Reverse KMP" Alignment Table Construction

.. avembed:: AV/Development/Boyer_Moore_Align_Table_Slideshow.html ss

We've seen from the above slideshows that there are really three algorithms at play in Boyer-Moore:  

The main algorithm using two pre-computed re-alignment tables:::

  m = Sub.length - 1 
  while m < Master.length: 
    s = Sub.length - 1 
    while s >= 0 and Master[m] = Sub[s]: m = m-1, s = s-1 
    if s < 0: return m+1 
    else: m = m + larger_of(MMC[master[m]], Align[s]) 
  return -1

The algorithm to compute the mismatched character table:::

  p = current character in alphabet 
  if alphabet[p] doesn't exist in string then: MMC[p] = string.length 
  else: MMC[p] = distance from right end of string to furthest right occurrence of alphabet[p] in string.

And the algorithm to compute the reverse-KMP alignment table:::

  p = current_index 
  suffix_length = length of the suffix of string beginning at p+1 
  offset = least amount that the suffix must be moved left to match another occurrence of itself 
                      that isn't preceded by the same character that is at string[p] 
  if p = string.length()-1 then: 
    align[p] = 1 
  else 
    align[p] = suffix_length + offset

Keeping in mind the pseudocode for these algorithms, test yourself on
Boyer-Moore by completing the following four exercises.

1. Exercise in tracing one step of the Boyer-Moore algorithm

.. avembed:: Exercises/Development/Boyer_Moore_Next_Step_Exercise.html ka

2. Exercise in tracing one step of the Boyer-Moore Mismatched Character Table Construction

.. avembed:: Exercises/Development/Boyer_Moore_MMC_Exercise.html ka

3. Exercise in tracing one step of the Boyer-Moore Alignment Table Construction

.. avembed:: Exercises/Development/Boyer_Moore_Alignment_Exercise.html ka

4. Proficiency Exercise in tracing entire Boyer-Moore algorithm

.. avembed:: Exercises/Development/Boyer_Moore_EX_PRO.html pe




