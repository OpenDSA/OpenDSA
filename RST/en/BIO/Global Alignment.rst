.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bio_Batch2
   :satisfies: DNASeq
   :topic: DNASeq

Global Alignment
================

**Dynamic-programming algorithm:**

A chart implicitly containing all possible alignments can be constructed as a matrix similar to that it is used
in drawing the dotplot. The residues of one sequence index the rows, the residues from the other sequence index
the columns. Any path through the matrix from upper left to lower right corresponds to an alignment. 

* Dynamic programming is a method that determines `optimal alignment` by matching two sequences for all possible pairs of characters between the two sequences.
* It is fundamentally similar to the dot matrix method in that it also creates a two dimensional alignment grid.However,it finds alignment in a more quantitative way by converting a dot matrix into a scoring matrix toaccount for matches and mismatches between sequences. By searching for the set of highest scores in this matrix,the best alignment can be accurately obtained.

**How dynamic programming works?**

Dynamic programming works by first constructing a two-dimensional matrix whose axes are the two sequences to be compared. The residue matching is according to a particular scoring matrix. The scores are calculated one row at a time. This starts with the first row of one sequence, which is used to scan through the entire length of the other sequence, followed by scanning of the second row. The matching scores are calculated. The scanning of the second row takes into account the scores already obtained in the first round. This process is iterated until values for all the cells are filled. Thus, the scores are accumulated along the diagonal going from the upper left corner to the lower right corner. Once the scores have been accumulated in matrix, the next step is to find the path that represents the optimal alignment. This is done
`by tracing back through the matrix in reverse order from the lower
right-hand corner of the matrix toward the origin of the matrix in the upper left-hand corner`.The best matching path is the one that has the maximum total score. If two or more paths reach the same highest score, one is chosen arbitrarily to represent the best alignment. The path can also move horizontally or vertically at a certain point, which corresponds to introduction of a gap or an insertion or deletion for one of the two sequences.

**Dynamic Programming Recurrence for the Alignment Graph:**

| S(i,j):the length of a longest path from (0,0) to (i,j) 
| S(i,j)= `max` [s(i-1,j)+weight of edge "'vertical" between (i-1,j) and (i,j)
|             s(i,j-1)+weight of edge "horizontal" between (i,j-1) and (i,j) 
|             s(i-1,j-1)+weight of edge "'diagonal" between (i-1,j-1) and(i,j) 
|            ]

.. odsafig:: Images/dynamic.png
   :width: 280
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Complete binary tree node numbering

**The overall goal of pairwise sequence alignment:**

Is to find the best pairing of two sequences, such that there is maximum correspondence among residues.To achieve
this goal, one sequence needs to be shifted relative to the other to find the position where maximum matches are 
found. There are two different alignment strategies that are often used:`global alignment and local alignment`.

**Dynamic Programming for Global Alignment:**

* In global alignment, two sequences to be aligned are assumed to be generally similar over their entire length.
* Alignment is carried out from beginning to end of both sequences to find the best possible alignment across the entire length between the two sequences.
* The two sequences to be aligned can be of different lengths. 
* It must extend from the beginning to the end of both sequences to achieve the highest total score. In other words, the alignment path has to go from the bottom right corner of the matrix to the top left corner. The drawback of focusing on getting a maximum score for the full-length sequence alignment is the risk of missing the best local similarity.
 
* For divergent sequences or sequences with different domain structures, the approach does not produce optimal alignment.

* One of the few web servers dedicated to global pairwise alignment is `GAP`.

* The classical global pairwise alignment algorithm using dynamic programming is the Needleman–Wunsch algorithm. In this algorithm, an optimal alignment is obtained over the entire lengths of the two sequences.

**Global alignment problem:** Find a highest-scoring of two strings as defined by a scoring matrix.

**Input:** two strings and scoring matrix score.

**Output:** an alignment of the strings whose alignment score is maximized over all alignments of the strings.

**To solve global alignment problem:**

| we still must find a longest path in the alignment graph after updating the edge weights to reflect the values
| in the scoring matrix. Recalling the `deletions` corresponds to vertical edges, `insertions` corresponds to
| horizontal edges, and `matches/mismatches` correspond to diagonal edges, we obtain the following recurrence for s(i,j), the length of the longest path from (0,0) to (i,j):
| S(i,j)= `max` [s(i-1,j)+weight of edge "'vertical" between (i-1,j) and (i,j)
|             s(i,j-1)+weight of edge "horizontal" between (i,j-1) and (i,j) 
|             s(i-1,j-1)+weight of edge "'diagonal" between (i-1,j-1) and(i,j) 
|             ]

**The Needleman–Wunsch algorithm is more applicable for:**

* Aligning two closely related sequences of roughly the same length.

* For divergent sequences and sequences of variable length, this method may not be able to generate optimal results because it fails to recognize highly similar local regions between the two sequences. 

**The NEEDLEMAN-WUNSCH algorithm consists of three steps:**

**1.	Initialization of the score and traceback matrices:**

Durning the initialization , the first row and the first column of the score and traceback matrices are initialized.

**2.	Calculation of scores and filling in the score and traceback matrices:**

The next step is to find the score value for all elements iteratively resulting matrix.

**3.	Inferring the alignment from the traceback matrix:**

* Traceback is the process of deduction of the best alignment from the treaceback matrix.

* The traceback always begins with the last cell(the bottom right) where the highest score is present, continuing up to the upper left corner .

* Deducting the best alignment:

   There are three possible moves along the traceback path:

   *   `diagonal:` the letters from two sequences are aligned.

   *   `left:` gap is introduced into the left sequence.

   *   `up:` gap is introduced into the top sequence.

We have two 2D matrices: the score matrix and the traceback matrix.


.. inlineav:: Global ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Global.css 
   :scripts: AV/BIO/Global.js
   :output: show

Score Matrix
------------

.. inlineav:: Gscore ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Gscore.css 
   :scripts: AV/BIO/Gscore.js
   :output: show

Traceback
---------

.. inlineav:: Gtraceback ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Gtraceback.css 
   :scripts: AV/BIO/Gtraceback.js
   :output: show


Exercise
--------

.. inlineav:: GExercise ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/GExercise.css 
   :scripts: DataStructures/PIFrames.js AV/BIO/GExercise.js
   :output: show

