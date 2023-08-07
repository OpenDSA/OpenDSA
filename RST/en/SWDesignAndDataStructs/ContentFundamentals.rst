.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Java Fundamentals
================================

Shortcuts
---------

- :ref:`JavaBasics`
- :ref:`JavaMethods`
- :ref:`JavaVariables`
- :ref:`JavaControlFlow`
- :ref:`JavaScopeAndEquality`
- :ref:`JavaObjectsAndEnums`

Objectives
----------

* write a java class that includes fields, member methods, and invokes imported code
* develop java code with programming constructs such as if statements, for loops, or while loops
* trace variables and understand scope
* distinguish between primitive types and reference types
* run a java program in eclipse
* review object Oriented Programming
* Explore Enum Types
* Explore Switch Statements
* Interpret UML diagrams


Suggested Reading:  AppendicesB(Java Basics) and C(Classes) from Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry

.. _JavaBasics: 

Interactive: Java Basics
-------------------------


.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/JavaFundamentalsWelcome.pdf"  target="_blank">
      <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
      JavaFundamentalsWelcome.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_2khwqw42' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>


Some Java Basics To Be Familiar With
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* Primitive types, Objects or reference types, wrappers, type casting
* `Java key words <https://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html>`_
* Assignment statements
* Expressions, order of operations ++, --
* Conditionals such as if, if else, nested conditionals and switch
* Loops such as while and for loops
* Strings methods
* Import statements
* Writing and using own methods, scope
* Enumerated types
* Classes, fields, member methods

*Addtional Reference:*

.. raw:: html
    
    <a href="https://docs.oracle.com/javase/tutorial/index.html" target="_blank">Oracle Java Tutorial</a>

.. _JavaMethods: 

Java Methods
------------

For the following discussion, we're going to be referencing the following Bank
class:

.. admonition:: The Bank Class

   .. code-block:: java
   
   
      import java.util.Scanner;
      import java.text.DecimalFormat;
   
      public class Bank {
   
         static long accountID;
         static String accountHolder;
         static double accountBalance;
         static String PIN;
         static final double withdrawalTransactionCharge = 0.50; // $0.50 charge for
                                                                 // each transaction
         private static DecimalFormat df = new DecimalFormat("#.##");
   
         public enum Choice{
             DEPOSIT, WITHDRAW, DISPLAY, EXIT
         }
   
         public Bank() {
      	   init();
         }
   
         public static void init() {
             accountHolder = "J. Doe";
             accountBalance = 500.00;
             accountID = 555444333;
             PIN = "1234";
         }
   
   
         public static void withdraw(double amount) {
             if ((amount + withdrawalTransactionCharge) < accountBalance) {
                 accountBalance = accountBalance - amount
                     - withdrawalTransactionCharge;
                 System.out.println("withdrawing $" + df.format(amount));
             }
             else {
                 System.out.println(
                     "low account balance, cannot complete withdrawal transaction");
             }
             displayAccountBalance();
   
         }
   
   
         public static void deposit(double amount) {
   
             accountBalance = accountBalance + amount;
             System.out.println("depositing $" + df.format(amount));
             displayAccountBalance();
   
         }
   
   
         public static void displayMenu() {
   
             StringBuilder buffer = new StringBuilder();
   
             buffer.append("*****Welcome to ABC Bank*****");
             buffer.append("\n");
             buffer.append("\n");
             buffer.append("1: Withdraw $20.00");
             buffer.append("\n");
             buffer.append("2: Deposit  $20.00");
             buffer.append("\n");
             buffer.append("3: Display Balance");
             buffer.append("\n");
             buffer.append("\n");
             buffer.append(
                 "Please enter your choice of 1, 2, or 3, and press the Enter key");
             buffer.append("\n");
             System.out.println(buffer.toString());
         }
   
   
         public static void displayAccountBalance() {
   
             StringBuilder buffer = new StringBuilder();
   
             buffer.append("-----Account Details----- ");
             buffer.append("\n");
             buffer.append("Account ID: ");
             buffer.append(accountID);
             buffer.append("\n");
             buffer.append("Holder: ");
             buffer.append(accountHolder);
             buffer.append("\n");
             buffer.append("Balance: $");
             buffer.append(df.format(accountBalance));
             buffer.append("\n");
             buffer.append("-------------------------");
             buffer.append("\n");
             buffer.append("-------------------------");
             buffer.append("\n");
             buffer.append("\n");
             System.out.println( buffer.toString());
   
         }// end of displayAccountDetails Method
   
   
         public static void main(String[] args) {
             init(); // Initializes this account
             displayMenu();
   
             String response = new Scanner(System.in).nextLine(); // Read user input
   
             if (response.equals("1")) {
                 withdraw(20.00);
             }
             else if (response.equals("2")) {
                 deposit(20.00);
             }
             else if (response.equals("3")) {
                 displayAccountBalance();
             }
             else {
                 System.out.println("You entered an invalid choice.");
             }
   
   
   
             System.out.println("Thank you for banking with us, goodbye!");
         }
   
      }

Interactive: Java Methods
~~~~~~~~~~~~~~~~~~~~~~~~~
      
 .. raw:: html
  
     <center>
     <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_9mkx6ln7' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
     </center>

.. admonition:: Correction to the video!

    A double can also be thought of as float (not long) https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html


Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/FundamentalsCheckpoint1Summ.html ka
   :long_name: Checkpoint 1

.. _JavaVariables: 


Interactive: Java Variables
---------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/JavaVariables.pdf"  target="_blank">
      <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
      JavaVariables.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_wi24ln1w' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>


