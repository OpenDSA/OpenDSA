.. avmetadata::
   :title: Fixed-Size 1D Arrays and Array Idioms
   :author: Molly Domino; Stephen Edwards
   :institution: Virginia Tech
   :keyword: Array; 1D Array; Array Indexing; Length; Aliasing; Linear Search; Extrema; Frequency Histogram; AssertJ
   :naturallanguage: en
   :programminglanguage: Java
   :description: Introduction to fixed-size 1D arrays, indexing, reference semantics, comparison with lists, array traversal, accumulator idioms, frequency histograms, linear search, and extrema algorithms with tie-breaking.


Fixed-Size 1D Arrays and Array Idioms
=====================================

.. |br| raw:: html

   <br />

.. sidebar:: Learning Objectives

    **Estimated Time**: ~89 minutes (~45 min reading + ~44 min video at 100 WPM)

   After reading this chapter, you will be able to:

   * **Declare**, instantiate, and initialize fixed-size 1D arrays of primitive types and object references using both ``new`` allocation and array initializer literals.
   * **Contrast** fixed-size 1D arrays with ``ArrayList`` collections in terms of memory layout, resizing capabilities, primitive type storage, and syntax.
   * **Trace** array reference assignments, identify aliasing defects, and implement independent array copies using manual loops and ``Arrays.copyOf()``.
   * **Select** and construct the appropriate loop structure (counter-controlled numeric ``for`` vs. enhanced ``for-each``) based on whether the algorithm requires index manipulation, element modification, or read-only inspection.
   * **Apply** the modulo operator (``%``) to implement circular array wrap-around, cyclic domain mapping, and periodic loop operations.
   * **Implement** accumulator algorithms to compute sums, averages, and condition-filtered counts across array elements.
   * **Implement** frequency accumulation algorithms mapping discrete domain attributes directly to array bucket indices.
   * **Author** linear search algorithms to locate target values or indices, returning sentinel values (``-1``) on search misses.
   * **Author** extrema search algorithms to determine maximum and minimum values and their index positions with deterministic tie-breaking.
   * **Design** automated JUnit unit tests verifying array state and method return values using AssertJ assertions (``containsExactly``, ``hasSize``, ``contains``).


So far, we have used ``List`` objects (specifically ``ArrayList``) whenever we
needed to store and manage multiple pieces of data in a single container. Lists
provide powerful capabilities, including dynamic resizing and convenient helper
methods. However, they are not the only container mechanism in Java, nor are they
the most fundamental.

In this chapter, we will study Java's foundational container structure: the
**array**. An **array** is a named collection of contiguous storage locations in
computer memory that hold elements of the same data type. Unlike an ``ArrayList``,
an array has a **fixed size** established at the moment of creation that can never
grow or shrink.

Arrays are primitive, low-level building blocks. In fact, classes like ``ArrayList``
use an array internally to store their data elements! Understanding how arrays work
is essential for every computer scientist: they offer superior execution performance,
store primitive types directly without wrapper overhead, and form the basis for
multi-dimensional grids and matrix algorithms.

.. odsafig:: Images/jjj-array-fig9.1.png
   :align: center

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/ei_4Nt7XWOw?start=21" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Introduction to Fixed-Size 1D Arrays
------------------------------------

An **array** is a sequence of values; the values stored within the array are called
its **elements**. An array can store elements of any single type—such as ``int``,
``double``, ``boolean``, ``String``, or custom objects like ``Pixel`` or ``Card``.
However, all elements within a given array must share the same type, known as the
array's **element type**.

To use an array, you declare a reference variable of an array type and then instantiate
the array object using the ``new`` operator. In Java, array types are denoted by
placing square brackets (``[]``) after the element type:

.. code-block:: java

   int[] counts = new int[4];
   double[] values = new double[size];

Notice that Java has no special "array" keyword. Instead, appending ``[]`` to any type
turns it into an array type. In the example above:

1. ``int[] counts`` declares a variable named ``counts`` whose type is "array of integers".
2. ``new int[4]`` instantiates a brand new array object in memory with exactly 4 integer slots.
3. The assignment operator (``=``) stores the reference to that array in ``counts``.

When allocating an array, the size expression inside the brackets must evaluate to a
non-negative integer. If you attempt to allocate an array with a negative size (e.g.,
``new int[-3]``), Java will throw a ``NegativeArraySizeException``. Allocating an
array of size zero is permitted and produces an "empty array" (often used to represent
the absence of data without using ``null``).

.. note::

   **Fixed Capacity**: Once an array object is instantiated, its size is immutable.
   If your program subsequently needs to hold more (or fewer) items, you must allocate
   a completely new array object and copy the existing elements over.


Array Bounds, Indexing, and Default Values
------------------------------------------

Each individual storage slot in an array is identified by a numeric position called
its **index** (or **subscript**). Java arrays use **zero-based indexing**, exactly like
positions in a ``List`` or characters in a ``String``:

* The first element is located at index ``0`` (the "zeroth" element).
* The second element is at index ``1``.
* The final element is located at index ``array.length - 1``.

To read or write an individual element, specify the array name followed by the index
enclosed in square brackets:

.. code-block:: java

   int[] counts = new int[4];

When an array is allocated with ``new``, Java automatically initializes every element
to a predictable default value based on the element type:

* Numeric types (``int``, ``long``, ``short``, ``byte``): initialized to ``0``
* Floating-point types (``double``, ``float``): initialized to ``0.0``
* Boolean types (``boolean``): initialized to ``false``
* Reference types (``String``, objects): initialized to ``null``

The following memory diagram illustrates the state of ``counts`` immediately after
instantiation:

.. odsafig:: Images/thinkjava2_016.png
   :align: center

The variable ``counts`` holds a **reference** (indicated by the arrow) to the array
object in memory. Inside the array, the bold numbers represent the initial element
values (all ``0``), while the numbers above indicate the valid index positions (0 through 3).

Every array has a special, built-in constant field named ``length`` that stores the
number of elements in the array:

.. code-block:: java

   System.out.println("The array has " + counts.length + " slots."); // prints 4

.. important::

   **The length Field Has No Parentheses**:

   * For arrays, ``length`` is a **read-only field**: ``counts.length``
   * For strings, ``length()`` is a **method**: ``str.length()``
   * For lists, ``size()`` is a **method**: ``list.size()``

   Because ``length`` is a constant field, you cannot assign a new value to it
   (e.g., ``counts.length = 10;`` will not compile).

You can use the index operator ``[]`` anywhere a regular variable is permitted—in
expressions, assignments, or method arguments:

.. code-block:: java

   counts[0] = 7;
   counts[1] = counts[0] * 2; // counts[1] becomes 14
   counts[2]++;               // counts[2] becomes 1
   counts[3] -= 60;           // counts[3] becomes -60

After executing these statements, the array's contents in memory become:

.. odsafig:: Images/thinkjava2_017.png
   :align: center

If you attempt to access an index that is negative, or greater than or equal to
``length`` (such as ``counts[4]`` or ``counts[-1]``), Java immediately throws an
``ArrayIndexOutOfBoundsException`` and halts execution.

.. raw:: html

   <div class="align-center">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/1hUUsuDfmSw?start=40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Arrays Compared to Lists (ArrayList)
------------------------------------

Because you have already worked with ``List`` and ``ArrayList`` in Chapter 8,
comparing arrays directly with lists highlights their key differences:

.. list-table::
   :widths: 25 35 40
   :header-rows: 1

   * - Feature
     - Fixed-Size 1D Array (``int[]``)
     - Generic List (``ArrayList<Integer>``)
   * - **Capacity**
     - Fixed at instantiation (cannot resize)
     - Dynamic (grows and shrinks automatically)
   * - **Primitive Storage**
     - Stores primitive types directly (high efficiency)
     - Requires boxed wrapper classes (e.g., ``Integer``)
   * - **Element Access**
     - Subscript syntax: ``arr[i]``
     - Accessor method: ``list.get(i)``
   * - **Element Mutation**
     - Subscript assignment: ``arr[i] = val;``
     - Mutator method: ``list.set(i, val);``
   * - **Size Query**
     - Constant field: ``arr.length`` (no parentheses)
     - Method call: ``list.size()``
   * - **Method Richness**
     - No instance methods; uses ``java.util.Arrays``
     - Rich instance methods (``add``, ``remove``, ``contains``)

