<ODSAsettitle>Binary Tree Traversals</ODSAsettitle>
<ODSAprereq "BinTree" />
<ODSAprereq "BinTreeNodeADT" />
<ODSAprereq "DesignPatterns" />

<p>
Often we wish to process a binary tree by "visiting" each of its
nodes, each time performing a specific action such as printing the
contents of the node.
Any process for visiting all of the nodes in some order is
called a <ODSAdef "traversal" />.
Any traversal that lists every node in the tree exactly once is
called an <ODSAdef "enumeration" /> of the tree's nodes.
Some applications do not require that the nodes be visited in any
particular order as long as each node is visited precisely once.
For other applications, nodes must be visited in an order that
preserves some relationship.
For example, we might wish to make sure that we visit any given node
<em>before</em> we visit its children.
This is called a <ODSAdef "preorder traversal" />.
</p>

<p class="example">
The preorder enumeration for the tree of
Figure <ODSAref "BinExample" /> is

<br/>
<b>A B D C E G F H I</b>

<br/>
The first node printed is the root.
Then all nodes of the left subtree are printed (in preorder) before
any node of the right subtree.
</p>

<p>
Alternatively, we might wish to visit each node only
<em>after</em> we visit its children (and their subtrees).
For example, this would be necessary if we wish to return all nodes in 
the tree to free store.
We would like to delete the children of a node before deleting the
node itself.
But to do that requires that the children's children be deleted
first, and so on.
This is called a <ODSAdef "postorder traversal" />.
</p>

<p class="example">
The postorder enumeration for the tree of
Figure <ODSAref "BinExample" />
is <b>D B G E H I F C A</b>.
</p>

<p>
An <ODSAdef "inorder traversal" /> first visits the left child
(including its entire subtree), then visits the node, and finally
visits the right child (including its entire
subtree).
The binary search tree (see Module <ODSAref "BST" />) makes use of this
traversal to print all nodes in ascending order of value.
</p>

<p class="example">
The inorder enumeration for the tree of Figure <ODSAref "BinExample" />
is <b>B D A G E C H F I</b>.
</p>

<p>
A traversal routine is naturally written as a recursive
function.
Its input parameter is a pointer to a node which we will call
<tt>rt</tt> because each node can be viewed as the root of a some
subtree.
The initial call to the traversal function passes in a pointer to the
root node of the tree.
The traversal function visits <tt>rt</tt> and its children (if any) 
in the desired order.
For example, a preorder traversal specifies that <tt>rt</tt> be
visited before its children.
This can easily be implemented as follows.
</p>

<pre>
void preorder(BinNode rt)
{
  if (rt == null) return; // Empty subtree - do nothing
  visit(rt);              // Process root node
  preorder(rt.left());    // Process all nodes in left
  preorder(rt.right());   // Process all nodes in right
}
</pre>

<p>
Function <tt>preorder</tt> first checks that the tree is not
empty (if it is, then the traversal is done and <tt>preorder</tt>
simply returns).
Otherwise, <tt>preorder</tt> makes  a call to <tt>visit</tt>,
which processes the root node (i.e., prints the value or performs
whatever computation as required by the application).
Function <tt>preorder</tt> is then called recursively on the left
subtree, which will visit all nodes in that subtree.
Finally, <tt>preorder</tt> is called on the right subtree,
visiting all nodes in the right subtree.
Postorder and inorder traversals are similar.
They simply change the order in which the node and its children are
visited, as appropriate.
</p>

<p>
An important decision in the implementation of any recursive function
on trees is when to check for an empty subtree.
Function <tt>preorder</tt> first checks to see if the value for
<tt>rt</tt> is <tt>NULL</tt>.
If not, it will recursively call itself on the left and right children 
of <tt>rt</tt>.
In other words, <tt>preorder</tt> makes no attempt to avoid calling
itself on an empty child.
Some programmers use an alternate design in which the left and
right pointers of the current node are checked so that the recursive
call is made only on non-empty children.
Such a design typically looks as follows:
</p>

<pre>
void preorder2(BinNode rt)
{
  visit(rt);
  if (rt.left() != null) preorder2(rt.left());
  if (rt.right() != null) preorder2(rt.right());
}
</pre>

<p>
At first it might appear that <tt>preorder2</tt> is more efficient
than <tt>preorder</tt>, because it makes only half as many recursive
calls.On the other hand, <tt>preorder2</tt> must access the left and right
child pointers twice as often.
The net result is little or no performance improvement.
</p>

<p class="TODO">
Question:
Why does preorder 2 make only half as many recursive calls?
Answer: Because half the pointers are null.
</p>

