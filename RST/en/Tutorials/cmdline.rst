.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Jordan Sablan
   :requires:
   :satisfies: Commmand line
   :topic:

===================
Command Line Basics
===================

What's A CLI?
-------------

A Command Line Interface or CLI is a simple text only interface. A user provides
a command with or without some additional information and then the command is
exectued.

Basics:

1. When you execute a command you must type the name of the command, in addition
the command must be located in your PATH

   - What's a PATH? A PATH is a list of directories, in these directories executables will be located. Common directories are /bin/, /usr/bin/

2. When you execute a command, you often will need to provide additional
information. These are called arguments.

   +------------------+------------------------------------------------------------------------------------------------+
   | Common Arguments | Meanings                                                                                       |
   +==================+================================================================================================+
   |     -h           | displays help information                                                                      |
   +------------------+------------------------------------------------------------------------------------------------+
   |     -v           | increases information output, v is for verbosity, or in some cases displays version information|
   +------------------+------------------------------------------------------------------------------------------------+

|

.. odsafig:: Images/hexample.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: -h is commonly called the help switch. It displays basic help informatio

   The -h switch is often used to display basic help information


3. If you can not get enough information from the -h argument you can make use
of the man command. The man command brings up the man page for information and
is a more in depth explanation of the command. Below is an example of running

::

   man ls

4. Further Reading: This was a very brief introduction to the terminal. It was
included only to give some context to further chapters that make use of
arguments. For more information feel free to |external_link|.

.. |external_link| raw:: html

   <a href="https://help.ubuntu.com/community/UsingTheTerminal" target="_blank">check this resource</a>

.. odsafig:: Images/manexample.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: An example of the man command

   The man command is extremely useful for learning about the syntax/usage of a command

*\*Note: The man command should be available in any GNU-style terminal.
If you are using Windows the native Command Prompt does not have a man command.*

|

.. Does not work with new LTI support.
.. Give the terminal a try.

.. .. avembed:: AV/Tutorials/terminal.html ka
