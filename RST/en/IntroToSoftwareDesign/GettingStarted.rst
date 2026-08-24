.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2026 by the OpenDSA Project Contributors.

.. avmetadata::
   :title: Objects, Classes, and Micro-Worlds
   :author: Molly Domino; Steve Edwards
   :institution: Virginia Tech
   :keyword: Software Design; LightBot; Jeroo; Micro-world
   :naturallanguage: en
   :programminglanguage: Java
   :description: Introduction to the course module for an introductory CS course.


Objects, Classes, and Micro-Worlds
==================================

   “Computer Science is not programming. Rather, programming is the medium
   for our art, just as writing is the medium for English and other majors.
   First, we teach you how to express your problem-solving through this
   medium, and then you practice artful problem-solving in many delightful
   subdisciplines.  In this class, it will be as if you learn to think and
   write in a new way.  Learning to program is transformative and empowering.”
   -- Todd Neller

There is a unique kind of wonder in writing a set of instructions, pressing
"Run," and watching a virtual world spring into motion before your eyes. In this
chapter, your journey as a software creator begins. You are not just learning a
programming language; you are stepping into a digital sandbox where you will
design autonomous actors, give them senses and behaviors, and choreograph how
they interact with their environment.

Programming in an object-oriented world is fundamentally about creative
modeling. You will start by exploring interactive micro-worlds—directing
playful robots in LightBot and guiding whimsical creatures on Santong Island
in Jeroo. As you experiment with these micro-worlds, you will discover the
elegance of breaking complex challenges into delightful, bite-sized puzzles and
experience the exhilarating feeling of watching your digital creations carry out
your commands with flawless precision.


Installing BlueJ
----------------

Follow the instructions on your course site on Canvas to **Install BlueJ**.

Introducing LightBot
--------------------

LightBot is a very simple robot programming simulation game. It runs right in
your web browser, and looks like this:

.. odsafig:: Images/LightBotLevel2.png
   :align: center

.. sidebar:: Learning Objectives

    **Estimated Time**: ~99 minutes (~90 min reading + ~9 min video at 100 WPM)

    * **Define** basic LightBot actions and their corresponding icons.
    * **Apply** LightBot commands to solve simple LightBot levels (1-7).
    * **Define** key programming concepts: object, program, algorithm, micro-world, source code, compiler, interpreter, behavior, method, message, method call, instantiation, declaration, identifier, reference variable, class, constructor, attribute.
    * **Describe** the characteristics of a micro-world, using LightBot and Jeroo as examples.
    * **Explain** the use of a left-handed Cartesian plane with zero-based indexing for coordinates in a micro-world grid.
    * **Translate** visual icon-based programs into textual Java-like method calls.
    * **Differentiate** between a compiler and an interpreter.
    * **Write** Java statements to declare object reference variables, instantiate objects with ``new``, and place them on a grid at specified coordinates.
    * **Write** Java statements to call methods on ``LightBot`` and ``Jeroo`` objects to alter their state.
    * **Describe** the Santong Island environment, Jeroo attributes, directions, and action methods.
    * **Explain** the importance of code readability practices, including meaningful identifiers, commenting, and indentation.
    * **Apply** proper Java commenting (single-line, multi-line, Javadoc) and indentation rules to source code.

In the LightBot game, you create a **program** to control a little robot to
solve a simple task in the miniature block-based world where the LightBot exists.
The programming in LightBot is iconic. The icons at the top right of the game's
display represent instructions to the robot. Each icon instructs the robot to do
something--go one square forward, turn right, turn left, jump forward, and light
up the square the robot standing on. Of course the square will only light up if
the robot is on a blue square. The speaker icon in the upper left corner will
allow you to toggle the game sound on and off. The reset button in the lower
left corner will delete all of your instructions and start the level over.

Your task on each level of the LightBot game is to get the robot to light up
all of the blue squares. To create a program to control the robot simply drag
the icons at the top and drop them on the main method squares left to right.

.. admonition:: Try It Yourself

    Play the first two levels of LightBot to try things out here
    (opens in a new tab; maximize the window if some controls are not visible):

    .. raw:: html
     
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.lightbot.lu/" target="_blank">LightBot</a>
    
    Be sure your browser window is tall enough to see the "Instructions" label
    in the upper right of the game. Keep the separate browser tab/window
    showing the game open so you can refer to it later in this chapter.

The LightBot game illustrates several basic programming concepts. The robot
itself is an **object**, and we can request it to perform specific actions that
it knows how to carry out. We can write a series of these requests down as
a **program**. The series of actions that we write down is a plan for solving
a specific problem (an **algorithm**).


From LightBot to Micro Worlds
-----------------------------

The LightBot game is an example of a **micro-world**. A micro-world is a
miniature simulated environment that is populated with one or more objects
with clearly defined behaviors, and that can be visually represented so that
you can see how the objects move around and behave over time.

Micro-worlds typically use a **grid** to represent locations in the simulated
world. You can see this in the LightBot game, where the robot walks on square
tiles. In this course, we will use the same approach. We can refer to any
location on a grid using x and y coordinates:

.. odsafig:: Images/micro-world-coordinates.png
   :align: center

We will use a variation of **Cartesian coordinates** to write any location as
an *(x, y)* pair, where x (the first coordinate) represents the distance from
the origin horizontally, and y (the second coordinate) represents the distance
from the origin vertically. The only catch is that
the **y axis points downward** in our grid, making this
a *left-handed Cartesian plane*. We use a left-handed orientation for our axes
because that convention is predominant in computer programming contexts (even
though it is the opposite of what is typical in studying geometry!).

So the highlighted cell in the grid shown above is at location (4, 2), since
it is 4 cells horizontally to the right of the origin, and 2 cells vertically
down from the origin. Also notice that the origin (0, 0) is explicitly
represented in our grid and is located at the **top left corner**. The grid
above is 10 by 10 in size, where coordinates run from 0 up to and including
9. This means we will always used **zero-based indexing** when referring to
grid positions--i.e., we always start counting from zero at the origin (top
left), rather than starting with one.


A Bit More LightBot
-------------------

If you only played the first two levels of LightBot, there's definitely more
interesting stuff you haven't seen! As the levels progress, the puzzles get
more complicated. They are harder to solve using the limited number of slots
in the program memory for the little robot. Fortunately, the LightBot game
provides a few more icons for you to use.

