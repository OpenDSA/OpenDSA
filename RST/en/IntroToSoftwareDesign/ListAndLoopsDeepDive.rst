.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Lists, Loop Idioms, Generics, and the Null Keyword
==================================================

Last week we talked about what ``List``\ s are and how they work.  This week,
we'll focus more on why they can be useful in more complicated programming tasks.

Modelling the Contents of a Library
-----------------------------------

As an example, let's try to model a library of books inside a computer
program.
To start with, lets create a ``Book`` class with fields tracking the title,
author, and ISBN number.

.. code-block:: java

   public class Book
   {
       private String title;
       private String author;
       private int isbn;

       public Book(String aTitle, String anAuthor, int theISBN)
       {
           this.title = aTitle;
           this.author = anAuthor;
           this.isbn = theISBN;
       }

       public String getTitle()
       {
           return title;
       }

       public String getAuthor()
       {
           return title;
       }

       public int getISBN()
       {
           return isbn;
       }
   }

Once a book is created, we won't need to change any of these fields, thus
we only need to create getter methods. No setter methods when the fields
are read-only.

Next, we want to represent a *shelf*, which can store up to 50 books.
Obviously, we don't want to create 50 fields to hold the books, and 50
getter and setter methods to change them. Instead, we will store the
books in a list of books, and provide a method to add another book
to the shelf.

.. code-block:: java

   import java.uti.*;

   public class Shelf
   {
       private int maxCapacity;
       private List<Book> contents;

       public Shelf()
       {
           maxCapacity = 50;
           contents = new ArrayList<Book>();
       }

       // adds a book if there is space on the shelf
       public void addBook(Book book)
       {
           if (contents.size() < maxCapacity)
           {
               contents.add(book);
           }
       }

       public List<Book> getContents()
       {
           return this.contents;
       }
   }


We'll also have a library which contains many shelves:

.. code-block:: java

   import java.util.*;

   public class Library
   {
       private List<Shelf> stacks;

       public Library()
       {
           stacks = new ArrayList<Shelf>();
       }

       public void addShelf(Shelf shelf)
       {
           stacks.add(shelf);
       }
   }


We'll be enhancing this basic as we go in the following sections.


Looping Idioms
--------------

An "idiom" is a common pattern or expression.  When working with loops in Java,
you may begin to see some common patterns in how loops are used.
For loops are particularly good for situations when you need to:

* Repeat code a specific number of times
* Repeat over a sequence of positions
* Accumulate an answer over some numeric range

In addition, loops are often used for searching through a sequence of values
to find the first (or last) value matching some condition.


Repeating a Specific Number of Times: Shelving Books
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Lets start in our ``Library`` class by creating some shelves for books.

.. code-block:: java

   import java.util.*;

   public class Library
   {
       private List<Shelf> stacks;

       public Library()
       {
           stacks = new ArrayList<Shelf>();
       }

       public void addShelf(Shelf shelf)
       {
           stacks.add(shelf);
       }

       // new method
       public void createShelves()
       {
           // will add Shelf objects to our stacks
       }
   }

To make a single shelf, we'd create an object of our shelf class and add it to
our list:

.. code-block:: java

   // Create a single shelf
   public void createShelves()
   {
       Shelf shelf = new Shelf();
       this.stacks.add(shelf);
   }

However, as the name ``createShelves`` implies, we may want to make many shelves
at one time. Instead, we'll change ``createShelves`` to take in a parameter that
specifies how many shelves we want to make:

.. code-block:: java

   public void createShelves(int n)
   {
       for (int i = 0; i < n; i++)
       {
            Shelf shelf = new Shelf();
            this.stacks.add(shelf);
       }
   }

Counter-controlled loops are a good choice when you want to perform an
action a specific number of times.


Finding the First Match: Searching for a Book
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Finding a Match with a For-Each
"""""""""""""""""""""""""""""""

Lets say someone came into our library and asked if we had the
book "Catch-22".  We would need some way to determine if this book
was on one of our shelves.

To accomplish this, we'll add a method to our ``Shelf`` class that
will return ``true`` if a book with a given title is on that shelf.


