.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Variable Scoping, Input, Output, and Exceptions 
===============================================

Variable Scoping
----------------

Now that you have experience with fields, parameters, and variables in a
variety of situations, it is time to learn more about exactly where a
user-defined name can be accessed. The *scope* of a user-defined name is the region of
source code where the name is visible and can be used.


Local Scope
~~~~~~~~~~~

Recall that mutator methods (or "setters" as they're often called) are used to
change the values of private fields in a class.  For example:

.. code-block:: java

   public class Cat
   {
       private String color;

       // ...

       public void setColor(String newColor)
       {
            color = newColor;
       }
   }

This  ``setColor()`` method makes use of both a field and a parameter.
It is important to note that there is a difference in where these two types
of variables can be used. The **scope** of a variable or method refers to where
it can be used in a program.

A parameter’s scope is limited to the body of the method in which it is
declared.  Parameters are local variables
which are declared in the parameter list of a method’s header and which
have initial values specified by the arguments in a method call.  For example,
if we had an object of type ``Cat`` called ``c``, we could call
the ``setColor()`` method like so:

.. code-block:: java

   c.setColor("Black");

When we write the method, we declare the variable ``newColor``, and when we call
the method here,
we set ``s`` equal to the string "Black".  If we wanted to call the method
again, we would need to provide a new value for the variable ``newColor``.

.. code-block:: java

   c.setColor("Black");
   c.setColor("Grey");

Such values do not carry over between method calls.

The scope of a parameter is the
same as the scope of a variable declared at the
very beginning of the body of a method.   Once the flow of execution leaves a
method, its parameters and other local variables cease to exist. The scope
of local variables is referred to as **local scope**.

.. note:: Local Variables

    Local variables, that is, parameters and variables declared in the body of
    a method, have **local scope** which extends from the point at which they
    are defined to the end of the block of code in which they are defined. In
    particular, the scope of a parameter is the entire body of the method in
    which it is declared.

It would be a syntax error to refer to a method’s parameters or other local
variables from outside the method.


Block-Level Scope
~~~~~~~~~~~~~~~~~

Variables that are declared in the body of a method have scope
which extends from the point where they are declared to the end
of the **block** of code in which they are declared.  When a local variable
is declared at the beginning of a method, it has the local scope discussed
above.

However, local variables are not restricted to the beginning of a method, and
their declarations can be placed elsewhere, which can affect their scope.  When
control structures
like if-statements or loops are involved, scope can be a bit more specific.

.. code-block:: java

   public void exampleMethod(int x)
   {
       if (x % 2 == 0)
       {
           int value = 4;
       }
       value = value + 2; // This will not work!
   }

Variables declared inside the curly braces (``{}``) of a control structure
like a loop or conditional only exist within those curly braces.  The method
above would not work as the variable ``value`` is only declared and initialized
inside the if statement's true branch, and that variable ceases to exist when
the corresponding closing brace marking the end of the if statement's true
branch is reached. As a result, its name is no longer visible once execution
has left the block (the pair of braces) where it is declared. Any attempt to
use the variable outside of the braces where it is declared will result in a
compiler error, since the variable is no longer visible or accessible--no longer
"in scope".

The same is true for looping structures:

.. code-block:: java

   for (int i = 0; i < 12; i++)
   {
       System.out.println(i);
   }
   i = i + 1; // This will not work!

The variable ``i`` is defined as part of the for loop and its scope is the
body of the for loop--the braces surrounding the loop's body. The variable ``i``
ceases to exist after the for loop is finished.

To get around this issue, you will sometimes see code where a variable
is declared *before* a control structure, so that it can be accessed inside
the control structure and also after it.

.. code-block:: java

   public void exampleMethod(int x)
   {
       int value = 0;
       if (x % 2 == 0)
       {
           value = 4;
       }
       value = value + 2;
   }

We could also do something similar with a for loop:

.. code-block:: java

   int i = 0;
   for (i = 0; i < 12; i++)
   {
       System.out.println(i);
   }
   i = i + 1; // This will work!


Class Scope
~~~~~~~~~~~

By contrast, fields and all methods have scope that extends throughout the
entire class, that is, **class scope**. They
can be used in the body of any method and in the expressions that assign
initial values to class level variables.

.. note:: Class-Level Variables

    Fields and methods have class scope, which extends throughout the class.


A Common Misconception
~~~~~~~~~~~~~~~~~~~~~~

After declaring a variable it is tempting to use to both the variable name and
the variable's type whenever referring to it.  For example:

.. code-block:: java

    public class Cat
    {
        private String color;

        // ...

        public void setColor(String newColor)
        {
             String color = newColor;
        }
    }

This setter will **not** change the value of the field ``color``.  To Java,
whenever the type of a variable is included, you are declaring a variable.
Java will allow you to declare variables with the same name, as long as they
are in different scopes.
In the code above, there is a field called ``color`` with class-level
scope, *and* a local variable called ``color`` that only exists within
the ``setColor()`` method.

Even though these variables have the same name and type, they are different.
Changing one will not change the other.  Another common example of this can be
seen when testing.  Let's look at a hypothetical test file for our ``Cat`` class.

.. code-block:: java

    public class CatTest
        extends TestCase
    {
        private Cat testCat;

        public void setUp()
        {
            Cat testCat = new Cat();
        }

        public void test1()
        {
            testCat.setColor("White");
        }
    }

This is the same issue as we saw in the previous example.
There is a class-level ``Cat`` object declared as a field (``private Cat testCat;``).
But, instead of initializing the field inside ``setUp()``, we also
have a local variable being declared, also called ``testCat``.  This means
the field ``testCat`` will not be initialized, since the object created inside
``setUp()`` is being used to initialize the local variable inside that method,
which will cease to exist when the method ends.  When
we refer to the ``testCat`` variable in ``test1()``, we refer to the field,
which was never initialized and will therefore contain ``null``.  Thus, this
test will produce a ``NullPointerException``.

Fortunately, the problem is easily fixed.  Once a variable has been declared,
we only need to refer to it by the variable's name.

.. code-block:: java

    public class CatTest
        extends TestCase
    {
        private Cat testCat;

        public void setUp()
        {
            testCat = new Cat();
        }

        public void test1()
        {
            testCat.setColor("White"); // this won't work!
        }
    }

This code would run without error. The field ``testCat`` is still declared
outside any method, giving it a class-level scope.  But this time, it is
initialized in our ``setUp()`` method correctly, and ``setUp()``
runs before every test.  This means that in ``test1()``, ``testCat`` would
refer to a ``Cat`` object, not the value ``null``.


A Note on Naming
~~~~~~~~~~~~~~~~

As we saw above, Java can handle having two variables with the same name
and type when they are declared in different scopes.  This can also lead to
confusion.  For example, we could
have two String variables called ``color``.  One a field and one a parameter.

.. code-block:: java

    public class Cat
    {
        private String color;

        // ...

        public void setColor(String color)
        {
             color = color;
        }
    }

This code would compile but it is not advisable to use such naming conventions.
This is because it is not clear if the field ``color`` is being set to the
parameter ``color`` or vice-versa, or something else entirely.  Let's take a
look at what is happening here by adding a few print statements:


.. code-block:: java

    public class Cat
    {
        private String color;

        public Cat()
        {
            this.color = "Black";
        }

        public void setColor(String color)
        {
            color = color;
            System.out.println(this.color);
            System.out.println(color);
        }
    }

In this example, whenever we make a new ``Cat`` object, the value of the
field ``color`` is set to "Black" at first.  When we run ``setColor("Green")``
we see an interesting result in our print statements:

.. odsafig:: Images/ScopeCatOutput.png
   :align: center

The first thing to be printed out is ``this.color``.  Which we see is "Black".
The value of the field was not changed to "Green"! This means that when we write
``color = color`` we know that the field color was not on the left side of
the assignment operator.

One might assume, then, that the parameter ``color`` is the value on the left
side of the assignment operator.  This would mean that the parameter was changed
from "Green" to "Black". But our second print statement tells us otherwise.
When we print out the parameter ``color`` we see it is still "Green".  This
means that the field ``color`` was not on the right side of the equals
sign either!

What happened in this code is that we set the parameter variable ``color``
equal to itself--meaning nothing changed!

Generally, the best way to avoid such confusion is to give your variables
distinct names like we did initially:


.. code-block:: java

    public void setColor(String newColor)
    {
        color = newColor;
    }



Alternately, if for some reason you *must* use the same variable name at two
different scope levels, using the modifier ``this`` will help clarify which
variable you are referring to:

.. code-block:: java

    public void setColor(String color)
    {
        this.color = color;
    }

Now, the field ``color`` is on the left side of the assignment operator and the
parameter ``color`` is on the right.  So, if we ran ``setColor("Green");``
the field ``color`` would be changed from "Black" to "Green".

You will sometimes see this convention in setter methods or constructors,
where the programmer has intentionally used the same name for both the
parameter and the field, to communicate the intent that the parameter is
the value that will be stored in the field. When using this approach it
is mandatory to alway include ``this.`` as a prefix when referring to the
field name, because otherwise, all uses of the name would refer to the
parameter only.

Summarizing Scope Concepts
--------------------------

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/2nTjUAeD5WE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Check Your Understanding: Scope
-------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week12Quiz4Summ.html ka
   :long_name: Scope



Syntax Practice: Scoping
------------------------

.. extrtoolembed:: 'Syntax Practice: Scoping'
   :workout_id: 1572


Java Input and Output
---------------------

We have been using ``System.out.println()`` for a while, but you might not
have thought about what it means. ``System`` is a class that provides methods
related to the "system" or environment where programs run. It also provides
``System.out``, which is a special field that refers to an object providing
methods for displaying output, including ``println()``.
In fact, we can use ``System.out.println()`` to display the value
of ``System.out``:


.. code-block:: java

   System.out.println(System.out);

The result is:

.. code-block::

   java.io.PrintStream@685d72cd

This output indicates that ``System.out`` refers to a ``PrintStream`` object,
which is defined in a package called ``java.io``. A package is a collection of
related classes; ``java.io`` contains classes for "I/O" which stands for
*input and output*.


Basic Input and Output Concepts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Java provides an extensive library of classes for managing input and output of
all forms of data.  In Java, any source or destination for I/O is considered
a "stream" or sequence of bytes or characters. To perform output, we insert
bytes or characters into the stream. To perform input, we extract bytes or
characters from the stream.  Even characters entered at a keyboard (if we
think about them as a sequence of keystrokes) can be represented as a stream.

**Input** operations are framed in terms of reading from a stream in a
three-step process:

1. open the stream
2. read data items from the stream front to back in sequence
3. close the stream.

**Output** operations are framed in terms of writing to a stream in a
similar three-step process:

1. open the stream
2. write data onto the end of the stream in sequence
3. close the stream.

To use Java's input/output classes, make sure that in addition to importing
any other necessary packages, also import the ``java.io`` package and
the ``java.util`` package:

.. code-block:: java

   import java.io.*;
   import java.util.*;


Output Using PrintWriters
-------------------------

Opening a Stream for Output
~~~~~~~~~~~~~~~~~~~~~~~~~~~

In this class, we will only deal with textual, human-readable output. The main
class we will use for generating output is Java's ``PrintWriter`` class, from
the ``java.io`` package. To create a ``PrintWriter``, we'll use a utility
method in the ``IOHelper`` class from the VT student package
(``import student.*;``\ ):

.. code-block:: java

   PrintWriter outStream = IOHelper.createPrintWriter("output.txt");

This line declares a new variable, ``outStream`` and creates a new ``PrintWriter``
object that sends output to a brand new file in the file system. If a file with
the name already exists in the project directory it will be deleted before a new
empty file with the same name is created.

The ``PrintWriter`` object provides formatting and conversion operations.
A ``PrintWriter`` object is designed to send its output to a stream. It does
not know (or care) whether the stream is connected to a disk file or a network
connection or another device. The ``IOHelper`` class provides a few other
methods for creating ``PrintWriter`` objects, including methods that append to
an existing file instead of overwriting it, or streams that are connected to
the console for output.


Writing to an Output Stream
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Three basic methods provided by ``PrintWriter`` objects provide virtually all
of the output capabilities you will need in this course:

* ``<stream>.print(<value>);`` writes the specified <value> to the given
  <stream>. There are actually many versions of this method that support every
  possible type of <value> you might want to print.

* ``<stream>.println(<value>);`` writes the specified <value> to the given
  <stream>, and then follows it by writing a 'line terminator' to mark the end
  of the current line (Java writes an appropriate line termination character
  sequence based on the current operating system's text file format
  conventions). As with ``print()``, you can provide any type of value
  to ``println()``. You can even call ``println()`` without giving any argument
  at all, for example, to terminate the current line after several
  previous ``print()`` messages.

* ``<stream>.write(<value>);`` writes a single character specified by an
  integer <value>. This operation is most often used when you are producing
  output one character at a time, rather than in larger chunks. However, if
  you pass an entire ``String`` value to ``write()`` instead of an ``int``
  value, then the entire string will be written to the ``PrintWriter()`` just
  as if you had used ``print()``.

For example:

.. code-block:: java

   outStream.print("This is a message, and ");
   outStream.println("these words appear on the same line as those above");
   outStream.println(100 / 2);  // prints the value "50"
   outStream.write(65);         // writes the letter 'A', whose ASCII code is 65


Closing a Stream
~~~~~~~~~~~~~~~~

Once you have completed all of the operations you intend to carry out on a given
stream, the stream should be closed. Closing the stream frees up operating system
resources used to connect to and communicate with the stream, and makes sure that
any buffered data you have written to the stream is flushed out to the physical
device involved (if any).

Closing a stream is easy:

.. code-block:: java

   outStream.close();

You should close both input streams and output streams this way. In many simple
programs, a good rule of thumb is to make sure that the method that creates the
stream should also be the one responsible for closing it.


A Complete Output Example
~~~~~~~~~~~~~~~~~~~~~~~~~

We can put all these pieces together to show how to generate output to a file,
for example. Let's say we want to create a file called ``output.txt`` containing
some output from our program. We can do it in one method like this (don't
forget to import ``java.io.*`` in your class):

.. code-block:: java

   public void printResultFile(int result)
   {
       PrintWriter out = IOHelper.createPrintWriter("output.txt");
       out.println("This is the first line of output.");
       out.print("The result is: ");
       out.print(result);
       out.println();
       out.close();
   }

If called with a specific argument, like ``printResultFile(42);``, the method
will produce a file called ``output.txt`` in your project directory
containing these lines:

.. code-block:: java

   This is the first line of output.
   The result is: 42

At other times, when there is a lot of output to produce, you may want to place
all the ``println()`` calls in one or more other methods. Then you can pass a
``PrintWriter`` object as a parameter, as in this example:

.. code-block:: java

   public void printResultFile()
   {
       PrintWriter out = IOHelper.createPrintWriter("output.txt");
       printHeader(out);
       printData(out);
       out.close();
   }

   public void printHeader(PrintWriter outStream)
   {
       outStream.println("This is the output for ...");
       // other output commands go here.
   }

   public void printData(PrintWriter outStream)
   {
       outStream.print(/* ... */);
       // more, as needed ...
   }


Output with System.out
~~~~~~~~~~~~~~~~~~~~~~

It turns out that printing to the terminal is such a common action that Java
provides a pre-initialized output stream just for that purpose, called
``System.out``. The advantage of ``System.out`` is that it is already declared
and always ready for use, and your program is not responsible for closing it.
As a result, you can directly call ``print()``, ``println()``, or ``write()``
on ``System.out`` anywhere you like.

.. code-block:: java

   System.out.println("beginning the code ...");
   ...
   if (someCondition())
   {
       System.out.println("someCondition() is true");
       x = ...;
       System.out.println("x = " + x);
   }
   else
   {
       System.out.println("someCondition() is false");
       y = ...;
       System.out.println("y = " + y);
   }

Above, notice the way the plus operator (``+``) was used to combine a textual
string with another value to make a larger message. This is a nice feature of
Java--the plus operator works to "concatenate" two strings into a larger string
by placing one after the other. Further, when you concatenate a string with
any other type of value, the other value is converted into a human-readable
string representation first by calling its ``toString()`` method.

* As a result, here are some recommendations for output in this course:

* When you just want to produce simple messages in the terminal window to help
  debug a problem with your code, use ``System.out``.

* When you just want to interactively prompt the user for some value(s),
  use ``System.out``.

* When your program is supposed to produce a series of output lines in a file,
  use a ``PrintWriter``.

* When your program is supposed to produce a series of output lines that may
  go either to the terminal window or to a file, write one or more methods
  that use a ``PrintWriter`` provided as a parameter. You can always call such
  a method and provide it with a ``PrintWriter`` produced with a ``System.out``
  stream in order to produce output on the screen (see
  the ``IOHelper.createConsoleWriter()`` method). Alternatively, you can pass
  in a ``PrintWriter`` connected to a file instead (or even one connected to
  an internet socket for communicating with another program on another
  machine!).


Check Your Understanding: Output
--------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week12Quiz1Summ.html ka
   :long_name: Output


Input Using Scanners
--------------------

Opening a Stream for Input
~~~~~~~~~~~~~~~~~~~~~~~~~~

The main class we will use for reading input is Java's ``Scanner`` class, from
the ``java.io package``. Creating a ``Scanner`` is simple:

.. code-block:: java

   Scanner inStream = IOHelper.createScanner("input.txt");

This line declares a new name, ``inStream`` and creates a Scanner object that
reads characters from the named file. The ``createScanner()`` method opens
files using path names relative to your project directory, so the file
called ``input.txt`` should be located there.
You can provide a fully qualified path name instead of a relative path name
if you desire.

The ``java.io`` package offers a rich inheritance hierarchy of classes for
reading from text files. The ``Scanner`` class was created to simplify text
input and is thus preferred over the other classes.


Reading from an Input Stream
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Several methods provided by
`Scanner <https://docs.oracle.com/javase/8/docs/api/java/util/Scanner.html>`_
objects provide virtually all of the input capabilities you will need in
this course:

* ``<scanner>.hasNext();`` Returns ``true`` if this scanner has another
  token in its input.

* ``<scanner>.next();`` Finds and returns the next complete token
  (by default the next whitespace delimited string as a String object like
  the next line or next tab-seperated word) from this scanner.
  A ``NoSuchElementException``
  is thrown if no more tokens are available, (i.e., you have reached the end
  of input).

* ``<scanner>.hasNextLine();`` Returns ``true`` if this scanner has another
  line in its input.

* ``<scanner>.nextLine();`` Finds and returns the next complete line.
  A ``NoSuchElementException``
  is thrown if no more tokens are available, (i.e., you have reached the end
  of input).

* ``<scanner>.hasNext<PrimitiveType>();`` The ``<PrimitiveType>`` can be
  replaced by ``double``, ``float``, ``int``, etc. Returns ``true`` if this
  scanner has another token in its input and it can be interpreted as a value
  of the ``<PrimitiveType>``.

* ``<scanner>.next<PrimitiveType>();`` he ``<PrimitiveType>`` can be
  replaced by ``double``, ``float``, ``int``, etc.  The method scans the next
  token of the input as an ``<PrimitiveType>`` and returns back the
  corresponding ``<PrimitiveType>`` value. It throws an ``InputMismatchException``
  if the next token does not match the ``<PrimitiveType>``, or if the value
  scanned is out of range. It also throws
  a ``NoSuchElementException``
  if no more tokens are available.

* ``<scanner>.useDelimiter(String pattern);`` by default whitespace (spaces,
  tabs, or new line characters) are used as delimiters for separating the input
  into tokens to return. This method allows the user to set the delimiter characters
  to whatever they wish for breaking up the input.  Commas are a common other
  delimiter to use as tables or data is often stored in what are called CSV
  (comma seperated value) files.

* ``<scanner>.close();`` closes the scanner to release system resources being
  used by the scanner.

To use these methods, normally you will process the input by scanning one line
at a time and then scanning the line for the desired tokens.

For example:

.. code-block:: java

   Scanner inStream = IOHelper.createScanner("input.txt");
   // if NOT at the end of the stream, more input is available
   if (inStream.hasNextLine())
   {
       // Get an entire line
       String thisLine = inStream.nextLine();
       // Create a scanner to process the line
       Scanner line = new Scanner(thisLine);
       // Check for the next whitespace delimited int
       if (line.hasNextInt())
       {
           System.out.println(line.nextInt());
       }
   }
   inStream.close();

Notice how the existence of each input is checked before it is extracted to
avoid exceptions.

Also, if you have programmed in another language before, note that characters
in Java are encoded using unicode, a 16-bit character code. Programmers in
other languages may instead be familiar with ASCII, the
American Standard Code for Information Interchange, which is a 7-bit character
code. Fortunately, the first 128 codes in unicode are equivalent to the entire
`ASCII character set <https://www.asciitable.com/>`_ . For American users, ASCII
values may thus be freely used when reading and writing character-by-character
without error, although this approach does not directly extend to programs
written for an international audience.

The Scanner class can be used to read from any input stream, including files,
the keyboard through the terminal window, or even URLs. To read from the
keyboard, for example:

.. code-block:: java

   Scanner keyBoard = IOHelper.createKeyboardScanner();

   System.out.print("Enter your name: ");
   // Prompt the user String name = keyBoard.nextLine();
   System.out.println("Hello " + name); // Echo input

When performing interactive keyboard input there is no need to check for the
existence of the next token. The scanner will automatically block (i.e., wait)
for the user to enter input.

Scanners can also be used to read from a file that is publicly available on the
Web if you know the URL:

.. code-block:: java

   Scanner inWebFile = IOHelper.createScannerForURL(
       "http://server.subdomain.domain/dir/file.txt");
   while (inWebFile.hasNextLine())
   {
       String line = inWebFile.nextLine();
       System.out.println(line); // Echo input
   }
   inWebFile.close();

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/N7JAkNSTfAI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


A Complete Input Example
------------------------

We can put all these pieces together to show how to read input from a file one
character at a time, for example. Let's say we want to read the characters
from a file called ``input.txt``. We can do it in one method like this (don't
forget to ``import java.io.*`` and ``java.util.*`` in your class):

.. code-block:: java

   public void readChars()
   {
       Scanner in = IOHelper.createScanner("input.txt");
       // while NOT at the end of the stream, more input is available
       while (in.hasNextLine())
       {
           String thisLine = in.nextLine(); // Get an entire line
           for (int index = 0; index < thisLine.length(); index++)
           {
               char ch = thisLine.charAt(index);
               System.out.print(ch);
           }
           System.out.println();
       }
       in.close();
   }

At other times, when there is a lot of output to produce, you may want to place
all the ``read()`` calls in one or more other methods. Then you can pass a
``Scanner`` object as a parameter:

.. code-block:: java

   public void processInputFile()
   {
       Scanner in = IOHelper.createScanner("input.txt");
       readHeader(in);
       readData(in);
       in.close();
   }

   public void readHeader(Scanner inStream)
   {
       String nextLine = null;
       if (inStream.hasNextLine())
       {
           nextLine = inStream.nextLine();
           // other input commands go here.
       }
   }

   public void readData(Scanner inStream)
   {
       String nextLine = null;
       if (inStream.hasNext() )
       {
           nextLine = inStream.nextLine();
           // more, as needed ...
       }
   }


Check Your Understanding: Input
-------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week12Quiz2Summ.html ka
   :long_name: Input


A Complete Input/Output Example
-------------------------------

Often, it is necessary to combine the processes of reading from some source
and writing to some destination. Here is a simple example that copies an input
file character by character:

.. code-block:: java

   import cs1705.*;
   import java.io.*;
   import java.util.*;


   // -------------------------------------------------------------------------
   /**
    * Shows how to read/write a file one character at a time.
    * @author Dwight Barnette
    * @version 2006.03.09
    */
   public class CopyFileByLine
   {
       // ----------------------------------------------------------
       /**
        * Copy the source file to the specified destination file.
        * @param fromFile the name of the file to copy from
        * @param toFile the name of the file to copy to
        */
       public void copyFile(String fromFile, String toFile)
       {
           Scanner source = IOHelper.createScanner(inFile);
           PrintWriter dest = IOHelper.createPrintWriter(toFile);

           while (source.hasNextLine())
           {
               String thisLine = source.nextLine();
               for (int index = 0; index < thisLine.length(); index++)
               {
                   char ch = thisLine.charAt(index);
                   dest.print(ch);
               }
               dest.println();
           }
           source.close();
           dest.close();
       }
   }


Testing I/O-based Operations
----------------------------

When it comes to testing, remember to write one or more test cases for each
method that your write in your solution. Preferably, you should write these tests
before (or as) you write the method itself, rather than saving testing until
your code works. As you work on larger and larger programs, it is important to
build skills in convincing yourself that the parts you have already written
work as you intend, even if the full solution has not been completed.

For testing programs that read input or produce output, it seems difficult when
the program operates directly on the console, since it is hard to "assert" what
should come out on the screen. Plus you would always need to be present to
"type in" the required input sequence.

To make these tests fully automated, however, don't write tests that use
``System.out`` or that read from an external source. Instead, simply create a
``Scanner`` to read from a fixed input string as part of your test case.
For output, create a ``PrintWriter`` that can write to a String object instead of the console.

To make these tasks easy, the ``TestCase`` base class from which all your test
cases inherit provides a few helper methods for you:

* ``setIn(<contents>);`` takes a string and uses it to create a ``Scanner``
  for your test to use as input. The scanner gets cleared automatically
  before each test case, so you can call this in ``setUp()`` if you want to
  use the same input sequence for all your tests.

* ``in();`` returns the current ``Scanner`` being used for input. You can use
  this, in combination with ``setIn()`` to set up an input stream for your own
  input-based methods inside test cases. The scanner gets cleared automatically
  at the start of each test case.

* ``out();`` returns a ``PrintWriter`` that you can use for output.
  This ``PrintWriter`` captures all of its own output for later use in
  assertions, and its contents are reset before each test case.

As an example, consider the following test method (which assumes your text fixture
includes a ``doIt`` object created from some DoIt class that provides a
method called ``processSomeInput()`` that accepts a ``Scanner``  parameter):

.. code-block:: java

   public void testProcessSomeInput()
   {
       // set up the input stream
       setIn("some test input");

       // run the method to get results
       doIt.processSomeInput(in());

       // test that the result is what was expected
       assertThat( ... );
   }

Suppose there was a ``produceOutput()`` method that wrote to a ``PrintWriter``:

.. code-block:: java

   public void testProcessSomeInput()
   {
       // run the method to get results
       doIt.produceOutput(out());

       // test that the result is what was expected
       assertThat("what I expect").isEqualTo(out().getHistory());
   }

Finally, you can even deal with both input and output at the same time:

.. code-block:: java

   public void testProcessSomeInput()
   {
       setIn("some test input");

       // run the method to get results
       doIt.processSomeStuff(in(), out());

       // test that the result is what was expected
       assertThat("output I want").isEqualTo( out().getHistory()));
   }

The ``TestCase`` base class provides similar methods for setting ``System.in``
or retrieving the history from ``System.out``. See the javadoc for
`TestCase <https://courses.cs.vt.edu/~cs1114/api/student/TestCase.html>`_
for more details.


Check Your Understanding: Testing
---------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week12Quiz3Summ.html ka
   :long_name: Testing



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

In Eclipse, compile-time errors will show up as a red line under
the offending code, as well as being listed in the **Problems** tab
near the bottom of the main window.

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
