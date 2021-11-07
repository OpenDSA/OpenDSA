.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Java I/O
========


We have been using ``System.out.println`` for a while, but you might not
have thought about what it means. ``System`` is a class that provides methods
related to the "system" or environment where programs run. It also provides
``System.out``, which is a special value that provides methods for displaying
output, including ``println``.
In fact, we can use ``System.out.println`` to display the value of ``System.out``:


.. code-block:: java

   System.out.println(System.out);


The result is:

.. code-block::

   java.io.PrintStream@685d72cd

This output indicates that ``System.out`` is a ``PrintStream``, which is defined in a
package called ``java.io``. A package is a collection of related classes; ``java.io``
contains classes for "I/O" which stands for input and output.



Note
raw html footer section attributions

Basic Input and Output Concepts
--------------------------------

Java provides an extensive library of classes for managing input and output of
all forms of data.  In Java, any source or destination for I/O is considered
a stream of bytes or characters. To perform output, we insert bytes or
characters into the stream. To perform input, we extract bytes or characters
from the stream.  Even characters entered at a keyboard (if we think about them
as a sequence of keystrokes) can be represented as a stream.

**Input** operations are framed in terms of reading from a stream in a three-step
process:

1. open the stream
2. read data items from the stream front to back in sequence
3. close the stream.

**Output** operations are framed in terms of writing to a stream in a three-step
process:

1. open the stream
2. write data onto the end of the stream in sequence
3. close the stream.

To use Java's input/output classes, make sure that in addition to importing any
other necessary packages, also import the ``java.io`` package and the ``java.util``
package:

.. code-block:: java

   import java.io.*;
   import java.util.*;

Opening a Stream for Output
---------------------------

In this class, we will only deal with textual, human-readable output. The main
class we will use for generating output is Java's ``PrintWriter`` class, from
the ``java.io package``. To create a ``PrintWriter``, we'll use a utility
method in the ``IOHelper`` class from the VT student package:
( ``import student.*;`` )


.. code-block:: java

   PrintWriter outStream = IOHelper.createPrintWriter("output.txt");

This line declares a new variable, ``outStream`` and creates a new ``PrintWriter``
object that sends output to a brand new file in the file system. If a file with
the name already exists in the project directory it will be deleted before a new
empty file with the same name is created.

The ``PrintWriter`` object provides formatting and conversion operations.
A ``PrintWriter`` object is designed to send its output to a stream. It does not
know (or care) whether the stream is connected to a disk file or a network
connection or other device. The ``IOHelper`` class provides a few other methods
for creating ``PrintWriter`` objects, including methods that append to an existing
file instead of overwriting it, or streams that are connected to the console for
output.


Writing to an Output Stream
---------------------------

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
----------------

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

Also, note that in some cases, ``close()`` may cause an error. If you write a
call to ``close()`` and the compiler complains about a possible ``IOException``,
refer to the section on "Dealing with Exceptions" below.


A Complete Output Example
-------------------------

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

If called with a specific argument, like ``printResultFile(42);``, the method will
produce a file called ``output.txt`` in your BlueJ project directory containing
these lines:

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
----------------------

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

Above, notice the way the plus operator (``+``) was used to combine a textual string
with another value to make a larger message. This is a nice feature of Java--the
plus operator works to "concatenate" two strings into a larger string by placing
one after the other. Further, when you concatenate a string with any other value,
the other value is converted into a human-readable string representation first.

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

Opening a Stream for Input
--------------------------

The main class we will use for reading input is Java's ``Scanner`` class, from the
``java.io package``, (the ``Scanner`` class is a new util class that was added
to Java 1.5). Creating a ``Scanner`` is simple:

.. code-block:: java

   Scanner inStream = IOHelper.createScanner("input.txt");

This line declares a new name, ``inStream`` and creates a Scanner object that
reads characters from the file. The ``createScanner()`` method opens files using
path names relative to your project directory, so the file called ``input.txt``
should be located there.
You can provide a fully qualified path name instead of a relative path name if
you desire.

The ``java.io`` package offers a rich inheritance hierarchy of classes for reading
from text files. The ``Scanner`` class was added to simplify text input and is thus
preferred over the other classes.

Reading from an Input Stream
----------------------------

Several methods provided by
`Scanner <https://docs.oracle.com/javase/1.5.0/docs/api/index.html>`_
objects provide virtually all of the input capabilities you will need in
this course:

* ``<scanner>.hasNext();`` Returns ``true`` if this scanner has another
  token in its input.

* ``<scanner>.next();`` Finds and returns the next complete token
  (by default the next whitespace delimited string as a String object like
  the next line or next tab-seperated word) from this scanner.
  A `NoSuchElementException <https://docs.oracle.com/javase/1.5.0/docs/api/java/util/NoSuchElementException.html>`_
  is thrown if no more tokens are available, (i.e., you have reached the end
  of input).

* ``<scanner>.hasNextLine();`` Returns ``true`` if this scanner has another
  line in its input.

* ``<scanner>.nextLine();`` Finds and returns the next complete line.
  A `NoSuchElementException <https://docs.oracle.com/javase/1.5.0/docs/api/java/util/NoSuchElementException.html>`_
  is thrown if no more tokens are available, (i.e., you have reached the end
  of input).

* ``<scanner>.hasNext<PrimitiveType>();`` The ``<PrimitiveType>`` can be
  replaced by ``double``, ``float``, ``int``, etc. Returns ``true`` if this
  scanner has another token in its input and it can be interpreted as a value
  of the ``<PrimitiveType>``.

* ``<scanner>.next<PrimitiveType>();`` he ``<PrimitiveType>`` can be
  replaced by ``double``, ``float``, ``int``, etc.  The method scans the next
  token of the input as an ``<PrimitiveType>`` and returns back the
  corresponding ``<PrimitiveType>`` value. It throws an `InputMismatchException <https://docs.oracle.com/javase/1.5.0/docs/api/java/util/InputMismatchException.html>`_
  if the next token does not match the ``<PrimitiveType>``, or if the value
  scanned is out of range. It also throws
  a `NoSuchElementException <https://docs.oracle.com/javase/1.5.0/docs/api/java/util/NoSuchElementException.html>`_
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
   if (inStream.hasNextLine()) // NOT at the end of the stream, more input is available
   {
       String thisLine = inStream.nextLine(); // Get an entire line
       Scanner line = new Scanner(thisLine); // Create a scanner to process the line
       if (line.hasNextInt()) // Check for the next whitespace delimited int
       {
           System.out.println(line.nextInt());
       }
   }
   inStream.close();

Notice how the existence of each input is checked before it is extracted to
avoid exceptions.

Also, if you have programmed in another language before, note that characters
in Java are encoded using unicode, a 16-bit character code. Programmers in other
languages are probably more familiar with ASCII, the
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

   Scanner inWebFile = IOHelper.createScannerForURL( "http://server.subdomain.domain/dir/file.txt");
   while (inWebFile.hasNextLine())
   {
       String line = inWebFile.nextLine();
       System.out.println(line); // Echo input
   }
   inWebFile.close();


Check Your Understanding: Input
-------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week12Quiz2Summ.html ka
   :long_name: Input


A Complete Input Example
------------------------

We can put all these pieces together to show how to read input from a file one
character at a time, for example. Let's say we want to read the characters from a
file called ``input.txt``. We can do it in one method like this (don't forget to
``import java.io.*`` and ``java.util.*`` in your class):

.. code-block:: java

   public void readChars()
   {
       Scanner in = IOHelper.createScanner("input.txt");
       while (in.hasNextLine()) // NOT at the end of the stream, more input is available
       {
           String thisLine = in.nextLine(); // Get an entire line
           for (int index=0; index < thisLine.length(); index++)
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


A Complete Input/Output Example
-------------------------------

Often, it is necessary to combine the processes of reading from some source and
writing to some destination. Here is a simple example that copies an input file
character by character:

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
       assertEquals("output I want", out().getHistory());
   }

The ``TestCase`` base class provides similar methods for setting ``System.in``
or retrieving the history from ``System.out``. See the javadoc for
`TestCase <https://courses.cs.vt.edu/~cs1114/api/student/TestCase.html>`_
for more details.


Check Your Understanding: Testing
---------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week12Quiz3Summ.html ka
   :long_name: Testing


.. raw:: html

   <footer>
     <p>Content adapted from </p>
     <p><a href="http://www.cs.trincoll.edu/~ram/jjj/jjj-os-20170625.pdf">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde</p>
       <p><a href="http://www.cs.trincoll.edu/~ram/jjj/jjj-os-20170625.pdf">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield</p>
     <p>
       Adapted by Stephen H. Edwards and Molly Domino
     </p>
   </footer>
