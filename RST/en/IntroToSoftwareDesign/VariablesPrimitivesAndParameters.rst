.. avmetadata::
   :title: Variables, Primitive Types, Parameters, and Logic
   :author: Molly Domino; Stephen Edwards
   :institution: Virginia Tech
   :keyword: variables; primitive types; parameters; return values; boolean logic; constructors
   :naturallanguage: en
   :programminglanguage: Java
   :description: First semester programming course introduction to primitive types, arithmetic expressions, parameters, return values, boolean logic, and subclass constructors.


Variables, Primitive Types, Parameters, and Logic
=================================================

In the previous chapters, you created custom subclasses, controlled execution
with conditional statements and loops, and designed automated unit test cases.
In this chapter, you will learn how to work with Java's fundamental **primitive data types**,
evaluate arithmetic expressions, write methods that take **parameters** and return **values**,
formulate compound boolean expressions with logical operators (``&&``, ``||``, ``!``),
and declare custom **constructors** in subclasses using ``super(...)``.

.. sidebar:: Learning Objectives

    **Estimated Time**: ~98 minutes (~73 min reading + ~25 min video at 100 WPM)

    * **Declare** variables of primitive types and evaluate arithmetic expressions involving integer division and casting.
    * **Implement** methods and constructors accepting formal parameters and returning calculated values.
    * **Formulate** compound boolean expressions using logical operators (``&&``, ``||``, ``!``) with short-circuit evaluation.
    * **Implement** custom subclass constructors that invoke ``super(...)`` with computed arguments.



Variables
---------

One of the most powerful features of a programming language is the ability to
define and manipulate variables. A **variable** is a named location that stores
a value. Values may be numbers, text, images, sounds, and other types of
data. To store a value, you first have to declare a variable.

.. code-block:: java

   int x = 7;

Each variable has a type that determines what kind of values it can store.
This statement is a **declaration**, because it declares that the variable
named ``x`` that is of type ``int``, and gives it an initial value of 7.

Note that ``x`` is an arbitrary name for the variable. In general, you should
use names that indicate what a variable represents--either the value it
holds, or the role it plays. For example, if you saw these
declarations, you could probably guess what values would be stored:

.. code-block:: java

   int ageInYears = 21;
   int studentID = 1234;

This example declares two variables, each of type int. When a variable name
contains more than one word, like ``ageInYears``, it is conventional to
capitalize the first letter of each word except the first, just like we do with
methods. This capitalization convention is called *camel case* (sometimes
written *CamelCase*), where the capital letters form periodic "humps" in the
height of the name. In Java, like the majority of programming languages,
names are case-sensitive, so ``ageInYears`` is not the same as
``ageinyears`` or ``AgeInYears``. Remember that variable names always start
with a lowercase letter, while initial capitals are reserved for class names
and interface names.

You can use any name you want for a variable. But there are about 50 reserved
words, called keywords, that you are not allowed to use as variable names.
These words include ``public``, ``class``, ``static``, ``void``, and ``int``,
which are used by the compiler to analyze the structure of the program.
You can find the `complete list of keywords <http://docs.oracle.com/
javase/tutorial/java/nutsandbolts/_keywords.html>`_ online, but you don’t
have to memorize them. Most programming editors provide “syntax highlighting”,
which makes different parts of the program appear in different colors.


Variable Assignment
~~~~~~~~~~~~~~~~~~~

Now that we have declared variables, we want to use them to store values. We
do that with an assignment statement

.. code-block:: java

   int ageInYears = 29; // 29 is the initial value for ageInYears
   ageInYears = 21;  // set ageInYears to now store 21

This example shows a variable declaration followed by an
assignment statement. In Java, all local variables must be given an
initial value, and we use the same "=" character to show the value
stored in the variable as part of its declaration. However, after
we declare a variable, we can *change* its value any time we need to,
and we do that using an **assignment statement**. Here, we write the
variable by itself, followed by an equal sign (``=``), followed by
the new variable we want the variable to store. An assignment statement
*changes the value stored in the variable*, so that the next time we
use the variable, the corresponding value will be the new one. Remember
that the name "variable" reflects that fact that its value can *change (or
vary) over time* as your program runs, and assignment is how you change
that value.

Programmers may use phrases like "*set* ``ageInYears`` to 21", or
"*assign* 21 to ``ageInYears``", or even "*change* ``ageInYears`` to 21".
The vocabulary
can be confusing here, but the idea is straightforward:

* When you declare a variable, you create a named storage location and
  give it an initial value.

* When you assign to a variable, you update its value, replacing whatever
  value it previously held.

As a general rule, a variable has to have the same type as the value you
assign to it. For example, you cannot store a string in ``ageInYears``, since
it can only hold an integer. We will see some examples that seem to break this
rule, but we’ll get to that later.

Variables must always be initialized (assigned for the first time) when they
are declared, which you write on the same line:

.. code-block:: java

   int ageInYears = 29;


