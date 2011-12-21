<ODSAtitle "Binary Tree Implementation">
<ODSAprereq "BinTree">

\index{binary tree!node|(}
In this section we examine ways to implement binary tree nodes.
We begin with some options for pointer-based
binary tree node implementations.
Then comes a discussion on techniques for determining the space
requirements for a given
implementation.\index{binary tree!space requirements} 
The section concludes with an introduction to the 
array-based implementation for complete binary trees.

\subsection{Pointer-Based Node Implementations}
\label{PointerBin}

By definition, all binary tree nodes have two children,
though one or both children can be empty.
Binary tree nodes typically contain a value field,
with the type of the field depending on the application.
The most common node implementation includes a value field and
pointers to the two children.

Figure~\ref{BinNodeClass} shows a simple implementation for the
\Cref{BinNode} abstract class, which we will name \Cref{BSTNode}.
Class \Cref{BSTNode} includes a data member of type \Cref{E},
(which is the second \Gen\ parameter) for the element type.
To support search structures such as the Binary Search Tree, an
additional field is included, with corresponding access methods,
to store a key value
(whose purpose is explained in Section~\ref{Dictionary}).
Its type is determined by the first \Gen\ parameter, named
\Cref{Key}.
Every \Cref{BSTNode} object also has two pointers,
one to its left child and another to its right child.
\ifthenelse{\boolean{cpp}}
{Overloaded \Cref{new} and \Cref{delete} operators could be added to
support a freelist,
as described in Section~\ref{freelist}.}
{}Figure~\ref{BinStPic}
illustrates the \Cref{BSTNode} implementation.

\begin{figure}
\xprogfig{BSTNode.book}
\vspace{-\bigskipamount}
\vspace{-\smallskipamount}

\capt{4.5in}{A binary tree node class implementation}
{A binary tree node class implementation.}{BinNodeClass}
\vspace{-\smallskipamount}

\end{figure}

\begin{figure}
\pdffig{BinLink}
\vspace{-\bigskipamount}\vspace{-\medskipamount}

\capt{4.5in}{Binary tree node implementation}
{Illustration of a typical pointer-based binary tree implementation,
where each node stores two child pointers and a value.}{BinStPic}
\end{figure}

Some programmers find it convenient to add a pointer to the
node's parent, allowing easy upward movement in the
tree.\index{binary tree!parent pointer}
Using a parent pointer is somewhat analogous to adding a link to the
previous node in a doubly linked list.\index{list!doubly linked}
In practice, the parent pointer is almost always unnecessary
and adds to the space overhead for the tree implementation.
It is not just a problem that parent pointers take space.
More importantly, many uses of the parent pointer are driven by
improper understanding of recursion and so indicate poor programming.
If you are inclined toward using a parent pointer, consider if there
is a more efficient implementation possible.

\index{object-oriented programming!class hierarchy|(}
An important decision in the design of a pointer-based node
implementation is whether the same class definition will be used for
leaves and internal nodes.
Using the same class for both will simplify the implementation, but
might be an inefficient use of space.
Some applications require data values only for the leaves.
Other applications require one type of value for the leaves and
another for the internal nodes.
Examples include the binary trie of Section~\ref{Trie},\index{trie}
the \PRquad\ of Section~\ref{Spatial},\index{pr quadtree@\PRquad}
the Huffman coding tree\index{huffman coding tree@Huffman coding tree}
of Section~\ref{Huffman}, and the expression
tree\index{expression tree} illustrated by Figure~\ref{DiffNodes}. 
By definition, only internal nodes have non-empty children.
If we use the same node implementation for both internal and leaf
nodes, then both must store the child pointers.
But it seems wasteful to store child pointers in the leaf nodes.
Thus, there are many reasons why it can save space to have separate
implementations for internal and leaf nodes.

\begin{figure}
\pdffig{DiffNode}
\vspace{-\bigskipamount}\vspace{-\bigskipamount}
\vspace{-\medskipamount}

\capt{4.5in}{Expression Tree}
{An expression tree\index{expression tree} for \(4x(2x + a) - c\).}{DiffNodes}
\vspace{-\medskipamount}
\end{figure}

\index{expression tree|(}
As an example of a tree that stores different information at the leaf
and internal nodes, consider the expression tree illustrated by
Figure~\ref{DiffNodes}.\index{expression tree}
The expression tree represents an algebraic
expression\index{equation, representation}
composed of binary operators such as addition, subtraction,
multiplication, and division.
Internal nodes store operators, while the leaves store operands.
The tree of Figure~\ref{DiffNodes} represents the expression
\(4x(2x~+~a)~-~c\).
The storage requirements for a leaf in an expression tree are quite
different from those of an internal node.
Internal nodes store one of a small set of operators,
so internal nodes could store a small code identifying the
operator such as a single byte for the operator's character symbol.
In contrast, leaves store variable names or numbers,
which is considerably larger in order
to handle the wider range of possible values.
At the same time, leaf nodes need not store child pointers.

\Lang\ allows us to differentiate leaf from internal
nodes through the use of class inheritance.\index{inheritance}
A \defit{base class} provides a general definition for an object,
and a \defit{subclass} modifies a base class to add more detail.
A base class can be declared for binary tree nodes in general,
with subclasses defined for the internal and leaf nodes.
The base class of Figure~\ref{VarNodeI} is named \Cref{VarBinNode}.
It includes a virtual member function named
\Cref{isLeaf}, which indicates the node type.
Subclasses for the internal and leaf node types each implement
\Cref{isLeaf}.
Internal nodes store child pointers of the base class type; they do not
distinguish their children's actual subclass.
Whenever a node is examined, its version of \Cref{isLeaf} indicates
the node's subclass.

\begin{figure}
\xprogfig{VarBinNode.book}

\bigskip
\xprogfig{VarLeafNode.book}

\bigskip
\xprogfig{VarIntlNode.book}

\bigskip
\xprogfig{traverse.book}

\capt{4.5in}{Separate internal and leaf node representations:
inheritance}{An implementation for separate internal and leaf node
representations using \Lang\ class inheritance\index{inheritance}
and virtual functions.}{VarNodeI}
\smallskip
\end{figure}

Figure~\ref{VarNodeI} includes two subclasses derived from class
\Cref{VarBinNode}, named \Cref{LeafNode} and \Cref{IntlNode}.
Class \Cref{IntlNode} can access its children through
pointers of type \Cref{VarBinNode}.
Function \Cref{traverse} illustrates the use of these classes.
When \Cref{traverse} calls method \Cref{isLeaf},
\Lang's runtime environment
determines which subclass this particular instance of \Cref{rt}
happens to be and calls that subclass's version of \Cref{isLeaf}.
Method \Cref{isLeaf} then provides the actual node type to its caller.
The other member functions for the derived subclasses are accessed by
type-casting the base class pointer as appropriate, as shown in
function \Cref{traverse}.

There is another approach that we can take to represent separate leaf
and internal nodes, also using a virtual base class and separate node
classes for the two types.
This is to implement nodes using the
\defit{composite design pattern}.\index{design pattern!composite}
This approach is noticeably different from the one of
Figure~\ref{VarNodeI} in that the node classes themselves implement
the functionality of \Cref{traverse}.
Figure~\ref{VarNodeC} shows the implementation.
Here, base class \Cref{VarBinNode} declares a member function
\Cref{traverse} that each subclass must implement.
Each subclass then implements its own appropriate behavior for its
role in a traversal.
The whole traversal process is called by invoking \Cref{traverse} on
the root node, which in turn invokes \Cref{traverse} on its children.

\begin{figure}
\xprogfig{VarBinNodeC.book}

\bigskip
\xprogfig{VarLeafNodeC.book}

\bigskip
\xprogfig{VarIntlNodeC.book}

\bigskip
\xprogfig{traverseC.book}

\capt{4.5in}{Separate internal and leaf node representations:
composite}{A second implementation for separate internal and leaf node
representations using \Lang\ class inheritance\index{inheritance}
and virtual functions using the composite design pattern.
Here, the functionality of \Cref{traverse} is
embedded into the node subclasses.}{VarNodeC}
\end{figure}

When comparing the implementations of Figures~\ref{VarNodeI}
and~\ref{VarNodeC}, each has advantages and disadvantages.
The first does not require that the node classes know about
the \Cref{traverse} function.\index{traversal!binary tree}
With this approach, it is easy to add new methods to the tree class
that do other traversals or other operations on nodes of the tree.
However, we see that \Cref{traverse} in Figure~\ref{VarNodeI} does
need to be familiar with each node subclass.
Adding a new node subclass would therefore require modifications to
the \Cref{traverse} function.
In contrast, the approach of Figure~\ref{VarNodeC} requires that any
new operation on the tree that requires a traversal also be
implemented in the node subclasses.
On the other hand, the approach of Figure~\ref{VarNodeC}
avoids the need for the \Cref{traverse} function to know
anything about the distinct abilities of the node subclasses.
Those subclasses handle the responsibility of performing a traversal
on themselves.
A secondary benefit is that there is no need for \Cref{traverse} to
explicitly enumerate all of the different node subclasses,
directing appropriate action for each.
With only two node classes this is a minor point.
But if there were many such subclasses, this could become a bigger
problem.
A disadvantage is that the traversal operation must not be called on a
\NULL\ pointer, because there is no object to catch the call.
This problem could be avoided by using a flyweight (see
Section~\ref{FlyweightPatt}) to implement empty
nodes.\index{design pattern!flyweight}

Typically, the version of Figure~\ref{VarNodeI} would be preferred in
this example if \Cref{traverse} is a member function of
the tree class, and if the node subclasses are hidden from users of
that tree class.
On the other hand, if the nodes are objects that have meaning
to users of the tree separate from their existence as nodes in the
tree, then the version of Figure~\ref{VarNodeC} might be preferred
because hiding the internal behavior of the nodes becomes more
important.

Another advantage of the composite design is that implementing each
node type's functionality might be easier.
This is because you can focus solely on the information passing and
other behavior needed by this node type to do its job.
This breaks down the complexity that many programmers feel overwhelmed
by when dealing with complex information flows related to recursive
processing.
\index{object-oriented programming!class hierarchy|)}
\index{expression tree|)}
\index{binary tree!node|)}

