.. avmetadata::
   :title: Multi-Dimensional Arrays and Matrix Algorithms
   :author: Molly Domino; Stephen Edwards
   :institution: Virginia Tech
   :keyword: Array; 2D Array; Multi-Dimensional Array; Matrix; Row-Major; Column-Major; Grid; Coordinate Mapping
   :naturallanguage: en
   :programminglanguage: Java
   :description: Comprehensive introduction to multi-dimensional arrays, matrix indexing conventions, row-major and column-major traversals, row searching, shifting algorithms, coordinate mapping, and unit testing.


Multi-Dimensional Arrays and Matrix Algorithms
==============================================

.. |br| raw:: html

   <br />

.. sidebar:: Learning Objectives

    **Estimated Time**: ~63 minutes (~41 min reading + ~22 min video at 100 WPM)

   After reading this chapter, you will be able to:

   * **Declare**, instantiate, and index 2D arrays of primitive types and object references using both dynamic allocation syntax and nested array initializer literals.
   * **Contrast** row-column indexing (``grid[row][col]``) with Cartesian spatial indexing (``grid[x][y]``), explaining that Java does not enforce an interpretation and that the programmer must maintain consistency across all operations.
   * **Trace** the array-of-arrays memory structure and evaluate row and column lengths using ``grid.length`` and ``grid[i].length``.
   * **Implement** nested ``for`` loop algorithms to traverse 2D arrays in both row-major and column-major order.
   * **Implement** matrix inspection and reduction algorithms, including full-row occupancy detection, 2D linear searching, and conditional element counting.
   * **Implement** matrix row-shifting and row-clearing operations preserving grid consistency and boundary integrity.
   * **Apply** coordinate offset arithmetic to map real-world domain values and relative stencil offsets to 0-based array indices.
   * **Design** automated test methods verifying 2D grid states and transformation postconditions using test case assertions across normal and boundary conditions.


In previous chapters, we used one-dimensional arrays and lists to store linear
sequences of values—such as a list of playing cards, an array of daily high
temperatures, or a sequence of tweet timestamps. A one-dimensional array can be
visualized as a single row or line of values, where each element is accessed by a
single integer subscript.

However, many computing problems involve data that is naturally organized in
two or more dimensions. Consider a seating chart in a theater, a spreadsheet
table with rows and columns, a digital image made of horizontal and vertical
pixels, or the game board for checkers, chess, or a puzzle game. In these
situations, organizing values into a two-dimensional grid is vastly more natural
and intuitive than flattening everything into a single line.

Java provides native support for **multi-dimensional arrays**—arrays whose
elements are themselves arrays. In this chapter, we will explore how to declare,
allocate, index, traverse, manipulate, and test two-dimensional arrays and
matrices.


Introduction to 2D Arrays & Matrices
------------------------------------

A **two-dimensional array** (often called a **2D array** or a **matrix**) is a
collection of values organized into a rectangular grid consisting of **rows**
and **columns**.

To understand why a 2D array is needed, imagine you are developing a scientific
application to record precipitation levels across all 12 months of the year,
tracking rainfall for each day of every month. If you used a one-dimensional
array with 365 elements:

.. code-block:: java

   double[] rainfall = new double[365];

it would be cumbersome to determine which index corresponds to March 15th or to
compute the average precipitation specifically for the month of July. You would
have to manually calculate how many days occurred in prior months to find the
correct starting index.

A far clearer and more robust design is to represent the data with a
two-dimensional array having one dimension for the month and a second dimension
for the day within that month:

.. code-block:: java

   double[][] rainfall = new double[12][31];

In this statement:

* ``double[][]`` indicates that the variable ``rainfall`` holds a reference to a
  two-dimensional array of ``double`` values.

* The first bracket pair ``[12]`` specifies the size of the first dimension (12
  months).

* The second bracket pair ``[31]`` specifies the size of the second dimension (31
  days per month).

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/alwukGslBG8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>

