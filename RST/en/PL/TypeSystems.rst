.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

==============================
Types in Programming Languages
==============================

Motivating Examples
-------------------

Consider the following code fragments in three different programming languages.

**JavaScript code fragment**

::

    var g = function (x, y) {
            return (x ? 1 : y + 13);
    };
    var add = function (x, y) {
        return x + y;
    };
    var divide = function (x, y) {
        return x / y;
    };
    console.log (g( (2 < 1), 6));
    console.log (g( (2 < 1), "Hello"));
    console.log (g( (2 < 1), [3,2,1]));
    console.log (g( (2 < 1), [3,[2,1]]));
    console.log (add(6,4));
    console.log (add(6,"Green Bay Packers"));
    console.log (add("Aaron", "Rodgers"));
    console.log (divide(6,4));
    console.log (divide(6,"Green Bay Packers"));
    console.log (divide("Aaron", "Rodgers"));

What is JavaScript’s behavior when it is given this program, and what
does that tell us about the way JavaScript handles data of different types?

**Python 3 code fragment**

::

    def mult(x, y):
        return x * y

    print( mult(4,3) )
    print( mult("hello", "goodbye") )

What is Python’s behavior when it is given this program, and what
does that tell us about the way Python handles data of different types?

**Java code fragments**

::

    // foo program
    public class foo {
        static int g (boolean x, int y) {
            return (x ? 1 : y);
        }
        public static void main(String[] args) {
            System.out.println(g( (2 < 1), 6));
        }
    }

    // foobar program
    public class foobar {
        static int g (boolean x, int y) {
            return (x ? 1 : y);
        }
        public static void main(String[] args) {
            System.out.println(g( (2 < 1), "Hello"));
        }
    }

    // foobaz program
    public class foobaz {
        static g (x, y) {
            return (x ? 1 : y);
        }
        public static void main(String[] args) {
            System.out.println(g( (2 < 1), 6));
        }
    }

What is Java’s behavior when it is given these programs, and what
does that tell us about the way Java handles data of different types?

More precisely, which ones of the following statements are true about
the three preceding Java programs?

-  foo compiles successfully.

-  foo runs successfully.

-  foobar compiles successfully.

-  foobar runs successfully.

-  foobaz compiles successfully.

-  foobaz runs successfully.

-  foobaz should compile successfully.

-  foobaz should run successfully.

Type System: Definition
-----------------------

Each programming language has a `type system`_, loosely speaking a set
of rules that assign a *type* to variables, literal values, compound
expressions, function parameters, function calls, etc., and constrain
the way that these constructs can be used based on their types, for
example, whether or not the return value of a function can be
meaningfully assigned to a variable.

.. _type system: https://en.wikipedia.org/wiki/Type_system

A **type** is a category that is assigned to an expression in a
program according to the kinds of values that that expression computes
or may stand for.  And a *type system* is the set of types and typing
rules that each programming language uses to help the programmer
avoid certain kinds of errors called **type errors**, namely situations
where an operation is attempted on a value (or values) for which this
operation does not make sense.

In what sense do modern programming languages typically have an *extensible*
type system? Hint: What types are available in Java?

It is worthwhile considering the more precise definition of a type
system given by Benjamin Pierce in his 2002 book entitled `Types and
Programming Languages`_:

.. _Types and Programming Languages: https://www.cis.upenn.edu/~bcpierce/tapl/


   A **type system** is a tractable syntactic method for proving the absence of
   certain program behaviors [...].


Now what does Pierce mean by:

- *method*
  
  A type system is a tool to reason *about* a programming language.
  
- *syntactic*

  A type system categorizes expressions based on syntax, that is, on
  the structure or arrangement of programming language constructs
  (variables, operators, keywords, etc.). Syntax is thus the basis on
  which the type system computes an approximation of the runtime
  behavior of the expressions and statements in a program based on the
  possible values that these constructs may compute.
  
- *proving*

  A type system aims to *guarantee* that the errors it views as type
  errors will never happen; a well-typed program should never
  misbehave.
  
- *certain program behaviors*

  Bad behaviors are *stuck states* in which an expression does not
  have a value and there are no rules that allow the computation of
  that value to continue (i.e., a runtime error).
  
- *tractable*

  Type checkers are built into compilers, linkers, and runtime
  systems and must do their job automatically with no interaction with
  the programmer; therefore, we need type-checking algorithms that are
  not only tractable in theory but also efficient in practice.

Type System: Static Versus  Dynamic
-----------------------------------

The purpose of a type system is *always* to prevent undesirable
program states, like the stuck states mentioned above.

- In a **static** type system, types are determined and checked
  *before* program execution. This is typically done by a compiler. Type
  errors flagged during static type checking generally prevent a
  program from being executed.

- In a **dynamic** type system, types are determined and checked
  *during* program execution. Types are tracked by attaching to each
  value a tag indicating its type. Type errors in a particular portion
  of code are flagged only when that code actually executes.

