Lets look at a Java Program
---------------------------

A time-honored tradition in Computer Science is to write a program
called “hello world.” The “hello world” program is simple and easy.
There are no logic errors to make, so getting it to run relies only on
understanding the syntax. To be clear, lets look at a “complicated”
version of hello world for Python:

::

    def main():
        print("Hello World!")

Remember that we can define this program right at the Python command
line and then run it:

::

    >>> main()
    "Hello World!"
    >>>

Now lets look at the same program written in Java:

.. highlight:: java
   :linenothreshold: 4

.. activecode:: hellojava
    :language: java
    :sourcefile: Hello.java

    public class Hello {

        public static void main(String[] args) {
            System.out.println("Hello World!");
        }

    }

What we see is that at the core there are a few similarities, such as a
main and the string “Hello World”. However, there is a lot more stuff
around the edges that make it harder to see the core of the program. Do
not worry! An important skill for a computer scientist is to learn what
to ignore and what to look at carefully. You will soon find that there
are some elements of Java that will fade into the background as you
become used to seeing them. One thing that will help you is to learn a
little bit about Java :ref:`Naming Conventions`.

The first question you probably have about this little program is “How
do I run it?” Running a Java program is not as simple as running a
Python program. The first thing you need to do with a Java program is
compile it. The first big difference between Java and Python is that
Python is an interpreted language. We could run our Python programs in
the Python **interpreter** and we were quite happy to do that. Java
makes running programs a two step process. First we must type the hello
world program into a file and save that file using the name
``Hello.java`` The file name must be the same as the public class you
define in the file. Once we have saved the file we **compile** it from
the command line as follows:

::

    $ javac Hello.java
    $ ls -l Hello.*
    -rw-r--r--   1 bmiller  bmiller  391 Jul 19 17:47 Hello.class
    -rw-r--r--   1 bmiller  bmiller  117 Jul 19 17:46 Hello.java

The command ``javac`` compiles our java source code into compiled byte
code and saves it in a file called ``Hello.class``. ``Hello.class`` is a
binary file so you won’t learn much if you try to examine the class file
with an editor. Hopefully you didn’t make any mistakes, but if you did
you may want to consult the :ref:`Common Mistakes`
section for helpful hints on compiler errors.

Now that we have compiled our java source code we can run the compiled
code using the ``java`` command.

::

    $ java Hello
    Hello World!
    $

Now you may be wondering what good is that extra step? What does
compiling do for us? There are a couple of important benefits we get
from compiling:

-  Early detection of errors

-  Faster program execution

The job of the compiler is to turn your java code into language that the
Java Virtual Machine (JVM) can understand. We call the code that the JVM
understands **byte code**. The JVM interprets the byte code much like
the Python interpreter interprets your Python. However since byte code
is much closer to the native language of the computer it can run faster.

When the compiler does the translation it can find many different kinds
of errors. For example, if you make a typo, the compiler will find the
typo and point it out to you before you ever run the program. We will
look at some examples of compiler errors shortly. Chances are you will
create some on your own very soon, too.

Now that we have run our hello world program, lets go back and look at
it carefully to see what we can learn about the Java language. This
simple example illustrates a few very important rules:

1. Every Java program must define a class, and all code is inside a class

2. Everything in Java must have a type

3. Every Java program must have a function called
   ``public static void main(String[] args)``

Lets take the hello world example a line at a time to see how these
rules are applied. On line 1 we see that we are declaring a class called
Hello:

::

    public class Hello {

As rule 1 says all Java code resides inside a class. Unlike
Python where a program can simply be a bunch of statements in a file,
Java programs must be inside a class. So, we define a class ``Hello``,
which is not a very useful class because it has no instance variables, and only one
method. You will also notice the curly brace ``{``. In Java, blocks of
code are identified by pairs of curly braces. The block starts with a
``{`` and ends with a ``}``. You will notice that I indented my code
that followed the left brace, but in Java this is only done by
convention, it is not enforced.

On the next line we start our method definition. The name of this method
is:

::

        public static void main(String[] args)

Everything on this line is significant, and helps in the identification
of this method. For example the following lines look similar but are in
fact treated by Java as completely different methods:

-  ``public void main(String[] args)``

-  ``public static void main(String args)``

-  ``public static void main()``

-  ``void main(String args)``

Just digging in to this one line will take us deep into the world of
Java, so we are going to start digging but we are not going to dig too
deeply right away. Much of what could be revealed by this one line is
better understood through other examples, so be patient.

The first word, **public** indicates to the Java compiler that this is a
method that anyone can call. We will see that Java enforces several
levels of security on the methods we write, including **public**,
**protected**, and **private** methods.

The next word, **static** tells Java that this is a method that is part
of the class, but is not a method for any one instance of the class. The
kind of methods we typically wrote in Python required an instance in
order for the method to be called. With a static method, the object to
the left of the ``.`` is a class, not an instance of the class. For example,
the way that we would call the ``main`` method directly is:
``Hello.main(parameter1)``. For now, you can think of static methods the
same way you think of methods in Python modules that don’t require an
instance, for example the math module contains many methods: sin, cos,
etc. You probably evaluated these methods using the names
``math.cos(90)`` or ``math.sin(60)``.

The next word, **void** tells the Java compiler that the method ``main``
will not return a value. This is roughly analogous to omitting the
return statement in a Python method. In other words, the method will run
to completion and exit but will not return a value that you can use in
an assignment statement. As we look at other examples we will see that
every Java function must tell the compiler what kind of an object it
will return. This is in keeping with the rule that says everything in
Java must have a type. In this case we use the special type called
``void`` which means no type.

Next we have the proper name for the method: **main**. The rules for
names in Java are similar to the rules in Python. Names can include
letters, numbers, and the ``_``. Names in Java must start with a letter.

Finally, we have the parameter list for the method. In this example we
have one parameter. The name of the parameter is ``args``, however,
because everything in Java must have a type, we also have to tell the
compiler that the value of ``args`` is an array of strings. For the
moment you can just think of an array as being the same thing as a list
in Python. The practical benefit of declaring that the method ``main`` must
accept one parameter and the parameter must be an array of strings is
that if you call ``main`` somewhere else in your code and and pass it an
array of integers or even a single string, the compiler will flag it as
an error.

That is a lot of new material to digest in only a single line of Java!
Lets press on and look at the next line:

::

    System.out.println("Hello World!");

This line should look a bit
more familiar to you. Python and Java both use the dot notation for
finding names. In this example we start with ``System``. System is a
class. Within the system class we find the object named ``out``. The
``out`` object is the standard output stream for this program. Having
located the ``out`` object Java will now call the method named
``println(String s)`` on that object. The ``println`` method prints a
string and adds a newline character at the end. Anywhere in Python that
you used the ``print`` function you will use the ``System.out.println``
method in Java.

Now there is one more character on this line that is significant and
that is the ``;`` at the end. In Java the ``;`` signifies the end of a
statement. Java statements can spread across many lines, but the compiler
knows it has reached the end of a statement when it encounters a ``;``.
In Python, it is not required (or recommend) to use semicolons in this way,
but whitespace is meaningful.
In contrast, in Java semicolons are **required** to end statements, but
whitespace is not considered meaningful.
This is a very important difference to remember! In Java, the following
statements are all legal and equivalent. I would not encourage you to
write your code like this, but you should know that it is legal.

::

        System.out.println("Hello World");
        System.out.println("Hello World")
        ;
        System.out.println
            (
             "Hello World"
            )     ;
        System.
          out.
            println("Hello World")
            ;

The last two lines of the hello world program simply close the two
blocks using ``}``. The first or outer block is the class definition. The second or
inner block is the function definition.

If we wanted to translate the Java back to Python we would have
something like the following class definition.

::

    class Hello(object):
        @staticmethod
        def main(args):
            print("Hello World!")

Notice that we used the decorator ``@staticmethod`` to tell the Python
interpreter that ``main`` is going to be a static method. The impact of
this is that we don’t have to, indeed we should not, use ``self`` as the
first parameter of the main method! Using this definition we can call
the main method in a Python session like this:

::

    >>> Hello.main("")
    Hello World!
    >>>
