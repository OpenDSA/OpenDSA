.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Inheritance and Polymorphism
============================


Introduction
------------

At the end of this module you will..
* Have been introduced to using the Iclicker
* Know some of the basics of Polymorphism
  * Java Java Java! --> Sections 0.78, 1.3, 8.1 - 8.5, and 8.7
* Know how methods send messages to each other using parameters
  * Java Java Java! --> Sections 0.76, 3.2
  * Think Java --> Section 1.5

* Have more practice creating and using methods
  * Java Java Java! --> Chapter 4
  * Think Java --> Chapter 3
* Know about the 'super' keyword and how to use it
  * Java Java Java! --> Section 8.2.6
* Know some of the strategies Computer Scientists use when creating algorithms
  * Java Java Java! --> Sections 1.2 - 1.3
  * Think Java --> Section 1.2


Working with IClicker
---------------------

<TODO: add any information about Iclicker>


Variables and Methods (from Java Java Java!)
--------------------------------------------

Up to this point we have been using the terms attribute and action to describe an object’s features. We will continue to use this terminology when talking in general about objects or when talking about an object or class represented in any diagrams.  However, when talking about a programming language, the more common way to describe an object’s features are to talk about its variables and methods. A **variable**, which corresponds to an attribute, is a named memory location that can store a certain type of value. You can think of a variable as a special container that can only hold objects of a certain type.

For example, lets look at the Rectangle class from last chapter:


.. odsafig:: Images/Rectangle.png
   :align: center

For example, as the above diagram shows, a :code:``Rectangle`` 's  :code:``length`` and :code:``width`` are variables that can store a certain type of numeric value known as an :code:``int``.
An int value is a whole number, such as 76 or -5.

A **method**, which corresponds to an action or a behavior, is a named chunk of code that can be called upon or invoked to perform a certain pre-defined set of actions. For example, in our :code:``Rectangle`` object, the :code:``calculateArea()`` method can be called upon to calculate the rectangle’s area. It would do this, of course, by multiplying the rectangle’s :code:``length`` by its :code:``width``. Similarly, the :code:``draw()`` method can be invoked to draw a picture of the rectangle. It would take the actions necessary to draw a rectangle on the console


Creating and using Methods
--------------------------

Recall that a method is a named section of code that can be called or invoked to carry out an action or operation. In a Java class, the methods correspond to the object’s behaviors or actions.  In the diagram above the :code:``Rectangle`` class has a :code:``calculateArea()`` method and a :code:``draw()`` method.  A method definition consists of two parts: the method header and the method body. In general, a method header takes the following form, including some parts which are optional:

*Modifiers*:sub:`optional` *ReturnType*  *MethodName* ( *ParameterList*:sub:`optional`)

Put together, a method definiton may look like this:

.. code-block:: java

    public int calculateArea()


Above, this method ses the access modifier, :code:``public``, to declare that this method can be accessed or referred to by other classes. The next part of the method header is the method’s return type. This is the type of value, if any, that the method returns. In the code above, we specify that we are expecting to return an :code:``int``.  The method’s name follows the method’s return type. This is the name that is used when the method is called. We could call the method anything we wanted, but spaces cannot be included.  Following the method’s name is the method’s **parameter list** which we'll talk about in the next section.


Passing Information using Parameters (from ThinkJava)
-----------------------------------------------------

Some of the methods we have used require arguments, which are the values you provide when you invoke the method.  For example, a Jeroo has two methods with the name 'hop'.  Calling :code:``hop()`` will cause the jeroo to hop one space ahead.  However if you specify a number inside the parentheses like this: :code:``hop(4)``, the jeroo will hop four spaces ahead.

When you use a method, you provide the arguments. When you write a method, you name the parameters. The parameter list indicates what arguments are required. The following class shows an example:


.. code-block:: java

    public class PracticeClass {
        public static void printTwice(String s) {
            System.out.println(s);
            System.out.println(s);
        }
    }

:code:``printTwice`` has a parameter named :code:``s`` with type :code:``String``. When we invoke :code:``printTwice``, we have to provide an argument with type :code:``String``.

Lets say we wanted to call that printTwice method:

.. code-block:: java

    printTwice("Don't make me say this twice!")


Before the method executes, the argument gets assigned to the parameter. In this example, the argument "Don't make me say this twice!" gets assigned to the parameter s.

This process is called **parameter passing** because the value gets passed from outside the method to the inside. An argument can be any kind of expression, so if you have a  :code:``String`` variable, you can use it as an argument:

.. code-block:: java

    String argument = "Never say never.";
    printTwice(argument);


This time, the phrase "never say never" is asigned to the the parameter :code:``s`` in the method and is printed twice. You can call a method as many times as you like with different parameters.  The only restriction is that the value you provide as an argument must have the same type as the parameter.  For example, the following code would cause a syntax error.

.. code-block:: java

    printTwice(17);


Parameters and other variables only exist inside their own methods. Outiside of the :code:``printTwice`` method, you would not be able to use the variable :code:``s``.  Because variables only exist inside the methods where they are defined, they are often called **local variables**.

It may also be helpful to think about methods like algebraic functions.

.. raw:: html

   <iframe width="560" height="315" src="https://www.youtube.com/embed/GY6Q2f2kvY0?start=9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Using Multiple Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~

Here is an example of a method that takes two parameters

.. code-block:: java

    public void printSum(int x, int y){
      int z = x + y;
      System.out.println(z);
    }

To invoke this method, we have to provide two integers as arguments:

.. code-block:: java

    int firstNum = 7;
    int secondNum = 8;
    printSum(firstNum, secondNum);

Which would print out 15.




Class Hierarchy and Inheritance (From Java Java Java!)
------------------------------------------------------

How are classes related to each other? In Java, and in any other object oriented language, classes are organized in a **class hierarchy**. A class hierarchy is like an upside-down tree. At the very top of the hierarchy is the most general class. In Java, the most general class is the :code:``Object`` class. The classes below :code:``Object`` in the hierarchy are known as its **subclasses**. Since
all of the objects we use in our programs belong to some class or other,
this is like saying that all objects are :code:``Object``s.

The figure below illustrates the concept of a class hierarchy using the classes that we have described in this section. Notice that the :code:``Object`` class occurs at the top of the hierarchy. It is the most general class. It has features that are common to all Java objects. As you move down the hierarchy, the classes become more and more specialized. A :code:``Rectangle`` is an :code:``Object`` but it contains attributes – length and width – that are common to all rectangles but not to other objects in the hierarchy. For example, an :code:``ATM`` object does not necessarily have a length and a width. Notice that we have added a :code:``Square`` class to the hierarchy. A :code:``Square`` is a special type of :code:``Rectangle``, namely one who’s length equals its width

.. odsafig:: Images/ClassHierarchy.png
   :align: center

To introduce some important terminology associated with this kind of hierarchy, we say that the :code:``Rectangle`` class is a subclass of the :code:``Object`` class. The :code:``Square`` class is a subclass of both :code:``Square`` and :code:``Object``. Classes that occur above a given class in the hierarchy are said to be its **superclasses**. Thus :code:``Rectangle`` class is superclass of the :code:``Square`` class.  The :code:``Object`` class is also a superclass of :code:``Square``. In general, we say that a subclass *extends* a superclass, meaning that it adds additional elements (attributes and/or methods) to those contained in its superclasses. We saw this in the case of the :code:``Square`` class. It adds the feature that its length and width are always equal.

Another important concept associated with a class hierarchy is the notion of **class inheritance**, whereby a subclass inherits elements (attributes and / or methods) from its superclass.  To take an example from the natural world, think of the sort of inheritance that occurs between a horse and a mammal. A horse is a mammal. So horses inherit the characteristic of being warm blooded by virtue of also being mammals. (This is different from the kind of individual inheritance whereby you inherit your mother’s blue eyes and your father’s black hair).

To illustrate how inheritence works in programming, consider a chess program.  There are several different types of :code:``ChessPiece``s. There are :code:``Pawn``s, and :code:``Knight``s, and :code:``Queen``s and :code:``King``s. The figure below illustrates the chess piece hierarchy.

.. odsafig:: Images/ChessPieceHierarchy.png
   :align: center

