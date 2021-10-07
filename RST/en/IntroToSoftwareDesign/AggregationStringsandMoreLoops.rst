.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Aggregation, Strings and More Loops
===================================

Object-Oriented Design: Aggregation, Composition, and Delegation
----------------------------------------------------------------

.. raw:: html

   <iframe width="560" height="315" src="https://www.youtube.com/embed/ry7hWZm5oEw?start=698" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

As we build more complex programs,
we need multiple objects to model problems.
Our objects need to work together in controlled ways.
When it comes to objects working together, there are three key terms used in object-oriented design are:

* Aggregation
* Composition
* Delegation

An object can have field(s) that refer to other object(s), so it can
communicate with them.
For example, an island knows about all of the jeroos (and flowers, and nets)
on it. Similarly, an object representing a course might have field(s) to keep
track of the instructor and the student(s).

**Aggregation**: When one object "knows about" other object(s) through its
fields, so that it can communicate with the other object, we call this
"aggregation".
The other object(s) may be meaningful or useful on their own, and accessible
"outside" the first object.
Usually, the other object(s) are passed into the first one in its constructor
or via setter methods.

**Composition**: Alternatively, an object can have field(s) that refer to other
object(s) that represent its parts, which we call "composition". For example,
a car contains an engine, a
transmission, and an exhaust system. Similarly, a vending machine contains a
control panel, an item stocking system, and an item dispenser, and a change
dispenser.

In composition, the primary object **contains** or **owns** its pieces.
Its pieces are usually created using ``new``` inside the constructor.
They typically are not provided from outside the object.
We think of the larger object as being *built from* the pieces in some way.

For both aggregation and composition, the main object may ask its associated =
objects to perform actions. This can be implemented by having the main object
call method(s) on the object(s) it knows about.
Sometimes, a method on the main object is simply "passed on" by calling a
method on one of the lower-level objects. This is called **delegation**:
asking another object to do the work (or part of it), by calling one of
its methods.


Strings and Characters
----------------------

Characters
~~~~~~~~~~

So far in this course, we've worked storing and manipulating various kinds
of data. We've used ``int``\ s and ``double``\ s to hold numbers and ``boolean``\ s
to store ``true`` and ``false`` values.  Characters are a new type that can
store single letters, punctuation, symbols, spaces, tabs, etc.

To create a character variable we'd declare and instantiate a variable like
this:

.. code-block:: java

   char letterA = 'a';

Here use the Java type ``char`` to declare a variable named ``letterA`` that
can hold a single character, and initialize the variable to a lowercase "a".
Note that we use single quotes (') around a literal character value we want
to treat as part of our program text. Some programmers pronounce the
type ``char`` the same as the word "care", the first syllable of the
word "character". Others pronounce it the same as the word "char", as
in "char-broiled", because that is how it is spelled. You'll hear
both pronunciations, and either is acceptable (and there
are `even more <https://english.stackexchange.com/questions/60154/how-to-pronounce-the-programmers-abbreviation-char>`_).

Character literals, like 'a', appear in single quotes. Unlike string literals,
which appear in double quotes, character literals can only contain a
single character.

Characters work like the other data types we have seen so far. You can compare
them using relational operators:

.. code-block:: java

   if (letter == 'a')
   {

   }

The increment and decrement operators work with characters. So the following
code would work:

.. code-block:: java

   char letter = 'a';
   letter = letter + 1;  // now holds the value 'b'

Java uses Unicode to represent characters, so strings can store text in other
alphabets like Cyrillic and Greek, and non-alphabetic languages like Chinese.
You can `read more about it <http://unicode.org/>`_.

In Unicode, each character is represented by a "code unit", which you can
think of (and sometimes treat) as an integer.


Strings
~~~~~~~

Phrases that appear in quotation marks are called **strings**, because they
contain a sequence of "characters" strung together. Characters can be letters,
numbers, punctuation marks, symbols, spaces, tabs, etc. ``String``\ s are
designed to store text and can be considered a string of
characters.  ``String``\ s also  provide methods for manipulating character data.
While individual characters in Java are primitive data values, ``String`` is
actually the name of a class, and ``String``\ s are actually objects.

