.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Pushdown Automata
   :satisfies: Nondeterministic Pushdown Automata
   :topic: Finite Automata

Nondeterministic Pushdown Automata
==================================

Nondeterministic Pushdown Automata
----------------------------------

.. Chapter 7.2

**Theorem** Given NPDA M that accepts by final state, :math:`\exists`
NPDA :math:`M'` that accepts by empty stack such that :math:`L(M) = L(M')`.

**Proof** (sketch)

   | :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`
   | Construct :math:`M' = (Q', \Sigma, {\Gamma}^{'}, {\delta}^{'}, q_s, z', F')`
     (NOTE: :math:`z'` is a new symbol) 
   | :math:`Q' = Q \cup \{q_s, q_f\}` 
   | :math:`{\Gamma}^{'} = \Gamma \cup \{z'\}`
     (NOTE: :math:`z' \not\in \Gamma`, never popped in old machine)
   | :math:`q_s` is new start state. 
   | :math:`F = \{\}`. Irrelevant.
     The only time the stack will be empty is in :math:`q_f`.

   .. odsafig:: Images/lt7pf1.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt7pf1

   | Here, :math:`x` is any symbol in :math:`{\Gamma}^{'}`.
     (:math:`l` represents :math:`\lambda`).

   | Don't really need the concept of a final state in this case. QED. 


**Theorem:** Given NPDA :math:`M` that accepts by empty stack,
:math:`\exists` NPDA :math:`M'` that accepts by final state.

**Proof:**

   | :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`
   | Construct :math:`M' = (Q', \Sigma, \Gamma^{'}, \delta^{'}, q_s, z', F')`
   | :math:`Q' = Q \cup \{q_s, q_f\}`
   | :math:`\Gamma^{'} = \Gamma \cup \{z'\}`
   | :math:`q_s` is new start state. 
   | :math:`F' = \{q_f\}`.
     The only time the stack will be empty is in :math:`q_f`.
   | :math:`(q_f, z') \in \delta(q, \lambda, z')` for all
     :math:`q \in Q`. 

   .. odsafig:: Images/lt7pf2.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt7pf2

   | If :math:`M` accepted in some state, then that means the stack
     was empty.
     In :math:`M'`, at the same state, the stack will contain only
     :math:`z'`, and the new transition can be followed to
     :math:`q_f`. QED 

.. note:: 

   Now we want to show that NPDA's and CFG both represent CFL's. 
   Show that we can take any CFG and construct a NPDA and vice versa. 

**Theorem:** For any CFL :math:`L` not containing :math:`\lambda`,
:math:`\exists` a NPDA :math:`M` such that :math:`L = L(M)`.

