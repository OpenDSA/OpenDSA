<ODSAsettitle>Huffman Coding Trees<\ODSAsettitle>
<ODSAprereq "BinTreeImp" \>
<ODSAprereq "SpaceBounds" \>

The space/time tradeoff principle presented in
Module <OpenDSA "SpaceBounds" \> states that one can often gain an
improvement in space requirements in exchange for a penalty in running
time.
There are many situations where this is a desirable tradeoff.
A typical example is storing files on disk.
If the files are not actively used, the owner might wish to
compress them to save space.
Later, they can be uncompressed for use, which costs some time,
but only once.
</p>

<p>
We often represent a set of items in a computer program
by assigning a unique code to each item.
For example, the standard ASCII coding scheme assigns a unique
eight-bit value to each character.
It takes a certain minimum number of bits to provide unique codes for
each character.
For example, it takes &lceil; log 128 &rceil;
or seven bits to provide the 128~unique codes needed to represent the
128~symbols of the ASCII character set.
(The ASCII standard is eight bits, not seven, even though there are
only 128 characters represented.
The eighth bit is used either to check for transmission errors, or to
support ``extended'' ASCII codes with an additional 128 characters.)
</p>

<p>
The requirement for &lceil; log <i>n</i> &rceil; bits to represent
<i>n</i> unique code values assumes that all codes will be the same
length, as are ASCII codes.
This is called a <ODSAdef "fixed-length" \> coding scheme.
If all characters were used equally often, then a fixed-length coding
scheme is the most space efficient method.
However, you are probably aware that not all characters are used
equally often in many applications.
For example, the various letters in an English language document have
greatly different frequencies of use.
</p>

<p>
Figure <ODSAref "Freq" \> shows the relative frequencies of the
letters of the alphabet.
From this table we can see that the letter `E' appears about 60 times
more often than the letter `Z.'
In normal ASCII, the words ``DEED'' and ``MUCK'' require the same
amount of space (four bytes).
It would seem that words such as ``DEED,'' which are composed of
relatively common letters, should be storable in less space than words
such as ``MUCK,'' which are composed of relatively uncommon letters.
</p>

TODO: GENERATE IMAGE FOR TABLE

\begin{mytable}
\begin{center}
\begin{tabular}{c|c||c|c}
\multicolumn{1}{c}{\textbf{Letter}} &
\multicolumn{1}{|c||}{\textbf{Frequency}} &
\multicolumn{1}{c}{\textbf{Letter}} &
\multicolumn{1}{|c}{\textbf{Frequency}}\\
\hline
A & 77 & N & 67\\
B & 17 & O & 67\\
C & 32 & P & 20\\
D & 42 & Q &  5\\
E &120 & R & 59\\
F & 24 & S & 67\\
G & 17 & T & 85\\
H & 50 & U & 37\\
I & 76 & V & 12\\
J &  4 & W & 22\\
K &  7 & X &  4\\
L & 42 & Y & 22\\
M & 24 & Z &  2\\
\end{tabular}
\end{center}
\vspace{-\medskipamount}

<p class="caption">
<ODSAfig "Freq" \>
Relative frequencies for the 26 letters of the alphabet as they
appear in a selected set of English documents.
"Frequency" represents the expected frequency of occurrence per
1000 letters, ignoring case.
</p>

<p>
If some characters are used more frequently than others, is
it possible to take advantage of this fact and somehow assign them
shorter codes?
The price could be that other characters require longer codes, but
this might be worthwhile if such characters appear rarely enough.
This concept is at the heart of file compression techniques in common
use today.
The next section presents one such approach to assigning
<ODSAdef "variable-length" \> codes, called Huffman coding.
While it is not commonly used in its simplest form for file
compression (there are better methods), Huffman coding gives
the flavor of such coding schemes.
One motivation for studying Huffman coding is because it provides our
first opportunity to see a type of tree structure referred to as a
<ODSAdef "search trie" \>
</p>

<h2>Building Huffman Coding Trees</h2>

