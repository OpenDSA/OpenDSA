.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bio_Batch2
   :satisfies: DNASeq
   :topic: DNASeq

IF Statement
============
**What is if...else statement in Python?**

Decision making is required when we want to execute a code only if a certain condition is satisfied.

The **if…elif…else** statement is used in Python for decision making.

Python if Statement Syntax:
::
   if test expression:
    statement(s)

Here, the program evaluates the **test expression** and will execute statement(s) only if the test expression is **True**.

If the test expression is **False**, the statement(s) is not executed.

**Python if...else Statement**

Syntax of if...else::

  if test expression:
    Body of if
 else:
    Body of else

* The **if..else** statement evaluates **test expression** and will execute the body of if only when the test condition is **True**.If the condition is **False**, the body of **else** is executed. Indentation is used to separate the blocks.

* In Python, the body of the if statement is indicated by the indentation. 

* The body starts with an indentation and the first unindented line marks the end.

* Python interprets non-zero values as **True**. **None** and **0** are interpreted as False.

**Python supports the usual logical conditions from mathematics:**

   * Equals: a == b
   * Not Equals: a != b
   * Less than: a < b
   * Less than or equal to: a <= b
   * Greater than: a > b
   * Greater than or equal to: a >= b

**Python if else Statement Flowchart**

.. inlineav:: if_stat ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/if_stat.css 
   :scripts: AV/BIO/if_stat.js
   :output: show


**This technique is known as Ternary Operators, or Conditional Expressions.**

You can also have multiple else statements on the same line:

**Example**

One line if else statement, with 3 conditions:::

   a = 330 
   b = 330
   print("A") if a > b else print("=") if a == b else print("B") 

Nested IF
---------
  
We can have a **if...elif...else** statement inside another **if...elif...else** statement. This is called nesting in computer programming.

Any number of these statements can be nested inside one another. Indentation is the only way to figure out the level of nesting. They can get confusing, so they must be avoided unless necessary.

**Python Nested if Example**

.. inlineav:: n_if ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/n_if.css 
   :scripts: AV/BIO/n_if.js
   :output: show

  **Exercises (IF , IF_Else)**

.. inlineav:: ifEx ff
   :links: AV/BIO/ifEx.css 
   :scripts: DataStructures/PIFrames.js AV/BIO/ifEx.js
   :output: show