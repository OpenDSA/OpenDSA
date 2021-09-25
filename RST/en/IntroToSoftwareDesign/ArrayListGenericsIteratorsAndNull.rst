.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


ArrayLists, Generics, Iterators, and the Null Keyword
=====================================================


A Pixel Class
-------------

A digital image such as the one at the right is composed of a two-dimensional grid of dots.
The dots are pixels, which is a contraction of "pixel element". When magnified the
individual pixels can be observed. The number of pixels that compose an image determines
the quality of the image (resolution). The more pixels (e.g., 640 x 480; listed as
horizontal x vertical numbers, or width x height), the higher the resolution.


.. odsafig:: Images/PixelatedImage.png
   :align: center



RGB Colors
~~~~~~~~~~

Each pixel value is represented as three ``int`` components, red, blue, and
green, each with a potential value from 0 to 255.  We usually represent these as a set of 3
ints in the following way (RED, BLUE, GREEN).  For example, the RGB value (0,0,0) is  black
and the RGB  color (255, 255, 255) is white. For more examples, take a look `here <https://
www.rapidtables.com/web/color/RGB_Color.html>`_.

With these three values, we could represent any given color as a point on a three
dimensional plane:

.. odsafig:: Images/ColorSpace1.png
   :align: center

This sort of cube is called a three dimensional
`Color Space <https://en.wikipedia.org/wiki/RGB_color_space>`_.
You can see from the image above that there's a straight, diagonal line from
black at (0,0,0) to white at (255, 255, 255) that represents different shades of grey.

In the figure below we can see a series of colors on the left, and their RGB values in the
same location on the right.  For example, you can see a white square on the top left corner
of the left grid, and the RGB value for white in the top left corner of the grid on the
right:


.. odsafig:: Images/RGBValues.png
   :align: center

To alter an image requires changing the RGB values of the pixels. This task can be
accomplished with image processing programs such as Adobe Photoshop. However if one wishes
to transform an image in a manner not possible using pre-existing software one must learn
how to program.


Putting it all Together
~~~~~~~~~~~~~~~~~~~~~~~~

You could define a pixel class in a number of different ways.  For our purposes let's work with one that looks like this:

.. code-block:: java

public class Pixel{
   private int rValue;
   private int gValue;
   private int bValue;

   private int xCoord;
   private int yCoord;

   public Pixel(int x, int y){
     xCoord = x;
     yCoord = y;

     rValue = 0;
     gValue = 0;
     bValue = 0;

   }

   public int getRed() {
       return rValue;
   }

   public void setRed(int rValue) {
       this.rValue = rValue;
   }

   /*
    * getter and setter methods for the other colors would go here
    */


Notably, since we want any given ``Pixel`` object to represent a single pixel on
screen, we would probably not create setters for ``xCoord`` and ``yCoord`` since
we wouldn't want other code to be able to change which pixel we were talking about.



ArrayLists
----------

Last week, we worked on saving specific pieces of data to variables.  For
example, if we had one ``Pixel``, we could create a variable and maybe run some
methods to turn that pixel white.

.. code-block:: java

   Pixel p1 = new Pixel(0,0);
   p1.setRed(255);
   p1.setGreen(255);
   p1.setBlue(255);

However, odds are if we are working with pixels we won't be considering singular
 ones, but a whole image's worth.  If we wanted to, we could create a variable
 to represent each ``Pixel`` object...

.. code-block:: java
   Pixel p1 = new Pixel(0,0);
   Pixel p2 = new Pixel(1,0);
   Pixel p3 = new Pixel(2,0);
   //And so on...
   Pixel p592 = new Pixel(591, 0);


However, this becomes pretty tedious and inefficient pretty quickly.  Instead,
there's another way we can store many values in one variable using what's called
an ArrayList.  An ``ArrayList`` is a **collection**, which is an object that
contains other objects or values.

Take a few minutes to watch the following video:

.. raw:: html

