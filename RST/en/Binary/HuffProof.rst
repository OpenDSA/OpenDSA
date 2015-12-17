.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: Huffman coding tree
   :satisfies: Huffman proof
   :topic: Huffman Coding Trees

.. odsalink:: AV/Binary/HuffProofCON.css

Proof of Optimality for Huffman Coding
======================================

Proof of Optimality for Huffman Coding
--------------------------------------

Huffman tree building is an example of a
:term:`greedy algorithm`.
At each step, the algorithm makes a "greedy" decision to merge
the two subtrees with least weight.
This makes the algorithm simple, but does it give the desired result?
This section concludes with a proof that the Huffman tree
indeed gives the most efficient arrangement for the set of letters.
The proof requires the following lemma.

**Lemma:**
For any Huffman tree built by function ``buildHuff`` containing at
least two letters, the two letters with least frequency are stored
in sibling nodes whose depth is at least as deep as any other leaf
nodes in the tree.

**Proof:**
Call the two letters with least frequency :math:`l_1`
and :math:`l_2`.
They must be siblings because ``buildHuff``
selects them in the first step of the construction process.
Assume that :math:`l_1` and :math:`l_2` are
not the deepest nodes in the tree.
In this case, the Huffman tree must either look as shown in
Figure :num:`Figure #HProof`, or effectively symmetrical to
this.
For this situation to occur, the parent of :math:`l_1`
and :math:`l_2`,
labeled :math:`V`, must have greater weight than the node
labeled :math:`X`.
Otherwise, function ``buildHuff`` would have selected node
:math:`V` in place of node :math:`X` as the child of node
:math:`U`.
However, this is impossible because :math:`l_1` and
:math:`l_2` are the letters with least frequency.

.. _HProof:

.. inlineav:: HuffProofCON dgm 
   :output: show
   :align: center

   An impossible Huffman tree, showing the situation where the two
   nodes with least weight, :math:`l_1` and
   :math:`l_2`, are not the deepest nodes in the tree.
   Triangles represent subtrees.

Here is the proof.

   **Theorem:**
   Function ``buildHuff`` builds the Huffman tree with the minimum
   external path weight for the given set of letters.

   **Proof:**
   The proof is by induction on :math:`n`, the number of letters.

   * **Base Case:** For :math:`n = 2`, the Huffman tree must have the
     minimum external path weight because there are only two possible
     trees, each with identical weighted path lengths for the two
     leaves.

   * **Induction Hypothesis:** Assume that any tree created by
     ``buildHuff`` that contains :math:`n-1` leaves has minimum
     external path length.

   * **Induction Step:** Given a Huffman tree :math:`\mathbf{T}`
     built by ``buildHuff`` with :math:`n` leaves,
     :math:`n \geq 2`, suppose that
     :math:`w_1 \leq w_2 \leq ... \leq w_n` where
     :math:`w_1` to :math:`w_n` are the weights of the letters.
     Call :math:`V` the parent of the letters with frequencies
     :math:`w_1` and :math:`w_2`.
     From the lemma, we know that the leaf nodes containing the
     letters with frequencies :math:`w_1` and :math:`w_2` are as
     deep as any nodes in :math:`\mathbf{T}`.
     If any other leaf nodes in the tree were deeper, we could reduce
     their weighted path length by swapping them with :math:`w_1` or
     :math:`w_2`.
     But the lemma tells us that no such deeper nodes exist.
     Call :math:`\mathbf{T}'` the Huffman tree that is
     identical to :math:`\mathbf{T}` except that node :math:`V` is
     replaced with a leaf node :math:`V'` whose weight is
     :math:`w_1 + w_2`.
     By the induction hypothesis, :math:`\mathbf{T}'` has minimum
     external path length.
     Returning the children to :math:`V'` restores tree
     :math:`\mathbf{T}`, which must also have minimum external path
     length.

   Thus by mathematical induction, function ``buildHuff`` creates
   the Huffman tree with minimum external path length.

.. TODO::
   :type: Exercise

   Battery of MCQs for content.

.. odsascript:: AV/Binary/HuffProofCON.js
