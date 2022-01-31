.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: OpenDSA

OpenDSA Project Content Status
==============================

Status Report
-------------

This status report was last updated on December 26, 2021.

OpenDSA content continues to grow, evolve, become more polished,
break, get fixed, and so on.
In general, specific chapters get periodic attention and slowly
improve.
At the present time, the chapters that are used in the CS2 and CS3
standard books are considered complete
(though polishing and minor additions are continually being made),
and they are actively maintained.
These comprise a complete Junior-level data structures and algorithms
course, and the data structures component of a standard CS2 course.
If you are looking at the "Everything" book (which is actually only
"everything" directly related to data structures and algorithms,
you will see these as well as all other DSA modules that are in
various stages of preparation.
There you will also see the "TODO" list items in some modules.

We are constantly expanding our content.
We have a fairly complete book on Formal Languages and Automata,
which includes a collection of editors, simulators, and autograded
exercises for building a variety of finite automata,
including Turing Machines.
This book also represents our first major effort to use the
Programmed Instruction (PI) paradigm for pedagogy.
PI is a technique for demanding constant interaction on the part of
the learner.
Ideally, it presents a small amount of information, and then asks a
question or gives some sort of exercise.
Most of the time, these questions or exercises are intended to be
extremely simple, with the main purpose of making sure that the student
absorbed the small bit of information just provided.
Sometimes, the questions or exercises are more integrative.

There is also a book for a course on programming languages
(of the translators and parsing variety).

There is a fairly complete chapter on NP Completeness theory.

New as of 2020: We are developing a tutorial on Blockchain
technologies.
Work on this progressed through 2021
As of the end of 2021, there is quite a lot more that we hope to do
with this before it is really ready for public use.

Since 2017, OpenDSA has been using the LTI protocol to serve content,
and directly integrates with the Canvas LMS.
We have incomplete integration support for other LMS's that support
LTI, including Moodle and Blackboard.
At this time there is no ETA on improved connections to any LMS aside
from Canvas.
However, we do provide the option to load individual visualizations,
exercises, and modules into any LTI-compliant LMS.
Details can be found at 
https://opendsa-server.cs.vt.edu/home/guide.
Technical discussion of how OpenDSA supports LTI can be found at
http://splice.cs.vt.edu/lti.

In 2021, we Dockerized OpenDSA, both on the server side and on the
content developer's side.
This is intended to make it easier for developers who are working with
the project to get started (we make a lot of use of student projects
to push content).
It is also intended to make distributing OpenDSA to other
institutions far easier than it has been in the past.
It now should be feasible for many institutions to run their own copy
of the OpenDSA server, thus allowing for all data collected by the
OpenDSA system to remain entirely within that institution.


Configuring Your Own Book
~~~~~~~~~~~~~~~~~~~~~~~~~

This is only one of several versions of the OpenDSA materials.
We present a number of "standard" book options at
https://opendsa-server.cs.vt.edu/home/books.
As described at https://opendsa-server.cs.vt.edu/home/guide,
instructors can generate a Canvas course with any of the standard book
configurations.
We provide a tool that allows instructors
to configure the details for book content when setting up a Canvas
course.
If you have trouble using this, feel free to contact the OpenDSA
development team at opendsa@cs.vt.edu.