A pair of attributes that all chess pieces have in common is their :code:``row`` and :code:``column`` position on the chess board. Because all chess pieces have these attributes in common, they are located at the top of the :code:``ChessPiece`` hierarchy and inherited by all :code:``ChessPiece`` subclasses. Of course, the :code:``row`` and :code:``column`` attributes are given different values in each :code:``ChessPiece`` object.

One of the actions that all chess pieces have in common is that they can :code:``moveTo()`` a given square on the chess board. But different types of chess pieces have different ways of moving. For example, a :code:``Bishop`` can only move along diagonals on the chess board, whereas a :code:``Rook`` can only move along a :code:``row`` or :code:``column`` on the chess board. So, clearly, we can’t describe a :code:``moveTo()`` method that will work for all :code:``ChessPiece``s. This is why we put the :code:``moveTo()`` method in all of the :code:``ChessPiece`` subclasses. The :code:``ChessPiece`` class also has a :code:``moveTo()`` method, but note that its name is italicized in the diagram. This indicates that it cannot be completely defined at that level.

Finally, note that in chess, the king has certain special attributes and actions. Thus only the king can be put *in check*. This means that the king is under attack and in danger of being captured, thereby ending the game. Similarly, only the king has the ability to castle. This is special move that a king can make together with one of its rooks under certain conditions. Thus, the reason we show the :code:``inCheck`` attribute and :code:``castle()`` action in the :code:``King`` class is because these are characteristics that particular to :code:``King``s.

