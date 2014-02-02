.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Advanced Analysis

Summation Techniques
====================

Consider the following simple summation.

.. math::
   \sum_{i=1}^n i.

In Module :numref:`<Proofs>` it was proved by induction that this
summation has the well-known closed form :math:`n(n+1)/2`.
But while induction is a good technique for proving that a proposed
closed-form expression is correct, 
how do we find a candidate closed-form expression to test in the first
place?
Let us try to think through this problem from first principles,
as though we had never seen it before.

A good place to begin analyzing a summation it is to give an
estimate of its value for a given :math:`n`.
Observe that the biggest term for this summation is :math:`n`,
and there are :math:`n` terms being summed up.
So the total must be less than :math:`n^2`.
Actually, most terms are much less than :math:`n`,
and the sizes of the terms grow linearly.
If we were to draw a picture with bars for the size of the terms,
their heights would form a line, and we could enclose them in a box
:math:`n` units wide and :math:`n` units high.
It is easy to see from this that a closer estimate for the summation
is about :math:`(n^2)/2`.
Having this estimate in hand helps us when trying to determine an
exact closed-form solution, because we will hopefully recognize if our
proposed solution is badly wrong.

.. TODO::
   :type: Image

   Show an image of the heights of the bars filling half the area of
   the rectangle. Later on, compare hights of bars for other sums,
   ones that don't add up to :math:`\Theta(n^2)`.

Let us now consider some ways that we might hit upon an exact equation
for the closed form solution to this summation.
One particularly clever approach that we can take is to
observe that we can ``pair up'' the first and last terms,
the second and (:math:`n-1`)th terms, and so on.
Each pair sums to :math:`n+1`.
The number of pairs is :math:`n/2`.
Thus, the solution is :math:`n(n+1)/2`.
This is pretty, and there is no doubt about it being correct.
The problem is that it is not a useful technique for solving many
other summations.

Now let us try to come up with something a bit more general.
We already recognized that, because the largest term is :math:`n` and
there are :math:`n` terms, the summation is less than :math:`n^2`.
If we are lucky, the closed form solution is a polynomial.
Using that as a working assumption,
we can invoke a technique called :term:`guess-and-test`.
We will guess that the closed-form solution for this summation is a
polynomial.
That means that we are guessing that it is of the form
:math:`c_1 n^2 + c_2 n + c_3` for some constants
:math:`c_1`, :math:`c_2`, and :math:`c_3`.
If this is true, then we can plug in the answers to small cases of the
summation to solve for the coefficients.
For this example, substituting 0, 1, and 2 for :math:`n` leads to
three simultaneous equations.
Because the summation when :math:`n = 0` is just 0, :math:`c_3` must
be 0. 
For :math:`n=1` and :math:`n=2` we get the two equations

.. math::

   \begin{eqnarray*}
   c_1 + c_2     & = & 1 \\
   4 c_1 + 2 c_2 & = & 3,
   \end{eqnarray*}

which in turn yield :math:`c_1 = 1/2` and :math:`c_2 = 1/2`.
Thus, if the closed-form solution for the summation **is** a polynomial,
then it can only be

.. math::

   1/2 n^2 + 1/2 n + 0

which is more commonly written

.. math::

   \frac{n(n+1)}{2}.

At this point, we still must do the "test" part of the
guess-and-test approach.
We can use an induction proof to verify whether our
candidate closed-form solution is correct.
In this case it is indeed correct, as shown by
Example :num:`Example #SumIEx`.
The induction proof is necessary because our initial assumption that
the solution is a simple polynomial could be wrong.
For example, it might have been that the true solution
includes a logarithmic term, such as
:math:`c_1n^2 + c_2 n \log n`.
The process shown here is essentially fitting a curve to a fixed
number of points.
Because there is always an :math:`n`-degree polynomial that fits
:math:`n+1` points, we have not done enough work to be sure that we to
know the true equation without the induction proof.

Guess-and-test is useful whenever the solution is a polynomial
expression.
In particular, similar reasoning can be used to solve for
\(\sum_{i=1}^n i^2\), or more generally \(\sum_{i=1}^n i^c\) for \(c\)
any positive integer.
Why is this not a universal approach to solving summations?
Because many summations do not have a polynomial as their closed
form solution.