Lets say we wanted to create a ``String`` variable.  We could create one like
this:

.. code-block:: java

   String food = "banana";

This example will create a ``String`` variable called ``food`` that refers
to the word "banana".

We can also create an empty string (which contains no characters at all) by doing this:

.. code-block:: java

   String food = "";

This example will initialize the variable with an object representing an empty
string. The empty string has
the literal value ""–-that is, a pair of double quotes that contain no
characters.


Accessing Single Characters in Strings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Strings provide a method named ``charAt()`` that extracts a single character.
It returns a ``char`` (as opposed to a string of multiple characters).

.. code-block:: java

   String fruit = "banana";
   char letter = fruit.charAt(0); // stores just the letter b

The argument 0 means that we want the letter at position 0.  Like
with ``Pixel``\ s and ``Picture``\ s from
last week, the first letter in a string is stored at position (or index) 0,
not 1. In Java, all sequences of items start at position 0.


Strings are Immutable
~~~~~~~~~~~~~~~~~~~~~

Strings provide methods, ``toUpperCase()`` and ``toLowerCase()``, that convert
all of the string's letters to the specified upper- or lowercase form.
These methods are often a source of confusion, because it sounds like they
with modify the string. But neither these methods nor any others can change
a string, because strings are **immutable**--meaning the value of the
object cannot be changed. Effectively, all strings are read-only objects,
and the methods on strings return new ``String`` objects as their result,
without modifying the original.

