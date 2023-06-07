.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Style and Documentation : Documentation
=======================================

Shortcuts
---------

- :doc:`Introduction </ContentStyle>`
- :doc:`Naming </ContentStyleNaming>`
- :doc:`Format </ContentStyleFormat>`
- Documentation <- You are here
- :doc:`Other Issues </ContentStyleOther>`
- :doc:`Review </ContentStyleReview>`


Documentation Overview 
----------------------

Software documentation should contain information that helps developers read and understand the program and, where appropriate, provide the developer with sufficient background, context, and the reasoning behind some of the implementation decisions, to help with future maintenance and modification.

Some of this background and context may be detailed within external documentation (documentation found outside of the program listing) or internal documentation (documentation found inside of the program listing).

Comments are used for internal documentation. 

Comments should give overviews of code and provide additional information that is not readily available within the code itself.  

As a rule you should always strive for "Self-Documenting Code", this is likely to occur when developers:

    - Include brief and descriptive comments where appropriate
    - Consistently follow an accepted style guide
    - Ensure programs have a good logical structure
    - Implement code logic in a straightforward and easily understandable manner
 

JavaDoc Comments 
----------------

Some general commenting conventions have been established by a tool called `javadoc`, which can extract information from your code and use that information to create header comments and API documentation. JavaDoc comments appear right before a class, an interface, or method declaration. They also appear right before the declaration of a visible (public) field.  All visible (i.e. not private) fields require a JavaDoc comment.

They always start with `/**` and end with `*/`.

JavaDoc tags always start with `@` and can be included in JavaDoc comments to document any parameters, return type, preconditions, etc. The javadoc tool can generate tags for you based on your code. All tags should include a concise description. For instance, if you have an @param tag, you should describe what that parameter's purpose is.

Unlike other comments, JavaDoc comments that begin with `/**` are public (externally accessible). Other comments, such as `//` and `/* Comment */` *are private*.


Describing a class
-------------------

Class comments (javadoc comments) will begin with `/**` and close with `*/`, with the details/purpose of the class in between. Each line within the comment block will start with `*`. The opening `/**` and closing `*/` should be vertically aligned. Each `*` within the comment block should be vertically aligned as well.

Class comments should always include the following:

#. a concise description of the class
#. your name and PID using the @author tag
#. the date and/or version using the @version tag.

The comment block for the class should appear before the class declaration and after any import statements.

Class descriptions typically use two tags: `@author` indicates who wrote the file, and `@version` indicates the "version" of this file or project. You can use your full name, or just your username, in an `@author` tag. In this course, it is fine to use the date when the file was written as the version information in the `@version` tag.

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

    The instance variables and static variables of a class are referred to as fields

JavaDoc comments for public fields are formatted in a similar way as class comments, though with different content. 

They will begin with `/**` and close with `*/` with the details/purpose of the field in between. Each line within the comment block will start with `*`. The opening `/**` and closing `*/` should be vertically aligned. Each * within the comment block should be vertically aligned as well.

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

#. a concise description of what the method accomplishes
#. use `@param` whenever there are parameters
#. use `@return` whenever something is returned
#. use `@throws` (with a corresponding throws clause in the method signature) when an operation guarantees it will throw an exception under specific conditions
#. use `@precondition` (plus internal assert or conditional statements) only for true conditions (i.e., conditions under which the method must never be called (the behavior of the method has absolutely no guarantees about what happens under such conditions)
#. use `@postcondition` for mutator methods to explain the state change(s) to the object that has resulted from the method execution.

.. admonition:: Note: Never let @throws and @precondition tags overlap!

     Either something is a precondition (no clients should ever, under any circumstances, call the method under the described condition, and internal assert or conditional statements act as development/debugging aids to spot such violations), or there is a guaranteed behavior that will always happen under those circumstances (i.e., there is a well-defined outcome if the method is called under the described condition, which goes in a @throws clause, and is implemented internally with an explicit throws statement).

