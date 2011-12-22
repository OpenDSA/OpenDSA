<ODSAsettitle "Binary Tree Node ADT">
<ODSAprereq "BinTree">

<p>
Just as a linked list is comprised of a collection of link objects, a
tree is comprised of a collection of node objects.
Figure <ODSAref "BinNodeADT"> shows an ADT for binary tree nodes,
called <tt>BinNode</tt>
This class will be used by some of the binary tree structures
presented later.
Class <tt>BinNode</tt> is a generic with parameter <tt>E</tt>,
which is the type for the data record stored in the node.
Member functions are provided that set or return the element value,
set or return a pointer to the left child,
set or return a pointer to the right child,
or indicate whether the node is a leaf.
</p>

<CODE "BinNode.book">

<p class="caption">
<ODSAfig "BinNodeADT">
A binary tree node ADT.
</p>