Declaring and Allocating 2D Arrays
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The general syntax for declaring a two-dimensional array reference in Java is:

.. code-block:: java

   DataType[][] arrayName;

To allocate the array in memory, we use the ``new`` operator, specifying the
dimensions:

.. code-block:: java

   arrayName = new DataType[rows][cols];

We can combine declaration and allocation into a single statement:

.. code-block:: java

   int[][] seatingChart = new int[15][25]; // 15 rows of 25 seats each
   boolean[][] lightGrid = new boolean[8][8]; // 8x8 grid of lights
   String[][] timetable = new String[5][8]; // 5 days, 8 time slots per day

Just like one-dimensional arrays, when a 2D array is created with ``new``, all of
its elements are automatically initialized to their default values:

* Numeric types (``int``, ``double``, ``byte``, ``short``, ``long``, ``float``)
  are initialized to ``0`` or ``0.0``.

* Boolean types (``boolean``) are initialized to ``false``.
* Object reference types (such as ``String``, ``Color``, or custom classes) are
  initialized to ``null``.

.. note::

   Remember that allocating an array of object references (such as
   ``String[][] words = new String[4][6];``) creates a grid full of ``null``
   references. You must still instantiate each individual object and place it
   into the grid cells before invoking methods on those elements, otherwise a
   ``NullPointerException`` will occur.


Row-Column Indexing & Array-of-Arrays Model
-------------------------------------------

To read or modify a specific cell in a two-dimensional array, you provide two
subscripts inside individual square bracket pairs:

.. code-block:: java

   array[firstIndex][secondIndex]

Understanding the Indexing Conventions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A critical conceptual insight is that Java itself **does not enforce any
geometric meaning** on the two subscripts. To Java, a 2D array is simply an
"array of arrays": an outer array containing references to several inner
arrays.

The interpretation of what the two indices represent is determined entirely by
the programmer. In practice, programmers primarily use two distinct indexing
conventions depending on the problem domain:

1. **Row-First (Row/Column) Convention:** ``grid[row][col]``

   In this convention, the first index selects the horizontal row (vertical
   position, measured downward from the top), and the second index selects the
   column (horizontal position across that row):

   * ``row`` ranges from ``0`` to ``numRows - 1``.
   * ``col`` ranges from ``0`` to ``numCols - 1``.

   This model matches how people read spreadsheets, tables, and mathematical
   matrices.

2. **Coordinate-First (Cartesian x/y) Convention:** ``grid[x][y]``

   In this convention, the first index selects the horizontal position (``x``,
   column index), and the second index selects the vertical position (``y``,
   row index):

   * ``x`` ranges from ``0`` to ``width - 1`` (columns).
   * ``y`` ranges from ``0`` to ``height - 1`` (rows).

   This model matches graphical coordinate systems and spatial micro-worlds
   (like the Jeroo island or computer screen pixels).

.. important::

   The programming language does not dictate whether you use
   ``grid[row][col]`` or ``grid[x][y]``. What matters most is that you **choose
   one convention and adhere to it consistently throughout your entire
   program**.

   Mixing the two conventions—for example, treating the first index as a row in
   one method and as an :math:`x`-coordinate in another—is one of the most
   frequent sources of bugs in grid-based software, often causing
   ``ArrayIndexOutOfBoundsException`` whenever the grid is not square.

In this chapter and throughout standard matrix algorithms, we will predominantly
use the **row-major convention** (``grid[row][col]``) because it directly
reflects Java's underlying memory structure.

The Array-of-Arrays Memory Model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Java, multi-dimensional arrays are physically structured as **arrays of
arrays**. When you execute:

.. code-block:: java

   int[][] matrix = new int[3][4];

Java does not allocate a single monolithic 12-element block. Instead, it performs
the following:

1. It allocates an outer array of 3 elements, where each element is a reference
   variable capable of pointing to a 1D ``int[]`` array.