\ifthenelse{\boolean{java}}{\newpage}{}

\subsection{Space Requirements}

\index{binary tree!space requirements|(}
\index{binary tree!overhead}
This section presents techniques for calculating the amount of
overhead required by a binary tree implementation.
Recall that overhead is the amount of space necessary to maintain the
data structure.
In other words, it is any space not used to store data records.
The amount of overhead depends on several factors including which
nodes store data values (all nodes, or just the leaves),
whether the leaves store child pointers, and whether the tree is a
full binary tree.

In a simple pointer-based implementation for the binary tree such as
that of Figure~\ref{BinNodeClass}, every node has two pointers to its
children (even when the children are \NULL).
This implementation requires total space amounting to \(n(2P + D)\) for
a tree of \(n\)~nodes.
Here, \(P\)~stands for the amount of space required by a pointer, and
\(D\) stands for the amount of space required by a data value.
The total overhead space will be \(2Pn\) for the entire tree.
Thus, the overhead fraction will be \(2P/(2P + D)\).
The actual value for this expression depends on the relative size of
pointers versus data fields.
If we arbitrarily assume that \(P = D\), then a full tree
has about two thirds of its total space taken up in overhead.
Worse yet, Theorem~\ref{SubTreeThrm}\index{full binary tree theorem}
tells us that about half of the
pointers are ``wasted'' \NULL\ values that serve only to indicate tree
structure, but which do not provide access to new data.

\ifthenelse{\boolean{cpp}}{A common}{}
\ifthenelse{\boolean{java}}{In Java, the most typical}{}
implementation is not to store any actual
data in a node, but rather a \pointref\ to the data record.
In this case, each node will typically store three pointers, all of
which are overhead, resulting in an overhead fraction of
\(3P/(3P + D)\).

If only leaves store data values, then the fraction of total space
devoted to overhead depends on whether the tree is
full.\index{binary tree!full} 
If the tree is not full, then conceivably there might only be one leaf
node at the end of a series of internal nodes.
Thus, the overhead can be an arbitrarily high percentage for non-full
binary trees.
The overhead fraction drops as the tree becomes closer to full,
being lowest when the tree is truly full.
In this case, about one half of the nodes are internal.

Great savings can be had by eliminating the pointers from leaf
nodes in full binary trees.
Again assume the tree stores a \pointref\ to the data field.
Because about half of the nodes are leaves and half internal nodes,
and because only internal nodes now have child pointers, the
overhead fraction in this case will be approximately
\[\frac{\frac{n}{2} (2P)}{\frac{n}{2} (2P) + Dn} = \frac{P}{P + D}.\]
\noindent If \(P = D\), the overhead drops to about one half of the
total space.
However, if only leaf nodes store useful information, the overhead
fraction for this implementation is actually three quarters of the
total space, because half of the ``data'' space is unused.

If a full binary tree\index{binary tree!full} needs to store data only
at the leaf nodes, a better implementation would have
the internal nodes store two pointers and no data
field while the leaf nodes store only a \pointref\ to the data field.
This implementation requires
\(\frac{n}{2}2P + \frac{n}{2}(p+d)\) units of space.
If \(P = D\), then the overhead is \(3P/(3P + D) = 3/4\).
It might seem counter-intuitive that the overhead ratio has gone up
while the total amount of space has gone down.
The reason is because we have changed our definition of ``data'' to
refer only to what is stored in the leaf nodes,
so while the overhead fraction is higher, it is from a
total storage requirement that is lower.

There is one serious flaw with this analysis.
When using separate implementations for internal and leaf nodes,
there must be a way to distinguish between the node types.
When separate node types are implemented via \Lang\ subclasses,
the runtime environment stores information with
each object allowing it to determine, for example, the correct
subclass to use when the \Cref{isLeaf} virtual function\index{virtual
function} is called.\index{inheritance}
Thus, each node requires additional space.
Only one bit is truly necessary to distinguish the two possibilities.
In rare applications where space is a critical resource,
implementors can often find a spare bit within the node's value field
in which to store the node type indicator.
An alternative is to use a spare bit within a node pointer to
indicate node type.
For example, this is often possible when the compiler requires that
structures and objects start on word boundaries, leaving the last bit
of a pointer value always zero.
Thus, this bit can be used to store the node-type flag and is reset to
zero before the pointer is dereferenced.
Another alternative when the leaf value field is smaller than a
pointer is to replace the pointer to a leaf with that leaf's value.
When space is limited, such techniques can make the difference between
success and failure.
In any other situation, such ``bit packing'' tricks should be
avoided because they are difficult to debug and understand at
best, and are often machine dependent at worst.\footnote{In
the early to mid 1980s, I worked on a Geographic
Information System that stored spatial data in quadtrees
(see Section~\ref{Spatial}).
At the time space was a critical resource, so we used a bit-packing
approach where we stored the nodetype flag as the last bit in the
parent node's pointer.
This worked perfectly on various 32-bit workstations.
Unfortunately, in those days IBM PC-compatibles used 16-bit pointers.
We never did figure out how to port our code to the 16-bit machine.}
\index{binary tree!space requirements|)}

