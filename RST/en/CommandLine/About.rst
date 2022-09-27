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

A simple file structure is depicted in the following figure. The light blue rectangles represent files, and the dark blue rectangles represent directories. The command line is a textual user interface that allows the user to execute commands to move throughout the file structure. The **current working directory** is the directory the user is currently located in within the command line. The **green** rectangle represents the current working directory. A **parent directory** is a directory containing the current working directory. A **subdirectory** is a directory residing within the current working directory. A parent directory can contain multiple subdirectories.

Four levels exist in the following file system: 

* Level 1) root
* Level 2) three files (bird.txt, snake.txt, fish.txt) and one directory (mammals). 
* Level 3) three files (monkey.txt, mouse.txt, bear.txt) and one directory (dogs). 
* Level 4) three files (beagle.txt, boxer.txt, poodle.txt)


.. odsafig:: Images/CommandLineBefore.png
   :width: 80% 
   :align: center
   :capalign: justify
   :alt: Command Line Before 

Using basic commands, a user can perform various operations to traverse the file structure. A user can also create, copy, move, and delete both files and directories, much like how they would use Windows’ File Explorer or Mac’s Finder. These basic commands are common to Linux, Windows, and Mac command lines. 

Suppose a user executes the following commands in a command line where the file structure is the same as the previous figure, and the current working directory is mammals as highlighted in green.
The commands change the directory up one level, make a new directory named "insects", and then list all the files and directories in the current working directory, which is the root directory.


.. odsafig:: Images/CommandLineCommands.png
   :width: 20% 
   :align: center
   :capalign: justify
   :alt: Command Line Commands 



The following figure shows the updated file structure after executing the previous commands. The current working directory is now the root directory, and the "insects" directory has been created.

.. odsafig:: Images/CommandLineAfter.png
   :width: 80% 
   :align: center
   :capalign: justify
   :alt: Command Line After 


Paths
------

In a file system, a path defines the location of a file or directory. A path is a list of directory names separated by "/" characters. The directory names specify which directories must be traversed to reach a certain file or directory. Paths can be absolute or relative. 

An absolute path specifies the location of a file or directory starting from the root directory. For example in the example above, the absolute path to the "dogs" directory is "/mammals/dogs". Furthermore, the absolute path to file "poodle.txt" is "/mammals/dogs/poodle.txt".

A relative path specifies the location of a file or directory starting from the current working directory. For example in the example above, assuming the current working directory is "mammals", a relative path to the "dogs" directory is simply "dogs". Furthermore, a relative path to the file "poodle.txt" is "dogs/poodle.txt".

Paths can contain a single period. "." refers to the current working directory. For example in the example above, assuming the current working directory is "mammals", a relative path to the "dogs" directory is also "./dogs".

Paths can also contain double periods. ".." refers to the parent directory. For example in the example above, assuming the current working directory is "mammals", a relative path to the root directory is "..". Furthermore, in the example above, a relative path to the file "bird.txt" is "../bird.txt".

In the exercises in this book, (directory_path) refers to a path to a directory, (file_path) refers to a path to a file, and (path) refers to a path to a file or directory.




Description of Exercises
--------------------------

This book contains multiple exercises that will help you learn about basic commands. Each exercise contains a brief introduction and a task for you to complete. You can complete the exercises by executing commands using the mock command line. As you execute commands, you can reference the corresponding visualizations to understand how the commands affect the file structure. Note that when a command takes an argument, the argument will be indicated with (parentheses). For example, in the following figure, cd (directory_path) indicates that the cd command expects one argument, which specifies the path. For example, "cd mammals" and "cd mammals/dogs" are valid cd commands from the root directory. 

The following figures show examples of exercises.

For example:

.. odsafig:: Images/CommandLineCdBefore.png
   :width: 85% 
   :align: center
   :capalign: justify
   :alt: Command Line Exercise 

would be solved:

