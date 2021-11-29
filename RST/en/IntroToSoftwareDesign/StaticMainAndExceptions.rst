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

   public class HelloWorld
   {
       public static void main(String[] args)
       {
           // generate some simple output
           System.out.println("Hello, World!");
       }
   }

We know from previous modules that the single line of code inside this method
will print out the phrase "Hello, World!"

This program defines one method named ``main()`` with the following signature:

.. code-block:: java

   public static void main(String[] args)

A method declared with this exact signature is special: it can be used as
the entry point for executing a standalone Java program.
The ``HelloWorld`` program is an example of a **Java application program**, or
a Java application for short,  An application program is a stand-alone program
in the sense that it does not depend on any other program to run.
In Java, any class you write can contain its own stand-alone program, if
it provides its own declaration of a ``main()`` method with this special
signature.

Every Java application program must have a ``main()`` method (with exactly
that method signature) which is the place where the program begins
executing when it is run.
For a program that contains many classes, it is up to the programmer which
class should contain the ``main()`` method.
Further, when you "start" or "execute" a Java application, execution begins
with the ``main()`` method rather than by creating an object--it is then up
to ``main()`` to create all the objects needed by your program.

As mentioned above, the method signature for this method is very specific.  This
is because of the very special role this method has in the program.  The method
signature must be *exactly*:

.. code-block:: java

   public static void main(String[] args)

Many of the keywords we see here you'll recognize.

* ``public`` means this method is accessible to other classes in the program.
* ``void`` means this method does not return anything.
* ``main`` is the name given to this method.
* ``String[] args`` means that this method takes in an array of Strings
  called ``args``.

The String array ``args`` is actually a feature that will allow a user to pass
String arguments to the program when it starts up.  For the most part, we won't
worry about making use of this array in this class.  However, it is still part of
the method signature and can't be considered a main method without it.
When a Java program is executed in a stand-alone way using a command line,
the arguments given on the command line are used to populate this array, so
they are accessible inside ``main()``.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/P-_Nzi_mCRo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


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
keyword **static** will mean that it will not change.  The static keyword
is a modifier you can place on declarations within a class, and it means
that the corresponding declaration will belong to a class itself, rather than
a specific object (an instance of the class).

Lets take a look at what we mean by that:

.. code-block:: java

   public class Ball
   {
       private String color;

       public Ball()
       {
           this.color = "Red";
       }

       public void setColor(String newColor)
       {
           this.color = newColor;
       }

       public String getColor()
       {
           return this.color;
       }
   }

This code declares a ``Ball`` class.  When initialized, all ``Ball`` objects
have their ``color`` field set to "Red", but a setter method has been provided
so we could change that to another color. The field ``color`` "belongs" to the
object, since each individual instance of ``Ball`` has its own ``color`` field,
and each instance can store a different value in its own ``color`` field,
separate from all other ``Ball``\ s.
To access or change this field though, we need to create a ``Ball`` object to
work with.

.. code-block:: java

   Ball b1 = new Ball();               // creates a red Ball
   b1.setColor("Blue");                // changes the color to Blue
   System.out.println(b1.getColor());  // prints out the string "Blue"

Now, lets assume that all ``Ball`` objects we want to must have exactly the
same diameter--a diameter of 15 centimeters.  This might be a good application
for using the ``static`` keyword.

.. code-block:: java

   public class Ball
   {
       private String color;
       private static int diameter = 15;

       // ...
   }

The main reason to use the static keyword is when you want to define a common
property of the entire class, rather than just a single object. Here, because
``diameter`` is declared as ``static``, there is just one ``diameter`` field
stored in the class itself, and that single copy is shared by all objects
created from the class. Rather than each object storing its own diameter,
there is just one place where this value is stored--in the class itself.
The ``static`` modifier is used when you want a single resource (or method)
to be shared by all objects in the class.

Then, when accessing a static method or field, you talk about it differently
than regular fields that are stored within the object itself. For example,
consider a ``toString()`` method for the ``Ball`` class:

.. code-block:: java

   public String toString()
   {
       return this.color + " ball with diameter " + Ball.diameter;
   }

Here, when referring to the ``color`` field, we use ``this.color``, where
``this`` refers to the *current object*, which owns the field ``color``.
We are talking about the ``color`` value stored in the current object.
However, when referring to ``diameter``, it does not belong to the
current object, and instead belongs to the class. Therefore, we use
the class name before the dot (.) to refer to it: ``Ball.diameter``.

