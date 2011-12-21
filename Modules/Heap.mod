<ODSAtitle "Heaps and Priority Queues">
<ODSAprereq "BinTreeImp">

There are many situations, both in real life and in computing
applications, where we wish to choose the next ``most important''
from a collection of people, tasks, or objects.
For example, doctors in a hospital emergency room often choose to see
next the ``most critical'' patient rather than the one who arrived
first.
When scheduling programs for execution in a multitasking
operating system,\index{operating system} at any given moment there
might be several programs (usually called \defit{jobs}) ready to run.
The next job selected is the one with the highest \defit{priority}.
Priority is indicated by a particular value associated with the job
(and might change while the job remains in the wait list).

When a collection of objects is organized by importance or priority,
we call this a \defit{priority queue}.
A normal queue data structure will not implement a priority queue
efficiently because search for the element with highest priority will
take \Thetan\ time.
A list, whether sorted or not, will also require \Thetan\ time for
either insertion or removal.
A BST that organizes records by priority could be used, with the total 
of \(n\) inserts and \(n\) remove operations
requiring \Thetanlogn\ time in the average case.
However, there is always the possibility that the BST will become
unbalanced, leading to bad performance.
Instead, we would like to find a data structure that is guaranteed to
have good performance for this special application.

This section presents the \defit{heap}\footnote{The term ``heap'' is
also sometimes used to refer to a memory pool.
See Section~\ref{MemMan}.}
data structure.
A heap is defined by two properties.
First, it is a complete binary tree,\index{binary tree!complete}
so heaps are nearly always implemented using
the array representation for complete binary trees presented
in Section~\ref{Complete}.
Second, the values stored in a heap are
\defit{partially ordered}.\index{heap!partial ordering property}
This means that there is a relationship between the value stored at
any node and the values of its children.
There are two variants of the heap, depending on the definition of
this relationship.

A \defit{max-heap} has the property that every node stores a value
that is \emph{greater} than or equal to the value of either of its
children.\index{heap!max-heap}
Because the root has a value greater than or equal to its children,
which in turn have values greater than or equal to their children, the
root stores the maximum of all values in the tree.

A \defit{min-heap} has the property that every node stores a value
that is \emph{less}
than or equal to that of its children.\index{heap!min-heap}
Because the root has a value less than or equal to its children, which
in turn have values less than or equal to their children, the root
stores the minimum of all values in the tree.

Note that there is no necessary relationship between the value of a
node and that of its sibling in either the min-heap or the max-heap.
For example, it is possible that the values for all nodes in the left
subtree of the root are greater than the values for every node of the
right subtree.
We can contrast BSTs and heaps by the strength of their ordering
relationships.
A BST defines a total order\index{total order} on its nodes in that,
given the positions for any two nodes in the tree, the one to the
``left'' (equivalently, the one appearing earlier in an inorder
traversal) has a smaller key value than the one to the ``right.''
In contrast, a heap implements a partial order.\index{partial order}
Given their positions, we can determine the relative order for the key
values of two nodes in the heap \emph{only} if one is a descendant of
the other.

Min-heaps and max-heaps both have their uses.
For example, the Heapsort of
Section~\ref{Heapsort}\index{heapsort@Heapsort} uses the max-heap,
while the Replacement Selection algorithm of Section~\ref{RepSelSec}
uses a min-heap.\index{replacement selection}
The examples in the rest of this section will use a max-heap.

Be careful not to confuse the logical representation of a heap
with its physical implementation by means of the array-based complete
binary tree.
The two are not synonymous because the logical view of the heap is
actually a tree structure, while the typical physical implementation
uses an array.\index{data structure!physical vs. logical form}

\begin{figure}
\xprogfig{Heap1.book}
\vspace{-\bigskipamount}
\capt{4.5in}{A heap implementation}
{An implementation for the heap.}{HeapClass}
\vspace{-\smallskipamount}
\end{figure}

\begin{figure}
\xprogfig{Heap2.book}
\vspace{-\smallskipamount}
\ifthenelse{\boolean{java}}{\vspace{-\bigskipamount}}{}
\captcont
\ifthenelse{\boolean{cpp}}{\vspace{-\medskipamount}}{}
\end{figure}

Figure~\ref{HeapClass} shows an implementation for
heaps.\ifthenelse{\boolean{cpp}}
{The class is a template with two parameters.
\Cref{E} defines the type for the data elements stored in the heap, 
while \Cref{Comp} is the comparison class for comparing two elements.
This class can implement either a min-heap or a max-heap by changing
the definition for \Cref{Comp}.
\Cref{Comp} defines method \Cref{prior}, a binary Boolean function
that returns true if the first parameter should come before the second
in the heap.}{}
\ifthenelse{\boolean{java}}
{The class is a generic with one type parameter, \Cref{E},
which defines the type for the data elements stored in the heap.
\Cref{E} must extend the \Cref{Comparable} interface,
and so we can use the \Cref{compareTo} method for comparing records in
the heap.}{}