  <iframe width="560" height="315" src="https://www.youtube.com/embed/XkJD80HmpdI?start=0&end=1156" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In an ``ArrayList``, data are arranged in a linear or sequential structure, with
one element following another, but are all accessed through the same variable.
For example, if we had an ArrayList of integers, it might look like this:


.. odsafig:: Images/ArrIdea.png
   :align: center

The large numbers inside the boxes are the elements of the ArrayList. The small
numbers outside the boxes are the **indexes** (or indices) used to identify each
location in the ArrayList. Notice that the index of the first element is 0, not
1, as you might have expected.  These ArrayLists are not like the Microworlds we
have worked with before!  Forgetting this fact is an easy mistake to make.

Programming with ArrayLists
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Lets try re-creating the image above as an ArrayList in code.

Adding an Import
""""""""""""""""

Before we can start though, we need to add an import statement to our code:

.. code-block:: java
   import java.util.ArrayList;

Without this, java will not recognize what an ArrayList is.

Declaring and Instantiating an ArrayList
""""""""""""""""""""""""""""""""""""""""

Once we have our import we can proceed to use declare and instantiate an ArrayList just
like any other object

.. code-block:: java
   ArrayList<Integer> arr = new <Integer> ArrayList();


There is one small difference between this and a normal object declaration we've seen
before though.  This time, after we specify our we're creating an ArrayList, we say
`<Integer>`.  This tells Java that this ArrayList will only store integers.  We'll get into
more of what we can do with this sort of type specification next week, but for now, know
that whatever type of data we are storing, we need to specify it in the variable
declaration using ``<>``.  For example, if we were storing Jeroo objects we'd specify
<Jeroo>, or <Pixel> if we were storing Pixel objects.

You may also notice we used the word ``Integer`` instead of ``int``.  This has to do with
what are called "primitive types" versus objects.  We'll get more into what the differences
between these two things are next week.  For now, just know that if you wanted to create an
ArrayList of ``double``s, you'd specify ``<Double>``.  For ``boolean``s, you'd similarly
use ``<Boolean>``.

Adding our Numbers
""""""""""""""""""

An ArrayList, just like anything else in Java, is a class and has a set of methods we can
call.  To add an item to our ArrayList, we could use the `add` method.

.. code-block:: java
   ArrayList<Integer> arr = new ArrayList<Integer>();
   arr.add(-2);

After this code runs, our ``ArrayList`` would look like this:

.. odsafig:: Images/ArrayListAfterOneAdd.png
   :align: center


If we added another value...

.. code-block:: java
   arr.add(8);

our ``ArrayList`` would look like this:

.. odsafig:: Images/ArrayListAfterTwoAdds.png
   :align: center



Accessing our Numbers
"""""""""""""""""""""

Lets assume we've added all 15 numbers as seen in the diagram above to our ArrayList, but
then wanted to access the second number.

To access the second item in our ArrayList, we would run code like this.

.. code-block:: java
   arr.get(1); // gets the second item in our ArrayList (8)

It is important to note that, unlike our MicroWorlds, even though this is the second item
in our ArrayList, it is at index 1.  The first item of an ArrayList will always be at index
0.

.. admonition:: Indexing

   For any ArrayList of length `n`, the first item will be at index 0, and the last at
   index `n-1`.

Changing Numbers
""""""""""""""""

We can's treat this method call just like we would any other ``int`` variable.  Instead, we
use another ArrayList method to change an existing entry's value.

.. code-block:: java

   arr.set(1, 4);


When we call this `set` method, we have to specify two things.  First, the index of the
location we want to change.  In our case, we are trying to change the *second* item in our
ArrayList which should be at index *one*.  This first argument will always be a number.

We want to change the value of the second item in the ArrayList to 4, so `4` is our second
argument.  If we'd had an ArrayList of Pixel objects and wanted to use the set method, it
may look like this:

.. code-block:: java
   Pixel p = new Pixel(1,0);
   arr.set(1, p);

Keep in mind though that an ArrayList is only as big as the number of items you have added
to it.  So the following code would break:

.. code-block:: java

   Pixel p1 = new Pixel(0,0);
   Pixel p2 = new Pixel(1,0);
   Pixel p3 = new Pixel(2,0);

   ArrayList<Pixel> arr = new ArrayList<Pixel>();
   arr.add(p1);
   arr.add(p2);
   arr.add(p3);
   arr.set(3, p1); // this line would break as there is not index 3 yet.

The code above would compile, but would fail when you tried to run it.  Again, `p1` is
stored at index 0, `p2` at index 1, and `p3` at index 2.  This ArrayList contains 3 items,
but since it ends at index 2, this set would fail.

In short, if you your code fails and you see an "IndexOutOfBoundsException", you're trying
to access a location in the ArrayList that doesn't exist.

Other Methods for ArrayLists
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following is a table of methods you might need for an ArrayList.

.. list-table:: ArrayList Methods
   :header-rows: 1

   * - Method Name
     - Purpose
     - Example
   * - ``remove``
     - Removes the value at the index specified in the parameters
     - ``arr.remove(2)``// Removes the third item in the ArrayList
   * - ``contains``
     - returns ``true`` if the ArrayList has an item of that value stored, otherwise ``false``.
     - ``arr.contains(4)``
   * - ``size``
     - returns an ``int`` number representing the total number of items in the ArrayList.  Note: this will always be one larger than the highest index!
     - ``arr.size()``

Check Your Understanding: ArrayLists
-----------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week6Quiz1Summ.html ka
  :long_name: ArrayLists



For Each Loops
--------------

Up until now, we have created ``while`` loops in our programs.  These types of loops are
really useful when we know when we want to stop, but don't necessarily know how long it
will take to get there.  For example, a ``while`` loop is a perfect fit for when we want a
Jeroo to hop as many flowers as it sees, but don't know how many flowers that will end up
being.

Once we have an ArrayList of things, it is fairly common for us to want to perform some
action on every item and stop when we run out of items.  In this situation, a ``for-each``
loop is the best fit for our needs.  This is because a for-each loop does not run the risk
of looping infinitely if created incorrectly.  It will always look at each item in a
collection once, then move on to the next one, then finish.

Lets assume we have an ArrayList of 450 pixel objects called ``pixelList``, and want to set
each one's color to black (which has an RGB value of (0,0,0)).

We would write a for-each loop that looked like this:

.. code-block:: java

