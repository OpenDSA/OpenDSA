<ODSAtitle>Binary Tree Node Implementations</ODSAtitle>
<ODSAprereq "DesignPatterns />
<ODSAprereq "Dictionary" />
<ODSAprereq "BinTree" />
<ODSAprereq "BinTreeNodeADT" />
<ODSAprereq "BinTreeTraversal" />

<p>
In this module we examine various ways to implement binary tree
nodes.
By definition, all binary tree nodes have two children,
though one or both children can be empty.
Binary tree nodes typically contain a value field,
with the type of the field depending on the application.
The most common node implementation includes a value field and
pointers to the two children.
</p>

<p>
Figure <ODSAref "BinNodeClass" /> shows a simple implementation for the
<tt>BinNode</tt> abstract class, which we will name <tt>BSTNode</tt>.
Class <tt>BSTNode</tt> includes a data member of type <tt>E</tt>,
(which is the second generic parameter) for the element type.
To support search structures such as the Binary Search Tree, an
additional field is included, with corresponding access methods,
to store a key value
(whose purpose is explained in Module <ODSAref "Dictionary" />).
Its type is determined by the first generic parameter, named
<tt>Key</tt>.
Every <tt>BSTNode</tt> object also has two pointers,
one to its left child and another to its right child.
Figure <ODSAref "BinStPic" />
illustrates the <tt>BSTNode</tt> implementation.
</p>

<pre>
/** Binary tree node implementation: Pointers to children
    @param E The data element
    @param Key The associated key for the record */
class BSTNode<Key, E> implements BinNode<E> {
  private Key key;              // Key for this node
  private E element;            // Element for this node
  private BSTNode<Key,E> left;  // Pointer to left child
  private BSTNode<Key,E> right; // Pointer to right child

  /** Constructors */
  public BSTNode() {left = right = null; }
  public BSTNode(Key k, E val)
  { left = right = null; key = k; element = val; }
  public BSTNode(Key k, E val,
                 BSTNode<Key,E> l, BSTNode<Key,E> r)
  { left = l; right = r; key = k; element = val; }

  /** Get and set the key value */
  public Key key() { return key; }
  public void setKey(Key k) { key = k; }

  /** Get and set the element value */
  public E element() { return element; }
  public void setElement(E v) { element = v; }

  /** Get and set the left child */
  public BSTNode<Key,E> left() { return left; }
  public void setLeft(BSTNode<Key,E> p) { left = p; }

  /** Get and set the right child */
  public BSTNode<Key,E> right() { return right; }
  public void setRight(BSTNode<Key,E> p) { right = p; }

  /** @return True if a leaf node, false otherwise */
  public boolean isLeaf()
  { return (left == null) && (right == null); }
}
</pre>

<p class="caption">
<ODSAfig "BinStPic" />
A binary tree node class implementation.
</p>

<center>
<img src="Images/BinLink.png" alt="Binary tree node implementation" />
</center>

<p class="caption">
<ODSAfig "BinLink" />
Illustration of a typical pointer-based binary tree implementation,
where each node stores two child pointers and a value.
</p>

<p>
Some programmers find it convenient to add a pointer to the
node's parent, allowing easy upward movement in the
tree.
Using a parent pointer is somewhat analogous to adding a link to the
previous node in a doubly linked list.
In practice, the parent pointer is almost always unnecessary
and adds to the space overhead for the tree implementation.
It is not just a problem that parent pointers take space.
More importantly, many uses of the parent pointer are driven by
improper understanding of recursion and so indicate poor programming.
If you are inclined toward using a parent pointer, consider if there
is a more efficient implementation possible.
</p>

<p>
An important decision in the design of a pointer-based node
implementation is whether the same class definition will be used for
leaves and internal nodes.
Using the same class for both will simplify the implementation, but
might be an inefficient use of space.
Some applications require data values only for the leaves.
Other applications require one type of value for the leaves and
another for the internal nodes.
Examples include the binary trie, the PR Quadtree, 
the Huffman coding tree, and the expression tree illustrated by
Figure <ODSAref "DiffNodes" />. 
By definition, only internal nodes have non-empty children.
If we use the same node implementation for both internal and leaf
nodes, then both must store the child pointers.
But it seems wasteful to store child pointers in the leaf nodes.
Thus, there are many reasons why it can save space to have separate
implementations for internal and leaf nodes.
</p>