When you invoke ``toUpperCase()`` on a string, you get a new ``String``` object
as a return value. For example:

.. code-block:: java

   String name = "Ada Lovelace";
   String nameUpper = name.toUpperCase();

After these statements run, upperName refers to the string "ADA LOVELACE".
But name still refers to "Ada Lovelace". The two variables refer to two
completely independent objects.

One way to get around this (if we want) is to change what the ``name``
variable refers to.  For example:

.. code-block:: java

   String name = "Ada Lovelace";
   name = name.toUpperCase();

To be clear, we cannot change the string value by running ``toUpperCase()``,
and there are still two separate objects. But we *can* change
what the variable refers to, assigning it to refer to the second,
uppercase version of the original text. By doing this, we no longer have
a way to refer to the original mixed-case ``String`` object, but if we
no longer need it, we can assign the name to refer to the new object instead.

Another useful ``String`` method is ``replace()``, which finds and replaces
instances of one string within another.

.. code-block:: java

   String text = "Computer Science is fun!";
   text = text.replace("Computer Science", "CS");

This example demonstrates a common way to work with ``String`` methods. It
invokes ``text.replace()``, which returns a reference to a new
string, "CS is fun!".  Then it assigns the new string to variable ``text``,
updating the variable to refer to the new object.

This assignment is important; if you don’t save the return value, invoking
``text.replace()`` will appear to have no effect, since the variable ``text``
will continue to refer to the original (unchanged) object.


Viewing Strings
~~~~~~~~~~~~~~~

``Jeroo``\ s and ``Pixel``\ s are a really handy way of teaching what objects
are and how they can change by running methods.  Unlike these objects, we don't
have a graphical way of immediately observing the content of ``String`` objects.
Instead, if we want to see what value a variable represents, we have to write
some code. We can use what are called print statements:

.. code-block:: java

    System.out.print("Hello World");

When this code is run in BlueJ, it produces textual output. BlueJ will pop
open its *terminal window*, which shows the textual output produced by
your code. You should see this window pop up to display the text "Hello World"
without the quotation marks.  Notably, you may not get the results you expect
if you run:

.. code-block:: java

   System.out.print("Hello");
   System.out.print("World");

This would display "HelloWorld" all on one line without any spaces. Often, it
can be easier to read your output if different strings are on different lines.
For that, we'd change our print statement
slightly from ``print`` to ``println``.

.. code-block:: java

    System.out.println("Hello");
    System.out.println("World");

This would cause "Hello" and "World" to be printed out on separate lines.

``System.out.println()`` appends a special character, called a **newline**, that
marks the end of one line and moves following output to the beginning of the
next line. If you don’t want a newline at the end, or if you want to
combine many pieces of information on the same line, you can use ``print()``
instead of ``println()``.


Operators on strings
~~~~~~~~~~~~~~~~~~~~

In general, you cannot perform mathematical operations on strings, even if the
strings look like a number. The following expressions are illegal:

.. code-block:: java

   // None of these work!
   "Hello" - 1;
   "World" / 3;
   "Hello" * "World";

Note, sometimes you will see strings that look like numbers.  Any time you see
quotation marks though, Java will treat the data inside as a string so the
following code won't work either:

.. code-block:: java

   // these won't work either
   "123" - 1;
   "562" / 4;
   "99" * "2";

**However**, the ``+`` operator works with strings, but it might not do what
you expect. For strings, the ``+`` operator performs **concatenation**, which
means joining two strings end-to-end. So
``"Hello, " + "World!"`` yields the string ``"Hello, World!"``.

This works with variables too:

.. code-block:: java

   String firstName = "Katie";
   String lastName = "Brian";
   String space = " ";

   // create a string that will store the value "Katie Brian"
   String firstAndLast = firstName + space + lastName;

Since ``+`` is defined for both numbers and strings, Java performs automatic
conversions you may not expect:

.. code-block:: java

   System.out.println(1 + 2 + "Hello");
   // produces: 3Hello

   System.out.println("Hello" + 1 + 2);
   // produces: Hello12

Java executes these operations from left to right. In the first line, ``1 + 2``
is ``3``, and ``3 + "Hello"`` is ``"3Hello"``. But in the second
line, ``"Hello" + 1`` is ``"Hello1"``, and ``"Hello1" + 2`` is ``"Hello12"``.

Concatenation can come in handy in many situations. For example,
if you have a long sequence of characters inside double quotes, be
aware that a string literal cannot span across two lines in a
program:

.. code-block:: java

   // Will not compile!
   String long = "This is a really
   long line.";

Instead, the double-quotes surrounding a string literal must both
appear on the same line. However, you can still write long strings.
Just use concatenation:

.. code-block:: java

   String long = "This is a really "
       + "long line.";

If you ever have a string that is too long, break it into pieces so
you can write each piece on its own line, and combine them using ``+``.


Frequently Used String Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Here are some common string methods you might find useful.

.. raw:: html

   <table class="table docutils align-default">
   <thead>
   <tr><th>Method</th><th>Description</th><th>Example</th></tr>
   </thead>
   <tbody>
   <tr>
     <td><code>int length()</code></td>
     <td>Get the number of characters in the string.</td>
     <td>
   <pre>
   int len = str.length();
   </pre>
     </td>
   </tr>
   <tr>
     <td><code>boolean equals(Object other)</code></td>
     <td>Check to see if two strings have the same contents.
     Do <b>NOT</b> use ==, use <code>equals()</code>.</td>
     <td>
   <pre>
   if (str1.equals(str2))
   {
       ...
   }
   </pre>
     </td>
   </tr>
   <tr>
     <td><code>boolean startsWith(String prefix)</code></td>
     <td>Check to see if one string begins with another
     (i.e., the other is a prefix of this string).</td>
     <td>
   <pre>
   if (str1.startsWith(str2))
   {
       ...
   }
   </pre>
     </td>
   </tr>
   <tr>
     <td><code>boolean endsWith(String suffix)</code></td>
     <td>Check to see if one string ends with another
     (i.e., the other is a suffix of this string).</td>
     <td>
   <pre>
   if (str1.endsWith(str2))
   {
       ...
   }
   </pre>
     </td>
   </tr>
   <tr>
     <td><code>String substring(int start, int end)</code></td>
     <td>Produce a new string consisting of a subsequence of
     characters, starting at position <code>start</code> and
     continuing up to but not including position <code>end</code>.</td>
     <td>
   <pre>
   String sub = str.substring(3, 5);
   </pre>
     </td>
   </tr>
   <tr>
     <td><code>String substring(int start)</code></td>
     <td>Produce a new string consisting of a subsequence of
     characters, starting at position <code>start</code> and
     continuing through all remaining characters (just as
     if you provided <code>length()</code> as the ending position).</td>
     <td>
   <pre>
   String sub = str.substring(3);
   </pre>
     </td>
   </tr>
   <tr>
     <td><code>int indexOf(char target)</code></td>
     <td>Search for the specified character starting from the
     beginning of the string, and return the position of the
     first occurrence, or -1 if it is not found.</td>
     <td>
   <pre>
   int pos = str.indexOf('a');
   </pre>
     </td>
   </tr>
   <tr>
     <td><code>String toLowerCase()</code></td>
     <td>Generate a new string containing the same content as
     this string, but with all characters replaced with their
     lowercase versions.</td>
     <td>
   <pre>
   String lower = str.toLowerCase();
   </pre>
     </td>
   </tr>
   <tr>
     <td><code>String toUpperCase()</code></td>
     <td>Generate a new string containing the same content as
     this string, but with all characters replaced with their
     uppercase versions.</td>
     <td>
   <pre>
   String upper = str.toUpperCase();
   </pre>
     </td>
   </tr>
   </tbody>
   </table>


Substrings
~~~~~~~~~~

A *substring* is a subsequence of characters within a string--a complicated
way of saying a part of the string.
The ``substring()`` method returns a new string that copies letters from an
existing string, starting at the given index.

.. code-block:: java

   String fruit = "banana";
   String sub1 = fruit.substring(0); // returns "banana"
   String sub2 = fruit.substring(2); // returns "nana"
   String sub3 = fruit.substring(6); // returns ""

The first example returns a copy of the entire string, since it starts at
position 0. The second example returns all but the first
two characters (it starts at position 2, which is the third letter). As the
last example shows, ``substring()`` returns the empty string if the argument is
the length of the string.

There are other versions of ``substring()`` that have different parameters. If
it’s invoked with two arguments, they are treated as a start and end index:

.. code-block:: java

   String fruit = "banana";
   String part1 = fruit.substring(0, 3); // returns "ban"
   String part2 = fruit.substring(2, 5); // returns "nan"

Notice that the character indicated by the end index is not included. The
``substring()`` method includes all characters beginning with the first
position, and going up to but not including the last position.

Defining ``substring()`` this way simplifies some common operations. For example,
to select a substring with length ``len``, starting at index ``i``, you could
write:

.. code-block:: java

   String result = fruit.substring(i, i + len);


Check Your Understanding: Strings
----------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week7Quiz1Summ.html ka
   :long_name: Strings



Counter-controlled Loops
------------------------

So far, we have worked with *while* loops and *for-each* loops.

While loops are excellent for when you know when you need to stop but you
don't know how many iterations it will take to get to that ending state:

.. code-block:: java

   Jeroo jer = new Jeroo();
   while (!jer.seesWater(AHEAD))
   {
       jer.hop();
   }

An island can be any size, and still the jeroo will hop until it hits water.

For-each Loops are excellent when you know you want to work with every item
in a group, like when you want to change the value of each pixel in a picture:

.. code-block:: java

   Picture image = new Picture("image.png");
   for (Pixel pix: image.getPixels())
   {
       pix.setRed(0);
   }

But what if we wanted to perform a series of actions a certain number of
times?  While these two kinds of loops *could* accomplish that, a different
kind of ``for`` loop is better suited for this situation.

.. code-block:: java

   for (int i = 0; i < 10; i++)
   {
       System.out.println("Looping!");
   }

The code above would simply print out the string "Looping!" 10 times.

``for`` loops have three components in parentheses, separated by semicolons:
the **initializer**, the **condition**, and the **update step**.

1. The **initializer** runs once at the very beginning of the loop.
   Most commonly, it introduces a local variable used to control the loop.
   This variable is often used as a **counter** that cycles through a
   range of numbers.
2. The **condition**   is checked each time through the loop. As long as
   it is ``true``, the loop continues to repeat, and when it
   becomes ``false``, the loop ends. This condition is only checked at
   the top of the loop, once during each repetition, just like in a
   ``while`` loop.
3. At the end of each iteration, the **update step** is executed to
   move the counter variable to its next value, and we go back to step 2.

The ``for`` loop is often easier to read because it puts all the loop-related
statements at the top of the loop. Rather than providing space for just the
condition, like a ``while`` loop, it provides space for initializing a
variable intended to control the loop, and updating that variable to a new
value on each iteration of the loop.

There is one difference between ``for`` loops and ``while`` loops: if you
declare a variable in the initializer, it only exists inside the
body of the ``for`` loop. For example, the following code would produce an
error:

.. code-block:: java

   for (int i = 0; i < 10; i++)
   {
       System.out.println("Looping!");
   }
   System.out.println(i);   // would cause an error

The last line tries to display the value of the variable ``i`` (for no reason
other than demonstration) but it won’t work. If you need to use a loop variable
outside the loop, you have to declare it outside the loop, like this:

.. code-block:: java

   int i = 0;
   for (i = 0; i < 10; i++)
   {
       System.out.println("Looping!");
   }
   System.out.println(i);   // would NOT cause an error

The update step in these loops uses the notation ``i++``, using the unary
**increment operator** ``++``. This operator is shorthand for "add one to this
variable", which is the same as ``i = i + 1``.
Assignments like ``i = i + 1`` don’t often appear in ``for``` loops, because
Java provides a more concise way to add and subtract by one.
while ``++`` has the same effect as ``i = i + 1``, ``--`` is
the **decrement operator**; it subtracts one, having the same effect as
``i = i - 1``. If you want to increment or decrement a variable by an amount
other than 1, you can use ``+=`` and ``-=``. For example, ``i += 2``
adds 2 to the variable ``i``.

