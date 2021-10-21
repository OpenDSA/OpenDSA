.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Arrays
======

So far in this class, we have used ``List``\ s  to store many pieces of data.  However,
while ``List``\ s  do have some advantages, do have a large flaw.  When working with a List,
you simply create the object and then can add as many objects to it as you like.
This means that Java doesn't know how much memory to allocate to store all of the
items in your ``List``.  It could be 10 or it could be 10,000.  It needs to keep re-allocating
memory as the ``List`` grows which can be inefficient.

Instead, often you'll see data stored in what are called **arrays**.  Like an
ArrayList, an array is a named collection of contiguous storage locations—storage
locations that are next to each other—that contain data items of the same type.
However, when working with an array, the size will be fixed from the start.

Creating An Array
-----------------

Creating an array looks a little different from an ``ArrayList``.  For example, let's
say we wanted to create an array to hold 10 Strings:

.. code-block:: java

   String[] arr = new String[10];

Instead of specifying a type called array, we simply use whatever type of data we
want to store in our array, followed by square brackets (``[]``).
In the square brackets on the right side of the equals sign, we specify the number
10.  This tells Java we want to create an array that will hold 10 items.

Similarly, if we'd wanted to create an array of 10 integers, we could run:

.. code-block:: java

   int[] arr = new int[10];

Importantly, once we establish the size of our array, we can't change it.  If we
suddenly decide we need an array of size 11 (for example), we'll need to create a new array.

Like objects, they are instantiated with the ``new`` operator and they have instance variables
(for example, ``length``).  Like variables for objects, array variables are
considered reference variables. When arrays are used as parameters, a reference
to the array is passed rather than a copy of the entire array. The
primary difference between arrays and full-fledged objects is that arrays
aren’t defined in terms of an Array class. Thus, arrays don’t fit into Java’s
Object hierarchy. They don’t inherit any properties from Object and
they cannot be subclassed.

When creating an array of Strings or any type of object (like Jeroo or Pixel),
each of the 10 items in our array will be initialized to ``null``.  If we created an
int (or double) array will initialize each of the slots to 0, and an array of booleans
will initialize each item to ``false``.

There is a second way we can create an array we can use if we know what we want
to put in the array when we create it.

For example, lets say we wanted to create an array to store the numbers: 97, 43, and 2.

.. code-block:: java

   int[] arr = {97, 43, 2};

This will make an array of size 3 that contains these three values (instead of having)
each value in the array initialize to 0.


Accessing Items in Arrays
-------------------------

Like ``ArrayList``s, the item in the first "slot" of our array is at index 0 and the
last item in the array is going to be one less than the size of the array.  For example,
the first item in an array of 5 is at index 0, and the last is at index 4.  Trying to access
the index 5 would cause an out-of-bounds error to occur at runtime.

However, arrays access the values a little bit differently, making use of the square
brackets again.

When referencing elements in an array, we refer to the position of the particular
element within the array. For example, if the array is named arr, then the elements are
named arr[0], arr[1], arr[2], ... arr[n-1], where n gives the number of elements
in the array. This naming also reflects the fact that
the array’s data are contained in storage locations that are next to each
other. In Java, as in C, C++, and some other programming languages, the
first element of an array has index 0.

The syntax for referring to elements of an array is:

.. code-block:: java

   arrayname [ subscript ]

where arrayname is the name of the array (any valid identifier will do) and
subscript is the position of the element within the array.

A subscript is an integer quantity contained in square brackets that is
used to identify an array element. An subscript must be either an integer
value or an integer expression.  For example, all the of the following lines
of code are valid ways to access a value in an array ``arr``

.. code-block:: java

   arr[4];

   int x = 3;
   arr[x];

   int y = 1;
   arr[x + y]

These examples show that when an expression, such as j + k, is used as a
subscript, it is evaluated (to 4 in this case) before the reference is made.

It is a syntax error to use a noninteger type as an array subscript. Each
of the following expressions would be invalid:


.. code-block:: java

   //these will not work!
   arr[5.0];
   arr["5"];


Setting items in an Array
-------------------------

When working in ``List``\ s , if we wanted to change a value, we could use the ``set``
method.  For example:

