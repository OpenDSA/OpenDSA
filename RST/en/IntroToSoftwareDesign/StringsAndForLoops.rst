.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Stephen Edwards


Strings and For Loops
=====================

Characters
----------

So far in this course, we've worked  storing and manipulating various kinds of data. We've used ``int``s and ``double``s to hold numbers and ``boolean``s to store ``true`` and ``false`` values.  Characters are a new type that can store single letters, punctuation, symbols, spaces, tabs, etc.

To create a character variable we'd declare and instantiate a variable like this:

.. code-block:: java

    char letterA = 'a';

Here we define the type character as `char`, create a variable named `letterA` and set it equal to the value `'a'`.  Importantly, when defining characters, we use single quotation marks.

Character literals, like 'a', appear in single quotes. Unlike string literals, which appear in double quotes,
character literals can only contain a single character.

Characters work like the other data types we have seen so far. You can compare them using relational operators:

.. code-block:: java

    if(letter == 'a')
    {

    }

The increment and decrement operators work with characters. So the following code would work:

.. code-block:: java

    char letter = 'a';
    letter = letter + 1; //letter now represents 'b'

Java uses Unicode to represent characters, so strings can store text in other alphabets like Cyrillic and Greek, and non-alphabetic languages like Chinese. You can read more about it `here <http://unicode.org/>`_.

In Unicode, each character is represented by a "code unit", which you can think of (and sometimes treat) as an integer.




Strings
-------

In Java and other object-oriented languages, an object is a collection of data that provides a set of methods.  For example our ``Pixel``s from the previous module represents a single Pixel of a picture.

One kind of built-in object we can work with in Java are called ``String``s. ``String``s are designed to store text and can be considered a string of characters.  ``String``s also  provide methods for manipulating character data.

Lets say we wanted to create a ``String`` variable.  We could create one like this:

.. code-block:: java

    String food = new String("banana");

Strings are ultimately objects, so we can create them by calling a constructor, just as we have done with other objects we've made in this class.

This example will create a String that contains, as its value, the word "banana" that is passed in by the constructor.

We can also use a constructor with an empty parameter list.

.. code-block:: java

    String food = new String();


This example will create a String object that contains the empty string as its value. The empty string has the literal value "" – that is, a pair of double quotes that contain no characters.

Because strings are so important, Java allows a number of shortcuts to be used when creating and concatenating strings. For example, you don’t have to use new String() when creating a new string object. The following code will also work:

.. code-block:: java

    String food = "banana";

Note that we use a constructor to assign an initial value to a variable of type String (or of a type equal to any other class). This differs from how we assign an initial value to variables like an ``int`` or a ``boolean``.  The code above is just a shortcut to calling the constructor.  We'll talk more about this difference and what it means next week, but for now it is just good to notice.

Accessing Single Characters in Strings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Strings provide a method named ``charAt``, which extracts a character. It returns
a ``char`` which stores an individual character (as opposed to strings of them).

.. code-block:: java

    String fruit = "banana";
    char letter = fruit.charAt(0); // stores just the letter b

The argument 0 means that we want the letter at position 0.  Like with Pixels and Pictures from last week, the first letter in a string is stored at position (or index) 0, not 1 like in MicroWorlds.


Strings are Immutable
~~~~~~~~~~~~~~~~~~~~~

Strings provide methods, ``toUpperCase`` and ``toLowerCase``, that convert from uppercase to lowercase and back. These methods are often a source of confusion, because it sounds like they modify strings. But neither these methods nor any others can change a string, because strings are **immutable** - meaning they cannot be changed.

When you invoke toUpperCase on a string, you get a new string object as a
return value. For example:

.. code-block:: java

    String name = "Ada Lovelace";
    String nameUpper = name.toUpperCase();

After these statements run, upperName refers to the string "ADA LOVELACE".
But name still refers to "Ada Lovelace".

One way to get around this (if we want) is to override what the ``name`` variable above represents.  For example:

.. code-block:: java

    String name = "Ada Lovelace";
    name = name.toUpperCase();

To be clear, we cannot change the string value by running ``toUpperCase()`` but we *can* change what the variable represents.

Another useful method is ``replace``, which finds and replaces instances of one
string within another.

.. code-block:: java

    String text = "Computer Science is fun!";
    text = text.replace("Computer Science", "CS");

This example demonstrates a common way to work with string methods. It invokes text.replace, which returns a reference to a new string, "CS is fun!".  Then it assigns the new string to text, replacing the old string.

This assignment is important; if you don’t save the return value, invoking
``text.replace`` has no effect.


Viewing Strings
---------------

