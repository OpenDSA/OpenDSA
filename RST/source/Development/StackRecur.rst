.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists

Implementing Recursion [Raw]
============================

Perhaps the most common computer application that uses stacks is not
even visible to its users.
This is the implementation of subroutine calls in most programming
language runtime environments.
A subroutine call is normally implemented by placing necessary
information about the subroutine (including the return address,
parameters, and local variables) onto a stack.
This information is called an
\defit{activation record}.\index{compiler!activation record}
Further subroutine calls add to the stack.
Each return from a subroutine pops the top activation record
off the stack.
Figure~\ref{RecurStack} illustrates the implementation of
the recursive factorial function of Section~\ref{Recurse}
from the runtime environment's point of view.

\begin{figure}
\pdffig{RecurSta}
\smallskip

\capt{4.5in}{Implementing recursion with a stack}
{Implementing recursion\index{recursion} with a stack.
$\beta$ values indicate the address of the program instruction to
return to after completing the current function call.
On each recursive function call to \Cref{fact}
(as implemented in Section~\ref{Recurse}), both the return
address and the current value of \Cref{n} must be saved.
Each return from \Cref{fact} pops the top activation record off the
stack.
}{RecurStack}
\bigskip
\end{figure}

Consider what happens when we call \Cref{fact} with the value~4.
We use \(\beta\) to indicate the address of the program instruction
where the call to \Cref{fact} is made.
Thus, the stack must first store the address \(\beta\), and the
value~4 is passed to \Cref{fact}.
Next, a recursive call to \Cref{fact} is made, this time with value~3.
We will name the program address from which the call is
made~\(\beta_1\).
The address~\(\beta_1\), along with the current value for~\(n\)
(which is~4), is saved on the stack.
Function \Cref{fact} is invoked with input parameter~3.

In similar manner, another recursive call is made with input
parameter~2, requiring that the address from which the call is made
(say \(\beta_2\)) and the current value for \(n\) (which is~3) are
stored on the stack.
A final recursive call with input parameter~1 is made, requiring that
the stack store the calling address (say \(\beta_3\)) and current
value (which is~2).

At this point, we have reached the base case for \Cref{fact}, and so
the recursion begins to unwind.
Each return from \Cref{fact} involves popping the stored value for
\(n\) from the stack, along with the return address from the function
call.
The return value for \Cref{fact} is multiplied by the restored value
for \(n\), and the result is returned.

Because an activation record must be created and placed onto the stack
for each subroutine call, making subroutine calls is a relatively
expensive operation. 
While recursion is often used to make implementation easy and clear,
sometimes you might want to eliminate the overhead imposed by the
recursive function calls.
In some cases, such as the factorial\index{factorial function}
function of Section~\ref{Recurse},
recursion can easily be replaced by iteration.
\index{recursion!replaced by iteration}

\begin{example}
\label{StackFact}
As a simple example of replacing recursion with a stack, consider the
following non-recursive version of the factorial
function.\index{factorial function}

\vspace{-\medskipamount}

\xprogexamp{sfact.book}

\noindent Here, we simply push successively smaller values of $n$ onto
the stack until the base case is reached, then repeatedly pop off the
stored values and multiply them into the result.
\end{example}

An iterative form of the factorial function is both
simpler and faster than the version shown in Example~\ref{StackFact}.
But it is not always possible to replace recursion with iteration.
Recursion, or some imitation of it, is necessary when implementing
algorithms that require multiple branching such as in the Towers of
Hanoi\index{towers of hanoi@Towers of Hanoi} algorithm, or when
traversing\index{traversal!binary tree} a binary tree.
The Mergesort\index{mergesort@Mergesort} and
Quicksort\index{quicksort@Quicksort} algorithms of
Chapter~\ref{InSort} are also examples in which recursion is required.
Fortunately, it is always possible to imitate recursion with a stack.
Let us now turn to a non-recursive version of the Towers of
Hanoi function, which cannot be done iteratively.

\begin{example}
The \Cref{TOH} function shown in Figure~\ref{TOH}
makes two recursive calls: one to move $n-1$ rings off the bottom
ring, and another to move these $n-1$ rings back to the goal pole.
We can eliminate the recursion by using a stack to store a
representation of the three operations that \Cref{TOH} must perform:
two recursive calls and a move operation.
To do so, we must first come up with a representation of the various
operations, implemented as a class whose objects will be stored on the
stack.

Figure~\ref{TOHstack} shows such a class.
We first define an enumerated type called \Cref{TOHop}, with two
values MOVE and TOH, to indicate calls to the \Cref{move} function and
recursive calls to \Cref{TOH}, respectively.
Class \Cref{TOHobj} stores five values: an operation field (indicating
either a move or a new TOH operation), the number of rings, and the
three poles.
Note that the move operation actually needs only to store information
about two poles.
Thus, there are two constructors: one to store the state when
imitating a recursive call, and one to store the state for a move
operation.

\begin{figure}
\xprogfig{operation.book}

\xprogfig{TOHobj.book}
\bigskip

\xprogfig{TOHstack.book}
\vspace{-\bigskipamount}
\vspace{-\medskipamount}

\capt{4.5in}{Stack-based Towers of Hanoi}
{Stack-based implementation for Towers of Hanoi.}{TOHstack}
\smallskip
\end{figure}

An array-based stack is used because we know that the stack
will need to store exactly $2n+1$ elements.
The new version of \Cref{TOH} begins by placing on the stack a
description of the initial problem for $n$ rings.
The rest of the function is simply a \Cref{while} loop that pops the
stack and executes the appropriate operation.
In the case of a \Cref{TOH} operation (for $n>0$), we store on the
stack representations for the three operations executed by the
recursive version.
However, these operations must be placed on the stack in reverse
order, so that they will be popped off in the correct order.
\end{example}

Recursive algorithms lend themselves to
efficient implementation with a stack when the amount of
information needed to describe a sub-problem is small.
For example, Section~\ref{QuickSort} discusses a
stack-based implementation for Quicksort.
