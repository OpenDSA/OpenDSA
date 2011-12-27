<ODSAsettitle>Binary Tree Space Requirements</ODSAsettitle>
<ODSAprereq "BinTreeNodeADT" />
<ODSAFullTheorem" />

<p>
This module presents techniques for calculating the amount of
overhead required by a binary tree, based on its node implementation.
Recall that overhead is the amount of space necessary to maintain the
data structure.
In other words, it is any space not used to store data records.
The amount of overhead depends on several factors including which
nodes store data values (all nodes, or just the leaves),
whether the leaves store child pointers, and whether the tree is a
full binary tree.
</p>

<p>
In a simple pointer-based implementation for the binary tree such
as that of Figure <ODSAref "BinNodeClass" />, every node has two
pointers to its children (even when the children are NULL).
This implementation requires total space amounting to
<i>n</i>(2<i>P</i> + <i>D</i>) for a tree of <i>n</i> nodes.
Here, <i>P</i> stands for the amount of space required by a pointer,
and <i>D</i> stands for the amount of space required by a data value.
The total overhead space will be 2<i>Pn</i> for the entire tree.
Thus, the overhead fraction will be 2<i>P</i>/(2<i>P</i> + <i>D</i>).
The actual value for this expression depends on the relative size of
pointers versus data fields.
If we arbitrarily assume that <i>P</i> = <i>D</i>, then a full tree
has about two thirds of its total space taken up in overhead.
Worse yet, Theorem <ODSAref "SubTreeThrm" />
tells us that about half of the
pointers are ``wasted'' NULL values that serve only to indicate tree
structure, but which do not provide access to new data.
</p>

<p>
In Java, the most typical
implementation is not to store any actual
data in a node, but rather a pointer to the data record.
In this case, each node will typically store three pointers, all of
which are overhead, resulting in an overhead fraction of
3<i>P</i>/(3<i>P</i> + <i>D</i>).
</p>

<p>
If only leaves store data values, then the fraction of total space
devoted to overhead depends on whether the tree is
full.
If the tree is not full, then conceivably there might only be one leaf
node at the end of a series of internal nodes.
Thus, the overhead can be an arbitrarily high percentage for non-full
binary trees.
The overhead fraction drops as the tree becomes closer to full,
being lowest when the tree is truly full.
In this case, about one half of the nodes are internal.
</p>

<p>
Great savings can be had by eliminating the pointers from leaf
nodes in full binary trees.
Again assume the tree stores a pointer to the data field.
Because about half of the nodes are leaves and half internal nodes,
and because only internal nodes now have child pointers, the
overhead fraction in this case will be approximately
</p>

<img src="http://www.forkosh.com/mathtex.cgi?
\frac{\frac{n}{2} (2P)}{\frac{n}{2} (2P) + Dn} = \frac{P}{P + D}."
   alt="" border=0 align="middle">.

<p>
If <i>P</i> = <i>D</i>, the overhead drops to about one half of the
total space.
However, if only leaf nodes store useful information, the overhead
fraction for this implementation is actually three quarters of the
total space, because half of the ``data'' space is unused.
</p>

<p>
If a full binary tree needs to store data only
at the leaf nodes, a better implementation would have
the internal nodes store two pointers and no data
field while the leaf nodes store only a pointer to the data field.
This implementation requires
<img src="http://www.forkosh.com/mathtex.cgi?
\frac{n}{2}2P + \frac{n}{2}(p+d)\)"
   alt="" border=0 align="middle">.
units of space.
If <i>P</i> = <i>D</i>, then the overhead is
3<i>P</i>/(3<i>P</i> + <i>D</i>) = 3/4.
It might seem counter-intuitive that the overhead ratio has gone up
while the total amount of space has gone down.
The reason is because we have changed our definition of "data" to
refer only to what is stored in the leaf nodes,
so while the overhead fraction is higher, it is from a
total storage requirement that is lower.
</p>

<p>
There is one serious flaw with this analysis.
When using separate implementations for internal and leaf nodes,
there must be a way to distinguish between the node types.
When separate node types are implemented via Java subclasses,
the runtime environment stores information with
each object allowing it to determine, for example, the correct
subclass to use when the <tt>isLeaf</tt> virtual function
is called.
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
In any other situation, such "bit packing" tricks should be
avoided because they are difficult to debug and understand at
best, and are often machine dependent at worst.
</p>

<p class="footnote">
In the early to mid 1980s, I worked on a Geographic
Information System that stored spatial data in quadtrees
At the time space was a critical resource, so we used a bit-packing
approach where we stored the nodetype flag as the last bit in the
parent node's pointer.
This worked perfectly on various 32-bit workstations.
Unfortunately, in those days IBM PC-compatibles used 16-bit pointers.
We never did figure out how to port our code to the 16-bit machine.
</p>
