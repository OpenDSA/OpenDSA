.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps


Recursive Functions
===================

Fixed-points of Functions
-------------------------

In our endeavor to turn the :math:`\lambda` calculus into a "real"
programming language, we saw in the previous section that we could
appropriately define Boolean constants (true, false), conditionals
(if-then-else), logical operators (and, or, not), integers (0, 1, 2,
3, etc.), and arithmetic operators (:math:`+`, :math:`-`, etc.).

However, one thing is missing.  We still need to be able to define
recursive functions (factorial, etc.). But to recur, we need a "name"
by which we can refer to the function we are creating within the
function we are creating. And the :math:`\lambda` calculus does not
give us global names. Instead we only have a variable that represents
the parameter in a function abstraction.  So is there a way out of
this dilemma?  The answer is "yes", and it's called a **fixed point
combinator**.  We begin by defining the notion of a **fixed point**
for a function.

For any function :math:`f` and :math:`x`, if :math:`f(x) = x` then :math:`x` is
called a **fixed point** of the function :math:`f`.

Here are some examples to consider when the functions are functions of real numbers:

#. Can you find one or more fixed points for the function
   :math:`f(t) = t^2`?

#. Can you find one or more fixed points for the function
   :math:`f(t) = 1`?

#. Can you find one or more fixed points for the function
   :math:`f(t) = t+1`?

The Y Fixed-point Combinator
----------------------------

When we are dealing with functions of real numbers such as the examples above, the "algorithm" to
find a fixed point is to solve the equation :math:`f(x) = x`.
If a solution can be found, the function has a fixed point; otherwise it doesn't.

Is there a similar technique to find the fixed point of any
:math:`\lambda`-calculus function?   Consider a function that we call :math:`Y`
for historical reasons.   It is defined as follows:

.. math:: Y = \lambda h.(\lambda x.(h \; (x \; x))\; \lambda x.(h \; (x \; x)))


:math:`Y` will find the *fixed point* of any function F.


That is, for any function F, :math:`(Y \; F)` is a fixed-point of F,
that is, :math:`(F \; (Y \; F)) = (Y \; F)`.  In other words, if we
apply *Y* to *F*, the result is a value that, when given to *F*, will
give us *Y* applied to *F* again.

To see this, note that the substitution needed to :math:`\beta`-reduce :math:`(Y \; F)` leads us to:      

      
.. math:: (Y \; F) = (\lambda h.(\lambda x.(h \; (x \; x)) \; \lambda x.(h \; (x \; x))) \; F) = (\lambda x.(F \;  (x \; x)) \; \lambda x.(F \; (x \; x))) = (F \; (\lambda x.(F \; (x \; x)) \; \lambda x.(F \; (x \;x)))) = (F \; (Y \; F))

Hence *Y* has the remarkable property that, once applied to *any* function *F*, it can keep generating applications of *F* to *(Y F)*.    That is,
	  
.. math:: (Y \; F) = (F \; (Y \; F)) = (F \; (F \; (Y \; F))) = (F \; (F \; (F \; (Y \; F)))) = \; ...
	  
If we use this property and define a function *F* in a way that makes it "almost recursive", *Y* applied to that almost-recursive function will result in the recursive function we want.  In other words, *Y* turns almost-recursive functions into recursive functions.

Using Y to Implement Factorial
------------------------------

To illustrate, let's use the Church numerals, IF-THEN-ELSE, MULT,
ISZERO, and PRED functions that were defined within the
:math:`\lambda` calculus in the previous section to define a new
almost-recursive function:

.. math:: \lambda g. \lambda n.(IF \; (ISZERO \; n) \; THEN \; ONE \; ELSE \; ((MULT \; n) \; (g \; (PRED \; n))))