**Proof** (sketch)

   | Given (:math:`\lambda` -free) CFL :math:`L`.
   | :math:`\Rightarrow \exists` CFG :math:`G` such that :math:`L = L(G)`.
   | :math:`\Rightarrow \exists G'` in GNF, such that :math:`L(G) = L(G')`. 
   | :math:`G' = (V,T,S,P)`. All productions in :math:`P` are of the form:
   |   :math:`A \rightarrow ax
   |   :math:`A \in V, a \in T, x \in V^*`
   | Construct NPDA :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`
   | Q = \{q_0, q_1, q_f\}, \Sigma = T, \Gamma = V \cup \{z\}, F = \{q_f\}`
   |   1. :math:`M` starts by putting :math`S` on the stack 
   |   2. For each production 
   |         :math:`A \rightarrow a X_1 X_2 \ldots X_n`
   |      put `(q_1, X_1 X_2 \ldots X_n)` in :math:`\delta(q_1, a, A)`
   |      (Pop :math:`A` from the stack, read "a" from tape,
          and push :math:`X_1 X_2 \ldots X_n` onto the stack) 

     .. note::

        Draw a picture of this! 

   |   3. Accept if :math:`S \stackrel{*}{\Rightarrow} w \in \Sigma^*`
          (all variables on the stack are replaced by terminals or
          :math:`\lambda`) 
   | Show :math:`w \in L(G')` iff :math:`w \in L(M)`. QED. 



{\bf Example:} Let G'=(V,T,S,P), P=

\begin{center}
\begin{tabular}{l}
S $\rightarrow$ aSA $|$ aAA $|$ b \\
A $\rightarrow$ bBBB \\
B $\rightarrow$ b \\
\end{tabular}
\end{center}

QUESTION: Is this grammar in GNF? yes. 

\begin{figure}[h!] 
\centerline { \includegraphics[scale=.60]{lt7pf3.pdf} } 
\end{figure} 

% %L {\leavevmode
% %L \epsfxsize=.65\linewidth
% %L \centerline{\epsfbox{lt7pf3.eps}}
% %L }

%%L \begin{figure}[h]
%%L  \begin{center}
%%L  \input{lt7pf3}
%%L  \end{center} 
%%L %\caption{}
%%L %\label{st2role}
%%L \end{figure}

Trace abbbbb in grammar and pda. 

NOTE: Argue why w$\in$L(G') iff w$\in$L(M). QED. 

\vfill\eject 
%H \vfill\eject
%SO \vfill\eject

NOTE: Now want to show that given an NPDA, can construct a CFG. First 
will show this to make it easier for the next proof. 

{\bf Theorem} Given a NPDA M, $\exists$
a NPDA M' s.t. all transitions have the form $\delta(q_i$,a,A)=$\{c_1,c_2,
\ldots c_n\}$ where 

\begin{center}
\begin{tabular}{ll}
&$c_i$=($q_j,\lambda$) \\
or &$c_i$=($q_j$,BC) \\
\end{tabular}
\end{center}

Each move either increases or decreases stack contents by a single symbol.

\begin{itemize}
\item {\bf Proof} (sketch)
\end{itemize}

\begin{figure}[h!] 
\centerline { \includegraphics[scale=.60]{lt7pf4.pdf} } 
\end{figure} 

% %L {\leavevmode
% %L \epsfxsize=.65\linewidth
% %L \centerline{\epsfbox{lt7pf4.eps}}
% %L }

%%L \begin{figure}[h]
%%L  \begin{center}
%%L  \input{lt7pf4}
%%L  \end{center} 
%%L %\caption{}
%%L %\label{st2role}
%%L \end{figure}

\vfill\eject 

%H \vfill\eject
%SO \vfill\eject

{\bf Theorem} If L=L(M) for some NPDA M, then L is a CFL.

NOTE: Want to show that each NPDA represents a CFL, so we 
will take a NPDA M and convert it to a CFG. 

NOTE: It will be an easier construction if we take the NPDA and put all the 
transitions in a simpler form. 

\begin{itemize}
\item {\bf Proof:} Given NPDA M.

First, construct an equivalent NPDA M that will be easier to work with.
Construct M' such that

\begin{enumerate}
\item accepts if stack is empty
\item each move increases or decreases stack content by a single symbol.
(can only push 2 variables or no variables with each transition)
\end{enumerate}

M'=(Q,$\Sigma$,$\Gamma$,$\delta$,$q_0$,z,F)

Construct G=(V,$\Sigma$,S,P) where

V=$\{(q_icq_j) | q_i,q_j \in Q, c\in\Gamma \}$

NOTE: some of these variables will be useless. 

$(q_icq_j)$ represents ``starting at state $q_i$ the stack contents are 
$cw$, $w\in{\Gamma}^{*}$, some path is followed to state $q_j$ and the 
contents of the stack are now $w$''. 
%LO \eject

Goal: \ \ $(q_0zq_f)$ \ \ which will be the start symbol in the grammar.

Meaning: We start in state $q_0$ with z on the stack and process the input 
tape. 
Eventually we 
will reach the final state $q_f$ and the stack will be empty. (Along the 
way we may push symbols on the stack, but these symbols will be popped 
from the stack). 

NOTE: Machine accepts by empty stack, but it is such that there is only 
1 final state in which the machine accepts by final state. 

To construct the productions in P: 

1) Replace 

\begin{figure}[h!] 
\centerline { \includegraphics[scale=.60]{lt8pf5.pdf} } 
\end{figure} 

% %L {\leavevmode
% %L \epsfxsize=.65\linewidth
% %L \centerline{\epsfbox{lt8pf5.eps}}
% %L }

%%L \begin{figure}[h]
%%L  \begin{center}
%%L  \input{lt8pf5}
%%L  \end{center} 
%%L %\caption{}
%%L %\label{st2role}
%%L \end{figure}

by 

\begin{center} 
$(q_iAq_j) \rightarrow a$ 
\end{center} 

where the stack changes are: 

