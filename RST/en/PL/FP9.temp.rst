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
