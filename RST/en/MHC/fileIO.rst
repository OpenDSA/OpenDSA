.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Input and Output
===================================

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
will produce a file called ``output.txt`` in your BlueJ project directory
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

.. .. raw:: html

..    <div class="align-center" style="margin-top:1em;">
..    <iframe width="560" height="315" src="https://www.youtube.com/embed/N7JAkNSTfAI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
..    </div>


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

.. raw:: html

   <footer style="border-top: 1px solid #777;"><div class="footer">
     Selected content adapted from:<br/>
     <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
     licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
     <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
     licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
   </div></footer>
