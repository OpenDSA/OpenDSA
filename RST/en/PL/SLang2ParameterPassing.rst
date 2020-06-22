.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
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


Call By Value vs. Call By Reference
-----------------------------------

*Author's Note: All of the visualizations of parameter-passing methods
in this were developed by University of Wisconsin Oshkosh CS major
Cory Sanin.  His work on these has greatly improved the original
version of the module.*

Parameter-passing techniques may be broken down as follows:

-  Eager evaluation (applicative order) techniques.   What these methods have in common is that the arguments passed in for a function's parameters are evaluated before the function is called.

   -  Call-by-value

   -  Call-by-reference

   -  Call-by-copy-restore (also known as value-result or copy-in-copy-out)

-  Lazy evaluation (normal order) techniques.   What these methods have in common is that the evaluation of the arguments passed in for a function's parameters is delayed until the argument is actually used in the execution of the function.

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

To see how call-by-value works, step through a few sample programs
using the slide show generator below.  Once you're confident that you
understand each step, test yourself with the proficiency exercise that
follows.

.. avembed:: AV/PL/paramPassingByVal.html ss

.. .. inlineav:: paramPassingByVal ss
..    :long_name: Parameter Passing By Value
..    :links:
..    :scripts: AV/PL/paramPassingByVal.js
..    :output: show

Test yourself on call-by-value by completing the following proficiency
exercise.

.. avembed:: AV/PL/paramPassingByValPRO.html pe
   :long_name: Pass-by-value Proficiency Exercise


In comparison to call-by-value, call-by-reference is illustrated by
the following slide show generator.  Again step through a few of the
generated slide shows until you're ready for the proficiency exercise
that follows.

.. avembed:: AV/PL/paramPassingByRef.html ss

.. .. inlineav:: paramPassingByRef ss
..    :long_name: Parameter Passing By Reference
..    :links:
..    :scripts: AV/PL/paramPassingByRef.js
..    :output: show

Test yourself on call-by-reference by completing the following proficiency
exercise.

.. avembed:: AV/PL/paramPassingByRefPRO.html pe
   :long_name: Pass-by-reference Proficiency Exercise


Now that you've seen the difference between call-by-value and
call-by-reference, we will end this section with a problem that will help
you review the difference between *call by value* and *call by
reference* in the language C++, where the presence of an ampersand in
front of the parameter's name is used to indicate call-by-reference
semantics. To earn credit for it, you must complete this randomized
problem correctly three times in a row.

.. avembed:: Exercises/PL/CallByValVsRef.html ka
   :long_name: Call By Value Vs Reference


Copy-Restore
------------

In copy-restore parameter passing, the function is still given the
address of the argument, as it was in call-by-reference.  However, the
protocol for this technique dictates that the function make a copy of
the argument before executing the function body.  This copy is then
worked with in the function body.  When the function body has
completed, the protocol for copy-restore dictates that the copy of the
argument be "restored into" the original argument using the address of
the argument, hence potentially modifying that argument.  Note that
although the original argument is modified, the timing of when the
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

As you've done with by-value and by-reference, use the following
slide show generator to step through a few examples of the copy-restore
method and then test yourself by working on the proficiency exercise
that follows.
   
.. avembed:: AV/PL/paramPassingCopyRestore.html ss
   :long_name: Copy Restore Slide Show	     

*Author's Note: In the slide show above, the pointers from r and s
back to the arguments of the function call exist, and should be shown,
as soon as the function is invoked and throughout the execution of the
function call.*

So, as you can tell from the C++ code above, in call-by-copy-restore,
a function parameter corresponds to two values, both a pointer to the
corresponding argument and a copy of the value of the argument. First,
the copy of the argument's value is made. Then, the body of the
function only uses the copy during its execution. Finally, during the
restore phase just before the function returns, the local copy of the
argument (i.e., its final value, once the function's execution has
completed) is copied back into the argument.

Note that, when there are more than one parameter, the restore phase
takes place for each parameter from left to right in the function's
signature. This order is required by the specification of this
parameter-passing mechanism.

Can you think of scenarios in which the left-to-right order of the restore
phase matters?
	       
..     
.. .. inlineav:: paramPassingCopyRestore ss
..    :long_name: Parameter Passing By Copy Restore
..    :links:
..    :scripts: AV/PL/paramPassingCopyRestore.js
..    :output: show

Now, test yourself with a copy-restore proficiency exercise.

.. avembed:: AV/PL/paramPassingCopyRestorePRO.html pe
   :long_name: Copy-restore Proficiency Exercise


   
We've now covered the three parameter-passing methods that use eager
evaluation of function arguments.

Before moving on, make sure that you understand why these three methods
indeed use eager evaluation.

