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

    **Estimated Time**: ~72 minutes (~47 min reading + ~25 min video at 100 WPM)

    * **Declare** variables of primitive types (``int``, ``double``, ``boolean``, ``char``) and evaluate arithmetic expressions involving integer division and casting.
    * **Implement** methods accepting formal parameters and returning calculated values with pass-by-value semantics.
    * **Formulate** compound boolean expressions using relational (``==``, ``!=``, ``<``, ``<=``, ``>``, ``>=``) and logical operators (``&&``, ``||``, ``!``) with short-circuit evaluation.
    * **Design** test suites that achieve 100% condition coverage for compound expressions using the :math:`N + 1` rule.
    * **Implement** custom subclass constructors that invoke ``super(...)`` with appropriate arguments.



Java's Primitive Types: Integers and Doubles
--------------------------------------------

One of the most powerful features of any programming language is the ability to
define and manipulate variables. A **variable** is a named storage location in
computer memory that holds a value. Values may be numbers, characters, boolean
truth values, or references to complex objects. To store and manipulate a value,
you must first **declare** a variable.

.. code-block:: java

   int x = 7;

Every variable has a data type that determines what kinds of values it can store,
how much memory it occupies, and what operations can be performed on it. The statement
above is a **variable declaration and initialization**, because it declares that the variable
named ``x`` has type ``int`` (integer) and gives it an initial value of 7.

Variable Naming Conventions and Keywords
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

While ``x`` is an acceptable variable name for short mathematical formulas or loop indices,
you should generally choose descriptive names that indicate what the variable represents--either
the data it holds or the role it plays in your program:

.. code-block:: java

   int ageInYears = 21;
   int flowersCollected = 14;
   int studentId = 123456;

When a variable name consists of multiple words, Java style conventions dictate using
**lowerCamelCase** (lowercase first letter, with the first letter of each subsequent word capitalized).
Variable names always begin with a lowercase letter, whereas class names (like ``Jeroo`` or ``FlowerSweeper``)
begin with an uppercase letter.

Variable names in Java are case-sensitive: ``ageInYears``, ``ageinyears``, and ``AgeInYears`` are
three entirely distinct identifiers. In addition, you cannot use any of Java's approximately 50
**reserved keywords** (such as ``class``, ``public``, ``void``, ``int``, ``double``, ``boolean``, or ``return``)
as identifier names, because the compiler reserves them to parse the structure of your code.

Local Variable Scope
~~~~~~~~~~~~~~~~~~~~

A variable declared inside the body of a method is called a **local variable**.
The region of program text where a variable's name is recognized and accessible is called its **scope**.
For local variables, scope extends from the point of declaration down to the closing brace (``}``) of the
block of statements where it was declared. A local variable declared inside one method cannot be seen or
accessed by any other method.


Variable Assignment and the '=' Operator
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After declaring a variable, you can update its value at any point using an **assignment statement**:

.. code-block:: java

   int flowersCollected = 0;   // declared and initialized to 0
   flowersCollected = 5;       // assigned a new value of 5
   flowersCollected = 8;       // updated to 8

An assignment statement evaluates the expression on the right-hand side of the ``=`` symbol
and stores the resulting value into the storage location named on the left-hand side. Because
the value can *vary* throughout program execution, the named location is called a *variable*.

.. warning::
   In mathematics, the ``=`` symbol indicates equality (a static statement of truth, such as :math:`a = b`).
   In Java, ``=`` is an **action**--an assignment operator that moves data from right to left.
   Writing ``5 = x;`` is illegal in Java because a literal number (5) is not a storage location.

Furthermore, equality in mathematics is symmetric and permanent. In Java, an assignment statement can
make two variables hold the same value temporarily, but changing one later does not affect the other:

.. code-block:: java

   int a = 5;
   int b = a; // a and b now both hold 5
   a = 3;     // a changes to 3, but b remains 5!

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/sepAXU0V9jk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Floating-Point Numbers: The double Type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Java's ``int`` type stores 32-bit signed whole numbers (ranging from approximately :math:`-2.14` billion
to :math:`+2.14` billion). However, many computations require real numbers with fractional components,
such as measurements, percentages, or geometric coordinates.

