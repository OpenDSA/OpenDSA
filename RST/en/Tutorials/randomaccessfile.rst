.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Jordan Sablan
   :requires: Text input
   :satisfies: Random access file
   :topic:

Random Access Files In Java
===========================

Understanding File I/O
----------------------

In earlier tutorials we saw how we can use Java's scanner class to read sequential
text files. Scanners are great for reading files, but we can take a
step farther out and conceptualize our data even more abstractly, instead of
reading in files as strings we can instead read the raw bytes and then write
those bytes to the file. By doing this we have no limits on the types of data
we can store. Additionally, RandomAccessFiles, allow reading and writing anywhere
withing the file, jumping to any legal location within the file itself.
Before reading this tutorial be sure to check the |external_link|.

.. |external_link| raw:: html

   <a href="https://docs.oracle.com/javase/7/docs/api/java/io/RandomAccessFile.html" target = "_blank">RandomAccessFile API</a>

Before getting started using the RandomAccessFile class, be sure you understand
the following concepts.

1) Reading - Read a chunk of data (bytes) at a location on disk. These bytes
can be located anywhere within the file.

2) Writing - Write a chunk of data (bytes) at a location on disk. We can "write"
anywhere within the file.

3) File Pointer - A number representing the byte position we are at in the file.
We can manipulate the File Pointer to point anywhere within our file. A
RandomAccessFile should be trated similar to an array of bytes. It's index will
start at 0 and it's last position will be one less than the total size of the
file.

One very important thing to note about the RandomAccessFile class. It is very
easy to seek past the end of the file and write to that location (as the RandomAccessFile
class assumes that one might wish to grow a file), however, if the file pointer is
moved past the end of file and written to at that location, if the user tries to
read it may encounter the EndOfFile or EOF at the old size and as such will throw
an error.


Using RandomAccessFile Class
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Consider the code example below. It will generate a file of a size 0 to 999
bytes and it will then fill those bytes in order with numbers from 65 to 90
(randomly chosen). The program will output a plaintext file randomly filled with
capital English alphabet letters. Why does this work? Remember that to a computer
data is nothing but a collection of bits. For ASCII text we have a set of
characters whose numeric values range from 0 to 255 (or the maximum value of one
byte). The capital letters in ASCII range from values 65 to 90, thus when I
write a value of 65-90 to a file it will be interpreted as a letter.

.. codeinclude:: Java/Tutorials/RAFWrite.java

So we have generated a file and filled it with bytes that are randomly created.
How do we read the file? The RandomAccessFile class has a number of read
functions. The following example demos a few below. The example starts by reading
in the entire file (generated from above) and outputing the contents to the
terminal. The program then randomly generates a new position in the file and
sets our file pointer to there, outputing the position, the int value of the
byte, and the character it represents. Finally the program creates a new byte
array the size of the file and attempts to read that many bytes, using the read
method. As the comments explain, the read method returns an int representing
how many bytes were actually read. After reading in the array, the program then
outputs the position read started at, the amount of bytes read and the size of
the array given to read. Running this program on my machine (after generating
a file from the above code), produced the following output.

::

   EXUHIULUQKLZICYUQIKMWZCQPXKYBEHKCJVUIBCIYHKJPCPENWXJLZEMDHVLPNBXDOTNVZIUYNMQTLZVTITTVMMLDWJTMEHSUZUBTSEQPATLOQRUOODL
   Set pos to 111, value 85, character U
   Tried reading at position 112, read 4 bytes, array was size 116

.. codeinclude:: Java/Tutorials/RAFRead.java

There you go, reading and writing using bytes!
