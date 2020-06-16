.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies: Reduction
   :topic: Complexity Analysis

.. slideconf::
   :autoslides: False

                
Reductions
==========

.. slide:: Reductions

   | A **reduction** is a transformation of one problem to another.

   | Purposes: To compare the difficulty of two problems.
   |    Use one algorithm to solve another problem (upper bound).
   |    Compare the relative difficulty of two problems (lower bound).

   | Notation: A problem is a mapping of inputs to outputs. Format looks as
     follows:

   | SORTING:
   |    Input: A sequence of integers :math:`x_0, x_1, ..., x_{n-1}`.
   |    Output: A permutation :math:`y_0, y_1, ..., y_{n-1}` of the
        sequence such that :math:`y_i \leq y_j` whenever :math:`i < j`.


.. slide:: PAIRING (1)

   | PAIRING:
   |    Input: Two sequences of integers :math:`X = (x_0, x_1, ..., x_{n-1})`
        and :math:`Y = (y_0, y_1, ..., y_{n-1})`.
   |    Output: A pairing of the elements in the two sequences such that
        the least value in :math:`X` is paired with the least value in
        :math:`Y`, and so on.

   How can we solve this?


.. slide:: PAIRING (2)

   | PAIRING:
   |    Input: Two sequences of integers :math:`X = (x_0, x_1, ..., x_{n-1})`
        and :math:`Y = (y_0, y_1, ..., y_{n-1})`.
   |    Output: A pairing of the elements in the two sequences such that
        the least value in :math:`X` is paired with the least value in
        :math:`Y`, and so on.

   How can we solve this?

   | One algorithm:
   |    Sort :math:`X`.
   |    Sort :math:`Y`.
   |    Now, pair :math:`x_i` with :math:`y_i` for :math:`0 \leq i < n`.

   | Terminology: We say that PAIRING is **reduced** to SORTING, since
     SORTING is used to solve PAIRING.
   |    Reduce **to** the one being **used**.

   Be careful: Most confusion comes with wich direction is meant on the
   reduction.


.. slide:: PAIRING Reduction Process

   | The reduction of PAIRING to SORTING requires 3 steps:
   |    Convert an instance of PAIRING to two instances of SORTING.
   |    Run SORTING (twice).
   |    CONVERT the output for the two instances of SORTING to an output
        for the original PAIRING instance.

   <<What do we require about the transformations to make them useful?>>

   <<What is the cost of this algorithm?>>

   .. :math:`\Theta(n \log n)`.
      The transformations are linear, so the cost is dominated by sorting.


.. slide:: PAIRING Lower Bound (1)

   | We have an upper bound for PAIRING equal to that of SORTING.
   | What is the lower bound for PAIRING?
   |    Lower bounds proofs are difficult!
   |    Beware the ``necessary fallacy:'' There is no reason why a pairing
        algorithm **must** explicitly sort, nor that the resulting list be
        sorted.

.. slide:: PAIRING Lower Bound (2)

   | Pretend that there is a :math:`O(n)` time algorithm for PAIRING.
   | Consider this algorithm for SORTING:
   |    Transform SORTING to PAIRING with :math:`X` being the input
        sequence for SORTING, and :math:`Y` a sequence containing the
        values :math:`0` through :math:`n-1` 
   |    Run the :math:`O(n)` time PAIRING algorithm.
   |    Take the pairs output by PAIRING and use a simple binsort to
        order them by the second value of the pair.
        The first items of the pair will be the sorted list.

   <<What is the cost of this algorithm?>>

   .. :math:`\Theta(n)`

   <<What does this say about the existence of an :math:`O(n)` time
   algorithm for PAIRING?

   .. It can't possibly exist, due to our known lower bound on
      sorting.


.. slide:: PAIRING Lower Bound (3)

   | This is a proof by contradiction.
   |   The only flaw in the process leading to the contradiction is the
       **assumption** of an :math:`O(n)` algorithm for PAIRING.


.. slide:: Reduction Process

Consider any two problems for which a suitable reduction from one to
the other can be found.

\Skip
The first problem $P1$ takes input instance \textbf{I} and transforms
that to solution \textbf{S}.

