.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Algorithm Analysis

Calculating Program Running Time [Raw]
======================================

This section presents the analysis for several simple code
fragments.

\begin{example}
We begin with an analysis of a simple assignment to an integer
variable.

\vspace{-\medskipamount}
\xprogexamp{c3p2.book}

\vspace{-\medskipamount}
\noindent Because the assignment statement takes constant time, it is
\Thetaone.
\end{example}

\begin{example}
\label{FLAnal}
Consider a simple \Cref{for} loop.

\vspace{-\medskipamount}
\xprogexamp{c3p3.book}

\vspace{-\medskipamount}
The first line is~\Thetaone.
The \Cref{for} loop is repeated \(n\) times.
The third line takes constant time so, by simplifying rule~(4)
of Section~\ref{SimpRule}, the total cost for executing the two lines
making up the \Cref{for} loop is \Thetan.
By rule~(3), the cost of the entire code fragment is also
\Thetan.
\end{example}

\begin{example}
We now analyze a code fragment with several \Cref{for}
loops, some of which are nested.

\vspace{-\medskipamount}
\xprogexamp{c3p4.book}

\vspace{-\medskipamount}
This code fragment has three separate statements: the
first assignment statement and the two \Cref{for} loops.
Again the assignment statement takes constant time;
call it \(c_1\).
The second \Cref{for} loop is just like the one in
Example~\ref{FLAnal} and takes \(c_2 n\) = \Thetan\ time.

The first \Cref{for} loop is a double loop and requires a special
technique.
We work from the inside of the loop outward.
The expression \Cref{sum++} requires constant time; call it \(c_3\).
Because the inner \Cref{for} loop is executed \(i\)~times,
by simplifying rule (4) it has cost \(c_3i\).
The outer \Cref{for} loop is executed \(n\)~times, but each time
the cost of the inner loop is different because it costs \(c_3i\) with
\(i\) changing each time.
You should see that for the first execution of the outer loop,
\(i\)~is~1.
For the second execution of the outer loop, \(i\)~is~2.
Each time through the outer loop, \(i\)~becomes one greater, until
the last time through the loop when \(i = n\).
Thus, the total cost of the loop is \(c_3\) times the sum of the
integers~1 through~\(n\).\index{summation}
From Equation~\ref{Sumi}, we know that
\[\sum_{i = 1}^{n} i = \frac{n (n+1)}{2},\]
which is \Thetantwo.
By simplifying rule (3), \(\Theta(c_1 + c_2 n + c_3 n^2)\) is
simply \Thetantwo.
\end{example}

\begin{example}
Compare the asymptotic analysis for the following two code
fragments:

\xprogexamp{c3p5.book}

In the first double loop, the inner \Cref{for} loop always executes
\(n\) times.
Because the outer loop executes \(n\) times, it should be obvious
that the statement \Cref{sum1++} is executed precisely \(n^2\) times.
The second loop is similar to the one analyzed in the previous
example, with cost \(\sum_{j = 1}^{n} j\).\index{summation}
This is approximately \({1 \over 2} n^2\).
Thus, both double loops cost \Thetantwo, though the second requires
about half the time of the first.
\end{example}

\begin{example}
Not all doubly nested \Cref{for} loops are \Thetantwo.
The following pair of nested loops illustrates this fact.

\xprogexamp{c3p6.book}

When analyzing these two code fragments, we will assume that \(n\) is
a power of two.
The first code fragment has its outer \Cref{for} loop executed
\(\log n+1\) times because on each iteration~\(k\) is multiplied by
two until it reaches~\(n\).
Because the inner loop always executes \(n\) times, the total cost for
the first code fragment can be expressed as
\(\sum_{i=0}^{\log n} n\).\index{summation}
Note that a variable substitution takes place here to create the
summation, with \(k = 2^i\).
From Equation~\ref{SumLog}, the solution for this summation is
\Thetanlogn.
In the second code fragment, the outer loop is also executed
\(\log n+1\) times.
The inner loop has cost \(k\), which doubles each time.
The summation can be expressed as \(\sum_{i=0}^{\log n} 2^i\)
where~\(n\) is assumed to be a power of two and again
\(k = 2^i\).\index{summation}
From Equation~\ref{SumExLog}, we know that this summation is
simply~\Thetan.
\end{example}

What about other control statements?
\Cref{While} loops are analyzed in a manner similar to \Cref{for}
loops.
The cost of an \Cref{if} statement in the worst case is the greater of
the costs for the \Cref{then} and \Cref{else} clauses.
This is also true for the average case, assuming that
the size of~\(n\) does not affect the probability of executing one of
the clauses (which is usually, but not necessarily, true).
For \Cref{switch} statements, the worst-case cost is that of the most
expensive branch.
For subroutine calls, simply add the cost of executing the subroutine.

There are rare situations in which the probability for executing the
various branches of an \Cref{if} or \Cref{switch} statement are
functions of the input size.
For example, for input of size~\(n\), the \Cref{then} clause of an
\Cref{if} statement might be executed with probability \(1/n\).
An example would be an \Cref{if} statement that executes the
\Cref{then} clause only for the smallest of~\(n\) values.
To perform an average-case analysis for such programs,
we cannot simply count the cost of the \Cref{if}
statement as being the cost of the more expensive branch.
In such situations, the technique of
amortized analysis\index{amortized analysis}
(see Section~\ref{AmortAnal}) can come to the rescue.

