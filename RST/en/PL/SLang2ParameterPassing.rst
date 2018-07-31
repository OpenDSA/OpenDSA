.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: David Furcy and Tom Naps

.. odsascript:: Exercises/PL/CallByAllFive.js
.. odsascript:: AV/PL/paramPassingGenerator.js
.. odsascript:: AV/PL/interpreters/version2.00/scripts/absyn.js
.. odsascript:: AV/PL/interpreters/version2.00/scripts/env.js
.. odsascript:: AV/PL/interpreters/version2.00/scripts/grammar.js
.. odsascript:: AV/PL/interpreters/version2.00/scripts/interpreter.js
.. .. odsascript:: DataStructures/PLutils.js


Parameter-Passing Mechanisms
============================

Call By Reference
-----------------

Parameter-passing techniques may be broken down as follows:

-  Eager evaluation (applicative order) techniques

   -  Call-by-value

   -  Call-by-reference

   -  Call-by-copy-restore (also known as value-result, copy-in-copy-out)

-  Lazy evaluation (normal order) techniques

   -  Macro expansion

   -  Call-by-name

   -  Call-by-need

The difference between call-by-value and call-by-reference is
exemplified by the difference between denoted values in our
interpreters for SLang 1 and SLang 2.  That is, in call-by-value, the
argument for a function parameter is a copy of the value of the
argument whereas, in call-by-reference, the function is given the
address of the argument.  Given the address, the function has the
capability of modifying the argument.

Consider the following code:

::

    TODO: print CallByAllFive.expression here


If the parameter passing method call-by-value is used...

.. inlineav:: paramPassingByVal ss
   :long_name: Parameter Passing By Value
   :links:
   :scripts: AV/PL/paramPassingByVal.js
   :output: show

If the parameter passing method call-by-reference is used...

.. inlineav:: paramPassingByRef ss
   :long_name: Parameter Passing By Reference
   :links:
   :scripts: AV/PL/paramPassingByRef.js
   :output: show

This problem will help you review the difference between *call by
value* and *call by reference* in C++, where the presence of an
ampersand in front of the parameter's name is used to indicate
call-by-reference semantics. To earn credit for it, you must complete
this randomized problem correctly three times in a row.

.. avembed:: Exercises/PL/CallByValVsRef.html ka
   :long_name: Call By Value Vs Reference


Copy-Restore
------------

In copy-restore parameter passing, the function is still given the
address of the argument, as it was in call-by-reference.  However, the
protocol for this techniques dictates that the function make a copy of
the parameter before executing the function body.  This copy is then
worked with in the function body.  When the function body has
completed, the protocol for copy-restore dictates that copy of the
parameter be "copied into" the original parameter using the address of
the parameter, hence potentially modifying that parameter.  Note that
although the original parameter is modified, the timing of when the
modification occurs is slightly different from what it was under
call-by-reference semantics.  In the *Ada* programming language, the
programmer could choose to use copy-restore semantics by designating a
parameter as an *in-out* parameter.  Although C++ does not offer
copy-restore as a parameter-passing technique, we can simulate it in
the following C++ code.

::

    #include <iostream>
    using namespace std;

    void by_value(int a, int b) {
      a = b;
      b = 6;
    }
    void by_reference(int &a, int &b) {
      a = b;
      b = 6;
    }
    void by_copy_restore(int &a, int &b) {
      int copya, copyb;
      copya = a;       // copy-in phase
      copyb = b;
      copya = copyb;   // function proper
      copyb = 6;
      a = copya;       // copy-out phase
      b = copyb;
    }
    int main() {
      int x,y;
      x = 4; y = 5;
      by_value(x, y);
      cout << "Call-by-value semantics: " << x << " " << y << endl;
      x = 4; y = 5;
      by_reference(x, y);
      cout << "Call-by-reference semantics: " << x << " " << y << endl;
      x = 4; y = 5;
      by_copy_restore(x, y);
      cout << "Call-by-copy-restore semantics: " << x << " " << y << endl;
    }

.. inlineav:: paramPassingCopyRestore ss
   :long_name: Parameter Passing By Copy Restore
   :links:
   :scripts: AV/PL/paramPassingCopyRestore.js
   :output: show

Figure out what the output of the preceding program would be before
tackling the next practice problem, which consequently will help you
review the differences among *call by value*, *call by reference*, and
*call by copy-restore*. To earn credit for it, you must complete this
randomized problem correctly three times in a row.

.. avembed:: Exercises/PL/CallByValVsRefVsCR.html ka
   :long_name: Call By Value vs Reference vs CR


Macro Expansion
---------------

