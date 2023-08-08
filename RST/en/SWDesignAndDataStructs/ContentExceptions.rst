.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Exceptions
==========

Shortcuts
---------

- :ref:`ExceptionHandling`
- :ref:`ExceptionCheckedUnchecked`
- :ref:`ExceptionTryCatch`
- :ref:`ExceptionHandleLater`
- :ref:`ExceptionExamples`
- :ref:`ExceptionTesting`


Objectives
----------

Upon completion of this module, students will be able to:

* Review the purpose Exceptions and Exception handling
* Review and use try-catch-finally blocks to handle exceptions
* Review how to throw exceptions in a method
* Review how to implement and test Exception handling code

Suggested Reading
~~~~~~~~~~~~~~~~~

Java Interlude 2 Exceptions from  `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_

.. _ExceptionHandling: 

Interactive: Exception Handling
-------------------------------

.. admonition:: Follow Along, Practice and Explore

    Download to run and explore the java file (see below) from the video on your own in eclipse. You may download the standalone \*.java file for this example. To run the standalone \*.java file you will need to 
        1) create a new Eclipse project, then 
        2) create a package within the project called “example” (the package named at the top of the class MUST match the package the file is placed in within the Eclipse project), and finally 
        3) download and import the standalone \*.java file(s) to the created package.

   .. raw:: html


      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/Exceptions.java"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" width="32" height="32">
      Exceptions.java</img>
      </a>
      <br>
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/IntroToExceptions.pdf" target="_blank">
         <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
         Video Slides IntroToExceptions.pdf</img>
      </a>
      <br>
      The video is 9:31 in length

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_yrzfgb35' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

.. _ExceptionCheckedUnchecked: 

Reflecting on Checked and Runtime(Unchecked) Exceptions
-------------------------------------------------------

Checked Exceptions:
~~~~~~~~~~~~~~~~~~~

* These are exception that are “checked” at compile-time
* Checked Exceptions **MUST** be either

  * caught (using try-catch) or
  * declared in the method in which it is thrown (using throws) – see example
    below

    .. code-block:: java
    
       public void myMethod() throws IOException {
    
              // programming statements
    
       }

* If a Checked Exception is not handled or thrown the compiler will report a compilation error when attempting to compile the program in question

Examples of Checked Exceptions include: ``ClassNotFoundException``,
``FileNotFoundException``, ``IOException``, and ``NoSuchMethodException``


Runtime Exceptions aka Unchecked Exceptions:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* These are exception that are NOT “checked” at compile time
* Unlike Checked Exceptions any code which may potentially throw a Runtime (Unchecked) Exception will compile without a problem, the developer must therefore consider the likelihood of such exceptions occurring and prepare the program accordingly
* Examples of Runtime (Unchecked) Exceptions include: ``ArithmeticException``, ``ArrayIndexOutOfBoundsException``, ``ClassCastException``, and ``NullPointerException``


.. admonition:: Note:

    Many students encounter ``NullPointerExceptions`` throughout the various projects and labs.  Always remember that these occur when your code tries to access an object that is null.  Remember as well that an object may be null if the object was declared but never instantiated OR became null at some point throughout its life.  One easy way to troubleshoot such exceptions is to determine if the object was, in fact, instantiated or not.  Simply review the body of code where you believe the object was instantiated, then assess and test to confirm that that body of code did execute as expected.

Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/ExceptionsCheckpoint1Summ.html ka
   :long_name: Checkpoint 1

.. _ExceptionTryCatch: 

Interactive: Exception Handling with try, catch, and finally 
------------------------------------------------------------

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_1n6iavk9' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

.. _ExceptionHandleNow: 


To implement Exception Handling within a body of code you must use the **try-catch-finally** block

You may use a single catch block, such as below:

.. code-block:: java

   try {

   }

   catch(ExceptionType eName) {

   }


or multiple **catch** blocks. When using multiple **catch** blocks *the order of how the Exception handlers are implemented matters*. The code should be ordered with the handler for the most specific Exception defined first, eventually progressing to the definitions for the most general exceptions.

For example:

.. code-block:: java

   try{

   }

   catch(NumberFormatException nfe){

   }

   catch(Exception e){

   }

We may also use the *optional* **finally** block.  For example:

.. code-block:: java

   try{

   }

   catch(Exception e){

   }

   finally{

   }


Note that you can also use the optional **finally** block with a **try** but without a **catch**, such as below

.. code-block:: java

   try{

   }

   finally{

   }

.. _ExceptionHandleLater:

Handling the Exception Later on with throws
-------------------------------------------

As mentioned above there are times when it is appropriate to implement code
that catches Exceptions that occur within it, essentially handling the Exception
within the body of code that may cause it.  At other times it may be more
appropriate to postpone handling of a given Exception, deferring or passing the
responsibility of handling it to some other calling code (client code).
This option is appropriate when there is an expectation or agreement that the
calling code (client code) may be better suited to deal with the Exception.
Recall that client code called the method that caused an Exception, it is
reasonable to assume therefore that such client code may be better suited to
determining the best way of responding to the Exceptional event.

To postpone or defer Exception Handling to client code we add a **throws**
clause to the method declaration for the potentially risky method (the one that
could cause an Exception).   The **throws** clause must follow the method name
and parentheses, within this clause we must use the **throws** keyword and
provide a comma-separated list of all the exceptions thrown by that method
(see example below).

.. code-block:: java

   public void riskyCodeThatWantsToDefer ( ) throws IOException, NumberFormatException  {

      // some code

   }

The **throws** clause declares the exceptions that may occur during the program
execution, essentially informing calling/client code that it needs to prepare
itself to handle such occurrences, **either by implementing a try-catch itself
OR deferring to other calling/client code by adding a throws clause to the
method declaration.**

For example the method below calls the risky code, it would therefore be
notified that it should expect either a ``IOException``,
``NumberFormatException`` to come its way and to prepare itself accordingly.


.. code-block:: java

    public void callingMethod() {
    
        riskyCodeThatWantsToDefer();
    
    }

The compilation error message (``Unhandled exception type <SomeExceptionName>``) will
occur if the client code, the callingMethod,  does not include code which
catches or throws the Exceptions that riskyCodeThatWantsToDefer has declared
that it throws.

.. _ExceptionExamples: 

Exception Handling Examples - Basic to Complex
----------------------------------------------

.. admonition:: Try It Yourself
 
   TODO: Confirm the correct download file for this
 
    Download to run and explore the corresponding project from the video on your own in eclipse. The project CS2-Support is required for the sample project.  It is also used in your course projects. To download the CS2-Support you must first complete the configuration steps for your first lab. You will then be able to download it via eclipse using the blue down arrow icon or using the Project Menu and selecting "Download Assignment..."

   
   
      .. raw:: html
   
         <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/examples/eclipse/exExceptionHandlingWithThrowExample.zip"  target="_blank">
         <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" width="32" height="32">
         exExceptionHandlingWithThrowExample.zip</img>
         </a>


Interactive: Basic ``try``, ``catch`` example
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_s522xzgi' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

Interactive: Tracing through a ``try``, ``catch`` example with multiple ``catch`` blocks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_dlgt02u2' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

Interactive: Using ``try``, ``catch``, and ``finally`` blocks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_kth4nto9' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
     </center>

.. _ExceptionTesting:

Implementing and Testing Exceptions
-----------------------------------

**"If you throw exceptions in your methods, then you should catch them in your testing"**

For this course we will **mostly** adopt the exception handling approach that uses **try-catch blocks** in combination with the throw statement.

When implementing methods with exception-prone code you are to implement code within your methods which checks for unusual conditions (possible exception events) **BEFORE** allowing the execution of risky code (code which may throw an exception).  You must then implement ``try-catch blocks`` within test classes to confirm that the correct Exceptions were thrown by the failing code.  Within test classes you must also create the necessary conditions for the exceptions to be thrown.

Note that these checks could be accomplished through the use of ``try-catch`` blocks or conditional statements (for example the ``if`` statement).

Your code should function as follows:

* If the checks pass then code execution should proceed normally, allowing the exception-prone code to execute
* If the checks fail then the method should **throw an Exception** intentionally


Throwing an Exception
~~~~~~~~~~~~~~~~~~~~~

Any code has the ability to throw an exception under the right conditions.
You may intentionally throw an exception with the throw statement.  You may
throw any of the many exceptions that exist, or more specifically, any of the
classes that are descendants of the Throwable class.

If necessary you may also create your own custom exception classes to cater for
unexpected scenarios not already catered for by the standard Java exception
classes.

To throw an exception you must provide the throw statement an
instance of a **throwable** object.

For example if you wished to throw just a general exception you could use the
following statement:

.. code-block:: java

    throw new Exception();

If, on the other hand, you wished to throw a specific exception, such as a ``NumberFormatException``, you could use the following statement:

.. code-block:: java

   throw new NumberFormatException();

   // or

   throw new NumberFormatException( "this is some message" );

All that is required is an understanding of the Constructors available for the exception you wish to throw.

Examples
""""""""

The following ``MyCalculator`` class provides client code with access to the
methods ``sum()`` and ``div()``.  Both ``add()`` and ``div()`` each accept two
String parameters representing two integers.  The ``add()`` method returns the
result of adding the ``int`` equivalent of the two parameters while the
``div()`` method returns the result of dividing the ``int`` equivalent of the
two parameters.

.. code-block:: java

   public class MyCalculator {

    public int sum(String num1String, String num2String) {
        int sum = 0;
        try {
            int num1 = Integer.parseInt(num1String);
            int num2 = Integer.parseInt(num2String);

            sum = num1 + num2;
        }
        catch (NumberFormatException nfe) {
            throw new NumberFormatException();
        }
        return sum;
    }


    public int div(String num1String, String num2String) {
        int div = 0;
        try {
            int num1 = Integer.parseInt(num1String);
            int num2 = Integer.parseInt(num2String);
            div = num1 / num2;
        }
        catch (NumberFormatException nfe) {
            throw new NumberFormatException();
        }
        catch (ArithmeticException ae) {
            throw new ArithmeticException();
        }
        return div;
    }

   }


Review the MyCalculator class using the code example above. Note how the class uses the statements:

.. code-block:: java

    throw new NumberFormatException();

And

.. code-block:: java

    throw new ArithmeticException();

To intentionally throw each Exception when appropriate.

When writing your test class you must therefore use a try-catch block to check
if your method code has thrown the right exception. In your try block, you
should call the method that results in an exception being thrown. The catch
block should catch the exception thrown. You must then assert that the
exception exists, is the correct exception, and (if applicable) contains
the correct message.

Observe the partially implemented test class ``MyCalculatorTest``.
This class will be used to evaluate the MyCalculator class to determine if the
class threw the correct exception for each test case.

Note how the test class adopts the approach described above, declaring an
exception object that matches the exception being tested.  Initially this
exception object is set to null and only updated within the catch block.

.. code-block:: java

   public class MyCalculatorTest extends student.TestCase {

       MyCalculator calc;

       public void setUp() {
           calc = new MyCalculator();
       }


       /**
        * Tests to ensure Sum throws a NumberFormatException
        * if the first parameter is not a number
        */
       public void testSumNFEException() {
           NumberFormatException myNFE = null;

           try {
               calc.sum("2hello", "3");
           }
           catch (NumberFormatException nfe) {
               myNFE = nfe;
           }
           assertNotNull(myNFE);
       }


       /**
        * Tests to determine if div throws an ArithmeticException
        * if one of the parameters is 0
        */
       public void testDivArithException() {
           ArithmeticException myAE = null;
           try {
               calc.div("2", "0");
           }
           catch (ArithmeticException ae) {
               myAE = ae;
           }
           assertNotNull(myAE);
       }

   }


Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/ExceptionsCheckpoint2Summ.html ka
   :long_name: Checkpoint 2
