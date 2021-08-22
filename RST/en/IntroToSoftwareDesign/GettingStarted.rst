.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Installing BlueJ
================

Follow the instructions on Canvas to `Install BlueJ <https://canvas.vt.edu/courses/135890/pages/install-bluej>`_.



What is a Micro-World?
----------------------


Introducing LightBot
--------------------

LightBot is a very simple robot programming simulation game. It runs right in
your web browser, and looks like this:

.. odsafig:: Images/LightBotLevel2.png
   :align: center

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

    Play the first two levels of LightBot to try things out here:

    `LightBot <https://www.lightbot.lu/>`_

    Be sure your browser window is tall enough to see the "Instructions" label
    in the upper right of the game.

The LightBot game illustrates several basic programming concepts. The robot
itself is an **object**, and we can request it to perform specific actions that
it knows how to carry out. We can write a series of these requests down as
a **program**. The series of actions that we write down is a plan for solving
a specific problem (an **algorithm**).


From LightBot to Micro Worlds
------------------------------

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


.. avembed:: Exercises/IntroToSoftwareDesign/Week1Quiz1.html ka


A Bit More LightBot
-------------------

If you only played the first two levels of LightBot, there's definitely more
interesting stuff you haven't seen! As the levels progress, the puzzles get
more complicated. They are harder to solve using the limited number of slots
in the program memory for the little robot. Fortunately, the LightBot game
provides a few more icons for you to use: f1 and f2.
The f1 and f2 icons represent the two functions (icon areas) below the main
method in the LightBot game. These two functions are where you will place
instructions that the robot will need to perform multiple times. Anywhere
you place the f1 or f2 icon, the robot will perform the entire sequence of
actions associated with that function. This will allow you to build more
complex programs which are necessary to solve the more challenging tasks in
the later levels.

.. admonition:: Exercise 2

    Return to the LightBot game above in Exercise 1. Continue to play through Level 7. Once you have completed Level 7, stop. You'll return to finish Level 8 in the next exercise.



Textually Representing Programs
-------------------------------

Computer programs are most often written in textual form--in fact, one of the most important goals of programming is to write programs so that they communicate well to *other people*. So let's look at how we can represent LightBot puzzle solutions as text.

At its most basic, a computer program is simply a sequence of instructions for a computer to follow. Our LightBot level solutions are just that: programs. All we need in order to write them textually is names that correspond to the icons. For example, if we call our little robot :code:`andy`, we could use the following names to correspond to his icons (from left to right):


* :code:`andy.move()`
    .. odsafig:: Images/LightBotCommandMove.png
       :width: 50
       :align: left
       :capalign: justify
       :figwidth: 90%

* :code:`andy.turnRight()`
   .. odsafig:: Images/LightBotCommandTurnRight.png
      :width: 50
      :align: left
      :capalign: justify
      :figwidth: 90%

* :code:`andy.turnLeft()`
   .. odsafig:: Images/LightBotCommandTurnLeft.png
      :width: 50
      :align: left
      :capalign: justify
      :figwidth: 90%

* :code:`andy.jump()`
   .. odsafig:: Images/LightBotCommandJump.png
      :width: 50
      :align: left
      :capalign: justify
      :figwidth: 90%

* :code:`andy.turnLightOn()`
   .. odsafig:: Images/LightBotCommandTurnLightOn.png
      :width: 50
      :align: left
      :capalign: justify
      :figwidth: 90%

* :code:`andy.f1()`
   .. odsafig:: Images/LightBotCommandF1.png
      :width: 50
      :align: left
      :capalign: justify
      :figwidth: 90%

* :code:`andy.f2()`
   .. odsafig:: Images/LightBotCommandF2.png
      :width: 50
      :align: left
      :capalign: justify
      :figwidth: 90%

Each action is phrased as a request to an object that performs the desired behavior. So each request goes to our robot, :code:`andy`. For example, consider Level 2:

.. odsafig:: Images/LightBotLevel2.png
   :align: center
   :capalign: justify
   :figwidth: 90%

One solution to this level is:

.. codeinclude:: IntroToSoftwareDesign/LightBotSolution


.. admonition:: Exercise 3

    **To Turn In** Return to the LightBot game above in Exercise 1. Complete Level 7 if you have not already done so. Once you have completed Level 7, think carefully about your solution for Level 8. Compose your solution for Level 8 but don't run it yet. **Write down your solution for Level 8 in textual form:**

      .. code-block:: java

        main:
          put your instructions here
        f1:
          put your instructions here
        f2:
          put your instructions here

    After writing down your solution, then run it. If it does not work the way you planned, revise it and revise your textual version, too before running it again. Your goal is to have a textual representation of your final solution to Level 8, which will be your answer to this Exercise.


Exercises
---------
.. avembed:: Exercises/IntroToSoftwareDesign/Week1Quiz2.html ka


Moving from Micro Worlds to Programming
---------------------------------------


What Does LightBot Say About Programming?
------------------------------------------

The LightBot game illustrates several basic programming concepts:


* Object

* Method

* Method Call

* State

* Algorithm

* Program

* Source Code

* Interpreter


In this course, we are going to focus on learning **object-oriented programming** in Java. This section describes several general concepts about object-oriented programs that we have seen in this first example. As you read subsequent chapters, refer back to this chapter to review the meaning of important words and phrases.


Object-Oriented Programming (From Java, Java, Java!)
----------------------------------------------------

A Java program, and any object-oriented program, is a collection of interacting objects that models a collection of real-world objects. Think of the model that a kitchen designer might use to layout your new kitchen It will contain objects that represent the various kitchen appliances and cabinets. Each object in the model is a simplified version of the corresponding real object. For example, a rectangle might be used to represent the refrigerator.

.. odsafig:: Images/KitchenModel.png
   :width: 200
   :align: center
   :capalign: justify
   :figwidth: 90%

A kitchen model is mostly *static* It doesn’t change. Once put into place, its various objects just stand there in a certain relation to each other. By contrast, a computer program is *dynamic* It doesn’t change. Once put into place, its various objects just stand there in a certain relation to each other. By contrast, a computer program is *anthropomorphic* , a big word that means “like people.” If we are eating together and I want you to pass me the salt, I say, “Please pass me the salt,” and you invariably comply. Similarly, when you (Student X) put your ATM card into an ATM machine, the ATM object asks the bank’s database object “Give me Student X’s bank account object” and the database invariably complies. If you tell the ATM you want to withdraw $100 dollars it tells your bank account object to deduct $100 from your current balance. And so it goes. Both you and your bank account are changed objects as a result of the transaction.

So what is an object? Just as in the real world, an object is any thing whatsoever. An object can be a physical thing, such as a :code:`Car`, or a mental thing, such as an :code:`Idea`. It can be a natural thing, such as an :code:`Animal`, or an artificial, human-made thing, such as a :code:`ATM`. A program that manages an ATM would involve :code:`BankAccounts` and :code:`Customer` objects. A chess program would involve a :code:`Board1 object and :code:`ChessPiece` objects.




Exercises
---------

.. avembed:: Exercises/IntroToSoftwareDesign/Week1Quiz3.html ka




Reading Quiz
------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week1ReadingQuizSumm.html ka


Week 1 Syntax Drills
--------------------

.. extrtoolembed:: 'Week 1 Syntax Drills'
   :workout_id: 1308
