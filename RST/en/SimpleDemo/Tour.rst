.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: OpenDSA Tour
   :topic: Tour

OpenDSA: A Guided Tour
======================

This page gives a tour of the major features of OpenDSA from a user's
perspective.

Making a Book
-------------

The fundamental metaphor is a "textbook", with each "section" as a
single HTML page.
Books can be compiled either as "standalone" web pages, or they can be
compiled and pushed to a Canvas course shell, where each section is a
Canvas "module".

OpenDSA textbook instances are compiled from configuration files.

*  Select written and programming language(s)
*  Select modules
*  Configure exercises
*  There are some controls over whether given sections are included or
   not.

Look at the
`configuration file <https://github.com/OpenDSA/OpenDSA/blob/master/config/SimpleDemo.json>`_
for the book instance that you are
looking at right now.

To compile in "standalone" mode, you just need to have the OpenDSA
front-end repository set up.
See
`https://github.com/OpenDSA/OpenDSA
<https://github.com/OpenDSA/OpenDSA>`_
for instructions on how to install this.
From the top level of the repository, you type `make <bookname>`, and
then the book is available in `Books/<bookname>`.

To compile to Canvas, you have to either have the complete development
stack installed (see
`https://github.com/OpenDSA/OpenDSA-DevStack
<https://github.com/OpenDSA/OpenDSA-DevStack>`_
for information),
or you need to have permissions on an OpenDSA server such as the
OpenDSA production server (
`https://opendsa-server.cs.vt.edu/
<https://opendsa-server.cs.vt.edu/>`_
)
or staging server (
`https://opendsa-staging.cs.vt.edu/
<https://opendsa-staging.cs.vt.edu/>`_
).


Textual content
---------------

All of the usual capabilities that you might expect from any decent
authoring system.

Glossary entries with key words like :term:`data structure` embedded
with links in the text.

Code displays are configurable to one or more programming languages.

.. codeinclude:: Lists/Link
   :tag: Link

|

.. codeinclude:: Sorting/Insertionsort
   :tag: Insertionsort

Math expressions and tables are expressed using LaTeX notation.

.. math::
   :label: sum1

   \sum_{i = 1}^{n} i = \frac{n (n+1)}{2}.

.. math::
   :label: sum2

   \sum_{i = 1}^{n} i^2 = \frac{2 n^3 + 3 n^2 + n}{6} =
   \frac{n(2n + 1)(n + 1)}{6}.

.. topic:: Table

   .. math::

      \begin{array}{l|l}
      \{1, 4\}& \mbox{A set composed of the members 1 and 4}\\
      \{\mathsf{x}\, |\, \mathsf{x}\ \mbox{is a positive integer}\}&
         \mbox{A set definition using a set former}\\
      &\qquad \mbox{Example: the set of all positive integers}\\
      \mathsf{x} \in \mathbf{P}&\mathsf{x}\ \mbox{is a member of set}\ \mathbf{P}\\
      \mathsf{x} \notin \mathbf{P}&\mathsf{x}\ \mbox{is not a member of set}\ \mathbf{P}\\
      \emptyset&\mbox{The null or empty set}\\
      |\mathbf{P}|& \mbox{Cardinality: size of set}\ \mathbf{P}
                 \mbox{or number of members for set}\ \mathbf{P}\\
      \mathbf{P}\,\subseteq\,\mathbf{Q},
	\mathbf{Q}\,\supseteq\,\mathbf{P}&
	\mbox{Set}\ \mathbf{P}\ \mbox{is included in set}\ \mathbf{Q},\\
      &\qquad \mbox{set}\ \mathbf{P}\ \mbox{is a subset of set}\ \mathbf{Q},\\
      &\qquad \mbox{set}\ \mathbf{Q}\ \mbox{is a superset of set}\ \mathbf{P}\\
      \mathbf{P}\,\cup\,\mathbf{Q}	&
        \mbox{Set Union: all elements appearing in}
        \ \mathbf{P}\ \mbox{OR}\ \mathbf{Q}\\
      \mathbf{P}\,\cap\,\mathbf{Q}	&
        \mbox{Set Intersection: all elements appearing in}\ \mbox{P}
        \ \mbox{AND}\ \mathbf{Q}\\
      \mathbf{P}\,-\,\mathbf{Q} &
        \mbox{Set difference: all elements of set}
        \ \mathbf{P}\ \mbox{NOT in set}\ \mathbf{Q}\\
      \end{array}

Visualizations
--------------

Inline slideshow:

.. inlineav:: insertionsortCON ss
   :long_name: Insertion Sort Slideshow
   :links: 
   :scripts: AV/Sorting/insertionsortCON.js
   :output: show

Use of iframes:

.. avembed:: AV/Sorting/insertionsortAV.html ss

We can also configure visualizations for other languages (written or
programming). In the following example, click on the gear icon in the
upper-right corner. Then select another language from the menu.

.. avembed:: AV/Sorting/mergesortAV.html ss


Exercises
---------

Of course we have a range of "standard" exercises (driven by the Khan
Academy Exercise Infrastructure).
Here is a battery of basic questions of "fill in the blank" or
multiple choice type.

.. avembed:: Exercises/Binary/DefSumm.html ka

We can also use this same infrastructure for more interactive
exercises.
In particular, KA exercises can integrate with our own JSAV
visualization library to show data structures generated on-the-fly.

.. avembed:: Exercises/Sorting/InssortPRO.html ka

We have a special type of exercise that we call a
"proficiency exercise".
Students demonstrate that they understand how a given algorithm works.
(By the way, you can change the programming language used in the code
example of this exercise by clicking on the settings icon.)

.. avembed:: AV/Binary/btTravInorderPRO.html pe

Binary Search Tree Small Count Exercise
---------------------------------------

Finally, we have support for small programming exercises.
These are implemented using Code Workout.

.. extrtoolembed:: 'Binary Search Tree Small Count Exercise'
   :workout_id: 64