This is important, since you'll most commonly see a ``for`` loop that looks like this:

.. code-block:: java

   for (int i = 0; i < 10; i++)
   {
       // body of loop
   }

Again, the variable ``i`` in this loop starts with a value of 0 and increases
by one with each iteration until it is incremented to 10 and the
condition (``i < 10``) is no longer ``true``.

If instead, we wanted to reverse this and have a loop that started at 10 and
decreased:

.. code-block:: java

   for (int i = 10; i > 0; i--)
   {
       System.out.println(i + "...");
   }
   System.out.println("Blast off!");

This loop would print out numbers counting down from 10 and then print out the
phrase "Blast off!".


Traversing Strings
~~~~~~~~~~~~~~~~~~

You can use a ``for`` loop to loop through the characters of a string.
The following loop traverses the characters in ``fruit`` and displays them,
one on each line:

.. code-block:: java

   for (int i = 0; i < fruit.length(); i++)
   {
       char letter = fruit.charAt(i);
       System.out.println(letter);
   }

Strings provide a method called ``length()`` that returns the number of
characters in the string.
Because it is a method, you have to invoke it with the empty argument
list, ``()``.

The condition is ``i < fruit.length()``, which means that when ``i`` is equal
to the length of the string, the condition is ``false`` and the loop terminates.

