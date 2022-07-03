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

Firstly the dynamic programming is a method the tries to get the optimal alignment through finding all possible pairs of characters between to sequences. In another expression, it is used in matching sequences. 
The dynamic programming algorithm in global alignment is similar to the dotplot in generating the matrix that represents it.
It is simply a chart that contains all the possible alignments. It is done on two sequences as residues. The residues of one sequence index the rows, the residues from the other sequence index the columns and any sequence of cells in the whole matrix from the upper left to lower right represents an alignment. 
As said before, the dynamic programming is somehow similar to the dot matrix. Both depend on creating a matrix to find the alignment. But, the dynamic programming converts the dot matrix into a scoring matrix to account the matches and mismatches between the two sequences and that helps to get the alignment more quantitatively. Searching for the highest scores in the matrix, the best alignment can be obtained accurately using the dynamic programming.

How dynamic programming works?
Dynamic programming depends on generating a matrix of two-dimensions with a first row and first column indexing the sequences that need to be aligned in the presence of a scoring matrix instead of a dot matrix as in the dotplot. So how the scores are calculated?
It starts with the first row and go through the rest of the rows in a method of row by row. The first row of one sequence which is used to scan through the entire length of the other sequence, followed by scanning of the second row. The scanning of the second row depends on the scores that already calculated in the first scan and so on till the values are all calculated and the cells are all filled. We go diagonal right now to get the scores from the upper left to the lower right corner. Once the scores are all calculated then we focus on finding the path of the optimal alignment using the “traceback”. The traceback is a way of finding the optimal path of alignment through going reversal from the lower right-hand corner of the matrix toward the origin of the matrix in the upper left-hand corner. The best matching path is that one with the highest score. The path always goes diagonal with some exceptions going vertically or horizontally at some points when it has to deal with a deletion, insertion or gap for one of the two sequences.


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

This is a visualization for DNA Sequencing

.. inlineav:: Gscore ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Gscore.css 
   :scripts: AV/BIO/Gscore.js
   :output: show

Traceback
---------

This is a visualization for DNA Sequencing

.. inlineav:: Gtraceback ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Gtraceback.css 
   :scripts: AV/BIO/Gtraceback.js
   :output: show


Exercise
--------

This is a visualization for DNA Sequencing

.. inlineav:: GExercise ff
.. inlineav:: GExercise ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/GExercise.css 
   :scripts: DataStructures/PIFrames.js AV/BIO/GExercise.js
   :output: show