In this way, a class hierarchy represents a *specialization* of classes as you move from top to bottom. The most general class, :code:``ChessPiece``, is at the top of the hierarchy. Its attributes and methods are passed on to (inherited by) its subclasses. However, in addition to the attributes and methods they inherit from their superclasses, the subclasses define their own special attributes and methods. Each of the subclasses, :code:``Pawn``, :code:``Bishop``, and so on, represents some kind of specialization of the superclass. In this example, each of the subclasses have their own distinctive ways of moving. And the :code:``King`` subclass has unique attributes and actions (:code:``inCheck`` and :code:``castle()``.


Creating Subclasses
~~~~~~~~~~~~~~~~~~~

Let's consider the Chess example from the previous section.  If we wanted to create a :code:``ChessPiece`` class, it might look like this. For now, let's not worry about the attributes or methods, just the class definition.

.. code-block:: java

    public class ChessPiece{

    }


Creating the :code:``King`` class would then look like this:

.. code-block:: java

    public class King extends ChessPiece{

    }


This :code:``extends`` keyword tells java that the :code:``King`` class is a subclass of :code:``ChessPiece``.


Constructors and the Super Keyword (from E-Booklet)
---------------------------------------------------

We know that when we create a subclass that it inherits all of the methods and attributes from the class that it extends. If you create a subclass of :code:``Jeroo`` called :code:``PlantingJeroo`` , then any :code:``PlantingJeroo`` object can perform all of the methods that any :code:``Jeroo``  knows--because a :code:``PlantingJeroo`` is a special kind of :code:``Jeroo`` . The :code:``PlantingJeroo`` class inherits all of the methods and attributes from the class :code:``Jeroo`` , and also understands any new ones you write. Computer scientists sometimes call this an **is-a** relationship, because every :code:``PlantingJeroo`` object is a :code:``Jeroo``  at the same time--just a :code:``Jeroo``  that can do more.

.. note::
    An is-a relationship exists between a subclass and its superclass, since every instance of the subclass is also an instance of the superclass at the same time.

Also, as we have already read a constructor is a special kind of method that is used to initialize a brand new object. But, while a subclass automatically inherits all of the (plain) methods and attributes from its superclass, it does not inherit constructors. That means that the object instantiation for Ali in the previous example will not actually compile--unless we provide an appropriate constructor for our :code:``PlantingJeroo`` subclass.

One reason that subclasses do not automatically inherit constructors is because subclasses can add new attributes in addition to new methods, and those attributes must be initialized, no matter what. But any constructor from a superclass won't know anything about the subclass' new attributes and can't initialize them appropriately. So subclasses have to explicitly define every constructor they support, all the time.

.. note::
    Every time you create a subclass, you are responsible for defining all of the constructors it supports. Constructors are not inherited from superclasses.

Fortunately, while constructors are not inherited, there is a simple pattern for defining them. In our :code:``PlantingJeroo``, we can add the following constructor:

.. code-block:: java

    // ----------------------------------------------------------
    /**
    * Create a new Jeroo facing east.
    * @param x         The x-coordinate of the Jeroo's location.
    * @param y         The y-coordinate of the Jeroo's location.
    * @param flowers   The number of flowers the Jeroo is holding.
    */
    public PlantingJeroo(int x, int y, int flowers){
      super(x, y, flowers);
    }

While we have not yet covered all of the features in this small piece of code, the gist is straightforward. A constructor is declared like a regular method, except that we omit the word void and its name is exactly the same as the class name. Here, we are defining a constructor for our :code:``PlantingJeroo`` subclass that takes three numbers (ints) as arguments, representing the x and y coordinates of the Jeroo's location and the number of flowers in its pouch.

The body of this constructor contains only a single line that uses the special Java keyword :code:``super``. This word can only be used as the first word inside a subclass constructor, and it allows us to invoke a superclass constructor, passing it any information it might need. So here, we are saying that the first (and only) action in our :code:``PlantingJeroo`` constructor is to call the constructor for its superclass (Jeroo), passing the x and y coordinates and number of flowers. This allows the superclass to initialize all of its attributes correctly with the given information. If our subclass needed more initialization, we would perform that in following statements in the subclass constructor's body.

But for now, this constructor is enough for our :code:``PlantingJeroo`` class. It will allow us to create a :code:``PlantingJeroo`` object by specifying its location and number of flowers. That will in turn allow us to instantiate the Ali Jeroo in the previous example without problems.


This video may also be helpful when learning about the super keyword:

.. raw:: html

   <iframe width="560" height="315" src="https://www.youtube.com/embed/oKZnHNM9Ew4?start=24" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



Thinking through an algorithm
-----------------------------

As we learned in the last chapter, an **algorithm** is a sequence of steps that specifies how to solve a problem. Some algorithms are faster than others, and some use less space in computer memory. As you learn to develop algorithms for problems you haven’t solved before, you also learn to think like a computer scientist.

There are many ways to write an algorithm. Some are very informal, some are quite formal and mathematical in nature, and some are quite graphical. The instructions for connecting a DVD player to a television are an algorithm. A mathematical formula such as πR2 is a special case of an algorithm. The form is not particularly important as long as it provides a good way to describe and check the logic of the plan.

The development of an algorithm (a plan) is a key step in solving a problem. Once we have an algorithm, we can translate it into a computer program in some programming language. Our algorithm development process consists of five major steps.

#. Obtain a description of the problem.
#. Analyze the problem.
#. Develop a high-level algorithm.
#. Refine the algorithm by adding more detail.
#. Review the algorithm.


Step 1: Obtain a description of the problem
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This step is much more difficult than it appears. In the following discussion, the word client refers to someone who wants to find a solution to a problem, and the word developer refers to someone who finds a way to solve the problem. The developer must create an algorithm that will solve the client's problem.

The client is responsible for creating a description of the problem, but this is often the weakest part of the process. It's quite common for a problem description to suffer from one or more of the following types of defects: (1) the description relies on unstated assumptions, (2) the description is ambiguous, (3) the description is incomplete, or (4) the description has internal contradictions. These defects are seldom due to carelessness by the client. Instead, they are due to the fact that natural languages (English, French, Korean, etc.) are rather imprecise. Part of the developer's responsibility is to identify defects in the description of a problem, and to work with the client to remedy those defects.


Step 2: Analyze the problem
~~~~~~~~~~~~~~~~~~~~~~~~~~~


The purpose of this step is to determine both the starting and ending points for solving the problem. This process is analogous to a mathematician determining what is given and what must be proven. A good problem description makes it easier to perform this step.

* When determining the starting point, we should start by seeking answers to the following questions:
* What data are available?
* Where is that data?
* What formulas pertain to the problem?
* What rules exist for working with the data?
* What relationships exist among the data values?

When determining the ending point, we need to describe the characteristics of a solution. In other words, how will we know when we're done? Asking the following questions often helps to determine the ending point.

* What new facts will we have?
* What items will have changed?
* What changes will have been made to those items?
* What things will no longer exist?


Step 3: Develop a high-level algorithm
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An algorithm is a plan for solving a problem, but plans come in several levels of detail. It's usually better to start with a high-level algorithm that includes the major part of a solution, but leaves the details until later. We can use an everyday example to demonstrate a high-level algorithm.

**Problem**: I need a send a birthday card to my brother, Mark.

**Analysis**: I don't have a card. I prefer to buy a card rather than make one myself.

**High-level algorithm**:

* Go to a store that sells greeting cards
* Select a card
* Purchase a card
* Mail the card

This algorithm is satisfactory for daily use, but it lacks details that would have to be added were a computer to carry out the solution. These details include answers to questions such as the following.

* "Which store will I visit?"
* "How will I get there: walk, drive, ride my bicycle, take the bus?"
* "What kind of card does Mark like: humorous, sentimental, risqué?"

These kinds of details are considered in the next step of our process.


Step 4: Refine the algorithm by adding more detail
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A high-level algorithm shows the major steps that need to be followed to solve a problem. Now we need to add details to these steps, but how much detail should we add? Unfortunately, the answer to this question depends on the situation. We have to consider who (or what) is going to implement the algorithm and how much that person (or thing) already knows how to do. If someone is going to purchase Mark's birthday card on my behalf, my instructions have to be adapted to whether or not that person is familiar with the stores in the community and how well the purchaser known my brother's taste in greeting cards.

When our goal is to develop algorithms that will lead to computer programs, we need to consider the capabilities of the computer and provide enough detail so that someone else could use our algorithm to write a computer program that follows the steps in our algorithm. As with the birthday card problem, we need to adjust the level of detail to match the ability of the programmer. When in doubt, or when you are learning, it is better to have too much detail than to have too little.

Most of our examples will move from a high-level to a detailed algorithm in a single step, but this is not always reasonable. For larger, more complex problems, it is common to go through this process several times, developing intermediate level algorithms as we go. Each time, we add more detail to the previous algorithm, stopping when we see no benefit to further refinement. This technique of gradually working from a high-level to a detailed algorithm is often called **stepwise refinement**.



.. note::
    **Stepwise Refinement** is a process for developing a detailed algorithm by gradually adding detail to a high-level algorithm.


Step 5: Review the Algorithm
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The final step is to review the algorithm. What are we looking for? First, we need to work through the algorithm step by step to determine whether or not it will solve the original problem. Once we are satisfied that the algorithm does provide a solution to the problem, we start to look for other things. The following questions are typical of ones that should be asked whenever we review an algorithm. Asking these questions and seeking their answers is a good way to develop skills that can be applied to the next problem.



Does this algorithm solve a **very specific problem** or does it solve a **more general** problem? Should it be generalized?
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

For example, an algorithm that computes the area of a circle having radius 5.2 meters (formula π*5.22) solves a very specific problem, but an algorithm that computes the area of any circle (formula π*R2) solves a more general problem.


Can this algorithm be **simplified**?
"""""""""""""""""""""""""""""""""""""

One formula for computing the perimeter of a rectangle is: :code:``length + width + length + width`` but a simpler formula would be:  :code:``2.0 * (length + width)``.


Is this solution similar to the solution to another problem?
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

For example, consider the following two formulae:

* :code:``Rectangle area = length * width``
* :code``Triangle area = 0.5 * base * height``

Similarities: Each computes an area. Each multiplies two measurements.

Differences: Different measurements are used. The triangle formula contains 0.5.

Hypothesis: Perhaps every area formula involves multiplying two measurements.



Syntax Review
-------------



Syntax Practice
---------------

Codeworkout exercises



changePointeeDataDirect
-----------------------

Molly is practicing adding a CW style question (still in progress)

.. extrtoolembed:: 'changePointeeDataDirect'



Programming Practice
--------------------

Codeworkout exercises
---------------------

Reading Quiz 1
---------------------

Practicing making a multiple choice question to mimic a Khan Academy question

.. avembed:: Exercises/IntroToSoftwareDesign/Question1.html ka
