.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bob Edmison

Tips on Random Numbers
======================

  * `Generating Random Numbers`_
  * `Testing Random Behaviors`_

Generating Random Numbers
-------------------------

Sometimes you might find it helps to make random choices in some of your programs where you want your choices to more independent and varied.  Java provides a built-in class called ``Random`` for generating random numbers, and our student class library includes a special version of this class that is helpful for beginners. To use this class, add the following import statement at the top of your file:

.. code-block:: java
  
      import student.util.Random;
      
The ``Random`` class provides a method called generator() to get an object that represents a random number generator. Here, we only need to deal with generating random integers, and the generator provides a method that is very useful for this purpose. You can use it like this:
  
.. code-block:: java

      Random generator = Random.generator();   // local variable to refer to the random number generator
      int value = generator.nextInt(4);        // generate a random number from 0 - 3
      
The generator provides a method called ``nextInt()`` that generates a random integer. It takes a single parameter, which is an upper limit. When you provide this upper limit, the ``nextInt()`` method will generate a number from 0 (inclusive) up to (but not including) the upper limit.
  
So, for example, if you want to generate a number from 0-99, you would call ``nextInt(100)``. Suppose that you would like to perform some action 15% of the time. You could do this:
  
.. code-block:: java

      Random generator = Random.generator();   // local variable to refer to the random number generator
      int value = generator.nextInt(100);
      if (value < 15)
      {
          // ...
      }
      
Here, the call to ``nextInt()`` will produce a number from 0-99 (that is 100 possible values), and the if statement will execute its true branch if the generated number is in the range 0-14 (which is 15 possible values, or 15% of the time).
  
  
Testing Random Behaviors
------------------------

Random behaviors are great for chance-based events. But random behaviors also make software testing hard. When you add random behavior to your code and then want to test it, what will your test case do? Suppose you want your Actor to turn left in a specific situation half the time, and right the other half. If you write a test case where the Actor is in that situation, it might turn left ... or it might not. How can you write tests for that???

The answer is simple: the ``Random`` class helps you. Consider the following code sequence, which generates three random numbers less than 100:

.. code-block:: java

    // using the same local variable "generator" from before
    int x = generator.nextInt(100);
    int y = generator.nextInt(100);
    int z = generator.nextInt(100);

It would be difficult to write a test case that used this code, since you have no way of controlling what values end up in x, y, and z. For test cases, however, the ``Random`` class provides a special method called ``setNextInts()`` that lets you control what numbers are generated for testing purposes. You use it like this:

.. code-block:: java

    // In your test case, do this:
    Random.setNextInts(40, 50, 60);

    // In the code you are testing, this happens:
    int x = generator.nextInt(100);
    int y = generator.nextInt(100);
    int z = generator.nextInt(100);

    // You know x will get the value 40, while y is 50, and z is 60
    
So, when you are testing behaviors that are random, you can force the actions to be predictable just by saying in your test cases what sequence of values you want the random number generator to produce. Outside of test cases, the generator will produce a truly (pseudo-)random sequence, but inside your test cases, the numbers will be completely determined by you.