.. code-block:: java

   import java.util.*;
   
   public class Shelf
   {
       private int maxCapacity;
       private List<Book> contents;

       public Shelf()
       {
           maxCapacity = 50;
           contents = new ArrayList<Book>();
       }
       
       // other methods omitted ...

       // new method
       public boolean hasTitle(String title)
       {
           // should return true if a book with the specified title
           // is in our list of books,
           // otherwise return false
       }
   }

We could accomplish this either with a counter-controlled loop or a for-each
loop.  Let's look at how we'd write this with a for-each loop:

.. code-block:: java

   public boolean hasTitle(String title)
   {
       boolean result = false;
       for (Book book : this.contents())
       {
           if(title.equals(book.getTitle()))
           {
               result = true;
           }
       }
       return result;
   }

Here, we iterate through every ``Book``` in the list of ``contents``.
In each iteration we declare the title we want to
the title of whatever book we're looking at.

If we find a book with a title that matches our parameter ``title``, we set
the boolean ``result`` to ``true``. Once our loop has finished, we return
whatever ``result`` has been set to.

However, once we find the book we're looking for, there is no need to continue
looking through the rest of the shelf.  Instead, lets get rid of ``result``
and  revise our code to make better use of ``return`` statements.

.. code-block:: java

   public boolean hasTitle(String title)
   {
       for (Book book : this.contents())
       {
           if (title.equals(book.getTitle()))
           {
               return true;
           }
       }
       return false;
   }


A ``return`` statement terminates a method on the line where it is executed,
so no other code within the method will be executed after the ``return``
happens.
With this change, instead of looking through all the books and not returning
the answer until searching the entire shelf, we have changed the if statement
so that as soon as we find a matching title, the method *immediately*
returns true. This ends the method immediately, stopping the loop in its
tracks as soon as the desired book is found. However, if no books match the
given title, the loop continues until all loops have been checked. After
the loop a separate return statement returns the answer in that situation.

This particular approach is called **early loop termination** or
an **early loop exit**, where we
immediately stop the loop as soon as the answer is available, so that we
avoid any unnecessary work.


Finding the First Object with a Counter-Controlled Loop
"""""""""""""""""""""""""""""""""""""""""""""""""""""""

It would be equally correct to implement this method with a counter-controlled
for loop. In this style, we would access the list by position using an
index variable.

.. code-block:: java

   public boolean hasTitle(String title)
   {
       for (int i = 0; i < this.contents.size(); i++)
       {
           Book book = this.contents.get(i);
           if (title.equals(book.getTitle()))
           {
               return true;
           }
       }
       return false;
   }

You'll notice that other than the nature of the for loop, this implementation
is almost identical to the for-each implementation in the previous section.


The Break Keyword
"""""""""""""""""

Sometimes, we may want a loop to end early without causing the entire method
to terminate. In these situations, we can use the ``break`` command:

.. code-block:: java

   for (int i = 0; i < this.contents.size(); i++)
   {
       Book book = this.contents.get(i);
       if (title.equals(book.getTitle()))
       {
           break;
       }
   }
   System.out.println("Found it!");

Here, once a book with a matching title is found, the ``break`` statement
is executed. This immediately stops, or "breaks", the loop, and execution
continues with the statement following the loop.

You can use a break statement with any type of loop. Executing ``break``
in a for-each or while loop will stop those loops in just the same way.
However, make sure you understand the purpose when you use a ``break``
statement, since they can make code harder to read and more error-prone.
Using a single ``break``` when you want an early loop exit to terminate
the loop when the answer is found is useful, but placing many ``break``
statements in a loop, or using them without clearly understanding the
plan, is more likely to create bugs. In fact, many programmers stay away
from ``break`` except in early exit situations because of its potential
for problems.


