
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