.. odsafig:: Images/CommandLineCdAfter.png
   :width: 85% 
   :align: center
   :capalign: justify
   :alt: Command Line Exercise 

Furthermore:

.. odsafig:: Images/CommandLineCdBefore2.png
   :width: 85% 
   :align: center
   :capalign: justify
   :alt: Command Line Exercise 

would be solved:

.. odsafig:: Images/CommandLineCdAfter2.png
   :width: 85% 
   :align: center
   :capalign: justify
   :alt: Command Line Exercise 



Be sure to review the following Key Terms and Commands and reference them as you complete the exercises.



Key Terms
----------

**File:** A file stores data. Light blue rectangles represent files.

**Directory:** A directory stores files and other directories. Dark blue rectangles represent directories.

**File System:** The file system is a hierarchical tree data structure that stores all files and directories. The tree structure visualization respresents the file system. 

**Command Line:** The command line is a textual interface that allows users to interact with the file system by executing commands. The black box with the "$" represents the command line and allows for the execution of commands.

**Current Working Directory:** The current working directory is the directory that the user is currently working in within the command line. The green rectangle represents the current working directory.

**Root Directory:** The root directory is the top-level directory in the file system hierarchy. The dark blue rectangle named "/" at the top of the tree structure represents the root directory.

**Path:** A path contains the names of the directories that define a location in the file system. The names of the directories are separated by "/" characters. For example, "/mammals/dogs/poodle.txt" is a path defining the location of a file "poodle.txt" that is located inside the "dogs" directory, which is located inside the "mammals" directory, which is located inside the root directory.

**Absolute Path:**  An absolute path specifies the location of a file or directory starting from the root directory. For example, "/mammals/dogs/poodle.txt" is an absolute path.

**Relative Path:** A relative path specifies the location of a file or directory starting from the current working directory. For example, "dogs/poodle.txt" is a relative path that could be used to locate "poodle.txt" if the current working directory is "/mammals".

**Single Period in Path:** A path can contain "." to refer to the current working directory. For example, "./poodle.txt" defines the location of "poodle.txt" if the current working directory contains "poodle.txt".

**Double Periods in Path:** A path can contain ".." to refer to the parent directory. For example, ".." defines the location of the parent directory of the current working directory. Furthermore, "../fish.txt" defines the location of "fish.txt" if the parent directory of the current working directory contains "fish.txt".


Commands
---------

The following commands are currently supported. Arguments are surrounded by (parentheses). Optional flags are surrounded by [brackets].

**pwd**: Print the path of the current working directory.

**ls (directory_path)**: List all files and directories in the current working directory if (directory_path) is not provided. Otherwise, list all files and directories in the directory at the location specified by (directory_path).

**cd (directory_path)**: Change the current working directory to the directory at the location specified by (directory_path).

**touch (file_path)**: Create a new file with the name and location specified by (file_path). Provide multiple (file_path) values separated by space characters to create multiple files.

**mkdir (directory_path)**: Create a new directory with the name and location specified by (directory_path). Provide multiple (directory_path) values separated by space characters to create multiple directories.

**rm [-r] (path)**: Remove the file or directory at the location specified by (path). Provide multiple (path) values separated by space characters to remove multiple files or directories. Provide the [-r] flag to remove directories. A directory cannot be removed if the current working directory is a subdirectory of the directory.

**rmdir (directory_path)**: Remove the directory at the location specified by (directory_path) if the directory is empty. Provide multiple (directory_path) values separated by space characters to remove multiple directories.

**mv (src_path) (dst_path)**: Move the file or directory from the location specified by (src_path) to the file or directory specified by (dst_path). Provide multiple (src_path) values separated by space characters to move multiple files or directories.

**cp [-r] (src_path) (dst_path)**: Copy the file or directory from the location specified by (src_path) to the file or directory specified by (dst_path). Provide multiple (src_path) values separated by space characters to copy multiple files or directories. Provide the [-r] flag to copy directories.

