.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Static, Main, and Exceptions
============================

The Main Method
---------------

Traditionally, the first program you write when learning a new programming
language is called the hello world program. All it does is display the words
"Hello, World!" on the screen. In Java, it looks like this:

.. code-block:: java

   public class Hello {
      public static void main(String[] args) {
        // generate some simple output
        System.out.println("Hello, World!");
      }
   }

We know from previous modules that the only line in this method will print out
the phrase "Hello, World!"

This program defines one method named ``main``:

.. code-block:: java

   public static void main(String[] args)

The name and format of main is special: when the program runs, it starts at the
first statement in main and ends when it finishes the last statement.

The Hello World program is an example of a **Java application program**, or a
Java application for short,  An application program is a stand-alone program in
the sense that it does not depend on any other program to run.

Every Java application program must have a ``main()`` method (with exactly
that method signature) which is the place where the program begins when it is run.
For a program that contains many classes, it is up to the programmer which class should
contain the ``main()`` method.

As mentioned above, the method signature for this method is very specific.  This
is because of the very special role this method has in the program.  The method signature
must be *exactly*:

.. code-block:: java

   public static void main(String[] args)

Many of the keywords we see here you'll recognize.

* ``public`` means this method is accessible to other classes in the program.
* ``void`` means this method does not return anything.
* ``main`` is the name given to this method.
* ``String[] args`` means that this method takes in an array of Strings called ``args``.


The String array ``args`` is actually a feature that will allow a user to pass
String arguments to the program when it starts up.  For the most part, we won't
worry about making use of this array in this class.  However, it is still part of
the method signature and can't be considered a main method without it.

Check Your Understanding: Main Methods
--------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week14Quiz1Summ.html ka
   :long_name: Main Methods

The Static Keyword
------------------

In English, when we say something is *static* we mean it does not move or change.
This is the same in Java.  By contrast, a computer  program is *dynamic*.
It changes.  It does things and performs certain actions.

Once put into place, we know that anything with the
keyword **static** will mean that it will not change.  The static keyword means
the code will belong to a class, rather than a specific object.

Lets take a look at what we mean by that:

.. code-block:: java

   public class Ball{
    private String color;

    public Ball(){
      this.color = "Red";
    }

    public void setColor(String c){
      this.color = c;
    }

    public String getColor(){
      return this.color;
    }
   }

This code represents a "Ball" object.  When initialized, all ``Ball`` objects have their
``color`` field set to "Red", but a setter method has been provided so we could
change that to another color.  To access or change this field though, we need to
create a Ball object to work with.

.. code-block:: java

   Ball b1 = new Ball(); // creates a red Ball
   b1.setColor("Blue"); // changes the color to Blue
   System.out.println(b1.getColor()); //prints out the string "Blue"

Now, lets assume that all Ball objects we want to create need to have a diameter
of 15 centimeters.  This might be a good application for using the ``static`` keyword.

