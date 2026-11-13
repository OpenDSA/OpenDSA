.. avmetadata::
   :title: Static Members, Main Method, and Exception Handling
   :author: Molly Domino, Stephen Edwards
   :institution: Virginia Tech
   :keyword: Static; Main Method; Exception Handling; Try-Catch; Checked Exceptions; Runtime Exceptions; Debugging; Tolerance Testing
   :naturallanguage: en
   :programminglanguage: Java
   :description: Comprehensive introduction to static fields, utility methods, the main entry point, Java exception hierarchy, structured try-catch-finally error handling, throwing exceptions, and systematic debugging with TestCase.

Static Members, Main Method, and Exception Handling
===================================================

.. sidebar:: Learning Objectives

    **Estimated Time**: ~64 minutes (~35 min reading + ~29 min video at 100 WPM)

   * **Declare and use** static fields and static constants (``public static final``) for class-wide shared state.
   * **Construct** static utility methods using parameter-in, return-out semantics and apply standard ``java.lang.Math`` functions.
   * **Implement** the standard application entry point (``public static void main(String[] args)``) and bootstrap root application objects.
   * **Analyze and differentiate** the Java exception hierarchy (``Throwable``, ``Error``, ``Exception``, ``RuntimeException``) and explain the compiler contracts for checked versus unchecked exceptions.
   * **Handle** exceptions gracefully using structured ``try``, ``catch``, and ``finally`` blocks with proper exception hierarchy ordering.
   * **Enforce** precondition validation defensively by throwing appropriate runtime exceptions (such as ``IllegalArgumentException``).
   * **Apply** the four-step scientific debugging process to isolate, repair, and verify regression of software defects across interacting classes.
   * **Construct** automated unit tests in ``TestCase`` utilizing floating-point tolerance assertions (``assertEquals(expected, actual, delta)``) and exception-verification blocks.

Throughout this course, you have designed object-oriented systems composed of
interacting classes, instantiated objects in heap memory, and managed individual
object states. In this final chapter, we examine concepts essential for
building standalone production applications: class-level **static members**, the
standard execution entry point (``main``), Java's robust **exception handling
architecture**, and disciplined **systematic debugging** methodologies.


Static Fields: Class-Wide State
-------------------------------

Up to this point, every field you have declared has been an **instance field**.
When a class defines instance fields, each object created with the ``new``
operator receives its own private copy of those variables in heap memory:

.. code-block:: java

   public class Ball
   {
       private String color;

       public Ball(String color)
       {
           this.color = color;
       }

       public String getColor()
       {
           return this.color;
       }
   }

If you instantiate three ``Ball`` objects, there are three separate ``color``
variables stored across the heap. Changing the color of one ball has no effect
on the other two.

However, software designs frequently require properties that belong to the
**class as a whole**, rather than to any individual instance. In Java, adding the
``static`` modifier to a field declaration designates it as a **static field**
(also known as a **class variable**).

Class-Wide Shared Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~

A static field exists in a single, shared memory location associated with the
class itself. All instances of that class share this single variable:

.. code-block:: java

   public class Ball
   {
       private String color;
       private static int diameter = 15; // Shared across ALL Ball instances

       public Ball(String color)
       {
           this.color = color;
       }

       public String toString()
       {
           return this.color + " ball with diameter " + Ball.diameter + " cm";
       }
   }

Notice how ``diameter`` is accessed: because it belongs to the class rather than
a particular object, we refer to it using the class name: ``Ball.diameter``.
While Java permits accessing static members through an object reference (e.g.,
``b1.diameter``), doing so is poor style because it obscures the shared nature of
the variable.

Generating Unique Identifiers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One classic use of static fields is tracking class-wide state, such as generating
unique identification numbers for newly created objects:

.. code-block:: java

   public class Student
   {
       private static int nextIdNumber = 1001; // Shared class-wide counter

       private int id;
       private String name;

       public Student(String name)
       {
           this.name = name;
           this.id = Student.nextIdNumber; // Assign current shared counter
           Student.nextIdNumber++;         // Advance counter for next student
       }

       public int getId()
       {
           return this.id;
       }

       public String getName()
       {
           return this.name;
       }
   }