To find the last letter of a string, you might be tempted to try something like:

.. code-block:: java

   String fruit = "banana";
   int length = fruit.length();
   char last = fruit.charAt(length); // wrong!

This code compiles and runs, but invoking the ``charAt()`` method throws a
``StringIndexOutOfBoundsException``. The problem is that there is no character
at index 6 in "banana". Since positions start at 0, the 6 letters are indexed
from 0 to 5. To get the last character, you have to subtract 1 from length.

.. code-block:: java

   String fruit = "banana";
   int length = fruit.length();
   char last = fruit.charAt(length - 1); // correct!

This is an important thing to remember because when using ``for`` loops to
traverse through a string this is a common mistake:

.. code-block:: java

   String fruit = "banana";
   for (int i = 0; i <= fruit.length(); i++) // wrong!
   {
       ...
   }

We need to write the condition in the ``for`` loop as
either ``i < fruit.length()``
or ``i <= fruit.length() - 1``.
It is **much more common** in Java to see loops written using ``<``, and
this kind of comparison fits more naturally with positions starting at 0.

Many string traversals involve reading one string and creating another. For
example, to reverse a
string, we simply add one character at a time:

.. code-block:: java

   public String reverse(String s)
   {
       String result = "";
       for (int i = s.length() - 1; i >= 0; i--)
       {
           result = result + s.charAt(i);
       }
       return result;
    }

