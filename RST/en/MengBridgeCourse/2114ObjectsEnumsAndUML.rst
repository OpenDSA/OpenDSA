.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Objects, Enums, and UML Diagrams
================================

Objectives
----------

* Review Object Oriented Programming
* Explore Enum Types
* Explore Switch Statements
* Interpret UML diagrams

Java Tips
---------

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


Enums
~~~~~

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


Notice that when today is MONDAY it will fall through to the code for the
TUESDAY case.  When today is WEDNESDAY it will print "It’s double coupon day"
and fall through to also print the default message.

For more details about switch statements, reference:
`https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html <https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html>`_.

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


Java UML Diagrams
-----------------

[6:15] Java Object UML Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_phzs60ad&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_nhfcvctj" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/7.3.2.1-JavaOOPUML.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 7.3.2.1-JavaOOPUML.pdf</img>
   </a>

.. admonition:: Note

    Creating UML diagrams will not be a requirement for this course.  However,
    they are a useful thing to know how to create and interpret as they are often
    used in industry to explain complex systems.


Related Resources
"""""""""""""""""

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/7.3.2.1.1-UMLDiagramKey.pdf" target="_blank">
   A UML Diagram from the example in the video 7.3.2.1.1-UMLDiagramKey.pdf
   </a>


Checkpoint 1
------------

.. avembed:: Exercises/MengBridgeCourse/OOP1Checkpoint1Summ.html ka
   :long_name: UML Checkpoint



Programming Practice: Object Oriented Programming
-------------------------------------------------

.. extrtoolembed:: 'Programming Practice: Object Oriented Programming'
   :workout_id: 1906