\Skip
The second problem $P2$ takes input instance $\textbf{I}'$ and
transforms that to solution $\textbf{S}'$.

\Skip
A \defit{reduction} is the following three-step process:
\begin{itemize}
\item Transform an arbitrary instance \textbf{I} of problem $P1$ and
transform it to a (possibly special) instance $\textbf{I}'$ of $P2$.
\note{It is important that the first transformation take an
\emph{arbitrary} instance of \textbf{I}. We don't need to be able to
produce every possible isntance of $\textbf{I}'$. But we DO need to be
able to handle every possible instance of \textbf{I}.

\Skip}

\item Apply an algorithm for $P2$ to $\textbf{I}'$, yielding
$\textbf{S}'$.
\item Transform $\textbf{S}'$ to a solution for $P1$ (\textbf{S}).
Note that \textbf{S} MUST BE THE CORRECT SOLUTION for \textbf{I}!
\end{itemize}
\end{frame}

\begin{frame}
\frametitle{Reduction Process (Cont.)}

Note that reduction is NOT an algorithm for either problem.

\Skip
It does mean, given ``cheap'' transformations, that:
\begin{itemize}
\item The upper bound for $P1$ is at most the upper bound for $P2$.
\item The lower bound for $P2$ is at least the lower bound for $P1$.
\end{itemize}
\note{no notes}
\end{frame}

\begin{frame}
\frametitle{General Black Box Diagram}

\includegraphics[scale=0.8,viewport=-125 25 200 200]{BlackBox.pdf}
%\xfig{BlackBox}{60}{110}{-90}
\note{no notes}
\end{frame}

\begin{frame}
\frametitle{Notation Summary}

\begin{itemize}
\item Problem A has input \textbf{I}, solution \textbf{SLN}
\item Problem B has input $\textbf{I}'$, solution $\textbf{SLN}'$
\item Problem A is reduced to Problem B
\item Problem A is \underline{solved} by reducing \underline{to}
  Problem B (which has known upper bound)
\item We \underline{prove} a lower bound on B by a reduction
  \underline{from} Problem A (which has known lower bound)
\item Transformations 1 and 2 must be ``cheap''
\item We must be able to accept the full range of inputs I to Problem
  A.
\item However, $\textbf{I}'$ may be a restricted subset of all
  possible inputs to B.
\end{itemize}


\note{no notes}
\end{frame}

\begin{frame}
\frametitle{PAIRING Reduction Black Box}

\includegraphics[scale=0.7,viewport=-125 100 200 200]{PairingBox.pdf}
%\xfig{PairingBox}{60}{110}{-90}
\note{no notes}
\end{frame}

\begin{frame}
\frametitle{PAIRING Notation}

\begin{itemize}
\item Transform 1 takes input \textbf{I} and produces output
$\textbf{I}'$.
\item \textbf{I} is a sequence S.
\item $\textbf{I}'$ is two sequences: S and the set of numbers from 0
to $n-1$.
\item Transform 1 takes a sequence as input, and produces the two
  sequences as output.
\item Transform 2 takes $\textbf{SLN}'$ as input and produces output
\textbf{SLN}.
\item $\textbf{SLN}'$ is a pairing.
\item \textbf{SLN} is a sorted sequence
\item Transform 2 takes the pairing and runs a binsort on it to
  generate the sorted sequence.
\end{itemize}

\note{no notes}
\end{frame}


\begin{frame}
\frametitle{Another Reduction Example}

How much does it cost to multiply two $n$-digit numbers?
\begin{itemize}
\item Naive algorithm requires $\Theta(n^2)$ single-digit
multiplications.
\item Faster (but more complicated) algorithms are known, but none so
fast as to be $O(n)$.
\end{itemize}

\Skip
Is it faster to square an $n$-digit number than it is to multiply two
$n$-digit numbers?
\begin{itemize}
\item This is a special case, so might go faster.

\pause
\item Answer: No, because
\[X \times Y = \frac{(X + Y)^2 - (X - Y)^2}{4}.\]
\note{$(X + Y)^2 - (X - Y)^2 = X^2 + 2XY + Y^2 - (X^2 - 2XY + Y^2) =
4XY$}
\end{itemize}