Now, to compare and contrast these three methods, figure out what the
output of the program in the next practice problem would be under
*call by value*, *call by reference*, and *call by
copy-restore*. Doing this will clarify the subtle differences among
these three methods.  To earn credit for the following problem, you
must complete it correctly for the randomized program it generates
three times in a row.

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

1. No evaluation: The literal text of each argument in the macro call is substituted for the corresponding formal parameter everywhere in the macro’s body.

2. No evaluation: The body of the macro's code resulting from Step 1 is textually substituted for the macro call in the caller program.

3. Evaluation: The body of the macro is executed **in the caller’s environment**.  That is, because of the textual substitution of the macro's code in the caller program, the scope of the variables involved is determined on the basis of where the macro is called from rather than where the definition of the macro appears in the program.  You will see this in the second step of the following slide show, where the code resulting from Step 1 and Step 2 above is presented side-by-side with the original code.

.. avembed:: AV/PL/paramPassingMacro.html ss
   :long_name: Macro Slide Show	     


.. .. inlineav:: paramPassingMacro ss
..    :long_name: Parameter Passing By Macro
..    :links:
..    :scripts: AV/PL/paramPassingMacro.js
..    :output: show

Once you have gone through  enough example slide shows to fully understand
the details of each step in macro-style parameter passing, test
yourself with the following proficiency exercise.
   
.. avembed:: AV/PL/paramPassingMacroPRO.html pe
   :long_name: Macro Proficiency Exercise


We conclude this section on macro-expansion parameter passing by
considering the use of macros in C++, where a parameter like *a* or
*b* in the example below must be wrapped in parentheses when it is
actually used in the body of the macro.  Try to determine the output
of the main program in each example.

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

The implementation of macro-expansion suggested by the 3-step process
described previously is to perform a double textual substitution. For
example, the C++ pre-processor performs this double substitution, and
then the compiler processes the resulting code, never seeing the macro
call. Of course, no function call is executed at run-time either.

Because the body of the macro is spliced into
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



The following problem will help you review the differences among *call by
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
macro is executed in the caller's context (i.e., the caller's environment).

In call-by-name, no code is spliced into the caller's code. Instead,
the body of the function is executed in its own context, but the
actual parameters, which are substituted for the formal parameters,
*are* evaluated in the caller's context.

Call-by-name differs from macro expansion in that only the parameters
are evaluated in the caller's context, not the whole body of the
function.  Step through a few slide shows of some call-by-name
examples to study the ramifications of this change.  When you are
confident that you understand the subtleties involved, try the
proficiency exercise that follows.

.. avembed:: AV/PL/paramPassingByName.html ss
   :long_name: By-name Slide Show	     


.. .. inlineav:: paramPassingByName ss
..    :long_name: Parameter Passing By Name
..    :links:
..    :scripts: AV/PL/paramPassingByName.js
..    :output: show

*Author's Note: In the slide show above, the arrows from the
parameters to the arguments are NOT actual pointers but rather a way
to depict the fact that each parameter has a way (which we'll describe
under the name 'thunk' in the next section) to refer back to the
arguments in the caller's environment.*



Now it is time for you to do a proficiency exercise to see how well
you understand call-by-name.  When you do this proficiency exercise,
each assignment statement will require two steps.  In the first step
corresponding to an assignment statement, you will have to compute the
value on the right-hand side and then click the location where that
value will be stored.  In the second step, you will have to click on a
potentially new arrow destination resulting from the computation and
assignment that comprised your answer for the first step.

.. avembed:: AV/PL/paramPassingByNamePRO.html pe
   :long_name: ByName Proficiency Exercise


The following problem will help you review the differences among *call by
copy-restore*, *call by macro*, and *call-by-name*. To earn credit
for it, you must complete this randomized problem correctly three
times in a row.

.. .. avembed:: Exercises/PL/RP31part1.html ka
..    :long_name: CR vs Macro vs Name

.. avembed:: Exercises/PL/CallByCRVsMacroVsName.html ka
   :long_name: ByCR vs ByMacro vs ByName

Comprehensive Review of the Five Methods Studied So Far
-------------------------------------------------------

In the next section, we will examine call-by-name versus call-by-need
in the context of a specific example known as a *lazy
list*.  However, before proceeding, test your comprehensive
understanding of all five techniques studied so far:  *call-by-value*, *call-by-reference*,
*call-by-copy-restore*, *call-by-macro*,
and *call-by-name*. To earn credit for it, you must complete this
randomized problem correctly three times in a row.

.. avembed:: Exercises/PL/CallByAllFive.html ka
   :long_name: ByVal, ByRef, ByCR, ByMacro, ByName

.. .. avembed:: Exercises/PL/RP31part2.html ka
..    :long_name: RP set #31, question #2


.. odsascript:: AV/PL/paramPassingSlideshowFixHeight.js