Decimal Formatting
~~~~~~~~~~~~~~~~~~

The ``java.text.DecimalFormat`` class provides the functionality to format the
output of real numbers. For example in the example ``Bank.java``, the ``df``
field is declared:

.. code-block:: java


   private static DecimalFormat df = new DecimalFormat("0.00");

So throughout the class the DecimalFormat object can be used to format numbers
as Strings. For example:

.. code-block:: java


   System.out.println("withdrawing $" + df.format(amount));

or

.. code-block:: java


   buffer.append(df.format(accountBalance));

Notice that the following formatting can also be used, but it doesn’t append
leading or trailing zeros:

.. code-block:: java


   private static DecimalFormat df = new DecimalFormat("#.##");

For more details about Decimal Format, reference:
`https://docs.oracle.com/javase/tutorial/i18n/format/decimalFormat.html <https://docs.oracle.com/javase/tutorial/i18n/format/decimalFormat.html>`_.


Checkpoint 2
------------
.. avembed:: Exercises/SWDesignAndDataStructs/VariablesSumm.html ka
   :long_name: Checkpoint 2

.. _JavaControlFlow: 

Interactive: Java Control Flow
------------------------------

.. admonition:: Follow Along, Practice and Explore

    Download to run and explore the java file (see below) from the video on your own in eclipse. You may download the standalone \*.java file for this example. To run the standalone \*.java file you will need to 
        1) create a new Eclipse project, then 
        2) create a package within the project called “example” (the package named at the top of the class MUST match the package the file is placed in within the Eclipse project), and finally 
        3) download and import the standalone \*.java file(s) to the created package.

   .. raw:: html

      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/examples/FridgeInventory.java"  target="_blank">
      <img src="../html/_static/Images/icons8-java60.png" width="32" height="32">
      FridgeInventory.java</img>
      </a>


.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_0ejygvhn' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>
    

Checkpoint 3
------------

.. avembed:: Exercises/SWDesignAndDataStructs/ControlFlowSumm.html ka
   :long_name: Checkpoint 3

.. _JavaScopeAndEquality: 

Interactive: Java Scope and Equality
------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/JavaFundamentalsTips.pdf"  target="_blank">
      <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
      JavaFundamentalsTips.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_x2wjt0tt' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>


Checkpoint 4
------------

.. avembed:: Exercises/SWDesignAndDataStructs/ScopeSumm.html ka
   :long_name: Checkpoint 4

.. _JavaObjectsAndEnums: 

Java Objects and Enum
---------------------

Java Enums
~~~~~~~~~~

Enum types provide a type which can be assigned a predefined set of constant
values.  The use of an enum type provides a bounded set of constant values
compared to Strings and a more descriptive and readable set of values compared
to integers.  For example instead of using the numbers 1 through 7 for days of
the week, we could declare:

.. code-block:: java


   public enum Day {
	    SUNDAY, MONDAY, TUESDAY, WEDNESDAY,
	    THURSDAY, FRIDAY, SATURDAY
	 }

An enum type can be in its own file or nested inside another class. They
should be used when you know all the possible values at compile time.  For
example months of the year, directions on a compass, choices in a menu, or
locations in a game. Enum types can improve type safety especially when a
parameter to a method is an enum type. Enum types can be compared with
the ``==`` operator and switch statements.

For more details about enum types, reference:
`https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html <https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html>`_.

We’ll be using enum types together with switch statements
(which are discussed below) to experiment with Bank.java

Switch Statements
~~~~~~~~~~~~~~~~~

Switch statements can be used to control the flow of execution based on
multiple possible values of a variable. They are often used with enum types
but can also be used with some primitive types, such as int and char, or
Strings and some Wrapper classes as well, such as Integer and Character.

Switch statements can be used instead of a series of if statements or nested
if-else statements.  For example, in the ``Bank.java`` code...

.. code-block:: java


   if (response.equals("1")) {
      withdraw(20.00);
   }
   else if (response.equals("2")) {
       deposit(20.00);
   }
   else if (response.equals("3")) {
       displayAccountBalance();
   }
   else {
       System.out.println("You entered an invalid choice.");
   }


could be replaced with:

.. code-block:: java


   switch (response) {
      case "1":
          withdraw(20.00);
          break;
      case "2":
          deposit(20.00);
          break;
      case "3":
          displayAccountBalance();
          break;
      default:
          System.out.println("You entered an invalid choice.");
    }


Notice that in this example each case includes a ``break`` statement.
Without the ``break`` statement the additional lines of code in the switch
statement would execute.

Given the following enumerated type:

.. code-block:: java


   public enum Day {
	    SUNDAY, MONDAY, TUESDAY, WEDNESDAY,
	    THURSDAY, FRIDAY, SATURDAY
	 }

An example switch statement could be:

.. code-block:: java


   switch(today) {
       case SATURDAY:
         System.out.println("Stores are crowded today");
         break;
       case MONDAY:
       case TUESDAY:
          System.out.println("Stores are stocked up today");
          break;
       case WEDNESDAY:
          System.out.println("It's double coupon day");
       default:
          System.out.println("Happy shopping!");
   }


Notice that when today is **MONDAY** it will fall through to the code for the
**TUESDAY** case.  When today is **WEDNESDAY** it will print ``It’s double coupon day``
and fall through to also print the default message.

For more details about switch statements, reference:
`https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html <https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html>`_.


Interactive: Java Objects and Enum
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_b6aiijwb' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>