Determining the execution time of a recursive
subroutine can be difficult.
The running time for a recursive\index{recursion} subroutine is
typically best expressed by a recurrence relation.
For example, the recursive factorial\index{factorial function}
function \Cref{fact} of Section~\ref{Recurse} calls itself with a
value one less than its input value.
The result of this recursive call is then multiplied by the input
value, which takes constant time.
Thus, the cost of the factorial function, if we wish to measure cost
in terms of the number of multiplication operations,
is one more than the number of multiplications made by the recursive
call on the smaller input.
Because the base case does no multiplications, its cost is zero.
Thus, the running time for this function can be expressed as
\[ \Tn = \Tnone + 1 \ \mbox{for}\ n>1;\ \ T(1) = 0.\]
\noindent We know from Examples~\ref{FactRecurSol} and
\ref{FactRecurProof} that 
the closed-form solution for this recurrence relation
is \Thetan.

\index{search!sequential|(}
\index{search!binary|(}
The final example of algorithm analysis for this section will compare
two algorithms for performing search in an array.
Earlier, we determined that the running time for sequential search on
an array where the search value \(K\) is equally likely to appear in any
location is \Thetan\ in both the average and worst cases.
We would like to compare this running time to that required to perform
a \defit{binary search} on an array whose values are stored in order
from lowest to highest.

Binary search begins by examining the value in the middle
position of the array; call this position \(mid\) and the
corresponding value \(k_{mid}\).
If \mbox{\(k_{mid} = K\)}, then processing can stop immediately.
This is unlikely to be the case, however.
Fortunately, knowing the middle value provides useful information
that can help guide the search process.
In particular, if \mbox{\(k_{mid} > K\)},
then you know that the value~\(K\)
cannot appear in the array at any position greater than~\(mid\).
Thus, you can eliminate future search in the upper half of the array.
Conversely, if \mbox{\(k_{mid} < K\)}, then you know that you can
ignore all positions in the array less than~\(mid\).
Either way, half of the positions are eliminated from further
consideration.
Binary search next looks at the middle position in that part of the
array where value \(K\) may exist.
The value at this position again allows us to eliminate half
of the remaining positions from consideration.
This process repeats until either the desired value is found, or
there are no positions remaining in the array that might contain the
value \(K\).
Figure~\ref{BinSchFig} illustrates the binary search method.
Figure~\ref{BinSchCode} shows an implementation for binary search.

\begin{figure}
\pdffig{BinSch}

\capt{4.5in}{Illustration of binary search}
{An illustration of binary search on a sorted array of 16~positions.
Consider a search for the position with value \(K = 45\).
Binary search first checks the value at position~7.
Because \(41 < K\), the desired value cannot
appear in any position below~7 in the array.
Next, binary search checks the value at position~11.
Because \(56 > K\), the desired value (if it exists) must be between
positions~7 and~11.
Position~9 is checked next.
Again, its value is too great.
The final search is at position~8, which contains the desired value.
Thus, function \Cref{binary} returns position~8.
Alternatively, if \(K\) were 44, then the same series of record accesses
would be made.
After checking position~8, \Cref{binary} would return a value of
\(n\), indicating that the search is unsuccessful.}{BinSchFig}
\bigskip
\end{figure}

\begin{figure}
\xprogfig{bsearch.book}

\vspace{-\bigskipamount}
\capt{4.5in}{Binary search implementation}
{Implementation for binary search.}{BinSchCode}
\end{figure}

To find the cost of this algorithm in the worst case, we can model the
running time as a recurrence and then find the closed-form solution.
Each recursive call to \Cref{binary} cuts the size of the array
approximately in half, so we can model the worst-case cost as follows,
assuming for simplicity that \(n\) is a power of two.

\[\Tn = \Tnhalf + 1\ \mbox{for}\ n>1; \quad \Tone = 1.\]

If we expand the recurrence, we find that we can do so only
\(\log n\) times before we reach the base case, and each expansion
adds one to the cost.
Thus, the closed-form solution for the recurrence is \(\Tn = \log n\).

Function \Cref{binary} is designed to find the
(single) occurrence of \(K\) and return its position.
A special value is returned if \(K\) does not appear in the array.
This algorithm can be modified to implement variations 
such as returning the position of the first
occurrence of \(K\) in the array if multiple occurrences are allowed,
and returning the position of the greatest value less than \svar{K}
when \(K\) is not in the array.

Comparing sequential search to binary search, we see that as \(n\)
grows, the \Thetan\ running time for sequential search in the
average and worst cases quickly becomes much greater than the
\Thetalogn\ running time for binary search.
Taken in isolation, binary search appears to be much more
efficient than sequential search.
This is despite the fact that the constant factor for binary search is 
greater than that for sequential search, because the calculation for
the next search position in binary search is more expensive than just
incrementing the current position, as sequential search does.

Note however that the running time for sequential search will be
roughly the same regardless of whether or not the array values are
stored in order.
In contrast, binary search requires that the array values be ordered
from lowest to highest.
Depending on the context in which binary search is to be used, this
requirement for a sorted array could be detrimental to the running
time of a complete program, because  maintaining the values in sorted
order requires to greater cost when inserting new elements into the
array.
This is an example of a tradeoff\index{tradeoff} between the
advantage of binary search during search and the disadvantage related
to maintaining a sorted array.
Only in the context of the complete problem to be solved can we know
whether the advantage outweighs the disadvantage.
