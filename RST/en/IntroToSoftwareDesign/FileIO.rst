.. avmetadata::
   :title: Variable Scoping, File Input/Output, and Streams
   :author: Clifford A. Shaffer, Molly Domino, Stephen Edwards
   :institution: Virginia Tech
   :keyword: Variable Scope; File Processing; Scanner; PrintWriter; Streams; Spatial Geometry; Euclidean Distance
   :naturallanguage: en
   :programminglanguage: Java
   :description: Comprehensive introduction to variable scoping rules, reading and writing files with Scanner and PrintWriter, stream resource management, 2D spatial coordinate algorithms, Euclidean distance formulas, and unit testing with TestCase.

Variable Scoping, File Input/Output, and Streams
================================================

.. sidebar:: Learning Objectives

    **Estimated Time**: ~57 minutes (~42 min reading + ~15 min video at 100 WPM)

   * **Analyze and trace** variable visibility, access rules, and lifetimes across nested block scopes, method parameters, and instance fields.
   * **Resolve** variable shadowing conflicts using the ``this`` keyword to disambiguate instance fields from local parameters.
   * **Implement** file reading routines using ``Scanner`` and ``File`` to parse structured textual data from disk storage.
   * **Construct** file writing routines using ``PrintWriter`` to generate persistent text files with proper stream flushing and closing.
   * **Manage** system resources and prevent resource leaks by ensuring streams are reliably closed after processing.
   * **Apply** 2D coordinate geometry and nested loops to traverse spatial grids and transform pixel values.
   * **Formulate** mathematical distance algorithms using Euclidean distance formulas to compute radial gradients and spatial falloff.
   * **Design** automated unit test suites extending ``TestCase`` to verify file I/O operations and spatial coordinate transformations using synthetic test fixtures.


Comprehensive Scope: Blocks, Methods, Fields
--------------------------------------------

Now that you have worked with variables, parameters, and fields across a wide
variety of object-oriented architectures, it is time to formalize the rules that
govern where variables are visible and how long they exist.

The **scope** of a variable (or any identifier) is the region of program source
code where that variable's name is recognized, accessible, and valid to use.
Attempting to refer to a variable outside of its scope results in a compile-time
error (such as ``cannot find symbol``).

In Java, every variable belongs to one of three primary scope categories based on
where it is declared:

1. **Block Scope**: Variables declared inside any block of code enclosed by
   curly braces (``{ ... }``), such as inside a ``for`` loop, ``while`` loop,
   or ``if`` statement branch.

2. **Method Scope (Local Scope)**: Formal parameters declared in a method's
   header and local variables declared at the top level of a method body.

3. **Class Instance Scope**: Instance variables (fields) declared inside the
   class body but outside of any method or constructor.

Block-Level Scope
~~~~~~~~~~~~~~~~~

A **block** in Java is any sequence of statements grouped between matching
opening and closing braces: ``{ ... }``.

When a variable is declared inside a block, its scope begins **at the point of
its declaration** and extends only to the **closing brace** (``}``) of that
innermost enclosing block:

.. code-block:: java

   public void processScores(int threshold)
   {
       int count = 0; // Scope of count: entire method body

       if (threshold > 0)
       {
           int bonus = 5; // Scope of bonus: inside this if-block only!
           count += bonus;
       }

       // COMPILE ERROR: bonus is out of scope here!
       // System.out.println("Bonus applied: " + bonus);
   }

Because ``bonus`` was declared inside the ``if`` block, it ceases to exist as
soon as execution leaves that block.

