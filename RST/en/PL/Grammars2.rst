.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

.. odsalink::  AV/PL/AV/parseTree.css

======================================
Ambiguous Grammars
======================================



Second Sample Grammar
---------------------


In :ref:`eg1` in the previous section, we developed a grammar for
algebraic expressions that involved three non-terminals, namely
:math:`<exp>, <term>`, and :math:`<var>`.  Is it possible to develop a
simpler grammar for the same language, for example, a grammar with
fewer non-terminals?  Here is one candidate grammar using only two
non-terminals :math:`<exp>` and :math:`<var>`.



.. math::

   \begin{eqnarray*} 
   <exp> &::=& <exp> + <exp> \\
   &|& <exp> - <exp> \\
   &|& <exp> * <exp> \\
   &|& <exp> / <exp> \\
   &|& <var> \\
   &|& ( <exp> ) \\
   <var> &::=& A\ |\ B\ |\ C\ |\ \ldots\ |\ X\ |\ Y\ |\ Z
   \end{eqnarray*}

Let's try to parse the expression :math:`A+B*C` using this grammar.
The grammar offers us a lot of options for how to start the parsing
process.  We could choose to first use the production with the
:math:`+` operator, as is done in the following slide show.
   
.. inlineav:: parseTree5a ss
   :links: AV/PL/AV/parseTree.css
   :scripts: AV/PL/AV/parseTree5a.js
   :output: show

Or we could also start with the production having the :math:`*` operator, in which case parsing proceeds as shown in the following slide show.
	    
.. inlineav:: parseTree5b ss
   :links: AV/PL/AV/parseTree.css
   :scripts: AV/PL/AV/parseTree5b.js
   :output: show

Note that both of the slide shows above produce valid parse trees for
this grammar.  The problem, however, is that the two parse trees are
different.  In the first of the two parse trees, B would multiply C,
which would correspond to the usual operator precedence.  However, in the
parse tree produced in the second slide show, B would be added to A, which
goes against the usual operator precedence.


Ambiguity in Grammars
---------------------

A grammar that allows for two (or more) different parse trees to be
built for the same expression is called an **ambiguous grammar**.
Ambiguous grammars should always be avoided because the multiplicity
of parse trees they allow prevents us from using parse trees to associate
a unique meaning (or value, or semantics) to the expression that they
represent.
      
The problem set for this section contains four review problems,
the first three of which refer to the same grammar.

Ambiguous Grammar - Part 1
--------------------------

This first problem is about determining how many parse trees a given
string has in a given grammar.

.. avembed:: Exercises/PL/NumParseTrees1.html ka
   :long_name: Number Of Parse Trees, Problem 1

Ambiguous Grammar - Part 2
--------------------------

This problem is about determining how many parse trees another string
has in the same grammar.

.. avembed:: Exercises/PL/NumParseTrees2.html ka
   :long_name: Number Of Parse Trees, Problem 2

Ambiguous Grammar - Part 3 
--------------------------

This problem is again about determining how many parse trees yet another
string has in the same grammar.

.. avembed:: Exercises/PL/NumParseTrees3.html ka
   :long_name: Number Of Parse Trees, Problem 3

Discovering Ambiguity
---------------------

This problem provides practice discovering ambiguities in grammars
as well as convincing yourself that a grammar is not ambiguous.

.. avembed:: Exercises/PL/DeterminingAmbiguities.html ka
   :long_name: Determining Ambiguities	     
