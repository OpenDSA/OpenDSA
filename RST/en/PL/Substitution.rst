.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :title: The Substitution-Based Model of Evaluation
   :author: David Furcy; Tom Naps; Taylor Rydahl
   :institution: UW-Oshkosh
   :keyword: Lambda Calculus
   :naturallanguage: en
   :programminglanguage: N/A
   :description: Discusses the substitution-based model of evaluation in the lambda calculus.

.. odsalink::  AV/PL/main.css

The Substitution-Based Model of Evaluation
==========================================

.. _substitution-algorithm:

Substitution Algorithm
----------------------

In this section, we continue our investigation of the semantics of the
lambda calculus. Now that we understand the meaning of each one of the
three types of lambda expressions (see
:ref:`semantics-of-the-lambda-calculus`), the meaning of free and
bound variables (see :ref:`free-and-bound-variables`) and how bound
variables can be systematically renamed (see :ref:`alpha-conversion`),
we have all of the tools we need to explain the meaning of function
calls in the lambda calculus. Note that, since functions are the only
entities in the lambda calculus, interpreting a lambda calculus
program boils down to executing function calls.


First, consider how you would execute the following function call in
your head:

.. code::

   f(8)

You would first look up the definition of the function :code:`f`, say:

.. code::

  var f = function (x) { return  2 * x - 5; };


Then you could compute the value of :code:`f(8)` by computing the
value of the body of :code:`f` after substituting :code:`8` for
:code:`x` in it, yielding :code:`2*8 - 5 = 11`. This intuitive
approach to evaluating function calls naturally leads to a
*substitution-based model of interpretation*. In this section, we
discuss a well-known algorithm for performing substitutions in the
lambda calculus. 

Since both the body of a function and the argument of a function call
can be arbitrary lambda expressions, we need an algorithm that can
substitute any lambda expression :math:`a` (the argument) for the
variable :math:`p` (the parameter of the function) in the lambda
expression :math:`b` (the body of the function). In this section, we
forget about the interpretation of :math:`a`, :math:`p` and :math:`b`
as components of a function call. Instead, we describe the algorithm
in general terms, that is, as an algorithm to substitute :math:`a` for
:math:`p` in :math:`b`, which we denote by:

.. math::

   subst(a, p, b)

where :math:`a` and :math:`b` are arbitrary lambda expressions and
:math:`p` is any variable. 

Note that :math:`subst(a, p, b)` means "substitute :math:`a` for
:math:`p` in :math:`b`" or equivalently, "replace :math:`p` by
:math:`a` in :math:`b`". Whichever way you choose to phrase it,
:math:`b` is always the expression inside which we are performing the
substitution, :math:`p` is always the expression that gets taken out
of :math:`b` and :math:`a` is always the expression that gets
inserted into :math:`b`.

Now, back to the substitution algorithm. Since :math:`b` is an
arbitrary lambda expression, looking back at the BNF grammar (see
:ref:`syntax-of-LC`), we see that we must consider three cases for
:math:`b`, namely a variable, a lambda abstraction, or an application
expression. Therefore, our description of the algorithm is broken down
into three numbered cases.

**Case 1:** If :math:`b` is a variable, say :math:`x`, then
:math:`subst(a, p, b)` becomes :math:`subst(a, p,x)`. Recall that
:math:`p` and :math:`x` are generic variables. So we need to
distinguish two subcases. First, if :math:`p` and :math:`x` are the
same variable, say :math:`v`, then :math:`subst(a,p,x)` is really
:math:`subst(a,v,v)`, whose value is :math:`a`, because that is what
we get when we replace :math:`v` by :math:`a`. We call this part of the
algorithm **Case 1a**. Second, if :math:`p` and :math:`x` are two
different variables, then :math:`subst(a,p,x)` is equal to :math:`x`,
because the variable :math:`p` does not occur in :math:`x` and no
substitutions are needed or possible. We call this part of the
algorithm **Case 1b**.


Let's look at two examples of substitutions that belong to
Case 1. First, in :math:`subst(\lambda x.x, u, v)`, :math:`v` is a
variable that is different from :math:`u`. Therefore, this example
matches Case 1b, and the output of the algorithm is :math:`v`. On the
other hand, :math:`subst(\lambda y.(y\ x), u, u)` falls into Case 1a,
since both :math:`p` and :math:`b` are equal to the same variable
:math:`u`. So, the algorithm returns :math:`\lambda y.(y\ x)`.

