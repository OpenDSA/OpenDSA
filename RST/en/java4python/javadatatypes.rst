Java Data Types
===============

Numeric
-------

One of the great things about Python is that all of the basic data types
are objects. Integers are objects, floating point numbers are objects,
lists are objects, everything. In Java that is not the case. In Java,
some of the most basic data types like integers and floating point
numbers are not objects. The benefit of having these primitive data
types be non-objects is that operations on the primitives are fast. The
problem is that it became difficult for programmers to combine objects
and non-objects in the way that we do in Python. So, eventually all the
non-object primitives ended up with Objectified versions.

================== ========
         Primitive   Object
================== ========
               int  Integer
             float    Float
            double   Double
              char     Char
           boolean  Boolean
================== ========

In older versions of Java, it was the programmers responsibility to
convert back and forth from a primitive to an object whenever necessary.
This process of converting a primitive to an object was called
“boxing.” The reverse process is called “unboxing.” In Java 5, the
compiler became smart enough to know when to convert back and forth and
is called “autoboxing.” In this book, we will typically use the Object
version of all the numeric data types and let the compiler do its thing.

Let's look at a simple Python function which converts a Fahrenheit
temperature to Celsius.
If this program were run on the command-line, you would enter the temperature when prompted -- the Javascript pop-up for input is only an artifact of the digital textbook.

.. activecode:: tcpython
    :language: python

    def main():
        fahr = int(input("Enter the temperature in F: "))
        cel = (fahr - 32) * 5.0/9.0
        print("the temperature in C is: ", cel)

    main()

Next, lets look at the Java equivalent. If this program were run on the command-line, you would enter the temperature when prompted -- the "Input for Program" text box is only an artifact of the digital textbook.

.. activecode:: convert1
    :language: java
    :sourcefile: TempConv.java
    :stdin: 212

    import java.util.Scanner;

    public class TempConv {
        public static void main(String[] args) {
            Double fahr;
            Double cel;
            Scanner in;

            in = new Scanner(System.in);
            System.out.println("Enter the temperature in F: ");
            fahr = in.nextDouble();

            cel = (fahr - 32) * 5.0/9.0;
            System.out.println("The temperature in C is: " + cel);
        }
    }

There are several new concepts introduced in this example. We will look
at them in the following order:

-  Import

-  Variable Declaration

-  Input/Output and the Scanner Class

Import
~~~~~~

In Java, you can use any class that is available without having to import
the class, subject to two very important conditions:

1. The ``javac`` and ``java`` commands must know that the class exists.

2. You must use the full name of the class

Your first question might be how do the ``java`` and ``javac`` commands
know that certain classes exist. The answer is the following:

1. Java knows about all the classes that are defined in .java and .class
   files in your current working directory.

2. Java knows about all the classes that are shipped with Java.

3. Java knows about all the classes that are included in your
   ``CLASSPATH`` environment variable. Your ``CLASSPATH`` environment
   variable can name two kinds of structures.

   1. A .jar file that contains Java classes

   2. Another directory that contains Java class files

You can think of the import statement in Java as working a little bit
like the ``from module import xxx`` statement in Python. However, behind
the scenes, the two statements actually do very different things. The
first important difference to understand is that the class naming system
in Java is very hierarchical. The *full* name of the Scanner class is
really ``java.util.Scanner``. You can think of this name as having two
parts: The first part ``java.util`` is called the **package** and the
last part is the **class**. We’ll talk more about the class naming system a
bit later. The second important difference is that it is the Java class
loader’s responsibility to load classes into memory, not the import
statement’s.

So, what exactly does the import statement do? What it does is tell the
compiler that we are going to use a shortened version of the class’s
name. In this example we are going to use the class
``java.util.Scanner`` but we can refer to it as just ``Scanner``. We
could use the ``java.util.Scanner`` class without any problem and
without any import statement, provided that we always referred to it by
its full name. As an experiment, you may want to try this yourself.
Remove the import statement and change the string Scanner to
``java.util.Scanner`` in the rest of the code. The program should still
compile and run.

Declaring Variables
~~~~~~~~~~~~~~~~~~~

Here is where we run into one of the most important differences between
Java and Python. Python is a **dynamically typed** language. In a
dynamically typed language a variable can refer to any kind of object at
any time. When the variable is used, the interpreter figures out what
kind of object it is. Java is a **statically typed** language. In a
statically typed language the association between a variable and the
type of object the variable can refer to is determined when the variable
is **declared**. Once the declaration is made it is an error for a
variable to refer to an object of any other type.

