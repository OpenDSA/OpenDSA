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
Java has an excellent class for reading in text. The
Scanner class is extremely useful to quickly parse through a String. The API for
the Scanner class can be found
`here <http://docs.oracle.com/javase/7/docs/api/java/util/Scanner.html>`__.
So how do we properly read in a file? Well there are a number of ways.
For a simple demonstration I will show you how to use the Scanner class to read
in a command file from an old CS3114 project. In this project we are given 4
commands that our program must handle: debug, search, add, and delete. Take a
look at the input file
`here <http://courses.cs.vt.edu/~cs3114/Fall13/watcherP4.txt>`__.

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
there. Consider the input file found
`here <http://courses.cs.vt.edu/~cs3114/Fall14/P1sampleInput.txt>`__.
We now have 3 commands we must support.

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
traditional deliminator. By seperating these fields using <SEP>, we drastically
reduce the possibilty of a valid name containing the delimeter.
