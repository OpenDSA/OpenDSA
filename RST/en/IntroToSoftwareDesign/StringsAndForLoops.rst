.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Stephen Edwards


Strings and For Loops
=====================

Object-Oriented Design: Aggregation, Composition, and Delegation
----------------------------------------------------------------

.. raw:: html

   <iframe width="560" height="315" src="https://www.youtube.com/embed/ry7hWZm5oEw?start=698" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Characters
----------

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
are ` even more <https://english.stackexchange.com/questions/60154/how-to-pronounce-the-programmers-abbreviation-char>_`).

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
-------

Phrases that appear in quotation marks are called **strings**, because they contain a sequence of
"characters" strung together. Characters can be letters, numbers, punctuation marks, symbols,
spaces, tabs, etc. ``String``s are designed to store text and can be considered a string of
characters.  ``String``s also  provide methods for manipulating character data.

Lets say we wanted to create a ``String`` variable.  We could create one like this:

.. code-block:: java

    String food = "banana";

This example will create a String that stores the word "banana".

We can also create what is called an empty string by doing this:

.. code-block:: java

    String food = "";


This example will create a string that contains the empty string as its value. The empty string has
the literal value "" – that is, a pair of double quotes that contain no characters.


Accessing Single Characters in Strings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Strings provide a method named ``charAt``, which extracts a character. It returns
a ``char`` which stores an individual character (as opposed to strings of them).

.. code-block:: java

    String fruit = "banana";
    char letter = fruit.charAt(0); // stores just the letter b

The argument 0 means that we want the letter at position 0.  Like with Pixels and Pictures from
last week, the first letter in a string is stored at position (or index) 0, not 1 like in
MicroWorlds.


Strings are Immutable
~~~~~~~~~~~~~~~~~~~~~

Strings provide methods, ``toUpperCase`` and ``toLowerCase``, that convert from uppercase to
lowercase and back. These methods are often a source of confusion, because it sounds like they
modify strings. But neither these methods nor any others can change a string, because strings are
**immutable** - meaning they cannot be changed.

When you invoke toUpperCase on a string, you get a new string object as a
return value. For example:

.. code-block:: java

    String name = "Ada Lovelace";
    String nameUpper = name.toUpperCase();

After these statements run, upperName refers to the string "ADA LOVELACE".
But name still refers to "Ada Lovelace".

One way to get around this (if we want) is to override what the ``name`` variable above
represents.  For example:

.. code-block:: java

    String name = "Ada Lovelace";
    name = name.toUpperCase();

To be clear, we cannot change the string value by running ``toUpperCase()`` but we *can* change
what the variable represents.

Another useful method is ``replace``, which finds and replaces instances of one
string within another.

.. code-block:: java

    String text = "Computer Science is fun!";
    text = text.replace("Computer Science", "CS");

This example demonstrates a common way to work with string methods. It invokes text.replace, which
returns a reference to a new string, "CS is fun!".  Then it assigns the new string to text,
replacing the old string.

This assignment is important; if you don’t save the return value, invoking
``text.replace`` has no effect.


Viewing Strings
---------------

``Jeroo``s and ``Pixel``s are a really handy way of teaching what objects are and how they can
change by running methods.  Unlike these objects, we don't have a graphical way of viewing
strings.  Instead, we use what are called print statements:

.. code-block:: java

    System.out.print("Hello World");

When this code is run in BlueJ, you should see a window pop up that has the text "Hello World"
without the quotation marks.  Notably, you may not get the results you expect if you run:

.. code-block:: java

    System.out.print("Hello");
    System.out.print("World");

This would display "HelloWorld" all on one line without any spaces. Often, it can be easier to read
your output if different strings are on different lines.  For that, we'd change our print statement
slightly from ``print`` to ``println``.

.. code-block:: java

    System.out.println("Hello");
    System.out.println("World");

This would cause "Hello" and "World" to be printed out on separate lines.

``System.out.println`` appends a special character, called a **newline**, that
moves to the beginning of the next line. If you don’t want a newline at the
end, you can use print instead of println.

