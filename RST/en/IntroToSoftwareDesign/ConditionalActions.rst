.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Conditional and Repeating Actions
=================================

Selection
---------

The methods that we have written thus far have a common
characteristic--\ **sequential execution**. Sequential execution means that
the statements are executed one after another in the order that they appear
in the source code. In this chapter, we will learn how to create a block of
statements that we can either execute or skip, as well as how we can choose
to execute one of multiple alternative blocks of statements.

A **control structure** is a feature of a programming language that determines
the order in which statements will be executed. There are three categories of
control structures: (1) sequential structures, (2) selection structures, 
and (3) repetition structures (also called loops).

Sequential structure is the default structure that is used by most
object-oriented programming languages: putting one statement after the
other, in sequence. Unless we indicate otherwise, the statements will be
executed in the order that they appear in the source code, and each statement
will be executed exactly once. Every program that we have seen thus far uses
nothing but sequential structure.

A **condition** is a crucial part of the selection structures and the
repetition structures. A condition is any expression that can be either true
or false.

.. note::
   A **condition** is any expression that can be true or false.

Every **selection structure** defines two or more alternate paths through
the source code. There are three important selection structures: an
if-then-else structure, an if-then structure, and a multi-way branching
structure.

An **if-then-else** structure (sometimes called an if-else structure) is the
most fundamental selection structure, since it can be used to form any choice
pattern possible. An if-then-else structure defines two different blocks of
statements, only one of which will be executed.

An **if-then** structure (sometimes called simply an if structure) is a special
form of if-then-else where only one block of statements is provided and the
second block of statements is omitted. As a result, an if-then structure
defines an optional block of statements, where the block is either executed or
skipped.

A **multi-way-if** structure (sometimes called a multi-way branching
structure) defines several different blocks of statements, only one of which
will be executed. Java also has a **switch** structure to create a multi-way
branching structure, but we'll learn about it later.


Conditions Using Sensor Methods
-------------------------------

The ``Jeroo`` class provides a number of *sensor methods* that can be used to
ask a Jeroo something about its immediate surroundings. Each sensor method has
either a true or a false result. Any method that produces either true or false
as a result is called a **boolean method** (also called a **predicate**).
More generally, any expression that is either true or false is called
a ``boolean`` expression (named after
`George Boole <https://en.wikipedia.org/wiki/George_Boole>`_ ). This means
that the conditions that are used in various control structures are, in
fact, ``boolean`` expressions.

.. note::
   Any method that produces either true or false as a result is called
   a **boolean method**, also known as a **predicate**.

For Jeroos, the sensor methods are the basic building blocks for creating conditions. The simplest way to create a condition is to invoke a sensor method. The table below lists all of the sensor methods provided by the ``Jeroo`` class. These methods can only be used to construct conditions. Since they are methods, they are invoked by sending a message to a ``Jeroo`` object.


.. list-table:: Sensor Methods
   :header-rows: 1

   * - Method
     - Purpose
     - Example
   * - ``hasFlower()``
     - Does this Jeroo have any flowers?
     - ``dean.hasFlower()``
   * - ``isClear(relativeDirection)``
     - Is there a clear space in the indicated direction? A clear space contains no flower, no net, no water, and no Jeroo. [``isClear(HERE)`` is meaningless]
     - ``dean.isClear(LEFT)``
   * - ``isFacing(compassDirection)``
     - Is this Jeroo facing in the indicated direction?
     - ``dean.isFacing(NORTH)``
   * - ``seesFlower(relativeDirection)``
     - 	Is there a flower in the indicated direction?
     - ``dean.seesFlower(HERE)``
   * - ``seesJeroo(relativeDirection)``
     - Is there another Jeroo in the indicated direction? [``seesJeroo(HERE)`` is meaningless]
     - ``dean.seesJeroo(AHEAD)``
   * - ``seesNet(relativeDirection)``
     - 	Is there a net in the indicated direction? [``seesNet(HERE)`` is meaningless]
     - ``dean.seesJeroo(RIGHT)``
   * - ``seesWater(relativeDirection)``
     - 	Is there water in the indicated direction? [``seesWater(AHEAD)`` is meaningless]
     - ``dean.seesWater(AHEAD)``


Notably, when you see ``relativeDirection``, your choices of direction
include ``HERE``, ``LEFT``, ``RIGHT``, and ``AHEAD``.  When you
see ``compassDirection``, your choices of direction are: ``NORTH``,
``SOUTH``, ``EAST``, and ``WEST``.


Java's Syntax for the If-Then-Else Structure
--------------------------------------------

.. odsafig:: Images/ifThenElseDiagram2.png
   :align: center