This class definition makes two concessions to the fact that an
array-based implementation is used.
First, heap nodes are indicated by their logical position within the
heap rather than by a pointer to the node.
In practice, the logical heap position corresponds to the identically
numbered physical position in the array.
Second, the constructor takes as input a pointer to the array to be
used.
This approach provides the greatest flexibility for using the heap
because all data values can be loaded into the array directly
by the client.
The advantage of this comes during the heap construction phase,
as explained below.
The constructor also takes an integer parameter indicating the initial
size of the heap (based on the number of elements initially loaded
into the array) and a second integer parameter indicating the maximum
size allowed for the heap (the size of the array).

Method \Cref{heapsize} returns the current size of the heap.
\Cref{H.isLeaf(pos)} returns \TRUE\ if position
\Cref{pos} is a leaf in heap \Cref{H}, and \FALSE\ otherwise.
Members \Cref{leftchild}, \Cref{rightchild}, and \Cref{parent} return
the position (actually, the array index) for the left child, right
child, and parent of the position passed, respectively.

\index{heap!building|(}
One way to build a heap is to insert the elements one at a time.
Method \Cref{insert} will insert a new element \svar{V} into
the heap.\index{heap!insert}
You might expect the heap insertion process to be similar to the
insert function for a BST, starting at the root and working down
through the heap.
However, this approach is not likely to work because the heap must
maintain the shape of a complete binary tree.
Equivalently, if the heap takes up the first
\(n\)~positions of its array prior to the call to \Cref{insert}, it must
take up the first \(n+1\) positions after.
To~accomplish this, \Cref{insert} first places \svar{V} at
position~\(n\) of the array.
Of course, \svar{V}~is unlikely to be in the correct position.
To~move \svar{V} to the right place, it is compared to its parent's
value.
If the value of \svar{V} is less than or equal to the value of its
parent, then it is in the correct place and the insert routine is
finished.
If the value of \svar{V} is greater than that of its parent, then the
two elements swap positions.
From here, the process of comparing \svar{V} to its (current) parent
continues until \svar{V} reaches its correct position.

Since the heap is a complete binary tree, its height is guaranteed to
be the minimum possible.
In particular, a heap containing \(n\) nodes will have a height of
\Thetanlogn.
Intuitively, we can see that this must be true because each level that
we add will slightly more than double the number of nodes in the tree
(the \(i\)th level has \(2^i\) nodes, and the sum of the first \(i\)
levels is \(2^{i+1}-1\)).
Starting at 1, we can double only \(\log n\) times to reach a value
of~\(n\).
To be precise, the height of a heap with \(n\) nodes is
\(\lceil\log (n+1)\rceil.\)

\index{heap!insert}
Each call to \Cref{insert} takes \Thetalogn\ time in the worst case,
because the value being inserted can move at most the distance from the
bottom of the tree to the top of the tree.
Thus, to insert \(n\) values into the heap, if we insert them 
one at a time, will take \Thetanlogn\ time in the worst case.

If all \(n\) values are available at the beginning of the building
process, we can build the heap faster than just
inserting the values into the heap one by one.
Consider Figure~\ref{HeapBuild}(a), which shows one series of
exchanges that could be used to build the heap.
All exchanges are between a node and one of its children.
The heap is formed as a result of this exchange process.
The array for the right-hand tree of Figure~\ref{HeapBuild}(a)
would appear as follows:
\vspace{-\medskipamount}

\begin{center}
\sffamily
\begin{tabular}{|c|c|c|c|c|c|c|}
\hline
\rule{0pt}{12pt}7&4&6&1&2&3&5\\
\hline
\end{tabular}
\end{center}
\vspace{-\smallskipamount}

\begin{figure}
\pdffig{HeapBld}
\vspace{-\medskipamount}

\capt{4.5in}{Two series of exchanges to build a heap}
{Two series of exchanges to build a max-heap.
(a) This heap is built by a series of nine exchanges in the order
(4-2), (4-1), (2-1), (5-2), (5-4), (6-3), (6-5), (7-5), (7-6).
(b) This heap is built by a series of four exchanges in the order
(5-2), (7-3), (7-1), (6-1).}{HeapBuild}
\bigskip
\end{figure}

Figure~\ref{HeapBuild}(b) shows an alternate series of exchanges
that also forms a heap, but much more efficiently.
The equivalent array representation would be
\vspace{-\medskipamount}

\begin{center}
\sffamily
\begin{tabular}{|c|c|c|c|c|c|c|}
\hline
\rule{0pt}{12pt}7&5&6&4&2&1&3\\
\hline
\end{tabular}
\end{center}
\vspace{-\smallskipamount}

\noindent From this example, it is clear that the heap for any given
set of numbers is not unique, and we see that some rearrangements of
the input values require fewer exchanges than others to build the
heap.
So, how do we pick the best rearrangement?

One good algorithm stems from induction.\index{proof!induction}
Suppose that the left and right subtrees of the root are already
heaps, and \svar{R} is the name of the element at the root.
This situation is illustrated by Figure~\ref{HeapInduct}.
In this case there are two possibilities.
(1)~\svar{R}~has a value greater than or equal to its two children.
In this case, construction is complete.
(2)~\svar{R}~has a value less than one or both of its children.
In this case, \svar{R}~should be exchanged with the child that has
greater value.
The result will be a heap, except that \svar{R}
might still be less than one or both of its (new) children.
In this case, we simply continue the process of ``pushing down''
\svar{R} until it reaches a level where it is greater than its
children, or is a leaf node.
This process is implemented by the private method
\Cref{siftdown}.\index{heap!siftdown}
The siftdown operation is illustrated by Figure~\ref{SiftPic}.

\begin{figure}
\pdffig{HeapInd}
\vspace{-\bigskipamount}
\vspace{-\smallskipamount}

\capt{4.5in}{An example of heap building}
{Final stage in the heap-building algorithm.
Both subtrees of node \svar{R} are heaps.
All that remains is to push \svar{R} down to its proper level in the
heap.}{HeapInduct}
\end{figure}

\begin{figure}
\pdffig{SiftPic}

\capt{4.5in}{The siftdown operation}
{The siftdown operation.\index{heap!siftdown}
The subtrees of the root are assumed to be heaps.
(a)~The partially completed heap.
(b)~Values~1 and~7 are swapped.
(c)~Values~1 and~6 are swapped to form the final heap.}{SiftPic}
\medskip
\end{figure}

This approach assumes that the subtrees are already heaps,
suggesting that a complete algorithm can be obtained by visiting
the nodes in some order such that the children of a node are
visited \emph{before} the node itself.
One simple way to do this is simply to work from the high index of the 
array to the low index.
Actually, the build process need not visit the leaf nodes
(they can never move down because they are already at the bottom), so
the building algorithm can start in the middle of the array, with the
first internal node.
The exchanges shown in Figure~\ref{HeapBuild}(b) result from this
process.
Method \Cref{buildHeap} implements the building algorithm.

\ifthenelse{\boolean{cpp}}{\newpage}{}

What is the cost of \Cref{buildHeap}?
Clearly it is the sum of the costs for the calls to
\Cref{siftdown}.\index{heap!siftdown}
Each \Cref{siftdown} operation can cost at most the number of levels
it takes for the node being sifted to reach the bottom of the tree.
In any complete tree, approximately half of the nodes are leaves
and so cannot be moved downward at all.
One quarter of the nodes are one level above the leaves, and so their
elements can move down at most one level.
At each step up the tree we get half the number of nodes as were at
the previous level, and an additional height of one.
The maximum sum of total distances that elements can go is
therefore\index{summation}
\[\sum_{i=1}^{\log n} (i-1)\frac{n}{2^i}
= \frac{n}{2}\sum_{i=1}^{\log n} \frac{i-1}{2^{i-1}}.\]
\noindent From Equation~\ref{IHalvesSum} we know that this summation
has a closed-form solution of approximately~2,
so this algorithm takes \Thetan\ time in the worst case.
This is far better than building the heap one element at a time, which
would cost \Thetanlogn\ in the worst case.
It is also faster than the \Thetanlogn\ average-case time and
\Thetantwo\ worst-case time required to build the
BST.\index{heap!building|)}

