.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Template
=========


Introduction
------------

Among the most important concepts in object oriented programming are the concepts of inheritance and polymorphism. We first introduced the idea of inheritance in Chapter 0. There we compared inheritance to the natural form of inheritance, in which horses and cows share certain inherited characteristics, such as being warm-blooded, by virtue of their being mammals. We also gave the example of a hierarchy of chess pieces and showed how different kinds of chess pieces, such as Pawn and Bishop, inherited certain shared characteristics from their ChessPiece superclass. We took a more technical look at inheritance in Chapter 3, where we talked about the toString() method and how it is inherited from the Object class. We illustrated there how subclasses of Object could override the inherited toString() method in order to customize it for their purposes. We also introduced the idea of polymorphism, in which a method call, such as obj.toString(), can have different behaviors depending on the type of object, obj, on which it is called. In Chapter 4, we continued introducing inheritance and polymorphism, when we learned about Java’s Abstract Windowing Toolkit (AWT) and Swing hierarchies, the class hierarchies that are used to create Graphical User Interfaces (GUIs). We also learned how to extend a class to create our own subclass, and we made limited use of inheritance in the design of the SimpleGUI class. We were also introduced to the concept of a Java interface, and we learned how to use the ActionListener interface to enable a SimpleGUI to handle action events while the GUI is running. In this chapter we will take a much closer look at these important object-oriented concepts. We will learn how Java’s dynamic binding mechanism works and how it makes polymorphism possible. Most importantly, we will see why inheritance and polymorphism are important elements of object-oriented design, and we will learn how to use these important tools to design several different programs. In keeping with our running games example, we will develop a TwoPlayerGame hierarchy and show how it can simplify the implementation of OneRowNim and other two-player games. 8.2 Java’s Inheritance Mechanism

(pulled from JJJ Chapter 8 introduction)


Syntax Review
-------------

In Java, the public and protected instance methods and instance variables of a superclass are inherited by all of its subclasses. This means that objects belonging to the subclasses can use the inherited variables and methods as their own. We have already seen some examples of this in earlier chapters. For example, recall that by default all Java classes are subclasses of the Object class, which is the most general class in Java’s class hierarchy. One public method that is defined in the Object class is the toString() method. Because every class in the Java hierarchy is a subclass of Object, every class inherits the toString() method. Therefore, toString() can be used with any Java object. To illustrate this, suppose we define a Student class as follows:

.. raw:: html

    <pre lang="text/x-java">
    public class Student{
      protected String name;

      public Student(String s){
        name = s;
      }

      public String getName(){
        return name;
      }
    }
    </pre>


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

.. avembed:: Exercises/1114Sample/Question1.html ka