Call-by-value, call-by-reference, and call-by-copy-restore all use
**eager** evaluation: The arguments of a function call are evaluated
immediately, that is, even before the body of the function is executed.

The remaining three parameter-passing mechanisms use **lazy** evaluation: The
arguments of a function call are passed without being evaluated to the function.
Then, during the execution of the function’s body, the parameters are
evaluated only when, and as often as, they are needed.

The first lazy-evaluation technique we will discuss is macro-expansion.

Steps involved in macro-expansion are:

1. No evaluation:
    The literal text of each argument in the macro call is substituted
    for the corresponding formal parameter everywhere in the macro’s
    body.

2. No evaluation:
    The body of the macro is substituted for the macro call in the
    caller program.

3. Evaluation
    The body of the macro is executed **in the caller’s environment**.

Let’s look at some examples of macros in C++, where a parameter like
*a* and *b* in the example below must be wrapped in parentheses when
it is actually used in the body of the macro.

::

    #include <iostream>

    using namespace std;

    #define by_macro( a, b )  { (a) = (b); (b) = 6; }  // Note parens around use of parameter

    int main()
    {
      int x,y;

      x = 4; y = 5;
      by_macro(x, y);
      cout << "Call-by-macro semantics: " << x << " " << y << endl;
    }

::

    #include <iostream>

    using namespace std;

    #define by_macro( a, b )  \
             { (a) = (a) + (b); (b) = (a) - (b); (a) = (a) - (b);  }  // Again parens wrap use of param

    int main()
    {
      int x,y;

      cout << "\nNo aliasing" << endl << endl;
      x = 4;  y = 5;
      by_macro(x, y);
      cout << "Call-by-macro semantics: " << x << " " << y << endl;

      int z;
      cout << endl << endl << "With aliasing" << endl << endl;
      z = 4;
      by_macro(z, z);
      cout << "Call-by-macro semantics: " << z << endl;
    }


**Implementation of macro-expansion in C++**

One possible implementation of macro-expansion is to perform a double
textual substitution. For example, the C++
preprocessor performs this double substitution, and then the compiler
processes the resulting code, never seeing the macro call. Of course, no
function call is executed at run-time either.

Because the body of the macro is, at least conceptually, spliced into
the caller’s code after the arguments have been substituted
(without being evaluated) for the parameters, the whole body of the macro is
executed in the caller’s environment.  This allows us to use
macro-expansion to simulate dynamic scoping, as illustrated in the
following code.

::

    #include <iostream>

    using namespace std;

    int n = 6;

    #define dynamic_scoping  { cout << n << endl; }

    void static_scoping()    { cout << n << endl; }

    void test_dynamic() {
      int n = 5;
      cout << "Using dynamic scoping --> ";
      dynamic_scoping;
    }

    void test_static() {
      int n = 5;
      cout << "Using static scoping --> ";
      static_scoping();
    }

    int main() {
      test_dynamic();
      test_static();
    }



This problem will help you review the differences among *call by
reference*, *call by copy-restore*, and *call by macro*. To earn
credit, you must complete this randomized problem correctly
three times in a row.

.. avembed:: Exercises/PL/CallByRefVsCRVsMacro.html ka
   :long_name: Ref vs CR vs Macro

Call By Name
------------

In macro expansion, the body of the macro is spliced into the caller's
code after the actual parameters have been substituted (without being
evaluated) for the formal parameters. Therefore, the whole body of the
macro is executed in the caller's context.

In call by name, no code is spliced into the caller's code. Instead,
the body of the function is executed in its own context, but the
actual parameters, which are substituted for the formal parameters,
*are* evaluated in the caller's context.

Call-by-name differs from macro expansion in that only the parameters
are evaluated in the caller's context, not the whole body of the
function.



This problem will help you review the differences among *call by
copy-restore*, *call by macro*, and *call by name*. To earn credit
for it, you must complete this randomized problem correctly three
times in a row.

.. .. avembed:: Exercises/PL/RP31part1.html ka
..    :long_name: CR vs Macro vs Name

.. avembed:: Exercises/PL/CallByCRVsMacroVsName.html ka
   :long_name: CR vs Macro vs Name

Comprehensive review of the five methods studied so far
-------------------------------------------------------

This problem will help you review the differences among *call by
value*, *call by reference*, *call by copy-restore*, *call by macro*,
and *call by name*. To earn credit for it, you must complete this
randomized problem correctly three times in a row.  In the next
section, we will examine call-by-name versus call-by-need in greater
depth in the context of a specific example known as a *lazy list*.

.. avembed:: Exercises/PL/CallByAllFive.html ka
   :long_name: RP set #31, question #2

.. .. avembed:: Exercises/PL/RP31part2.html ka
..    :long_name: RP set #31, question #2
