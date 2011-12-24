
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
