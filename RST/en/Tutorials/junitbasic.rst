.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Jordan Sablan
   :requires: JUnit intro
   :satisfies: JUnit test writing
   :topic: JUnit

Writing JUnit Tests
===================

We have reviewed good design for test code and how to design modular and
meaningful test code. This tutorial will show a basic series of tests on a
binary search tree.

Before you start, be sure you have familiarized yourself with the basics of the
``Junit/student.TestCase classes``.

*For this exercise I will be using a BST written by a V.S. Adamchik*

|external_link|.

.. |external_link| raw:: html

   <a
   href="https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/code/BST.java" target = "_blank">Here is the full BST source code</a>


While this class contains many methods this tutorial will only be testing a few.

.. codeinclude:: Java/Tutorials/TestBST.java

The above source code shows a possible approach to testing the BST class add and
delete methods. Given that a binary search tree is a well documented data
structure, there are a number of sites one may refer to for information to test.
In this case I referred to the wikipedia entry and pulled the first example of
a binary search tree available. Those familiar with tree traversals know that
for a given set of values an in order traversal will display the values in order
from least to greatest, so after adding all the values to the tree, it is simple
to know what to expect. In order to guarantee that the tree has been properly
constructed I have chosen to test the Pre-Order traversal as well. Testing the
delete function is a bit tougher. There are several cases that must be considered
in order to get proper code coverage namely: deleting a leaf node, deleting an
internal node with one child, deleting an internal node with 2 children, and
deleting an internal node which does not immediately link to a leaf node. In
addition to all of this examination of the delete function shows that it is
possible for that function to throw a RuntimeException. In order to test this
the test code attempts force the delete function to throw the exception, however,
it is possible that the exception will not be thrown and no actual test on the
Exception could be performed. As such the test code makes use of a canary value
to guarantee that that the exception is thrown. Or else the tests will fail.
After testing the Exception, the function then tries to test the series of cases
that the delete function has.

In many cases testing for equality will satisfy the what is needed to properly
test code. However not all information may be tested for strict equality as
data representations may not always provide exact information. For example when
working with floats or doubles it is important to test the results, however,
doing so for strict equality is no simple task. By making use of additional
functional of `assertEquals` method it is possible ot assign an acceptable
threshold of difference between two values consider the below code.

::

   public void testsquareroot(){
		assertEquals(Calculator.squareroot(2), 1.4142, .001);
		assertEquals(Calculator.squareroot(2), 1.4142, .000000000001);
	}

The first test would succeed, but the second will fail. Why? Well in the second
test the threshold is much finer and Java will fail as 1.4142 is not close enough
to 1.4142135623730951. Keep this information in mind as you develop code and
choose data types.