Operators on strings
~~~~~~~~~~~~~~~~~~~~

In general, you cannot perform mathematical operations on strings, even if the strings look like
numbers. The following expressions are illegal:

.. code-block:: java

    //all 3 of these won't work!
    "Hello" - 1;
    "World" / 3;
    "Hello" * "World"

Note, sometimes you will see strings that look like numbers.  Any time you see quotation marks
though, Java will treat the data inside as a string so the following code wouldn't work either

.. code-block:: java

    //these won't work either
    "123" - 1;
    "562" / 4;
    "99" * "2";

**However**, the ``+`` operator works with strings, but it might not do what you expect. For
strings, the ``+`` operator performs **concatenation**, which means joining end-to-end. So
``"Hello, " + "World!"`` yields the string ``"Hello, World!"``.

This works with variables too:

.. code-block:: java

    String firstName = "Katie";
    String lastName = "Brian";
    String space = " ";

    //create a string that will store the value "Katie Brian"
    String firstAndLast = firstName + space + lastName;

Since addition is defined for both numbers and strings, Java performs automatic conversions you may
not expect:

.. code-block:: java

    System.out.println(1 + 2 + "Hello");
    //the output here is 3Hello

    System.out.println("Hello" + 1 + 2);
    //the output here is Hello12

Java executes these operations from left to right. In the first line, ``1 + 2`` is ``3``, and ``3 +
"Hello"`` is ``"3Hello"``. But in the second line, ``"Hello" + 1`` is ``"Hello1"``, and ``"Hello1"
+ 2`` is ``"Hello12"``.



Here are some common string methods you might find yourself needing.


.. list-table:: String Methods
   :header-rows: 1

   * - Method
     - Purpose
     - Example
   * - ``indexOf(char)``
     - Returns the index within this string of the first occurrence of the specified character.
     - ``"banana".indexOf('a');//returns 1 (the index of the first a)
   * - ``isEmpty()``
     - Returns ``true`` if, and only if, length() is 0
     - ``"red".isEmpty(); //would return false
   * - ``contains(String)``
     - Returns ``true`` if and only if this string contains the specified string
     - ``"racecar".contains("car"); // would return true

Substrings
~~~~~~~~~~

The ``substring`` method returns a new string that copies letters from an existing string, starting
at the given index.

.. code-block:: java

    String fruit = "banana";
    fruit.substring(0); // returns "banana"
    fruit.substring(2); // returns "nana"
    fruit.substring(6); // returns ""

The first example returns a copy of the entire string. The second example returns all but the first
two characters. As the last example shows, substring returns the empty string if the argument is
the length of the string.

There are other versions of substring that have different parameters. If it’s invoked with two
arguments, they are treated as a start and end index:

.. code-block:: java

    String fruit = "banana";
    fruit.substring(0, 3); // returns "ban"
    fruit.substring(2, 5); // returns "nan"

Notice that the character indicated by the end index is not included.

Defining substring this way simplifies some common operations. For example,
to select a substring with length ``len``, starting at index ``i``, you could write

.. code-block:: java

    fruit.substring(i, i + len).


Check Your Understanding: Strings
----------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week7Quiz1Summ.html ka
   :long_name: Strings



Counter Controlled Loops
------------------------

So far, we have worked with `while` loops and `for-each` loops.

While loops are excellent for when you know when you need to stop but you don't know how many
iterations it will take to get to that ending state:

.. code-block:: java

    Jeroo jer = new Jeroo();
    while(!jer.seesWater(AHEAD))
    {
      jer.hop();
    }

An island can be any size, and still the jeroo will hop until it hits water.

For-Each Loops are excellent when you know you want to work with every item within a group, like
when you want to change the value of each pixel in a picture:

.. code-block:: java

    Picture image = new Picture("image.png");
    for(Pixel pi: image.getPixels())
    {
      pi.setRed(0);
    }

But what if we wanted to perform a series of actions a certain number of times?  While these two
kinds of loops *could* accomplish that, a different kind of for loop is better for this situation.