.. code-block:: java

   public class Ball{
    private String color;
    public static int diameter = 15;

The main advantage of using the static keyword is that we don't need to create an
object in order to access this variable.


.. code-block:: java

   System.out.println(Ball.diameter); //prints out the int 15

Similarly, if we had a class with a main method, we don't need to create an object
of that class to run the main:

.. code-block:: java

   public class Hello {
      public static void main(String[] args) {
        // generate some simple output
        System.out.println("Hello, World!");
      }
   }

Means we can run the following line of code.

.. code-block:: java

   Hello.main(new String[0]);


A Common Pitfall
~~~~~~~~~~~~~~~~

One thing to keep in mind is that methods that are static are in some ways seperate
to non-static methods.  Let's take a closer look at the Ball example.


.. code-block:: java

   public class Ball{
    private String color;
    public static int diameter = 15;

    public static void printData(){
      // This line will not work!
      String message = "This ball is " + color + " and has a diameter of "+ diameter + " cm" ;
      System.out.println(message);
    }

   }

The method ``printData`` is static.  It can be called without creating an object.
Because of this, we can not reference the variable ``color``.  More generally,
we cannot reference anything that isn't static in a static method.

It is common to make this mistake in the main method.  Lets take a look again at
a different implementation of the "Hello World" code:

.. code-block:: java

   public class Hello {

      public void print(){
        System.out.println("Hello, World!");
      }
      public static void main(String[] args) {
        // This will not work!
        print();
      }
   }

In this situation, the method ``print()`` is non-static.  It can not be called from
a static method!  There are two ways to get around this.  We could add the ``static``
keyword to the ``print()`` method.  This is the most simple solution, but
generally it is a good design practice to only use the static keyword when it is
strictly necessary.

Instead, we can create a new object of our ``Hello`` class inside our main method and
use that object to run the print method.

.. code-block:: java

   public class Hello {

      public void print(){
        System.out.println("Hello, World!");
      }
      public static void main(String[] args) {
        // This will work!
        Hello hObject = new Hello();
        hObject.print();
      }
   }

In short, be aware of what you reference when writing code in a static method!

Check Your Understanding: The Static Keyword
--------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week14Quiz2Summ.html ka
   :long_name: The Static Keyword


Errors
------

There are two major kinds of errors  can occur in a program: compile-time errors and run-time
errors. It is useful to distinguish among them in order to
track them down more quickly.

Compile-Time errors
~~~~~~~~~~~~~~~~~~~

Compile-time errors occur when you violate the syntax rules of the Java
language. For example, parentheses and braces have to come in matching
pairs. So ``(1 + 2);`` is legal, but ``8)`` is not. In the latter case, the
program cannot be compiled, and the compiler displays an error.

BlueJ has advanced some so some compile-time errors will show up as a red line under
the offending code before you even press "compile".

Error messages from the compiler usually indicate where in the program the
error occurred, and sometimes they can tell you exactly what the error is. As
an example, let’s get back to the hello world program:

.. code-block:: java

   public class Hello {
      public static void main(String[] args) {
        System.out.println("Hello, World!") // there's a missing semi-colon here!
      }
   }

If you forget the semicolon at the end of the print statement, you might get
an error message like this:

.. code-block:: java

   File: Hello.java [line: 5]
   Error: ';' expected

That’s pretty good: the location of the error is correct, and the error message
tells you what’s wrong.

But (as you have probably seen in this class) error messages are not always
easy to understand.  Sometimes the compiler
reports the place in the program where the error was detected, not where it
actually occurred. And sometimes the description of the problem is more
confusing than helpful.