In the example above, lines 5—7 contain variable declarations.
Specifically we are saying that ``fahr`` and ``cel`` are going to
reference objects that are of type ``Double``. The variable ``in`` will
reference a ``Scanner`` object. This means that if we were to try an
assignment like ``fahr = "xyz"`` the compiler would generate an error
because ``"xyz"`` is a string and ``fahr`` is supposed to be a double.

For Python programmers, the following error is likely to be even more
common. Suppose we forgot the declaration for ``cel`` and instead left
line 6 blank. What would happen when we type ``javac TempConv.java`` on
the command line?

::

    TempConv.java:13: cannot find symbol
    symbol  : variable cel
    location: class TempConv
             cel = (fahr - 32) * 5.0/9.0;
             ^
    TempConv.java:14: cannot find symbol
    symbol  : variable cel
    location: class TempConv
             System.out.println("The temperature in C is: " + cel);
                                                              ^
    2 errors

When you see the first kind of error, where the symbol is on the left
side of the equals sign, it usually means that you have not declared the
variable. If you have ever tried to use a Python variable that you have
not initialized the second error message will be familiar to you. The
difference here is that we see the message before we ever try to test
our program. More common error messages are discussed in the section
:ref:`Common Mistakes`.

The general rule in Java is that you must decide what kind of an object
your variable is going to reference and then you must declare that
variable before you use it. There is much more to say about the static
typing of Java, but for now this is enough.

Input / Output / Scanner
~~~~~~~~~~~~~~~~~~~~~~~~

In the previous section we created a ``Scanner`` object. In
Java, ``Scanner`` objects make getting input from the user, a file, or even
over the network relatively easy. In our case we simply want to ask the
user to type in a number at the command line, so in line 9 we construct
a ``Scanner`` by calling the constructor and passing it the ``System.in``
object. Notice that this ``Scanner`` object is assigned to the name ``in``,
which we declared to be a ``Scanner`` on line 7. ``System.in`` is
similar to ``System.out`` except, of course, it is used for input. If you
are wondering why we must create a ``Scanner`` to read data from
``System.in`` when we can write data directly to ``System.out`` using
``println``, you are not alone. We will talk about the reasons why this
is so later when we talk in-depth about Java streams. You will also see
in other examples that we can create a ``Scanner`` by passing the ``Scanner`` a
``File`` object. You can think of a ``Scanner`` as a kind of “adapter” that
makes low level objects easier to use.

On line 11 we use the ``Scanner`` object to read in a number. Here again we
see the implications of Java being a strongly typed language. Notice
that we must call the method ``nextDouble`` because the variable
``fahr`` was declared as a double. So, we must have a function that is
guaranteed to return each kind of object we might want to read. In this
case, we need to read a Double so we call the function ``nextDouble``. The
compiler matches up these assignment statments and if you try to assign
the results of a method call to the wrong kind of variable it will be
flagged as an error.

The table below shows some commonly used methods of the ``Scanner`` class. There
are many more methods supported by this class and we will talk about how
to find them in our chapter about :ref:`Java Documentation`.

==================== ================ ======================================================
         Return type      Method name                                            Description
==================== ================ ======================================================
             boolean        hasNext()                   returns true if more data is present
             boolean     hasNextInt()   returns true if the next thing to read is an integer
             boolean   hasNextFloat()      returns true if the next thing to read is a float
             boolean  hasNextDouble()     returns true if the next thing to read is a double
             Integer        nextInt()           returns the next thing to read as an integer
               Float      nextFloat()              returns the next thing to read as a float
              Double     nextDouble()             returns the next thing to read as a Double
              String           next()             returns the next thing to read as a String
==================== ================ ======================================================


String
------

Strings in Java and Python are quite similar. Like Python, Java strings
are immutable. However, manipulating strings in Java is not quite as
obvious since Strings do not support an indexing or slicing operator.
That is not to say that you can’t index into a Java string, you can. You
can also pull out a substring just as you can with slicing. The
difference is that Java uses method calls where Python uses operators.

In fact, this is the first example of another big difference between Java
and Python. Java does not support any operator overloading. Table 3 maps
common Python string operations to their Java counterparts. For the
examples shown in the table we will use a string variable called “str”