The initial value of ``result`` is ``""``, which is the **empty string**. The
loop traverses the letters of ``s`` in reverse order. Each time through the
loop, it creates a new string that is one character longer and assigns it
to ``result``. When the loop exits, ``result`` contains the letters
from ``s`` in reverse order. So the result
of ``reverse("banana")`` is ``"ananab"``.


Check Your Understanding: Counter Controlled Loops
--------------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week7Quiz2Summ.html ka
   :long_name: For-Each Loops


Tips on Random Numbers
----------------------

Generating Random Numbers
~~~~~~~~~~~~~~~~~~~~~~~~~

Sometimes you might find it helps to make random choices in some of your
programs where you want your choices to more independent and varied.  Java
provides a built-in class called ``Random`` for generating random numbers,
and our student class library includes a special version of this class
that is helpful for beginners. To use this class, add the following import
statement at the top of your file:

.. code-block:: java

   import student.util.Random;

The ``Random`` class provides a method called ``generator()`` to get an
object that represents a random number generator. Here, we only need to
deal with generating random integers, and the generator provides a method
that is very useful for this purpose. You can use it like this:

.. code-block:: java

   Random generator = Random.generator();   // local variable to refer to the random number generator
   int value = generator.nextInt(4);        // generate a random number from 0 - 3

The generator provides a method called ``nextInt()`` that generates a random integer. It takes a
single parameter, which is an upper limit. When you provide this upper limit, the ``nextInt()``
method will generate a number from 0 (inclusive) up to (but not including) the upper limit.

So, for example, if you want to generate a number from 0-99, you would call ``nextInt(100)``.

Suppose that you would like to perform some action 15% of the time. You could do this:

.. code-block:: java

   Random generator = Random.generator();   // local variable to refer to the random number generator
   int value = generator.nextInt(100);
   if (value < 15)
   {
       //code in here will happen 15% of the time
   }

Here, the call to ``nextInt()`` will produce a number from 0-99 (that is 100 possible values), and
the if statement will execute its true branch if the generated number is in the range 0-14 (which
is 15 possible values, or 15% of the time).


Testing Random Behaviors
~~~~~~~~~~~~~~~~~~~~~~~~

Random behaviors are great for chance-based events. But random behaviors also make software testing
hard. When you add random behavior to your code and then want to test it, what will your test case
do? Suppose you want your Actor to turn left in a specific situation half the time, and right the
other half. If you write a test case where the Actor is in that situation, it might turn left ...
or it might not. How can you write tests for that?

The answer is simple: the ``Random`` class helps you. Consider the following code sequence, which
generates three random numbers less than 100:

.. code-block:: java

   // using the same local variable "generator" from before
   int x = generator.nextInt(100);
   int y = generator.nextInt(100);
   int z = generator.nextInt(100);

It would be difficult to write a test case that used this code, since you have no way of
controlling what values end up in x, y, and z. For test cases, however, the Random class provides a
special method called setNextInts() that lets you control what numbers are generated for testing
purposes. You use it like this:


.. code-block:: java

   // In your test case, do this:
   Random.setNextInts(40, 50, 60);

   // In the code you are testing, this happens:
   int x = generator.nextInt(100);
   int y = generator.nextInt(100);
   int z = generator.nextInt(100);

   // You know x will get the value 40, while y is 50, and z is 60

So, when you are testing behaviors that are random, you can force the actions
to be predictable
just by saying in your test cases what sequence of values you want the random number generator to
produce. Outside of test cases, the generator will produce a truly (pseudo-)random sequence, but
inside your test cases, the numbers will be completely determined by you.


Check Your Understanding: Random Numbers
----------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week7Quiz3Summ.html ka
   :long_name: Random Numbers


Method Overriding
-----------------

The most general class in Java’s class hierarchy is the ``java.lang.Object`` class. It is the
superclass of all classes that occur in Java programs. By default, it is the direct superclass of
any class that does not explicitly specify a something else in its class definition.