\ifthenelse{\boolean{cpp}}{\newpage}{}

\subsection{Array Implementation for Complete Binary Trees}
\label{Complete}

\index{binary tree!complete}
The previous section points out that a large
fraction of the space in a typical binary tree node implementation is
devoted to structural overhead, not to storing data.
This section presents a simple, compact implementation
for complete binary trees.
Recall that complete binary trees have all levels except the bottom
filled out completely, and the bottom level has all of its nodes filled
in from left to right.
Thus, a complete binary tree of \(n\)~nodes has only one possible shape.
You might think that a complete binary tree is such an unusual
occurrence that there is no reason to develop a special
implementation for it.
However, the complete binary tree has practical uses, the most
important being the heap\index{heap} data structure discussed in
Section~\ref{HeapSec}.
Heaps are often used to implement priority queues\index{priority queue}
(Section~\ref{HeapSec}) and for external sorting algorithms
(Section~\ref{RepSelSec}).\index{sorting!external}

We begin by assigning numbers to the node positions in the complete
binary tree, level by level, from left to right as shown in
Figure~\ref{BinArray}(a). 
An array can store the tree's data values efficiently, placing
each data value in the array position corresponding to that node's
position within the tree.
Figure~\ref{BinArray}(b) lists the array indices for the
children, parent, and siblings of each node in
Figure~\ref{BinArray}(a).
From Figure~\ref{BinArray}(b), you should see a pattern regarding the
positions of a node's relatives within the array.
Simple formulas can be derived for calculating the array index
for each relative of a node \(r\) from \(r\)'s index.
No explicit pointers are necessary to reach a node's left or
right child.
This means there is no overhead to the array implementation if the
array is selected to be of size \(n\) for a tree of \(n\) nodes.

