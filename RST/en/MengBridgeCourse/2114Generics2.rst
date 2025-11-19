.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

More on Generics
================

Objectives
----------

Upon completion of this module, students will be able to:

* Determine when a generic needs to be bounded
* Write and use methods and classes that use bounded generic parameters
* Write and use bounded generic methods
* Become familiar with syntax for wildcards

Suggested Reading:
~~~~~~~~~~~~~~~~~~

**Java Interlude 8 Generics Once Again** from `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_

.. _Generics2Intro: 

Interactive: More on Generics [10:53]
-------------------------------------

.. admonition:: Follow Along, Practice and Explore

    In Eclipse, use the *Project > Download Assignment...* menu command to download the exercise project named "ex10.01-Generics". Use this example to follow along with the following video. Feel free to experiment.

    Refer to `01.02: Lab: LightBot for Beginners <https://profdev-lms.tlos.vt.edu/courses/2832/assignments/10634>`_ if you need to review the instructions for downloading Eclipse projects.
     
    .. raw:: html     
        
        <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/10.1.2.1-MoreOnGenerics.pdf" target="_blank">
           <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
           Video Slides 10.1.2.1-MoreOnGenerics.pdf</img>
           </a>


.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_4kqmn4sv' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="More on Generics"></iframe> 
    </center>

.. _Generics2Reflect: 

Reflecting on Generics [17:26] 
------------------------------

.. raw:: html

     <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_89q1qv87' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Reflecting on Generics"></iframe> 
     </center>

Related Resources
~~~~~~~~~~~~~~~~~

.. raw:: html

    <ul>
    <li><a href="https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html " target="_blank">Oracle Wildcards </a></li>
    </ul>

.. _Generics2Explained: 

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

.. avembed:: Exercises/MengBridgeCourse/GenericsCheckpoint1Summ.html ka
   :long_name: Checkpoint 1

.. _Generics2Wildcard: 
   
Interactive: Bounded Wildcard Examples
--------------------------------------

.. admonition:: Follow Along, Practice and Explore

   In Eclipse, use the *Project > Download Assignment...* menu command to download the exercise project named "ex10.01-Generics". Use this example to follow along with the following video. Feel free to experiment.
   
   Refer to `01.02: Lab: LightBot for Beginners <https://profdev-lms.tlos.vt.edu/courses/2832/assignments/10634>`_ if you need to review the instructions for downloading Eclipse projects.

.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_jazizwb4' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Bounded Wildcard Examples"></iframe> 
   </center>

Related Resources
~~~~~~~~~~~~~~~~~

.. raw:: html
    
    <ul>
    <li><a href="https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html " target="_blank">Oracle Wildcards </a></li>
     <li><a href="https://docs.oracle.com/javase/tutorial/java/generics/bounded.html  " target="_blank">Oracle Bounded Type Parameters </a></li>
    </ul>



Programming Practice: Generics 1
--------------------------------

.. extrtoolembed:: 'Programming Practice: Generics 1'
   :workout_id: 1919

