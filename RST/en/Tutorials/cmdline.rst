.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Jordan Sablan
   :requires:
   :satisfies:
   :topic:

===================
Command Line Basics
===================
What's A CLI?
-------------
A CLI or Command Line Interface is a simple text only interface. A user provides
a command with or without some additional information and then the command is
exectued.

Basics:

1. When you execute a command you must type the name of the command, in addition
the command must be located in your PATH

   - What's a PATH? A PATH is a list of directories, in these directories executables will be located. Common directories are /bin/, /usr/bin/

2. When you execute a command, you often will need to provide additional
information. These are called arguments.

+------------------+-------------------------------------------------------+
| Common Arguments | Meanings                                              |
+==================+=======================================================+
|     -h           | displays help information                             |
+------------------+-------------------------------------------------------+
|     -v           | increases information output, v is for verbosity      |
+------------------+-------------------------------------------------------+

.. odsafig:: Images/hexample.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Image 1

   Image 1


.. odsafig:: Images/vexample.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Image 2

   Image 2

3. If you can not get enough information from the -h argument you can make use
of the man command. The man command brings up the man page for information and
is a more in depth explanation of the command.

.. odsafig:: Images/manexample.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Image 3

   Image 3

*\*Author's Note: The man command should be available in any GNU-style terminal.
If you are using Windows the native Command Prompt does not have a man command.*

|
|
|

Give the terminal a try
=======================

.. avembed:: AV/Tutorials/terminal.html ss
