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