<p>
Huffman coding assigns codes to characters such that the length of
the code depends on the relative frequency or <ODSAdef "weight" \> of
the corresponding character.
Thus, it is a variable-length code.
If the estimated frequencies for letters match
the actual frequency found in an encoded message, then the
length of that message will typically be less than if a fixed-length
code had been used.
The Huffman code for each letter is derived from a full
binary tree called the <ODSAdef "Huffman coding tree" \>,
or simply the <ODSAdef "Huffman tree" \>.
Each leaf of the Huffman tree corresponds to a letter, and we define
the weight of the leaf node to be the weight (frequency) of its
associated letter.
The goal is to build a tree with the
<ODSAdef "minimum external path weight" \>.
Define the <ODSAdef "weighted path length" \> of a leaf to be
its weight times its depth.
The binary tree with minimum external path weight is the one with the
minimum sum of weighted path lengths for the given set of leaves.
A letter with high weight should have low depth, so that it
will count the least against the total path length.
As a result, another letter might be pushed deeper in the tree if it has
less weight.
</p>

<p>
The process of building the Huffman tree for <i>n</i> letters is quite
simple.
First, create a collection of <i>n</i> initial Huffman trees, each of
which is a single leaf node containing one of the letters.
Put the <i>n</i> partial trees onto a priority queue
organized by weight (frequency).
Next, remove the first two trees (the ones with lowest weight) from
the priority queue.
Join these two trees together to create a new tree whose root has the
two trees as children, and whose weight is the sum of the weights of
the two trees.
Put this new tree back into the priority queue.
This process is repeated until all of the partial Huffman trees have
been combined into one.
</p>

<img src="http://www.forkosh.com/mathtex.cgi?
\begin{tabular}{|l|cccccccc|}
\hline
\rule{0pt}{11pt}Letter      &  C & D & E & K & L & M & U & Z\\
\rule{0pt}{11pt}Frequency   & 32 & 42 & 120 & 7 & 42 & 24 & 37 & 2\\
\hline
\end{tabular}"
   alt="" border=0 align="middle">

<p class="caption">
<ODSAfig "FreqExamp" \>
The relative frequencies for eight selected letters.
</p>

<center>
<img src="Images/HuffTree.png" alt="Building a Huffman tree" />
</center>

<p class="caption">
<ODSAfig "HuffTree" \>
The first five steps of the building process for a sample Huffman
tree.
</p>

<p class="example">
Figure <ODSAref "HuffTree" \> illustrates part of the Huffman tree
construction process for the eight letters of
Figure <ODSEref "FreqExamp" \>.
Ranking D and L arbitrarily by alphabetical order, 
the letters are ordered by frequency as
</p>

<img src="http://www.forkosh.com/mathtex.cgi?
\begin{tabular}{|l|cccccccc|}
\hline
\rule{0pt}{11pt}Letter    & Z & K &  M &  C &  U &  D &  L &   E\\
\rule{0pt}{11pt}Frequency & 2 & 7 & 24 & 32 & 37 & 42 & 42 & 120\\
\hline
\end{tabular}"
   alt="" border=0 align="middle">

<p>
Because the first two letters on the list are Z and K, they are
selected to be the first trees joined together.
(Note that for clarity, the examples for building Huffman
trees show a sorted list to keep the letters ordered by frequency.
But a real implementation would use a heap to implement the priority
queue for efficiency.)
They become the children of a root node with weight 9.
Thus, a tree whose root has weight 9 is placed back on the list, where
it takes up the first position.
The next step is to take values 9 and 24 off the list (corresponding
to the partial tree with two leaf nodes built in the last step, and
the partial tree storing the letter M, respectively) and join them
together.
The resulting root node has weight 33, and so this tree is placed
back into the list.
Its priority will be between the trees with values 32 (for letter C)
and 37 (for letter U).
This process continues until a tree whose root has weight 306 is
built.
This tree is shown in Figure <ODSAref "HuffCode" \>.
</p>

<center>
<img src="Images/HuffCode.png" alt="A Huffman tree" />
</center>

