.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Math Background

Summations and Recurrence Relations [RAW]
=========================================

Most programs contain loop constructs.
When analyzing running time costs for programs with loops, we
need to add up the costs for each time the loop is executed.
This is an example of a \defit{summation}.
Summations are simply the sum of costs for some function applied to a
range of parameter values.\index{summation!notation}
Summations are typically written with the following ``Sigma''
notation:
\[\sum_{i=1}^{n} f(i).\]
\noindent This notation indicates that we are summing the value of
\(f(i)\) over some range of (integer) values.
The parameter to the expression and its initial value are indicated
below the \(\sum\) symbol.
Here, the notation \(i=1\) indicates that the parameter is \(i\) and that
it begins with the value 1.
At the top of the \(\sum\) symbol is the expression \(n\).
This indicates the maximum value for the parameter \(i\).
Thus, this notation means to sum the values of \(f(i)\) as \(i\)~ranges
across the integers from 1 through~\(n\).
This can also be written
\(f(1) + f(2) + \cdots + f(n-1) + f(n).\)
\noindent Within a sentence, Sigma notation is typeset as
\(\sum_{i=1}^{n} f(i).\)

Given a summation, you often wish to replace it with an algebraic
equation with the same value as the summation.
This is known as a \defit{closed-form solution},
and the process of replacing the summation with its closed-form
solution is known as \defit{solving} the summation.
For example, the summation
\(\sum_{i=1}^{n} 1\)
is simply the expression ``1'' summed \(n\) times (remember
that \(i\) ranges from 1 to \(n\)).
Because the sum of \(n\) 1s is \(n\),
the closed-form solution is \(n\).
The following is a list of useful summations,
along with their closed-form solutions.
\index{summation!list of solutions}
\addtolength{\jot}{1pt}
\begin{eqnarray}
\sum_{i = 1}^{n} i &=& \frac{n (n+1)}{2}.\label{Sumi}\\
\sum_{i = 1}^{n} i^2 &=& \frac{2 n^3 + 3 n^2 + n}{6} =
\frac{n(2n + 1)(n + 1)}{6}.\label{SumSquare}\\
\sum_{i = 1}^{\log n} n &=& n \log n.\label{SumLog}\\
\sum_{i = 0}^\infty a^i &=& \frac{1}{1-a}\ \mbox{for}
  \ 0 < a < 1.\label{FracSum}\\
\sum_{i=0}^{n} a^i &=& \frac{a^{n+1} - 1}{a - 1}\ \mbox{for}
  \ a \neq 1.\label{GenPowerSum}\\
\noalign{\hbox{\rule{0in}{1pc}As special cases to
Equation~\ref{GenPowerSum},}}
\rule{0in}{1.7pc}
\sum_{i = 1}^{n} \frac{1}{2^i} &=& 1 - \frac{1}{2^n},\label{SumHalves}\\
\noalign{\hbox{\rule{0in}{1pc}and}}
\rule{0in}{1.7pc}\sum_{i = 0}^{n} 2^i &=& 2^{n+1} - 1.\label{PowerSum}\\
\noalign{\hbox{\rule{0in}{1pc}As a corollary to
Equation~\ref{PowerSum},}}
\rule{0in}{1.7pc}\sum_{i = 0}^{\log n} 2^i &=& 2^{\log n + 1} - 1 =
2n - 1.\label{SumExLog}\\
\noalign{\hbox{\rule{0in}{1pc}Finally,}}
\rule{0in}{1.7pc}
\sum_{i=1}^{n} \frac{i}{2^i} &=& 2 - \frac{n+2}{2^n}.\label{IHalvesSum}
\end{eqnarray}

The sum of reciprocals from 1 to \(n\), called the
\defit{Harmonic Series}\index{harmonic series@Harmonic Series}
and written \Harmonic, has a value between
\(\log_e n\) and \(\log_e n + 1\).
To be more precise, as \(n\) grows,
the summation grows closer to
\begin{equation}
\Harmonic \approx \log_e n + \gamma + \frac{1}{2n},\label{HarmonicEq}
\end{equation}
where \(\gamma\) is Euler's constant and has the value 0.5772...
\index{summation!list of solutions}
\index{summation|)}

Most of these equalities can be proved easily by mathematical
induction (see Section~\ref{Induct}).\index{proof!induction}
Unfortunately, induction does not help us derive a closed-form
solution.
It only confirms when a proposed closed-form solution is correct.
Techniques for deriving closed-form solutions are discussed
in Section~\ref{Summation}.

