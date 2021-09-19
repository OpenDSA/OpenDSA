.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Week 5
======

Variables
---------

One of the most powerful features of a programming language is the ability to
define and manipulate variables. A **variable** is a named location that stores
a value. Values may be numbers, text, images, sounds, and other types of
data. To store a value, you first have to declare a variable.

.. code-block:: java

   int x;

Each variable has a type that determines what kind of values it can store.
This statement is a **declaration**, because it declares that the variable named
``x`` that is of type ``int``.

Note that ``x`` is an arbitrary name for the variable. In general, you should use
names that indicate what the variables mean. For example, if you saw these
declarations, you could probably guess what values would be stored:

.. code-block:: java

   int ageInYears;
   int studentID;

This example declares two variables with type int. When a variable name contains
more than one word, like ``ageInYears``, it is conventional to capitalize the
first letter of each word except the first, just like we do with methods.
Variable names are case-sensitive, so ``ageInYears`` is not the same as
``ageinyears`` or ``AgeInYears``.

You can use any name you want for a variable. But there are about 50 reserved
words, called keywords, that you are not allowed to use as variable names.
These words include public, class, static, void, and int, which are used
by the compiler to analyze the structure of the program.
You can find the complete list of keywords `here <http://docs.oracle.com/
javase/tutorial/java/nutsandbolts/_keywords.html>`_, but you don’t have
to memorize them. Most programming editors provide “syntax highlighting”,
which makes different parts of the program appear in different colors.

Variable Assignment
~~~~~~~~~~~~~~~~~~~

Now that we have declared variables, we want to use them to store values. We
do that with an assignment statement


.. code-block:: java

   int ageInYears = 29; // assign the value 29 to ageInYears
   int studentID = 1234; // set studentID to 1234

This example shows two assignments, and the comments illustrate different
ways people sometimes talk about assignment statements. The vocabulary
can be confusing here, but the idea is straightforward:

* When you declare a variable, you create a named storage location.

* When you make an assignment to a variable, you update its value.

As a general rule, a variable has to have the same type as the value you
assign to it. For example, you cannot store a string in minute or an integer
in message. We will see some examples that seem to break this rule, but we’ll
get to that later.

Variables must be initialized (assigned for the first time) before they can
be used. You can declare a variable and then assign a value later, like this:

.. code-block:: java

   int ageInYears;
   ageInYears = 29;

You can also declare and initialize on the same line:

.. code-block:: java

   int ageInYears = 29;


A note about the = sign
~~~~~~~~~~~~~~~~~~~~~~~

Lets take a look at the following code example:

.. code-block:: java

   int a = 5;
   int b = 7;
   a = b;

Because Java uses the ``=`` symbol for assignment, it is tempting to interpret the
statement ``a = b`` as a statement of equality. It is not!

Equality is commutative, and assignment is not. For example, in mathematics
if ``a = 7`` then ``7 = a``. In Java ``a = 7;`` is a legal assignment statement, but
``7 = a;`` is not. The left side of an assignment statement has to be a variable
name (storage location).

Also, in mathematics, a statement of equality is true for all time. If a = b
now, a is always equal to b. In Java, an assignment statement can make two
variables equal, but they don’t have to stay that way:

.. code-block:: java

   int a = 5;
   int b = a; //a and b are now equal
   a = 3;     //a and b are no longer equal!

The third line changes the value of a, but it does not change the value of b,
so they are no longer equal.  ``a`` now has a value of 3, while ``b`` has a
value of 5.


Arithmetic Operators
~~~~~~~~~~~~~~~~~~~~

Operators are symbols that represent simple computations. For example, the
addition operator is +, subtraction is -, multiplication is *, and division is /.

The following program converts a time of day to minutes:

.. code-block:: java

   int hour = 11;
   int minute = 59;
   int timeAsMinutes = hour * 60 + minutes;

In this program, ``hour * 60 + minute`` is an **expression**, which represents a
single value to be computed.  The values operators work with are called
**operands**.  When the program runs, each variable is replaced
by its current value, and then the operators are applied.

So even though you write ``hour * 60 + minute``, java will compute that as
``11 * 60 + 59`` and assign ``timeAsMinutes`` the value 719. Expressions are
generally a combination of numbers, variables, and operators. When complied and
executed, they become a single value.  It is also important to note that order
of operations applies in java just as it does in math. ``11 * 60`` will get
computed before ``59`` gets added.

