.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy, Tom Naps and Taylor Rydahl

.. _free-and-bound-variables:

========================
Free and Bound Variables
========================

Free and Bound Variables
------------------------

In the lambda calculus, like in other programming languages, there are
two kinds of variable occurrences: variable declaration and variable
use. In the following JavaScript code fragment, for example:

.. code::

   function (x) {
      return x + y;
   }


there are two occurrences of the variable :math:`x`. The first
occurrence of :math:`x` (between parentheses) is the *declaration* of
the parameter :math:`x`, that is, the place where the variable is
first introduced into the program. In contrast, the second occurrence
of :math:`x` is a *use* of the variable :math:`x` (more precisely,
:math:`x` is being used as an operand for an addition operation). Is
the occurrence of :math:`y` in this program a variable declaration or a
variable use?

Each variable declaration defines a :term:`scope` for that variable,
that is, the section(s) of the program in which this variable is
defined and usable. In the example above, the scope of the variable
:math:`x` is the body of the function. When the use of a variable, say
:math:`x`, appears within the scope of a declaration of :math:`x`, we
say that the former is :term:`bound` to the latter, and the latter is
the :term:`binding occurrence` of the variable. So, in the example
above, the declaration of :math:`x` in parentheses is the binding
occurrence of this variable and the use :math:`x` on the next line is
bound to this binding occurrence. A variable that is not bound is said
to be :term:`free`.  In the example above, the occurrence of :math:`y`
is free in the body of the function, since this function does not
contain any binding occurrence (i.e., declaration) of :math:`y`.

Since there may be several declarations of a variable :math:`x` inside
a given program, there cannot be any ambiguity about which declaration
of the variable each use of it is bound to. This is why each
programming language must define a binding scheme. The lambda
calculus, like JavaScript and most other modern programming languages,
uses static binding (also known as "static scoping" or "lexical
binding"; see <some section in previous chapter>), which means that
each variable use is bound to the variable declaration by the same
name in the smallest lambda abstraction that contains the variable
use.


We are now ready to discuss the concepts of declaration/use of
variables, binding occurrence, free and bound variables, and lexical
scoping in the context of the lambda calculus. Consider the following
example:

.. math::

   \lambda y.(\lambda x.x\ (y\ x))

This lambda expression is a lambda abstraction whose parameter is
:math:`y` and whose body is the application of the identity function
to the expreeions :math:`(y\ x)`. Therefore, the :math:`y` after the
:math:`\lambda` is the binding occurrence of the variable
:math:`y`. The scope of this declaration is :math:`(\lambda x.x\ (y\
x))`, which implies that the rightmost occurrence of :math:`y` is
bound the leftmost binding occurrence. In contrast, the scope of the
binding occurrence of :math:`x` in :math:`\lambda x.x` is just the
second :math:`x` in it (that is, as always, the body of the lambda
abstraction. As result, the third, rightmost occurrence of :math:`x`
in the expression above is free since it is a use of :math:`x` that
does not belong to the scope of any declarations of :math:`x`. 

To summarize this example, going from left to right, the first
occurrence of :math:`x` is its binding occurrence, the second one is
bound to the first one, and the third one is free. This example
illustrates the fact that it is possible for any variable to occur
both free and bound within the same expression. Therefore, it can be
confusing to ask whether a variable is free or bound in a lambda
expression. It is preferrable to ask this question about each
particular *occurrence* of a variable, keeping in mind that a binding
occurrence is never free since its role is to define a new variable.

Exercise 1
----------

The following exercise will be good practice for identifying free
variables in lambda expressions.

.. avembed:: Exercises/PL/freeVarHighlight.html ka

Remember that, since binding occurrences are (by definition) bound, each and
every variable occurrence is either free or bound, but not both.


Exercise 2
----------

The following exercise will help you identify bound variables in lambda
expressions.

.. avembed:: Exercises/PL/boundVarHighlight.html ka


Continued
---------

Throughout this section, we have attempted to be as intuitive and
informal as possible. However, it is possible to define the notions of
free and bound variables systematically. For any precise definition
pertaining to  lambda calculus, we need only consider the three types of
lambda expressions defined in the lambda calculus grammar (see
:ref:`BNF grammar <BNF grammar> <BNF-grammar-for-LC>`).
For example, we say that any variable
:math:`x` occurs :term:`free` in any lambda expression
:math:`E` if and only if:

   1. :math:`E` is a variable and :math:`E` is identical to :math:`x`, or

   2. :math:`E` is of the form :math:`(E_1\ E_2)` and :math:`x` occurs
      free in either :math:`E_1` or :math:`E2` (or both), or

   3. :math:`E` is of the form :math:`\lambda y.E'` where :math:`y` is
      different from :math:`x` and :math:`x` occurs free in :math:`E'`.

Notice that the recursion in cases 2 and 3 above mirrors the recursion
in the lambda calculus grammar. The following table illustrates
all cases of this definition.


.. list-table:: 
   :widths: 1 1 2 8
   :header-rows: 1

   * - :math:`E`
     - Case
     - Does :math:`x` occur free in :math:`E`?
     - Explanation
   * - :math:`x`
     - 1
     - yes, because ...
     - ... :math:`x` appears in (is equal to) :math:`E` and :math:`E`
       does not contain any binding occurrences (no :math:`lambda`).
   * - :math:`y`
     - 1
     - no, because ...
     - ... :math:`x` does not occur in :math:`E` and thus cannot occur free 
       in it.
   * - :math:`(x\ y)`
     - 2
     - yes, because ...
     - ... :math:`x` occurs free in the first component of the function
       application (recursive application of case 1).
   * - :math:`(y\ x)`
     - 2
     - yes, because ...
     - ... :math:`x` occurs free in the second component of the function
       application (recursive application of case 1).
   * - :math:`(y\ z)`
     - 2
     - no, because ...
     - ... :math:`x` occurs free in neither the first nor the second component 
       of the function application (doubly recursive application of case 1).
   * - :math:`\lambda z.x`
     - 3
     - yes, because ...
     - ... :math:`x` is different from :math:`z` (the parameter of the lambda
       abstraction) and :math:`x` occurs free in the body of the lambda 
       abstraction (recursive application of case 1). Note that the body is what
       is left of the lambda abstraction after the binding occurrence (i.e.,
       :math:`\lambda z.` is removed.
   * - :math:`\lambda z.z`
     - 3
     - no, because ...
     - ... :math:`x` is different from :math:`z` (the parameter of the lambda
       abstraction) and :math:`x` does not occur (at all, and thus not free 
       either) in the body of the lambda abstraction.
   * - :math:`\lambda z.\lambda x.x`
     - 3
     - no, because ...
     - ... :math:`x` is different from :math:`z` (the parameter of the lambda
       abstraction) but :math:`x` does not occur free in the body of the lambda 
       abstraction (recursive application of case 3). Note that the body in
       this case is the lambda abstraction :math:`\lambda x.x`.
   * - :math:`\lambda x.y` or :math:`\lambda x.x`
     - 3
     - no, because ...
     - ... :math:`x` is identical to the parameter of the lambda
       abstraction :math:`E`. :math:`x` cannot be free in :math:`E`
       since any free occurrences of :math:`x` in the body of :math:`E`
       would become bound in :math:`E` by the leading binding
       occurrence of :math:`x`.

In conclusion, we should emphasize that the reason we
devoted a whole section to the notions of free and bound variables is
because we will invoke them repeatedly throughout this chapter,
starting in the next section.
