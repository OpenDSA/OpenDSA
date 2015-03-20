.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy, Tom Naps and Taylor Rydahl



.. index:: ! lambda calculus, Alonzo Church, functional programming ; lambda calculus

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

===============================
 Syntax of the Lambda Calculus
===============================

Programs in the lambda calculus are called :dfn:`lambda expressions`
(abbreviated :math:`\lambda exp`), of which there are only three
kinds. In fact, here is a complete BNF grammar for the lambda
calculus:

.. _grammar:

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



This BNF grammar tells us that expressions in the lambda calculus come
in one of three flavors:

  1. A :dfn:`variable` (the first production above). Typically, we
     will use a single letter, with an optional integer subscript, to
     denote a variable. So, :math:`x, y, a_1, p_2` are examples of
     variables.

  2. A :dfn:`function abstraction` (the second production above).
     This type of :math:`\lambda` expressions, also called
     :term:`lambda abstraction`s, corresponds to a function
     definition, which contains two components: the formal parameter
     of the function (there must be exactly one parameter, namely the
     :math:`< var >` non-terminal in the second production above) and
     the body of the function (namely the :math:`<\lambda exp >`
     non-terminal in the same production). So, for example,
     :math:`\lambda x.y` is the function whose formal parameter is
     :math:`x` and whose body is :math:`y`. Note that the non-terminal
     :math:`<var>` after the :math:`\lambda` terminal is *not* the
     name of the function: in fact, all functions in the lambda calculus
     are anonymous.

  3. An :dfn:`application` (the third production above). This type of
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
     function would come first and be followed by the formal parameter
     in parentheses, like this: :math:`f(x)`. In the lambda calculus,
     the parentheses are not optional around function
     calls. Furthermore, the grammar above makes it clear that they
     cannot be used anywhere else.


The grammar above is quite concise, since it contains only two
non-terminals. Yet it generates an infinite set of expressions that
represent all computable functions! Recall that the expressive power
of BNF grammars comes from recursion, which is present in both the
second and third productions in the grammar above.

The following slideshow demonstrates how to use the grammar above
to build the parse tree for a given lambda expression.

.. inlineav:: parseTree ss
   :output: show


**Questions to ponder**

.. index:: 
     BNF grammar; double recursion and ambiguity


Q1. Why does the non-terminal :math:`<var>` not appear on the
left-hand size of any productions in the grammar above? Is the grammar
incomplete?

Q2. How many terminals does this grammar contain? 

Q3. Is this grammar ambiguous, since the third production is doubly recursive?

**Exercises**

Test your mastery of the syntax of the lambda calculus with these two exercises.

.. avembed:: Exercises/PL/SyntaxTF.html ka

.. avembed:: Exercises/PL/SyntaxMC.html ka



==================================
 Semantics of the Lambda Calculus
==================================

In the previous section, we covered the entirety of the syntax of the
lambda calculus. The rest of this chapter, including this section,
deals with the semantics of the lambda calculus, that is, the meaning
of lambda expressions, that is, how they are interpreted and what
their value is. Clearly, the expressive power of the lambda calculus
is outstanding: its tiny syntax will allow us to express a rich set of
computations, in fact, all possible computations (for more on this,
look up the Church-Turing thesis).

Note that all programs in the lambda calculus are expressions, that
is, programs that get evaluated for their value. The lambda calculus
does not contain any statements, that is, commands that get executed
for their side effects (e.g., modifying the contents of memory or
sending a string to the standard output stream). Therefore, the lambda
calculus is a purely functional language.

Now, we will explain the meaning of the three types of lambda
expressions whose syntax is given in the grammar_ above. For each type
of lambda expressions, we will describe its meaning using both an
English statement and a JavaScript code fragment.

1.  A variable in the lambda calculus (the first production in this
    grammar_) is a placeholder for another lambda expression. In other
    words, like in all programming languages, a variable can be used
    to refer to some value that may or may not be known yet. So
    variables :math:`x` and :math:`p_1` in the lambda calculus can be
    represented by the variables :code:`x` and :code:`p1`,
    respectively, in JavaScript. 

    .. list-table:: 
       :widths: 1 2 10 7
       :header-rows: 1

       * - Example
         - :math:`\lambda` Expression
         - English Statement of the Semantics
         - JavaScript Implementation
       * - 1
         - :math:`x`
         - the variable named :math:`x`
         - .. code:: javascript
         
            x

    The main difference between lambda calculus and JavaScript is
    that, in the lambda calculus, each variable can only get bound to
    one value during the execution of the whole program, whereas, in
    JavaScript, the value of a variable cen be changed multiple times
    during execution using assignment statements. In conclusion,
    variables in the lambda calculus are more like named constants
    than variables in imperative programming languages. Furthermore,
    in the lambda calculus, since the only values are functions, all
    variables are placeholders for function values.

