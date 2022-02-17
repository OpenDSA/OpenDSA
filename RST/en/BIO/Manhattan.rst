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

We will further illustrate dynamic programming with a surprisingly useful toy problem, called the Manhattan Tourist problem, and then build on this intuition to describe DNA sequence alignment.
The tourists must decide among the many possible paths between the northwesternmost point **(called the source vertex)** and the southeasternmost point **(called the sink vertex)**. 
The weight of a path from the source to the sink is **simply the sum of weights of its edges, or the overall number of attractions.
** We will refer to this kind of construct **as a graph**, the intersections of streets we will call vertices, and the streets themselves will be edges and have a weight associated with them. 
We assume that horizontal edges in the graph are oriented to  **the east like →** while vertical edges are oriented to
**the south like ↓**.**A path** is a continuous sequence of edges, and the length of a path is the sum of the edge weights in the path.
**The Manhattan Tourist problem **is to find the path with the maximum number of attractions,4 that is, a longest path(a path of maximum overall weight) in the grid.
**Manhattan Tourist Problem:**
Find a longest path in a weighted grid.
*Input: A weighted grid G with two distinguished vertices: a source and a sink.
*Output: A longest path in G from source to sink.


Find The Longest Path In A Rectanglular City Grid Using Greedy Algorithm
------------------------------------------------------------------------
The brute force approach to the Manhattan Tourist problem is to search among all paths in the grid for the longest path, 
but this is not an option for even a moderately large grid. Inspired by the previous chapter you may be tempted to use a greedy strategy.
 For example, a sensible greedy strat- egy would be to choose**between two possible directions (south or east)** 
 by comparing how many attractions tourists would see if they moved one block south instead of moving one block east. 
 This greedy strategy may provide re- warding sightseeing experience in the beginning but, a few blocks later, 
 may bring you to an area of Manhattan you really do not want to be in. In fact, 
 no known greedy strategy for the Manhattan Tourist problem provides an optimal solution to the problem. 
 Had we followed the (obvious) greedy algorithm, we would have chosen the following path, corresponding to fourty two attractions.


.. inlineav:: Greedy ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Greedy.css 
   :scripts: AV/BIO/Greedy.js
   :output: show

Find The Longest Path In A Rectanglular City Grid Using Dynamic Programming
---------------------------------------------------------------------------
Instead of solving the Manhattan Tourist problem directly, that is, finding the longest path from source (0, 0) to sink (n, m),
we solve a more general problem: find the longest path from source to an arbitrary vertex (i, j) with 0 ≤ i  ≤ n, 0  ≤ j  ≤ m. 
We will denote the length of such a best path as si,j, noticing that sn,m is the weight of the path that represents the solution to the
Manhattan Tourist problem. If we only care about the longest path between (0, 0) and (n, m)—the Manhattan Tourist problem—
then we have to answer one question, namely, what is the best way to get from source to sink. If we solve the general problem, 
then we have to answer n × m questions: what is the best way to get from source to anywhere. 
At first glance it looks like we have just created n × m different problems (computing (i, j) with 0 ≤ i ≤ n and 0 ≤ j ≤ m) 
instead of a single one (computing sn,m), but the fact that solving the more general problem is as easy as 
solving the Manhattan Tourist problem is the basis of dynamic programming. Note that DPCHANGE also 
generalized the problems that it solves by finding the optimal number of coins for all values less than or equal to M .
Finding s0,j (for 0 ≤ j ≤ m) is not hard, since in this case the tourists do not have any flexibility in their choice of path.
By moving strictly to the east, the weight of the path s0,j is the sum of weights of the first j city blocks. Similarly, 
si,0 is also easy to compute for 0 ≤ i ≤ n, since the tourists move only to the south.

.. inlineav:: LongestPath ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/LongestPath.css 
   :scripts: AV/BIO/LongestPath.js
   :output: show

Now that we have figured out how to compute s0,1 and s1,0, we can com- pute s1,1. 
The tourists can arrive at (1, 1) in only two ways: either by trav- eling south from (0, 1) or east from (1, 0). 
The weight of each of these paths is
 * s0,1 + weight of the edge (block) between (0,1) and (1,1)
 * s1,0 + weight of the edge (block) between (1,0) and (1,1).
 Since the goal is to find the longest path to, in this case, (1, 1), we choose the larger of the above two quantities:
  3 + 0 and 1 + 3. Note that since there are no other ways to get to grid position (1, 1), 
we have found the longest path from (0, 0) to (1, 1).
Once we have calculated si,1 for all i, we can use the same idea to calculate
si,2 for all i, and so on. For example, we can calculate s1,2 as follows.
s1,2= max(s1,1 + weight of the edge between (1,1) and (1,2) ,s0,2 + weight of the edge between (0,2) and (1,2))
In general, having the entire column s∗,j allows us to compute the next whole column s∗,j+1. 
The observation that the only way to get to the intersection at (i, j) is either by moving south from intersection (i − 1, j) or
 by moving east from the intersection (i, j − 1) leads to the following recurrence:
 si,j = max (si−1,j +  weight of the edge between (i − 1, j) and (i, j) ,si,j−1 +  weight of the edge between (i, j − 1) and (i, j))

