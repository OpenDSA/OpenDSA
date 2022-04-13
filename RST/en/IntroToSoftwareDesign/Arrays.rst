.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Arrays
======

So far in this class, we have used ``List``\ s  when we need to store many
pieces of data in a single object. Lists provide many advantages for this,
but they are not the only way to group many values into one object.
In this module, we will study another data structure called an **array**.

Arrays are much more primitive than lists, and are one of the principal
building blocks used to build more sophisticated data structures in many
programming languages. Although it is often easier to use lists, understanding
how arrays work constitutes basic programming knowledge that all computer
scientists are expected to know.

An **array** is a named collection of contiguous storage locations--storage
locations that are next to each other--that contain data items of the same type.
However, when working with an array, the size will be fixed from the start.
You can think of an array as being similar to a series of identical variables
all declared in a row, where each individual variable is identified with a
number or position in the group (its **index**).

You may have also noticed that the class ``ArrayList`` uses "array" in its
name. That is because the ``ArrayList`` class uses an array internally to
store the data in the list. However, there are several differences, as
we'll see below. You'll often see arrays depicted graphically using
diagrams like this:

.. odsafig:: Images/jjj-array-fig9.1.png
   :align: center

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/ei_4Nt7XWOw?start=21" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Creating An Array
-----------------

An **array** is a sequence of values; the values in the array are
called **elements**. You can make an array of ``int``\ s, ``double``\ s,
``String``\ s, or any other type, but all the values in an array must have
the same type. The type of values stored in the array is called the
array's **element type**.

To create an array, you have to declare a variable with an array type and
then create the array itself. Array types look like other Java types, except
they are followed by square brackets (``[]``). No, there is no special
"array" keyword in Java; you just add square brackets onto the end of any
type to turn it into an array type. For example, the following
lines declare that ``counts`` is an "integer array" and ``values`` is
a "double array".

.. code-block:: java

   int[] counts = new int[4];
   double[] values = new double[size];

To create the array itself, you have to use the ``new``
operator, which you have used to create all other objects. The ``new``
operator **allocates** memory for the array and automatically initializes
all of its elements to zero.
The first declaration initializes the variable ``counts`` to refer to a new
array of four integers. The second initalizes ``values`` to refer to an
array of ``double``\ s, but the number of elements depends on the value
of ``size`` (at the time the array is created).

You can use any integer expression for the size of an array, as long as the
value is non-negative. If you try to create an array with -4 elements, for
example, you will get a ``NegativeArraySizeException``. An array with zero
elements is allowed, and there are special uses for such arrays. They
are often called "empty arrays".

Importantly, once we establish the size of our array, we can't change it.  If
we suddenly decide we need an array of a different size, we'll need to create
a new array object instead.

Like objects, arrays are instantiated with the ``new`` operator and they have
fields (for example, ``length``).  Like variables for objects, variables that
refer to arrays are considered reference variables. When arrays are used as
parameters, a reference
to the array is passed rather than a copy of the entire array. The
primary difference between arrays and full-fledged objects is that arrays
aren’t defined in terms of an ``Array`` class. Thus, arrays don’t fit into Java’s
``Object`` hierarchy. They don’t inherit any properties from ``Object`` and
they cannot be subclassed.

Most importantly, that means that arrays themselves, while they are objects,
have **no useful methods**. Instead, you need to use library classes to
access methods that work with arrays.

When creating an array of Strings or any type of object (like Jeroo or Pixel),
each of the items in our array will be initialized to ``null``.  If we created
an int (or double) array, each item in the array will be initialized to 0, and
an array of booleans will have each item initialized to ``false`` when the
array is created.

There is a second way we can create an array if we know what we want
to put in the array when we create it.

For example, lets say we wanted to create an array to store the
numbers: 97, 43, and 2.

.. code-block:: java

   int[] counts = {97, 43, 2};

This will make an array of size 3 that contains these three values. The
sequence of values in curly braces serves to specify the initial values we
want to place in each slot of the array we are creating.


Accessing Items in Arrays
-------------------------

However, arrays access the values a little bit differently, making use of the square
brackets again.

When referencing elements in an array, we refer to the position of that
particular element within the array. For example, if the array is
named ``values``, then the elements are named ``values[0]``, ``values[1]``,
``values[2]``, ... ``values[n - 1]``, where *n* gives the number of elements
in the array. This naming also reflects the fact that
the array’s data are contained in storage locations that are next to each
other.