2.  A :term:`lambda abstraction` in the lambda calculus (the second production
    in this grammar_) is a function definition, that is, an expression
    that defines a function, *not* a function call. Since all
    functions of the lambda calculus are anonymous and only take one
    parameter, all we need to define a function is the name of its
    parameter (that is, the variable following the :math:`\lambda` in
    the second production in this grammar_) and its body (a lambda
    expression).

    .. list-table:: 
       :widths: 1 2 10 7
       :header-rows: 1

       * - Example
         - :math:`\lambda` Expression
         - English Statement of the Semantics
         - JavaScript Implementation
       * - 2
         - :math:`\lambda x.x`
         - the function of :math:`x` that returns :math:`x` (i.e., the identity function)
         - .. code::

            function (x) { return x; }
       * - 3
         - :math:`\lambda y.y`
         - the function of :math:`y` that returns :math:`y` (i.e., the identity function)
         - .. code::     

            function (y) { return y; }
       * - 4
         - :math:`\lambda x.y`
         - the constant function (of :math:`x`) that returns :math:`y`
         - .. code::

              function (x) { return y; }
       * - 5
         - :math:`\lambda z.y`
         - the same function as above
         - .. code::
 
             function (z) { return y; }
       * - 6
         - :math:`\lambda y.x`
         - the constant function (of :math:`y`) that returns :math:`x`
         - .. code:: javascript

              function (y) { return x; }

3. to be completed to be completed to be completed to be completed to
   be completed to be completed to be completed to be completed to be
   completed to be completed to be completed to be completed to be
   completed

    .. list-table:: 
       :widths: 1 2 10 7
       :header-rows: 1

       * - Example
         - :math:`\lambda` Expression
         - English Statement of the Semantics
         - JavaScript Implementation
       * - 7
         - :math:`(\lambda x.x\ y)`
         - the identity function applied to :math:`y`
         - .. code::

              (function (x) { return x; })(y)
       * - 8
         - :math:`(\lambda z.x\ y)`
         - the constant function :math:`x` applied to :math:`y`
         - .. code::

              (function (z) { return x; })(y)
       * - 9
         - :math:`\lambda x.(x\ y)`
         - the function of :math:`x` that returns the value returned when :math:`x` 
           is called on :math:`y`
         - .. code::
  
              function (x) { return x(y); }
       * - 10
         - :math:`\lambda x.\lambda y.y`
         - the function of :math:`x` that returns the function of :math:`y` that 
           returns :math:`y` (in other words, the function of :math:`x` that 
           returns the identity function)
         - .. code::

              function (x) {
                     return function (y) { return y; };
              }


==========================
 Free and Bound Variables
==========================


==========================
 :math:`\alpha`-Conversion
==========================

=============
 Substitution
=============

========================
 :math:`\beta`-Reduction
========================

====================
Reduction Strategies
====================

Applicative Order
=================


Normal Order
============


===============
Church Numerals
===============

================================
Recursion in the Lambda Calculus
================================


The expression that would apply the identity function to the
application of :math:`a` to :math:`b` would appear as :math:`(\lambda x.x \; (a \; b))`.  Note how essential the parentheses are in this
notation.  Every parenthesis means something very specific, so using 
gratuitous extra parentheses  will inevitably result in a lambda calculus expression with a totally different meaning or an expression  that
violates the BNF grammar.



A variable is :term:`bound` in an expression if it refers to the formal
parameter (the variable immediately following the :math:`\lambda` symbol) in a
function abstraction.  A variable is :term:`free` in an expression if it is
not bound.  In terms of a more precise recursive definition, a
variable :math:`x` occurs free in expression E if:

- E is a variable and E is identical to :math:`x` , or
- E is of the form (E1 E2) and :math:`x` occurs free in E1 or E2, or
- E is of the form :math:`\lambda y.E'` where :math:`y` is different from :math:`x` and :math:`x` occurs free in E'.


To illustrate the difference between free and bound variables.



Note that it is possible for a variable to occur both free and bound
in the same expression.  Consider :math:`(\lambda x.x \; x)`.  Here
the first occurrence of :math:`x` is the formal parameter of the
function abstraction, the second occurrence is bound to that formal
parameter, and the third occurrence is free.

Before seeing how lambda calculus expressions are evaluated, we need
some practice in identifying free and bound variables.  Try the following two exercises:

How should one evaluate a lambda expression?  We first need to realize
that, if by evaluate we mean to "call a function and see what it
returns", then it only makes sense to evaluate a beta-redex, that is,
an application in which the first expression is a function
abstraction.  For instance :math:`(\lambda x.(x \; y) \; z)` is a
beta-redex, but :math:`((x \; y) \; z)` is not.  In the lambda
calculus, we evaluate a beta-redex by substituting the second
component of the application expression for the formal parameter of
the function abstraction in the "body" of the function, that is, in the expression following the dot that occurs in the syntax of the
function abstraction.  For instance, carrying out this substitution in
:math:`(\lambda x.(x \; y) \; z)` would result in :math:`(z \; y)`