While addition (+), subtraction (-), multiplication (*), and division(/) are all mathematical operators you can use in programming, java supports two more unary operators you may not have seen.  These are ``++`` and ``--``.  These add or subtract one

A note about ints and division.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Addition, subtraction, and multiplication all do what you expect, but you
might be surprised by division. For example, the following fragment tries to
compute the fraction of an hour that has elapsed:

.. code-block:: java

   int minute = 59;
   int fractionOfHour = minute / 60;

``fractionOfHour`` will actually be assigned the value 0 in this situation!
This result often confuses people. The value of minute is 59, and 59 divided
by 60 should be 0.98333, not 0. The problem is that Java performs “integer
division” when the operands are integers. By design, integer division always
rounds toward zero, even in cases like this one where the next integer is close.

As an alternative, we can calculate a percentage rather than a fraction:

.. code-block:: java

   int minute = 59;
   int fractionOfHour = (minute * 100) / 60;

Now, ``fractionOfHour`` is assigned to 98.  Again the result is rounded down,
but at least now it’s approximately correct.


A New Type: Doubles
~~~~~~~~~~~~~~~~~~~

While the examples above all make use of the data type ``int``, we can use
variables to store more than just integer values.

A more general solution for creating an accurate ``fractionOfHour`` variable is
to use a different type of data called a **double** (short double-precision)
which can represent fractions as well as integers.  You can create ``double``
variables and assign values to them using the same syntax we used for the other
types:

.. code-block:: java

   double pi;
   pi = 3.14159;

Java performs “floating-point division” when one or more operands are double
values. So we can solve the problem we saw in the previous section:

.. code-block:: java

   double minute = 59.0;
   double fractionOfHour = minute / 60;

Now, ``fractionOfHour`` is set to the value 0.9833333333333333.

Although floating-point numbers are useful, they can be a source of confusion.
For example, Java distinguishes the integer value 1 from the floating-point
value 1.0, even though they seem to be the same number. They belong to
different data types, and strictly speaking, you are not allowed to make
assignments between types.

The following is illegal because the variable on the left is an ``int`` and the value
on the right is a ``double``:

.. code-block:: java

   int x = 1.1; // compiler error

It is easy to forget this rule because in many cases Java automatically converts
from one type to another:

.. code-block:: java

   double y = 1; // legal, but bad style

The above example should be illegal, but Java allows it by converting the ``int``
value 1 to the double value 1.0 automatically. This leniency is convenient, but
it often causes problems for beginners. For example:

.. code-block:: java

   double y = 1 / 3; // common mistake

You might expect the variable y to get the value 0.333333, which is a legal
value for a double.  But instead it gets the value 0.0. The expression on the
right divides two integers, so Java does integer division, which yields the
``int`` value 0. Converted to double, the value assigned to ``y`` is 0.0.


Using Booleans as Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~

When working with conditions in the previous two modules, you may remember hearing a lot about the boolean values.  Unlike ``int``s or ``double``s, a boolean value can only be ``true`` or ``false``.

We use these when working with while loops or if statements like this:

.. code-block:: java

   if(this.hasFlower())
   {
    this.hop();
   }

In this code, if the jeroo has a flower, it will hop.  ``hasFlower()`` is a method that will resolve to ``true`` or ``false`` depending on if the jeroo has a flower.

We could store that boolean value as a parameter if we wanted like this:

.. code-block:: java

   boolean hasFlower = this.hasFlower();

Here we've declared a boolean variable, named it ``hasFlower`` and set it equal to the result of running the ``hasFlower()`` method.

If we wanted to, we could then use that variable in our conditional:

.. code-block:: java

   boolean hasFlower = this.hasFlower();
   if(hasFlower)
   {
    this.hop();
   }

This is another way to write the same if statement!


Additionally, we can assign a boolean variable to the result of a compound conditional:

.. code-block:: java

   boolean shouldToss = this.hasFlower() && this.seesNet(AHEAD);
   if(shouldToss)
   {
       this.toss();
   }

Remember above we declared and initialized an int variable that was the result of a mathmatical expression.  The same thing will happen here.  Java will resolve ``this.hasFlower() && this.seesNet(AHEAD)`` to either ``true`` or ``false``, then assign ``shouldToss`` to the result.

