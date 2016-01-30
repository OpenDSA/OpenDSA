.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps


============================
Grammars - Part 2 (W 2/3/16)
============================

RP 2 part 1
-----------

Topics of the day:

  1. Infinite languages and recursion
  2. Ambiguous grammars
  3. Operator associativity


The review problem set for today contains four review problems, the
first three of which refer to the following grammar for a language
called :math:`L`:

.. math::

   \begin{eqnarray*} 
   <s> & ::= & <v>\ =\ <e>\\
       & |   & <s>\ ;\ <s>\\
       & |   & \mathrm{if}\ <b>\ \mathrm{then}\ <s>\\
       & |   & \mathrm{if}\ <b>\ \mathrm{then}\ <s>\ \mathrm{else}\ <s>\\
   <v> & ::= & \,\,\,x\,\,\, |\,\,\, y\,\,\, |\,\,\, z\\
   <e> & ::= & <v>\ |\,\,\,  0\,\,\, |\,\,\, 1\,\,\, |\,\,\, 2\,\,\, |\,\,\, 3\,\,\, |\,\,\, 4\\
   <b> & ::= & <e>\ ===\ <e>\\
   \end{eqnarray*}

where, like in JavaScript,  :math:`=` is the assignment operator and :math:`===` is the equality testing  operator.

This problem is about determining how many parse trees a given string
has in the grammar given above for :math:`L`.

.. avembed:: Exercises/PL/RP2part1.html ka

RP 2 part 2
-----------

This problem is again about determining how many parse trees a given string
has in the grammar given above for :math:`L`.

.. avembed:: Exercises/PL/RP2part2.html ka

RP 2 part 3
-----------

This problem is once more about determining how many parse trees a given string
has in the grammar given above for :math:`L`.

.. avembed:: Exercises/PL/RP2part3.html ka

RP 2 part 4
-----------

This problem again deals with an expression with multiple parse trees
in a given grammar. But this time, the grammar involved is *not* the
one given above for :math:`L`.

.. avembed:: Exercises/PL/RP2part4.html ka