For real numbers, Java provides the **double** primitive type (a 64-bit double-precision floating-point number):

.. code-block:: java

   double accountBalance = 125.75;
   double pi = 3.1415926535;
   double distanceInMiles = 4.2;

You can assign an integer value directly to a ``double`` variable, and Java will automatically store
it as a floating-point number (e.g., ``double weight = 50;`` stores ``50.0``). However, you cannot assign
a ``double`` value directly to an ``int`` variable without an explicit cast, because discarding the
fractional part could lead to unintended data loss.



Characters, Booleans, and Literals
----------------------------------

In addition to numeric types for integers and real numbers, Java provides primitive types
for individual characters and boolean truth values.

The char Type and Character Literals
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The **char** primitive type represents a single 16-bit character from the Unicode character set,
which includes standard English letters, digits, punctuation, and symbols from world languages.

In Java, **character literals are enclosed in single quotation marks** (``' '``). This distinguishes
them from multi-character **String** literals, which are enclosed in double quotation marks (``" "``):

.. code-block:: java

   char letterGrade = 'A';
   char currencySymbol = '$';
   char digitChar = '7';

Notice that the character literal ``'7'`` is fundamentally different from the integer literal ``7``.
The integer ``7`` is a numeric value suitable for arithmetic computations, while the character ``'7'``
is a text glyph represented internally by an encoding number (ASCII/Unicode code 55).

Special non-printable characters are written using an **escape sequence** preceded by a backslash (``\``):

* ``'\n'``: Newline character (advances cursor to the next line)
* ``'\t'``: Tab character (horizontal spacing)
* ``'\''``: Single quote character literal
* ``'\\'``: Backslash character literal

You can compare ``char`` values directly using relational equality operators:

.. code-block:: java

   char userChoice = 'y';
   if (userChoice == 'y')
   {
       this.hop();
   }


Booleans as Variables and Condition Storage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You have already encountered boolean conditions in ``if`` statements and ``while`` loops.
Java formalizes this concept with the **boolean** primitive type, which can hold only one of
two literal values: **true** or **false**.

Rather than calling a sensor query method repeatedly or building complicated nested logic,
you can capture the result of any boolean expression in a ``boolean`` variable:

.. code-block:: java

   boolean pathIsBlocked = this.isWater(AHEAD) || this.seesNet(AHEAD);
   boolean hasAmmunition = this.hasFlower();

Once stored, a ``boolean`` variable can be used wherever a condition is expected:

.. code-block:: java

   if (pathIsBlocked)
   {
       this.turn(RIGHT);
   }

   if (hasAmmunition)
   {
       this.toss();
   }

.. tip::
   Avoid writing ``if (pathIsBlocked == true)``. Since ``pathIsBlocked`` already evaluates to
   ``true`` or ``false``, writing ``== true`` is completely redundant. Simply write ``if (pathIsBlocked)``.
   Similarly, write ``if (!pathIsBlocked)`` instead of ``if (pathIsBlocked == false)``.



Arithmetic Operators & Integer Division Truncation
--------------------------------------------------

Java provides standard arithmetic operators to perform mathematical computations on numeric types:

* ``+``: Addition
* ``-``: Subtraction
* ``*``: Multiplication
* ``/``: Division
* ``%``: Remainder (Modulo)

Arithmetic Expressions and Precedence
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An **expression** is a combination of variables, literals, operators, and method calls that evaluates
to a single value:

.. code-block:: java

   int hours = 2;
   int minutes = 35;
   int totalMinutes = hours * 60 + minutes; // computes 155

Java follows standard mathematical **operator precedence**:
1. Multiplication (``*``), division (``/``), and remainder (``%``) have higher precedence than addition (``+``) and subtraction (``-``).
2. Operators with equal precedence evaluate from left to right.
3. You can use parentheses ``( )`` to explicitly control the order of operations:

.. code-block:: java

   int result1 = 5 + 3 * 2;   // result1 is 11 (multiplication first)
   int result2 = (5 + 3) * 2; // result2 is 16 (parentheses first)

The **remainder operator (%)**, also known as the modulo operator, computes the remainder left over
after integer division:

.. code-block:: java

   int rem1 = 14 % 4; // rem1 is 2 (since 14 = 3 * 4 + 2)
   int rem2 = 8 % 2;  // rem2 is 0 (8 is evenly divisible by 2)

The remainder operator is commonly used to test whether a number is even (``number % 2 == 0``)
or to wrap values within a fixed range (such as compass headings or grid coordinates).


Integer Division and Truncation Pitfalls
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When both operands of a division operator are integers (``int``), Java performs **integer division**.
Integer division discards any fractional portion and **truncates** toward zero:

.. code-block:: java

   int a = 7 / 2;  // a is 3 (not 3.5!)
   int b = 1 / 3;  // b is 0 (not 0.333333!)

A frequent pitfall occurs when students attempt to store the result of an integer division into a ``double``:

.. code-block:: java

   double fraction = 1 / 3; // BUG: fraction is 0.0, NOT 0.333333

Because both ``1`` and ``3`` are integer literals, Java evaluates ``1 / 3`` using integer division first,
yielding the integer ``0``. Only after the division is complete does Java widen ``0`` to the ``double``
value ``0.0``.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/46Ngr6eczpA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Type Conversions: Implicit Widening and Explicit Casting
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Java handles arithmetic expressions involving mixed types using **widening conversions**:
if either operand in an arithmetic operation is a ``double``, Java automatically converts the
other operand to a ``double`` before performing the calculation:

.. code-block:: java

   double half = 1.0 / 2; // 1.0 is double, so 2 becomes 2.0; half is 0.5
   double quarter = 1 / 4.0; // quarter is 0.25

What if you have two ``int`` variables and need their fractional quotient? You cannot simply append ``.0``
to a variable name. Instead, you use an **explicit cast**:

.. code-block:: java

   int totalScore = 85;
   int totalQuizzes = 10;

   // Truncates to 8.0:
   double wrongAverage = totalScore / totalQuizzes;

   // Explicit cast converts totalScore to double before division:
   double correctAverage = (double) totalScore / totalQuizzes; // yields 8.5

The cast operator consists of the desired target type inside parentheses: ``(double)``. It has higher
precedence than arithmetic operators, so ``(double) totalScore / totalQuizzes`` first converts ``totalScore``
to ``85.0``, which then forces floating-point division by ``10``, producing ``8.5``.

Conversely, casting a ``double`` to an ``int`` **truncates** the decimal portion:

.. code-block:: java

   double tax = 8.875;
   int wholeDollars = (int) tax; // wholeDollars is 8 (fractional part is discarded)


Rounding vs. Truncation
~~~~~~~~~~~~~~~~~~~~~~~

It is critical to distinguish between **truncation** and **rounding**:

* **Truncation** simply chops off the fractional part and throws it away, moving toward zero.
  Both ``(int) 8.1`` and ``(int) 8.99`` produce ``8``. Java does *not* automatically round to
  the nearest whole number when casting.
* **Rounding** finds the closest whole number (so ``8.1`` rounds to ``8``, but ``8.9`` rounds to ``9``).

If your calculation requires rounding rather than truncation, Java provides two common approaches:

**1. The "+ 0.5" Technique (for positive numbers)**

You can add ``0.5`` to a positive floating-point number before casting to ``int``:

.. code-block:: java

   double score1 = 8.2;
   int rounded1 = (int) (score1 + 0.5); // 8.2 + 0.5 = 8.7 -> truncates to 8

   double score2 = 8.7;
   int rounded2 = (int) (score2 + 0.5); // 8.7 + 0.5 = 9.2 -> truncates to 9

Because adding ``0.5`` pushes any fractional value of ``0.5`` or greater over to the next whole integer,
the subsequent truncation produces properly rounded results.

**2. Using Math.round()**

Java's standard ``Math`` utility class includes a built-in ``Math.round()`` method:

.. code-block:: java

   double price = 19.85;
   long nearestDollar = Math.round(price); // returns 20

Note that ``Math.round(double)`` produces a 64-bit integer of type ``long``. If you need the result as
an ``int``, you can cast the returned value:

.. code-block:: java

   int roundedPrice = (int) Math.round(price); // 20




Parameters and Pass-by-Value Semantics
--------------------------------------

So far, most methods you have declared were parameterless actions such as ``hop()`` or ``turnAround()``.
However, methods become far more powerful and reusable when they can accept input data to customize
their behavior.