\begin{center} 
\begin{tabular}{lcclc} 
& $q_i$ & \ \ (some path $\rightarrow$) \ \ & &$q_j$ \\ 
\\ 
stack: & A && stack: & \\ 
& $X_1$ & && $X_1$ \\ 
& $X_2$ &&& $X_2$ \\ 
& \underbar{$X_n$} &&& \underbar{$X_n$} \\ 
\end{tabular} 
\end{center} 


2) Replace 

\begin{figure}[h!] 
\centerline { \includegraphics[scale=.60]{lt8pf6.pdf} } 
\end{figure} 

% %L {\leavevmode
% %L \epsfxsize=.65\linewidth
% %L \centerline{\epsfbox{lt8pf6.eps}}
% %L }



%%L \begin{figure}[h]
%%L  \begin{center}
%%L  \input{lt8pf6}
%%L  \end{center} 
%%L %\caption{}
%%L %\label{st2role}
%%L \end{figure}

by 

\begin{center} 
$(q_iAq_k) \rightarrow a(q_jBq_l)(q_lCq_k)$ for all $q_l,q_k\in$Q 
\end{center} 


\begin{tabular}{ccccccc} 
$q_i$ & \ \ (path $\rightarrow$) \ \ & $q_j$ &\ \ (path $\rightarrow$) \ \ 
& $q_l$ &\ \ (path $\rightarrow$) \ \ & $q_k$ \\ 
\\ 
&&B&& \\ 
A && C &&C \\ 
$X_1$ & & $X_1$ & & $X_1$ & & $X_1$ \\ 
$X_2$ && $X_2$ && $X_2$ && $X_2$ \\ 
\underbar{$X_n$} &&\underbar{$X_n$} &&\underbar{$X_n$} &&\underbar{$X_n$}\\ 
\end{tabular} 

This will create some useless variables, but that's ok. 



NOTE: Mention and then come back to this. 