The original version of LightBot provided two smaller instruction areas
: f1 and f2.
The f1 and f2 icons represent the two functions (icon areas) below the main
method in the LightBot game. These two functions are where you will place
instructions that the robot will need to perform multiple times. Anywhere
you place the f1 or f2 icon, the robot will perform the entire sequence of
actions associated with that function. This will allow you to build more
complex programs which are necessary to solve the more challenging tasks in
the later levels.

.. admonition:: Try It Yourself

    Return to the LightBot game--hopefully, still visible in a separate
    browser tab or window (see the link earlier in this chapter if you
    closed it).
    Continue to play through
    Level 7. Once you have completed Level 7, stop. You'll return to finish
    Level 8 in the next exercise.


Textually Representing Programs
-------------------------------

Computer programs are most often written in textual form--in fact, one of the most important goals of programming is to write programs so that they communicate well to *other people*. So let's look at how we can represent LightBot puzzle solutions as text.

At its most basic, a computer program is simply a sequence of instructions for a computer to follow. Our LightBot level solutions are just that: programs. All we need in order to write them textually is names that correspond to the icons. For example, if we call our little robot :code:``andy``, we could use the following names to correspond to his icons (from left to right):

.. raw:: html

    <table class="docutils align-default" style="margin-bottom:1em;">
    <thead><tr><th>Symbol</th><th>Textual Program Statement (Method Call)</th></tr></thead>
    <tbody>
    <tr><td><img src="https://courses.cs.vt.edu/~cs1114/booklet//img/light-bot-move.png"/></td>
    <td><code>andy.move();</code></td></tr>
     <tr><td><img src="https://courses.cs.vt.edu/~cs1114/booklet//img/light-bot-right.png"/></td>
    <td><code>andy.turnRight();</code></td></tr>
    <tr><td><img src="https://courses.cs.vt.edu/~cs1114/booklet//img/light-bot-left.png"/></td>
    <td><code>andy.turnLeft();</code></td></tr>
    <tr><td><img src="https://courses.cs.vt.edu/~cs1114/booklet//img/light-bot-jump.png"/></td>
    <td><code>andy.jump();</code></td></tr>
    <tr><td><img src="https://courses.cs.vt.edu/~cs1114/booklet//img/light-bot-light.png"/></td>
    <td><code>andy.turnLightOn();</code></td></tr>
    <tr><td><img src="https://courses.cs.vt.edu/~cs1114/booklet//img/light-bot-f1.png"/></td>
    <td><code>andy.f1();</code></td></tr>
    <tr><td><img src="https://courses.cs.vt.edu/~cs1114/booklet//img/light-bot-f2.png"/></td>
    <td><code>andy.f2();</code></td></tr>
    </tbody>
    </table>

Each action is phrased as a request to an object that performs the desired behavior. So each request goes to our robot, :code:``andy``. For example, consider Level 2:

.. odsafig:: Images/LightBotLevel2.png
   :align: center

One solution to this level is:

.. code-block:: java

    andy.move();
    andy.turnRight();
    andy.move();
    andy.turnLeft();
    andy.move();
    andy.move();
    andy.turnLeft();
    andy.move();
    andy.turnRight();
    andy.move();
    andy.turnLightOn();


.. admonition:: Try It Yourself

    Return to the LightBot game--hopefully, still visible in a separate
    browser tab or window (see the link earlier in this chapter if you
    closed it).
    Complete Level 7
    if you have not already done so. Once you have completed Level 7, think
    carefully about your solution for Level 8. Compose your solution for
    Level 8 but don't run it yet. **Write down your solution for Level 8
    in textual form on scratch paper.**

    After writing down your solution, then run it. If it does not work the way
    you planned, revise it and revise your textual version, too before running
    it again. This will help you practice writing down program steps.


What Does LightBot Say About Programming?
-----------------------------------------

The LightBot game illustrates several basic programming concepts:


* Object

* Method

* Method Call

* State

* Algorithm

* Program

* Source Code

* Interpreter


In this course, we are going to focus on
learning **object-oriented programming** in Java. This section describes
several general concepts about object-oriented programs that we have seen 
in this first example. As you read subsequent chapters, refer back to this
chapter to review the meaning of important words and phrases.


Programs and Programming Languages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

It doesn't matter whether we are sending email, surfing the net,
to music, writing an essay, or playing a game, whenever we
a computer we are using one or more computer programs.  Each
is simply a set of instructions for the computer.

.. note:: 

    A computer **program** is a set of instructions for a computer.

Every program is written by one or more programmers.  Programmers
a programming language, such as Java, C++, Python, or Visual Basic
write a computer program.  For LightBot, you first used an
iconic language, and then learned how to use a simple textual language
represents exactly the same actions.

Programs exist in many forms.  The form that a programmer writes
called the source code for the program.  Unfortunately, a computer
use source code directly.  Source code must be translated
machine language before it can be executed (run) by the
computer.

.. note::

    The **source code** for a program
    is written by a programmer in some programming language.

There are several kinds of translation.  A compiler translates a
program, as a whole, from one form to another, but not necessarily
into machine language.  An interpreter translates a program into
machine language one statement at a time.  Each statement is executed
as soon as it has been translated.  LightBot is an example of an
interpreter, since it converts each source code action directly into
computer behavior, one statement at a time.

.. note::

    A **compiler** translates a program,
    as a whole, from one form to another.

    An **interpreter** translates a
    program into machine language one statement at a time.


Algorithms
~~~~~~~~~~

Every computer program starts with a plan.  That plan is called an
algorithm.  There are many ways to write an algorithm.  Some are very
informal, some are quite formal and mathematical in nature, and some
are quite graphical.  The form is not particularly important as long
as it provides a good way to describe and check the logic of the
plan.

.. note::

    An **algorithm** is a plan for solving a problem.


Objects
~~~~~~~

It should come as no surprise to learn that an object-oriented
programming language works with objects.  But what is an object?
Unfortunately, this concept is difficult to define because an object
is simultaneously something that only exists within a computer program
and a logical representation of something else.  A good approach is
to define an object in terms of what it represents.

.. note::

    An **object** represents a specific
    concept or item that is relevant to the problem we are trying to
    solve.

A typical program works with several different objects.  Some of
these may represent the same kind of thing.  For example, in LightBot
it seems obvious that the robot itself is an object.  But there are
also bricks that block the robot's path and that can be stacked.  There
are also blue squares that can be lighted.  There might be multiple
bricks, or multiple blue squares on a level, and these are all individual
objects, even though they are of the same kind.