One of the most useful methods in the Object class is the ``toString()`` method:

.. code-block:: java

   public class Object
   {
       public String toString();
   }

The ``toString()`` method returns a String representation of its object, but these may not always
be useful.  For example, if we ran:

.. code-block:: java

   Jeroo jerr = new Jeroo();
   System.out.println(jerr.toString());

We'd see something like ``Jeroo@5f93274e`` produced (though you may see a different set of numbers
and letters if you run this).

What this experiment shows is that the default definition of ``toString()`` returns some kind of
internal representation of its object. It looks as if it returns the name of the object’s class
concatenated with its memory address. This may be useful for some applications. But for most
objects we will want to override the default definition to make the ``toString()`` method return a
string that is more appropriate for whatever object we are working with.

In fact, every object always has a ``toString()`` method you can use. using
``toString()`` in print statements is so common that ``toString()`` will be
automatically called when you call ``println()`` on an object directly.

.. code-block:: java

   Jeroo anna = new Jeroo();
   System.out.println(anna);  // calls toString() automatically



Overriding the toString() Method
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For this example, lets consider a class representing an ATM that tracks its location and the amount
of money the machine has.

.. code-block:: java

   public class ATM
   {
       private String location;
       private double moneyInside;

       public ATM(String where, double amount)
       {
           this.location = where;
           this.moneyInside = amount;
       }
   }

And let's make an object of this class.  This ATM will be at the bank and have $4000.00 (USD)
inside of it.

.. code-block:: java

   ATM bankATM = new ATM("bank", 4000.00);
   System.out.println(bankATM);
   // output: ATM@149f5b42

Printing the ``bankATM`` automatically calls ``toString()`` on the ATM, but
we see the default behavior for ``toString()`` in the output, which
wouldn't be very helpful for telling us anything about this machine.

Instead, let's write a ``toString()`` method that will be more helpful for telling us about where this
ATM is.

Since a ``toString()`` method is already built-in for every class, we need
to **override** the method and replace its behavior with one
of our own.  To override a method, you simply define a method with the same signature in the
subclass.  If you call ``toString()`` with an instance of the subclass, its version of the method
will be used. In this way, the subclass method overrides the superclass version.

First, let's add the method signature we saw above to the ATM class.

.. code-block:: java

   public class ATM
   {
       private String location;
       private double moneyInside;

       public ATM(String where, double amount)
       {
           this.location = where;
           this.moneyInside = amount;
       }

       public String toString()
       {

       }
   }

Since we are overriding the ``toString()`` method objects inherently have, this method signature needs to
look exactly like what is defined above.  Next, we'll create a ``String`` variable that will tell us
where this ATM is.


.. code-block:: java

   public class ATM
   {
       private String location;
       private double moneyInside;

       public ATM(String where, double amount)
       {
           this.location = where;
           this.moneyInside = amount;
       }

       public String toString()
       {
           String data = "This ATM is at the: " + this.location;
       }
   }

Then, because the return type in the ``toString()`` method is a string, we need to return that string.

.. code-block:: java

   public class ATM
   {
       private String location;
       private double moneyInside;

       public ATM(String where, double amount)
       {
           this.location = where;
           this.moneyInside = amount;
       }

       public String toString()
       {
           String data = "This ATM is at the: " + this.location;
           return data;
       }
   }

Now let's consider our ``bankATM`` again ...

.. code-block:: java

   ATM bankATM = new ATM("bank", 4000.00);
   System.out.println(bankATM);
   // output: "This ATM is at the: bank"

Now that we've overridden the ``toString()`` method, we can see some
useful information.

While this new method may not play an important role in the ``ATM`` class,
it does provide a very brief, understandable description of the state of
the object. This is the reason that the ``toString()`` method was included
in the ``Object`` class.


Check Your Understanding: Method Overriding
-------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week7Quiz4Summ.html ka
   :long_name: Method Overriding


Syntax Practice 7
-----------------

.. extrtoolembed:: 'Syntax Practice 7'
   :workout_id: 1479


Programming Practice 7
----------------------

.. extrtoolembed:: 'Programming Practice 7'
   :workout_id: 1480
