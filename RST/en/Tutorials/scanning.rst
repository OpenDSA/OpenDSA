.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Jordan Sablan
   :requires:
   :satisfies: Text input
   :topic:

=======================================
Reading Input (from Files or Otherwise)
=======================================

The Scanner Class
-----------------

Java has an excellent class for reading in text. The
Scanner class is extremely useful to quickly parse through a String.
See the |external_link1|.
So how do we properly read in a file?
There are a number of ways.
This page shows a simple demonstration of how to use the Scanner class to read
in a command file from an old CS3114 project.
In this project we are given 4 commands that our program must handle:
debug, search, add, and delete.
Take a look at the |external_link2|.

.. |external_link1| raw:: html

   <a href="http://docs.oracle.com/javase/7/docs/api/java/util/Scanner.html" target = "_blank">Scanner class API</a>


.. |external_link2| raw:: html

   <a href="http://courses.cs.vt.edu/~cs3114/Fall13/watcherP4.txt" target = "_blank">input file</a>


1. debug - prints information about the tree in the program

2. search - searches a region based off coordinates given

3. add - adds a node at the coordinates given

4. delete - deletes a node at the specific point

\*Every command except debug takes additional parameters\*

Consider the following code snippet.

.. codeinclude:: Java/Tutorials/ScannerPt1.java

This code will parse through a command file, read in each command and each of
their parameters (if the command has one). It is important to note, however,
that this code is not necessarily safe. It assumes that the command file
given is properly formatted, and as such if a user decides to give the program
a malformed file the program will behave in a possibly unknown way.

Depending on the structure of your file you may not wish to simply do the token
method. Another approach would be to read in an entire line and then work from
there.
Consider |external_link3|.
We now have 3 commands that we must support.

.. |external_link3| raw:: html

   <a href="http://courses.cs.vt.edu/~cs3114/Fall14/P1sampleInput.txt" target = "_blank">this input file</a>


1. insert {artist-name}<SEP>{song-name} - inserts a song using the information
provided in the fields

2. remove {artist|song} {name} - removes a song given a song name or artist name

3. print {artist|song|blocks} - depending on the parameter value, you will print
out either a complete listing of the artists contained in the database, or the
songs, or else the free block list for the memory manager

So this time we have less commands to support, but more options for each command
, no worries! We simply need to change our code just a little bit. We see this
time that the insert command has no spacing between artist/song tokens. Rather it
uses the seperator <SEP>.

.. codeinclude:: Java/Tutorials/ScannerPt2.java

Seperating artists and song name on the same line can prove to be rather difficult
due to the fact that either name might include a space or other
traditional deliminator.
By seperating these fields using <SEP>, we drastically
reduce the possibilty of a valid name containing the delimeter.
