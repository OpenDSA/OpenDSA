.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


More On Lists and Loops
=======================

Last week we talked about what Lists are and how they work.  This week, we'll
focus more on why they can be useful in more complicated programming tasks.

Making a Library
----------------

In this module, we'll be using Java to try to model a library of books.
To start with, lets create a ``Book`` class with fields tracking the title,
author, and ISBN number.

.. code-block:: java

    public class Book {
        private String title;
        private String author;
        private int isbn;

        public Book(String t, String a, int i) {
            this.title = t;
            this.author = a;
            this.isbn = i;
        }


        // Getters for our field.
        public String getTitle() {
            return title;
        }


        public String getAuthor() {
            return author;
        }


        public int getISBN() {
            return isbn;
        }
    }

Once a book is created, we won't need to change any of these fields, thus we only
need to create getters - no setters.

Next, we want to represent a shelf, which can store up to 50 books:

.. code-block:: java

    public class Shelf {
        private int maxCapacity;
        private List<Book> shelfContents;

        public Shelf() {
            this.maxCapacity = 50;
            shelfContents = new ArrayList<Book>();
        }


        // adds a book if there is space on the shelf
        public void addBook(Book b) {
            if (shelfContents.size() < maxCapacity) {
                shelfContents.add(b);
            }

        }

        public List<Book> getShelfContents() {
            return this.shelfContents;
        }

    }


We'll also have a library which contains many shelves:

.. code-block:: java

    public class Library {
        private List<Shelf> stacks;

        public Library() {
            stacks = new ArrayList<Shelf>();
        }

        public void addShelf(Shelf s) {
            stacks.add(s);
        }
    }


We'll be making this basic representation more complicated as we go through today's module.

Looping Idioms
--------------

An "idiom" is a common pattern or expression.  When working with loops in Java,
you may begin to see some common patterns in what loops can do.
For Loops are particularly good for situations when you need to:

* Repeat code some number of times
* Find the fist object (for some condition)
* Find the last object (for some condition)
* Accumulate an answer over some numeric range

Repeat code some number of times: Shelving Books
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Lets start in our ``Library`` class by creating some shelves for Books.

.. code-block:: java

    public class Library{
      private List<Shelf> stacks;

      public Shelf(){
        stacks = new ArrayList<Shelf>();
      }

      public void addShelf(Shelf s){
        shelfContents.add(s);
      }

      //new method!
      public void createShelves(){
        //will add Shelf objects to our ArrayList called stacks
      }
    }

To make a single shelf, we'd create an object of our shelf class and add it to
our ArrayList:

.. code-block:: java
    //Create a single shelf
    public void createShelves(){
        Shelf s = new Shelf();
        this.stacks.add(s);
    }


However, as the name ``createShelves`` implies, we may want to make many shelves
at one time. Instead, we'll change ``createShelves`` to take in a parameter that
specifies how many shelves we want to make:

.. code-block:: java

    //Create n shelves
    public void createShelves(int n){
        for (int i = 0; i<n; i++)
        {
            Shelf s = new Shelf();
            this.stacks.add(s);
        }

    }

Counter-controlled loops are the best option for when you want to run some code
a set number of times!