An object represents something, but we, as programmers, need to
determine what characteristics of that thing are important to the
problem we are trying to solve.  There are two parts to an object,
facts about the thing it represents (Is the blue square lit yet, or
still dim? Which direction is the robot facing?), and tasks that the
object can perform (the robot can move, turn left or right, and so on).
The facts are called attributes (we'll cover those later) and the
tasks are called methods.


Methods and Behaviors
~~~~~~~~~~~~~~~~~~~~~

When we design an object, we need to determin what tasks it should
perform.  In doing so, we tend to anthropomorphize the item that the
object represents. (To anthropomorphize means to ascribe human
characteristics to non-human things.)  For example, we might want the
LightBot to move from one location to another, or jump up on an
obstacle.

.. note::

    A **behavior** is an action that an
    object can take or a task that it can perform in response to a
    request from an external source.

    A **method** is a collection of
    statements that are written in some programming language to describe
    a specific behavior.

    A **precondition** for a method is
    something that is assumed to be true before the method is invoked.

    A **postcondition** for a method is
    something that is assumed to be true after the method has been executed.

For example, our LightBot supports a number of methods that
correspond to the icons we can use, and which we gave textual names
in the previous section.  Also, some methods only work under certain
conditions: the robot can only jump (up or down) if the square
immediately in front of it is exactly one block higher or lower than
where the robot is standing.  This is a **precondition**.  Similarly,
the icon to light up the current square only works when the robot is
standing on a blue square (also a precondition).  However, if the robot
is indeed standing on a blue square, and then it executes its "turn light
on" behavior, then afterward the blue square will be lit
(a postcondition, which describes the outcome of executing a specific
behavior or method).


Messages (Invoking Methods)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

When we write an object-oriented program, we instantiate appropriate
objects and ask them to perform specific tasks.  We use message to
make these requests.

.. note::

    A **message** is a request for a
    specific object to perform a specific task.

    When we ask an object to perform a task, we say that we are
    **sending a message** or **invoking the method** that
    describes the task.


Why OOP?
~~~~~~~~

While we've learned how to define and use objects in programming, it's important
to understand why we use them. Object-Oriented Programming (OOP) is a powerful
paradigm because it helps us organize complex programs in ways that are more
manageable and scalable. Think about building with LEGO bricks: each LEGO brick
is an object with its own characteristics (color, shape) and behaviors (it can
connect to other bricks). When you build a large structure, you don't think
about every single plastic atom; you think about combining pre-made bricks.
Similarly, in OOP, objects allow us to:

* **Modularize our code**: Break down a big problem into smaller,
  self-contained parts (objects), making the code easier to understand,
  write, and debug.
* **Promote reusability**: Once you've created an object (like our LightBot
  object), you can reuse it in different parts of your program or even in 
  entirely new programs without having to rewrite its internal logic. This
  saves time and reduces errors.
* **Simplify maintenance**: If you need to change a specific behavior, you
  only need to modify the code within that object, rather than searching
  through an entire program.
