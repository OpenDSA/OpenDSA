.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer, Eunoh Cho
   :satisfies: set notation
   :topic: Sets


Set Notation
============

Introduction to Sets
--------------------

The concept of a set in the mathematical sense is widely usde in
computer science.
The notations and techniques of set theory are commonly used when
describing and implementing algorithms because the abstractions
associated with sets often help to clarify and simplify algorithm
design.
So, knowing this notation helps you to communicate with other computer
scientists.

.. inlineav:: SetDefFS ff
   :links: AV/PIFLA/Background/SetDefFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Background/SetDefFS.js
   :output: show


Set Common Notation
-------------------

The following table shows the symbols commonly used to express sets
and their relationships.

.. _SetNoteTable:

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
      \mathbf{P}\,\times\,\mathbf{Q} &
        \mbox{Set (Cartesian) Product: yields a set of ordered pairs}\\
      \end{array}

.. inlineav:: SetNotationFS ff
   :links: AV/PIFLA/Background/SetNotationFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Background/SetNotationFS.js
   :output: show