   for(Pixel pi: pixelList)
   {
    pi.setRed(0);
    pi.setBlue(0);
    pi.setGreen(0);
   }

In English, the code above, would read "for each Pixel object in pixelList, set red to 0,
green to 0, and blue to 0".

The For-Each Loop Syntax
~~~~~~~~~~~~~~~~~~~~~~~~

The template a for each loop looks like this:

.. code-block:: java

   for(datatype variableName : arrayListName)
   {
       //body of for-each loop
   }


Looking at this, you should see some similarities to the other control structures you have
seen in this class.  We have a keyword (in this case ``for``), a set of parentheses, an
open bracket on the next line by itself, the body of the loop indented with four spaces,
and a closing bracket (indented to line up with the opening one).

Inside the parentheses this time, we see a type of variable declaration.  In the case
above, we are declaring a variable called ``pi`` that is of type ``Pixel``.  This variable
is only usable within the curly brackets of the for-each loop.  After that closing curly
bracket, you cannot use or reference ``pi``.

Then, instead of ending our variable declaration with a semicolon, we use a colon (``:``).
Again this is unique to the for-each loop.  Then we have the data structure we are going to
iterate over.

The first time through this loop, ``pi`` would represent the Pixel object at index 0.  Once
everything in the body of the loop had executed, ``pi`` would change to represent the Pixel
object at index 1.  Once the loop body has executed the Pixel in the final index, the loop
will terminate and move on to the next line of code.

Using Outside Variables in Loops
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Another common action for these kinds of loop is to change some variable external to the loop using an ArrayList's contents.

Assuming we had some ArrayList of integers, we could calculate the total by doing:

.. code-block:: java

   public int getTotal(ArrayList<Integer> arr)
    {
      int total = 0;
      for(int value : arr)
      {
          total = total + value;
      }
      return total;
    }

This may seem like an odd piece of code.  How can the variable `total` be on both sides of
the equals sign?  Remember that when Java evaluates this statement, it will perform the
math first, then assign that value to the variable on the left.  For example say ``arr``
was an ArrayList of 3 ``int`` values: 1, 2, and 3.

When the variable ``total`` is initially declared, it is initialized to 0.  The first time
through this for loop, ``value`` represents the number 1 (the first item in the
ArrayList).  This means when we say ``total = total + value`` we're really saying ``total =
0 + 1``.

The second time the body of this loop executes, ``total`` equals 1 and ``value`` equals 2
(the second item in this ArrayList).  This time, when ``total = total + value`` is run, it
translates to ``total = 1 + 2``.  Thus, this time through ``total`` is set to 3.

The last time through ``total`` now equals 3 and ``value`` equals 3.  ``total = total +
value`` then sets the variable ``total`` to 3 + 3, or 6.  Finally, the value 6 is returned
once our for-each loop terminates.

Check Your Understanding: For-Each Loops
----------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week6Quiz2Summ.html ka
  :long_name: For-Each Loops



Maybe add in: Generics
----------------------

Declaring classes that use the generic type construct introduced in Java 5.0
involves using new syntax to refer to the class name. Such classes and interfaces,
including those in the collections framework, use angle brackets
containing one or more variables (separated by commas) to refer to unspecified type names.
For example, you would use <E> or <K,V> to refer
to unspecified type names. Thus, names of classes or interfaces implemented with generic
types are written with the syntax ClassName<E>.  In effect, the <E> serves as parameter for
the type of objects that will be stored in the class.

One benefit a generic type provides is type checking of method arguments at compile time.
If we had an ``ArrayList<Integer> arr``, then the following line would produce a compile
time error.

.. code-block:: java

   arr.add(3.4); //produces an error

By contrast, if arr was just a plain ArrayList object with no type specified no error would
be found at compile time. Thus, if a programmer wishes to create an array of ``double``
objects, using generic types will help guarantee that the objects being stored are actually
of type ``double``. In this way, using generic types helps to reduce the number of
programming errors and thereby makes programs safer and more robust.


Check Your Understanding
------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week6ReadingQuizSumm.html ka
  :long_name: Programming Concepts