Finally, if you just need a boolean value, you can create a boolean variable by using the keywords ``true`` or ``false``.

.. code-block:: java

   boolean x = true;
   boolean y = false;

Using Fields in Testing
~~~~~~~~~~~~~~~~~~~~~~~

Last week, we worked on creating some simple test suites for a Jeroo.  You may remember needing to do a lot of set-up work at the start of each test to ensure the jeroo was exactly where you wanted it and with the right number of flowers.

However, what if you had several tests in a row that all required the same set up?  To help make testing a bit more streamlined, you can use a special method called ``setUp()``.  This method will run before each of your tests executes.  To be clear, that means that if you had 3 tests called ``test1``, ``test2``, and ``test3``, set up would run before ``test1`` executes AND before ``test2`` AND before ``test3``.

We can use fields with this setUp method to efficiently set up our testing environment.

For example if we had a simple Jeroo class like this:

.. code-block:: java

   public class SimpleJeroo extends Jeroo{
    private int age;
    private int idNumber;

    public SimpleJeroo(int a, int id){
      this.age = a;
      this.idNumber = id;
    }
   }

We could ensure that each test starts with a 5 year old jeroo with an id number of 4567 by creating a field and using our ``setUp()`` method.

.. code-block:: java

   public class SimpleJerooTest{
    private SimpleJeroo steve;

    public void setUp(){
      steve = new SimpleJeroo(5, 4567);
    }
   }

Then, because ``steve`` is a field, we could reference it in all of our tests.  Additionally, becauce ``steve`` is re-set to a new Jeroo object each time the ``setUp`` method is run, we never have to worry about the results of one test causing issues in another test.


Check Your Understanding: Variables
-----------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week5Quiz1Summ.html ka
   :long_name: Variables



Fields versus Local Variables
-----------------------------

Writing an object-oriented program is largely a matter of designing classes and
writing definitions for those classes in Java. Designing a class is a matter of
specifying all of the attributes and behaviors that are characteristic of that
type of object.

Up to this point we have been using the terms attribute and action to describe
an object’s features. However, when talking about a programming language,
the more common way to describe an object’s features are to talk about its
fields and methods.  **Fields** are a type of variable we define at the
beginning of a class that help us describe the qualities of a class.

For example, suppose we are writing a drawing program. One type of object we
would need for our program is a rectangle. A ``Rectangle`` object has two
fundamental fields, a ``length`` and a ``width``.  Given these fields, we can
define characteristic rectangle actions, such as the ability to calculate its
area and the ability to draw itself. Identifying an object’s fields and
actions is the kind of design activity that goes into developing an
object-oriented program.

.. odsafig:: Images/RectangleFields.png
   :align: center

The image above shows how we'd declare fields in our ``Rectangle`` class. Our
rectangle has four attributes. The first two, ``xCoord`` and ``yCoord``, determine
a rectangles position when we draw it.  Much like how we determine a jeroo's
position on an island.  The second two, ``length`` and ``width``, determine a
rectangle’s dimensions. Note that none of the attributes have values. This is
because the class represents a general type of rectangle. It specifies what all
rectangles have in common, without representing any particular rectangle. Like a
cookie cutter for a cookie, a class gives the general shape of an object. The
content is not included.

Notably, these fields also use the keyword ``private`` meaning they can only be
accessed and manipulated inside this class.  A field will have different values
for different instances.  For example, individual ``Rectangle``s will have
different values for their ``length``, ``width``, ``xCoord``, and ``yCoord``
variables.  For example, here are two different Rectangle objects we could make:


.. odsafig:: Images/RectangleObjects.png
   :align: center

To create two different ``Rectangle`` objects like this, we'll need a constructor that takes in 4 integers as parameters:

.. odsafig:: Images/RectangleConstructor.png
   :align: center

Then, if we wanted to call this constructor we could say:

.. code-block:: java

  Rectangle rectangle1 = new Rectangle(0, 0, 2, 5);

Which would set the coordinates to (0, 0), ``length`` to 2, and ``width`` to 5.


Changing Private Variables: Mutator Methods
-------------------------------------------

Recall that the fields of ``Rectangle`` are private.  We can access them from within the ``Rectangle`` class, but not outside.

