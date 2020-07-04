.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

======================================
Continuations and Continuation Passing
======================================

   
Tail recursive functions
------------------------

Consider the two functions below.  Each one takes in a list of non-negative
integers and uses recursion to return the product of the numbers in the list. 

::

    var product1 = function (ns) {
        if (fp.isNull(ns)) {
            return 1;
        } else {
            return fp.mul(fp.hd(ns),
                          product1(fp.tl(ns)));
        }
    };

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
    };

Which version is better and why?
To begin answering this question, we need the following definition.
A **tail call** is a function call performed as the final action in
a function’s body. A function is **tail recursive** if all of the
recursive calls it makes are tail calls.  We alluded to the notion of tail
recursion in the `section on the reduce function`_.   Now we will learn more
about it and its advantages.

.. _section on the reduce function: FP7.html

The problem below is about a recursive function to compute the
greatest common divisor (or :math:`gcd`) of two integers.

.. avembed:: Exercises/PL/TailRecursion.html ka
   :long_name: Tail Recursion

Continuation-Passing Style
--------------------------


**Tail-call elimination or optimization** (TCO) automatically removes
tail calls. Two questions immediately arise.  Why would we want to do
this?  Assuming we understand why, how could it be done?


To understand "why", we first note that the
product-of-numbers-in-a-list computation should return 0 with no
computation if the input list contains one or more zeros.

With the *product1* function, no computations are performed until the base case is
reached. But what if the last number is the first zero in the input
list? We could save the last recursive call, but we still need to return
0 all the way back, through the (possibly very high) call stack, doing
an unnecessary multiplication by 0 upon each return.

With the *product2* function, TCO removes the sequence of recursive calls and thus
allows us to return right away when the first zero is found. However,
since the computations are performed before each recursive call, a lot
of effort may have been wasted before the first zero is detected.

In such cases, we would like to have better control over the flow of
execution of our programs. For example, we would like to return
immediately as soon as a zero is detected, as in TCO'ed *product2*, but, as in
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

For example, if the input list is *[2,3,4,5,6]*, the continuation
after the 3 has been processed is the function that takes
:math:`x=6=2\times 3` as input, computes the next product (namely,
:math:`x \times 4`) and finally passes this new value as input to the
continuation for the next recursive call. [Note: In reality, in this case,
the product will be computed in reverse, from the end of the list toward
its head, but that is a detail at this point].

.. The resulting code is in the *product3* function appearing below.
.. When programming in the **continuation-passing style** (CPS), every
.. function takes an extra parameter, namely a continuation.
.. 
.. ::
.. 
..     var product3 = function (ns) {
..         var cps_product = function (ns,k) {
..             if (fp.isNull(ns)) {
..                 return k(1);
..             } else {
..                 return cps_product(fp.tl(ns),
..                                    function (x) {
..                                        return k(fp.mul(x,fp.hd(ns)));
..                                    });
..             }
..         };
..         return cps_product(ns, function (x) { return x; });
..     }
.. 
.. To initiate the computation, the CPS helper function is given the
.. identity function.

To see how the notion of a continuation actually leads to a new
tail-recursive version of the product function, read through the
description of the *product3* function in the following slide show.

.. inlineav:: FP9Code1CON ss
   :long_name: Illustrate Continuation Passing
   :links: AV/PL/FP/FP9CON.css
   :scripts: AV/PL/FP/FP9Code1CON.js
   :output: show

The next slide show offers a recap of the three versions of the
product function that we've seen so far.

.. inlineav:: FP9Code2CON ss
   :long_name: Compare CPS with non-tail recursive and accumulation
   :links: AV/PL/FP/FP9CON.css
   :scripts: AV/PL/FP/FP9Code2CON.js
   :output: show


In addition to providing a technique that guarantees TCO can be
performed, CPS offers a couple of other advantages over
straightforward recursion and the accumulation technique.  First,
suppose we want to make sure that no unnecessary computations are
performed when the input list contains a zero.  We can define a new and
improved version of the function, which is called *product4* and
appears below.

::

    var product4 = function (ns) {
        var cps_zero = function (ns,k) {
            if (fp.isNull(ns)) {
                return k(1);
            } else if (fp.isEq(fp.hd(ns),0)) {
                return 0;  // *** the continuation is never invoked! ***
            } else {
                return cps_zero(fp.tl(ns),
                                function (x) {
                                    return k(fp.mul(x,fp.hd(ns)));
                                });
            }
        };
        return cps_zero(ns, function (x) { return x; });
    };

Note that, although we could add a similar case to return 0 in the
*product1* function, the 0 that we return would be unnecessarily used
in computations multiple times as we unwind from recursion.  We could
also add a similar "return 0" case in *product2*, but potentially many
unnecessary multiplications would have already been performed on the
accumulator argument by the time that zero was encountered.
    
To illustrate one more neat aspect of functions that use
continuation-passing style, recall that negative numbers are not
allowed in the input list.  Hence we could view the erroneous
appearance of a negative number in the list as an exception, for which
we would want to immediately throw an error message and abandon the
computation of the product without doing any multiplications.  Using
continuation-passing style to handle exceptions in this fashion is
illustrated in the *product5* version of the function below.

::

    var product5 = function (ns) {
        var cps_exception = function (ns,k) {
            if (fp.isNull(ns)) {
                return k(1);
            } else if (fp.isEq(fp.hd(ns),0)) {
                return 0;
            } else if (fp.isLT(fp.hd(ns),0)) {
                return "Negative numbers are not allowed.";
            } else {
                return cps_exception(fp.tl(ns),
                                     function (x) {
                                         return k(fp.mul(x,fp.hd(ns)));
                                     });
            }
        };
        return cps_exception(ns, function (x) { return x; });
    };

Adding such an exception-handling case that returns a string would be
impossible in *product1* since that string would have to participate
in all the multiplications that occur as we unwind from recursion.
Although we could add such a case in *product2*, it would defeat one
of the main goals of exception handling, namely to protect the values
of critical variables from "damage" that may have occurred before the
exception was encountered.  Although *product2* is simple enough as to
not have any damaging side effects that could occur prior to an
exception, in more complicated situations the accumulator technique
could not avoid this because it performs computations as we descend
into recursive calls.  In contrast, *product5* has performed absolutely
no computations when the exception is encountered.  Instead all it has
done is to have partially defined the continuation function, which we can
harmlessly decide to not call upon encountering the exception.


Continuation-Passing Style Practice Problem (Part 1)
----------------------------------------------------

The following problem is the first one in a sequence of three problems
that require you to complete the implementation of a recursive
function that uses continuation-passing style programming. This
problem uses the :math:`gcd` function introduced in the first problem
in this set, but you do not need to remember how it was implemented.

.. avembed:: Exercises/PL/ContinuationPassing1.html ka
   :long_name: CPS Style 1

Continuation-Passing Style Practice Problem (Part 2)
----------------------------------------------------

The following problem is the second one in a sequence of three problems
that require you to complete the implementation of a recursive
function that uses continuation-passing style programming. This
problem uses the :math:`gcd` function introduced in the first problem
in this set, but you do not need to remember how it was implemented.

.. avembed:: Exercises/PL/ContinuationPassing2.html ka
   :long_name: CPS Style 2

Continuation-Passing Style Practice Problem (Part 3)
----------------------------------------------------

The following problem is the last one in a sequence of three problems
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
	    