Similarly, if we had a class with a main method, we don't need to create an
object of that class to run the ``main()``, since ``main()`` is a method that
(because it is static) belongs to the class itself, rather than being invoked
on an individual object:

.. code-block:: java

   public class HelloWorld
   {
       public static void main(String[] args)
       {
           // generate some simple output
           System.out.println("Hello, World!");
       }
   }

With this declaration, we can call  the ``main()`` method without creating
an object of type ``HelloWorld``.

.. code-block:: java

   HelloWorld.main(null);

In short, methods or fields declared ``static`` belong to the class itself,
rather than to any object created from that class, and all objects created
from the class share the same copy of the ``static`` field(s) or method(s).
Also, when referring to static fields or methods, use the class name itself
followed by a dot (.), rather than using ``this``, since they belong to
the class rather than any instance of the class.


A Common Pitfall
~~~~~~~~~~~~~~~~

One thing to keep in mind is that methods that are static are in some ways
seperate from non-static methods.  Let's take a closer look at the ``Ball``
example.

.. code-block:: java

   public class Ball
   {
       private String color;
       private static int diameter = 15;

       public static void printData()
       {
           // This line will not work!
           String message = "This ball is " + color + " and has a diameter of "
               + diameter + " cm" ;
           System.out.println(message);
       }
   }

The method ``printData()`` is static.  It can be called without creating an
object.
Because of this, we can not reference the field ``color``, since that field
belongs to instances of ``Ball`` (and each ball has its own color).  More
generally, we cannot reference anything that isn't static in a static method.

It is common to make this mistake in the ``main()`` method.  Lets take a look
again at a different implementation of the "Hello World" code:

.. code-block:: java

   public class HelloWorld
   {
       public void print()
       {
           System.out.println("Hello, World!");
       }

       public static void main(String[] args)
       {
           // This will not work!
           print();
       }
   }

In this situation, the method ``print()`` is non-static--meaning you must have
an instance of the ``HelloWorld`` class to call the method on.  It cannot be
called from a static method!  There are two ways to get around this.  We could
add the ``static`` keyword to the ``print()`` method.  This is the simplest
solution, but generally it is a good design practice to only use the static
keyword when it is strictly necessary.

Instead, we can create a new object of our ``HelloWorld`` class inside our
``main()`` method and use that object to call the ``print()`` method.

.. code-block:: java

   public class Hello
   {
       public void print()
       {
           System.out.println("Hello, World!");
       }

       public static void main(String[] args)
       {
           // This will work!
           HelloWorld hObject = new HelloWorld();
           hObject.print();
       }
   }

In fact, this pattern is quite common in ``main()`` methods, where the whole
point of the ``main()`` method is to create the initial object(s) needed for
the program and to "start" them by calling one or more methods on them.

However, remember that static methods cannot call non-static methods without
also having an object that is an instance of the class available.
In short, be aware of what you reference when writing code in a static method!

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/wa1HzkMqY9A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Check Your Understanding: The Static Keyword
--------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week14Quiz2Summ.html ka
   :long_name: The Static Keyword


Errors
------

There are two major kinds of errors that can occur in a program:
compile-time errors and run-time errors. It is useful to distinguish among
them in order to track them down more quickly.


Compile-Time errors
~~~~~~~~~~~~~~~~~~~

Compile-time errors occur when you violate the syntax rules of the Java
language. For example, parentheses and braces have to come in matching
pairs. So ``int x = (1 + 2);`` is legal, but ``int x = 8);`` is not. In the
latter case, the program cannot be compiled, and the compiler displays an
error.

In BlueJ, compile-time errors will show up as a red line under
the offending code before you even press "compile".

Error messages from the compiler usually indicate where in the program the
error occurred, and sometimes they can tell you exactly what the error is. As
an example, let’s get back to the hello world program:

