.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: OpenDSA Tour
   :topic: Tour

OpenDSA: A Guided Tour
======================

This page gives a tour of the major features of OpenDSA from a user's
perspective.

Navigation
----------

The fundamental metaphor is a "textbook", with each "section" as a
single HTML page.

In case you didn't see it on the way in, the table of contents is at:
`http://algoviz.org/OpenDSA/Books/C2GEN
<http://algoviz.org/OpenDSA/Books/C2GEN>`_

There are navigation buttons at the top and bottom of the page.


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

.. _SetNotation:

.. math::
   :label: sum1

   \sum_{i = 1}^{n} i &=& \frac{n (n+1)}{2}.

.. math::
   :label: sum2

   \sum_{i = 1}^{n} i^2 &=& \frac{2 n^3 + 3 n^2 + n}{6} =
   \frac{n(2n + 1)(n + 1)}{6}.

.. math::
   :label: sum3

   \sum_{i = 1}^{\log n} n &=& n \log n.

.. math::
   :label: sum4

   \sum_{i = 0}^\infty a^i &=& \frac{1}{1-a}\ \mbox{for}
   \ 0 < a < 1.

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

.. inlineav:: insertionsortS1CON ss
   :output: show

Use of iframes:

.. avembed:: AV/Sorting/insertionsortAV.html ss

We can also configure visualizations for other languages (written or
programming):

.. avembed:: AV/Sorting/mergesortAV.html ss

Exercises
---------

Of course we have a range of "standard" exercises (driven by the Khan
Academy Exercise Infrastructure).
These can integrate with our own JSAV visualization library to show
data structures generated on-the-fly.

.. avembed:: Exercises/Binary/DefSumm.html ka

We can also use this same infrastructure for more interactive
exercises.

.. avembed:: Exercises/Sorting/InssortPRO.html ka

Finally, we have a special type of exercise that we call a
"proficiency exercise".
Students demonstrate that they understand how a given algorithm works.

.. avembed:: AV/Binary/btTravInorderPRO.html pe

Finally, we have support for small programming exercises.

.. avembed:: Exercises/RecurTutor2/btLeafPROG.html ka

Feedback: Grades and Gamification Elements
------------------------------------------

Student Gradebook: Click on your login name in upper left corner of
the page.

We use a number of gamfication elements to encourage certain types of
students.

*  Buttons turn green when associated activity is complete
*  "Module Complete" signal
*  Gradebook: Green strips for complete modules, etc.

.. odsascript:: AV/Sorting/insertionsortS1CON.js
