.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps


Recursive Functions
===================

The Y Fixed-point Combinator
----------------------------

To turn the :math:`\lambda` calculus into a "real" programming
language, we need to be able to manipulate, we saw in the previous
section that we could appropriately define boolean constants (true,
false), conditionals (if-then-else), logical operators (and, or, not),
integers (0, 1, 2, 3, etc.), and arithmetic operators (:math:`+`,
:math:`-`, etc.).

However, one thing is missing.  We still need to be able to define
recursive functions (factorial, etc.). But to recur, we need a "name"
by which we can refer to the function we are creating within the
function we are creating. And the :math:`\lambda` calculus does not
give us global names. Instead we only have a variable that represents
the parameter in a function abstraction.  So is there a way out of
this dilemma?  The answer is "yes", and it's called a **fixed point
combinator**.   

For any :math:`f` and :math:`x`, if :math:`f(x) = x` then :math:`x` is
called a **fixed point** of the function :math:`f`.

Examples to consider when the functions are functions of real numbers:

#. Can you find one or more fixed points for the function
   :math:`f(t) = t^2`?

#. Can you find one or more fixed points for the function
   :math:`f(t) = 1`?

#. Can you find one or more fixed points for the function
   :math:`f(t) = t+1`?


When we are dealing with functions of real numbers, the "algorithm" to
find a fixed point to solve the equation :math:`f(x) = x`.
If a solution can be found, the function has a fixed point; otherwise it doesn't.
fixed point of any numerical function?

Is there a similar technique to find the fixed point of any
:math:`\lambda` calculus function?   Consider a function that we call :math:`Y`
for historical reasons.   It is defined as follows:

.. math:: Y = \lambda h.(\lambda x.(h \; (x \; x)) \lambda x.(h \; (x \; x)))


:math:`Y` will find the *fixed point* of any function F. That is, for any
function F, :math:`(F \; (Y \; F)) = (Y \; F)`.   To see this, note that the substitution dictated by
:math:`\beta` reduction leads us to:      


.. math:: (Y \; F) = (\lambda h.(\lambda x.(h \; (x \; x)) \; \lambda x.(h \; (x \; x))) \; F) = (\lambda x.(F \;  (x \; x)) \; \lambda x.(F \; (x \; x))) = (F \; (\lambda x.(F \; (x \; x)) \; \lambda x.(F \; (x \;x)))) = (F \; (Y \; F))

Now using the IF-THEN-ELSE, MULT, ISZERO, and PRED functions that were defined within the :math:`\lambda` calculus in the previous section, we can define a new function:

.. math:: \lambda g. \lambda n.(IF \; (ISZERO \; n) \; THEN \; 1 \; ELSE \; (MULT \; n \; (g \; (PRED \; n))))


This new function resembles what we would normally think of as a
recursively defined factorial function *except* it uses a parameter
:math:`g` instead of a globally defined name :math:`g`.  Hence it is a
valid definition in the :math:`\lambda` calculus.  Although valid, it
is also unfortunately not a recursive factorial function.  The amazing thing, however, is that, if we apply :math:`Y` to this function, that is:

.. math:: (Y \; \lambda g. \lambda n.(IF \; (ISZERO \; n) \; THEN \; 1 \; ELSE \; (MULT \; n \; (g \; (PRED \; n)))))

we get the factorial function.  It may take awhile to convince yourself of this.   Try carrying out the :math:`\beta` reductions that would come into play when
	  
.. math:: ((Y \; \lambda g. \lambda n.(IF \; (ISZERO \; n) \; THEN \; 1 \; ELSE \; (MULT \; n \; (g \; (PRED \; n))))) \; THREE) 

is evaluated, and you should see how the Church numeral :math:`SIX` is eventually produced.

Identifying Fixed Point Combinators
-----------------------------------

Although the function :math:`Y` defined above is a famous fixed-point combinator, there are also many other fixed-point combinators, that is, functions :math:`Z` with the property that:

.. math:: (F \; (Z \; F)) = (Z \; F)

for all functions :math:`F`.  	  
This problem will give you practice with identifying other fixed-point combinators.

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
notation is to be used only for this review problem.  Do NOT use it
for any assignments, exams, or other review problems.**

.. avembed:: Exercises/PL/FixedPointCombinators.html ka
   :long_name: Identifying Fixed Point Combinators
