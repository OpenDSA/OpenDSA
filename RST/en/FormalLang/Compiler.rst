.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: Compilers
   :topic:

Structure of a Compiler
=======================

What is a compiler?
-------------------

Translator
~~~~~~~~~~

**Definition:**

.. math::

   \begin{array}{cc|c|cc}
   \cline{3-3} program in & & & & program in \\ 
   source language & \longrightarrow & translator & \longrightarrow
   & object (target) \\ 
   X & & for X & & language Y \\
   \cline{3-3} 
   \end{array}

**Examples:**

.. math::

   \begin{array} {c|c|c|c}
   Source & Object & \\
   Language & Language & Name & Example  \\ \hline
   High Level & High Level & preprocessor & ratfor $\rightarrow$ f77 \\ 
   &&& m4, cpp \\ \hline 
   Assembly & Machine & assembler & as \\ \hline 
   High Level & Machine & compiler & g++, javac \\ \hline 
   Any & executes & interpretor & BASIC (often) \\ 
   & immediately & & c shell \\ 
   & & & apl, lisp, java \\ 
   \end{array}

Preprocessor: If you have a language that has while statements 
but no for statements, construct a new language that allows for 
statements and use preprocessor to translate new language into old 
language::

   for i=1 to n do
     (stmts)
   end for

|   :math:`\downarrow`

::

   i = 1
   while (i <= n) do
     (stmts)
     i = i + 1
   end while


Language Processing System 
--------------------------

.. math::

   \begin{array} {ccc} 
   & skeletal source program \\
   \\ 
   & \downarrow \\
   \\ \cline{2-2}
   & \multicolumn{1}{|c|}{preprocessor} \\
   \cline{2-2}   \\ 
   & \downarrow \\
   \\ 
   & source program \\
   \\ 
   & \downarrow \\
   \\ \cline{2-2}

   & \multicolumn{1}{|c|}{compiler} \\ \cline{2-2}
   \\ 
   & \downarrow \\
   \\ 
   & target (object) assembly program \\
   \\ 
   & \downarrow \\
   \\ \cline{2-2}

   & \multicolumn{1}{|c|}{assembler} \\ \cline{2-2}
   \\ 
   & \downarrow \\
   \\ 
   & relocatable machine code \\
   \\ 
   & \downarrow \\
   \\ \cline{2-2}

   & \multicolumn{1}{|c|}{loader/link-editor} \\ \cline{2-2}
   \\ 
   & \downarrow \\
   \\ 
   & absolute machine code \\
   \\ 
   \end{array}