This figure shows the syntax of the *if-then-else* structure in Java. There
are four important things to observe about the syntax.

1. The condition **must** be in parentheses.
2. There is **no semicolon** after the parentheses.
3. There is no semicolon after the keyword ``else``.
4. The *if-then-else* structure is not a method, which means that we do not
   send it as a message to a Jeroo object.

There are three important things to observe about the coding style.

1. Braces are used to define the beginning and end of both the true branch
   and the false branch. *Always include them.*
2. The braces are aligned with the start of the words ``if`` and ``else``.
3. The statements between the braces should be indented (we use 4 spaces).

Example (if-then-else structure)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Have the Jeroo named Timmy check for a net straight ahead. If there is one,
have him disable it and turn around. If there is not a net straight ahead,
Timmy should turn right. After he disables the net and turns around or
simply turns right, Timmy must move one space forward.

.. code-block:: java

    if (timmy.seesNet(AHEAD))
    {
        timmy.toss();
        timmy.turn(LEFT);
        timmy.turn(LEFT);
    }
    else
    {
        timmy.turn(RIGHT);
    }

    timmy.hop();


Self-Check
~~~~~~~~~~
.. avembed:: Exercises/IntroToSoftwareDesign/Week3Quiz1Summ.html ka
    :long_name: Working with If-Then-Else Statements


Syntax Practice 3a: If-Then-Else
--------------------------------

.. extrtoolembed:: 'Syntax Practice 3a: If-Then-Else'
   :workout_id: 1373


Creating Optional Statements With If-then
-----------------------------------------

An **if-then** structure (sometimes called an *if structure*) defines an
optional block of statements. An if-then structure is simply an if-then-else
structure where the second block of statements (the *else* part) has been
omitted, so that the choice becomes whether to execute the first block of
statements *or skip it*.

There are two parts to an if structure, the selection condition and the true
branch. The true branch contains a block of statements that will only be
executed whenever the selection condition is true.

.. odsafig:: Images/ifThenDiagram.png
   :align: center

The figure above shows a generic if-then structure, and uses arrows to show
the order in which statements will be executed. The if structure defines
optional code, and that code is either skipped or executed just once.


Java's Syntax for the If-then Structure
---------------------------------------

.. odsafig:: Images/ifThenDiagram2.png
   :align: center

This figure shows the syntax of the *if-then* structure in Java. There are
three important things to observe about the syntax.

1. The condition **must** be in parentheses.
2. There is **no semicolon** after the parentheses.
3. The if-then structure is not a method, which means that we do not send it
   as a message to a Jeroo object.

There are three important things to observe about the coding style.

1. Braces are used to define the beginning and end of the true branch.
   *Always include them.*
2. The braces are aligned with the start of the word ``if``.
3. The statements between the braces should be indented (we use 4 spaces).


Example (if-then structure)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Have the Jeroo named Jessica check for a net to her right. If there is one,
have her disable it and return to her current state. Whether or not she
disables a net, Jessica should hop one space ahead.

.. code-block:: java

    if (jessica.seesNet(RIGHT))
    {
        jessica.turn(RIGHT);
        jessica.toss();
        jessica.turn(LEFT);
    }

    jessica.hop();


Self-Check
~~~~~~~~~~
.. avembed:: Exercises/IntroToSoftwareDesign/Week3Quiz2Summ.html ka
    :long_name: Working with If-Then Statements


Syntax Practice 3b: If-Then
---------------------------

.. extrtoolembed:: 'Syntax Practice 3b: If-Then'
   :workout_id: 1374


Java's Syntax for the Multi-way Selection Structure (a cascaded if)
-------------------------------------------------------------------

.. odsafig:: Images/multiWayIfDiagram.png
   :align: center

This figure shows a common technique for writing a multi-way selection
structure in Java. Technically, this structure consists of a series of
nested if-then-else statements, but the coding style obscures this fact
and makes the multi-way selection logic more visible. This particular
structure is often called a **cascaded if**.

There are five important things to observe about this structure.

1. The condition **must** be in parentheses.
2. There is **no semicolon** after the parentheses.
3. There is no limit on the number of else-if blocks.
4. The final ``else`` branch is optional.
5. This structure is not a method, which means that we do not send it as
   a message to a Jeroo object.

There are three important things to observe about the coding style.

1. Braces are used to define the beginning and end of the true branch.
   *Always include them.*
2. The braces are aligned with the start of the word ``if`` and ``else``.
3. The statements between the braces should be indented (we use 4 spaces).


