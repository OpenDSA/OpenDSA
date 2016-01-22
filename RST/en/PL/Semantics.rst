.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy, Tom Naps and Taylor Rydahl

.. _semantics-of-the-lambda-calculus:

==================================
 Semantics of the Lambda Calculus
==================================

In the previous section, we covered the entirety of the syntax of the
lambda calculus. The rest of this chapter, including this section,
deals with the semantics of the lambda calculus, that is, the meaning
of lambda expressions, in other words, how they are interpreted and what
their value is. Clearly, the expressive power of the lambda calculus
is outstanding: its tiny syntax will allow us to express a rich set of
computations, in fact, all possible computations (for more on this,
look up the Church-Turing thesis).

Note that all programs in the lambda calculus are expressions, that
is, programs that get evaluated for their value. The lambda calculus
does not contain any statements, that is, commands that get executed
for their side effects, for example, modifying the contents of memory
via assignment statements or sending a string to the standard output
stream via print statements. Therefore, the lambda calculus is a
purely functional language.

Now, we will explain the meaning of the three types of lambda
expressions whose syntax is given in the lambda calculus grammar.
For each type of lambda expressions, we will
describe its meaning using both an English statement and a JavaScript
code fragment.

1.  A *variable* in the lambda calculus (the first production in the
    Lambda Calculus grammar) is a placeholder for another lambda
    expression. In other words, like in all programming languages, a
    variable can be used to refer to some value that may or may not be
    known yet. So variables :math:`x` and :math:`p_1` in the lambda
    calculus can be represented by the variables :code:`x` and
    :code:`p1`, respectively, in JavaScript.

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

2.  A :term:`lambda abstraction` in the lambda calculus (the second
    production in the grammar) is a function definition, that is, an
    expression that defines a function, *not* a function call. Since
    all functions of the lambda calculus are anonymous and only take
    one parameter, all we need to define a function is the name of its
    parameter (that is, the variable following the :math:`\lambda` in
    the second production in the grammar) and its body (a lambda
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
       * - 7
         - :math:`\lambda x.\lambda y.y`
         - the function of :math:`x` that returns the function of :math:`y` that 
           returns :math:`y` (in other words, the function of :math:`x` that 
           returns the identity function)
         - .. code::

              function (x) {
                     return function (y) { return y; };
              }

    Note that example 7 above is the *curried* function of two
    arguments, namely :math:`x` and :math:`y`, that returns its second
    argument.

3.  A *function application* in the lambda calculus (the third
    production in the grammar) is a function call, that is, an
    expression that invokes a function on a single argument. The first
    component in a function application is either a variable (see
    example 8 below) or a more complex lambda expression that will
    eventually evaluate to a function. In examples 9 and 10 below, the
    first component of the function application is a lambda
    abstraction, that is, a function that is being defined and called
    right away. In JavaScript, this type of function application is a
    common idiom sometimes referred to as an :abbr:`IIFE (Immediately
    inviked Function Expression)`.

    .. list-table:: 
       :widths: 1 2 10 7
       :header-rows: 1

       * - Example
         - :math:`\lambda` Expression
         - English Statement of the Semantics
         - JavaScript Implementation
       * - 8
         - :math:`(x\ y)`
         - the invocation of function :math:`x` on argument  :math:`y`
         - .. code::

              x(y)
       * - 9
         - :math:`(\lambda x.x\ y)`
         - the identity function applied to :math:`y`
         - .. code::

              (function (x) { return x; })(y)
       * - 10
         - :math:`(\lambda z.x\ y)`
         - the constant function :math:`x` applied to :math:`y`
         - .. code::

              (function (z) { return x; })(y)
       * - 11
         - :math:`\lambda x.(x\ y)`
         - the function of :math:`x` that returns the value returned when :math:`x` 
           is called on :math:`y`
         - .. code::
  
              function (x) { return x(y); }
       * - 12
         - :math:`(\lambda x.\lambda y.y\ z)`
         - the function from example 7 above applied to
           :math:`z`. Since the curried function of two parameters is
           being called with a single argument, the evaluation of this
           application will return the identity function.
         - .. code::
  
              (function (x) { 
                  return function (y) { return y; };
               })(z)
       * - 13
         - :math:`( (\lambda x.\lambda y.y\ u)\ v)`
         - the function from example 7 above applied to :math:`u` and
           :math:`v`. Since the curried function of two parameters is
           being called with two arguments, the evaluation of this
           application will return the value of the second argument,
           namely :math:`v`.
         - .. code::
  
              (function (x) { 
                  return function (y) { return y; };
               })(u)(v)


   Note that, in example 11 above, the top-level expression is a
   lambda abrsaction whose body is a function application.
