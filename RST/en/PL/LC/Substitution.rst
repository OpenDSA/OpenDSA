.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy, Tom Naps and Taylor Rydahl


.. odsascript:: AV/PL/interpreters/lambdacalc/version1.4/scripts/grammar.js

.. odsascript:: AV/PL/interpreters/lambdacalc/version1.4/scripts/absyn.js

.. odsascript:: AV/PL/interpreters/lambdacalc/version1.4/scripts/interpreter.js

.. odsascript:: AV/PL/interpreters/lambdacalc/version1.4/scripts/randomExamples.js



=======================
 Substitution Algorithm
=======================

.. avembed:: Exercises/PL/SubstitutionCases.html ka


[This section still needs to be written. The text below is from Taylor/Tom' version]


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


.. odsalink::  AV/PL/main.css


