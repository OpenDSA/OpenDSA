.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Python to Java Tutorial
=========================

**Students can optionally review the Python <-> Java differences from CS2064 provided by John Wenskovitch. This is recommmended for students who have a python background but not much java experience.**


Code blocks 
----------------------

In Python, we created a block of code by ending a ``for``, ``if``, ``def``, or ``class`` line with a colon, and then indenting the code that we wanted to include within the block.  In Java, whitespace doesn’t matter, but we still indent code as a convention for readability.  Instead of using whitespace to create a code block, we open the code block with a ``{`` character and close it with a ``}``.  I’ve made a habit of also including a comment noting which code block is being closed (e.g., ``} //if``), but this isn’t necessary.

Semi-colons 
----------------------

In Java, every statement ends with a semicolon.  Note that beginning a conditional, loop, or function/method/class block does not count as a statement; those lines still end with an opening curly brace.


Variable types
----------------------
Python is good at figuring out what type of data you are planning to store in a variable – for example, defining a=7 is enough for Python to learn that a is an integer type.  Of course, there are cases with data structures where you have to create the structure before you start modifying it (e.g., creating ``myList=[]`` before you call ``myList.append()``).  In Java, all variables need to be defined with an associated type before they are used.  In order to make a into an integer, you need to define it as ``int a``.  You can either make this variable definition a separate step, or you can combine the definition and initialization together (e.g., ``int a=7``).  Most of the types are the same as you’ll find with the ``type()`` function in Python, but the ``String`` type is a unique case because strings are not a primitive type in Java (they are a class instead), and so that type is defined with a capital *S*.

Instance variables
----------------------
When using a variable within a class in Python, we often just assigned it a default value in the constructor and were done.  Because these variables need to be typed and also accessible outside of the constructor (see Scope below), we will define them external to all methods in the class in Java.  In the case of this Rational class, you will see ``private int numerator`` and ``private int denominator`` defined for you.  These should not be changed.

Method return types
----------------------
Similar to defining variable types, Java will also require you to define the type of variable that is returned from a method or a function.  If the method or function doesn’t return anything, then the return type is ``void``.


Constructors 
----------------------
When creating a class in Python, we used ``__init__()`` to define the class constructor.  In Java, the name of the constructor must match the name of the class, so defining class ``Rational`` means that your file would be named ``Rational.java``, and your constructor will be called ``Rational()``.  Constructors are always going to be public (see the next bullet) and will not have a return type.  When you call a constructor to create a new object, you must use the ``new`` keyword:

.. code-block:: java  

    //use the new keyword to create a new instance of a class
    Rational r = new Rational(1, 3);
    
    
Access control modifiers 
------------------------

In Python, a variable could be made **local** to a class by adding a pair of underscores to the beginning (remember ``__numerator`` and ``__denominator`` ?).  In Java, we have additional keywords that control access to both variables and methods. 

* Making a variable or method ``public``` will allow it to be accessed from anywhere.
* Using the ``protected`` keyword will allow it to be accessed from the local class, any child classes, and any other classes in the same package.
* A ``private`` modifier makes something accessible only to the local class.
* Our convention for this Java assignment will be:
    * All instance variables are private.
    * Any method that needs to be accessed from outside of the class should be ``public``, otherwise it should be ``private``.
    * The ``protected`` modifier is not needed for this course.
* ``self`` vs. ``this``: In Python, we used ``self`` to refer to the current object.  In Java, the keyword to do the same thing is ``this``.  One convenience to Java is that we don’t need to pass this into every method like we did with ``self``; that is handled for us in the background.

Scope
----------------------

The scope rules in Python and Java are the same for classes, methods, and functions – defining a variable within these code blocks makes them local to those code blocks.  In Java, we have the same scope rules for conditional and loops as well – if you define a variable within a for loop, it is only accessible within that for loop.

Conditional and loop syntax
---------------------------

In Python, the formatting for conditionals and loops was fairly loose.  Java is more rigid, but also more consistent between the two code block definitions.  Most notably, parentheses are required around both the loop parameters and the conditional.  Note that the ``j++`` in the loop example below is another shorthand way of writing ``j+=1`` or ``j=j+1``:
Here are some examples:

.. code-block:: java  

    // conditional
    if (a < 7) {
        // the commands subject to the conditional
    }
    
    //for loop
    for (int j = 0; j < 17; j++) {
        // the commands subject to the for loop
    }
    
    // while loop
    while (t < 4) {
        //the commands subject to the while loop
    }


Function and method syntax
--------------------------

To keep this one short, there’s no need to use the ``def`` keyword in Java.  A function is instead defined as:

.. code-block:: java  

    // Function definitions follow the format of 
    // <access control> <return type> <function name>(<optional parameters>)
    // for example: 
    public int getDenominator() { 
        return anInt;
    } 
    
    public void setDenominator(int d) {
    
    }
    
Printing (for debugging)
------------------------

Python makes printing convenient with a ``print()`` function defined that is usable anywhere.  Java requires a bit more typing to print; the command is ``System.out.println()`` (the capital *S* is important).  One thing that Java makes a bit easier is printing multiple things on the same line.  With Python, we needed to use the ``end`` parameter within the ``print`` call using an empty string (i.e., ``print("Hello world!", end="")``).  With Java, you only need to remove the ``ln`` from the function call, just using ``System.out.print()``.

.. code-block:: python
    
    //python
    print("prints a string WITHOUT a newline at the end", end=""))
    print("prints a string WITH a newline at the end")) //notice missing 'end' parameter
    
.. code-block:: java
    
    //java
    System.out.print("prints a string WITHOUT a newline at the end")
    System.out.println("prints a string WITH a newline at the end")


Comments:
----------------------

Comments: Use ``//`` instead of ``#`` to comment in Java.  You can also replace the triple-quote comment block by starting a Java comment block with ``/*`` and ending it with ``*/``.

.. code-block:: java
    
    //This is a single line comment
    
    /*
       This is a comment
       that crosses multiple 
       lines in a java file 
    */
    
    

Booleans:
----------------------

In Python, ``True`` and ``False`` began with uppercase characters.  In Java, ``true`` and ``false`` are entirely *lowercase*.

Logical operators:
----------------------

In Python, we were given convenient English versions of logical operators:  ``and``, ``or``, and ``not``.  Java uses symbolic operators for logical operations:  and is &&, or is ||, and not is !.

.. code-block:: java

    \\ logical AND
    && 

    \\ logical OR
    || \\the pipe character

    \\ logical NOT
    !

Object comparison:
----------------------

In Python, you could use ``==`` to compare two objects, overriding the behavior of that operator as needed with ``__eq__``.  Java prevents us from overriding the comparison operator, so using ``==`` to compare two objects will return true if they point to the same location in memory and false otherwise.  To compare two objects in Java, we’ll instead use the ``.equals()`` method, which we are able to override.  This overridden method is provided for you, and the details are below in the method explanations.