.. code-block:: java

   public class Runner{
     public void myProgram(){
     Rectangle rectangle1 = new Rectangle(0, 0, 2, 5);
     rectangle1.length;
     }
   }


If length was a `public` field, we could access the value using the above syntax.
However, because it is private, the above code will cause an error.  This is a
convenient way to prevent fields from changing accidentally or when you don't want
them to.  Additionally if our ``Rectangle`` class ever changed, it's likely the
above coce would need to change too, making this ``Runner`` class *dependent* on
the ``Rectangle`` class.

On the other hand, it's possible this ``Runner`` class would need to access and maybe change fields in the ``Rectangle`` class.  Rather than make those fields public, one convention of object-oriented programming is to provide public methods to set and get the values of some of its private fields.

Methods that set or modify an object’s fields are called **mutator methods** or more colloquially as **getter** methods. Methods that get or retrieve the value of a field are called **accessor methods** or more colloquially as **setter** methods.

It is up to the designer of the class to determine which private variables require accessor and mutator methods. If you were designing a ``Bank Account`` class, you might want a public ``getAccountNumber`` method, so that clients could retrieve information about their bank accounts, but you would probably not want a public ``getAccountPassword``.

For our ``Rectangle`` example, lets say we wanted to let other classes change fields ``xCoord`` and ``yCoord`` to represent moving the Rectangle around the screen.  Mutator methods can be as simple as this:

.. code-block:: java

   public class Rectangle{
   //assume fields are here

    public void setXCoord(int xValue){
      this.xCoord = xValue;
    }
   }


It may be useful to remember the template that method signatures follow:

*Modifiers*:sub:`optional` *ReturnType*  *MethodName* ( *ParameterList*:sub:`optional`)

There are several observations we should make when looking at ``setXCoord``:


* This method is ``public`` because we want it to be accessible outside of the Rectangle class.
* Its return type is ``void`` because this method does not ``return`` anything.
* This method is named ``setXCoord``, which (in addition to following capitalization conventions) follows the convention of naming mutator methods ``set<field name>``.
* This method takes in an ``int`` parameter and sets ``xCoord`` to equal to this new value that ``xValue`` represents.

A Note on Scope
~~~~~~~~~~~~~~~

The bodies of the mutator methods make use of both fields and parameters. It is important to note that there is a difference in where these two types of variables can be used.  The **scope** of a variable or method refers to where it can be used in a program.

A parameter’s scope is limited to the body of the method in which it is
declared.

For example in the code below

.. code-block:: java

   public class Rectangle{
    private int length;

    public void setLength(int len){
      length = len;
    }
   }

In this code, the variable len could not be referenced outside of the ``setLength`` method.  It essentially does not exist outside of the ``{}`` that define the method.  However, the field ``length`` was declared outside of the method and can be accessed anywhere within the class.

Variables that are declared in the body of a method have scope
which extends from the point where they are declared to the end of the
block of code in which they are declared.

.. code-block:: java

   public void doMath(){
    int x = 4 + 9;
   }

In this code, ``x`` could not be referenced outside of the ``doMath()`` method.  In both of these situations, we'd say that the variables are "local" to the methods that use them.

Check your Understanding: Scope
-------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week5Quiz2Summ.html ka
   :long_name: Variables


Accessor Methods
----------------

Creating an accessor method is also relatively straightforward, though there is one twist we have not covered before.

.. code-block:: java

   public class Rectangle{
   //assume fields are here

    public int getXCoord(){
      return xCoord;
    }
   }

Again this method is public, and follows a the naming convention for accessor methods by being named ``get<field name>``.

What is different is the return type and this new ``return`` keyword, which we'll talk about in the next section.  For now, it's mostly important to note that the return type of the method **must** match the type of the field.  Thus, because ``xCoord`` is defined as an ``int``, this getter method must also have an ``int`` as a return type.


Check Your Understanding: Fields, Getters and Setters
--------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week5Quiz3Summ.html ka
   :long_name: Variables


The Return Keyword
------------------

Outside of methods with a return type of ``void``, all other methods you will write in java will specify a return type and then return a value of that type.

Compared to void methods, these methods differ in two ways:

* They declare the type of the return value (the **return type**).
* They use at least one ``return`` statement to provide a *return value**.

For example if you were to write the method:

.. code-block:: java

   public boolean isRaining(){

   }

