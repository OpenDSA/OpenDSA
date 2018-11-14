
What about the following code?  Remember to take into account what was
said earlier about scope in JavaScript being defined by the body of a
function and not by an inner set of curly braces::

    var x = 10;
    var f = function(y) { 
               console.log(y);
               if (true) {
                    var x = 20;      // what is the scope of this x?
               }
               console.log(x);
    }
    f(x);    


Inside the body of a JavaScript function, you should never declare a
variable inside any nested block. You should always declare your
variables in the outermost block (that is, the block defining the body of
the function). Furthermore, ALWAYS declare your variables at the
BEGINNING of that body.

In most other languages, it is better to give each variable the smallest
scope possible, by declaring the variable as close as possible to its
uses. Not so in JavaScript, because **JavaScript does not have block
scope** and variable declarations are always *hoisted* to the top of the
function.

In the following code, what is the value returned by the call
*f(2,3)*? What is the value of *x* on line A? What is the value of *x*
on line B?

::

    var f = function (x,y) {

        var g = function (x) {     // what is the scope of g?

                  return x + y;    // line A
        }

        return g(10*x);            // line B
    }


When an expression refers to a variable *x* but there is no declaration of
*x* in the smallest scope containing the expression, how is the use of *x*
bound to a declaration?  The following code illustrates this situation.

::

    var x = 1;
    var f = function () {  return x; }   // the variable x is bound to which declaration of x?
    x = 2;
    var g = function () {
                var x = 20;              // which type of binding does JS use?
                return f();
    }
    x = 3;
    g();       // what is the value returned here with dynamic binding? with static binding?  

With **dynamic binding**, the declaration that binds a use of *x* in
expression :math:`e` is first looked for in the function (say, *f*) that
contains :math:`e`, then, if needed, in the function (say, *g*) that
called *f*, then in the function that called *g*, etc. 

With **static binding**, the use of *x* in expression :math:`e` is bound
to the declaration of *x* that appears in the smallest scope that contains
:math:`e` in the source program, that is, at the time the function was
defined.

Static binding is also called **static scoping** or **lexical
scoping**.

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
        var add1 = function (x)  { return x + 1; }
        return add1;
    }
    var g = f();   // g is now the function that takes in one argument and adds 1 to it
    g(5);          // returns 6
    f()(5);        // same thing

Here, f is a higher-order function,

What happens when a function f returns a local function that refers
to a parameter or a local variable of f as in the following example?

::

    var f = function () {
        var y = 1;
        var addY = function (x)  { return x + y; }
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
One powerful aspect of  is that it allows us to easily build new
functions at run-time as in the following example.

::

    var makeIncrementer = function (x) {
      var incr = function (y)  {return y + x;}
      return incr;
    }
    var incrBy1 = makeIncrementer(1);
    var incrBy5 = makeIncrementer(5);
    incrBy1(10);             // returns 11
    incrBy5(10);             // returns 15

In the previous example, we returned a function from *makeIncrementer*
by first assigning it to a variable that was consequently returned.
However, doing this was unnecessary, and we also could have written *makeIncrementer*
as follows::

    var makeIncrementer = function (x) {
      return function (y) {return y + x;}
    }
    var incrBy1 = makeIncrementer(1);
    var incrBy5 = makeIncrementer(5);
    incrBy1(10);             // returns 11
    incrBy5(10);             // returns 15

The code above represents an example of an **anonymous function**.

This first problem is about higher-order functions and uses closures
and anonymous functions. This problem is randomized. You must solve it
correctly three times in a row.

.. avembed:: Exercises/PL/HigherOrderFuncs1.html ka
   :long_name: Higher Order Function 1

Scope, Closures, Higher-order Functions (2)
-------------------------------------------


This problem is about higher-order functions and scoping rules. It uses
closures and anonymous functions.

.. avembed:: Exercises/PL/HigherOrderFuncs2.html ka
   :long_name: Higher Order Functions 2


Scope, Closures, Higher-order Functions (3)
-------------------------------------------

This problem uses the same code as the previous problem and illustrates
the same topics.

.. avembed:: Exercises/PL/HigherOrderFuncs3.html ka
   :long_name: Higher Order Functions 3

Static vs. Dynamic Binding
--------------------------

This problem uses the same code as the previous two problems but
focuses on the difference between static and dynamic binding rules.

.. avembed:: Exercises/PL/StaticDynamic.html ka
   :long_name: Static vs. Dynamic Binding


	       