..
   .. .. inlineav:: substCase1b ss
      :long_name: Slideshow
   .. :links: AV/PL/main.css
      :scripts: AV/PL/AV/substCase1b.js
      :output: show


**Case 2:** When substituting :math:`a` for :math:`p` in
:math:`\lambda x.E`, that is, :math:`subst(a,p,b)` where :math:`b` is
a :math:`\lambda` abstraction (here, :math:`\lambda x.E`), there are three sub-cases to consider:

- **Case 2a:** :math:`p` and :math:`x` are one and the same variable,
  say :math:`v`, then  :math:`subst(a,v,\lambda v.E)` should return
  :math:`\lambda v.E`.  For example, :math:`subst(\lambda z.z, x, \lambda x.x)`
  returns :math:`\lambda x.x`

- **Case 2b:** :math:`p` and :math:`x` are two distinct variables and
  :math:`x` does not occur free in :math:`a`, then :math:`subst(a,p,\lambda x.E)` should
  return :math:`\lambda x.subst(a,p,E)`.  For example, 
  :math:`subst((w \; z), y, \lambda x.y)` returns :math:`\lambda x.(w \; z)`

- **Case 2c:** :math:`p` and :math:`x` are two distinct variables but
  :math:`x` does occur free in :math:`a`, then :math:`\lambda x.E` should be alpha-converted
  so that Case 2b becomes applicable.    
  For example, :math:`subst((w \; x), y, \lambda x.x)` should return
  :math:`\lambda a.a` where :math:`a` is an appropriate variable chosen during the
  alpha-conversion process.

**Case 3:** If :math:`b` is an application expression, say
:math:`(e_1\ e_2)`, where :math:`e_1` and :math:`e_2` are arbitrary
lambda expressions, then the value of :math:`subst(a,p,b)`, really
:math:`subst(a,p,(e_1\ e_2))`, is :math:`(subst(a,p,e_1)\
subst(a,p,e_2))`, that is, the application expression that is obtained
by substituting :math:`a` for :math:`p` recursively in each component
of the original application expression.

As an example, consider :math:`subst(\lambda y.(y\ x), u, (\lambda
v.u\ u))`. Since the expression we are substituting into (i.e., the
third one) is an application expression, the algorithm requires us to
return the application that results from recursively substituting
:math:`\lambda y.(y\ x)` for :math:`u` in both components of this
application, yielding :math:`(\lambda v.\lambda y.(y\ x)\ \lambda y.(y\ x))`.



Identifying Substitution Subcases of Case 1
---------------------------------------------

The following exercise is good practice for identifying which subcase
of case 1 applies at each step of the substitution algorithm. To get credit for
this randomized problem, you must solve it correctly three times in
a row.

.. avembed:: Exercises/PL/SubstitutionCase1.html ka
   :long_name: Identifying Substitution Subcases of Case 1


Identifying Substitution Subcases of Case 2
---------------------------------------------

The following exercise is good practice for identifying which subcase
of case 2 applies at each step of the substitution algorithm. To get credit for
this randomized problem, you must solve it correctly three times in
a row.

.. avembed:: Exercises/PL/SubstitutionCase2.html ka
   :long_name: Identifying Substitution Subcases of Case 2


Identifying Substitution Case 3
-------------------------------

The following exercise is good practice for determining whether or not
case 3 applies at each step of the substitution algorithm. To get
credit for this randomized problem, you must solve it correctly three
times in a row.

.. avembed:: Exercises/PL/SubstitutionCase3.html ka
   :long_name: Identifying Substitution Case 3

	       
Identifying Substitution Cases and Subcases
-------------------------------------------

The following exercise is good practice for identifying which (sub)case
applies at each step of the substitution algorithm. To get credit for
this randomized problem, you must solve it correctly three times in
a row.

.. avembed:: Exercises/PL/Substitution1.html ka
   :long_name: Identifying Substitution Cases and Subcases

Performing the Substitution Algorithm
-------------------------------------

The following exercise will test your ability to complete a full
substitution by applying the algorithm scrupulously. To get credit for
this randomized problem, you must solve it correctly three times in
a row.

.. avembed:: Exercises/PL/Substitution2.html ka
   :long_name: Performing the full substitution algorithm