Removing\index{heap!remove} the maximum (root) value from a heap
containing \(n\) elements requires that we maintain the complete binary
tree shape, and that the remaining \(n-1\)~node values conform to the
heap property.
We can maintain the proper shape by moving the element in the last
position in the heap (the current last element in the array) to the
root position.
We now consider the heap to be one element smaller.
Unfortunately, the new root value is probably
\emph{not} the maximum value in the new heap.
This problem is easily solved by using \Cref{siftdown} to reorder the
heap.\index{heap!siftdown}
Because the heap is \(\log n\) levels deep, the cost of deleting the
maximum element is \Thetalogn\ in the average and worst cases.

The heap is a natural implementation for the priority queue discussed
at the beginning of this section.
Jobs can be added to the heap (using their priority value as the
ordering key) when needed.
Method \Cref{removemax} can be called whenever a new job is to be
executed.

\index{heap!remove}
Some applications of priority queues require the ability to change the
priority of an object already stored in the queue.
This might require that the object's position in the heap representation
be updated.
Unfortunately, a max-heap is not efficient when searching for an
arbitrary value; it is only good for finding the maximum value.
However, if we already know the index for an object within the heap,
it is a simple matter to update its priority (including changing its
position to maintain the heap property) or remove it.
The \Cref{remove} method takes as input the position of the
node to be removed from the heap.
A typical implementation for priority queues requiring updating of
priorities will need to use an auxiliary data structure that supports
efficient search for objects (such as a BST).
Records in the auxiliary data structure will store
the object's heap index, so that the object can be
deleted from the heap and reinserted with its new priority
(see Project~\ref{BinaryTree}.\ref{HeapProject}).
Sections~\ref{SSSP} and~\ref{PrimsSec} present applications for a
priority queue with priority updating.
\index{heap!remove}
\index{heap|)}
