.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Style and Documentation : Naming
================================

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
 

