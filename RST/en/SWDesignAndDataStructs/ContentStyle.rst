.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Style and Documentation: Introduction
=====================================

..
    Shortcuts
    ---------
    
    - :ref:`introduction`
    - :ref:`ContentStyleNaming`
    - :ref:`ContentStyleFormat`
    - :ref:`ContentStyleDocumentation`
    - :ref:`ContentStyleOther`
    - :ref:`ContentStyleReview`

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

.. _introduction:

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
 

.. _ContentStyleNaming:

Naming: What's in a name
------------------------
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
| package                | all lowercase                                                                    | util                                 |
+------------------------+----------------------------------------------------------------------------------+--------------------------------------+
| class                  | begin with a capital letter then each word must also begin with a capital letter | **ArrayList**                        |
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

.. admonition:: Follow Along, Practice and Explore

    Complete the tasks described below, then watch the Naming video.  Download to run and explore the java file from the video on your own in eclipse. You may download the standalone \*.java file for this example. To run the standalone \*.java file you will need to 
        1) create a new Eclipse project, then 
        2) create a package within the project called “example” (the package named at the top of the class MUST match the package the file is placed in within the Eclipse project), and finally 
        3) download and import the standalone \*.java file(s) to the created package.
        
   .. raw:: html
   
       <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/examples/record.java"  target="_blank">
       <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" width="32" height="32">
       record.java</img>
       </a>


Writing code that follows proper standards and conventions is a valuable skill that can greatly contribute to your success as a developer and your ability to work well with other developers. Every developer needs to learn how to review and assess their own code, as well as code written by others, to ensure that it meets quality standards and to determine possible areas of improvement.

In this activity you will adopt the role of a Jr. developer tasked to review code written by another developer.

- Review the code in record.java
- Reflect upon the naming conventions and practices previously discussed
- Review the code with a critical eye, see if you can identify problem areas with respect to naming and opportunities for improvement
- View the video to see if your list of problem areas and opportunities, match those found in our review



.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_5bpln3rv' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>
    

Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/StyleCheckpoint1Summ.html ka
   :long_name: Checkpoint 1


.. _ContentStyleFormat:

Formatting
----------

.. admonition:: On the importance of formatting

    "It is not merely a matter of aesthetics that programs should be written in a particular style. Rather there is a psychological basis for writing programs in a conventional manner: programmers have strong expectations that other programmers will follow these discourse rules. If the rules are violated, then the utility afforded by the expectations that programmers have built up over time is effectively nullified. The results from the experiments with novice and advanced student programmers and with professional programmers described in this paper provide clear support for these claims."
    
    -- Elliot Soloway and Kate Ehrlich - Empirical studies of programming knowledge (1984)

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
 
.. _ContentStyleDocumentation:

Software Documentation overview
-------------------------------
Software documentation should contain information that helps developers read and understand the program and, where appropriate, provide the developer with sufficient background, context, and the reasoning behind some of the implementation decisions, to help with future maintenance and modification.

Some of this background and context may be detailed within external documentation (documentation found outside of the program listing) or internal documentation (documentation found inside of the program listing).

Comments are used for internal documentation. Comments should give overviews of code and provide additional information that is not readily available within the code itself.  

As a rule you should always strive for "Self-Documenting Code", this is likely to occur when developers:

* Include brief and descriptive comments where appropriate
* Consistently follow an accepted style guide
* Ensure programs have a good logical structure
* Implement code logic in a straightforward and easily understandable manner
 

JavaDoc Comments 
----------------
Some general commenting conventions have been established by a tool called **JavaDoc**, which can extract information from your code and use that information to create header comments and API documentation. JavaDoc comments appear right before a class, an interface, or method declaration. They also appear right before the declaration of a visible (public) field.  All visible (i.e. not private) fields require a JavaDoc comment.

They always start with /** and end with \*/.

JavaDoc tags always start with ``@`` and can be included in JavaDoc comments to document any parameters, return type, preconditions, etc. The javadoc tool can generate tags for you based on your code. All tags should include a concise description. For instance, if you have an @param tag, you should describe what that parameter's purpose is.

