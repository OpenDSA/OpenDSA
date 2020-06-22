.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
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
   \mbox{Source} & \mbox{Object} & \\
   \mbox{Language} & \mbox{Language} & \mbox{Name} & \mbox{Example}  \\ \hline
   \mbox{High Level} & \mbox{High Level} & \mbox{preprocessor} & \mbox{ratfor} \rightarrow \mbox{f77} \\ 
   &&& \mbox{m4}, \mbox{cpp} \\ \hline 
   \mbox{Assembly} & \mbox{Machine} & \mbox{assembler} & \mbox{as} \\ \hline 
   \mbox{High Level} & \mbox{Machine} & \mbox{compiler} & \mbox{g++}, \mbox{javac} \\ \hline 
   \mbox{Any} & \mbox{executes} & \mbox{interpretor} & \mbox{BASIC (often)} \\ 
   & \mbox{immediately} & & \mbox{c shell} \\ 
   & & & \mbox{apl}, \mbox{lisp}, \mbox{java} \\ 
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
   |      ``\newcommand\TODO[1]{{\color{red}[#1]}}``
   |   then use ``\TODO{}`` wherever you want.

NOTE: Today all these are transparent and are packaged into a "compiler". 

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
   :width: 600
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: st1over

* :term:`lexical analysis` - read the program character by character
  grouping into atomic units called tokens 

* :term:`syntax analysis` - accepts tokens, checks if program is
  syntactically correct, generates a :term:`parse tree`. 

* :term:`intermediate code generation` - walk through parse tree producing 
  simple :term:`assembly code`

* :term:`code optimization` - transform intermediate code to "better"
  code (faster) 

* :term:`code generation` - transform intermediate code to machine code 
  (assembler) 

* :term:`symbol table`

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
into atomic units called :term:`tokens <token>`.

Tokens:

* depend on language and compiler writer

* Examples:

  | reserved word: ``if``, ``for``
  | operators: ``+, -, <, =``
  | constants: ``0, 4.89``
  | punctuation: ``(, }, [``
  | identifiers: ``i, myNode``

* Treated as a pair: ``token.type`` and ``token.value``

  * ``token.type`` is a (mnemonic) integer 
  * some tokens have no ``token.value``

.. topic:: Example

   | ``if (x <= 0) x = y + z``

   when put through lexical analyzer produces:

   .. math::

      \begin{array}{cc|c|cc}
      & \mbox{token} &  \mbox{type} & \mbox{value}  \\ \hline
      & \mbox{if} & 25 \\
      & ( & 28 \\
      & \mbox{id} & 23 & ``x" \\
      & <= & 27  \\
      & \mbox{int constant} & 22 & 0 \\
      & ) & 38 \\
      & \mbox{id} & 23 & ``x" \\
      & = \mbox{assgnment} & 4 \\
      & \mbox{id} & 23 & ``y" \\
      & + & 34 \\
      & \mbox{id} & 23 & ``z" \\
      \end{array}


How does one build a :term:`scanner`?

   * from scratch
   * lex

Preview of Lex

   * idea: tokens described by regular expressions

   * basic syntax:

     regular expression, action

   * basic semantics:

     if match regular expression, then do action.

   * Example:

.. math::

   \begin{array} {ll}
   \%\% \\
   ``\mbox{if}" & \mbox{return}(25);\\
   ``("  & \mbox{return}(28); \\
   [0-9]+ & \mbox{return}(22); \\
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
      :width: 500
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: st1ptree


d. How does one build a :term:`parser`?

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


.. topic:: Example

   | ``if (x <= 0) x = x + z``
   |
   |           :math:`\downarrow`
   |
   |       ``if (x <= 0) goto L1``
   |       ``goto L2``
   | ``L1: x := y + z``
   | ``L2:``

Some compilers combine syntax analysis and intermediate code
generation (i.e. no parse tree is generated)  


1.3.4 Intermediate Code Generation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Purpose: Transform the intermediate code into "better" code.

Examples:

1) Rearrangement of Code

::

       if (x <= 0) goto L1               if (x$>$0 goto L2
       goto L2                ==>        x = y $+$ z
   L1: x = y + z                     L2:
   L2:

2) Redundancy Elimination

::

   a = w + x + y                         T1 = x + y
                              ==>        a = w + T1
   b = x + y + z                         b = T1 + z

3) Strength Reduction

::
   
   x^2                        ==>        x*x
   expensive                  ==>        cheap
   operator                              operator

4) Frequency  Reduction
 
::

   for (i=1; i<n; i=i+1)                 T1 = sqrt(26)
     x = sqrt(26)             ==>        for (i=1; i<n; i=i+1)
   }                                       x = T1
                                         }

Remarks:

1) Main criteria for optimization is speed.

2) Optimization takes time; hence it 

   * is optional 
   * may not be desirable (in low level CS class) 

Code Generation
~~~~~~~~~~~~~~~

Purpose: Transform intermediate code to machine code (assembler)

Example: ``a = b + c``

   | ``mov  b, R1``
   | ``add  c, R1``
   | ``mov  R1, a``

Remarks

1) completely machine dependent whereas other phases are not 

2) "register allocation" is the most difficult task 

   * idea - use registers (fast access) to avoid memory use
     (slow access)
   * problem - only a finite number of registers (during intermediate 
     code phase, one assumes an infinite number) 

Symbol Table
~~~~~~~~~~~~

Purpose: record information about various objects in the source program

Examples

* procedure - number and type of arguments
* simple variable - type
* array - type, size

Use - information is required during

* parsing (for type checking) 
* code generation (for generating the correct operand, allocating memory) 


Error Handler
~~~~~~~~~~~~~

Errors - all errors should be

* detected
* detected correctly
* detected as soon as possible
* reported at the appropriate place and in a helpful manner

Purpose

* report errors
* "error recovery" - Be able to proceed with processing

Note: Errors can occur in each phase

* misspelled token
* wrong syntax
* improper procedure call
* statements that cannot be reached
