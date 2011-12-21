\section{Binary Tree Traversals}
\label{BinTravers}

\index{traversal!binary tree|(}
Often we wish to process a binary tree by ``visiting'' each of its
nodes, each time performing a specific action such as printing the
contents of the node.
Any process for visiting all of the nodes in some order is
called a \defit{traversal}.
Any traversal that lists every node in the tree exactly once is
called an \defit{enumeration}\index{traversal!enumeration} of the
tree's nodes.
Some applications do not require that the nodes be visited in any
particular order as long as each node is visited precisely once.
For other applications, nodes must be visited in an order that
preserves some relationship.
For example, we might wish to make sure that we visit any given node
\emph{before} we visit its children.
This is called a \defit{preorder traversal}.

\newpage

\begin{example}
The preorder enumeration for the tree of
Figure~\ref{BinExample} is

\vspace{-\medskipamount}
\[{\rm A B D C E G F H I.}\]

\vspace{-\medskipamount}
The first node printed is the root.
Then all nodes of the left subtree are printed (in preorder) before
any node of the right subtree.
\end{example}

Alternatively, we might wish to visit each node only
\emph{after} we visit its children (and their subtrees).
For example, this would be necessary if we wish to return all nodes in 
the tree to free store.
We would like to delete the children of a node before deleting the
node itself.
But to do that requires that the children's children be deleted
first, and so on.
This is called a \defit{postorder traversal}.

\begin{example}
The postorder enumeration for the tree of Figure~\ref{BinExample}
is \[{\rm D B G E H I F C A.}\]

\vspace{-\medskipamount}
\end{example}

An \defit{inorder traversal} first visits the left child
(including its entire subtree), then visits the node, and finally
visits the right child (including its entire
subtree).
The binary search tree of Section~\ref{BST} makes use of this
traversal to print all nodes in ascending order of value.

\begin{example}
The inorder enumeration for the tree of Figure~\ref{BinExample}
is \[{\rm B D A G E C H F I.}\]

\vspace{-\smallskipamount}
\vspace{-\medskipamount}
\end{example}

\index{recursion|(}
A traversal routine is naturally written as a recursive
function.
Its input parameter is a pointer to a node which we will call
\Cref{rt} because each node can be viewed as the root of a some
subtree.
The initial call to the traversal function passes in a pointer to the
root node of the tree.
The traversal function visits \Cref{rt} and its children (if any) 
in the desired order.
For example, a preorder traversal specifies that \Cref{rt} be
visited before its children.
This can easily be implemented as follows.

\xproghere{preorder.book}

\noindent Function \Cref{preorder} first checks that the tree is not
empty (if it is, then the traversal is done and \Cref{preorder} simply
returns).
Otherwise, \Cref{preorder} makes  a call to \Cref{visit},
which processes the root node (i.e., prints the value or performs
whatever computation as required by the application).
Function \Cref{preorder} is then called recursively on the left
subtree, which will visit all nodes in that subtree.
Finally, \Cref{preorder} is called on the right subtree, visiting all
nodes in the right subtree.
Postorder and inorder traversals are similar.
They simply change the order in which the node and its children are
visited, as appropriate.

An important decision in the implementation of any recursive function
on trees is when to check for an empty subtree.
Function \Cref{preorder} first checks to see if the value for
\Cref{root} is \NULL.
If not, it will recursively call itself on the left and right children 
of \Cref{root}.
In other words, \Cref{preorder} makes no attempt to avoid calling
itself on an empty child.
Some programmers use an alternate design in which the left and
right pointers of the current node are checked so that the recursive
call is made only on non-empty children.
Such a design typically looks as follows:

\xproghere{preorder2.book}

At first it might appear that \Cref{preorder2} is more efficient
than \Cref{preorder}, because it makes only half as many recursive
calls. (Why?)
On the other hand, \Cref{preorder2} must access the left and right
child pointers twice as often.
The net result is little or no performance improvement.

In reality, the design of \Cref{preorder2} is inferior to
that of \Cref{preorder} for two reasons.
First, while it is not apparent in this simple example,
for more complex traversals it can become awkward to place the check
for the \NULL\ pointer in the calling code.
Even here we had to write two tests for \NULL,
rather than the one needed by \Cref{preorder}.
The more important concern with \Cref{preorder2} is that it
tends to be error prone.
While \Cref{preorder2} insures that no recursive
calls will be made on empty subtrees, it will fail if the initial call 
passes in a \NULL\ pointer.
This would occur if the original tree is empty.
To avoid the bug, either \Cref{preorder2} needs
an additional test for a \NULL\ pointer at the beginning
(making the subsequent tests redundant after all), or the caller of
\Cref{preorder2} has a hidden obligation\index{obligations, hidden} to
pass in a non-empty tree, which is unreliable design.
The net result is that many programmers forget to test for the
possibility that the empty tree is being traversed.
By using the first design, which explicitly supports processing of
empty subtrees, the problem is avoided.
\index{recursion|)}

\index{design pattern!visitor|(}
Another issue to consider when designing a traversal is how to
define the visitor function that is to be executed on every node.
One approach is simply to write a new version of the traversal for
each such visitor function as needed.
The disadvantage to this is that whatever function does the traversal
must have access to the \Cref{BinNode} class.
It is probably better design to permit only the tree class to have
access to the \Cref{BinNode} class.

Another approach is for the tree class to supply a generic traversal
function which takes the visitor
\ifthenelse{\boolean{cpp}}{either as a template parameter or}{}
as a function parameter.
This is known as the
\defit{visitor design pattern}.\index{design pattern!visitor}
A major constraint on this approach is that the
\defit{signature} for all visitor functions, that is, their return
type and parameters, must be fixed in advance.
Thus, the designer of the generic traversal function must be able to
adequately judge what parameters and return type will likely be needed 
by potential visitor functions.
\index{design pattern!visitor|)}

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

First we consider the simple case where a computation requires
that we communicate information back up the tree to the end user.

\begin{example}
We wish to count the number of nodes in a binary tree.
The key insight is that the total count for any (non-empty) subtree is
one for the root plus the counts for the left and right subtrees.
Where do left and right subtree counts come from?
Calls to function \Cref{count} on the subtrees will compute this for
us.
Thus, we can implement \Cref{count} as follows.

\xprogexamp{count.book}

\end{example}

\ifthenelse{\boolean{java}}{\newpage}{}

Another problem that occurs when recursively processing data
collections is controlling which members of the collection will be
visited.
For example, some tree ``traversals'' might in fact visit only some
tree nodes, while avoiding processing of others.
Exercise~\ref{BinaryTree}.\ref{BSTRangeExer} must solve exactly this
problem in the context of a binary search tree.
It must visit only those children of a given node that might possibly
fall within a given range of values.
Fortunately, it requires only a simple local calculation to determine
which child(ren) to visit.

A more difficult situation is illustrated by the following problem.
Given an arbitrary binary tree we wish to determine if,
for every node~\svar{A}, are all nodes in \svar{A}'s left subtree
less than the value of~\svar{A}, and are all nodes in \svar{A}'s right
subtree greater than the value of \svar{A}?
(This happens to be the definition for a binary search tree, described
in Section~\ref{BST}.)
Unfortunately, to make this decision we need to know some context
that is not available just by looking at the node's parent or children.
As shown by Figure~\ref{BSTCheckFig},
it is not enough to verify that \svar{A}'s left child has a value less
than that of \svar{A}, and that \svar{A}'s right child has a greater value.
Nor is it enough to verify that \svar{A} has a value consistent with
that of its parent.
In fact, we need to know information about what range of values is
legal for a given node.
That information might come from any of the node's ancestors.
Thus, relevant range information must be passed down the tree.
We can implement this function as follows.

\begin{figure}
\pdffig{BSTCheckFig}
\capt{4.5in}{Binary tree checking}
{To be a binary search tree, the left child of the node with value~40
must have a value between~20 and~40.}{BSTCheckFig}
\end{figure}

\xproghere{checkBST.book}

\index{traversal!binary tree|)}

\ifthenelse{\boolean{java}}{\newpage}{}