<center>
<img src="Images/DiffNode.png" alt="Expression Tree" />
</center>

<p class="caption">
<ODSAfig "DiffNodes" />
An expression tree for 4<i>x</i>(2<i>x</i> + <i>a</i>) - <i>c</i>.
</p>

<p>
As an example of a tree that stores different information at the leaf
and internal nodes, consider the expression tree illustrated by
Figure <ODSAref "DiffNodes" />.
The expression tree represents an algebraic
expression\index{equation, representation}
composed of binary operators such as addition, subtraction,
multiplication, and division.
Internal nodes store operators, while the leaves store operands.
The tree of Figure <ODSAref "DiffNodes" /> represents the expression
4<i>x</i>(2<i>x</i> + <i>a</i>) - <i>c</i>.
The storage requirements for a leaf in an expression tree are quite
different from those of an internal node.
Internal nodes store one of a small set of operators,
so internal nodes could store a small code identifying the
operator such as a single byte for the operator's character symbol.
In contrast, leaves store variable names or numbers,
which is considerably larger in order
to handle the wider range of possible values.
At the same time, leaf nodes need not store child pointers.
</p>

<p>
Java allows us to differentiate leaf from internal
nodes through the use of class inheritance.
A <ODSAdef "base class" /> provides a general definition for an
object,
and a <ODSAdef "subclass" /> modifies a base class to add more
detail.
A base class can be declared for binary tree nodes in general,
with subclasses defined for the internal and leaf nodes.
The base class of Figure <ODSAref "VarNodeI" /> is named
<tt>VarBinNode</tt>.
It includes a virtual member function named
<tt>isLeaf</i>, which indicates the node type.
Subclasses for the internal and leaf node types each implement
<tt>isLeaf</tt>.
Internal nodes store child pointers of the base class type;
they do not distinguish their children's actual subclass.
Whenever a node is examined, its version of <tt>isLeaf</tt> indicates
the node's subclass.
</p>

<pre>
/** Base class for expression tree nodes */
public interface VarBinNode {
  public boolean isLeaf(); // All subclasses must implement
}

/** Leaf node */
class VarLeafNode implements VarBinNode {
  private String operand;                 // Operand value

  public VarLeafNode(String val) { operand = val; }
  public boolean isLeaf() { return true; }
  public String value() { return operand; }
};

/** Internal node */
class VarIntlNode implements VarBinNode {
  private VarBinNode left;                // Left child
  private VarBinNode right;               // Right child
  private Character operator;             // Operator value

  public VarIntlNode(Character op,
                     VarBinNode l, VarBinNode r)
    { operator = op; left = l; right = r; }
  public boolean isLeaf() { return false; }
  public VarBinNode leftchild() { return left; }
  public VarBinNode rightchild() { return right; }
  public Character value() { return operator; }
}

/** Preorder traversal */
public static void traverse(VarBinNode rt) {
  if (rt == null) return;          // Nothing to visit
  if (rt.isLeaf())                 // Process leaf node
    Visit.VisitLeafNode(((VarLeafNode)rt).value());
  else {                           // Process internal node
    Visit.VisitInternalNode(((VarIntlNode)rt).value());
    traverse(((VarIntlNode)rt).leftchild());
    traverse(((VarIntlNode)rt).rightchild());
  }
}
</pre>

<p class="caption">
<ODSAfig "VarNodeI" \>
An implementation for separate internal and leaf node
representations using Java class inheritance
and virtual functions.
</p>

<p>
Figure <ODSAref "VarNodeI" \> includes two subclasses derived from
class <tt>VarBinNode</tt>, named <tt>LeafNode</tt> and
<tt>IntlNode</tt>.
Class <tt>IntlNode</tt> can access its children through
pointers of type <tt>VarBinNode</tt>.
Function <tt>traverse</tt> illustrates the use of these classes.
When <tt>traverse</tt> calls method <tt>isLeaf</tt>,
Java's runtime environment
determines which subclass this particular instance of <tt>rt</tt>
happens to be and calls that subclass's version of <tt>isLeaf</tt>.
Method <tt>isLeaf</tt> then provides the actual node type to its
caller.
The other member functions for the derived subclasses are accessed by
type-casting the base class pointer as appropriate, as shown in
function <tt>traverse</tt>.
</p>

