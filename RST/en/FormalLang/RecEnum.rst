.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: Recursively Enumerable Languages
   :topic:

Recursively Enumerable Languages 
================================

Recursively Enumerable Languages
--------------------------------

What is the set of languages that TM's accept?
We know that they accept RL's and CFL's.
And additional languages. 

Question: Is there any language that a TM cannot accept? 

**Definition:** A language :math:`L` is :term:`recursively enumerable`
if there exists a TM :math:`M` such that :math:`L = L(M)`.

[Hah! All that says is that the languages that a TM can deal with now
have a name!]

.. odsafig:: Images/lt25hier1.png
   :width: 200
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: lt25hier1

We say that :math:`M` accepts the language. 
For every :math:`w` in :math:`L`, :math:`M` should accept :math:`w`.

Question: What happens if :math:`w` is not in :math:`L`? 
Saying that :math:`M` can properly accepting strings in :math:`L`
doesn't define happens if :math:`w` is not in :math:`L`. 
:math:`M` may not halt in that case.

Note: We do not get a yes or no answer, just a yes if w is in L! 

**Definition:** A language :math:`L` is *recursive* if there exists a
TM :math:`M` such that :math:`L = L(M)` and :math:`M` halts on every
:math:`w \in \Sigma^+`.
Thus, A language :math:`L` is recursive if and only if there exists a
membership algorithm for it.

[Note the difference beteen a recursive **language** (one that is
recognized by a TM) and a recursive **algorithm** (which merely means
that it calls itself).]

NOTE: We will ignore the empty string.
In Chapter 9, the definition of the TM assumes that the input string
is always padded on both sides of the input.
If the input could be a blank, the tape head would not 
know where the input string was.
It would be easy to adjust the definition to include the empty string,
but for now we will just examine languages that do not include
:math:`\lambda`.

.. note::

   Not a problem if we use a one-sided tape as our base definition,
   which is a good argument for doing it that way.

Enumeration procedure for recursive languages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To enumerate all :math:`w \in \Sigma^+` in a recursive language :math:`L`:

| * Let :math:`M` be a TM that recognizes :math:`L, L = L(M)`.
| * Construct 2-tape TM :math:`M'`
|   Tape 1 will enumerate the strings in :math:`\Sigma^+`
|   Tape 2 will enumerate the strings in :math:`L`.
|   - On Tape 1 generate the next string :math:`v` in :math:`\Sigma^+`
|   - Simulate :math:`M` on :math:`v`
|     If :math:`M` accepts :math:`v`, then write :math:`v` on Tape 2.

Enumeration procedure for recursively enumerable languages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The above procedure does not work, since :math:`M` might not halt
on strings that are not in the language. 

To enumerate all :math:`w \in \Sigma^+` in a recursively enumerable
language :math:`L`: 

| Repeat forever:
| * Generate next string (Suppose k strings have been generated:
    :math:`w_1, w_2, ..., w_k`)
| * Run :math:`M` for one step on :math:`w_k`.
|   Run :math:`M` for two steps on :math:`w_{k-1}`.
|   ...
|   Run :math:`M` for :math:`k` steps on :math:`w_{1}`.
|   If any of the strings are accepted then write them to Tape 2.
|   NOTE: Accepted in the exact number of steps! 

.. math::

   \begin{array}{llll} 
   1 move w_1 \\ 
   1 move w_2 & 2 moves w_1 \\ 
   1 move w_3 & 2 moves w_2 & 3 moves w_1 \\ 
   1 move w_4 & 2 moves w_3 & 3 moves w_2 & 4 moves w_1 \\ 
   ... \\ 
   \end{array} 

Questions:

1) Are there languages that are RE but not recursive? yes.
2) Are there languages that are not RE? yes 

We will prove that there is a language that is not recursively
enumerable.

.. note::

   Ask what is a powerset. :math:`2^{\{a,b\}}, 2^{pos. int.}`

