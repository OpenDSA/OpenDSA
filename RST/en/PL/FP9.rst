.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

===============================================================
Functional Programming - Continuations and Continuation Passing
===============================================================

   
Tail recursive functions
------------------------

Consider the two functions below.  Each takes in a list of non-negative
integers and uses recursion to return the product of the numbers in the list. 

::

    var product1 = function(ns) {
        if (fp.isNull(ns)) {
            return 1;
        } else {
            return fp.mul(fp.hd(ns),
                          product1(fp.tl(ns)));
        }
    }

::

    var product2 = function (ns) {
        var helper = function (ns,a) {
              if (fp.isNull(ns))  {
                  return a;
              } else {
                  return helper(fp.tl(ns), 
                                fp.mul(a,fp.hd(ns)));
              }
        };
        return helper(ns,1);
    }

Which version is better and why?
To begin answering that question, we need the following definition.
A **tail call** is a function call performed as the final action in
a function’s body. A function is **tail recursive** if all of the
recursive calls it makes are tail calls.

This first problem is about a recursive function to compute the
greatest common divisor (or :math:`gcd`) of two integers.

.. avembed:: Exercises/PL/TailRecursion.html ka
   :long_name: Tail Recursion

Continuation Passing Style
--------------------------


**Tail-call elimination or optimization** (TCO) automatically removes
tail calls. Two question immediately arise.  Why would we want to do
this?  Assuming we understand why, how could it be done?


To understand "why", we first note that the
product-of-numbers-in-a-list computation should return 0 with no
computation if the input list contains one or more zeros.

With the *product1* function, no computations are performed until the base case is
reached. But what if the last number is the first zero in the input
list? We could save the last recursive call, but we still need to return
0 all the way down, through the (possibly very high) call stack.

With the *product2* function, TCO removes the sequence of recursive calls and thus
allows us to return right away when the first zero is found. However,
since the computations are performed before each recursive call, a lot
of effort may have been wasted before the first zero is detected.

In such cases, we would like to have better control over the flow of
execution of our programs. For example, we would like to return
immediately as soon as a zero is detected, as in *product2*, but, as in
*product1*, we do *not* want to perform any expensive computations until
we know for sure that no zeros are present in the input list.

**Continuations** allow us to make the control flow and execution state of
our programs explicit and thus solve this problem.

A **continuation** is a callback function :math:`k` that represents the
current state of the program’s execution. More precisely, the continuation :math:`k` is a
function of one argument, namely the value that has been computed so
far, that returns the final value of the computation after the rest of
the program has run to completion.

So, at any point in the computation for our product example, the continuation :math:`k`
takes as input the partial product :math:`x` that has been calculated so
far and returns the final product. Of course, the final product is still
computed recursively. So :math:`k` only computes one multiplication and
then calls another continuation to process the rest of the list.

For example, if the input list is *[2,3,4,5,6]*, the continuation after
the 3 has been processed is the function that takes
:math:`x=6=2\times 3` as input, computes the next product (namely,
:math:`x \times 4`) and finally passes this new value as input to the
continuation for the next recursive call.

The resulting code is in the *product3* function appearing below.
When programming in the **continuation-passing style** (CPS), every
function takes an extra parameter, namely a continuation.

::

    var product3 = function (ns) {
        var cps_product = function (ns,k) {
            if (fp.isNull(ns)) {
                return k(1);
            } else {
                return cps_product(fp.tl(ns),
                                   function (x) {
                                       return k(fp.mul(x,fp.hd(ns)));
                                   });
            }
        };
        return cps_product(ns, function (x) { return x; });
    }

To initiate the computation, the CPS helper function is given the
identity function.

Note first that *cps\_product* is tail recursive and can be tail-code
optimized.  Second, *cps\_product* only calls the continuation once
(in the base case). The recursive calls only build up a function to be
called later.  To make sure that no unnecessary computations are
performed when the input list contains a zero, we can define a new and
improved version of the function, which is called *product4* and
appears below.

::

    var product4 = function (ns) {
        var cps_zero = function (ns,k) {
            if (fp.isNull(ns)) {
                return k(1);
            } else  if (fp.isEq(fp.hd(ns),0)) {
                return 0;  // *** the continuation is never invoked! ***
            } else {
                return cps_zero(fp.tl(ns),
                                function (x) {
                                    return k(fp.mul(x,fp.hd(ns)));
                                });
            }
        };
        return cps_zero(ns, function (x) { return x; });
    }

To illustrate one more neat aspect of functions that use continuation
passing style, recall that negative numbers are not allowed in the
input list.  Hence we could view the erroneous appearance of a
negative number in the list as an exception, for which we would want
to immediately throw an error message and abandon the computation of
the product without doing any multiplications.  Using continuation
passing style to handle exceptions in this fashion is illustrated in
the *product5* version of the function below.

::

    var product5 = function (ns) {
        var cps_exception = function (ns,k) {
            if (fp.isNull(ns)) {
                return k(1);
            } else  if (fp.isEq(fp.hd(ns),0)) {
                return 0;
            } else  if (fp.isLT(fp.hd(ns),0)) {
                throw new Error("Negative numbers are not allowed.");
            } else {
                return cps_exception(fp.tl(ns),
                                     function (x) {
                                         return k(fp.mul(x,fp.hd(ns)));
                                     });
            }
        };
        return cps_exception(ns, function (x) { return x; });
    }


This review problem is the first one in a sequence of three problems
that require you to complete the implementation of a recursive
function that uses continuation-passing style programming. This
problem uses the :math:`gcd` function introduced in the first problem
in this set, but you do not need to remember how it was implemented.

.. avembed:: Exercises/PL/ContinuationPassing1.html ka
   :long_name: CPS Style 1

Continuation Passing Style (2)
------------------------------

This review problem is the second one in a sequence of three problems
that require you to complete the implementation of a recursive
function that uses continuation-passing style programming. This
problem uses the :math:`gcd` function introduced in the first problem
in this set, but you do not need to remember how it was implemented.

.. avembed:: Exercises/PL/ContinuationPassing2.html ka
   :long_name: CPS Style 2

Continuation Passing Style (3)
------------------------------

This review problem is the last one in a sequence of three problems
that require you to complete the implementation of a recursive
function that uses continuation-passing style programming. This
problem uses the :math:`gcd` function introduced in the first problem
in this set, but you do not need to remember how it was implemented.

.. avembed:: Exercises/PL/ContinuationPassing3.html ka
   :long_name: CPS Style 3


More CPS Practice
-----------------

This randomized review problem will give you more practice writing
recursive functions in the continuation-passing style. To get credit
for it, you must solve it correctly three times in a row.

.. avembed:: Exercises/PL/ContinuationPassing4.html ka
   :long_name: Randomized CPS practice