<p>
There is another approach that we can take to represent separate leaf
and internal nodes, also using a virtual base class and separate node
classes for the two types.
This is to implement nodes using the
<ODSAdef "composite design pattern" \>.
This approach is noticeably different from the one of
Figure <ODSAref "VarNodeI" \> in that the node classes themselves
implement the functionality of <tt>traverse</tt>.
Figure <ODSAref "VarNodeC" \> shows the implementation.
Here, base class <tt>VarBinNode</tt> declares a member function
<tt>traverse</tt> that each subclass must implement.
Each subclass then implements its own appropriate behavior for its
role in a traversal.
The whole traversal process is called by invoking <tt>traverse</tt>
on the root node, which in turn invokes <tt>traverse</tt> on its
children. 
</p>

<pre>
/** Base class: Composite */
public interface VarBinNode {
  public boolean isLeaf();
  public void traverse();
}

/** Leaf node: Composite */
class VarLeafNode implements VarBinNode {
  private String operand;                 // Operand value

  public VarLeafNode(String val) { operand = val; }
  public boolean isLeaf() { return true; }
  public String value() { return operand; }

  public void traverse() {
    Visit.VisitLeafNode(operand);
  }
}

/** Internal node: Composite */
class VarIntlNode implements VarBinNode { // Internal node
  private VarBinNode left;                // Left child
  private VarBinNode right;               // Right child
  private Character operator;             // Operator value

  public VarIntlNode(Character op,
                     VarBinNode l, VarBinNode r)
    { operator = op; left = l; right = r; }
  public boolean isLeaf() { return false; }
  public VarBinNode leftchild() { return left; }
  public VarBinNode rightchild() { return right; }
  public Character value() { return operator; }

  public void traverse() {
    Visit.VisitInternalNode(operator);
    if (left != null) left.traverse();
    if (right != null) right.traverse();
  }
}

/** Preorder traversal */
public static void traverse(VarBinNode rt) {
  if (rt != null) rt.traverse();
}
</pre>

<p class="caption">
<ODSAfig "VarNodeC" \>
A second implementation for separate internal and leaf node
representations using Java class inheritance
and virtual functions using the composite design pattern.
Here, the functionality of <tt>traverse</tt> is
embedded into the node subclasses.
</p>

<p>
When comparing the implementations of Figures <ODSAref "VarNodeI" \>
and <ODSAref "VarNodeC" \>, each has advantages and disadvantages.
The first does not require that the node classes know about
the <tt>traverse</tt> function.
With this approach, it is easy to add new methods to the tree class
that do other traversals or other operations on nodes of the tree.
However, we see that <tt>traverse</tt> in
Figure <ODSAref "VarNodeI" \> does 
need to be familiar with each node subclass.
Adding a new node subclass would therefore require modifications to
the <tt>traverse</tt> function.
In contrast, the approach of Figure <ODSAref "VarNodeC" \> requires
that any new operation on the tree that requires a traversal also be
implemented in the node subclasses.
On the other hand, the approach of Figure <ODSAref "VarNodeC" \>
avoids the need for the <tt>traverse</tt> function to know
anything about the distinct abilities of the node subclasses.
Those subclasses handle the responsibility of performing a traversal
on themselves.
A secondary benefit is that there is no need for <tt>traverse</tt> to
explicitly enumerate all of the different node subclasses,
directing appropriate action for each.
With only two node classes this is a minor point.
But if there were many such subclasses, this could become a bigger
problem.
A disadvantage is that the traversal operation must not be called on a
NULL pointer, because there is no object to catch the call.
This problem could be avoided by using a flyweight
(see Module <ODSAref "DesignPatterns" \>) to implement empty nodes.
</p>

<p>
Typically, the version of Figure <ODSAref "VarNodeI" \> would be
preferred in this example if <tt>traverse</tt> is a member function of
the tree class, and if the node subclasses are hidden from users of
that tree class.
On the other hand, if the nodes are objects that have meaning
to users of the tree separate from their existence as nodes in the
tree, then the version of Figure <ODSAref "VarNodeC" \> might be
preferred because hiding the internal behavior of the nodes becomes
more important.
</p>

<p>
Another advantage of the composite design is that implementing each
node type's functionality might be easier.
This is because you can focus solely on the information passing and
other behavior needed by this node type to do its job.
This breaks down the complexity that many programmers feel overwhelmed
by when dealing with complex information flows related to recursive
processing.
</p>