A more general approach is based on the
\defit{subtract-and-guess} or \defit{divide-and-guess} strategies.
\index{summation!shifting method|(}
One form of subtract-and-guess is known as the
\defit{shifting method}. 
The shifting method subtracts the summation from a variation on the
summation.
The variation selected for the subtraction should be one that makes
most of the terms cancel out.
To solve sum \(f\), we pick a known function \(g\) and find a pattern in
terms of \(f(n) - g(n)\) or \(f(n)/g(n)\).

\begin{example}
%Rawlins example
Find the closed form solution for \(\sum_{i=1}^n i\) using
the divide-and-guess approach.
We will try two example functions to illustrate the divide-and-guess
method: dividing by \(n\) and dividing by \(f(n-1)\).
Our goal is to find patterns that we can use to guess a closed-form
expression as our candidate for testing with an
induction proof.\index{proof!induction}
To aid us in finding such patterns, we can construct a table showing
the first few numbers of each function, and the result of dividing one
by the other, as follows.

{\small
\[
\begin{array}{r|rrrrrrrrrr}
n&1&2&3&4&5&6&7&8&9&10\\
\hline
f(n)&1&3&6&10&15&21&28&36&46&57\\
n&1&2&3&4&5&6&7&8&9&10\\
f(n)/n&2/2&3/2&4/2&5/2&6/2&7/2&8/2&9/2&10/2&11/2\\
f(n\!-\!1)&0&1&3&6&10&15&21&28&36&46\\
f(n)/f(n\!-\!1)&&3/1&4/2&5/3&6/4&7/5&8/6&9/7&10/8&11/9
\end{array}\]
}

Dividing by both \(n\) and \(f(n-1)\) happen to give us useful
patterns to work with.
\(\frac{f(n)}{n} = \frac{n+1}{2}\), and 
\(\frac{f(n)}{f(n-1)} = \frac{n+1}{n-1}\).
Of course, lots of other guesses for function \(g\) do not work.
For example, \(f(n) - n = f(n-1)\).
Knowing that \(f(n) = f(n-1) + n\) is not useful for determining the
closed form solution to this summation.
Or consider \(f(n) - f(n-1) = n\).
Again, knowing that \(f(n) = f(n-1) + n\) is not useful.
Finding the right combination of equations can be like finding a
needle in a haystack.

In our first example, we can see directly what the closed-form
solution should be.
Since \(\frac{f(n)}{n} = \frac{n+1}{2}\),
obviously \(f(n) = n(n+1)/2\).

Dividing \(f(n)\) by \(f(n-1)\) does not give so obvious a result,
but it provides another useful illustration.

\begin{eqnarray*}
\frac{f(n)}{f(n-1)} &=& \frac{n+1}{n-1}\\
f(n) (n-1) &=& (n+1) f(n-1)\\
f(n) (n-1) &=& (n+1) (f(n) - n)\\
n f(n) - f(n) &=& n f(n) + f(n) - n^2 - n\\
2 f(n) &=& n^2 + n = n (n+1)\\
f(n) &=& \frac{n (n + 1)}{2}
\end{eqnarray*}

Once again, we still do not have a proof that
\(f(n) = n(n+1)/2\). Why?
Because we did not prove that \(f(n)/n = (n+1)/2\) nor that
\(f(n)/f(n-1) = (n+1)(n-1)\).
We merely hypothesized patterns from looking at a few terms.
Fortunately, it is easy to check our hypothesis with
induction.\index{proof!induction}
\end{example}

\begin{example}
Solve the summation
\[ \sum_{i=1}^n 1/2^i. \]
\noindent
We will begin by writing out a table listing the first few values of
the summation, to see if we can detect a pattern.

\medskip

\begin{center}
\begin {tabular}{l|l l l l l l }
\baselineskip=20pt
$n$ & 1 &2 &3 &4 &5 &6\\
\hline
\\[-10pt]
$f(n)$& $\frac{1}{2}$ &$\frac{3}{4}$ &$\frac{7}{8}$ &$\frac{15}{16}$
&$\frac{31}{32}$ &$\frac{63}{64}$\\[3pt]
\hline
\\[-12pt]
$1-f(n)$ & $\frac{1}{2}$ & $\frac{1}{4}$ & $\frac{1}{8}$ &
$\frac{1}{16}$ & $\frac{1}{32}$ & $\frac{1}{64}$\\
\end {tabular}
\end{center}

\medskip

\noindent By direct inspection of the second line of the table,
we might recognize the pattern
$f(n) = \frac{2^n-1}{2^n}$.
A simple induction proof can then prove that this always holds
true.\index{proof!induction}
Alternatively, consider if we hadn't noticed the pattern for the form
of $f(n)$.
We might observe that $f(n)$ appears to be reaching an asymptote at
one.
In which case, we might consider looking at the difference between
$f(n)$ and the expected asymptote.
This result is shown in the last line of the table, which has a clear
pattern since the $i$th entry is of $1/2^i$.
From this we can easily deduce a guess that
$f(n) = 1 - \frac{1}{2^n}$.
Again, a simple induction proof will verify the guess.\index{proof!induction}
\end{example}

\begin{example}
Solve the summation
\[f(n) = \sum_{i=0}^{n} ar^i = a + ar + ar^2 + \cdots + ar^n.\]
\noindent This is called a geometric series.
Our goal is to find some function \(g(n)\) such
that the difference between \(f(n)\) and \(g(n)\) one from the other
leaves us with an easily manipulated equation.
Because the difference between consecutive terms of the summation is a
factor of \(r\), we can shift terms if we multiply the entire
expression by \(r\):
\[rf(n) = r\sum_{i=0}^{n} ar^i = ar + ar^2 + ar^3 + \cdots + ar^{n+1}.\]
\noindent We can now subtract the one equation from the other, as follows:
\begin{eqnarray*}
f(n) - rf(n) =~a &+& ar + ar^2 + ar^3 + \cdots + ar^{n}\\
                 &-& (ar + ar^2 + ar^3 + \cdots + ar^n) - ar^{n+1}.
\end{eqnarray*}

\noindent The result leaves only the end terms: 

\vspace{-\bigskipamount}
\vspace{-\bigskipamount}

\begin{eqnarray*}
f(n) - rf(n) & = & \sum_{i=0}^{n} ar^i - r\sum_{i=0}^{n} ar^i.\\
(1-r)f(n)    & = & a - ar^{n+1}.
\end{eqnarray*}
\noindent Thus, we get the result
\[f(n) = \frac{a - ar^{n+1}}{1 - r}\]
\noindent where \( r \neq 1. \)
\end{example}

\begin{example}
% Manber's example
For our second example of the shifting method, we solve

\vspace{-\medskipamount}
\[f(n) = \sum_{i=1}^{n} i2^i = 1 \cdot 2^1 + 2 \cdot 2^2 + 3 \cdot
2^3 + \cdots + n \cdot 2^n.\]

\vspace{-\medskipamount}
\noindent We can achieve our goal if we multiply by two:

\vspace{-\bigskipamount}

\[2f(n) = 2\sum_{i=1}^{n} i2^i = 1 \cdot 2^2 + 2 \cdot 2^3 + 3 \cdot
2^4 + \cdots + (n-1) \cdot 2^n + n \cdot 2^{n+1}.\]
\noindent The \(i\)th term of \(2f(n)\) is \(i \cdot 2^{i+1}\),
while the \((i+1)\)th term of \(f(n)\) is \mbox{\((i+1) \cdot 2^{i+1}\)}.
Subtracting one expression from the other yields the summation of
\(2^i\) and a few non-canceled terms:

\vspace{-\bigskipamount}
\vspace{-\medskipamount}
\vspace{-\medskipamount}
\begin{eqnarray*}
2f(n) - f(n) & = & 2\sum_{i=1}^n i 2^i - \sum_{i=1}^n i 2^i\\
             & = & \sum_{i=1}^n i 2^{i+1} - \sum_{i=1}^n i 2^i.\\
\noalign{\hspace{\parskip}
\hbox{\rule{0in}{1.3pc}Shift \(i\)'s value in the second summation,
substituting \((i+1)\) for \(i\):}}
             & = & n2^{n+1} + \sum_{i=0}^{n-1}i2^{i+1} -
                              \sum_{i=0}^{n-1}(i+1)2^{i+1}.\\
\noalign{\hspace{\parskip}
\hbox{\rule{0in}{1.3pc}Break the second summation into two parts:}}
             & = & n2^{n+1} + \sum_{i=0}^{n-1}i2^{i+1} -
                              \sum_{i=0}^{n-1}i2^{i+1} -
                              \sum_{i=0}^{n-1}2^{i+1}.\\
\noalign{\hspace{\parskip}
\hbox{\rule{0in}{1.3pc}Cancel like terms:}}
             & = & n2^{n+1} - \sum_{i=0}^{n-1} 2^{i+1}.\\
\noalign{\hspace{\parskip}
\hbox{\rule{0in}{1.3pc}Again shift \(i\)'s value in the
summation, substituting \(i\) for \((i+1)\):}}
             & = & n2^{n+1} - \sum_{i=1}^{n} 2^i.\\
\noalign{\hspace{\parskip}
\hbox{\rule{0in}{1.3pc}Replace the new summation with a
solution that we already know:}}
             & = & n2^{n+1} - \left ( 2^{n+1} - 2 \right ).\\
\noalign{\hspace{\parskip}
\hbox{\rule{0in}{1.3pc}Finally, reorganize the equation:}}
             & = & (n-1)2^{n+1} + 2.
\end{eqnarray*}
\end{example}\index{summation!shifting method|)}\index{summation|)}