Finding the First Object That Matches Some Condition: Searching for a Book
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Finding the First Object with a For-Each
""""""""""""""""""""""""""""""""""""""""

Lets say someone came into our library and asked if we had the book "Catch-22"
in stock.  We would need some way to determine if this book was on one of our shelves.

To accomplish this, we'll add a method to our ``Shelf`` class that will return ``true``
if a book with a given title is on that shelf.


.. code-block:: java

    public class Shelf{
      private int maxCapacity;
      private List<Book> shelfContents;

      public Shelf(int id){
        maxCapacity = 50;
        shelfContents = new ArrayList<Book>();
      }

      //new method!
      public boolean hasTitle(String t){
        //should return true if a book with a title matching the parameter t
        //is in our shelfContents arrayList
        //otherwise return false
      }

We could accomplish this either with a counter-controlled for loop or a for-each
loop.  For this example take a look at how we'd write this with a for-each loop:

.. code-block:: java

    public boolean hasTitle(String t){
      boolean returnValue = false;
      for(Book b: this.shelfContents
      {
        String title = b.getTitle();
        if(title.equals(t))
        {
          returnValue = true;
        }
      }
      return returnValue;
    }

Here, we iterate through every Book object in the ArrayList ``shelfContents``.
In each iteration we declare a String variable called ``title`` that is set to
the title of whatever book we're looking at.

If we find a book with a title that matches our parameter String ``t``, we set
the boolean ``returnValue`` to ``true``. Once our loop has finished, we return
whatever ``returnValue`` has been set to.

However, once we find the book we're looking for, there is no need to continue
looking through the rest of the shelf.  Instead, lets get rid of ``returnValue``
and  revise our code to make better use of ``return`` statements.

.. code-block:: java

    public boolean hasTitle(String t){
      for(Book b: this.shelfContents
      {
        String title = b.getTitle();

        if(title.equals(t))
        {
          return true;
        }
      }
      return false;
    }


Return statements terminate a method on the line they're run.
Here, instead of returning either ``true`` or ``false`` after looping through all
of the books on the shelf, we stop as soon as we find one with a matching title.


Finding the First Object with a Counter-Controlled Loop
"""""""""""""""""""""""""""""""""""""""""""""""""""""""

It would be equally correct to implement this method with a counter-controlled
for loop.

.. code-block:: java

    public boolean hasTitle(String t){
      for(int i = 0; i < this.shelfContents.size(); i++)
      {
        Book b = shelfContents.get(i);
        String title = b.getTitle();

        if(title.equals(t))
        {
          return true;
        }
      }
      return false;
    }

You'll notice, outside of the how the actual for loop is structured, this implementation
is almost identical to the for-each implementation above.


The Break Keyword
"""""""""""""""""

Sometimes, we may want a loop to end early without causing the entire method to terminate.
In these situations, we can use the ``break`` command:

.. code-block:: java

    for(int i = 0; i < this.shelfContents.size(); i++)
    {
        Book b = shelfContents.get(i);
        String title = b.getTitle();

        if(title.equals(t))
        {
          break;
        }
    }
    System.out.println("Found it!");

Here, once a book with a matching title is found, the loop stops and the print statement
runs.

You can use a break statement with any type of iteration, running ``break`` in a for-each
or while loop will stop the loops in just the same way.


Finding the Last Object with a For Loop
"""""""""""""""""""""""""""""""""""""""

The loops above will find the first ``Book`` that matches the title passed as a paramter.
It can also be useful to find the last item in a List that matches our criteria.

For example, what if a person came to the library asking for "The Godfather" and I
remember putting that book on the shelf that just a moment ago.

if our shelfContents List contained 50 books, there is no need to search through
most of those if I know "The Godfather" is close to the end.

.. code-block:: java

    public boolean hasTitle(String t){
      for(int i = this.shelfContents.size(); i >= 0 ; i--)
      {
        Book b = shelfContents.get(i);
        String title = b.getTitle();

        if(title.equals(t))
        {
          return true;
        }
      }
      return false;
    }


This loop would start at the Book object at the highest index and work its way down
to the Book object at index 0.

Check Your Understanding: Loop Idioms
-------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/<TBD>.html ka
   :long_name: Loop Idioms



Accumulating an Answer: Calculate the Total number of Books by an Author
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Lets assume for this problem that someone has asked how many Stephen King books
our library carries.

.. code-block:: java

    public class Library{
      private List<Shelf> stacks;

      public Shelf(){
        stacks = new ArrayList<Shelf>();
      }

      public void addShelf(Shelf s){
        shelfContents.add(s);
      }

      //new method
      public int countBooksByAuthor(String auth){

      }

In this method, we want to use a loop to calculate the number of books by a given
author.  To do this, we will declare an ``int`` variable and initialize it to 0.
Then, we will need to iterate over every shelf in our library, and search every shelf
for any books that match our parameter ``auth``.  When we find one, we want to increment
the ``int`` variable by 1 using our ``++`` operator.  When we finish looping, we
finally want to return our ``int`` variable.

.. code-block:: java

    //new method
    public int countBooksByAuthor(String auth) {
      // declare our counter
      int counter = 0;

      // iterate over every shelf:
      for (Shelf s : this.stacks) {

          // iterate over every book on a given shelf
          List<Book> bookList = s.getShelfContents();
          for (Book b : bookList) {

              // if we find a book by our desired author...
              if (b.getAuthor().equals(auth)) {
                  // increase counter by 1
                  counter++;
              }

          }
      }
      // return our count
      return counter;
    }


Accumulating a Different Kind of Answer
"""""""""""""""""""""""""""""""""""""""