.. code-block:: java

   public class HelloWorld
   {
       public static void main(String[] args)
       {
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

   public class HelloWorld
   {
       public static void main(String[] args)
       {
           System.out.println("Hello, World!");
           // there's a missing curly brace here!
   }

You might get a message like this:

.. code-block:: java

   File: Hello.java [line: 7]
   Error:  reached end of file while parsing

There are two problems here. First, the error message is written from the
compiler’s point of view, not yours. **Parsing** is the process of reading a
program before translating; if the compiler gets to the end of the file while
still parsing, that means something was omitted. But the compiler doesn’t know
what. It also doesn’t know where. The compiler discovers the error at the end
of the program (line 7), but the missing brace should be on the previous line.

Error messages contain useful information, so you should make an effort to
read and understand them. But it can be important to know that they do not
tell the whole story.


Run-Time Errors
~~~~~~~~~~~~~~~

During the first few weeks of your programming career, you will probably spend
a lot of time tracking down compile-time errors (sometimes called syntax
errors). But as you gain experience, you will make fewer mistakes and find
them more quickly.

The second type of error is a run-time error, so-called because it does not
appear until after the program has started running. In Java, these errors
occur while the interpreter is executing byte code and something goes wrong.
These errors are also called **exceptions** because they usually indicate that
something exceptional (and bad) has happened.

When a run-time error occurs, the interpreter displays an error message
that explains what happened and where. For example, if you accidentally
divide by zero you will get a message like this:

.. raw:: html

   <pre>
   Exception in thread "main" java.lang.ArithmeticException: / by zero at HelloWorld.main(HelloWorld.java:5)
   </pre>

Some parts of this output are useful for debugging. The first line includes
the name of the exception, ``java.lang.ArithmeticException``, and a message
that indicates more specifically what happened, ``/ by zero``.

The next line shows the method where the error occurred;
``HelloWorld.main`` indicates the method
``main()`` in the class ``HelloWorld``. It also reports the file where the
method is defined, HelloWorld.java, and the line number where the error
occurred, 5.


Throwing Exceptions
-------------------

In Java, errors and other abnormal conditions are handled by **throwing**
and **catching** exceptions.  When an error or an exceptional condition is
detected, you can *throw an exception*.
This is like pulling the fire alarm.

Lets assume we had a method that divided one parameter by the other:

.. code-block:: java

   public double div(double num, double denom)
   {
       return num / denom;
   }

However, what if we couldn't guarantee that the variable ``denom`` was going
to be non-zero?  We could add an if statement that will throw an exception
if ``denom`` is equal to 0.

.. code-block:: java

   public double div(double num, double denom)
       throws Exception
   {
       if (denom == 0.0)
       {
           throw new Exception("Tried to divide by 0!");
       }

       return num / denom;
   }

Running ``div(1.0, 0.0)`` would cause the following text to be printed to
the console:

.. raw:: html

   <pre>
   java.lang.Exception: Tried to divide by 0!
   </pre>

Our message is what gets printed out.

Again, throwing an exception is like pulling a fire alarm. It brings
everything to a halt. Just like a return statement, when an ``Exception`` is
thrown, the code will stop running at that line.

We can see the syntax for creating a new ``Exception`` above.  ``throw`` is a
keyword in java for throwing exceptions.

You'll notice the syntax after the word ``throw`` looks a lot like how we
create objects--because that is exactly what it is doing.  An Exception is a
kind of object baked into Java.  In fact, ``Exception`` is a parent class with
many different subclasses.  In this case, it is perhaps more accurate to use
a child class called ``IllegalArgumentException``.

.. code-block:: java

   public double div(double num, double denom)
       throws IllegalArgumentException
   {
       if (denom == 0.0)
       {
           throw new IllegalArgumentException("Tried to divide by 0!");
       }
       return num / denom;
   }

This would produce the error message:

.. raw:: html

   <pre>
   java.lang.IllegalArgumentException: Tried to divide by 0!
   </pre>

You'll also notice a change to the method signature.  There's additional
text after the parameter list but before the opening curly brace.  If there's
a path where an exception will be intentionally thrown, we need to add that
to the method signature.  You won't be able to compile code without adding
these lines to the method signature, which indicate to the caller that an
exception might be thrown.


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

So far, we've seen how to throw errors intentionally.  However, what if we
would like code to fall back to some other case if an error is thrown?  Just
as we can throw an exception, we can **catch** one as well.  Let us revisit
our example:

.. code-block:: java

   public double div(double num, double denom)
       throws IllegalArgumentException
   {
       if (denom == 0.0)
       {
           throw new IllegalArgumentException("Tried to divide by 0!");
       }
       return num / denom;
   }

   /**
    * divides two randomly generated numbers
    */
   public double divideRandom()
   {
       Random rand = Random.generator();
       double numerator = 5.5 * rand.nextInt(5);
       double denominator = 5.5 * rand.nextInt(5);

       double quotient = div(numerator, denominator);
       return quotient;
   }

Here, we generate two random doubles then run the ``div`` method.  However,
recall what we know about the code: ``rand.nextInt(5)``.  This code will
generate a random integer between 0 and 4.  This means there is a chance
either variable could end up being set to the result of ``5.5 * 0`` or 0. 
Setting ``numerator`` to 0 is no big deal, but if ``denominator`` is 0, we'll
see that exception get thrown.

What if we want to gracefully get out of this potential problem without an
error getting thrown? We can employ a "try/catch" block.

.. code-block:: java

   /**
    * divides two randomly generated numbers
    */
   public double divideRandom()
   {
       Random r = Random.generator();
       double numerator = 5.5 * r.nextInt(5);
       double denominator = 5.5 * r.nextInt(5);

       double quotient = 0.0;
       try
       {
           quotient = div(numerator, denominator);
       }
       catch (IllegalArgumentException err)
       {
           quotient = div(numerator, 2.0);
       }
       return quotient;
   }

The handling of exceptions in Java takes place in two parts.  First we *try* to
execute some statements that may or may not lead to an exception.  These are
enclosed within the ``try`` clause.

.. code-block:: java

   try
   {
       quotient = div(numerator, denominator);
   }

Second, we provide one or more ``catch`` clauses to handle particular types
of exceptions that we expect *may* occur.
In this case, we are only handling one ``IllegalArgumentException``, so we
just provide one ``catch`` (although you could provide multiple if needed,
each for a different type of exception).

.. code-block:: java

   catch (IllegalArgumentException err)
   {
       quotient = div(numerator, 2.0);
   }

The way that this code works is that the code in the ``try`` block is run.
If it works fine, great--there is nothing extra to do. However, if
an ``IllegalArgumentException`` is thrown inside the ``try`` part, the catch
block *catches* the exception without causing the whole program to grind to a
halt.  Instead, if that exception is thrown, the variable ``quotient`` is
assigned to the result of running ``div(numerator, 2.0)``.

As we said earlier, throwing an exception is like pulling a fire alarm.
The ``throw`` occurs somewhere within the scope of the ``try`` block.  The
"fire department" in this case is the code contained in the ``catch`` clause
that immediately follows the ``try``.


Try/Catch/Finally Syntax
~~~~~~~~~~~~~~~~~~~~~~~~

A **try block** begins with the keyword ``try`` followed by a block of code
enclosed within curly braces.  A **catch clause** or **catch block** consists
of the keyword ``catch`` followed by a parameter declaration that identifies
the type of ``Exception`` being caught, followed by a collection of statements
enclosed within curly braces. These are statements that handle the exception by
taking appropriate actions. Because of this, ``catch`` clauses are also often
called *exception handlers*.

Once an exception is thrown, control is transferred outisde of the ``try``
block to an appropriate catch block.  Control does not return to the ``try``
block.

.. code-block:: java

   try
   {
       // block of statements at least one of which may throw an exception
   }
   catch (ExceptionClassName parameterName)
   {
       // block of statements to be executed if ExceptionClassName is thrown
   }
   catch (DifferentExceptionClassName otherParameterName)
   {
       // block of statements to be executed if DifferentExceptionClassName is thrown
   }

We can also add another optional clause that will run whether or not an
exception is thrown using the keyword ``finally``.

.. code-block:: java

   try
   {
       // block of statements at least one of which may throw an exception
   }
   catch (ExceptionClassName parameterName)
   {
       // block of statements to be executed if ExceptionClassName is thrown
   }
   catch (DifferentExceptionClassName otherParameterName)
   {
       // block of statements to be executed if DifferentExceptionClassName is thrown
   }
   finally
   {
       // optional block of statements that is executed
       // whether or not an exception is thrown
       // this code is always run
   }

After the code in the ``try`` is executed, and after any matching ``catch``
block is executed, the code inside the ``finally`` block will *always* be
run at the end. Even if an exception is thrown inside the ``try`` that does
not match any ``catch`` clause, the ``finally`` block will still be executed.

Note that there can be multiple ``catch`` clauses associated with a
given ``try`` block, and the order in which they are arranged is important.
A thrown exception will be caught by the first catch that matches the type of
exception thrown.  Therefore, it is better to arrange catch clauses from the
most specific to most general.

.. code-block:: java

   try
   {
       // block of statements at least one of which may throw an exception
   }
   catch (Exception exc)
   {
       // This will catch any possible exception thrown as Exception
       // is the general parent class.
   }
   catch (IllegalArgumentException illegal)
   {
       // This code is not reachable in this format.
   }

It is also important to remember that a ``try`` block must be immediately
followed by one or my catch clauses and a catch clause can only follow a try block.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/1XAfapkBQjk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Check Your Understanding: Try/Catch Blocks
---------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week14Quiz4Summ.html ka
   :long_name: Try/Catch Blocks


Syntax Practice: Try-Catch Blocks
---------------------------------

.. extrtoolembed:: 'Syntax Practice: Try-Catch Blocks'
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
