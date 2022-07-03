.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bio_Batch2
   :satisfies: DNASeq
   :topic: DNASeq

Loops
=====
A suffix tree is a tree data structure typically used to store a list of strings. It is also referred to as the compressed version of a trie, as, unlike a trie, each unique suffix in the list is compressed together and represented by a single node or branch in a suffix tree.
There are many ways to construct a suffix tree, but the semantics that is shared by most if not all types of suffix trees are as follows:
•	Build a generalized suffix tree for T_1 and T_2.
•	Annotate each internal node in the tree with whether that node has at least one leaf node from each of T_1 and T_2
•	Run a depth-first search over the tree to find the marked node with the highest string depth.
Properties of a Suffix Tree
Each tree edge is labeled by a substring of S
Each internal node has at least 2 children
.Each S(i) has its corresponding labeled path from root to a leaf, for 1 <i <n
There are n leaves
No edges branching out from the same internal node can start with the same character

Usage
The application of suffix trees is diverse and inter-disciplinary in nature.
In Computational Biology, suffix trees are widely used to identify the repeating structures in a DNA molecule. Similarly, it may be used to find the longest common sub-string or sub-sequence in a DNA sequence. These techniques are vital to the study of evolution and to trace similarities between organisms.
Moreover, in Forensic Science, it is crucial to make sure that DNA samples are not contaminated. Using suffix trees, analysts can verify if a given DNA sequence is contaminated or not!



This is a visualization for Loops

.. inlineav:: Loops ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Loops.css 
   :scripts: AV/BIO/Loops.js
   :output: show

While Loops
-----------
A suffix tree is a tree data structure typically used to store a list of strings. It is also referred to as the compressed version of a trie, as, unlike a trie, each unique suffix in the list is compressed together and represented by a single node or branch in a suffix tree.
There are many ways to construct a suffix tree, but the semantics that is shared by most if not all types of suffix trees are as follows:
•	Build a generalized suffix tree for T_1 and T_2.
•	Annotate each internal node in the tree with whether that node has at least one leaf node from each of T_1 and T_2
•	Run a depth-first search over the tree to find the marked node with the highest string depth.
Properties of a Suffix Tree
Each tree edge is labeled by a substring of S
Each internal node has at least 2 children
.Each S(i) has its corresponding labeled path from root to a leaf, for 1 <i <n
There are n leaves
No edges branching out from the same internal node can start with the same character

Usage
The application of suffix trees is diverse and inter-disciplinary in nature.
In Computational Biology, suffix trees are widely used to identify the repeating structures in a DNA molecule. Similarly, it may be used to find the longest common sub-string or sub-sequence in a DNA sequence. These techniques are vital to the study of evolution and to trace similarities between organisms.
Moreover, in Forensic Science, it is crucial to make sure that DNA samples are not contaminated. Using suffix trees, analysts can verify if a given DNA sequence is contaminated or not!



This is a visualization for Suffix Tree

.. inlineav:: WhileLoops ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/WhileLoops.css 
   :scripts: AV/BIO/WhileLoops.js
   :output: show

For Loops
---------
A suffix tree is a tree data structure typically used to store a list of strings. It is also referred to as the compressed version of a trie, as, unlike a trie, each unique suffix in the list is compressed together and represented by a single node or branch in a suffix tree.
There are many ways to construct a suffix tree, but the semantics that is shared by most if not all types of suffix trees are as follows:
•	Build a generalized suffix tree for T_1 and T_2.
•	Annotate each internal node in the tree with whether that node has at least one leaf node from each of T_1 and T_2
•	Run a depth-first search over the tree to find the marked node with the highest string depth.
Properties of a Suffix Tree
Each tree edge is labeled by a substring of S
Each internal node has at least 2 children
.Each S(i) has its corresponding labeled path from root to a leaf, for 1 <i <n
There are n leaves
No edges branching out from the same internal node can start with the same character

Usage
The application of suffix trees is diverse and inter-disciplinary in nature.
In Computational Biology, suffix trees are widely used to identify the repeating structures in a DNA molecule. Similarly, it may be used to find the longest common sub-string or sub-sequence in a DNA sequence. These techniques are vital to the study of evolution and to trace similarities between organisms.
Moreover, in Forensic Science, it is crucial to make sure that DNA samples are not contaminated. Using suffix trees, analysts can verify if a given DNA sequence is contaminated or not!



This is a visualization for Suffix Tree

.. inlineav:: ForLoops ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/ForLoops.css 
   :scripts: AV/BIO/ForLoops.js
   :output: show