From Manhattan To Alignment Graph
---------------------------------

we have been vague about what we mean by **“sequence similarity”**
or “distance” between DNA sequences. Hamming distance, while important in computer science, is not typically used to compare DNA or protein sequences. 
**The Hamming distance calculation** rigidly assumes that the ith symbol of one sequence is already aligned against the it's symbol 
of the other. However, it is often the case that the ith symbol in one sequence corresponds to **a symbol at a different—and unknown—position
in the other**. For example, **mutation in DNA is an evolutionary process**:
**DNA replication errors cause substitutions, insertions, and deletions of nucleotides, leading to “edited” DNA texts.** 
Since DNA sequences are subject to **insertions and deletions**, biologists rarely have the luxury of knowing inadvance 
whether the it's symbol in one DNA sequence corresponds to the it's symbol in the other.
In 1966, Vladimir Levenshtein introduced the notion of the edit distance
between two strings **as the minimum number of editing operations needed
to transform one string into another**, where the edit operations are **insertion**
of a symbol, deletion of **a symbol**, and **substitution** of one symbol for another.


From Alignment To Path
~~~~~~~~~~~~~~~~~~~~~~

strings that contain the same letter in both rows are called **matches**, while stringscontaining different letters are called **mismatches**.
The Strings of the alignment containing one space are called indels, with the columns containing a space in the top row called **insertions** and 
the columns with a space in the bottom row **deletions**
Each of the two strings in the alignment nodes is represented as a string
interspersed by space symbols “−”
from (0, 0) to (n, m) in that grid in the visualization. This grid is similar to the Manhattan grid that we introduced earlier,
where each entry in the grid looks like a city block. The main difference is that here we can move along the diagonal. 
We can construct a graph, this time called the edit graph, by introducing a vertex for every intersection of streets in the grid, 
shown in visualization. The edit graph will aid us in calculating the edit distance.
Every alignment corresponds to a path in the edit graph, and every path
in the edit graph corresponds to an alignment where every edge in the path
corresponds to one column in the alignment. Diagonal edges in the
path that end at vertex (i, j) in the graph correspond to the column , horizontal edges  and vertical edges 


.. inlineav:: DirectedGraph ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/DirectedGraph.css 
   :scripts: AV/BIO/DirectedGraph.js
   :output: show

Analyzing the merit of an alignment is equivalent to analyzing the merit
of the corresponding path in the edit graph. Given any two strings, there
are a large number of different alignment matrices and corresponding paths
in the edit graph. Some of these have a surplus of mismatches and indels
and a small number of matches, while others have many matches and few
indels and mismatches. To determine the relative merits of one alignment
over another, we rely on the notion of a scoring function, which takes as
input an alignment matrix (or, equivalently, a path in the edit graph) and
produces a score that determines the “goodness” of the alignment. There are
a variety of scoring functions that we could use, but we want one that gives
higher scores to alignments with more matches. 


From Path To Alignment
~~~~~~~~~~~~~~~~~~~~~~

The simplest form of a sequence similarity analysis is the Longest Common Subsequence (LCS) problem, 
where we eliminate the operation of substitution and allow only insertions and deletions. A subsequence of a string v
is simply an (ordered) sequence of characters (not necessarily consecutive)
from v. For example, if v = ATTGCTA, then AGCA and ATTA are subsequences of v whereas TGTT and TCG are not.9 A common subsequence of
two strings is a subsequence of both of them. Formally, we define the common subsequence of strings v = v1 . . . vn and w = w1 . . . wm as a sequence of
positions in v,
1 ≤ i1 < i2 < · · · < ik ≤ n
and a sequence of positions in w,
1 ≤ j1 < j2 < · · · < jk ≤ m
such that the symbols at the corresponding positions in v and w coincide:
vit = wjt for 1 ≤ t ≤ k.
For example, TCTA is a common to both ATCTGAT and TGCATA.
Although there are typically many common subsequences between two
strings v and w, some of which are longer than others, it is not immediately obvious how to find the longest one. If we let s(v, w) be the length
of the longest common subsequence of v and w, then the edit distance between v and w—under the assumption that only insertions and deletions
are allowed—is d(v, w) = n + m − 2s(v, w), and corresponds to the minimum number of insertions and deletions needed to transform v into w.

.. inlineav:: AlignmentGraph ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/AlignmentGraph.css 
   :scripts: AV/BIO/AlignmentGraph.js
   :output: show

**Longest Common Subsequence Problem:**

Find the longest subsequence common to two strings.
   *  Input: Two strings, v and w.
   *  Output: The longest common subsequence of v and w