Note that this is the same concept as referring to positions in
a ``List`` or character positions within a ``String``. The item in the
first "slot" of our array is at index 0 and the last item in the array is
going to be one less than the size of the array.  For example,
the first item in an array of size 5 is at index 0, and the last is at
index 4.  Trying to access the index 5 would cause
an ``ArrayIndexOutOfBoundsException`` at runtime.

The syntax for referring to elements of an array uses square brackets to
provide the desired position (index):

.. raw:: html

   <blockquote><i>arrayname</i>[<i>subscript</i>]</blockquote>

Here, *arrayname* is the name of the array (any valid identifier will do) and
*subscript* is the position of the element within the array.

A **subscript** is an integer quantity contained in square brackets that is
used to identify an array element by its position or index value. A subscript
must be either an integer
value or an integer expression.  For example, all the of the following lines
of code are valid ways to access a value in an array ``values``

.. code-block:: java

   values[4]
   values[x]
   values[x + y]

These examples show that when an expression, such as ``x + y``, is used as a
subscript, it is evaluated to a specific integer value before the reference
is made.

It is a syntax error to use a non-integer type as an array subscript. Each
of the following expressions would be invalid:


.. code-block:: java

   // will not work!
   arr[5.0]
   arr["5"]


Setting Items in an Array
-------------------------

When working in ``List``\ s , if we wanted to change a value, we could use
the ``set`` method.  For example:

.. code-block:: java

   ArrayList <String> arr = new ArrayList<String>();
   arr.add("Brazil");
   arr.add("France");
   arr.add("Ethiopia");

   arr.set(0, "Columbia"); // changes the item at index 0 from Brazil to Columbia

After this code is executed, the ``List`` would contain the strings: Columbia,
France, and Ethiopia, in that order.

When working with an array, things are simpler.  We don't need to
call a method (because arrays have no useful methods). Instead,
referring to positions within an array uses a subscript in square
brackets. So when we want to change a value in the array, we can
treat ``arrayname[<any subscript>]`` just like a variable.

.. code-block:: java

   String[] countries = new String[3];
   countries[0] = "Brazil";
   countries[1] = "France";
   countries[2] = "Ethiopia";

   countries[0] = "Columbia"; // changes the item at index 0 from Brazil to Columbia


Arrays Compared to Lists (or ArrayList)
---------------------------------------

.. raw:: html

   <div class="align-center">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/NbYgm0r7u6o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Putting It All Together
-----------------------

To put this all together, consider a brand new array object:

.. code-block:: java

   int[] counts = new int[4];

Remember that when you create an array with the new operator, the elements are
initialized to zero, as shown in this memory diagram of the counts array so far.

.. odsafig:: Images/thinkjava2_016.png
   :align: center

