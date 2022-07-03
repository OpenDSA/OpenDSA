.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bio_Batch2
   :satisfies: DNASeq
   :topic: DNASeq

Manhattan Tourist Problem
=========================

We are going to use the Manhattan Tourist Problem to clearly explain the role of dynamic programming in the description of DNA sequence alignment based on the assumptions of this problem.
The tourist of Manhattan has two possible ways to go through:
•	Vertical edges directed to the south. ↓
•	Horizontal edges directed to the east. →

We will identify the exact job of Manhattan Tourist Problem:
It is a way that can find the path with the maximum number of attractions. In other words, the longest path in a grid from the origin point “source” to the end point “destination” of the grid.
The mentioned path is a continuous sequence of edges has a weight represented by the sum of the weights of its edges.
So we have now a problem of determining the longest path, the grid with its weighted edges as an input and the longest path from the source to the destination as an output.

 
The experiment of finding the longest path in a rectangular city grid was not that easy. It came through several levels.


Find The Longest Path In A Rectanglular City Grid Using Greedy Algorithm
------------------------------------------------------------------------
The greedy algorithm in Manhattan Tourist Problem used the brute force approach to find the longest path. The brute force is to search among all paths in the small grids for the longest path. But for large sized grids, it is not the best option.
For the Manhattan Tourist Problem, the brute force may be a good solution in the beginning. But further, it does not provide the optimal solution because the tourist may find himself in an unintended destination. There is no Greedy algorithm for the Manhattan Tourist Problem that affect positively at a long term. 
And that takes us to the second level.


.. inlineav:: Greedy ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Greedy.css 
   :scripts: AV/BIO/Greedy.js
   :output: show

Find The Longest Path In A Rectanglular City Grid Using Dynamic Programming
---------------------------------------------------------------------------
The dynamic programming is a solution for a general problem: find the longest path from source to an arbitrary vertex (i, j) with 0 ≤ i ≤ n, 0 ≤ j ≤ m. 
That depends on generalizing the solution instead of specializing it into finding the longest path from source (0, 0) to sink (n, m), as greedy algorithm did in dealing with the problem of Manhattan tourist.
If we only take the longest path between (0, 0) and (n, m) in consideration then we have to answer one question, what is the best way to get from source to sink. But if we solve the general problem, then we have to answer n × m questions: what is the best way to get from source to anywhere.
Dynamic programming helps us to easily solve Manhattan problem because we solve the general problem and it's not hard as thought of (computing (i, j) with 0 ≤ i ≤ n and 0 ≤ j ≤ m) instead of a single one (computing sn,m).
As an experiment, if we want to compute s0,j (for 0 ≤ j ≤ m) it is not hard. The will not have multiple paths to go through, only to the east.
Similarly, si,0 (for 0 ≤ i ≤ n) is also easy to compute,  the tourist moves only to the south.



.. inlineav:: LongestPath ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/LongestPath.css 
   :scripts: AV/BIO/LongestPath.js
   :output: show

That is how we compute s0,1 and s1,0. Can we compute s1,1? Let’s find out how
The tourist has two ways to go through:
•	From (0,1) to south with a weight equals s0,1 + weight of the edge between (0,1) and (1,1)
•	From (1,0) to east with a weight equals s1,0 + weight of the edge between (1,0) and (1,1).
All we need is to find the longest path from the source to the destination. So we choose the larger between the two previous possibilities depending on the edge values.
Similarly, if we need to calculate s1,2 we do the following:
s1,2= max(s1,1 + weight of the edge between (1,1) and (1,2) ,s0,2 + weight of the edge between (0,2) and (1,2)).
And the general formula to find the longest path from any source and to any destination in a grid is:
si,j = max (si−1,j +  weight of the edge between (i − 1, j) and (i, j) ,si,j−1 +  weight of the edge between (i, j − 1) and (i, j))


From Manhattan To Alignment Graph
---------------------------------

We move now from the Manhattan form to the alignment form and that leads us to a question, what we mean by sequence similarity or “distance” between DNA sequences?
One of the proposed methods to solve the alignment problem is Hamming Distance. It is important in computer science but using it in comparing DNA or protein sequences was a controversy.
The Hamming Distance calculation assumes that the ith symbol of one sequence is already aligned against the ith symbol of the other. But the real action that happens is that the ith symbol in one sequence corresponds to a symbol at a different position in the other sequence. We can take the mutations in DNA as a model for this, DNA replication errors can lead to substitutions, insertions, and deletions of nucleotides and cause editing in DNA texts.




From Alignment To Path
~~~~~~~~~~~~~~~~~~~~~~
Strings differ based on the form of the sequence:
•	Strings that contain the same letter in both rows are called matches.
•	Strings containing different letters are called mismatches.
The Strings of the alignment containing one space are called InDels:
•	With the columns containing a space in the top row called insertions.
•	With the columns containing a space in the top row called insertions.
From Manhattan grid to alignment grid. This grid is similar to the Manhattan grid, where each entry in the grid looks like a city block with one difference that here we can move diagonally. 
From the grid we can generate a graph by identifying a vertex for each intersection of the streets of the grid. 
•	Every alignment corresponds to a path in the edit graph.
•	Every path in the edit graph corresponds to an alignment.
•	Every edge in the path corresponds to one column in the alignment.
•	Diagonal edges in the path that end at vertex (i, j) in the graph correspond to the column, horizontal edges and vertical edges.




.. inlineav:: DirectedGraph ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/DirectedGraph.css 
   :scripts: AV/BIO/DirectedGraph.js
   :output: show

As mentioned before strings have some deletions, insertions, mismatches and few matches. We determine a scoring matrix that takes:
•	Alignment matrix as an input.
•	Score that determines the “goodness” of the alignment as an output.
The scoring functions are different and many of them are present but we need just the one with higher scores to alignments with more matches.

From Path To Alignment
~~~~~~~~~~~~~~~~~~~~~~
The longest common subsequence is a form of sequence similarity analysis where there is no substitution, only deletions and insertions.
The subsequence of a sequence is a sequence of characters (ordered but not necessary to be consecutive).
For example:
V = ATGTACCATG
•	ATAC is a subsequence of V.
•	TCTG is also a subsequence of V. 
•	AATT is not a subsequence of V.

The common subsequence is a part of more than one sequence.
For example:
V = ATCTGAT
W = ATGCATA
•	AGAT is a common subsequence to both V and W.
Two strings V and W can contain more than one subsequence but some are longer than the others and it is not clear finding the longest one.
But the general formula to get the distance between the two strings, if only insertions and deletions are allowed, is d(V, W) = n + m − 2s(V, W).


.. inlineav:: AlignmentGraph ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/AlignmentGraph.css 
   :scripts: AV/BIO/AlignmentGraph.js
   :output: show

`Longest Common Subsequence Problem:`
Find the longest subsequence common to two strings.

* | Input: Two strings, v and w.

* | Output: The longest common subsequence of v and w