Must show that the constructed grammar G is such that L(G)=L(M'). 
That is, w$\in$L(G) iff w$\in$L(M). (see book) QED. 
%H \vfill\eject


\end{itemize}

\vfill\eject 
%SO \vfill\eject

%H .

%H \vfill\eject

{\bf Example:}


L(M)=$\{aa^{*}b\}$, 
M=(Q,$\Sigma$,$\Gamma$,$\delta$,$q_0$,z,F),
Q=$\{q_0,q_1,q_2,q_3\}$,
$\Sigma$=$\{a,b\}$,$\Gamma$=$\{A,z\}$,F=$\{\}$. 
M accepts by empty stack. 


\begin{figure}[h!]
%SO  \centerline { \includegraphics[scale=1.4]{lt8pda7.pdf} }
\centerline { \includegraphics[scale=1.0]{lt8pda7.pdf} } 
\end{figure}

%  {\leavevmode
% %LH \epsfxsize=.5\linewidth
% %SO \epsfxsize=\linewidth
%  \centerline{\epsfbox{lt8pda7.eps}}
%  }

% \begin{figure}[h]
%  \begin{center}
%  \input{lt8pda7}
%  \end{center} 
% %\caption{}
% %\label{st2role}
% \end{figure}
%

%SO \vfill\eject

Construct the grammar G=(V,T,S,P),

V=$\{(q_0Aq_0), (q_0zq_0), (q_0Aq_1), (q_0zq_1), \ldots \}$

NOTE: some variables may be useless. 

T=$\Sigma$

S=$(q_0zq_2)$

%H \vfill\eject
\vfill\eject 
P=


\begin{center}
\begin{tabular}{crl}
From transition $1$ & $(q_0Aq_1) \rightarrow$ & $b$ \\
\\
From transition $2$ & $(q_1zq_2) \rightarrow$ & $\lambda$ \\
\\
From transition $3$ & $(q_0Aq_3) \rightarrow$ & $a$ \\
\\
From transition $4$ & $(q_0zq_0) \rightarrow$ & $a(q_0Aq_0)(q_0zq_0)$$|$ \\
   & & $a(q_0Aq_1)(q_1zq_0)$$|$ \\
   & & $a(q_0Aq_2)(q_2zq_0)$$|$ \\
   & & $a(q_0Aq_3)(q_3zq_0)$ \\
  & $(q_0zq_1) \rightarrow$ & $a(q_0Aq_0)(q_0zq_1)$$|$ \\
   & & $a(q_0Aq_1)(q_1zq_1)$$|$ \\
   & & $a(q_0Aq_2)(q_2zq_1)$$|$ \\
   & & $a(q_0Aq_3)(q_3zq_1)$ \\
  & $(q_0zq_2) \rightarrow$ & $a(q_0Aq_0)(q_0zq_2)$$|$ \\
   & & $a(q_0Aq_1)(q_1zq_2)$$|$ \\
   & & $a(q_0Aq_2)(q_2zq_2)$$|$ \\
   & & $a(q_0Aq_3)(q_3zq_2)$ \\
  & $(q_0zq_3) \rightarrow$ & $a(q_0Aq_0)(q_0zq_3)$$|$ \\
   & & $a(q_0Aq_1)(q_1zq_3)$$|$ \\
   & & $a(q_0Aq_2)(q_2zq_3)$$|$ \\
   & & $a(q_0Aq_3)(q_3zq_3)$ \\
\end{tabular}
\begin{tabular}{crl}
From transition $5$ & $(q_3zq_0) \rightarrow$ & $(q_0Aq_0)(q_0zq_0)$$|$ \\
   & & $(q_0Aq_1)(q_1zq_0)$$|$ \\
   & & $(q_0Aq_2)(q_2zq_0)$$|$ \\
   & & $(q_0Aq_3)(q_3zq_0)$ \\
  & $(q_3zq_1) \rightarrow$ & $(q_0Aq_0)(q_0zq_1)$$|$ \\
   & & $(q_0Aq_1)(q_1zq_1)$$|$ \\
   & & $(q_0Aq_2)(q_2zq_1)$$|$ \\
   & & $(q_0Aq_3)(q_3zq_1)$ \\
  & $(q_3zq_2) \rightarrow$ & $(q_0Aq_0)(q_0zq_2)$$|$ \\
   & & $(q_0Aq_1)(q_1zq_2)$$|$ \\
   & & $(q_0Aq_2)(q_2zq_2)$$|$ \\
   & & $(q_0Aq_3)(q_3zq_2)$ \\
  & $(q_3zq_3) \rightarrow$ & $(q_0Aq_0)(q_0zq_3)$$|$ \\
   & & $(q_0Aq_1)(q_1zq_3)$$|$ \\
   & & $(q_0Aq_2)(q_2zq_3)$$|$ \\
   & & $(q_0Aq_3)(q_3zq_3)$ \\
\end{tabular}
\end{center}


%SO \vfill\eject
\vfill\eject 
{\bf Recognizing aaab in M:}
\begin{center}
\begin{tabular}{rl}
$(q_0,aaab,z)$ & $\vdash$ $(q_0,aab,Az)$ \\
& $\vdash$ $(q_3,ab,z)$ \\
& $\vdash$ $(q_0,ab,Az)$ \\
& $\vdash$ $(q_3,b,z)$ \\
& $\vdash$ $(q_0,b,Az)$ \\
& $\vdash$ $(q_1,\lambda,z)$ \\
& $\vdash$ $(q_2,\lambda,\lambda)$ \\
\end{tabular}
\end{center}

NOTE: At this point stack is empty. 

{\bf Derivation of string aaab in G:}
\begin{center}
\begin{tabular}{rl}
$(q_0zq_2)$ & $\Rightarrow$ $a(q_0Aq_3)(q_3zq_2)$ \\
& $\Rightarrow$ $aa(q_3zq_2)$ \\
& $\Rightarrow$ $aa(q_0Aq_3)(q_3zq_2)$ \\
& $\Rightarrow$ $aaa(q_3zq_2)$ \\
& $\Rightarrow$ $aaa(q_0Aq_1)(q_1zq_2)$ \\
& $\Rightarrow$ $aaab(q_1zq_2)$ \\
& $\Rightarrow$ $aaab$ \\
\end{tabular}
\end{center}

%S \vfill\eject
Meaning of first line in derivation is: 
$(q_0zq_2)$ $\stackrel{*}{\Rightarrow}$ $axy$ where $(q_0Aq_3)\stackrel{*} 
{\Rightarrow} x$ 
(which in the example above will eventually derive $a$) 
and $(q_3zq_2)\stackrel{*}{\Rightarrow} y$. 
(which in the example above will eventually derive $ab$) 

Must show that the constructed grammar G is such that L(G)=L(M'). 
That is, w$\in$L(G) iff w$\in$L(M). (see book) QED. 

Chapter 7.3

{\bf Definition: } A PDA M=(Q,$\Sigma$,$\Gamma$,$\delta$,$q_0$,z,F) is
{\it deterministic} if for every $q\in$Q, $a\in\Sigma \cup \{\lambda\}$,
$b\in\Gamma$

\begin{enumerate}
\item $\delta(q,a,b)$ contains at most 1 element
\item if $\delta(q,\lambda,b)\not=\emptyset$ then $\delta(q,c,b)$=$\emptyset$
for all $c\in\Sigma$
\end{enumerate}


{\bf Definition:} L is DCFL iff $\exists$ DPDA M s.t. L=L(M).

%SO \vfill\eject

Examples:
\begin{enumerate}
\item Previous pda for $\{a^nb^n | n\ge 0\}$ is deterministic.

\item Previous pda for $\{a^nb^mc^{n+m} | n,m> 0\}$ is deterministic.


\item Previous pda for $\{ww^R | w\in{\Sigma}^{+}\}$,$\Sigma=\{a,b\}$ 
is nondeterministic.
\end{enumerate}

\vfill\eject 

%LO \vfill\eject
{\bf Note:} There are CFL's that are not deterministic.

L=$\{a^nb^n|n\ge 1\} \cup \{a^nb^{2n}| n\ge 1\}$ is  a CFL and not a DCFL.

NOTE: $a^nb^nc^n$ is not a CFL! (we'll see this in the next chapter) 

\begin{itemize}
\item {\bf Proof:} \ $L=\{a^nb^n: n\ge 1\} \cup \{a^nb^{2n}: n\ge 1\}$

It is easy to construct a NPDA for $\{a^nb^n: n\ge 1\}$ and 
a NPDA for $\{a^nb^{2n}: n\ge 1\}$. These two can be joined together
by a new start state and $\lambda$-transitions to create a NPDA for L.
Thus, L is CFL.

Now show L is not a DCFL.
Assume that there is a deterministic PDA $M$ such that $L=L(M)$.
We will construct a PDA that recognizes a language that is not a CFL and
derive a contradiction.

Construct a PDA $M'$ as follows:


NOTE: Show figure 

\begin{enumerate}
\item  Create two copies of $M$: $M_1$ and $M_2$. The same state in $M_1$
and $M_2$ are called cousins.

\item Remove accept status from accept states in $M_1$, remove initial
status from initial state in $M_2$. In our new PDA, we will start in $M_1$ and
accept in $M_2$.

\item  Outgoing arcs from old accept states in $M_1$, change to end up in the
cousin of its destination in $M_2$. This joins $M_1$ and $M_2$ into one PDA.
There must be an outgoing arc since you must recognize both $a^nb^n$ and
$a^nb^{2n}$. After reading $n$ $b$'s, must accept if no more $b$'s and 
continue if there are more $b$'s.

\item  Modify all transitions that read a $b$ and have their destinations in
$M_2$ to read a $c$. 

\end{enumerate}

This is the construction of our new PDA. 

When we read $a^nb^n$ and end up in an old accept state in $M_1$, then
we will transfer to $M_2$ and read the rest of $a^nb^{2n}$. Only the $b$'s in
$M_2$ have been replaced by $c$'s, so the new machine accepts $a^nb^nc^n$.

The language accepted by our new PDA is $a^nb^nc^n$. But this is not
a CFL. Contradiction! Thus there is no deterministic PDA $M$ such that $L(M)=L$.
Q.E.D.
\end{itemize}


\vfill\eject 

%LO \vfill\eject

\begin{figure}[h!] 
\centerline { \includegraphics[scale=.60]{lt8hier.pdf} } 
\end{figure} 

% %L {\leavevmode
% %L \epsfxsize=\linewidth
% %L \centerline{\epsfbox{lt8hier.eps}}
% %L }

%%L \begin{figure}[h]
%%L  \begin{center}
%%L  \input{lt8hier}
%%L  \end{center} 
%%L %\caption{}
%%L %\label{st2role}
%%L \end{figure}
%



Note Skip 7.4 

\vfill\eject 
%H \vfill\eject

%SO \vfill\eject


%LO \vfill