\vspace{-\smallskipamount}

If a fast algorithm can be found for squaring, then it could be used
to make a fast algorithm for multiplying.
\end{frame}

\begin{frame}
\frametitle{Matrix Multiplication}

Standard matrix multiplication for two $n \times n$ matrices requires
$\Theta(n^3)$ multiplications.

\Skip
Faster algorithms are known, but none so fast as to be $O(n^2)$.

\Skip
A \defit{symmetric} matrix is one in which $M_{ij} = M_{ji}$.

\Skip
Can we multiply symmetric matrices faster than regular matrices?
\note{It is a fairly standard approach to dealing with hard problems
to try to solve some important special cases of those problems in a
fast way. Maybe this is a useful special case that can be solved
fast.}

\pause
\[
\left[
\begin{array}{cc}
0&\svar{A}\\
\svar{A}^{\rm T}&0
\end{array}
\right]
\left[
\begin{array}{cc}
0&\svar{B}^{\rm T}\\
\svar{B}&0
\end{array}
\right] =
\left[
\begin{array}{cc}
\svar{AB}&0\\
0&\svar{A}^{\rm T}\svar{B}^{\rm T}
\end{array}
\right].\]

\note{\Skip

So, the answer is NO. Because, if we could, then this would give
us a way to do regular matrix multiplication fast:
\begin{enumerate}
\item Take each matrix and turn it into a symmetric matrix
\item Multiply the two symmetric matrices
\item Pull out the answer for AB
\end{enumerate}
}
\end{frame}


\begin{frame}
\frametitle{Bounds Theorems (1)}

\defit{Notation}: $\leq_{O(g(n))}$ means that a reduction can be done
with transformations that cost $O(g(n))$.
\Skip

\defit{Lower Bound Theorem}: If $P_1 \leq_{O(g(n))} P_2$, there is a
lower bound of $\Omega(h(n))$ on the time complexity of $P_1$, and
$g(n) = o(h(n))$, then there is a lower bound of $\Omega(h(n))$ on
$P_2$.
\note{Notice o, not O.}

Example:
\begin{itemize}
\item SORTING $\leq_{O(n)}$ PAIRING.
\item $g(n) = n$. \quad $h(n) = n \log n$. \quad $g(n) = o(h(n))$.
\item Theorem gives \Omeganlogn\ lower bound on PAIRING.
\end{itemize}
\end{frame}

\begin{frame}
\frametitle{Bounds Theorems (2)}

\defit{Upper Bound Theorem}: If $P_2$ has time complexity $O(h(n))$
and $P_1 \leq_{O(g(n))} P_2$, then $P_1$ has time complexity
$O(g(n) + h(n))$.

\note{
So, given good transformations, both problems take at least
$\Omega(P_1)$ and at most $O(P_2)$.}
\vfill
\end{frame}


\begin{frame}
\frametitle{Simple Polygon Lower Bound (1)}

\begin{itemize}
\item
SIMPLE POLYGON: Given a set of $n$ points in the plane, find a simple
polygon with those points as vertices.
(``Simple'' means that no lines cross.)

\pause
\item
SORTING $\leq_{O(n)}$ SIMPLE POLYGON.

\item
Instance of SORTING: $\{x_1, x_2, \cdots, x_n\}$.
\begin{itemize}
\itemsep=0pt
\item In linear time, find $M = \max|x_i|$.
\item Let $C$ be a circle centered at the origin, of radius $M$.
\end{itemize}

\item
Instance of SIMPLE POLYGON:
$$\{(x_1, \sqrt{M^2 - x_i^2}), \cdots, (x_n, \sqrt{M^2 - x_n^2})\}.$$

All these points fall on $C$ in their sorted order.

\item
The only simple polygon having the points on $C$ as vertices is the
convex one.
\end{itemize}
\note{no notes}
\vfill
\end{frame}

\begin{frame}
\frametitle{Simple Polygon Lower Bound (2)}