A Note About the = Sign
~~~~~~~~~~~~~~~~~~~~~~~

Lets take a look at the following code example:

.. code-block:: java

   int a = 5;
   int b = 7;
   a = b;

Because Java uses the ``=`` symbol for assignment, it is tempting to interpret
the assignment statement ``a = b`` as a statement of equality. It is not!

Equality is commutative, and assignment is not. For example, in mathematics
if ``a = 7`` then ``7 = a``. In Java ``a = 7;`` is a legal assignment
statement, but ``7 = a;`` is not. This is because an assignment statement **is
an action** that changes the variable on the left by setting its value to
be the value appearing on the right of the ``=`` sign.
As a result, the left side of an assignment statement
has to be a storage location such as a variable.

Also, in mathematics, a statement of equality is true for all time. If a = b
now, a is always equal to b. In Java, an assignment statement can make two
variables equal, but they don’t have to stay that way:

.. code-block:: java

   int a = 5;
   int b = a; //a and b are now equal
   a = 3;     //a and b are no longer equal!

The first line declares variable ``a`` and initializes it with the value 5.
The second line declares variable ``b`` and initializes it with the value of
``a``, which at that point is 5.
The third line changes the value of ``a`` to 3, but it does not change the
value of ``b``, so they are no longer equal.  ``a`` now has a value of 3,
while ``b`` has a value of 5.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/sepAXU0V9jk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Arithmetic Operators
~~~~~~~~~~~~~~~~~~~~

Operators are symbols that represent simple computations. For example, the
addition operator is ``+``, subtraction is ``-``, multiplication is ``*``,
and division is ``/``.

The following program converts a time of day to minutes:

.. code-block:: java

   int hour = 11;
   int minutes = 59;
   int timeAsMinutes = hour * 60 + minutes;

In this program, ``hour * 60 + minutes`` is an **expression** that represents
a single value to be computed.
The operators are ``*`` and ``+``, which represent multiplication and division.
The operators work with are called
**operands** (which is a fancy name for parameters).  When the program runs,
each variable is replaced
by its current value, and then the operators are applied.

So even though you write ``hour * 60 + minutes``, java will compute that as
``11 * 60 + 59`` and assign ``timeAsMinutes`` the value 719. Expressions are
generally a combination of numbers, variables, and operators. When compiled
and executed, they are evaluated to produce a single value.  It is also
important to note that order of operations applies in Java just as it does in
math. ``11 * 60`` will get computed before ``59`` gets added, since
multiplication has higher precedence than addition.

While addition (+), subtraction (-), multiplication (*), and division(/) are
all mathematical operators you can use in programming, Java supports two more
unary operators you may not have seen.  These are ``++`` and ``--``.  These
add or subtract one, and are often used to incrementally increase or decrease
the value stored in a variable as part of a calculation.


A Note About Ints and Division
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Addition, subtraction, and multiplication all do what you expect, but you
might be surprised by division. For example, the following fragment tries to
compute the fraction of an hour that has elapsed:

.. code-block:: java

   int minutes = 59;
   int fractionOfHour = minutes / 60;

