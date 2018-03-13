.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

Environment-based Model of Evaluation
=====================================

Environment Data Structure
--------------------------

In a pure :math:`\lambda`-calculus interpreter:

When evaluating a function call, the (values of the) arguments are actually
**substituted** for the formal parameters (depending on the reduction
strategy: normal order or applicative order) in the body of the
function.

In our applied :math:`\lambda`-calculus interpreter:

We guarantee that substitution remains a valid way to reason about
function behavior, but we move away from the **substitution model**
for the implementation of the interpreter and adopt an
**environment-based model** of evaluation, in which values are bound
to identifiers (variable names).

Conceptually, an environment is a possibly empty "set" of variable-value
pairs. We’ll represent this set itself and each pair in it as an array.
For example:

::

    E = [ ]    // the empty environment

    E = [ ["y",4], ["x",5], ["f",<sqr_fn>] ]  
               // the environment in which y is bound to 4
               //                          x is bound to 5
               //                          f is bound to the squaring function

In reality, there is more than one environment, since there is more than
one scope. For example, the variable "x" may be bound to the value 5 in
one scope but it may be bound to the squaring function in another scope.

In JavaScript, each function defines its own scope. Since function
definitions can be nested inside other functions, scopes (and thus
environments) may be nested as well. We will represent this hierarchical
structure of the environment using nested arrays.


Determining Values Bound to a Variable
--------------------------------------

This problem provides practice determining to which value a SLang
1 variable is bound. To earn credit for it, you must complete this
randomized problem correctly three times in a row.

.. avembed:: Exercises/PL/Environment1.html ka
   :long_name: Determine values bound to a variable in environment

Evaluation of Expression Within an Environment
----------------------------------------------

This problem provides practice fully evaluating SLang 1 expressions.  To
earn credit for it, you must complete this randomized problem
correctly three times in a row.

.. avembed:: Exercises/PL/Environment2.html ka
   :long_name: Expression Evaluation within Environment


Determining Denoted Values in SLang1
------------------------------------

This problem gives you practice with denoted values in the SLang 1
interpreter. To earn credit for it, you must complete this randomized
problem correctly three times in a row.

.. avembed:: Exercises/PL/Environment3.html ka
   :long_name: Denoted Values in SLang1

