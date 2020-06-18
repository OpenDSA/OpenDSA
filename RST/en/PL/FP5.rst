.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

===================================================================
Scope, Closures, Higher-order Functions, Static vs. Dynamic Binding
===================================================================

.. _scope:
   
Scope, Closures, Higher-order Functions
---------------------------------------

Every **variable** is a memory location. Each variable has a name, by
which you can refer to this location in your program, and a value that
is associated with the location.

In the statement *x = x + 1*, does the leftmost *x* refer to a
location or a value?  Hint: Is the value of *x* equal to the value of
*x + 1*?  Does the rightmost “x” refer to a location or a value? Hint:
Can 1 be added to a location?

Additionally  every variable also has a **scope**, which comprises all of the
sections of the program where the variable is visible. So, when the
variable *x* is in scope, you can refer to it by name. Anywhere else,
using the name *x* is an error (unless there exists another variable
also called *x* that is in scope, as considered below).

In JavaScript, there are only two kinds of scopes: the global scope and
local scopes. A **local scope** is always defined by the body of a
function.  This is different from languages like C and Java, where
scope is defined by a block enclosed in curly braces.  Suppose for
example, the following code is loaded into the read-eval-print loop of
an interpreter like **node**.


.. inlineav:: FP5Code1CON ss
   :long_name: Illustrate Scope
   :links: AV/PL/FP/FP5CON.css
   :scripts: AV/PL/FP/FP5Code1CON.js
   :output: show

In most other languages (including JavaScript based on ECMAScript 2016
and later), it is better to give each variable the smallest scope
possible, by declaring the variable as close as possible to its
uses. Not so in pre-ECMAScript 2016 JavaScript, which
does not have block scope and in which  variable declarations are always
*hoisted* to the top of the function.  Consider how this plays out in
the following example, remembering to take into account what was said
earlier about scope in JavaScript being defined by the body of a
function and not by an inner set of curly braces.

.. inlineav:: FP5Code2CON ss
   :long_name: Illustrate Variable Hoisting
   :links: AV/PL/FP/FP5CON.css
   :scripts: AV/PL/FP/FP5Code2CON.js
   :output: show




..     var x = 10;
..     var f = function(y) { 
..                console.log(y);
..                if (true) {
..                     var x = 20;   
..                }
..                console.log(x);
..     }
..     f(x);    


The prior example illustrates something allowed but considered a bad
practice in JavaScript.  Inside the body of a function, you should
never declare a variable inside any nested block. You should always
declare your variables in the outermost block (that is, the block
defining the body of the function). Furthermore, always declare your
variables at the beginning of that body.


When an expression refers to a variable for which there is no
declaration in the smallest scope containing the expression, how is
the use of that variable bound to a declaration?  The following code illustrates
this situation.

.. inlineav:: FP5Code3CON ss
   :long_name: Illustrate Nested Scopes
   :links: AV/PL/FP/FP5CON.css
   :scripts: AV/PL/FP/FP5Code3CON.js
   :output: show


..     var f = function (x,y) {
..         var g = function (x) {     // what is the scope of g?
..                   return x + y;    // line A
..         }
..         return g(10*x);            // line B
..     }


Here is another example illustrating the nuances of using variables with
the same name at different levels of scope.  Consider what happens
when this code is loaded into a read-eval-print interpreter.

.. inlineav:: FP5Code4CON ss
   :long_name: Illustrate Static vs Dynamic Binding
   :links: AV/PL/FP/FP5CON.css
   :scripts: AV/PL/FP/FP5Code4CON.js
   :output: show

The example above indicates that JavaScript (and most other
functional languages) use **static binding**.  That is, the use of *x*
in expression :math:`e` is bound to the declaration of *x* that
appears in the smallest scope that contains :math:`e` at the time the
function was defined.

Static binding is also called **static scoping** or **lexical
scoping**.
	    
