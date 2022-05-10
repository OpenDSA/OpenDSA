.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bob Edmison

Writing JUnit Tests with student.TestCase
=========================================

This page describes the basics of creating JUnit tests using the ``student.TestCase class`` in Java:

  * `Use JUnit`_ 
  * `Run a JUnit Test`_
  * `Naming Conventions`_
  * `Instance Variables`_
  * `setUp Method`_
  * `tearDown Method (Optional)`_
  * `Code coverage`_
  * `Testing Exceptions`_
  * `General Unit Testing Tips`_
  * `Testing methods by passing null params`_
  * `I/O Testing Tips`_
  
Use JUnit
---------

To make a JUnit test class in eclipse:

1. Right-click the class you’re creating a test class for in the Package Explorer

2. Click: ``New > Class`` (creating a JUnit Test Case isn't CS2-Support compliant)

3. Name the class Test. (i.e. HokieTest, ArrayBagTest)

4. Click finish (You may want to check the box for ‘generate comments’ if you wish)

5. Add an import statement: import student.TestCase

6. Add that your class extends TestCase.

7. Project Build Path should be configured to have CS2-Support project included (note that CS2-Support needs to be open to appear as an option)

8. Declare instance variables

   - Create at least one field of the object of the class you are testing.

9. Write setUp method
  
  - Use the setUp() method to initialize your object(s), it will be run before each test method.

10. Write test methods for each method in class being tested
  
  - Create at least one test method for each of the methods in your class. Each method in your test class needs to start with ‘test’ or else it will not run correctly! (i.e. testGetName, testAdd) For a test method, call the corresponding method on the object and use assertion statements to test your code.

11. Write additional test methods as needed

A simplified test class example for the Student class:

.. code-block:: java

  public class StudentTest extends student.TestCase
  {
      private Student janeDoe;
  
      public void setUp()
      {
          janeDoe = new Student(“Jane Doe”);
      }
  
      public void testGetName()
      {
          assertEquals(“Jane Doe”, janeDoe.getName());
      }
  }
    
    
Run a JUnit Test
----------------

To run a JUnit test class:

1. Right-click the test class in the Package Explorer

2. Click: ``Run as > JUnit Test`` (Click ``Android Junit Test`` for Android projects).  A JUnit window should pop-up and display green if all of your tests are correct and red if one more has failed.

Naming Conventions
------------------

For classes: Add ``Test`` to the end of the class name

  * example: ``HelloWorld`` is the class; ``HelloWorldTest`` is the test class
  
For methods: start the test method with ``test``

  * example: ``foo`` is the method; ``testFoo`` is the test method
  
  
Instance Variables
------------------

- Use instance variables to hold values for testing

- AKA field variables, member variables

- scope of instance variable is all instance methods so variable can be used in multiple tests

- in the example above, ``janeDoe`` is an instance variable

setUp Method
------------

- The ``setUp()`` method runs before each test method.

- Use this method to initialize instance variables

- **Must be called** ``setUp`` -- remember to make that **U** uppercase!

tearDown Method (Optional)
--------------------------

- The tearDown() method runs at the end of each test method. It is *optional* for the test case.

- It is used to wrap up work after the test is concluded

- Uses: check the layout of a linked list, closing files

- **Must be called** ``tearDown`` -- remember to make that **D** uppercase!


Code coverage
-------------
Write tests that test average cases

- example: In a list, test for adding to the middle

Write tests that test edge cases
 
- example: In a list, test for adding at the beginning of a list


N simple conditions, N+1 branches and tests
*******************************************
Assertions in a test method need to make it to every condition of an if-else statement. It isn’t enough that the test reaches the ‘else’ condition. To test an if-else statement properly, the body of each condition must be run during testing.

.. code-block:: java

  if (x == 0 && y ==1) // 2 conditions, 3 checks- TF, FT, TT

  if (x == 0 || y == 1) // 2 conditions, 3 checks- TF, FT, FF
 

Clarification for edge and average cases- For a list that contains 100 values, you must check for indices -1, 0, 99, 100, and something in between.

**Example**: say we had the following:

.. code-block:: java

    if ( score >= 90 )
    {
        System.out.println( “Your grade is an A”);
    }
    else if ( score >= 80 )
    {
        System.out.println( “Your grade is a B”);
    }
    else if ( score >= 70 )
    {
        System.out.println( “Your grade is a C”);
    }
    else if ( score >= 60 )
    {
        System.out.println( “Your grade is a D”);
    }
    else
    {
        System.out.println( “Your grade is an F”);
    }
    
Your test class would have to test for all 5 of the above possibilities in order to execute every single line of code in the block of if-else statements.

**Sometimes the best way to test your code is to clean your code first!**

Cleaning up your code before you test it can save lots of time. In addition, the way you structure your code may make it easier to test correctly.

Example: Say we had written the following inside of a method:

.. code-block:: java

    if ( A > B )
    {
        if ( C != 0 && ( A > B ))
        {
           // do something
        }
    }
    
We can easily clean up this if statement by noticing that we are evaluating A > B twice when it’s unnecessary. We can re-write it as the following: 

.. code-block:: java

    if ( A > B )
    {
        if ( C != 0)
        {
            // do something
        }    
    }
    
We might decide to un-nest them as well:

.. code-block:: java

    if ( (A > B) && ( C != 0) )
    {
        //do something
    }
    
Now, it’s easier to see all the conditions that need to be tested.

Keep JUnit test methods to a small example
******************************************

When testing a method with multiple if-else statements, it can usually simplify testing to split each possibility into its own test method.This can be particularly helpful when making sure you’re reaching every condition in a more complex if-else statement block ( a common Web-CAT error ).

Say we are testing a method with the following if-else statement in it:

.. code-block:: java

    if ( A > B)
    {
        //do something
    }
    else
    {
        //do something else
    }
    
It might be a good idea to have one test method evaluate this if statement when A > B is true and another test method evaluate the same if statement when A > B is false.

Assert Statements
*****************

Assert statements are used in test classes to test code
When you run your test class, the assert statements will let you know whether or not your code is working
Read about them here: http://courses.cs.vt.edu/~cs1114/api/student/TestCase.html

Common ones:

* assertEquals

* assertTrue

* assertFalse

* assertNull

* assertNotNull

Avoid testing via ``System.out.println()``

Use assertion statements rather than testing via ``System.out.println()``

Example: Say you want to make sure that the method ``getName()`` is returning the correct String. Rather than calling:

``System.out.println(janeDoe.getName());``

Use an assertion statement:

``assertEquals(“Jane Doe”, janeDoe.getName());``

Warning If you do NOT have any assertion statements inside a test method, it will always evaluate as “true” when run as a JUnit test. To prevent this, you can add the line:

``fail("Not yet implemented");``

inside of a test method you haven't completed yet.

Testing Exceptions
------------------
**If you throw them, then catch them in your testing!**

Use a ``try-catch`` block in your testing to check if your code has thrown the right exception. In your try block, you should call the method that results in an exception being thrown. The catch block should catch the exception thrown. Then assert that the exception exists, is the correct exception, and (if applicable) contains the correct message.

**Example**: Say you are trying to access an element in a data structure that cannot be accessed by using an iterator object, so you are testing to check if a NoSuchElementException is thrown with the message “There are no more elements left to iterate over.”. The following inside of a test method will determine if you caught the right exception correctly:

**Example**:

.. code-block:: java

    Exception thrown = null;

    try
    {
        //call the method that should throw a NoSuchElementException
        iterate.next();
    }
    catch (Exception exception)
    {
        //”Catch” and store the exception
        thrown = exception;
    }
    //assert that an exception was thrown
    assertNotNull(thrown);
    
    //assert that the correct exception was thrown
    assertTrue(thrown instanceof NoSuchElementException);
    
    //Check the message of the exception is correct
    assertEquals(thrown.getMessage(), "There are no more elements left to iterate over.");
    

Testing toArray() methods
*************************

The ``toArray()`` method returns an Object array containing each element found in a given collection.

Testing the ``toArray()`` method requires that we confirm that the actual array of Objects returned by the method matches an expected array of Objects. 

Note that the ``assertEquals`` and ``assertTrue`` methods **do NOT** provide a mechanism to readily compare two arrays.  
We therefore cannot simply perform the following:

.. code-block:: java

    Object[] expectedArray = {"A","B","C","D"};
    
    Object[] actualArray = {"A","B","C","D"};
    
    assertEquals(expectedArray, actualArray);
        
Using the assert in this manner would result in a failed test and an ``AssertionFailedError`` (see image below).

.. odsafig:: Images/eclipse_failure_trace.png
   :align: center
   :figwidth: 90%
 

nor can we use:

.. code-block:: java

    assertTrue( expectedArray.equals( actualArray) );

We need therefore need an alternative option.

One approach is to iterate through the elements of each array, comparing each element in one array with the corresponding element in the other array. If any pair do not match then we can conclude that the two arrays are not equal and therefore return false.  Note that we must check ALL of the elements of an array against their counterparts before we can determine if they are equal or not.  They will only be equal if we did not encounter any two pairs that were not equal to each other. In this case, for example, we would start by comparing the elements at index 0, i.e. compare ``expectedArray[0]`` against ``actualArray[0]``,then index 1, i.e. compare ``expectedArray[1]`` against ``actualArray[1]``, and so on until completed.

Consider using the ``for`` loop to help with such a task.

General Unit Testing Tips
-------------------------
Debugging a broken test can be tedious, especially in bigger projects.  To make the process easier on yourself, Make sure each test case covers exactly 1 logical component.  For instance let’s consider this abbreviated form of our Hokie class:

.. code-block:: java

    public class Hokie {
        private String pid;
        private String hometown;
        private int graduationYear;
        private int DOBYear;
    
        public boolean setDOBYear(int year) {
            if (year > 0 && (year < 3000)) {
                DOBYear = year;
                return true;
            }
            return false;
        }
    
    
        public String toString() {
            return pid;
        }
    }
    
We could create a test case like this: 

.. code-block:: java

    public void test1(){
        // Tests setDOBYear
        assertTrue(elena.setDOBYear(1968));
        assertEquals(1968,elena.getDOBYear());
        assertFalse(john.setDOBYear(12031995));
    
    
        // tests toString
        Hokie gobbler = new Hokie("gobbledee",1973);
        assertEquals("gobbledee",gobbler.toString());
    }
     
    
     public void test1(){
           // Tests setDOBYear
           assertTrue(elena.setDOBYear(1968));
           assertEquals(1968,elena.getDOBYear());
           assertFalse(john.setDOBYear(12031995));
    
    
           // tests toString
           Hokie gobbler = new Hokie("gobbledee",1973);
           assertEquals("gobbledee",gobbler.toString());
    }
 

However if ``test1`` fails, to debug it you now must consider a potential error in the test or a potential error in the ``setDOBYear()`` method or in the ``getDOBYear()`` method or in the ``toString()`` method.  Eclipse will direct you to the line that failed but that may not always tell you where the problem actually started!  Either way, it's good practice to write a test method for 1 and only 1 logical component of your code.  Dividing these two into separate tests will make debugging easier down the road.  

In bigger programs, it may not be enough to make 1 test per method either.  Consider the following code:

.. code-block:: java

    public int foo(int x, int y){
      for (int i = 0; i<10; i++){
        x+=i;
        if (x%3 ==0){
          x++;
        }
        y *= i;
      }
      if (x%2 == 0){
        return x;
      }else if (y%2 == 0){
        return y;
      }
      return 0;
    }

You may find it easier to write one test case that handles the logic inside the for loop and a separate test case for the conditionals outside of it.  That way if one fails, you know exactly where in your code to look!



Testing methods by passing null params 
--------------------------------------

As a general rule when setting up a test case which requires the passing of a null to a method, you should refrain from passing null directly since this would result in a style deduction when submitted to Web-CAT.

For example the test: 
.. code-block:: java
    
    assertFalse( someNonNullObject.equals( null ) );

Would return a style error when submitted to Web-CAT.

To avoid this you should instead create another object (be sure to name it appropriately), set it to ``null``, then pass that object to the method being tested.  
For example:

.. code-block:: java

    SomeObject nonNullObject = new SomeObject (...);
    
    SomeObject nullObject = null;
    
    assertFalse( nonNullObject.equals( nullObject ) );



I/O Testing Tips
----------------

This section contains information about how to write test cases for input and output.

The sample code included here presumes that you are using ``student.TestCase`` as the base class for your JUnit tests, not ``junit.framework.TestCase``. The ``student.TestCase`` class provides a number of extra methods for testing that are particularly helpful where I/O is concerned.

**Tip 1: Use a PrintWriter for Textual Output**

When your program needs to generate output, it often seems easy to hardcode in a specific destination--a particular file, ``System.out``, or some other destination. Unfortunately, this has two drawbacks:

 - It makes your code less flexible, since the choice of where output will go is hardcoded in, and cannot be easily changed. In fact, the general principle of separating design choices about input/output (including both destination choices and formats) from design choices about how to process data go back 40 years!

 - Because it is difficult to retarget the output to a different destination, it is also harder to test, since it is more work to "get hold of" the generated output inside a test case in order to check that it is correct.

A better strategy is to write all output generation so that it targets a common output stream class, rather than a specific destination, so that any suitable stream instance can be supplied. In Java's IO library, the PrintWriter class is perfect for this. A PrintWriter represents a textual output stream, and you can create a PrintWriter for any conceivable destination to which textual output may be sent.

So use a ``PrintWriter`` instead of hard-coding your destination.

**Tip 2: Use a Scanner for Textual Input**

When your program needs to read textual input, it often seems easy to hardcode in a specific souce--System.in, a particular file, or some other source. Unfortunately, this has two drawbacks:

It makes your code less flexible, since the choice of where input comes from is hardcoded in, and cannot be easily changed. In fact, the general principle of separating design choices about input/output (including both destination choices and formats) from design choices about how to process data go back 40 years!

Because it is difficult to retarget the input so that it comes from a different source, it is also harder to test, since it is more work to provide "canned" input inside a test case in order to check your program's behavior.

A better strategy is to write all input reading so that it targets a common input stream class, rather than a specific source, so that any suitable stream instance can be supplied. In Java's IO library, the Scanner class is perfect for this. A Scanner represents a textual input stream, and you can create a Scanner for any conceivable source from which textual input may be read.

So use a ``Scanner`` instead of hard-coding your input source.

**Tip 3: Writing Test Cases with PrintWriters and Scanners**

The ``student.TestCase`` class provides several helper methods that make the job of testing I/O-based code that uses ``PrintWriter`` or ``Scanner`` easier. Let's look at an example. Suppose you have a simple class like this:

.. code-block:: java

    import java.io.PrintWriter;
    
    public class OutputExample1
    {
        public void doit(PrintWriter out)
        {
            out.println("hello world");
        }
    }

To test this, you somehow need to create a ``PrintWriter`` pass it into the method, then extract the string contents when you are done so you can check that it is correct. The ``student.TestCase`` class provides a useful method called ``out()`` that provides access to a built-in ``PrintWriter`` you can use for testing. This built-in ``PrintWriter``` has the following features:

 - It is automatically created for you and available for use.

 - It's contents are automatically cleared for each test case, so it always starts fresh.

 - Unlike a regular ``PrintWriter``, this one provides a ``getHistory()`` method that allows you easy access to the full content of what has been sent to it.

While all ``PrintWriter`` s use the host operating system's native idea of a line separator sequence when you call ``println()``, the ``getHistory()`` method always returns content where newlines are represented by a linefeed character (written as "\n" in Java text strings), so you can check generated output without considering platform differences.

You can write test cases using ``out()`` like this:

.. code-block:: java
    
    public void testExample1()
    {
    
        OutputExample1 example = new OutputExample1();
        example.doit(out());
        assertEquals("hello world\n", out().getHistory());
    }
    
Now, suppose you are using a Scanner for input. Consider this example:

.. code-block:: java

    import java.io.PrintWriter;
    import java.util.Scanner;
    
    public class OutputExample2
    
    {
        public void doit(Scanner in, PrintWriter out)
        {
            String line = in.nextLine();
            out.println(line);
        }
    
    }
    
The ``student.TestCase`` class provides a built-in ``Scanner`` accessible through a method called ``in()``, together with a method called ``setIn()`` that allows you to set the contents of this ``Scanner``. So you can write test cases like this:

.. code-block:: java

    public void testExample2()
    {
        setIn("hello\n");
        OutputExample2 example = new OutputExample2();
        example.doit(in(), out());
        assertEquals("hello\n", out().getHistory());
    }
    
Use ``setIn()``, ``in()``, and ``out()`` to write test cases for any code that uses a``Scanner`` or ``PrintWriter``.

**Tip 4: Writing Test Cases with ``System.out``**

Although it is better if your classes use ``PrintWriter`` objects for output, often your main program will specifically point such code to produce output on ``System.out``. So, how do you test ``main()``, when its output goes to System.out?

The ``student.TestCase`` class provides a helper method that makes this as easy as testing output with a ``PrintWriter``. Suppose you have a simple class like this:

.. code-block:: java

    public class OutputExample3
    {
        public static void main(String[] args)
            {
                System.out.println("hello world");
            }
    }
    
To test this, you somehow need to capture the output that is generated on ``System.out``. The ``student.TestCase`` class provides a useful method called ``systemOut()`` that provides access to a more sophisticated object that also represents ``System.out``. This smarter object provides the following features:

- It's contents are automatically cleared for each test case, so it always starts fresh. Regardless of how much output shows up on the terminal, your test will only see output generated during that individual test.

- Unlike ``System.out``, the object returned by ``systemOut()`` provides a ``getHistory()`` method that allows you easy access to the full content of what has been sent to ``System.out`` by any part of your code. Normally, this is the only way you would use ``systemOut()``--to get its history.

- While ``System.out`` uses the host operating system's native idea of a line separator sequence when you call ``println()``, the ``getHistory()`` method always returns content where newlines are represented by a linefeed character (written as "\n" in Java text strings), so you can check generated output without considering platform differences.

You can write test cases using systemOut() like this:

.. code-block:: java

    public void testExample3()
    {
        OutputExample3.main(null);
        assertEquals("hello world\n", systemOut().getHistory());
    }

**Tip 5: Writing Test Cases with ``System.in``**

If you have code (like ``main()``) that directly reads from ``System.in``, testing it can be a challenge. In order to provide input, someone has to type something at the keyboard ... or do they?

In a manner similar to the strategy described above for testing with Scanner objects, the ``student.TestCase`` class also provides a handy ``setSystemIn()`` method you can use to set the contents available for reading from ``System.in``. You can use it as follows:

.. code-block:: java

    public void testExample4()
    {
        // Provide the content to be read from System.in
        setSystemIn("line 1\nline 2 with more words\n");
    
        // Call main()
        SomeClass.main(...);
    
        // Make an assertion about what appeared on System.out
        assertEquals("some output\n", out().getHistory());
    }
    
**Tip 6: Place Long Strings on Multiple Lines**

When you are writing a string literal in a test case, and that string literal represents the input sequence or expected output for your program, sometimes it may be quite long. Remember two things. First, don't forget that you can break string literals into multiple sections that are combined by the + operator (which concatenates strings). This is vitally important to keep long strings more readable. Further, remember that you do need to include \n to represent each and every newline in your string--writing a string literal across multiple lines does not imply that the string itself contains a newline!

Suppose your program produces this output, and you want to write it as a string literal:
.. code-block:: text 

    The quick brown
    
    fox jumps over
    
    the lazy
    
    dog.
    
In an assertion, you might write it this way:

.. code-block:: java

    assertEquals(
         "The quick brown\n"
        + "fox jumps over\n"
        + "the lazy\n"
        + "dog.\n",
        systemOut().getHistory());
    
**Tip 7: Testing Strings that Might Differ Insignificantly**

Sometimes, when comparing strings, you are not concerned with character-for-character equality, since some differences might not be important (for example, capitalization or spacing). If you are in this situation, the ``student.TestCase`` class provides a method similar to ``assertEquals()`` called ``assertFuzzyEquals()``. You use it exactly the same way you use ``assertEquals()``, except that it only works to compare string values. When it does compare string values, it ignores the following:

- Differences in capitalization

- Differences in the way newlines are represented (e.g., Windows vs. Linux line endings)

- Differences in punctuation (anything that is not a letter, digit, underscore, or whitespace)

- Differences in the amount of whitespace separating words (i.e., any sequence of spaces, tabs, or other whitespace characters except newlines are treated as if it was a single space character)

- The presence or absence of any whitespace at the beginning or end of each line

- The presence or absence of any trailing newlines or blank lines at the end

With some additional commands, it is possible for this fuzzy comparison to also ignore all whitespace (not just differences in amount), ignore all blank lines, or ignore all line boundaries altogether, but these are not the default behavior. If you need assistance with this, ask on the forum.

Any comparison methods provided by the student.TestCase class that include the word "Fuzzy" in their name provide this same feature.

**Tip 8: Testing Fragments of Your Output**

Regardless of the output destination your program uses, sometimes it can be a challenge to make assertions about the results that are produced. In the examples above, it is fairly easy to write the exact, character-for-character output that is expected, and check that the output is letter-perfect in every way. However, what are you to do if the output produced by your program is different on every run? Or what if it is far too long to conveniently write the entire output?

In these situations, you may want to "spot test" some parts of your output without providing the complete contents. For example, suppose your program produces the following output:

.. code-block:: java

    The quick brown

    fox jumps over

    the lazy

    dog

The ``student.TestCase`` provides a helper method called ``contains()`` that you can use in a test like this:

.. code-block:: java

    assertTrue(contains(
        systemOut().getHistory(),
        "brown",
        "fox",
        "lazy",
        "dog"));
        
            
The meaning of ``contains()`` is similar to the meaning of the method ``contains()`` provided by the ``String`` class, but extended to multiple arguments. In addition to the first argument--the string to search--you can provide as many substrings to look for as you like. The ``contains()`` method will return true if and only if every one of the specified substrings is found in the specified order in the string you are searching. The ``contains()`` method does not care what comes between the substrings, so they could be immediately adjacent to each other, or arbitrarily far apart. All it cares about is that every single one is present, and that they are present in the exact order you list them.

You can use ``contains()`` to spot check key portions of your output, without having to list the entire output verbatim.
