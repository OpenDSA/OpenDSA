.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :title: Derivations and Parse Trees
   :author: David Furcy; Tom Naps
   :institution: UW-Oshkosh
   :keyword: Parse Tree
   :naturallanguage: en
   :programminglanguage: N/A
   :description: Introduction to Parse Trees.

===========================
Derivations and Parse Trees
===========================
.. (M 2/1/16)

Parse Trees
-----------

Topics in this section include:

  1. Grammar terminology
  2. Derivations and parse trees

Grammars provide a formalism for expressing the syntax of programming
languages.  That syntax is consequently used to parse, that is,
determine the syntactical correctness of, a "program" in the language.
A **grammar** is composed of the following three elements.


  * A set of **terminals**.  These terminals represent the tokens or
    groups of characters that logically belong together, such as
    operator symbols, delimiters, keywords, and variable names that
    ultimately comprise the program or expression being parsed. In the
    case of algebraic expressions, the terminals would be variables,
    numeric constants, parentheses, and the various operators that are
    allowed.
  
  * A set of **non-terminals**.  These non-terminals represent the various
    grammatical constructs within the language we are parsing. In
    particular, one non-terminal is designated as the start symbol for
    the grammar.
  
  * A set of **productions**.  The productions are formal rules defining
    the syntactical composition of the non-terminals from the
    previous point. The productions take the form:

.. math::

   \begin{eqnarray*} 
   <non\mathrm{-}terminal> &::=& String \; of \; terminals \; and/or \; non\mathrm{-}terminals\\
   \end{eqnarray*}


We say that the non-terminal on the left-hand side (LHS) of such a
production *derives* the string on the right-hand side (RHS).


The type of grammars we are using in this course (i.e., those with only
one non-terminal on the LHS of each production) is more precisely
called a **context-free grammar** or **BNF grammar** (short for
"Backus-Naur Form). Since we are not going to discuss other types of
formal grammars in this course, we can safely refer to them simply as
grammars.


An example of a grammar should help to clarify the
three-part definition above.  By convention, the non-terminal on the LHS of
the first production is the start symbol, and that is what ultimately
must be parsed to have a complete expression in the language.  Hence
in the example below, :math:`<exp>` is the start symbol.

.. _eg1:

First Sample Grammar
^^^^^^^^^^^^^^^^^^^^

.. math::

   \begin{eqnarray*} 
   <exp> &::=& <term>\\
   &|& <exp> + <term> \\
   &|& <exp> - <term> \\
   &|& <exp> * <term> \\
   &|& <exp> / <term> \\
   <term> &::=& <var> \\
   &|& ( <exp> ) \\
   <var> &::=& A\ |\ B\ |\ C\ |\ \ldots\ |\ X\ |\ Y\ |\ Z
   \end{eqnarray*}


This is essentially a grammar for algebraic expressions with variables
(that is, the :math:`<var>` non-terminal) allowed to be a single uppercase
letter.  When reading a grammar, the vertical bar :math:`|` means
"or".  Hence :math:`<var>` can be A or B or C ...  The :math:`<term>`
non-terminal must either be a :math:`<var>` or a parenthesized
:math:`<exp>`.  A derivation of the expression :math:`A + B * C`
according to this grammar proceeds as illustrated in the following
slide show, with the final result being a *parse tree*.  You should step
through all of the slides, making sure that at each step you understand
the production that is being applied to "grow" the parse tree.
   

.. inlineav:: parseTree4 ss
   :links: AV/PL/main.css AV/PL/AV/parseTree.css
   :scripts: AV/PL/AV/parseTree4.js
   :output: show

Note that, in a complete parse tree, leaf nodes are always terminals,
and a traversal of the tree that would output these leaf nodes
would reproduce the expression being parsed.  This is indicated by the red
highlighting in the above slide show.

The following set of four review problems for this section should be completed before you go on.   In these review problems, the symbol :math:`\epsilon` is used to represent the *empty string*.   When :math:`\epsilon` appears on the RHS of a production, it means that one of the possibilities for the non-terminal on the LHS the production is for it to derive the empty string, that is, the string with no characters.  This is typically used when the syntax for the language being parsed allows the option of the non-terminal not appearing at all.   Often with productions that are recursive, it provides a way for the recursion to bottom out, similarly to the way a recursive termination condition would work in a recursive algorithm.

The first problem below is about building a parse tree given a grammar and a string.

.. avembed:: Exercises/PL/NumParseTreeNodes.html ka
   :long_name: Determine Number of nodes


Strings Generated by a Grammar
------------------------------

The following problem is about determining whether a given string can be
generated by a given grammar.

.. avembed:: Exercises/PL/StringGenFromGmr.html ka
   :long_name: String Generated By a Grammar

Characterizing a Language: Example 1
------------------------------------

The following problem is about identifying properties of all of the strings in
a language defined by a given grammar.

.. avembed:: Exercises/PL/CharacterizeLang1.html ka
   :long_name: Characterizing a Language, Problem 1

Characterizing a Language: Example 2
------------------------------------

The following problem is about precisely characterizing the whole language
generated by a given grammar.

.. avembed:: Exercises/PL/CharacterizeLang2.html ka
   :long_name: Characterizing a Language, Problem 2