.. topic:: Theorem

   **Theorem:** Let :math:`S` be an infinite countable set.
   Its powerset :math:`2^S` is not countable.

   **Proof:** Use diagonalization

   | :math:`S` is countable, so it's elements can be enumerated.
   | :math:`S = \{s_1,s_2,s_3,s_4,s_5,s_6 \ldots\}`
   | An element :math:`t \in 2^S` can be represented by a sequence of
     0's and 1's such that the :math:`i` th position in :math:`t` is 1
     if :math:`s_i` is in :math:`t`, 0 if :math:`s_i` is not in :math:`t`. 
   | Example, :math:`\{s_2,s_3,s_5\}` represented by 0110100... 
   | Example, set containing every other element from :math:`S`,
     starting with :math:`s_1` is :math:`\{s_1, s_3, s_5, s_7, \ldots \}`
     represented by 101010101010... 
   | Suppose :math:`2^S` is countable.
     Then we can emunerate all its elements: :math:`t_1, t_2, ...`
   | HEADINGS :math:`S` on columns :math:`2^S` on rows 

     .. math::
        
        \begin{array}{c|cccccccc}
            & s_1 & s_2 & s_3 & s_4 & s_5 & s_6 & s_7 \ \ \ \ ... \\ \hline
        t_1 & \underline{0} & 1 & 0 & 1 & 0 & 0 & 1 & ... \\
        t_2 & 1 & \underline{1} & 0 & 0 & 1 & 1 & 0 & ... \\
        t_3 & 0 & 0 & \underline{0} & 0 & 1 & 0 & 0 & ... \\
        t_4 & 1 & 0 & 1 & \underline{0} & 1 & 1 & 0  & ... \\
        t_5 & 1 & 1 & 1 & 1 & \underline{1} & 1 & 1 & ... \\
        t_6 & 1 & 0 & 0 & 1 & 0 & \underline{0} & 1  & ... \\
        t_7 & 0 & 1 & 0 & 1 & 0 & 0 & \underline{0} & ... \\
        ... &  \\
        \\ \hline \hline 
        \hat{t} & 1 & 0 & 1 & 1 & 0 & 1 & 1 & ...\\ 
        \end{array}

   | NOTE: :math:`i` th position in :math:`\hat{t} = 0` if
     :math:`s_i = 1`, 1 if :math:`s_i = 0`.

   | Construct an element :math:`\hat{t}` such that the :math:`i` th
     position in :math:`\hat{t}` equals 0 if the :math:`i` th position
     in :math:`t_i` is 1, and equals 1 if the :math:`i` th position in
     :math:`t_i` is 0.  
   | Notice that :math:`\hat{t} \neq t_i` for any :math:`i`.
     Yet :math:`\hat{t}` represents an element from :math:`2^S`.
     Contradiction! :math:`2^S` is not a countable set. QED. 

.. topic:: Theorem

   **Theorem:** For any nonempty :math:`\Sigma`, there exist languages
   that are not recursively enumerable.

   **Proof:**

   | A language is a subset of :math:`\Sigma^*`.
   | The set of all languages over :math:`\Sigma` is 
     :math:`2^{\Sigma^*}`. 
   | :math:`\Rightarrow` the set of all languages over :math:`\Sigma`
     is not countable.
   | The set of all TM's is countable. 
   | Thus, set of recursively enumerable languages are countable. 
   | :math:`Rightarrow` there are languages that are not recursively
     enumerable. QED.

     
{\bf Theorem} There exists a recursively enumerable language $L$ such that
$\bar L$ is not recursively enumerable.

{\bf Proof:}

\begin{itemize}
\item Let $\Sigma=\{a\}$ 

Enumerate all TM's over $\Sigma$: 
$M_1$, $M_2$, $M_3$, ... 

For each TM $M_i$, L($M_i$) is a RE (recursively enumerable) language. 

For each RE language, there is a TM that accepts it. 

Construct a new L = $\{ a^i | a^i \in L(M_i) \}$. 

L is a RE language. 
Can come up with an algorithm to list out all of its elements. 
Enumerate the TM codes until you generate the code for TM $M_i$. 
Generate the string $a^i$. Using the universal TM, simulate $M_i$ 
on $a^i$. If $a^i$ is in L($M_i$) then the simulation will halt. 

%SO \vfill\eject

%H \vfill
\begin{center}
\begin{tabular}{c|cccccc}
& a & aa & aaa& aaaa& aaaaa& ... \\ \hline
L($M_1$) & 0 & 1 & 1 & 0 & 1 & ... \\
L($M_2$) & 1 & 0 & 1 & 0 & 1 & ... \\
L($M_3$) & 0 & 0 & 1 & 1 & 0 & ... \\
L($M_4$) & 1 & 1 & 0 & 1 & 1 & ... \\
L($M_5$) & 0 & 0 & 0 & 1 & 0 & ... \\
... & \\
\\ \hline \hline 
L & 0 & 0 & 1 & 1 & 0 & ... \\ 
$\bar L$ & 1 & 1 & 0 & 0 & 1 & ... \\ 
\end{tabular}
\end{center}