Every time ``new Student(...)`` is called, the constructor reads the shared
``Student.nextIdNumber``, assigns it to the instance field ``this.id``, and
increments the shared counter. Each student receives a unique, sequential ID
number.

Class Constants with `public static final`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

By combining ``static`` with the ``final`` modifier, you define **class
constants**—immutable values that are fixed at compile time and shared across
all instances without duplicating memory:

.. code-block:: java

   public class PhysicsSimulation
   {
       public static final double GRAVITATIONAL_ACCELERATION = 9.80665;
       public static final double SPEED_OF_LIGHT = 299792458.0;
   }

By convention, constant identifiers are written in uppercase with underscores
separating words. Other classes can reference them directly without
instantiating an object:

.. code-block:: java

   double weight = mass * PhysicsSimulation.GRAVITATIONAL_ACCELERATION;

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/wa1HzkMqY9A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Static Methods & The `Math` Class
---------------------------------

Just as fields can belong to a class, methods can also be declared with the
``static`` modifier. A **static method** (or **class method**) can be invoked
directly through the class name without creating an instance of that class.

Pure Mathematical Utility Functions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Static methods are ideal for **utility functions**: operations that compute a
result based solely on their input arguments without reading or modifying any
instance state:

.. code-block:: java

   public class GeometryUtils
   {
       public static double calculateHypotenuse(double sideA, double sideB)
       {
           return Math.sqrt((sideA * sideA) + (sideB * sideB));
       }

       public static double toRadians(double degrees)
       {
           return degrees * (Math.PI / 180.0);
       }
   }

You invoke these methods directly on the class:

.. code-block:: java

   double hyp = GeometryUtils.calculateHypotenuse(3.0, 4.0); // Returns 5.0

The Standard `java.lang.Math` Library
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Java's built-in ``java.lang.Math`` class is the quintessential example of a
utility class. It contains only static constants (such as ``Math.PI`` and
``Math.E``) and static methods for mathematical operations:

* ``Math.sqrt(double a)``: Returns the correctly rounded positive square root.
* ``Math.pow(double a, double b)``: Returns the value of $a$ raised to the power
  of $b$ ($a^b$).

* ``Math.abs(int a)`` / ``Math.abs(double a)``: Returns the absolute value.
* ``Math.min(a, b)`` / ``Math.max(a, b)``: Returns the smaller or larger of two
  values.

* ``Math.round(double a)``: Returns the closest integer or long to the argument.

Because all members are static, you never write ``new Math()``. You invoke them
directly:

.. code-block:: java

   double area = Math.PI * Math.pow(radius, 2);
   double distance = Math.abs(x1 - x2);

The Core Restriction of Static Context
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because static methods belong to the class and can run before any objects exist,
**static methods have no `this` reference**.

Consequently, a static method cannot directly access instance fields or call
non-static methods of its own class:

.. code-block:: java

   public class Greeter
   {
       private String greeting = "Hello";

       public static void greet()
       {
           // COMPILE ERROR: Cannot make a static reference to non-static field
           System.out.println(greeting);

           // COMPILE ERROR: Cannot use 'this' in a static context
           System.out.println(this.greeting);
       }
   }

To access instance members from inside a static method, you must explicitly
create or receive an object instance:

.. code-block:: java

   public static void greet()
   {
       Greeter g = new Greeter();
       System.out.println(g.greeting); // Legal: accessed via an explicit object!
   }


The Standard Application Entry: `main`
--------------------------------------

In BlueJ, you have interacted with programs by right-clicking classes and
selecting constructors or methods from an interactive popup menu. Outside of
specialized educational environments, however, standalone software applications
execute from a standard command-line terminal or operating system launcher.

Every standalone Java program begins execution at a single designated entry
point: the ``main`` method.