.. code-block:: java

   ArrayList <String> arr = new ArrayList<String>();
   arr.add("Brazil");
   arr.add("France");
   arr.add("Ethiopia");

   arr.set(0, "Columbia"); // changes the item at index 0 from Brazil to Columbia

When all of this code runs, the ``List`` would contain the strings: Columbia, France,
and Ethiopia in that order.

When working with an array, things are a little more simple.  We don't need to
call a method, we can treat ``arr[<any subscript>]`` just like a variable.

.. code-block:: java

   String[] arr = new String[3];
   arr[0] = "Brazil";
   arr[1] = "France";
   arr[2] = "Ethiopia";

   arr[0] = "Columbia"; / changes the item at index 0 from Brazil to Columbia



Check Your Understanding: Arrays
------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week10Quiz1Summ.html ka
  :long_name: Arrays

Iterating through Arrays
------------------------

Lets say we wanted to iterate through an array of ints to print them all out.

We could do this with a conter-controlled loop or a for-each loop.

Counter-Controlled Looping
~~~~~~~~~~~~~~~~~~~~~~~~~~

In this example, we want to create a for loop that will go through each index of
our array.


.. code-block:: java

   for(int i = 0; i < arr.length; i++){
       System.out.println(arr[i]);
   }


To recap for loops:

* The first index we want to see is 0, so we create a new variable called ``i``
and set it to 0

* Our last index is one less than the size of the array.  This means we should stop
when our counter is no longer less than the size of the array.  Thus, our stop condition
is ``i < arr.length``.

* We want to go through each index in the array so our increment is 1, so we write
``i++``

You may notice something different about our stop condition compared to when we
write for loops in a ``List``.

.. code-block:: java

   ArrayList<String> arrList = new <String>();
   arrList.size();

   String[] arr = new String[3];
   arr.length;

For our ``ArrayList``, ``size`` is a method we can call that will return a number.
When calling any method, we need parentheses.

For our array, ``length`` is a field so no parentheses needed!

Importantly, since the size of an array can't be changed once it has been created,
you won't be able to change length either.

.. code-block:: java

   String[] arr = new String[3];

   //this will not work!
   arr.length = 4;


When working with both ``List``\ s  and arrays, it's very easy to mix up when to use the
``size()`` method and when to use ``length``.  Equally tricky is that when
accessing the length of a String variable, we'd run  a *method* called ``length()``.

.. code-block:: java

   String[] arr = new String[3];
   int x = arr.length; //x is set to the value 3

   String str = "Hello";
   int y = str.length(); // y is set to the value 5

Be sure to keep careful track of what type of data you're working with so you can
access the number of contents in that thing correctly!


Looping with For-Each
~~~~~~~~~~~~~~~~~~~~~

Looping through an array with a for-each loop looks largely the same as with a
List structure:


.. code-block:: java

   String[] arr = {"Espresso", "Mocha", "Decaf", "Americano"};

   for(String s: arr){
       System.out.println(s);
   }


Check Your Understanding: Iterating with Arrays
-----------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week10Quiz2Summ.html ka
  :long_name: Iterating with Arrays


Dimensions in an Array
----------------------

So far when working with ``List``\ s  or arrays, we've worked with what are called
**one-dimensional arrays**.  That is, we've been working with a single row of values.

But we what if we wanted to create an array of arrays?

A **two-dimensional array**, an array whose components are themselves arrays,
is necessary or useful for certain kinds of problems. For example,
you would use this type of array if you are doing a scientific study in
which you have to track the amount of precipitation for every day of the
year.

One way to organize these data would be to create a one-dimensional
array, consisting of 365 elements:

.. code-block:: java

   double[] rainfall  = new double [ 365 ];

However, with this representation, it would make it very difficult to calculate
the average rainfall within a given month, which might be an important part of
your study.

A better representation for this problem would be to use a two-dimensional array,
one dimension for the months and one for the days.

The following statement declares the array variable ``rainfall`` and creates a
12 by 31 array object as its reference:

.. code-block:: java

   double[] rainfall  = new double[12][31];

Thus, ``rainfall`` is an array of arrays. You can think of the first array as
the 12 months required for the problem. And you can think of each month
as an array of 31 days. The months will be indexed from 0 to 11, and the
days will be indexed from 0 to 30.