Unlike other comments, JavaDoc comments (comments that begin with /** are public (externally accessible). Other comments, such as // and /* Comment \*/ are private.

 

Describing a class
------------------
Class comments (javadoc comments) will begin with /** and close with \*/ with the details/purpose of the class in between. Each line within the comment block will start with *. The opening /** and closing \*/ should be vertically aligned. Each * within the comment block should be vertically aligned as well.

Class comments should always include the following:

* a concise description of the class
* your name and PID using the @author tag
* the date and/or version using the @version tag.

The class’ comment block should appear before the class declaration and after any import statements.

Class descriptions typically use two tags: `@author` indicates who wrote the file, and `@version` indicates the "version" of this file or project. You can use your full name, or just username, in an `@author` tag. In this course, it is fine to use the date when the file was written as the version information in the `@version` tag.

When using tags like `@author` and `@version`, make sure to put them at the beginning of the line within the doc comment.

Example:

.. code-block:: java

    import java.util.ArrayList;
    
    /**
    * This class represents a student’s information such as GPA,
    * current number of credit hours achieved, and the courses
    * that the student is currently enrolled in.
    *
    * @author Jane Doe (jdoe)
    * @version 2015.02.02
    */
    
    public class Student {
        ...
    }

Classes that have a generic type parameter should be listed as an `@param` tag in between the class description and the `@author` tag.

Example:

.. code-block:: java

    /**
    * This is an implementation of the Arraylist data structure using an
    * array.
    *
    * @param <E> The type of object stored in the arraylist.
    *
    * @author Jane Doe (jdoe)
    * @version 2015.02.02
    */
    
    public class ArrayBasedArrayList<E> implements ArrayListInterface<E> {
        ...
    }

 

 

Documenting public fields/instance variables and static variables
-----------------------------------------------------------------

.. admonition:: Recall

    The instance variables and static variables of a class are referred to as **fields**

JavaDoc comments for public fields are formatted in a similar way as class comments, though with different content. 

They will begin with /** and close with \*/ with the details/purpose of the field in between. Each line within the comment block will start with *. The opening /** and closing \*/ should be vertically aligned. Each \* within the comment block should be vertically aligned as well.

Field comments should be provided right before the declaration of a visible (public) field and should always include a concise description of the purpose of the field and any special information about its use.

Example:

.. code-block:: java

    /**    
     * Something about the purpose of the following field SALES_TAX_RATE
     */
    
    public static final int SALES_TAX_RATE = 15;
    

Documenting a method
--------------------

Method comments (JavaDoc comments) are formatted the same way as class methods are. The information inside will likely be different. For instance, you will still have to provide a description of what your method does, but you won't have to include @authorand @version tags. However, you will likely need other tags (see below).

Method comments should include the following:

* a concise description of what the method accomplishes
* use `@param` whenever there are parameters
* use `@return` whenever something is returned
* use `@throws` (with a corresponding throws clause in the method signature) when an operation guarantees it will throw an exception under specific conditions
* use `@precondition` (plus internal assert or conditional statements) only for true conditions (i.e., conditions under which the method must never be called (the behavior of the method has absolutely no guarantees about what happens under such conditions)
* use `@postcondition` for mutator methods to explain the state change(s) to the object that has resulted from the method execution.

.. admonition:: Note: Never let @throws and @precondition tags overlap.

    Never let `@throws` and `@precondition` tags overlap. Either something is a precondition (no clients should ever, under any circumstances, call the method under the described condition, and internal assert or conditional statements act as development/debugging aids to spot such violations), or there is a guaranteed behavior that will always happen under those circumstances (i.e., there is a well-defined outcome if the method is called under the described condition, which goes in a @throws clause, and is implemented internally with an explicit throws statement).

    By convention runtime / unchecked Exceptions (``NullPointerException``, ``ArrayIndexOutOfBoundsException``, etc) aren't typically placed in the method's throws clause, they are instead included as part of the preconditions and checked Exceptions(FileNotFound, ClassNotFound,...) are placed in a throws clause and documented with an ``@throws``. However, documentation of preconditions (or things that would throw runtime exceptions) is more of a grey area. You only want to document them if they are interesting, for example many methods can fail with a ``NullPointerException`` and we wouldn't document all cases. There are exceptions to this such as ``IndexOutOfBoundsException`` which is a runtime exception so it never appears in a throws clause, but is somewhat frequently documented with a @throws tag in cases where it is the result of a common error case. (e.g., ``java.util.ArrayList.get(int)`` or ``java.lang.String.charAt(int)``). For this course we will provide explicit guidance and expect usage to fall within these guidelines. More information can found: https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html#throwstag .
 

You should place a descriptive JavaDoc comment just before each method or constructor you write:

.. code-block:: java

    /**    
    * This method calculates the student’s current cumulative GPA.
    *
    * @return gpa The student’s cumulative GPA.
    */
    
    public double calculateGPA() {
        ...
    }

Javadoc Tags
------------

``@author`` tag
    It identifies programmer’s name, required of all classes and interfaces.  Review the example projects provided, these should be available in Eclipse via "Project -> Download Assignment...".

``@param`` tag
    Method parameters should be documented in the method's comment block with an ``@param`` tag. The format is the tag, then the name of the variable you used, and a short description. The parameters should be listed after the method description. If a method has multiple parameters, use the same number of ``@param`` tags as there are parameters. List these tags in order in which parameters appear in method’s header. Be sure to start these tags at the beginning of a comment line, and group all of the tags with the same name together (i.e., all @param tags should be next to each other).

``@return`` tag
    If a method's return type is not void, use an @return tag to document what the method is returning. The ``@return`` tag should appear after any ``@param`` tags.

``@throws`` tag
    If a method can throw a checked exception, name by using ``@throws`` tag Example:

    .. code-block:: java
        
        /**
        * Calculates the slope from two points.
        *
        * @param x1 The first coordinate's x variable
        * @param y1 The first coordinate's y variable
        * @param x2 The second coordinate's x variable
        * @param y2 The second coordinate's y variable
        *
        * @return Returns the calculated slope value
        * @throws IllegalStateException if x1 < x2
        */
        
        public double findSlope(int x1. int y1, int x2, int y2) {
            ...        
        }

Other comments
--------------

When using internal/private (non-JavaDoc) comments, be sure you are using them effectively. If you need to use a comment to describe the purpose of a variable, consider simply changing the variable's name to better suit its purpose. If you need to use a comment to describe a complex chunk of code, consider re-writing the code to make it easier to understand. Sometimes, no comments are better than redundant comments. Always try to make code more understandable and clear without comments before including any. This is because having comments is just more for your reader to read and it can be annoying to have to read the same thing over and over again.

Single-line comments start with two slashes // and anything to the right is the comment. Single-line comments have two styles. Both of which are acceptable, but it’s best to stick with one in order to be consistent.

.. admonition:: Note

    The examples below are NOT good uses of internal comments. They are simply to show you the proper syntax and placement. Read the paragraph above on using internal comments for an explanation.

The first style is to put the comment inline with the line it refers to:

.. code-block:: java
    
    public double tipCalculator(double mealCost) {
        return mealCost * 1.15; //Final meal cost with 15% tip.    
    }

    public double tipCalculator(double mealCost) {
        //Final meal cost with 15% tip.
        return mealCost * 1.15;
    }

Comments can also start with /* and end with \*/ and are useful when the comment spans multiple lines:

.. code-block:: java

    /* This comment spans
    multiple lines. */

 
Internal comments are the documentation technique of last resort
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Choose all names carefully so that a naïve reader's first interpretation will always be right. Do not choose names that might mislead someone about what a method is supposed to do, or what information a variable holds. Choosing poor names or convoluted logic structure and then trying to explain it in lengthy comments does little to improve readability. This is doubly true for methods, because half the time a reader will see your method name where it is called, not when they are reading your method itself. If it is not immediately clear what the method should do, that affects the readability of all the code calling this method, no matter how many comments you put in the method itself.

Strive to write code that is clear and understandable on its own, simply by virtue of the names you have chosen and the structure you use. 

If you feel you have to add an internal comment to explain something, ask yourself what needs explaining. If you need to explain what a name refers to or how you intend to use it, consider choosing a better name. If you have to explain a complex series of if statements or some other convoluted structure, ask yourself (or a TA) if there is a better way. Only after considering these alternatives should you add descriptive comments.

Redundant comments are worse than no comments
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Consider these comments:

.. code-block:: java

    karel = new VPIRobot(); // Create a new robot
    
    x = x + 1; // Add one to x
    
    karel.move(); // move forward one step

These are examples of useless comments. Many students add comments to their code just to "make sure everything is documented", or because they believe copious comments are what the instructor is looking for. Comments like this just get in the way of reading the code, however. You should only add comments when they express something that is not already evident from the code itself. Comments are more code that the poor reader has to wade through, so you need to carefully balance their benefits against the cost of having to read them.  
  
.. _ContentStyleOther:
  


Use of constants and referenced values vs hard coding
-----------------------------------------------------

There may be times where you may wish to refer to a value directly in your code.

Examples of this may include when drawing shapes on a Graphic User Interface, when iterating through arrays or other data structures using loops, when performing some mathematical or business operation requiring some literal or operand, or when referencing the minimum or maximum limits to some range of values. 

As a general rule you should always consider the trade-off to using such values directly, this is referred to as **hard coding** ( sometimes spelled hard-coding or hardcoding). 

Hard coding is a bad practice because it assumes that these values will remain unchanged throughout the life of the software, thus making the code inflexible, difficult to update and maintain as circumstances and stakeholder needs evolve.

Consider, for example, implementing tax calculations within a shopping/eCommerce application which requires the software to perform these calculations in multiple classes/areas of the application.

If you were to hard code the tax rate for each of the instances where the tax calculation was required then, should the tax rate ever change, say from 0.15 (15%) to 0.17 (17%), then you, or a fellow developer, would need to review the entire body of code to ensure that all references to  0.15 (or 15/100) were updated to reflect the new tax rate.

A preferred approach to hard coding is to use either a *constant value*, a value that does not change, or a value that can be referenced.
 
Constants
---------

With respect to the example of the tax rate it would be preferable to create a field  constant in the following manner:

.. code-block:: java
    
    final double TAX_RATE = 0.15;

    total = subtotal * TAX_RATE 

Then refer to that constant within your calculations.  If the rate were to ever change you would simply adjust the value assigned to the constant.

.. admonition:: Note

    If a constant is to be used within a single class then it should be set to `private`. If it is expected to be used across multiple classes then it may be useful to set it as `public static`.

 
Referenced value
----------------

With respect to the example of iterating through an array, or some other similar task, it would be preferable to reference a value instead of hard coding.

So instead of using the following hard coded approach:

.. code-block:: java

    int [] myArray = new int [4];

    for (int i = 0; i < 4; i++ ) {
        System.out.println( myArray[ i ]  );
    }

 

You should use the more flexible approach depicted below:

.. code-block:: java

    final int MAX = 4;

    int [] myArray = new int [MAX];

    for (int i = 0; i < myArray.length ; i++ ) {
        System.out.println( myArray[ i ] );
    }

 

Alternatively you may use `MAX` within the loop instead of `myArray.length`.

Observe how the use of constants and referenced values make your code more flexible and easier to maintain.  Using `myArray.length` within the loop condition , instead of the value 4, makes our code more flexible as this referenced value always matches the correct length of the array even if it were to change.

When writing code you should always use the most flexible option available.

 

Access Modifiers and Visibility of classes, fields, and methods
---------------------------------------------------------------
Access modifiers allow developers to specify whether other classes can use a particular field or invoke a particular method of a given class. 

New developers often forget to specify the access modifiers for classes, fields, and methods.

This is a bad habit and something to avoid since omitting an access modifier may result in unexpected behavior, breaking encapsulation and potentially allowing outside classes to access fields and methods in unintended ways.

You should *always* specify access modifiers for all classes, fields, and methods, both when depicting the software design and when developing the software solution. 

Good design tends to adopt the approach of setting everything as `private` except those fields and methods you explicitly wish outside classes to interact with. 

.. admonition:: Note
    
    As a general rule you should set the fields of your class as `private` and grant other levels of access on a case-by-case basis.  

More information on Access Modifiers and Visibility is available here: https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html 

 

.. _ContentStyleReview:

Review Checklist
----------------
While style has been mentioned in assignments and modules so far, this checklist
should help you keep matters of style in mind when reviewing code before
submitting.


**Generally we should avoid the following:**


Naming
~~~~~~

* Names that do not adhere to proper conventions
* Names that do not adequately capture and communicate the concept they represent or the purpose of the class, method, variable, or concept they represent
* Names that are too long or short and not sufficiently descriptive, i.e. poor identifiers (for example single~characters, or ambiguous abbreviations, initials, acronyms)


Formatting and Indentation
~~~~~~~~~~~~~~~~~~~~~~~~~~

* Inconsistent/missing indentation
* Insufficient white space
* Commented-out lines of code
* Debug statements left within the code
* Multiple instructions per line or statements that are too long


Documentation and Commenting
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Missing/insufficient class description
* Missing/insufficient field comments
* Missing/insufficient method comments
* Missing/incomplete JavaDoc tags
* Missing/incomplete args description
* Wrong/Misleading comments
* Extraneous comments or comments no more descriptive than code


Other matters of style
~~~~~~~~~~~~~~~~~~~~~~

* Using hard-coded values
* Missing or inappropriate access modifiers
* Unnecessary or unused fields/variables

Interactive: Style & Documentation Final Review
-----------------------------------------------

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_5a3easxv' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>
    
Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/StyleCheckpoint2Summ.html ka
   :long_name: Checkpoint 2


Related Resources
----------------- 

*References:*

- Northeastern University. Style Guide for Web-CAT submissions: http://www.ccs.neu.edu/home/vkp/2510-sp13/web-cat-hints.html 
- Google. Java Style Guide: https://google.github.io/styleguide/javaguide.html 
- Javadoc Guide: https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html
- Sun Microsystems, Inc (known today as Oracle). (1996). Java Code Conventions: https://www.oracle.com/technetwork/java/codeconventions-150003.pdf 