The Signature of `main`
~~~~~~~~~~~~~~~~~~~~~~~

The method signature for the application entry point is strictly defined by the
Java Virtual Machine:

.. code-block:: java

   public static void main(String[] args)

Each keyword serves a specific purpose in the runtime architecture:

* ``public``: The method must be accessible to the JVM launcher from outside the
  class package.

* ``static``: The JVM must be able to invoke ``main`` **before creating any
  objects** in heap memory.

* ``void``: The method returns no value when execution concludes.
* ``main``: The exact identifier the JVM searches for when launching the
  program.

* ``String[] args``: An array of strings containing any command-line arguments
  passed by the operating system upon launch.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/P-_Nzi_mCRo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>

Command-Line Arguments
~~~~~~~~~~~~~~~~~~~~~~

When a user executes a compiled Java program from a command prompt, words typed
after the class name are packaged into the ``String[] args`` array:

.. code-block:: bash

   java DataAnalyzer dataset1.csv 500

Inside ``main``, Java automatically allocates the array:

.. code-block:: java

   public class DataAnalyzer
   {
       public static void main(String[] args)
       {
           if (args.length < 2)
           {
               System.out.println("Usage: java DataAnalyzer <filename> <threshold>");
               return;
           }

           String filename = args[0];             // "dataset1.csv"
           int threshold = Integer.parseInt(args[1]); // 500

           System.out.println("Analyzing " + filename + " at threshold " + threshold);
       }
   }

The Application Bootstrap Pattern
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because ``main`` is static, it cannot directly invoke non-static methods or
manipulate instance fields of its enclosing class. Therefore, modern
object-oriented architectures follow the **bootstrap pattern**: ``main``
instantiates the top-level application object and delegates execution to an
instance method:

.. code-block:: java

   public class AdventureGame
   {
       private World world;
       private Player player;

       public AdventureGame()
       {
           this.world = new World();
           this.player = new Player("Explorer");
       }

       public void play()
       {
           System.out.println("Welcome to the adventure!");
           // Run the interactive game loop...
       }

       public static void main(String[] args)
       {
           // Bootstrap: instantiate the game object and start execution
           AdventureGame game = new AdventureGame();
           game.play();
       }
   }


The Exception Hierarchy: Checked vs. Unchecked
----------------------------------------------

Software systems inevitably encounter conditions that prevent normal execution:
network connections disconnect, files fail to open, users enter invalid data, or
calculations attempt to divide by zero.

In Java, abnormal events are represented as **exceptions**: objects that
encapsulate error state and are propagated up the call stack.

The Java Exception Hierarchy
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

All error and exception classes in Java inherit from the common base class
``java.lang.Throwable``. The hierarchy branches into two primary categories:

.. code-block:: text

                       Throwable
                      /         \
                 Error           Exception
                                /         \
                   Checked Exceptions      RuntimeException
                   (IOException, etc.)     (Unchecked Exceptions)

1. **`java.lang.Error`**: Represents severe, catastrophic conditions external to
   the application code, such as ``OutOfMemoryError`` or
   ``StackOverflowError``. Applications should **never** attempt to catch or
   handle an ``Error``; they indicate that the JVM itself cannot safely continue.

2. **`java.lang.Exception`**: Represents conditions that a well-written
   application can reasonably foresee, catch, and handle gracefully.

Checked vs. Unchecked Exceptions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Java divides the ``Exception`` tree into two distinct categories with different
compiler enforcement rules:

.. list-table::
   :widths: 20 40 40
   :header-rows: 1

   * - Category
     - Compiler Enforcement Contract
     - Typical Examples
   * - **Checked Exceptions** (Subclasses of ``Exception`` excluding ``RuntimeException``)
     - The compiler **enforces** that the calling code must either catch the
       exception using a ``try-catch`` block or declare it in the method header
       using ``throws``.
     - ``java.io.FileNotFoundException``, ``java.io.IOException``,
       ``java.sql.SQLException``
   * - **Unchecked Exceptions** (Subclasses of ``RuntimeException``)
     - The compiler **does not enforce** handling or declaration. They represent
       programming logic errors, invalid arguments, or broken preconditions that
       could be prevented through defensive coding.
     - ``NullPointerException``, ``IndexOutOfBoundsException``,
       ``IllegalArgumentException``, ``ArithmeticException``

