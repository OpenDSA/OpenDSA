.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

.. odsalink::  AV/PL/AV/parseTree.css

=================
Grammars - Part 2
=================
..  (W 2/3/16)

RP 2 part 1
-----------

      The main topic of this module is *ambiguous grammars*.  In :ref:`eg1` of *Grammars - Part 1*, we developed a grammar for algebraic expressions that involved three non-terminals :math:`<exp>, <trm>, <pri>`.   Could we develop a simpler grammar for the same language that only required two non-terminals?   Here is a candidate for doing that with only two non-terminals.


Example Grammar 2
^^^^^^^^^^^^^^^^^

.. math::

   \begin{eqnarray*} 
   <exp> &::=& <exp>\\
   &|& <exp> + <exp> \\
   &|& <exp> - <exp> \\
   &|& <exp> * <exp> \\
   &|& <exp> / <exp> \\
   <exp> &::=& <pri> \\
   &|& ( <exp> ) \\
   <pri> &:==& A | B | C | \ldots | X | Y | Z
   \end{eqnarray*}

Let's try to parse the expression :math:`A+B*C` using this grammar.
The grammar offers us a lot of options for how to start the parse.  We
could choose to first use the production with the :math:`+` operator,
as is done in the following slide-show.
   
.. inlineav:: parseTree5a ss
   :output: show

Or we could also start with the production having the :math:`*` operator, in which case the parse proceeds as shown in the following slide-show.
	    
.. inlineav:: parseTree5b ss
   :output: show

Note that both of the slide-shows above produce valid parse trees for this grammar.   The problem, however, is that the two parse trees are different.   In the first of the two parse trees, B would multiply C, which would correspond to usual operator precedence.   However, in the parse tree produced by the second slide-show, B would be added to A, a result that is contrary to usual operator precedence.   A grammar such as this, which allows two different parse trees for the same expression, is called an *ambiguous grammar*.   Ambiguous grammars should always be avoided.   Although they allow you to determine the syntactic correctness of an expression, the variety of parse trees they allow confounds our ability to use the parse trees for any type of reliable semantic action.
      
The review problem set for this module contains four review problems, the first three of which refer to the same grammar.  The first problem is about determining how many parse trees a given string has in a given grammar.

.. avembed:: Exercises/PL/RP2part1.html ka

RP 2 part 2
-----------

This problem is again about determining how many parse trees a given string
has in a given grammar.

.. avembed:: Exercises/PL/RP2part2.html ka

RP 2 part 3
-----------

This problem is once more about determining how many parse trees a
given string has in a given grammar.

.. avembed:: Exercises/PL/RP2part3.html ka

RP 2 part 4
-----------

This problem will help you discover ambiguities in grammars as well as
convince yourself that a grammar is not ambiguous.

.. avembed:: Exercises/PL/RP2part4.html ka
.. odsascript:: AV/PL/AV/parseTree5a.js   	     
.. odsascript:: AV/PL/AV/parseTree5b.js   	     