.. code-block:: java

    for (int i = 1; i <= 10; i = i + 1)
    {
        System.out.println("Looping!");
    }

The code above would simply print out the string "Looping!" 10 times.

``for`` loops have three components in parentheses, separated by semicolons: the **initializer**,
the **condition**, and the **update**.

1. The **initializer** runs once at the very beginning of the loop.
2. The **condition**   is checked each time through the loop. If it is ``false``, the loop ends.
Otherwise, the body of the loop is executed (again).
3. At the end of each iteration, the **update** runs, and we go back to step 2.

The ``for`` loop is often easier to read because it puts all the loop-related statements at the top
of the loop.

There is one difference between for loops and while loops: if you declare a variable in the
initializer, it only exists inside the for loop. For example, the following code would produce an
error:

.. code-block:: java

    for (int i = 1; i <= 10; i = i + 1)
    {
        System.out.println("Looping!");
    }
    System.out.println(i);//would cause an error

The last line tries to display i (for no reason other than demonstration) but it won’t work. If you
need to use a loop variable outside the loop, you have to declare it outside the loop, like this:

.. code-block:: java
    int i;
    for (i = 1; i <= 10; i = i + 1)
    {
        System.out.println("Looping!");
    }
    System.out.println(i);//would NOT cause an error

Assignments like ``i = i + 1`` don’t often appear in for loops, because Java provides a more
concise way to add and subtract by one. Specifically, ``++`` is the **increment** operator; it has
the same effect as ``i = i + 1``. And ``--`` is the decrement operator; it has the same effect as
``i = i - 1``. If you want to increment or decrement a variable by an amount other than 1, you can
use ``+=`` and ``-=``. For example, ``i += 2`` increments ``i`` by 2.

This is important as you'll sometimes see a for loop that looks like this:

.. code-block:: java

    for (int i = 1; i <= 10; i++)
    {
      //body of loop
    }

Again, the variable ``i`` in this loop starts with a value of 1 and increases with each iteration
until it is incremented to 11 and the condition (``i <= 10``) is no longer ``true``.

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

Strings provide a method called ``length`` that returns the number of characters in the string.
Because it is a method, you have to invoke it with the empty argument list, ``()``.

The condition is ``i < fruit.length()``, which means that when ``i`` is equal to the length of the
string, the condition is ``false`` and the loop terminates.

To find the last letter of a string, you might be tempted to try something like:

.. code-block:: java

    String fruit = "banana";
    int length = fruit.length();
    char last = fruit.charAt(length); // wrong!

This code compiles and runs, but invoking the charAt method throws a
``StringIndexOutOfBoundsException``. The problem is that there is no character at index 6 in
"banana". Since we started counting at 0, the 6 letters are indexed from 0 to 5. To get the last
character, you have to subtract 1 from length.

.. code-block:: java

    String fruit = "banana";
    int length = fruit.length();
    char last = fruit.charAt(length - 1); // correct!

This is an important thing to remember because when using for loops to traverse through a string
this is a common mistake:

.. code-block:: java

    String fruit = "banana";
    for(int i = 0; i<=fruit.length(); i++) //wrong!
    {

    }

We need to write the condition in the for loop as either ``i<fruit.length()`` or
``i<=fruit.length()-1``

Many string traversals involve reading one string and creating another. For example, to reverse a
string, we simply add one character at a time:

.. code-block:: java

    public String reverse(String s) {
        String r = "";
        for (int i = s.length() - 1; i >= 0; i--)
        {
            r = r + s.charAt(i);
        }
        return r;
    }

The initial value of ``r`` is ``""``, which is the **empty string**. The loop traverses the letters
of ``s`` in reverse order. Each time through the loop, it creates a new string and assigns it to
``r``. When the loop exits, ``r`` contains the letters from ``s`` in reverse order. So the result
of reverse(``"banana"``) is ``"ananab"``.



Check Your Understanding: Counter Controlled Loops
--------------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week7Quiz2Summ.html ka
   :long_name: For-Each Loops


Tips on Random Numbers
----------------------