Method Parameters: Formal Parameters vs. Actual Arguments
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To allow a method to receive input, you define one or more **formal parameters** inside the parentheses
of the method header. A parameter declaration specifies both the type and the name of the incoming data:

.. code-block:: java

   public void hopMultiple(int distance)
   {
       int count = 0;
       while (count < distance)
       {
           this.hop();
           count = count + 1;
       }
   }

In this method header, ``int distance`` is a **formal parameter**. It acts as a local variable initialized
automatically with whatever value the caller supplies.

When a caller invokes the method, the value provided in the call is called the **actual argument**:

.. code-block:: java

   jeroo.hopMultiple(4); // 4 is the actual argument

The compiler ensures that the type of each actual argument matches (or can be widened to) the type of the
corresponding formal parameter.

Methods with Multiple Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A method can accept multiple parameters separated by commas. The actual arguments must match the formal
parameters in count, order, and type:

.. code-block:: java

   public void plantRectangle(int rows, int columns)
   {
       int r = 0;
       while (r < rows)
       {
           int c = 0;
           while (c < columns)
           {
               this.plant();
               this.hop();
               c = c + 1;
           }
           this.turnAround();
           r = r + 1;
       }
   }

When invoking ``plantRectangle(3, 5)``, Java binds the value ``3`` to ``rows`` and ``5`` to ``columns``.


Pass-by-Value Semantics in Java
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One of the most important concepts in programming is understanding how parameters are passed to methods.
**Java is strictly pass-by-value.**

When you pass an argument to a method, Java evaluates the argument expression and passes a **copy of the value**
into the method's formal parameter variable. The method operates exclusively on its own local copy:

.. code-block:: java

   public class ValueTester
   {
       public void tryToChange(int x)
       {
           x = x + 10; // modifies only the local parameter variable x
       }
   }

Consider what happens at the call site:

.. code-block:: java

   int original = 5;
   ValueTester tester = new ValueTester();
   tester.tryToChange(original);

   // What is original now?
   System.out.println(original); // Prints 5!

When ``tester.tryToChange(original)`` is executed, the value ``5`` stored in ``original`` is copied into the
parameter variable ``x``. Inside ``tryToChange``, ``x`` becomes ``15``. But ``original`` remains in the caller's
stack frame completely untouched. A method cannot modify the value of a primitive variable passed to it by a caller.



Writing Non-Void Methods with Return Statements
-----------------------------------------------

Methods can be categorized by whether they produce a result:

1. **void methods**: Perform actions that change the state of the world or an object (e.g. ``hop()``, ``pick()``), but return no answer.
2. **non-void methods**: Compute and produce a value (an answer) that is returned to the caller.

The return Keyword and Non-Void Return Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To write a method that returns a value, you replace the keyword ``void`` in the method header with the
**return type** of the value being produced:

.. code-block:: java

   public int convertHoursToMinutes(int hours)
   {
       int minutes = hours * 60;
       return minutes;
   }

The **return** statement terminates execution of the method immediately and passes the computed value
back to the caller. The type of the expression in the ``return`` statement must match the return type declared
in the method header.

Returning Calculated Values and Conditional Returns
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Methods can compute values using conditional statements to return different answers based on inputs:

.. code-block:: java

   public int max(int a, int b)
   {
       if (a >= b)
       {
           return a;
       }
       else
       {
           return b;
       }
   }

.. important::
   **Every Path Must Return**: When compiling a non-void method, Java checks every possible execution
   path through your conditionals. If there is any path where a ``return`` statement is not reached,
   the compiler will reject your code with the error: ``missing return statement``.

You can also use a return statement to exit early once an answer is determined, or structure your code
with a single return at the end using a local accumulator variable:

.. code-block:: java

   public double calculateTax(double subtotal, boolean isTaxExempt)
   {
       if (isTaxExempt)
       {
           return 0.0;
       }
       return subtotal * 0.053; // Virginia state sales tax rate
   }

Using Method Results in Expressions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because non-void methods return values, a call to a non-void method is an expression. You can:

* Store the returned value in a variable:
  ``int larger = this.max(12, 19);``