Loop Counters and Iteration Scope
"""""""""""""""""""""""""""""""""

A classic example of block-level scope is the index variable declared in a
standard ``for`` loop header:

.. code-block:: java

   for (int i = 0; i < 10; i++)
   {
       System.out.println("Iteration: " + i);
   }

   // COMPILE ERROR: i cannot be resolved to a variable!
   // System.out.println("Final i was: " + i);

The counter variable ``i`` exists exclusively within the ``for`` statement. Once
the loop terminates, ``i`` is discarded from memory. If you require the final
value of an iteration index after the loop completes, you must declare the
variable *before* the loop:

.. code-block:: java

   int lastIndex = 0;
   for (int i = 0; i < 10; i++)
   {
       lastIndex = i;
   }
   System.out.println("Last index was: " + lastIndex); // Valid!

Method Scope (Parameters and Local Variables)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Formal parameters are declared in a method's signature header:

.. code-block:: java

   public void setTargetSpeed(int speed, boolean turbo)
   {
       int effectiveSpeed = speed; // Local variable
       if (turbo)
       {
           effectiveSpeed += 20;
       }
       this.currentSpeed = effectiveSpeed;
   }

The parameters ``speed`` and ``turbo`` receive copies of the argument values
passed into the method when called. Their scope spans the entire body of
``setTargetSpeed()``.

Every time a method is invoked, Java allocates a brand-new **stack frame** in
memory containing space for all of its parameters and local variables. When the
method finishes executing and returns, its stack frame is completely destroyed.
Local variables **do not persist between successive method calls**.

Class Instance Scope (Fields)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In contrast to local variables, **fields** (instance variables) are declared
directly inside the class body:

.. code-block:: java

   public class SensorNode
   {
       private double reading;
       private String location;

       public SensorNode(String location)
       {
           this.location = location;
           this.reading = 0.0;
       }

       public void updateReading(double newReading)
       {
           reading = newReading;
       }

       public double getReading()
       {
           return reading;
       }
   }

The fields ``reading`` and ``location`` have **class instance scope**:

* They are visible to **every method, constructor, and helper** within the class.
* They persist in memory on the heap for the **entire lifetime of the object**.
* Every distinct instance of ``SensorNode`` created with ``new`` possesses its
  own independent copies of these fields.

Variable Shadowing and Disambiguation with `this`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Variable shadowing** occurs when a variable declared in an inner scope has the
identical identifier name as a variable in an outer scope.

In Java, you cannot declare two local variables with the same name in the same
method or in nested blocks—the compiler will reject it as a duplicate variable
declaration:

.. code-block:: java

   int total = 10;
   if (total > 5)
   {
       // COMPILE ERROR: Variable total is already defined in method!
       int total = 20; 
   }

However, Java **does permit** a method parameter or local variable to have the
exact same name as an instance field:

.. code-block:: java

   public class Thermostat
   {
       private int temperature; // Field

       public void setTemperature(int temperature) // Parameter shadows field!
       {
           // Which temperature is this?
           temperature = temperature; // Assigns parameter to itself! Field is untouched!
       }
   }

Inside ``setTemperature()``, the parameter ``temperature`` **shadows** (hides)
the field ``temperature``. An unqualified reference to ``temperature`` resolves
strictly to the parameter. As written above, the field is never modified!

To resolve this conflict cleanly, we use the ``this`` **keyword**. In Java,
``this`` is a reference to the current object executing the method. Prefixing
the field name with ``this.`` explicitly tells the compiler to access the
instance field:

.. code-block:: java

   public void setTemperature(int temperature)
   {
       this.temperature = temperature; // Valid: field on left, parameter on right!
   }

This idiom is the standard convention throughout professional Java development,
particularly in constructors and mutators.

Variable Lifetime vs. Scope
~~~~~~~~~~~~~~~~~~~~~~~~~~~

It is vital to distinguish between a variable's **scope** and its **lifetime**:

* **Scope** is a compile-time, textual property: *Where in the code can I write
  the name of this variable?*

* **Lifetime** is a runtime, temporal property: *How long does the variable's
  storage slot remain alive in memory?*

| Variable Category | Scope Boundary | Lifetime in Memory |
| :--- | :--- | :--- |
| **Block Variable** | From declaration to closing brace ``}`` of block. | From execution of declaration until the block exits. |
| **Method Parameter** | Entire body of declaring method. | Allocated when method is called; destroyed when method returns. |
| **Instance Field** | Entire body of declaring class. | Allocated when object is instantiated with ``new``; destroyed when object is garbage collected. |

Summarizing Scope Concepts
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/2nTjUAeD5WE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Your Opinions on Course Grading Policies
----------------------------------------

Please complete the following survey. The survey includes questions regarding
your opinions on the grading policies in this course and how you approach
learning. We will use this information to understand better how students are
affected by these policies so that we can improve the course.

Towards the end of the survey you will be asked if you consent for your answers
and course data to be used in a study about grading policies. There is no
additional work on your part if you provide consent. Completing the survey should
take less than 30 minutes. Your course instructor will not know whether you agree
to participate until after grades have been submitted. You will earn assignment
credit for submitting this survey, regardless of your survey responses.

.. raw:: html

    <p><a href="https://virginiatech.questionpro.com/t/AYIrDZ65ya" target="_blank">CS 1114 Grading Policies Survey 2</a></p>

Please answer below and your submission of the survey will be verified for
credit:

.. avembed:: Exercises/IntroToSoftwareDesign/EGPSurvey.html ka
   :long_name: Survey Completed


Reading Text Files with `Scanner` and `File`
--------------------------------------------

In Chapter 11, you learned how to use ``java.util.Scanner`` to tokenize text
streams and parse command words and numbers (using ``hasNext()``, ``next()``,
and ``nextInt()``) for Lab 11 (Simple Text Input). In that context, scanners
processed interactive input streams (like ``System.in``) or in-memory test
strings.

In this chapter, we extend those stream-processing techniques to
**file-based persistence**: reading datasets stored in permanent files on disk
media and saving outputs for future execution.

The Three-Step Stream Lifecycle and Resource Management
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Java, input and output are framed around the concept of a **stream**: an
ordered sequence of bytes or characters connecting a program to an external data
source or destination.

Every file stream operation follows a strict three-step lifecycle:

1. **Open the stream**: Establish a connection to the physical resource (such as
   a file on disk).

2. **Transfer data**: Read or write data sequentially from or to the stream.
3. **Close the stream**: Disconnect from the resource, releasing operating
   system file handles and flushing buffers.

When you created a ``Scanner`` on an in-memory ``String`` in Chapter 11, no
underlying operating system resources were allocated. However, opening a file on
disk requests a **file handle** (or file descriptor) from the host operating
system. Operating systems limit the number of open file handles any single
program can hold simultaneously. If a program repeatedly opens files without
closing them, it exhausts available handles—causing subsequent file operations to
fail. This defect is known as a **resource leak**. Therefore, calling
``scanner.close()`` as Step 3 is mandatory whenever reading from disk files.

Reading from Files Using `java.io.File` and `java.util.Scanner`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To open a physical disk file for reading with a standard ``Scanner``:

1. Create a ``java.io.File`` object representing the file path.
2. Pass the ``File`` object to the ``Scanner`` constructor.

Because the requested file might not exist on disk, opening a file is a checked
operation in Java that requires handling ``java.io.FileNotFoundException``:

.. code-block:: java

   import java.io.File;
   import java.io.FileNotFoundException;
   import java.util.Scanner;

   public class DataReader
   {
       public void readScores(String filename)
       {
           File file = new File(filename);

           // Defensive check: verify file exists before attempting to read!
           if (!file.exists())
           {
               System.out.println("Error: File " + filename + " does not exist.");
               return;
           }

           try
           {
               Scanner scanner = new Scanner(file);

               // Step 2: Read file contents line by line
               while (scanner.hasNextLine())
               {
                   String line = scanner.nextLine();
                   System.out.println("Read: " + line);
               }

               // Step 3: Always close the stream to release the file handle!
               scanner.close();
           }
           catch (FileNotFoundException e)
           {
               System.out.println("Could not open file: " + e.getMessage());
           }
       }
   }

In CS 1114, you can also use the VT student support helper method
``IOHelper.createScanner(filename)``, which encapsulates file opening and error
handling:

.. code-block:: java

   Scanner scanner = IOHelper.createScanner("data.txt");

Line-by-Line Reading vs. Token Parsing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Chapter 11, command interpreters processed input token-by-token using
``scanner.next()``, skipping whitespace between words. Files, however, are
often structured as discrete records where each line represents a distinct entry
(such as lines in a CSV file or sentences in a document).

To read entire lines at a time, ``Scanner`` provides dedicated line-reading
methods:

* ``scanner.hasNextLine()``: Returns ``true`` if another line of text exists in
  the input stream.

* ``scanner.nextLine()``: Reads and returns the entire remainder of the current
  line as a ``String`` (including all spaces and tabs), advancing the scanner
  past the newline delimiter.

Processing Structured Tabular Files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Text files frequently contain structured tabular data—such as student grades,
inventory catalogs, or spatial coordinates—where values are separated by spaces
or tabs.

Consider a file named ``inventory.txt`` containing item names, unit counts, and
prices:

.. code-block:: text

   Apples  45  0.89
   Oranges 30  1.15
   Bananas 60  0.59

Because ``Scanner`` supports typed parsing on file streams just as it does on
strings, we can read structured records using the typed query methods you learned
in Chapter 11:

.. code-block:: java

   public void processInventory(String filename)
   {
       Scanner in = IOHelper.createScanner(filename);

       while (in.hasNext())
       {
           String itemName = in.next();
           int quantity = in.nextInt();
           double unitPrice = in.nextDouble();

           double totalValue = quantity * unitPrice;
           System.out.println(itemName + " total inventory value: $" + totalValue);
       }

       in.close(); // Mandatory cleanup
   }

Visual Summary of File Scanner Concepts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/N7JAkNSTfAI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Writing Files with `PrintWriter`
--------------------------------

While ``Scanner`` handles incoming data streams, the standard class for
generating human-readable textual output in Java is
``java.io.PrintWriter``.

Creating a `PrintWriter`
~~~~~~~~~~~~~~~~~~~~~~~~

To create a new text file and write data to it:

.. code-block:: java

   import java.io.PrintWriter;
   import java.io.File;
   import java.io.FileNotFoundException;

   public void createReport(String filename)
   {
       try
       {
           PrintWriter writer = new PrintWriter(new File(filename));

           writer.println("=== Daily Sensor Summary ===");
           writer.println("Date: 2026-10-24");
           writer.printf("Average Temperature: %.2f degrees\n", 71.458);

           writer.close(); // Flush and close!
       }
       catch (FileNotFoundException e)
       {
           System.out.println("Could not create output file: " + e.getMessage());
       }
   }

In CS 1114, you can also use ``IOHelper.createPrintWriter(filename)``:

.. code-block:: java

   PrintWriter writer = IOHelper.createPrintWriter("report.txt");

When creating a ``PrintWriter`` for a filename:

* If the target file **does not exist**, the operating system creates a brand-new
  empty file.

* If a file with that name **already exists**, its previous contents are
  immediately erased (truncated to zero bytes) and replaced with the new output.

Core `PrintWriter` Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``PrintWriter`` class provides the identical formatting methods you have
long used with ``System.out``:

* ``print(value)``: Writes the text representation of any primitive or object to
  the file without terminating the line.

* ``println(value)``: Writes the value followed by an operating-system-specific
  newline character sequence (``\n`` on Linux/macOS, ``\r\n`` on Windows).

* ``println()``: Outputs an empty newline.
* ``printf(format, args...)``: Produces formatted text with precision specifiers
  (e.g., ``%.2f`` for two decimal places).

Generating Delimited Text Files (CSV Export)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One common application of file output is exporting data in **Comma-Separated
Values (CSV)** format, which can be opened directly in spreadsheet applications
like Microsoft Excel or Google Sheets:

.. code-block:: java

   public void exportStudentAverages(Map<String, Double> grades, String filename)
   {
       PrintWriter out = IOHelper.createPrintWriter(filename);

       // Write CSV header row:
       out.println("StudentID,AverageGrade");

       // Write data rows:
       for (String id : grades.keySet())
       {
           out.println(id + "," + grades.get(id));
       }

       out.close();
   }


Resource Management & Stream Closing
------------------------------------

Whenever a program opens a file, the underlying operating system allocates a
precious resource known as a **file descriptor** (or file handle). Operating
systems impose strict limits on how many file descriptors a single process can
keep open concurrently.

The Problem: Resource Leaks and Data Loss
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If your code repeatedly opens files inside loops or methods without closing them,
the program suffers a **resource leak**. Eventually, the operating system denies
any further file access, causing crashes.

Even worse, output streams employ **internal memory buffers** for efficiency.
When you call ``writer.println("Hello")``, Java does not immediately write the
characters to the physical disk platter or solid-state drive; it accumulates them
in a memory buffer.

Data is only written to disk when:

1. The internal buffer fills up completely,
2. You explicitly call ``writer.flush()``, or
3. You invoke ``writer.close()``.

If a program crashes or terminates before an output stream is closed, **buffered
data remaining in memory is lost forever**, resulting in truncated or completely
empty output files!

The Ownership Rule of Resource Management
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To prevent resource leaks and data corruption, follow this foundational rule:

.. note::

   **The Ownership Rule**: The method or class responsible for *opening* a stream
   must also be responsible for *closing* it.

Modern Resource Management: Try-with-Resources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Java 7 introduced the **try-with-resources statement**, the gold standard in
modern Java for safe resource management. Any object implementing the
``java.lang.AutoCloseable`` interface (which includes ``Scanner`` and
``PrintWriter``) declared inside the ``try (...)`` parentheses is
**guaranteed to be closed automatically** when the block exits, whether the code
completes normally or throws an exception:

.. code-block:: java

   public void copyFile(String sourceName, String destName)
   {
       File inFile = new File(sourceName);
       File outFile = new File(destName);

       // Try-with-resources automatically closes BOTH streams!
       try (Scanner source = new Scanner(inFile);
            PrintWriter dest = new PrintWriter(outFile))
       {
           while (source.hasNextLine())
           {
               dest.println(source.nextLine());
           }
       }
       catch (FileNotFoundException e)
       {
           System.out.println("File error: " + e.getMessage());
       }
   }


2D Coordinate Geometry & Spatial Transformations
------------------------------------------------

In Chapter 10, we explored multi-dimensional arrays, traversing rows and columns
using nested ``for`` loops. In computer graphics, computer vision, GIS mapping,
and simulation systems, grid manipulation frequently demands understanding **2D
spatial coordinate geometry**.

In a digital image or spatial matrix:

* The horizontal axis is **$x$**, extending from $0$ (the left edge) to
  $width - 1$ (the right edge).

* The vertical axis is **$y$**, extending from $0$ (the top edge) to
  $height - 1$ (the bottom edge).

Notice that in standard computer graphics coordinates, the vertical $y$-axis is
inverted relative to Cartesian school math: **$y = 0$ is at the very top**, and
$y$ increases as you move downward!

The Center Point of a Spatial Field
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Many geometric operations require identifying the exact center coordinate of the
grid:

.. code-block:: java

   int centerX = width / 2;
   int centerY = height / 2;

For example, in a $100 \times 100$ coordinate grid:

* ``centerX = 100 / 2 = 50``
* ``centerY = 100 / 2 = 50``

Coordinate Distance Offsets
~~~~~~~~~~~~~~~~~~~~~~~~~~~

For any arbitrary cell located at coordinates $(x, y)$, its horizontal and
vertical offsets from the center point are calculated via subtraction:

.. code-block:: java

   int deltaX = x - centerX;
   int deltaY = y - centerY;

* If $x < centerX$, $\Delta x$ is negative (the cell lies to the left of center).
* If $x > centerX$, $\Delta x$ is positive (the cell lies to the right of center).
* If $y < centerY$, $\Delta y$ is negative (the cell lies above center).
* If $y > centerY$, $\Delta y$ is positive (the cell lies below center).


Euclidean Distance & Radial Modulation Formulas
-----------------------------------------------

While rectangular grids are indexed by discrete integers, physical phenomena
such as light, sound, heat, and gravity disperse **radially in circles** from a
central source point.

The Euclidean Distance Formula
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To determine how far any coordinate $(x, y)$ is from an anchor point $(centerX,
centerY)$, we apply the classical **Euclidean distance formula** derived from
the Pythagorean theorem:

$$\text{distance} = \sqrt{(x - centerX)^2 + (y - centerY)^2}$$

In Java, we compute this using ``Math.sqrt()`` and basic arithmetic:

.. code-block:: java

   double deltaX = x - centerX;
   double deltaY = y - centerY;
   double distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

Notice that squaring the delta terms (``deltaX * deltaX``) naturally eliminates
any negative signs, ensuring the squared sum is always positive before taking the
square root.

Maximum Distance and Radius Normalization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To scale or modulate values across a spatial grid, we need to know the **maximum
possible distance** from the center to the farthest point in the grid (which
occurs at any of the four outer corners):

$$\text{maxDistance} = \sqrt{centerX^2 + centerY^2}$$

.. code-block:: java

   double maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

By dividing the current cell's distance by ``maxDistance``, we compute a
**normalized radial ratio** between $0.0$ and $1.0$:

$$\text{ratio} = \frac{\text{distance}}{\text{maxDistance}}$$

* At the exact center $(centerX, centerY)$, $\text{distance} = 0.0$, so $\text{ratio} = 0.0$.
* At the farthest corner, $\text{distance} = \text{maxDistance}$, so $\text{ratio} = 1.0$.

Radial Heat Dispersion Example
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Consider a simulation where a heating element is placed at the center of a
two-dimensional metal plate. The temperature is hottest at the center and
dissipates smoothly toward the cool outer edges.

We can model this using a radial falloff factor:

$$\text{factor} = 1.0 - \frac{\text{distance}}{\text{maxDistance}}$$

.. code-block:: java

   public class HeatPlateSimulation
   {
       private double[][] grid;
       private int width;
       private int height;

       public HeatPlateSimulation(int width, int height)
       {
           this.width = width;
           this.height = height;
           this.grid = new double[height][width];
       }

       public void applyCentralHeat(double maxTemperature)
       {
           int centerX = width / 2;
           int centerY = height / 2;
           double maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

           for (int y = 0; y < height; y++)
           {
               for (int x = 0; x < width; x++)
               {
                   double dx = x - centerX;
                   double dy = y - centerY;
                   double distance = Math.sqrt(dx * dx + dy * dy);

                   grid[y][x] = computeDissipatedTemp(distance, maxDistance, maxTemperature);
               }
           }
       }

       /**
        * Helper method: computes dissipated temperature with safe bounding.
        */
       public double computeDissipatedTemp(double dist, double maxDist, double maxTemp)
       {
           double falloff = 1.0 - (dist / maxDist);

           // Defensive clamping: ensure factor remains in [0.0, 1.0]
           double clampedFactor = Math.max(0.0, Math.min(1.0, falloff));

           return maxTemp * clampedFactor;
       }
   }

Decomposing Complex Geometry with Helper Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Notice how the nested coordinate loops in ``applyCentralHeat()`` remain clean
and readable because the arithmetic calculation of the temperature value is
delegated to the ``computeDissipatedTemp()`` **helper method**.

Extracting mathematical formulas into private helper methods offers three
profound software engineering benefits:

1. **Isolation of Complexity**: Loop indexing logic is separated from arithmetic
   physics formulas.

2. **Reusability**: The same mathematical helper can be reused across multiple
   transformation passes.

3. **Testability**: The mathematical helper can be exercised directly by unit
   test assertions with known synthetic inputs!


Testing File I/O and Spatial Algorithms with `TestCase`
-------------------------------------------------------

Testing software that interacts with external files and complex mathematical
transformations requires disciplined automated test design.

In CS 1114, test classes extend ``TestCase`` (from the ``student`` package).
Because the BlueJ project template provides the required import
(``import student.TestCase;``), test classes simply extend ``TestCase``
directly without package qualification:

.. code-block:: java

   import student.TestCase;

   public class FileProcessorTest extends TestCase

Testing File Input and Output Without Hardcoded Disk Files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Testing file I/O against physical disk files can introduce brittle dependencies:
files might be missing, permissions may fail, or test runs might pollute the
filesystem.

To make unit testing deterministic and fast, the ``TestCase`` base class provides
built-in stream mocking helpers:

* ``setIn(String data)``: Feeds synthetic string data into the test framework's
  input stream.

* ``in()``: Returns a ``Scanner`` reading from the synthetic input configured by
  ``setIn()``.

* ``out()``: Returns a ``PrintWriter`` that records all program output.
* ``out().getHistory()``: Retrieves everything written to the output stream as a
  ``String`` for assertion evaluation.

.. code-block:: java

   public class DataReporterTest extends TestCase
   {
       private DataReporter reporter;

       public void setUp()
       {
           reporter = new DataReporter();
       }

       /**
        * Verifies that processing synthetic scanner input produces expected results.
        */
       public void testProcessScores()
       {
           setIn("85 92 78 95");
           int average = reporter.computeAverage(in());

           assertEquals(87, average);
       }

       /**
        * Verifies that writing to a PrintWriter produces expected formatted text.
        */
       public void testProduceReport()
       {
           reporter.writeHeader(out(), "Midterm Exam");

           String history = out().getHistory();
           assertTrue(history.contains("=== Midterm Exam ==="));
       }
   }

Testing 2D Spatial Geometry with Synthetic Fixtures
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When testing spatial distance algorithms, running tests on large images or giant
$1000 \times 1000$ matrices makes manual verification tedious.

The best practice is to test on **small synthetic grids** (such as $3 \times 3$
or $5 \times 5$) where expected distances can be solved by hand on paper:

For a $3 \times 3$ grid with $centerX = 1, centerY = 1$:

* Center $(1, 1)$: $dx = 0, dy = 0 \implies distance = 0.0$.
* Adjacent edge $(1, 2)$: $dx = 0, dy = 1 \implies distance = 1.0$.
* Diagonal corner $(0, 0)$: $dx = -1, dy = -1 \implies distance = \sqrt{1 + 1} = \sqrt{2} \approx 1.414$.

.. code-block:: java

   public class HeatPlateSimulationTest extends TestCase
   {
       private HeatPlateSimulation sim;

       public void setUp()
       {
           sim = new HeatPlateSimulation(3, 3);
       }

       /**
        * Verifies exact center temperature is undiminished.
        */
       public void testCenterTemperature()
       {
           double temp = sim.computeDissipatedTemp(0.0, 1.414, 100.0);
           assertEquals(100.0, temp, 0.01);
       }

       /**
        * Verifies outer corner temperature falloff.
        */
       public void testCornerTemperature()
       {
           double maxDist = Math.sqrt(1 + 1); // 1.4142...
           double temp = sim.computeDissipatedTemp(maxDist, maxDist, 100.0);
           assertEquals(0.0, temp, 0.01);
       }

       /**
        * Verifies that distances exceeding maxDistance clamp gracefully to 0.0.
        */
       public void testClampingBeyondMax()
       {
           double temp = sim.computeDissipatedTemp(5.0, 2.0, 100.0);
           assertEquals(0.0, temp, 0.01);
       }
   }

By combining small test fixtures with tolerance assertions (``assertEquals(expected, actual, delta)``),
you guarantee that your spatial transformations are mathematically sound before
deploying them to full-scale applications.


Programming Practice 13
-----------------------

.. extrtoolembed:: 'Programming Practice 13'
   :workout_id: 1572


.. raw:: html

   <footer style="border-top: 1px solid #777;"><div class="footer">
     Selected content adapted from:<br/>
     <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
     licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
     <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
     licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
   </div></footer>