<p>
In reality, the design of <tt>preorder2</tt> is inferior to
that of <tt>preorder</tt> for two reasons.
First, while it is not apparent in this simple example,
for more complex traversals it can become awkward to place the check
for the <tt>NULL</tt> pointer in the calling code.
Even here we had to write two tests for <tt>NULL</tt>,
rather than the one needed by <tt>preorder</tt>.
The more important concern with <tt>preorder2</tt> is that it
tends to be error prone.
While <tt>preorder2</tt> insures that no recursive
calls will be made on empty subtrees, it will fail if the initial call 
passes in a <tt>NULL</tt> pointer.
This would occur if the original tree is empty.
To avoid the bug, either <tt>preorder2</tt> needs
an additional test for a <tt>NULL</tt> pointer at the beginning
(making the subsequent tests redundant after all), or the caller of
<tt>preorder2</tt> has a hidden obligation to
pass in a non-empty tree, which is unreliable design.
The net result is that many programmers forget to test for the
possibility that the empty tree is being traversed.
By using the first design, which explicitly supports processing of
empty subtrees, the problem is avoided.
</p>

<p>
Another issue to consider when designing a traversal is how to
define the visitor function that is to be executed on every node.
One approach is simply to write a new version of the traversal for
each such visitor function as needed.
The disadvantage to this is that whatever function does the traversal
must have access to the <tt>BinNode</tt> class.
It is probably better design to permit only the tree class to have
access to the <tt>BinNode</tt> class.
</p>

<p>
Another approach is for the tree class to supply a generic traversal
function which takes the visitor as a function parameter.
This is known as the
<ODSAdef "visitor design pattern" \>.
A major constraint on this approach is that the
<ODSAdef "signature" \> for all visitor functions, that is,
their return type and parameters, must be fixed in advance.
Thus, the designer of the generic traversal function must be able to
adequately judge what parameters and return type will likely be needed
by potential visitor functions.
</p>

<p>
Handling information flow between parts of a program can
be a significant design challenge, especially when dealing with
recursive functions such as tree traversals.
In general, we can run into trouble either with passing in the correct
information needed by the function to do its work,
or with returning information to the recursive function's caller.
We will see many examples throughout the book that illustrate methods
for passing information in and out of recursive functions as they
traverse a tree structure.
Here are a few simple examples.
</p>

<p>
First we consider the simple case where a computation requires
that we communicate information back up the tree to the end user.
</p>

<p class="example">
We wish to count the number of nodes in a binary tree.
The key insight is that the total count for any (non-empty) subtree is
one for the root plus the counts for the left and right subtrees.
Where do left and right subtree counts come from?
Calls to function <tt>count</tt> on the subtrees will compute this for
us.
Thus, we can implement <tt>count</tt> as follows.
</p>

<pre>
int count(BinNode rt) {
  if (rt == null) return 0;  // Nothing to count
  return 1 + count(rt.left()) + count(rt.right());
}
</pre>

<p>
Another problem that occurs when recursively processing data
collections is controlling which members of the collection will be
visited.
For example, some tree "traversals" might in fact visit only some
tree nodes, while avoiding processing of others.
An example is trying to find nodes in a BST whose key value falls
within a specified range.
This function must visit only those children of a given node that
might possibly fall within a given range of values.
Fortunately, it requires only a simple local calculation to determine
which child(ren) to visit.
</p>

<p>
A more difficult situation is illustrated by the following problem.
Given an arbitrary binary tree we wish to determine if,
for every node <i>A</i>, are all nodes in <i>A</i>'s left subtree
less than the value of <i>A</i>, and are all nodes in <i>A</i>'s right
subtree greater than the value of <i>A</i>?
(This happens to be the definition for a binary search tree,
see Module <ODSAref "BST" \>.)
Unfortunately, to make this decision we need to know some context
that is not available just by looking at the node's parent or children.
As shown by Figure <ODSAref "BSTCheckFig" \>,
it is not enough to verify that <i>A</i>'s left child has a value less
than that of <i>A</i>, and that <i>A</i>'s right child has a greater
value.
Nor is it enough to verify that <i>A</i> has a value consistent with
that of its parent.
In fact, we need to know information about what range of values is
legal for a given node.
That information might come from any of the node's ancestors.
Thus, relevant range information must be passed down the tree.
We can implement this function as follows.
</p>

<center>
<img src="Images/BSTCheckFig.png" alt="Binary tree checking" />
</center>

<p class="caption">
To be a binary search tree, the left child of the node with value 40
must have a value between 20 and 40.
</p>

<pre>
boolean checkBST(BinNode<Integer> rt,
                 int low, int high) {
  if (rt == null) return true; // Empty subtree
  int rootkey = rt.element();
  if ((rootkey < low) || (rootkey > high))
    return false; // Out of range
  if (!checkBST(rt.left(), low, rootkey))
    return false; // Left side failed
  return checkBST(rt.right(), rootkey, high);
}
</pre>