* Use the returned value in arithmetic:
  ``int total = this.convertHoursToMinutes(3) + 45;``
* Pass the returned value as an argument to another method:
  ``this.hopMultiple(this.max(2, 5));``
* Use the returned boolean directly in a conditional:
  ``if (this.hasFlower()) { ... }``



Boolean Operators: AND, OR, NOT & Short-Circuiting
--------------------------------------------------

In previous chapters, you wrote simple conditions based on a single sensor query, such as ``this.isWater(AHEAD)``.
Real-world decision-making often requires checking multiple criteria simultaneously or comparing numeric values.

Relational Operators with Primitive Data Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Java provides six **relational operators** to compare primitive values. Every relational expression evaluates
to a ``boolean`` result (``true`` or ``false``):

.. list-table:: Java Relational Operators
   :widths: 15 35 25 25
   :header-rows: 1

   * - Operator
     - Meaning
     - Example
     - Result (if x = 5)
   * - ``==``
     - Equal to
     - ``x == 5``
     - ``true``
   * - ``!=``
     - Not equal to
     - ``x != 5``
     - ``false``
   * - ``<``
     - Less than
     - ``x < 10``
     - ``true``
   * - ``<=``
     - Less than or equal to
     - ``x <= 5``
     - ``true``
   * - ``>``
     - Greater than
     - ``x > 5``
     - ``false``
   * - ``>=``
     - Greater than or equal to
     - ``x >= 0``
     - ``true``

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/rYX6AQo9YsU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Compound Boolean Operators: &&, ||, !
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To combine multiple conditions into a single expression, Java provides three **logical operators**:

.. list-table:: Java Logical Operators
   :widths: 15 35 50
   :header-rows: 1

   * - Operator
     - Meaning
     - Description
   * - ``&&``
     - Logical AND
     - ``true`` only when **both** operands are ``true``
   * - ``||``
     - Logical OR
     - ``true`` when **at least one** operand is ``true``
   * - ``!``
     - Logical NOT
     - Inverts the truth value (changes ``true`` to ``false`` and vice versa)

You can combine relational expressions and sensor queries using logical operators:

.. code-block:: java

   // Safe to step forward if clear AND facing the correct boundary:
   if (this.isClear(AHEAD) && this.getHeading() == EAST)
   {
       this.hop();
   }

   // Handle an obstacle if blocked by water OR blocked by a net:
   if (this.isWater(AHEAD) || this.seesNet(AHEAD))
   {
       this.turn(RIGHT);
   }

   // Act when NOT facing water:
   if (!this.isWater(AHEAD))
   {
       this.hop();
   }


Short-Circuit Evaluation Semantics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Java evaluates compound boolean expressions from left to right using **short-circuit evaluation**:

* For **&& (AND)**: If the left operand evaluates to ``false``, the entire expression cannot possibly be ``true``. Java immediately stops evaluation and produces ``false`` without evaluating the right operand.
* For **|| (OR)**: If the left operand evaluates to ``true``, the entire expression is already guaranteed to be ``true``. Java immediately stops evaluation and produces ``true`` without evaluating the right operand.

Short-circuit evaluation is not just a performance optimization; it is a critical programming tool for
writing **guard conditions** that prevent runtime errors:

.. code-block:: java

   // The second check (hasFlower) ensures toss() is only called when ammunition exists:
   if (this.hasFlower() && this.seesNet(AHEAD))
   {
       this.toss();
   }

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/ui_PM-woLsE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Testing Compound Conditions: Condition Coverage and the N + 1 Rule
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Chapter 3, you learned that achieving **condition coverage** (also known as branch coverage)
requires writing automated unit test cases that evaluate every condition to both ``true`` and ``false``.
For a simple condition (such as ``if (this.hasFlower())``), two test cases are sufficient:
one where the condition evaluates to ``true``, and one where it evaluates to ``false``.

However, when you write **compound conditions** using ``&&`` or ``||``, achieving full condition
coverage requires deeper analysis due to Java's **short-circuit evaluation**.

The N + 1 Rule for Compound Conditions
""""""""""""""""""""""""""""""""""""""

Consider a method with a compound condition containing :math:`N` simple boolean conditions joined by ``&&``:

.. code-block:: java

   if (this.hasFlower() && this.seesNet(AHEAD))
   {
       this.toss();
   }

Here, there are :math:`N = 2` simple conditions:
1. Condition 1: ``this.hasFlower()``
2. Condition 2: ``this.seesNet(AHEAD)``

You might initially assume you need :math:`2^N = 4` test cases to test every possible combination
in a truth table. However, because Java uses short-circuit evaluation, it stops evaluating the moment
the first ``false`` operand is encountered in an ``&&`` expression!

To achieve full condition coverage for a compound condition with :math:`N` simple conditions,
you need exactly **N + 1 test cases**:

.. list-table:: Test Cases for ``hasFlower() && seesNet(AHEAD)`` (:math:`N = 2`)
   :widths: 15 25 25 35
   :header-rows: 1

   * - Test Case
     - Condition 1 (``hasFlower``)
     - Condition 2 (``seesNet``)
     - Outcome & Evaluation Path
   * - **Test 1**
     - ``false``
     - *(not evaluated)*
     - Java short-circuits at Condition 1. Result: ``false``.
   * - **Test 2**
     - ``true``
     - ``false``
     - Condition 1 evaluates to ``true``, allowing Java to evaluate Condition 2 (``false``). Result: ``false``.
   * - **Test 3**
     - ``true``
     - ``true``
     - Both conditions evaluate to ``true``. Result: ``true``.

For any compound ``&&`` expression with :math:`N` conditions:
* You need **1 test case** where every condition evaluates to ``true`` (the overall expression is ``true``).
* You need **N test cases** where each condition :math:`k` (from 1 to :math:`N`) is the *first* condition to evaluate to ``false``.

The same :math:`N + 1` rule applies to compound ``||`` expressions:
* You need **1 test case** where every condition evaluates to ``false`` (the overall expression is ``false``).
* You need **N test cases** where each condition :math:`k` is the *first* condition to evaluate to ``true`` (triggering short-circuit termination).