* **Encapsulate data and behavior**: Objects bundle data (attributes like the
  LightBot's position) with the methods that operate on that data
  (like ``move()`` or ``turnLightOn()``). This means that an object controls its
  own internal state, preventing other parts of the program from accidentally
  corrupting it.

By understanding these benefits, you'll see that OOP isn't just a set of rules;
it's a philosophy for designing robust and efficient software.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/m_MQYyJpIjg?si=vjIoKUkJO8cjdduM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
   </div>


A Programmable LightBot in Java
-------------------------------

The LightBot World Top-Down
~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the sections above, you played with the
LightBot game, and even saw a textual representation for the graphical
commands that the little robot obeys.  Now it is time to turn those
concepts into a full-fledged program that you can write yourself.

First, recall that LightBot is really just a form of
**micro-world**: each "level" of
the game is a miniature world that can be represented as a grid, and
all of the objects--the robot, the blocks, the bue tiles that light
up--occupy different locations on this grid.  The flash game uses
isometric projection to make the world look more three-dimensional,
and animation to make it more attractive.  For example, here is the
second level of the LightBot game you saw in Chapter 1:

.. odsafig:: Images/LightBotLevel2.png
   :align: center

To simplify things somewhat, however, let's use a plain
top-down view of the same situation:

.. odsafig:: Images/light-bot-lev2g.png
   :align: center

In this top-down view, it is much easier to see which direction
is the *x* direction and which is the *y* direction,
so we can keep our coordinates straight.  Also, this picture highlights
the fact that each LightBot level is an 8 x 8 grid. As another example,
the third level of the LightBot game looks like this in the
original:

.. odsafig:: Images/light-bot-lev3.png
   :align: center

But the same level can be represented top-down like this:

.. odsafig:: Images/light-bot-lev3g.png
   :align: center

Now that we have our "world" figured out, we can talk about
writing source code to control the robot in it.


The Methods of a LightBot
~~~~~~~~~~~~~~~~~~~~~~~~~

Let's start our discussion of writing LightBot programs by
recapping the basic commands that every LightBot understands.
Earlier, we saw that LightBots know how to perform seven basic
actions or behaviors:

.. raw:: html

    <table class="docutils align-default" style="margin-bottom:1em;">
    <thead><tr><th>Method</th><th>What Happens</th></tr></thead>
    <tbody>
    <tr><td><code>move()</code></td>
    <td>The robot moves forward one square (if it can)</td></tr>
    <tr><td><code>turnRight()</code></td>
    <td>The robot turns 90 degrees to its right (clockwise)</td></tr>
    <tr><td><code>turnLeft()</code></td>
    <td>The robot turns 90 degrees to its left (counterclockwise)</td></tr>
    <tr><td><code>jump()</code></td>
    <td>The robot moves forward by jumping up one block higher, or by jumping down one or more blocks lower (if it can)</td></tr>
    <tr><td><code>turnLightOn()</code></td>
    <td>The robot lights up the blue tile, if it is standing on one</td></tr>
    <tr><td><code>f1()</code></td>
    <td>The robot carries out whatever sequence of actions you have defined for the method <code>f1</code></td></tr>
    <tr><td><code>f2()</code></td>
    <td>The robot carries out whatever sequence of actions you have defined for the method <code>f1</code></td></tr>
    </tbody>
    </table>

In an object-oriented program, we would model the LightBot,
its world (the level we are playing), the blocks in the world,
and the blue tiles as **objects**.
Each object provides a set of behaviors that it understands, and
these behaviors are implemented as **methods**.  So the seven behaviors
shown above that are understood by every LightBot are its methods.  When we
**call a method** (which is the
same thing as *invoke a method* or *send a message*),
we are requesting that an object carry out a specific method that
we identify by name.  Of course, to call a method, we have to
know exactly which object we want to carry out the action.


Where Do We Write It?
~~~~~~~~~~~~~~~~~~~~~

All of the program code we write must go somewhere.  But where do
we put it?  In an object-oriented program, all program statements
go inside a **method**, and every method belongs to an object (or to a
**class**, a family of objects that all understand the same methods).

The programming environment we will use in this course is called
**BlueJ**.  We are also using class libraries from
**Greenfoot**, a framework that allows us to work with many
kinds of micro-worlds.

When you open a project in BlueJ, you will see a diagram of the
various Java classes you are working on. Here, we can see BlueJ's
main window looking at a simple Java project for solving LightBot
Level 3.

.. odsafig:: Images/bluej-Level3Solution.png
   :align: center

You can double-click on any Java class in the project to open it
in the editor and view its program code. For our micro-world
assignments, you will also see a class called ``Application``--right-click
the ``Application`` class and choose **Run JavaFX Application** to execute your
micro-world application.

.. odsafig:: Images/lightbot3.png
   :align: center

When you run any micro-world program, you will see the world
displayed.
The main area of the display consists of a top-down view of
the world, in this case Level 3 of the LightBot game. You will
also see controls at the bottom to ``Act`` (cause objects to execute
their next action), ``Run`` (cause objects to repeatedly act over and
over), and control the speed of execution.

Each Java class that you write will have its source code stored
in a text file.  By double-clicking on the rounded rectangle representing the class
in BlueJ's project window, you
can see (and edit) your class source code in an edit window.  If
you double-click on ``Level3Solution``, you will see its contents:

.. odsafig:: Images/Level3Solution.png
   :align: center

In the editor notice that a method has already been provided
to hold new code.  This method is called ``myProgram()``,
and it represents the behavior that will be carried out when you
press the ``Run`` button at the bottom of your program's window.
This method has the following structure:

.. odsafig:: Images/method_structure0.png
   :align: center


Creating New Objects
--------------------

In order to call methods on an object to solve a problem, first we
actually need an object!  That means that creating the objects we
need to solve a problem is part of our work in constructing a solution.

.. note::

    Creating a new object is called **instantiation**.

Sometimes, all we need to do is create and object, and that
act by itself does what we need.  But most of the time, we create an
object so we can ask it to do things--call its methods.  In order
to call methods on an object, we need some way to refer to the
object we are talking to.  In most cases, we do this by introducing
a *name* that refers to the object.  These names are called
**variables** (although we'll get more precise about that later).

.. note::

    A new name is introduced in a program in a **declaration**.

It is common for these two tasks--declaring a new name, and
creating a new object--to go together, and Java provides a convenient
way for us to express this two-part pattern:

.. odsafig:: Images/vardecl.png
   :align: center

The is the syntax for declaring a new name and creating a
new ``LightBot`` object. The declaration portion
indicates that the programmer plans to use a ``LightBot``
to help solve the problem at hand.  The programmer must provide an
identifier (or name) for the ``LightBot`` object.

.. note::

   * An **identifier** (or name) in Java should start with a letter, which may be followed by other letters or numeric digits.
   * We will use a **lowercase letter** as the first letter in an identifier when we are giving names to variables or methods.
   * We will use a **capital letter** as the first letter in an identifier when we are giving names to *classes* (a class is a family of objects that all understand the same methods, like ``LightBot``, which represents all the ``LightBot`` objects we can create--they all understand the same seven basic methods).
   * Java also allows underscores (_) and dollar signs ($) to be used in identifiers, but we will not use them in this course.

The **instantiation portion** of the figure above is
a request that the ``LightBot`` object be created.  The
crucial part of the instantiation is the
**constructor**, which is a special
method used only to create new objects.  The constructor in this
figure has the form ``LightBot()``.  It specifies the type
of object we want to create by giving the name of a class--here,
we are creating a new ``LightBot``--followed by a pair of
parentheses.  In Java, parentheses are always used following a name
when you are calling a method or calling a constructor.  Later, we'll
see how values can be provided inside the parentheses to customize
the object that is being constructed.

Suppose we wish to create a new ``LightBot`` and we want
to refer to it by the name ``andy`` (a good name for an
android).  Then we could declare the name ``andy`` and create
the ``LightBot`` with this statement:


.. code-block:: java

    LightBot andy = new LightBot();


We can place this inside our ``myProgram()`` method:


.. code-block:: java

    public void myProgram()
    {
        LightBot andy = new LightBot();

        // ... more goes here ...
    }


While this creates a new LightBot, we haven't said where to place
him in the world.  Suppose we want to add ``andy`` to
the world at location (0, 4).  We can do that using a method that all
world objects understand called ``add()``, like this:

.. code-block:: java

    public void myProgram()
    {
        LightBot andy = new LightBot();
        this.addObject(andy, 0, 4);

        // ... more goes here ...
    }

Now it is time to try out your first program!  If you have
typed these lines into BlueJ's editor, you may notice
that the ``Level3Solution`` icon in BlueJ's main
window has changed so that it has diagonal lines across it.  These
indicate that the source code has been changed--because you typed
new instructions.  Before the computer can execute our program,
however, we first need to convert the source code you wrote into a
form that can be executed by the computer.  Click the "Compile"
button at the top of the editor window (or the "Compile" button
on BlueJ's main window).  This will convert the source
code into a form the computer can execute.  Finally, right-click on
the `Application` class and select "Run JavaFX Application".

OK, it isn't exciting, but you will see a new LightBot created
and added to the level at the coordinates you specified.  You can
use the "Reset" button at the bottom of the window to throw away
the current world and start with a brand new fresh copy, and you
can use "Run" to run your program again.  The "Act" button will
single-step your program, executing one action at a time sequentially
through ``myProgram()`` if you want to see what happens in
super-slow-mo.  Alternatively, use the speed slider to speed up or
slow down how fast the actions are carried out while your code is
running.


Calling Methods on an Object
----------------------------

OK, so we've created a ``LightBot``, but it doesn't
do very much.  How do we request it to carry out actions?
An action statement is a request that an object perform a specific
task.  That task can be either one of the basic action methods that
the object already knows, or it could be a new method that you wrote
yourself.  The syntax of an action statement is:

.. odsafig:: Images/actionstatement.png
   :align: center

An action statement is also called a
**method call** statement, since
it calls a method on an object.  The *identifier* to the left of
the dot identifies which object will receive the message--that is,
which object are we asking to perform the desired action.  The object
that is receiving the message (the object we are calling the method
on) is called the **receiver**.
The *methodName* indicates which method we are asking the
object to perform.  A method call in Java always includes a pair
of parentheses after the method name.  For methods that require
extra information to do their job, we place the extra information
between the parentheses (the *parameters* to the method).
None of our ``LightBot`` methods require any extra
information, so all of their parentheses will be
empty--\ **but the parentheses are still required**.

So if we want ``andy`` to move forward, we can write the
corresponding action statement like this:

.. code-block:: java

    andy.move();

This method call consists of three key parts: the *receiver*
to the left of the dot, the *method name* to the right of the
dot, and the *parentheses* after the method name.  In addition
to these three parts, notice the **semicolon** at the
end of the line.  Just like the declaration and instantiation statement
we used to introduce the name ``andy``, all statements in
Java end in a semicolon.  Don't leave it off--it tells the computer
where each statement ends.


Putting it All Together
-----------------------

We can add the method call we just wrote to ``myProgram()``
like this:

.. code-block:: java

    public void myProgram()
    {
        LightBot andy = new LightBot();
        this.addObject(andy, 0, 4);

        andy.move();

        // ... more goes here ...
    }


If you make this change, compile your code, and then run it, you
will see the robot be created and placed in its starting location, and
then move one square forward.  To complete our solution, ``andy``
needs to jump up on the wall, and then jump down:

.. code-block:: java

    public void myProgram()
    {
        LightBot andy = new LightBot();
        this.addObject(andy, 0, 4);

        andy.move();
        andy.jump();
        andy.jump();

        // ... more goes here ...
    }


Finish writing the rest of the instructions for ``andy``
so that he can light up all the blue tiles.


We All Make Mistakes: Errors Happen
-----------------------------------

As you start writing more complex programs, you'll inevitably encounter
**syntax errors** (or **compiler errors**). These are like grammatical mistakes
in human language; the computer simply can't understand what you mean. The good
news is that your programming environment, BlueJ, and the Java compiler are
designed to help you find these errors. When you click *Compile*, if there's an
issue, BlueJ will often highlight the line where it thinks the error occurred
and provide a message at the bottom of the edit window.

Common syntax errors to look out for include:

* **Missing Semicolons**: Remember, almost all statements in Java must end with
  a semicolon ``;``. Forgetting one is a very common mistake!

  Incorrect: ``andy.move()``
  
  Correct: ``andy.move();``

* **Mismatched Parentheses**: Method calls (and constructors) always require a
  pair of parentheses ``()`` after the method name. Make sure you have both an
  opening ``(`` and a closing ``)``.

  Incorrect: ``andy.turnRight(``
  
  Correct: ``andy.turnRight();``

* **Typographical Errors (Typos)**: Even a single misspelled word in a method
  name (e.g., ``and.move();`` instead of ``andy.move();``) will cause an error
  because the computer won't recognize the command. Pay close attention to
  spelling and capitalization.

* **Missing Braces**: Method bodies start with an opening brace ``{`` and end
  with a corresponding closing brace ``}``. Ensure these are correctly paired.

When you encounter an error:

1. **Read the error message**: Don't just dismiss it. The message often gives
   clues about what went wrong and where.
2. **Look at the highlighted line or line number**: BlueJ usually tells you the
   line where it detected the error. Start your investigation there. But
   remember that the actual problem could be earlier in the code.
3. **Check for common mistakes**: Review the syntax rules for semicolons,
   parentheses, and braces on and around the indicated line.
4. **Work backward**: If the error message isn't clear, look at the code before
   the indicated line, as sometimes an error earlier in the code can cause a
   later line to appear incorrect.

Learning to debug is a fundamental programming skill. It's like being a
detective, piecing together clues to solve a mystery!


A Word on Making Code Easy to Read
----------------------------------

When programmers write source code, they must pay particular
attention to making it easy to read for other people.  Most programmers
work in groups, and other programmers need to pick up and work with
existing code that may have been written by others a while ago--weeks,
months, or even many years ago.  As a result, it is crucial that
source code be easy for other people to read.

One way we make our code easy to read is by choosing meaningful
names for all our identifiers.  For example, ``Level3``
represents the layout of Level 3 in the LightBot game, and
``Level3Solution`` represents a solution to that specific
level layout.  Similarly, the method names for the behaviors that
LightBots can perform are things like ``move()``,
``jump()``, ``turnLeft()``, and so on.  The names
are chosen to match the behaviors so that little or no explanation
is necessary.

Another important tool in making source code easy to read is
is **commenting**.

.. note::

    A **comment** is a textual
    note included in source code for the benefit of other (human)
    readers.  Coments have no effect on how the program is executed
    or how the computer behaves.


Some comments are critically important in source code because
they explain to other programmers *how to use* a method
or a class.  In many programming languages, including Java, there
are established conventions for writing these comments so that
documentation about how to use your code can be automatically
generated.  You'll see plenty such documentation later, but for
now let's get our toes wet with the basics.


.. code-block:: java

    // A pair of slashes side by side marks the beginning of a Java comment.
    // Everything after them, including the two slashes themselves, is a comment.

    // Sometimes, // is used to place a comment on the end of a line
    // that also contains something else.  But more commonly, we'll see
    // double-slash comments as single-line comments on a line by
    // themselves.

    /*
     * It is also possible to write a multi-line comment in Java by
     * starting it with a slash followed by an asterisk (/*).  Everything
     * from this marker onward, across as many lines as you want, makes up
     * a single comment.  The comment ends with a matching asterisk followed
     * by a slash, like this:
     */

    // Finally, in Java there are specially marked comments that appear
    // just before a name is declared, providing documentation about what
    // that name means and how it is used.  All the comments above are
    // plain old comments that mean nothing outside of the source file
    // where they are written.  The following comment describes the purpose
    // of a method, however, and can be used to generate documentation for
    // it:

    /**
     * This comment describes the purpose of this method.  It is called a
     * Javadoc comment.  You can tell it is different from other comments
     * because it starts with "/**", instead of just "/*".  You should
     * include this kind of comment just before each method you write, and
     * just before each class you write.  It should describe the meaning/purpose
     * of what immediately follows--here, the method called doSomething().
     * The Javadoc comment should also explain how to use the method or
     * class it describes.
     */
    public void doSomething()
    {
        // ...
    }


For now, remember that you must include a Javadoc comment
(that is, a description) for each method you write and for each
class you write.  We'll try to make this easier for you as we
start, but it is a habit you'll have to become accustomed to
(and that will serve you well!).

A third important tool for making code easy for others to read
is **indentation**.  Programmers
use white space at the beginning of lines to show structure in
their source code.  You may have noticed that each of the methods
shown in this Chapter starts with an opening brace ({), also called
a left brace, a curly brace, a curly bracket, or just a curly.  Each
method also ends with a corresponding closing brace (}).  Statements
between these braces are *inside* the method--they are the
statements that define what behavior occurs when the method is called.
Because they are *inside* the braces (that is, *inside*
the method body), we put extra spaces at the beginning of each line
to show this nesting.

In this class, we will use all space characters to indent our code.
We will indent lines that are "contained within" a larger structure
by four spaces.  You'll see that the editor automatically tries to
help you keep this indentation habit as you write code, but it won't
force you.  Ultimately, you are responsible for making your code
look clean, neat, and readable.

You've learned that choosing meaningful names for all our identifiers is
crucial for writing readable code. But beyond being meaningful, programmers
also follow specific naming conventions, like using a lowercase letter as
the first letter for variables or methods (``andy``, ``move()``) and a
capital letter for classes (``LightBot``). This isn't just about aesthetics;
these conventions serve important purposes:

* **Clarity and Consistency**: When everyone follows the same conventions, it
  makes code instantly recognizable and understandable, even if you're reading
  code written by someone else months or years later. It's like having a
  universal sign language for programmers.
* **Readability at a Glance**: The capitalization helps you immediately
  distinguish between different types of programming elements. For instance,
  seeing ``LightBot`` with a capital "L" tells you it's likely a class (a
  blueprint for objects), while ``andy`` with a lowercase "a" tells you it's
  an instance of that class (a specific object).
* **Reduces Ambiguity**: Consistent naming prevents confusion. If ``Move()``
  and ``move()`` were both allowed for the same action, it would be unclear
  which one to use.
* **Industry Standard**: These conventions (often called "camelCase" for
  variables/methods and "PascalCase" for classes) are widely adopted in the
  Java community and many other programming languages. Adhering to them makes
  your code look professional and facilitates collaboration in team environments.
* **Tooling Support**: Many Integrated Development Environments (IDEs) like
  BlueJ are designed with these conventions in mind, sometimes offering
  auto-completion or error hints based on expected naming patterns.

Developing the habit of using correct and meaningful naming conventions from
the start will significantly improve the quality and maintainability of your
code as you progress in your programming journey.


Comparing Visual and Textual Programming
----------------------------------------

You've experienced two different ways to create programs with LightBot: using
the visual, iconic interface and writing textual Java-like code. Both achieve
the same goal--controlling the robot--but they represent different approaches
to programming.

* **Iconic Programming (e.g., LightBot's drag-and-drop):**

  - **Advantages:**
  
    * **Beginner-Friendly**: Very intuitive for new learners, as it removes the
      burden of syntax and typing, allowing focus on logic.
    * **Immediate Visual Feedback**: You can see the robot's actions directly
      correspond to the icons you place, making it easy to understand the
      flow of control.
    * **Reduced Errors**: Eliminates syntax errors since you're selecting
      pre-defined actions.

  - **Disadvantages:**

    * **Limited Complexity**: Becomes cumbersome for very large or complex
      programs due to the visual space and number of available icons.
    * **Less Flexible**: You're limited to the pre-defined actions and
      structures provided by the visual environment.
    * **Not Industry Standard**: Real-world programming primarily uses
      textual languages.

* **Textual Programming (e.g., Java):**

  - **Advantages:**

    * **Highly Expressive and Flexible**: Allows for much more complex and
      nuanced logic, as you can write almost anything you can imagine.
    * **Scalable**: Textual code is easier to manage, read, and organize for
      large-scale projects.
    * **Industry Standard**: The skills you learn in textual programming are
      directly transferable to professional software development.

  - **Disadvantages:**

    * **Steeper Learning Curve**: Requires strict adherence to syntax rules,
      which can be challenging for beginners (e.g., remembering semicolons,
      parentheses, etc.).
    * **Abstract**: The connection between the code and the program's behavior
      isn't always immediately visual, requiring more mental modeling.
    * **Prone to Typos**: Small errors can lead to compilation issues.

LightBot's iconic interface is an excellent tool for understanding fundamental
computational thinking--sequencing, use of methods or functions (through f1/f2),
and problem-solving. Textual Java then builds on this by introducing the
precise language and structure needed for real-world software development,
giving you greater control and power over your programs.



The Jeroos of Santong Island
----------------------------

Now that you have explored fundamental computational thinking and textual Java
using LightBot, you are ready to transition to our primary micro-world:
**Santong Island** and the **Jeroo** simulation. The concepts of classes,
objects, instantiation with ``new``, and method invocation using dot notation
apply directly to commanding Jeroos on their island grid.

Welcome to Santong Island
~~~~~~~~~~~~~~~~~~~~~~~~~

.. odsafig:: Images/jeroo.png
   :align: center

Santong island is an uninhabited speck of land in the South
Pacific Ocean.  In the late 1980's, naturalist Jessica Tong discovered
two previously unknown species that are unique to this island.  One
is the **jeroo**, a rare mammal
similar to the wallabies of Australia.  The other is the large
**winsum flower** that is the
jeroo's primary food source.

Like its distant Australian relative, the jeroo moves by hopping,
but its movements are unique in all of nature.  Each jeroo only
moves in one of the four main compass directions, and only turns in
90 degree increments.  This unusual behavior continues to mystify
Jessica and the few other researchers who have observed jeroos in
the wild.  Some believe that this behavior is somehow related to
geomagnetic forces, but others think that this is just a bizarre
learned behavior.

Every jeroo has a pouch, but the male's pouch is somewhat smaller.
While the female uses her pouch to protect and nuture her offspring,
both sexes use their pouches to carry winsum flowers that they have
picked.

During the rainy season, January through December, sudden storms
can create temporary lakes and rivers, or even alter the shape of the
island itself.  Despite living on Santong island for uncounted
millennia, the jeroos are extremely poor swimmers.  While they are
keenly aware of their immediate surroundings, jeroos can be careless.
If one happens to hop into the ocean, its fur becomes waterlogged and
it must rest in the sun for a few hours before resuming its normal
activity.  In what can only be described as a telepathic connection,
all other jeroos also cease their activities until the wet jeroo
has recovered.

Until recently, the jeroos were safe from human interference because
they were only known to a handful of researchers and because Santong
island is very small, very remote, and missing from most maps.  The
jeroo's idyllic world was interrupted in 2001, when Brian arrived at
the island.  Brian is a renowned collector who was hired to capture
a jeroo for the extreme animal exhibit at Missouri's C. A. Baret zoo.
Having studied the jeroos' unique patterns of movement, Brian
periodically sets nets in the locations that a jeroo is likely to
visit.  Fortunately, the sensitive jeroos can detect his nets, and
have learned that tossing a winsum flower onto a net will disable the
net and make that location safe for future travel.  Brian can only
catch a careless jeroo that leaps before it looks.


A Jeroo Simulator
~~~~~~~~~~~~~~~~~

After returning from a recent trip to Santong island, Jessica asked
her colleague, Deanna, to develop a simulator that could be used to
demonstrate the jeroos and their relationship with their island.
The result of Deanna's work is a computer program written in Java
to help Jessica with her research.  The program provides a micro-world
representation of Santong island and shows the behavior of one or
more jeroos on the island.

When Deanna designed the simulator, she used the jeroo's unique
movements to model the island as a grid, where the x-axis runs
from West to East along lines of lattitude, and the y-axis runs
from North to South along lines of longitude.  Each element (cell)
of this model corresponds to a location where a jeroo might land
when it hops.

Deanna chose to number both the x-coordinates and y-coordinates
by starting with zero at the northwest corner of the map containing
the island (her maps included the water immediately surrounding the
island).  When asked why she started at zero, Deanna said that she was
counting the
number of safe hops from any location to the northwest corner.
We will use the notation (*x*, *y*) to indicate a
specific cell, where *x* represents the horizontal position of
the cell and *y* represents the vertical position of the
cell.


Jeroo Action Methods
~~~~~~~~~~~~~~~~~~~~

Two of the Java classes in Deanna's simulation are ``Island``
and ``Jeroo``.  The ``Island`` class is a world
subclass that represents the island map, while the ``Jeroo``
class is an actor subclass.  There are also ``Flower``,
``Net`` and ``Water`` classes to represent other
objects on the island.
There as seven action methods that a ``Jeroo`` understands
(three of them require an argument value):

.. raw:: html

   <table class="table docutils align-default">
   <tr><th>Method</th><th>Purpose</th><th>Example</th></tr>
   <tr><td><code>hop()</code></td><td>Hop one space ahead.
   The program terminates with a logic error if the hopping Jeroo
   lands in the water, lands on another Jeroo, or hops onto a net.
   A Jeroo can hop onto a flower.</td>
   <td><code>jessica.hop();</code></td></tr>
   <tr><td><code>hop(<i>number</i>)</code></td><td>Hop <i>number</i> times
   in a row, where <i>number</i> is a positive integer.</td>
   <td><code>jessica.hop(3);</code><br/>
   <code>jessica.hop(12);</code></td></tr>
   <tr><td><code>pick()</code></td><td>Pick a flower from the current
   location. Nothing happens if there is no flower at the current
   location.</td><td><code>jessica.pick();</code></td></tr>
   <tr><td><code>plant()</code></td><td>Plant a flower at the current
   location. Nothing happens if the jeroo does not have a flower to
   plant.</td><td><code>jessica.plant();</code></td></tr>
   <tr><td><code>toss()</code></td><td>Toss a flower one space ahead.
   The tossed flower is lost forever.
   If the flower lands on a net, the net is disabled.</td>
   <td><code>jessica.toss();</code></td></tr>
   <tr><td><code>turn(<i>relativeDirection</i>)</code></td><td>Turn in the
   indicated direction [&nbsp;<code>turn(AHEAD)</code> and
   <code>turn(HERE)</code> are meaningless&nbsp;]</td>
   <td><code>jessica.turn(LEFT);</code><br/>
   <code>jessica.turn(RIGHT);</code></td></tr>
   <tr><td><code>give(<i>relativeDirection</i>)</code></td><td>Give a flower
   to a neighboring Jeroo in the indicated direction.   Nothing happens
   if the giving Jeroo has no flowers, or if there is no neighboring
   Jeroo in the indicated direction.  [&nbsp;<code>give(HERE)</code> is
   meaningless&nbsp;]</td>
   <td><code>jessica.give(LEFT);</code><br/>
   <code>jessica.give(RIGHT);</code><br/>
   <code>jessica.give(AHEAD);</code></td></tr>
   </table>


Direction
"""""""""

Each Jeroo knows four relative directions and four compass
directions as shown in the following table.  Each direction must be
written in UPPER CASE (In Java, constant values that never change are
usually written this way).  The relative direction ``HERE``
refers to the Jeroo's current location, so it isn't useful with the
action methods in the previous section (we'll see other methods later
where ``HERE`` makes sense).

.. raw:: html

   <table class="table docutils align-default">
   <tr><th>Relative Directions</th><th>Compass Directions</th></tr>
   <tr><td><code>LEFT</code></td><td><code>NORTH</code></td></tr>
   <tr><td><code>RIGHT</code></td><td><code>EAST</code></td></tr>
   <tr><td><code>AHEAD</code></td><td><code>SOUTH</code></td></tr>
   <tr><td><code>HERE</code></td><td><code>WEST</code></td></tr>
   </table>


Attributes
""""""""""

When designing an object to represent something, we must select
facts about that thing that are relevant to the problem we are trying
to solve.  For example, the title of a book would be important to a
bookstore, but not to the company that shipped the book from the
publisher's warehouse.  On the other hand, the weight of the book
would be important to the shipper, but not to the bookstore.  Facts
such as the title or weight of a book are called attributes.


.. note::

   An **attribute** is a fact
   associated with a specific object.

The attributes of a ``Jeroo`` object include its location,
the number of flowers in its pouch, and the direction it's facing.
When we instantiate a class, the class'
**constructor** is responsible for
initializing the new object's attributes.  So when we create a
``Jeroo`` object, its constructor is responsible for
initializing the number of flowers in its pouch and
the direction it's facing--it' position is set when you add it to the world.
If we do not specify a value
for one (or more) of the attributes when we create the jeroo, the
constructor provides defaults for us.

As a convenience, the ``Jeroo`` class provides
**multiple constructors** so that we can omit (or provide)
values we want for any of these attributes.  All but one of the
constructors allow us to provide values for just some of the
attributes.  The constructors are summarized in the following
table:

.. raw:: html

   <table class="table docutils align-default">
   <tr><th>Example</th><th>Attributes</th></tr>
   <tr><td>
   <pre>
   // Accept all defaults
   Jeroo jessica = new Jeroo();
   </pre></td><td><table>
   <tr><td class="r">Direction:</td><td><code>EAST</code></td></tr>
   <tr><td class="r">Flowers:</td><td>0</td></tr>
   </table></td></tr>
   <tr><td>
   <pre>
   // Specify just the flowers
   Jeroo jessica = new Jeroo(8);
   </pre></td><td><table>
   <tr><td class="r">Direction:</td><td><code>EAST</code></td></tr>
   <tr><td class="r">Flowers:</td><td>8</td></tr>
   </table></td></tr>
   <tr><td>
   <pre>
   // Specify just the direction
   Jeroo jessica = new Jeroo(WEST);
   </pre></td><td><table>
   <tr><td class="r">Direction:</td><td><code>WEST</code></td></tr>
   <tr><td class="r">Flowers:</td><td>0</td></tr>
   </table></td></tr>
   <tr><td>
   <pre>
   // Specify both attributes
   Jeroo jessica = new Jeroo(WEST, 8);
   </pre></td><td><table>
   <tr><td class="r">Direction:</td><td><code>WEST</code></td></tr>
   <tr><td class="r">Flowers:</td><td>8</td></tr>
   </table></td></tr>
   </table>

The equal sign between the declaration and instantiation portions
indicates that the newly created Jeroo object is to be associated with
the identifier in the declaration portion.


Creating Jeroos on an Island
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An instance of the ``Island`` class is pretty plain:

.. odsafig:: Images/island.png
   :align: center

This island is completely bare, with no jeroos, no flowers, and a
pretty basic shape.  But to **change the behavior of a library
class**, we need to **create our own version of the
class**.  We do this by defining a
**subclass**.  A subclass
**inherits** all the features of
the class it is based on.  That means it understands all of the
methods of the original class, and may add more of its own.  We
create a subclass using this basic pattern:

.. code-block:: java

    public class NewClassName
        extends ExistingClassName
    {
        ...
    }


The keywords ``public class`` indicate that we are
introducing a brand new *class* that can be used anywhere
in our code (i.e., it is "public"ly available for use elsewhere).
The *NewClassName* is the name of the new class we are defining,
and the *ExistingClassName* is the name of the class we want
to build on.  The keyword ``extends`` is what indicates that
our new class is a *subclass*.  Whenever you use
``extends``, you are saying that the class you are declaring
*inherits* all the features from another existing class.

.. note::

   A **subclass** is a class that
   **inherits** all the methods and
   attributes of another class, called its
   **superclass**.

.. note::
   The terms **derived class**
   and **child class** are different
   names for **subclass**.

.. note::
   The terms **base class**
   and **parent class** are different
   names for **superclass**.

In BlueJ, we can create a new subclass from the
``Island`` class by clicking the "New Class..." button in BlueJ's
main window.  In the resulting new class dialog, enter the name for your
new class, select "Island subclass", and click the "OK" button.
This action will create a new class and an
associated source file for you, and fill it with the required
starting content (including  some comments and placeholders).

.. note::
   In Java, the source code for a given class is stored in a plain text
   file that has **the same name as the class** with ".java"
   added on the end. The file name must be capitalized exactly the same
   way as the class name.

When you create a new subclass in BlueJ, the generated
class will already have a
**constructor**. a constructor is
a special kind of method that is used only to initialize a brand new
object.

.. note::
   A **constructor** is
   a special kind of method that is used to initialize a brand new
   object.

In the constructor for our island subclass, you can define the island's
dimensions and put any
actions you would like to perform when the island is created--such
as populating it with some flowers, or placing water in new
locations.

We can also say what we wish to happen when the **Run button
is pressed** by adding a ``myProgram()`` method.  You
can add this to your island subclass:

.. code-block:: java

   public void myProgram()
   {
       Jeroo jessica = new Jeroo(8);
       this.addObject(jessica, 3, 4);

       //  Give instructions to your jeroo to carry out here
   }


Any actions you place in ``myProgram()`` will be executed
when the "Run" (or the "Act") button
is pressed.

.. admonition:: Try It Yourself

   Create an ``Island`` subclass and add the
   ``myProgram()`` method sketched above to it.  Replace
   the comment in ``myProgram()`` with instructions to
   have the jeroo ``jessica`` plant a row of three flowers
   from (3, 4) to (5, 4).


Building Your Skills Through Practice
-------------------------------------

Learning to program is a skill built through deliberate practice and experimentation.
The following **optional, ungraded resources** are designed to help you reinforce
key concepts, build fluency, and prepare for upcoming
quizzes, labs, and programming assignments.

* `Java Syntax Practice 1 <https://codeworkout.cs.vt.edu/courses/vt/cs1114/fall-2026/14391>`__ : Build
  confidence and muscle memory with rapid, bite-sized drills focused on syntax
  rules and basic language mechanics. *Especially recommended if you are new to programming.*
 

Programming Practice 1
----------------------

The following exercises provide basic practice in writing solutions to
simple problems using the concepts in this module.

.. extrtoolembed:: 'Programming Practice 1'
   :workout_id: 1323


.. raw:: html

   <p>&nbsp;</p>
   <footer style="border-top: 1px solid #777;"><div class="footer">
     Selected content adapted from:<br/>
     <a href="https://www.jeroo.org/docs/JerooDocJava.pdf">Introduction to Jeroo</a> by D. Sanders and B. Dorn,
     used by permission.<br/>
     <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
     licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
     <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
     licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
   </div></footer>   


