.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bio_Batch2
   :satisfies: DNASeq
   :topic: DNASeq

Local Alignment
===============

The concept of 'local alignment' was introduced by **Smith & Waterman**
A local alignment of 2 sequences is an alignment between parts of the 2 sequences
Two proteins may one share one stretch of high sequence similarity,
but be very dissimilar outside that region A global (N-W) alignment of such sequences would have: 
(i) lots of matches in the region of high sequence similarity
(ii) lots of mismatches & gaps (insertions/deletions) outside the region of similarity It makes sense to find the best local alignment instead 

**Input:** The two sequences may or may not be related.

**Goal:** see whether a substring in one sequence aligns well with a substring in the other.

**Algorithm:** Smith-Waterman dynamic programming

**Applications:**
Searching for local similarities in large sequences (e.g., newly sequenced genomes).
Looking for conserved domains or motifs in two proteins.
 
**The local alignment algorithm consists of 3 steps :**

   • Initialisation of the score and the traceback matrices
   • Calculation of scores and filling in the score and traceback matrices
   • Inferring the alignment from the traceback matrix

We have two 2D matrices: the **score matrix** and the **traceback matrix**.

Score Matrix
------------

 **In Local Alignment :**

         • Initialize first row and first column to be 0 because all negative value converted to 0
           and we fill the first row and first column according to gap penalty.

         • The score of the best local alignment is the largest value
           in the entire array.

.. inlineav:: Lscore ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Lscore.css 
   :scripts: AV/BIO/Lscore.js
   :output: show

Traceback
---------

 **To find the actual local alignment :**

         • start at an entry with the maximum score

         • traceback as usual

         • stop when we reach an entry with a score of 0

.. inlineav:: Ltraceback ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Ltraceback.css 
   :scripts: AV/BIO/Ltraceback.js
   :output: show


Exercise
--------

.. inlineav:: LExercise ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/LExercise.css 
   :scripts: DataStructures/PIFrames.js AV/BIO/LExercise.js
   :output: show

