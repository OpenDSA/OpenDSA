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

Git is a popular version control system used throughout academia and industry that enables users to track changes to their files and collaborate with others.

Git is commonly used in conjunction with a hosting service like GitHub or GitLab. This allows files to be stored remotely and allows for collaboration among users. The most common way to begin using Git is to clone a remote repository. This copies all the files from the remote repository and creates a local repository on the local machine. 

A Git repository is simply a collection of files, which are tracked by Git. Files within a Git repository have three potential states: modified, staged, or committed. A Git repository contains three main areas, which correspond respectively with the states: the working tree, the staging area, and committed files. If a file is changed in any way, it is considered modified and is thus located in the working tree. A user can then transition the file from modified to staged, moving it from the working tree to the staging area, using the git add command. The file then becomes committed once the user commits the file from the staging area. 

A commit is snapshot of the state of the files in a repository at the time of the commit. Git stores commits in a commit tree. Every time a new commit is created, the new commit is added to the commit tree. The commit tree provides a history of all the changes made to the repository. 

Git repositories also contain branches. A branch is simply a pointer to a commit on the commit tree. This allows different histories of the repository to be maintained. Only one branch can be active at any given time. The active branch is known as the HEAD branch. When commits are made, they are added to the HEAD branch.

Local commits can be applied to the remote repository using the git push command. This is how changes are stored on the remote server, which allows other users to access the changes. Similarly, remote commits can be applied to a local repository using the git pull command. This allows changes stored on the remote server to be accessed on the local machine.

Git can be very confusing at first, so do not be discouraged if that explanation didn't make complete sense! The exercises will show how the various parts of Git work together.


Description of Exercises
--------------------------

This book contains multiple exercises that will help you learn about Git commands. Each exercise contains a brief introduction and a task for you to complete. You can complete the exercises by executing commands using the mock command line. As you execute commands, you can reference the corresponding visualizations to understand how the commands affect the file structure and the Git state. Note that when a command takes an argument, the argument will be indicated with (parentheses). For example, in the following figure, git add (path) indicates that the git add command expects at least one argument, which specifies the path. For example, "git add README" is a valid git add command from the root directory. 

The following figures show an example of an exercise.

For example:

.. odsafig:: Images/GitExerciseBefore.png
   :width: 85% 
   :align: center
   :capalign: justify
   :alt: Git Exercise 

would be solved:

.. odsafig:: Images/GitExerciseAfter.png
   :width: 85% 
   :align: center
   :capalign: justify
   :alt: Git Exercise 


Be sure to review the following Key Terms and Commands and reference them as you complete the exercises.

Key Terms
----------

The following image is an example of the format of the visualizations used in the exercises. The visualization highlights many key parts of Git as explained below.

.. odsafig:: Images/GitExample.png
   :width: 80% 
   :align: center
   :capalign: justify
   :alt: Git

**Repository**: A collection of files tracked by Git, which also includes the history of the files.

**Local Repository**: A repository stored on a local machine. The left box labeled "Local" represents the local repository in the visualization.

**Remote Repository**: A repository stored on a hosting service like GitHub or GitLab. The right box labeled "Remote" represents the remote repository in the visualization.

**Commit**: A snapshot of the state of the files in a repository at a given time. The circles represent commits in the visualization.

**Commit Tree**: A tree structure that describes the order of the commits in a repository. The circles and the paths connecting them represent the commmit tree in the visualization.

**Branch**: A pointer to a commit stored in the commit tree. A branch can be used to maintain easy access to a commit so that different versions of a file can be easily accessed. The rectangles near the circles represent branches in the visualization.

**HEAD Branch**: The active branch. The HEAD branch points to the latest commit on the branch. Any new commits will be attached at this point in the commit tree. The purple rectangle near the circles represents the HEAD branch in the visualization.

**Staging Area**: The name for the location of staged files. Files are part of the staging area once git add has been called on the file. Green files represent staged files in the visualization.

**Working Tree**: The name for the location of modified files. Files are part of the working tree once they have been modified in some way. Red files represent modified files in the visualization.


Commands
---------

The following commands are currently supported. Arguments are surrounded by (parentheses). Optional flags are surrounded by [brackets].

**git clone (url)**: Clone the remote repository at the location specified by (url) and copy the contents of the remote repository to a new directory on the local machine.

**git status**: Print the status of the local repository including information about the working tree, the staging area, commits, and the active branch.

**git add (path)**: Add the file at the location specified by (path) to the staging area. If (path) specifies a directory, all the changed files in the directory are added to the staging area. Provide multiple (path) values separated by space characters to add multiple files.

**git rm [-r] (path)**: Remove the file at the location specified by (path), and add the file to the staging area. Provide the [-r] flag to remove directories. If (path) specifies a directory, all the files in the directory are removed and added to the staging area. Provide multiple (path) values separated by space characters to remove multiple files.

**git restore [\-\-staged] (path)**: Revert the changes made to the file at the location specified by (path). Provide the [\-\-staged] flag to move a file from the staging area to the working tree. If (path) specifies a directory, all the changed files in the directory are restored. Provide multiple (path) values separated by space characters to restore multiple files. 

**git commit -m (message) [-a] (path)**: Create a commit containing the changes in the staging area. The -m flag is required and must be followed by a nonempty (message). Provide the [-a] flag to add all files to the staging area before creating the commit. Provide one or more (path) values to create a commit containing only the changes to the files at the location or locations specified by (path). If (path) specifies a directory, all the changed files in the directory are committed. Untracked files are not included in the commit even if the [-a] flag or the (path) arguments are used.

**git push**: Push new commits from the current branch of the local repository to the corresponding branch of the remote repository. The commit or commits contain the changes to the files that are applied to the remote repository.

**git pull**: Pull new commits from the current branch of the remote repository to the corresponding branch of the local repository. The commit or commits contain the changes to the files that are applied to the local repository.

**git branch (branch_name)**: Create a branch with the name specified by (branch_name).

**git switch [-c] (branch_name)**: Change the current branch to the branch with the name specified by (branch_name). Provide the [-c] flag to create a new branch with the name specified by (branch_name) if the branch does not exist.

**git checkout [-b] (branch_name)**: Change the current branch to the branch with the name specified by (branch_name). Provide the [-b] flag to create a new branch with the name specified by (branch_name) if the branch does not exist. Provides the same functionality as git switch. In practice, it is better to use git switch for changing branches because git is migrating from checkout to switch for changing branches.