2. It allocates three distinct 1D ``int[]`` arrays, each having a length of 4.
3. It assigns the reference of each 4-element array into the corresponding slot
   of the outer array.

.. odsafig:: Images/TwoDArr.png
   :width: 80%
   :align: center

Because of this architecture:

* ``matrix.length`` evaluates to the length of the outer array, which represents
  the **number of rows** (here, ``3``).

* ``matrix[r].length`` evaluates to the length of the inner array at index ``r``,
  which represents the **number of columns in row** ``r`` (here, ``4``).

* ``matrix[r]`` on its own refers to an entire one-dimensional row array.

.. tip::

   To determine the dimensions of a rectangular 2D array ``grid``:

   * Number of rows: ``grid.length``
   * Number of columns: ``grid[0].length`` (assuming at least one row exists)

Literal Initializers for 2D Arrays
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Just as with one-dimensional arrays, you can declare and initialize a 2D array
using nested curly braces:

.. code-block:: java

   int[][] scores = {
       {88, 92, 79},
       {95, 84, 91},
       {70, 85, 90}
   };

Here, ``scores.length`` is ``3``, and each row has length ``3``. The commas
separate each row, and each row is an array literal enclosed in its own pair of
braces.

Ragged (Jagged) Arrays
~~~~~~~~~~~~~~~~~~~~~~

Because each row in a 2D array is an independent object, the individual rows do
not all have to be the same length! A multi-dimensional array with rows of
different lengths is called a **ragged array** (or **jagged array**):

.. code-block:: java

   int[][] ragged = {
       {1, 2},
       {3, 4, 5, 6},
       {7, 8, 9}
   };

Here, ``ragged.length`` is ``3``, while ``ragged[0].length`` is ``2``,
``ragged[1].length`` is ``4``, and ``ragged[2].length`` is ``3``. Ragged arrays
can be useful for representing non-rectangular structures, such as a triangle or
sparse data.

Higher Dimensions (3D Arrays and Beyond)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Java allows you to stack as many dimensions as your problem requires. For
example, a 3D array can be visualized as a collection of 2D grids (pages,
layers, or depth slices):

.. code-block:: java

   int layers = 5;
   int rows = 10;
   int cols = 20;

   double[][][] cube = new double[layers][rows][cols];

.. odsafig:: Images/3DArrayGraphic.png
   :align: center

Multi-Dimensional Lists (Lists of Lists)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Just as an array can hold references to other arrays, a ``List`` can hold
references to other lists:

.. code-block:: java

   List<List<String>> gridOfWords = new ArrayList<>();

While lists of lists offer dynamic resizing, 2D arrays (``Type[][]``) are
generally preferred for fixed-size grids, board games, and numerical matrices
because of their concise indexing syntax (``grid[r][c]`` vs.
``grid.get(r).get(c)``) and significantly higher runtime performance.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/9tBxJoQF74E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Traversing 2D Grids: Row-Major vs. Column-Major
-----------------------------------------------

Processing every element in a two-dimensional array requires two loops: one loop
to control the first dimension and a second loop nested inside it to control the
second dimension.

Nested Loop Mechanics
~~~~~~~~~~~~~~~~~~~~~

Recall how nested loops execute: for **every single iteration** of the outer
loop, the inner loop executes through its **entire cycle** from beginning to end.

If an outer loop runs :math:`R` times and an inner loop runs :math:`C` times,
the code inside the body of the inner loop will execute a total of:

.. math::

   \text{Total Operations} = R \times C

For a :math:`20 \times 10` grid, the inner loop body runs :math:`20 \times 10 =
200` times.

Row-Major Traversal
~~~~~~~~~~~~~~~~~~~

In **row-major traversal**, the outer loop iterates over the rows, and the inner
loop iterates over the columns. This visits every element horizontally, row by
row, exactly like reading lines of text in a book:

.. code-block:: java

   public void printRowMajor(int[][] grid)
   {
       for (int row = 0; row < grid.length; row++)
       {
           for (int col = 0; col < grid[row].length; col++)
           {
               System.out.print(grid[row][col] + "\t");
           }
           System.out.println(); // newline at the end of each row
       }
   }

Tracing the execution for a :math:`3 \times 3` grid:

1. ``row = 0``: ``col`` iterates ``0, 1, 2`` (accesses ``(0,0)``, ``(0,1)``, ``(0,2)``).
2. ``row = 1``: ``col`` iterates ``0, 1, 2`` (accesses ``(1,0)``, ``(1,1)``, ``(1,2)``).
3. ``row = 2``: ``col`` iterates ``0, 1, 2`` (accesses ``(2,0)``, ``(2,1)``, ``(2,2)``).

Row-major order is the standard pattern used when printing tabular data,
analyzing individual horizontal rows, or searching across a matrix.

Column-Major Traversal
~~~~~~~~~~~~~~~~~~~~~~

In **column-major traversal**, the outer loop iterates over the columns, and the
inner loop iterates over the rows. This visits elements vertically, column by
column, top-to-bottom:

.. code-block:: java

   public void printColumnMajor(int[][] grid)
   {
       int numRows = grid.length;
       int numCols = grid[0].length;

       for (int col = 0; col < numCols; col++)
       {
           for (int row = 0; row < numRows; row++)
           {
               System.out.print(grid[row][col] + "\t");
           }
           System.out.println(); // newline at the end of each column
       }
   }

Tracing the execution for a :math:`3 \times 3` grid:

1. ``col = 0``: ``row`` iterates ``0, 1, 2`` (accesses ``(0,0)``, ``(1,0)``, ``(2,0)``).
2. ``col = 1``: ``row`` iterates ``0, 1, 2`` (accesses ``(0,1)``, ``(1,1)``, ``(2,1)``).
3. ``col = 2``: ``row`` iterates ``0, 1, 2`` (accesses ``(0,2)``, ``(1,2)``, ``(2,2)``).

When to Use Each Traversal
~~~~~~~~~~~~~~~~~~~~~~~~~~

* **Use Row-Major** when processing horizontal lines or when row data belongs
  together. For example, in a gradebook array where rows represent students and
  columns represent assignments, row-major traversal allows you to compute each
  student's overall course average.

* **Use Column-Major** when processing vertical lines or vertical slices. In the
  same gradebook, column-major traversal allows you to compute the class average
  for each specific assignment across all students.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/L3-q2GxAqZA?start=105" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Matrix Algorithms: Searching & Checking Rows
--------------------------------------------

Now that we can traverse grids systematically, let us examine several standard
matrix algorithms used to inspect, verify, and reduce grid data.

Consider a reservation system for an auditorium or movie theater represented by
a 2D boolean array:

.. code-block:: java

   boolean[][] reserved = new boolean[numRows][numCols];

A cell ``reserved[row][col]`` is ``true`` if that seat is currently booked, and
``false`` if it remains open.

Algorithm 1: Checking Full-Row Occupancy
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Suppose the venue offers a discount when an entire row is completely booked by a
single group. We need a method ``isRowFull(boolean[][] grid, int row)`` that
returns ``true`` if and only if **every cell** in that specified row is ``true``:

.. code-block:: java

   public boolean isRowFull(boolean[][] grid, int row)
   {
       // Inspect each column in the given row:
       for (int col = 0; col < grid[row].length; col++)
       {
           // If we find any seat that is NOT occupied, the row is not full
           if (!grid[row][col])
           {
               return false; // Short-circuit early exit
           }
       }
       // If the loop finished without finding any empty seat, all are occupied
       return true;
   }

Notice the **early return** design pattern: as soon as the algorithm encounters
a single empty cell, it immediately returns ``false``. The method only returns
``true`` after all columns have been inspected.