The arrow indicates that the value of ``counts`` is a **reference** to the array.
You should think of *the array* and *the variable* that refers to it as two
different things. As you’ll soon see, we can assign a different variable to
refer to the same array, and we can change the value of ``counts``` to refer
to a different array.

The boldface numbers inside the boxes are the elements of the array. The
lighter numbers outside the boxes are the indexes used to identify each
location in the array. As with strings, the index of the first element
is 0, not 1. For this reason, we sometimes refer to the first element
as the “zeroth” element.

The ``[]`` operator selects elements from an array:

.. code-block:: java

   System.out.println("The zeroth element is " + counts[0]);

You can use the ``[]`` operator anywhere in an expression:

.. code-block:: java

   counts[0] = 7;
   counts[1] = counts[0] * 2;
   counts[2]++;
   counts[3] -= 60;

After executing these lines, the contents of the array will be changed to:

.. odsafig:: Images/thinkjava2_017.png
   :align: center

You can use any expression as an index, as long as it has type ``int``. One
of the most common ways to index an array is with a loop variable. For
example:

.. code-block:: java

   int i = 0;
   while (i < 4)
   {
       System.out.println(counts[i]);
       i++;
   }

This ``while`` loop counts up from 0 to 4. When ``i`` is 4, the condition
fails and the loop terminates. So the body of the loop is executed only
when ``i`` is 0, 1, 2, or 3. In this context, the variable name ``i`` is
short for "index".

Each time through the loop, we use ``i`` as an index into the array,
displaying the *i*\ th element. This type of array processing is usually
written as a for loop:

.. code-block:: java

   for (int i = 0; i < 4; i++)
   {
       System.out.println(counts[i]);
   }

For the ``counts`` array, the only legal indexes are 0, 1, 2, and 3. If the
index is negative or greater than 3, the result is
an ``ArrayIndexOutOfBoundsException``.

.. raw:: html

   <div class="align-center">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/1hUUsuDfmSw?start=40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Check Your Understanding: Arrays
--------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week10Quiz1Summ.html ka
   :long_name: Arrays


Syntax Practice 10a
-------------------

.. extrtoolembed:: 'Syntax Practice 10a'
   :workout_id: 1525


Iterating Over Arrays
---------------------

Lets say we wanted to iterate over all values in an array of integers to
print them all out.

We could do this with a counter-controlled loop or a for-each loop.


Counter-Controlled Loops Over Arrays
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To create a numeric for loop over an array, we need to know how many slots
the array has. Fortunately, every array knows its own length, and we can
access it using its ``length`` field.


.. code-block:: java

   int[] values = new int[ ... ];

   for (int i = 0; i < values.length; i++)
   {
       values[i] = 2 * i;
   }

Notice here that we use ``values.length`` to  access the array's length. Unlike
most other objects where you would use a method, arrays have no useful methods
and provide their length in a special **read-only** field called ``length``.
Don't get this confused with the ``length()`` method on strings or the
``size()`` method on lists--it is just a field, so you never include
parentheses after the field name.
Remember that since the size of an array can't be changed once it has been
created, you cannot assign a value to the ``length`` field of the array--it
is read-only.

To summarize this numeric for loop:

* The first subscript we want to use is at postion 0, so we create a new
  variable called ``i`` and initialize it to 0.
* Our last subscript position is one less than the length of the array.  This
  means we should stop when our counter is no longer less than the length of
  the array.  Thus, our loop condition is ``i < values.length``.
* We want to go through every index in the array so we write ``i++``
  for the update step to increment ``i`` by one each time the loop repeats.

When working with both ``List``\ s  and arrays, it's very easy to mix up when
to use the ``size()`` method and when to use ``length``.  Equally tricky is
that when accessing the length of a String variable, we'd use
the *method* ``length()``.

.. code-block:: java

   String[] words = new String[3];
   int x = words.length;   // x is set to 3

   String str = "Hello";
   int y = str.length();   // y is set to 5

   List<String> moreWords = new ArrayList<>();
   int z = moreWords.size();  // z is set to 0

Be sure to keep careful track of what type of data you're working with so
you can access its length correctly.


For-Each Loops Over Arrays
~~~~~~~~~~~~~~~~~~~~~~~~~~

For-each loops over arrays work exactly the same as with  lists or
other structures:

.. code-block:: java

   String[] coffees = {"Espresso", "Mocha", "Decaf", "Americano"};

   for (String coffee : coffees)
   {
       System.out.println(coffee);
   }

However, there are two critical differences compared to a numeric
for loop:

1. You do not have access to the current position or subscript value
   inside your loop, so you cannot use it in any computations inside
   the loop.
2. You can only access each value stored in the array, but cannot change
   the values stored in the array. The loop variable (for example, ``coffee``
   in this loop) is a local variable inside the loop. While you can assign
   a new value to the variable, that will not affect the array itself, or
   the contents of the array.

For-each loops have many advantages, since they are short to write and
near bullet-proof in terms of making mistakes with management of the
index/position or condition, making it nearly impossible to write infinite
loops. However, these advantages do come with limitations. Fortunately,
Arrays naturally support either style of for loop, so use the style that
best fits your needs.


Check Your Understanding: Iterating with Arrays
-----------------------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week10Quiz2Summ.html ka
   :long_name: Iterating with Arrays


Syntax Practice 10b
-------------------

.. extrtoolembed:: 'Syntax Practice 10b'
   :workout_id: 1880


Initializing Array Contents
---------------------------

As mentioned above, when a new array object is created, it is automatically
initialized. Normally, values are initialized to zero, false, or ``null``,
depending on what is appropriate for the array's element type.

However, what if you do not want an array of all zeroes or ``null``\ s?
As you've seen, you can explicitly list out your own initial values:

.. code-block:: java

   String[] coffees = {"Espresso", "Mocha", "Decaf", "Americano"};

This is great for small arrays or situations where it is convenient to
write out all the values. However, what if you have an array with 100 slots?
Or 1,000 slots?

For example, what if you want to initialize all of the pixels in a large image
to be blue?

If you have an array you want to initialize to something other than
zeroes or ``null``\ s, just use a numeric for loop to iterate over all
slots in the array, and use an assignment statement to set values as
needed. For example, to initialize an array of 100 integers to the values
0-99:

.. code-block:: java

   int[] values = new int[100];

   for (int i = 0; i < values.length; i++)
   {
       values[i] = i;
   }


Printing Arrays
---------------

You can use ``println()`` to display an array, but it probably doesn’t do what
you would like. For example, say you print an array like this:

.. code-block:: java

   int[] values = {1, 2, 3, 4};
   System.out.println(values);

The output is something like this:

.. raw:: html

   <pre>
   [I@bf3f7e0
   </pre>

The bracket indicates that the value is an array, I stands for "integer", and
the rest represents the address of the array in memory.

If we want to display the elements of the array, we can do it ourselves:

.. code-block:: java

   public void printArray(int[] values)
   {
       System.out.print("[" + values[0]);
       for (int i = 1; i < values.length; i++)
       {
           System.out.print(", " + values[i]);
       }
       System.out.println("]");
   }

Given the previous array, the output of ``printArray()`` is as follows:

.. raw:: html

   <pre>
   [1, 2, 3, 4]
   </pre>

Fortunately, the Java library already includes a class, ``java.util.Arrays``,
that provides methods for working with arrays. One of them, ``toString()``,
returns a string representation of an array. Remember that arrays **do not
provide useful methods themselves**, but this utility class does provide
them for you. After importing ``Arrays``, we can invoke ``toString()`` like this:

.. code-block:: java

   System.out.println(Arrays.toString(values));

And the output is shown here:

.. raw:: html

   <pre>
   [1, 2, 3, 4]
   </pre>

Notice that ``Arrays.toString()`` uses square brackets around the elements
of the array, and produces output that looks the same as the ``toString()``
method for ``List`` objects.


Copying Array Variables
-----------------------

Array variables contain references to arrays. When you make an assignment to
an array variable, it simply copies the reference. But it doesn’t copy the
array itself. For example:

.. code-block:: java

   double[] a = new double[3];
   double[] b = a;

These statements create an array of three ``double``\ s and make two different
variables refer to it.

.. odsafig:: Images/thinkjava2_018.png
   :align: center

Any changes made through either variable will be seen by the other. For
example, if we set ``a[0] = 17.0;``, and then display ``b[0]``, the result
is ``17.0``. Because ``a`` and ``b`` are different names for the same thing,
they are sometimes called **aliases**.

If you actually want to copy the array, not just the reference, you have to
create a new array and copy the elements from one to the other, like this:

.. code-block:: java

   double[] b = new double[3];
   for (int i = 0; i < 3; i++)
   {
       b[i] = a[i];
   }

``java.util.Arrays`` provides a method named ``copyOf()`` that performs this
task for you. So you can replace the previous code with one line:

.. code-block:: java

   double[] b = Arrays.copyOf(a, 3);

The second parameter is the number of elements you want to copy,
so ``copyOf()`` can also be used to copy part of an array. After invoking
``Arrays.copyOf()`` in this way, the two variables would end up in the
following state:

.. odsafig:: Images/thinkjava2_019.png
   :align: center

The examples so far work only if the array has three elements. It is better
to generalize the code to work with arrays of any size. We can do that by
replacing the magic number, 3, with ``a.length``:

.. code-block:: java

   double[] b = new double[a.length];
   for (int i = 0; i < a.length; i++)
   {
       b[i] = a[i];
   }

The last time the loop gets executed, ``i`` is ``a.length - 1``, which is
the index of the last element. When ``i`` is equal to ``a.length``, the
condition fails and the body is not executed--which is a good thing, because
trying to access ``a[a.length]`` would throw an exception.

Of course, we can replace the loop altogether by using ``Arrays.copyOf()``
and ``a.length`` for the second argument. The following line produces
the same result shown above:

.. code-block:: java

   double[] b = Arrays.copyOf(a, a.length);

The ``Arrays`` class provides many other useful methods
like ``Arrays.compare()``, ``Arrays.equals()``, ``Arrays.fill()``,
and ``Arrays.sort``. Take a moment to read the documentation by searching
the web for ``java.util.Arrays``.

.. raw:: html

   <div class="align-center">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/GQWbUdb4d58?start=46" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Naming Array Variables
----------------------

Picking names for array variables can be tricky. For example, consider
this array.

.. code-block:: java

   String[] words = {"loop", "array", "method", "class"};

Here, we have chosen a plural name, which is the most common pattern
in naming arrays. Use a plural name when you most often refer to the
whole array as an object, and want to give it a name that represents
the entire collection of values as a whole. This aids readability when
writing loops, passing the array as a parameter to other methods, and
so on, since the plural name serves as a reminder that the array is
a whole group of values combined into one object.

However, there are other situations where you may instead primarily
focus on individual slots within the array, rather than on the array
itself. If code primarily involves working with just a single array
slot, then a singular name can be more useful. For example, if we
have an array of words, but we most often think about referring to
"word 1" in the array, or "word 3" in the array, or "word 0" in the
array, then naming the array ``word`` instead of ``words`` would
allow us to use subscript expressions like ``word[1]`` or ``word[3]``
or ``word[0]``. Since this pattern exactly matches the natural phrasing
we would use when talking about a single value within an array, sometimes
it is a better choice.

In practice, you will make a judgement call about which is a better
fit for your situation. When in doubt, use a plural name, since that
is more common and avoids misleading impressions even if there are some
uses of the name where a singular name would be a better fit.


Writing Test Assertions Involving Arrays
----------------------------------------

When testing with array values, sometimes basic assertions are
convenient, but other times it can be complicated. You can
use ``assertThat(...).isEqualTo(...)`` to check that an array
has an expected value, as you would expect, but there are many
other options.

.. code-block:: java

   // We expect result is {"Espresso", "Mocha", "Decaf", "Americano"}
   String[] result = someObject.MethodThatReturnsArray();
   
   // If you want to check the size
   assertThat(result.length).isEqualTo(4);
   
   // Alternate way of checking the size
   assertThat(result).hasSize(4);
   
   // If you want to check a specific index
   assertThat(result[1]).isEqualTo("Mocha");

   // If you want to check the entire array
   String[] coffees = {"Espresso", "Mocha", "Decaf", "Americano"};
   assertThat(result).isEqualTo(words);

However, sometimes an array may be long, or it may not be
convenient to write out all the values, or you may want to
avoid declaring/creating/initializing a separate array to
compare against. Fortunately, there are some additional
methods you can use when making assertions about arrays.

The first method is ``containsExactly()``, which allows you
to directly list out the values you expect to find in the
array:

.. code-block:: java

   // If you want to check the entire array
   assertThat(result).containsExactly(
       "Espresso", "Mocha", "Decaf", "Americano");

When you make an assertion using ``containsExactly()``, you list
*all* of the array's contents in the order you expect, and that's it.
``containsOnly()`` succeeds if the array contains exactly the values
you specify, in the order you list them, and nothing else. It is a
useful shorthand for having to create a separate array object to
compare against. Even better, it **works for list objects too**!

However, sometimes if you have a really long array, you don't want to
list all the values. Instead, you can use:

.. code-block:: java

   // If you want to check the entire array
   assertThat(result).contains("Americano", "Mocha");

The ``contains()`` method allows you to list out
as many values as necessary. However, ``contains()`` will succeed
if the array has the specified values anywhere in the array in *any order*,
mixed in among its slots. The array may be longer, and may have other
values besides the ones you list, but it must include the values
you specify. This can be useful when there are a few values in the
array that matter, but the array is too long to list out all the
values. Again, this **works for lists too**.

There are also several other methods you can use on **arrays or
lists** when constructing tests, where you can specify as many or
few of the values as you need:

.. code-block:: java

   // If you want to check values are not present
   assertThat(result).doesNotContain("table", "chair");

   // To check the first few elements, without worrying about others
   assertThat(result).startsWith("Espresso", "Mocha");

   // To check the last few elements, without worrying about others
   assertThat(result).endsWith("Mocha", "Decaf", "Americano");

   // To check these occur only once in array, are not duplicated
   assertThat(result).containsOnlyOnce("Mocha", "Americano");


Applying Arrays in a Problem
----------------------------

This video discusses a "Web-Analyzer" project and discusses how arrays
could be used in this type of problem.  You don't need to worry too much
about what this project does or how it works, or about completing the
exercise given in the video.  It is just a more detailed example used to
explain arrays and how they might be used in a problem.

.. raw:: html

   <div class="align-center">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/xs9HnwBAg14?start=96&end=755" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Syntax Practice 10c
-------------------

.. extrtoolembed:: 'Syntax Practice 10c'
   :workout_id: 1881


Check Your Understanding
------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week10ReadingQuizSumm.html ka
   :long_name: Arrays Review


Programming Practice 10a
------------------------

.. extrtoolembed:: 'Programming Practice 10a'
   :workout_id: 1526


Programming Practice 10b
------------------------

.. extrtoolembed:: 'Programming Practice 10b'
   :workout_id: 1879


.. raw:: html

   <footer style="border-top: 1px solid #777;"><div class="footer">
     Selected content adapted from:<br/>
     <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
     licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
     <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
     licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
   </div></footer>