Let $\bar L$ = $\{a^i | a^i \not\in L(M_i) \}$ 

Enumerate all the RE languages and identify which strings are in each language. 
A '0' entry means no the string is not in the language, 
and a '1' entry means yes, the string is in the language. 


$\bar L$ is not a RE language! $\bar L$ cannot equal any of the RE languages 
that are enumerated 
above because it differs in the $i$th position. QED 

NOTE: You cannot come up with an algorithm to list out its elements. 
The above algorithm for listing L's elements does not work to list 
$\bar L$'s elements. 


\end{itemize}

%H \vfill\eject
%SO \vfill\eject


The next two theorems in conjunction with the previous theorem 
will show that there are some 
languages that are recursively enumerable, 
but not recursive. 

{\bf Theorem} If languages $L$ and $\bar L$ are both RE, then L is recursive.


{\bf Proof}:

\begin{itemize}
\item 
There exists an 
%SO $\exists$
$M_1$ 
such that 
%SO s.t.
$M_1$ can enumerate all elements in $L$.

There exists an 
%SO $\exists$
$M_2$ 
such that 
%SO s.t.
$M_2$ can enumerate all elements in $\bar L$.

To determine if a string $w$ is in L or not in L 
perform the following algorithm: 

\begin{tabbing} 
123456 \= 123 \= \kill 
\> Repeat til w matched \\ 
\>\> enumerate next element in $M_1$ \\ 
\> \>enumerate next element in $M_2$ \\ 
\end{tabbing} 

If $w$ is enumerated from $M_1$, then $w$ is in L. If $w$ is enumerated 
from $M_2$ then $w$ is not in $L$. 

For each $w\in{\Sigma}^{*}$ we can determine if w is in L or not in L. 
Thus, L is recursive. QED. 

%H \vspace{1.5in}
\end{itemize}

%SO \vfill\eject


{\bf Theorem}: If L is recursive, then $\bar L$ is recursive.

{\bf Proof}:

\begin{itemize}
\item L is recursive, then there exists a TM M such that M can determine
if $w$ is in L or $w$ is not in L. 
M outputs a 1 if a string $w$ is in L, 
and outputs a $0$ if a string $w$ is not in L. 

Construct TM M' that does the following. M' first simulates TM M. 
If TM M halts with a 1, then M' erases the 1 and writes 
a 0. If TM M halts with a 0, then M' erases the 0 and writes a 1. 

%LO \vfill\eject

\begin{figure}[h!] 
\centerline { \includegraphics[scale=.90, angle=0]{lt25recl.pdf} } 
\end{figure} 

% %L {\leavevmode
% %L \epsfxsize=.30\linewidth
% %L \centerline{\epsfbox{lt25recl.eps}}
% %L }


M' can determine if a string $w$ is in $\bar L$ or not in $\bar L$. 

Thus, $\bar L$ is recursive. QED. 
\end{itemize}

Note: If L is not recursive, then both L and $\bar L$ cannot be RE. 

Note: The language 
L = $\{ a^i | a^i \in L(M_i) \}$ is RE but not recursive. 
(since we proved that its complement was not RE). 

%H \vfill
%SO \eject

Hierarchy of Languages:


\begin{figure}[h!]
\centerline { \includegraphics[scale=.60, angle=0]{lt25hier2.pdf} } 
%SO  \centerline { \includegraphics[scale=.90, angle=0]{lt25hier2.pdf} }
\end{figure}

% {\leavevmode
% %LH \epsfxsize=.15\linewidth
% %SO \epsfxsize=.60\linewidth
% \centerline{\epsfbox{lt25hier2.eps}}
% }

%SO \eject
NOTE: Now look at the grammar that represents the same language as the 
turing machine. 

NOTE: Also mention DCFL (between reg and CFL), CS (between CFL and REC) 
%H \eject
{\bf Definition} A grammar G=(V,T,S,P) is {\it unrestricted} if all 
productions are of the form 

\begin{center}
$u \rightarrow v$
\end{center}

where $u\in$(V$\cup$T)${}^{+}$ and $v\in$(V$\cup$T)${}^{*}$

NOTE: No conditions are imposed on the productions. 
you can have any number of variables and terminals on the left 
hand side. 


{\bf Example:}

Let G=($\{$S,A,X$\}$,$\{$a,b$\}$,S,P), P=

\begin{center}
\begin{tabular}{l}
S $\rightarrow$ bAaaX \\
bAa $\rightarrow$ abA \\
AX $\rightarrow$ $\lambda$ \\
\end{tabular}
\end{center}

