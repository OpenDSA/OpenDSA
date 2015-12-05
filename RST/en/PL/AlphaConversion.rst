.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy, Tom Naps and Taylor Rydahl


.. _alpha-conversion:

================
Alpha-Conversion
================

Alpha-Conversion
----------------
We now turn our attention back to the semantics of the lambda calculus
by focusing on how :ref:`free-and-bound-variables` in lambda
expressions impact their meaning. Let us first consider bound variable
occurrences first.

When a variable occurrence :math:`x` is bound to a binding occurrence,
the meaning of :math:`x` depends on the fact that it appears inside
the body of a function and is the name of its parameter. Therefore,
the value of :math:`x` is completely determined by and will be equal
to whatever argument is passed into the function when it is called. In
other words, when a variable occurrence is bound in a given
expression, its meaning is well defined within this expression. In the
following JavaScript function, for example:

.. code::

   function f(x) {
        return 2 + x - y * x;
   }

the value of :math:`x` is not known until the function is called, but
at run time, say when we run the following program:

.. code::

   f(12);

the meaning of :math:`x` is unambiguous: its value is 12. In contrast,
the meaning of :math:`y` is not well-defined within :code:`f`, because
the occurrence of :math:`y` in the body of :code:`f` is free. This
example illustrates the crucial difference between free and bound
variables in terms of semantics.

Now, the name of a function's parameter is chosen by the programmer to
be short but evocative of the value that it stands for. So, in the
example above, the programmer could have chosen to call the parameter
:code:`time` or :code:`t`, yielding two other versions of this
function:

.. code::

   function f(time) {                                  function f(t) {
        return 2 + time - y * time;                         return 2 + t - y * t;
   }                                                   }

The key point is that all three versions of the function :code:`f`
behave identically. They have the same meaning. A bound variable is
just a placeholder for a value. The name of the placeholder does not
matter as long as it is used consistently throughout the body of the
function. The fact that bound variables can be renamed without
changing the meaning of the function is embodied in the following rule
of the lambda calculus.

   .. index:: alpha-conversion

   :math:`\alpha`-conversion (where :math:`\alpha` is the lowercase
   Greek letter :term:`alpha`) is the process of renaming the parameter
   in a function abstraction. 


For example, consider the identity function:

..  math::
    
    \lambda x.x

We can :math:`\alpha`-convert this function using the variable
:math:`y` to yield the semantically identical function:

..  math::
    
    \lambda y.y

Of course, in this case, we could have :math:`\alpha`-converted
using any other variable, say :math:`z`:

..  math::
    
    \lambda z.z

However, it is important to keep in mind that
:math:`\alpha`-conversion must not change the meaning of the function
it operates on. In particular, all free variables inside the function
must remain free after :math:`\alpha`-conversion. This means that we
are not always allowed to pick just *any* variable when
:math:`\alpha`-converting a lambda abstraction. Consider the following example:

.. math::

   (\lambda x.y\ x)

This expression is a function application in which the constant
function that always returns :math:`y` (a free variable) is called on
:math:`x` (also a free variable). Can we :math:`\alpha`-convert this
expression?  No, because it is a function application. However, we can
:math:`\alpha`-convert its first component, since it is a lambda
abstraction. Let's do so. Which variable can we choose? First, we will
:math:`\alpha`-convert with the variable :math:`z`, yielding:

.. math::

   (\lambda z.y\ x)

This is perfectly acceptable. The meaning has not changed. In both
this version and the original version of the application, the final
value of the application will be :math:`y`, since the function being
called ignores its argument and always returns :math:`y`.

However, if we :math:`\alpha`-convert the lambda abstraction with the
variable :math:`y`, we get:

.. math::

   (\lambda y.y\ x)

This is not acceptable. The meaning has changed. In this version, the
identity function is being applied to and will return :math:`x`,
instead of :math:`y`.  Recall that, in the original application, both
:math:`y` (the body of the function) and :math:`x` (the argument of
the function call) are free variables, which means that their meaning
is not specified in this code fragment but must be provided by the
context, that is, the larger program in which this application is
embedded. In this larger program, :math:`x` and :math:`y` may well be
bound to different values. Therefore, they do not have the same
meaning and cannot be interchanged.

So what went wrong when we :math:`\alpha`-converted the expression
:math:`\lambda x.y` using the variable :math:`y` to yield
:math:`\lambda y.y`? The variable :math:`y` in the body of the
abstraction went from being free to being bound. We say that :math:`y`
underwent :term:`variable capture` or, more simply, that it was
*captured*.

Since variable captures alter the meaning of lambda expressions, we
must avoid them at all costs. Fortunately, this is easy to achieve,
using the following rule:

    When :math:`\alpha`-converting a lambda abstraction, always choose
    a *new* variable, that is, a variable that does not occur in the body
    of the function being :math:`\alpha`-converted.

To practice the process of :math:`\alpha`-conversion,
complete the following exercise.

.. avembed:: Exercises/PL/AlphaConversion.html ka

In conclusion, :math:`\alpha`-conversion simply replaces the name of a
function parameter with a completely new name in order to avoid
variable captures. :math:`\alpha`-conversion will be quite useful to
us in the next section where we describe the main algorithm for
determining the meaning of a lambda calculus program, namely the
process of substitution.