By convention runtime / unchecked Exceptions (NullPointer, ArrayIndexOutOfBounds, etc) aren't typically placed in the method's throws clause, they are instead included as part of the preconditions and checked Exceptions(FileNotFound, ClassNotFound,...) are placed in a throws clause and documented with an @throws. However, documentation of preconditions (or things that would throw runtime exceptions) is more of a grey area. You only want to document them if they are interesting, for example many methods can fail with a NullPointerException and we wouldn't document all cases. There are exceptions to this such as IndexOutOfBoundsException which is a runtime exception so it never appears in a throws clause, but is somewhat frequently documented with a @throws tag in cases where it is the result of a common error case. (e.g., java.util.ArrayList.get(int) or java.lang.String.charAt(int)). For this course we will provide explicit guidance and expect usage to fall within these guidelines. More information can found: https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html#throwstag 
 

More info on JavaDoc Comments here: http://www.oracle.com/technetwork/articles/java/index-137868.html

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

Further detail regarding Javadoc and the use of special tags


Javadoc Tags
------------ 

The `@author` tag
    Identifies the programmer’s name. Required of all classes and interfaces.  Review the example projects provided, these should be available in Eclipse via "Project -> Download Assignment...".

The `@param` tag
    Method parameters should be documented in the method's comment block with an @param tag. The format is the tag, then the name of the variable you used, and a short description. The parameters should be listed after the method description. If a method has multiple parameters, use the same number of @param tags as there are parameters. List these tags in order in which parameters appear in method’s header. Be sure to start these tags at the beginning of a comment line, and group all of the tags with the same name together (i.e., all @param tags should be next to each other).

The `@return` tag
    If a method's return type is not void, use an @return tag to document what the method is returning. The @return tag should appear after any @param tags.

The `@throws` tag
    If a method can throw a checked exception, name by using @throws tag 
    
Example:

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

Single-line comments start with two slashes `//` and anything to the right is the comment. Single-line comments have two styles. Both of which are acceptable, but it’s best to stick with one in order to be consistent.

NOTE: The examples below are NOT good uses of internal comments. They are simply to show you the proper syntax and placement. Read the paragraph above on using internal comments for an explanation.

The first style is to put the comment inline with the line it refers to:

.. code-block:: java

    public double tipCalculator(double mealCost) {

        return mealCost * 1.15; //Final meal cost with 15% tip.

    }

    public double tipCalculator(double mealCost) {

        //Final meal cost with 15% tip.
        return mealCost * 1.15;

    }

Comments can also start with /* and end with */ and are useful when the comment spans multiple lines:

.. code-block:: java

    /* This comment spans
    multiple lines. */


.. admonition:: Note

    Internal comments are the documentation technique of last resort


Choose all names carefully so that a naïve reader's first interpretation will always be right. Do not choose names that might mislead someone about what a method is supposed to do, or what information a variable holds. Choosing poor names or convoluted logic structure and then trying to explain it in lengthy comments does little to improve readability. This is doubly true for methods, because half the time a reader will see your method name where it is called, not when they are reading your method itself. If it is not immediately clear what the method should do, that affects the readability of all the code calling this method, no matter how many comments you put in the method itself.

Strive to write code that is clear and understandable on its own, simply by virtue of the names you have chosen and the structure you use. 

If you feel you have to add an internal comment to explain something, ask yourself what needs explaining. If you need to explain what a name refers to or how you intend to use it, consider choosing a better name. If you have to explain a complex series of if statements or some other convoluted structure, ask yourself (or a TA) if there is a better way. Only after considering these alternatives should you add descriptive comments.

Redundant comments are worse than no comments

Consider these comments:

.. code-block:: java

    karel = new VPIRobot(); // Create a new robot

    x = x + 1; // Add one to x

    karel.move(); // move forward one step

These are examples of unnecessary comments. Many students add comments to their code just to "make sure everything is documented", or because they believe copious comments are what the instructor is looking for. Comments like this just get in the way of reading the code, however. In each case, the code reflects what the comment says. The comment doesn't add anthing to the readers 
comprehension. 

**You should only add comments when they express something that is not already evident from the code itself.** Comments are more code that the reader has to wade through, so you need to carefully balance their benefits against the cost of having to read them.