Finding the Last Object with a For Loop
"""""""""""""""""""""""""""""""""""""""

The loops above will find the very first book in the list with a matching
title. However, sometimes you might want to find the last item in a list
instead.

For example, what if a person came to the library asking for "The Godfather"
and I remember putting that book on the shelf just a moment ago.

if the shelf's list of contents contained 50 books, there is no need to
search through most of those if I know "The Godfather" is close to the end.
Instead, we could use a counter-controlled loop to start at the last
position of the list, and count *backwards*.

.. code-block:: java

   public boolean hasTitle(String title)
   {
       for (int i = this.contents.size(); i >= 0; i--)
       {
           Book book = shelfContents.get(i);
           if (title.equals(book.getTitle()))
           {
               return true;
           }
       }
       return false;
   }

This loop would start with the book at the highest index in the list and work
its way down to index 0. This loop still uses the *early loop exit* technique
to stop the loop as soon as the desired book is found.


Check Your Understanding: Loop Idioms
-------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week9Quiz2Summ.html ka
   :long_name: Loop Idioms



Accumulating an Answer: Count the Books by an Author
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Suppose another library visitor has asked how many books by Stephen King
our library carries.

.. code-block:: java

   import java.util.*;

   public class Library
   {
       private List<Shelf> stacks;

       public Library()
       {
           stacks = new ArrayList<Shelf>();
       }

       public void addShelf(Shelf shelf)
       {
           stack.add(shelf);
       }

       // new method
       public int countBooksByAuthor(String author)
       {
           // ...
       }
   }

In this method, we want to use a loop to count the number of books by a given
author. We know how to use an if statement to check a book to see if the
author matches. If we do this to a loop, we can add one to a counter variable
each time we find a book that matches. To do this, we will need a variable
to store the count of matching books. This kind of variable is often
called an **accumulator**--a variable that "accumulates" the answer we
are calculating (or counting, or summing, or whatever). Each time we go
through another iteration of the loop, we add a little bit more information
to the accumulator, and when our loop has finished repeating, the accumulator
holds the whole answer.

.. code-block:: java

   public int countBooksByAuthor(String author)
   {
       // declare our counter (accumulator)
       int count = 0;
       // iterate over every shelf:
       for (Shelf shelf : this.stacks)
       {
           // iterate over every book on a given shelf
           for (Book book : shelf.getContents())
           {
               // if we find a book by our desired author...
               if (book.getAuthor.equals(author))
               {
                   // increase counter by 1
                   count++;
               }
           }
       }
       // return our count
       return count;
   }

To use our accumulator, we declare an ``int`` variable called ``count`` and
initialize it to 0.
Then, we use two loops. The outer loop repeats for every shelf in our library.
The inner loop searches each shelf for any books that match our
parameter ``author``.  When we find one, we increment (add one to)
the counter using the ``++`` operator.  When we finish looping, we
finally return the ``count`` we have accumulated.

Note that the value in ``count`` is not computed all at once. It is built
up incrementally, one book at a time. At any point in time, ``count``
represents the total number of books by the given author we have seen so
far in the combined operation of the two loops. It is only when the
loops have entirely finished that ``count`` has reached the final answer.


Accumulating a Different Kind of Answer
"""""""""""""""""""""""""""""""""""""""

What if, instead of just knowing the number of Stephen King books in our
library, we wanted to pull them all into one place?  Here, we will use the
same structure to accumulate an as above, but we'll generate and return a
list of books that contains all of that author's books. This time, our
accumulator will be a list, rather than a simple number.

.. code-block:: java

   // new method
   public List<Book> getAllBooksByAuthor(String author)
   {
       // declare our List
       List<Book> foundBooks = new ArrayList<Book>();

       // iterate over every shelf:
       for (Shelf shelf : this.stacks)
       {
           // iterate over every book on a given shelf
           for(Book books : shelf.getContents())
           {
               // if we find a book by our desired author...
               if (book.getAuthor().equals(author))
               {
                   // add the book to our List
                   foundBooks.add(book);
               }
           }
       }
       // return our list
       return foundBooks;
   }

Here, instead of incrementing a counter variable, every time we find a book
that matches our author parameter, we add it to a list (our accumulator).
Then after we've looked through all shelves, we return that list.

This can be useful when we have many items that fulfill the criteria in our
if statement.


Generics Revisited
------------------

So far, whenever we've worked with variables, we've always known what type
they are.
For instance, whenever we're working with a ``String`` we'll declare a
variable like
``String s = "Hello World";``.  However, there are some cases in Java when
we'll need to create methods without knowing what type of data we'll be
working with--or, more properly, so they'll work with *any type*.
For these, we use what is called a **Generic Type Parameter** to represent
the type of data we're working with.

