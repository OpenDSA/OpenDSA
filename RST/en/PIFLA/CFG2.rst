.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed and Cliff Shaffer
   :satisfies:
   :topic: Context-Free Grammars and Languages

Context-Free Grammars Part 2
============================

Ambiguity
---------

.. inlineav:: AmbiguityFS ff
   :links: AV/PIFLA/CFL/AmbiguityFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/CFL/AmbiguityFS.js
   :output: show


Ambiguous Grammars (1)
~~~~~~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/FLA/NumParseTrees1.html ka
   :long_name: Number Of Parse Trees, Problem 1

Ambiguous Grammars (2)
~~~~~~~~~~~~~~~~~~~~~~

This problem is again about determining how many parse trees a given string
has in a given grammar.

.. avembed:: Exercises/FLA/NumParseTrees2.html ka
   :long_name: Number Of Parse Trees, Problem 2

Ambiguous Grammars (3)
~~~~~~~~~~~~~~~~~~~~~~

This problem is once more about determining how many parse trees a
given string has in a given grammar.

.. avembed:: Exercises/FLA/NumParseTrees3.html ka
   :long_name: Number Of Parse Trees, Problem 3

Ambiguous Grammars (4)
~~~~~~~~~~~~~~~~~~~~~~

This problem will help you to discover ambiguities in grammars, as well as
help you to convince yourself when a grammar is not ambiguous.

.. avembed:: Exercises/FLA/DeterminingAmbiguities.html ka
   :long_name: Determining Ambiguities


Precedence Practice
-------------------

.. avembed:: Exercises/FLA/EvalExp.html ka
   :long_name: Evaluating Expression Based on Grammar


Unambiguous grammar parse tree Example
--------------------------------------

.. inlineav:: ParseTreeForExpCON ss
   :links:   AV/VisFormalLang/CFG/ParseTreeForExpCON.css
   :scripts: lib/underscore.js DataStructures/FLA/PDA.js AV/VisFormalLang/CFG/ParseTreeForExpCON.js
   :output: show

Associativity
~~~~~~~~~~~~~

.. avembed:: Exercises/FLA/Associativity.html ka
   :long_name: Associativity

Precedence and Associativity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This problem illustrates how grammatical structure impacts the
associativity property and order of precedence of arithmetic
operators.

.. avembed:: Exercises/FLA/PrecedenceAndAssociativity.html ka
   :long_name: Precedence and associativity


Why Context Free?
-----------------

We have been throwing around the term "context free" to describe
certain languages and their associated grammars.
We have a definitions: A context-free language is one with a
context-free grammar, and a context-free grammar is any grammar whose
production rules all have a single variable on the left-hand side.
Finally, we know that the class of context free languages is a
superset of the class of regular languages.

But why the name "context free"?
This comes from the idea that, in a sentential form for a partial
derivation for a string, we are free to replace any variable with one
of its production rule right-hand sides, without concern for what else
appears in that sentential form.
For example, consider a grammar that has these rules:

   | S :math:`\rightarrow` ABC :math:`|` GBH
   | B :math:`\rightarrow` E :math:`+` E

The point is that regardless of which production rule we use on S to
start, we are then free to expand B in the next step, regardless of
whether it is surrounded by variables A and C, or by variables G
and H.

In contrast, there are also context-sensitive grammars.
These are grammars that can have multiple variables on the left hand
side of a production.
For example, consider this partial grammar:

   | S :math:`\rightarrow` ABC :math:`|` GBH
   | AB :math:`\rightarrow` AE :math:`+` E
   | GB :math:`\rightarrow` AE :math:`-` E

In this case, we have to see A and B appear together in the sentential form
in order to fire the production rule that yields E :math:`+` E,
or G and B appear together to fire the production rule that yields
E :math:`-` E.

We will see later that context-sensitive grammars are more powerful
than CFGs.
Which of course means that there are languages that are not context
free, but which are context sensitive.