``fractionOfHour`` will actually be assigned the value 0 in this situation!
This result often confuses people. The value of ``minutes``` is 59, and 59
divided by 60 should be 0.98333, not 0. Java performs “integer
division” when the operands are integers, as in this case. By design, integer
division always rounds toward zero, even in cases like this one where the next
integer is close. Further, ``fractionOfHour``
is declared to be an ``int`` variable, so it can *only* hold an integer
value anyway, not a decimal fraction.

As an alternative, we can calculate a percentage rather than a fraction:

.. code-block:: java

   int minute = 59;
   int fractionOfHour = (minute * 100) / 60;

Now, ``fractionOfHour`` is assigned to 98.  Again the result is rounded down,
but at least now it’s approximately correct.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/46Ngr6eczpA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


A New Type: Double
~~~~~~~~~~~~~~~~~~

While the examples above all make use of the data type ``int``, we can use
variables to store more than just integer values.

A more general solution for creating an accurate ``fractionOfHour`` variable is
to use a different type of data called a **double** (short for double-precision)
which can represent fractions as well as integers. A **double** value is
actually a digital approximation of a *real number* in the mathematical sense.
You can create ``double``
variables and assign values to them using the same syntax we used for the other
types:

.. code-block:: java

   double pi = 3.14159;

Java performs “floating-point division” when one or more operands are double
values. So we can solve the problem we saw in the previous section:

.. code-block:: java

   double minutes = 59.0;
   double fractionOfHour = minutes / 60;

Now, ``fractionOfHour`` is set to the value 0.9833333333333333.

Although floating-point numbers are useful, they can be a source of confusion.
For example, Java distinguishes the integer value 1 from the floating-point
value 1.0, even though they seem to be the same number. They belong to
different data types, and strictly speaking, you are not allowed to make
assignments between types.

The following is illegal because the variable being declared is an ``int`` and
the initial value on the right is a ``double``:

.. code-block:: java

   int x = 1.1; // compiler error

It is easy to forget this rule because in many cases Java automatically converts
from one type to another:

.. code-block:: java

   double y = 1; // legal, but bad style

The above example should be illegal, but Java allows it by automatically
converting the ``int`` value 1 to the ``double`` value 1.0 automatically. This
leniency is convenient, but it often causes problems for beginners.
For example:

.. code-block:: java

   double y = 1 / 3; // common mistake

You might expect the variable y to get the value 0.333333, which is a legal
value for a double.  But instead it gets the value 0.0. The expression on the
right divides two integers, so Java does integer division, which yields the
``int`` value 0. This ``int`` value is then implicitly converted to ``double``
so it can be used as the initial value of ``y``, so the value assigned to ``y``
is 0.0.


Using Booleans as Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~

When working with conditions in the previous two modules, you may remember
hearing a lot about the boolean values.
Just like ``int`` and ``double``, ``boolean`` is another data type Java
provides. Unlike ``int``\ s or ``double``\ s, a
``boolean`` value can only be ``true`` or ``false``.

We use these when working with while loops or if statements like this:

.. code-block:: java

   if (this.hasFlower())
   {
       this.hop();
   }

In this code, if the jeroo has a flower, it will hop.  ``hasFlower()`` is a
method that will return ``true`` or ``false`` depending on if the jeroo has a
flower.

We could store that boolean value in a variable if we wanted like this:

.. code-block:: java

   boolean pocketIsFull = this.hasFlower();

Here we've declared a boolean variable, named it ``pocketIsFull`` and set it
equal to the result returned by the ``hasFlower()`` method.

If we wanted to, we could then use that variable in our conditional:

.. code-block:: java

   boolean pocketIsFull = this.hasFlower();
   if (pocketIsFull)
   {
       this.hop();
   }

This is another way to write the same if statement!

Additionally, we can assign a ``boolean`` variable to the result of a compound
conditional:

.. code-block:: java

   boolean shouldToss = this.hasFlower() && this.seesNet(AHEAD);
   if (shouldToss)
   {
       this.toss();
   }

Remember above we declared and initialized an ``int`` variable that was the
result of a mathmatical expression.  The same thing will happen here.  Java
will evaluate ``this.hasFlower() && this.seesNet(AHEAD)``, and that compound
expression will produce a value that is either ``true`` or ``false``, then
this value will be used as the initial value of the variable ``shouldToss``.

Finally, if you just need a ``boolean`` value, you can initialize a ``boolean``
variable using the keywords ``true`` or ``false``.

.. code-block:: java

   boolean x = true;
   boolean y = false;



Boolean Operators: AND, OR, NOT & Short-Circuiting
--------------------------------------------------

Conditions come in two forms: *simple* and *compound*. A simple condition is
a ``boolean`` expression that does not contain any other ``boolean``
expression (such as a single sensor method call like ``jeroo.isWater(AHEAD)``).
A **compound condition** is formed by joining two or more simple conditions
using Java logical operators: AND (``&&``), OR (``||``), and NOT (``!``).

Java's Logical Operators
~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: Java Logical Operators
   :widths: 20 40 40
   :header-rows: 1

   * - Operator
     - Meaning
     - Example
   * - ``&&``
     - Logical AND (both conditions must be true)
     - ``isClear(AHEAD) && hasFlower()``
   * - ``||``
     - Logical OR (at least one condition must be true)
     - ``isWater(AHEAD) || seesNet(AHEAD)``
   * - ``!``
     - Logical NOT (inverts truth value)
     - ``!isWater(AHEAD)``

Short-Circuit Evaluation
~~~~~~~~~~~~~~~~~~~~~~~~

Java evaluates compound conditions from left to right using **short-circuit evaluation**:

* For ``&&`` (AND): If the first operand evaluates to ``false``, the entire condition is guaranteed to be ``false``, so Java skips evaluating the second operand.
* For ``||`` (OR): If the first operand evaluates to ``true``, the entire condition is guaranteed to be ``true``, so Java skips evaluating the second operand.

Short-circuit evaluation is essential for preventing errors, such as checking whether a condition is safe before attempting an action.


The Scope of a Local Variable
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Local variables can be very useful tools. You should use a local variable
**whenever you need to refer to the same value more than once**, since a
local variable allows you to give a name to a value, so you can use that
name in more than one place. If you only need a value one time, a name
may not serve much of a purpose.

However, local variables are used for *local* names that are being used
within a single method (or even just a few statements within a method).
Programming languages use the term **scope** to refer to the region of
the program text where a name can be used. For local variables, each variable
declaration appears inside some pair of braces (``{ }``), such as the pair
of braces surrounding the body of a method. This pair of braces forms the
start and end of a block of program statements. The scope of that local variable
is all of the statements between its declaration and the closing brace (``}``)
at the end of the block of statements containing the declaration. The name
will not be recognized outside that block. Most importantly, this means
the variable declaration is not visible (can't be used) in other methods.

.. code-block:: java

   public void doSomeStuff()
   {
       int x = 17;  // declared here
       ...
       if (jeroo.getX() == 17)    // OK to use here, inside scope
       {
           ...
       }

       // scope of x ends at closing brace
   }

   public void doOtherStuff()
   {
      if (x == 17)  // compiler error! x can't be referenced
      {
          ...
      }
   }

In the code shown above, the local variable ``x`` is declared at the start of
method ``doSomeStuff()``, so that variable can be used anywhere inside that
method. However, the scope of ``x`` ends at the end of ``doSomeStuff()``, at
the closing brace that marks the end of the method.

That is why **local variables** are called **local**: they can only be used
in a small, localized region of your program text, only up until the next
closing brace. As a further example:

.. code-block:: java

   public void doSomeStuff()
   {
       ...
       if (jeroo.hasFlower())
       {
           int x = 17;  // declared here
           ...
           if (jeroo.getX() == 17)    // OK to use here, inside scope
           {
               ...
           }

           // scope of x ends at closing brace
       }

       x = 4;  // compiler error! x can't be referenced
   }

Local variables can be declared inside any pair of braces demarking a
series of statements. However, they are always *local* to that block of
statements, and can't be used outside that block. Here, ``x`` is declared
inside the true branch of the first if statement, so ``x`` is local to that
block of statements, and cannot be used outside the pair of braces where it
is declared.

Variables are not visible, and cannot be used, outside of their scope. Their
scope is the region of text where they are visible. In Java, scopes are
typically marked by pairs of braces (``{ }``).


The Return Keyword
------------------

Outside of methods with a return type of ``void``, all other methods you will
write in Java will specify a return type--the type of *answer* or *result*
the method will return. So far, we have primarily used ``void`` methods, which
do not return any result--in fact, ``void`` means "nothing", and we call those
methods for the actions they perform rather than any value they compute.

Methods that compute values for us "return" those values when they are called.
When we say "return a value", we mean "give us an answer" or "produce a result".
Compared to ``void`` methods, methods that return values differ in two ways:

* They declare the type of the return value (the **return type**).
* They use at least one ``return`` statement to provide a *return value**.

For example if you were to write the method:

.. code-block:: java

   public boolean isRaining()
   {
       // no code yet
   }

You would see a syntax error when compiling saying "missing return statement".
That is because the use of ``boolean`` after the keyword ``public``
specifies that this method *will* return a ``boolean`` result, but the
method body doesn't say what value is produced.
To fix this issue, we need to return something.


.. code-block:: java

   public boolean isRaining()
   {
       return false;
   }

The ``return`` statement is how we specify what value is produced by the
method when the method is called. After the keyword ``return``, you can use
any expression you want, including constants (like ``false`` above),
variables, fields, mathematical expressions, or even combinations of
other method calls.

The type of the expression in the ``return`` statement must match the return
type declared for the method. When you declare that the return type
is ``double``, you are making a promise that this method will eventually
produce a ``double`` value. If you try to ``return`` with no expression, or
an expression with the wrong type, the compiler will generate an error.


Doubling Back to Accessor Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Writing an accessor method for a field *needs* to have a return type because
all fields have a type.

.. code-block:: java

   public class Rectangle
   {
       private int length;

       public Rectangle()
       {
           this.length = 4;
       }

       public int getLength()
       {
           return this.length;
       }
   }

In this situation our ``length`` field is of type ``int``, therefore our
accessor method for that field needs to also return an ``int``.


Writing More Complex Methods with Return
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sometimes you may feel the need to write multiple return statements, for
example, one in each branch of a conditional:

.. code-block:: java

   public double absoluteValue(double x)
   {
       if (x < 0)
       {
           return -x;
       }
       else
       {
           return x;
       }
   }

Since these return statements are in a conditional statement, only one will be
executed. As soon as either of them executes, the **method terminates** without
executing any more statements. Of course, this means that other parts of
the method will not be executed after the ``return`` statement is reached.
Further, since a method that returns a value must **always** use a return
statement, no matter how the method ends, that is why you must include a
return statement in each and every branch, not just the first one.

Because of these constraints, some beginners find it easier always to
write a *single* return statement and place it as the very last statement
in the method--this ensures the method always returns a value, and never
accidentally skips any important steps. As you develop your skills, you may
find using multiple return statements easier in some situations, but always
remember they require more care and are subject to more possibilities for
mistakes, so fall back on using a single return statement when you have
trouble:

.. code-block:: java

   public double absoluteValue(double x)
   {
       double answer = x;
       if (x < 0)
       {
           answer = -x;
       }
       return answer;
   }

Here’s an example: ``calculateArea`` takes a double as a parameter and returns
the area of a circle with that radius:

.. code-block:: java

   public double calculateArea(double radius)
   {
      // Note that Math.PI is a constant with the value of pi
      double result = Math.PI * radius * radius;
      return result;
   }

This last line is a return statement.  This statement means, "exit immediately
from this method and use the following expression as the return value." Also,
note the use of the constant ``PI`` from the built-in Java utility class
called ``Math``. The Java ``Math`` class provides many useful and common
math functions, as well as definitions for the constants ``PI`` and ``E``.
In Java, by convention, programmers give constants names that are written
in all capitals, so you can easily distinguish them from variables or fields.

The expression you provide in a ``return`` statement can be arbitrarily
complex, so we could have written this method more concisely:

.. code-block:: java

   public double calculateArea(double radius)
   {
      return Math.PI * radius * radius;
   }

Code that appears after a return statement (in the same block), or any place
else where it can never be executed, is called **dead code**. The compiler will
give you an "unreachable statement" error if part of your code is dead. For
example, this method contains dead code:


.. code-block:: java

   public double absoluteValue(double x)
   {
      if (x < 0)
      {
         return -x;
      }
      else
      {
         return x;
      }
      x = 5;    // can never be executed
    }

That last line, ``x = 5`` would never run as a value would always be returned
from the method (ending the method) before that line could be reached.

If you put return statements inside a conditional statement, you have to
make sure that every possible path through the program reaches a return
statement. The compiler will let you know if that’s not the case. For
example, the following method is incomplete:

.. code-block:: java

   public double absoluteValue(double x)
   {
      if (x < 0)
      {
         return -x;
      }
      else if (x > 0)
      {
         return x;
      }
      // syntax error
   }

When x is 0, neither condition is true, so the method ends without hitting
a return statement. The error message in this case might be something like
“missing return statement”, which is confusing since there are already two of
them. But hopefully you will know what it means.

Again, if you run into difficulties, often an easy answer is to change the
structure of the method so that there is only a single ``return`` statement
at the very end of the method.


Using the Results of a Method
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you invoke a void method, the invocation is usually on a line all by
itself. For example here is a simple hop and pick method for Jeroos.

.. code-block:: java

   public void hopAndPick()
   {
       this.hop();
       this.pick();
   }

And here is how it is called:

.. code-block:: java

   this.hopAndPick();

On the other hand, when you invoke a method with a return type, you have to
do something with the return value. We usually assign it to a variable or
use it as part of an expression.

Take for example this method:

.. code-block:: java

   public int square(int x)
   {
       return x * x;
   }

This method would take in some number ``x``, and return the value of that
number raised to the power of 2.

We could then call the method *and* instantiate a new variable to save the
result:

.. code-block:: java

   int base = 3;
   int raised = square(base);

In this situation, ``raised`` is set to the value 9 (the result of
computing 3 * 3).

Additionally, we can use the result of a method as a parameter for another
method call:

.. code-block:: java

   int base = 3;
   int raisedAgain = square(square(base));

This new variable ``raisedAgain`` will be set equal to 81. The calls to
``square()`` are evaluated "inside out", with the one inside parentheses
performed first. So ``base`` is passed as the argument to ``square()`` in
the first call, which returns 9. The return value 9 of the first call is
used as the parameter value in a second call to ``square()``, which then
returns 9 * 9 = 81.

This might remind you of working with functions in algebra classes.  In those
classes, we might see this same idea written out as:

Assume
f(x) = x * x
What is the value of f(3)?
What is the value of f(f(3))?

Java uses this same principle, though with many different types of data,
things can get a bit more complex.


Constructors in Subclasses & super(...)
---------------------------------------

We know
that when we create a **subclass**
that it **inherits** all of the
methods and attributes from the class that it
**extends**.  If you create a
subclass of ``Jeroo`` called ``PlantingJeroo``, then
any ``PlantingJeroo`` object can perform all of the methods
that any ``Jeroo`` knows--because a ``PlantingJeroo``
is a special kind of ``Jeroo``. The ``PlantingJeroo``
class inherits all of
the methods and attributes from the class ``Jeroo``, and also
understands any new ones you write, such as the
``platRowsOfFour()`` method.  Computer scientists sometimes
call this an **is-a** relationship,
because every ``PlantingJeroo`` object *is a*
``Jeroo`` at the same time--just a Jeroo that can do more.

.. note::
   An **is-a** relationship exists
   between a subclass and its superclass, since every instance of the
   subclass is also an instance of the superclass at the same time.

Also, as we have already read above, a **constructor** is a special
kind of method that is used to initialize a brand new object.  But,
while a subclass automatically inherits all of the (plain) methods
and attributes from its superclass, *it does not inherit
constructors*.  That means that the object instantiation for
Ali in the previous example will not actually compile--*unless we
provide an appropriate constructor* for our
``PlantingJeroo`` subclass.

One reason that subclasses do not automatically inherit constructors
is because subclasses can add new attributes in addition to new methods,
and those attributes *must be initialized*, no matter what.
But any constructor from a superclass won't know anything about the
subclass' new attributes and can't initialize them appropriately.  So
subclasses have to explicitly define every constructor they support,
all the time.

.. note::
   Every time you create a subclass, you are responsible for defining
   *all* of the constructors it supports.  Constructors are not
   inherited from superclasses.


Fortunately, while constructors are not inherited, there is a
simple pattern for defining them.  In our ``PlantingJeroo``,
we can add the following constructor:

.. code-block:: java

   // ----------------------------------------------------------
   /**
    * Create a new Jeroo facing east.
    * @param flowers   The number of flowers the Jeroo is holding.
    */
   public PlantingJeroo(int flowers)
   {
       super(flowers);
   }


While we have not yet covered all of the features in this small
piece of code, the gist is straightforward.  A constructor is
declared like a regular method, except that
we *omit the word void*
and its name is *exactly the same as the class name*.
Here, we are defining a constructor for our
``PlantingJeroo`` subclass that takes one number (integer)
as an argument, representing the number of flowers in its pouch.

The body of this constructor contains only a single line that uses
the special Java keyword ``super``.  This word can only
be used as the first word inside a subclass constructor, and it allows
us to invoke a superclass constructor, passing it any information it
might need.  So here, we are saying that the first (and only) action
in our ``PlantingJeroo`` constructor is to call the
constructor for its superclass (``Jeroo``), passing the
number of flowers.  This allows the superclass
to initialize all of its attributes correctly with the given information.
If our subclass needed more initialization, we would perform that in
following statements in the subclass constructor's body.

But for now, this constructor is enough for our
``PlantingJeroo`` class.  It will allow us to create a
``PlantingJeroo`` object by specifying its location and
number of flowers.  That will in turn allow us to instantiate the
Ali Jeroo in the previous example without problems.

.. note::
    Inheritance adds a new layer of complexity to constructors. A common
    mistake is forgetting that a subclass constructor must call a superclass
    constructor. If you don't explicitly call super(), the Java compiler tries
    to insert a no-argument call for you, which will fail if the superclass
    doesn't have a default constructor. Learning about pitfalls like this is
    just as important as learning the correct syntax; it's a critical part of
    becoming a good programmer.




More About Methods
------------------

A **method**, which corresponds to an action or a behavior, is a named chunk of
code that can be called upon or *invoked* to perform a certain pre-defined set
of actions.

A method definition consists of two parts: the method header and the method
body.  In general, a method header takes the following form, including some
parts which are optional:

*Modifiers*\ :sub:`optional` *ReturnType*  *MethodName*\ (*ParameterList*\ :sub:`optional`)

Put together, a method definition may look like this:

.. code-block:: java

   public int addHops()

Above, this method starts with the access modifier, ``public``, to declare
that this method can be accessed or referred to by other classes. The next part
of the method header is the method's return type. This is the type of value, if
any, that the method returns. In the method declaration above, we specify that
the method returns an ``int`` value as its result.  When we've been writing
methods so far, we've written methods like this:

.. code-block:: java

   public void pickFlowersAndDisableNets()

Instead of an ``int`` here we see the keyword ``void`` which means the method
does not return anything and is only being called for the action it performs,
without expecting it to return an answer of some kind.  We'll get more into
return types later.

In the method declaration, the method's
name follows the method's return type. This is the name that is used when the
method is called. We could call the method anything we wanted, but spaces cannot
be included.  Following the method's name is the method's **parameter list**
which we'll talk about in the next section.


Passing Information using Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Some of the methods we have used require arguments, which are the values you
provide when you invoke the method.  For example, a ``Jeroo`` has two methods
with the name 'hop'.  Calling ``hop()`` will cause the jeroo to hop one space
ahead.  However if you specify a number inside the parentheses like this:
``hop(4)``, the jeroo will hop four spaces ahead.

When you use a method, you provide the arguments. When you *write* a method, you
name the parameters. The parameter list indicates what arguments are required.

For example:

.. code-block:: java

   public void turnAndDisable(RelativeDirection direction)
   {
       this.turn(direction);
       this.toss();
   }

To invoke this method, we have to provide a relative direction as an argument:

.. code-block:: java

    turnAndDisable(RIGHT);

This will cause the jeroo to turn right and disable a net.


Using Multiple Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~

Here is an example of a method that takes two parameters:

.. code-block:: java

   public void turnThenHop(RelativeDirection direction, int hops)
   {
       this.turn(direction);
       this.hop(numHops);
   }

To invoke this method, we have to provide an integer and a relative direction
as arguments:

.. code-block:: java

    turnThenHop(RIGHT, 7);

This would cause the jeroo to turn right and then hop seven times.


Good Habits for Conditionals
----------------------------

Just like with commenting, readability is an important factor when writing
conditionals.


Logical NOT and the If-Else Structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One thing to consider is that when writing  if/else statements,
starting with a ! usually makes code harder to read.

.. code-block:: java

   if (!this.isClear(AHEAD))
   {
       this.toss();
   }
   else
   {
       this.hop();
   }

It's easy to miss the ``!`` above and misread what this conditional does.
Instead, it's preferable to phrase the same condition like this:

.. code-block:: java

   if (this.isClear(AHEAD))
   {
       this.hop();
   }
   else
   {
       this.toss();
   }

You can see that logically these two if-then-else structures achieve the same
thing, but one is easier to read.

.. note::

   Keep in mind, this may not always be possible for you to write the right
   condition without using the ``!`` operator.  Especially if you have no
   ``else`` clause, you may need to use it, but it is good practice if you can
   get around it.


Too Many Conditionals
~~~~~~~~~~~~~~~~~~~~~

Another thing to keep in mind is writing too many conditions.  When solving a
complex problem it can be tempting to just keep adding new conditions for
every new scenario you find yourself in.  However, this is both harder to read
and can introduce bugs into your code that could be hard to find later.

Take for example:


.. code-block:: java

   if (this.isClear(AHEAD))
   {
       this.hop();
   }
   else if (!this.isClear(AHEAD))
   {
       this.toss();
   }
   else
   {
       this.turn(RIGHT);
   }

Logically, the if and else-if branch of this conditional do the same things as
we saw above.  However, there is a third branch here that will never execute.
This is because the area ahead of the jeroo will always be either clear or
not clear.
The code will always find a branch to execute between the first two choices,
and there is never any situation where the ``else`` branch will ever be
applicable.

In computer terms, code that you write that can never be executed under
any possible circumstances, is called **unreachable code**. Such code is
usually a programming problem, since the reason it can never be executed is
often due to improperly constructed programming logic, as in the example
here. The first two branches cover all possible situations, so the third
option is useless.

If you're not entirely sure if two boolean statements are equivalent, it can
be helpful to write out a truth table.  For example, we can see below that
writing ``b`` and ``!!b`` are equivalent.

.. list-table:: Truth Table
   :header-rows: 1

   * - ``b``
     - ``!b``
     - ``!!b``
   * - True
     - False
     - True
   * - False
     - True
     - False

Whatever value ``b`` has, we can see that ``!!b`` matches it!


Empty Condition Branches
~~~~~~~~~~~~~~~~~~~~~~~~

It is also good practice not to leave empty conditions in your code.

.. code-block:: java

   if (this.isClear(AHEAD))
   {
       // do nothing
   }
   else
   {
       this.turn(RIGHT);
   }

It is always preferred to have just one if statement rather than an empty
if-else.

.. code-block:: java

   if (this.isClear(AHEAD))
   {
       // do nothing
   }
   else
   {
       this.turn(RIGHT);
   }

Here, it would be preferred to use the ``!`` operator rather than to have empty
conditions:

.. code-block:: java

   if (!this.isClear(AHEAD))
   {
       this.turn(RIGHT);
   }


Many Conditions vs Compound Conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Taking a look at the following code snippet:

.. code-block:: java

   if (this.isClear(AHEAD))
   {
       if (this.seesNet(RIGHT))
       {
           this.turn(RIGHT);
       }
   }

Here we see one condition nested within another.  It is generally preferable to
instead write the same condition like this:

.. code-block:: java

   if (this.isClear(AHEAD) && this.seesNet(RIGHT))
   {
       this.turn(RIGHT);
   }


More Complex Conditionals
~~~~~~~~~~~~~~~~~~~~~~~~~

Sometimes you want to check related conditions and choose one of several
actions. One way to do this is our cascaded if structure:

.. code-block:: java

   if (molly.isFacing(NORTH))
   {
       molly.hop();
   }
   else if (molly.isFacing(SOUTH))
   {
       molly.hop(2);
   }
   else if (molly.isFacing(EAST))
   {
       molly.hop(3);
   }
   else
   {
       molly.hop();
       molly.toss();
   }

These chains can be as long as you want, although they can be difficult to
read if they get out of hand.

You can also make complex decisions by nesting one conditional statement inside
another. We could have written the previous example as:

.. code-block:: java

   if (molly.isFacing(WEST))
   {
       molly.hop();
       molly.toss();
   }
   else
   {
       if (molly.isFacing(NORTH))
       {
           molly.hop();
       }
       else if (molly.isFacing(SOUTH))
       {
           molly.hop(2);
       }
       else
       {
           molly.hop(3);
       }
   }

The outer conditional has two branches. The first branch tells the jeroo to hop
once and toss, and the second branch contains another conditional statement,
which has three branches of its own.

These kinds of structures are common, but they get difficult to read
very quickly. Good indentation is essential to make the structure (or intended
structure) apparent to the reader.


A Different Type of Complex If-Statement
----------------------------------------

Another way if statements can get more complex is by creating longer compound
conditionals.

For example,

.. code-block:: java

    if ((caroline.isFacing(NORTH) && caroline.hasFlower())
        || caroline.seesNet(AHEAD))

This statement could be generalized to ``if (A || B)`` where:

* ``A = caroline.isFacing(NORTH) && caroline.hasFlower()``
* ``B = caroline.seesNet(AHEAD)``

If the jeroo has a flower while facing north OR sees a net ahead of it, this if
statement will trigger.  Notably, if the jeroo only has a flower the logical AND
will force the statement ``caroline.isFacing(NORTH) && caroline.hasFlower()``
to be false.  Thus, the jeroo would have to see a net ahead for this if
statement to trigger.

Logical NOT can also negate a compound statement.

 .. code-block:: java

   if (!(caroline.isFacing(NORTH) && caroline.hasFlower()))

Remember, for ``caroline.isFacing(NORTH) && caroline.hasFlower()`` to be true,
the jeroo must have a flower and be facing North.
Writing ``!(caroline.isFacing(NORTH) && caroline.hasFlower())`` will be true
as long as the compound condition within the parentheses is false.

When looking at these sort of complex operations, it is easy to get mixed up.
When considering negated compound conditions re-writing them  according
**De Morgan's laws** may be helpful to you:

* ``!(A && B)`` is the same as ``!A || !B``
* ``!(A || B)`` is the same as ``!A && !B``

Using this, instead of writing

.. code-block:: java

   if (!(caroline.isFacing(NORTH) && caroline.hasFlower()))

It is be logically equivalent to write:

.. code-block:: java

   if (!caroline.isFacing(NORTH) || !caroline.hasFlower())

Again, if we use a truth table we can see these two columns match:

.. list-table:: Truth Table: DeMorgan's Law
   :header-rows: 1

   * - ``A``
     - ``B``
     - ``(A && B)``
     - ``!(A && B)``
     - ``!A``
     - ``!B``
     - ``!A || !B``
   * - True
     - True
     - True
     - **False**
     - False
     - False
     - **False**
   * - True
     - False
     - False
     - **True**
     - False
     - True
     - **True**
   * - False
     - True
     - False
     - **True**
     - True
     - False
     - **True**
   * - False
     - False
     - False
     - **True**
     - True
     - True
     - **True**


Short Circuit Evaluation
------------------------

Another important feature of the boolean operators is that they utilize a
form of evaluation known as short-circuit evaluation. In **short-circuit
evaluation**, a boolean expression is evaluated from left to right, and the
evaluation is discontinued as soon as the expression's value can be determined,
regardless of whether it contains additional operators and operands. For
example, in the expression

.. code-block:: java

   basil.isFacing(WEST) && basil.seesNet(AHEAD)

if ``basil.isFacing(WEST)`` is false, then the AND expression must be false.
Because the computer already knows the whole AND expression is false, it
will not evaluate ``basil.seesNet(AHEAD)``, since there is no need.

Similarly, in the expression:

.. code-block:: java

   basil.isFacing(NORTH) || basil.seesNet(AHEAD)

if ``basil.isFacing(NORTH)`` is true, then the computer knows the whole
OR expression will also be true, and so it will not evaluate
``basil.seesNet(AHEAD)``, since it is unnecessary.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/ui_PM-woLsE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Relational Operators with Primitive Data Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Relational operators are used to check conditions like whether two values
are equal, or whether one is greater than the other. These kinds of operators
do not work on objects at all, so you cannot use them on jeroos. However,
they work on numeric values such as ``int``\ s. The following expressions
show how they are used.

.. list-table:: Relational Operators
   :header-rows: 1

   * - Operator
     - Example
     - Meaning
   * - ``==``
     - ``x == y``
     - x *is equal to* y
   * - ``!=``
     - ``x != y``
     - x *is not equal to* y
   * - ``>``
     - ``x > y``
     - x *is greater than* y
   * - ``<``
     - ``x < y``
     - x *is less than* y
   * - ``>=``
     - ``x >= y``
     - x *is greater than or equal to* y
   * - ``<=``
     - ``x <=  y``
     - x *is less than or equal to* y


The result of a relational operator is one of the two Boolean values: ``true``
or ``false``.  These values belong to the data type ``boolean``; in fact, they
are the only ``boolean`` values.

You are probably familiar with these operations, but notice that the Java
operators compare program values. They behave similar to the mathematical
operators you are familiar with, but are not written the same way
as mathematical symbols like =, ≤, and ≠.

A common error is to use a single = instead of a double == when you wish
to compare two values. Remember that = is
the assignment operator, and == is a comparison operator. Also, writing
=< or => by accident will produce a compiler error.  The equals sign always
comes after the `<` or `>`, just like when you say the names of those
comparisons in English: "less than or equal" has the less than symbol first,
followed by the equal sign second.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/rYX6AQo9YsU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Programming Practice 4
----------------------

.. extrtoolembed:: 'Programming Practice 4'
   :workout_id: 1799


.. raw:: html

   <footer style="border-top: 1px solid #777;"><div class="footer">
     Selected content adapted from:<br/>
     <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
     licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
     <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
     licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
   </div></footer>


