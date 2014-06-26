.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: OpenDSA

OpenDSA Project Content Status
==============================

This status report was last updated on June 24, 2014.

Status Report
-------------

OpenDSA is rapidly evolving and adding new content.
At the present time, the chapters on Linear Structures, Binary Trees,
Sorting, and Hashing are considered complete (though some polishing
and minor additions are still being made), and they are actively
maintained.
There is also complete text for the Algorithm Analysis chapter, but we
are hoping to develop new material to provide a more visual approach
to this topic.
This amounts to roughly 8-9 weeks worth of material in a typical
CS2- or post-CS2-level class.
If you are looking at the "Everything" book, you will see these as
well as all modules that are in various stages of perparation.
There you will also see the "TODO" list items.
If you are looking at the "Dev" book, then you are seeing everything
**execept** the modules that are considered complete.
(We maintain this version to speed up compilation a bit for the
developers.)
If you are looking at the "OpenDSA" book, you are seeing the modules
that we consider "ready for use", perhaps with some stub modules to
make the cross-referencing work.

There are also many chapters that partially complete. These include
materials related to design, general trees, memory management, file
processing, indexing, searching, graphs, and NP-completeness. These
all have text, but not as many visualizations and exercises as we
plan. A lot of progress is being made on fleshing these out. They
should be reasonably complete by the end of 2014.

Configuring Your Own Book
-------------------------

If you look in the "Books" directory, you might see that this is only
one of several versions of the OpenDSA materials.
The "config" directory contains various configuration files that
control the modules in a book, the exercises in a module, and the
points awarded for completing an exercise.
You can create your own book by writing a new configuration file and
compiling it. Look at the Makefile for guidance on how to compile a
new configuration file.

At some point in the future, we will make a more user friendly way to
create OpenDSA books.
For now, if you are an instructor who would like to have a custom book
set up for use with your class, feel free to contact the OpenDSA
project team for help.
