.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bio_Batch2
   :satisfies: DNASeq
   :topic: DNASeq

Exception Handling
==================

* An exception can be defined as **an unusual condition in a program resulting in the interruption in the flow of the program**
* Whenever an exception occurs, the program **stops the execution**, and thus the further code **is not executed**. Therefore, an exception is the run-time errors that are unable to handle to Python script. An exception is a Python object that represents an error
* Python provides a way to handle the exception so that the code can be executed without any interruption. **If we do not handle the exception**, the interpreter **doesn't execute all the code that exists after the exception**

**Blocks of Exception Handling consist of:**
   * the **try block** lets you test a block of code for errors.
   * The **except block** lets you handle the error.
   * The **else block** lets you execute code when there is no error.
   * The **finally block** lets you execute code, regardless of the result of the try- and except blocks.


Try...Except
------------
Try and except statements are used to catch and handle exceptions in Python.
Statements that can raise exceptions are kept inside **the try clause** and **the statements that handle the exception are written inside except clause**


.. inlineav:: Try ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Try.css 
   :scripts: AV/BIO/Try.js
   :output: show



Many Exceptions
---------------
Python provides the number of built-in exceptions, but here we are describing the common standard exceptions. 
**A list of common exceptions that can be thrown from a standard Python program is given below:**
   * **ZeroDivisionError:** Occurs when a number is divided by zero.
   * **NameError:** It occurs when a name is not found. It may be local or global.
   * **IndentationError:** If incorrect indentation is given.
   * **IOError:** It occurs when Input Output operation fails.


.. inlineav:: manyexceptions ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/manyexceptions.css 
   :scripts: AV/BIO/manyexceptions.js
   :output: show

Else
----
you can also use the else clause on the try-except block which must be present after all the except clauses. 
The code enters the else block only if the try clause **does not raise an exception**




.. inlineav:: Else ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Else.css 
   :scripts: AV/BIO/Else.js
   :output: show


Finally
-------
Finally used with the try statement. It is executed no matter what exception occurs and used to release the external resource. The finally block provides **a guarantee of the execution.**
We can use the finally block with the try block in which we can pace the necessary code, **which must be executed before the try statement throws an exception.**


.. inlineav:: Finally ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Finally.css 
   :scripts: AV/BIO/Finally.js
   :output: show


**Raise an exception:**
   *  you can choose to throw an exception if a condition occurs.
   * To throw (or raise) an exception, use the **raise** keyword.

**Example:**
Raise an error and stop the program if x is lower than 0:
::
   x = -1
   if x < 0:
      raise Exception("Sorry, no numbers below zero")

**Example:**
::
   x = "hello"
   if not type(x) is int:
       raise TypeError("Only integers are allowed")

Exercise
--------
.. inlineav:: ExceptionHandling ff
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/ExceptionHandling.css 
   :scripts: DataStructures/PIFrames.js AV/BIO/ExceptionHandling.js
   :output: show