Static typing and dynamic typing are actually two very different
approaches to type systems. They are not only handled at different times
but are also implemented very differently.

What are examples of statically-typed programming languages?

What are examples of dynamically-typed programming languages?

Static typing and dynamic typing are so different that experts prefer not to
use the same word for both. They typically reserve the term *typing*
only for use with a static type system.

Pierce, for example, considers that the phrase *type checking* only
applies to statically-typed languages.  In the case of so-called
*dynamic programming languages*, talking of *dynamic typing* is a
misnomer; a more precise description would be *dynamically checked*.

Type System: Safe Versus Unsafe
-------------------------------

A so-called type-safe language *guarantees* that well-typed programs are well
behaved.  In other words, a type system is **safe** (or **sound**)
if it rejects all incorrect programs.
More specifically, a programming language (or, in a more fine-grained
analysis, a programming-language *construct*) is **type-safe**
if it forbids operations that are incorrect for the types on which
they operate.

Since a type system is static, it *must* be **conservative**: it can only
prove the absence of some bad program behaviors;  it cannot prove
their presence.
This is because a *safe* and *decidable* type system is always
**incomplete**, i.e., it *must* sometimes reject programs that behave
well at runtime (why is that the case?).
For example, the code fragment:


.. math::

   \begin{eqnarray*}
        \mbox{if <complex test> then 5 else <type error>}
   \end{eqnarray*}

may be rejected as ill-typed even if the test always evaluates to true.

Furthermore, only some kinds of undesired program behaviors 
can be prevented. Consider:

- checking that the two arguments of a division operation are integers
- checking that the second argument is not equal to 0

Which one(s) of these checks can be performed statically?

Type System: Strong Versus Weak
-------------------------------

When talking about programming languages, you should avoid using the
phrases **strongly typed** and **weakly typed**, since there are no
universally agreed-upon definitions for these terms.

For example, is the programming language C weakly or strongly typed? 

In general, these terms refer to the overall level of type safety
offered by the language. Some programming languages or constructs may
discourage incorrect operations or make them difficult, without
completely forbidding them. So, the more type restrictions are imposed
by the compiler, and the fewer the loopholes that exist to subvert the
type system, the more strongly typed a programming language is.

Watch out! Many software developers confuse the characteristic of
being static/dynamic and the completely distinct characteristic of
being strongly/weakly typed. Again, do **NOT** use the latter.

Type System: Typed Variables or Values
--------------------------------------

In a static type system, types are generally applied to both variables
and values.

In a dynamic type system, types are represented by tags attached to
values. So, generally only values have types in a dynamic type
system.

For example, in the following JavaScript function (already shown above as part
of our motivating examples):

::

  var g = function (x, y) {
          return (x ? 1 : y + 13);
  };

  console.log (g( (2 < 1), 6));
  console.log (g( (2 < 1), "Hello"));

the function parameter *y* is not assigned a unique type by the type
checker. In contrast, the values that are passed in as arguments in
function calls do have a type: 6 is an integer while "Hello" is a
string. This is this type tag that makes the JavaScript runtime system
use integer addition in the first call but string concatenation in the
second call.


Also, in dynamically-checked languages, containers (like lists)
typically do not have types; only their values do. So there is
generally no problem with a list holding values of different
types. For example:

::
   
    var a = [ 1, "2", 3.4, true, [] ];

is well behaved and allowed by JavaScript's type system.

Type System: Explicit Versus Implicit typing
--------------------------------------------

When we specify the type of an entity by explicitly stating it in the
source code, we are doing **explicit typing**.  The typing of variables
and functions in C, C++, and Java is mostly explicit. An explicit
specification of a type is called a **type annotation**.

When types are not specified explicitly (e.g., Python, JavaScript), we
have **implicit typing**.

In dynamically-checked languages, typing is usually mostly
implicit. It is therefore tempting to conflate explicit typing with
static typing. However, the two are NOT the same.

A Haskell or ML compiler performs **type inference** as part of
static type checking, thereby determining/inferring types from the way
entities are used in the source code. ML types are said to be inferred. While
type annotations are most often not required in ML, they are still
allowed (and sometimes needed).

As another example, since 2011, C++ standards have allowed for the increasing
use of type inference in that language.

Conversely, some dynamically checked and implicitly typed programming
languages (e.g., Python, JavaScript) are moving in the direction of
optional type annotations.



The Many Uses of Type Systems
-----------------------------

Type systems are being used for many purposes, including to:

- determine legal values and operations and thus support type safety
- enforce **language safety** (how does this differ from type safety?)
- determine which of multiple possible operations to perform:
  
  e.g., overloading of the + operator
    
- enable abstractions and high-level modularity
- protect the integrity of user-defined abstractions
- document programs
- simplify program  maintenance
- increase efficiency
- etc.