The problem with this representation is that when we want to refer to
the rainfall for January 5, we would have to use ``rainfall[0][4]``.
This is awkward and misleading.

The problem is that dates (like 12/31/2021) start their counting at 1, while arrays
start counting at 0.

Because it will be difficult to remember this fact,
our representation of the rainfall data may cause us to make errors when we start
writing our algorithms. We can easily remedy this problem by just defining our
array to have an extra month and an extra day each month:

.. code-block:: java

   double[] rainfall  = new double[13][32];

This representation creates an array with 13 months, indexed from 0 to 12,
with 32 days per month, indexed from 0 to 31. However, we can simply
ignore the 0 month and 0 day by using unit indexing in all of the algorithms that
 process the array. In other words, if we view this array as
a two-dimensional table, consisting of 13 rows and 32 columns, we can
leave row 0 and column 0 unused.

.. odsafig:: Images/ArrayDiagram.png
   :align: center

As the figure above shows, the very first element of this 416-element array
has subscripts (0,0) while the last location has subscripts (12,31). The main
advantages of this representation is that the program as a whole will be
much easier to read and understand and much less prone to error.

In order to refer to an element in a two-dimensional array, you need to
use two subscripts. For the ``rainfall`` array, the first subscript will specify
the month and the second will specify the day within the month. Thus, the
following statements assign 1.15 to the ``rainfall`` element representing
January 5, and then print its value:


.. code-block:: java

   double[] rainfall  = new double[13][32];
   rainfall[1][5] = 1.15; // rainfall for January 1st is 1.15


Just as in the case of one-dimensional arrays, it is an error to attempt
to reference an element that is not in the array. Each of the following
examples would cause Java to raise an ``IndexOutOfBoundsException``:

.. code-block:: java

   double[] rainfall  = new double[13][32];
   rainfall[13][32] = 1.15; // no such element
   rainfall[11][33] = 1.15; // no such column
   rainfall[14][2] = 1.15; // no such row


Check Your Understanding: 2D Arrays
-----------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week10Quiz3Summ.html ka
  :long_name: 2D Arrays


Iterating through a 2D array
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As we've mentioned before, a double array will automatically initialize every value
to 0 so we do not need to initialize the elements. Remember if we were working with
Strings or objects, this would not be the case!

However, for many array problems it is necessary to initialize the array elements
to some other value. For a two-dimensional array, this would require a nested loop.
To illustrate this algorithm, let’s use a nested for loop to initialize each element
of the ``rainfall`` array to 0:

.. code-block:: java

   for (int month = 1; month < rainfall.length ; month++)
   {
      for (int day = 1 ; day < rainfall [month ].length ; day++)
      {
        rainfall [month][day] = 0.0 ;
      }
   }

Note that both for loops start at 1 as we're not using row or column 1.

Remember that when you have a nested for loop, the inner loop iterates faster.
Thus, for each month, the inner loop will iterate over 31 days. This is equivalent
to processing the array as if you were going across each row and then down to
the next row in the representation shown in the picture in the previous section.

Note that for a two-dimensional array, both dimensions have an associated length
variable, which is used in this example to specify the upper bound of each for loop.
For the ``rainfall`` array, the first dimension (months) has a length of 13 and the
second dimension (days) has a length of 32.

Another way to view the ``rainfall`` array is to remember that it is an array of arrays.
The length of the first array, which corresponds to the
number (13) of months, is given by ``rainfall.length``. The length of
each month’s array, which corresponds to the number of days (32) in a
month, is given by ``rainfall[month].length``.

The outer loop of the nested for loop iterates through months 1 through
12, and the inner for loop iterates through days 1 through 31. In this way,
372 = 12 × 31 elements of the array are set to 0.0.


Check Your Understanding: Iterating with 2D Arrays
--------------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week10Quiz4Summ.html ka
  :long_name: Iterating with 2D Arrays


Syntax Practice 10
------------------

.. extrtoolembed:: 'Syntax Practice 10'
   :workout_id: 1513


Programming Practice 10
-----------------------

.. extrtoolembed:: 'Programming Practice 10'
   :workout_id: 1514


Check Your Understanding
--------------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week10ReadingQuizSumm.html ka
   :long_name: Programming Concepts