<p class="caption">
<ODSAfig "HuffCode" \>
A Huffman tree for the letters of Figure <ODSAref "FreqExamp" \>.
</p>

<pre>
/** Huffman tree node implementation: Base class */
public interface HuffBaseNode<E> {
  public boolean isLeaf();
  public int weight();
}

/** Huffman tree node: Leaf class */
class HuffLeafNode<E> implements HuffBaseNode<E> {
  private E element;         // Element for this node
  private int weight;        // Weight for this node

  /** Constructor */
  public HuffLeafNode(E el, int wt)
    { element = el; weight = wt; }

  /** @return The element value */
  public E element() { return element; }

  /** @return The weight */
  public int weight() { return weight; }

  /** Return true */
  public boolean isLeaf() { return true; }
}

/** Huffman tree node: Internal class */
class HuffInternalNode<E> implements HuffBaseNode<E> {
  private int weight;            // Weight (sum of children)
  private HuffBaseNode<E> left;  // Pointer to left child
  private HuffBaseNode<E> right; // Pointer to right child

  /** Constructor */
  public HuffInternalNode(HuffBaseNode<E> l,
                          HuffBaseNode<E> r, int wt)
    { left = l; right = r; weight = wt; }

  /** @return The left child */
  public HuffBaseNode<E> left() { return left; }

  /** @return The right child */
  public HuffBaseNode<E> right() { return right; }

  /** @return The weight */
  public int weight() { return weight; }

  /** Return false */
  public boolean isLeaf() { return false; }
}
</pre>

<p class="caption">
<ODSAfig "HuffNode" \>
Implementation for Huffman tree nodes.
Internal nodes and leaf nodes are represented by separate classes,
each derived from an abstract base class.
</p>

================== DONE TO HERE ========================

Figure~\ref{HuffNode} shows an implementation for Huffman tree nodes.
This implementation is similar to the \Cref{VarBinNode} implementation
of Figure~\ref{VarNodeI}.
There is an abstract base class, named \Cref{HuffNode}, and two
subclasses, named \Cref{LeafNode} and \Cref{IntlNode}.
This implementation reflects the fact that leaf and internal nodes
contain distinctly different information.

\begin{figure}
\xprogfig{HuffTree.book}

\vspace{-\bigskipamount}
\capt{4.5in}{Class declarations for the Huffman tree}
{Class declarations for the Huffman tree.}{HuffClass}
\end{figure}

Figure~\ref{HuffClass} shows the implementation
for the Huffman tree.
Figure~\ref{HuffBuild} shows the \Lang\ code for the tree-building
process. 

Huffman tree building is an example of a
\defit{greedy algorithm}.\index{greedy algorithm}
At each step, the algorithm makes a ``greedy'' decision to merge
the two subtrees with least weight.
This makes the algorithm simple, but does it give the desired result?
This section concludes with a proof that the Huffman tree
indeed gives the most efficient arrangement for the set of letters.
The proof requires the following lemma.

\begin{figure}
\xprogfig{Huffbld.book}

\bigskip
\capt{4.5in}{Implementation for Huffman tree construction}
{Implementation for the Huffman tree construction function.
\Cref{buildHuff} takes as input \Cref{fl}, the min-heap
of partial Huffman trees, which initially are single leaf nodes as
shown in Step~1 of Figure~\ref{HuffTree}.
The body of function \Cref{buildTree} consists mainly of a
\Cfor\ loop.
On each iteration of the \Cfor\ loop, the first two partial trees are
taken off the heap and placed in variables \Cref{temp1} and
\Cref{temp2}.
A tree is created (\Cref{temp3}) such that the left and right subtrees 
are \Cref{temp1} and \Cref{temp2}, respectively.
Finally, \Cref{temp3} is returned to \Cref{fl}.}{HuffBuild}
\bigskip
\end{figure}

\begin{lemma}
For any Huffman tree built by function \Cref{buildHuff} containing at
least two letters, the two letters with least frequency are stored in
siblings nodes whose depth is at least as deep as any other leaf nodes
in the tree.
\end{lemma}