You would see a syntax error come up saying "Missing Return Statement".
To fix this issue, we need to return something.


.. code-block:: java

   public boolean isRaining(){
    return false;
   }

The type of the expression in the return statement must match the return
type of the method. When you declare that the return type is double, you are
making a promise that this method will eventually produce a double value. If you try to return with no expression, or an expression with the wrong type,
the compiler will generate an error.


Doubling back to Accessor Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Writing an accessor method for a field *needs* to have a return type because all fields have a type.

.. code-block:: java

   public class Rectangle{
    private int length;

    public Rectangle(){
      length = 4;
    }

    public int getLength(){
      return length;
    }
   }

In this situation our ``length`` field is of type ``int``, therefore our accessor method for that field needs to also return an ``int``.


Writing more Complex Methods with Return
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sometimes it is useful to have multiple return statements, for example, one in
each branch of a conditional:

.. code-block:: java

   public double absoluteValue(double x) {
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
executed. As soon as either of them executes, the method terminates without
executing any more statements.

Here’s an example: ``calculateArea`` takes a double as a parameter and returns
the area of a circle with that radius:

.. code-block:: java

   public double calculateArea(double radius) {
      double result = 3.14 * radius * radius;
      return result;
   }

This last line is a return statement.  This statement means, "exit immediately from this method and use the following expression as the return value."

The expression you provide can be arbitrarily complex, so we could have written this method more concisely:

.. code-block:: java

   public double calculateArea(double radius) {
      return 3.14 * radius * radius;
   }

Code that appears after a return statement (in the same block), or any place
else where it can never be executed, is called **dead code**. The compiler will
give you an "unreachable statement" error if part of your code is dead. For
example, this method contains dead code:


.. code-block:: java

   public double absoluteValue(double x) {
      if (x < 0)
      {
         return -x;
      }
      else
      {
         return x;
      }
      x = 5;
    }

That last line, ``x = 5`` would never run as a value would always be returned before that line could execute.

If you put return statements inside a conditional statement, you have to
make sure that every possible path through the program reaches a return
statement. The compiler will let you know if that’s not the case. For example, the following method is incomplete:


.. code-block:: java

   public double absoluteValue(double x) {
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


Using the Results of a Method
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you invoke a void method, the invocation is usually on a line all by
itself. For example here is a simple hop and pick method for Jeroos.

.. code-block:: java

   public void hopAndPick() {
      this.hop();
      this.pick();
   }

And here is how it is called:

.. code-block:: java

   this.hopAndPick();

On the other hand, when you invoke a method with a return type, you have to do something with the return value. We usually assign it to a variable or use it as part of an expression.

Take for example this method:

.. code-block:: java

   public int squared(int x) {
    return x * x;
   }

This method would take in some number ``x``, and return the value of that number raised to the power of 2.

We could then call the method *and* instantiate a new variable to save the result by running

.. code-block:: java

   int base = 3;
   int raised = squared(base);

In this situation, ``raised`` is set to the value 9 (the result of doing 3 * 3).

Additionally, we can use the results of methods as parameters for other method calls:

.. code-block:: java

   int base = 3;
   int raised = squared(base);
   int raisedAgain = squared(squared(base));

This new variable ``raisedAgain`` will be set equal to 81.  This is because the nested method call will retun the value 9, which will immediately get sent back to the ``squared`` method to run ``9 * 9``.

This might remind you of working with functions in algebra classes.  In those classes, we might see this same idea written out as:

Assume
f(x) = x * x
What is the value of f(3)?
What is the value of f(f(3))?

Java uses this same principle, though with many different types of data, things can get a bit more complex.

Check your Understanding: Typed Methods and Return Statements
-------------------------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week5Quiz4Summ.html ka
   :long_name: Variables




Syntax ideas
------------


Practice Ideas:
---------------


Question 1
If you are given three sticks, you may or may not be able to
arrange them in a triangle. For example, if one of the sticks is 12 inches long
and the other two are one inch long, you will not be able to get the short sticks
to meet in the middle. For any three lengths, there is a simple test to see if it
is possible to form a triangle:
If any of the three lengths is greater than the sum of the other two,
you cannot form a triangle.
Write a method named isTriangle that takes three integers as arguments
and returns either true or false, depending on whether you can or cannot
form a triangle from sticks with the given lengths.