\begin{figure}
\pdffig{BinArray}
\vspace{-\bigskipamount}
\vspace{-\smallskipamount}

\begin{center}
\sffamily
\begin{tabular}{|c|c|c|c|c|c|c|c|c|c|c|c|c|}
\hline
Position      & 0  & 1 & 2 & 3 &  4 &  5 & 6 & 7 & 8 &  9 & 10 & 11\\
\hline
\hline
Parent        & \,--\, & 0 & 0 & 1 &  1 &  2 &  2 & 3 & 3 & 4 & 4 &  5\\
\hline
Left Child    & 1  & 3 & 5 & 7 &  9 & 11 & \,--\, & \,--\, & \,--\, & \,--\, & \,--\, &  \,--\,\\
\hline
Right Child   & 2  & 4 & 6 & 8 & 10 & \,--\, & \,--\, & \,--\, & \,--\, & \,--\, & \,--\, &  \,--\,\\
\hline
Left Sibling  & \,--\, & \,--\, & 1 & \,--\, &  3 & \,--\, & 5 & \,--\, & 7 & \,--\, &  9 &  \,--\,\\
\hline
Right Sibling & \,--\, & 2 & \,--\, & 4 & \,--\, &  6 & \,--\, & 8 & \,--\, & 10 & \,--\, & \,--\,\\
\hline
\end{tabular}
\end{center}

\vspace{-\bigskipamount}
\vspace{-\medskipamount}
\begin{center}
{\textsf{\footnotesize (b)}}
\end{center}

\capt{4.5in}{Complete binary tree stored in an array}
{A complete binary tree and its array implementation.
(a)~The complete binary tree with twelve nodes.
Each node has been labeled with its position in the tree.
(b)~The positions for the relatives of each node.
A dash indicates that the relative does not exist.}
{BinArray}
\bigskip
\end{figure}

The formulae for calculating the array indices of the various
relatives of a node are as follows.
The total number of nodes in the tree is \(n\).
The index of the node in question is \(r\),
which must fall in the range 0 to \(n-1\).\index{binary tree!complete}

\begin{itemize}
\item
Parent\((r) = \lfloor(r - 1)/2\rfloor\) if \(r \neq 0\).
\item
Left child\((r) = 2r + 1\) if \(2r + 1 < n\).
\item
Right child\((r) = 2r + 2\) if \(2r + 2 < n\).
\item
Left sibling\((r) = r - 1\) if \(r\) is even.
\item
Right sibling\((r) = r + 1\) if \(r\) is odd and \(r + 1 < n\).
\end{itemize}