What if, instead of just knowing the number of Stephen King books our library has,
we wanted to pull them all into one place?  Here, we will use the same structure
to accumulate an as above, but we'll generate and return a List of Books.

.. code-block:: java

    public List<Book> getAllBooksByAuthor(String auth){
      //declare our ArrayList
      List<Book> allBooks = new ArrayList<Book>();

      //iterate over every shelf:
      for(Shelf s: this.stacks)
      {
          //iterate over every book on a given shelf
          List<Book> bookList = s.getShelfContents();
          for(Book b: bookList)
          {
            //if we find a book by our desired author...
            if(b.getAuthor().equals(auth))
            {
              //add the book to our ArrayList
              allBooks.add(b);
            }

          }
      }
      //return our count
      return allBooks;
    }

Here, instead of incrementing a counter variable, every time we find a book that
matches our author parameter, we add it to a new ArrayList.  Then after we've looked
everywhere, we return that ArrayList.

This can be useful when we have many items that fulfil the criteria in our if statement.



Generics
--------

So far, whenever we've worked with variables, we've always known what type they are.
For instance, whenever we're working with a ``String`` we'll declare a variable like
``String s = "Hello World";``.  However, there are some cases in Java when we'll
need to create methods without knowing what type of data we'll be working with.
For these, we use what is called the **Generic Type**.

Declaring classes that use the generic type construct involves using new syntax
to refer to the class name. Such classes and interfaces, including those in the
collections framework, use angle brackets containing one
or more variables (separated by commas) to refer to unspecified type names.
For example, you would use <E> or <K,V> to refer to unspecified type names.
Thus, names of classes or interfaces implemented with generic types are written
with the syntax ClassName<E>.

Lets take a look at a class that uses the generic type.  The following ``Box``
class can hold a piece of any type of data:

.. code-block:: java

    public class Box <T>{
      private T value;

      public Box(T val){
        value = val;
      }

      public T getValue(){
        return value;
      }

      public void setValue(T val){
        value = val;
      }

    }


We could then instantiate a ``Box`` object by running

.. code-block:: java

    Box<Integer> box1 = new Box<Integer>(42);


And not all ``Box`` objects need to be the same type:

.. code-block:: java

    Box<Integer> box1 = new Box<Integer>(42);
    Box<String> box2 = new Box<String>("banana");

In effect, the ``<T>`` serves as parameter for the type of objects that will be
stored in the ``Box``.

One benefit a generic type provides is type checking of method arguments at
compile time.  For example, the following code would cause an error when compiled:

.. code-block:: java

    Box<Integer> box1 = new Box<Integer>(42);
    box1.setValue("banana");

Thus, if a programmer wishes to create a List of String objects, using generic
types will help guarantee that the objects being stored are actually of type
String. In this way, using generic types helps to reduce the number of
programming errors and thereby makes programs safer and more robust.


Check Your Understanding: Generics
-----------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/<TBD>.html ka
   :long_name: Generics


The Null Keyword
----------------

When you create an object variable, remember that you are storing a reference
to an object. In Java, the keyword ``null`` is a special value that means "no
object". You can declare and initialize object variables this way:

.. code-block:: java

    Pixel pix = null;

Additionally, most objects will default to a value of ``null`` if they are declared
but not initialized:

.. code-block:: java

    Pixel pix;  // pix is null
    pix = new Pixel(0, 0); // pix now refers to a Pixel object

If you try to use a ``null`` value, either by accessing an attribute or invoking a
method, Java throws a ``NullPointerException``.  The following is an example of
code that will throw a null pointer exception.

.. code-block:: java

    Pixel pix;
    pix.setRed(0); // This was a cause a NullPointerException.

``NullPointerException``s are a common error for programmers to encounter.  Be
aware that if you see it in your own code, you're probably working with a variable
that hasn't been initialized yet!


Check Your Understanding: Null
------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/<TBD>.html ka
   :long_name: Null



Syntax Practice 2b: Subclass Constructors
-----------------------------------------

.. extrtoolembed:: 'Syntax Practice 2b: Subclass Constructors'
  :workout_id: 1343


Programming Practice 2
----------------------

.. extrtoolembed:: 'Programming Practice 2'
  :workout_id: 1344


Check Your Understanding
------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week9ReadingQuizSumm.html ka
   :long_name: Programming Concepts
