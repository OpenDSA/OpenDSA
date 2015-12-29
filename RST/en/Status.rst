.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: OpenDSA

OpenDSA Project Content Status
==============================

Status Report
-------------

This status report was last updated on December 28, 2015.

OpenDSA continues its pace of evolving and adding new content.
At the present time, the chapters on Algorithm Analysis, Recursion
Tutorial, Linear Structures, Binary Trees, Sorting, and Hashing are
considered complete (though some polishing and minor additions are
still being made), and they are actively maintained.
This amounts to roughly 8-10 weeks worth of material in a typical
CS2- or post-CS2-level class.
If you are looking at the "Everything" book, you will see these as
well as all modules that are in various stages of perparation.
There you will also see the "TODO" list items.

There are also many chapters that partially complete. These include
materials related to design, general trees, memory management, file
processing, indexing, searching, graphs, and NP-completeness. These
all have text, visualizations, and exercises. They are useable in a
class in their present form. But they do not have as many
visualizations and exercises as we would like, and their content is
not as polished. A lot of progress continues to be made on fleshing
these out.

There are also ongoing major efforts to create materials for
Programming languages (translators and compilers), and Finite
Languages and Automata.

We are coming to the end of a major effort to re-engineer our
communications layer between content server and scoring server.
Beginning with Spring Semester 2016, all of our courses will use this
new infrastructure. This new system uses the LTI protocol to serve
content, and we now integrate with the Canvas LMS. We intend to extend
this integration to support other major LMS in the coming year.


Configuring Your Own Book
~~~~~~~~~~~~~~~~~~~~~~~~~

This is only one of several versions of the OpenDSA materials.
The "config" directory in our github repository contains various
configuration files that control the modules in a book, the exercises
in a module, and the points awarded for completing an exercise.
You can create your own book by writing a new configuration file and
compiling it. Look at the Makefile for guidance on how to compile a
new configuration file.

At some point in the future, we will make a more user friendly way to
create OpenDSA books.
For now, if you are an instructor who would like to have a custom book
set up for use with your class, feel free to contact the OpenDSA
project team for help (see the "contact us" link below).
