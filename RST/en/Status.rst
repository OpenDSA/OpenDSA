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

This status report was last updated on October 7, 2017.

OpenDSA content contintues to grow, evolve, become more polished,
break, get fixed, and so on.
In general, specific chapters get periodic attention and slowly
improve.
At the present time, the chapters on Algorithm Analysis, Intro
Recursion, Linear Structures, Binary Trees, Sorting, and Hashing are
considered complete (though some polishing and minor additions are
still being made), and they are actively maintained.
This amounts to roughly 8-10 weeks worth of material in a typical
CS2- or post-CS2-level class.
If you are looking at the "Everything" book, you will see these as
well as all modules that are in various stages of perparation.
There you will also see the "TODO" list items.

There are also many chapters that are more-or-less complete in terms
of content, but whose visualizations and exercises are considered
sub-standard in some respect.
These include materials related to design, general trees, memory
management, file processing, indexing, searching, graphs,
NP-completeness, senior algorithms, lower bounds proofs,
spatial data structures, and searching.
These all have text, more or less visualizations, and might have
exercises.
There is also a new tutorial that we are developing for an
introduction to basic pointer manipuation.
Most are useable in a class in their present form.
But they do not have as many visualizations and exercises as we would
like, and their content is not as polished.
A lot of progress continues to be made on fleshing these out.

Finally, there ongoing major efforts to create materials for
Programming languages (translators and compilers), and Finite
Languages and Automata.

In the past year, we completely re-engineer our communications layer
between content server and scoring server.
Beginning with Spring Semester 2016, all of our courses began using
this new infrastructure.
This system uses the LTI protocol to serve content, and we now
integrate with the Canvas LMS.
Over time, we intend to extend this integration to support other major
LMS that can support LTI, but there is no ETA at this time.
We are also making good progress on providing to instructors the
option to load  individual visualizations and exercises into
LTI-compilant LMS, rather than through OpenDSA "books".
Details can be found at 
https://opendsa-server.cs.vt.edu/home/guide.


Configuring Your Own Book
~~~~~~~~~~~~~~~~~~~~~~~~~

This is only one of several versions of the OpenDSA materials.
We present a number of "standard" book options at
https://opendsa-server.cs.vt.edu/home/books.
As described at https://opendsa-server.cs.vt.edu/home/guide,
instructors can generate a Canvas course with any of the standard book
configurations.
We are nearing completion of a proper tool that will allow instructors
to configure the details for book content when setting up a Canvas
course.
We hope to have this available by Spring 2018.
In the meantime, feel free to contact the OpenDSA
project team for help with book configuration for your course, at
opendsa@cs.vt.edu.

For the adventurous, it is possible to configure books for deployment
"by hand".
The ``config`` directory in our github repository contains various
configuration files that control the modules in a book, the exercises
in a module, and the points awarded for completing an exercise.
You can create your own book by writing a new configuration file and
compiling it.
Look at the Makefile for guidance on how to compile a new
configuration file.
