.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Multi-dimensional Arrays
========================

Dimensions in an Array
----------------------

So far when working with ``List``\ s  or arrays, we've worked with what are called
**one-dimensional arrays**.  That is, we've been working with a single row of values.

But we what if we wanted to create an array of arrays?

A **two-dimensional array**, an array whose components are themselves arrays,
is necessary or useful for certain kinds of problems.  For example, you would use this type of array if you are doing a scientific study in
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
ignore the 0 month and 0 day by using unit indexing in all of the algorithms
that process the array. In other words, if we view this array as
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

.. avembed:: Exercises/IntroToSoftwareDesign/Week11Quiz1Summ.html ka
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

.. avembed:: Exercises/IntroToSoftwareDesign/Week11Quiz2Summ.html ka
   :long_name: Iterating with 2D Arrays


Multi-Dimensional Arrays
------------------------

Java doesn’t limit arrays to just two dimensions. For example, suppose
we decide to extend our rainfall survey to cover a ten-year period. For
each year we now need a two-dimensional array. This results in a three-dimensional
array consisting of an array of years, each of which contains
an array of months, each of which contains an array of days:

.. code-block:: java

   int years = 10;
   int months = 13;
   int days = 32;

   double [][][] rainfall = new double[years][months][days]

Following the design convention of not using the 0 month and 0 days, we
end up with a 10 × 13 × 32 array.

In the figure below, each year of the rainfall data is represented as a separate
page. On each page, there is a two-dimensional table that consists of 12
rows (1 per month) and 31 columns (1 per day).

.. odsafig:: Images/3DArrayGraphic.png
   :align: center

the following algorithm would be used to initialize all elements of our
three-dimensional rainfall array:

.. code-block:: java

   for (int year = 1; year < rainfall.length ; year++)
   {
      for (int month = 1 ; month < rainfall[year].length ; month++)
      {
        for(int day = 1 ; day < rainfall[year][month].length; day++)
        {
          rainfall[year][month][day] = 0.0;
        }
      }
    }

Note again the proper use of the length attribute for each of the
three dimensions of the array. In the outer loop, rainfall.length,
we’re referring to the number of years. In the middle loop,
rainfall[year].length, we’re referring to number of months within
a given year. In the inner loop, rainfall[year][month].length,
we’re referring to the number of days within a month.

If we added a fourth dimension to our array and wanted to extend
this algorithm to initialize it, we would simply embed the three-level loop
within another for loop that would iterate over each city.

Initializing a Multi-Dimensional Array
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If we didn't want to use loops like the code above, we could also initialize our
multi-dimensional array using our alternate method we saw for one-dimensional arrays.

To recap, we could initialize an array of ints like this:

.. code-block:: java

   int[] arr = {1, 2, 3};

For multi-dimensional arrays we could write:

.. code-block:: java

   int[][] arr2D = {{1, 2, 3}, {4, 5, 6}};
   String[][][] arr3D = {
     {{"a", "b"}, {"c", "d"}},
     {{"e", "f"}, {"g", "h"}}
   };

Below, we see an array of double consisting of three rows, each of which has a different
number of elements. The first row contains three elements, the second
contains two elements, and the last row contains four elements. As this
last example shows, the rows in a multidimensional array don’t all have
to have the same length.

.. code-block:: java

   double[][] arrDifferent = {
    {1.0, 2.0, 3.0},
    {4.0, 5.0},
    {6.0, 7.0, 8.0, 9.0}
   };

Initializing arrays like this, is feasible only for relatively small arrays.
To see why, just imagine what the initializer expression would be for our
three-dimensional rainfall array. It would require 4,160 (or 10 × 13 × 32)
zeroes, separated by commas!


Integer Division and Modulus
----------------------------

Suppose you have a measurement in inches and you want to convert to feet and
inches. The goal is divide by 12 (the number of inches in a foot) and keep the
remainder.

We have already seen the division operator (``/``), which computes the quotient
of two numbers. If the numbers are integers, it performs integer division, which
rounds to the nearest integer and thus does not have remainders.

Java also provides the **modulus** operator (``%``), which divides two numbers and
computes the remainder.

Using division and modulus, we can convert to feet and inches like this:

.. code-block:: java

   quotient = 76 / 12; // division
   remainder = 76 % 12; // modulus


The first line yields 6. The second line, which is pronounced “76 mod 12”,
yields 4. So 76 inches is 6 feet, 4 inches.

The modulus operator looks like a percent sign, but you might find it helpful
to think of it as a division sign (÷) rotated to the left.

The modulus operator turns out to be surprisingly useful. For example, you
can check whether one number is divisible by another: if ``x % y`` is zero, then
``x`` is divisible by ``y``.

For example, if we wanted to write an if statement that only ran if an int x was divisible by 5,
we'd write

.. code-block:: java

   if(x % 5 == 0){
    //do some action
   }

You can use modulus to "extract" digits from a number:
``x % 10`` yields the rightmost digit of x, and x % 100 yields the last two digits.
Also, many encryption algorithms use the modulus operator extensively


Check Your Understanding: Modulus
---------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week11Quiz3Summ.html ka
   :long_name: Modulus






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

.. avembed:: Exercises/IntroToSoftwareDesign/Week11ReadingQuizSumm.html ka
   :long_name: Programming Concepts