Example (multi-way selection structure)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Assume that a Jeroo named Louisa is carrying at least one flower. Have her
check the cell ahead. If that cell contains a flower, pick it. If that cell
contains a net, disable it. If that cell contains water, plant a flower at
the current location. If that cell contains another Jeroo, give that Jeroo
a flower. Finally, if there is nothing in that cell, have her hop once and
turn left.

.. code-block:: java

    if (louisa.seesFlower(AHEAD))
    {
        louisa.hop();
        louisa.pick();
    }
    else if (louisa.seesNet(AHEAD))
    {
        louisa.toss();
    }
    else if (louisa.seesWater(AHEAD))
    {
        louisa.plant();
    }
    else if (louisa.seesJeroo(AHEAD))
    {
        louisa.give(AHEAD);
    }
    else
    {
        louisa.hop();
        louisa.turn(LEFT);
    }


Self-Check
~~~~~~~~~~

.. avembed:: Exercises/IntroToSoftwareDesign/Week3Quiz3Summ.html ka
    :long_name: Deciding When to Use Each Type of Structure


Syntax Practice 3c: Multi-way If
--------------------------------

.. extrtoolembed:: 'Syntax Practice 3c: Multi-way If'
   :workout_id: 1375


Compound Conditions
-------------------

Conditions come in two forms, *simple* and *compound*. A simple condition is
a ``boolean`` expression that does not contain any other ``boolean``
expression. With Jeroos, a simple condition is formed by invoking a single
sensor method. A **compound condition** is created by using logical operators
to combine conditions. The three most commonly used logical operators in Java
are: negation (not), conjunction (and), and disjunction (or). Java uses
special keystrokes for each of these as shown in the following table.

.. list-table:: Operators for conditions
   :header-rows: 1

   * - Operator
     - Java Symbol
     - Meaning
   * - Negation
     - ``!`` (exclamation point)
     - NOT
   * - Conjunction
     - ``&&`` (2 keystrokes; no space between)
     - AND
   * - Disjunction
     - ``||`` (2 keystrokes; no space between)
     - OR

Notably, java recognizes single ``&`` and ``|`` as separate operators (they
have to do with binary math) from ``&&`` and ``||``.  No errors will
be thrown if you mistake one for the other and your code will simply behave
oddly.  Also, ``!`` is a unary operator.  It can modify a single if
statement but not combine two together.

The negation reverses the value of a **boolean** expression, changing true to
false and false to true, as shown in this table:

.. odsafig:: Images/TruthTable1.png
   :align: center

In this table, **P** represents an arbitrary boolean expression. The two rows
underneath **P** show its possible values. The second column shows the
corresponding values for the expression **!P**, where the negation operator
is applied to the boolean expression.

The conjunction operator (``&&``, representing logical AND) combines two
boolean expressions to create a third that is only true when both of the
original expressions are true:

.. odsafig:: Images/TruthTable2.png
   :align: center

In this table, **P** and **Q** represent arbitrary boolean expressions. The
rows underneath **P** and **Q** show all possible combinations of their
values. The third column shows the corresponding values for ``P && Q``.

The disjunction operator (``||``, representing logical OR) combines two
boolean expressions to create a third that is only false when both of the
original expressions are false:

.. odsafig:: Images/TruthTable3.png
   :align: center

In this table, **P** and **Q** once again represent arbitrary boolean
expressions. The rows underneath **P** and **Q** show all possible combinations
of their values. The third column shows the corresponding values for the
expression ``P || Q``.


Examples (compound conditions)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Remember that these are expressions that could be either true or false.
The statement:

.. code-block:: java

    boolean x = false;

definitively sets the boolean variable x to false.  It is similar to the
English statement "the variable x is false".  It is a statement of a fact.

If statements are more like a question:

.. code-block:: java

    martha.seesNet(AHEAD)

This expression is more like a question.  "Does the jeroo see a net ahead of them?"  It could be answered yes or no, but it's not a statement of a fact in the same way.


.. list-table:: Operators for conditions
   :header-rows: 1

   * - Boolean Expression (Java-style)
     - English Translation (if true)
   * - ``!bob.seesNet(AHEAD)``
     - There is not a net ahead of Bob
   * - ``bob.hasFlower() && bob.isClear(LEFT)``
     - Bob has at least one flower and there is nothing in the cell
       immediately to the left of Bob.
   * - ``bob.seesWater(AHEAD) || bob.seesWater(RIGHT)``
     - There is water ahead of Bob or to the right of Bob, or both
   * - ``bob.isFacing(WEST) &&(!bob.seesNet(AHEAD))``
     - Bob is facing west and there is no net ahead


Self-Check
~~~~~~~~~~