``Jeroo``s and ``Pixel``s are a really handy way of teaching what objects are and how they can change by running methods.  Unlike these objects, we don't have a graphical way of viewing strings.  Instead, we use what are called print statements:

.. code-block:: java

    System.out.print("Hello World");

When this code is run in BlueJ, you should see a window pop up that has the text "Hello World" without the quotation marks.  Notably, you may not get the results you expect if you run:

.. code-block:: java

    System.out.print("Hello");
    System.out.print("World");

This would display "HelloWorld" all on one line without any spaces. Often, it can be easier to read your output if different strings are on different lines.  For that, we'd change our print statement slightly from ``print`` to ``println``.

.. code-block:: java

    System.out.println("Hello");
    System.out.println("World");

This would cause "Hello" and "World" to be printed out on separate lines.

``System.out.println`` appends a special character, called a **newline**, that
moves to the beginning of the next line. If you don’t want a newline at the
end, you can use print instead of println.

Escape Sequences
~~~~~~~~~~~~~~~~

It is possible to display multiple lines of output in just one line of code. You
just have to tell Java where to put the line breaks.

.. code-block:: java

    System.out.print("Hello!\nHow are you doing?\n");

The output is two lines, each ending with a newline character:

.. code-block:: java

    Hello!
    How are you doing?


The ``\n`` seen in the print statement above is an **escape sequence**, which is a sequence of characters that represents a special character. The backslash allows you to "escape" the string’s
literal interpretation. Notice there is no space between ``\n`` and ``How``. If you add
a space there, there will be a space at the beginning of the second line

Another common use of escape sequences is to have quotation marks inside
of strings. Since double quotes indicate the beginning and end of strings, you
need to escape them with a backslash.

.. code-block:: java

    System.out.println("She said \"Hello!\" to me.");

Here are some escape sequences that might be useful for you:

.. list-table:: Truth Table
   :header-rows: 1

   * - Sequence
     - Meaning
   * - `\n`
     - newline
   * - `\t`
     - tab
   * - \"
     - make a double quote appear in the outputted text
   * - \\
     - make a backslash appear in the outputted text

Operators on strings
~~~~~~~~~~~~~~~~~~~~

In general, you cannot perform mathematical operations on strings, even if the strings look like numbers. The following expressions are illegal:

.. code-block:: java

    //all 3 of these won't work!
    "Hello" - 1;
    "World" / 3;
    "Hello" * "World"

Note, sometimes you will see strings that look like numbers.  Any time you see quotation marks though, Java will treat the data inside as a string so the following code wouldn't work either

.. code-block:: java

    //these won't work either
    "123" - 1;
    "562" / 4;
    "99" * "2";

**However**, the ``+`` operator works with strings, but it might not do what you expect. For strings, the ``+`` operator performs **concatenation**, which means joining end-to-end. So ``"Hello, " + "World!"`` yields the string ``"Hello, World!"``.

This works with variables too:

.. code-block:: java

    String firstName = "Katie";
    String lastName = "Brian";
    String space = " ";

    //create a string that will store the value "Katie Brian"
    String firstAndLast = firstName + space + lastName;

Since addition is defined for both numbers and strings, Java performs automatic conversions you may not expect:

.. code-block:: java

    System.out.println(1 + 2 + "Hello");
    //the output here is 3Hello

    System.out.println("Hello" + 1 + 2);
    //the output here is Hello12

Java executes these operations from left to right. In the first line, ``1 + 2`` is ``3``, and ``3 + "Hello"`` is ``"3Hello"``. But in the second line, ``"Hello" + 1`` is ``"Hello1"``, and ``"Hello1" + 2`` is ``"Hello12"``.









Counter Controlled Loops
------------------------

So far, we have worked with `while` loops and `for-each` loops.

While loops are excellent for when you know when you need to stop but you don't know how many iterations it will take to get to that ending state:

.. code-block:: java

    Jeroo jer = new Jeroo();
    while(!jer.seesWater(AHEAD))
    {
      jer.hop();
    }

An island can be any size, and still the jeroo will hop until it hits water.

For-Each Loops are excellent when you know you want to work with every item within a group, like when you want to change the value of each pixel in a picture:

.. code-block:: java

    Picture image = new Picture("image.png");
    for(Pixel pi: image.getPixels())
    {
      pi.setRed(0);
    }

But what if we wanted to perform a series of actions a certain number of times?  While these two kinds of loops *could* accomplish that, a different kind of for loop is better for this situation.

.. code-block:: java

    for (int i = 1; i <= 10; i = i + 1)
    {
        System.out.println("Looping!");
    }