A derivation of aab is: (the left hand side that is replaced is underlined) 

S $\Rightarrow$ \underline{bAa}aX $\Rightarrow$ a\underline{bAa}X $\Rightarrow$ 
aab\underline{AX} $\Rightarrow$ aab 

%H \vspace{.1in}

%SO \vfill\eject


{\bf Example} Find an unrestricted grammar G s.t. L(G)=$\{a^nb^nc^n | n> 0\}$

G=(V,T,S,P)

V=$\{$S,A,B,D,E,X$\}$

T=$\{$a,b,c$\}$

P= 

\begin{center}
\begin{tabular}{lll}
1) S $\rightarrow$ AX & \ \ \ \ \ \  
%S \\
& 7) Db $\rightarrow$ bD \\ 
2) A $\rightarrow$ aAbc & \ \ \ \ \ \  
%S \\
& 8) DX $\rightarrow$ EXc \\ 
3) A $\rightarrow$ aBbc & \ \ \ \ \ \  
%S \\
& 9) BX $\rightarrow$ $\lambda$ \\ 
4) Bb $\rightarrow$ bB & \ \ \ \ \ \ 
%S \\
& 10) cE $\rightarrow$ Ec \\ 
5) Bc $\rightarrow$ D & \ \ \ \ \ \  
%S \\ 
& 11) bE $\rightarrow$ Eb \\ 
6) Dc $\rightarrow$ cD & \ \ \ \ \ \  
%S \\
& 12) aE $\rightarrow$ aB \\ 
%S 7)  Db $\rightarrow$ bD \\
%S 8)  DX $\rightarrow$ EXc \\
\end{tabular}
\end{center}


Change the last rule to DX -> c and you can derive the string 
aaabbcbcc, moves a c in the wrong place to the end of the string.... 


%H There are some rules missing in the grammar.

%SO \vfill\eject

%LO \vfill\eject
To derive string aaabbbccc, use productions 1,2 and 3 to generate a string 
that has the correct number of a's b's and c's. The a's will all be together, 
but the b's and c's will be intertwined. 

\begin{center}
S $\Rightarrow$ AX $\Rightarrow$ aAbcX $\Rightarrow$ aaAbcbcX $\Rightarrow$
aaaBbcbcbcX
\end{center}

%SO \vfill

Use a B to move right through a group of B's until it see's a 'c'. 
Replace the 'c' by a D, and use the D to move right to the end of the string. 
Then write the 'c' at the end of the string. 
Use an E to move back to the left. 

\begin{center} 
aaaBbcbcbcX $\Rightarrow$ aaabBcbcbcX $\Rightarrow$ aaabDbcbcX \\ 
$\Rightarrow$ aaabbDcbcX $\Rightarrow$ aaabbcDbcX $\Rightarrow$ aaabbcbDcX \\ 
$\Rightarrow$ aaabbcbcDX $\Rightarrow$ aaabbcbcEXc 
\\ 
$\Rightarrow$ aaabbcbEcXc \\ 
$\stackrel{*}{\Rightarrow}$ aaaEbbcbcXc $\Rightarrow$ aaaBbbcbcXc \\ 
\end{center} 

%SO \vfill

Repeat this process until all the 
c's have been moved to the end of the string. 
Then remove the X from the string. 

\begin{center} 
aaaBbbcbcXc $\stackrel{*}{\Rightarrow}$ aaaBbbbXccc $\stackrel{*}{\Rightarrow}$ 
aaabbbBXccc $\Rightarrow$ aaabbbccc 
\end{center} 

%SO \vfill\eject

%H \eject

{\bf Theorem} If G is an unrestricted grammar, then L(G) is recursively
enumerable.

{\bf Proof:} 

\begin{itemize}
\item List all strings that can be derived in one step.

\begin{center} 
S $\Rightarrow$ w 
\end{center} 

%S \vspace{.3in}

List all strings that can be derived in two steps.

\begin{center} 
S $\Rightarrow$ x $\Rightarrow$ w 
\end{center} 

List all strings that can be derived in three steps. 

etc. 

It is possible to enumerate all strings in the language. 

%SO \vfill\eject

\end{itemize}


%%  Temporary \eject here because lecture spread over two days
%H \vspace{.5in}

{\bf Theorem} If L is recursively enumerable, then there exists 
an unrestricted grammar G such that L=L(G).

{\bf Proof:} 

Sketch! 

\begin{itemize}
\item L is recursively enumerable.

$\Rightarrow$ there exists a TM M such that L(M)=L.