Understanding this distinction clarifies what you saw in Chapter 13: opening a
disk file with ``new Scanner(new File(...))`` threw ``FileNotFoundException`` (a
checked exception), forcing the compiler to require ``try-catch`` or a ``throws``
clause. Conversely, dividing by zero throws ``ArithmeticException`` (an unchecked
runtime exception), which halts the program immediately unless handled.


Handling Exceptions with `try-catch-finally`
--------------------------------------------

When an exception is thrown, normal sequential control flow is interrupted.
Java provides the structured **`try-catch-finally`** statement to intercept
exceptions and take recovery actions without terminating the program.

Execution Flow of `try-catch`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: java

   public int parseIntegerSafely(String text)
   {
       int result = 0;
       try
       {
           // Step 1: Attempt normal execution
           result = Integer.parseInt(text);
       }
       catch (NumberFormatException e)
       {
           // Step 2: Handle specific failure gracefully
           System.out.println("Warning: Invalid number format for '" + text + "'. Defaulting to 0.");
           result = 0;
       }
       return result;
   }

1. The code inside the ``try`` block begins execution.
2. If all statements execute without an exception, the entire ``catch`` block is
   skipped, and execution continues immediately following the construct.

3. If an exception occurs on any statement inside the ``try`` block, execution of
   the ``try`` block terminates immediately. Java searches for a matching
   ``catch`` block whose declared parameter type matches the thrown exception.

4. If a matching catch block is found, its code executes. The program does *not*
   crash; execution resumes normally after the catch block.

Multi-Catch Ordering: Specific to General
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A single ``try`` block can be followed by multiple ``catch`` clauses to handle
different error types uniquely. Java matches catch blocks in top-to-bottom
order.

Because Java matches by inheritance (polymorphism), **catch blocks must always
be ordered from the most specific subclass to the most general superclass**:

.. code-block:: java

   try
   {
       Scanner scanner = new Scanner(new File(filename));
       String line = scanner.nextLine();
       int count = Integer.parseInt(line);
       scanner.close();
   }
   catch (FileNotFoundException e)
   {
       System.out.println("File could not be found: " + e.getMessage());
   }
   catch (NumberFormatException e)
   {
       System.out.println("File contents could not be parsed as an integer: " + e.getMessage());
   }
   catch (Exception e)
   {
       // Catch-all fallback for any other unexpected exception
       System.out.println("An unexpected error occurred: " + e.getMessage());
   }

If you placed ``catch (Exception e)`` at the top, the compiler would report an
error (``unreachable code``) because the general handler would swallow all
subclass exceptions before the specific handlers could be reached.

The `finally` Block: Guaranteed Resource Cleanup
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The optional ``finally`` block follows the last ``catch`` clause. Statements
inside ``finally`` are **guaranteed to execute**, whether an exception occurred
or not, and whether an exception was caught or left unhandled:

.. code-block:: java

   Scanner scanner = null;
   try
   {
       scanner = new Scanner(new File("data.txt"));
       processData(scanner);
   }
   catch (FileNotFoundException e)
   {
       System.out.println("Failed to open file: " + e.getMessage());
   }
   finally
   {
       // Guaranteed cleanup: closes the stream even if processData threw an exception!
       if (scanner != null)
       {
           scanner.close();
       }
   }

The ``finally`` block is the standard location for releasing external operating
system resources, such as open file descriptors, database connections, or
network sockets.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/1XAfapkBQjk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Throwing Exceptions for Invalid Arguments
-----------------------------------------

In addition to catching exceptions generated by the JVM or standard library,
well-engineered software actively detects invalid conditions and **throws
exceptions explicitly**.