The "Lining Up Preceding Conditions" Trap
""""""""""""""""""""""""""""""""""""""""

A very common mistake students make when writing unit tests for compound conditions is trying to
test a specific sub-condition without setting up the environment so that execution actually reaches it.

For example, suppose you want to write a test case to verify how your code behaves when Condition 2
(``seesNet(AHEAD)``) is ``false``. A student might write:

.. code-block:: java

   @Test
   public void testSeesNetIsFalse()
   {
       // Create a Jeroo with NO flowers in its pouch, facing clear water
       Jeroo jeroo = new Jeroo(0);
       // ...
   }

In this test setup, the student made sure there is no net ahead. But because the Jeroo was created with
``0`` flowers, ``hasFlower()`` evaluates to ``false``!

Because Java evaluates ``hasFlower() && seesNet(AHEAD)`` from left to right, Java sees that
``hasFlower()`` is ``false`` and **short-circuits immediately**. It never calls ``seesNet(AHEAD)`` at all!
As a result, this test case only tests Condition 1; it completely fails to test Condition 2.

.. important::
   **The Preceding Conditions Rule**:
   To test condition :math:`k` in a compound ``&&`` expression, **all preceding conditions (1 through :math:`k - 1`) must evaluate to true**.
   If any earlier condition evaluates to ``false``, Java will short-circuit before ever reaching condition :math:`k`.

   Similarly, to test condition :math:`k` in a compound ``||`` expression, **all preceding conditions (1 through :math:`k - 1`) must evaluate to false**.
   If any earlier condition evaluates to ``true``, Java will short-circuit before reaching condition :math:`k`.

Whenever you design unit tests for compound conditions in your programs and labs, always verify that your test fixture sets up the world state so that each target condition is reached and evaluated.


Clean Conditional Design: Avoiding Dead Code and Negation Traps
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When writing complex conditional structures, following good design habits makes your code readable and defect-free:

1. **Prefer Positive Conditions in if-else**: Starting an ``if-else`` with a negated condition (``!``) forces readers to perform mental gymnastics.

   .. code-block:: java

      // Hard to read:
      if (!this.isClear(AHEAD))
      {
          this.turn(RIGHT);
      }
      else
      {
          this.hop();
      }

      // Much easier to read:
      if (this.isClear(AHEAD))
      {
          this.hop();
      }
      else
      {
          this.turn(RIGHT);
      }

2. **Beware of Unreachable (Dead) Code**: If an earlier branch covers all cases, subsequent branches can never execute:

   .. code-block:: java

      if (this.isClear(AHEAD))
      {
          this.hop();
      }
      else if (!this.isClear(AHEAD))
      {
          this.turn(RIGHT);
      }
      else
      {
          // UNREACHABLE CODE! The area ahead is always either clear or not clear.
          this.toss();
      }

3. **Use Compound Conditions to Flatten Nested Logic**: Instead of nesting multiple ``if`` statements, join them with ``&&``:

   .. code-block:: java

      // Nested:
      if (this.isClear(AHEAD))
      {
          if (this.hasFlower())
          {
              this.plant();
          }
      }

      // Clean, flat compound condition:
      if (this.isClear(AHEAD) && this.hasFlower())
      {
          this.plant();
      }



Constructors in Subclasses & super(...)
---------------------------------------

When you create a subclass in Java, it inherits all accessible methods from its superclass.
For example, a ``FlowerSweeper`` or ``PlantingJeroo`` subclass inherits ``hop()``, ``turn()``,
``pick()``, and ``isWater()`` from ``Jeroo``.

However, **subclasses do not inherit constructors**.

Why Subclasses Do Not Inherit Constructors
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Constructors are special methods designed specifically to initialize the state of a newly created object.
Because a subclass often adds new fields, new responsibilities, or specialized behavior that the superclass
cannot anticipate, every subclass must define its own constructors.

If you do not define any constructor in a subclass, the Java compiler automatically attempts to insert a
default, parameterless constructor that calls ``super()`` (the superclass no-argument constructor).
If the superclass does not have a no-argument constructor (or if you need to pass parameters to configure
the superclass), your code will fail to compile unless you provide an explicit constructor.

Declaring Subclass Constructors & Invoking super(...)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A constructor declaration has two defining characteristics:
1. It has **no return type** (not even ``void``).
2. Its name is **identical to the name of the class**.

Inside a subclass constructor, you can invoke a constructor of its superclass using the **super(...)** statement.
When used, ``super(...)`` **must be the very first statement** in the constructor body:

.. code-block:: java

   public class PlantingJeroo extends Jeroo
   {
       /**
        * Create a new PlantingJeroo with a specified pouch of flowers.
        * @param flowers The number of flowers to start with.
        */
       public PlantingJeroo(int flowers)
       {
           super(flowers); // Invokes the Jeroo(int flowers) constructor
       }
   }

In this constructor, ``PlantingJeroo`` accepts an integer parameter ``flowers`` and delegates its initialization
to the ``Jeroo`` superclass via ``super(flowers)``. This ensures that the superclass initializes all of its
internal micro-world attributes (such as position, heading, and flower pouch) properly before any subclass
code executes.

You can also provide constructors that pass multiple arguments to the superclass:

.. code-block:: java

   public class PlantingJeroo extends Jeroo
   {
       public PlantingJeroo(int flowers)
       {
           super(flowers);
       }

       /**
        * Create a PlantingJeroo at a specific coordinate facing east.
        * @param x Initial x-coordinate.
        * @param y Initial y-coordinate.
        * @param flowers Initial flower count.
        */
       public PlantingJeroo(int x, int y, int flowers)
       {
           super(x, y, EAST, flowers); // Invokes Jeroo(int, int, CompassDirection, int)
       }
   }

By defining custom subclass constructors with parameters and calling ``super(...)``, you gain complete
control over how your micro-world actors are initialized in your programs and test fixtures.


Building Your Skills Through Practice
-------------------------------------

Learning to program is a skill built through deliberate practice and experimentation.
The following **optional, ungraded resources** are designed to help you reinforce
key concepts, build fluency, and prepare for upcoming
quizzes, labs, and programming assignments.

* `Java Syntax Practice 4 <https://codeworkout.cs.vt.edu/courses/vt/cs1114/fall-2026/workouts/3812>`__ : Build
  confidence and muscle memory with rapid, bite-sized drills focused on syntax
  rules and basic language mechanics. *Especially recommended if you are new to programming.*
 

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
