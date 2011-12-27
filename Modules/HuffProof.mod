<ODSAsettitle>Proof of Optimality for Huffman Coding</ODSAsettitle>
<ODSAprereq "Huffman" \>
<ODSAprereq "Induction" \>

<p>
Huffman tree building is an example of a
<ODSAdef "greedy algorithm" \>.
At each step, the algorithm makes a "greedy" decision to merge
the two subtrees with least weight.
This makes the algorithm simple, but does it give the desired result?
This section concludes with a proof that the Huffman tree
indeed gives the most efficient arrangement for the set of letters.
The proof requires the following lemma.
</p>

<p class="lemma">
For any Huffman tree built by function <tt>buildHuff</tt> containing at
least two letters, the two letters with least frequency are stored in
siblings nodes whose depth is at least as deep as any other leaf nodes
in the tree.
</p>

<p class="proof">
Call the two letters with least frequency <i>l</i><sub>1</sub>
and <i>l</i><sub>2</sub>.
They must be siblings because <tt>buildHuff</tt>
selects them in the first step of the construction process.
Assume that <i>l</i><sub>1</sub> and <i>l</i><sub>2</sub> are not the
deepest nodes in the tree.
In this case, the Huffman tree must either look as shown in
Figure <ODSAref "HuffProof" \>, or in some sense be symmetrical to
this.
For this situation to occur, the parent of <i>l</i><sub>1</sub>
and <i>l</i><sub>2</sub>,
labeled <i>V</i>, must have greater weight than the node
labeled <i>X</i>.
Otherwise, function <tt>buildHuff</tt> would have selected node
<i>V</i> in place of node <i>X</i> as the child of node <i>U</i>.
However, this is impossible because <i>l</i><sub>1</sub> and
<i>l</i><sub>2</sub> are the letters with least frequency.
</p>

<center>
<img src="Images/HProof.png" alt="An impossible Huffman tree" />
</center>

<p class="caption">
<ODSAfig "HuffProof" \>
An impossible Huffman tree, showing the situation where the two nodes 
with least weight, <i>l</i><sub>1<\sub> and <i>l</i><sub>2</sub>, are
not the deepest nodes in the tree.
Triangles represent subtrees.
</p>

<p class="theorem">
Function <tt>buildHuff</tt> builds the Huffman tree with the minimum
external path weight for the given set of letters.
</p>

<p class = "proof">
The proof is by induction on <i>n</i>, the number of letters.
</p>

<ul>

<li>
<b>Base Case</b>: For <i>n</i> = 2, the Huffman tree must have the
minimum external path weight because there are only two possible trees,
each with identical weighted path lengths for the two leaves.
</li>

<li>
<b>Induction Hypothesis</b>: Assume that any tree created by
<tt>buildHuff</tt> that contains <i>n</i>-1 leaves has minimum
external path length.
</li>

<li>
<p>
<b>Induction Step</b>: Given a Huffman tree <b>T</b> built by
<tt>buildHuff</tt> with <i>n</i> leaves,
<i>n</i> &ge; 2, suppose that
<i>w</i><sub>1</sub> &le; <i>w</i><sub>2</sub> &le;
... &le; <i>w</i><sub>n</sub> where
<i>w</i><sub>1</sub> to <i>w</i><sub>n</sub> are the weights of the
letters.
Call <i>V</i> the parent of the letters with frequencies <i>w</i><sub>1</sub>
and <i>w</i><sub>2</sub>.
From the lemma, we know that the leaf nodes containing the letters
with frequencies <i>w</i><sub>1</sub> and <i>w</i><sub>2</sub> are as
deep as any nodes in <b>T</b>.
If any other leaf nodes in the tree were deeper, we could reduce their 
weighted path length by swapping them with <i>w</i><sub>1</sub> or
<i>w</i><sub>2</sub>.
But the lemma tells us that no such deeper nodes exist.
Call <b>T'</b> the Huffman tree that is identical to <b>T</b> except
that node <i>V</i> is replaced with a leaf node <i>V</i>' whose
weight is <i>w</i><sub>1</sub> + <i>w</i><sub>2</sub>.
By the induction hypothesis, <b>T'</b> has minimum external path
length.
Returning the children to <i>V</i>' restores tree <b>T</b>, which
must also have minimum external path length.
</p>

<p>
Thus by mathematical induction, function \Cref{buildHuff} creates the
Huffman tree with minimum external path length.
</p>
</li>

</ul>