The code above would simply print out the string "Looping!" 10 times.

``for`` loops have three components in parentheses, separated by semicolons: the **initializer**, the **condition**, and the **update**.

1. The **initializer** runs once at the very beginning of the loop.
2. The **condition**   is checked each time through the loop. If it is ``false``, the loop ends. Otherwise, the body of the loop is executed (again).
3. At the end of each iteration, the **update** runs, and we go back to step 2.

The ``for`` loop is often easier to read because it puts all the loop-related statements at the top of the loop.

There is one difference between for loops and while loops: if you declare a variable in the initializer, it only exists inside the for loop. For example, the following code would produce an error:

.. code-block:: java

    for (int i = 1; i <= 10; i = i + 1)
    {
        System.out.println("Looping!");
    }
    System.out.println(i);//would cause an error

The last line tries to display i (for no reason other than demonstration) but it won’t work. If you need to use a loop variable outside the loop, you have to declare it outside the loop, like this:

.. code-block:: java
    int i;
    for (i = 1; i <= 10; i = i + 1)
    {
        System.out.println("Looping!");
    }
    System.out.println(i);//would NOT cause an error

Assignments like ``i = i + 1`` don’t often appear in for loops, because Java provides a more concise way to add and subtract by one. Specifically, ``++`` is the **increment** operator; it has the same effect as ``i = i + 1``. And ``--`` is the decrement operator; it has the same effect as ``i = i - 1``. If you want to increment or decrement a variable by an amount other than 1, you can use ``+=`` and ``-=``. For example, ``i += 2`` increments ``i`` by 2.

This is important as you'll sometimes see a for loop that looks like this:

.. code-block:: java

    for (int i = 1; i <= 10; i++)
    {
      //body of loop
    }

Again, the variable ``i`` in this loop starts with a value of 1 and increases with each iteration until it is incremented to 11 and the condition (``i <= 10``) is no longer ``true``.

If instead, we wanted to reverse this and have a loop that started at 10 and decreased:

.. code-block:: java

    for (int i = 10; i >=1; i--)
    {
      System.out.println(i + "...");
    }
    System.out.println("Blast off!");

This loop would print out numbers counting down from 10 and then print out the phrase "Blast off!".

Traversing Strings
~~~~~~~~~~~~~~~~~~

The following loop traverses the characters in ``fruit`` and displays them, one on each line:

.. code-block:: java

    for (int i = 0; i < fruit.length(); i++)
    {
        char letter = fruit.charAt(i);
        System.out.println(letter);
    }

Strings provide a method called ``length`` that returns the number of characters in the string. Because it is a method, you have to invoke it with the empty argument list, ``()``.

The condition is ``i < fruit.length()``, which means that when ``i`` is equal to the length of the string, the condition is ``false`` and the loop terminates.

To find the last letter of a string, you might be tempted to try something like:

.. code-block:: java

    String fruit = "banana";
    int length = fruit.length();
    char last = fruit.charAt(length); // wrong!

This code compiles and runs, but invoking the charAt method throws a ``StringIndexOutOfBoundsException``. The problem is that there is no character at index 6 in "banana". Since we started counting at 0, the 6 letters are indexed from 0 to 5. To get the last character, you have to subtract 1 from length.

.. code-block:: java

    String fruit = "banana";
    int length = fruit.length();
    char last = fruit.charAt(length - 1); // correct!

This is an important thing to remember because when using for loops to traverse through a string this is a common mistake:

.. code-block:: java

    String fruit = "banana";
    for(int i = 0; i<=fruit.length(); i++) //wrong!
    {

    }

We need to write the condition in the for loop as either ``i<fruit.length()`` or ``i<=fruit.length()-1``

Many string traversals involve reading one string and creating another. For example, to reverse a string, we simply add one character at a time:

.. code-block:: java

    public String reverse(String s) {
        String r = "";
        for (int i = s.length() - 1; i >= 0; i--)
        {
            r = r + s.charAt(i);
        }
        return r;
    }

The initial value of ``r`` is ``""``, which is the **empty string**. The loop traverses the letters of ``s`` in reverse order. Each time through the loop, it creates a new string and assigns it to ``r``. When the loop exits, ``r`` contains the letters from ``s`` in reverse order. So the result of reverse(``"banana"``) is ``"ananab"``.


Object-Oriented Design: Aggregation, Composition, and Delegation
----------------------------------------------------------------


.. raw:: html

   <iframe width="560" height="315" src="https://www.youtube.com/embed/ry7hWZm5oEw?start=698" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Method Overriding
-----------------
