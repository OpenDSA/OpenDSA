.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Ryan Buxton 
   :satisfies: About
   :topic: Tour

Command Line
=======================================

Introduction
-----------------------------------------

In a computer, a file system is used by the operating system to manage files stored and accessed by users. File systems follow a hierarchical tree structure, in which the root directory sits at the top of the tree. All other directories and files branch from the root directory.

A simple file structure is depicted in the following figure. The light blue rectangles represent files, and the dark blue rectangles represent directories. A user can move throughout the file structure, and the current working directory is the directory the user is currently located in. The green rectangle represents the current working directory.

In the following file system, we have four levels: 

* Level 1) root
* Level 2) three files (bird.txt, snake.txt, fish.txt) and one directory (mammals). 
* Level 3) three files (monkey.txt, mouse.txt, bear.txt) and one directory (dogs). 
* Level 4) three files (beagle.txt, boxer.txt, poodle.txt)


.. odsafig:: Images/CommandLineBefore.png
   :width: 80% 
   :align: center
   :capalign: justify
   :alt: Command Line Before 

Using basic commands, we can perform various operations to traverse the file structure. We can also create, copy, move, and delete both files and directories, much like you would do using Windows’ File Explorer or Mac’s Finder. These basic commands are common to Linux, Windows, and Mac terminals. 

Suppose we execute the following commands in a terminal where the file structure is the same as the previous figure, and the current working directory is mammals as highlighted in green.
The commands change the directory up one level, make a new directory named "insects", and then list all the files and directories in the current working directory, which is the root directory.


.. odsafig:: Images/CommandLineCommands.png
   :width: 20% 
   :align: center
   :capalign: justify
   :alt: Command Line Commands 



The following figure shows the updated file structure after executing the previous commands. As you can see, the current working directory is now the root directory, and the "insects" directory has been created.

.. odsafig:: Images/CommandLineAfter.png
   :width: 80% 
   :align: center
   :capalign: justify
   :alt: Command Line After 


Exercises
----------

This book contains multiple exercises that will help you learn about basic commands. The following figure shows an example of an exercise.

.. odsafig:: Images/CommandLineExercise.png
   :width: 100% 
   :align: center
   :capalign: justify
   :alt: Command Line Exercise 

In each exercise, we provide a brief introduction and a task for you to complete in a command line environment. You can complete the exercises by executing commands using the mock terminal. As you execute commands, you can reference the corresponding visualizations to understand how the commands affect the file structure. Note that when a command takes an argument, the argument will be indicated with square brackets []. For example, in the above figure, cd [path] indicates that the cd commands expect one argument, which specifies the path. For example, "cd /mammals" and "cd /mammals/dogs" are valid cd commands. 

Be sure to review the following Key Terms and reference them as you complete the exercises.



Key Terms
----------

**File:** A file stores data. Light blue rectangles represent files.

**Directory:** A directory stores files and other directories. Dark blue rectangles represent directories.

**File System:** The file system is a hierarchical tree data structure that stores all files and directories. The tree structure visualization respresents the file system. 

**Command Line:** The command line is a textual interface that allows users to interact with the file system by executing commands. The black box with the "$" represents the command line and allows you to execute commands.

**Current Working Directory:** The current working directory is the directory that the user is currently working in. The green rectangle represents the current working directory.

**Root Directory:** The root directory is the top-level directory in the file system hierarchy. The dark blue rectangle named "/" at the top of the tree structure represents the root directory.

**Path:** A path contains the names of the directories that define a location in the file system. The names of the directories are separated by "/" characters. For example, "/mammals/dogs/poodle.txt" is a path defining the location of a file "poodle.txt" that is located inside the "dogs" directory, which is located inside the "mammals" directory, which is located inside the root directory.

**Absolute Path:** An absolute path is a path that starts with the root directory. For example, "/mammals/dogs/poodle.txt" is an absolute path.

**Relative Path:** A relative path is a path that must be combined with another path to define a location. For example, "dogs/poodle.txt" is a relative path that could be used to locate "poodle.txt" if the current working directory is "/mammals".

**Single Period in Path:** A path can contain "." to represent the current working directory. For example, "./poodle.txt" defines the location of "poodle.txt" if the current working directory contains "poodle.txt".

**Double Periods in Path:** A path can contain ".." to represent the parent directory. For example, ".." defines the location of the parent directory of the current working directory. Furthermore, "../fish.txt" defines the location of "fish.txt" if the parent directory of the current working directory contains "fish.txt".