\index{recurrence relation|(}
The running time for a recursive algorithm is most easily expressed by
a recursive expression because the total time for the recursive
algorithm includes the time to run the recursive
call(s).\index{recursion}
A \defit{recurrence relation} defines a function by means of an
expression that includes one or more (smaller) instances of itself.
A classic example is the recursive definition for the
factorial function\index{factorial function}:
\[n! = (n-1)! \cdot n\ \mbox{for}\ n>1; \quad 1! = 0! = 1.\]
Another standard example of a recurrence is the Fibonacci
sequence:\index{fibonacci sequence@Fibonacci sequence}
\[\mbox{Fib}(n) = \mbox{Fib}(n-1) + \mbox{Fib}(n-2)\ \mbox{for}\ n>2;
\quad\mbox{Fib}(1) = \mbox{Fib}(2) = 1.\]
From this definition, the first seven numbers of the
Fibonacci sequence are \[1, 1, 2, 3, 5, 8,\ \mbox{and}\ 13.\]
Notice that this definition contains two parts: the general
definition for \(\mbox{Fib}(n)\) and the base cases for \(\mbox{Fib}(1)\)
and \(\mbox{Fib}(2)\). 
Likewise, the definition for factorial contains a recursive part and
base cases.

Recurrence relations are often used to model the cost of recursive
functions.\index{recursion}
For example, the number of multiplications required by function
\Cref{fact} of Section~\ref{Recurse} for an input of size \(n\) will
be zero when \(n = 0\) or \(n = 1\) (the base cases), and it will be
one plus the cost of calling \Cref{fact} on a value of \(n-1\).
This can be defined using the following recurrence:
\[\Tn = \Tnone + 1\ \mbox{for}\ n>1;
\quad \cvar{T}(0) = \cvar{T}(1) = 0.\]

As with summations, we typically wish to replace the recurrence
relation with a closed-form solution.
One approach is to \defit{expand} the recurrence by replacing any
occurrences of \cvar{T} on the right-hand side with its definition.

\begin{example}
\label{FactRecurSol}
If we expand the recurrence \(\Tn = \Tnone + 1\), we get 
\begin{eqnarray*}
\Tn &=& \Tnone + 1\\
&=& (\cvar{T}(n-2) + 1) + 1.\\
\end{eqnarray*}

We can expand the recurrence as many steps as we like, but the goal is 
to detect some pattern that will permit us to rewrite the recurrence
in terms of a summation.
In this example, we might notice that
\[(\cvar{T}(n-2) + 1) + 1 = \cvar{T}(n-2) + 2\]
\noindent and if we expand the recurrence again, we get
\[\Tn = \cvar{T}(n-2) + 2 = \cvar{T}(n-3) + 1 + 2 = \cvar{T}(n-3) + 3\]
\noindent which generalizes to the pattern \(\Tn = \cvar{T}(n-i) + i.\)
We might conclude that
\begin{eqnarray*}
\Tn &=& \cvar{T}(n - (n-1)) + (n - 1)\\
&=& \cvar{T}(1) + n-1\\
&=& n-1.
\end{eqnarray*}

Because we have merely guessed at a pattern and not actually proved
that this is the correct closed form solution, we should use an
induction proof to complete the process
(see Example~\ref{FactRecurProof}). 
\end{example}

\begin{example}
A slightly more complicated recurrence is
\[\Tn = \Tnone + n; \quad T(1) = 1.\]
Expanding this recurrence a few steps, we get
\begin{eqnarray*}
\Tn &=& \Tnone + n\\
&=& \cvar{T}(n-2) + (n-1) + n\\
&=& \cvar{T}(n-3) + (n-2) + (n-1) + n.\\
\end{eqnarray*}
We should then observe that this recurrence appears to have a pattern
that leads to
\begin{eqnarray*}
\Tn &=& \cvar{T}(n-(n-1)) + (n-(n-2)) + \cdots + (n-1) + n\\
&=& 1 + 2 + \cdots + (n-1) + n.
\end{eqnarray*}
This is equivalent to the summation \(\sum_{i=1}^n i\), for which we
already know the closed-form solution.
\end{example}

Techniques to find closed-form solutions for recurrence relations are
discussed in Section~\ref{Recurrence}.
Prior to Chapter~\ref{AnalTech},
recurrence relations are used infrequently in this book, and
the corresponding closed-form solution and an explanation for how it
was derived will be supplied at the time of use.
