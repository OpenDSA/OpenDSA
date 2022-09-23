.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Ryan Buxton 
   :satisfies: About
   :topic: Tour

Git
=======================================

Introduction
-----------------------------------------

Description of Exercises
--------------------------

Key Terms
----------

Commands
---------

The following commands are currently supported. Arguments are surrounded by (parentheses). Optional flags are surrounded by [brackets].

**git clone (url)**: Clones the remote repository at the location specified by (url) and copies the contents of the remote repository to a new directory on the local machine.

**git status**: Print the status of the local repository including information about the working area, the staging area, commits, and the active branch.

**git add (path)**: Add the file at the location specified by (path) to the staging area. If (path) specifies a directory, all the changed files in the directory are added to the staging area. Provide multiple (path) values separated by space characters to add multiple files.

**git restore [\-\-staged] (path)**: Undo the changes made to the file at the location specified by (path). Provide the [\-\-staged] flag to move a file from the staging area to the working area. If (path) specifies a directory, all the changed files in the directory are restored. Provide multiple (path) values separated by space characters to restore multiple files. 

**git commit -m (message) [-a] (path)**: Create a commit containing the changes in the staging area. The -m flag is required and must be followed by a nonempty message. Provide the [-a] flag to create a commit containing the changes in both the staging area and the working area. Provide one or more (path) values to create a commit containing only the changes to the files at the location or locations specified by (path). If (path) specifies a directory, all the changed files in the directory are committed. Untracked files are not included in the commit even if the [-a] flag or the (path) arguments are used.

**git push**: Push new commits from the current branch of the local repository to the corresponding branch of the remote repository. The commit or commits contain the changes to the files that are applied to the remote repository.

**git pull**: Pull new commits from the current branch of the remote repository to the corresponding branch of the local repository. The commit or commits contain the changes to the files that are applied to the local repository.

**git branch (branch_name)**: Create a branch with the name specified by (branch_name).

**git switch [-c] (branch_name)**: Change the current branch to the branch with the name specified by (branch_name). Provide the [-c] flag to create a new branch with the name specified by (branch_name) if the branch does not exist.

**git checkout [-b] (branch_name)**: Change the current branch to the branch with the name specified by (branch_name). Provide the [-b] flag to create a new branch with the name specified by (branch_name) if the branch does not exist. Provides the same functionality as git switch. In practice, it is better to use git switch for changing branches because git is migrating from checkout to switch for changing branches.

