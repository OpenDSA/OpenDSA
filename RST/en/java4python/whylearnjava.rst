Why Learn another programming Language?
=======================================

Python is a nice language for beginning programming for several reasons.
First the syntax is sparse, and clear. Second, the underlying model of
how objects and variables work is very consistent. Third, you can write
powerful and interesting programs without a lot of work. However, Python
is representative of one kind of language, called a dynamic language.
You might think of Python as being fairly informal. There are other
languages, like Java and C++ that are more formal.

These languages have some advantages of their own. First, is speed: Java
and C++ code will generally give better performance than Python code
[#pythonSpeed]_. Second is their maintainability. A lot of what makes Python
easy to use is that you must remember certain things. For example if you
set variable ``x`` to reference a turtle, and forget later that ``x`` is
a turtle but try to invoke a string method on it, you will get an error.
Java and C++ protect you by forcing you to be upfront and formal about
the kind of object each variable is going to refer to.

In one sense Python is representative of a whole class of languages,
sometimes referred to as “scripting languages.” Other languages in the
same category as Python are Ruby and Perl. Java is representative of
what I will call industrial strength languages. Industrial strength
languages are good for projects with several people working on the
project where being formal and careful about what you do may impact lots
of other people. Languages in this category include Rust, C++, C#, and Ada.

Programming languages will always change. As the field of computer
science advances there will be new programming languages and you will
need to learn them. It is important to learn several programming
languages so that you know what to expect. There are certain features
that most programming languages have in common; variables, loops,
conditionals, functions. And there are some features that are unique. If
you know what is common in languages that is a good place to start.

Why Learn Java? Why not C or C++?
---------------------------------

It is easier to learn to create interesting programs in Java than in C or C++, for several reasons:

- Java includes a larger standard library than C or C++, which means that sophisticated programs can be created in Java without including external dependencies. Java has over 4,000 different classes included in the Java 14 Standard Edition. We could not begin to scratch the surface of these classes even if we devoted all of class time! However, we will cover many useful and powerful features of the Java standard library this semester.

-  Java incorporates automatic garbage collection of memory, whereas C and C++ programs typically include some degree of manual memory management. This makes programming in those languages more challenging.

- C++'s syntax is more complicated than Java's, making it more difficult to learn. For example, C++ supports a feature called operator overloading, which makes it possible to change the behavior of operators like ``+``. This can make it more difficult to understand what a C++ program is doing.

Certainly, C and C++ are important languages, and are worth learning. But for these and other reasons, we've decided to use Java for this course. Learning Java will be a good preparation for learning these and other languages!

.. rubric:: Footnotes

.. [#pythonSpeed] Although Python code is generally slower than Java and C++ code, in practice Python programs can achieve equivalent performance. This can be done by compiling Python code to C code (see: `Cython <https://cython.org>`_) or by calling high-performance libraries from Python (e.g., `NumPy <https://numpy.org>`_, `scikit-learn <https://scikit-learn.org/stable/>`_, etc.). So native language performance is just one criteria to consider when deciding which language to use for a program.