Declaring classes that use generic type parameter(s) involves using new syntax
to refer to the class name. Such classes and interfaces, including those for
Java's collections, use angle brackets (<...>) containing one
or more variables (separated by commas) to refer to unspecified type names.
For example, you would use <Element> or <Key, Value> to refer to unspecified
type names. Sometimes, you will see super short variable names used in
this way, such as <E> or <K, V>, although the longer names are more
understandable for beginners.
Using this technique, names of classes or interfaces implemented with generic
types are written with the syntax ``ClassName<E>``.

Lets take a look at a class that uses a generic type parameter.  The
following ``Box`` class can hold a piece of any type of data. We'll use
the parameter name ``Content`` to refer to the type of data held in
the ``Box``.

.. code-block:: java

   public class Box <Content>
   {
       private Content value;

       public Box(Content newValue)
       {
           this.value = newValue;
       }

       public Content getValue()
       {
           return this.value;
       }

       public void setValue(Content newValue)
       {
           this.value = newValue;
       }
   }

We could then create a ``Box`` object.

.. code-block:: java

    Box<String> box1 = new Box<String>("surprise");


And not all ``Box`` objects need to be the same type:

.. code-block:: java

    Box<String> box1 = new Box<String>("surprise");
    Box<Integer> box2 = new Box<Integer>(42);

In effect, the ``<Content>`` serves as parameter for the type of objects that
will be stored in the ``Box``.

One benefit a generic type provides is checking the types of method arguments
at compile time.  For example, the following code would cause an error when
compiled:

.. code-block:: java

    Box<String> box1 = new Box<String>("surprise");
    box1.setValue(42);

Thus, if a programmer wishes to create a list of strings, using generic
types will help guarantee that the objects being stored actually belong to
the correct type. Even though you can create a list of any type of object,
this specific list only contains strings, nothing else. In this way, using
generic types helps to reduce the number of programming errors and thereby
makes programs safer and more robust. At the same time, it allows us to
create more reusable classes, since we can create types that work with a
variety of other classes without having to know in advance what those
classes are.


Check Your Understanding: Generics
-----------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week9Quiz1Summ.html ka
   :long_name: Generics


The Null Keyword
----------------

When you declare an object variable, remember that you are storing a reference
to an object. In Java, the keyword ``null`` is a special value that means "no
object". You can declare and initialize object variables this way:

.. code-block:: java

   Pixel pix = null;

This can sometimes be useful when you do not want to create a new object or
initialize the variable to refer to a specific existing object. It can also
be useful when a method should return an object, but sometimes there is no
object to return. Think of a "find" method that looks for a specific book,
and returns that book if it is found. What happens if it is not found?
In many cases, having such a method return the special value ``null`` is
a useful way to indicate that a method returns no object, perhaps because
"no object" is a meaningful answer.

If you try to use a variable that has ``null`` as its value (or an expression
that returns ``null``), either to access a field or invoke a
method, Java throws a ``NullPointerException``. An exception indicates
that an unusual situation has occurred, and this can mean your program
"broke the rules"--either the rules of Java program behavior or the rules of
a specific library method or class.

Programmers often use the phrase "null pointer exception" or the acronym
NPE to refer to these types of errors. NPEs virtually always mean there
is a bug in your program, because your program tried to use "null" in a
situation where an object was required, but null means "no object", so
the requirement wasn't met. The following is an example of
code that will throw a null pointer exception.

.. code-block:: java

   Pixel pix = null;
   pix.setRed(0); // This was a cause a NullPointerException

``NullPointerException``\ s are a common error for programmers to encounter.
Be aware that if you see one arise in your own code, you're probably working
with a variable that has not been set to refer to a specific object, or
you are working with a method that sometimes returns no object.


Check Your Understanding: Null
------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week9Quiz3Summ.html ka
   :long_name: Null



Syntax Practice 9
-----------------

.. extrtoolembed:: 'Syntax Practice 9'
   :workout_id: 1513


Programming Practice 9
----------------------

.. extrtoolembed:: 'Programming Practice 9'
   :workout_id: 1514
