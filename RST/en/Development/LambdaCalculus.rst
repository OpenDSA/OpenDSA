.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Tom Naps and Taylor Rydahl

Lambda Calculus
===============

The lambda calculus is a small language defined by the following BNF
grammar.

.. math::

   \begin{eqnarray*} 
   <\mathrm{LambdaExp}> &::=& <\mathrm{var}>\\
                        &|& \lambda <\mathrm{var}> . <\mathrm{LambdaExp}>\\
                        &|& (<\mathrm{LambdaExp}> <\mathrm{LambdaExp}>)\\
   \end{eqnarray*}

The above BNF grammar tells us that expressions in the lambda calculus come in one of three flavors:

1. A :term:`variable` (the first production).   For example :math:`x`.

  Typically we will use single letters or letters followed by a digit - :math:`x, y, a_1, b, p_2` - to represent variables.

2. A :term:`function abstraction` (the second production). For example   :math:`\lambda x.y`.  Think of this as the "function whose formal   parameter is :math:`x` and whose return value is :math:`y`".   The equivalent in JavaScript would be:

::

  function(x){
    return y;
  }

3. An :term:`application` (the third production). For example
:math:`(y \; z)`.  Think of this as "the application of :math:`y` to
:math:`z`".  This represents a "function call" in the lambda calculus.
In JavaScript, such a function call would appear as ``y(z)``.  The
formal name of an application whose first component is a function
abstraction is a :term:`beta-redex`.  We will soon explain why this
terminology is appropriate in the context of the operations we perform
to "evaluate" expressions in the lambda calculus.

For example, to apply the identity function :math:`\lambda x.x` to the
variable :math:`y`, we would write :math:`(\lambda x.x \; y)`.   In
JavaScript, this would be:

::

  (
  function(x){	
    return x;
  }
  )(y)

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

.. Slideshow for Free/Bound Vars

.. inlineav:: FreeBoundCON ss
   :output: show

Note that it is possible for a variable to occur both free and bound
in the same expression.  Consider :math:`(\lambda x.x \; x)`.  Here
the first occurrence of :math:`x` is the formal parameter of the
function abstraction, the second occurrence is bound to that formal
parameter, and the third occurrence is free.

Before seeing how lambda calculus expressions are evaluated, we need
some practice in identifying free and bound variables.  Try the following two exercises:

.. avembed:: Exercises/Development/LambdaCalcFree.html ka

.. avembed:: Exercises/Development/LambdaCalcBound.html ka

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



The act of doing this substitution is called :term:`beta-reducing` the
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

   
To keep from capturing a free variable in this fashion, we must :term:`alpha-convert` the expression that would cause
the :math:`y` to become bound.  The intuitive justification of alpha-conversion
is that we do not change the function abstraction :math:`\lambda y.(y \; x)` if we choose a different variable, say :math:`w`, to use as the formal
parameter for the function.  That is, as a function definition,
:math:`\lambda w.(w \; x)` is equivalent to :math:`\lambda y.(y \; x)`.   To carry out alpha-conversion on a function abstraction like :math:`\lambda p.b`, we 
simply replace each free occurrence of p (the formal parameter) in b (the "body" of the function) by a new variable symbol not occurring anywhere in the body.    To illustrate this, consider:


.. Slideshow for Alpha Conversion

.. inlineav:: AlphaConversionCON ss
   :output: show

Practice alpha conversion with the following exercise:

.. Exercise for AlphaConversion

.. avembed:: Exercises/Development/AlphaConversionChoice.html ka

You can get some more alpha conversion practice with the following exercise:

.. Exercise for AlphaConversion

.. avembed:: Exercises/Development/AlphaConversionHighlight.html ka

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
fully evaluated, is said to be in :term:`beta-normal` form.  Since this
involves potentially multiple beta reductions, we have a choice for
the order in which the individual beta conversions are performed.

Applicative Order Reduction
---------------------------

The strategy is characterized by first evaluating the beta-redexes
that are inside an application expression.  That is, we only perform
an application when each of the internal beta-redexes has been
beta-reduced and there are no beta-redexes left except the topmost
application.  If there is more than one internal beta-redex to choose
from, we select the leftmost innermost beta-redex first.  Consider:


.. Slideshow for Applicative order

.. inlineav:: BetaAppCON ss
   :output: show

Practice an applicative order reduction in the following exercise:

.. Exercise for Applicative

.. avembed:: Exercises/Development/BetaReductionAppNextStep.html ka

For some more practice, try:

.. Exercise for Applicative

.. avembed:: Exercises/Development/BetaReductionAppHighlight.html ka




Normal Order Reduction
----------------------

This strategy reduces the leftmost outermost beta-redex first before reducing
the beta-redexes inside of it and those that follow it.  While
applicative order proceeds by evaluating the internal beta-redexes and then
applying the function, normal order evaluation proceeds by applying
the function first and then evaluating the internal beta-redexes.  Consider
the following example:


.. Slideshow for Normal Order

.. inlineav:: BetaNormCON ss
   :output: show


Practice a normal order reduction in the following exercise:

.. Exercise for Normal

.. avembed:: Exercises/Development/BetaReductionNormNextStep.html ka

For some more practice, try:

.. Exercise for Applicative

.. avembed:: Exercises/Development/BetaReductionNormHighlight.html ka


As a final test of your proficiency in doing beta reductions, try doing

1. All the steps in a complete applicative order reduction:

.. avembed:: AV/Development/BetaAppPro.html pe

2. All the steps in a complete normal order reduction

.. avembed:: AV/Development/BetaNormPro.html pe

.. odsascript:: AV/Development/FreeBoundCON.js

.. odsascript:: AV/Development/AlphaConversionCON.js

.. odsascript:: AV/Development/BetaAppCON.js

.. odsascript:: AV/Development/BetaNormCON.js
