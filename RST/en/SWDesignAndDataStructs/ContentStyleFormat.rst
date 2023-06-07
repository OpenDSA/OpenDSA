.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Style and Documentation: Formatting & Indentation
=================================================

Shortcuts
---------

- :doc:`Introduction </ContentStyle>`
- :doc:`Naming </ContentStyleNaming>`
- Format <- You are here 
- :doc:`Documentation </ContentStyleComment>`
- :doc:`Other Issues </ContentStyleOther>`
- :doc:`Review </ContentStyleReview>`



.. admonition:: On the importance of formatting

    "It is not merely a matter of aesthetics that programs should be written in a particular style. Rather there is a psychological basis for writing programs in a conventional manner: programmers have strong expectations that other programmers will follow these discourse rules. If the rules are violated, then the utility afforded by the expectations that programmers have built up over time is effectively nullified. The results from the experiments with novice and advanced student programmers and with professional programmers described in this paper provide clear support for these claims."
    
    -- Elliot Soloway and Kate Ehrlich - Empirical studies of programming knowledge (1984)

Formatting
----------

Proper and consistent formatting improves code readability, making it easier to review, understand, debug, and maintain.  Ideally the formatting and overall layout should clearly convey the  logical structure of the code, thereby helping developers to form mental models of the code, its behavior, and the flow of execution i.e. the order in which programming statements are executed. 
 
  
 
Take a look at the example code snippets below.  Which would be easier to debug? Can you find the error?

.. code-block:: java    
 
    //Example 1:
    
    public class Employee {
    
    private String name;
    private double hourlyRate;
    
    public Employee(String name) {
    this.name = name;
    }
    
    public Employee(String name, double hourlyRate) {
    this.name = name;
    this.hourlyRate = hourlyRate;
    }
    
    public String toString() { 
    return ("I am an employee named "+name);
    }
     
or 
      
.. code-block:: java    
   
    //Example 2:
    
    public class Employee {
    
        private String name;
        private double hourlyRate;
        
        public Employee(String name) {
            this.name = name;
        }
        
        public Employee(String name, double hourlyRate) {
            this.name = name;
            this.hourlyRate = hourlyRate;
        }
        
        public String toString() { 
            return ("I am an employee named "+name);
        }


Indentation
-----------
 
Indentation shows structure and hierarchy, quickly illustrating scope and the relationship between code blocks and the code contained within them.

Typically, *an indent is 4 spaces*. 

Tabs are highly discouraged for several reasons, not the least of which is that different development environments have different tab settings.   When code is shared across multiple teams this may become problematic, potentially resulting in an inconsistently indented, unreadable mass of text.   

Note that there are tools that replace tabs with spaces (more will be discussed in related modules).

Code within curly brackets form a block of code in Java.  Code blocks should be indented with each level of nesting indented from the previous level to show nesting more clearly. Outermost structure should not be indented at all.
 

 
.. code-block:: java
    
    // Example 1
    public class CircleCalculation {
    
        public static final double PI = Math.PI;
        
        public static void main(String[] args) {
            double radius;
            double area;
            . . .
            
            if (radius > 0) {
               . . .
            }
        }
    }

    //Example 2:
    public class MyExampleB {
     
        public static void main(String[] args) {
            System.out.println("start of main");
            methodA();
            System.out.println("end of main");
        }
     
        public static void methodA() {
            for (int i = 0; i < 10; i++) {
                System.out.print("hello "+i);
            }
            System.out.println("end of loop");
        }
    }
 
  
 
Formatting for this course / Setting up Eclipse Formatting
----------------------------------------------------------

When preparing and submitting your assignments you are to ensure that your code is properly formatted, with code properly indented, spaces used instead of tabs etc. This makes your code more portable between users and environments. Eclipse provides a formatting tool to help you with this task. When initiated the tool will automatically format your code according to defined settings. The steps to setting up this feature will be detailed within your first Lab. Be sure to complete the set up process. 

.. admonition:: Note!

    You must manually initiate the formatting tool each time you wish to format your code.  You should format your code before submitting solutions to Web-CAT.
 
  
 
Line length
-----------

Lines that are over 80 characters should be made into 2 (or more) lines that are indented under the first.

Long lines affect readability, forcing a developer to scroll side to side when doing code reviews. Additionally some tools do not handle long lines well.  It is best to avoid long lines.

Your IDE can assist you with this. In Eclipse:

Go to `Preferences -> General -> Editors-Text Editors`. Activate "Show print margin" and enter 80 in "Print margin column". 

  
 
Braces
------

To format braces in Java we follow the Kernighan and Ritchie (K & R) style, sometimes referred to as "Egyptian brackets". 

In the K & R style, the opening brace should be at the end of the line that begins a code block (a group of statements enclosed in braces), i.e. there are no line breaks before the opening brace, we do include a line break after the opening brace.

The closing brace should begin a new line and be indented to match the beginning of the code block. 

In Example 1, note how the closing brace is aligned to match the Java keyword public. 
 
.. code-block:: java
 
    //Example 1: note how the closing brace is aligned to match the 
    //Java keyword public.
    
    public class MyExampleClass {
    ... 
    }
   
   //In Example 2, note how the `for` loop closing brace is aligned to match 
   //the Java keyword `for` and the closing brace for `methodA` is aligned to 
   //match the Java keyword `public`.
   
   public static void methodA() {
    
        for (int i = 0; i < 10; i++) {
   
            System.out.print("hello "+i);
   
        }  // end of for loop
    
        System.out.println("end of loop");
    
    } // end of method
   

You may visit sections 6.4 and 7 of this Sun MicroSystems resource https://www.oracle.com/technetwork/java/codeconventions-150003.pdf. or section 4 of this Google resource https://google.github.io/styleguide/javaguide.html for more details.
  
 
While there are other practices, these are the preferred options for any code you write during this course.
 
.. code-block:: java

    // Example for while loop
    
    while (x > 5) {
        x = x - 1;
    }


For if-statements and loops with only a single statement inside its body, it is always best to include braces rather than indenting alone.

.. code-block:: java
    
    //Example 1: This is the preferred style
    
    if ( x > 5 ) {    
        x = 5;
    }
    
    // over this approach...
    
    //Example 2:
    if ( x > 5 )
    x = 5; // This works the same as Example1 but it’s not good style!
    

 
Spacing after commas and other operators
----------------------------------------
 
Operators ( `+, -, *, /`) and equality symbols (`<, >, <=, =>, ==`) should have space on each side.

Example(s):

.. code-block:: java

    x + 3
    
    3 / 2
    
    x == y
    
    m <= n

Commas should have a space to the RIGHT but NOT on its left.

Example(s):

.. code-block:: java

    graphOrderedPair(4, 6);



Blank Lines
-----------

Blank lines improve readability, especially when trying to organize or distinguish sections of code that are logically related.  It is customary to add blank lines between methods and between the local variables in a method and the first statement in the method.  
 
  
 
Line breaks and continuation indentation
---------------------------------------- 
A statement that span more than one line should be indented so that all additional lines are indented under the first.  This is also the convention when aligning a line of code that takes up multiple lines.
 
  
.. code-block:: java
    
    if ( ... ) {
        System.out.println("The volume of a sphere whose radius is " +
        radius + "inches is " + volume +
        " cubic inches.");
    }
 
 