.. code-block:: java

   public class Hello {
      public static void main(String[] args) {
        System.out.println("Hello, World!");
      //there's a missing curly brace here!
   }

You might get a message like this:

.. code-block:: java

   File: Hello.java [line: 7]
   Error:  reached end of file while parsing

There are two problems here. First, the error message is written from the
compiler’s point of view, not yours. **Parsing** is the process of reading a program
before translating; if the compiler gets to the end of the file while still parsing,
that means something was omitted. But the compiler doesn’t know what. It
also doesn’t know where. The compiler discovers the error at the end of the
program (line 7), but the missing brace should be on the previous line.

Error messages contain useful information, so you should make an effort to
read and understand them. But it can be important to know that they do not tell the
whole story.


Run-Time Errors
~~~~~~~~~~~~~~~

During the first few weeks of your programming career, you will probably spend
a lot of time tracking down compile-time errors (sometimes called syntax errors).
But as you gain experience, you will make fewer mistakes and find them more quickly.

The second type of error is a run-time error, so-called because it does not
appear until after the program has started running. In Java, these errors
occur while the interpreter is executing byte code and something goes wrong.
These errors are also called **exceptions** because they usually indicate that
something exceptional (and bad) has happened.

When a run-time
error occurs, the interpreter displays an error message that explains what
happened and where.
For example, if you accidentally divide by zero you will get a message like this:

.. code-block:: java

   Exception in thread "main" java.lang.ArithmeticException: / by zero at Hello.main(Hello.java:5)


Some parts of this output are useful for debugging. The first line includes
the name of the exception, java.lang.ArithmeticException, and a message
that indicates more specifically what happened, ``/ by zero``.

The next line shows the method where the error occurred;
Hello.main indicates the method
main in the class Hello. It also reports the file where the method is defined,
Hello.java, and the line number where the error occurred, 5.


Throwing Exceptions
-------------------


In Java, errors and other abnormal conditions are handled by **throwing** and **catching**
exceptions.  When an error or an exceptional condition is detected, you can *throw an exception*.
This is like pulling the fire alarm.

Lets assume we had a method that divided one parameter by the other:

.. code-block:: java

   public double div(double num, double denom){
      return num / denom;
   }

However, what if we couldn't guarantee that the variable ``denom`` was going to be
greater than 0?  We could add an if statement that will throw an exception if ``denom``
is equal to 0.

.. code-block:: java

   public double div(double num, double denom) throws Exception {
        if(denom == 0) {
            throw new Exception("Tried to divide by 0!");
        }

        return num / denom;
     }

Running ``div(1, 0)`` would cause the following text to be printed to the console:

.. code-block:: java

   java.lang.Exception: Tried to divide by 0!

Our message is what gets printed out.

Again, throwing an exception is like pulling a fire alarm. It brings everything to a halt.
Just like a return statement, when an Exception is thrown, the code will stop running
at that line.

We can see the syntax for creating a new Exception above.  ``throw`` is a keyword
in java for throwing exceptions.

You'll notice the syntax after the word ``throw`` looks a lot like how we create
objects.  That's because an Exception is a kind of object baked into Java.  In fact,
``Exception`` is a parent class with many different children class.  In this case,
it is perhaps more accurate to use a child class called ``IllegalArgumentException``


.. code-block:: java

   public double div(double num, double denom) throws IllegalArgumentException{
        if(denom == 0) {
            throw new IllegalArgumentException("Tried to divide by 0!");
        }
        return num / denom;
     }

This would produce the error message:

.. code-block:: java

   java.lang.IllegalArgumentException: Tried to divide by 0!


You'll also notice a change to the method signature.  There's additional text after
the parameter list but before the opening curly brace.  If there's a path where
an exception will be intentionally thrown, we need to add that to the method signature.
You won't be able to compile code without adding these lines to the method signature.

Check Your Understanding: Throwing Exceptions
---------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week14Quiz3Summ.html ka
   :long_name: Throwing Exceptions



Syntax Practice: Throwing Exceptions
------------------------------------

.. extrtoolembed:: 'Syntax Practice: Throwing Exceptions'
   :workout_id: 1614


Try/Catch Blocks
----------------

So far, we've seen how to throw errors intentionally.  However, what if we would like
code to fall back to some other case if an error is thrown?  Just as we can throw
an exception, we can **catch** one as well.  Lets revisit our example:

.. code-block:: java

   public double div(double num, double denom) throws IllegalArgumentException{
        if(denom == 0) {
            throw new IllegalArgumentException("Tried to divide by 0!");
        }
        return num / denom;
     }

    /**
    * divides two randomly generated numbers
    */
    public double divideRandom() {
        Random rand = new Random();
        double numerator = 5.5 * rand.nextInt(5);
        double denominator = 5.5 * rand.nextInt(5);

        double quotient = div(numerator, denominator);
        return quotient;
    }

Here, we generate two random doubles then run the ``div`` method.  However,
recall what we know about the code: ``rand.nextInt(5)``.  This code will generate a
random integer between 0 and 4.  This means there is a chance either variable could end up
being set to the result of ``5.5 * 0`` or 0.  Setting ``numerator`` to 0 is no big deal,
but if ``denominator`` is 0, we'll see that exception get thrown.

What if we want to gracefully get out of this potential problem without an error getting thrown?
We can employ a "try/except" block.

.. code-block:: java

    /**
    * divides two randomly generated numbers
    */
    public double divideRandom() {
         Random r = new Random();
         double numerator = 5.5 * r.nextInt(5);
         double denominator = 5.5 * r.nextInt(5);

         double quotient;
         try
         {
             quotient = div(numerator, denominator);
         }
         catch(IllegalArgumentException err) {
             quotient = div(numerator, 2.0);
         }
         return quotient;
     }

The handling of exceptions in Java takes place in two parts.  Furst we *try* to
execute some statements that may or may not lead to an exception.  These are enclosed
within the ``try`` clause.
The way that this code works is that the code in the ``try`` block is run.  If
an ``IllegalArgumentException`` is thrown, the catch block *catches* the exception
without causing the whole program to grind to a halt.  Instead, if that exception is thrown,
the variable ``quotient`` is assigned to the result of running ``div(numerator, 2.0)``.

.. code-block:: java

    try
    {
      quotient = div(numerator, denominator);
    }

Second, we provide one or more ``catch`` clauses to handle particular types of exceptions.
In this case, we are only handling one ``IllegalArgumentException``.

As we said earlier, throwing an exception is like pulling a fire alarm.  The throw
occurs somewhere within the scope of the ``try`` block.  The "fire department" in
this case is the code contained in the ``catch`` clause that immediately follows the ``try``.

Try/Catch/Finally Syntax
~~~~~~~~~~~~~~~~~~~~~~~~

A **try block** begins with the keyword ``try`` followed by a block of code enclosed
within curly braces.  A **catch clause** or **catch block** consists of the keyword
``catch`` followed by a parameter declaration that identifies the type of Exception
being caught, followed by a collection of statements enclosed within curly braces.
These are statements that handle the exception by taking appropriate actions.

Once an exception is thrown, control is transferred outisde of the ``try`` block to
an appropriate catch block.  Control does not return to the ``try`` block.

.. code-block:: java

    try
    {
      //block of statements at least one of which may throw an exception
    }
    catch(ExceptionClassName parameterName)
    {
      //block of statements to be executed if ExceptionClassName is thrown
    }
    catch(DifferentExceptionClassName otherParameterName)
    {
      //block of statements to be executed if DifferentExceptionClassName is thrown
    }

We can also add another optional clause that will run whether or not an exception
is thrown using the keyword ``finally``.

.. code-block:: java

    try
    {
      //block of statements at least one of which may throw an exception
    }
    catch(ExceptionClassName parameterName)
    {
      //block of statements to be executed if ExceptionClassName is thrown
    }
    catch(DifferentExceptionClassName otherParameterName)
    {
      //block of statements to be executed if DifferentExceptionClassName is thrown
    }
    finally
    {
      //optional block of statements that is executed
      //whether or not an exception is thrown
      //this code is always run
    }

Note that there can be multiple ``catch`` clauses associated with a given ``try``
block, and the order in which they are arranged is important.  A thrown exception
will be caught by the first catch that matches the type of exception thrown.  Therefore,
it is better to arrange catch clauses from the most specific to most general.


.. code-block:: java

    try
    {
      //block of statements at least one of which may throw an exception
    }
    catch(Exception exc)
    {
      // This will catch any possible exception thrown as Exception
      // is the general parent class.
    }
    catch(IllegalArgumentException illegal)
    {
      //This code is not reachable in this format.
    }

It is also important to remember that a ``try`` block must be immediately
followed by one or my catch clauses and a catch clause can only follow a try block.


Check Your Understanding: Try/Catch Blocks
---------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week14Quiz4Summ.html ka
   :long_name: Try/Catch Blocks


Syntax Practice: Try/Catch Blocks
---------------------------------


.. extrtoolembed:: 'Syntax Practice: Try/Catch Blocks'
   :workout_id: 1613



.. raw:: html

   <footer>
     <p>Content adapted from:</p>
     <p><a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
     licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).</p>
     <p><a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
     licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).</p>
     <p>
     Adapted by Stephen H. Edwards and Molly Domino.
     </p>
   </footer>
