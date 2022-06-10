.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Ryan Buxton 
   :satisfies: Command Line
   :topic: Tour

Command Line
======================

Key Terms
---------

**File:** A file stores data. Light blue rectangles represent files in the following visualizations.

**Directory:** A directory stores files and other directories. Dark blue rectangles represent directories in the following visualizations.

**File System:** The file system is a data structure that stores all files and directories.

**Command Line:** The command line is a textual interface that allows users to interact with the file system.

**Current Working Directory:** The current working directory is the directory that the user is currently working in. The green rectangle represents the current working directory in the following visualizations.

**Root Directory:** The root directory is the top-level directory in the file system heirarchy.

**Path:** A path contains the names of the directories that define a location in the file system. The names of the directories are separated by "/" characters. For example, "/animals/mammals/dogs/poodle.txt" is a path defining the location of a file "poodle.txt" that is located inside of the "dogs" directory which is located inside of the "mammals" directory which is located inside of the "animals" directory.

**Absolute Path:** An absolute path is a path that starts with the root directory. For example, "/animals/mammals/dogs/poodle.txt" is an absolute path.

**Relative Path:** A relative path is a path that must be combined with another path to define a location. For example, "dogs/poodle.txt" is a relative path that could be used to locate "poodle.txt" if the current working directory is "/animals/mammals".

**Single Period in Path:** A path can contain "." to represent the current working directory. For example, "./poodle.txt" defines the location of "poodle.txt" if the current working directory contains "poodle.txt".

**Double Periods in Path:** A path can contain ".." to represent the parent directory. For example, ".." defines the location of the parent directory of the current working directory.

pwd
-----
.. avembed:: AV/Development/CommandLine/exercises/pwd/commandLinePwd.html pe

cd
-----
.. avembed:: AV/Development/CommandLine/exercises/cd/commandLineCd.html pe 

.. avembed:: AV/Development/CommandLine/exercises/cdRoot/commandLineCdRoot.html pe