Algorithm 2: Counting Occupied Seats Across the Entire Matrix
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To count how many total seats in the venue are booked, we combine an accumulator
variable with a nested row-major loop:

.. code-block:: java

   public int countTotalOccupied(boolean[][] grid)
   {
       int count = 0;
       for (int row = 0; row < grid.length; row++)
       {
           for (int col = 0; col < grid[row].length; col++)
           {
               if (grid[row][col])
               {
                   count++;
               }
           }
       }
       return count;
   }

Algorithm 3: Linear Search in a 2D Matrix
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Suppose an office building organizes employee mailboxes in a 2D array of names:
``String[][] mailboxes``. To find whether an employee has a mailbox and determine
their row and column position:

.. code-block:: java

   public int[] findMailbox(String[][] grid, String targetName)
   {
       if (targetName == null)
       {
           return null;
       }

       for (int row = 0; row < grid.length; row++)
       {
           for (int col = 0; col < grid[row].length; col++)
           {
               if (targetName.equals(grid[row][col]))
               {
                   return new int[] { row, col }; // Found at (row, col)
               }
           }
       }
       return null; // Target name was not present in the grid
   }

Algorithm 4: Clearing an Entire Row
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When all reservations in a row are cancelled, we reset every cell in that row
back to ``false``:

.. code-block:: java

   public void clearRow(boolean[][] grid, int row)
   {
       for (int col = 0; col < grid[row].length; col++)
       {
           grid[row][col] = false;
       }
   }


Row Shifting & Grid Transformations
-----------------------------------

Many grid-based systems—such as falling sand simulators, warehouse shelving
management, and puzzle games—require moving entire rows of data upward or
downward within a matrix.

Consider a warehouse storage rack represented as a 2D array:

.. code-block:: java

   int[][] storageRack = new int[numTiers][numBins];

Here, numbers represent product identifiers stored in bins on each shelf tier,
and ``0`` represents an empty bin.

Suppose that when an entire shelf tier is cleared or retrieved, all higher tiers
must **shift downward by one position** so inventory remains accessible, and the
topmost tier becomes completely vacant.

The Direction of Iteration: Avoiding Data Overwrite
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Suppose shelf row 3 is cleared, and we want all rows above it (rows 0, 1, and 2)
to shift downward into rows 1, 2, and 3:

* Row 2 moves into Row 3.
* Row 1 moves into Row 2.
* Row 0 moves into Row 1.
* Row 0 becomes empty.

Consider what would happen if we wrote a loop that iterates **downward** from
the top (from row 1 to row 3):

.. code-block:: java

   // BUGGY ATTEMPT: Iterating in the wrong direction!
   for (int r = 1; r <= clearedRow; r++)
   {
       for (int c = 0; c < grid[r].length; c++)
       {
           grid[r][c] = grid[r - 1][c]; // Overwrites row r with row r - 1
       }
   }

Let us trace this buggy loop:

1. When ``r = 1``: Row 1 is replaced by the contents of Row 0. Now Row 1 holds Row 0's data.
2. When ``r = 2``: Row 2 is replaced by Row 1. But Row 1 was *already* overwritten with Row 0! So Row 2 now holds Row 0's data!
3. When ``r = 3``: Row 3 is replaced by Row 2, which also holds Row 0's data!

The entire grid becomes a duplicate copy of Row 0!

To prevent overwriting data before it has been copied, we **must iterate in
reverse order**, starting at the cleared row and working upward toward row 1:

.. code-block:: java

   public void shiftRowsDownward(int[][] grid, int clearedRow)
   {
       // Step backward from clearedRow up to row 1:
       for (int r = clearedRow; r > 0; r--)
       {
           // Copy each element of row r - 1 into row r:
           for (int c = 0; c < grid[r].length; c++)
           {
               grid[r][c] = grid[r - 1][c];
           }
       }

       // Reset the top row (row 0) to empty values:
       for (int c = 0; c < grid[0].length; c++)
       {
           grid[0][c] = 0;
       }
   }