.. avembed:: Exercises/IntroToSoftwareDesign/Week3Quiz4Summ.html ka
   :long_name: AND, OR, and NOT


Syntax Practice 3d: Compound Conditions
---------------------------------------

.. extrtoolembed:: 'Syntax Practice 3d: Compound Conditions'
   :workout_id: 1376


Repeating Actions
-----------------

In the previous sections, we learned how to use an if-then-else or if-then
structure to decide which action to perform. In this section, we will learn
how to create a block of statements that can be executed several times in
succession. We do this using a repetition structure (also called a loop),
which is one of the fundamental control structures supported by most
imperative and object-oriented programming languages.

A **repetition structure** (or **loop**) allows a group of statements to be
executed several times in succession. There are three important repetition
structures: a loop repeats an action for every object in a collection of
objects, a loop that is controlled by the state of the objects in the program,
and a loop that is controlled by a counter (usually a number). In this
chapter, we are going to focus on just one kind of loop, one that is
controlled by the state of the objects in the program. This happens to be
the most general and most fundamental kind of repetition structure in many
programming languages.


Generic Repetition Structures
-----------------------------

There are two major parts to every repetition structure, the body and the
controlling condition. These two parts provide a way to classify loops.

The block of statements that can be executed repeatedly is called the **body
of the loop**. Each time that the statements in the body are executed is
called a **trip** (or **iteration**) through the loop, and the number of
times the body is executed is called the **trip count**.

The **controlling condition** is a condition that is checked to determine
whether to make a trip through the body or terminate the loop. The
controlling condition is rechecked after each trip through the body of
the loop.

One criterion for classifying loops is based on when the controlling condition
is checked relative to the first trip through the body. In a **pretest loop**,
the controlling condition is always checked before the body can be executed
for the first time. In a **posttest loop**, the controlling condition is not
checked until after the first trip through the body. In either case, the
condition is checked after each trip through the body to determine whether or
not to make another trip.

A second criterion for classifying loops is based on whether a true condition
or a false condition leads to a trip through the body. In a **while loop**, a
true condition leads to a trip through the body, but a false condition
terminates the loop. In an **until loop**, a true condition terminates the
loop, but a false condition leads to a trip through the body. The difference
between the while and until loops is summarized in this table:

.. odsafig:: Images/whileVsUntil.png
   :align: center

Combining these two criteria, we can define four broad categories of loops:
pretest while, pretest until, posttest while, and posttest until. Few
programming languages provide all four of these (most only provide two, or
even one!), but the most common form that is supported in virtually every
imperative and object-oriented programming language is the pretest while
loop. We'll focus exclusively on **pretest while loops** in the remainder
of this chapter.

.. odsafig:: Images/whileVsUntil2.png
   :align: center

Since the pretest while loop is the most common repetition structure across
imperative and object-oriented languages, we will take a closer look at it.

.. odsafig:: Images/whileDiagram.png
   :align: center

The figure above shows a generic pretest while loop and uses arrows to show
the order in which statements are executed and the condition is checked.


Java's Syntax for the While Loop
--------------------------------

.. odsafig:: Images/whileDiagram2.png
   :align: center


The figure above shows the Java syntax for a pretest while loop in Java. There
are three important things to observe about the syntax.

1. The condition **must** be in parentheses.
2. There is **no semicolon** after the parentheses containing the condition
   or after the keyword ``else``.
3. The *while* structure is not a method, which means that we do not send
   it as a message to a Jeroo object.

There are three important things to observe about the coding style.

1. Braces are used to define the beginning and end of both the body
   of the while statement. *Always include them.*
2. The braces are aligned with the start of the word ``while``.
3. The statements between the braces should be indented (we use 4 spaces).


Example (pretest while structure)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Assume that a Jeroo named Kim is not standing on a flower, but there is a
line of flowers ahead. Have Kim pick all of those flowers, and stop as soon
as there is no flower directly ahead. After picking all of the flowers, Kim
should turn to the left.

.. code-block:: java

    while (kim.seesFlower(AHEAD))
    {
        kim.hop();
        kim.pick();
    }

    kim.turn(LEFT);


Self-Check
~~~~~~~~~~

.. avembed:: Exercises/IntroToSoftwareDesign/Week3Quiz5Summ.html ka
    :long_name: Working with While Loops


Syntax Practice 3e: While Loops
-------------------------------

.. extrtoolembed:: 'Syntax Practice 3e: While Loops'
   :workout_id: 1377


Programming Practice 3
----------------------

.. extrtoolembed:: 'Programming Practice 3'
   :workout_id: 1378


Check Your Understanding
------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week3ReadingQuizSumm.html ka
   :long_name: Programming Concepts