\begin{proof}
Call the two letters with least frequency \(l_1\) and \(l_2\).
They must be siblings because \Cref{buildHuff}
selects them in the first step of the construction process.
Assume that \(l_1\) and \(l_2\) are not the deepest nodes in the tree.
In~this case, the Huffman tree must either look as shown in
Figure~\ref{HuffProof}, or in some sense be symmetrical to this.
For this situation to occur, the parent of \(l_1\) and \(l_2\),
labeled \svar{V}, must have greater weight than the node
labeled~\svar{X}.
Otherwise, function \Cref{buildHuff} would have selected node
\svar{V} in place of node \svar{X} as the child of node \svar{U}.
However, this is impossible because \(l_1\) and \(l_2\) are the letters
with least frequency.
\end{proof}

\begin{figure}
\pdffig{HProof}

\capt{4.5in}{An impossible Huffman tree}
{An impossible Huffman tree, showing the situation where the two nodes 
with least weight, \(l_1\) and \(l_2\), are not the deepest nodes in
the tree.
Triangles represent subtrees.}{HuffProof}
\bigskip
\end{figure}

\begin{theorem}
Function \Cref{buildHuff} builds the Huffman tree with the minimum
external path weight for the given set of letters.
\end{theorem}

\begin{proof}
\index{proof!induction|(}
The proof is by induction on \(n\), the number of letters.

\begin{itemize}

\item
{\bf Base Case}: For \(n = 2\), the Huffman tree must have the
minimum external path weight because there are only two possible trees,
each with identical weighted path lengths for the two leaves.

\item
{\bf Induction Hypothesis}: Assume that any tree created by
\Cref{buildHuff} that contains \(n-1\) leaves has minimum external path
length.

\item
{\bf Induction Step}: Given a Huffman tree \cvar{T} built by
\Cref{buildHuff} with \(n\) leaves,
\(n \geq 2\), suppose that \(w_1 \leq w_2 \leq \cdots \leq w_n\) where
\(w_1\) to \(w_n\) are the weights of the letters.
Call~\svar{V} the parent of the letters with frequencies~\(w_1\)
and~\(w_2\).
From the lemma, we know that the leaf nodes containing the letters
with frequencies~\(w_1\) and~\(w_2\) are as deep as any nodes
in~\cvar{T}.
If any other leaf nodes in the tree were deeper, we could reduce their 
weighted path length by swapping them with \(w_1\) or \(w_2\).
But the lemma tells us that no such deeper nodes exist.
Call \(\cvar{T}'\) the Huffman tree that is identical to \cvar{T} except
that node \svar{V} is replaced with a leaf node \(\svar{V}\,'\) whose
weight is \(w_1 + w_2\).
By the induction hypothesis, \(\cvar{T}'\) has minimum external path
length.
Returning the children to \(\svar{V}\,'\) restores tree \cvar{T}, which
must also have minimum external path length.
\end{itemize}

Thus by mathematical induction, function \Cref{buildHuff} creates the
Huffman tree with minimum external path length.
\index{proof!induction|)}
\end{proof}

\subsection{Assigning and Using Huffman Codes}

Once the Huffman tree has been constructed, it is an easy
matter to assign codes to individual letters.
Beginning at the root, we assign either a `0' or a `1' to each edge in
the tree.
`0' is assigned to edges connecting a node with its left child,
and `1' to edges connecting a node with its right child.
This process is illustrated by  Figure~\ref{HuffCode}.
The Huffman code for a letter is simply a binary number determined by
the path from the root to the leaf corresponding to that letter.
Thus, the code for E is `0' because the path
from the root to the leaf node for~E takes a single left branch.
The code for K is `111101' because the path to the node for~K
takes four right branches, then a left, and finally one last right.
Figure~\ref{TheCodes} lists the codes for all eight letters.

\begin{mytable}
\begin{center}
\begin{tabular}{c|c|l|c}
\multicolumn{1}{c}{\textbf{Letter}} &
\multicolumn{1}{|c}{\textbf{Freq}} &
\multicolumn{1}{|c}{\textbf{Code}}  &
\multicolumn{1}{|c}{\textbf{Bits}}\\
\hline
C & 32 & 1110 & 4\\
D & 42 & 101 & 3\\
E & 120 & 0 & 1\\
K & 7 & 111101 & 6\\
L & 42 & 110 & 3\\
M & 24 & 11111 & 5\\
U & 37 & 100 & 3\\
Z & 2 & 111100 & 6\\
\end{tabular}
\end{center}
\vspace{-\bigskipamount}
\vspace{-\medskipamount}

\capt{4.5in}
{The Huffman codes for the letters of Figure~\protect\ref{FreqExamp}}
{The Huffman codes for the letters of Figure~\protect\ref{FreqExamp}.}
{TheCodes}
\vspace{-\medskipamount}
\end{mytable}

Given codes for the letters, it is a simple matter to
use these codes to encode a text message.
We simply replace each letter in the string with its binary code.
A lookup table can be used for this purpose.

\begin{example}
Using the code generated by our example Huffman tree, the word
``DEED'' is represented by the bit string ``10100101''
and the word ``MUCK'' is represented by the bit string
``111111001110111101.''
\end{example}

Decoding the message is done by looking at the bits in the coded
string from left to right until a letter is decoded.
This can be done by using the Huffman tree in a reverse process
from that used to generate the codes.
Decoding a bit string begins at the root of the tree.
We take branches depending on the bit value --- left for `0' and right
for `1' --- until reaching a leaf node.
This leaf contains the first character in the message.
We then process the next bit in the code restarting at the root
to begin the next character.

\begin{example}
To decode the bit string ``1011001110111101'' we begin at
the root of the tree and take a right branch for the first bit which
is~`1.'
Because the next bit is a `0' we take a left branch.
We then take another right branch (for the third bit~`1'), arriving at
the leaf node corresponding to the letter~D.
Thus, the first letter of the coded word is~D.
We then begin again at the root of the tree to
process the fourth bit, which is a~`1.'
Taking a right branch, then two left branches (for the next two bits
which are~`0'), we reach the leaf node corresponding to the letter~U.
Thus, the second letter is~U.
In similar manner we complete the decoding process to find that the
last two letters are~C and~K, spelling the word ``DUCK.''
\end{example}

\index{huffman coding tree@Huffman coding tree!prefix property|(}
A set of codes is said to meet
the \defit{prefix property} if no code in the set is the prefix
of another.
The prefix property guarantees that there will be no ambiguity
in how a bit string is decoded.
In other words, once we reach the last bit of a code during the
decoding process, we know which letter it is the code for.
Huffman codes certainly have the prefix property because any prefix
for a code would correspond to an internal node, while all codes
correspond to leaf nodes.
For example, the code for M is `11111.'
Taking five right branches in the Huffman tree of
Figure~\ref{HuffCode} brings us to the leaf node containing~M.
We can be sure that no letter can have code `111' because this
corresponds to an internal node of the tree, and the tree-building
process places letters only at the leaf nodes.
\index{huffman coding tree@Huffman coding tree!prefix property|)}

How efficient is Huffman coding?
In theory, it is an optimal coding method whenever the true
frequencies are known, and the frequency of a letter is independent of
the context of that letter in the message.
In practice, the frequencies of letters in an English text document do
change depending on context.
For example, while E is the most commonly used letter of the
alphabet in English documents, T~is more common as the first letter
of a word.
This is why most commercial compression utilities do not use Huffman
coding as their primary coding method, but instead use techniques that
take advantage of the context for the letters.

Another factor that affects the compression efficiency of Huffman
coding is the relative frequencies of the letters.
Some frequency patterns will save no space as compared to fixed-length
codes; others can result in great compression.
In general, Huffman coding does better when there is
large variation in the frequencies of letters.
In the particular case of the frequencies shown in
Figure~\ref{TheCodes},
we can determine the expected savings from Huffman coding if the
actual frequencies of a coded message match the expected frequencies.

\begin{example}
Because the sum of the frequencies in
Figure~\ref{TheCodes} is 306 and E has frequency~120, we expect it to
appear 120~times in a message containing 306~letters.
An actual message might or might not meet this expectation.
Letters D, L, and U have code lengths of three, and together are
expected to appear 121 times in 306 letters.
Letter C has a code length of four, and is expected to appear 32
times in 306 letters.
Letter M has a code length of five, and is expected to appear 24
times in 306 letters.
Finally, letters K and Z have code lengths of six, and
together are expected to appear only 9 times in 306 letters.
The average expected cost per character is simply the sum of the cost
for each character (\(c_i\)) times the probability of its occurring
(\(p_i\)), or
\[c_1 p_1 + c_2 p_2 + \cdots + c_n p_n.\]
\noindent This can be reorganized as
\[\frac{c_1 f_1 + c_2 f_2 + \cdots + c_n f_n}{f_T}\]
\noindent where \(f_i\) is the (relative) frequency of letter \(i\) and
\(f_T\) is the total for all letter frequencies.
For this set of frequencies, the expected cost per letter is
\[ [(1 \times 120) + (3 \times 121) + (4 \times 32) +
    (5 \times 24) + (6 \times 9)]/306 = 785/306 \approx 2.57 \]
A fixed-length code for these eight characters would require
\(\log 8 = 3\) bits per letter as opposed to about 2.57 bits per
letter for Huffman coding.
Thus, Huffman coding is expected to save about 14\% for this set of
letters.
\end{example}

Huffman coding for all ASCII symbols should do
better than this.
The letters of Figure~\ref{TheCodes} are atypical in that there are
too many common letters compared to the number of rare letters.
Huffman coding for all 26 letters would yield an expected cost of 4.29
bits per letter.
The equivalent fixed-length code would require about five bits.
This is somewhat unfair to fixed-length coding because there is
actually room for 32 codes in five bits, but only 26 letters.
More generally, Huffman coding of a typical text file will save around
40\% over ASCII coding if we charge ASCII coding at eight bits per
character.
Huffman coding for a binary file (such as a compiled executable) would
have a very different set of distribution frequencies and so would
have a different space savings.
Most commercial compression programs use two or three
coding schemes to adjust to different types of files.

In the preceding example, ``DEED'' was coded in 8 bits, a saving of
33\% over the twelve bits required from a fixed-length coding.
However, ``MUCK'' requires 18 bits, more space than required by the
corresponding fixed-length coding.
The problem is that ``MUCK'' is composed of letters that are not
expected to occur often.
If the message does not match the expected frequencies of the
letters, than the length of the encoding will not be as expected
either.\index{text compression|)}
\index{huffman coding tree@Huffman coding tree|)}

\subsection{Search in Huffman Trees}

When we decode a character using the Huffman coding tree, we follow a
path through the tree dictated by the bits in the code string.
Each `0' bit indicates a left branch while each `1' bit indicates a
right branch.
Now look at Figure~\ref{HuffCode} and consider this structure in terms
of searching for a given letter (whose key value is its Huffman code).
We see that all letters with codes beginning with '0' are stored in
the left branch, while all letters with codes beginning with `1' are
stored in the right branch.
Contrast this with storing records in a BST.
There, all records with key value less than the root value are stored
in the left branch, while all records with key values greater than the
root are stored in the right branch.

If we view all records stored in either of these structures as
appearing at some point on a number line representing the key space,
we can see that the splitting behavior of these two structures is very
different.
The BST splits the space based on the key values as they are
encountered when going down the tree.
But the splits in the key space are predetermined for the Huffman
tree.
Search tree structures whose splitting points in the key space are
predetermined are given the special name \defit{trie}\index{trie} to
distinguish them from the type of search tree (like the BST) whose
splitting points are determined by the data.
Tries are discussed in more detail in Chapter~\ref{AdvTree}.