.. important::

   When shifting elements downward in an array, always iterate **from bottom to
   top** so that each row is safely moved before the row above it overwrites it.
   Conversely, when shifting elements upward, always iterate **from top to
   bottom**.

Deep Copying vs. Row Reference Swapping
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Java, because a 2D array is an array of 1D row references, you might be
tempted to write:

.. code-block:: java

   // DANGEROUS: Reference aliasing!
   grid[r] = grid[r - 1];

While this syntactically compiles, it copies the **reference** to the row, not
the individual values! As a result, ``grid[r]`` and ``grid[r - 1]`` now point to
the exact same array object in memory (aliasing). Later modifying a cell in one
row will silently alter the other row as well.

To prevent aliasing bugs, always copy the individual elements in an inner loop as
shown in ``shiftRowsDownward``, or allocate a brand-new array for each shifted
row.


Coordinate Mapping & Offset Arithmetic
--------------------------------------

Real-world applications frequently operate with domain measurements that do not
naturally begin at index 0. For example:

* Hours of the day may run from 8:00 AM to 5:00 PM (hours 8 to 17).
* Year values may span from 2020 to 2030.
* Game objects may occupy multiple cells defined by relative offsets from a
  central anchor point.

To connect real-world data with zero-based arrays, we use **coordinate mapping**
and **offset arithmetic**.

Domain-to-Index Offset Translation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Suppose you are building a weekly scheduling application. Business hours run
from 8:00 AM to 5:00 PM (hours 8 through 17, for a total of 10 hourly slots).
Days of the week are numbered 0 through 6 (Monday through Sunday).

We can represent the schedule using a 2D array:

.. code-block:: java

   String[][] weeklyPlanner = new String[7][10]; // 7 days, 10 hour slots

Because valid row indices are ``0`` through ``9``, an appointment at hour 8
cannot be placed directly at index 8 without wasting slots 0 through 7.
Instead, we translate the domain hour into an array index using an offset:

.. math::

   \text{slotIndex} = \text{hour} - \text{START\_HOUR}

.. code-block:: java

   public static final int START_HOUR = 8; // 8:00 AM corresponds to index 0

   public int hourToIndex(int hour)
   {
       return hour - START_HOUR;
   }

   public int indexToHour(int index)
   {
       return index + START_HOUR;
   }

For an appointment on Wednesday (day 2) at 2:00 PM (hour 14):

* Day index: ``2``
* Hour index: ``14 - 8 = 6``
* Target cell: ``weeklyPlanner[2][6]``

Multi-Cell Shapes & Relative Offsets
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In graphic design and grid-based puzzle software, shapes are frequently composed
of multiple neighboring cells placed relative to an anchor coordinate:

.. code-block:: java

   // A plus-shaped pattern centered at an anchor:
   //      (r-1, c)
   // (r, c-1)  (r, c)  (r, c+1)
   //      (r+1, c)

Rather than hardcoding absolute grid coordinates, we define the shape as an
array of relative row and column offsets ``(dr, dc)`` from the anchor position:

.. code-block:: java

   int[][] plusPatternOffsets = {
       {0, 0},   // center anchor
       {-1, 0},  // one step up
       {1, 0},   // one step down
       {0, -1},  // one step left
       {0, 1}    // one step right
   };

To stamp or place this pattern onto a grid with its center at ``(anchorRow,
anchorCol)``:

1. For each offset ``{dr, dc}``, compute:
   
   .. math::
   
      \text{targetRow} = \text{anchorRow} + dr
   
   .. math::
   
      \text{targetCol} = \text{anchorCol} + dc

2. Validate that the target coordinate falls strictly within the grid bounds:
   
   .. code-block:: java
   
      targetRow >= 0 && targetRow < numRows && targetCol >= 0 && targetCol < numCols

3. Only modify the grid cells after verifying that **all** target cells are
   valid and unoccupied.