It is important to realize this idea of substitution makes sense in terms of the way we think about calling functions in everyday programming.   For example, suppose we had the JavaScript function

::

 var foobar = function(x,y,z) { return  z * (x - y); }

and we called it by:

::

 foobar(8,6,4)

A reasonable way to describe the value returned would be to say "substitute 8 for x, 6 for y, and 4 for z in the expression :math:`z * (x - y)`. 



The act of doing this substitution is called :dfn:`beta-reducing` the
lambda expression.   Hence we now see the rationale for the term
beta-redex that we introduced earlier.   A beta-redex is the one and
only type of lambda expression that can be beta-reduced.

What can go wrong when we do this substitution to carry out a
beta-reduction in the lambda calculus?  By substituting one
variable for another, a variable that was free in an expression may
become bound.  For instance, in the expression :math:`(\lambda
x.\lambda y.(y \; x) \; y)`, the last occurrence of y in this
application is free.  But if we beta-reduce, the result will be
:math:`\lambda y.(y \; y)` and the free y that was substituted for the
formal parameter x is now bound.  This is a result we need to avoid.
To see why consider the following simple example:

:math:`(\lambda x.z \; x)`

Here :math:`\lambda x.z` is the function that always returns
:math:`z`, which here is a free variable.  If we beta-reduce by
substituting the last free occurrence of :math:`x` for :math:`z`, the free :math:`x` is now bound and the function becomes the identity function, which is very different from the function that always returns :math:`z`,

   
To keep from capturing a free variable in this fashion, we must :dfn:`alpha-convert` the expression that would cause
the :math:`y` to become bound.  The intuitive justification of alpha-conversion
is that we do not change the function abstraction :math:`\lambda y.(y \; x)` if we choose a different variable, say :math:`w`, to use as the formal
parameter for the function.  That is, as a function definition,
:math:`\lambda w.(w \; x)` is equivalent to :math:`\lambda y.(y \; x)`.   To carry out alpha-conversion on a function abstraction like :math:`\lambda p.b`, we 
simply replace each free occurrence of p (the formal parameter) in b (the "body" of the function) by a new variable symbol not occurring anywhere in the body.    To illustrate this, consider:


Practice alpha conversion with the following exercise:



You can get some more alpha conversion practice with the following exercise:


The  rule to remember here is that, before substituting in a lambda
expression to carry out a beta-reduction, be sure to check whether
that substitution will capture any free variable, making it become a
bound variable.  If it will, alpha-convert the expression before
beta-reducing it.


.. A fundamental tool in evaluating expressions in the lambda calculus is
.. the notion of substitution.  For the application of a function to its
.. argument, we need merely substitute the argument for the formal
.. parameter in the expression that defines the function, being careful
.. to first alpha convert if doing this would capture a free variable.
.. This is called beta conversion, and 

To fully evaluate a lambda calculus expression, we may have to perform
multiple beta reductions.  This must be done until there are no more
beta-redexes left in the expression.  At that point, the expression,
fully evaluated, is said to be in :dfn:`beta-normal` form.  Since this
involves potentially multiple beta reductions, we have a choice for
the order in which the individual beta conversions are performed.

Applicative Order Reduction
===========================

The strategy is characterized by first evaluating the beta-redexes
that are inside an application expression.  That is, we only perform
an application when each of the internal beta-redexes has been
beta-reduced and there are no beta-redexes left except the topmost
application.  If there is more than one internal beta-redex to choose
from, we select the leftmost innermost beta-redex first.  Consider:



Practice an applicative order reduction in the following exercise:


For some more practice, try:


Normal Order Reduction
======================

This strategy reduces the leftmost outermost beta-redex first before reducing
the beta-redexes inside of it and those that follow it.  While
applicative order proceeds by evaluating the internal beta-redexes and then
applying the function, normal order evaluation proceeds by applying
the function first and then evaluating the internal beta-redexes.  Consider
the following example:


Practice a normal order reduction in the following exercise:

For some more practice, try:


As a final test of your proficiency in doing beta reductions, try doing

1. All the steps in a complete applicative order reduction:

.. avembed:: AV/PL/profexercises/applicativeOrderPro.html pe

2. All the steps in a complete normal order reduction

.. odsascript:: AV/PL/AV/parseTree.js

.. odsascript:: AV/PL/interpreters/lambdacalc/version1.4/scripts/grammar.js

.. odsascript:: AV/PL/interpreters/lambdacalc/version1.4/scripts/absyn.js

.. odsascript:: AV/PL/interpreters/lambdacalc/version1.4/scripts/interpreter.js

.. odsascript:: AV/PL/interpreters/lambdacalc/version1.4/scripts/randomExamples.js

.. odsalink::  AV/PL/AV/parseTree.css

.. odsalink::  AV/PL/main.css


