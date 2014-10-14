.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Jordan Sablan
   :requires:
   :satisfies:
   :topic:

==========================================
Reading In Input (From Files Or Otherwise)
==========================================
The Scanner Class
-----------------
For those unfamiliar Java has an excellent class to read in information. The
Scanner class is extremely useful to quickly parse through a String. The API for
the Scanner class can be found
`here <http://docs.oracle.com/javase/7/docs/api/java/util/Scanner.html>`__.
So how do we properly read in a file? Well there are a number of ways, however,
for a simple demonstration I will show you how to use the Scanner class to read
in a command file from an old CS3114 project. In this project we are given 4
commands that our program must handle; debug, search, add, and delete. Take a
look at the input file
`here <http://courses.cs.vt.edu/~cs3114/Fall13/watcherP4.txt>`__.

1. debug - prints information about the tree in the program
2. search - searches a region based off coordinates given
3. add - adds a node at the coordinates given
4. delete - deletes a node at the specific point

*\*Every command except debug takes additional parameters*\*

Consider the following code snippet.

.. codeinclude:: Java/Tutorials/MainScanner.java

This code will parse through a command file, read in each command and each of
their parameters (if the command has one). It is important to note, however,
that this code is not necessarily safe. It assumes that the command file
given is properly formatted, and as such if a user decides to give the program
a malformed file the program will behave in a possibly unknown way.