1D-to-2D and 2D-to-1D Coordinate Translation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sometimes high-performance graphics engines flatten a two-dimensional grid of
dimensions :math:`\text{ROWS} \times \text{COLS}` into a single 1D array of size
:math:`\text{ROWS} \cdot \text{COLS}`.

You can convert between the two representations using integer division and the
modulo operator:

* **From 2D to 1D index**:
  
  .. math::
  
     \text{index} = (\text{row} \times \text{COLS}) + \text{col}

* **From 1D index back to 2D coordinates**:
  
  .. math::
  
     \text{row} = \text{index} / \text{COLS}
  
  .. math::
  
     \text{col} = \text{index} \% \text{COLS}


Testing 2D Matrix Classes in JUnit
----------------------------------

Testing classes that manage two-dimensional grids requires verifying both cell
states and structural postconditions.

Constructing Synthetic Test Fixtures
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When writing automated unit tests, create small, focused test grids (such as
:math:`3 \times 3` or :math:`4 \times 5`) so you can manually verify expected
outputs and corner cases without overwhelming complexity:

.. code-block:: java

   public class GridManagerTest extends TestCase
   {
       private boolean[][] testGrid;

       public void setUp()
       {
           // Set up a fresh 3x3 grid before each test method
           testGrid = new boolean[3][3];
       }

       public void testIsRowFull()
       {
           GridManager manager = new GridManager();

           // Initially empty: row 1 should not be full
           assertThat(manager.isRowFull(testGrid, 1)).isFalse();

           // Fill cells (1, 0) and (1, 1), but leave (1, 2) false
           testGrid[1][0] = true;
           testGrid[1][1] = true;
           assertThat(manager.isRowFull(testGrid, 1)).isFalse();

           // Fill the last cell in row 1
           testGrid[1][2] = true;
           assertThat(manager.isRowFull(testGrid, 1)).isTrue();
       }
   }

Verifying Grid Transformations Before and After
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When testing methods that transform a grid (such as shifting rows, clearing
lines, or stamping patterns), verify the state of affected cells, the state of
newly introduced boundary cells, and the state of untouched rows:

.. code-block:: java

   public void testShiftRowsDownward()
   {
       int[][] rack = new int[3][3];
       rack[0][0] = 10;
       rack[0][1] = 20;
       rack[1][0] = 30;
       rack[1][1] = 40;
       rack[2][0] = 50; // cleared row
       rack[2][1] = 60;

       GridManager manager = new GridManager();
       manager.shiftRowsDownward(rack, 2);

       // Row 2 should now contain former contents of Row 1:
       assertThat(rack[2][0]).isEqualTo(30);
       assertThat(rack[2][1]).isEqualTo(40);

       // Row 1 should now contain former contents of Row 0:
       assertThat(rack[1][0]).isEqualTo(10);
       assertThat(rack[1][1]).isEqualTo(20);

       // Row 0 must be reset to zero:
       assertThat(rack[0][0]).isEqualTo(0);
       assertThat(rack[0][1]).isEqualTo(0);
       assertThat(rack[0][2]).isEqualTo(0);
   }

Testing Boundary and Edge Conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Always construct test cases that exercise the matrix boundaries:

* **Top and Bottom Rows**: Accessing and transforming row ``0`` and row
  ``numRows - 1``.

* **Left and Right Columns**: Accessing and transforming column ``0`` and column
  ``numCols - 1``.

* **Index Bounds Checking**: Verifying that passing coordinates outside valid
  ranges (negative indices or indices :math:`\ge` length) are properly handled
  or rejected without throwing an unhandled ``ArrayIndexOutOfBoundsException``.


Programming Practice 10
-----------------------

.. extrtoolembed:: 'Programming Practice 10'
   :workout_id: 1553


.. raw:: html

   <footer style="border-top: 1px solid #777;"><div class="footer">
     Selected content adapted from:<br/>
     <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
     licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
     <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
     licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
   </div></footer>
