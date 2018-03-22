.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps


Variations on how languages think about types
=============================================

Examples in various languages
-----------------------------

-  Is a PL *weakly typed* or *strongly typed*? In the latter, an attempt
   to use an operation on data of the wrong type results in a type error
   (when? – see the next bullet). In the former, such an attempt just
   does whatever the hardware wants to do (is that good or bad?).

-  If strongly typed, the typing dynamic (type error determined at
   run-time) or static (type error determined at compile time)

-  A type-safe language is one that guarantees all type errors will be
   caught dynamically or statically

-  What’s best - weakly typed, dynamic strongly typed, static strongly
   typed?

-  Issues to consider:

   -  How to define a type system in a strongly typed language

   -  Type inferencing

**Consider the following JavaScript program**

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

What is JS’s behavior, when fed this program, and what does that tell us
about JS’s typing capabilities?

**Python behaves differently**

::

    def mult(x, y):
        return x * y

    print mult(4,3)
    print mult("hello", "goodbye")

What does this example tell us about Python’s typing capabilities?

**Consider the following three Java programs**

::

    //foo
    public class foo {
        static int g (boolean x, int y) {
            return (x ? 1 : y);
        }
        public static void main(String[] args) {
            System.out.println(g( (2 < 1), 6));
        }
    }

    //foobar
    public class foobar {
        static int g (boolean x, int y) {
            return (x ? 1 : y);
        }
        public static void main(String[] args) {
            System.out.println(g( (2 < 1), "Hello"));
        }
    }

    //foobaz
    public class foobaz {
        static g (x, y) {
            return (x ? 1 : y);
        }
        public static void main(String[] args) {
            System.out.println(g( (2 < 1), 6));
        }
    }

Which of the following statements are true about the three preceding Java programs?

-  foo compiles successfully

-  foo runs successfully

-  foobar compiles successfully

-  foobar runs successfully

-  foobaz compiles successfully

-  foobaz runs successfully

-  foobaz should compile successfully

-  foobaz should run successfully


Type Environments and Typing Rules Expressed as Post Systems
------------------------------------------------------------

A type environment is simply an environment associating expressions with
data types instead of with values. For example, fill in the following
question marks for a type environment *tenv* assuming your language is
Java: ``{ (true, ???), (1, ???), (3.4, ???) }``

Typing rules are specified relative to a type environment by a
conditional specification known as a *Post system*.

For example, in type environment *tenv*:

::

    type-of E1 is bool
    type-of E2 is T
    type-of E3 is T
    ---------------
    type-of (if E1 then E2 else E3) is T

Does this rule accurately describe JavaScript typing? Java typing?

**Typing in a scaled-down ML**

Since we’re going to discuss typing issues, particularly parametric
polymorphism and type inferencing, in the context of ML, let’s begin by
rigorously providing the syntax for a very small subset of ML. For the
moment, think of it as a statically typed lambda calculus with ints,
real, and bools.