========================== ==================================== =============================================================
                    Python                     Java                                                   Description
========================== ==================================== =============================================================
                ``str[3]``        ``str.charAt(3)``             Return character in 3rd  position
              ``str[2:4]``   ``str.substring(2,4)``             Return substring from 2nd up to but not including 4th
              ``len(str)``         ``str.length()``             Return the length of the string
         ``str.find('x')``     ``str.indexOf('x')``             Find the first occurrence of x
           ``str.split()``      ``str.split('\s')``             Split the string on whitespace into a list/array of strings
        ``str.split(',')``       ``str.split(',')``             Split the string at ``','`` into a list/array of strings
             ``str + str`` ``str + str`` or ``str.concat(str)`` Concatenate two strings together
           ``str.strip()``           ``str.trim()``             Remove any whitespace at the beginning or end
========================== ==================================== =============================================================

List
----

Next, let's look at a program which reads numbers from a file and produces a histogram showing the frequency of the numbers.
The data file we will use has one number between 0 and 9 on each line of the file.
Here is a simple Python program that creates and prints a histogram.

.. activecode:: histopy
    :language: python

    def main():
        count = [0]*10
        data = open('test.dat')

        for line in data:
            count[int(line)] = count[int(line)] + 1

        idx = 0
        for num in count:
            print(idx, " occured ", num, " times.")
            idx += 1
    
    main()


Test running the program. It will read this data:

.. datafile:: test.dat

   1
   2
   3
   9
   1

Lets review what is happening in this little program. First, we create a list
and initialize the first 10 positions in the list to be
0. Next we open the data file called ‘test.dat’. Third, we have a loop
that reads each line of the file. As we read each line we convert it to
an integer and increment the counter at the position in the list
indicated by the number on the line we just read. Finally we iterate
over each element in the list, printing out both the position in the list
and the total value stored in that position.

To write the Java version of this program we will have to introduce
several new Java concepts. First, you will see the Java equivalent of a
list, called an ``ArrayList.`` Next, you will see three different kinds
of loops used in Java. Two of the loops we will use are going to be very
familiar, the third one is different from what you are used to in Python
but is easy when you understand the syntax:

- ``while (condition) { code }``

  - The ``code`` will be repeatedly executed until the ``condition`` becomes false.

- ``for (initialization statement; condition; loop statement) { code }``

  - The ``code`` will be repeatedly executed until the ``condition`` becomes false. As shown in the example below, the ``initialization statement`` and ``loop statement`` make this form useful for iterating over a range of numbers, similar to how you might use ``for i in range(10)`` in Python. 

- ``for (Type variable : collection) { code }``

  - The ``code`` will be executed once for each element in the ``collection``. Each execution, ``variable`` will be assigned to the next element of ``collection``. Known as the "for-each" loop. This form is useful for iterating over members of a collection, similar to how you might use ``for a in array`` in Python.

Here is the Java code needed to write the exact same program:

.. activecode:: histojava
    :language: java
    :sourcefile: Histo.java
    :datafile: test.dat

    import java.util.Scanner;
    import java.util.ArrayList;
    import java.io.File;
    import java.io.IOException;

    public class Histo {

        public static void main(String[] args) {
            Scanner data = null;
            ArrayList<Integer> count;
            Integer idx;

            try {
                    data = new Scanner(new File("test.dat"));
            }
            catch ( IOException e) {
                System.out.println("Unable to open data file");
                e.printStackTrace();
                System.exit(0);
            }

            count = new ArrayList<Integer>(10);
            for (Integer i = 0; i < 10; i++) {
                count.add(i,0);
            }

            while(data.hasNextInt()) {
                idx = data.nextInt();
                count.set(idx,count.get(idx)+1);
            }

            idx = 0;
            for(Integer i : count) {
                System.out.println(idx + " occured " + i + " times.");
                idx++;
            }
        }
    }




Before going any further, I suggest you try to compile the above program
and run it on some test data that you create.

Now, let's look at what is happening in the Java source. As usual, we
declare the variables we are going to use at the beginning of the
method. In this example we are declaring a ``Scanner`` variable called ``data``,
an integer called ``idx`` and an ``ArrayList`` called ``count``. However, there
is a new twist to the ``ArrayList`` declaration. Unlike Python where
lists can contain just about anything, in Java we let the compiler know
what kind of objects our array list is going to contain. In this case
the ``ArrayList`` will contain ``Integers``. The syntax we use to declare
what kind of object the list will contain is the ``<Type>``
syntax.

