.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Jordan Sablan
   :requires:
   :satisfies: JUnit intro
   :topic: JUnit

JUnit Testing And You
=====================

Getting Started
---------------

*To err is human, to correct is divine.*


When writing code we often will make mistakes. To develop code with no bugs
would be akin to having the power of a modern day God! As such it is extremely
important that we test our code frequently and often in order to help spot, fix
and remove bugs. Thankfully Java comes with a wonderful suite of tools to help
test code. In addition to this Virginia Tech has developed a few more extensions
of this suite and released them for students to make use of. For the purpose of
these tutorials we will make use of this class for our test cases. Note that it
will in many ways be similar to the standard JUnit functionality, but will have
some additional functions that help with testing.
As such we must import and set our program to make use of this library.
You can find directions |external_link1|.
In addition to configuring your build path, be sure to look over this page as it
is an excellent quick start to JUnit functionality.

.. |external_link1| raw:: html

   <a href="http://web-cat.org/junit-quickstart/" target = "_blank">here</a>


Design Considerations
~~~~~~~~~~~~~~~~~~~~~

There are a few different approaches to testing code. The approach most classes
at Virginia Tech teach is code coverage. The code coverage approach to testing
is fairly easy to understand. If our test cases hit every line of code and
produce the expected results then we have a good indication that our code is
relatively bug free. Given this design we should try and keep our test cases
as modular as possible. As such it is generally recommended that for every
method in your class you design a test method corresponding to it. Thus if I
had a Human class with methods; ``setName, getName, setWeight, getWeight, walk,
jump.`` There are two sets of getters and setters and two independent methods.
Thus it would be wise to create a test method called testName() which tests the
getter/setter for name, and a test method called testWeight() which tests the
getter/setter for weight. Things a coder might wish to consider when testing
these methods could include: what happens whne you cast a data type to fit
inside a setter (i.e. if your weight is represented integers will the system
round as expected or should you regear your data choice), additionally be sure
to consider any issues that arise from abusing the  setter (i.e. negative
weight, or giving NULL for the name). As you test your try to consider anyway
in which you can break your program. Finally we have two methods left untested.
The walk and jump methods. In order to keep them modular simply create two
seperate test methods: testJump and testWalk.

Meaningful Tests
~~~~~~~~~~~~~~~~

When writing your test cases it is important not to just run the code with
random tests. All the tests should be designed to test common runtime conditions
as well as possible edge conditions that may change the behavior. Additionally
try to develop test cases that are independent of each other. If a segment of
code has already been properly tested, testing the same chunks of code over
again will not add anything and will slow down the overall runtime of tests.
Remember quality over quantity!

More Information
~~~~~~~~~~~~~~~~

For more information |external_link2|
is an excellent resource to read and learn from.

.. |external_link2| raw:: html

   <a href="http://openmymind.net/2011/2/23/Foundations-of-Programming-2-Chapter-5-Effective-T/" target = "_blank">this blog</a>