::

    <type> ::= <type-variable>
               | int
               | bool
               | real
               | <type> -> <type>

    <expr> ::= <identifier>
               | fn <identifier> => <expr> 
               | <expr> <expr>                                      {Note: function applications don't have to be parenthesized}
               | if <expr> then <expr> else <expr> 

**Using Post system rules to describe type inferencing in ML**

We’ve already provided a Post system that describes the type of an
if-then-else expression. We now need Post system rules for function
definitions and function applications.

::

    In type environment tenv:
    type-of <identifier> is T1
    type-of <expr> is T2
    ---------------
    type-of (fn <identifier> => <expr>) is T1 -> T2

    In type environment tenv:
    type-of <expr1> is T1 -> T2
    type-of <expr2> is T1
    ---------------
    type-of <expr1> <expr2> is ???

Another example of a Post system rule for mini-ML

::

    In type environment tenv:
    type-of x is bool
    type-of y is int
    -----------------
    type-of (fn x => fn y => if x then 1 else y) is ???

Here are examples of how the ML type-inferencing engine responds for some function definitions.

::
    
   val g = fn x => fn y => if x then 1 else y;
     fn : bool -> int -> int
   val add1 = fn x => x + 1;
     fn : int -> int  
   val add1r = fn x => x + 1.0;
     fn : real -> real
   val double = fn x => x + x;
     fn : int -> int
   val doubler = fn (x:real) => x + x;
     fn : real -> real

**Parametric polymorphism**

To understand what this is, consider the difference between the following
two identity functions *id1* and *id2* in Java.

::

       public static int id1( int a ) {
           return a;
       }

       public static < E > E id2( E a ) {
           return a;
       }

       System.out.println(id1(4));

       System.out.println(id2("Hello"));

**Parametric polymorphism in ML**

In a static strongly-typed type-inferencing interpreter with parametric
polymorphism, such as ML, the type analysis algorithm will always
re-construct the least restrictive type possible for a parameter. That’s
why it has type variables.

To illustrate this, first we’ll get our heads around ML lists:

::

    [true, false, true]                                  {ML will infer this is a bool list}
    [true, false, true, false]                           {ML will infer this is a bool list}
    [1,2,3,4,5]                                          {ML will infer this is a int list}
    ["foo", "bar", "baz"]                                {ML will infer this is a string list}
    [17, "foo"]                                          {ML will infer this is ILLEGAL}
    [ [1,2,3], [4,6], [0,233] ]                          {ML will infer this is a int list list}

The *hd* and *tl* functions in ML are just like their counterparts in
the *fp* module we used. To cons onto a list, use the *::* operator.
For example, *1::[2,3]*

Now for the parametric polymorphic punchline.  Consider how ML reasons about the following functions involving lists.

::

    val rec sumlist = fn lst => if lst = nil
                        then 0
                        else (hd lst) + (sumlist (tl lst));

    val rec lengthlist = fn lst => if lst = nil
                        then 0
                        else 1 + (lengthlist (tl lst));


**More type inferencing in ML** 

Although all ML functions are functions of one argument, that argument
can be what ML calls a *tuple*. Examples of tuples:

::

            (17, "foo")                     int * string
            (12.5, 13.5, 9)                 real * real * int
            (true, false, true)             bool * bool * bool

Hence the following function with one tuple argument acts like a
function of three arguments.

::

    val add3 = fn (x,y,z) => x + y + z;

And ML’s type inferencer will tell us this is a

::

       add3 = fn : int * int * int -> int 

**Time for you to play the role of ML’s type inferencer**

Here are three expressions, each of them a function definition, that are
typed into ML.

::

    val x = fn y => if true then 1 else 0;
    val x = fn (f, g, h) => if f (g = h) then h else 5;
    val x = fn (f, g, h) => if g f then h f else f;
    val x = fn f => fn g => fn h => if g f then h f else f;

Match each of them with responses that ML provided as the types of the
functions.

::

    fn : 'a * ('a -> bool) * ('a -> 'a) -> 'a
    fn : (bool -> bool) -> int -> int -> int
    fn : 'a * ('a -> 'a) * ('a -> bool) -> 'a
    fn : (bool -> bool) * int * int -> int
    fn : 'a -> ('a -> bool) -> ('a -> 'a) -> 'a
    fn : 'a -> int

**One more type inference example**

::

    val rec map = fn (f,lst) => if lst = nil
                            then []
                            else (f (hd lst))::(map (f, (tl lst)));

What does ML infer about this function?

Type Inferencing Problem 1
--------------------------

Below you see six expressions numbered 1 through 6. Each of them is a function definition that I've typed into ML.

**SIX ML FUNCTION DEFINITIONS**
::

    1  val x = fn (f, g, h) => if g < h then f else if g <= f then h else 5.5;
    2  val x = fn f => fn g => fn h => if g < h then f else if g <= f then h else 5.5;
    3  val x = fn f => fn g => fn h => if f g then f else if g > 4.5 then h else f;
    4  val x = fn (f, g, h) => if f g then f else if g > 4.5 then h else f;
    5  val x = fn (f, g, h) => if g f then f h else (h + 3);
    6  val x = fn f => fn g => fn h => if g f then f h else (h + 3);

Next you see the six type-inferencing responses that ML provided when the above
expressions were entered.  Unfortunately they've become scrambled, and
I've lost track of which response goes with which function definition.
In the six practice problems that follow, you will help me
re-establish that order.

**ML'S TYPE INFERENCE RESPONSES (SCRAMBLED)**
::
   
    1  fn : (real -> bool) -> real -> (real -> bool) -> real -> bool 
    2  fn : (int -> int) * ((int -> int) -> bool) * int -> int 
    3  fn : (real -> bool) * real * (real -> bool) -> real -> bool 
    4  fn : real * real * real -> real 
    5  fn : (int -> int) -> ((int -> int) -> bool) -> int -> int 
    6  fn : real -> real -> real -> real 


These definitions are to be used in each of the following six practice problems.

.. avembed:: Exercises/PL/Typing1.html ka
   :long_name: ML type inferencing 1


Type Inferencing Problem 2
--------------------------

.. avembed:: Exercises/PL/Typing2.html ka
   :long_name: ML type inferencing 2

Type Inferencing Problem 3
--------------------------

.. avembed:: Exercises/PL/Typing3.html ka
   :long_name: ML type inferencing 3

Type Inferencing Problem 4
--------------------------

.. avembed:: Exercises/PL/Typing4.html ka
   :long_name: ML type inferencing 4

Type Inferencing Problem 5
--------------------------

.. avembed:: Exercises/PL/Typing5.html ka
   :long_name: ML type inferencing 5

Type Inferencing Problem 6
--------------------------

.. avembed:: Exercises/PL/Typing6.html ka
   :long_name: ML type inferencing 6


.. Practice With Infinite Sequences
.. --------------------------------
.. 
.. This problem will help you write recursive code to process infinite
.. sequences. To earn credit for it, you must complete this randomized
.. problem correctly three times in a row.
.. 
.. .. avembed:: Exercises/PL/InfSeq2.html ka
..    :long_name: RP set #32, question #2
.. 