Technically, you don’t *have* to declare what is going to be in an array
list. The compiler will allow you to leave the ``<``*Type*``>`` off the
declaration. If you don’t tell Java what kind of object is going to be
on the list Java will give you a warning message like this:

::

    Note: Histo.java uses unchecked or unsafe operations.
    Note: Recompile with -Xlint:unchecked for details.

Without the ``<Integer>`` part of the declaration Java simply assumes that
*any* object can be on the list. However, without resorting to an ugly
notation called casting, you cannot do anything with the objects on a
list like this! So, if you forget you will surely see more errors later
in your code. (Try it and see what you get)

Lines 13—20 are required to open the file. Why so many lines to open a
file in Java? The additional code mainly comes from the fact that Java
forces you to reckon with the possibility that the file you want to open
is not going to be there. If you attempt to open a file that is not
there you will get an error. A try/catch construct allows us to try
things that are risky, and gracefully recover from an error if one
occurs. The following example shows the general structure of a try/catch
block.

::

    try {
       Put some risky code in here, like opening a file
    }
    catch (Exception e) {
       If an error happens in the try block an exception is thrown.
       We will catch that exception here!
    }

Notice that in line 16 we are catching an ``IOException``. In fact, we
will see later that we can have multiple catch blocks to catch different
types of exceptions. If we want to be lazy and catch any old exception
we can catch an ``Exception`` which is the parent of all exceptions.
However, catching ``Exception`` is a terrible practice, since you may inadvertently catch exceptions you do not intend to, making it harder to identify bugs in your program.

On line 22 we create our ``ArrayList`` and give it an initial size of 10.
Strictly speaking, it is not necessary to give the ``ArrayList`` any
size. It will grow or shrink dynamically as needed, just like a list in
Python. On line 23 we start the first of three loops. The for loop on
lines 23–25 serves the same purpose as the Python statement
``count = [0]*10``, that is it initializes the first 10 positions in the
``ArrayList`` to hold the value 0.

The syntax of this for loop probably looks very strange to you, but in
fact it is not too different from what happens in Python using range. In
fact ``for (Integer i = 0; i < 10; i++)`` is exactly equivalent to the
Python ``for i in range(10)`` The first statement inside the parenthesis
declares and initializes a loop variable ``i``. The second statement is a
Boolean expression that is our exit condition. In other words we will
keep looping as long as this expression evaluates to true. The third
clause is used to increment the value of the loop variable at the end of
iteration through the loop. In fact ``i++`` is Java shorthand for
``i = i + 1`` Java also supports the shorthand ``i--`` to decrement the
value of i. Like Python, you can also write ``i += 2`` as shorthand for
``i = i + 2`` Try to rewrite the following Python for loops as Java for
loops:

-  ``for i in range(2,101,2)``

-  ``for i in range(1,100)``

-  ``for i in range(100,0,-1)``

-  ``for x,y in zip(range(10),range(0,20,2))`` [hint, you can
   separate statements in the same clause with a ,]

The next loop (lines 27–30) shows a typical Java pattern for reading
data from a file. Java while loops and Python while loops are identical
in their logic. In this case, we will continue to process the body of the
loop as long as ``data.hasNextInt()`` returns true.

Line 29 illustrates another important difference between Python and
Java. Notice that in Java we can not write
``count[idx] = count[idx] + 1``. This is because in Java there is no
overloading of operators. Everything except the most basic math and
logical operations is done using methods. So, to set the value of an
``ArrayList`` element we use the ``set`` method. The first parameter of
``set`` indicates the index or position in the ``ArrayList`` we are
going to change. The next parameter is the value we want to set. Notice
that, once again, we cannot use the indexing square bracket operator to
retrieve a value from the list, but we must use the ``get`` method.

The last loop in this example is similar to the Python for loop where
the object of the loop is a Sequence. In Java we can use this kind of
for loop over all kinds of sequences, which are called Collection
classes in Java. The for loop on line 33 ``for(Integer i : count)`` is
equivalent to the Python loop ``for i in count:`` This loop iterates
over all of the elements in the ArrayList called count. Each time
through the loop the Integer variable ``i`` is bound to the next element of
the ``ArrayList``. If you tried the experiment of removing the
``<Integer>`` part of the ``ArrayList`` declaration you probably noticed
that you had an error on this line. Why?

