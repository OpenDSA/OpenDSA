.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Jordan Sablan
   :requires: 
   :satisfies: 
   :topic:

========================
Common Debugging Methods
========================
When tracking down bugs in your code there are a number of methods that
programmers can make use of. These methods all have different strengths, but
the main goal of each is to help narrow down where the bugs exist and why they
cause problems.


Method 1: Print Debugging
=========================
I frequently use this method to help me track down bugs in my code. The main
idea is simple. Print out as much information as poissible in every stage of
your program. By doing so we can see at every stage of the program how our
data changes and if it changes in the way that we planned. It should be noted
that this method comes with a few disadvantages as well. 

1. It requires print statements throughout the code and this means that
it will have to be removed later on

2. Depending on how much data the program prints, it may be flooded with so much
information that it becomes difficult to gain any meaning from it

Method 2: Rubber Duck Debugging
===============================
Rubber Duck Debugging has become very popular through the programming industry.
Rubber Duck Debugging focuses on making the programmer carefully examine each
line of their code and not just assume that it does what they expect, but explain
how it works. In order to use Rubber Duck Debugging a programmer should make use
of a rubber duck toy (or any other object to stand in as a person), and then go
through each line of their code and explain it to the duck as if it were a
normal person with no programming experience. Rubber Duck Debugging is only as
effective as the thought put into it, however. When making use of the technique
be sure to be thorough in your explanations and to consider every possible case.
For an example of Rubber Duck Debugging read this
`blog <http://blog.codinghorror.com/rubber-duck-problem-solving/>`__.

Method 3: Wolf Fence Debugging
==============================
Imagine there is only one wolf in Alaska. How would you find him? The most
effective way would be to fence Alaska in half and wait for the wolf to "howl."
When you know which half has the wolf split it and again wait.
Keep repeating until you find the wolf.
This is the basis of Wolf Fence Debugging. Work to find where the bug occurs,
eliminating areas repeatedly until the method and then the line of code causing
the problem has been found. The method is particularly useful when used in
conjunction with Exceptions as the stack trace can show each line of code called
leading to the actual Exception being thrown.

Print Debugging vs Source Debugging
===================================
Choosing between source code debugging and print based debugging can be difficult
at times. There are many different advantages and disadvantages to each method,
however, in my personal experience I find it easiest to use print based
debugging to troubleshoot quick problems (i.e. what value is this method returning)
or to help give a more detailed context for source level debugging. For exmaple,
in a recent project, I encountered an exception. While the exception provided
a very detailed message and even gave the line of code that caused the error, it
still did not provide the information needed. I made use of a print statement to
ensure that that the data being used was as expected. When the data had been
verified, I had to use the source level debugger to give more information. That
being said printing the information made it easier to find the cause of the issue.

