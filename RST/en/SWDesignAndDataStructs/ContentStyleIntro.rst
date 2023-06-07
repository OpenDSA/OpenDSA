.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Style and Documentation: Introduction
=====================================

Shortcuts
---------

- Introduction <- You are here
- :doc:`Naming </ContentStyleNaming>`
- :doc:`Format </ContentStyleFormat>`
- :doc:`Documentation </ContentStyleComment>`
- :doc:`Other Issues </ContentStyleOther>`
- :doc:`Review </ContentStyleReview>`


Overview & Objectives
---------------------
*Upon completion of this module, students will be able to:*

- Describe the software engineering benefits to following style guides and software development standards and conventions
- Apply naming, formatting, and commenting conventions and best practices
- Format and indent code in accordance with current standards and conventions
- Create properly formatted JavaDoc Comments
- Prepare effective Internal Documentation/Comments
- Appraise the quality of the internal documentation included in produced code


Suggested Reading:
---------------------

**Appendices A (Documentation and Programming Style)**  from `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <http://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_

Introduction to Style and Documentation
---------------------------------------
A note about style
Building software is a complex and typically collaborative process involving: 

- Multiple programming languages, environments, libraries, and related technologies
- A myriad of stakeholders with unique stakeholder needs and interactions
- A number of developers and development and project teams
- A diverse variety of developer skill sets and individual developer coding "styles", practices, and preferences

The Software Development process, like many other complex endeavors,  often follow a life cycle.  While there are various life cycle options many usually involve phases of planning,  requirements gathering and analysis, design, development/implementation, testing, deployment and integration, and maintenance. 

The programming languages, environments, libraries, and technologies developers use are also evolving.  Functions, features, and approaches become obsolete or "deprecated", eventually being replaced by newer, more favored, ones.   

Developers write code which are then handed over to others for review, approval, and migration (deployment) into "production" or for integration with other code.  Most often the software produced eventually enters into the "maintenance" phase of the software development life cycle.  Once there it may undergo future code reviews, general maintenance, and modification.

    | "Hardly any software is maintained for its whole life by the original author."  - Oracle 1996

 

The challenge
-------------
These varied complexities affect software development in a number of ways, such complexities, when combined with the changing demands of software stakeholders, create a context where it becomes critical for developers to be able to acclimate quickly.

This "acclimation" may entail developers learning new programming paradigms, languages, and libraries and developing the skills to be able to review and understand code written by others, or by themselves in the distant past. 

This raises a number of concerns including,

- What can be done to help developers adopt and use new programming languages, approaches, and technology with minimum effort and the least stress possible?
- What measures can be put in place to facilitate developer acclimation when dealing with new or vaguely familiar code?
- What support can be provided to help developers understand new code quickly and effectively?

We address many of these concerns through the use of style guides and software documentation.

 

Style Guides
------------
A style guide is essentially a set of standards, conventions, guidelines, and practices which a developer should adhere to when writing, formatting, and documenting software solutions. Such guides often support other aspects of software development, including software design and testing.  

Adhering to style guides and code conventions improves the readability and maintainability of code.

It is important to note that there is no one set of standards, conventions, and guidelines, rather you are likely to encounter a hierarchy of them. For example the creators of a given programming language will provide documentation to inform standards, conventions. and general use.  The community of developers who utilize the language (or follow the programming paradigm the language adheres to) may adopt and communicate additional standards and conventions.  Furthermore, internally within a given organization, team, or project, there may be other specific standards, conventions, and guidelines, layered on top of others higher up in the hierarchy.

 

.. admonition:: Takeaway

    - Developers need to quickly and effectively understand new (or long-forgotten) code and new technologies
    - Style guides help with this task
    - Developers should form the habit of understanding and adopting the standards, conventions, and practices conveyed within the style guides relevant to their software development context  
 

Naming
~~~~~~

What's in a name
----------------
Names convey quite a bit of information.  Interpreting them in the manner intended by the developer can help speed up software development tasks, while interpreting them in a manner not intended can slow it down.  Poor or inconsistent naming makes it difficult for a developer to read and understand code, often resulting in longer development times, software bugs, integration issues, or system crashes. 

Recall that you or a colleague will likely need to revisit previously released code sometime in the future.  Where possible you would want to give the developer responsible for these future tasks some assistance in getting acclimated, especially since that person may be you!

Names help with this process, a name can convey at a glance the intent or purpose of some software component, distinguishing whether something is a package, a class, method, field, variable, or constant. 

Suitable and consistent naming can help developers quickly form a mental image or model of the inner workings of a piece of software.  This enables them to  more effectively understand the various software components, their roles and purpose, expected interactions, logic, and the overall flow of execution.


Naming conventions
------------------
When naming, it is important to choose names carefully. 

Names should attempt to capture and encompass the class, method, variable, or concept they represent. 

Do not choose a name that could mislead someone by giving them an incorrect interpretation of what a method does or what a variable's purpose is. For instance, if you had a variable of type `int` and called it `counter`, you wouldn't want it to hold a random number or a number that change values drastically.

With a name like `counter` the developer reviewing the code should would expect to see it's values increase incrementally, as if counting the indices of an array.

.. admonition:: Takeaway

    Naming should make it immediately clear the purpose of your class, methods, fields, variables, etc.

 

Basics naming rules
--------------------

- Uppercase { A-Z } and lowercase { a-z } letters, digits { 0-9 }, and underscore { _ } can be used when naming identifiers (the names of variables, classes, methods, etc).

- Identifiers should always begin with a letter.

- Identifiers cannot be the same as a language keyword, for example `final`, `class`, `public` are all Java Reserved words (also known as *Java Language Keywords*).  These are not to be used as identifiers. 

.. code-block:: java  

    public void rotate90Degrees()

- Typically, an underscore is not used to separate words (camelCase is preferred). However, underscores are used when separating variables in all caps (which are reserved for constant variables).

.. code-block:: java  

    public static final int STUDENT_ID = 1234567;

- The name must be descriptive of what it is used for. For example, say we wanted to store the year 2015 as an integer. Storing it under the variable ‘x’ isn’t a good idea because if we need to use it later, then it’s unclear what ‘x’ stands for. That said,

.. code-block:: java  

    int x = 2015;


should be changed to:

.. code-block:: java  

    int year = 2015;


- The name cannot use keywords/reserved words in Java. See https://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html for a complete list of reserved words. For example: when creating an object, the keyword `new` is used. However, the following examples will both cause a syntax error because `new` is a reserved keyword:

.. code-block:: java  
    
    //Using new as a variable name is a syntax error because new is a reserved word in Java
    int new = 15;

    //Using int as a variable name is a syntax error because int is a reserved word in Java
    String int = “15”;
 
 
.. admonition:: Takeaway
        
        Names can be alphanumeric, and should be meaningful, but can't use Java reserved words. 

Source Files and Directories
----------------------------

The source file name should match the name of the class plus the `.java` extension.  If we had a class called `Student`, then the associated source file should be `Student.java`.  Recall that *Java is case-sensitive*. 

Just like class names, there should be no white spaces in the source file name.

Packages
--------

Package names are separated by a dot/period ‘.’. Package names to the left contain the package names that appear as you read to the right. Package names are typically written in all lowercase letters.

A common example that you will see is when you `import java.util.ArrayList`. The class `ArrayList` is located in the package `java.util`. Usually domain names (url) are used as package names, but the web address is reversed.

For example:

    `com.mywebsite.myapp` would represent a package named `myapp` from `mywebsite.com`.
 

Class
-----

Class names should, most times, be *nouns*.  The name should be simple and sufficiently descriptive that they adequately capture the entity or concept they refer to.

The names of classes do not contain any spaces and the first letter of each word is always capitalized (UpperCamelCase). Classes, in particular, have the first letter of their name capitalized, unlike other identifiers.

Example(s):

.. code-block:: java  

    HelloWorld
    
    AddIntegers
    
    Employee
    
    Game
    
    Player

 

Interface
---------

Interface names should adhere to the same rules as class names.  They should be sufficiently descriptive and capitalized like class names.  Some software development environments use the name to distinguish interfaces from other classes.  This is the approach to be used within this course For example if we wanted to define an interface for a `Bag` data structure we would use the name `BagInterface`.

 

Methods
-------

Methods are often named for *verbs* that describe some Object's behavior or function.  

The names of methods start with a lowercase letter, do not contain spaces, and the first letter of each word (EXCEPT the first) is always capitalized (lowerCamelCase).

There is no whitespace in between the name of the method and it’s parameter parenthesis.

Example(s):

.. code-block:: java  

    calcClassAverage( … )
    
    getNumStudents( … )
    
    findSum( … )
    
    drawLine( ... )

 

Variables
---------

The names of variables follow similar rules as method names.  The names of variables start with a lowercase letter, do not contain spaces, and the first letter of each word (EXCEPT the first) is always capitalized.

Example(s):

.. code-block:: java
    
    result
    
    studentName
    
    totalCost

 

Constants
---------

The names should be in all uppercase.  When multiple words are used they should be separated by underscores.

Example(s):

.. code-block:: java 
    
    MAX
    
    DEFAULT_WIDTH
    
    TAX_RATE
    
    CONVERSION_RATE

 

Naming Dos and Donts
--------------------

- camelCase: YES!

All identifiers are camelCase. The first letter in class and interface names are capital, and are lowercase in variables and methods.

Example(s):

.. code-block:: java 
 
    public class HelloWorld
    public interface Employee
    public double calculateGPA()
    int year = 2015;

 

- hungarian notation: NO!

Hungarian code is adding a prefix to a variable indicating the type of that variable. Hungarian notation is NOT the preferred style when developing in Java. Though widely used in some development environments in the past it is not generally used in many modern-day development scenarios.

Example(s):

.. code-block:: java

    int iYear = 2015; // This should be year, not iYear!

 

Naming Summary
--------------------

+------------------------+----------------------------------------------------------------------------------+--------------------------------------+
| Identifier Type        | Identifier Type                                                                  | Examples in bold                     |
+========================+==================================================================================+======================================+
| package                | all lowercase                                                                    | **java.util.** Array                 |
+------------------------+----------------------------------------------------------------------------------+--------------------------------------+
| class                  | begin with a capital letter then each word must also begin with a capital letter | java.util. **Array**                 |
+------------------------+----------------------------------------------------------------------------------+--------------------------------------+
| methods                | follow the lowerCamelCase convention                                             | **myMethodName()**                   |
+------------------------+----------------------------------------------------------------------------------+--------------------------------------+
| variables              | follow the lowerCamelCase convention                                             | **myVariableName**                   |
+------------------------+----------------------------------------------------------------------------------+--------------------------------------+
| constants              | in uppercase letter, multiple words must be separated using ‘_’                  | static final int **MIN_WIDTH** = 4   |
+------------------------+----------------------------------------------------------------------------------+--------------------------------------+
| interface              | capitalized like class names                                                     | interface **Storing**                |
+------------------------+----------------------------------------------------------------------------------+--------------------------------------+
 

Code Review
-----------
Complete the tasks described below, watch the Naming video, then click "Next" at the bottom of the page to proceed to the next activity.

Writing code that follows proper standards and conventions is a valuable skill that can greatly contribute to your success as a developer and your ability to work well with other developers. 

Every developer needs to learn how to review and assess their own code, as well as code written by others, to ensure that it meets quality standards and to determine possible areas of improvement.

In this activity you will adopt the role of a Jr. developer tasked to review code written by another developer.

- Download the example code record.java Download record.java
- Reflect upon the naming conventions and practices previously discussed
- Review the code with a critical eye, see if you can identify problem areas with respect to naming and opportunities for improvement
- View the video to see if your list of problem areas and opportunities, match those found in our  review

Naming Review [10:18] 
----------------------------------

.. raw:: html

     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_5bpln3rv&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_08czwjcb" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
 

Formatting & Indentation
~~~~~~~~~~~~~~~~~~~~~~~~
 

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
 
  
 
Related Resources
----------------- 

*References:*

- Northeastern University. Style Guide for Web-CAT submissions: http://www.ccs.neu.edu/home/vkp/2510-sp13/web-cat-hints.html 
- Google. Java Style Guide: https://google.github.io/styleguide/javaguide.html 
- Sun Microsystems, Inc (known today as Oracle). (1996). Java Code Conventions: https://www.oracle.com/technetwork/java/codeconventions-150003.pdf 

