.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

More on Generics
================

..
    Shortcuts
    ---------
    
    - :ref:`Generics2Intro`
    - :ref:`Generics2Reflect`
    - :ref:`Generics2Explained`
    - :ref:`Generics2Wildcard`

Objectives
----------

Upon completion of this module, students will be able to:

* Determine when a generic needs to be bounded
* Write and use methods and classes that use bounded generic parameters
* Write and use bounded generic methods
* Become familiar with syntax for wildcards

.. _Generics2Intro: 

Interactive: More on Generics
-----------------------------

.. admonition:: Follow Along, Practice and Explore

     Download to run and explore the corresponding project from the video on your own in eclipse. The project CS2-Support is required for the sample project above.  It is also used in your course projects. To download the CS2-Support you must first complete the configuration steps for your first lab. You will then be able to download it via eclipse using the blue down arrow icon or using the Project Menu and selecting "Download Assignment..."


   .. raw:: html

      <a href="https://courses.cs.vt.edu/cs2114/eclipse/exGenerics.zip"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" width="32" height="32">
      exGenerics.zip</img>
      </a>
      <br>
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/MoreOnGenerics.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
      MoreOnGenerics.pdf</img>
      </a>


.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_4kqmn4sv' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

.. _Generics2Reflect: 

Interactive: Reflecting on Generics
-----------------------------------

.. raw:: html
    
    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_89q1qv87' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center> 
    
Related Resources
~~~~~~~~~~~~~~~~~
    
`A tutorial on using wildcards in generics, at https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html <https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html>`_
    
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

.. avembed:: Exercises/SWDesignAndDataStructs/Generics2Checkpoint1Summ.html ka
   :long_name: Checkpoint 1

.. _Generics2Wildcard: 

Interactive: Bounded Wildcard Examples
--------------------------------------

.. admonition:: Follow Along, Practice and Explore

    Download to run and explore the corresponding project from the video on your own in eclipse. The project CS2-Support is required for the sample project above.  It is also used in your course projects. To download the CS2-Support you must first complete the configuration steps for your first lab. You will then be able to download it via eclipse using the blue down arrow icon or using the Project Menu and selecting "Download Assignment..."


   .. raw:: html

      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/examples/exGenerics.zip"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" width="32" height="32">
      exGenerics.zip</img>
      </a>


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
