.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Generics 2
==========

Objectives
----------

Upon completion of this module, students will be able to:

* Determine when a generic needs to be bounded
* Write and use methods and classes that use bounded generic parameters
* Write and use bounded generic methods
* Become familiar with syntax for wildcards

More on Generics
----------------

Code Examples
~~~~~~~~~~~~~

.. admonition:: Try It Yourself

  In Eclipse, use the *Project > Download Assignment...* menu command to download the exercise project named "ex10.01-Generics". Use this example to follow along with the following video. Feel free to experiment.

  Refer to `01.02: Lab: LightBot for Beginners <https://profdev-lms.tlos.vt.edu/courses/2832/assignments/10634>`_ if you need to review the instructions for downloading Eclipse projects.

[10:53] Generics 2
~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_4kqmn4sv' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center> 

.. raw:: html

   <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/10.1.2.1-MoreOnGenerics.pdf" target="_blank">
   <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
   Video Slides 10.1.2.1-MoreOnGenerics.pdf</img>
   </a>


[17:26] Reflecting on Generics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html
    
    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_89q1qv87' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center> 
    

Related Resources
~~~~~~~~~~~~~~~~~

`A tutorial on using wildcards in generics, at https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html <https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html>`_


Sample Declarations of Generic Methods Explained
------------------------------------------------

**The format for declaring a Generic method is as follows:**

.. code-block:: java

  methodModifiers <genericParameters> returnType methodName(methodParameters)

Note the use of the generic parameters placed inside the angle brackets.

**Example 1**

Below is one example of how you may declare a Generic method.

.. code-block:: java

  public static <T> void sort(T[] items, Comparator<? super T> comp)

The T following the static keyword and enclosed within the angle brackets
represents the generic parameter for the sort method.  The T should also
appear in the method parameter list.

The second method parameter ``Comparator<? super T> comp`` is our way of
specifying that ``comp`` must be an object that implements the
``Comparator`` interface for type ``T`` or for a superclass of type ``T``

We use this approach to specify restrictions, for example, you can define a
class that implements ``Comparator<Number>`` and use it to sort an array of
Integer objects or an array of Double objects

**Example 2**

Below is another example Generic method declaration.

.. code-block:: java

  public static <T extends Comparable<T>> void sort(List<T> list)

The use of ``<T extends Comparable<T>>`` specifies that the generic
parameter ``T`` must implement the interface ``Comparable<T>``.
The method parameter list (the object being sorted) is of type ``List<T>``.


Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/Generics2Checkpoint1Summ.html ka
   :long_name: Checkpoint 1


Bounded Wildcard Examples
-------------------------

Code Example
~~~~~~~~~~~~

.. admonition:: Try It Yourself

  In Eclipse, use the *Project > Download Assignment...* menu command to download the exercise project named "ex10.01-Generics". Use this example to follow along with the following video. Feel free to experiment.

  Refer to `01.02: Lab: LightBot for Beginners <https://profdev-lms.tlos.vt.edu/courses/2832/assignments/10634>`_ if you need to review the instructions for downloading Eclipse projects.

[10:43] Bounded Wildcards Example
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_jazizwb4' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center> 

Related Resources
~~~~~~~~~~~~~~~~~

* `https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html <https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html>`_
* `https://docs.oracle.com/javase/tutorial/java/generics/bounded.html <https://docs.oracle.com/javase/tutorial/java/generics/bounded.html>`_


Programming Practice: Generics 1
--------------------------------

.. extrtoolembed:: 'Programming Practice: Generics 1'
   :workout_id: 1919