Arrays
------

As I said at the outset of this section, we are going to use Java
``ArrayLists`` because they are easier to use and more closely match the
way that Python lists behave. However, if you look at Java code on the
internet or even in your Core Java books you are going to see examples
of something called arrays. In fact you have already seen one example of
an array declared in the ‘Hello World’ program. Lets rewrite this
program to use primitive arrays rather than array lists.

.. activecode:: primarrays
    :language: java
    :sourcefile: HistoArray.java
    :datafile: test.dat

    import java.util.Scanner;
    import java.io.File;
    import java.io.IOException;

    public class HistoArray {
        public static void main(String[] args) {
            Scanner data = null;
            Integer[] count = {0,0,0,0,0,0,0,0,0,0};
            Integer idx;

            try {
                data = new Scanner(new File("test.dat"));
            }
            catch ( IOException e) {
                System.out.println("Unable to open data file");
                e.printStackTrace();
                System.exit(0);
            }

            while(data.hasNextInt()) {
                idx = data.nextInt();
                count[idx] = count[idx] + 1;
            }

            idx = 0;
            for(Integer i : count) {
                System.out.println(idx + " occured " + i + " times.");
                idx++;
            }
        }
    }

The main difference between this example and the previous example is
that we declare ``count`` to be an ``Array`` of integers. We also can initialize
short arrays directly using the syntax shown on line 8. Then notice that
on line 22 we can use the square bracket notation to index into an
array.

Dictionary
----------

Just as Python provides the dictionary when we want to have easy access
to key-value pairs, Java also provides us a similar mechanism. Rather
than the dictionary terminology, Java calls these objects Maps. Java
provides two different implementations of a map, one is called the
``TreeMap`` and the other is called a ``HashMap``. As you might guess
the ``TreeMap`` uses a balanced binary tree behind the scenes, and the
``HashMap`` uses a hash table.

Lets stay with a simple frequency counting example, only this time we
will count the frequency of words in a document. A simple Python program
for this job could look like this:

.. activecode:: pywordcount
   :language: python

   def main():
       data = open('alice30.txt')
       wordList = data.read().split()
       count = {}
       for w in wordList:
           w = w.lower()
           count[w] = count.get(w,0) + 1

       keyList = sorted(count.keys())
       for k in keyList:
           print("%-20s occurred %4d times" % (k, count[k]))

   main()


.. datafile:: alice30.txt

   Down, down, down.  Would the fall NEVER come to an end!  'I
   wonder how many miles I've fallen by this time?' she said aloud.
   'I must be getting somewhere near the centre of the earth.  Let
   me see:  that would be four thousand miles down, I think--' (for,
   you see, Alice had learnt several things of this sort in her
   lessons in the schoolroom, and though this was not a VERY good
   opportunity for showing off her knowledge, as there was no one to
   listen to her, still it was good practice to say it over) '--yes,
   that's about the right distance--but then I wonder what Latitude
   or Longitude I've got to?'  (Alice had no idea what Latitude was,
   or Longitude either, but thought they were nice grand words to
   say.)



Notice that the structure of the program is very similar to the numeric
histogram program.

.. activecode:: dictjava
    :language: java
    :sourcefile: HistoMap.java
    :datafile: alice30.txt

    import java.util.Scanner;
    import java.util.ArrayList;
    import java.io.File;
    import java.io.IOException;
    import java.util.TreeMap;

    public class HistoMap {

        public static void main(String[] args) {
            Scanner data = null;
            TreeMap<String,Integer> count;
            Integer idx;
            String word;
            Integer wordCount;

            try {
                    data = new Scanner(new File("alice30.txt"));
            }
            catch ( IOException e) {
                System.out.println("Unable to open data file");
                e.printStackTrace();
                System.exit(0);
            }

            count = new TreeMap<String,Integer>();

            while(data.hasNext()) {
                word = data.next().toLowerCase();
                wordCount = count.get(word);
                if (wordCount == null) {
                    wordCount = 0;
                }
                count.put(word,++wordCount);
            }

            for(String i : count.keySet()) {
                System.out.printf("%-20s occured %5d times\n", i, count.get(i) );
            }
        }
    }

Improve the program above to remove the punctuation.