M = $(Q,\Sigma, \Gamma, \delta, q_0, B, F)$

Idea M starts with w and eventually ends up with a final state. 

$q_0w \stackrel{*}{\vdash} x_1q_fx_2$ for some
$q_f\in$F, $x_1,x_2\in{\Gamma}^{*}$

Construct an unrestricted  grammar G s.t. L(G)=L(M).


but in G, grammar starts with $S$ and eventually derives $w$, 
$S \stackrel{*}{\Rightarrow}w$

so the constructed grammar will mimic the Turing machine in reverse. 

Three steps
\begin{enumerate}
\item $S\stackrel{*}{\Rightarrow}B\ldots B\#xq_fyB\ldots B$

with x,y$\in {\Gamma}^{*}$ for every possible combination 

\item $B\ldots B\#xq_fyB\ldots B \stackrel{*}{\Rightarrow} 
B\ldots B\#q_0wB\ldots B$

by following rules that mimic transitions in reverse order. 


\item $B\ldots B\#q_0wB\ldots B \stackrel{*}{\Rightarrow} w$

Here just remove the blanks, and $\# q_0$. 

\end{enumerate}

so here is the constructed grammar. 

G=(V,T,S,P) 

T=$\Sigma$ 

V=$\{\Gamma - \Sigma\} \cup Q \{\#\} \cup \{S,A\}$ 

P for each of the three above are: 

\begin{enumerate} 
\item For $S\stackrel{*}{\Rightarrow}B\ldots B\#xq_fyB\ldots B$ 


$S \rightarrow BS \mid SB \mid \#A$ 

Replace S with lots of blanks and then finally a \# 

$A \rightarrow aA \mid Aa \mid q$ 

(for every $a \in \Gamma$ and $q \in F$) 

then generate the strings of symbols finishing off with a final state. 

\item for $B\ldots B\# xq_fyB\ldots B \stackrel{*}{\Rightarrow} 
B\ldots B\# q_0wB\ldots B$ 

Create the rules that mimic what the TM does in reverse order. 

Mimic left and right moves. 

For each $\delta(q_i,a)=(q_j,b,R)$ 

add to P, $bq_j \rightarrow q_ia$ 

For each $\delta(q_i,a)=(q_j,b,L)$ 

add to P, $q_jcb \rightarrow cq_ia$ for every $c \in \Gamma$ 



\item for $B\ldots B\# q_0wB\ldots B \stackrel{*}{\Rightarrow} w$ 

To get rid of $\# q_0$ and blanks, 

\begin{center} 
\begin{tabular}{l} 
$\# q_0 \rightarrow \lambda$ \\ 
$B \rightarrow \lambda $ \\ 
\end{tabular} 
\end{center} 

\end{enumerate} 


Then show that $S \stackrel{*}{\Rightarrow} w$ iff 
$q_0w \stackrel{*}{\vdash} x_1q_fx_2$ for $q_f \in F$ 
\end{itemize}

%SO \vfill\eject
%H \vfill\eject


{\bf Definition} A grammar G is {\it context-sensitive} if all productions
are of the form
\begin{center}
$x \rightarrow y$
\end{center}

where $x,y \in (V \cup T)^{+}$ and $|x|\le |y|$

Can be shown that another way to define these is that all productions are 
of the form: 

\begin{center} 
$xAy \rightarrow xvy$ 
\end{center} 


This is equivalent to saying $A \rightarrow v$ can be applied {\it in the 
context of} x on the left and x on the right. 

%H \vspace{1.5in}

%SO \vfill
{\bf Definition} L is context-sensitive (CSL) if there exists a context-sensitive
grammar G such that L=L(G) or L=L(G) $\cup$ $\{\lambda\}$.

NOTE: in the definition of the grammar, can't have any lambda rules. 

NOTE: Put $\lambda$ in there so we can claim that CFL $\subset$ CSL 

%SO \vfill\eject

{\bf Theorem} For every CSL L not including $\lambda$, $\exists$ an LBA M
s.t. L=L(M).

%S \vfill
{\bf Theorem} If L is accepted by an LBA M, then $\exists$ CSG G
s.t. L(M)=L(G).

%S \vfill

{\bf Theorem} Every context-sensitive language L is recursive.
%S \vfill

{\bf Theorem} There exists a recursive language that is not CSL.


%S \vfill\eject


Note: Section 11.3 covers context-sensitive languages (CSL). These languages 
lie between the context-free languages and the recursive languages. 
CSL's and LBA's (linear bounded automata) 
represent the same class of languages. 