This new function resembles what we would normally think of as a
recursively defined factorial function *except* it uses a parameter
:math:`g` instead of a globally defined name :math:`g`.  Hence it is a
valid definition in the :math:`\lambda` calculus.  Although valid, it
is also unfortunately not a recursive factorial function.  The amazing
thing, however, is that, if we apply :math:`Y` to this function, that
is:

.. math:: (Y \; \lambda g. \lambda n.(IF \; (ISZERO \; n) \; THEN \; ONE \; ELSE \; ((MULT \; n) \; (g \; (PRED \; n)))))

we get the factorial function.  It may take a while to convince yourself of this.   Try carrying out the :math:`\beta`-reductions that would come into play when evaluating 
	  
.. math:: ((Y \; \lambda g. \lambda n.(IF \; (ISZERO \; n) \; THEN \; ONE \; ELSE \; ((MULT \; n) \; (g \; (PRED \; n))))) \; THREE) 

and you should see how the Church numeral :math:`SIX` is eventually produced.   To get started on this, you may want to abbreviate the :math:`\lambda g` abstraction above as *AFACT*.   Then note that:

.. math:: ((Y \; AFACT) \; THREE) = ((AFACT \; (Y \; AFACT)) \; THREE)

β-reduce the leftmost redex in :math:`((AFACT \; (Y \; AFACT)) \; THREE)`, that is, substitute :math:`(Y \; AFACT)` for the *g* parameter in the definition of *AFACT*, and you will get ... 	  


.. .. math:: (subst((Y \; AFACT), g, \lambda g. \lambda n.(IF \; (ISZERO \; n) \; THEN \; ONE \; ELSE \; ((MULT \; n) \; (g \; (PRED \; n))))) \; THREE) = ( \lambda n.(IF \; (ISZERO \; n) \; THEN \; ONE \; ELSE \; ((MULT \; n) \; ((Y \; AFACT) \; (PRED \; n)))) \;  THREE ) 

.. math::  ( \lambda n.(IF \; (ISZERO \; n) \; THEN \; ONE \; ELSE \; ((MULT \; n) \; ((Y \; AFACT) \; (PRED \; n)))) \;  THREE ) 

Note that :math:`(Y \; AFACT)` is re-introduced inside the *ELSE*.   The combinator property allows us to replace this :math:`(Y \; AFACT)` with :math:`(AFACT \; (Y \; AFACT)`, whence we can again replace the *g* parameter of the *AFACT* abstraction with :math:`(Y \; AFACT)`.   Continue from here and you will eventually reach *SIX* as the value that is returned.

Amazingly, while remaining entirely within the language defined by the Church
Booleans and numerals, we have been able to produce a recursive
version of the factorial function.  This is of great theoretical
importance because it demonstrates that Church's :math:`\lambda` calculus
can harness the full power of recursively defined functions.

Identifying Fixed Point Combinators
-----------------------------------

Although the function :math:`Y` defined above is a famous fixed-point combinator, there are many other fixed-point combinators, that is, functions :math:`Z` with the property that:

.. math:: (F \; (Z \; F)) = (Z \; F)

for all functions :math:`F`.  	  
This section  will give you practice with identifying other fixed-point combinators.

To reduce syntactic clutter in this problem, we will take some
shortcuts in writing :math:`\lambda` expressions. First, we will drop
all but the first :math:`\lambda` and all but the last dot for
(curried) functions with two or more parameters. So, for example, we
will use:

.. math::

         \lambda abcd.E

as an abbreviation for:

.. math::
         \lambda a.\!\lambda b.\!\lambda c.\!\lambda d.E


Second, to cut down on parentheses, we will use :math:`(u\ v\ w\ x\ y\
z)` as an abbreviation for :math:`(((((u\ v)\ w)\ x)\ y)\ z)`. In
essence, we are making function application left-associative. **This
notation is to be used only for the following  practice problem.  Do NOT use it
for any assignments, exams, or other practice problems.**

.. avembed:: Exercises/PL/FixedPointCombinators.html ka
   :long_name: Identifying Fixed Point Combinators