The `throw` Statement
~~~~~~~~~~~~~~~~~~~~~

You throw an exception using the ``throw`` keyword followed by an instantiated
exception object:

.. code-block:: java

   throw new IllegalArgumentException("Dimension must be positive: " + width);

When the ``throw`` statement executes:

1. Normal method execution halts immediately (analogous to an emergency
   ``return``).

2. The runtime begins unwinding the call stack until an enclosing ``try-catch``
   block matching the exception type is encountered.

3. If no matching handler exists on the call stack, the thread terminates and
   prints a stack trace to the console.

Defensive Parameter Validation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The most common use of explicit exception throwing is **defensive precondition
validation** in constructors and mutator methods. Rather than silently accepting
corrupt data or returning dummy error values (such as ``-1`` or ``null``),
methods immediately reject invalid arguments:

.. code-block:: java

   public class BankAccount
   {
       private double balance;

       public BankAccount(double initialBalance)
       {
           if (initialBalance < 0.0)
           {
               throw new IllegalArgumentException(
                   "Initial balance cannot be negative: " + initialBalance);
           }
           this.balance = initialBalance;
       }

       public void deposit(double amount)
       {
           if (amount <= 0.0)
           {
               throw new IllegalArgumentException(
                   "Deposit amount must be strictly positive: " + amount);
           }
           this.balance += amount;
       }
   }

Because ``IllegalArgumentException`` is an unchecked ``RuntimeException``, the
method headers **do not** require a ``throws`` clause. The compiler allows
unchecked exceptions to propagate cleanly.


Systematic Debugging & Defect Isolation with `TestCase`
-------------------------------------------------------

Software development is fundamentally an empirical discipline. Writing code is
only half the battle; locating, isolating, and repairing unexpected defects
underpins professional engineering.

The Four-Step Scientific Debugging Method
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Novice programmers often approach debugging through random trial and error:
making ad-hoc modifications and hoping tests turn green. Professional developers
employ a systematic, hypothesis-driven cycle:

1. **Reproduce**: Never attempt to fix a defect until you can reliably trigger it
   with an automated unit test. If a bug is intermittent or unobserved in code,
   you cannot verify whether a proposed fix truly resolved it.

2. **Isolate**: Formulate a hypothesis about the root cause. Inspect intermediate
   values, step through code with a debugger, or insert temporary logging to
   trace execution state until the exact line causing the incorrect calculation
   is identified.

3. **Repair**: Modify the source code to address the underlying root cause. Avoid
   band-aid patches that merely mask symptoms for specific test inputs.

4. **Verify Regression**: Re-run the entire automated test suite to confirm that
   the defect is eliminated and that no previously working features were broken
   (**regression testing**).

Floating-Point Tolerance Testing with `TestCase`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Java, floating-point numbers (``float`` and ``double``) are represented using
binary fractions according to the IEEE 754 standard. Because most decimal
fractions (such as 0.1) cannot be represented exactly in binary, floating-point
arithmetic introduces tiny rounding discrepancies:

.. code-block:: java

   double sum = 0.1 + 0.2;
   System.out.println(sum); // Prints: 0.30000000000000004
   System.out.println(sum == 0.3); // Prints: false!

In unit tests, evaluating floating-point calculations with direct equality
assertions (``assertEquals(0.3, sum)``) will fail unpredictably.

To test floating-point outcomes correctly, test classes extending ``TestCase``
use **tolerance assertions** that specify an acceptable margin of error
(often called **delta** or **epsilon**):

.. code-block:: java

   assertEquals(expected, actual, delta);

For example, to assert that a calculated physical dimension or weight matches
within 0.01 units:

.. code-block:: java

   assertEquals(15.75, calculatedVolume, 0.01);

This assertion evaluates whether $|expected - actual| \le 0.01$.

Testing That Exceptions Are Thrown
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When verifying defensive precondition checks, unit tests must confirm that
invalid arguments correctly trigger exceptions. In ``TestCase``, the canonical
idiom wraps the illegal invocation in a ``try`` block and fails if the exception
is not thrown:

