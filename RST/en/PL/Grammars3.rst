.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: David Furcy and Tom Naps

.. odsalink::  AV/PL/AV/parseTree.css

====================================================
Enforcing Order of Operations
====================================================


Evaluation of Expressions
-------------------------

In this section, we will learn about:

  1. Operator precedence
  2. Operator associativity
  3. EBNF extensions and their advantages

In the previous section, we saw that ambiguous grammars are to be
avoided because the parse trees they allow lead to
confusion when we attach semantics (i.e., meaning) to the structure of
the parse tree. The tree cannot be relied upon to specify the order of
operations.

Although :ref:`eg1` does not suffer from ambiguity, it has another
problem.  In particular, if you return to the parse tree slide show
that accompanied :ref:`eg1`, you will note that in parsing
:math:`A+B*C`, the :math:`+` operation was at a deeper level in the
tree than :math:`*`, thereby indicating that :math:`A+B` would be
evaluated first and then multiplied by :math:`C`.  However, this order
of operations does not coincide with the operator precedence rules in
almost every programming language.  So :ref:`eg1`, although
unambiguous, is not the algebraic expression grammar that we need.
Instead consider the following grammar.

.. _eg3:

Third Sample Grammar
^^^^^^^^^^^^^^^^^^^^

.. math::

   \begin{eqnarray*}
   <exp> &::=& <term>\\
   &|& <exp> + <term> \\
   &|& <exp> - <term> \\
   <term> &::=& <fact> \\
   &|&  <term> * <fact> \\
   &|&  <term> / <fact> \\
   <fact> &::=& <var> \\
   &|& ( <exp> ) \\
   <var> &::=& A\ |\ B\ |\ C\ |\ \ldots\ |\ X\ |\ Y\ |\ Z
   \end{eqnarray*}

Note how the parse tree in the slide show below, produced using
Third Sample Grammar, is different from the one produced by :ref:`eg1`.

.. inlineav:: parseTree3 ss
   :links: 
   :scripts: AV/PL/AV/parseTree3.js
   :output: show

In particular, with Third Sample Grammar, the sub-tree corresponding
to the multiplication operator appears at a deeper level in the parse
tree than the sub-tree for addition, thereby corresponding to normal
operator precedence in programming languages.

The slide show below is a "producer" for Third Sample Gramar that you can
control by entering the expression for which you want a parse tree
produced.  You should experiment  with producing a variety of
slide shows until you feel confident that you could manually construct
the parse tree corresponding to any possible expression.

.. avembed:: AV/PL/AV/parseTree3a.html ss

Once you feel confident working with parse trees, here are two
questions to consider before you start on the review problems for this
section.

**Question 1:** If you are designing a grammar corresponding to
expressions, what is the strategy you would employ for introducing a
different level of operator precedence, one that is either higher or
lower than that of other operators?  How would this strategy play out
with respect to Third Sample Grammar if you wanted to add an operator
corresponding to exponentiation?

**Question 2:** In Third Sample Grammar, operators at the same level
of precedence associate in left-to-right order, that is, :math:`A+B-C`
evaluates as the parenthesized expression :math:`((A+B)-C)`.  What
about the grammar dictates this left-to-right associativity?  How
would you change the productions to achieve right-to-left
associativity, that is, :math:`(A+(B-C))`?

The problem set for this section contains five review problems,
the first four of which concern themselves with how a grammar dictates
operator precedence and associativity.  Do not start these problems
until you have thought through answers to the two questions posed
above.

Expression Evaluation
---------------------

This first problem illustrates how grammatical structure influences the
evaluation of arithmetic expressions, and thus the semantics of
programs.  Note that, **to get credit for the first problem,** you
must solve it correctly three times in a row because the question is
randomized.  After you get the question right one time, the *Check
Answer* button will then allow you to proceed to the next instance of
the question.

.. avembed:: Exercises/PL/EvalExp.html ka
   :long_name: Evaluating Expression Based on Grammar

Associativity
-------------

This problem demonstrates how grammatical structure impacts the
associativity property of arithmetic operators.

.. avembed:: Exercises/PL/Associativity.html ka
   :long_name: Associativity


Precedence and Associativity
----------------------------

This problem illustrates how grammatical structure impacts the
associativity property and order of precedence of arithmetic
operators.

.. avembed:: Exercises/PL/PrecedenceAndAssociativity.html ka
   :long_name: Precedence and associativity

Characterizing a Language Given a BNF Grammar
---------------------------------------------

This problem asks you to provide a characterization in English of the
language generated by a BNF grammar.  After you finish it, there is
one more problem about Extended Backus-Naur Form, which is described
before the problem.

.. avembed:: Exercises/PL/CharacterizeLang3.html ka
   :long_name: Characterizing Language 3

Extended BNF
------------

Recall that the symbols we have used in our representation of grammars
collectively comprise what is known as *Backus-Naur Form* (BNF).  In
*Extended Backus-Naur Form* (EBNF) we add five meta-symbols to those
already used in BNF notation:


   1. Kleene closure operator :math:`*`, which means "zero or more". Hence if :math:`<fn\_name>`   were a non-terminal representing a valid function name and :math:`<argument>` were a non-terminal representing a valid argument, then the EBNF notation for function calls with zero or more arguments (with no commas between them) would be

      .. math::

        <fn\_name>\ "("\ <argument>*\ ")"

   2. Positive closure operator :math:`+`.  The EBNF notation for function calls that must have at least one argument would be

      .. math::

        <fn\_name>\ "("\ <argument>+\ ")"

   3. The two paired parenthesis symbols :math:`( \; )`, which are used for grouping.  For example, if :math:`<positive\_number>` were the non-terminal denoting a valid positive number, then the following EBNF would dictate that we *must* have a plus or minus sign preceding a number

     .. math::

      (+ | -) <positive\_number>

   4. The "optional operator" :math:`?`, which specifies that you can have zero or one of whatever grammatical structure precedes the operator.  For example, if our language allowed an optional plus or minus sign in front of a number, we would use the EBNF

      .. math::

        (+ | -)? <positive\_number>

EBNF is used to reduce the number of productions a grammar needs to
specify a language.  However, it does not increase the expressive power of
grammars, that is, any grammatical structure that can be expressed in
EBNF can also be expressed in BNF if one is willing to use more
productions.



This last problem is about the equivalence between a given BNF grammar (the
same one as in the previous problem) and a smaller EBNF grammar.

.. avembed:: Exercises/PL/ExtendedBNF.html ka
   :long_name: Extended BNF

.. odsascript:: Exercises/PL/EvalExp.js
