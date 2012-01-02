<div id="content">
<ODSAsettitle>Heaps and Priority Queues</ODSAsettitle>
<ODSAprereq "CompleteTree" />
<ODSAprereq "Induction" />

<p>
There are many situations, both in real life and in computing
applications, where we wish to choose the next "most important"
from a collection of people, tasks, or objects.
For example, doctors in a hospital emergency room often choose to see
next the "most critical" patient rather than the one who arrived
first.
When scheduling programs for execution in a multitasking
operating system, at any given moment there might be several programs
(usually called <dfn>jobs</dfn> ready to run.
The next job selected is the one with the highest
<dfn>priority</dfn>. 
Priority is indicated by a particular value associated with the job
(and might change while the job remains in the wait list).
</p>

<p>
When a collection of objects is organized by importance or priority,
we call this a <OpenDSA "priority queue" />.
A normal queue data structure will not implement a priority queue
efficiently because search for the element with highest priority will
take &Theta;(<i>n</i>) time.
A list, whether sorted or not, will also require &Theta;(<i>n</i>)
time for either insertion or removal.
A BST that organizes records by priority could be used, with the total 
of <i>n</i> inserts and <i>n</i> remove operations
requiring &Theta;(<i>n</i> log <i>n</i>) time in the average case.
However, there is always the possibility that the BST will become
unbalanced, leading to bad performance.
Instead, we would like to find a data structure that is guaranteed to
have good performance for this special application.
</p>

<p>
This section presents the <dfn>heap</dfn>
data structure. <sup><a href="#fn1" id="r1">[1]</a></sup>
A heap is defined by two properties.
First, it is a complete binary tree,
so heaps are nearly always implemented using
the array representation for complete binary trees presented
in Module <ODSAref "CompleteTree" />.
Second, the values stored in a heap are
<dfn>partially ordered</dfn>.
This means that there is a relationship between the value stored at
any node and the values of its children.
There are two variants of the heap, depending on the definition of
this relationship.
</p>

<p>
A <dfn>max-heap</dfn> has the property that every node stores a
value that is <em>greater</em> than or equal to the value of either of
its children.
Because the root has a value greater than or equal to its children,
which in turn have values greater than or equal to their children, the
root stores the maximum of all values in the tree.
</p>

<p>
A <dfn>min-heap</dfn> has the property that every node stores a
value that is <em>less</em>
than or equal to that of its children.
Because the root has a value less than or equal to its children, which
in turn have values less than or equal to their children, the root
stores the minimum of all values in the tree.
</p>

<p>
Note that there is no necessary relationship between the value of a
node and that of its sibling in either the min-heap or the max-heap.
For example, it is possible that the values for all nodes in the left
subtree of the root are greater than the values for every node of the
right subtree.
We can contrast BSTs and heaps by the strength of their ordering
relationships.
A BST defines a <dfn>total order</dfn> on its nodes in that,
given the positions for any two nodes in the tree, the one to the
"left" (equivalently, the one appearing earlier in an inorder
traversal) has a smaller key value than the one to the "right".
In contrast, a heap implements a partial order.
Given their positions, we can determine the relative order for the
key values of two nodes in the heap <em>only</em> if one is a
descendant of the other.
</p>

<p>
Min-heaps and max-heaps both have their uses.
For example, the Heapsort uses the max-heap,
while the Replacement Selection algorithm used for external sorting
uses a min-heap.
The examples in the rest of this section will use a max-heap.
</p>

<p>
Be careful not to confuse the logical representation of a heap
with its physical implementation by means of the array-based complete
binary tree.
The two are not synonymous because the logical view of the heap is
actually a tree structure, while the typical physical implementation
uses an array.
</p>

<figure>
<pre>
/** Max-heap implementation */
public class MaxHeap<E extends Comparable<? super E>> {
  private E[] Heap;   // Pointer to the heap array
  private int size;   // Maximum size of the heap
  private int n;      // Number of things in heap

  /** Constructor supporting preloading of heap contents */
  public MaxHeap(E[] h, int num, int max)
  { Heap = h;  n = num;  size = max;  buildheap(); }

  /** @return Current size of the heap */
  public int heapsize() { return n; }

  /** @return True if pos a leaf position, false otherwise */
  public boolean isLeaf(int pos)
  { return (pos >= n/2) && (pos < n); }

  /** @return Position for left child of pos */
  public int leftchild(int pos) {
    assert pos < n/2 : "Position has no left child";
    return 2*pos + 1;
  }

  /** @return Position for right child of pos */
  public int rightchild(int pos) {
    assert pos < (n-1)/2 : "Position has no right child";
    return 2*pos + 2;
  }

  /** @return Position for parent */
  public int parent(int pos) {
    assert pos > 0 : "Position has no parent";
    return (pos-1)/2;
  }

  /** Insert val into heap */
  public void insert(E val) {
    assert n < size : "Heap is full";
    int curr = n++;
    Heap[curr] = val;             // Start at end of heap
    // Now sift up until curr's parent's key > curr's key
    while ((curr != 0)  &&
           (Heap[curr].compareTo(Heap[parent(curr)]) > 0)) {
      DSutil.swap(Heap, curr, parent(curr));
      curr = parent(curr);
    }
  }

  /** Heapify contents of Heap */
  public void buildheap()
    { for (int i=n/2-1; i>=0; i--) siftdown(i); }

  /** Put element in its correct place */
  private void siftdown(int pos) {
    assert (pos >= 0) && (pos < n) : "Illegal heap position";
    while (!isLeaf(pos)) {
      int j = leftchild(pos);
      if ((j<(n-1)) && (Heap[j].compareTo(Heap[j+1]) < 0)) 
        j++; // j is now index of child with greater value
      if (Heap[pos].compareTo(Heap[j]) >= 0) return;
      DSutil.swap(Heap, pos, j);
      pos = j;  // Move down
    }
  }

  /** Remove and return maximum value */
  public E removemax() {
    assert n > 0 : "Removing from empty heap";
    DSutil.swap(Heap, 0, --n); // Swap maximum with last value
    if (n != 0)      // Not on last element
      siftdown(0);   // Put new heap root val in correct place
    return Heap[n];
  }

  /** Remove and return element at specified position */
  public E remove(int pos) {
    assert (pos >= 0) && (pos < n) : "Illegal heap position";
    if (pos == (n-1)) n--; // Last element, no work to be done
    else {
      DSutil.swap(Heap, pos, --n); // Swap with last value
      // If we just swapped in a big value, push it up
      while ((pos > 0) &&
             (Heap[pos].compareTo(Heap[parent(pos)]) > 0)) {
        DSutil.swap(Heap, pos, parent(pos));
        pos = parent(pos);
      }
      if (n != 0) siftdown(pos); // If it is little, push down
    }
    return Heap[n];
  }
}
</pre>

<figcaption>
<ODSAfig "HeapClass" />
An implementation for the heap.
</figcaption>
</figure>

<p>
Figure <ODSAref "HeapClass" /> shows an implementation for
heaps.
The class is a generic with one type parameter, <code>E</code>,
which defines the type for the data elements stored in the heap.
<code>E</code> must extend the <code>Comparable</code> interface,
and so we can use the <code>compareTo</code> method for comparing records
in the heap.
</p>

<p>
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
</p>

<p>
Method <code>heapsize</code> returns the current size of the heap.
<code>H.isLeaf(pos)</code> returns TRUE if position
<code>pos</code> is a leaf in heap <code>H</code>, and FALSE otherwise.
Members <code>leftchild</code>, <code>rightchild</code>,
and <code>parent</code> return the position (actually, the array index)
for the left child, right child, and parent of the position passed,
respectively.
</p>

<p>
One way to build a heap is to insert the elements one at a time.
Method <code>insert</code> will insert a new element <var>V</var> into
the heap.
You might expect the heap insertion process to be similar to the
insert function for a BST, starting at the root and working down
through the heap.
However, this approach is not likely to work because the heap must
maintain the shape of a complete binary tree.
Equivalently, if the heap takes up the first
<i>n</i> positions of its array prior to the call to
<code>insert</code>,
it must take up the first <i>n</i>+1 positions after.
To accomplish this, <code>insert</code> first places <var>V</var> at
position <i>n</i> of the array.
Of course, <var>V</var> is unlikely to be in the correct position.
To move <var>V</var> to the right place, it is compared to its
parent's value.
If the value of <var>V</var> is less than or equal to the value of its
parent, then it is in the correct place and the insert routine is
finished.
If the value of <var>V</var> is greater than that of its parent, then
the two elements swap positions.
From here, the process of comparing <var>V</var> to its (current)
parent continues until <var>V</var> reaches its correct position.
</p>

<p>
Since the heap is a complete binary tree, its height is guaranteed to
be the minimum possible.
In particular, a heap containing <i>n</i> nodes will have a height of
&Theta;(<i>n</i> log <i>n</i>).
Intuitively, we can see that this must be true because each level that
we add will slightly more than double the number of nodes in the tree
(the <i>i</i>th level has 2<sup><i>i</i></sup> nodes,
and the sum of the first <i>i</i>
levels is 2<sup><i>i</i>+1</sup>-1).
Starting at 1, we can double only log <i>n</i> times to reach a value
of <i>n</i>.
To be precise, the height of a heap with <i>n</i> nodes is
&lceil;log <i>n</i>+1&rceil;.
</p>

<p>
Each call to <code>insert</code> takes &Theta;(log <i>n</i> time in the
worst case, because the value being inserted can move at most the
distance from the bottom of the tree to the top of the tree.
Thus, to insert <i>n</i> values into the heap, if we insert them 
one at a time, will take &Theta;(<i>n</i> log <i>n</i>) time in the
worst case.
</p>

<figure>
<center>
<img src="Images/HeapBld.png" alt="Two series of exchanges to build a heap" />
</center>

<figcaption>
<ODSAfig "HeapBuild" />
Two series of exchanges to build a max-heap.
(a) This heap is built by a series of nine exchanges in the order
(4-2), (4-1), (2-1), (5-2), (5-4), (6-3), (6-5), (7-5), (7-6).
(b) This heap is built by a series of four exchanges in the order
(5-2), (7-3), (7-1), (6-1).
</figcaption>
</figure>

<p>
If all <i>n</i> values are available at the beginning of the
building process, we can build the heap faster than just
inserting the values into the heap one by one.
Consider Figure <ODSAref "HeapBuild" />(a), which shows one series of
exchanges that could be used to build the heap.
All exchanges are between a node and one of its children.
The heap is formed as a result of this exchange process.
The array for the right-hand tree of
Figure <ODSAref "HeapBuild" />(a) would appear as follows:
</p>

<img src="http://www.forkosh.com/mathtex.cgi?
\sffamily
\begin{tabular}{|c|c|c|c|c|c|c|}
\hline
\rule{0pt}{12pt}7&4&6&1&2&3&5\\
\hline
\end{tabular}"
   alt="" border=0 align="middle">

<p>
Figure <ODSAref "HeapBuild" />(b) shows an alternate series of
exchanges that also forms a heap, but much more efficiently.
The equivalent array representation would be
</p>

<img src="http://www.forkosh.com/mathtex.cgi?
\sffamily
\begin{tabular}{|c|c|c|c|c|c|c|}
\hline
\rule{0pt}{12pt}7&5&6&4&2&1&3\\
\hline
\end{tabular}"
   alt="" border=0 align="middle">

<p>
From this example, it is clear that the heap for any given
set of numbers is not unique, and we see that some rearrangements of
the input values require fewer exchanges than others to build the
heap.
So, how do we pick the best rearrangement?
</p>

<p>
One good algorithm stems from induction.
Suppose that the left and right subtrees of the root are already
heaps, and <var>R</var> is the name of the element at the root.
This situation is illustrated by Figure <ODSAref "HeapInduct" />.
In this case there are two possibilities.
(1) <var>R</var> has a value greater than or equal to its two
children.
In this case, construction is complete.
(2) <var>R</var> has a value less than one or both of its children.
In this case, <var>R</var> should be exchanged with the child that has
greater value.
The result will be a heap, except that <var>R</var>
might still be less than one or both of its (new) children.
In this case, we simply continue the process of "pushing down"
<var>R</var> until it reaches a level where it is greater than its
children, or is a leaf node.
This process is implemented by the private method
<code>siftdown</code>.
The siftdown operation is illustrated by
Figure <ODSAref "SiftPic" />.
</p>

<figure>
<center>
<img src="Images/HeapInd.png" alt="An example of heap building" />
</center>

<figcaption>
<ODSAfig "HeapInduct" />
Final stage in the heap-building algorithm.
Both subtrees of node <var>R</var> are heaps.
All that remains is to push <var>R</var> down to its proper level in
the heap.
</figcaption>
</figure>

<figure>
<center>
<img src="Images/SiftPic.png" alt="The siftdown operation" />
</center>

<figcaption>
<ODSAfig "SiftPic" />
The siftdown operation.
The subtrees of the root are assumed to be heaps.
(a) The partially completed heap.
(b) Values 1 and 7 are swapped.
(c) Values 1 and 6 are swapped to form the final heap.
</figcaption>
</figure>

<p>
This approach assumes that the subtrees are already heaps,
suggesting that a complete algorithm can be obtained by visiting
the nodes in some order such that the children of a node are
visited <em>before</em> the node itself.
One simple way to do this is simply to work from the high index of
the array to the low index.
Actually, the build process need not visit the leaf nodes
(they can never move down because they are already at the bottom), so
the building algorithm can start in the middle of the array, with the
first internal node.
The exchanges shown in Figure <ODSAref "HeapBuild" />(b) result from
this process.
Method <code>buildHeap</code> implements the building algorithm.
</p>

<p>
What is the cost of <code>buildHeap</code>?
Clearly it is the sum of the costs for the calls to
<code>siftdown</code>.
Each <code>siftdown</code> operation can cost at most the number of
levels it takes for the node being sifted to reach the bottom of the
tree.
In any complete tree, approximately half of the nodes are leaves
and so cannot be moved downward at all.
One quarter of the nodes are one level above the leaves, and so their
elements can move down at most one level.
At each step up the tree we get half the number of nodes as were at
the previous level, and an additional height of one.
The maximum sum of total distances that elements can go is
therefore
</p>

<img src="http://www.forkosh.com/mathtex.cgi?
\sum_{i=1}^{\log n} (i-1)\frac{n}{2^i}
= \frac{n}{2}\sum_{i=1}^{\log n} \frac{i-1}{2^{i-1}}.
"
   alt="" border=0 align="middle">

<p>
From Equation <ODSAref "IHalvesSum" /> we know that this summation
has a closed-form solution of approximately 2,
so this algorithm takes &Theta;(<i>n</i>) time in the worst case.
This is far better than building the heap one element at a time,
which would cost &Theta;(<i>n</i> log <i>n</i>) in the worst case.
It is also faster than the &Theta;(<i>n</i> log <i>n</i>) average-case
time and &Theta;(<i>n</i><sup>2</sup>) worst-case time required to
build the BST.
</p>

<p>
Removing the maximum (root) value from a heap
containing <i>n</i> elements requires that we maintain the complete
binary tree shape, and that the remaining <i>n</i>-1 node values
conform to the heap property.
We can maintain the proper shape by moving the element in the last
position in the heap (the current last element in the array) to the
root position.
We now consider the heap to be one element smaller.
Unfortunately, the new root value is probably
<em>not</em> the maximum value in the new heap.
This problem is easily solved by using <code>siftdown</code> to reorder
the heap.
Because the heap is log <i>n</i> levels deep, the cost of deleting
the maximum element is &Theta;(log <i>n</i>) in the average and worst
cases.
</p>

<p>
The heap is a natural implementation for the priority queue discussed
at the beginning of this section.
Jobs can be added to the heap (using their priority value as the
ordering key) when needed.
Method <code>removemax</code> can be called whenever a new job is to be
executed.
</p>

<p>
Some applications of priority queues require the ability to change the
priority of an object already stored in the queue.
This might require that the object's position in the heap representation
be updated.
Unfortunately, a max-heap is not efficient when searching for an
arbitrary value; it is only good for finding the maximum value.
However, if we already know the index for an object within the heap,
it is a simple matter to update its priority (including changing its
position to maintain the heap property) or remove it.
The <code>remove</code> method takes as input the position of the
node to be removed from the heap.
A typical implementation for priority queues requiring updating of
priorities will need to use an auxiliary data structure that supports
efficient search for objects (such as a BST).
Records in the auxiliary data structure will store
the object's heap index, so that the object can be
deleted from the heap and reinserted with its new priority.
Modules <ODSAref "SSSP" /> and <ODSAref "PrimsSec" /> present
applications for a priority queue with priority updating.
</p>

<section>
<p id="fn1"><a href="#r1">[1]</a>
Note that the term "heap" is also sometimes used to refer to a memory
pool.
<ODSAif "MemMan">
(See Module <ODSAref "MemMan" />.)
</ODSAif>
</p>
</section>

</div>
