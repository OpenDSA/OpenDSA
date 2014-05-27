##########################
QBank - Users Manual
##########################

.. _QBank User Manual:


.. contents:: Table of Contents


Introduction 
-----------------

QBank is a web application that assists Problem Authoring and
Publishing.
At the present time, this is an experimental system, and is not
actively being used to create OpenDSA exercise content.
But its goal is to replace a lot of the current programming required
to develop our OpenDSA exercises.
The user interface is meant to be intuitive and easy to
understand.
This document will give you a feel of the overall
capabilities and functionality of QBank tool.

The **key** features of the QBank tool are:

* Easy interfaces for Problem authoring based on the main Problem types: 
  
  * Static question -- Multiple Choice Question
  * Dynamic question -- Parameterised Question
  * Summative question -- Multi-Part Question
  * Tool Specific question -- Khan Academy Exercise Question

* Problem publishing - Parsing options to convert authored questions to different formats
  
  * Comma Separated Format - ``csv``
  * Khan Academy Exercise Format
  
* Standard Authoring Interfaces based on the **Formal Problem Definition** for different Problem Types.

Key Terms
---------

Problem Definition
^^^^^^^^^^^^^^^^^^^^^

The following lists out the essential components of a Problem.

 Problem Statement
  Includes a function that generates a `Problem Instance`.

 User Interface
  A mechanism that a user interacts with a create a `Student Answer`.

 Model Answer Generator
  A function that takes a `Problem Instance` and generates a `Model Answer`.

 Answer Evaluator
  A function that compares the `Student Answer` to the `Model Answer` to determine whether the `Student Answer` is correct or not.

 Variables
  
  



These carry information from the `Problem Statement` to the `Model Answer Generator`.

Problem Types
^^^^^^^^^^^^^

1. Multiple Choice Question

2. Parameterized Question

  * Variable that take a `List` of values
  
  * Variable with values that vary over a `Range`

3. Multi - Part Question

4.  Tool Specific Problem Authoring -- Khan Academy Exercise Format


Write a Problem
------------------------

Overview
^^^^^^^^^


The QBank editing interface consists of text boxes and buttons that are self explanatory. The text boxes also accepts HTML and JavaScript when appropriate.

The ``What's this?`` button gives helpful indicators on the purpose of different text boxes and what different parameters can be added to make the Problem powerful. It also tells you some functions that can be used to make more effective questions.


Problem
^^^^^^^

File Name
"""""""""

A unique identifier that is used to :

1. Store a problem in the database.
2. Refer to a problem in different parsed format
3. Refer to while creating a summative problem written from previously authored problems.


Difficulty
""""""""""

It just classifies problems as easy , medium or hard. This information can be used by a Smart tutor which bases the next question posed to the user on the correctness of the previous question.

If correct, a question with a higher difficulty is posed or vice-versa.


Variables
^^^^^^^^^

This allows for generation of different *problem instances* based on a static *Problem Template* with *variables* that take on different specified values.

Variables are used by specifying the *variable name* within ``<var>...</var>`` delimiters. 

 **Variable Name** is an ID for the var as that'll be the name that you'll refer to in the future. 

 **Variable value**
 Values that the variable can take is specified here. This can be as simple as commma separated values or functions that can be accepted by the publishing tool/ parsed into a compatible format.


For example::

 <!-- Numbers from 1-5 -->
 Variable Name : A
 Variable Value : "1", "2" ,"3" ,"4", "5" 

Another example to make a variable named SPEED1 that is a number from 11 to 20 you would do::

 Variable Name : SPEED1
 Variable Value : randRange(11,20)


The content of a ``<var>...</var>`` block is executed as JavaScript, with access to to all the properties and methods provided by the JavaScript Math object, as well as those defined in the modules/scripts you included::


 <!-- Random number -10 to -1, 1 to 10.-->
 Variable Name : A
 Variable Value :(random() > 0.5 ? -1 : 1)*(rand(9) + 1)
 

Most mathematical problems that you generate will have some bit of randomness to them (in order to make an interesting, not-identical, problem).



Variable Reference
"""""""""""""""""""
Use a ``<var>...</var>`` delimiters to refer to predefined variables while defining other variables or within other components of the problem.

For example in the following we define two variables (``AVG`` and ``TIME`` ) and then multiply them together and store them in a third variable ( ``DIST`` ). ::

 <!-- Defining a variable using predefined variables. -->
 Variable Name : AVG
 Variable Value : 31 + rand(9)
 Variable Name : TIME
 Variable Value : 1 + rand(9)
 Variable Name : DIST
 Variable Value : AVG * TIME
 