Generating Random Numbers
~~~~~~~~~~~~~~~~~~~~~~~~~

Sometimes you might find it helps to make random choices in some of your programs where you want
your choices to more independent and varied.  Java provides a built-in class called ``Random`` for
generating random numbers, and our student class library includes a special version of this class
that is helpful for beginners. To use this class, add the following import statement at the top of
your file:

.. code-block:: java

   import student.util.Random;

The Random class provides a method called ``generator()`` to get an object that represents a random
number generator. Here, we only need to deal with generating random integers, and the generator
provides a method that is very useful for this purpose. You can use it like this:

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

So, when you are testing behaviors that are random, you can horse the actions to be predictable
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

One of the most useful methods in the Object class is the
toString() method:

.. code-block:: java

   public class Object
   {
     public String toString( );
   }

The ``toString()`` method returns a String representation of its object, but these may not always
be useful.  For example, if we ran:

.. code-block:: java

   Jeroo jerr = new Jeroo();
   System.out.println(jerr.toString());

We'd see something like ``Jeroo@5f93274e`` outputted (though you may see a different set of numbers
and letters if you run this).

What this experiment shows is that the default definition of ``toString()`` returns some kind of
internal representation of its object. It looks as if it returns the name of the object’s class
concatenated with its memory address. This may be useful for some applications. But for most
objects we will want to override the default definition to make the ``toString()`` method return a
string that is more appropriate for whatever object we are working with.

Overriding the toString method
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For this example, lets consider a class representing an ATM that tracks its location and the amount
of money the machine has.

.. code-block:: java

   public class ATM{
       private String location;
       private double moneyInside;

       public ATM(String l, double m){
           this.location = l;
           this.moneyInside = m;
       }
   }

And let's make an object of this class.  This ATM will be at the bank and have $4000.00 (USD)
inside of it.

.. code-block:: java

   ATM bankATM = new ATM("bank", 4000.00)
   System.out.println(bankATM.toString());
   //output: ATM@149f5b42

Runnung ``bankAtm.toString()``, we would see the default behavior for toString occur, which
wouldn't be very helpful for telling us anything about this machine.

Instead, let's write a toString method that will be more helpful for telling us about where this
ATM is.

Since a toString method already exists, we need to **override** the method and replace it with one
of our own.  To override a method, you simply define a method with the same signature in the
subclass.  If you call ``toString()`` with an instance of the subclass, its version of the method
will be used. In this way, the subclass method overrides the superclass version.

First, let's add the method signature we saw above to the ATM class.

.. code-block:: java

   public class ATM{
       private String location;
       private double moneyInside;

       public ATM(String l, double m){
           this.location = l;
           this.moneyInside = m;
       }

       public String toString(){

       }
   }

Since we are overriding the toString method objects inherently have, this method signature needs to
look exactly like what is defined above.  Next, we'll create a String variable that will tell us
where this ATM is.


.. code-block:: java

   public class ATM{
       private String location;
       private double moneyInside;

       public ATM(String l, double m){
           this.location = l;
           this.moneyInside = m;
       }

       public String toString(){
           String data = "This ATM is at the: " + this.location;
       }
   }

Then, because the return type in the toString method is a string, we need to return that string.

.. code-block:: java

   public class ATM{
       private String location;
       private double moneyInside;

       public ATM(String l, double m){
           this.location = l;
           this.moneyInside = m;
       }

       public String toString(){
           String data = "This ATM is at the: " + this.location;
           return data;
       }
   }

Now let's consider our ``bankATM`` again...

.. code-block:: java

   ATM bankATM = new ATM("bank", 4000.00)
   System.out.println(bankATM.toString());
   //output: "This ATM is at the: bank"

Now that we've overridden the toString method, we can see some useful information.

While this new method may not play an important role in the ``ATM`` class, it does provide a very
brief, understandable description of the state of the object. This is the reason that the
``toString()`` method was included in the Object class.

Check Your Understanding: Method Overriding
-------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week7Quiz4Summ.html ka
   :long_name: Method Overriding
