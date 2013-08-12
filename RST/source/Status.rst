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

This status report was last updated on April 28, 2013.

Status Report
-------------

OpenDSA is rapidly evolving and adding new content.
At the present time, the chapters on Sorting and Hashing are
considered complete (though some polishing and minor additions are
still being made), and they are actively maintained.
This amounts to roughly three weeks worth of material in a typical
post-CS2-level class.
If you are looking at the "Everything" book, you will see these as
well as all modules that are in various stages of perparation.
You will also see the "TODO" list items.
If you are looking at the "Dev" book, then you are seeing everything
**execept** the modules that are considered complete.
(We maintain this version to speed up compilation a bit for the
developers.)
If you are looking at the "OpenDSA" book, you are seeing the modules
that we consider "ready for use", perhaps with some stub modules to
make the cross-referencing work.

We have a goal of completing enough material for a complete semester
course by the end of 2013.
That would contain chapters on mathematical background topics,
algorithm analysis, lists, binary trees, general trees (with
Union/FIND), sorting, searching (including hashing),
file processing basics (including external sorting),
indexing (including B-trees), and graphs.

Determining Individual Module Status
------------------------------------

As a quick guide on the status of the materials, modules that are not
considered complete will show a suffix in the table of contents,
tagged as follows.

[STUB] means that there is little to no content, and the file is there
primarily as a target for a crossreference from another module.

[Raw] means that expository text has been written and copied from a
source that we have rights to, but has not yet been typeset into
ReST. It will look pretty ugly!

[Text] means that expository text has been written, typically copied
from one of our textbooks or another source that we have rights to
use.
But that text does not yet contain any visualizations or exercises,
nor any description of how visualizations and exercises should be
included.

[Storyboard] means that the module is a "storyboard". That includes the
expository text properly typeset, along with specifications for the
various visualizations and exercises that yet need to be implemented.
"Quick prototype" or third party implementations (such as a Java
applet) might be included to indicate how a visualization is intended.

[Draft] means that the module is nearing completion. It contains text
and various visualizations and exercises. But the content needs to be
polished, and additional visualization support or exercise support
might still be needed.

If the module has no status suffix, then it is considered in usable
form.

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