\includegraphics[scale=0.4,viewport=-75 0 200 350]{SimplePolygon.png}

\begin{itemize}
\item
Sort 0, -3, 2, 10, 5

\item
Lower Bound Theorem: SIMPLE POLYGON is $\Omega(n \log n)$.
\end{itemize}
\note{No notes}
\vfill
\end{frame}


\begin{frame}
\frametitle{Categories of Hard Problems (1)}
%Rawlins p10

\begin{itemize}

\item A conceptually hard problem.
\begin{itemize}
\item If we understood the problem, the algorithm might be
easy. [Natural Language Processing]
\note{Or maybe not, but it still might run fast.}
\item Artificial Intelligence.
\end{itemize}

\pause
\item An analytically hard problem.
\begin{itemize}
\item We have an algorithm, but can't analyze its cost. [Collatz
sequence]

\note{\Skip

Important to realize: Difficulty of analyzing the cost is a
different issue from what the cost \textbf{is}!}
\item Complexity Theory.
\end{itemize}
\end{itemize}
\end{frame}

\begin{frame}
\frametitle{Categories of Hard Problems (2)}

\begin{itemize}
\item
A computationally hard problem.
\begin{itemize}
\item The algorithm is expensive.
\item Class 1: No inexpensive algorithm is possible. [TOH]
\item Class 2: We don't know if an inexpensive algorithm is
possible. [Traveling Salesman]
\note{\NP-complete problems.

A major focus for this course: Determining if a problem is
computationally hard.

\Skip}
\item Complexity Theory
\end{itemize}

\pause
\item
A computationally unsolvable problem. [Halting problem]
\begin{itemize}
\item Computability Theory.
\note{No such algorithm can possibly exist.}
\end{itemize}
\end{itemize}

\end{frame}

\begin{frame}
\frametitle{Some Puzzles}
%Rawlins p52

1. A hiker leaves at 8:00 AM and hikes over the mountain.
The next day, she again leaves at 8:00 AM and returns to her starting
point along the same path.
Prove that there is a point on the path such that she was at that
point at the same time on both days.
\note{Pretend that she is walking both ways on the same day. She must
meet her self at some point (which means that she at the same place at
the same time).

\Skip}

\pause
\Skip
2. Take a chessboard and cover it with dominos (a domino covers two
adjacent squares of the board).  Now, remove the upper left and lower
right corners of the board.  Now, can it still be covered with
dominos?
\note{No. We lost two squares of the same color. A domino covers
a square of each color. So it can only work when there are an equal
number of squares of each color.

\Skip}

\pause
\Skip
These puzzles have the quality that, while their answers may be hard
to FIND, they are easy to CHECK.

\pause
\medskip
3. Is 667 composite or prime?
\note{If I give you two factors, its easy to check. BUT if I claim the
number is prime, how do you check? How do I prove to you that its
prime?
You have to do as much work verifying as I did solving.}
\end{frame}


\begin{frame}
\frametitle{Hard Problems (1)}

We say that a problem is computationally ``hard'' if the running time
of the best known algorithm is exponential on the size of its input.
\note{Conversely, polynomial-time algorithms are (relatively)
``easy.''}

\pause
\Skip
Support:
\begin{itemize}
\item Polynomials are closed under composition and addition.

\begin{itemize}
\item Doing polynomial time operations in series is polynomial.
\end{itemize}

\pause
\item All computers today are polynomially related.
\begin{itemize}
\item If it takes polynomial time on one computer, it will take
polynomial time on any other computer.
\end{itemize}

\pause
\item Polynomial time is (generally) feasible, while exponential time
is (generally) infeasible.
\begin{itemize}
\item An empirical observation: For most polynomial-time algorithms,
the polynomial is of low degree.
\end{itemize}
\end{itemize}
\end{frame}

\begin{frame}
\frametitle{Hard Problems (2)}

Note that for a faster machine, the size of problem that can be run in
a fixed amount of time
\begin{itemize}
\item grows by a multiplicative factor for a polynomial-time
algorithm.
\item grows by an additive factor for an exponential-time algorithm.
\end{itemize}
\note{no notes}
\end{frame}