Comments:

   | * Preprocessor - C preprocessor replaces ``#include`` statements 
       with files. 
   | * Preprocessor - macro preprocessor
   |   Example: In LaTeX, define a macro 
   |   ``\newcommand\TODO[1]{{\color{red}[#1]}}``
   |   then use ``\TODO`` wherever you want.

NOTE: Today all these are transparent are grouped into a ``compiler''. 

Compiler
~~~~~~~~

.. math::

   \begin{array}{cc|c|cc} \cline{3-3}
   program in & & &   & program in \\ 
   high level & \longrightarrow & compiler & \longrightarrow
     & machine  \\
     language X & &  for X & & language  Y \\ \cline{3-3}
     \end{array}


Overview of General Compiler 
----------------------------

.. odsafig:: Images/st1over.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: st1over

* lexical analysis - read the program character by character
  grouping into atomic units called tokens 

* syntax analysis - accepts tokens, checks if program is
  syntactically correct, generates a parse tree. 

* intermediate code generation - walk through parse tree producing 
  simple assembly code 

* code optimization - transform intermediate code to "better"
  code (faster) 

* code generation - transform intermediate code to machine code 
  (assembler) 

* symbol table

   * lexical analysis: enter identifier into table, 
   * syntax analysis: - type of identifier and usage,
   * code generation: storage locations bound to names at runtime 

* error handling - lex: lot of errors will pass thru (``while`` is 
  typed as ``wh ile``) 


Phases of Compilation
---------------------

Lexical Analysis (Scanner)
~~~~~~~~~~~~~~~~~~~~~~~~~~

Purpose: Read the same program character by character grouping them
into atomic units called :term:`tokens`.

Tokens:

* depend on language and compiler writer

* Examples:

  | reserved word: ``if``, ``for``
  | operators: ``+, -, <, =``
  | constants: ``0, 4.89``
  | punctuation: ``(, }, [`
  | identifiers: ``i, myNode``

* Treated as a pair: ``token.type`` and ``token.value``

  * ``token.type`` is a (mnemonic) integer 
  * some tokens have no ``token.value``

.. topic:: Example

   | ``if (x <= 0) x = y + z``

   when put through lexical analyzer produces:

   .. math::

      \begin{array}{cc|c|cc}
      & token &  type & value  \\ \hline
      & if & 25 \\
      & ( & 28 \\
      & id & 23 & "x" \\
      & $<=$ & 27  \\
      & int constant & 22 & 0 \\
      & ) & 38 \\
      & id & 23 & "x" \\
      & = assgnment & 4 \\
      & id & 23 & "y" \\
      & $+$ & 34 \\
      & id & 23 & "z" \\
      \end{array}


How does one build a lexical analyzer?

   * from scratch
   * lex

Preview of Lex

   | * idea: tokens described by regular expressions

   | * basic syntax:
   |   regular expression, action

   | * basic semantics:
   |   if match regular expression, then do action.

   | * Example:

.. math::

   \begin{array} {ll}
   \%\% \\
   "if" & return(25);\\
   "("  & return(28); \\
   [0-9]+ & return(22); \\
   \end{array}


Besides returning token types and values, the lexical analyzer might
   a) print error messages
   b) insert identifiers in the symbol table

Difficult to differentiate sometimes:
When does lexical analysis stop and parsing start?
Example, consider keywords AND and OR.
Are they tokens of type AND and OR, or are they RELOP tokens with
values AND and OR? 


Syntax Analysis (Parsing)
~~~~~~~~~~~~~~~~~~~~~~~~~

a. Purpose: Accepts the sequence of tokens generated by the 
   lexical analyzer, checks whether the program is syntactically
   correct, and generates a parse tree. 

b. Syntax: formally described by a context free grammar. 

c. Parse Tree

   ``if (x <= 0) x = y + z``


   .. odsafig:: Images/st1ptree.png
      :width: 300
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: st1ptree


d. How does one build a parser?

   * from scratch
   * using a parser generator such as yacc

1.3.3 Intermediate Code Generator
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

a. Purpose: Traverse the parse tree, producing simple intermediate
   code.

b. Three-Address Code: Sequence of instructions, each has at most
   three operands.
   (like assembly in which each memory location can act like a register). 

   Instructions:

   | 1. ``id := id op id``
   | 2. ``goto label``
   | 3. ``if condition goto label``

\indent Example:

\begin{tabbing}
 12 \= 1234 \= 1234 \= \kill
 \> if \> (x$<=$0) x = x $+$ z \\
 \> \\
 \> \> \> $\downarrow$ \\
 \> \> \\
 \> \> if (x$<=$0) goto L1 \\
 \> \> goto L2 \\
 \> L1: \> x := y + z \\
 \> L2: \\
\end{tabbing}
\indent Remark: some compilers combine the syntax analysis and 
intermediate code generation (i.e. no parse tree is generated) 


%SO \vfill

\noindent 1.3.4 Intermediate Code Generation

\noindent a. Purpose: Transform the intermediate code into ``better''
code.

%SO \vfill\eject

\noindent b. Examples

1) Rearrangement of Code


\begin{tabbing}
123456 \= 1234 \= 1234567890123456 \= 1234 \= 1234 \= \kill 
%SO \= 123 \= 123456789012345 \= 1 \= 3 \= \kill
 \> \>  if (x$<=$0) goto L1 \> \> \> if (x$>$0 goto L2 \\  
 \>  \>  goto L2 \> $\rightarrow$ \> \> x = y $+$ z \\
 \> L1: \> x  = y $+$ z \> \> L2: \\
  \> L2: \\
\end{tabbing}

%LO \Page
2) Redundancy Elimination

\begin{tabbing}
123456 \= 1234 \= 1234567890123456 \= 1234 \= 1234 \= \kill 
%SO   \=  234 \= 345678901234 \= 34 \= 4 \= \kill
 \> a = w $+$ x $+$ y \> \> \> \> T1 = x $+$ y \\
 \> \> \> $\rightarrow$ \> \>  a = w + T1 \\
 \> b = x $+$ y $+$ z \> \> \> \> b = T1 + z \\
\end{tabbing}
%SO \eject
3) Strength Reduction

\begin{tabbing}
123456 \= 12345678 \= 1234567890 \= \kill 
%SO  \= 345678 \= 34567890  \= \kill
 \> $x^2$ \> $\rightarrow$ \> $x*x$ \\
 \> expensive \> $\rightarrow$ \> cheap \\
 \> operator \> \> operator \\
\end{tabbing}

%SO \vfill
4) Frequency  Reduction
 
\begin{tabbing}
123456 \= 1234 \= 1234567888123456 \= 71234 \= 1234 \= \kill 
%SO   \=  234 \= 23456788823456 \= 1 \= 234 \= \kill
 \> for (i=1; i$<$n; i=i$+$1) $\{$ \> \> \> T1 = sqrt(26) \\
 \> \> x = sqrt(26) \> $\rightarrow$ \>  for (i=1; i$<$n; i=i$+$1)
 $\{$ \\
 \> \> $\}$ \>  \> \> x = T1 \\
 \> \> \> \> \> $\}$
\end{tabbing}

%H \vfill\eject
%SO \vfill
\noindent c. Remarks:

1) Main criteria for optimization is speed.

2) Optimization takes time; hence it 
\begin{itemize} 
\item is optional 
\item may not be desirable 
(in low level CS class) 
\end{itemize} 

%SO \eject
\noindent 1.3.5 Code Generation

\noindent a. Purpose: Transform intermediate code to machine code 
(assembler)

\noindent b. Example: \ a = b + c

\begin{tabbing}
 12345678 \= mov1 \= 123456 \kill
 \> mov \> b, R1 \\
 \> add \> c, R1 \\
 \> mov \> R1, a \\
\end{tabbing}

\noindent c. Remarks

1) completely machine dependent whereas other phases are not 

2) ``register allocation'' is the most difficult task 

\begin{itemize} 
\item idea - use registers (fast access) to avoid memory use (slow
access) 
\item problem - only a finite number of registers (during intermediate 
code phase, one assumes an infinite number) 
\end{itemize} 
%SO \vfill\eject

\noindent 1.4 Symbol Table

\noindent a. Purpose: record information about various objects in the
source program

\noindent b. Examples

\begin{itemize}
\item procedure - no. and type of arguments
\item simple variable - type
\item array - type, size
\end{itemize}



\noindent c. Use - information is required during

\begin{itemize}
\item parsing 
(for type checking) 
\item code generation
(for generating the correct operand, allocating memory) 
\end{itemize}

%S \vfill\eject

\noindent 1.5 Error Handler

\noindent a. Errors - all errors should be

\begin{itemize}
\item detected
\item detected correctly
\item detected as soon as possible
\item reported at the appropriate place and in a helpful manner
\end{itemize}

\noindent b. Purpose

\begin{itemize}
\item report errors
\item ``error recovery'' - proceed with processing
\end{itemize}

%SO \vfill\eject

\noindent c. Note: Errors can occur in each phase
\begin{itemize}
\item misspelled token
\item wrong syntax
\item improper procedure call
\item statements that cannot be reached
\end{itemize}
