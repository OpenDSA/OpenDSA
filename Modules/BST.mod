<ODSAtitle "Binary Search Trees">
<ODSAprereq "BinTreeImp">

<div id="module">

Section~\ref{Dictionary} presented the\index{bst@BST|(}
dictionary ADT,\index{abstract data type (ADT)} along with
dictionary implementations based on sorted and unsorted lists.
When implementing the dictionary with an unsorted list,
inserting a new record into the dictionary can be performed quickly by
putting it at the end of the list.
However, searching an unsorted list for a particular record
requires \Thetan\ time in the average case.
For a large database, this is probably much too slow.
Alternatively, the records can be stored in a sorted list.
If the list is implemented using a linked list, then no speedup to the
search operation will result from storing the records in sorted order.
On the other hand, if we use a sorted array-based list to implement
the dictionary, then binary search can be used to find a record in
only \Thetalogn\ time.
However, insertion will now require \Thetan\ time on average because,
once the proper location for the new record in the sorted list has
been found, many records might be shifted to make room for the new
record.

Is there some way to organize a collection of records so
that inserting records and searching for records can both be done
quickly?
This section presents the binary search tree (BST), 
which allows an improved solution to this problem.

A BST is a binary tree that conforms to the following condition, known 
as the {\bf Binary Search Tree Property}:
All\index{bst@BST!search tree property} nodes stored in the left
subtree of a node whose key value is~\(K\) have key values less
than~\(K\).
All nodes stored in the right subtree of a node whose key value
is~\(K\) have key values greater than or equal to~\(K\).
Figure~\ref{BSTShape} shows two BSTs for a collection of values.
One consequence of the Binary Search Tree Property is that if the BST
nodes are printed using an inorder traversal\index{traversal!binary tree}
(see Section~\ref{BinTravers}),
the resulting enumeration\index{traversal!enumeration} will be in
sorted order from lowest to highest.

\begin{figure}
\pdffig{BSTShape}
\vspace{-\bigskipamount}
\vspace{-\medskipamount}
\capt{4.5in}{Two Binary Search Trees}
{Two Binary Search Trees for a collection of values.
Tree (a) results if values are inserted
in the order 37, 24, 42, 7, 2, 40, 42, 32, 120.
Tree (b) results if the same values are inserted in the
order 120, 42, 42, 7, 2, 32, 37, 24, 40.}{BSTShape}
\smallskip
\end{figure}

Figure~\ref{BSTClass} shows a class declaration for the BST
that implements the dictionary
ADT.\index{dictionary}\index{abstract data type (ADT)}
The public member functions include those required by the dictionary
ADT, along with a constructor and destructor.
Recall from the discussion in Section~\ref{Dictionary} that there are
various ways to deal with keys and comparing records (three approaches
being key/value pairs, a special comparison
\ifthenelse{\boolean{cpp}}{method,}{}
\ifthenelse{\boolean{java}}{method such as using the
\Cref{Comparator} class,}{}
and passing in a comparator function).
Our BST implementation will handle comparison by explicitly storing
a key separate from the data value at each node of the tree.

\begin{figure}
\xprogfig{BST1.book}
\ifthenelse{\boolean{java}}{\xprogfig{BST2.book}}{}

\capt{4.5in}{BST implementation}
{The binary search tree implementation.}{BSTClass}
\end{figure}

\ifthenelse{\boolean{cpp}}{
\begin{figure}
\xprogfig{BST2.book}
\captcont
\end{figure}
}{}

\index{bst@BST!search|(}
To find a record with key value \(K\) in a BST, begin at the root.
If~the root stores a record with key value \(K\),
then the search is over.
If~not, then we must search deeper in the tree.
What makes the BST efficient during search is that we need search only
one of the node's two subtrees.
If~\(K\) is less than the root node's key value,
we search only the left subtree.
If~\(K\) is greater than the root node's key value, we search only the
right subtree.
This process continues until a record with key value \(K\) is found,
or we reach a leaf node.
If~we reach a leaf node without encountering \(K\), then
no record exists in the BST whose key value is \(K\).

\begin{example}
Consider searching for the node with key value 32 in the tree of
Figure~\ref{BSTShape}(a).
Because 32 is less than the root value of 37, the search
proceeds to the left subtree.
Because 32 is greater than 24, we search in 24's right subtree.
At this point the node containing 32 is found.
If the search value were 35, the same path would be followed to the
node containing 32.
Because this node has no children, we know that 35 is not
in the BST.
\end{example}

Notice that in Figure~\ref{BSTClass}, public member function
\Cref{find} calls private member function \Cref{findhelp}.
Method \Cref{find} takes the search key as an explicit parameter
and its BST as an implicit parameter, and returns the record that
matches the key.
However, the find operation is most easily implemented as a
recursive\index{recursion} function whose parameters are the root of a
subtree and the search key.
Member \Cref{findhelp} has the desired form for this recursive
subroutine and is implemented as follows.

\xproghere{BSTfind.book}
\index{bst@BST!search|)}

\noindent Once the desired record is found, it is passed through
return values up the chain of recursive calls.
If a suitable record is not found, \Cref{null} is returned.

\index{bst@BST!insert|(}
Inserting a record with key value \(k\) requires that we first find
where that record would have been if it were in the tree.
This takes us to either a leaf node, or to an internal node with no
child in the appropriate direction.\footnote{This assumes that no node
has a key value equal to the one being inserted.
If we find a node that duplicates the key value to be inserted,
we have two options.
If the application does not allow nodes with equal keys, then this
insertion should be treated as an error (or ignored).
If duplicate keys are allowed, our convention will be to insert the
duplicate in the right subtree.}
Call this node \(\svar{R}\,'\).
We then add a new node containing the new record as a child
of \(\svar{R}\,'\).
Figure~\ref{BSTAdd} illustrates this operation.
The value 35 is added as the right child of the node with value 32.
Here is the implementation for \Cref{inserthelp}:

\begin{figure}
\pdffig{BSTAdd}
\vspace{-\bigskipamount}
\capt{4.5in}{Inserting a node into a BST}
{An example of BST insertion.
A record with value~35 is inserted into the BST of
Figure~\ref{BSTShape}(a).
The node with value~32 becomes the parent of the new node
containing~35.}{BSTAdd}
\bigskip
\end{figure}

\xproghere{BSTinsert.book}

You should pay careful attention to the implementation for
\Cref{inserthelp}.
Note that \Cref{inserthelp} returns a pointer to a \Cref{BSTNode}.
What is being returned is a subtree identical to the old subtree,
except that it has been modified to contain the new record being
inserted.
Each node along a path from the root to the parent of the new node
added to the tree will have its appropriate child pointer assigned to
it.
Except for the last node in the path, none of these nodes will
actually change their child's pointer value.
In that sense, many of the assignments seem redundant.
However, the cost of these additional assignments is worth paying to
keep the insertion process simple.
The alternative is to check if a given assignment is necessary, which
is probably more expensive than the assignment!

The shape of a BST depends on the order in which elements are inserted.
A new element is added to the BST as a new leaf node,
potentially increasing the depth of the tree.
Figure~\ref{BSTShape} illustrates two BSTs for a collection of
values.
It is possible for the BST containing~\(n\) nodes to be a chain of
nodes with height \(n\).
This would happen if, for example, all elements were inserted in
sorted order.
In general, it is preferable for a BST to be as shallow as
possible.\index{bst@BST!insert|)}
This keeps the average cost of a BST operation low.

\index{bst@BST!remove|(}
Removing a node from a BST is a bit trickier than inserting a node,
but it is not complicated if all of the possible cases are considered
individually.
Before tackling the general node removal process, let us first discuss
how to remove from a given subtree the node with the smallest key
value.
This routine will be used later by the general node removal function.
To~remove the node with the minimum key value from a subtree,
first find that node by continuously moving down the left link until
there is no further left link to follow.
Call this node \svar{S}.
To~remove \svar{S}, simply have the parent of \svar{S} change its
pointer to point to the right child of \svar{S}.
We know that \svar{S} has no left child (because if \svar{S} did have
a left child, \svar{S} would not be the node with minimum key value).
Thus, changing the pointer as described will maintain a BST, with
\svar{S} removed.
The code for this method, named \Cref{deletemin}, is as follows:

\xproghere{BSTdeletemin.book}

\begin{example}
Figure~\ref{DelMin} illustrates the \Cref{deletemin} process.
Beginning at the root node with value~10,
\Cref{deletemin} follows the left link until there is no further left
link, in this case reaching the node with value~5.
The node with value~10 is changed to point to the right child of the
node containing the minimum value.
This is indicated in Figure~\ref{DelMin} by a dashed line.
\end{example}

A pointer to the node containing the minimum-valued element is stored
in parameter \Cref{S}.
The return value of the \Cref{deletemin} method is the subtree of
the current node with the minimum-valued node in the subtree removed.
As with method \Cref{inserthelp}, each node on the path back to the
root has its left child pointer reassigned to the subtree resulting
from its call to the \Cref{deletemin} method.

A useful companion method is \Cref{getmin} which returns a
\pointref\ to the node containing the minimum value in the subtree.

\ifthenelse{\boolean{cpp}}{\newpage}{}

\xproghere{BSTgetmin.book}

\begin{figure}
\pdffig{DelMin}
\vspace{-\bigskipamount}

\capt{4.5in}{Deleting the node with minimum value}
{An example of deleting the node with minimum value.
In this tree, the node with minimum value,~5, is the left child of the
root.
Thus, the root's \Cref{left} pointer is changed to point to 5's right
child.}{DelMin}
\bigskip
\end{figure}

Removing a node with given key value \svar{R} from the BST requires
that we first find \svar{R} and then remove it from the tree.
So, the first part of the remove operation is a search to find
\svar{R}.
Once \svar{R} is found, there are several possibilities.
If \svar{R} has no children, then \svar{R}'s parent has its pointer
set to \NULL.
If \svar{R} has one child, then \svar{R}'s parent has
its pointer set to \svar{R}'s child (similar to \Cref{deletemin}).
The problem comes if \svar{R} has two children.
One simple approach, though expensive, is to set \svar{R}'s parent to
point to one of \svar{R}'s subtrees, and then reinsert the remaining
subtree's nodes one at a time.
A better alternative is to find a value in one of the
subtrees that can replace the value in \svar{R}.

Thus, the question becomes:
Which value can substitute for the one being removed?
It cannot be any arbitrary value, because we must preserve the BST
property without making major changes to the structure of the tree.
Which value is most like the one being removed?
The answer is the least key value greater than (or equal to) the one
being removed, or else the greatest key value less than the one being
removed.
If either of these values replace the one being removed,
then the BST property is maintained.

\begin{example}
Assume that we wish to remove the value~37 from the BST
of Figure~\ref{BSTShape}(a).
Instead of removing the root node, we remove the node with the least
value in the right subtree (using the \Cref{deletemin}
operation).
This value can then replace the value in the root.
In this example we first remove the node with value~40,
because it contains the least value in the right subtree.
We then substitute~40 as the new value for the root node.
Figure~\ref{Remove} illustrates this process.
\end{example}

\begin{figure}
\pdffig{Remove}
\vspace{-\bigskipamount}\vspace{-\smallskipamount}

\capt{4.5in}{Removing a node from the BST}
{An example of removing the value~37 from the BST.
The node containing this value has two children.
We replace value~37 with the least value from the
node's right subtree, in this case~40.}{Remove}
\medskip
\end{figure}

When duplicate node values do not appear in the tree, it makes no
difference whether the replacement is the greatest value from the
left subtree or the least value from the right subtree.
If duplicates are stored, then we must select
the replacement from the \emph{right} subtree.
To~see why, call the greatest value in the left subtree~\svar{G}.
If multiple nodes in the left subtree have value~\svar{G},
selecting \svar{G} as the replacement value for the root of the
subtree will result in a tree with equal values to the left of the
node now containing~\svar{G}.
Precisely this situation occurs if we replace value~120 with the
greatest value in the left subtree of Figure~\ref{BSTShape}(b).
Selecting the least value from the right subtree does not
have a similar problem, because it does not violate the Binary Search
Tree Property if equal values appear in the right subtree.

From the above, we see that if we want to remove the record stored in
a node with two children, then we simply call \Cref{deletemin} on the
node's right subtree and substitute the record returned for the record
being removed.
Figure~\ref{RHelpFig} shows an implementation for \Cref{removehelp}.
\index{bst@BST!remove|)}

\begin{figure}
\vspace{-\smallskipamount}

\xprogfig{BSTremove.book}
\vspace{-\bigskipamount}
\vspace{-\smallskipamount}

\capt{4.5in}{BST \Cref{removehelp} implementation}
{Implementation for the BST \Cref{removehelp} method.}{RHelpFig}
\vspace{-\smallskipamount}
\end{figure}

The cost for \Cref{findhelp} and \Cref{inserthelp} is the depth of the
node found or inserted.\index{bst@BST!efficiency}
The cost for \Cref{removehelp} is the depth of the node being removed,
or in the case when this node has two children,
the depth of the node with smallest value in its right subtree. 
Thus, in the worst case, the cost for any one of these operations is
the depth of the deepest node in the tree.
This is why it is desirable to keep BSTs \defit{balanced}, that is,
with least possible height.
If a binary tree is balanced, then the height for a tree of \(n\) nodes
is approximately \(\log n\).
However, if the tree is completely unbalanced, for example in the
shape of a linked list, then the height for a tree with \(n\) nodes
can be as great as \(n\).
Thus, a balanced BST will in the average case have operations costing
\Thetalogn, while a badly unbalanced BST can have operations in the
worst case costing \Thetan.
Consider the situation where we construct a BST of \(n\) nodes
by inserting records one at a time.
If we are fortunate to have them arrive in an order that results in a
balanced tree (a ``random'' order is likely to be good
enough for this purpose), then each insertion will cost on average
\Thetalogn, for a total cost of \Thetanlogn.
However, if the records are inserted in order of increasing value,
then the resulting tree will be a chain of height \(n\).
The cost of insertion in this case will be
\(\sum_{i=1}^{n} i = \Thetantwo\).\index{summation}

Traversing a BST costs \Thetan\ regardless of the shape of
the tree.\index{traversal!binary tree}
Each node is visited exactly once, and each child pointer
is followed exactly once.

\ifthenelse{\boolean{cpp}}
{Below are two example traversals.
The first is member \Cref{clearhelp}, which returns the nodes of the
BST to the freelist.
Because the children of a node must be freed before
the node itself, this is a postorder traversal.

\xproghere{BSTclear.book}

The next example is \Cref{printhelp}, which performs an
inorder traversal on the BST to print the node values in ascending
order.
Note that \Cref{printhelp} indents each line to indicate the depth of
the corresponding node in the tree.
Thus we pass in the current level of the tree in \Cref{level}, and
increment this value each time that we make a recursive call.

\xproghere{BSTprint.book}}{}

\ifthenelse{\boolean{java}}
{Below is an example traversal, named \Cref{printhelp}.
It performs an inorder traversal on the BST to print the node values
in ascending order.

\xproghere{BSTprint.book}}{}

While the BST is simple to implement and efficient when the tree is
balanced, the possibility of its being unbalanced is a serious
liability.
There are techniques for organizing a BST to guarantee good performance.
Two examples are the AVL tree and the splay tree of
Section~\ref{BalancedTree}.\index{splay tree}
Other search trees\index{search trees} are guaranteed to remain
balanced, such as the \TTtree\ of
Section~\ref{TTTree}.\index{two-three@\TTtree}
\index{bst@BST|)}

</div>
