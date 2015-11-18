.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Pilu Crescenzi and Cliff Shaffer
   :requires: Limits to Computing
   :satisfies:
   :topic: NP Completeness

.. odsalink:: AV/Development/Sudoku.css

The class NP
============

The Sudoku puzzle
-----------------

*Sudoku* is a one-player game in which the player receives a table of
nine rows and nine columns, partially filled with numbers between 1
and 9.
The table is subdvided into nine sub-tables, each one with three
rows and three columns.
The player has to fill the empty cells of the table with numbers
between 1 and 9, so that the following constraints are satisfied.

#. Each row contains all numbers between 1 and 9.

#. Each column contains all numbers between 1 and 9.

#. Each sub-table contains all numbers between 1 and 9.

Sudoku instances are usually classified as easy, medium, or
difficult.
An easy instance is an instance for which a solution can be
derived by making use of simple logical implications, which follow
directly from the rules of the game.
Let us consider the following example (click on
the slideshow buttons to see the series of six logical implications
that will lead us to complete the leftmost topmost sub-square).

.. inlineav:: Sudoku1CON ss
   :output: show

The current configuration can be completely filled by making use of
these logical implications.
A difficult Sudoku instance is an instance for which, at a certain
point, the player cannot apply such simple logical implications, as it
happens in the following example (click on the slideshow buttons to
see all possible digit candidates for each empty cell). 

.. inlineav:: Sudoku2CON ss
   :output: show

In these cases, the player can only try to set the content of a cell
equal to one of the possible digits, and check whether this choice can
lead to a solution.
Unfortunately, there is no better known algorithm
than this trial and error approach: indeed, the Sudoku puzzle is one
of the thousands of combinatorial problems which are considered
difficult to be solved, but for which a proof of this difficulty has
not bee provided yet.

The Sudoku puzzle, however, has another important characteristic,
which is shared by many other combinatorial problems: the possibility
of easily verifying whether a given solution of the puzzle is
correct.
Indeed, any Sudoku player makes use of this characteristics,
every time he/she is not able to solve the puzzle.
As a matter of fact, the solution of a Sudoku puzzle is usually
published on the same magazine, so that the player can verify that the
puzzle has indeed a solution.
The verification procedure is quite straightforward and is
summarized in the following algorithm: for each cell :math:`c`, verify
that its digit is not present in any other cell of the line, of the
column, or of the sub-square containing :math:`c`.
In the following example, we show how the correctness of a cell can be
easily verified (click on the slideshow buttons to see which cells are
analyzed in order to verify the correctness of one cell). 

.. inlineav:: Sudoku3CON ss
   :output: show


Let us then consider a generalization of the Sudoku puzzle in which
the table has dimension :math:`n^2\times n^2`, and it is initially
filled with at least :math:`\sqrt{n}` digits.
the previous discussion implies that this puzzle has a *short* and
*polynomial-time verifiable certificate*.
Indeed, this certificate is a soluton of the puzzle:
it is short because it can be described by using a number
of bits which is polynomial in the length of the description of the
puzzle, and it is easily verifiable because there exists a
polynomial-time algorithm verifying whether the solution is
correct.
More precisely, note that the length of the description of an
instance is :math:`\Omega(\sqrt{n}\log n)`
(since at least :math:`2\log n` bits are required to encode a number
between 1 and :math:`n^2`):
the length of a solution is :math:`O(n^4\log n)`
(since we have to specify :math:`n^4` numbers between 1 and
:math:`n^2`),
hence it is polynomially related to the length of the instance.
Moreover, the verification procedure we have described above takes
:math:`O(n^6)` time, since, for each of the :math:`n^4` cells, we have
to compare its value with the values of :math:`3(n^2-1)` other cells:
hence, the time complexity of the verification procedure is polynomial
with respect to the length of the instance. 

The class NP
------------

A :term:`decision problem` is a problem such that, for any instance,
the answer is either yes or no: hence, any such problem can be seen as
language containing all the strings encoding instances whose answer is
yes.
The above discussion about the Sudoku puzzle naturally leads us
to the definition of a very important class of languages.
A language :math:`L` belongs to the :term:`class NP` if there exists a
polynomial :math:`p` and a polynomial-time algorithm :math:`V` such
that, for any string :math:`x`,

.. math::

   x \in L \Leftrightarrow \exists y[|y| \leq p(|x|) \wedge
   V(x,y) \mbox{ accepts}].

The string :math:`y` is also called a
:term:`solution` or a :term:`certificate` of the instance :math:`x`.
For example, in the case of the generalized Sudoku puzzle, a certificate
would a completely filled table, and the algorithm :math:`V` woud be the
verification procedure described above. 

Examples of languages in NP
---------------------------

**SAT**: Given a boolean formula in conjunctive normal form (that is,
a disjunction of conjunctions, also called <em>clauses</em>), is the
formula satisfiable?
In this case, a certificate is a truth-assignment to the Boolean
variables occurring in the formula: the verification procedure simply
consists in checking whether each clause contains at least one literal
(that is, a variable or the negation of a variable) whose truth value
is true.
  
**Vertex cover**: Given a graph :math:`G = (N, E)` and an integer
:math:`k`, does there exist a subset :math:`S` of at most :math:`k`
vertices in :math:`N` such that each edge :math:`(u,v)` in :math:`E`
is touched by at least one vertex in :math:`S` (that is, either
:math:`u` or :math:`v` belongs to :math:`S`)?
In this case, a certificate is a subset :math:`S \subseteq N`: the
verification procedure simply consists in checking whether
:math:`|S| \leq k` and, for each edge
:math:`(u,v) \in  E\), \(u\in S \vee v\in S`.
  
**Subset Sum**: Given a set :math:`A` of integer numbers and an
integer number :math:`s`, does there exist a subset of :math:`A` such that
the sum of its elements is equal to :math:`s`?
In this case, a certificate is a subset :math:`S \subseteq A`:
the verification procedure simply consists in checking whether
:math:`\sum_{a\in A}a = s`.

P vs NP
-------

Let P denote the class of languages for which there exists a
polynomial-time algorithm that decides them (that is, a
polynomial-time algorithm :math:`P` such that, for any string
:math:`x`, :math:`x \in L` if and only if :math:`P(x)` accepts.
It is easy to verify that :math:`\mathrm{P} \subseteq \mathrm{NP}`:
indeed, it suffices to observe that, for any string :math:`x`,
a certificate of :math:`x` is the encoding of
the computation of :math:`P` with input :math:`x`.
Whether this inclusion is strict is one of the most important open
problems in theoretical computer science (and, more generally, in
mathematics).

.. odsascript:: AV/Development/Sudoku1CON.js
.. odsascript:: AV/Development/Sudoku2CON.js
.. odsascript:: AV/Development/Sudoku3CON.js
