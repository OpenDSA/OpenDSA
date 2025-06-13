.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :title: Syntax of the Lambda Calculus
   :author: David Furcy; Tom Naps; Taylor Rydahl
   :institution: UW-Oshkosh
   :keyword: Lambda Calculus
   :naturallanguage: en
   :programminglanguage: N/A
   :description: Discusses syntax of the lambda calculus

.. odsalink::  AV/PL/AV/parseTree.css
.. odsalink::  AV/PL/main.css

.. index:: ! lambda calculus, Alonzo Church, functional programming ; lambda calculus

.. _syntax-of-LC:

Syntax of the Lambda Calculus
=============================

Lambda Calculus
---------------

The :dfn:`lambda calculus` (also written as :math:`\lambda`-calculus,
where :term:`lambda` is the name of the Greek letter :math:`\lambda`)
was created by Alonzo Church in the early 1930s to study which
functions are computable. In addition to being a concise yet powerful
model in computability theory, the lambda calculus is also the
simplest functional programming language. So much so that the lambda
calculus looks like a toy language, even though it is (provably!) as
powerful as any of the programming languages being used today, such as
JavaScript, Java, C++, etc. 

.. index:: lambda calculus ; syntax

Programs in the lambda calculus are called :dfn:`lambda expressions`
(abbreviated :math:`\lambda exp`), of which there are only three
kinds. In fact, here is a complete BNF grammar for the lambda
calculus:

.. index:: lambda calculus ; BNF grammar

.. math::

   \begin{eqnarray*} 
   <\lambda exp> &::=& <var>\\
                        &|& \lambda <\mathrm{var}>\ .\ <\lambda exp>\\
                        &|& (\ <\lambda exp>\ <\lambda exp>\ )\\
   \end{eqnarray*}

.. index:: 
     lambda calculus; variable
     lambda calculus; function abstraction
     lambda calculus; lambda abstraction
     lambda calculus; function application
     lambda calculus ; anonymous function


This BNF grammar tells us that expressions in the lambda calculus come
in one of three flavors:

  1. A :dfn:`variable` (the first production above): typically, we
     will use a single letter, with an optional integer subscript, to
     denote a variable. So, :math:`x, y, a_1`, and :math:`p_2` are
     examples of variables.


  2. A :dfn:`function abstraction` (the second production above):
     this type of :math:`\lambda` expressions, also called a
     :term:`lambda abstraction`, corresponds to a function
     definition, which contains two components: the formal parameter
     of the function (there must be exactly one parameter, namely the
     :math:`< var >` non-terminal in the second production above) and
     the body of the function (namely the :math:`<\lambda exp >`
     non-terminal in the same production). So, for example,
     :math:`\lambda x.y` is the function whose formal parameter is
     :math:`x` and whose body is :math:`y`. Note that the non-terminal
     :math:`<var>` after the :math:`\lambda` terminal is *not* the
     name of the function. In fact, all functions in the lambda calculus
     are anonymous.

  3. An :dfn:`application` (the third production above): this type of
     :math:`\lambda` expressions corresponds to a function call (or
     application, or invocation), which contains two components: the
     function being called, followed by the argument that is passed
     into the function. So, for example, :math:`(f\ x)` is the
     application of the variable :math:`f` (which must stand for a
     function, since functions are the only values in the lambda
     calculus) to the argument :math:`x`, which must also stand for a
     function. 

     .. index::
          lambda calculus; parentheses

     Note that in the lambda calculus, the parentheses
     surround both the function and its argument, while in many modern
     programming languages (and in mathematical notation), the
     function would come first and be followed by the argument
     in parentheses, like this: :math:`f(x)`. In the lambda calculus,
     the parentheses are not optional around function
     calls. Furthermore, the grammar above makes it clear that they
     cannot be used anywhere else.


The grammar above is quite concise, since it contains only two
non-terminals. Yet it generates an infinite set of expressions that
represent all computable functions! Recall that the expressive power
of BNF grammars comes from recursion, which is present in both the
second and third productions in the grammar  above.

The following slide show demonstrates how to use the grammar above
to build the parse tree for a given lambda expression.

.. inlineav:: parseTree ss
   :long_name: Slide show for how to build a parse tree
   :links: AV/PL/AV/parseTree.css AV/PL/main.css
   :scripts: AV/PL/AV/parseTree.js
   :output: show


**Questions to ponder**

.. index:: 
     BNF grammar; double recursion and ambiguity


Q1. Why does the non-terminal :math:`<var>` not appear on the
left-hand side of any productions in the grammar above? Is the grammar
incomplete?

Q2. How many terminals does this grammar contain? 

Q3. Is this grammar ambiguous, since the third production is doubly recursive?


Practice with Lambda Calculus Syntax
------------------------------------

Test your mastery of the syntax of the lambda calculus with the following
exercise.  To get credit for this randomized exercise, you must solve
it correctly three times in a row.

.. avembed:: Exercises/PL/LambdaCalcSyntax1.html ka
   :long_name: Lambda Calc Syntax 1

More Practice with Lambda Calculus Syntax
-----------------------------------------

Once you can consistently solve the previous problem, try this more
intense exercise, in which you have to analyze four expressions each
time.  To get credit for this randomized exercise, you must solve it
correctly three times in a row.

.. avembed:: Exercises/PL/LambdaCalcSyntax2.html ka
   :long_name: Lambda Calc Syntax 2