.. code-block:: java

   public void testNegativeDepositThrowsException()
   {
       BankAccount account = new BankAccount(100.0);
       try
       {
           account.deposit(-25.0);
           fail("Expected IllegalArgumentException was not thrown for negative deposit");
       }
       catch (IllegalArgumentException e)
       {
           // Exception was successfully caught: the test passes!
           assertTrue(e.getMessage().contains("strictly positive"));
       }
   }

Notice the call to ``fail(...)``: if ``account.deposit(-25.0)`` fails to throw an
exception, execution proceeds to ``fail()``, marking the test as failed. If the
exception is correctly thrown, control skips directly to the ``catch`` block,
and the test passes.

Multi-Class Defect Diagnosis: The Container Analogy
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Consider a physical logistics system modeling cylindrical storage canisters and
freight containers:

.. code-block:: java

   public class Cylinder
   {
       private double radius;
       private double height;
       private double density;

       public Cylinder(double radius, double height, double density)
       {
           if (radius <= 0.0 || height <= 0.0 || density <= 0.0)
           {
               throw new IllegalArgumentException("Dimensions and density must be positive.");
           }
           this.radius = radius;
           this.height = height;
           this.density = density;
       }

       public double getVolume()
       {
           // Volume = pi * r^2 * h
           return Math.PI * Math.pow(this.radius, 2) * this.height;
       }

       public double getWeight()
       {
           return this.getVolume() * this.density;
       }
   }

Now consider a ``CargoContainer`` that holds a collection of cylinders:

.. code-block:: java

   public class CargoContainer
   {
       private double tareWeight; // Empty container weight
       private List<Cylinder> contents;

       public CargoContainer(double tareWeight)
       {
           this.tareWeight = tareWeight;
           this.contents = new ArrayList<Cylinder>();
       }

       public void addCylinder(Cylinder c)
       {
           this.contents.add(c);
       }

       public double getTotalWeight()
       {
           double total = this.tareWeight;
           for (Cylinder c : this.contents)
           {
               total += c.getWeight();
           }
           return total;
       }
   }

When a test for ``CargoContainer.getTotalWeight()`` fails, where is the bug?

* Is the defect in ``CargoContainer.getTotalWeight()``?
* Is the defect in ``Cylinder.getWeight()``?
* Is the defect in ``Cylinder.getVolume()``?
* Is the defect in the constructor initializing ``this.tareWeight``?

In multi-class systems, defects in a low-level component (such as an arithmetic
error in ``Cylinder.getVolume()``) ripple upward, causing failures in aggregate
calculations across higher-level classes.

**The Golden Rule of Defect Isolation**: Test lower-level foundation classes
thoroughly in complete isolation *before* testing classes that aggregate them.
Once ``CylinderTest`` verifies 100% correctness for volume, surface area, and
weight with tolerance assertions, any remaining failure in ``CargoContainer``
must reside within container-specific logic.

Maintaining 100% Statement and Condition Coverage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Professional software grading environments (such as Web-CAT) assess test suites
based on **code coverage**:

* **Statement Coverage**: The percentage of source code executable statements
  exercised by at least one test method.

* **Branch/Condition Coverage**: The percentage of conditional decision branches
  (both ``true`` and ``false`` outcomes of every ``if``, ``while``, and
  ``for`` condition) executed during testing.

Achieving 100% coverage requires designing tests for boundary conditions: zero
items, maximum capacity, exact thresholds, and illegal inputs that trigger
exception branches. By verifying both positive operational pathways and negative
defensive branches with automated unit tests, you guarantee software reliability
and architectural stability.


Programming Practice 14
-----------------------

.. extrtoolembed:: 'Programming Practice 14'
   :workout_id: 1613


.. raw:: html

   <footer style="border-top: 1px solid #777;"><div class="footer">
     Selected content adapted from:<br/>
     <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
     licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
     <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
     licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
   </div></footer>