Solution
^^^^^^^^^^
The solution consists of the answer. 

Answer
"""""""
The answer can be any of the following.

1. A valid choice
2. A function that is the calculation of a question ( with specified values for variables)
3. A previously defined variable.

 For example::
 Answer : <var>round(DIST1)</var>

Choices
^^^^^^^^

This can include text which acts as distractors for the user. The choices can also use the previously defined variables.

Hints
^^^^^^^^
These are textual suggestions to help the user figure out the correct answer. The hints can also use the previously authored variable .

The hints are optional. 

Scripts
^^^^^^^^^

The author can add scripts written in javaScript to add different functionality to the question. 

This can add extra interactivity to the exercise.

This is optional as well.

Common Introduction
^^^^^^^^^^^^^^^^^^^^

The problem overview/introduction is defined for a *Summative Problem*. 

This is useful since the problems combined together can have some information that isn't explicitly part of the statement of the question. 
 For example, a Physics problem may describe the situation and the various objects in the world before asking about a certain quality of a certain object. 

Problem Name
^^^^^^^^^^^^^

This part of the Problem Template defined for *Summative Problems*. The **Problem Name** is the file name of previously authored questions , that can be grouped together.

The ``"question"`` in a summative problem is just a file name.


Available functions and Tips
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Generating Random Numbers
""""""""""""""""""""""""""
You can use random(), or one of the following methods defined in the math.js module (which should be included in all exercises):

1. randRange( min, max ) - Get a random integer in [min, max].

#. randRange( min, max, count ) - Get a random integer between min and max, inclusive. If count is specified, will return an array of random integers in the range.

#. randRangeUnique( min, max, count ) - Get an array of unique random numbers between min and max, inclusive.

#. randRangeExclude( min, max, excludes ) - Get a random integer between min and max, inclusive, that is never any of the values in the excludes array.

#. randRangeNonZero( min, max ) - Get a random integer between min and max that is never zero.

#. randFromArray( arr ) - Get a random member of arr.



Problem Type Specifics
-------------------------

Parameterized Question -- List
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Used to write a question with variables that take values that need to be specified explicitly

Variables:
 The values are specified within **double-quotes** and are **comma-separated**.

Show/Hide Variable Combination:
 It shows the various combination of the different values of variable can take.

 This indicates the position of the answer for the particular combination has to be stored in the answer array.

Solution:
 The answer takes a one dimensional array, where the index corresponds the answer specified to a row on the table that shows the Variable Combination.

Parameterized Question -- Range
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This type of question is for math problems where there are calculations involved as the solution.

Variables:
 The values the variables take are between a range of values that can be specified using the javaScript ``randRange(min,max)`` function.

Solution:
 The answer is the exact calculation that is specified in the Problem Template.

 For example::

  A + B - C, is enough to specify the answer. 

The author doesn't need to explicitly make the calculation and write the correct answer.

This ensures the validity of answer and gets rid of the risk specifying an incorrect answer for the solution.

Another important feature of this type of problem is, the author doesn't need to explicitly provide choices, since the user is expected to *fill the answer in the blank* provided. This is very effective for math problems.


Multi-Part Question
^^^^^^^^^^^^^^^^^^^
It is comprised of different previously authored questions from the Repository. You can combine different type of questions, free-form and multiple-choice simple questions and matching questions in your multipart question.
 
Common Introduction
 The problems share a common introduction which generally contains information that is common to the questions.

Problem 
 Problem Name
  Specify the exact identifier for a Problem. You can Browse the Problems in the repository by clicking the show button. You can then click *Add* and the Problem Name gets added.

Tool Specific Question -- Khan Academy Exercise
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This type of problem supports inputs that can be handled by Khan Academy. 

Check out `Khan Academy Exercise Framework Documentation <https://khan-exercises.readthedocs.org/en/latest/>`_.

Also, the ``What's this`` button gives a lot of direction in assisting an author while authoring a problem.


Publishing a Problem
----------------------

The  current version of the QBank supports **two** main publishing formats.

CSV format
^^^^^^^^^^^

Every authored exercise can be exported as a comma-separated file.

Khan Academy Exercise Format
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The exercises can also be exported in a format fully compatible with Khan Academy.

Search for a Problem
----------------------

This allows the author to browse previously written problems.

The author can:

 1. Edit the problem.
 #. Download the problem in CSV
 #. Parse the problem in to Khan Academy Exercise Format.
 #. View the problem in Khan Academy.


Helpful Hints
-------------