When should you choose an array over an ``ArrayList``?
 
* **Use an array** when the number of elements is fixed or known in advance (such as 24 hours in a day, 7 days in a week, or 60 minutes in an hour), when maximizing execution speed and memory efficiency is paramount, or when building multi-dimensional grid boards.
* **Use an ArrayList** when the collection needs to grow or shrink dynamically as elements are added or removed, or when you need built-in search and reordering methods.

.. raw:: html

   <div class="align-center">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/NbYgm0r7u6o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Initializing, Printing, and Naming Arrays
-----------------------------------------

When you know the initial values of your array elements in advance, Java provides a
convenient shorthand known as an **array initializer literal**:

.. code-block:: java

   String[] coffees = {"Espresso", "Mocha", "Decaf", "Americano"};
   int[] primes = {2, 3, 5, 7, 11, 13};

This single statement accomplishes three tasks simultaneously:

1. Allocates an array whose length matches the number of comma-separated items inside the braces.
2. Initializes each slot in sequence with the specified values.
3. Assigns the reference to the variable.

Initializer literals are ideal for small, known sequences. For larger arrays, you will
typically allocate the array with ``new`` and use a loop to initialize the contents:

.. code-block:: java

   int[] numbers = new int[100];
   for (int i = 0; i < numbers.length; i++)
   {
       numbers[i] = i * 2; // sets slots to 0, 2, 4, 6, ..., 198
   }

Printing Arrays
~~~~~~~~~~~~~~~

If you attempt to print an array directly using ``System.out.println()``:

.. code-block:: java

   int[] values = {1, 2, 3, 4};
   System.out.println(values);

The console output will display something cryptic:

.. code-block:: text

   [I@bf3f7e0

In Java, ``[I`` indicates an array of ``int``\ s, followed by ``@`` and the hexadecimal
hash code of the object in memory. Arrays do not override ``toString()`` from ``Object``!

To display the elements of an array, use the utility method ``Arrays.toString()``
provided by the ``java.util.Arrays`` library:

.. code-block:: java

   import java.util.Arrays;

   // ...
   System.out.println(Arrays.toString(values)); // prints: [1, 2, 3, 4]

Naming Array Variables
~~~~~~~~~~~~~~~~~~~~~~

Because an array represents a collection of items, standard Java naming conventions
dictate using **plural nouns** for array variables:

.. code-block:: java

   double[] scores = new double[10];
   String[] studentNames = new String[25];
   Card[] deck = new Card[52]; // or collective singular noun

A plural name clarifies that the identifier refers to the entire collection, which
reads naturally in loops (e.g., ``for (double score : scores)``). Use a singular name
only when the array represents a single logical domain entity where you refer almost
exclusively to indexed properties (e.g., ``grid[row][col]``).


Array Reference Semantics, Aliasing, and Copying
------------------------------------------------

Array variables in Java are **reference variables**. When you assign one array variable
to another, Java copies only the memory reference—it does **not** create a new array:

.. code-block:: java

   double[] a = new double[3];
   a[0] = 10.0;
   double[] b = a; // b and a now refer to the EXACT SAME array!

This creates an **alias**: ``a`` and ``b`` are two names for the same underlying array
in memory:

.. odsafig:: Images/thinkjava2_018.png
   :align: center

Any modification made through ``b`` is immediately visible through ``a``:

.. code-block:: java

   b[0] = 42.0;
   System.out.println(a[0]); // prints 42.0!

If your goal is to create an independent duplicate of an array, you must allocate a
new array of identical length and copy each element individually:

.. code-block:: java

   double[] copy = new double[a.length];
   for (int i = 0; i < a.length; i++)
   {
       copy[i] = a[i];
   }

Alternatively, the Java standard library provides ``Arrays.copyOf()`` in ``java.util.Arrays``
to perform this operation in a single call:

.. code-block:: java

   double[] copy = Arrays.copyOf(a, a.length);

After creating a genuine copy, the memory diagram reflects two distinct objects:

.. odsafig:: Images/thinkjava2_019.png
   :align: center

Modifying ``copy[0]`` now has no effect on ``a[0]``.

.. raw:: html

   <div class="align-center">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/GQWbUdb4d58?start=46" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Iterating Over Arrays: Numeric For vs. For-Each Loops
-----------------------------------------------------

To process all elements in an array, Java offers two primary loop constructs: the
counter-controlled numeric ``for`` loop and the enhanced ``for-each`` loop.

Counter-Controlled Numeric For Loop
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A counter-controlled ``for`` loop uses an integer index variable (traditionally ``i``)
ranging from ``0`` up to ``array.length - 1``:

.. code-block:: java

   int[] values = {10, 20, 30, 40};

   for (int i = 0; i < values.length; i++)
   {
       values[i] = values[i] * 2; // doubles each element in place
   }

Use a numeric ``for`` loop whenever:

1. You need to **modify the array elements in place** (e.g., transforming values).
2. You need access to the **index position** (e.g., searching for the location of an item).
3. You need to traverse in reverse, step by increments other than 1, or compare adjacent elements (e.g., ``values[i]`` vs. ``values[i + 1]``).

Enhanced For-Each Loop
~~~~~~~~~~~~~~~~~~~~~~

When you only need to inspect or read each element from beginning to end, the enhanced
``for-each`` loop provides clean, concise syntax without index management:

.. code-block:: java

   String[] coffees = {"Espresso", "Mocha", "Decaf", "Americano"};

   for (String coffee : coffees)
   {
       System.out.println(coffee);
   }

.. warning::

   **For-Each Cannot Modify Array Slots**: In a ``for-each`` loop, the loop variable
   (``coffee`` above) is a local variable holding a copy of the current element's
   value. Assigning to ``coffee = "Latte";`` inside the loop only updates the local
   variable—it has **zero effect** on the array itself!


Array Index Arithmetic: Circular Wrap-Around & The Modulo Operator
------------------------------------------------------------------

In Chapter 4, you briefly encountered Java's remainder operator (``%``), also
known as the **modulo operator**, for testing whether an integer is even
(``number % 2 == 0``). When working with arrays, the modulo operator becomes
one of your most powerful algorithmic tools for index arithmetic.

The expression ``a % b`` computes the integer remainder left over when ``a`` is
divided by ``b``. For any positive integer ``b`` and non-negative integer ``a``,
the result of ``a % b`` is guaranteed to fall strictly within the range:

.. math::

   0 \le (a \pmod b) < b

Notice that for an array of size ``N`` (where valid indices are ``0`` through
``N - 1``), computing ``index % array.length`` guarantees that the resulting
value is **always a valid index** within the bounds of the array!

This mathematical property gives rise to several essential array programming
patterns:

1. Circular Index Wrap-Around (Ring Buffers & Game Turns)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Suppose you are implementing a turn-based tabletop game with 4 players stored
in an array:

.. code-block:: java

   Player[] players = new Player[4]; // indices 0, 1, 2, 3
   int currentPlayerIndex = 0;

When player 0 finishes their turn, the next player is at index ``1``. When player
1 finishes, player 2 goes next, followed by player 3. But who goes after player 3?
The turn must **wrap around** back to player 0!

Without the modulo operator, you would need an ``if`` statement every time:

.. code-block:: java

   // Clunky approach with an if statement:
   currentPlayerIndex++;
   if (currentPlayerIndex == players.length)
   {
       currentPlayerIndex = 0;
   }

With the modulo operator, you can advance to the next player and wrap around in
a single, elegant line of code:

.. code-block:: java

   // Elegant circular wrap-around:
   currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

When ``currentPlayerIndex`` is 2, ``(2 + 1) % 4`` evaluates to ``3``. When
``currentPlayerIndex`` is 3 (the end of the array), ``(3 + 1) % 4`` evaluates to
``4 % 4``, which is **0**—smoothly cycling back to the start!

This circular pattern is universal in computer science: it is used for circular
queues, carousel photo galleries, Tetris piece rotation states (cycling through
4 rotation orientations: ``(orientation + 1) % 4``), and round-robin scheduling.

2. Cyclic Domain Mapping (Clock & Calendar Arithmetic)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The modulo operator allows us to map unbounded or elapsed numeric measurements
into fixed array bins. For example, if an elapsed simulation time in hours is
given as 53 hours, what hour of the day does that correspond to?

.. code-block:: java

   int elapsedHours = 53;
   int hourOfDay = elapsedHours % 24; // evaluates to 5 (5:00 AM)

Similarly, in calendar applications where Sunday is day 0 and Saturday is day 6,
any day offset can be mapped to its day of the week using ``dayOffset % 7``.
As you will see in the next section, this direct mathematical mapping enables
arrays to act as high-speed **frequency histograms**.

3. Periodic Formatting & Actions in Loops
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When iterating through a large array, you often need to perform a special action
every :math:`k` elements—for example, inserting a newline after every 10 values
when printing a grid, or alternating background shading on alternating rows:

.. code-block:: java

   public void printFormatted(int[] data)
   {
       for (int i = 0; i < data.length; i++)
       {
           System.out.print(data[i] + "\t");

           // Print a newline every 5 elements:
           if ((i + 1) % 5 == 0)
           {
               System.out.println();
           }
       }
   }

Because ``(i + 1) % 5`` is zero precisely when ``i + 1`` is 5, 10, 15, ..., the
loop automatically breaks the output into neat rows of 5 columns.

4. 2D Coordinate Flattening Preview
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Finally, the combination of integer division (``/``) and modulo (``%``) forms the
bridge to multi-dimensional arrays (Chapter 10). If a 2D grid with ``COLS``
columns is flattened into a 1D array of size ``ROWS * COLS``, any 1D index can be
converted back to its grid coordinates using:

.. code-block:: java

   int row = index / COLS; // integer division gives row coordinate
   int col = index % COLS; // modulo gives column coordinate


Accumulator Idioms: Summing, Averaging, and Counting
----------------------------------------------------

An **accumulator** is a programming pattern where a variable accumulates an answer
incrementally across loop iterations. Three fundamental accumulator patterns appear
constantly in array processing:

1. Summing Elements (Running Total)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To compute the sum of an array, initialize a running accumulator to zero and add each
element during traversal:

.. code-block:: java

   public int sum(int[] numbers)
   {
       int total = 0;
       for (int n : numbers)
       {
           total += n;
       }
       return total;
   }

2. Calculating an Average
~~~~~~~~~~~~~~~~~~~~~~~~~

To compute an average, divide the accumulated sum by the array length. Be sure to
cast to ``double`` to prevent integer division truncation, and handle empty arrays
defensively:

.. code-block:: java

   public double average(int[] numbers)
   {
       if (numbers.length == 0)
       {
           return 0.0;
       }
       return (double) sum(numbers) / numbers.length;
   }

3. Filtered Counting
~~~~~~~~~~~~~~~~~~~~

To count elements satisfying a specific condition, initialize a counter to zero and
increment it only when an element passes a conditional test:

.. code-block:: java

   public int countPassingScores(double[] scores, double passingGrade)
   {
       int count = 0;
       for (double score : scores)
       {
           if (score >= passingGrade)
           {
               count++;
           }
       }
       return count;
   }


Frequency Histograms & Array Buckets
------------------------------------

A particularly elegant application of arrays is the **frequency histogram** (or
**bucket tallying**). In many domains, data attributes fall into a small, discrete range
of integers:

* Hours in a day: integers ``0`` through ``23`` (size 24)
* Days in a week: integers ``0`` through ``6`` (size 7)
* Test scores: integers ``0`` through ``100`` (size 101)

Instead of searching through a list of records every time we want to know how many
events occurred at a particular hour, we can use the **domain attribute directly as
an array index**!

Consider a ``Post`` class modeling social media messages, where ``getHour()`` returns
an integer from 0 to 23. We can track the message frequency for all 24 hours of the day
using a 24-element integer array:

.. code-block:: java

   public class PostMonitor
   {
       private int postCount;
       private int[] hourCounts;
       private int[] dayCounts;

       public PostMonitor()
       {
           this.postCount = 0;
           this.hourCounts = new int[24]; // 24 slots, all initialized to 0
           this.dayCounts = new int[7];   // 7 slots, all initialized to 0
       }

       public void recordPost(Post post)
       {
           postCount++;
           
           // Use the post's hour directly as the array index!
           int hour = post.getHour();
           hourCounts[hour]++;
           
           // Use the post's day of week directly as the index!
           int day = post.getDay();
           dayCounts[day]++;
       }

       public int getHourCount(int hour)
       {
           return hourCounts[hour];
       }
   }

.. tip::

   **Why Direct Indexing Matters**: Direct index mapping executes in constant $O(1)$
   time. There is no need to write a search loop or compare values against every past
   post. The hour itself dictates the exact memory location to increment! This pattern
   directly scaffolds **Lab 09 (Tweet Monitoring)** and the row-occupancy tracking in
   **Program 05 (Tetris)**.


Linear Search: Finding Values and Indices
-----------------------------------------

When searching for a specific value in an unsorted array, we examine elements one by
one from the beginning until we either find the target or run out of elements. This
technique is known as **linear search**.

Searching for Existence (Early Exit)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If we only need to know whether a target exists, we can return ``true`` the moment a
match is found. If the loop completes without finding a match, we return ``false``:

.. code-block:: java

   public boolean contains(int[] array, int target)
   {
       for (int value : array)
       {
           if (value == target)
           {
               return true; // found immediately; terminate early
           }
       }
       return false; // searched the entire array without a match
   }

Finding the Index of a Match
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Often, we need to know the *location* of the match rather than just whether it exists.
By convention in Java, search methods return the **index** of the matching element,
or the sentinel value ``-1`` if the target is not present (since ``-1`` can never be a
valid array index):

.. code-block:: java

   public int indexOf(int[] array, int target)
   {
       for (int i = 0; i < array.length; i++)
       {
           if (array[i] == target)
           {
               return i; // returns the earliest occurrence
           }
       }
       return -1; // sentinel value: target not found
   }

To find the *last* occurrence of a target, iterate backward from ``array.length - 1``
down to ``0``:

.. code-block:: java

   public int lastIndexOf(int[] array, int target)
   {
       for (int i = array.length - 1; i >= 0; i--)
       {
           if (array[i] == target)
           {
               return i; // returns the latest occurrence
           }
       }
       return -1;
   }


Extrema Algorithms: Maximum, Minimum & Deterministic Tie-Breaking
-----------------------------------------------------------------

Another universal array algorithmic pattern is finding **extrema**—the maximum or
minimum value in an array, or the index where that extremum occurs.

Finding the Maximum Value
~~~~~~~~~~~~~~~~~~~~~~~~~

A common beginner mistake is initializing the maximum variable to ``0``. If all values
in the array are negative (e.g., ``{-15, -8, -42}``), an initial value of ``0`` will
incorrectly report ``0`` as the maximum!

The correct algorithm initializes the candidate extremum to the **first element**
(index ``0``), and then iterates through the remaining elements starting at index ``1``:

.. code-block:: java

   public int findMax(int[] array)
   {
       if (array.length == 0)
       {
           throw new IllegalArgumentException("Cannot find maximum of empty array");
       }

       int max = array[0]; // assume first element is maximum
       for (int i = 1; i < array.length; i++)
       {
           if (array[i] > max)
           {
               max = array[i]; // found a new maximum
           }
       }
       return max;
   }

Finding the Index of the Extremum
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In assignments like **Lab 09 (Tweet Monitoring)**, you need to find the *index* of the
busiest or slowest time (e.g., which hour has the highest message count).

To find the index of the extremum, track the **index of the best candidate so far**:

.. code-block:: java

   public int getIndexOfLargest(int[] array)
   {
       if (array.length == 0)
       {
           return -1;
       }

       int bestIndex = 0;
       for (int i = 1; i < array.length; i++)
       {
           if (array[i] > array[bestIndex])
           {
               bestIndex = i;
           }
       }
       return bestIndex;
   }

Deterministic Tie-Breaking Semantics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

What happens if an array contains multiple elements tied for the maximum value?
For example, in ``int[] counts = {10, 45, 20, 45, 12};``, both index 1 and index 3
contain 45. Which index should be returned?

The answer depends strictly on the comparison operator used:

* **Strictly Greater** (``>``): If we test ``if (array[i] > array[bestIndex])``, a tied
  value is *not* greater than the candidate, so ``bestIndex`` is not updated. The method
  deterministically returns the **earliest occurrence** (index 1).

* **Greater-Than-or-Equal** (``>=``): If we test ``if (array[i] >= array[bestIndex])``,
  each subsequent tie replaces the candidate, returning the **latest occurrence** (index 3).

.. important::

   **Lab 09 Specification Requirement**: The specifications for Lab 09 (Tweet Monitoring)
   explicitly require returning the **earliest index** in case of ties. Using strict
   inequality (``>`` for maximum, ``<`` for minimum) guarantees this deterministic behavior.


Writing Test Assertions for Arrays in JUnit
-------------------------------------------

Testing methods that manipulate arrays requires verifying both individual elements
and the entire array state. The **AssertJ** library provides comprehensive, fluent
assertions for testing arrays in JUnit:

Checking Size and Element Values
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: java

   int[] result = monitor.getHourCounts();

   // Check the array length
   assertThat(result).hasSize(24);
   assertThat(result.length).isEqualTo(24);

   // Check specific indices
   assertThat(result[0]).isEqualTo(0);
   assertThat(result[14]).isEqualTo(5);

Verifying Whole-Array Contents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AssertJ provides ``containsExactly()`` to verify that an array contains the exact
sequence of values in exact order:

.. code-block:: java

   String[] coffees = barista.getMenu();

   assertThat(coffees).containsExactly(
       "Espresso", "Mocha", "Decaf", "Americano");

If you only need to confirm that specific values are present without restricting
the entire array size or order, use ``contains()``:

.. code-block:: java

   assertThat(coffees).contains("Mocha", "Americano");

Other Useful AssertJ Array Assertions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: java

   // Verify elements do not appear
   assertThat(coffees).doesNotContain("Latte", "Cappuccino");

   // Verify boundary elements
   assertThat(coffees).startsWith("Espresso");
   assertThat(coffees).endsWith("Americano");

   // Verify no duplicates for key items
   assertThat(coffees).containsOnlyOnce("Espresso");

   // Verify an array is empty
   int[] empty = new int[0];
   assertThat(empty).isEmpty();


Applying Arrays in a Problem
----------------------------

This video discusses a "Web-Analyzer" project and illustrates how arrays can be
applied to solve real-world domain problems. You do not need to build the project
in the video; it is provided as a practical synthesis of array principles in action.

.. raw:: html

   <div class="align-center">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/xs9HnwBAg14?start=96&end=755" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Programming Practice 9
----------------------

.. extrtoolembed:: 'Programming Practice 9'
   :workout_id: 1526


.. raw:: html

   <footer style="border-top: 1px solid #777;"><div class="footer">
     Selected content adapted from:<br/>
     <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
     licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
     <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
     licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
   </div></footer>