There is a different type of binding called **dynamic binding**, in
which the declaration that binds a use of *x* in expression :math:`e`
is first looked for in the function (say, *f*) that contains
:math:`e`, then, if needed, in the function (say, *g*) that called
*f*, then in the function that called *g*, etc.  Note that, if
JavaScript used dynamic binding, the value returned in the
previous example would have been 20 instead of 3.



..     var x = 1;
..     var f = function () {  return x; }   // the variable x is bound to which declaration of x?
..     x = 2;
..     var g = function () {
..                 var x = 20;              // which type of binding does JS use?
..                 return f();
..     }
..     x = 3;
..     g();       // what is the value returned here with dynamic binding? with static binding?  


We saw that a function can be declared inside another function.
Furthermore, recall that, in functional languages (and in the subset
of JavaScript we are considering), functions are *first-class
values*. This implies that a function, like any other value, can be
the return value of a function call. Hence a function can return the
value of any one of its local variables.  It makes no difference
whether that returned variable is bound to an integer, a boolean, or a
function.  A function that returns another function (or that takes in
a function as an argument) is called a **higher-order function**, as
illustrated in the following example.

::

    var f = function () {
        var add1 = function (x)  { return x + 1; };
        return add1;
    }
    var g = f();   // g is now the function that takes in one argument and adds 1 to it
    g(5);          // returns 6
    f()(5);        // same behavior as for the previous line

Here, f is a higher-order function. However, add1 is not a higher-order function. What about g?

What happens when a function f returns a local function that refers
to a parameter or a local variable of f as in the following example?

::

    var f = function () {
        var y = 1;
        var addY = function (x)  { return x + y; };
        return addY;
    }
    var g = f(); // after f returns, the variable y 
                 // in f is gone from the stack
    g(5);        // but g can still access it!
    f()(5);      // still returns 6

When a local function refers to a variable defined in an enclosing
function, the local function is implemented as a **closure**, that is,
the local function contains not only its own code, but also the
variables its code refers to that were defined in the environment at the
time the local function was created.

So far, we have seen three **distinct and independent** concepts that
are central to functional programming:

-  Functions as first-class values and higher-order functions,

-  Closures, and

-  Static binding.

Since JavaScript implements all of these, it is quite natural and
powerful to use the functional programming paradigm in JavaScript.
One powerful aspect of it is that it allows us to easily build new
functions at run-time as in the following example.  



.. inlineav:: FP5Code5CON ss
   :long_name: Illustrate Closures
   :links: AV/PL/FP/FP5CON.css
   :scripts: AV/PL/FP/FP5Code5CON.js
   :output: show

Once you become comfortable with the notion of functions as
first-class values, you will find the use of **anonymous functions** as
illustrated in the final slide in the above example is a technique
that often enhances the readability of your code.  Why use a "temporary
variable" such as *incr* to store something that could just as well be
returned directly?

This first problem in this section is about higher-order functions and
uses closures and anonymous functions. This problem is randomized. You
must solve it correctly three times in a row.

.. avembed:: Exercises/PL/HigherOrderFuncs1.html ka
   :long_name: Higher Order Function 1

Practice with Higher-order Functions and Anonymous Functions
------------------------------------------------------------


This problem is about higher-order functions and scoping rules. It uses
closures and anonymous functions.

.. avembed:: Exercises/PL/HigherOrderFuncs2.html ka
   :long_name: Higher Order Functions 2


More Practice with Higher-order Functions and Anonymous Functions
-----------------------------------------------------------------

This problem uses the same code as the previous problem and illustrates
the same topics.

.. avembed:: Exercises/PL/HigherOrderFuncs3.html ka
   :long_name: Higher Order Functions 3

Practice with Static vs. Dynamic Binding Rules
----------------------------------------------

This problem uses the same code as the previous two problems but
focuses on the difference between static and dynamic binding rules.

.. avembed:: Exercises/PL/StaticDynamic.html ka
   :long_name: Static vs. Dynamic Binding


	       
