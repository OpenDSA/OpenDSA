Section 1: Getting Your Environment Set Up
******************************************


Section 2: Basic Vocabulary
***************************

In this section we will introduce some of the key elements of the Java language by describing the details of a small program.  We will look at how a program is organized and what the various parts do. Our intent is to introduce important language elements, many of which will be explained in greater detail in later sections.
The program we will study is a Java version of the traditional :code:`Hello, World` program-- 'traditional' because practically every introductory programming text begins with it.
When it is run, the :code:`HelloWorld` program below just displays the greeting :code:`Hello, World` on the console.

.. literalinclude:: JavaFiles/GettingStarted/HelloWorld.java
  :linenos:
  :language: java
  :lines: 1-19


Comments
^^^^^^^^

The first thing to notice about the :code:`HelloWorld` program is the use of comments. A **comment** is a non-executable portion of a program that is used to document the program. Because comments are not executable instructions they are just ignored by the compiler. Their sole purpose is to make the program easier for the programmer to read.

The :code:`HelloWorld` program contains examples of two types of Java comments.  Any text contained within :code:`/*` and :code:`*/` is considered a comment.  As you can see in :code:`HelloWorld`, this kind of comment can extend over several lines and is sometimes called a *multiline* comment.  A second type of comment is any text that follows double slashes (:code`//`) on a line.  This is known as a *single-line comment* because it cannot extend beyond a single line.

When the compiler encounters the beginning marker (:code:`/*`) of a multiline comment, it skips over everything until it finds a matching end marker (:code:`*/`).  One implication of this is that it is not possible to put one multiline comment inside of another. That is, one comment cannot be *nested*, or contained, within another comment. The following code

.. literalinclude:: JavaFiles/GettingStarted/Comments.java
  :linenos:
  :language: java
  :lines: 1-11

As you can see from this example, it is impossible to begin a new comment inside an already-started comment because all text inside the first comment, including :code:`/*`, is ignored by the compiler.

.. sidebar:: Java Rule
    :subtitle: Comments
    Any text contained within :code:`/*` and */, which may span several lines, is considered a comment and is ignored by the compiler.  Inserting double slashes (//) into a line turns the rest of the line into a comment.

Multiline comments are often used to create a **comment block** that provides useful documentation for the program. In :code:`HelloWorld`, the program begins with a comment block that identifies the name of file that contains the program and its author and provides a brief description of what the program does.

For single-line comments, double slashes (//) can be inserted anywhere on a line of code. The result is that the rest of the line is ignored by the compiler.  We use single-line comments throughout the :code:`HelloWorld` program to provide a running commentary of its language elements.

.. sidebar:: Programming Tip
    :subtitle: Use of Comments
    A well-written program should begin with a comment block that provides the name of the program, its author, and a description of what the program does.


Program layout
^^^^^^^^^^^^^^

Another thing to notice about the program is how neatly it is arranged on the page. This is done deliberately so that the program is easy to read and understand. In Java, program expressions and statements may be arranged any way the programmer likes. They may occur one per line, several per line, or one per several lines.  But the fact that the rules governing the layout of the program are so lax makes it all the more important that we adopt a good programming style, one that will help make programs easy to read.

So look at how things are presented in :code:`HelloWorld`. Notice how beginning and ending braces, { and }, are aligned, and note how we use single-line comments to annotate ending braces. Braces are used to mark the beginning and end of different blocks of code in a Java program and it can sometimes be difficult to know which beginning and end braces are matched up. Proper indentation and the use of single-line comments make it easier to determine how the braces are matched up.

Similarly, notice how indentation is used to show when one element of the program is contained within another element. Thus, the elements of the :code:`HelloWorld` class are indented inside of the braces that mark the beginning and end of the class. And the statements in the {\tt main()} method are indented to indicate that they belong to that method.  Use of indentation in this way, to identify the program's structure, makes the program easier to read and understand.

.. sidebar:: Programming Tip
    :subtitle: Use of Indentation
    A well-written program should begin with a comment block that provides the name of the program, its author, and a description of what the program does.


Keywords and Identifiers
^^^^^^^^^^^^^^^^^^^^^^^^

The Java language contains 48 predefined {\it keywords} (Table~\ref{tab:keywords}).
These are words that have special meaning in the language and whose
use is reserved for special purposes. For example, the keywords used
in the :code:`HelloWorld` program are: :code:`class`, :code:`extends`, :code:`private`, :code:`public`, :code:`static`, and :code:`void`.


.. list-table:: Keywords in Java
   :widths: 25 25 50
   :header-rows: 0

   * - boolean
     - do
     - if
     - private
     - throw
   * - break
     - double
     - implements
     - protected
     - throws
   * - byte
     - enum
     - import
     - public
     - transient
   * - case
     - elses
     - instanceof
     - return
     - try
   * - catch
     - extend
     - int
     - short
     - void
   * - char
     - final
     - interface
     - static
     - volatile
   * - class
     - finally
     - long
     - super
     - while
   * - const
     - float
     - native
     - switch
     -
   * - continue
     - for
     - new
     - synchronized
     -

Because their use is restricted, keywords cannot be used as the names of methods, variables, or classes.  However, the programmer can make up his or her own names for the classes, methods, and variables that occur in the program, provided that certain rules and conventions are followed.
The names for classes, methods, and variables are called identifiers, which follow certain syntax rules:

.. sidebar:: Java Rule
    :subtitle: Identifiers
    An **identifier** must begin with a capital or lowercase letter and may be followed by any number of letters, digits, underscores (_), or dollar signs ($). An identifier may not be identical to a Java keyword.

Names in Java are *case sensitive*, which means that two different identifiers may contain the same letters in the same order. For example, :code:`thisVar` and :code:`ThisVar` are two different identifiers.


In addition to the syntax rule that governs identifiers, Java programmers follow certain style conventions in making up names for classes, variables, and methods. By convention, class names in Java begin with a capital letter and use capital letters to distinguish the individual words in the name---for example, :code:`HelloWorld`.  Variable and method names begin with a lowercase letter but also use capital letters to distinguish the words in the name---for example, :code:`main()`, and :code:`greet()`.  The advantage of this convention is that it is easy to distinguish the different elements in a program---classes, methods, variables---just by how they are written.

Another important style convention followed by Java programmers is to choose descriptive identifiers when naming classes, variables, and methods. This helps to make the program more readable.

.. sidebar:: Programming Tip
    :subtitle: Choice of Identifiers
    To make your program more readable, choose names that describe the purpose of the class, variable, or method.


Data Types and Variables
^^^^^^^^^^^^^^^^^^^^^^^^
